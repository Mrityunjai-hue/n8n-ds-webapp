'use client';

import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { usePyodide } from '@/lib/hooks/usePyodide';
import { Button } from '../ui/Button';
import { 
  Play, 
  RotateCcw, 
  Terminal, 
  AlertCircle, 
  Loader2, 
  Copy, 
  Check, 
  BookOpen, 
  HelpCircle, 
  ChevronRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BreakdownItem {
  line: string;
  explanation: string;
}

interface InteractiveEditorProps {
  initialCode: string;
  breakdown?: BreakdownItem[];
  hint?: string;
}

export const InteractiveEditor: React.FC<InteractiveEditorProps> = ({ 
  initialCode, 
  breakdown = [], 
  hint 
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'terminal' | 'breakdown' | 'hints'>('terminal');
  const [hintStep, setHintStep] = useState(1);
  const { runCode, isLoading: isPyodideLoading, error: pyodideError } = usePyodide();

  // Reset tabs and hints on code challenge reset/change
  useEffect(() => {
    setCode(initialCode);
    setOutput('');
    setError(null);
    setHintStep(1);
    setActiveTab('terminal');
  }, [initialCode]);

  const handleRun = async () => {
    setIsRunning(true);
    setError(null);
    setOutput('');
    setActiveTab('terminal'); // Auto-switch to terminal on run
    
    const result = await runCode(code);
    
    if (result.error) {
      setError(result.error);
    } else {
      setOutput(result.output);
    }
    setIsRunning(false);
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput('');
    setError(null);
    setHintStep(1);
    setActiveTab('terminal');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const tabs = [
    { id: 'terminal', label: 'Terminal', icon: Terminal, show: true },
    { id: 'breakdown', label: 'Code Breakdown', icon: BookOpen, show: breakdown.length > 0 },
    { id: 'hints', label: 'Get Hint', icon: HelpCircle, show: true },
  ].filter(t => t.show) as { id: 'terminal' | 'breakdown' | 'hints'; label: string; icon: any }[];

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
            <Terminal className="w-4 h-4 text-accent-teal" />
            Python 3.11 (WASM)
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* Copy Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-8 px-2.5 hover:bg-bg-surface/50 border border-border/40 text-text-secondary hover:text-text-primary text-xs gap-1.5"
            title="Copy Code"
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
            disabled={isPyodideLoading}
            className="h-8 px-4 text-xs gap-1.5 bg-gradient-to-r from-accent-teal to-accent-purple border-none shadow-md shadow-accent-teal/10 hover:opacity-95"
          >
            <Play className="w-3 h-3 fill-current text-text-inverse" /> 
            <span className="text-text-inverse">Run Code</span>
          </Button>
        </div>
      </div>

      {/* Main Workspace split panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 h-[420px]">
        
        {/* Left Side: Monaco Editor */}
        <div className="border-r border-border/40 relative h-full">
          <Editor
            height="100%"
            defaultLanguage="python"
            theme="vs-dark"
            value={code}
            onChange={(val) => setCode(val || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 13.5,
              fontFamily: 'var(--font-jetbrains)',
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              readOnly: isPyodideLoading,
              padding: { top: 16, bottom: 16 },
              automaticLayout: true,
            }}
          />
          {isPyodideLoading && !pyodideError && (
            <div className="absolute inset-0 bg-bg-surface/85 backdrop-blur-sm flex flex-col items-center justify-center z-10 select-none">
              <Loader2 className="w-8 h-8 text-accent-teal animate-spin mb-4" />
              <p className="text-sm font-bold animate-pulse text-text-primary">
                {code.includes('import pandas') ? 'Loading Pandas (this may take 30s)...' : 
                 code.includes('import sklearn') || code.includes('from sklearn') ? 'Loading scikit-learn (this may take 30s)...' :
                 code.includes('import numpy') ? 'Loading NumPy...' : 
                 'Setting up Python environment...'}
              </p>
            </div>
          )}
          {pyodideError && (
            <div className="absolute inset-0 bg-danger/5 backdrop-blur-sm flex flex-col items-center justify-center z-10 text-center p-6 select-none">
              <AlertCircle className="w-8 h-8 text-danger mb-4" />
              <p className="text-sm font-bold text-danger mb-2">Failed to load Python</p>
              <p className="text-xs text-text-secondary">{pyodideError}</p>
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
                
                {/* 1. Terminal Output Tab */}
                {activeTab === 'terminal' && (
                  <div className="font-mono text-xs leading-relaxed h-full flex flex-col justify-between">
                    {error ? (
                      <pre className="text-danger/90 whitespace-pre-wrap bg-danger/5 p-4 rounded-xl border border-danger/20">{error}</pre>
                    ) : output ? (
                      <pre className="text-accent-teal whitespace-pre-wrap p-2">{output}</pre>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center h-full opacity-35 py-12 select-none">
                        <Terminal className="w-8 h-8 text-text-secondary mb-3" />
                        <p className="text-xs italic text-text-secondary">Terminal is offline. Run code to execute.</p>
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
                            ? (hint ? "Tip: Look closely at the function structure." : "Make sure to write valid Python syntax and call print() to inspect your variables.")
                            : (hint || "To solve this, ensure you are importing numpy/pandas correctly, check shape dimensions, and verify data slice types.")}
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
