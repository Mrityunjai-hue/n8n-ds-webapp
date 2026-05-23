'use client';

import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { usePyodide } from '@/lib/hooks/usePyodide';
import { Button } from '../ui/Button';
import { Play, RotateCcw, Terminal, AlertCircle, Loader2 } from 'lucide-react';

interface InteractiveEditorProps {
  initialCode: string;
}

export const InteractiveEditor: React.FC<InteractiveEditorProps> = ({ initialCode }) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const { runCode, isLoading: isPyodideLoading, error: pyodideError } = usePyodide();

  const handleRun = async () => {
    setIsRunning(true);
    setError(null);
    setOutput('');
    
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
            <Terminal className="w-4 h-4" />
            Python 3.11 (WASM)
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
            disabled={isPyodideLoading}
            className="h-8 px-3 text-xs gap-1.5"
          >
            <Play className="w-3 h-3 fill-current" /> Run Code
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 h-[400px]">
        {/* Editor Side */}
        <div className="border-r border-border relative">
          <Editor
            height="100%"
            defaultLanguage="python"
            theme="vs-dark"
            value={code}
            onChange={(val) => setCode(val || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
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
            <div className="absolute inset-0 bg-bg-surface/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
              <Loader2 className="w-8 h-8 text-accent-teal animate-spin mb-4" />
              <p className="text-sm font-bold animate-pulse">
                {code.includes('import pandas') ? 'Loading Pandas (this may take 30s)...' : 
                 code.includes('import numpy') ? 'Loading NumPy...' : 
                 'Setting up Python environment...'}
              </p>
            </div>
          )}
          {pyodideError && (
            <div className="absolute inset-0 bg-danger/5 backdrop-blur-sm flex flex-col items-center justify-center z-10 text-center p-6">
              <AlertCircle className="w-8 h-8 text-danger mb-4" />
              <p className="text-sm font-bold text-danger mb-2">Failed to load Python</p>
              <p className="text-xs text-text-secondary">{pyodideError}</p>
            </div>
          )}
        </div>

        {/* Output Side */}
        <div className="flex flex-col bg-bg-primary font-mono text-sm overflow-hidden">
          <div className="px-4 py-2 bg-bg-elevated border-b border-border flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Output</span>
            {error && <AlertCircle className="w-3 h-3 text-danger" />}
          </div>
          <div className="p-4 flex-grow overflow-auto no-scrollbar font-mono text-xs leading-relaxed">
            {error ? (
              <pre className="text-danger/90 whitespace-pre-wrap bg-danger/5 p-3 rounded-lg border border-danger/20">{error}</pre>
            ) : output ? (
              <div className="space-y-2">
                <pre className="text-accent-teal whitespace-pre-wrap">{output}</pre>
              </div>
            ) : (
              <p className="text-text-secondary italic opacity-30">Run code to see output...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
