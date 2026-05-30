'use client';

import { useState, useRef } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;800&family=JetBrains+Mono:wght@700&display=swap');

  .nl-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  .nl-icon {
    width: 28px;
    height: 28px;
    flex-shrink: 0;
    position: relative;
  }

  .nl-wordmark {
    display: flex;
    align-items: baseline;
    gap: 0px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 17px;
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1;
  }

  .nl-four {
    color: #ffffff;
    transition: color 0.2s ease;
  }

  .nl-found {
    background: linear-gradient(90deg, #22d3ee, #6366f1, #a855f7);
    background-size: 200% 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transition: background-position 0.6s ease;
    background-position: 100% 0;
  }

  .nl-wrap:hover .nl-found {
    background-position: 0% 0;
  }

  .nl-scanline-cross {
    transition: opacity 0.3s ease;
  }

  .nl-ring {
    transition: r 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
                stroke 0.25s ease,
                opacity 0.25s ease;
  }

  .nl-x {
    transition: opacity 0.2s ease, transform 0.2s ease;
    transform-origin: 14px 14px;
  }

  .nl-check {
    transition: opacity 0.25s ease 0.1s, transform 0.25s cubic-bezier(0.34,1.56,0.64,1) 0.1s;
    transform-origin: 14px 14px;
  }

  @keyframes nl-border-rotate {
    0%   { stroke-dashoffset: 0; }
    100% { stroke-dashoffset: -120; }
  }

  @keyframes nl-idle-pulse {
    0%, 100% { opacity: 0.9; }
    50%       { opacity: 0.5; }
  }

  @keyframes nl-scan-h {
    0%   { transform: translateY(0px); }
    50%  { transform: translateY(1px); }
    100% { transform: translateY(0px); }
  }

  @keyframes nl-scan-v {
    0%   { transform: translateX(0px); }
    50%  { transform: translateX(1px); }
    100% { transform: translateX(0px); }
  }

  .nl-scan-h { animation: nl-scan-h 3s ease-in-out infinite; }
  .nl-scan-v { animation: nl-scan-v 3.5s ease-in-out infinite; }
  .nl-pulse   { animation: nl-idle-pulse 2.4s ease-in-out infinite; }

  .nl-border-dash {
    animation: nl-border-rotate 3s linear infinite;
  }
`;

interface NavLogoProps {
  href?: string;
}

export default function NavLogo({ href = "/" }: NavLogoProps) {
  const [hovered, setHovered] = useState(false);
  const [locked, setLocked] = useState(false);
  const [glitchLabel, setGlitchLabel] = useState("404");
  const glitchRef = useRef(false);

  const GLITCH_FRAMES = ["4Ø4", "█04", "40█", "4Ø4", "404"];

  const runGlitch = async () => {
    if (glitchRef.current) return;
    glitchRef.current = true;
    for (const frame of GLITCH_FRAMES) {
      setGlitchLabel(frame);
      await new Promise((r) => setTimeout(r, 55));
    }
    setGlitchLabel("404");
    glitchRef.current = false;
  };

  const handleEnter = () => {
    setHovered(true);
    runGlitch();
    setTimeout(() => setLocked(true), 280);
  };

  const handleLeave = () => {
    setHovered(false);
    setTimeout(() => setLocked(false), 150);
  };

  // Ring radius: locked = small (4), default = medium (7)
  const ringR = locked ? 4 : 7;
  const ringStroke = locked ? "#22c55e" : "#22d3ee";
  const ringOpacity = hovered ? 1 : 0.7;

  // X opacity: hidden when locked
  const xOpacity = locked ? 0 : 1;
  const xScale = locked ? 0.3 : 1;

  // Check opacity: visible when locked
  const checkOpacity = locked ? 1 : 0;
  const checkScale = locked ? 1 : 0.3;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <a
        href={href}
        className="nl-wrap"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        aria-label="404 Found — Home"
      >
        {/* SVG Icon Mark */}
        <svg
          className="nl-icon"
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="nl-border-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#6366f1" />
              <stop offset="50%"  stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>

          {/* Background fill */}
          <rect x="1" y="1" width="26" height="26" rx="6" fill="#0a0a1a" />

          {/* Animated gradient border */}
          <rect
            x="1" y="1" width="26" height="26" rx="6"
            fill="none"
            stroke="url(#nl-border-grad)"
            strokeWidth="1.5"
            strokeDasharray="30 70"
            className="nl-border-dash"
            opacity={hovered ? 1 : 0.7}
          />

          {/* Static border underneath */}
          <rect
            x="1" y="1" width="26" height="26" rx="6"
            fill="none"
            stroke="#6366f1"
            strokeWidth="1"
            opacity="0.25"
          />

          {/* Crosshair horizontal */}
          <g className="nl-scan-h">
            <line
              x1="3" y1="14" x2="25" y2="14"
              stroke="#22d3ee" strokeWidth="0.7" opacity="0.35"
              className="nl-scanline-cross"
            />
          </g>

          {/* Crosshair vertical */}
          <g className="nl-scan-v">
            <line
              x1="14" y1="3" x2="14" y2="25"
              stroke="#22d3ee" strokeWidth="0.7" opacity="0.35"
              className="nl-scanline-cross"
            />
          </g>

          {/* Lock-on ring */}
          <circle
            cx="14" cy="14"
            r={ringR}
            fill="none"
            stroke={ringStroke}
            strokeWidth="1.2"
            opacity={ringOpacity}
            className="nl-ring nl-pulse"
          />

          {/* X mark (error state) */}
          <g
            className="nl-x"
            style={{
              opacity: xOpacity,
              transform: `scale(${xScale})`,
            }}
          >
            <line x1="11" y1="11" x2="17" y2="17" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="17" y1="11" x2="11" y2="17" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          {/* Checkmark (locked/found state) */}
          <g
            className="nl-check"
            style={{
              opacity: checkOpacity,
              transform: `scale(${checkScale})`,
            }}
          >
            <polyline
              points="10.5,14 13,16.5 17.5,11.5"
              stroke="#22c55e"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </g>
        </svg>

        {/* Wordmark */}
        <span className="nl-wordmark">
          <span className="nl-four">{glitchLabel}&nbsp;</span>
          <span className="nl-found">Found</span>
        </span>
      </a>
    </>
  );
}
