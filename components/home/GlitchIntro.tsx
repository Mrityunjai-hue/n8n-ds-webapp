'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';

type Stage = 'hidden' | 'error' | 'glitching' | 'resolving' | 'done';

export const GlitchIntro = () => {
  const [stage, setStage] = useState<Stage>('hidden');
  const [visible, setVisible] = useState(true);
  const [tick, setTick] = useState(0);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  // ── Sequence timing ─────────────────────────────────────────
  useEffect(() => {
    const timers = [
      setTimeout(() => setStage('error'),     200),
      setTimeout(() => setStage('glitching'), 1200),
      setTimeout(() => setStage('resolving'), 2500),
      setTimeout(() => setStage('done'),      3300),
      setTimeout(() => setVisible(false),     4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // ── Glitch tick counter ──────────────────────────────────────
  useEffect(() => {
    if (stage === 'glitching') {
      tickRef.current = setInterval(() => setTick(t => t + 1), 40);
    } else {
      if (tickRef.current) clearInterval(tickRef.current);
    }
    return () => { if (tickRef.current) clearInterval(tickRef.current); };
  }, [stage]);

  // ── Noise canvas for glitch texture ─────────────────────────
  const drawNoise = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const img = ctx.createImageData(canvas.width, canvas.height);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = Math.random() > 0.96 ? 180 : 0;
      img.data[i] = v; img.data[i+1] = v; img.data[i+2] = v;
      img.data[i+3] = v > 0 ? 40 : 0;
    }
    ctx.putImageData(img, 0, 0);
  }, []);

  useEffect(() => {
    if (stage === 'glitching') {
      const loop = () => { drawNoise(); animRef.current = requestAnimationFrame(loop); };
      animRef.current = requestAnimationFrame(loop);
    } else {
      cancelAnimationFrame(animRef.current);
    }
    return () => cancelAnimationFrame(animRef.current);
  }, [stage, drawNoise]);

  if (!visible) return null;

  const isGlitching = stage === 'glitching';
  const isResolving = stage === 'resolving';
  const isDone      = stage === 'done';

  // Glitch offsets — deterministic from tick
  const rx = isGlitching ? ((tick * 7)  % 18) - 9  : 0;
  const ry = isGlitching ? ((tick * 11) % 10) - 5  : 0;
  const cx = isGlitching ? -((tick * 13) % 16) + 8 : 0;
  const cy = isGlitching ? -((tick * 5)  % 8)  + 4 : 0;
  const flicker = isGlitching && tick % 5 === 0;

  // Text colors — NO WebkitTextFillColor, NO background-clip tricks
  const numColor = isResolving
    ? '#2dd4bf'
    : isGlitching
    ? '#e2e8f0'
    : '#94a3b8';

  const numFilter = isResolving
    ? 'drop-shadow(0 0 32px rgba(45,212,191,0.6)) drop-shadow(0 0 64px rgba(129,140,248,0.3))'
    : isGlitching
    ? `drop-shadow(0 0 ${6 + (tick % 5) * 3}px rgba(45,212,191,0.4))`
    : 'none';

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#07090f',
        opacity: isDone ? 0 : 1,
        transition: isDone ? 'opacity 0.7s ease' : 'none',
        pointerEvents: isDone ? 'none' : 'all',
        overflow: 'hidden',
      }}
    >
      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: [
          'linear-gradient(rgba(45,212,191,0.04) 1px, transparent 1px)',
          'linear-gradient(90deg, rgba(45,212,191,0.04) 1px, transparent 1px)',
        ].join(', '),
        backgroundSize: '80px 80px',
      }} />

      {/* Ambient glow blobs */}
      <div style={{
        position: 'absolute', top: '25%', left: '15%', width: 600, height: 600,
        borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(45,212,191,0.07) 0%, transparent 65%)',
        filter: 'blur(60px)',
        opacity: isResolving ? 1 : 0.4, transition: 'opacity 0.6s',
      }} />
      <div style={{
        position: 'absolute', bottom: '15%', right: '10%', width: 500, height: 500,
        borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 65%)',
        filter: 'blur(60px)',
      }} />

      {/* Noise canvas */}
      <canvas ref={canvasRef} style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        mixBlendMode: 'screen',
        opacity: isGlitching ? 1 : 0, transition: 'opacity 0.2s',
      }} />

      {/* Glitch slice bars */}
      {isGlitching && [0,1,2,3,4].map(i => (
        <div key={i} style={{
          position: 'absolute',
          top: `${8 + i * 18 + ((tick * (i+2)) % 10)}%`,
          left: `${(tick * (i*5+3)) % 15}%`,
          width: `${55 + (tick * (i+1)) % 40}%`,
          height: `${2 + (tick*(i+1)) % 3}px`,
          background: i%2===0 ? 'rgba(45,212,191,0.22)' : 'rgba(168,85,247,0.22)',
          pointerEvents: 'none',
        }} />
      ))}

      {/* ── Main content ────────────────────────────────────── */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        opacity: flicker ? 0.6 : 1,
        transition: isGlitching ? 'none' : 'opacity 0.3s',
        userSelect: 'none',
      }}>

        {/* 404 number with chromatic aberration */}
        <div style={{ position: 'relative', lineHeight: 1, textAlign: 'center' }}>

          {/* Red channel — offset behind */}
          {isGlitching && (
            <span style={{
              position: 'absolute', top: ry, left: rx,
              fontFamily: 'var(--font-jetbrains, "JetBrains Mono", monospace)',
              fontWeight: 900,
              fontSize: 'clamp(6rem, 18vw, 14rem)',
              lineHeight: 1,
              color: '#ff3060',
              opacity: 0.5,
              mixBlendMode: 'screen',
              whiteSpace: 'nowrap',
            }}>404</span>
          )}

          {/* Cyan channel — offset behind */}
          {isGlitching && (
            <span style={{
              position: 'absolute', top: cy, left: cx,
              fontFamily: 'var(--font-jetbrains, "JetBrains Mono", monospace)',
              fontWeight: 900,
              fontSize: 'clamp(6rem, 18vw, 14rem)',
              lineHeight: 1,
              color: '#00ffe0',
              opacity: 0.5,
              mixBlendMode: 'screen',
              whiteSpace: 'nowrap',
            }}>404</span>
          )}

          {/* Main 404 — solid color, no background-clip tricks */}
          <span style={{
            display: 'inline-block',
            fontFamily: 'var(--font-jetbrains, "JetBrains Mono", monospace)',
            fontWeight: 900,
            fontSize: 'clamp(6rem, 18vw, 14rem)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: numColor,
            filter: numFilter,
            transition: isGlitching ? 'none' : 'color 0.7s ease, filter 0.7s ease',
            whiteSpace: 'nowrap',
            position: 'relative',
            zIndex: 1,
          }}>
            404
          </span>
        </div>

        {/* Status word — "Not Found" morphs to "Found" */}
        <div style={{
          position: 'relative',
          height: 'clamp(2rem, 5vw, 4rem)',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '0.1em',
        }}>
          {/* NOT FOUND */}
          <span style={{
            position: 'absolute',
            fontFamily: 'var(--font-syne, sans-serif)',
            fontWeight: 800,
            fontSize: 'clamp(1.2rem, 3vw, 2.8rem)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#475569',
            opacity: isResolving ? 0 : isGlitching && tick % 3 === 0 ? 0.2 : 1,
            transform: isResolving ? 'translateY(-20px)' : isGlitching ? `translateX(${rx * 1.5}px)` : 'none',
            transition: isGlitching ? 'none' : 'opacity 0.4s ease, transform 0.4s ease',
            whiteSpace: 'nowrap',
          }}>
            Not Found
          </span>

          {/* FOUND */}
          <span style={{
            position: 'absolute',
            fontFamily: 'var(--font-syne, sans-serif)',
            fontWeight: 800,
            fontSize: 'clamp(1.2rem, 3vw, 2.8rem)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#2dd4bf',
            textShadow: isResolving ? '0 0 30px rgba(45,212,191,0.5), 0 0 60px rgba(129,140,248,0.3)' : 'none',
            opacity: isResolving ? 1 : 0,
            transform: isResolving ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease, text-shadow 0.5s ease',
            whiteSpace: 'nowrap',
          }}>
            Found
          </span>
        </div>

        {/* Gradient rule */}
        <div style={{
          marginTop: 28,
          height: 1,
          width: isResolving ? 220 : 0,
          background: 'linear-gradient(90deg, transparent, #2dd4bf, #818cf8, transparent)',
          transition: 'width 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s',
        }} />

        {/* Tagline */}
        <p style={{
          marginTop: 20,
          fontFamily: 'var(--font-jetbrains, monospace)',
          fontSize: 'clamp(0.6rem, 1.2vw, 0.8rem)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#334155',
          opacity: isResolving ? 1 : 0,
          transform: isResolving ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.5s ease 0.25s, transform 0.5s ease 0.25s',
          whiteSpace: 'nowrap',
        }}>
          Knowledge was never missing — just waiting to be found
        </p>
      </div>

      {/* Terminal status bar */}
      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        fontFamily: 'var(--font-jetbrains, monospace)',
        fontSize: '0.62rem', letterSpacing: '0.08em',
        color: '#334155',
        display: 'flex', alignItems: 'center', gap: 10,
        whiteSpace: 'nowrap',
      }}>
        <span style={{
          width: 6, height: 6, borderRadius: '50%',
          background: isResolving ? '#2dd4bf' : isGlitching ? '#f59e0b' : '#ef4444',
          boxShadow: `0 0 8px ${isResolving ? '#2dd4bf' : isGlitching ? '#f59e0b' : '#ef4444'}`,
          transition: 'all 0.3s',
        }} />
        <span>
          {isResolving ? 'STATUS: RESOLVED // 404 FOUND'
            : isGlitching ? 'STATUS: RECOVERING // REWRITING PATH...'
            : 'STATUS: 404 // PATH NOT FOUND'}
        </span>
      </div>
    </div>
  );
};
