'use client';

import React, { useState } from 'react';
import { HintLevel } from '@/lib/code/types';
import { useCodeProgressStore } from '@/lib/code/store/useCodeProgressStore';
import { Droplets, Lock, Unlock, Sparkles, AlertCircle, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface HintDrawerProps {
  problemId: string;
  hints: HintLevel[];
}

export const HintDrawer: React.FC<HintDrawerProps> = ({ problemId, hints }) => {
  const { inkDrops, isHintUnlocked, unlockHint } = useCodeProgressStore();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleUnlock = (hint: HintLevel) => {
    setErrorMsg(null);
    if (inkDrops < hint.inkDropCost) {
      setErrorMsg(`Not enough Ink Drops! You have ${inkDrops}, but this hint costs ${hint.inkDropCost}. Solve other problems to earn more.`);
      return;
    }

    const success = unlockHint(problemId, hint.level, hint.inkDropCost);
    if (!success) {
      setErrorMsg('Failed to unlock hint. Check your drop balance.');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Ink Balance Header */}
      <div className="rounded-2xl border-2 border-[var(--canvas-border)] bg-[var(--canvas-raised)] p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--yellow-tint)] border-2 border-[var(--canvas-border)] flex items-center justify-center text-[var(--ink)] shadow-xs">
            <Lightbulb className="w-5 h-5 text-[var(--yellow)] fill-current" />
          </div>
          <div>
            <h2 className="text-lg font-bold font-caveat leading-none text-[var(--ink)]">
              Need a Hint?
            </h2>
            <p className="text-xs text-[var(--ink-3)] font-patrick mt-0.5">
              Progressive clues &amp; query blueprints.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas)] shadow-[var(--shadow-sm)]">
          <Droplets className="w-4 h-4 text-[var(--blue)]" />
          <span className="font-mono text-sm font-bold text-[var(--ink)]">{inkDrops}</span>
          <span className="text-[10px] font-mono text-[var(--ink-3)] uppercase font-bold">drops</span>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-xl border border-[var(--red)] bg-[var(--red-tint)] flex items-start gap-2 text-xs font-mono text-[var(--red)]">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Hints List */}
      <div className="space-y-4">
        {hints.map((hint) => {
          const unlocked = isHintUnlocked(problemId, hint.level);

          return (
            <div
              key={hint.level}
              className={`rounded-2xl border-2 transition-all overflow-hidden ${
                unlocked
                  ? 'border-[var(--canvas-border)] bg-[var(--canvas)] shadow-[var(--shadow-sm)]'
                  : 'border-[var(--canvas-border)] bg-[var(--canvas-sunken)] opacity-90'
              }`}
            >
              {/* Hint Header */}
              <div className="px-4 py-3 bg-[var(--canvas-raised)] border-b border-[var(--canvas-border)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">
                    {hint.level === 1 ? '💡' : hint.level === 2 ? '🧭' : '📐'}
                  </span>
                  <div>
                    <span className="text-xs font-mono font-bold text-[var(--ink)] uppercase">
                      Level {hint.level}: {hint.title}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {unlocked ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[var(--green)]">
                      <Unlock className="w-3.5 h-3.5" />
                      <span>Unlocked</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[var(--ink-3)]">
                      <Lock className="w-3.5 h-3.5" />
                      <span>{hint.inkDropCost === 0 ? 'Free' : `${hint.inkDropCost} Drops`}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Hint Content or Unlock CTA */}
              <div className="p-4">
                {unlocked ? (
                  <div className="prose prose-doodle max-w-none text-sm leading-relaxed text-[var(--ink)] font-mono">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({ node, ...props }) => (
                          <p className="my-1.5 text-sm leading-relaxed text-[var(--ink)]" {...props} />
                        ),
                        code: ({ node, className, children, ...props }: any) => {
                          const isInline = !className?.includes('language-');
                          if (isInline) {
                            return (
                              <code
                                className="font-mono text-xs px-1.5 py-0.5 rounded border border-[var(--canvas-border)] bg-[var(--canvas-sunken)] text-[var(--blue)] font-bold"
                                {...props}
                              >
                                {children}
                              </code>
                            );
                          }
                          return (
                            <div className="rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-sunken)] p-3 my-2 font-mono text-xs text-[var(--ink)] overflow-x-auto">
                              <code {...props}>{children}</code>
                            </div>
                          );
                        },
                      }}
                    >
                      {hint.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <div className="py-4 text-center space-y-3">
                    <p className="text-xs text-[var(--ink-3)] font-mono">
                      Unlock this hint using your ink drops. Hints remain permanently unlocked for this challenge.
                    </p>
                    <button
                      onClick={() => handleUnlock(hint)}
                      className="btn-secondary text-xs px-4 py-2 rounded-xl font-bold font-mono inline-flex items-center gap-2 cursor-pointer shadow-[var(--shadow-sm)]"
                    >
                      <Droplets className="w-3.5 h-3.5 text-[var(--blue)]" />
                      <span>Unlock Level {hint.level} for {hint.inkDropCost} Drops</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
