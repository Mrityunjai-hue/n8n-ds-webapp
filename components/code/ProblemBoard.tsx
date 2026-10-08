'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Lock, Flame, Droplets, Trophy, Sparkles, CheckCircle2, Bookmark, ArrowRight, HelpCircle } from 'lucide-react';
import { Problem, Difficulty, Track } from '@/lib/code/types';
import { ProblemRow } from './ProblemRow';
import { useCodeProgressStore } from '@/lib/code/store/useCodeProgressStore';
import { HandwrittenTitle } from '@/components/ui/HandwrittenTitle';
import { DoodleDivider } from '@/components/ui/DoodleDivider';

interface ProblemBoardProps {
  problems: Problem[];
  onOpenWelcome: () => void;
}

const TRACKS: { id: Track; name: string; icon: string; locked?: boolean }[] = [
  { id: 'sql', name: 'SQL Sandbox', icon: '🗄️' },
  { id: 'python', name: 'Python DS', icon: '🐍', locked: true },
  { id: 'numpy', name: 'NumPy Arrays', icon: '📐', locked: true },
  { id: 'pandas', name: 'Pandas Tables', icon: '🐼', locked: true },
  { id: 'ml', name: 'Machine Learning', icon: '🤖', locked: true },
];

export const ProblemBoard: React.FC<ProblemBoardProps> = ({ problems, onOpenWelcome }) => {
  const [selectedTrack, setSelectedTrack] = useState<Track>('sql');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const { solved, bookmarks, inkDrops, streak, totalPoints, rehydrate } = useCodeProgressStore();

  useEffect(() => {
    rehydrate();
  }, [rehydrate]);

  const solvedCount = Object.keys(solved).length;
  const totalCount = problems.length;
  const progressPercent = totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0;

  // Extract all unique tags for filter
  const allTags = useMemo(() => {
    const set = new Set<string>();
    problems.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [problems]);

  // Filter problems
  const filteredProblems = useMemo(() => {
    return problems.filter((p) => {
      // Track filter
      if (p.track !== selectedTrack) return false;

      // Difficulty filter
      if (selectedDifficulty !== 'all' && p.difficulty !== selectedDifficulty) return false;

      // Status filter
      if (selectedStatus === 'solved' && !solved[p.id]) return false;
      if (selectedStatus === 'unsolved' && solved[p.id]) return false;
      if (selectedStatus === 'bookmarked' && !bookmarks.includes(p.id)) return false;

      // Tag filter
      if (selectedTag !== 'all' && !p.tags.includes(selectedTag)) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesId = p.id.toLowerCase().includes(q);
        const matchesTags = p.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesId && !matchesTags) return false;
      }

      return true;
    });
  }, [problems, selectedTrack, selectedDifficulty, selectedStatus, selectedTag, searchQuery, solved, bookmarks]);

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Header Spread & Stats */}
      <div className="rounded-3xl border-2 border-[var(--canvas-border)] bg-[var(--canvas-raised)] p-6 sm:p-8 shadow-[var(--shadow-sm)] paper-card relative overflow-hidden">
        {/* Tape Accent */}
        <div
          className="absolute -top-3 left-12 w-24 h-6 rounded-[2px] opacity-70 transform -rotate-2 border border-black/10 hidden sm:block"
          style={{ backgroundColor: 'var(--yellow)' }}
        />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <HandwrittenTitle
                text="404-Found-Code"
                subtext="Interactive SQL Practice Sandbox"
              />
              <button
                onClick={onOpenWelcome}
                className="ml-2 text-xs font-mono px-2.5 py-1 rounded-full border border-[var(--canvas-border)] bg-[var(--canvas)] hover:bg-[var(--canvas-sunken)] text-[var(--ink-2)] transition-colors inline-flex items-center gap-1.5 doodle-border"
                title="About 404-Found-Code"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[var(--blue)]" />
                <span>Guide</span>
              </button>
            </div>
            <p className="text-base sm:text-lg text-[var(--ink-2)] max-w-xl" style={{ fontFamily: 'var(--font-body)' }}>
              &ldquo;Pick a problem. Run live queries in your browser. Get your hands dirty.&rdquo;
            </p>
          </div>

          {/* Gamification Stats Ribbon */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            {/* Progress */}
            <div className="p-3.5 rounded-2xl border-2 border-[var(--canvas-border)] bg-[var(--canvas)] shadow-[var(--shadow-sm)] min-w-[130px] doodle-border">
              <div className="text-[11px] font-mono uppercase text-[var(--ink-3)] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--green)]" />
                <span>Solved</span>
              </div>
              <div className="text-xl font-bold font-mono text-[var(--ink)] mt-0.5 flex items-baseline gap-1">
                <span>{solvedCount}</span>
                <span className="text-xs font-normal text-[var(--ink-3)]">/ {totalCount}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[var(--canvas-sunken)] mt-1.5 overflow-hidden">
                <div
                  className="h-full bg-[var(--green)] rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Streak */}
            <div className="p-3.5 rounded-2xl border-2 border-[var(--canvas-border)] bg-[var(--canvas)] shadow-[var(--shadow-sm)] min-w-[110px] doodle-border">
              <div className="text-[11px] font-mono uppercase text-[var(--ink-3)] font-semibold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-[var(--orange)]" />
                <span>Streak</span>
              </div>
              <div className="text-xl font-bold font-mono text-[var(--orange)] mt-0.5 flex items-baseline gap-1">
                <span>{streak}</span>
                <span className="text-xs font-normal text-[var(--ink-3)]">days</span>
              </div>
            </div>

            {/* Ink Drops (Hints Currency) */}
            <div className="p-3.5 rounded-2xl border-2 border-[var(--canvas-border)] bg-[var(--canvas)] shadow-[var(--shadow-sm)] min-w-[110px] doodle-border">
              <div className="text-[11px] font-mono uppercase text-[var(--ink-3)] font-semibold flex items-center gap-1">
                <Droplets className="w-3.5 h-3.5 text-[var(--blue)]" />
                <span>Ink Drops</span>
              </div>
              <div className="text-xl font-bold font-mono text-[var(--blue)] mt-0.5 flex items-baseline gap-1">
                <span>{inkDrops}</span>
                <span className="text-xs font-normal text-[var(--ink-3)]">drops</span>
              </div>
            </div>

            {/* Total Points */}
            <div className="p-3.5 rounded-2xl border-2 border-[var(--canvas-border)] bg-[var(--canvas)] shadow-[var(--shadow-sm)] min-w-[110px] doodle-border">
              <div className="text-[11px] font-mono uppercase text-[var(--ink-3)] font-semibold flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-[var(--yellow)]" />
                <span>Points</span>
              </div>
              <div className="text-xl font-bold font-mono text-[var(--ink)] mt-0.5 flex items-baseline gap-1">
                <span>{totalPoints}</span>
                <span className="text-xs font-normal text-[var(--ink-3)]">pts</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Track Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {TRACKS.map((t) => {
          const isCurrent = selectedTrack === t.id;
          return (
            <button
              key={t.id}
              onClick={() => {
                if (!t.locked) setSelectedTrack(t.id);
              }}
              disabled={t.locked}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all shrink-0 ${
                isCurrent
                  ? 'bg-[var(--yellow)] text-[var(--ink)] border-[var(--ink)] font-bold shadow-[2px_2px_0_var(--ink)]'
                  : t.locked
                  ? 'bg-[var(--canvas-sunken)] text-[var(--ink-4)] border-[var(--canvas-border)] cursor-not-allowed opacity-75'
                  : 'bg-[var(--canvas-raised)] text-[var(--ink-2)] border-[var(--canvas-border)] hover:text-[var(--ink)] hover:bg-[var(--canvas-sunken)] doodle-border'
              }`}
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <span>{t.icon}</span>
              <span>{t.name}</span>
              {t.locked && (
                <Lock className="w-3 h-3 text-[var(--ink-4)] ml-1" />
              )}
            </button>
          );
        })}
      </div>

      <DoodleDivider className="py-1" />

      {/* 3. Search & Filter Bar */}
      <div className="p-4 rounded-2xl border-2 border-[var(--canvas-border)] bg-[var(--canvas-raised)] space-y-4 doodle-border shadow-[var(--shadow-sm)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-[var(--ink-3)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search problems, IDs, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl text-sm bg-[var(--canvas)] border border-[var(--canvas-border)]"
            />
          </div>

          {/* Difficulty Dropdown */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="w-full rounded-xl text-sm cursor-pointer bg-[var(--canvas)] border border-[var(--canvas-border)]"
          >
            <option value="all">All Difficulties (155)</option>
            <option value="pencil">✏️ Pencil — Easy (60)</option>
            <option value="pen">🖋️ Pen — Medium (65)</option>
            <option value="marker">🖍️ Marker — Hard (30)</option>
          </select>

          {/* Status Dropdown */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full rounded-xl text-sm cursor-pointer bg-[var(--canvas)] border border-[var(--canvas-border)]"
          >
            <option value="all">All Statuses</option>
            <option value="unsolved">Unsolved Only</option>
            <option value="solved">Solved Only</option>
            <option value="bookmarked">Bookmarked Only</option>
          </select>

          {/* Tag Dropdown */}
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="w-full rounded-xl text-sm cursor-pointer bg-[var(--canvas)] border border-[var(--canvas-border)]"
          >
            <option value="all">All Topics / Tags</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        {/* Quick Tag Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          <span className="text-xs font-mono text-[var(--ink-3)] shrink-0">Popular:</span>
          {['JOIN', 'GROUP BY', 'Window Function', 'CTE', 'NULL', 'DENSE_RANK', 'CASE WHEN'].map((tag) => {
            const isTagActive = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(isTagActive ? 'all' : tag)}
                className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border transition-colors shrink-0 ${
                  isTagActive
                    ? 'bg-[var(--blue)] text-white border-[var(--blue)] font-bold shadow-sm'
                    : 'bg-[var(--canvas-sunken)] border-[var(--canvas-border)] text-[var(--ink-2)] hover:text-[var(--ink)]'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      <DoodleDivider variant="zigzag" className="py-1" />

      {/* 4. Problems List Spread */}
      <div className="rounded-2xl border-2 border-[var(--canvas-border)] bg-[var(--canvas)] shadow-[var(--shadow-sm)] overflow-hidden doodle-card">
        {/* Table Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--canvas-border)] bg-[var(--canvas-raised)] text-xs font-mono font-medium text-[var(--ink-3)] uppercase tracking-wider">
          <div className="flex items-center gap-3.5">
            <span className="w-5"></span>
            <span className="w-10">ID</span>
            <span>Problem Title</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="hidden md:inline">Tags</span>
            <span>Score</span>
            <span>Solve</span>
          </div>
        </div>

        {/* Rows */}
        {filteredProblems.length > 0 ? (
          <div className="divide-y divide-[var(--canvas-border)]">
            {filteredProblems.map((problem) => (
              <ProblemRow key={problem.id} problem={problem} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center space-y-3">
            <div className="text-3xl">🔍</div>
            <h3 className="text-xl font-bold font-heading" style={{ color: 'var(--ink)' }}>
              No matching problems found
            </h3>
            <p className="text-sm text-[var(--ink-3)] font-mono">
              Try adjusting your search terms or clearing difficulty/tag filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDifficulty('all');
                setSelectedStatus('all');
                setSelectedTag('all');
              }}
              className="btn-ghost text-xs px-4 py-1.5 rounded-lg mt-2"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* 5. Coming-Soon Track Teasers */}
      <div className="pt-6 space-y-4">
        <h3 className="text-2xl font-bold font-heading text-[var(--ink)]">
          Upcoming Practice Tracks
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Python DS', desc: 'Decorators, generators, OOP & memory efficiency.', icon: '🐍' },
            { name: 'NumPy Mastery', desc: 'Vectorization, broadcasting & matrix operations.', icon: '📐' },
            { name: 'Pandas Wrangling', desc: 'Groupby, pivots, merges, and time-series.', icon: '🐼' },
            { name: 'Machine Learning', desc: 'Scikit-learn pipelines, metrics & loss functions.', icon: '🤖' },
          ].map((t) => (
            <div
              key={t.name}
              className="p-5 rounded-2xl border border-[var(--canvas-border)] bg-[var(--canvas-raised)] opacity-80 paper-card relative flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{t.icon}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--canvas-sunken)] border border-[var(--canvas-border)] text-[var(--ink-3)] font-bold">
                  COMING SOON
                </span>
              </div>
              <div>
                <h4 className="font-bold text-base font-heading" style={{ color: 'var(--ink)' }}>
                  {t.name}
                </h4>
                <p className="text-xs text-[var(--ink-2)] mt-1">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
