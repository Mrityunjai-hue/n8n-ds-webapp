'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface NavLogoProps {
  href?: string;
  size?: 'sm' | 'md' | 'lg';
  showTag?: boolean;
}

export default function NavLogo({
  href = '/',
  size = 'md',
  showTag = true,
}: NavLogoProps) {
  const [isHovered, setIsHovered] = useState(false);

  const isSmall = size === 'sm';
  const isLarge = size === 'lg';

  return (
    <Link
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="inline-flex items-center gap-3 select-none group cursor-pointer transition-transform duration-200 hover:scale-[1.03]"
      aria-label="404 Found — Home"
    >
      {/* ── DESIGNER DOODLE NOTEBOOK & PENCIL BADGE ── */}
      <div
        className={`relative shrink-0 flex items-center justify-center ${
          isSmall ? 'w-8 h-8' : isLarge ? 'w-12 h-12' : 'w-10 h-10'
        }`}
      >
        {/* Washi Tape on Top Left of Emblem */}
        <motion.div
          animate={{
            rotate: isHovered ? [-10, -14, -8, -10] : -10,
            y: isHovered ? -1 : 0,
          }}
          transition={{ duration: 0.4 }}
          className="absolute -top-1.5 -left-1.5 w-5 h-2.5 rounded-[1px] opacity-90 border border-black/15 shadow-sm z-20 pointer-events-none"
          style={{ backgroundColor: 'var(--yellow)' }}
        />

        {/* Spiral Notebook SVG Sheet */}
        <svg
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transform transition-all duration-300 group-hover:rotate-[-2.5deg]"
        >
          {/* Paper Drop Shadow */}
          <rect
            x="6"
            y="6"
            width="34"
            height="34"
            rx="6"
            fill="var(--canvas-border)"
            opacity="0.75"
          />

          {/* Main Paper Sheet with warm paper fill */}
          <rect
            x="4"
            y="4"
            width="34"
            height="34"
            rx="6"
            fill="var(--canvas-raised)"
            stroke="var(--ink)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Notebook Grid / Ruled Lines */}
          <line
            x1="12"
            y1="12"
            x2="32"
            y2="12"
            stroke="var(--canvas-border)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="12"
            y1="18"
            x2="32"
            y2="18"
            stroke="var(--canvas-border)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="12"
            y1="24"
            x2="32"
            y2="24"
            stroke="var(--canvas-border)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="12"
            y1="30"
            x2="32"
            y2="30"
            stroke="var(--canvas-border)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Spiral Binding Loops on Left Margin */}
          {[10, 16, 22, 28, 34].map((yPos, i) => (
            <g key={i}>
              <circle cx="5" cy={yPos} r="1.5" fill="var(--canvas)" stroke="var(--ink)" strokeWidth="1.2" />
              <path
                d={`M2,${yPos - 1} C2,${yPos - 3} 6,${yPos - 3} 6,${yPos}`}
                stroke="var(--ink)"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </g>
          ))}

          {/* Cute Doodle Pencil drawing across */}
          <motion.g
            animate={{
              rotate: isHovered ? [0, 8, -4, 0] : 0,
              x: isHovered ? [0, 2, -1, 0] : 0,
              y: isHovered ? [0, -2, 1, 0] : 0,
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{ transformOrigin: '24px 22px' }}
          >
            {/* Pencil Body (Yellow hexagon barrel) */}
            <path
              d="M17,29 L28,14 L32,17 L21,32 Z"
              fill="var(--yellow)"
              stroke="var(--ink)"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            {/* Ferrule (Metal band) */}
            <path
              d="M28,14 L30,11.5 L34,14.5 L32,17 Z"
              fill="var(--canvas-border)"
              stroke="var(--ink)"
              strokeWidth="1.2"
            />
            {/* Pink Eraser */}
            <path
              d="M30,11.5 L32,9 L36,12 L34,14.5 Z"
              fill="var(--red)"
              stroke="var(--ink)"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            {/* Wooden Tip */}
            <polygon
              points="17,29 13,34 21,32"
              fill="#e6c280"
              stroke="var(--ink)"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            {/* Graphite Lead Tip */}
            <polygon points="13,34 11.5,36 15,35" fill="var(--ink)" />
          </motion.g>

          {/* Mini Hand-Drawn Sparkle / Star */}
          <motion.path
            d="M32,7 L33.2,9.8 L36,10.2 L33.8,12.2 L34.4,15 L32,13.6 L29.6,15 L30.2,12.2 L28,10.2 L30.8,9.8 Z"
            fill="var(--yellow)"
            stroke="var(--ink)"
            strokeWidth="0.8"
            animate={{
              scale: isHovered ? [1, 1.25, 1] : 1,
              rotate: isHovered ? [0, 45, 0] : 0,
            }}
            transition={{ duration: 0.4 }}
            style={{ transformOrigin: '32px 11px' }}
          />
        </svg>
      </div>

      {/* ── HAND-LETTERED WORDMARK ── */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5 leading-none">
          {/* "404" Crayon Heading */}
          <span
            className={`font-bold tracking-tight crayon-heading ${
              isSmall ? 'text-xl' : isLarge ? 'text-3xl' : 'text-2xl sm:text-[26px]'
            }`}
            style={{
              fontFamily: 'var(--font-heading)',
              color: 'var(--ink)',
            }}
          >
            404
          </span>

          {/* Hand-Drawn Pencil Dash */}
          <span
            className="font-bold text-sm select-none"
            style={{ color: 'var(--orange)' }}
          >
            ~
          </span>

          {/* "Found" in Ballpoint Blue with Animated Highlighter */}
          <span className="relative inline-block">
            <span
              className={`font-bold tracking-tight ${
                isSmall ? 'text-xl' : isLarge ? 'text-3xl' : 'text-2xl sm:text-[26px]'
              }`}
              style={{
                fontFamily: 'var(--font-heading)',
                color: 'var(--blue)',
              }}
            >
              Found
            </span>

            {/* Hand-drawn Highlighter Swish Stroke on Hover */}
            <motion.svg
              className="absolute -bottom-1.5 left-0 w-full h-2.5 pointer-events-none opacity-85"
              viewBox="0 0 54 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ pathLength: 0.7 }}
              animate={{
                pathLength: isHovered ? 1 : 0.75,
                scaleY: isHovered ? 1.2 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <path
                d="M1,6 Q27,2 53,5.5"
                stroke="var(--yellow)"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </motion.svg>
          </span>

          {/* Optional CODE / DS Stamp Tag */}
          {showTag && (
            <span
              className="ml-1.5 px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider rounded border border-[var(--canvas-border)] bg-[var(--yellow-tint)] text-[var(--ink)] shadow-[0.5px_0.5px_0_var(--ink)] transform -rotate-2 group-hover:rotate-0 transition-transform"
            >
              CODE
            </span>
          )}
        </div>

        {/* Hand-written Subtitle (Only on large / desktop logo) */}
        {isLarge && (
          <span
            className="text-xs font-mono text-[var(--ink-3)] -mt-0.5 tracking-tight"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            data science &bull; interview &bull; wasm
          </span>
        )}
      </div>
    </Link>
  );
}
