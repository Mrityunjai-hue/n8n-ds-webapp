'use client';

import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { 
  AlertCircle, 
  GitBranch, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize2, 
  X,
  Move
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  
  const idRef = useRef<string>(`mermaid-${Math.random().toString(36).slice(2, 10)}`);
  const graphContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chart?.trim()) return;

    let cancelled = false;

    const render = async () => {
      try {
        initMermaid();
        // Clear previous SVG to avoid math glitches
        setSvg('');
        const { svg: rendered } = await mermaid.render(idRef.current, chart);
        if (!cancelled) {
          setSvg(rendered);
          setError(false);
          // Reset zoom/pan on chart load
          setScale(1);
          setPan({ x: 0, y: 0 });
        }
      } catch (err) {
        console.error('[Mermaid] Render error:', err, '\nChart:\n', chart);
        if (!cancelled) setError(true);
      }
    };

    render();
    return () => { cancelled = true; };
  }, [chart]);

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(s => Math.min(2.5, s + 0.15));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(s => Math.max(0.6, s - 0.15));
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left click
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

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
      <div className="w-full bg-bg-surface/30 border border-border rounded-2xl p-8 flex items-center justify-center min-h-[250px]">
        <div className="flex items-center gap-3 text-text-secondary">
          <GitBranch className="w-5 h-5 animate-pulse text-accent-teal" />
          <span className="text-sm font-medium">Compiling visual tree diagram…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group rounded-2xl border border-border/40 overflow-hidden bg-bg-surface/30 backdrop-blur-sm">
      
      {/* Zoom and Pan Toolbar */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-bg-surface/80 backdrop-blur-sm border border-border/60 p-1.5 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={handleZoomIn}
          className="p-1.5 hover:bg-bg-primary text-text-secondary hover:text-text-primary rounded-lg transition-colors border-none cursor-pointer"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-1.5 hover:bg-bg-primary text-text-secondary hover:text-text-primary rounded-lg transition-colors border-none cursor-pointer"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleReset}
          className="p-1.5 hover:bg-bg-primary text-text-secondary hover:text-text-primary rounded-lg transition-colors border-none cursor-pointer"
          title="Reset"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={() => setIsFullscreen(true)}
          className="p-1.5 hover:bg-bg-primary text-text-secondary hover:text-text-primary rounded-lg transition-colors border-none cursor-pointer"
          title="Fullscreen"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Drag Helper Message */}
      <div className="absolute bottom-3 left-4 text-[9px] font-bold text-text-secondary/50 uppercase tracking-widest pointer-events-none flex items-center gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Move className="w-3 h-3" />
        <span>Drag to pan diagram</span>
      </div>

      {/* Render Canvas */}
      <motion.div
        ref={graphContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full h-[320px] p-8 overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing relative"
      >
        <div
          className="transition-transform duration-75 select-none"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transformOrigin: 'center',
          }}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </motion.div>

      {/* Fullscreen Overlay Portal Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-bg-base/95 backdrop-blur-md z-50 flex flex-col p-6"
            onKeyDown={(e) => {
              if (e.key === 'Escape') setIsFullscreen(false);
            }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border/40 pb-4 z-10 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-accent-teal">Visual Learning</span>
                <h3 className="text-lg font-bold text-text-primary">Fullscreen Diagram</h3>
              </div>
              
              {/* Controls bar inside modal */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-bg-surface/80 border border-border p-1.5 rounded-xl">
                  <button
                    onClick={handleZoomIn}
                    className="p-1.5 hover:bg-bg-primary text-text-secondary hover:text-text-primary rounded-lg border-none cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleZoomOut}
                    className="p-1.5 hover:bg-bg-primary text-text-secondary hover:text-text-primary rounded-lg border-none cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleReset}
                    className="p-1.5 hover:bg-bg-primary text-text-secondary hover:text-text-primary rounded-lg border-none cursor-pointer"
                    title="Reset"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => setIsFullscreen(false)}
                  className="p-2 bg-bg-surface hover:bg-bg-elevated border border-border rounded-xl text-text-secondary hover:text-text-primary cursor-pointer transition-colors"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Interactive Fullscreen Canvas */}
            <div
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="flex-grow w-full relative overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing p-12"
            >
              <div className="absolute bottom-4 left-4 text-[9px] font-bold text-text-secondary/50 uppercase tracking-widest pointer-events-none flex items-center gap-1">
                <Move className="w-3.5 h-3.5" />
                <span>Drag to pan diagram • Scroll/Zoom using buttons above</span>
              </div>

              <div
                className="transition-transform duration-75 select-none"
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale * 1.3})`,
                  transformOrigin: 'center',
                }}
                dangerouslySetInnerHTML={{ __html: svg }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
