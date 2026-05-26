'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Database, 
  Code2, 
  Layout, 
  Binary, 
  Table, 
  BarChart3, 
  Cpu, 
  Network, 
  Sparkles, 
  Bot,
  HelpCircle,
  Move,
  BookOpen
} from 'lucide-react';
import { subjects } from '@/lib/content/subjects';
import { useProgressStore } from '@/lib/store/useProgressStore';

// Map subject IDs to Lucide Icons
const subjectIconMap: Record<string, React.ComponentType<any>> = {
  sql: Database,
  python: Code2,
  bi: Layout,
  numpy: Binary,
  pandas: Table,
  ml: Cpu,
  visualization: BarChart3,
  dl: Network,
  genai: Sparkles,
  agentic: Bot,
  foundation: BookOpen,
};

// Map subject IDs to colors
const subjectColors: Record<string, { border: string; glow: string; text: string; rawHex: string }> = {
  sql: { border: 'border-blue-500/20 hover:border-blue-500/50', glow: 'shadow-blue-500/10', text: 'text-blue-400', rawHex: '#3b82f6' },
  python: { border: 'border-yellow-500/20 hover:border-yellow-500/50', glow: 'shadow-yellow-500/10', text: 'text-yellow-400', rawHex: '#eab308' },
  bi: { border: 'border-amber-500/20 hover:border-amber-500/50', glow: 'shadow-amber-500/10', text: 'text-amber-500', rawHex: '#f59e0b' },
  numpy: { border: 'border-cyan-500/20 hover:border-cyan-500/50', glow: 'shadow-cyan-500/10', text: 'text-cyan-400', rawHex: '#22d3ee' },
  pandas: { border: 'border-indigo-500/20 hover:border-indigo-500/50', glow: 'shadow-indigo-500/10', text: 'text-indigo-400', rawHex: '#818cf8' },
  ml: { border: 'border-green-500/20 hover:border-green-500/50', glow: 'shadow-green-500/10', text: 'text-green-400', rawHex: '#10b981' },
  visualization: { border: 'border-orange-500/20 hover:border-orange-500/50', glow: 'shadow-orange-500/10', text: 'text-orange-400', rawHex: '#f97316' },
  dl: { border: 'border-purple-500/20 hover:border-purple-500/50', glow: 'shadow-purple-500/10', text: 'text-purple-400', rawHex: '#a855f7' },
  genai: { border: 'border-pink-500/20 hover:border-pink-500/50', glow: 'shadow-pink-500/10', text: 'text-pink-400', rawHex: '#ec4899' },
  agentic: { border: 'border-violet-500/20 hover:border-violet-500/50', glow: 'shadow-violet-500/10', text: 'text-violet-400', rawHex: '#8b5cf6' },
  foundation: { border: 'border-slate-500/20 hover:border-slate-500/50', glow: 'shadow-slate-500/10', text: 'text-slate-400', rawHex: '#94a3b8' },
};

interface GraphNode {
  id: string;
  name: string;
  slug: string;
  x: number;
  y: number;
  level: number;
  topicsCount: number;
}

interface GraphEdge {
  from: string;
  to: string;
}

const graphNodes: GraphNode[] = [
  { id: 'foundation', name: 'Foundation Framework', slug: 'foundation', x: 80, y: 280, level: 0, topicsCount: 4 },
  { id: 'sql', name: 'SQL Mastery', slug: 'sql', x: 260, y: 280, level: 1, topicsCount: 20 },
  { id: 'python', name: 'Python for DS', slug: 'python', x: 440, y: 180, level: 2, topicsCount: 18 },
  { id: 'bi', name: 'Power BI', slug: 'power-bi', x: 440, y: 380, level: 3, topicsCount: 6 },
  { id: 'numpy', name: 'NumPy Mastery', slug: 'numpy', x: 620, y: 100, level: 4, topicsCount: 10 },
  { id: 'visualization', name: 'Data Visualization', slug: 'visualization', x: 620, y: 260, level: 4, topicsCount: 8 },
  { id: 'pandas', name: 'Pandas for Data', slug: 'pandas', x: 800, y: 100, level: 5, topicsCount: 12 },
  { id: 'ml', name: 'Machine Learning', slug: 'ml-basics', x: 980, y: 180, level: 6, topicsCount: 20 },
  { id: 'dl', name: 'Deep Learning', slug: 'deep-learning', x: 1140, y: 180, level: 8, topicsCount: 14 },
  { id: 'genai', name: 'Generative AI', slug: 'gen-ai', x: 1300, y: 120, level: 9, topicsCount: 10 },
  { id: 'agentic', name: 'Agentic AI', slug: 'agentic-ai', x: 1300, y: 300, level: 10, topicsCount: 10 },
];

