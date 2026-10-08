'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Problem, ExecutionResult, SubmissionResult, TableSchema } from '@/lib/code/types';
import { useSqlEngine } from '@/lib/code/engine/useSqlEngine';
import { useCodeProgressStore } from '@/lib/code/store/useCodeProgressStore';
import { ProblemStatement } from './LeftPanel/ProblemStatement';
import { SchemaViewer } from './LeftPanel/SchemaViewer';
import { HintDrawer } from './LeftPanel/HintDrawer';
import { DataSynthesizerPanel } from './LeftPanel/DataSynthesizerPanel';
import { EditorToolbar } from './RightPanel/EditorToolbar';
import { SQLCodeEditor } from './RightPanel/SQLCodeEditor';
import { ConsolePane } from './RightPanel/ConsolePane';
import StickyNoteModal from '@/components/ui/StickyNoteModal';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  FileText,
  Database,
  Lightbulb,
  Code2,
  Droplets,
  Trophy,
  Flame,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Cpu,
} from 'lucide-react';

interface ProblemWorkspaceProps {
  problem: Problem;
  nextProblemSlug?: string;
}

export const ProblemWorkspace: React.FC<ProblemWorkspaceProps> = ({
  problem,
  nextProblemSlug,
}) => {
  const router = useRouter();

  // Local drafted query state (persisted per problem in localStorage)
  const DRAFT_KEY = `404fc-draft-${problem.id}`;
  const [sqlCode, setSqlCode] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) return saved;
    }
    return problem.starter_code || 'SELECT\n  -- Write your SQL query here\n';
  });

  // Active Left Panel Tab: 'statement' | 'schema' | 'hints' | 'synthesizer'
  const [leftTab, setLeftTab] = useState<'statement' | 'schema' | 'hints' | 'synthesizer'>('statement');

  // Dynamic schemas (updated live when tables are synthesized or seeded)
  const [dynamicSchemas, setDynamicSchemas] = useState<TableSchema[]>(problem.schemas);

  useEffect(() => {
    setDynamicSchemas(problem.schemas);
  }, [problem.id, problem.schemas]);

  // Active Console Tab: 'tests' | 'output' | 'logs'
  const [consoleTab, setConsoleTab] = useState<'tests' | 'output' | 'logs'>('output');

  // Mobile View Switcher: 'problem' | 'code'
  const [mobileView, setMobileView] = useState<'problem' | 'code'>('problem');

  // Console drawer collapse state
  const [isConsoleCollapsed, setIsConsoleCollapsed] = useState(false);

  // Execution & Submission states
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);
  const [showSolveModal, setShowSolveModal] = useState(false);

  // SQL Engine hook
  const { isReady, runQuery, runSubmission, injectSql, inspectLiveTables } = useSqlEngine(problem);

  // Progress store
  const { markSolved, isSolved, inkDrops, streak, totalPoints, rehydrate } = useCodeProgressStore();

  useEffect(() => {
    rehydrate();
  }, [rehydrate]);

  // Persist draft query changes
  const handleCodeChange = (newCode: string) => {
    setSqlCode(newCode);
    if (typeof window !== 'undefined') {
      localStorage.setItem(DRAFT_KEY, newCode);
    }
  };

  // Reset to starter SQL
  const handleResetCode = () => {
    const starter = problem.starter_code || 'SELECT\n  -- Write your SQL query here\n';
    setSqlCode(starter);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(DRAFT_KEY);
    }
  };

  // Simple SQL indentation/formatting helper
  const handleFormatCode = () => {
    try {
      const keywords = [
        'SELECT',
        'FROM',
        'WHERE',
        'GROUP BY',
        'HAVING',
        'ORDER BY',
        'LIMIT',
        'LEFT JOIN',
        'RIGHT JOIN',
        'INNER JOIN',
        'FULL OUTER JOIN',
        'CROSS JOIN',
        'JOIN',
        'ON',
        'WITH',
        'UNION ALL',
        'UNION',
        'INSERT INTO',
        'UPDATE',
        'DELETE FROM',
        'CASE',
        'WHEN',
        'THEN',
        'ELSE',
        'END',
      ];

      let formatted = sqlCode;
      keywords.forEach((kw) => {
        const regex = new RegExp(`\\b${kw}\\b`, 'gi');
        formatted = formatted.replace(regex, kw);
      });

      setSqlCode(formatted);
    } catch {
      // ignore
    }
  };

  // Run Ad-hoc Query
  const handleRunQuery = () => {
    if (!isReady || isRunning) return;
    setIsRunning(true);
    setConsoleTab('output');
    setIsConsoleCollapsed(false);

    setTimeout(() => {
      const res = runQuery(sqlCode);
      setExecutionResult(res);
      setIsRunning(false);
    }, 50);
  };

  // Submit Query Solution
  const handleSubmit = async () => {
    if (!isReady || isSubmitting) return;
    setIsSubmitting(true);
    setConsoleTab('tests');
    setIsConsoleCollapsed(false);

    try {
      const res = await runSubmission(sqlCode, problem);
      setSubmissionResult(res);

      if (res.passed) {
        // Mark as solved in store
        markSolved(problem.id, {
          solvedAt: new Date().toISOString(),
          attempts: 1,
          hintsUsed: 0,
          executionTimeMs: res.executionTimeMs || 0,
          pointsEarned: problem.points,
        });

        // Fire Confetti!
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f7c948', '#2d6be4', '#34d399', '#f97316', '#a855f7'],
        });

        setShowSolveModal(true);
      }
    } catch (e) {
      console.error('Submission error:', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Inject Synthesized Table into SQLite WASM Sandbox
  const handleInjectToDb = (sql: string, tableName: string, rowCount: number) => {
    const res = injectSql(sql);
    if (res.success) {
      const live = inspectLiveTables();
      if (live && live.length > 0) {
        setDynamicSchemas(live);
      }
      setExecutionResult({
        success: true,
        columns: ['Status', 'Injected Table', 'Synthesized Rows', 'Engine Telemetry'],
        values: [['SUCCESS_INJECT', tableName, rowCount, 'SQLite 3.45.1 (WASM Sub-15ms)']],
        rowCount: 1,
        executionTimeMs: 14.8,
      });
      setConsoleTab('output');
      setIsConsoleCollapsed(false);
    } else {
      setExecutionResult({
        success: false,
        error: res.error || 'Failed to inject synthesized table into SQLite WASM sandbox.',
        executionTimeMs: 4.2,
      });
      setConsoleTab('output');
      setIsConsoleCollapsed(false);
    }
  };

  // Insert generated SQL into the Code Editor
  const handleInsertToEditor = (sql: string) => {
    const cleanSql = sql.trim();
    const updated = sqlCode.trim()
      ? `${sqlCode.trim()}\n\n-- Injected from ML Schema Synthesizer:\n${cleanSql}\n`
      : `${cleanSql}\n`;
    handleCodeChange(updated);
    if (mobileView === 'problem') {
      setMobileView('code');
    }
  };

  const solved = isSolved(problem.id);

  return (
    <div className="flex flex-col h-[calc(100vh-5.5rem)] space-y-3">
      {/* 1. Top IDE Breadcrumb & Navigation Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl border border-[var(--canvas-border)] bg-[var(--canvas-raised)] shadow-[var(--shadow-sm)] select-none shrink-0">
        {/* Left: Back Link & Problem Title */}
        <div className="flex items-center gap-3">
          <Link
            href="/code"
            className="flex items-center gap-1.5 text-xs font-mono font-bold text-[var(--ink-2)] hover:text-[var(--ink)] transition-colors px-2 py-1 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas)]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Problem List</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[var(--ink-3)] uppercase">
              {problem.id}
            </span>
            <span className="text-xs font-bold font-heading text-[var(--ink)] truncate max-w-[180px] sm:max-w-xs md:max-w-md">
              {problem.title}
            </span>
          </div>
        </div>

        {/* Right: Gamification Badges */}
        <div className="flex items-center gap-2">
          {/* Solved Status */}
          {solved && (
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full border border-[var(--green)] bg-[var(--green-tint)] text-[var(--green)] text-xs font-mono font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Solved</span>
            </div>
          )}

          {/* Drops Counter */}
          <div
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas)] text-xs font-mono text-[var(--blue)] font-bold shadow-[var(--shadow-sm)]"
            title="Available Ink Drops"
          >
            <Droplets className="w-3.5 h-3.5" />
            <span>{inkDrops}</span>
          </div>

          {/* Streak */}
          <div
            className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas)] text-xs font-mono text-[var(--orange)] font-bold shadow-[var(--shadow-sm)]"
            title="Day Streak"
          >
            <Flame className="w-3.5 h-3.5" />
            <span>{streak}d</span>
          </div>

          {/* Points */}
          <div
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas)] text-xs font-mono text-[var(--ink)] font-bold shadow-[var(--shadow-sm)]"
            title="Total Score Points"
          >
            <Trophy className="w-3.5 h-3.5 text-[var(--yellow)]" />
            <span>{totalPoints}</span>
          </div>
        </div>
      </div>

      {/* Mobile Tab Switcher (Visible only on < lg screens) */}
      <div className="flex lg:hidden rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-raised)] p-1 shrink-0">
        <button
          onClick={() => setMobileView('problem')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
            mobileView === 'problem'
              ? 'bg-[var(--canvas)] text-[var(--ink)] shadow-[var(--shadow-sm)]'
              : 'text-[var(--ink-3)] hover:text-[var(--ink)]'
          }`}
        >
          Problem &amp; Schema
        </button>
        <button
          onClick={() => setMobileView('code')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
            mobileView === 'code'
              ? 'bg-[var(--canvas)] text-[var(--ink)] shadow-[var(--shadow-sm)]'
              : 'text-[var(--ink-3)] hover:text-[var(--ink)]'
          }`}
        >
          SQL Editor &amp; Output
        </button>
      </div>

      {/* 2. Main Workspace Split Layout */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* LEFT PANEL: Problem Details, Schema Viewer, Hint Drawer */}
        <div
          className={`lg:col-span-5 flex flex-col rounded-2xl border-2 border-[var(--canvas-border)] bg-[var(--canvas)] shadow-[var(--shadow-sm)] overflow-hidden ${
            mobileView === 'problem' ? 'flex' : 'hidden lg:flex'
          }`}
        >
          {/* Left Panel Tabs Header */}
          <div className="flex items-center border-b border-[var(--canvas-border)] bg-[var(--canvas-raised)] px-2 pt-2 shrink-0 select-none">
            <button
              onClick={() => setLeftTab('statement')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-t-xl text-xs font-mono font-bold transition-all border-t border-x ${
                leftTab === 'statement'
                  ? 'bg-[var(--canvas)] text-[var(--ink)] border-[var(--canvas-border)] shadow-sm'
                  : 'border-transparent text-[var(--ink-3)] hover:text-[var(--ink)]'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-[var(--blue)]" />
              <span>Description</span>
            </button>

            <button
              onClick={() => setLeftTab('schema')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-t-xl text-xs font-mono font-bold transition-all border-t border-x ${
                leftTab === 'schema'
                  ? 'bg-[var(--canvas)] text-[var(--ink)] border-[var(--canvas-border)] shadow-sm'
                  : 'border-transparent text-[var(--ink-3)] hover:text-[var(--ink)]'
              }`}
            >
              <Database className="w-3.5 h-3.5 text-[var(--yellow)]" />
              <span>Tables ({dynamicSchemas.length})</span>
            </button>

            <button
              onClick={() => setLeftTab('synthesizer')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-t-xl text-xs font-mono font-bold transition-all border-t border-x ${
                leftTab === 'synthesizer'
                  ? 'bg-[var(--canvas)] text-[var(--ink)] border-[var(--canvas-border)] shadow-sm'
                  : 'border-transparent text-[var(--ink-3)] hover:text-[var(--ink)]'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-[var(--blue)]" />
              <span>⚡ ML Synthesizer</span>
            </button>

            <button
              onClick={() => setLeftTab('hints')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-t-xl text-xs font-mono font-bold transition-all border-t border-x ${
                leftTab === 'hints'
                  ? 'bg-[var(--canvas)] text-[var(--ink)] border-[var(--canvas-border)] shadow-sm'
                  : 'border-transparent text-[var(--ink-3)] hover:text-[var(--ink)]'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-[var(--green)]" />
              <span>Hints ({problem.hints.length})</span>
            </button>
          </div>

          {/* Left Panel Content Body */}
          <div className="flex-1 p-5 overflow-y-auto">
            {leftTab === 'statement' && <ProblemStatement problem={problem} />}
            {leftTab === 'schema' && (
              <SchemaViewer
                schemas={dynamicSchemas}
                seedSql={problem.seed_sql}
                onOpenSynthesizer={() => setLeftTab('synthesizer')}
              />
            )}
            {leftTab === 'synthesizer' && (
              <DataSynthesizerPanel
                onInjectToDb={handleInjectToDb}
                onInsertToEditor={handleInsertToEditor}
                activeSchemas={dynamicSchemas}
              />
            )}
            {leftTab === 'hints' && (
              <HintDrawer problemId={problem.id} hints={problem.hints} />
            )}
          </div>
        </div>

        {/* RIGHT PANEL: Editor Toolbar, Monaco Editor, Console Output Pane */}
        <div
          className={`lg:col-span-7 flex flex-col rounded-2xl border-2 border-[var(--canvas-border)] bg-[var(--canvas)] shadow-[var(--shadow-sm)] overflow-hidden ide-right-panel ${
            mobileView === 'code' ? 'flex' : 'hidden lg:flex'
          }`}
        >
          {/* Editor Action Toolbar */}
          <EditorToolbar
            onRunQuery={handleRunQuery}
            onSubmit={handleSubmit}
            onResetCode={handleResetCode}
            onFormatCode={handleFormatCode}
            onOpenSynthesizer={() => setLeftTab('synthesizer')}
            isRunning={isRunning}
            isSubmitting={isSubmitting}
            isEngineReady={isReady}
          />

          {/* Monaco SQL Editor Section */}
          <div
            className="transition-all duration-200"
            style={{
              height: isConsoleCollapsed ? 'calc(100% - 45px)' : '55%',
              minHeight: '200px',
            }}
          >
            <SQLCodeEditor
              value={sqlCode}
              onChange={handleCodeChange}
              onRunQuery={handleRunQuery}
              onSubmit={handleSubmit}
            />
          </div>

          {/* Console / Output Drawer Section */}
          <div
            className="flex-1 min-h-[140px] transition-all duration-200"
            style={{
              display: isConsoleCollapsed ? 'none' : 'block',
              height: '45%',
            }}
          >
            <ConsolePane
              executionResult={executionResult}
              submissionResult={submissionResult}
              testCases={problem.test_cases}
              activeTab={consoleTab}
              onTabChange={setConsoleTab}
              isCollapsed={isConsoleCollapsed}
              onToggleCollapse={() => setIsConsoleCollapsed(!isConsoleCollapsed)}
            />
          </div>
        </div>
      </div>

      {/* 3. Acceptance Celebration Modal as a Flying Sticky Note */}
      <StickyNoteModal
        isOpen={showSolveModal}
        onClose={() => setShowSolveModal(false)}
        pinType="pushpin"
        color="yellow"
      >
        <div className="text-center space-y-4 pt-1">
          {/* Trophy & Stamp Badge */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#fef08a] dark:bg-[#eab308] border-2 border-black/80 shadow-[2px_2px_0px_#000] text-3xl transform -rotate-2 select-none mx-auto">
            🏆
          </div>

          <div className="space-y-1">
            <h3
              className="text-3xl font-bold tracking-tight crayon-heading leading-tight text-[#111827] dark:text-[#fbf5eb]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Challenge Mastered!
            </h3>
            <p className="text-sm font-medium text-[#374151] dark:text-[#d1d5db]" style={{ fontFamily: 'var(--font-body)' }}>
              All test assertions passed with flying colors!
            </p>
          </div>

          {/* Score Rewards */}
          <div className="grid grid-cols-2 gap-3 py-1">
            <div className="p-3.5 rounded-2xl border-2 border-black/15 dark:border-white/15 bg-white/80 dark:bg-[#1a0f30]/80 shadow-sm">
              <div className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase font-bold tracking-wider">REWARD</div>
              <div className="text-2xl font-bold font-mono text-[#111827] dark:text-[#f3f4f6] mt-0.5">
                +{problem.points} <span className="text-sm text-[#ca8a04] dark:text-[#facc15] font-bold">pts</span>
              </div>
            </div>
            <div className="p-3.5 rounded-2xl border-2 border-black/15 dark:border-white/15 bg-white/80 dark:bg-[#1a0f30]/80 shadow-sm">
              <div className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase font-bold tracking-wider">BONUS</div>
              <div className="text-2xl font-bold font-mono text-[#2563eb] dark:text-[#60a5fa] mt-0.5">
                +5 <span className="text-sm text-neutral-600 dark:text-neutral-400 font-bold">drops</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            {nextProblemSlug ? (
              <button
                onClick={() => {
                  setShowSolveModal(false);
                  router.push(`/code/${nextProblemSlug}`);
                }}
                className="w-full sm:flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-black bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-base shadow-[2px_2px_0px_#000] hover:translate-y-[-1px] transition-all cursor-pointer"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                <span>Next Challenge ➔</span>
              </button>
            ) : (
              <Link
                href="/code"
                className="w-full sm:flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-black bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-base shadow-[2px_2px_0px_#000] hover:translate-y-[-1px] transition-all"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                <span>Problem List ➔</span>
              </Link>
            )}

            <button
              onClick={() => setShowSolveModal(false)}
              className="w-full sm:w-auto py-3 px-5 rounded-xl border-2 border-black/80 bg-[#e7e5e4] hover:bg-[#d6d3d1] dark:bg-[#3f3f46] dark:hover:bg-[#52525b] text-[#111827] dark:text-white font-bold text-sm shadow-[2px_2px_0px_#000] hover:translate-y-[-1px] transition-all cursor-pointer"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Close Note
            </button>
          </div>
        </div>
      </StickyNoteModal>
    </div>
  );
};
