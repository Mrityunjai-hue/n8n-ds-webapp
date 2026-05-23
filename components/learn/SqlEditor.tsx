'use client';

import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { useSqlJs } from '@/lib/hooks/useSqlJs';
import { Button } from '../ui/Button';
import { 
  Play, RotateCcw, Database as DbIcon, AlertCircle, Loader2, 
  Table as TableIcon, BookOpen, HelpCircle, ChevronRight, Copy, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BreakdownItem {
  line: string;
  explanation: string;
}

interface SqlEditorProps {
  initialQuery: string;
  breakdown?: BreakdownItem[];
  hint?: string;
}

export const SqlEditor: React.FC<SqlEditorProps> = ({ initialQuery, breakdown = [], hint }) => {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<{ columns: string[], values: any[] }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<'results' | 'breakdown' | 'hints'>('results');
  const [hintStep, setHintStep] = useState(1);
  const [copied, setCopied] = useState(false);
  const { runQuery, isLoading: isDbLoading } = useSqlJs();

  const handleRun = () => {
    setIsRunning(true);
    setError(null);
    setActiveTab('results');
    
    const res = runQuery(query);
    
    if (res.error) {
      setError(res.error);
      setResults([]);
    } else {
      setResults(res.results || []);
    }
    setIsRunning(false);
  };

  const handleReset = () => {
    setQuery(initialQuery);
    setResults([]);
    setError(null);
    setHintStep(1);
    setActiveTab('results');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(query);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const tabs = [
    { id: 'results', label: 'Results', icon: TableIcon, show: true },
    { id: 'breakdown', label: 'Code Breakdown', icon: BookOpen, show: breakdown.length > 0 },
    { id: 'hints', label: 'Get Hint', icon: HelpCircle, show: true },
  ].filter(t => t.show) as { id: 'results' | 'breakdown' | 'hints'; label: string; icon: any }[];

  return (
    <div className="flex flex-col border border-border/50 rounded-modal overflow-hidden bg-bg-surface shadow-xl relative backdrop-blur-md">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-bg-elevated/70 border-b border-border/60">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-4 select-none">
            <div className="w-3 h-3 rounded-full bg-danger/50" />
            <div className="w-3 h-3 rounded-full bg-accent-amber/50" />
            <div className="w-3 h-3 rounded-full bg-success/50" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
            <DbIcon className="w-4 h-4 text-accent-teal" />
            SQLite 3.0 (WASM)
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* Copy Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-8 px-2.5 hover:bg-bg-surface/50 border border-border/40 text-text-secondary hover:text-text-primary text-xs gap-1.5"
            title="Copy Query"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-accent-teal" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
          </Button>

          <Button 
            variant="secondary" 
            size="sm" 
            onClick={handleReset}
            className="h-8 px-3 text-xs gap-1.5 border-border/40 hover:bg-bg-surface/50"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </Button>
          
          <Button 
            variant="primary" 
            size="sm" 
            onClick={handleRun}
            isLoading={isRunning}
            disabled={isDbLoading}
            className="h-8 px-4 text-xs gap-1.5 bg-gradient-to-r from-accent-teal to-accent-purple border-none shadow-md shadow-accent-teal/10 hover:opacity-95"
          >
            <Play className="w-3 h-3 fill-current text-text-inverse" /> 
            <span className="text-text-inverse">Run Query</span>
          </Button>
        </div>
      </div>

      {/* Main Workspace split panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 h-[420px]">
        
        {/* Left Side: Monaco Editor */}
        <div className="border-r border-border/40 relative h-full">
          <Editor
            height="100%"
            defaultLanguage="sql"
            theme="vs-dark"
            value={query}
            onChange={(val) => setQuery(val || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 13.5,
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
            <div className="absolute inset-0 bg-bg-surface/85 backdrop-blur-sm flex flex-col items-center justify-center z-10 select-none">
              <Loader2 className="w-8 h-8 text-accent-teal animate-spin mb-4" />
              <p className="text-sm font-bold animate-pulse text-text-primary">Initializing Database...</p>
            </div>
          )}
        </div>

        {/* Right Side: Tabbed Panel Workspace */}
        <div className="flex flex-col bg-bg-primary/40 font-mono text-sm overflow-hidden h-full">
          
          {/* Right Panel Tabs Header */}
          <div className="px-4 border-b border-border/40 flex items-center bg-bg-elevated/40 justify-between">
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg border transition-all cursor-pointer shrink-0
                      ${isActive 
                        ? 'border-accent-teal/30 text-accent-teal bg-accent-teal/5' 
                        : 'border-transparent text-text-secondary hover:text-text-primary'
                      }
                    `}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
            
            {error && <AlertCircle className="w-3.5 h-3.5 text-danger shrink-0 animate-pulse" />}
          </div>

          {/* Right Panel Content Container */}
          <div className="flex-grow overflow-y-auto p-5 no-scrollbar select-text">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                
                {/* 1. Results Tab */}
                {activeTab === 'results' && (
                  <div className="font-mono text-xs leading-relaxed h-full flex flex-col">
                    {error ? (
                      <pre className="text-danger/90 whitespace-pre-wrap bg-danger/5 p-4 rounded-xl border border-danger/20">{error}</pre>
                    ) : results.length > 0 ? (
                      <div className="flex flex-col gap-4">
                        {results.map((result, index) => (
                          <div key={index} className="relative border border-border/50 rounded-xl overflow-hidden">
                            <div className="bg-bg-elevated px-3 py-1.5 text-[10px] text-text-secondary border-b border-border/50 flex items-center gap-2">
                              <TableIcon className="w-3 h-3" /> Result {index + 1} — {result.values.length} row{result.values.length !== 1 ? 's' : ''}
                            </div>
                            <div className="overflow-auto max-h-[280px] no-scrollbar">
                              <table className="w-full text-left text-xs font-mono">
                                <thead className="bg-bg-elevated sticky top-0 z-10">
                                  <tr>
                                    {result.columns.map((col) => (
                                      <th key={col} className="px-4 py-2 border-b border-border text-text-secondary uppercase tracking-tighter">
                                        {col}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {result.values.map((row, i) => (
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
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center h-full opacity-35 py-12 select-none">
                        <TableIcon className="w-8 h-8 text-text-secondary mb-3" />
                        <p className="text-xs italic text-text-secondary">Run a query to see results here.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. Code Line-by-Line Breakdown Tab */}
                {activeTab === 'breakdown' && breakdown.length > 0 && (
                  <div className="space-y-4">
                    {breakdown.map((item, idx) => (
                      <div 
                        key={idx} 
                        className="flex flex-col border border-border/40 rounded-xl overflow-hidden bg-bg-surface/30 backdrop-blur-sm"
                      >
                        <div className="px-3.5 py-2 bg-bg-elevated/40 border-b border-border/20 text-[10px] font-mono text-accent-teal font-bold truncate">
                          {item.line}
                        </div>
                        <div className="p-3 text-[11px] text-text-secondary leading-relaxed font-sans">
                          {item.explanation}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 3. Help & Hints Tab */}
                {activeTab === 'hints' && (
                  <div className="space-y-5 h-full flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2.5 pb-2 border-b border-border/20">
                        <HelpCircle className="w-4.5 h-4.5 text-accent-amber" />
                        <span className="text-xs font-bold text-text-primary uppercase tracking-wider font-sans">Need assistance?</span>
                      </div>
                      
                      <div className="p-4 bg-bg-surface/40 border border-border/40 rounded-xl space-y-3 font-sans">
                        <div className="text-[10px] font-bold text-accent-amber uppercase tracking-wider">Hint Level {hintStep} of 2</div>
                        <p className="text-xs leading-relaxed text-text-secondary">
                          {hintStep === 1 
                            ? (hint ? "Tip: Look closely at the SQL clause structure." : "Make sure your SQL syntax is correct. Try SELECT, FROM, WHERE, JOIN clauses carefully.")
                            : (hint || "Double-check your table and column names. Use aliases (AS) for clarity, and check JOIN conditions match the right columns.")}
                        </p>
                      </div>
                    </div>

                    {hint && hintStep < 2 && (
                      <button
                        onClick={() => setHintStep(2)}
                        className="w-full flex items-center justify-center gap-1.5 py-2.5 border border-accent-amber/35 hover:bg-accent-amber/5 rounded-xl text-xs font-bold text-accent-amber hover:text-accent-amber/90 transition-all cursor-pointer font-sans"
                      >
                        <span>Reveal Next Hint</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
};
