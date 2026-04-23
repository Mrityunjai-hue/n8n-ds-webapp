'use client';

import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { AlertCircle, MousePointer2 } from 'lucide-react';

interface MermaidDiagramProps {
  chart: string;
}

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      themeVariables: {
        primaryColor: '#2DD4BF', // accent-teal
        primaryTextColor: '#F8FAFC', // text-primary
        primaryBorderColor: '#2DD4BF',
        lineColor: '#94A3B8', // text-secondary
        secondaryColor: '#1E293B', // bg-surface
        tertiaryColor: '#0F172A', // bg-primary
        fontSize: '14px',
        fontFamily: 'Plus Jakarta Sans',
      },
      securityLevel: 'loose',
    });

    const renderDiagram = async () => {
      if (!chart) return;
      
      try {
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(id, chart);
        setSvg(svg);
        setError(false);
      } catch (err) {
        console.error('Mermaid render error:', err);
        setError(true);
      }
    };

    renderDiagram();
  }, [chart]);

  if (error) {
    return (
      <div className="p-8 bg-danger/5 border border-danger/20 rounded-modal flex flex-col items-center justify-center text-center">
        <AlertCircle className="w-8 h-8 text-danger mb-4" />
        <p className="text-sm font-bold text-danger mb-2">Diagram Render Error</p>
        <pre className="text-xs text-text-secondary bg-bg-primary p-4 rounded border border-border max-w-full overflow-auto">
          {chart}
        </pre>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative group">
        <div 
          className="w-full bg-bg-surface border border-border rounded-modal p-8 overflow-x-auto no-scrollbar flex justify-center min-h-[200px]"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
        <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-bg-primary/80 backdrop-blur-sm border border-border rounded-full text-[10px] font-bold uppercase tracking-widest text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity lg:hidden">
          <MousePointer2 className="w-3 h-3" />
          Scroll to explore
        </div>
      </div>
    </div>
  );
};
