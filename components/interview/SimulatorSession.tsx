'use client';

import { useState, useEffect, useRef } from 'react';
import { useInterviewStore } from '@/lib/store/useInterviewStore';
import { evaluateAnswer } from '@/lib/services/evaluateAnswer';

const DIFF_COLOR = {
  Fresher: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  Mid:     { bg: 'bg-amber-500/15',   text: 'text-amber-400',   border: 'border-amber-500/30'   },
  Senior:  { bg: 'bg-red-500/15',     text: 'text-red-400',     border: 'border-red-500/30'     },
} as const;

export default function SimulatorSession() {
  const { questions, currentIndex, config, submitAnswer, endSession, results } = useInterviewStore();
  const [input, setInput] = useState('');
  const [evaluating, setEvaluating] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const question = questions[currentIndex];

  // Reset timer on each new question
  useEffect(() => {
    if (!config.timerEnabled || !question) return;
    setTimeLeft(30);

    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          handleSubmit(true); // auto-submit on timeout
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => { if (timerRef.current) clearInterval(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, question?.id]);

  async function handleSubmit(timedOut = false) {
    if (timerRef.current) clearInterval(timerRef.current);
    const skipped = timedOut && !input.trim();
    setEvaluating(true);
    try {
      const evaluation = skipped ? null : await evaluateAnswer(question, input);
      submitAnswer(input, evaluation, skipped);
    } catch {
      submitAnswer(input, null, true);
    } finally {
      setEvaluating(false);
      setInput('');
    }
  }

  if (!question) return null;

  const progressPct = (currentIndex / questions.length) * 100;
  const totalScore = results.reduce((s, r) => s + r.score, 0);
  const maxSoFar = results.length * 10;
  const passed = results.filter(r => r.score >= 6).length;
  const diff = DIFF_COLOR[question.difficulty];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-6 py-4">
      {/* ── Left — Question ── */}
      <div>
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-text-secondary mb-1.5">
            <span>Question {currentIndex + 1} of {questions.length}</span>
            <span>{Math.round(progressPct)}% complete</span>
          </div>
          <div className="h-1.5 bg-bg-elevated rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent-teal to-accent-purple rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-accent-teal/10 text-accent-teal border border-accent-teal/20">
            {question.subject}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${diff.bg} ${diff.text} ${diff.border}`}>
            {question.difficulty}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-bg-elevated text-text-muted border border-border">
            {question.category}
          </span>
          <span className="px-3 py-1 rounded-full text-xs text-text-secondary">
            {question.topic}
          </span>
        </div>

        {/* Timer bar */}
        {config.timerEnabled && (
          <div className="mb-5">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-text-secondary">Time remaining</span>
              <span className={`font-bold tabular-nums ${timeLeft <= 10 ? 'text-red-400' : 'text-text-primary'}`}>
                {timeLeft}s
              </span>
            </div>
            <div className="h-1.5 bg-bg-elevated rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${(timeLeft / 30) * 100}%`,
                  background: timeLeft <= 10 ? '#f43f5e' : '#10b981',
                }}
              />
            </div>
          </div>
        )}

        {/* Question */}
        <div className="text-xl font-bold text-text-primary leading-relaxed mb-6">
          {question.question}
        </div>

        {/* Answer input */}
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your answer here… Be as detailed as you would be in a real interview."
          rows={7}
          className="w-full bg-bg-elevated border border-border rounded-xl px-4 py-3 text-sm text-text-primary resize-y outline-none focus:border-accent-teal transition-colors font-sans leading-relaxed mb-3"
          disabled={evaluating}
        />

        <div className="flex gap-3">
          <button
            onClick={() => handleSubmit()}
            disabled={evaluating || !input.trim()}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer border-none ${
              evaluating || !input.trim()
                ? 'bg-bg-elevated text-text-muted cursor-not-allowed'
                : 'bg-gradient-to-r from-accent-teal to-accent-purple text-text-inverse hover:opacity-90'
            }`}
          >
            {evaluating ? '⏳ Evaluating...' : 'Submit Answer →'}
          </button>
          <button
            onClick={() => submitAnswer('', null, true)}
            disabled={evaluating}
            className="px-5 py-3 rounded-xl border border-border text-text-secondary text-sm font-semibold hover:border-accent-teal/40 transition-colors cursor-pointer bg-transparent disabled:opacity-40"
          >
            Skip
          </button>
          <button
            onClick={endSession}
            disabled={evaluating}
            className="px-4 py-3 rounded-xl border border-border text-text-muted text-sm hover:border-red-500/30 hover:text-red-400 transition-colors cursor-pointer bg-transparent disabled:opacity-40"
            title="End session early"
          >
            End
          </button>
        </div>
      </div>

      {/* ── Right — Live Stats ── */}
      <div className="flex flex-col gap-4 lg:pt-[52px]">
        {/* Score card */}
        <div className="bg-bg-surface border border-border rounded-2xl p-5">
          <div className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-3">
            Session Score
          </div>
          <div className="text-4xl font-extrabold text-text-primary tabular-nums">
            {totalScore}
            <span className="text-lg text-text-muted font-normal">/{maxSoFar}</span>
          </div>
          <div className="text-xs text-text-secondary mt-2">
            {results.length} answered · {passed} passed
          </div>
          {/* Mini progress */}
          {results.length > 0 && (
            <div className="mt-3 h-1.5 bg-bg-elevated rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent-teal to-accent-purple rounded-full"
                style={{ width: `${(totalScore / maxSoFar) * 100}%` }}
              />
            </div>
          )}
        </div>

        {/* Recent results mini list */}
        {results.length > 0 && (
          <div className="bg-bg-surface border border-border rounded-2xl p-4">
            <div className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-3">
              Recent
            </div>
            <div className="flex flex-col gap-2">
              {results.slice(-4).reverse().map((r, i) => (
                <div key={i} className="flex items-center justify-between gap-2">
                  <span className="text-xs text-text-secondary truncate flex-1">
                    {r.skipped ? '⏭ Skipped' : r.question.question.slice(0, 32) + '…'}
                  </span>
                  <span className={`text-xs font-bold tabular-nums ${
                    r.skipped ? 'text-text-muted' :
                    r.score >= 8 ? 'text-emerald-400' :
                    r.score >= 6 ? 'text-amber-400' : 'text-red-400'
                  }`}>
                    {r.skipped ? '-' : `${r.score}/10`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
