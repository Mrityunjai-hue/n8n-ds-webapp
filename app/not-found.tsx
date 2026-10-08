'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Database, 
  BookOpen, 
  Sparkles, 
  Terminal, 
  Code2, 
  Home, 
  Compass, 
  Briefcase, 
  Layers, 
  ArrowRight,
  Search,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';
import AppleCursiveHandwriting from '@/components/ui/AppleCursiveHandwriting';

export default function NotFoundPage() {
  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-8 py-12 doodle-canvas relative overflow-hidden">
      
      {/* ── NOTEBOOK RED MARGIN LINE ON THE LEFT ── */}
      <div className="hidden lg:block absolute top-0 bottom-0 left-12 w-0.5 bg-rose-400/30 pointer-events-none" />
      <div className="hidden lg:block absolute top-0 bottom-0 left-14 w-0.5 bg-rose-400/20 pointer-events-none" />

      {/* Decorative Marginalia Hand Doodles */}
      <div className="hidden xl:block absolute top-16 left-20 pointer-events-none text-[var(--ink-4)] font-mono text-xs transform -rotate-12 select-none opacity-60">
        <div>✏️ margin_note:</div>
        <div>URL not mapped</div>
        <div>to active routes</div>
      </div>

      <div className="hidden xl:block absolute top-28 right-24 pointer-events-none select-none opacity-70">
        <div className="w-16 h-16 rounded-full border-2 border-dashed border-[var(--orange)] flex items-center justify-center transform rotate-12">
          <span className="text-2xl">🧭</span>
        </div>
        <div className="text-[10px] font-mono text-[var(--orange)] text-center mt-1">404 COMPASS</div>
      </div>

      <div className="w-full max-w-4xl mx-auto text-center space-y-8 select-none relative z-10">
        
        {/* Top Status Stamp */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-[var(--canvas-border)] bg-[var(--yellow-tint)] text-xs font-mono font-bold text-[var(--ink)] shadow-sm"
          >
            <Compass className="w-4 h-4 text-[var(--orange)] animate-spin" style={{ animationDuration: '8s' }} />
            <span>ERROR 404 &bull; PAGE WANDERED OFF THE NOTEBOOK MARGIN</span>
          </motion.div>
        </div>

        {/* Apple "hello"-Style Fluid Cursive Stroke Centerpiece */}
        <div className="py-2 flex justify-center">
          <AppleCursiveHandwriting size="hero" />
        </div>

        {/* Expressive Crayon Headline & Subtitle */}
        <div className="space-y-3 max-w-2xl mx-auto">
          <h1
            className="text-3xl sm:text-5xl font-bold crayon-heading tracking-tight"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--ink)' }}
          >
            We were not found... until now!
          </h1>
          <p
            className="text-base sm:text-xl text-[var(--ink-2)] leading-relaxed font-medium"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            The specific route you requested isn&apos;t written in this notebook, but your learning journey doesn&apos;t stop here. Pick a learning track, test queries in our browser SQLite sandbox, or explore the problem bank.
          </p>
        </div>

        {/* Hand-Drawn Notebook SQL Sandbox Query Console */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto bg-[var(--canvas-sunken)] dark:bg-[#12082a] border-2 border-[var(--canvas-border)] rounded-2xl p-5 text-left font-mono text-xs leading-relaxed shadow-sm relative overflow-hidden"
        >
          <div className="flex items-center justify-between border-b border-[var(--canvas-border)] pb-2 mb-3">
            <div className="flex items-center gap-2 text-[var(--ink-2)]">
              <Terminal className="w-4 h-4 text-[var(--yellow)]" />
              <span className="font-bold">sqlite3 &bull; query_route_resolver.sql</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--canvas-raised)] border border-[var(--canvas-border)] text-[var(--ink-3)] font-mono">
              STATUS: 404
            </span>
          </div>

          <div className="text-[var(--ink-3)]">-- Searching platform index for requested path...</div>
          <div className="text-[var(--blue)] font-bold">
            SELECT <span className="text-[var(--orange)]">route_id</span>, <span className="text-[var(--green)]">target_portal</span>, <span className="text-[var(--yellow)]">status</span> FROM platform_manifest;
          </div>
          <div className="text-rose-500 font-bold mt-1.5">
            ➔ 0 rows returned (HTTP 404: route undefined)
          </div>
          <div className="text-emerald-500 font-bold mt-1">
            ➔ Resolution: 155 verified interview challenges and 10 tracks ready at <Link href="/code" className="underline hover:text-[var(--blue)]">/code</Link>
          </div>
        </motion.div>

        {/* ── 4 EXPANSIVE DOODLE PORTAL CARDS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto pt-2 text-left">
          
          {/* Card 1: 404-Found-Code (SQL IDE) */}
          <Link href="/code" className="group">
            <div className="h-full p-5 rounded-2xl border-2 border-[var(--canvas-border)] bg-[var(--canvas-raised)] hover:bg-[var(--canvas-sunken)] shadow-sm hover:shadow-md transition-all hover:-translate-y-1 doodle-border flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 border border-blue-400/40 flex items-center justify-center text-blue-600 mb-3">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-[var(--ink)] flex items-center gap-1 group-hover:text-[var(--blue)]" style={{ fontFamily: 'var(--font-heading)' }}>
                  <span>404-Found-Code</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-xs text-[var(--ink-2)] mt-1 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                  155 Real SQL interview questions with live SQLite WASM compiler.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-[var(--canvas-border)] flex items-center gap-1 text-[10px] font-mono text-[var(--blue)] font-bold">
                <span>155 Problems</span> &bull; <span>3 Tiers</span>
              </div>
            </div>
          </Link>

          {/* Card 2: 10-Subject Curriculum */}
          <Link href="/learn" className="group">
            <div className="h-full p-5 rounded-2xl border-2 border-[var(--canvas-border)] bg-[var(--canvas-raised)] hover:bg-[var(--canvas-sunken)] shadow-sm hover:shadow-md transition-all hover:-translate-y-1 doodle-border flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 border border-amber-400/40 flex items-center justify-center text-amber-600 mb-3">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-[var(--ink)] flex items-center gap-1 group-hover:text-[var(--orange)]" style={{ fontFamily: 'var(--font-heading)' }}>
                  <span>Learning Tracks</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-xs text-[var(--ink-2)] mt-1 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                  10 comprehensive tracks from Python &amp; SQL to Agents and Deep Learning.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-[var(--canvas-border)] flex items-center gap-1 text-[10px] font-mono text-[var(--orange)] font-bold">
                <span>10 Subjects</span> &bull; <span>100+ Topics</span>
              </div>
            </div>
          </Link>

          {/* Card 3: Projects Lab */}
          <Link href="/projects" className="group">
            <div className="h-full p-5 rounded-2xl border-2 border-[var(--canvas-border)] bg-[var(--canvas-raised)] hover:bg-[var(--canvas-sunken)] shadow-sm hover:shadow-md transition-all hover:-translate-y-1 doodle-border flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-400/40 flex items-center justify-center text-emerald-600 mb-3">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-[var(--ink)] flex items-center gap-1 group-hover:text-[var(--green)]" style={{ fontFamily: 'var(--font-heading)' }}>
                  <span>Projects Lab</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-xs text-[var(--ink-2)] mt-1 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                  8 Real-world portfolio projects with datasets &amp; guided checkpoints.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-[var(--canvas-border)] flex items-center gap-1 text-[10px] font-mono text-[var(--green)] font-bold">
                <span>8 Portfolio Builds</span>
              </div>
            </div>
          </Link>

          {/* Card 4: Interview Prep */}
          <Link href="/interview" className="group">
            <div className="h-full p-5 rounded-2xl border-2 border-[var(--canvas-border)] bg-[var(--canvas-raised)] hover:bg-[var(--canvas-sunken)] shadow-sm hover:shadow-md transition-all hover:-translate-y-1 doodle-border flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 border border-purple-400/40 flex items-center justify-center text-purple-600 mb-3">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-[var(--ink)] flex items-center gap-1 group-hover:text-[var(--purple)]" style={{ fontFamily: 'var(--font-heading)' }}>
                  <span>Interview Prep</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-xs text-[var(--ink-2)] mt-1 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                  Company Q&amp;A, flashcards, system design &amp; behavioral cheat-sheets.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-[var(--canvas-border)] flex items-center gap-1 text-[10px] font-mono text-[var(--purple)] font-bold">
                <span>Q&amp;A</span> &bull; <span>Flashcards</span>
              </div>
            </div>
          </Link>

        </div>

        {/* Back to Homepage Button */}
        <div className="pt-4 flex justify-center gap-3">
          <Link href="/">
            <button className="btn-doodle-primary px-6 py-2.5 text-sm gap-2">
              <Home className="w-4 h-4" />
              <span>Back to Home Platform</span>
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}
