'use client';

import React, { useState, useMemo } from 'react';
import { BrainCircuit, Search, SlidersHorizontal, X, BookOpen } from 'lucide-react';
import { subjects } from '@/lib/content/subjects';
import { InterviewQuestionCard } from '@/components/learn/InterviewQuestionCard';

// ─── Types ────────────────────────────────────────────────────────────────────

type Difficulty = 'All' | 'Fresher' | 'Mid' | 'Senior';
type Category   = 'All' | 'Conceptual' | 'Scenario' | 'Coding' | 'Trap' | 'Theory';

interface FlatQuestion {
  question: string;
  answer: string;
  difficulty: 'Fresher' | 'Mid' | 'Senior';
  category: string;
  subjectId: string;
  subjectName: string;
  topicId: string;
  topicName: string;
  topicHref: string;
}

// ─── Flatten all questions from subjects ──────────────────────────────────────

function getAllQuestions(): FlatQuestion[] {
  const items: FlatQuestion[] = [];
  subjects.forEach((subject) => {
    subject.topics.forEach((topic) => {
      topic.interviewQuestions.forEach((q) => {
        items.push({
          question: q.question,
          answer: q.answer,
          difficulty: q.difficulty as 'Fresher' | 'Mid' | 'Senior',
          category: q.category,
          subjectId: subject.id,
          subjectName: subject.name,
          topicId: topic.id,
          topicName: topic.title,
          topicHref: `/learn/${subject.id}/${topic.id}#interview-questions`,
        });
      });
    });
  });
  return items;
}

const ALL_QUESTIONS = getAllQuestions();

// ─── Filter Chip ──────────────────────────────────────────────────────────────

