import { NextRequest, NextResponse } from 'next/server';
import { getTopicBySlug } from '@/lib/content';

export async function POST(req: NextRequest) {
  try {
    const { message, subjectSlug, topicSlug, pageType = 'home', history = [] } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // ── Build Topic / Subject Context ──────────────────────────────────────
    let topicContextStr = '';
    let topicTitle = '';
    let topicData: any = null;

    if (subjectSlug && topicSlug) {
      const resolved = getTopicBySlug(subjectSlug, topicSlug);
      if (resolved) {
        topicData = resolved.topic;
        topicTitle = resolved.topic.title;
        topicContextStr = `
TOPIC CONTEXT:
- Topic: "${resolved.topic.title}" in subject "${resolved.subject.name}"
- Description: ${resolved.topic.description}
- Simple Explanation (ELI5): ${resolved.topic.sections.what?.eli5 || 'N/A'}
- Full Explanation: ${resolved.topic.sections.what?.text?.substring(0, 600) || 'N/A'}
- Key Points: ${JSON.stringify(resolved.topic.sections.what?.points?.slice(0, 6) || [])}
- Code Example: ${resolved.topic.sections.code?.code?.substring(0, 500) || 'N/A'}
- Interview Questions: ${JSON.stringify((resolved.topic.interviewQuestions || []).slice(0, 3))}
`;
      }
    }

    // ── Build Page-Level Context ────────────────────────────────────────────
    const pageContextMap: Record<string, string> = {
      home: 'The user is on the HOME page — browsing the learning platform for the first time or returning. Help them orient themselves, discover topics, and plan their learning journey.',
      subject: `The user is on a SUBJECT overview page${subjectSlug ? ` for "${subjectSlug.replace(/-/g, ' ')}"` : ''}. Help them understand the curriculum, pick topics, and plan a study strategy.`,
      topic: `The user is on a TOPIC study page. Use the topic context above to give precise, detailed answers.`,
      projects: 'The user is on the PROJECTS page. Help them pick projects, understand tech stacks, write code, debug issues, and think about deployment and portfolio presentation.',
      interview: 'The user is in INTERVIEW PREP mode. Give realistic mock questions, explain ideal answer structures (STAR method), share common pitfalls, and simulate a real technical interview experience.',
      dashboard: 'The user is viewing their DASHBOARD and tracking progress. Help them set goals, understand their weak areas, and plan an efficient study schedule.',
      other: 'The user is browsing the platform. Give helpful, encouraging responses about data science learning.',
    };

    const pageContext = pageContextMap[pageType] || pageContextMap.other;

    // ── Gemini API Call ─────────────────────────────────────────────────────
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (apiKey) {
      const systemPrompt = `You are an expert AI Data Science Mentor and Study Partner embedded in a professional learning platform called "N8N Data Science Hub".

## YOUR PERSONA
- Friendly, encouraging, and direct — like a senior data scientist mentoring a junior
- Use clear structure with markdown: headers (##, ###), bold (**text**), bullet lists, numbered lists, and code blocks
- Keep responses concise but rich — aim for 150-400 words unless the user asks for more
- Use relevant emojis sparingly to make responses engaging (1-2 per response max)
- Always end with a helpful follow-up nudge (e.g., "Want me to quiz you on this?")

## PLATFORM CONTEXT
${pageContext}

${topicContextStr ? `## ACTIVE TOPIC CONTEXT\n${topicContextStr}\nUse this context to give precise answers. If the student asks something closely related to this topic, draw from the context above first.\n` : ''}

## SUBJECT COVERAGE
You are an expert in: Python (pandas, numpy, matplotlib, scikit-learn), SQL (joins, window functions, CTEs), Machine Learning (regression, classification, clustering, model evaluation), Deep Learning (neural networks, CNNs, RNNs, transformers), Data Visualization (matplotlib, seaborn, plotly, power bi), Generative AI (LLMs, RAG, prompt engineering), Agentic AI (agents, tools, n8n workflows), and general data science career advice.

## RESPONSE RULES
1. If asked about a specific topic you have context for, use that context — don't make things up
2. If asked about code, always provide working, runnable Python or SQL
3. If asked interview questions, give both the question AND a model answer
4. If asked to quiz the student, give one question with 4 options and wait for their answer
5. Never refuse to help with data science, coding, or career questions
6. If a question is outside data science, gently redirect: "That's outside my expertise, but I can help you with [related data science topic]!"`;

      const contents = history.map((chat: any) => ({
        role: chat.role === 'user' ? 'user' : 'model',
        parts: [{ text: chat.text }]
      }));
      contents.push({ role: 'user', parts: [{ text: message }] });

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            systemInstruction: { parts: [{ text: systemPrompt }] },
            generationConfig: {
              temperature: 0.75,
              maxOutputTokens: 1200,
              topP: 0.9,
            }
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (responseText) {
          // Generate smart follow-ups based on the message
          const followUps = buildFollowUps(message, topicTitle, pageType);
          return NextResponse.json({ text: responseText, followUps });
        }
      }
      console.warn('Gemini API call failed, falling back to mock agent.');
    }

    // ── Smart Mock Fallback ─────────────────────────────────────────────────
    const lowerMessage = message.toLowerCase();
    let reply = '';

    if (topicData) {
      if (lowerMessage.includes('explain') || lowerMessage.includes('simple') || lowerMessage.includes('eli5')) {
        reply = `### Simple Explanation 💡\n\n${topicData.sections.what?.eli5 || topicData.description}\n\n*Want to see a code example? Just ask!*`;
      } else if (lowerMessage.includes('code') || lowerMessage.includes('example')) {
        const code = topicData.sections.code?.code;
        reply = code
          ? `### Code Example 💻\n\n\`\`\`python\n${code}\n\`\`\`\n\n*Try running this in the Interactive Lab tab!*`
          : `No code lab for **${topicTitle}** — it's a conceptual topic. Check the Visual Flow Diagram section!`;
      } else if (lowerMessage.includes('quiz') || lowerMessage.includes('question')) {
        const quizzes = topicData.sections.quiz?.quiz;
        if (quizzes?.length > 0) {
          reply = `### Practice Question 🧠\n\n**Q**: ${quizzes[0].question}\n\n${quizzes[0].options.map((opt: string, i: number) => `${['A', 'B', 'C', 'D'][i]}. ${opt}`).join('\n')}\n\n*Go to the Practice Quiz tab for instant feedback!*`;
        } else {
          reply = `No quiz configured for **${topicTitle}** yet. Try the key concepts in the Learn tab!`;
        }
      } else if (lowerMessage.includes('interview') || lowerMessage.includes('prep')) {
        const qs = topicData.interviewQuestions;
        if (qs?.length > 0) {
          reply = `### Interview Question 🎯\n\n**Q**: ${qs[0].question}\n\n**Answer**: ${qs[0].answer}\n\n*See all ${qs.length} questions in the Exam & Interview tab!*`;
        } else {
          reply = `No interview questions for **${topicTitle}** yet. Focus on the core definition and key components!`;
        }
      } else if (lowerMessage.includes('key') || lowerMessage.includes('point') || lowerMessage.includes('important')) {
        const points = topicData.sections.what?.points || [];
        reply = `### Key Takeaways for **${topicTitle}** ⚡\n\n${points.map((p: string) => `- ${p}`).join('\n') || '- Study the concept overview above'}\n\n*Ask me to quiz you when you feel ready!*`;
      } else {
        reply = `### Overview: **${topicTitle}** 🚀\n\n${topicData.sections.what?.text?.split('\n\n')[0] || topicData.description}\n\n**Key Points:**\n${(topicData.sections.what?.points || []).slice(0, 4).map((p: string) => `- ${p}`).join('\n')}\n\n*Ask me to "explain simply", "show code", "quiz me", or "give interview questions"!*`;
      }
    } else {
      // Generic fallback per page type
      const genericReplies: Record<string, string> = {
        home: `Welcome! I'm your AI Data Science Mentor 🤖\n\nNavigate to any **topic page** and I'll load full context for that lesson. I cover Python, SQL, Pandas, ML, Deep Learning, Gen-AI, and more!\n\n*Where would you like to start?*`,
        interview: `Interview Prep mode! 🎯\n\nCommon data science interview topics:\n- **SQL**: JOINs, CTEs, Window Functions\n- **Python**: Pandas, NumPy, data wrangling\n- **ML**: Bias-variance tradeoff, model evaluation\n- **Stats**: Hypothesis testing, A/B testing\n\n*Ask me for a mock question on any of these!*`,
        projects: `Projects are the best way to learn! 🏗️\n\n**Beginner Projects:**\n- EDA on a Kaggle dataset\n- House price prediction (regression)\n- Customer churn analysis\n\n**Advanced:**\n- LLM-powered chatbot\n- Real-time dashboard with Streamlit\n\n*Which project interests you most?*`,
        dashboard: `Looking at your progress! 📊\n\n**Study Tips:**\n- Aim for **30-60 min/day** of focused learning\n- Complete topics in order within each subject\n- Practice coding in the interactive labs\n- Review interview questions before bed\n\n*What goal are you working toward?*`,
      };
      reply = genericReplies[pageType] || `Hello! I'm your AI Data Science Mentor. Ask me anything about Python, SQL, ML, Deep Learning, or career advice! 🤖`;
    }

    const followUps = buildFollowUps(message, topicTitle, pageType);
    return NextResponse.json({ text: reply, followUps });

  } catch (error: any) {
    console.error('Error in AI Route:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

function buildFollowUps(message: string, topicTitle: string, pageType: string): string[] {
  const q = message.toLowerCase();
  if (topicTitle) {
    if (q.includes('explain') || q.includes('eli5') || q.includes('what is')) {
      return [`Show me code for ${topicTitle}`, `Quiz me on ${topicTitle}`, `Real-world use case of ${topicTitle}`];
    }
    if (q.includes('code') || q.includes('example')) {
      return [`Explain this code step by step`, `What are common mistakes with ${topicTitle}?`, `Interview question on ${topicTitle}`];
    }
    if (q.includes('quiz') || q.includes('question')) {
      return ['Give me another question', 'Explain the correct answer', 'Give me a harder question'];
    }
    if (q.includes('interview')) {
      return [`Quiz me on ${topicTitle}`, `What are key points of ${topicTitle}?`, `Show a code example`];
    }
    return [`Explain ${topicTitle} simply`, `Show code for ${topicTitle}`, `What should I study after ${topicTitle}?`];
  }
  if (pageType === 'interview') {
    return ['Give me a SQL interview question', 'What are common ML interview topics?', 'How do I structure a good answer?'];
  }
  if (pageType === 'projects') {
    return ['How do I add this to my portfolio?', 'How do I deploy this project?', 'Suggest a project extension'];
  }
  return ['Tell me more about this', 'Give me a hands-on example', 'What should I learn next?'];
}
