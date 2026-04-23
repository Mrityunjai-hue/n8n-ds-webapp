'use client';

import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { useSqlJs } from '@/lib/hooks/useSqlJs';
import { Button } from '../ui/Button';
import { Play, RotateCcw, Database as DbIcon, AlertCircle, Loader2, Table as TableIcon } from 'lucide-react';

interface SqlEditorProps {
  initialQuery: string;
}

export const SqlEditor: React.FC<SqlEditorProps> = ({ initialQuery }) => {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<{ columns: string[], values: any[] }>({ columns: [], values: [] });
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const { runQuery, isLoading: isDbLoading } = useSqlJs();

  const handleRun = () => {
    setIsRunning(true);
    setError(null);
    
    const result = runQuery(query);
    
    if (result.error) {
      setError(result.error);
      setResults({ columns: [], values: [] });
    } else {
      setResults({ columns: result.columns, values: result.values });
    }
    setIsRunning(false);
  };

  const handleReset = () => {
    setQuery(initialQuery);
    setResults({ columns: [], values: [] });
    setError(null);
  };

  return (
    <div className="flex flex-col border border-border rounded-modal overflow-hidden bg-bg-surface shadow-xl">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-bg-elevated border-b border-border">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-4">
            <div className="w-3 h-3 rounded-full bg-danger/50" />
            <div className="w-3 h-3 rounded-full bg-accent-amber/50" />
            <div className="w-3 h-3 rounded-full bg-success/50" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
            <DbIcon className="w-4 h-4" />
            SQLite 3.0 (WASM)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={handleReset}
            className="h-8 px-3 text-xs gap-1.5"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </Button>
          <Button 
            variant="primary" 
            size="sm" 
            onClick={handleRun}
            isLoading={isRunning}
            disabled={isDbLoading}
            className="h-8 px-3 text-xs gap-1.5"
          >
            <Play className="w-3 h-3 fill-current" /> Run Query
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 h-[400px]">
        {/* Editor Side */}
        <div className="border-r border-border relative">
          <Editor
            height="100%"
            defaultLanguage="sql"
            theme="vs-dark"
            value={query}
            onChange={(val) => setQuery(val || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: 'var(--font-jetbrains)',
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              readOnly: isDbLoading,
              padding: { top: 16, bottom: 16 },
              automaticLayout: true,
            }}
          />
          {isDbLoading && (
            <div className="absolute inset-0 bg-bg-surface/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
              <Loader2 className="w-8 h-8 text-accent-teal animate-spin mb-4" />
              <p className="text-sm font-bold animate-pulse">Initializing Database...</p>
            </div>
          )}
        </div>

        {/* Output Side (Table) */}
        <div className="flex flex-col bg-bg-primary overflow-hidden">
          <div className="px-4 py-2 bg-bg-elevated border-b border-border flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
              <TableIcon className="w-3 h-3" /> Results
            </span>
            {error && <AlertCircle className="w-3 h-3 text-danger" />}
          </div>
          <div className="flex-grow overflow-auto no-scrollbar">
            {error ? (
              <div className="p-4">
                <pre className="text-danger whitespace-pre-wrap font-mono text-xs">{error}</pre>
              </div>
            ) : results.columns.length > 0 ? (
              <div className="relative">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-bg-elevated sticky top-0 z-10">
                    <tr>
                      {results.columns.map((col) => (
                        <th key={col} className="px-4 py-2 border-b border-border text-text-secondary uppercase tracking-tighter">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {results.values.map((row, i) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-bg-elevated/50 transition-colors">
                        {row.map((val: any, j: number) => (
                          <td key={j} className="px-4 py-2 text-text-primary">
                            {val === null ? <span className="text-text-secondary italic opacity-30">null</span> : String(val)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-center p-8">
                <p className="text-text-secondary italic text-xs opacity-30">
                  Run a SELECT query to see results here...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
