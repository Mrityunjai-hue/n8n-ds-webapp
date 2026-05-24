'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useInterviewStore } from '@/lib/store/useInterviewStore';

export default function SimulatorResults() {
  const { results, questions, resetSession } = useInterviewStore();
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const totalScore = results.reduce((s, r) => s + r.score, 0);
  const maxScore = questions.length * 10;
  const pct = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
  const passed = results.filter(r => r.score >= 6).length;

  const grade =
    pct >= 85 ? { label: '🏆 Excellent!',        color: 'text-emerald-400' } :
    pct >= 70 ? { label: '✅ Good Work',           color: 'text-teal-400'    } :
    pct >= 50 ? { label: '📚 Keep Practising',     color: 'text-amber-400'   } :
                { label: '🔧 Needs More Study',    color: 'text-red-400'     };

  // Find weak topics (score < 6)
  const weakTopics = results
    .filter(r => !r.skipped && r.score < 6)
    .reduce<{ subjectSlug: string; topicSlug: string; name: string }[]>((acc, r) => {
      const key = `${r.question.subjectSlug}/${r.question.topicSlug}`;
      if (!acc.find(t => `${t.subjectSlug}/${t.topicSlug}` === key)) {
        acc.push({
          subjectSlug: r.question.subjectSlug,
          topicSlug: r.question.topicSlug,
          name: r.question.topic,
        });
      }
      return acc;
    }, [])
    .slice(0, 4);

  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* ── Score Header ── */}
      <div className="text-center mb-10">
        <div className={`text-7xl font-extrabold tabular-nums leading-none ${grade.color}`}>
          {totalScore}
          <span className="text-3xl text-text-muted font-normal">/{maxScore}</span>
        </div>
        <div className={`text-2xl font-bold mt-3 mb-2 ${grade.color}`}>{grade.label}</div>
        <div className="text-sm text-text-secondary">
          {passed} of {questions.length} questions passed · {pct}% score
        </div>

        {/* Score bar */}
        <div className="h-2 bg-bg-elevated rounded-full overflow-hidden max-w-xs mx-auto mt-4">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${pct}%`,
              background: pct >= 70 ? 'linear-gradient(90deg, #00bcd4, #10b981)' :
                          pct >= 50 ? '#f59e0b' : '#f43f5e',
            }}
          />
        </div>
      </div>

      {/* ── Study These Topics ── */}
      {weakTopics.length > 0 && (
        <div className="bg-bg-surface border border-amber-500/20 rounded-2xl p-5 mb-6">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-3">
            📖 Study These Topics to Improve
          </div>
          <div className="flex flex-wrap gap-2">
            {weakTopics.map((t, i) => (
              <Link
                key={i}
                href={`/learn/${t.subjectSlug}/${t.topicSlug}`}
                className="px-3 py-1.5 rounded-xl bg-bg-elevated border border-border text-sm text-text-secondary hover:border-accent-teal hover:text-accent-teal transition-colors"
              >
                {t.name} →
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── Per-Question Review ── */}
      <div className="mb-8">
        <div className="text-sm font-bold text-text-secondary uppercase tracking-widest mb-4">
          Question Review
        </div>
        <div className="flex flex-col gap-3">
          {results.map((r, i) => {
            const isExpanded = expandedIdx === i;
            const scoreColor =
              r.skipped ? 'text-text-muted' :
              r.score >= 8 ? 'text-emerald-400' :
              r.score >= 6 ? 'text-teal-400' :
              r.score >= 4 ? 'text-amber-400' : 'text-red-400';

            return (
              <div
                key={i}
                className="bg-bg-surface border border-border rounded-2xl overflow-hidden"
              >
                {/* Question header */}
                <button
                  onClick={() => setExpandedIdx(isExpanded ? null : i)}
                  className="w-full flex items-center gap-4 p-4 text-left hover:bg-bg-elevated transition-colors cursor-pointer"
                >
                  <span className={`text-lg font-extrabold tabular-nums w-10 shrink-0 ${scoreColor}`}>
                    {r.skipped ? '—' : `${r.score}`}
                    {!r.skipped && <span className="text-xs text-text-muted font-normal">/10</span>}
                  </span>
                  <span className="flex-1 text-sm text-text-primary text-left leading-snug">
                    {r.question.question}
                  </span>
                  <span className={`text-xs font-bold shrink-0 ${
                    r.skipped ? 'text-text-muted' : r.score >= 6 ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {r.skipped ? 'Skipped' : r.score >= 6 ? '✓ Passed' : '✗ Failed'}
                  </span>
                  <span className="text-text-muted text-sm shrink-0">{isExpanded ? '▲' : '▼'}</span>
                </button>

                {/* Expanded evaluation */}
                {isExpanded && (
                  <div className="border-t border-border p-4 space-y-4">

                    {/* ── Answer Comparison ── */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Your answer */}
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">Your Answer</span>
                          {!r.skipped && (
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                              r.score >= 8 ? 'bg-emerald-500/15 text-emerald-400' :
                              r.score >= 6 ? 'bg-teal-500/15 text-teal-400' :
                              r.score >= 4 ? 'bg-amber-500/15 text-amber-400' :
                              'bg-red-500/15 text-red-400'
                            }`}>
                              {r.score}/10
                            </span>
                          )}
                        </div>
                        <div className={`text-sm leading-relaxed rounded-xl p-3 h-full border ${
                          r.skipped
                            ? 'bg-bg-elevated border-border text-text-muted italic'
                            : r.score >= 6
                            ? 'bg-emerald-500/5 border-emerald-500/20 text-text-primary'
                            : 'bg-red-500/5 border-red-500/20 text-text-primary'
                        }`}>
                          {r.skipped || !r.studentAnswer
                            ? 'No answer given'
                            : r.studentAnswer}
                        </div>
                      </div>

                      {/* Model answer */}
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold uppercase tracking-widest text-accent-teal">Model Answer</span>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-accent-teal/10 text-accent-teal border border-accent-teal/20">
                            ✓ Correct
                          </span>
                        </div>
                        <div className="text-sm leading-relaxed rounded-xl p-3 h-full bg-accent-teal/5 border border-accent-teal/20 text-text-primary">
                          {r.question.answer}
                        </div>
                      </div>
                    </div>

                    {/* ── AI Evaluation ── */}
                    {r.evaluation && (
                      <>
                        {/* Verdict + encouragement */}
                        <div className="bg-bg-elevated rounded-xl p-3 border border-border">
                          <div className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-1.5">
                            AI Verdict
                          </div>
                          <p className="text-sm text-text-primary leading-relaxed">{r.evaluation.verdict}</p>
                          <p className="text-sm text-accent-teal mt-1.5 font-medium">{r.evaluation.encouragement}</p>
                        </div>

                        {/* Got right / missed */}
                        {(r.evaluation.got_right.length > 0 || r.evaluation.missed.length > 0) && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {r.evaluation.got_right.length > 0 && (
                              <div className="bg-emerald-500/8 border border-emerald-500/20 rounded-xl p-3">
                                <div className="text-xs font-bold text-emerald-400 mb-2">✓ What You Got Right</div>
                                <ul className="space-y-1.5">
                                  {r.evaluation.got_right.map((pt, j) => (
                                    <li key={j} className="text-xs text-text-secondary flex gap-1.5">
                                      <span className="text-emerald-400 shrink-0 mt-0.5">•</span>
                                      {pt}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {r.evaluation.missed.length > 0 && (
                              <div className="bg-red-500/8 border border-red-500/20 rounded-xl p-3">
                                <div className="text-xs font-bold text-red-400 mb-2">✗ What Was Missing</div>
                                <ul className="space-y-1.5">
                                  {r.evaluation.missed.map((pt, j) => (
                                    <li key={j} className="text-xs text-text-secondary flex gap-1.5">
                                      <span className="text-red-400 shrink-0 mt-0.5">•</span>
                                      {pt}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Key takeaway */}
                        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-3">
                          <div className="text-xs font-bold text-amber-400 mb-1">💡 Remember This</div>
                          <p className="text-xs text-text-secondary leading-relaxed">
                            {r.evaluation.model_answer_hint}
                          </p>
                        </div>
                      </>
                    )}

                    {/* Skipped — still show model answer */}
                    {r.skipped && (
                      <div className="bg-accent-teal/5 border border-accent-teal/20 rounded-xl p-3">
                        <div className="text-xs font-bold text-accent-teal mb-1">📖 What You Should Know</div>
                        <p className="text-sm text-text-secondary leading-relaxed">{r.question.answer}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Actions ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={resetSession}
          className="flex-1 py-3 bg-gradient-to-r from-accent-teal to-accent-purple text-text-inverse font-bold rounded-xl hover:opacity-90 transition-opacity cursor-pointer border-none"
        >
          🔄 Try Again
        </button>
        <Link
          href="/interview"
          className="flex-1 py-3 border border-border text-text-secondary font-semibold rounded-xl hover:border-accent-teal hover:text-accent-teal transition-colors text-center"
        >
          📚 Browse Questions
        </Link>
        <Link
          href="/dashboard"
          className="flex-1 py-3 border border-border text-text-secondary font-semibold rounded-xl hover:border-accent-teal hover:text-accent-teal transition-colors text-center"
        >
          🏠 Dashboard
        </Link>
      </div>
    </div>
  );
}
