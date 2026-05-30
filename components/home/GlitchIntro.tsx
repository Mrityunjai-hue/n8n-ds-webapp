'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Stage = 'boot' | 'error' | 'glitch' | 'reveal' | 'done';

const BOOT_LOGS = [
  'kernel: Booting N8N-OS v4.0.4...',
  'init: Loading Neural Data Modules [OK]',
  'sys: Connecting to Sandbox Environment [OK]',
  'net: Fetching user trajectory...',
  'err: ERR_PATH_UNDEFINED',
  'err: Searching fallback...',
];

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>';

export const GlitchIntro = () => {
  const [stage, setStage] = useState<Stage>('boot');
  const [visible, setVisible] = useState(true);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [scrambleText, setScrambleText] = useState('NOT FOUND');
  const scrambleRef = useRef<number>(0);

  // ── Sequence Orchestration ──
  useEffect(() => {
    let mounted = true;
    const runSequence = async () => {
      // Boot Sequence
      for (let i = 0; i < BOOT_LOGS.length; i++) {
        await new Promise(r => setTimeout(r, 150));
        if (!mounted) return;
        setBootLines(prev => [...prev, BOOT_LOGS[i]]);
      }
      
      await new Promise(r => setTimeout(r, 400));
      if (!mounted) return;
      setStage('error');
      
      await new Promise(r => setTimeout(r, 800));
      if (!mounted) return;
      setStage('glitch');
      
      await new Promise(r => setTimeout(r, 1200));
      if (!mounted) return;
      setStage('reveal');
      
      await new Promise(r => setTimeout(r, 2000));
      if (!mounted) return;
      setStage('done');
      
      await new Promise(r => setTimeout(r, 800));
      if (!mounted) return;
      setVisible(false);
    };
    
    runSequence();
    return () => { mounted = false; };
  }, []);

  // ── Text Scrambler during glitch ──
  useEffect(() => {
    if (stage === 'glitch') {
      const interval = setInterval(() => {
        let result = '';
        for (let i = 0; i < 9; i++) {
          result += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
        setScrambleText(result);
      }, 50);
      return () => clearInterval(interval);
    } else if (stage === 'reveal') {
      setScrambleText('FOUND');
    }
  }, [stage]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-[#03050a] flex items-center justify-center overflow-hidden font-mono"
      style={{
        opacity: stage === 'done' ? 0 : 1,
        transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: stage === 'done' ? 'none' : 'all'
      }}
    >
      {/* ── SVG Filters for Premium Digital Glitch Tear ── */}
      <svg className="hidden">
        <defs>
          <filter id="glitch-tear">
            <feTurbulence type="fractalNoise" baseFrequency="0.05 0.95" numOctaves="1" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 5 -2" result="mask" />
            <feDisplacementMap in="SourceGraphic" in2="mask" scale="40" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* ── Ambient Background Mesh ── */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(45,212,191,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* ── STAGE 1: BOOT & ERROR ── */}
      <AnimatePresence>
        {(stage === 'boot' || stage === 'error') && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            className="absolute top-1/3 left-10 md:left-1/4 max-w-lg text-[#2dd4bf] text-xs sm:text-sm leading-relaxed"
          >
            {bootLines.map((line, i) => (
              <div key={i} className={line.startsWith('err') ? 'text-[#ff3366]' : ''}>
                {line}
              </div>
            ))}
            {stage === 'error' && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: [0, 1, 0, 1] }}
                transition={{ duration: 0.4 }}
                className="mt-6 text-[#ff3366] text-4xl sm:text-6xl font-black tracking-tighter"
              >
                404 NOT FOUND<span className="animate-pulse">_</span>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── STAGE 2: THE GLITCH TEAR ── */}
      <AnimatePresence>
        {stage === 'glitch' && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-[#03050a]"
            style={{ filter: 'url(#glitch-tear)' }}
          >
            {/* Chromatic layers pulling apart */}
            <div className="relative text-8xl md:text-[15rem] font-black italic tracking-tighter">
              <span className="absolute top-2 -left-4 text-[#ff3366] mix-blend-screen opacity-80">404</span>
              <span className="absolute -top-2 left-4 text-[#00ffe0] mix-blend-screen opacity-80">404</span>
              <span className="text-white relative z-10">{scrambleText}</span>
            </div>
            
            {/* Random tearing scanlines */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div 
                key={i}
                className="absolute bg-white/10"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: 0, right: 0,
                  height: `${Math.random() * 10 + 2}px`,
                  transform: `translateX(${(Math.random() - 0.5) * 100}px)`
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── STAGE 3: THE REVEAL ── */}
      <AnimatePresence>
        {(stage === 'reveal' || stage === 'done') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
          >
            {/* Majestic Glow Orbs */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 2 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.15)_0%,transparent_60%)] blur-3xl pointer-events-none"
            />
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 2 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.15)_0%,transparent_60%)] blur-3xl pointer-events-none translate-x-[10%]"
            />

            {/* The 404 Text */}
            <h1 className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40 text-8xl md:text-[12rem] font-black tracking-tighter drop-shadow-[0_0_40px_rgba(255,255,255,0.2)]">
              404
            </h1>

            {/* The FOUND Text */}
            <motion.div
              initial={{ y: 20, opacity: 0, letterSpacing: '0em' }}
              animate={{ y: 0, opacity: 1, letterSpacing: '0.2em' }}
              transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
              className="text-3xl md:text-6xl font-display font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#2dd4bf] via-[#818cf8] to-[#f472b6] drop-shadow-[0_0_30px_rgba(129,140,248,0.5)] mt-[-10px] md:mt-[-20px]"
            >
              Found
            </motion.div>

            {/* Light beam sweep across */}
            <motion.div 
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: '100%', opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_20px_#fff]"
            />

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="mt-8 text-[#94a3b8] text-xs md:text-sm tracking-[0.2em] uppercase font-medium"
            >
              Knowledge was never missing
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
