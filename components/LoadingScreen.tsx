'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Sparkles, Binary, Cpu, Layers, Terminal, ArrowRight, Zap } from 'lucide-react';

interface LoadingScreenProps {
  onComplete?: () => void;
}

const DATA_STAGES = [
  { label: 'Initializing SQLite & PyTorch WASM Runtimes', detail: 'ALLOCATING 64MB IN-BROWSER MEMORY' },
  { label: 'Synthesizing Neural Graph & Loss Manifold', detail: 'CONVERGING GRADIENT VECTORS (LR=3e-4)' },
  { label: 'Mapping 155+ Interactive Problem Sandboxes', detail: 'CTEs • WINDOW FUNCTIONS • JOINS' },
  { label: 'Connecting Data Science Transit Network', detail: '11 STATIONS • 100+ TOPICS READY' },
  { label: '404 Found — Knowledge Manifold Resolved', detail: 'ALL SYSTEMS SKETCHED & NOMINAL' },
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [stageIdx, setStageIdx] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [metricLoss, setMetricLoss] = useState(0.842);

  // Mouse interaction
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  // Generative Canvas: Interactive Neural Field & Lissajous Curves
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 640;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Node swarm for generative graph - lightweight on mobile
    const nodeCount = isMobile ? 16 : Math.min(Math.floor((width * height) / 24000), 40);
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius: 2 + Math.random() * 2.5,
      color: ['#1d5bce', '#f5bf38', '#1b8a3e', '#e66a35', '#a855f7'][Math.floor(Math.random() * 5)],
      pulse: Math.random() * Math.PI * 2,
    }));

    let t = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      t += 0.02;

      // ── 1. Draw Drafting Concentric Circles in Center ──
      const cx = width / 2;
      const cy = height / 2;
      const baseR = Math.min(width, height) * 0.28;

      ctx.save();
      ctx.strokeStyle = 'rgba(150, 180, 220, 0.2)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);

      for (let r = baseR * 0.5; r <= baseR * 1.6; r += baseR * 0.4) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Rotating Compass Arc
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(29, 91, 206, 0.28)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([8, 12]);
      ctx.arc(cx, cy, baseR * 1.15, t * 0.6, t * 0.6 + Math.PI * 0.85);
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(245, 191, 56, 0.3)';
      ctx.arc(cx, cy, baseR * 0.85, -t * 0.8, -t * 0.8 + Math.PI * 0.6);
      ctx.stroke();
      ctx.restore();

      // ── 2. Draw Generative Neural Graph Nodes & Connections ──
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.04;

        // Bounce on boundaries
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        // Mouse gravity pull (desktop only)
        if (!isMobile) {
          const dxM = mousePos.x - n.x;
          const dyM = mousePos.y - n.y;
          const distM = Math.sqrt(dxM * dxM + dyM * dyM);
          if (distM < 160 && distM > 0) {
            n.x += (dxM / distM) * 0.8;
            n.y += (dyM / distM) * 0.8;
          }
        }

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n.x - n2.x;
          const dy = n.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.2;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(29, 91, 206, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }

        // Draw node dot
        const currentR = n.radius + Math.sin(n.pulse) * 0.7;
        ctx.beginPath();
        ctx.arc(n.x, n.y, currentR, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mousePos]);

  // Progression & Timer
  useEffect(() => {
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      const t = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => onComplete?.(), 100);
      }, 200);
      return () => clearTimeout(t);
    }

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const startTime = performance.now();
    const duration = isMobile ? 800 : 1200; // Snappy fast 800ms load on mobile, 1.2s on desktop

    const animFrame = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);

      // Decreasing loss calculation for telemetry
      const simulatedLoss = Math.max(0.0012, 0.842 * Math.exp(-pct / 25));
      setMetricLoss(parseFloat(simulatedLoss.toFixed(4)));

      const stage = Math.min(
        Math.floor((pct / 100) * DATA_STAGES.length),
        DATA_STAGES.length - 1
      );
      setStageIdx(stage);

      if (pct < 100) {
        requestAnimationFrame(animFrame);
      } else {
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onComplete?.();
          }, 200);
        }, 150);
      }
    };

    const reqId = requestAnimationFrame(animFrame);
    return () => cancelAnimationFrame(reqId);
  }, [onComplete]);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => onComplete?.(), 200);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03, filter: 'blur(4px)' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center select-none overflow-hidden"
          style={{
            backgroundColor: 'var(--canvas, #f5f0e8)',
            backgroundImage: `
              radial-gradient(circle, rgba(150, 180, 220, 0.32) 1.5px, transparent 1.5px),
              linear-gradient(to right, rgba(230, 100, 100, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px, 100% 100%',
            backgroundPosition: '0 0, 48px 0',
          }}
        >
          {/* ── Background Generative Canvas ── */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-0"
          />

          {/* ── Top Bar Controls ── */}
          <div className="absolute top-5 left-5 sm:top-7 sm:left-8 z-20 flex items-center gap-2">
            <div className="px-3 py-1 rounded-full border-2 border-[var(--canvas-border)] bg-[var(--canvas-raised)]/90 backdrop-blur-sm text-xs font-mono font-bold text-[var(--ink)] flex items-center gap-2 shadow-xs">
              <span className="inline-block w-2 h-2 rounded-full bg-[var(--green)] animate-ping" />
              <span>404 FOUND ENGINE &bull; v2.4</span>
            </div>
          </div>

          <button
            onClick={handleSkip}
            className="absolute top-5 right-5 sm:top-7 sm:right-8 z-20 px-4 py-1.5 rounded-full border-2 border-[var(--canvas-border)] bg-[var(--canvas-raised)]/90 hover:bg-[var(--canvas)] text-[var(--ink)] text-xs font-mono font-bold transition-transform hover:scale-105 active:scale-95 shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span>Skip</span>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--blue)]" />
          </button>

          {/* ── Central Architectural Drafting Card ── */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 360, damping: 26 }}
            className="relative w-[92%] max-w-[500px] p-6 sm:p-9 rounded-3xl border-3 border-[var(--ink)] bg-[var(--canvas-raised)]/95 backdrop-blur-md shadow-[6px_6px_0px_var(--ink)] flex flex-col z-10 font-patrick"
            style={{
              transform: 'rotate(-0.4deg)',
            }}
          >
            {/* Top Washi Sticker Tape */}
            <div
              className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded bg-[var(--yellow)] border-2 border-[var(--ink)] text-[var(--ink)] text-[11px] font-mono font-bold uppercase tracking-wider shadow-[2px_2px_0px_var(--ink)] flex items-center gap-1.5"
              style={{ transform: 'translateX(-50%) rotate(0.8deg)' }}
            >
              <Compass className="w-3.5 h-3.5 animate-[spin_8s_linear_infinite]" />
              <span>DRAFTING KNOWLEDGE MANIFOLD</span>
            </div>

            {/* Header: Geometric Logo & Monogram */}
            <div className="flex items-center justify-between mt-2 mb-4 pb-4 border-b-2 border-[var(--canvas-border)]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[var(--yellow-tint)] border-2 border-[var(--ink)] flex items-center justify-center text-[var(--ink)] shadow-[2px_2px_0px_var(--ink)]">
                  <span className="text-2xl font-black font-mono">✦</span>
                </div>
                <div>
                  <h1
                    className="text-3xl sm:text-4xl font-black tracking-tight leading-none text-[var(--ink)]"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    404 <span className="text-[var(--blue)] underline decoration-[var(--yellow)] decoration-wavy decoration-2">Found</span>
                  </h1>
                  <p className="text-xs font-mono text-[var(--ink-3)] mt-0.5">
                    Data Science &bull; Machine Learning &bull; Agentic AI
                  </p>
                </div>
              </div>

              {/* Dynamic WASM Badge */}
              <div className="text-right font-mono">
                <div className="text-[10px] uppercase font-bold text-[var(--ink-3)]">Runtime</div>
                <div className="text-xs font-bold text-[var(--green)] flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-current" />
                  <span>WASM ACTIVE</span>
                </div>
              </div>
            </div>

            {/* Dynamic Stage Readout */}
            <div className="my-2 min-h-[56px] flex flex-col justify-center">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--blue)] flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 shrink-0" />
                <span>{DATA_STAGES[stageIdx]?.detail}</span>
              </div>
              <p
                className="text-base sm:text-lg font-bold text-[var(--ink)] leading-snug mt-1"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {DATA_STAGES[stageIdx]?.label}
              </p>
            </div>

            {/* Architectural Drafting Ruler Progress Bar */}
            <div className="w-full mt-4 space-y-2">
              <div className="relative w-full h-6 rounded-xl border-2 border-[var(--ink)] bg-[var(--canvas-sunken)] p-0.5 overflow-hidden shadow-inner">
                {/* Progress Filler with Crayon Flow */}
                <motion.div
                  className="h-full rounded-lg bg-gradient-to-r from-[var(--blue)] via-[#38bdf8] to-[var(--yellow)] border-r-2 border-[var(--ink)] relative"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'linear' }}
                >
                  {/* Diagonal Engineering Hatch Pattern */}
                  <div
                    className="absolute inset-0 opacity-25"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, #000, #000 2px, transparent 2px, transparent 6px)',
                    }}
                  />
                </motion.div>
              </div>

              {/* Ruler Millimeter Tick Marks */}
              <div className="flex justify-between px-1 text-[9px] font-mono text-[var(--ink-3)]">
                <span>0mm</span>
                <span>25mm</span>
                <span>50mm</span>
                <span>75mm</span>
                <span>100mm</span>
              </div>
            </div>

            {/* Live Telemetry Data Ticker */}
            <div className="grid grid-cols-3 gap-2 pt-4 mt-4 border-t-2 border-[var(--canvas-border)] text-center font-mono">
              <div className="p-2 rounded-xl bg-[var(--canvas)] border border-[var(--canvas-border)]">
                <div className="text-[9px] uppercase font-bold text-[var(--ink-3)]">Loss</div>
                <div className="text-xs font-bold text-[var(--blue)]">{metricLoss}</div>
              </div>
              <div className="p-2 rounded-xl bg-[var(--canvas)] border border-[var(--canvas-border)]">
                <div className="text-[9px] uppercase font-bold text-[var(--ink-3)]">Progress</div>
                <div className="text-xs font-bold text-[var(--ink)]">{Math.round(progress)}%</div>
              </div>
              <div className="p-2 rounded-xl bg-[var(--canvas)] border border-[var(--canvas-border)]">
                <div className="text-[9px] uppercase font-bold text-[var(--ink-3)]">Sandboxes</div>
                <div className="text-xs font-bold text-[var(--green)]">155+ LIVE</div>
              </div>
            </div>
          </motion.div>

          {/* Bottom Notebook Footnote */}
          <div className="absolute bottom-5 text-center text-xs font-mono text-[var(--ink-3)] z-10 flex items-center gap-1.5">
            <span>Graph Paper Blueprint &bull; Zero Server Setup Required</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