function FilterChip({
  label,
  active,
  color = 'teal',
  onClick,
}: {
  label: string;
  active: boolean;
  color?: 'teal' | 'amber' | 'red' | 'blue' | 'purple' | 'gray';
  onClick: () => void;
}) {
  const colorMap: Record<string, string> = {
    teal:   active ? 'bg-teal-500/20 border-teal-500 text-teal-400'   : 'border-border text-text-secondary hover:border-teal-500/50',
    amber:  active ? 'bg-amber-500/20 border-amber-500 text-amber-400' : 'border-border text-text-secondary hover:border-amber-500/50',
    red:    active ? 'bg-red-500/20 border-red-500 text-red-400'       : 'border-border text-text-secondary hover:border-red-500/50',
    blue:   active ? 'bg-blue-500/20 border-blue-500 text-blue-400'   : 'border-border text-text-secondary hover:border-blue-500/50',
    purple: active ? 'bg-purple-500/20 border-purple-500 text-purple-400' : 'border-border text-text-secondary hover:border-purple-500/50',
    gray:   active ? 'bg-slate-600/40 border-slate-500 text-slate-200' : 'border-border text-text-secondary hover:border-slate-500/50',
  };

  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${colorMap[color]}`}
    >
      {label}
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InterviewPage() {
  const [search, setSearch]           = useState('');
  const [subject, setSubject]         = useState<string>('All');
  const [difficulty, setDifficulty]   = useState<Difficulty>('All');
  const [category, setCategory]       = useState<Category>('All');
  const [showFilters, setShowFilters] = useState(false);

  // Unique subjects that have questions
  const subjectOptions = useMemo(() => {
    const seen = new Set<string>();
    const opts: { id: string; name: string }[] = [{ id: 'All', name: 'All Subjects' }];
    ALL_QUESTIONS.forEach((q) => {
      if (!seen.has(q.subjectId)) {
        seen.add(q.subjectId);
        opts.push({ id: q.subjectId, name: q.subjectName });
      }
    });
    return opts;
  }, []);

  // Unique categories present in data
  const categoryOptions: Category[] = useMemo(() => {
    const seen = new Set<string>();
    ALL_QUESTIONS.forEach((q) => seen.add(q.category));
    return ['All', ...Array.from(seen)] as Category[];
  }, []);

  const filtered = useMemo(() => {
    return ALL_QUESTIONS.filter((q) => {
      if (subject !== 'All' && q.subjectId !== subject) return false;
      if (difficulty !== 'All' && q.difficulty !== difficulty) return false;
      if (category !== 'All' && q.category !== category) return false;
      if (search.trim()) {
        const s = search.toLowerCase();
        if (!q.question.toLowerCase().includes(s) &&
            !q.subjectName.toLowerCase().includes(s) &&
            !q.topicName.toLowerCase().includes(s)) return false;
      }
      return true;
    });
  }, [search, subject, difficulty, category]);

  const hasActiveFilters = subject !== 'All' || difficulty !== 'All' || category !== 'All' || search.trim();

  function clearFilters() {
    setSearch('');
    setSubject('All');
    setDifficulty('All');
    setCategory('All');
  }

  return (
    <div className="min-h-screen">
      {/* ── Hero Header ──────────────────────────────────────────── */}
      <div className="relative overflow-hidden border-b border-border bg-bg-secondary">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-accent-teal/10 border border-accent-teal/20">
              <BrainCircuit className="w-6 h-6 text-accent-teal" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-accent-teal">
              Interview Prep
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-primary mb-4 leading-tight">
            Interview Question Bank
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mb-8">
            {ALL_QUESTIONS.length} curated questions spanning SQL, Python, ML, Deep Learning, Generative AI, and Agentic AI — all in one place. Filter, study, ace the interview.
          </p>

          {/* Search bar */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              id="interview-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions, topics, or subjects…"
              className="w-full pl-11 pr-4 py-3.5 bg-bg-elevated border border-border rounded-xl text-text-primary placeholder:text-text-secondary/60 outline-none focus:border-accent-teal transition-colors text-sm"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Filter Sidebar ──────────────────────────────────── */}
          <aside className="lg:w-64 flex-shrink-0">
            {/* Mobile filter toggle */}
            <div className="lg:hidden mb-4">
              <button
                id="toggle-filters"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm font-semibold text-text-secondary hover:border-accent-teal transition-colors w-full justify-between"
              >
                <span className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" /> Filters
                </span>
                {hasActiveFilters && (
                  <span className="px-2 py-0.5 rounded-full bg-accent-teal text-bg-primary text-[10px] font-bold">
                    ON
                  </span>
                )}
              </button>
            </div>

            <div className={`${showFilters ? 'block' : 'hidden'} lg:block space-y-6`}>
              {/* Subject */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-3">Subject</p>
                <div className="flex flex-wrap gap-2">
                  {subjectOptions.map((s) => (
                    <FilterChip
                      key={s.id}
                      label={s.id === 'All' ? 'All' : s.name}
                      active={subject === s.id}
                      color="teal"
                      onClick={() => setSubject(s.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-3">Difficulty</p>
                <div className="flex flex-wrap gap-2">
                  {(['All', 'Fresher', 'Mid', 'Senior'] as Difficulty[]).map((d) => (
                    <FilterChip
                      key={d}
                      label={d}
                      active={difficulty === d}
                      color={d === 'Fresher' ? 'teal' : d === 'Mid' ? 'amber' : d === 'Senior' ? 'red' : 'gray'}
                      onClick={() => setDifficulty(d)}
                    />
                  ))}
                </div>
              </div>

              {/* Category / Type */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-3">Type</p>
                <div className="flex flex-wrap gap-2">
                  {categoryOptions.map((c) => (
                    <FilterChip
                      key={c}
                      label={c}
                      active={category === c}
                      color={c === 'Coding' ? 'blue' : c === 'Scenario' ? 'purple' : c === 'Trap' ? 'red' : 'gray'}
                      onClick={() => setCategory(c)}
                    />
                  ))}
                </div>
              </div>

              {/* Clear all */}
              {hasActiveFilters && (
                <button
                  id="clear-filters"
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-xs font-semibold text-red-400 hover:text-red-300 transition-colors"
                >
                  <X className="w-3 h-3" /> Clear all filters
                </button>
              )}
            </div>
          </aside>

          {/* ── Questions List ──────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Count + active indicator */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-text-secondary">
                Showing{' '}
                <span className="font-bold text-text-primary">{filtered.length}</span>
                {' '}of{' '}
                <span className="font-bold text-text-primary">{ALL_QUESTIONS.length}</span>
                {' '}questions
              </p>
              {hasActiveFilters && (
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent-teal px-2 py-1 rounded-full bg-accent-teal/10 border border-accent-teal/20">
                  Filtered
                </span>
              )}
            </div>

            {/* Empty state */}
            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="p-5 rounded-2xl bg-bg-elevated border border-border mb-6">
                  <BookOpen className="w-10 h-10 text-text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2">No questions found</h3>
                <p className="text-text-secondary text-sm mb-6 max-w-sm">
                  Try adjusting your filters or search term to find what you&apos;re looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-5 py-2.5 bg-accent-teal text-bg-primary rounded-xl font-bold text-sm hover:bg-accent-teal/90 transition-colors"
                >
                  Clear filters
                </button>
              </div>
            )}

            {/* Questions grid */}
            <div className="space-y-5">
              {filtered.map((q, i) => (
                <InterviewQuestionCard
                  key={`${q.topicId}-${i}`}
                  question={q.question}
                  answer={q.answer}
                  difficulty={q.difficulty}
                  category={q.category}
                  subjectName={q.subjectName}
                  topicName={q.topicName}
                  topicHref={q.topicHref}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
