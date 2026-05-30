'use client';

import { useEffect, useRef, useState, useCallback } from "react";

interface Props {
  onComplete?: () => void;
}

const PHASES = { BOOT: 0, NETWORK: 1, GLITCH: 2, FOUND: 3, EXIT: 4 };

const TERMINAL_LINES = [
  "> INITIALIZING 404 FOUND OS...",
  "> LOADING NEURAL ENGINE...",
  "> MAPPING KNOWLEDGE GRAPH...",
  "> CONNECTING DATA STREAMS...",
  "> ALL SYSTEMS NOMINAL.",
];

const GLITCH_CHARS = ["4Ø4", "█0█", "4◻4", "▓0▓", "404", "4Ø4", "40█"];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Space+Grotesk:wght@700;800&display=swap');

  .ls-root {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: #000;
    overflow: hidden;
    cursor: none;
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
  }

  .ls-scanline {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(255,255,255,0.015) 2px,
      rgba(255,255,255,0.015) 4px
    );
    pointer-events: none;
    z-index: 2;
    animation: scanMove 8s linear infinite;
  }

  @keyframes scanMove {
    0% { background-position: 0 0; }
    100% { background-position: 0 100px; }
  }

  .ls-vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%);
    pointer-events: none;
    z-index: 3;
  }

  .ls-corner {
    position: absolute;
    width: 28px;
    height: 28px;
    z-index: 10;
    opacity: 0;
    animation: cornerIn 0.4s ease forwards;
  }
  .ls-corner-tl { top: 24px; left: 24px; border-top: 1.5px solid #6366f1; border-left: 1.5px solid #6366f1; }
  .ls-corner-tr { top: 24px; right: 24px; border-top: 1.5px solid #6366f1; border-right: 1.5px solid #6366f1; }
  .ls-corner-bl { bottom: 24px; left: 24px; border-bottom: 1.5px solid #6366f1; border-left: 1.5px solid #6366f1; }
  .ls-corner-br { bottom: 24px; right: 24px; border-bottom: 1.5px solid #6366f1; border-right: 1.5px solid #6366f1; }

  @keyframes cornerIn {
    from { opacity: 0; transform: scale(0.5); }
    to { opacity: 1; transform: scale(1); }
  }

  .ls-terminal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
    text-align: left;
    min-width: 340px;
  }

  .ls-terminal-line {
    color: #22d3ee;
    font-size: 13px;
    font-weight: 400;
    line-height: 2;
    letter-spacing: 0.04em;
    white-space: nowrap;
    overflow: hidden;
    opacity: 0;
    animation: lineIn 0.1s ease forwards;
  }

  @keyframes lineIn {
    to { opacity: 1; }
  }

  .ls-cursor {
    display: inline-block;
    width: 8px;
    height: 14px;
    background: #22d3ee;
    vertical-align: -2px;
    margin-left: 2px;
    animation: blink 0.7s step-end infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  .ls-glitch-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 6;
    text-align: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .ls-glitch-text {
    font-family: 'Space Grotesk', 'JetBrains Mono', monospace;
    font-size: clamp(120px, 18vw, 200px);
    font-weight: 800;
    color: #fff;
    line-height: 1;
    position: relative;
    letter-spacing: -0.04em;
    user-select: none;
  }

  .ls-glitch-text::before,
  .ls-glitch-text::after {
    content: attr(data-text);
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    letter-spacing: inherit;
  }

  .ls-glitch-text::before {
    color: #f43f5e;
    animation: glitchR 0.15s infinite;
    clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%);
  }

  .ls-glitch-text::after {
    color: #22d3ee;
    animation: glitchB 0.2s infinite;
    clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%);
  }

  @keyframes glitchR {
    0%   { transform: translate(-4px, 0); opacity: 0.9; }
    25%  { transform: translate(4px, 2px); opacity: 0.7; }
    50%  { transform: translate(-2px, -2px); opacity: 0.8; }
    75%  { transform: translate(3px, 1px); opacity: 0.6; }
    100% { transform: translate(-4px, 0); opacity: 0.9; }
  }

  @keyframes glitchB {
    0%   { transform: translate(4px, 0); opacity: 0.8; }
    33%  { transform: translate(-4px, 2px); opacity: 0.6; }
    66%  { transform: translate(3px, -1px); opacity: 0.9; }
    100% { transform: translate(4px, 0); opacity: 0.8; }
  }

  .ls-glitch-active .ls-glitch-text::before,
  .ls-glitch-active .ls-glitch-text::after {
    animation-play-state: running;
  }

  .ls-glitch-frozen .ls-glitch-text::before,
  .ls-glitch-frozen .ls-glitch-text::after {
    animation-play-state: paused;
  }

  .ls-found-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 7;
    text-align: center;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .ls-found-text {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(120px, 18vw, 200px);
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.04em;
    background: linear-gradient(135deg, #6366f1 0%, #22d3ee 50%, #a855f7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: foundGlow 2s ease infinite alternate;
    user-select: none;
  }

  @keyframes foundGlow {
    0%  { filter: brightness(1); }
    100% { filter: brightness(1.3) drop-shadow(0 0 30px rgba(99,102,241,0.6)); }
  }

  .ls-tagline {
    color: #94a3b8;
    font-family: 'JetBrains Mono', monospace;
    font-size: clamp(11px, 1.2vw, 14px);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-top: 20px;
    opacity: 0;
    transform: translateY(10px);
    animation: taglineIn 0.6s ease 0.3s forwards;
  }

  @keyframes taglineIn {
    to { opacity: 1; transform: translateY(0); }
  }

  .ls-brand {
    position: absolute;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 8;
    display: flex;
    align-items: center;
    gap: 10px;
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .ls-brand-icon {
    width: 32px;
    height: 32px;
    border-radius: 7px;
    background: linear-gradient(135deg, #6366f1, #22d3ee);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    color: #fff;
  }

  .ls-brand-text {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 20px;
    font-weight: 800;
    color: #fff;
    letter-spacing: -0.02em;
  }

  .ls-brand-text span {
    background: linear-gradient(90deg, #22d3ee, #6366f1, #a855f7);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .ls-progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: rgba(255,255,255,0.06);
    z-index: 10;
  }

  .ls-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #6366f1, #22d3ee, #a855f7);
    width: 0%;
    position: relative;
    transition: none;
  }

  .ls-progress-fill::after {
    content: '';
    position: absolute;
    right: 0;
    top: -2px;
    width: 40px;
    height: 7px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8));
    border-radius: 4px;
    filter: blur(2px);
  }

  .ls-progress-tick {
    position: absolute;
    top: -3px;
    width: 1px;
    height: 9px;
    background: rgba(255,255,255,0.25);
  }

  .ls-shockwave {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    border: 2px solid rgba(99,102,241,0.9);
    transform: translate(-50%, -50%);
    z-index: 8;
    pointer-events: none;
    opacity: 0;
  }

  .ls-shockwave.active {
    animation: shockwaveExpand 0.8s ease-out forwards;
  }

  @keyframes shockwaveExpand {
    0%   { width: 60px; height: 60px; opacity: 1; border-color: rgba(99,102,241,1); }
    50%  { border-color: rgba(34,211,238,0.6); }
    100% { width: 200vw; height: 200vw; opacity: 0; border-color: rgba(168,85,247,0); }
  }

  .ls-cursor-dot {
    position: fixed;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #6366f1;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.15s ease;
    box-shadow: 0 0 12px rgba(99,102,241,0.8), 0 0 24px rgba(99,102,241,0.3);
    transform: translate(-50%, -50%);
  }

  .ls-root.exiting {
    animation: exitFade 0.4s ease forwards;
  }

  @keyframes exitFade {
    to { opacity: 0; }
  }

  .ls-status {
    position: absolute;
    top: 32px;
    right: 40px;
    font-size: 10px;
    color: rgba(99,102,241,0.6);
    letter-spacing: 0.2em;
    z-index: 10;
    font-family: 'JetBrains Mono', monospace;
  }

  .ls-status-dot {
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #22d3ee;
    margin-right: 6px;
    animation: statusPulse 1.2s ease infinite;
    vertical-align: 1px;
  }

  @keyframes statusPulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.7); }
  }
