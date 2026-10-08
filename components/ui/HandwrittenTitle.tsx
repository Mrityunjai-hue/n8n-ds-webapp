'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw } from 'lucide-react';

interface HandwrittenTitleProps {
  text?: string;
  highlightText?: string;
  subtext?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const HandwrittenTitle: React.FC<HandwrittenTitleProps> = ({
  text = '404 - Found',
  highlightText,
  subtext = 'Code Sandbox & Practice',
  className = '',
  size = 'md',
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDoneWriting, setIsDoneWriting] = useState(false);
  const [redrawKey, setRedrawKey] = useState(0);

  useEffect(() => {
    let currentIdx = 0;
    setDisplayedText('');
    setIsDoneWriting(false);

    const interval = setInterval(() => {
      if (currentIdx <= text.length) {
        setDisplayedText(text.slice(0, currentIdx));
        currentIdx++;
      } else {
        clearInterval(interval);
        setIsDoneWriting(true);
      }
    }, 85);

    return () => clearInterval(interval);
  }, [text, redrawKey]);

  const sizeClasses = {
    sm: 'text-3xl sm:text-4xl',
    md: 'text-4xl sm:text-6xl md:text-7xl',
    lg: 'text-5xl sm:text-7xl md:text-8xl',
  }[size];

  return (
    <div className={`relative inline-block select-none ${className}`} key={redrawKey}>
      {/* Main Animated Handwritten Heading */}
      <div className="flex items-center gap-2 flex-wrap">
        <span
          className={`${sizeClasses} font-bold tracking-tight crayon-heading relative inline-flex items-center`}
          style={{
            fontFamily: 'var(--font-heading)',
            color: 'var(--ink)',
          }}
        >
          {displayedText}

          {/* Animated Hand-drawn SVG Pencil Cursor following the letters */}
          <AnimatePresence>
            {!isDoneWriting && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: [0, -12, 6, 0],
                  y: [0, -3, 2, 0],
                }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ repeat: Infinity, duration: 0.25 }}
                className="inline-block ml-1 align-middle pointer-events-none"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transform -rotate-12"
                >
                  <path
                    d="M12,24 L26,10 L29,13 L15,27 Z"
                    fill="var(--yellow)"
                    stroke="var(--ink)"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M26,10 L28,8 L31,11 L29,13 Z"
                    fill="var(--canvas-border)"
                    stroke="var(--ink)"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M28,8 L30,6 L33,9 L31,11 Z"
                    fill="var(--red)"
                    stroke="var(--ink)"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                  <polygon
                    points="12,24 8,28 15,27"
                    fill="#e6c280"
                    stroke="var(--ink)"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                  <polygon points="8,28 6,30 10,29" fill="var(--ink)" />
                </svg>
              </motion.span>
            )}
          </AnimatePresence>

          {/* Hand-drawn Highlighter Stroke after writing finishes */}
          {isDoneWriting && (
            <motion.svg
              className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-4 sm:h-5 pointer-events-none z-[-1]"
              viewBox="0 0 300 18"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.85 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <path
                d="M4,11 Q75,3 150,10 T296,9"
                stroke="var(--yellow)"
                strokeWidth="12"
                strokeLinecap="round"
                style={{ filter: 'url(#crayon-roughness)' }}
              />
            </motion.svg>
          )}
        </span>
      </div>

      {/* Subtext and Quick Redraw Action */}
      {subtext && isDoneWriting && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-xs sm:text-sm font-mono text-[var(--ink-3)] mt-1.5 flex items-center gap-2 flex-wrap"
        >
          <span className="text-[var(--blue)] font-bold">●</span>
          <span>{subtext}</span>
          <button
            onClick={() => setRedrawKey((k) => k + 1)}
            title="Redraw"
            className="p-1 rounded hover:bg-[var(--canvas-sunken)] text-[var(--ink-4)] hover:text-[var(--ink)] transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </motion.div>
      )}
    </div>
  );
};
