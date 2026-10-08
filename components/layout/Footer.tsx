'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowUp, 
  Sparkles, 
  Heart, 
  Coffee, 
  Terminal, 
  BookOpen, 
  Database, 
  Code2, 
  MessageSquare, 
  Layers, 
  Briefcase,
  MapPin,
  ExternalLink
} from 'lucide-react';
import NavLogo from '@/components/NavLogo';

export const Footer = () => {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative mt-24 select-none bg-[var(--canvas-raised)] border-t-2 border-[var(--canvas-border)]">
      {/* ── HAND-DRAWN JAGGED TORN NOTEBOOK PAPER EDGE ── */}
      <div className="absolute -top-3.5 left-0 right-0 h-4 overflow-hidden pointer-events-none">
        <svg
          viewBox="0 0 1200 16"
          preserveAspectRatio="none"
          className="w-full h-full text-[var(--canvas-raised)] fill-current"
        >
          <path d="M 0,16 L 0,6 Q 15,0 30,6 T 60,6 T 90,6 T 120,6 T 150,6 T 180,6 T 210,6 T 240,6 T 270,6 T 300,6 T 330,6 T 360,6 T 390,6 T 420,6 T 450,6 T 480,6 T 510,6 T 540,6 T 570,6 T 600,6 T 630,6 T 660,6 T 690,6 T 720,6 T 750,6 T 780,6 T 810,6 T 840,6 T 870,6 T 900,6 T 930,6 T 960,6 T 990,6 T 1020,6 T 1050,6 T 1080,6 T 1110,6 T 1140,6 T 1170,6 T 1200,6 L 1200,16 Z" />
        </svg>
      </div>

      {/* ── ROW OF SPIRAL BINDER PUNCH HOLES ── */}
      <div className="w-full flex justify-around items-center pt-3 pb-1 px-8 pointer-events-none opacity-40 dark:opacity-25">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-full bg-[var(--canvas-border)] border border-[var(--ink)]/20 shadow-inner"
          />
        ))}
      </div>

      <div className="container mx-auto px-6 pt-8 pb-12">
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 mb-14">
          
          {/* Column 1 & 2: Brand Identity, Manifesto & Stamps */}
          <div className="lg:col-span-2 space-y-4 pr-2">
            <NavLogo href="/" size="lg" showTag={true} />

            <p
              className="text-sm sm:text-base leading-relaxed text-[var(--ink-2)] max-w-sm pt-1"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              A free, structured, student-led data science &amp; coding universe. Built by practitioners for learners &mdash; zero paywalls, zero ads, running 100% in your browser.
            </p>

            {/* Handcrafted Rubber Stamps */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="stamp-badge stamp-badge-pencil">
                💮 100% Free Forever
              </span>
              <span className="stamp-badge stamp-badge-pen">
                ✏️ 155 SQL Challenges
              </span>
              <span className="stamp-badge stamp-badge-marker">
                ⚡ Isolated SQLite WASM
              </span>
            </div>

            {/* Student Coffee Note */}
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[var(--ink-3)]">
              <Coffee className="w-4 h-4 text-[var(--orange)]" />
              <span>Built with ☕ &amp; ✏️ by N8N Data Science Community</span>
            </div>
          </div>

          {/* Column 3: 404-Found-Code (SQL IDE) */}
          <div className="space-y-3">
            <h4
              className="text-base font-bold crayon-heading text-[var(--ink)] flex items-center gap-1.5"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span>🗄️</span>
              <span>404-Found-Code</span>
            </h4>
            <ul className="space-y-2 text-sm font-medium" style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-2)' }}>
              <li>
                <Link href="/code" className="text-[var(--blue)] font-bold hover:underline flex items-center gap-1">
                  <span>Problems Board</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[var(--yellow)] text-black font-bold">155</span>
                </Link>
              </li>
              <li>
                <Link href="/code/p001" className="hover:text-[var(--blue)] transition-colors">
                  Interactive IDE Sandbox
                </Link>
              </li>
              <li>
                <Link href="/code?diff=easy" className="hover:text-[var(--blue)] transition-colors">
                  Easy SQL (30 Problems)
                </Link>
              </li>
              <li>
                <Link href="/code?diff=medium" className="hover:text-[var(--blue)] transition-colors">
                  Medium SQL (95 Problems)
                </Link>
              </li>
              <li>
                <Link href="/code?diff=hard" className="hover:text-[var(--blue)] transition-colors">
                  Hard SQL (30 Problems)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Learning Tracks */}
          <div className="space-y-3">
            <h4
              className="text-base font-bold crayon-heading text-[var(--ink)] flex items-center gap-1.5"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span>📚</span>
              <span>Learning Tracks</span>
            </h4>
            <ul className="space-y-2 text-sm font-medium" style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-2)' }}>
              <li>
                <Link href="/learn" className="hover:text-[var(--blue)] transition-colors">
                  All 10 Subjects
                </Link>
              </li>
              <li>
                <Link href="/learn/sql" className="hover:text-[var(--blue)] transition-colors">
                  SQL &amp; Relational DBs
                </Link>
              </li>
              <li>
                <Link href="/learn/python" className="hover:text-[var(--blue)] transition-colors">
                  Python for Data Science
                </Link>
              </li>
              <li>
                <Link href="/learn/ml" className="hover:text-[var(--blue)] transition-colors">
                  Machine Learning
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="hover:text-[var(--blue)] transition-colors">
                  Interactive Roadmap
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Projects & Interview */}
          <div className="space-y-3">
            <h4
              className="text-base font-bold crayon-heading text-[var(--ink)] flex items-center gap-1.5"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span>🛠️</span>
              <span>Lab &amp; Prep</span>
            </h4>
            <ul className="space-y-2 text-sm font-medium" style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-2)' }}>
              <li>
                <Link href="/projects" className="hover:text-[var(--blue)] transition-colors">
                  8 Portfolio Projects
                </Link>
              </li>
              <li>
                <Link href="/interview" className="hover:text-[var(--blue)] transition-colors">
                  Interview Questions
                </Link>
              </li>
              <li>
                <Link href="/interview/mock" className="hover:text-[var(--blue)] transition-colors">
                  Mock Interview Mode
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[var(--blue)] transition-colors">
                  Student Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 6: Community & Pinned Sticky Note */}
          <div className="space-y-3">
            <h4
              className="text-base font-bold crayon-heading text-[var(--ink)] flex items-center gap-1.5"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span>🚀</span>
              <span>Community</span>
            </h4>
            <ul className="space-y-2 text-sm font-medium" style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-2)' }}>
              <li>
                <Link href="/about" className="hover:text-[var(--blue)] transition-colors">
                  Our Story &amp; Origin
                </Link>
              </li>
              <li>
                <Link
                  href="https://discord.gg/J8uNurwr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--blue)] transition-colors flex items-center gap-1.5"
                >
                  <span>Discord Server</span>
                  <span className="text-[10px] text-[var(--green)] font-bold">● Active</span>
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/404found"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--blue)] transition-colors flex items-center gap-1"
                >
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3 h-3 text-[var(--ink-3)]" />
                </Link>
              </li>
            </ul>

            {/* Pinned Mini Suggestion Post-It */}
            <div className="p-3 rounded-xl border border-[#eedc65] bg-[#fffab3] dark:bg-[#321c54] dark:border-[#6a38a8] text-[#111827] dark:text-[#fbf5eb] text-xs font-mono shadow-sm transform -rotate-1 hover:rotate-0 transition-transform">
              <div className="font-bold flex items-center gap-1 mb-1 text-[11px]">
                <span>📌</span>
                <span>Suggestion Box</span>
              </div>
              <div className="text-[10px] text-[#4b5563] dark:text-[#d1d5db] leading-tight">
                Found a bug or have a problem request? Join our Discord community!
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Rocket Scroll to Top */}
        <div className="pt-8 border-t border-[var(--canvas-border)] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-[var(--ink-3)]">
          <div className="flex items-center gap-2 flex-wrap text-center sm:text-left">
            <span>&copy; {new Date().getFullYear()} 404 Found.</span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="italic font-bold text-[var(--ink)]">&ldquo;We were not found &mdash; until now.&rdquo;</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline">Runs 100% In-Browser SQLite WASM</span>
            <span className="hidden md:inline">&bull;</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border-2 border-[var(--canvas-border)] bg-[var(--canvas)] hover:bg-[var(--canvas-sunken)] text-[var(--ink)] font-bold transition-all hover:-translate-y-0.5 cursor-pointer shadow-sm hover:border-[var(--blue)]"
              title="Fly back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[var(--blue)]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
