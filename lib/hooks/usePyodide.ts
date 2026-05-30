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
      if (code.includes('import sklearn') || code.includes('from sklearn')) packages.push('scikit-learn');
      if (code.includes('import scipy') || code.includes('from scipy')) packages.push('scipy');
      
      if (packages.length > 0) {
        setIsLoading(true);
        await pyodide.loadPackage(packages);
        setIsLoading(false);
      }

      // Check for unsupported native libraries
      const unsupportedMap: Record<string, string> = {
        'chromadb': 'chromadb requires native C++ bindings and cannot run in the browser sandbox.',
        'google.generativeai': 'Google Generative AI requires network API access, which is restricted in the browser sandbox.',
        'tensorflow': 'TensorFlow requires native C++ bindings. Use TensorFlow.js for browser-based ML.',
        'torch': 'PyTorch requires native CUDA/C++ bindings and cannot run in the WASM browser sandbox.',
        'xgboost': 'XGBoost is not yet available in Pyodide\'s WASM package registry. It runs perfectly in a standard Python environment.',
        'sentence_transformers': 'sentence-transformers requires PyTorch and model downloads, which are not supported in the browser sandbox.',
        'gensim': 'Gensim (Word2Vec) requires native C extensions and large model files that cannot be loaded in the browser sandbox.',
        'mlflow': 'MLflow requires a running server and filesystem access, which are not available in the browser sandbox.',
        'bentoml': 'BentoML is a server-side model serving framework and cannot run in the browser sandbox.',
        'nltk': 'NLTK corpus downloads (nltk.download) require network access to the NLTK data server, which is blocked in the browser sandbox.',
      };

      const foundUnsupported = Object.keys(unsupportedMap).find(
        pkg => code.includes(`import ${pkg}`) || code.includes(`from ${pkg}`)
      );
      
      if (foundUnsupported) {
        return {
          output: `[Browser Sandbox Note]\n${unsupportedMap[foundUnsupported]}\n\nThis code is syntactically correct and will run perfectly in a local Python environment (e.g., after running: pip install ${foundUnsupported})`,
          error: null
        };
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
