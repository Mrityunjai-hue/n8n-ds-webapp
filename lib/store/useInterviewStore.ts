import { create } from 'zustand';
import { subjects } from '@/lib/content/subjects';

// ── Types ──────────────────────────────────────────────────────────────────────

export interface InterviewQuestion {
  id: string;
  subject: string;
  subjectSlug: string;
  topic: string;
  topicSlug: string;
  question: string;
  answer: string;
  difficulty: 'Fresher' | 'Mid' | 'Senior';
  category: string;
}

export interface AIEvaluation {
  score: number;          // 0–10
  passed: boolean;        // score >= 6
  got_right: string[];
  missed: string[];
  verdict: string;
  encouragement: string;
  model_answer_hint: string;
}

export interface QuestionResult {
  question: InterviewQuestion;
  studentAnswer: string;
  evaluation: AIEvaluation | null;
  skipped: boolean;
  score: number;
}

export interface SessionConfig {
  subjectSlug: string;    // subject slug or 'all'
  difficulty: 'Fresher' | 'Mid' | 'Senior' | 'Mixed';
  count: 5 | 10 | 15;
  timerEnabled: boolean;
}

// ── Store interface ────────────────────────────────────────────────────────────

interface InterviewStore {
  status: 'idle' | 'setup' | 'active' | 'complete';
  config: SessionConfig;
  questions: InterviewQuestion[];
  currentIndex: number;
  results: QuestionResult[];
  setConfig: (c: Partial<SessionConfig>) => void;
  startSession: () => void;
  submitAnswer: (studentAnswer: string, evaluation: AIEvaluation | null, skipped?: boolean) => void;
  endSession: () => void;
  resetSession: () => void;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function getAllQuestions(): InterviewQuestion[] {
  const qs: InterviewQuestion[] = [];
  for (const subject of subjects) {
    for (const topic of subject.topics) {
      const iqs = topic.interviewQuestions ?? [];
      for (const q of iqs) {
        qs.push({
          id: `${subject.slug}-${topic.slug}-${q.question.slice(0, 20).replace(/\s/g, '-')}`,
          subject: subject.name,
          subjectSlug: subject.slug,
          topic: topic.title,
          topicSlug: topic.slug,
          question: q.question,
          answer: q.answer,
          difficulty: q.difficulty as 'Fresher' | 'Mid' | 'Senior',
          category: q.category ?? 'Conceptual',
        });
      }
    }
  }
  return qs;
}

function selectQuestions(config: SessionConfig): InterviewQuestion[] {
  let pool = getAllQuestions();

  if (config.subjectSlug !== 'all') {
    pool = pool.filter(q => q.subjectSlug === config.subjectSlug);
  }
  if (config.difficulty !== 'Mixed') {
    pool = pool.filter(q => q.difficulty === config.difficulty);
  }

  // Fisher-Yates shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool.slice(0, config.count);
}

// ── Store ──────────────────────────────────────────────────────────────────────

export const useInterviewStore = create<InterviewStore>((set, get) => ({
  status: 'idle',
  config: {
    subjectSlug: 'all',
    difficulty: 'Mixed',
    count: 10,
    timerEnabled: false,
  },
  questions: [],
  currentIndex: 0,
  results: [],

  setConfig: (c) => set(s => ({ config: { ...s.config, ...c } })),

  startSession: () => {
    const questions = selectQuestions(get().config);
    if (questions.length === 0) {
      // Not enough questions — still start with whatever we have
      set({ status: 'active', questions: questions.slice(0, get().config.count), currentIndex: 0, results: [] });
    } else {
      set({ status: 'active', questions, currentIndex: 0, results: [] });
    }
  },

  submitAnswer: (studentAnswer, evaluation, skipped = false) => {
    const { questions, currentIndex, results } = get();
    const question = questions[currentIndex];
    if (!question) return;

    const score = skipped ? 0 : (evaluation?.score ?? 0);
    const newResults: QuestionResult[] = [
      ...results,
      { question, studentAnswer, evaluation, skipped, score },
    ];

    const isLast = currentIndex >= questions.length - 1;
    set({
      results: newResults,
      currentIndex: currentIndex + 1,
      status: isLast ? 'complete' : 'active',
    });
  },

  endSession: () => set({ status: 'complete' }),

  resetSession: () =>
    set({ status: 'setup', results: [], currentIndex: 0, questions: [] }),
}));
