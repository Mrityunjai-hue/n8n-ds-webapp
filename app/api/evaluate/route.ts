import { NextRequest, NextResponse } from 'next/server';
import { InterviewQuestion } from '@/lib/store/useInterviewStore';

// ── Smart local fallback when Gemini quota is exhausted ────────────────────────
function mockEvaluate(question: InterviewQuestion, studentAnswer: string) {
  const answer = studentAnswer.trim().toLowerCase();
  const model = question.answer.toLowerCase();

  // Keyword overlap scoring
  const modelWords = new Set(model.split(/\W+/).filter(w => w.length > 4));
  const answerWords = new Set(answer.split(/\W+/).filter(w => w.length > 4));
  const matches = [...answerWords].filter(w => modelWords.has(w));
  const overlapRatio = modelWords.size > 0 ? matches.length / modelWords.size : 0;

  // Length bonus — short answers are usually incomplete
  const lengthOk = answer.split(/\s+/).length >= 15;

  const rawScore = Math.round(overlapRatio * 8 + (lengthOk ? 2 : 0));
  const score = Math.min(10, Math.max(1, rawScore));
  const passed = score >= 6;

  const got_right = matches.slice(0, 3).map(w => `Mentioned key term: "${w}"`);
  const missedWords = [...modelWords].filter(w => !answerWords.has(w)).slice(0, 3);
  const missed = missedWords.map(w => `Did not mention: "${w}"`);

  return {
    score,
    passed,
    got_right: got_right.length > 0 ? got_right : ['Your answer showed some understanding'],
    missed: missed.length > 0 ? missed : ['Try to include more specific technical detail'],
    verdict: passed
      ? `Good answer — you covered the core idea with ${score}/10 keyword coverage.`
      : `Your answer touched on the topic but missed some key concepts (${score}/10).`,
    encouragement: passed
      ? 'Well done! Review the model answer to see if you can score even higher.'
      : 'Keep practising! Compare your answer with the model answer to close the gaps.',
    model_answer_hint: question.answer.slice(0, 220),
  };
}

// ── Route ──────────────────────────────────────────────────────────────────────
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

    // No key configured — use local mock
    if (!apiKey) {
      return NextResponse.json(mockEvaluate(question, studentAnswer));
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

    // 5-second timeout — prevents hanging when quota is exhausted
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    let response: Response;
    try {
      response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
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
    } catch {
      // Timed out or network error — fall back to mock
      clearTimeout(timeout);
      return NextResponse.json(mockEvaluate(question, studentAnswer));
    }
    clearTimeout(timeout);

    // Quota exhausted → fall back to local mock so UI is always testable
    if (response.status === 429) {
      const mock = mockEvaluate(question, studentAnswer);
      return NextResponse.json({ ...mock, _source: 'mock_quota_exceeded' });
    }

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
      // JSON parse failed — use mock
      return NextResponse.json(mockEvaluate(question, studentAnswer));
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
