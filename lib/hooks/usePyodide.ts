'use client';

import { useState, useEffect, useCallback } from 'react';

declare global {
  interface Window {
    loadPyodide: any;
  }
}

export const usePyodide = () => {
  const [pyodide, setPyodide] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPyodideScript = async () => {
      if (window.loadPyodide) {
        setIsLoading(false);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
      script.async = true;
      script.onload = async () => {
        try {
          const py = await window.loadPyodide();
          setPyodide(py);
          setIsLoading(false);
        } catch (err) {
          setError('Failed to initialize Pyodide');
          setIsLoading(false);
        }
      };
      script.onerror = () => {
        setError('Failed to load Pyodide script');
        setIsLoading(false);
      };
      document.body.appendChild(script);
    };

    loadPyodideScript();
  }, []);

  const runCode = useCallback(async (code: string) => {
    if (!pyodide) return { output: '', error: 'Pyodide not loaded' };

    try {
      // Capture stdout
      await pyodide.runPythonAsync(`
import sys
import io
sys.stdout = io.String()
      `);
      
      const result = await pyodide.runPythonAsync(code);
      
      const stdout = await pyodide.runPythonAsync('sys.stdout.getvalue()');
      
      return { 
        output: stdout || (result !== undefined ? String(result) : ''), 
        error: null 
      };
    } catch (err: any) {
      return { output: '', error: err.message };
    }
  }, [pyodide]);

  return { runCode, isLoading, error };
};
