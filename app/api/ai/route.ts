import { NextRequest, NextResponse } from 'next/server';
import { getTopicBySlug } from '@/lib/content';

export async function POST(req: NextRequest) {
  try {
    const { message, subjectSlug, topicSlug, history = [] } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Load topic context if available
    let contextStr = '';
    let topicTitle = '';
    let topicData: any = null;

    if (subjectSlug && topicSlug) {
      const resolved = getTopicBySlug(subjectSlug, topicSlug);
      if (resolved) {
        topicData = resolved.topic;
        topicTitle = resolved.topic.title;
        contextStr = `
You are currently helping the student with the topic: "${resolved.topic.title}" in the subject "${resolved.subject.name}".
Topic Details:
- Description: ${resolved.topic.description}
- ELI5 explanation: ${resolved.topic.sections.what?.eli5 || ''}
- Text explanation: ${resolved.topic.sections.what?.text || ''}
- Key Points: ${JSON.stringify(resolved.topic.sections.what?.points || [])}
- Code snippet: ${resolved.topic.sections.code?.code || ''}
- Interview Questions: ${JSON.stringify(resolved.topic.interviewQuestions || [])}
`;
      }
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (apiKey) {
      // ── Call Real Gemini API ──────────────────────────────────────────────
      const systemPrompt = `You are a world-class AI Data Science Tutor, curriculum designer, and UX research mentor.
Your goal is to guide students to understand complex data science concepts deeply.
Answer their questions using clear, engaging markdown. Keep explanations punchy, structured, and use code blocks for examples.

${contextStr ? `ACTIVE TOPIC CONTEXT:\n${contextStr}\n` : ''}
Use the above context to answer questions directly related to it. If the user asks general coding or data science questions, answer them using your general expertise. Be encouraging and friendly!
`;

      // Map chat history to Gemini's content structure
      const contents = history.map((chat: any) => ({
        role: chat.role === 'user' ? 'user' : 'model',
        parts: [{ text: chat.text }]
      }));

      // Append current message
      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents,
            systemInstruction: {
              parts: [{ text: systemPrompt }]
            },
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 800,
            }
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (responseText) {
          return NextResponse.json({ text: responseText });
        }
      }
      
      console.warn('Gemini API call failed, falling back to mock agent.');
    }

    // ── Smart Mock Responder Fallback ──────────────────────────────────────
    const lowerMessage = message.toLowerCase();
    let reply = '';

    if (topicData) {
      if (lowerMessage.includes('explain') || lowerMessage.includes('simple') || lowerMessage.includes('eli5')) {
        reply = `### Simplier Explanation (ELI5) for **${topicTitle}** 💡\n\n${topicData.sections.what?.eli5 || topicData.description}\n\n*Would you like to look at a code example next? Type "code" to see it!*`;
      } else if (lowerMessage.includes('code') || lowerMessage.includes('example') || lowerMessage.includes('lab')) {
        const code = topicData.sections.code?.code;
        if (code) {
          reply = `### Interactive Code Example 💻\n\nHere is a snippet illustrating **${topicTitle}**:\n\n\`\`\`python\n${code}\n\`\`\`\n\n*You can practice running similar code directly in the **Interactive Lab** tab above!*`;
        } else {
          reply = `For **${topicTitle}**, there is no coding lab required. It's a theoretical concept best illustrated with diagrams. Check out the **Visual Flow Diagram** in the study sheet!`;
        }
      } else if (lowerMessage.includes('quiz') || lowerMessage.includes('test') || lowerMessage.includes('question')) {
        const quizzes = topicData.sections.quiz?.quiz;
        if (quizzes && quizzes.length > 0) {
          reply = `### Try this practice question! 🧠\n\n**Question**: ${quizzes[0].question}\n\n**Options**:\n${quizzes[0].options.map((opt: string, i: number) => `- ${opt}`).join('\n')}\n\n*Select your answer in the **Practice Quiz** tab above for immediate visual feedback and explanations!*`;
        } else {
          reply = `No quiz is configured for **${topicTitle}** yet, but you can study the key concepts in the **Learn Concept** tab!`;
        }
      } else if (lowerMessage.includes('interview') || lowerMessage.includes('job') || lowerMessage.includes('prep')) {
        const qs = topicData.interviewQuestions;
        if (qs && qs.length > 0) {
          reply = `### Real-World Interview Question 🎯\n\n**Q**: ${qs[0].question}\n\n**Answer Preview**: *${qs[0].answer}*\n\n*Review all ${qs.length} interview questions with hidden explanations under the **Exam & Interview** tab!*`;
        } else {
          reply = `No interview questions listed for **${topicTitle}** yet. Focus on understanding the core definition and key components!`;
        }
      } else {
        // General query about the topic
        reply = `### AI Tutor Overview: **${topicTitle}** 🚀\n\n${topicData.sections.what?.text?.split('\n\n')[0] || topicData.description}\n\nHere are some **key takeaways**:\n${(topicData.sections.what?.points || ['Core data science module', 'Tested in technical interviews']).map((p: string) => `- ${p}`).join('\n')}\n\n*Ask me to "explain simply", "show code", "give interview questions", or "quiz me"!*`;
      }
    } else {
      // General non-contextual fallback
      if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        reply = `Hello! I am your AI Data Science Learning Assistant. 🤖\n\nI can help you master Python, SQL, Machine Learning, and Agentic AI. Navigate to any topic page, and I will automatically receive details about that lesson to guide you contextually!`;
      } else {
        reply = `I am ready to help you learn! Navigating to a specific topic (like **SQL JOINS** or **Neural Networks**) will allow me to provide detailed answers, code walkthroughs, and practice interview questions for that specific topic.`;
      }
    }

    return NextResponse.json({ text: reply });
  } catch (error: any) {
    console.error('Error in AI Route:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
