'use client';

import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowRight, Database, Terminal, Code2 } from 'lucide-react';
import StickyNoteModal from '@/components/ui/StickyNoteModal';

interface WelcomeDialogProps {
  forceShow?: boolean;
  onClose?: () => void;
}

const STORAGE_KEY = '404fc-welcomed';

export const WelcomeDialog: React.FC<WelcomeDialogProps> = ({
  forceShow = false,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (forceShow) {
      setIsOpen(true);
      return;
    }
    const welcomed = localStorage.getItem(STORAGE_KEY);
    if (!welcomed) {
      const timer = setTimeout(() => setIsOpen(true), 400);
      return () => clearTimeout(timer);
    }
  }, [forceShow]);

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setIsOpen(false);
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <StickyNoteModal
      isOpen={isOpen}
      onClose={handleDismiss}
      pinType="pushpin"
      color="yellow"
    >
      <div className="space-y-4 pt-1">
        {/* Header */}
        <div className="text-left space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-amber-400/40 bg-amber-400/20 text-xs font-mono font-bold text-[var(--ink)]">
            <Sparkles className="w-3.5 h-3.5 text-[var(--yellow)]" />
            <span>404-Found-Code</span>
          </div>

          <h2
            className="text-3xl font-bold tracking-tight crayon-heading"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--ink)' }}
          >
            Hey, you found it! 🎉
          </h2>

          <p
            className="text-sm font-medium leading-relaxed text-[var(--ink-2)]"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            <strong>404-Found-Code</strong> is your personal scratchpad for real data science challenges. We start with <strong>SQL</strong> &mdash; real tables, real queries, real answers.
          </p>
        </div>

        {/* Feature bullet doodles */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-start gap-2.5 p-2 rounded-xl bg-white/60 dark:bg-[#1a0f30]/60 border border-[var(--canvas-border)]">
            <div className="w-7 h-7 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas)] flex items-center justify-center text-[var(--blue)] shrink-0 mt-0.5">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[var(--ink)] font-mono">155 Real Interview Problems</div>
              <div className="text-[11px] text-[var(--ink-3)] font-mono">LeetCode, HackerRank, StrataScratch &amp; DataLemur</div>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2 rounded-xl bg-white/60 dark:bg-[#1a0f30]/60 border border-[var(--canvas-border)]">
            <div className="w-7 h-7 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas)] flex items-center justify-center text-[var(--yellow)] shrink-0 mt-0.5">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[var(--ink)] font-mono">Zero-Setup SQLite WASM Engine</div>
              <div className="text-[11px] text-[var(--ink-3)] font-mono">Runs 100% locally in your browser sandbox</div>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2 rounded-xl bg-white/60 dark:bg-[#1a0f30]/60 border border-[var(--canvas-border)]">
            <div className="w-7 h-7 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas)] flex items-center justify-center text-[var(--green)] shrink-0 mt-0.5">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[var(--ink)] font-mono">Tiered Ink-Drop Hints &amp; Tests</div>
              <div className="text-[11px] text-[var(--ink-3)] font-mono">Progressive clues, schema previews, automated test runs</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
          <button
            onClick={handleDismiss}
            className="w-full sm:flex-1 btn-doodle-primary py-2.5 px-4 text-sm justify-center gap-2 cursor-pointer shadow-[2px_2px_0_var(--ink)]"
          >
            <span>Start Solving SQL</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleDismiss}
            className="w-full sm:w-auto btn-doodle-secondary py-2.5 px-4 text-sm text-[var(--ink-2)] hover:text-[var(--ink)] cursor-pointer"
          >
            Got It!
          </button>
        </div>

        {/* Footer Note */}
        <div className="pt-2 border-t border-[var(--canvas-border)] text-center">
          <span className="text-[11px] font-mono text-[var(--ink-3)]">
            ✏️ SQL now &bull; Python, Pandas &amp; ML tracks arriving soon
          </span>
        </div>
      </div>
    </StickyNoteModal>
  );
};
