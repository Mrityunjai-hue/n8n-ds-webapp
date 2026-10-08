'use client';

import React, { useState, useEffect } from 'react';
import { ExecutionResult, SubmissionResult, TestCase } from '@/lib/code/types';
import { CheckCircle2, XCircle, Terminal, Table, Clock, AlertTriangle, ChevronUp, ChevronDown, Check, X } from 'lucide-react';

interface ConsolePaneProps {
  executionResult: ExecutionResult | null;
  submissionResult: SubmissionResult | null;
  testCases: TestCase[];
  activeTab: 'tests' | 'output' | 'logs';
  onTabChange: (tab: 'tests' | 'output' | 'logs') => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const ConsolePane: React.FC<ConsolePaneProps> = ({
  executionResult,
  submissionResult,
  testCases,
  activeTab,
  onTabChange,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  const hasError = executionResult && !executionResult.success;
  const isSubmissionPassed = submissionResult?.passed;

  return (
    <div className="flex flex-col h-full bg-[var(--canvas)] border-t border-[var(--canvas-border)] select-none">
      {/* Console Tab Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-[var(--canvas-raised)] border-b border-[var(--canvas-border)]">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {/* Tests Tab */}
          <button
            onClick={() => onTabChange('tests')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-medium transition-colors ${
              activeTab === 'tests'
                ? 'bg-[var(--canvas)] text-[var(--ink)] border border-[var(--canvas-border)] shadow-[var(--shadow-sm)]'
                : 'text-[var(--ink-3)] hover:text-[var(--ink)]'
            }`}
          >
            {submissionResult ? (
              submissionResult.passed ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--green)]" />
              ) : (
                <XCircle className="w-3.5 h-3.5 text-[var(--red)]" />
              )
            ) : (
              <Terminal className="w-3.5 h-3.5 text-[var(--ink-3)]" />
            )}
            <span>Test Cases</span>
            {submissionResult && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                  submissionResult.passed
                    ? 'bg-[var(--green-tint)] text-[var(--green)]'
                    : 'bg-[var(--red-tint)] text-[var(--red)]'
                }`}
              >
                {submissionResult.passedTests}/{submissionResult.totalTests}
              </span>
            )}
          </button>

          {/* Query Output Tab */}
          <button
            onClick={() => onTabChange('output')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-medium transition-colors ${
              activeTab === 'output'
                ? 'bg-[var(--canvas)] text-[var(--ink)] border border-[var(--canvas-border)] shadow-[var(--shadow-sm)]'
                : 'text-[var(--ink-3)] hover:text-[var(--ink)]'
            }`}
          >
            <Table className="w-3.5 h-3.5 text-[var(--blue)]" />
            <span>Output Table</span>
            {executionResult && executionResult.success && typeof executionResult.rowCount === 'number' && (
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-[var(--canvas-sunken)] text-[var(--ink-3)]">
                {executionResult.rowCount} rows
              </span>
            )}
          </button>

          {/* Logs / Errors Tab */}
          <button
            onClick={() => onTabChange('logs')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-medium transition-colors ${
              activeTab === 'logs'
                ? 'bg-[var(--canvas)] text-[var(--ink)] border border-[var(--canvas-border)] shadow-[var(--shadow-sm)]'
                : 'text-[var(--ink-3)] hover:text-[var(--ink)]'
            }`}
          >
            <AlertTriangle className={`w-3.5 h-3.5 ${hasError ? 'text-[var(--red)]' : 'text-[var(--ink-3)]'}`} />
            <span>Console &amp; Errors</span>
            {hasError && (
              <span className="w-2 h-2 rounded-full bg-[var(--red)] animate-pulse" />
            )}
          </button>
        </div>

        {/* Collapse / Expand Toggle */}
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="p-1 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas)] text-[var(--ink-3)] hover:text-[var(--ink)] transition-colors"
            title={isCollapsed ? 'Expand Console' : 'Collapse Console'}
          >
            {isCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

      {/* Tab Content Area */}
      {!isCollapsed && (
        <div className="flex-1 p-4 overflow-auto font-mono text-xs text-[var(--ink)]">
          {/* TAB 1: TEST CASES & SUBMISSION EVALUATION */}
          {activeTab === 'tests' && (
            <div className="space-y-4">
              {submissionResult ? (
                <div className="space-y-4">
                  {/* Summary Banner */}
                  <div
                    className={`p-3.5 rounded-xl border flex items-center justify-between ${
                      submissionResult.passed
                        ? 'border-[var(--green)] bg-[var(--green-tint)] text-[var(--green)]'
                        : 'border-[var(--red)] bg-[var(--red-tint)] text-[var(--red)]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {submissionResult.passed ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <XCircle className="w-5 h-5" />
                      )}
                      <div>
                        <div className="text-sm font-bold">
                          {submissionResult.passed
                            ? 'Accepted! All Test Cases Passed 🎉'
                            : 'Wrong Answer / Test Cases Failed'}
                        </div>
                        <div className="text-xs opacity-80">
                          Passed {submissionResult.passedTests} of {submissionResult.totalTests} tests
                        </div>
                      </div>
                    </div>
                    {typeof submissionResult.executionTimeMs === 'number' && (
                      <div className="flex items-center gap-1 text-xs font-mono opacity-80">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{submissionResult.executionTimeMs} ms</span>
                      </div>
                    )}
                  </div>

                  {/* Individual Test Items */}
                  <div className="space-y-2.5">
                    {submissionResult.results.map((res, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border transition-all ${
                          res.passed
                            ? 'border-[var(--green)]/40 bg-[var(--canvas)]'
                            : 'border-[var(--red)]/40 bg-[var(--red-tint)]/20'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {res.passed ? (
                              <span className="w-5 h-5 rounded-full bg-[var(--green-tint)] border border-[var(--green)] flex items-center justify-center text-[var(--green)]">
                                <Check className="w-3 h-3" />
                              </span>
                            ) : (
                              <span className="w-5 h-5 rounded-full bg-[var(--red-tint)] border border-[var(--red)] flex items-center justify-center text-[var(--red)]">
                                <X className="w-3 h-3" />
                              </span>
                            )}
                            <span className="font-bold text-xs text-[var(--ink)]">
                              Test #{idx + 1}: {res.description}
                            </span>
                          </div>
                          <span
                            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                              res.passed
                                ? 'bg-[var(--green-tint)] text-[var(--green)]'
                                : 'bg-[var(--red-tint)] text-[var(--red)]'
                            }`}
                          >
                            {res.passed ? 'PASSED' : 'FAILED'}
                          </span>
                        </div>

                        {!res.passed && res.error && (
                          <div className="mt-2 text-xs text-[var(--red)] pl-7">
                            Error: {res.error}
                          </div>
                        )}
                        {!res.passed && (res.actual !== undefined || res.expected !== undefined) && (
                          <div className="mt-2 text-[11px] text-[var(--ink-3)] pl-7 font-mono">
                            <div>Expected: {typeof res.expected === 'object' ? JSON.stringify(res.expected) : String(res.expected)}</div>
                            <div>Actual: {typeof res.actual === 'object' ? JSON.stringify(res.actual) : String(res.actual)}</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-xs text-[var(--ink-3)]">
                    Click <strong>&quot;Submit&quot;</strong> to evaluate your query against all automated test assertions:
                  </div>
                  <div className="space-y-2">
                    {testCases.map((tc, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-raised)] flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full border border-[var(--canvas-border)] bg-[var(--canvas)] flex items-center justify-center text-[10px] text-[var(--ink-3)]">
                            {idx + 1}
                          </span>
                          <span className="font-bold text-xs text-[var(--ink)]">
                            {tc.description}
                          </span>
                        </div>
                        <span className="text-[10px] text-[var(--ink-4)] font-mono uppercase">
                          {tc.assertion}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: QUERY OUTPUT TABLE */}
          {activeTab === 'output' && (
            <div>
              {executionResult ? (
                executionResult.success ? (
                  executionResult.columns && executionResult.columns.length > 0 ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-[var(--ink-3)]">
                        <span>
                          Returned <strong>{executionResult.rowCount}</strong> row{executionResult.rowCount === 1 ? '' : 's'}
                        </span>
                        {typeof executionResult.executionTimeMs === 'number' && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-[var(--blue)]" />
                            {executionResult.executionTimeMs} ms
                          </span>
                        )}
                      </div>

                      <div className="overflow-x-auto rounded-xl border border-[var(--canvas-border)] shadow-[var(--shadow-sm)]">
                        <table className="min-w-full divide-y divide-[var(--canvas-border)] text-xs font-mono">
                          <thead className="bg-[var(--canvas-raised)]">
                            <tr>
                              {executionResult.columns.map((col, idx) => (
                                <th
                                  key={idx}
                                  className="px-3 py-2 text-left font-bold text-[var(--ink)] whitespace-nowrap border-r last:border-r-0 border-[var(--canvas-border)]"
                                >
                                  {col}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[var(--canvas-border)] bg-[var(--canvas)]">
                            {executionResult.values && executionResult.values.length > 0 ? (
                              executionResult.values.map((row, rIdx) => (
                                <tr key={rIdx} className="hover:bg-[var(--canvas-sunken)]">
                                  {row.map((cell: any, cIdx: number) => (
                                    <td
                                      key={cIdx}
                                      className="px-3 py-2 text-[var(--ink-2)] whitespace-nowrap border-r last:border-r-0 border-[var(--canvas-border)]"
                                    >
                                      {cell === null ? (
                                        <span className="text-[var(--ink-4)] italic">null</span>
                                      ) : (
                                        String(cell)
                                      )}
                                    </td>
                                  ))}
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td
                                  colSpan={executionResult.columns.length}
                                  className="px-4 py-6 text-center text-xs text-[var(--ink-3)] italic"
                                >
                                  Query executed successfully, but returned 0 rows.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 text-center text-xs text-[var(--ink-3)]">
                      Query executed successfully (no columns returned).
                    </div>
                  )
                ) : (
                  <div className="p-4 rounded-xl border border-[var(--red)] bg-[var(--red-tint)] text-[var(--red)] space-y-2">
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <AlertTriangle className="w-4 h-4" />
                      <span>SQL Execution Error</span>
                    </div>
                    <div className="font-mono text-xs leading-relaxed">
                      {executionResult.error}
                    </div>
                  </div>
                )
              ) : (
                <div className="p-8 text-center text-xs text-[var(--ink-3)] space-y-2">
                  <div className="text-2xl">⚡</div>
                  <div>No query output yet.</div>
                  <div>
                    Click <strong>&quot;Run&quot;</strong> or press <kbd className="px-1.5 py-0.5 rounded border border-[var(--canvas-border)] bg-[var(--canvas-raised)]">Ctrl+Enter</kbd> to execute your SQL against the database.
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CONSOLE & LOGS */}
          {activeTab === 'logs' && (
            <div className="space-y-3">
              {hasError ? (
                <div className="p-4 rounded-xl border border-[var(--red)] bg-[var(--red-tint)] text-[var(--red)] space-y-2">
                  <div className="font-bold text-xs flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>SQLite Diagnostic Message:</span>
                  </div>
                  <pre className="font-mono text-xs whitespace-pre-wrap">{executionResult?.error}</pre>
                </div>
              ) : (
                <div className="p-4 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-raised)] space-y-2">
                  <div className="text-xs font-bold text-[var(--ink)] flex items-center gap-1.5">
                    <Terminal className="w-4 h-4 text-[var(--blue)]" />
                    <span>Engine Status: Active</span>
                  </div>
                  <div className="text-xs text-[var(--ink-3)]">
                    SQLite WASM engine is running inside your browser. Per-query state resets automatically on submission to guarantee clean reproducibility.
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
