'use client';

import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { AlertCircle, GitBranch } from 'lucide-react';

// Initialize mermaid once globally — never inside the component render
let mermaidInitialized = false;

function initMermaid() {
  if (mermaidInitialized) return;
  mermaidInitialized = true;
  mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    themeVariables: {
      primaryColor: '#1E293B',
      primaryTextColor: '#F1F5F9',
      primaryBorderColor: '#2DD4BF',
      lineColor: '#2DD4BF',
      secondaryColor: '#0F172A',
      tertiaryColor: '#0F172A',
      edgeLabelBackground: '#0F172A',
      fontSize: '14px',
      fontFamily: 'Inter, ui-sans-serif, sans-serif',
    },
    flowchart: {
      curve: 'basis',
      nodeSpacing: 50,
      rankSpacing: 60,
      padding: 20,
      htmlLabels: true,
    },
    sequence: {
      diagramMarginX: 20,
      diagramMarginY: 20,
      actorMargin: 80,
      messageMargin: 35,
    },
    securityLevel: 'loose',
  });
}

interface MermaidDiagramProps {
  chart: string;
}

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart }) => {
  const [svg, setSvg]     = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const idRef             = useRef<string>(`mermaid-${Math.random().toString(36).slice(2, 10)}`);

  useEffect(() => {
    if (!chart?.trim()) return;

    let cancelled = false;

    const render = async () => {
      try {
        initMermaid();
        const { svg: rendered } = await mermaid.render(idRef.current, chart);
        if (!cancelled) {
          setSvg(rendered);
          setError(false);
        }
      } catch (err) {
        console.error('[Mermaid] Render error:', err, '\nChart:\n', chart);
        if (!cancelled) setError(true);
      }
    };

    render();
    return () => { cancelled = true; };
    // Re-render only when chart changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chart]);

  if (error) {
    return (
      <div className="p-8 bg-danger/5 border border-danger/20 rounded-2xl flex flex-col items-center justify-center text-center gap-4">
        <AlertCircle className="w-8 h-8 text-danger" />
        <div>
          <p className="text-sm font-bold text-danger mb-1">Diagram could not be rendered</p>
          <pre className="text-xs text-text-secondary bg-bg-primary p-3 rounded border border-border max-w-full overflow-auto text-left mt-2">
            {chart}
          </pre>
        </div>
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="w-full bg-bg-surface border border-border rounded-2xl p-8 flex items-center justify-center min-h-[200px]">
        <div className="flex items-center gap-3 text-text-secondary">
          <GitBranch className="w-5 h-5 animate-pulse" />
          <span className="text-sm font-medium">Rendering diagram…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <div
        className="w-full bg-bg-surface border border-border rounded-2xl p-8 overflow-x-auto flex justify-center min-h-[200px] transition-all duration-300 hover:border-accent-teal/40 hover:shadow-[0_0_20px_rgba(45,212,191,0.05)]"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
};
