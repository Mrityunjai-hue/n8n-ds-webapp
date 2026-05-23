'use client';

import { useState, useEffect, useCallback } from 'react';

declare global {
  interface Window {
    loadPyodide: any;
  }
}

let pyodidePromise: Promise<any> | null = null;

export const usePyodide = () => {
  const [pyodide, setPyodide] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    
    const initPyodide = async () => {
      try {
        if (!pyodidePromise) {
          pyodidePromise = (async () => {
            // Check if already in global
            if (window.loadPyodide) {
              return await window.loadPyodide({
                indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
              });
            }

            // Load script dynamically
            return new Promise((resolve, reject) => {
              const script = document.createElement('script');
              script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
              script.async = true;
              script.onload = async () => {
                try {
                  const py = await window.loadPyodide({
                    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
                  });
                  resolve(py);
                } catch (err) {
                  reject(err);
                }
              };
              script.onerror = () => {
                reject(new Error('Failed to load Pyodide script'));
              };
              document.head.appendChild(script);
            });
          })();
        }
        
        const py = await pyodidePromise;
        if (mounted) {
          setPyodide(py);
          setIsLoading(false);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message || 'Failed to initialize Pyodide');
          setIsLoading(false);
        }
      }
    };

    initPyodide();
    return () => { mounted = false; };
  }, []);

  const runCode = useCallback(async (code: string) => {
    if (!pyodide) return { output: '', error: 'Pyodide not loaded' };

    try {
      // Auto-load common packages if used in code
      const packages = [];
      if (code.includes('import pandas') || code.includes('import  pandas')) packages.push('pandas');
      if (code.includes('import numpy') || code.includes('import  numpy')) packages.push('numpy');
      if (code.includes('import matplotlib') || code.includes('import  matplotlib')) packages.push('matplotlib');
      
      if (packages.length > 0) {
        setIsLoading(true);
        await pyodide.loadPackage(packages);
        setIsLoading(false);
      }

      // Capture stdout correctly
      await pyodide.runPythonAsync(`
import sys
import io
sys.stdout = io.StringIO()
      `);
      
      const result = await pyodide.runPythonAsync(code);
      
      const stdout = await pyodide.runPythonAsync('sys.stdout.getvalue()');
      
      return { 
        output: (stdout || (result !== undefined ? String(result) : '')).trim(), 
        error: null 
      };
    } catch (err: any) {
      setIsLoading(false);
      return { output: '', error: err.message };
    }
  }, [pyodide]);

  return { runCode, isLoading, error };
};
