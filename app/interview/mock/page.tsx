'use client';

import Link from 'next/link';
import { BrainCircuit, ArrowLeft } from 'lucide-react';
import MockSimulator from '@/components/interview/MockSimulator';

export default function MockInterviewPage() {
  return (
    <div className="min-h-screen">
      {/* ── Header ── */}
      <div className="relative overflow-hidden border-b border-border bg-bg-secondary">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 py-10">
          {/* Back link */}
          <Link
            href="/interview"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent-teal transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Question Bank
          </Link>

          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-accent-teal/10 border border-accent-teal/20">
              <BrainCircuit className="w-5 h-5 text-accent-teal" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-accent-teal">
              AI-Powered · Mock Interview
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary leading-tight">
            Mock Interview Simulator
          </h1>
          <p className="text-text-secondary mt-2 text-base max-w-xl">
            Answer real interview questions. Get instant AI feedback on your score, what you nailed, and what to improve.
          </p>
        </div>
      </div>

      {/* ── Simulator ── */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <MockSimulator />
      </div>
    </div>
  );
}
