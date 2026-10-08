'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Sparkles } from 'lucide-react';

interface AppleCursiveHandwritingProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  onComplete?: () => void;
}

export default function AppleCursiveHandwriting({
  size = 'hero',
  className = '',
  onComplete,
}: AppleCursiveHandwritingProps) {
  const [animationKey, setAnimationKey] = useState(0);
  const [stage, setStage] = useState<'drawing' | 'highlight' | 'done'>('drawing');

  useEffect(() => {
    setStage('drawing');
    const timer1 = setTimeout(() => {
      setStage('highlight');
    }, 2200);

    const timer2 = setTimeout(() => {
      setStage('done');
      if (onComplete) onComplete();
    }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [animationKey, onComplete]);

  const restart = () => {
    setAnimationKey((k) => k + 1);
  };

  const scale = {
    sm: 0.75,
    md: 0.95,
    lg: 1.2,
    hero: 1.4,
  }[size];

  return (
    <div
      className={`relative inline-flex flex-col items-center select-none ${className}`}
      key={animationKey}
    >
      <div
        className="relative flex items-center justify-center"
        style={{
          width: `${500 * scale}px`,
          height: `${140 * scale}px`,
        }}
      >
        {/* ── VECTOR HANDWRITING STROKE DRAWING ANIMATION (DOODLE FONT STYLE) ── */}
        <svg
          viewBox="0 0 500 140"
          className="w-full h-full overflow-visible pointer-events-none"
        >
          {/* Subtle Pencil Guideline */}
          <motion.line
            x1="20"
            y1="110"
            x2="480"
            y2="110"
            stroke="var(--canvas-border)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            opacity="0.4"
          />

          {/* ════════ "404" (Hand-Drawn Crayon / Charcoal Ink) ════════ */}
          {/* First "4" */}
          {/* Slanted stroke + horizontal crossbar */}
          <motion.path
            d="M 50,38 L 28,86 L 74,86"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 0.45,
              ease: [0.35, 0, 0.25, 1],
            }}
          />
          {/* Vertical downstroke */}
          <motion.path
            d="M 60,48 L 60,104"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 0.3,
              delay: 0.35,
              ease: [0.35, 0, 0.25, 1],
            }}
          />

          {/* "0" (Hand-drawn oval) */}
          <motion.path
            d="M 112,40 C 88,40 84,102 112,102 C 140,102 136,40 112,40 Z"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.55,
              ease: [0.35, 0, 0.25, 1],
            }}
          />

          {/* Second "4" */}
          <motion.path
            d="M 174,38 L 152,86 L 198,86"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 0.45,
              delay: 0.9,
              ease: [0.35, 0, 0.25, 1],
            }}
          />
          <motion.path
            d="M 184,48 L 184,104"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 0.3,
              delay: 1.25,
              ease: [0.35, 0, 0.25, 1],
            }}
          />

          {/* ════════ "~" (Doodle Wavy Hyphen in Orange) ════════ */}
          <motion.path
            d="M 214,76 Q 225,66 235,76 T 256,76"
            fill="none"
            stroke="var(--orange)"
            strokeWidth="5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 0.3,
              delay: 1.45,
              ease: 'easeOut',
            }}
          />

          {/* ════════ "Found" (Hand-Drawn Ballpoint Blue in Project Font Style) ════════ */}
          {/* 'F' (Vertical stem + top crossbar + middle bar) */}
          <motion.path
            d="M 282,36 L 282,104 M 280,38 L 314,38 M 282,68 L 306,68"
            fill="none"
            stroke="var(--blue)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 0.5,
              delay: 1.6,
              ease: [0.35, 0, 0.25, 1],
            }}
          />

          {/* 'o' (Oval circle) */}
          <motion.path
            d="M 334,66 C 322,66 320,98 334,98 C 348,98 346,66 334,66 Z"
            fill="none"
            stroke="var(--blue)"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 0.35,
              delay: 1.95,
              ease: [0.35, 0, 0.25, 1],
            }}
          />

          {/* 'u' (U-shape curve with stem) */}
          <motion.path
            d="M 360,66 L 360,90 Q 360,100 372,100 Q 384,100 384,90 L 384,66 L 384,100"
            fill="none"
            stroke="var(--blue)"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 0.4,
              delay: 2.15,
              ease: [0.35, 0, 0.25, 1],
            }}
          />

          {/* 'n' (Stem + Arch) */}
          <motion.path
            d="M 398,66 L 398,100 M 398,76 Q 408,66 418,66 Q 426,66 426,78 L 426,100"
            fill="none"
            stroke="var(--blue)"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 0.4,
              delay: 2.4,
              ease: [0.35, 0, 0.25, 1],
            }}
          />

          {/* 'd' (Round bowl + Tall vertical stem) */}
          <motion.path
            d="M 454,70 C 442,70 440,98 454,98 C 466,98 466,70 454,70 M 466,36 L 466,100"
            fill="none"
            stroke="var(--blue)"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 0.45,
              delay: 2.65,
              ease: [0.35, 0, 0.25, 1],
            }}
          />

          {/* ════════ YELLOW CRAYON HIGHLIGHTER SWEEP (Underneath) ════════ */}
          <motion.path
            d="M 28,114 Q 160,108 275,114 T 476,110"
            fill="none"
            stroke="var(--yellow)"
            strokeWidth="15"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: stage === 'highlight' || stage === 'done' ? 1 : 0,
              opacity: stage === 'highlight' || stage === 'done' ? 0.85 : 0,
            }}
            transition={{
              duration: 0.5,
              ease: 'easeOut',
            }}
            style={{ filter: 'url(#crayon-roughness)' }}
          />
        </svg>

        {/* Celebratory Sparkles on completion */}
        <AnimatePresence>
          {stage === 'done' && (
            <motion.div
              initial={{ scale: 0, rotate: -45, opacity: 0 }}
              animate={{ scale: [0, 1.3, 1], rotate: [0, 45, 0], opacity: 1 }}
              transition={{ duration: 0.45 }}
              className="absolute -top-3 -right-4 text-[var(--yellow)] pointer-events-none"
            >
              <Sparkles className="w-9 h-9 drop-shadow-md" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Replay Button */}
      <button
        onClick={restart}
        className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border-2 border-[var(--canvas-border)] bg-[var(--canvas-raised)] hover:bg-[var(--canvas-sunken)] text-xs font-mono font-bold text-[var(--ink)] hover:text-[var(--blue)] transition-all cursor-pointer shadow-sm hover:scale-105"
        title="Replay handwriting drawing stroke animation"
      >
        <RotateCcw className="w-3.5 h-3.5 text-[var(--blue)]" />
        <span>Replay Handwriting</span>
      </button>
    </div>
  );
}
