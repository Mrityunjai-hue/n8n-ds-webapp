'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { ColumnDef, TableSchema } from '@/lib/code/types';
import {
  classifyTableDomain,
  inferColumnTypeAndConstraints,
  synthesizeTableData,
  suggestMissingColumns,
} from '@/lib/code/engine/dataSynthesizer';
import { DOMAIN_CATEGORIES, TABLE_ARCHETYPES } from '@/lib/code/engine/schemaKnowledgeBase';
import {
  Sparkles,
  Database,
  Play,
  Copy,
  Check,
  Plus,
  Trash2,
  Cpu,
  Layers,
  Sliders,
  CheckCircle2,
  Table as TableIcon,
  RefreshCw,
  Lightbulb,
  ArrowRight,
  Code,
} from 'lucide-react';

interface DataSynthesizerPanelProps {
  onInjectToDb: (sql: string, tableName: string, rowCount: number) => void;
  onInsertToEditor: (sql: string) => void;
  activeSchemas: TableSchema[];
}

export const DataSynthesizerPanel: React.FC<DataSynthesizerPanelProps> = ({
  onInjectToDb,
  onInsertToEditor,
  activeSchemas,
}) => {
  // User input table name
  const [tableNameInput, setTableNameInput] = useState('shopify_orders');
  const [rowCount, setRowCount] = useState(25);
  const [copied, setCopied] = useState(false);
  const [injectedNotification, setInjectedNotification] = useState<string | null>(null);

  // New column input fields
  const [newColName, setNewColName] = useState('');
  const [newColType, setNewColType] = useState<ColumnDef['type']>('TEXT');

  // Classification info
  const classification = useMemo(() => {
    return classifyTableDomain(tableNameInput);
  }, [tableNameInput]);

  // Working columns state (initialized from matched archetype or inferred)
  const [columns, setColumns] = useState<ColumnDef[]>(() => {
    const initial = classifyTableDomain('shopify_orders');
    if (initial.matchedArchetype) {
      return [...initial.matchedArchetype.canonicalColumns];
    }
    return [
      { name: 'id', type: 'INTEGER', nullable: false, isPrimaryKey: true, description: 'Primary key' },
      { name: 'name', type: 'TEXT', nullable: false, description: 'Entity title' },
      { name: 'status', type: 'TEXT', nullable: false, description: 'State enum' },
      { name: 'created_at', type: 'DATETIME', nullable: false, description: 'Creation timestamp' },
    ];
  });

  // When user selects a preset archetype or types a new table name, sync initial columns
  const handleSelectPreset = (archetypeId: string) => {
    const arch = TABLE_ARCHETYPES.find((a) => a.id === archetypeId);
    if (arch) {
      setTableNameInput(arch.tableName);
      setColumns([...arch.canonicalColumns]);
    }
  };

  // Re-infer default columns if user clicks "Auto-Populate Columns"
  const handleAutoInferColumns = () => {
    if (classification.matchedArchetype) {
      setColumns([...classification.matchedArchetype.canonicalColumns]);
    } else {
      const clean = tableNameInput.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_') || 'entity';
      setColumns([
        { name: `${clean}_id`, type: 'INTEGER', nullable: false, isPrimaryKey: true, description: 'Primary key' },
        { name: 'name', type: 'TEXT', nullable: false, description: 'Entity label or title' },
        { name: 'category', type: 'TEXT', nullable: false, description: 'Classification group' },
        { name: 'amount', type: 'REAL', nullable: false, description: 'Monetary decimal value' },
        { name: 'status', type: 'TEXT', nullable: false, description: 'Lifecycle status' },
        { name: 'created_at', type: 'DATETIME', nullable: false, description: 'Timestamp' },
        { name: 'is_active', type: 'BOOLEAN', nullable: false, description: 'Active boolean flag' },
      ]);
    }
  };

  // Synthesize dataset in real-time
  const synthesized = useMemo(() => {
    return synthesizeTableData(tableNameInput, columns, rowCount);
  }, [tableNameInput, columns, rowCount]);

  // Missing column suggestions
  const missingSuggestions = useMemo(() => {
    return suggestMissingColumns(tableNameInput, columns);
  }, [tableNameInput, columns]);

  // Add column
  const handleAddColumn = () => {
    const trimmed = newColName.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');
    if (!trimmed) return;
    if (columns.some((c) => c.name.toLowerCase() === trimmed)) return;

    const inferred = inferColumnTypeAndConstraints(trimmed, tableNameInput);
    setColumns((prev) => [
      ...prev,
      {
        name: trimmed,
        type: newColType || inferred.type,
        nullable: inferred.nullable,
        isPrimaryKey: inferred.isPrimaryKey,
        isForeignKey: inferred.isForeignKey,
        references: inferred.references,
        description: inferred.description,
      },
    ]);
    setNewColName('');
  };

  // Add suggested column
  const handleAddSuggestedColumn = (col: ColumnDef) => {
    setColumns((prev) => [...prev, col]);
  };

  // Remove column
  const handleRemoveColumn = (colName: string) => {
    setColumns((prev) => prev.filter((c) => c.name !== colName));
  };

  // Toggle PK
  const handleTogglePk = (colName: string) => {
    setColumns((prev) =>
      prev.map((c) => {
        if (c.name === colName) {
          return { ...c, isPrimaryKey: !c.isPrimaryKey, nullable: false };
        }
        return c;
      })
    );
  };

  // Toggle Nullable
  const handleToggleNullable = (colName: string) => {
    setColumns((prev) =>
      prev.map((c) => {
        if (c.name === colName && !c.isPrimaryKey) {
          return { ...c, nullable: !c.nullable };
        }
        return c;
      })
    );
  };

  // Change column type
  const handleChangeColType = (colName: string, newType: ColumnDef['type']) => {
    setColumns((prev) =>
      prev.map((c) => {
        if (c.name === colName) {
          return { ...c, type: newType };
        }
        return c;
      })
    );
  };

  // Copy SQL
  const handleCopySql = async () => {
    try {
      await navigator.clipboard.writeText(synthesized.fullSql);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  // Inject to DB
  const handleInject = () => {
    onInjectToDb(synthesized.fullSql, synthesized.tableName, rowCount);
    setInjectedNotification(`✨ Table "${synthesized.tableName}" with ${rowCount} rows injected directly into active SQLite WASM sandbox!`);
    setTimeout(() => setInjectedNotification(null), 4500);
  };

  return (
    <div className="space-y-6 pb-12 font-mono">
      {/* 1. Header Banner */}
      <div className="rounded-2xl border-2 border-[var(--canvas-border)] bg-[var(--canvas-raised)] p-4 space-y-2 shadow-[var(--shadow-sm)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[var(--blue-tint)] border border-[var(--blue)] flex items-center justify-center text-[var(--blue)]">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold font-heading text-[var(--ink)] leading-none">
                ML Schema &amp; Data Synthesizer
              </h2>
              <span className="text-[11px] text-[var(--ink-3)] font-mono">
                Statistical pattern generator trained on 1,000+ domain schemas
              </span>
            </div>
          </div>

          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-[var(--green)] bg-[var(--green-tint)] text-[var(--green)] flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>Active Engine</span>
          </span>
        </div>

        <p className="text-xs text-[var(--ink-2)] leading-relaxed">
          Type any table name or choose an industry domain archetype. The engine automatically classifies the domain, predicts optimal column constraints, and synthesizes authentic data distributions directly in your SQLite sandbox.
        </p>

        {injectedNotification && (
          <div className="p-3 rounded-xl border border-[var(--green)] bg-[var(--green-tint)] text-[var(--green)] text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{injectedNotification}</span>
          </div>
        )}
      </div>

      {/* 2. Domain Quick Presets Chips */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-[var(--ink-3)] uppercase tracking-wider flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-[var(--yellow)]" />
          <span>Select Domain Archetype</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {TABLE_ARCHETYPES.slice(0, 8).map((arch) => (
            <button
              key={arch.id}
              onClick={() => handleSelectPreset(arch.id)}
              className={`text-xs px-2.5 py-1 rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
                tableNameInput.toLowerCase() === arch.tableName.toLowerCase()
                  ? 'border-[var(--blue)] bg-[var(--blue-tint)] text-[var(--blue)] font-bold shadow-xs'
                  : 'border-[var(--canvas-border)] bg-[var(--canvas)] hover:bg-[var(--canvas-sunken)] text-[var(--ink-2)]'
              }`}
            >
              <span>{arch.tableName}</span>
              <span className="text-[10px] opacity-70">({arch.canonicalColumns.length} cols)</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Table Configuration & Classifier Card */}
      <div className="rounded-2xl border-2 border-[var(--canvas-border)] bg-[var(--canvas)] p-4 space-y-4 shadow-[var(--shadow-sm)]">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          {/* Table Name Input */}
          <div className="sm:col-span-8 space-y-1">
            <label className="text-xs font-bold text-[var(--ink)] block">
              Table Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={tableNameInput}
                onChange={(e) => setTableNameInput(e.target.value)}
                placeholder="e.g. stripe_charges, patient_vitals, flight_bookings"
                className="w-full text-xs px-3 py-2 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-sunken)] text-[var(--ink)] focus:outline-none focus:border-[var(--blue)] font-bold"
              />
            </div>
          </div>

          {/* Row Count Slider */}
          <div className="sm:col-span-4 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[var(--ink)]">Rows to Generate:</span>
              <span className="font-bold text-[var(--blue)]">{rowCount}</span>
            </div>
            <input
              type="range"
              min="10"
              max="250"
              step="5"
              value={rowCount}
              onChange={(e) => setRowCount(Number(e.target.value))}
              className="w-full accent-[var(--blue)] cursor-pointer"
            />
          </div>
        </div>

        {/* Prediction Feedback Pill */}
        <div className="p-2.5 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-raised)] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-base">🧠</span>
            <div>
              <span className="text-[var(--ink-3)]">Inferred Domain: </span>
              <span className="font-bold text-[var(--ink)]">{classification.domainName}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-[var(--blue)] bg-[var(--blue-tint)] text-[var(--blue)]">
              {Math.round(classification.confidence * 100)}% Match
            </span>
            <button
              onClick={handleAutoInferColumns}
              title="Reset columns to match this domain archetype"
              className="text-[11px] font-bold text-[var(--ink-2)] hover:text-[var(--ink)] flex items-center gap-1 underline cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Schema</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Column Schema Editor */}
      <div className="rounded-2xl border-2 border-[var(--canvas-border)] bg-[var(--canvas)] p-4 space-y-3 shadow-[var(--shadow-sm)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TableIcon className="w-4 h-4 text-[var(--blue)]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
              Column Architecture ({columns.length})
            </h3>
          </div>
        </div>

        {/* Columns Definition List */}
        <div className="overflow-x-auto rounded-xl border border-[var(--canvas-border)] max-h-60 overflow-y-auto">
          <table className="min-w-full divide-y divide-[var(--canvas-border)] text-xs">
            <thead className="bg-[var(--canvas-raised)] sticky top-0 z-10">
              <tr>
                <th className="px-3 py-2 text-left font-bold text-[var(--ink)]">Column Name</th>
                <th className="px-3 py-2 text-left font-bold text-[var(--ink)]">Type</th>
                <th className="px-3 py-2 text-center font-bold text-[var(--ink)]">PK</th>
                <th className="px-3 py-2 text-center font-bold text-[var(--ink)]">Nullable</th>
                <th className="px-3 py-2 text-right font-bold text-[var(--ink)]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--canvas-border)] bg-[var(--canvas)]">
              {columns.map((col) => (
                <tr key={col.name} className="hover:bg-[var(--canvas-sunken)]">
                  <td className="px-3 py-1.5 font-bold text-[var(--ink)] whitespace-nowrap">
                    {col.name}
                  </td>
                  <td className="px-3 py-1.5 whitespace-nowrap">
                    <select
                      value={col.type}
                      onChange={(e) => handleChangeColType(col.name, e.target.value as any)}
                      className="text-xs px-2 py-0.5 rounded border border-[var(--canvas-border)] bg-[var(--canvas-sunken)] text-[var(--blue)] font-bold cursor-pointer"
                    >
                      <option value="INTEGER">INTEGER</option>
                      <option value="TEXT">TEXT</option>
                      <option value="REAL">REAL</option>
                      <option value="DATETIME">DATETIME</option>
                      <option value="DATE">DATE</option>
                      <option value="BOOLEAN">BOOLEAN</option>
                    </select>
                  </td>
                  <td className="px-3 py-1.5 text-center whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={col.isPrimaryKey || false}
                      onChange={() => handleTogglePk(col.name)}
                      className="accent-[var(--yellow)] cursor-pointer"
                    />
                  </td>
                  <td className="px-3 py-1.5 text-center whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={col.nullable}
                      disabled={col.isPrimaryKey}
                      onChange={() => handleToggleNullable(col.name)}
                      className="accent-[var(--blue)] cursor-pointer disabled:opacity-30"
                    />
                  </td>
                  <td className="px-3 py-1.5 text-right whitespace-nowrap">
                    <button
                      onClick={() => handleRemoveColumn(col.name)}
                      disabled={columns.length <= 1}
                      className="p-1 rounded text-[var(--ink-4)] hover:text-red-500 disabled:opacity-20 cursor-pointer"
                      title="Delete Column"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add New Column Form */}
        <div className="flex items-center gap-2 pt-1">
          <input
            type="text"
            value={newColName}
            onChange={(e) => setNewColName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddColumn();
            }}
            placeholder="Add column (e.g. rating, churn_rate, country)"
            className="flex-1 text-xs px-3 py-1.5 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-sunken)] text-[var(--ink)] focus:outline-none focus:border-[var(--blue)]"
          />
          <select
            value={newColType}
            onChange={(e) => setNewColType(e.target.value as any)}
            className="text-xs px-2 py-1.5 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-sunken)] text-[var(--ink)] font-bold cursor-pointer"
          >
            <option value="TEXT">TEXT</option>
            <option value="INTEGER">INTEGER</option>
            <option value="REAL">REAL</option>
            <option value="DATETIME">DATETIME</option>
            <option value="BOOLEAN">BOOLEAN</option>
          </select>
          <button
            onClick={handleAddColumn}
            className="px-3 py-1.5 rounded-xl border border-[var(--blue)] bg-[var(--blue-tint)] text-[var(--blue)] font-bold text-xs flex items-center gap-1 hover:brightness-105 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>

        {/* Suggested Missing Columns */}
        {missingSuggestions.length > 0 && (
          <div className="pt-2 border-t border-[var(--canvas-border)] space-y-1.5">
            <div className="text-[11px] text-[var(--ink-3)] font-bold flex items-center gap-1">
              <Lightbulb className="w-3 h-3 text-[var(--yellow)]" />
              <span>Recommended Standard Columns:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {missingSuggestions.map((col) => (
                <button
                  key={col.name}
                  onClick={() => handleAddSuggestedColumn(col)}
                  className="text-[10px] font-mono px-2 py-0.5 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-raised)] hover:bg-[var(--canvas-sunken)] text-[var(--ink-2)] hover:text-[var(--ink)] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Plus className="w-2.5 h-2.5 text-[var(--green)]" />
                  <span className="font-bold">{col.name}</span>
                  <span className="opacity-60 text-[9px]">({col.type})</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 5. Live Synthetic Data Preview Table */}
      <div className="rounded-2xl border-2 border-[var(--canvas-border)] bg-[var(--canvas)] p-4 space-y-3 shadow-[var(--shadow-sm)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[var(--green)]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
              Synthetic Preview ({Math.min(5, synthesized.rows.length)} of {synthesized.rows.length} rows)
            </h3>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[var(--canvas-border)]">
          <table className="min-w-full divide-y divide-[var(--canvas-border)] text-xs">
            <thead className="bg-[var(--canvas-raised)]">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.name}
                    className="px-3 py-1.5 text-left font-bold text-[var(--ink-2)] whitespace-nowrap"
                  >
                    {col.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--canvas-border)] bg-[var(--canvas)]">
              {synthesized.rows.slice(0, 5).map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-[var(--canvas-sunken)]">
                  {columns.map((col) => (
                    <td
                      key={col.name}
                      className="px-3 py-1.5 text-[var(--ink-2)] whitespace-nowrap font-mono text-[11px]"
                    >
                      {row[col.name] === null ? (
                        <span className="text-[var(--ink-4)] italic">null</span>
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

      {/* 6. Execution & Ingestion Actions */}
      <div className="p-4 rounded-2xl border-2 border-[var(--canvas-border)] bg-[var(--canvas-raised)] space-y-3">
        <div className="text-xs font-bold text-[var(--ink)]">
          Deploy Synthetic Dataset to SQL Engine:
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {/* Primary Action: Direct SQLite WASM Sandbox Injection */}
          <button
            onClick={handleInject}
            className="btn-doodle-primary py-2.5 px-3 rounded-xl font-mono font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:brightness-110 cursor-pointer text-white"
          >
            <Play className="w-3.5 h-3.5 fill-current text-[var(--yellow)]" />
            <span>Inject to SQLite WASM</span>
          </button>

          {/* Secondary Action: Insert SQL into Editor */}
          <button
            onClick={() => onInsertToEditor(synthesized.fullSql)}
            className="btn-doodle-secondary py-2.5 px-3 rounded-xl font-mono font-bold text-xs flex items-center justify-center gap-1.5 border-2 border-[var(--canvas-border)] bg-[var(--canvas)] text-[var(--ink)] hover:bg-[var(--canvas-sunken)] cursor-pointer"
          >
            <Code className="w-3.5 h-3.5 text-[var(--blue)]" />
            <span>Insert into Editor</span>
          </button>

          {/* Tertiary Action: Copy SQL to clipboard */}
          <button
            onClick={handleCopySql}
            className="py-2.5 px-3 rounded-xl font-mono font-bold text-xs flex items-center justify-center gap-1.5 border border-[var(--canvas-border)] bg-[var(--canvas)] text-[var(--ink-2)] hover:text-[var(--ink)] hover:bg-[var(--canvas-sunken)] transition-colors cursor-pointer"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-[var(--green)]" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span>{copied ? 'Copied!' : 'Copy SQL'}</span>
          </button>
        </div>
      </div>

      {/* 7. Recommended Analytical Queries */}
      {classification.matchedArchetype?.recommendedQueries && (
        <div className="rounded-2xl border-2 border-[var(--canvas-border)] bg-[var(--canvas)] p-4 space-y-3 shadow-[var(--shadow-sm)]">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-[var(--yellow)]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
              Recommended ML Analytical Queries
            </h3>
          </div>

          <div className="space-y-3">
            {classification.matchedArchetype.recommendedQueries.map((q, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-raised)] space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--ink)]">{q.title}</span>
                  <button
                    onClick={() => onInsertToEditor(q.sql)}
                    className="text-[10px] font-bold px-2 py-0.5 rounded border border-[var(--blue)] bg-[var(--blue-tint)] text-[var(--blue)] hover:brightness-105 cursor-pointer flex items-center gap-1"
                  >
                    <span>Use Query</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </button>
                </div>
                <p className="text-[11px] text-[var(--ink-3)] leading-relaxed">
                  {q.description}
                </p>
                <pre className="p-2 rounded-lg bg-[var(--canvas-sunken)] border border-[var(--canvas-border)] text-[10px] text-[var(--ink-2)] overflow-x-auto">
                  {q.sql}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
