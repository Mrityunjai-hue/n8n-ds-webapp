import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { messages, userMessage, pageContext } = await req.json();

    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_AI_KEY ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'Gemini API key not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Build topic context block
    const topicBlock = pageContext?.isOnLesson
      ? `
CURRENT LESSON:
- Subject: ${pageContext.currentSubject ?? 'Unknown'}
- Topic: ${pageContext.currentTopic ?? 'Unknown'}
- Content the student is reading right now:
${pageContext.topicContent ?? 'Content not available.'}
`
      : `The student is browsing the platform (page: ${pageContext?.pageType ?? 'home'}). Answer general data science questions helpfully.`;

    const systemPrompt = `You are Nova — an expert AI study companion for the N8N Data Science Learning Hub, a free platform covering SQL, Python, NumPy, Pandas, Machine Learning, Deep Learning, Generative AI, and Agentic AI.

YOUR PERSONA:
- Warm, encouraging, and pedagogically sharp
- Use real-world analogies — make abstract things concrete
- Guide students to understand WHY, not just what
- Keep responses under 250 words unless more detail is asked for
- Celebrate good answers enthusiastically
- Be specific about what's missing when answers are incomplete, but always constructive

${topicBlock}

RESPONSE FORMAT:
- Use markdown: **bold** for key terms, \`backticks\` for inline code
- Wrap code in triple backtick blocks with language tag (e.g. \`\`\`python or \`\`\`sql)
- End every response with ONE follow-up question to keep engagement going
- Never start with "As an AI" or "I'm an AI"
- Be direct and conversational

QUIZ MODE: When student asks to be quizzed, ask ONE question at a time, wait for their answer, then evaluate: what they got right, what they missed, and a score /10. Then ask if they want another.

STRICT RULES:
- Stay on topic — only data science, coding, ML, AI, and career advice
- Never make up facts — say "I'm not sure" if uncertain
- Never be discouraging — say "close, here's what's missing" not "that's wrong"`;

    // Build conversation history for Gemini
    const history = (messages ?? []).slice(-16).map((m: { role: string; content: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    history.push({ role: 'user', parts: [{ text: userMessage }] });

    // Call Gemini streaming endpoint
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?key=${apiKey}&alt=sse`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: history,
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: {
            temperature: 0.75,
            maxOutputTokens: 1024,
            topP: 0.9,
          },
        }),
      }
    );

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      return new Response(
        JSON.stringify({ error: `Gemini error: ${geminiRes.status} — ${errText}` }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Pipe the SSE stream directly back to the client
    // Transform Gemini's SSE into our own simple text/event-stream
    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        const reader = geminiRes.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        const decoder = new TextDecoder();
        let buffer = '';

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() ?? '';

            for (const line of lines) {
              if (!line.startsWith('data: ')) continue;
              const data = line.slice(6).trim();
              if (data === '[DONE]') continue;

              try {
                const parsed = JSON.parse(data);
                const text = parsed?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
                if (text) {
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
                }
              } catch {
                // skip malformed chunks
              }
            }
          }
        } finally {
          reader.releaseLock();
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
