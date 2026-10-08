'use client';

import React, { useRef, useEffect } from 'react';
import Editor, { Monaco, OnMount } from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import { defineNotebookInkTheme, NOTEBOOK_INK_THEME } from '@/lib/code/editor/monacoTheme';

interface SQLCodeEditorProps {
  value: string;
  onChange: (val: string) => void;
  onRunQuery: () => void;
  onSubmit: () => void;
  onMountEditor?: (editor: any, monaco: Monaco) => void;
}

export const SQLCodeEditor: React.FC<SQLCodeEditorProps> = ({
  value,
  onChange,
  onRunQuery,
  onSubmit,
  onMountEditor,
}) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<Monaco | null>(null);

  const handleEditorWillMount = (monaco: Monaco) => {
    defineNotebookInkTheme(monaco, isDark);
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Define & set theme
    defineNotebookInkTheme(monaco, isDark);
    monaco.editor.setTheme(NOTEBOOK_INK_THEME);

    // Keyboard Shortcuts:
    // Ctrl/Cmd + Enter -> Run Query
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      onRunQuery();
    });

    // Ctrl/Cmd + Shift + Enter -> Submit Solution
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Enter,
      () => {
        onSubmit();
      }
    );

    onMountEditor?.(editor, monaco);
  };

  // Re-apply theme if theme changes
  useEffect(() => {
    if (monacoRef.current) {
      defineNotebookInkTheme(monacoRef.current, isDark);
      monacoRef.current.editor.setTheme(NOTEBOOK_INK_THEME);
    }
  }, [isDark]);

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#1c1c2e] dark:bg-[#12082a]">
      <Editor
        height="100%"
        defaultLanguage="sql"
        theme={NOTEBOOK_INK_THEME}
        value={value}
        onChange={(val) => onChange(val || '')}
        beforeMount={handleEditorWillMount}
        onMount={handleEditorDidMount}
        options={{
          fontSize: 14,
          fontFamily: "'Fragment Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          fontLigatures: true,
          lineHeight: 22,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          lineNumbers: 'on',
          renderLineHighlight: 'all',
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          padding: { top: 12, bottom: 12 },
          suggestOnTriggerCharacters: true,
          quickSuggestions: true,
        }}
        loading={
          <div className="flex items-center justify-center h-full text-xs font-mono text-[#94a3b8]">
            Loading Monaco SQL Editor...
          </div>
        }
      />
    </div>
  );
};
