'use client';

import React from 'react';
import { Play, CheckCircle, RotateCcw, Sparkles, Loader2, Database, Terminal } from 'lucide-react';

interface EditorToolbarProps {
  onRunQuery: () => void;
  onSubmit: () => void;
  onResetCode: () => void;
  onFormatCode: () => void;
  onOpenSynthesizer?: () => void;
  isRunning: boolean;
  isSubmitting: boolean;
  isEngineReady: boolean;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  onRunQuery,
  onSubmit,
  onResetCode,
  onFormatCode,
  onOpenSynthesizer,
  isRunning,
  isSubmitting,
  isEngineReady,
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-[var(--canvas-raised)] border-b border-[var(--canvas-border)] select-none">
      {/* Left: Engine & Dialect Pill (Notebook active tab style) */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-t-lg text-xs font-mono editor-tab-active border border-[var(--canvas-border)]">
          <Database className="w-3.5 h-3.5 text-[var(--yellow)]" />
          <span className="font-bold">SQLite 3</span>
          <span className="text-[10px] opacity-75">(WASM)</span>
        </div>

        {/* Synthesizer Tool Button */}
        {onOpenSynthesizer && (
          <button
            onClick={onOpenSynthesizer}
            className="px-2.5 py-1.5 rounded-lg border border-[var(--blue)] bg-[var(--blue-tint)] text-[var(--blue)] hover:brightness-105 transition-all text-xs font-mono font-bold inline-flex items-center gap-1 cursor-pointer shadow-xs"
            title="Open ML Schema & Data Synthesizer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Fabricate Data</span>
          </button>
        )}

        {/* Action Buttons: Format & Reset */}
        <button
          onClick={onFormatCode}
          className="p-1.5 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas)] text-[var(--ink-3)] hover:text-[var(--ink)] hover:bg-[var(--canvas-sunken)] transition-colors hidden sm:inline-flex cursor-pointer"
          title="Format / Indent SQL"
        >
          <Sparkles className="w-3.5 h-3.5 text-[var(--yellow)]" />
        </button>
        <button
          onClick={onResetCode}
          className="p-1.5 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas)] text-[var(--ink-3)] hover:text-[var(--ink)] hover:bg-[var(--canvas-sunken)] transition-colors cursor-pointer"
          title="Reset to Starter SQL"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Right: Run Query & Submit CTA with hand-drawn buttons */}
      <div className="flex items-center gap-2">
        {/* Run Query Button */}
        <button
          onClick={onRunQuery}
          disabled={!isEngineReady || isRunning || isSubmitting}
          className="btn-doodle-secondary text-xs px-3.5 py-1.5 rounded-xl font-mono font-bold flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
          title="Run SQL Query (Ctrl + Enter)"
        >
          {isRunning ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Play className="w-3.5 h-3.5 text-[var(--green)] fill-current" />
          )}
          <span>Run</span>
          <span className="hidden md:inline text-[10px] opacity-60 ml-0.5">Ctrl+↵</span>
        </button>

        {/* Submit Solution Button */}
        <button
          onClick={onSubmit}
          disabled={!isEngineReady || isRunning || isSubmitting}
          className="btn-doodle-primary text-xs px-4 py-1.5 rounded-xl font-mono font-bold flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
          title="Submit & Evaluate Test Cases (Ctrl + Shift + Enter)"
        >
          {isSubmitting ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <CheckCircle className="w-3.5 h-3.5 text-white" />
          )}
          <span>Submit</span>
          <span className="hidden md:inline text-[10px] opacity-85 ml-0.5">Ctrl+⇧+↵</span>
        </button>
      </div>
    </div>
  );
};
