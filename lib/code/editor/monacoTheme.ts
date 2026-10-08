// lib/code/editor/monacoTheme.ts

import type { Monaco } from '@monaco-editor/react';

export const NOTEBOOK_INK_THEME = 'notebook-ink-dark';

export function defineNotebookInkTheme(monaco: Monaco, isDarkMode: boolean = false) {
  const bg = isDarkMode ? '#12082a' : '#1c1c2e';

  monaco.editor.defineTheme(NOTEBOOK_INK_THEME, {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: '', foreground: 'e8e4d9', background: bg.replace('#', '') },
      { token: 'keyword', foreground: '60a5fa', fontStyle: 'bold' },
      { token: 'keyword.sql', foreground: '60a5fa', fontStyle: 'bold' },
      { token: 'string', foreground: 'fde047' },
      { token: 'string.sql', foreground: 'fde047' },
      { token: 'number', foreground: 'fb923c' },
      { token: 'number.sql', foreground: 'fb923c' },
      { token: 'comment', foreground: '94a3b8', fontStyle: 'italic' },
      { token: 'comment.sql', foreground: '94a3b8', fontStyle: 'italic' },
      { token: 'operator.sql', foreground: 'cbd5e1' },
      { token: 'predefined.sql', foreground: 'c084fc' },
      { token: 'type.sql', foreground: '34d399' },
    ],
    colors: {
      'editor.background': bg,
      'editor.foreground': '#e8e4d9',
      'editorCursor.foreground': '#f7c948',
      'editor.lineHighlightBackground': isDarkMode ? '#1e0f38' : '#26263e',
      'editorLineNumber.foreground': '#6b7280',
      'editorLineNumber.activeForeground': '#f7c948',
      'editor.selectionBackground': '#2d6be455',
      'editor.inactiveSelectionBackground': '#2d6be422',
      'editorIndentGuide.background': '#374151',
      'editorIndentGuide.activeBackground': '#4b5563',
      'editorGutter.background': bg,
    },
  });
}
