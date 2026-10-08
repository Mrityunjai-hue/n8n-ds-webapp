'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Sparkles } from 'lucide-react';

interface AppleHelloHandwritingProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  color?: string;
  glowColor?: string;
  autoPlay?: boolean;
  loop?: boolean;
  className?: string;
  onComplete?: () => void;
}

export default function AppleHelloHandwriting({
  text = '404 · Found',
  size = 'lg',
  color = 'var(--blue)',
  glowColor = 'var(--yellow)',
  autoPlay = true,
  loop = false,
  className = '',
  onComplete,
}: AppleHelloHandwritingProps) {
  const [animationKey, setAnimationKey] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setIsFinished(false);
    const timer = setTimeout(() => {
      setIsFinished(true);
      if (onComplete) onComplete();
    }, 2200);

    return () => clearTimeout(timer);
  }, [animationKey, onComplete]);

  const restart = () => {
    setAnimationKey((k) => k + 1);
  };

  // Dimensions based on size
  const config = {
    sm: { width: 220, height: 65, strokeWidth: 4.5, textClass: 'text-2xl' },
    md: { width: 340, height: 95, strokeWidth: 5.5, textClass: 'text-4xl' },
    lg: { width: 480, height: 130, strokeWidth: 6.5, textClass: 'text-5xl sm:text-6xl' },
    hero: { width: 620, height: 160, strokeWidth: 7.5, textClass: 'text-6xl sm:text-7xl md:text-8xl' },
  }[size];

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`} key={animationKey}>
      {/* ── CONTINUOUS CURSIVE VECTOR PATH (APPLE "HELLO" STYLE) ── */}
      <div className="relative flex items-center justify-center">
        <svg
          viewBox="0 0 520 130"
          className="w-full h-auto overflow-visible pointer-events-none"
          style={{
            maxWidth: `${config.width}px`,
            filter: 'url(#crayon-roughness)',
          }}
        >
          {/* Subtle Faint Background Guide Line */}
          <motion.path
            d="M 15,115 Q 260,118 505,114"
            stroke="var(--canvas-border)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.5"
          />

          {/* 1. Continuous Cursive "404" Loop Stroke */}
          {/* Digit 4 */}
          <motion.path
            d="M 45,30 L 25,75 Q 22,82 40,82 L 80,82 M 65,45 L 65,100"
            fill="none"
            stroke="var(--ink)"
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 0.65,
              ease: [0.65, 0, 0.35, 1], // Apple fluid bezier easing
            }}
          />

          {/* Digit 0 */}
          <motion.path
            d="M 125,40 C 95,40 92,95 125,95 C 158,95 155,40 125,40 Z"
            fill="none"
            stroke="var(--ink)"
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 0.55,
              delay: 0.45,
              ease: [0.65, 0, 0.35, 1],
            }}
          />

          {/* Digit 4 */}
          <motion.path
            d="M 195,30 L 175,75 Q 172,82 190,82 L 230,82 M 215,45 L 215,100"
            fill="none"
            stroke="var(--ink)"
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 0.65,
              delay: 0.75,
              ease: [0.65, 0, 0.35, 1],
            }}
          />

          {/* Decorative Connecting Swirl Dot / Dash */}
          <motion.path
            d="M 245,75 Q 255,70 265,75"
            fill="none"
            stroke="var(--orange)"
            strokeWidth={config.strokeWidth - 1}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 0.25,
              delay: 1.15,
              ease: 'easeOut',
            }}
          />

          {/* 2. Apple "hello" Style Fluid Cursive "Found" Continuous Stroke */}
          {/* F -> o -> u -> n -> d continuous cursive ligature */}
          <motion.path
            d="
              M 285,45 Q 310,25 330,35 Q 295,45 300,105
              M 290,65 Q 315,62 330,65
              M 345,72 C 335,60 365,60 365,75 C 365,90 335,90 345,72 Q 365,75 380,88
              M 380,68 L 380,85 Q 380,95 400,95 Q 415,95 415,68 L 415,95
              M 425,68 L 425,95 M 425,72 Q 440,65 450,75 L 450,95
              M 480,72 C 465,60 465,92 485,92 L 485,35 L 485,95 Q 490,100 505,92
            "
            fill="none"
            stroke={color}
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 1.1,
              delay: 1.25,
              ease: [0.45, 0, 0.25, 1], // Fluid flowing cursive speed curve
            }}
          />

          {/* 3. Flourish Underline & Highlighter Sweep (Appears after "Found" connects) */}
          <motion.path
            d="M 25,115 Q 160,108 300,114 T 495,110"
            fill="none"
            stroke="var(--yellow)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: isFinished ? 1 : 0,
              opacity: isFinished ? 0.85 : 0,
            }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
            }}
            style={{ filter: 'url(#crayon-roughness)' }}
          />
        </svg>

        {/* Sparkling Bloom when cursive animation finishes */}
        <AnimatePresence>
          {isFinished && (
            <motion.div
              initial={{ scale: 0, rotate: -45, opacity: 0 }}
              animate={{ scale: [0, 1.3, 1], rotate: [0, 45, 0], opacity: 1 }}
              transition={{ duration: 0.45 }}
              className="absolute -top-3 -right-3 text-[var(--yellow)] pointer-events-none"
            >
              <Sparkles className="w-7 h-7 sm:w-9 sm:h-9 drop-shadow-md" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Replay Scribble Link */}
      <button
        onClick={restart}
        className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full border border-[var(--canvas-border)] bg-[var(--canvas-raised)] hover:bg-[var(--canvas-sunken)] text-xs font-mono text-[var(--ink-3)] hover:text-[var(--ink)] transition-all cursor-pointer shadow-sm"
        title="Replay Apple-style cursive handwriting"
      >
        <RotateCcw className="w-3.5 h-3.5 text-[var(--blue)]" />
        <span>Replay Handwriting</span>
      </button>
    </div>
  );
}
