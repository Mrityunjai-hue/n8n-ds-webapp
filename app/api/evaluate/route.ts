import { NextRequest, NextResponse } from 'next/server';
import { InterviewQuestion } from '@/lib/store/useInterviewStore';

export async function POST(req: NextRequest) {
  try {
    const { question, studentAnswer }: {
      question: InterviewQuestion;
      studentAnswer: string;
    } = await req.json();

    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_AI_KEY ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 500 });
    }

    const prompt = `You are an expert technical interviewer evaluating a data science candidate's answer.

Question: ${question.question}
Subject: ${question.subject} — ${question.topic}
Difficulty: ${question.difficulty}
Category: ${question.category}
Model Answer: ${question.answer}
Student Answer: ${studentAnswer || '(no answer given)'}

Evaluate the student's answer against the model answer. Be encouraging but precise.
Return ONLY a valid JSON object with NO markdown, NO code fences, NO explanation outside the JSON:

{
  "score": <integer 0-10>,
  "passed": <true if score >= 6>,
  "got_right": ["specific correct point 1", "specific correct point 2"],
  "missed": ["key concept they skipped", "important detail missing"],
  "verdict": "2-sentence evaluation of their answer quality",
  "encouragement": "1 warm encouraging sentence",
  "model_answer_hint": "The single most important concept from this topic to remember"
}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 600,
            responseMimeType: 'application/json',
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '{}';

    // Strip any accidental markdown code fences
    const cleaned = text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();

    try {
      const evaluation = JSON.parse(cleaned);
      return NextResponse.json(evaluation);
    } catch {
      // Fallback if JSON parse fails
      return NextResponse.json({
        score: 5,
        passed: false,
        got_right: [],
        missed: ['Could not fully evaluate — please try again'],
        verdict: 'There was an issue evaluating your answer. Your effort counts!',
        encouragement: 'Keep going — every attempt builds your skills.',
        model_answer_hint: question.answer.slice(0, 200),
      });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