const graphEdges: GraphEdge[] = [
  { from: 'foundation', to: 'sql' },
  { from: 'sql', to: 'bi' },
  { from: 'sql', to: 'python' },
  { from: 'python', to: 'numpy' },
  { from: 'python', to: 'visualization' },
  { from: 'numpy', to: 'pandas' },
  { from: 'pandas', to: 'ml' },
  { from: 'visualization', to: 'ml' },
  { from: 'ml', to: 'dl' },
  { from: 'dl', to: 'genai' },
  { from: 'genai', to: 'agentic' },
  { from: 'python', to: 'agentic' },
];

export const RoadmapGraph: React.FC = () => {
  const { completedTopics, visitedTopics } = useProgressStore();
  const [scale, setScale] = useState(0.85);
  const [pan, setPan] = useState({ x: 30, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Zoom limits
  const minZoom = 0.5;
  const maxZoom = 2;

  const handleZoomIn = () => setScale(s => Math.min(maxZoom, s + 0.15));
  const handleZoomOut = () => setScale(s => Math.max(minZoom, s - 0.15));
  const handleReset = () => {
    setScale(0.85);
    setPan({ x: 30, y: 50 });
  };

  // Drag-to-pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag on left click
    if (e.button !== 0) return;
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

  // Helper to determine node completion status
  const getNodeStatus = (nodeId: string) => {
    const subject = subjects.find(s => s.id === nodeId);
    if (!subject) return 'not-started';

    const subjectTopicIds = subject.topics.map(t => t.id);
    const numCompleted = subjectTopicIds.filter(id => completedTopics.includes(id)).length;
    const numVisited = subjectTopicIds.filter(id => visitedTopics.includes(id)).length;

    if (numCompleted === subjectTopicIds.length && subjectTopicIds.length > 0) return 'completed';
    if (numCompleted > 0 || numVisited > 0) return 'in-progress';
    return 'not-started';
  };

  // Helper to render connection paths between nodes
  const drawEdge = (edge: GraphEdge, idx: number) => {
    const fromNode = graphNodes.find(n => n.id === edge.from);
    const toNode = graphNodes.find(n => n.id === edge.to);
    
    if (!fromNode || !toNode) return null;

    // Shift coordinates slightly to align with right edge of source and left edge of target
    const startX = fromNode.x + 80; // half of node width
    const startY = fromNode.y;
    const endX = toNode.x - 80;
    const endY = toNode.y;

    const dx = Math.abs(endX - startX) * 0.55;
    const pathD = `M ${startX} ${startY} C ${startX + dx} ${startY}, ${endX - dx} ${endY}, ${endX} ${endY}`;

    const fromStatus = getNodeStatus(edge.from);
    const isHovered = hoveredNodeId === edge.from || hoveredNodeId === edge.to;
    const anyHovered = hoveredNodeId !== null;

    let strokeColor = 'rgba(75, 85, 99, 0.2)'; // default dim gray
    let strokeWidth = 2.5;
    let className = '';

    if (fromStatus === 'completed') {
      strokeColor = subjectColors[edge.from]?.rawHex || '#2dd4bf';
      strokeWidth = 3;
    } else if (fromStatus === 'in-progress') {
      strokeColor = '#f59e0b';
      strokeWidth = 3;
      className = 'roadmap-line-dash';
    }

    // Apply hover highlighting states
    if (anyHovered) {
      if (isHovered) {
        strokeWidth = 5;
        strokeColor = subjectColors[edge.from]?.rawHex || strokeColor;
      } else {
        strokeColor = 'rgba(75, 85, 99, 0.05)';
      }
    }

    return (
      <g key={idx}>
        <path
          d={pathD}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          className={`${className} transition-all duration-300`}
          strokeLinecap="round"
        />
        {/* Glow effect on hover */}
        {isHovered && (
          <path
            d={pathD}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth + 6}
            opacity="0.15"
            className="blur-sm transition-all duration-300"
            strokeLinecap="round"
          />
        )}
      </g>
    );
  };

  return (
    <div className="w-full relative bg-bg-base rounded-3xl border border-border-subtle overflow-hidden select-none">
      
      {/* Self-contained CSS dash animations */}
      <style>{`
        @keyframes roadmap-dash {
          to {
            stroke-dashoffset: -40;
          }
        }
        .roadmap-line-dash {
          stroke-dasharray: 8, 4;
          animation: roadmap-dash 3s linear infinite;
        }
      `}</style>

      {/* Control overlay */}
      <div className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-bg-surface/60 backdrop-blur-md border border-border/60 p-2 rounded-2xl shadow-xl">
        <button
          onClick={handleZoomIn}
          className="p-2 hover:bg-bg-primary text-text-secondary hover:text-text-primary rounded-xl transition-colors cursor-pointer border-none"
          title="Zoom In"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 hover:bg-bg-primary text-text-secondary hover:text-text-primary rounded-xl transition-colors cursor-pointer border-none"
          title="Zoom Out"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <button
          onClick={handleReset}
          className="p-2 hover:bg-bg-primary text-text-secondary hover:text-text-primary rounded-xl transition-colors cursor-pointer border-none"
          title="Reset View"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        <div className="w-[1px] h-6 bg-border/60 mx-1" />
        <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest px-2 flex items-center gap-1">
          <Move className="w-3.5 h-3.5" /> Drag to Pan
        </span>
      </div>

      {/* Drag & Canvas Wrapper */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`w-full h-[550px] relative overflow-hidden cursor-grab active:cursor-grabbing`}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1500 500"
          className="w-full h-full"
        >
          <g transform={`translate(${pan.x}, ${pan.y}) scale(${scale})`}>
            {/* 1. Connection lines (rendered below nodes) */}
            <g>
              {graphEdges.map((edge, idx) => drawEdge(edge, idx))}
            </g>

            {/* 2. Interactive Nodes */}
            <g>
              {graphNodes.map((node) => {
                const colors = subjectColors[node.id] || { border: 'border-border/40', glow: '', text: 'text-text-secondary', rawHex: '#9ca3af' };
                const Icon = subjectIconMap[node.id] || Database;
                const status = getNodeStatus(node.id);
                
                const isHovered = hoveredNodeId === node.id;
                const isConnectionRelated = hoveredNodeId !== null && 
                  graphEdges.some(e => (e.from === node.id && e.to === hoveredNodeId) || (e.from === hoveredNodeId && e.to === node.id));

                const anyHovered = hoveredNodeId !== null;

                // Determine percentage
                const subject = subjects.find(s => s.id === node.id);
                const subjectTopicIds = subject?.topics.map(t => t.id) || [];
                const numCompleted = subjectTopicIds.filter(id => completedTopics.includes(id)).length;
                const progressPercent = subjectTopicIds.length > 0 ? Math.round((numCompleted / subjectTopicIds.length) * 100) : 0;

                return (
                  <foreignObject
                    key={node.id}
                    x={node.x - 85}
                    y={node.y - 50}
                    width="170"
                    height="100"
                    className="overflow-visible"
                  >
                    <div
                      onMouseEnter={() => setHoveredNodeId(node.id)}
                      onMouseLeave={() => setHoveredNodeId(null)}
                      className={`
                        w-[170px] h-[90px] rounded-2xl border bg-bg-surface/30 backdrop-blur-md p-4
                        flex flex-col justify-between transition-all duration-300 relative select-none
                        ${colors.border} ${isHovered ? 'scale-105 shadow-xl ' + colors.glow : ''}
                        ${anyHovered && !isHovered && !isConnectionRelated ? 'opacity-30 scale-95 blur-[0.5px]' : 'opacity-100'}
                      `}
                      style={{
                        boxShadow: isHovered ? `0 0 25px -5px ${colors.rawHex}20` : undefined,
                        borderColor: isHovered ? colors.rawHex : undefined,
                      }}
                    >
                      {/* Node Header (Level & Status Dot) */}
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-bold font-mono text-text-secondary/70 uppercase tracking-wider">
                          Level {node.level}
                        </span>
                        
                        {/* Custom Completion Indicator */}
                        <div className="flex items-center gap-1.5">
                          {status === 'completed' ? (
                            <span className="w-2.5 h-2.5 rounded-full bg-accent-teal shadow-md shadow-accent-teal/50" title="Completed" />
                          ) : status === 'in-progress' ? (
                            <span className="w-2.5 h-2.5 rounded-full bg-accent-amber animate-pulse" title="In Progress" />
                          ) : (
                            <span className="w-2.5 h-2.5 rounded-full bg-border/60" title="Not Started" />
                          )}
                        </div>
                      </div>

                      {/* Main Node Content (Icon & Text) */}
                      <Link href={`/learn/${node.slug}`} className="flex items-center gap-3 py-1 cursor-pointer">
                        <div className={`p-2 rounded-xl bg-bg-primary border border-border/40 ${colors.text} shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-bold text-text-primary text-xs truncate">{node.name}</h4>
                          <span className="text-[9px] text-text-secondary/80 font-bold block">{node.topicsCount} Topics</span>
                        </div>
                      </Link>

                      {/* Inline Mini Progress Bar */}
                      <div className="w-full mt-1">
                        <div className="w-full h-1 bg-border/20 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-accent-teal to-accent-purple transition-all duration-500"
                            style={{ 
                              width: `${progressPercent}%`,
                              backgroundColor: progressPercent > 0 ? undefined : 'rgba(75,85,99,0.2)'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </foreignObject>
                );
              })}
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};
