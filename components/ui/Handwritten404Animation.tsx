'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Sparkles } from 'lucide-react';

interface Handwritten404AnimationProps {
  mode?: 'hero' | 'notFound' | 'codeHeader' | 'compact';
  onComplete?: () => void;
  className?: string;
}

export default function Handwritten404Animation({
  mode = 'hero',
  onComplete,
  className = '',
}: Handwritten404AnimationProps) {
  const [animationKey, setAnimationKey] = useState(0);
  const [stage, setStage] = useState<'drawing' | 'highlighting' | 'completed'>('drawing');
  const [displayedText, setDisplayedText] = useState('');
  const [pencilPos, setPencilPos] = useState({ x: 0, y: 0 });

  const targetWord = mode === 'notFound' ? '404 · Found' : '404-Found';

  // Step-by-step handwriting simulation
  useEffect(() => {
    setStage('drawing');
    setDisplayedText('');
    let currentIndex = 0;
    const totalChars = targetWord.length;

    const interval = setInterval(() => {
      currentIndex++;
      setDisplayedText(targetWord.slice(0, currentIndex));
      
      // Calculate simulated pencil coordinates across width
      const progress = currentIndex / totalChars;
      setPencilPos({
        x: progress * 100,
        y: Math.sin(progress * Math.PI * 4) * 6,
      });

      if (currentIndex >= totalChars) {
        clearInterval(interval);
        setStage('highlighting');
        
        setTimeout(() => {
          setStage('completed');
          if (onComplete) onComplete();
        }, 600);
      }
    }, 110);

    return () => clearInterval(interval);
  }, [animationKey, targetWord, onComplete]);

  const restartAnimation = () => {
    setAnimationKey((prev) => prev + 1);
  };

  const isNotFound = mode === 'notFound';
  const isCompact = mode === 'compact';

  return (
    <div
      className={`relative inline-flex flex-col items-center select-none ${className}`}
      key={animationKey}
    >
      {/* Container for the animated letters & moving pencil */}
      <div className="relative inline-flex items-center justify-center min-h-[70px] sm:min-h-[90px] px-4 py-2">
        {/* Animated Text Display */}
        <div className="flex items-baseline gap-2 relative z-10">
          {/* "404" in Crayon Heading */}
          <span
            className={`font-bold tracking-tight crayon-heading transition-all ${
              isCompact
                ? 'text-3xl'
                : isNotFound
                ? 'text-6xl sm:text-8xl'
                : 'text-5xl sm:text-7xl md:text-8xl'
            }`}
            style={{
              fontFamily: 'var(--font-heading)',
              color: 'var(--ink)',
            }}
          >
            {displayedText.split(' ')[0] || ''}
          </span>

          {/* Separator / Word Part 2 */}
          {displayedText.length > 3 && (
            <span
              className={`font-bold tracking-tight crayon-blue transition-all ${
                isCompact
                  ? 'text-3xl'
                  : isNotFound
                  ? 'text-6xl sm:text-8xl'
                  : 'text-5xl sm:text-7xl md:text-8xl'
              }`}
              style={{
                fontFamily: 'var(--font-heading)',
                color: 'var(--blue)',
              }}
            >
              {displayedText.slice(displayedText.indexOf(isNotFound ? '·' : '-') >= 0 ? displayedText.indexOf(isNotFound ? '·' : '-') : 3)}
            </span>
          )}
        </div>

        {/* Live Active Pencil Cursor that glides as letters are written */}
        <AnimatePresence>
          {stage === 'drawing' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: `${pencilPos.x * 2.2 - 20}px`,
                y: `${pencilPos.y - 10}px`,
              }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: 'spring', damping: 15, stiffness: 200 }}
              className="absolute pointer-events-none z-20"
              style={{ left: '0%' }}
            >
              {/* Hand-drawn SVG Pencil */}
              <div className="relative transform -rotate-[25deg] origin-bottom-left">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="animate-pencil-bob drop-shadow-md"
                >
                  {/* Yellow Hexagonal Body */}
                  <path
                    d="M12,24 L26,10 L29,13 L15,27 Z"
                    fill="var(--yellow)"
                    stroke="var(--ink)"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  {/* Metal Ferrule */}
                  <path
                    d="M26,10 L28,8 L31,11 L29,13 Z"
                    fill="var(--canvas-border)"
                    stroke="var(--ink)"
                    strokeWidth="1.2"
                  />
                  {/* Pink Eraser */}
                  <path
                    d="M28,8 L30,6 L33,9 L31,11 Z"
                    fill="var(--red)"
                    stroke="var(--ink)"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                  {/* Sharpened Wood Cone */}
                  <polygon
                    points="12,24 8,28 15,27"
                    fill="#e6c280"
                    stroke="var(--ink)"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                  {/* Black Graphite Tip */}
                  <polygon points="8,28 6,30 10,29" fill="var(--ink)" />
                </svg>

                {/* Graphite Particle Dust */}
                <span className="absolute bottom-0 left-0 w-1.5 h-1.5 rounded-full bg-[var(--ink)] opacity-60 animate-ping" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hand-Drawn Highlighter Swipe under the written text */}
        <AnimatePresence>
          {(stage === 'highlighting' || stage === 'completed') && (
            <motion.svg
              className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-4 sm:h-6 pointer-events-none z-0 opacity-90"
              viewBox="0 0 300 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.9 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <motion.path
                d="M10,14 Q80,6 150,13 T290,11"
                stroke="var(--yellow)"
                strokeWidth={isCompact ? '8' : '14'}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  filter: 'url(#crayon-roughness)',
                }}
              />
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Celebratory Sparkle when Complete */}
        <AnimatePresence>
          {stage === 'completed' && (
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: [0, 1.2, 1], rotate: [0, 90, 0] }}
              transition={{ duration: 0.4 }}
              className="absolute -top-3 -right-3 text-[var(--yellow)] pointer-events-none z-20"
            >
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Re-draw Button */}
      <button
        onClick={restartAnimation}
        title="Re-draw animation"
        className="mt-1 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-[var(--canvas-border)] bg-[var(--canvas-raised)] hover:bg-[var(--canvas-sunken)] text-[11px] font-mono text-[var(--ink-3)] hover:text-[var(--ink)] transition-colors cursor-pointer opacity-70 hover:opacity-100"
      >
        <RotateCcw className="w-3 h-3" />
        <span>Scribble Again</span>
      </button>
    </div>
  );
}
