import { AIEvaluation, InterviewQuestion } from '@/lib/store/useInterviewStore';

export async function evaluateAnswer(
  question: InterviewQuestion,
  studentAnswer: string
): Promise<AIEvaluation> {
  const response = await fetch('/api/evaluate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, studentAnswer }),
  });

  if (!response.ok) {
    throw new Error(`Evaluation API error: ${response.status}`);
  }

  const data = await response.json();

  // Validate and fill any missing fields
  return {
    score: typeof data.score === 'number' ? Math.min(10, Math.max(0, data.score)) : 5,
    passed: typeof data.passed === 'boolean' ? data.passed : (data.score ?? 5) >= 6,
    got_right: Array.isArray(data.got_right) ? data.got_right : [],
    missed: Array.isArray(data.missed) ? data.missed : [],
    verdict: data.verdict ?? 'Answer evaluated.',
    encouragement: data.encouragement ?? 'Keep going — you are making progress!',
    model_answer_hint: data.model_answer_hint ?? question.answer.slice(0, 200),
  };
}
