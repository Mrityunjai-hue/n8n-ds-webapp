'use client';

import React, { useState } from 'react';
import { TableSchema } from '@/lib/code/types';
import { Database, Key, ArrowUpRight, ChevronDown, ChevronRight, Eye, Sparkles } from 'lucide-react';

interface SchemaViewerProps {
  schemas: TableSchema[];
  seedSql?: string;
  onOpenSynthesizer?: () => void;
}

export const SchemaViewer: React.FC<SchemaViewerProps> = ({ schemas, seedSql, onOpenSynthesizer }) => {
  const [showSeedSql, setShowSeedSql] = useState(false);
  const [expandedTables, setExpandedTables] = useState<Record<string, boolean>>(() => {
    // Expand all tables by default
    const init: Record<string, boolean> = {};
    schemas.forEach((s) => {
      init[s.name] = true;
    });
    return init;
  });

  const toggleTable = (tableName: string) => {
    setExpandedTables((prev) => ({
      ...prev,
      [tableName]: !prev[tableName],
    }));
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Overview Card */}
      <div className="rounded-2xl border border-[var(--canvas-border)] bg-[var(--canvas-raised)] p-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-[var(--blue)]" />
            <h2 className="text-lg font-bold font-heading" style={{ color: 'var(--ink)' }}>
              Database Tables ({schemas.length})
            </h2>
          </div>
          <div className="flex items-center gap-1.5">
            {onOpenSynthesizer && (
              <button
                onClick={onOpenSynthesizer}
                className="text-xs font-mono px-2.5 py-1 rounded-lg border border-[var(--blue)] bg-[var(--blue-tint)] hover:brightness-105 text-[var(--blue)] font-bold transition-all flex items-center gap-1 cursor-pointer"
                title="Synthesize custom test table"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>+ Fabricate Table</span>
              </button>
            )}
            {seedSql && (
              <button
                onClick={() => setShowSeedSql(!showSeedSql)}
                className="text-xs font-mono px-2 py-1 rounded border border-[var(--canvas-border)] bg-[var(--canvas)] hover:bg-[var(--canvas-sunken)] text-[var(--ink-2)] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-[var(--yellow)]" />
                <span>{showSeedSql ? 'Hide DDL' : 'View Seed DDL'}</span>
              </button>
            )}
          </div>
        </div>
        <p className="text-xs text-[var(--ink-3)] font-mono">
          Each challenge runs inside an isolated in-memory SQLite sandbox with the following pre-loaded tables.
        </p>

        {showSeedSql && seedSql && (
          <div className="mt-3 p-3 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-sunken)] font-mono text-xs overflow-x-auto">
            <pre className="text-[var(--ink)]">{seedSql.trim()}</pre>
          </div>
        )}
      </div>

      {/* Tables Breakdown */}
      <div className="space-y-4">
        {schemas.map((schema) => {
          const isExpanded = expandedTables[schema.name] ?? true;

          return (
            <div
              key={schema.name}
              className="rounded-2xl border-2 border-[var(--canvas-border)] bg-[var(--canvas)] shadow-[var(--shadow-sm)] overflow-hidden"
            >
              {/* Table Header Bar */}
              <button
                onClick={() => toggleTable(schema.name)}
                className="w-full px-4 py-3 bg-[var(--canvas-raised)] border-b border-[var(--canvas-border)] flex items-center justify-between text-left hover:bg-[var(--canvas-sunken)] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-[var(--ink-3)]" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-[var(--ink-3)]" />
                  )}
                  <span className="font-mono text-sm font-bold text-[var(--ink)]">
                    {schema.name}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full border border-[var(--canvas-border)] bg-[var(--canvas)] text-[var(--ink-3)]">
                    {schema.columns.length} columns
                  </span>
                </div>

                {schema.description && (
                  <span className="text-xs text-[var(--ink-3)] font-mono hidden sm:inline truncate max-w-xs">
                    {schema.description}
                  </span>
                )}
              </button>

              {isExpanded && (
                <div className="p-4 space-y-4">
                  {/* Columns Definition Table */}
                  <div className="overflow-x-auto rounded-xl border border-[var(--canvas-border)]">
                    <table className="min-w-full divide-y divide-[var(--canvas-border)] text-xs font-mono">
                      <thead className="bg-[var(--canvas-raised)]">
                        <tr>
                          <th className="px-3 py-2 text-left font-bold text-[var(--ink)]">Column</th>
                          <th className="px-3 py-2 text-left font-bold text-[var(--ink)]">Type</th>
                          <th className="px-3 py-2 text-left font-bold text-[var(--ink)]">Key / Nullable</th>
                          <th className="px-3 py-2 text-left font-bold text-[var(--ink)]">Notes</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--canvas-border)] bg-[var(--canvas)]">
                        {schema.columns.map((col) => (
                          <tr key={col.name} className="hover:bg-[var(--canvas-sunken)]">
                            <td className="px-3 py-2.5 font-bold text-[var(--ink)] whitespace-nowrap">
                              {col.name}
                            </td>
                            <td className="px-3 py-2.5 text-[var(--blue)] font-medium whitespace-nowrap">
                              {col.type}
                            </td>
                            <td className="px-3 py-2.5 whitespace-nowrap space-x-1">
                              {col.isPrimaryKey && (
                                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-[var(--yellow-tint)] text-[var(--ink)] border border-[var(--yellow)]">
                                  <Key className="w-2.5 h-2.5 text-[var(--yellow)]" />
                                  <span>PK</span>
                                </span>
                              )}
                              {col.isForeignKey && col.references && (
                                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-[var(--blue-tint)] text-[var(--blue)] border border-[var(--blue)]">
                                  <ArrowUpRight className="w-2.5 h-2.5" />
                                  <span>FK &rarr; {col.references.table}.{col.references.column}</span>
                                </span>
                              )}
                              {!col.isPrimaryKey && col.nullable && (
                                <span className="text-[10px] text-[var(--ink-4)] italic">
                                  nullable
                                </span>
                              )}
                            </td>
                            <td className="px-3 py-2.5 text-[var(--ink-2)] text-[11px]">
                              {col.description || '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Sample Rows Preview */}
                  {schema.sample_rows && schema.sample_rows.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-mono text-[var(--ink-3)] font-semibold uppercase tracking-wider">
                        Sample Preview Rows ({schema.sample_rows.length})
                      </div>
                      <div className="overflow-x-auto rounded-xl border border-[var(--canvas-border)]">
                        <table className="min-w-full divide-y divide-[var(--canvas-border)] text-xs font-mono">
                          <thead className="bg-[var(--canvas-sunken)]">
                            <tr>
                              {schema.columns.map((col) => (
                                <th
                                  key={col.name}
                                  className="px-3 py-1.5 text-left font-semibold text-[var(--ink-2)]"
                                >
                                  {col.name}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[var(--canvas-border)] bg-[var(--canvas)]">
                            {schema.sample_rows.map((row: Record<string, any>, rIdx: number) => (
                              <tr key={rIdx} className="hover:bg-[var(--canvas-sunken)]">
                                {schema.columns.map((col) => (
                                  <td
                                    key={col.name}
                                    className="px-3 py-1.5 text-[var(--ink-2)] whitespace-nowrap"
                                  >
                                    {row[col.name] === null ? (
                                      <span className="text-[var(--ink-4)] italic font-mono">null</span>
                                    ) : (
                                      String(row[col.name])
                                    )}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
