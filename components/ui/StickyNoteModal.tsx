'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface StickyNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  subtitle?: string;
  badge?: string;
  pinType?: 'pushpin' | 'tape' | 'paperclip';
  pinColor?: 'red' | 'blue' | 'yellow' | 'green';
  color?: 'yellow' | 'pink' | 'cyan' | 'mint' | 'purple';
  children: React.ReactNode;
  className?: string;
}

export default function StickyNoteModal({
  isOpen,
  onClose,
  title,
  subtitle,
  badge,
  pinType = 'pushpin',
  pinColor = 'red',
  color = 'yellow',
  children,
  className = '',
}: StickyNoteModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Authentic physical Post-It paper color palettes
  const colorMap = {
    yellow: {
      paperBg: '#fff975',
      paperDarkBg: '#2a1a44',
      glueBand: 'rgba(234, 179, 8, 0.18)',
      edgeBorder: 'rgba(202, 138, 4, 0.25)',
      curlFill: '#faee60',
      curlDarkFill: '#3e2366',
    },
    pink: {
      paperBg: '#ffd5dc',
      paperDarkBg: '#3d1428',
      glueBand: 'rgba(244, 63, 94, 0.18)',
      edgeBorder: 'rgba(225, 29, 72, 0.25)',
      curlFill: '#fca5b4',
      curlDarkFill: '#591436',
    },
    cyan: {
      paperBg: '#d5f2fc',
      paperDarkBg: '#0e294b',
      glueBand: 'rgba(14, 165, 233, 0.18)',
      edgeBorder: 'rgba(2, 132, 199, 0.25)',
      curlFill: '#bae6fd',
      curlDarkFill: '#174378',
    },
    mint: {
      paperBg: '#d6f7db',
      paperDarkBg: '#0d3322',
      glueBand: 'rgba(34, 197, 94, 0.18)',
      edgeBorder: 'rgba(22, 163, 74, 0.25)',
      curlFill: '#bbf7d0',
      curlDarkFill: '#19593c',
    },
    purple: {
      paperBg: '#ede4ff',
      paperDarkBg: '#2c144f',
      glueBand: 'rgba(168, 85, 247, 0.18)',
      edgeBorder: 'rgba(147, 51, 234, 0.25)',
      curlFill: '#e9d5ff',
      curlDarkFill: '#451a7e',
    },
  }[color];

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[150] flex items-start sm:items-center justify-center p-3 sm:p-6 overflow-y-auto"
        style={{
          perspective: '1600px',
          paddingTop: 'max(2.5rem, env(safe-area-inset-top, 36px))',
          paddingBottom: 'max(2rem, env(safe-area-inset-bottom, 28px))',
        }}
      >
        {/* Soft Ambient Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-[5px] cursor-pointer"
          onClick={onClose}
        />

        {/* ── REALISTIC 3D FLYING PHYSICAL POST-IT PAPER NOTE ── */}
        <motion.div
          initial={{
            opacity: 0,
            y: -120,
            scale: 0.88,
            rotateX: 20,
            rotateY: -10,
            rotateZ: -6,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            rotateZ: -0.8,
          }}
          exit={{
            opacity: 0,
            y: 80,
            scale: 0.85,
            rotateX: -12,
            rotateZ: 4,
            transition: { duration: 0.2, ease: 'easeIn' },
          }}
          transition={{
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`relative w-full max-w-[440px] my-auto p-6 sm:p-7 select-none text-left z-10 rounded-[3px] transition-shadow duration-300 shrink-0 ${className}`}
          style={{
            transformOrigin: 'top center',
            backgroundColor: colorMap.paperBg,
            /* Dual-layer realistic paper shadow: tight at the glued top, diffuse & deep at the lifted bottom */
            boxShadow: `
              0 1px 2px rgba(0, 0, 0, 0.08),
              0 6px 14px -2px rgba(0, 0, 0, 0.16),
              0 20px 35px -8px rgba(0, 0, 0, 0.28),
              -8px 24px 28px -6px rgba(0, 0, 0, 0.18)
            `,
            border: `1px solid ${colorMap.edgeBorder}`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── REALISTIC PAPER FIBER TEXTURE OVERLAY ── */}
          <div
            className="absolute inset-0 pointer-events-none rounded-[3px] opacity-[0.07] mix-blend-multiply"
            style={{
              backgroundImage: `radial-gradient(#000 0.75px, transparent 0.75px)`,
              backgroundSize: '8px 8px',
            }}
          />

          {/* ── TOP ADHESIVE GLUE BAND (Matte pressed strip at the top) ── */}
          <div
            className="absolute top-0 left-0 right-0 h-10 pointer-events-none border-b border-black/[0.06] rounded-t-[3px]"
            style={{ backgroundColor: colorMap.glueBand }}
          />

          {/* ── 3D REALISTIC METALLIC PUSHPIN PINNING THE PAPER ── */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 pointer-events-none z-30 flex flex-col items-center drop-shadow-md">
            {/* Glossy Red Pushpin Head */}
            <div className="relative w-7 h-7 rounded-full bg-gradient-to-br from-red-500 via-rose-600 to-red-900 border-2 border-white/95 shadow-md flex items-center justify-center">
              {/* Reflection Specular Arc */}
              <div className="absolute top-1 left-1.5 w-2.5 h-1.5 rounded-full bg-white/85 transform -rotate-45" />
              {/* Inner Depression Point */}
              <div className="w-2 h-2 rounded-full bg-red-950/50 border border-red-300/40" />
            </div>
            {/* Metal Pin Needle Shaft */}
            <div className="w-1.5 h-3 bg-gradient-to-r from-neutral-300 via-neutral-100 to-neutral-400 -mt-1 shadow-sm" />
            {/* Pinhole Puncture Slit in Paper */}
            <div className="w-3.5 h-1 rounded-full bg-black/45 -mt-0.5 filter blur-[0.5px]" />
          </div>

          {/* ── REALISTIC BOTTOM-RIGHT CORNER PAPER CURL ── */}
          <div className="absolute bottom-0 right-0 w-11 h-11 pointer-events-none overflow-hidden rounded-br-[3px]">
            {/* Drop Shadow cast on surface by curled paper tip */}
            <div
              className="absolute bottom-0 right-0 w-8 h-8 rounded-tl-xl filter blur-[2.5px]"
              style={{ background: 'rgba(0,0,0,0.32)' }}
            />
            {/* Folded Paper Corner Triangle */}
            <svg viewBox="0 0 44 44" className="absolute bottom-0 right-0 w-full h-full">
              <path
                d="M 44,0 Q 22,22 0,44 L 44,44 Z"
                fill={colorMap.curlFill}
                stroke="rgba(0,0,0,0.18)"
                strokeWidth="0.8"
              />
            </svg>
          </div>

          {/* ── MINIMAL PAPER CLOSE (x) BUTTON ── */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/15 hover:bg-black/25 text-[#111827] flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer z-30 shadow-xs border border-black/10"
            aria-label="Close Note"
            title="Close Note"
          >
            <X className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
          </button>

          {/* Header Section */}
          {(title || badge) && (
            <div className="mb-3.5 pr-8 space-y-1 relative z-10 pt-1.5">
              {badge && (
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-black/20 bg-black/5 text-[11px] font-mono font-bold text-[#111827]">
                  {badge}
                </div>
              )}
              {title && (
                <h3
                  className="text-2xl sm:text-3xl font-bold tracking-tight crayon-heading leading-tight text-[#111827]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {title}
                </h3>
              )}
              {subtitle && (
                <p
                  className="text-sm font-medium leading-relaxed text-[#374151]"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {subtitle}
                </p>
              )}
            </div>
          )}

          {/* Content Body (Rendered as Ink On Paper) */}
          <div className="relative z-10 text-[#111827]">
            {children}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
