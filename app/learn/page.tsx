'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  BrainCircuit, 
  Search,
  Filter,
  GraduationCap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { getAllSubjects } from '@/lib/content';
import { useProgressStore } from '@/lib/store/useProgressStore';

export default function LearnIndexPage() {
  const allSubjects = getAllSubjects();
  const { completedTopics } = useProgressStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<number | 'all'>('all');

  // Filter subjects by search and level
  const filteredSubjects = allSubjects.filter((subject) => {
    const matchesSearch =
      subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || subject.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="min-h-screen doodle-canvas py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10 select-none">
        
        {/* Header Title Section */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border-2 border-[var(--canvas-border)] bg-[var(--yellow-tint)] text-xs font-mono font-bold text-[var(--ink)] shadow-sm">
            <GraduationCap className="w-4 h-4 text-[var(--orange)]" />
            <span>10 SUBJECTS &bull; 100+ TOPICS &bull; ZERO PREREQUISITES</span>
          </div>

          <h1
            className="text-4xl sm:text-5xl font-bold tracking-tight crayon-heading leading-tight"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--ink)' }}
          >
            Data Science Learning Tracks
          </h1>

          <p
            className="text-base sm:text-lg text-[var(--ink-2)] leading-relaxed font-medium"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            A step-by-step, zero-to-hero curriculum designed for real world craft.
            From foundational SQL and Python to Machine Learning, Deep Learning, and Agentic Systems.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl border-2 border-[var(--canvas-border)] bg-[var(--canvas-raised)] shadow-sm">
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[var(--ink-3)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tracks or topics..."
              className="w-full pl-9 pr-3.5 py-2 bg-[var(--canvas)] border border-[var(--canvas-border)] focus:border-[var(--blue)] rounded-xl text-sm font-mono text-[var(--ink)] placeholder:text-[var(--ink-4)] outline-none transition-colors"
            />
          </div>

          {/* Level Filter Buttons */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-mono text-[var(--ink-3)] font-bold mr-1">LEVEL:</span>
            {[
              { label: 'All', value: 'all' },
              { label: '0: Foundations', value: 0 },
              { label: '1: SQL', value: 1 },
              { label: '2: Python', value: 2 },
              { label: '3: ML/DL', value: 3 },
            ].map((lvl) => (
              <button
                key={lvl.label}
                onClick={() => setSelectedLevel(lvl.value as any)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer border ${
                  selectedLevel === lvl.value
                    ? 'bg-[var(--blue)] text-white border-black shadow-[1px_1px_0_#000]'
                    : 'bg-[var(--canvas)] text-[var(--ink-2)] border-[var(--canvas-border)] hover:text-[var(--ink)]'
                }`}
              >
                {lvl.label}
              </button>
            ))}
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubjects.map((subject, idx) => {
            const Icon = subject.icon;
            const topicIds = subject.topics.map((t) => t.id);
            const completedCount = completedTopics.filter((id) => topicIds.includes(id)).length;
            const progress = subject.topics.length > 0 ? Math.round((completedCount / subject.topics.length) * 100) : 0;

            return (
              <Link
                href={`/learn/${subject.slug}`}
                key={subject.id}
                className="group block"
              >
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="h-full p-6 rounded-2xl border-2 border-[var(--canvas-border)] bg-[var(--canvas-raised)] hover:bg-[var(--canvas-sunken)] shadow-sm hover:shadow-md transition-all hover:-translate-y-1 doodle-border flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Header with Icon & Level Badge */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-[var(--yellow-tint)] border-2 border-[var(--canvas-border)] flex items-center justify-center text-[var(--ink)] shadow-sm group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-[var(--blue)]" />
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="px-2.5 py-0.5 rounded-full border border-[var(--canvas-border)] bg-[var(--canvas)] text-[10px] font-mono font-bold text-[var(--ink-2)]">
                          Level {subject.level}
                        </span>
                      </div>
                    </div>

                    {/* Subject Name & Description */}
                    <div>
                      <h3
                        className="text-xl font-bold tracking-tight text-[var(--ink)] group-hover:text-[var(--blue)] transition-colors flex items-center justify-between"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        <span>{subject.name}</span>
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                      </h3>
                      <p
                        className="text-xs sm:text-sm text-[var(--ink-2)] mt-1.5 leading-relaxed"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {subject.description}
                      </p>
                    </div>
                  </div>

                  {/* Footer Stats & Progress */}
                  <div className="mt-6 pt-4 border-t border-[var(--canvas-border)] space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-[var(--ink-3)]">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{subject.topics.length} Topics</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>~{subject.estimatedHours}h</span>
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-[var(--canvas-border)] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[var(--blue)] h-full rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    {progress > 0 && (
                      <div className="text-[10px] font-mono font-bold text-[var(--green)] flex items-center justify-between">
                        <span>{completedCount}/{subject.topics.length} completed</span>
                        <span>{progress}%</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