`;

export default function LoadingScreen({ onComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressAnimRef = useRef<number | null>(null);
  const networkAnimRef = useRef<number | null>(null);

  const [phase, setPhase] = useState(PHASES.BOOT);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [currentTyping, setCurrentTyping] = useState("");
  const [glitchText, setGlitchText] = useState("404");
  const [glitchState, setGlitchState] = useState("");
  const [showShockwave, setShowShockwave] = useState(false);
  const [showFound, setShowFound] = useState(false);
  const [showBrand, setShowBrand] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [showGlitch, setShowGlitch] = useState(false);
  const [showCorners, setShowCorners] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const move = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const startProgress = useCallback(() => {
    const start = performance.now();
    const duration = 4000;
    const animate = (now: number) => {
      const pct = Math.min(((now - start) / duration) * 100, 100);
      if (progressRef.current) progressRef.current.style.width = pct + "%";
      if (pct < 100) progressAnimRef.current = requestAnimationFrame(animate);
    };
    progressAnimRef.current = requestAnimationFrame(animate);
  }, []);

  const startNetwork = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) * 0.28;

    const nodes = Array.from({ length: 55 }, (_, i) => {
      const angle = (i / 55) * Math.PI * 2 + Math.random() * 0.5;
      const r = radius * (0.3 + Math.random() * 0.7);
      return {
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: 2.5 + Math.random() * 2,
        opacity: 0,
        targetOpacity: 0.6 + Math.random() * 0.4,
        color: ["99,102,241","34,211,238","168,85,247","129,140,248"][Math.floor(Math.random() * 4)],
        spawnDelay: i * 20,
        spawned: false,
      };
    });

    const streams = Array.from({ length: 8 }, (_, i) => ({
      x: (canvas.width / 9) * (i + 1),
      chars: Array.from({ length: 20 }, () => ({
        y: Math.random() * canvas.height,
        speed: 0.8 + Math.random() * 2,
        char: Math.random() > 0.5 ? Math.floor(Math.random() * 2).toString() : Math.floor(Math.random() * 16).toString(16).toUpperCase(),
        opacity: 0.02 + Math.random() * 0.05,
      })),
    }));

    let startTime: number | null = null;
    let connectionOpacity = 0;

    const draw = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.font = "10px 'JetBrains Mono', monospace";
      streams.forEach((stream) => {
        stream.chars.forEach((c) => {
          c.y += c.speed;
          if (c.y > canvas.height) {
            c.y = 0;
            c.char = Math.random() > 0.5 ? Math.floor(Math.random() * 2).toString() : Math.floor(Math.random() * 16).toString(16).toUpperCase();
          }
          ctx.fillStyle = `rgba(34,211,238,${c.opacity})`;
          ctx.fillText(c.char, stream.x, c.y);
        });
      });

      connectionOpacity = Math.min(connectionOpacity + 0.008, 0.18);
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            const alpha = connectionOpacity * (1 - dist / 110) * nodes[i].opacity * nodes[j].opacity;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99,102,241,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach((node) => {
        if (elapsed > node.spawnDelay && !node.spawned) node.spawned = true;
        if (node.spawned) node.opacity = Math.min(node.opacity + 0.03, node.targetOpacity);
        node.x += node.vx;
        node.y += node.vy;
        const dx = node.x - cx;
        const dy = node.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > radius * 1.1) {
          node.vx -= dx * 0.0002;
          node.vy -= dy * 0.0002;
        }
        if (node.opacity > 0) {
          const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 4);
          grad.addColorStop(0, `rgba(${node.color},${node.opacity * 0.5})`);
          grad.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${node.color},${node.opacity})`;
          ctx.fill();
        }
      });

      networkAnimRef.current = requestAnimationFrame(draw);
    };
    networkAnimRef.current = requestAnimationFrame(draw);
  }, []);

  const typeLines = useCallback(async () => {
    for (let i = 0; i < TERMINAL_LINES.length; i++) {
      const line = TERMINAL_LINES[i];
      for (let j = 0; j <= line.length; j++) {
        await new Promise((r) => setTimeout(r, 28));
        setCurrentTyping(line.slice(0, j));
      }
      await new Promise((r) => setTimeout(r, 80));
      setTerminalLines((prev) => [...prev, line]);
      setCurrentTyping("");
      await new Promise((r) => setTimeout(r, 40));
    }
  }, []);

  const runGlitch = useCallback(async () => {
    setShowGlitch(true);
    setGlitchState("active");
    await new Promise((r) => setTimeout(r, 700));
    for (let i = 0; i < 12; i++) {
      setGlitchText(GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]);
      await new Promise((r) => setTimeout(r, 45));
    }
    setGlitchText("404");
    setGlitchState("frozen");
    await new Promise((r) => setTimeout(r, 220));
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setTimeout(() => { setExiting(true); setTimeout(() => onComplete?.(), 500); }, 800);
      return;
    }

    startProgress();

    let mounted = true;
    const sequence = async () => {
      setPhase(PHASES.BOOT);
      await typeLines();
      if (!mounted) return;
      await new Promise((r) => setTimeout(r, 200));
      if (!mounted) return;

      setPhase(PHASES.NETWORK);
      setShowCorners(true);
      setTerminalLines([]);
      setCurrentTyping("");
      startNetwork();
      await new Promise((r) => setTimeout(r, 1100));
      if (!mounted) return;

      setPhase(PHASES.GLITCH);
      await runGlitch();
      if (!mounted) return;

      setPhase(PHASES.FOUND);
      setShowGlitch(false);
      setShowFound(true);
      setShowShockwave(true);
      await new Promise((r) => setTimeout(r, 200));
      if (!mounted) return;
      setShowShockwave(false);
      await new Promise((r) => setTimeout(r, 900));
      if (!mounted) return;

      setShowBrand(true);
      await new Promise((r) => setTimeout(r, 900));
      if (!mounted) return;

      setPhase(PHASES.EXIT);
      setExiting(true);
      if (networkAnimRef.current) cancelAnimationFrame(networkAnimRef.current);
      await new Promise((r) => setTimeout(r, 420));
      if (!mounted) return;
      onComplete?.();
    };

    sequence();

    return () => {
      mounted = false;
      if (progressAnimRef.current) cancelAnimationFrame(progressAnimRef.current);
      if (networkAnimRef.current) cancelAnimationFrame(networkAnimRef.current);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="ls-cursor-dot" style={{ left: mousePos.x, top: mousePos.y }} ref={cursorRef} />
      <div className={`ls-root${exiting ? " exiting" : ""}`}>
        <div className="ls-scanline" />
        <div className="ls-vignette" />
        <div className="ls-status">
          <span className="ls-status-dot" />
          STATUS: {phase <= PHASES.GLITCH ? "404 // PATH NOT FOUND" : "FOUND // RESOLVED"}
        </div>
        {showCorners && (
          <>
            <div className="ls-corner ls-corner-tl" style={{ animationDelay: "0ms" }} />
            <div className="ls-corner ls-corner-tr" style={{ animationDelay: "60ms" }} />
            <div className="ls-corner ls-corner-bl" style={{ animationDelay: "120ms" }} />
            <div className="ls-corner ls-corner-br" style={{ animationDelay: "180ms" }} />
          </>
        )}
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            pointerEvents: "none", zIndex: 1,
            opacity: phase >= PHASES.FOUND ? 0.12 : phase >= PHASES.NETWORK ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        />
        {phase === PHASES.BOOT && (
          <div className="ls-terminal">
            {terminalLines.map((line, i) => (
              <div key={i} className="ls-terminal-line">{line}</div>
            ))}
            <div className="ls-terminal-line">
              {currentTyping}<span className="ls-cursor" />
            </div>
          </div>
        )}
        <div className={`ls-glitch-container ls-glitch-${glitchState}`} style={{ opacity: showGlitch ? 1 : 0 }}>
          <div className="ls-glitch-text" data-text={glitchText}>{glitchText}</div>
        </div>
        <div className={`ls-shockwave${showShockwave ? " active" : ""}`} />
        <div className="ls-found-container" style={{ opacity: showFound ? 1 : 0 }}>
          <div className="ls-found-text">FOUND</div>
          {showFound && (
            <div className="ls-tagline">Knowledge was never missing — just waiting to be found</div>
          )}
        </div>
        <div className="ls-brand" style={{ opacity: showBrand ? 1 : 0 }}>
          <div className="ls-brand-icon">404</div>
          <div className="ls-brand-text">404 <span>Found</span></div>
        </div>
        <div className="ls-progress-bar">
          <div className="ls-progress-tick" style={{ left: "25%" }} />
          <div className="ls-progress-tick" style={{ left: "50%" }} />
          <div className="ls-progress-tick" style={{ left: "75%" }} />
          <div className="ls-progress-fill" ref={progressRef} />
        </div>
      </div>
    </>
  );
}
