import { NextRequest, NextResponse } from 'next/server';

// Node.js runtime (default) — edge runtime causes 502 in local dev
export async function POST(req: NextRequest) {
  try {
    const { messages, userMessage, pageContext } = await req.json();

    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_AI_KEY ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 500 });
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

    // Use non-streaming Gemini endpoint — more reliable across environments
    // We simulate streaming on the client via chunked transfer
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`,
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
      const status = geminiRes.status;
      // Surface rate limit errors clearly so client can show a friendly message
      if (status === 429) {
        const encoder = new TextEncoder();
        const msg = 'Nova is catching her breath — free tier quota reached. Try again in a minute! ☕';
        const stream = new ReadableStream({
          start(controller) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: msg })}\n\n`));
            controller.enqueue(encoder.encode('data: [DONE]\n\n'));
            controller.close();
          }
        });
        return new Response(stream, { headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' } });
      }
      return NextResponse.json(
        { error: `Gemini error: ${status}`, detail: errText },
        { status: 502 }
      );
    }

    const data = await geminiRes.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

    if (!text) {
      return NextResponse.json({ error: 'No response from Gemini' }, { status: 502 });
    }

    // Stream response word-by-word via SSE so the client sees typing effect
    const encoder = new TextEncoder();
    const words = text.split(/(?<=\s)/); // split keeping spaces

    const stream = new ReadableStream({
      async start(controller) {
        for (const word of words) {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ text: word })}\n\n`)
          );
          // tiny delay to simulate streaming
          await new Promise(r => setTimeout(r, 8));
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'X-Accel-Buffering': 'no',
      },
    });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
