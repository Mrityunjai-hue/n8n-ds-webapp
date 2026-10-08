'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Circle, Bookmark, ArrowRight } from 'lucide-react';
import { Problem, Difficulty } from '@/lib/code/types';
import { useCodeProgressStore } from '@/lib/code/store/useCodeProgressStore';

interface ProblemRowProps {
  problem: Problem;
}

const difficultyBadgeConfig: Record<Difficulty, { label: string; bg: string; color: string; border: string }> = {
  pencil: {
    label: 'PENCIL',
    bg: 'var(--green-tint)',
    color: 'var(--green)',
    border: 'var(--canvas-border)',
  },
  pen: {
    label: 'PEN',
    bg: 'var(--yellow-tint)',
    color: 'var(--orange)',
    border: 'var(--canvas-border)',
  },
  marker: {
    label: 'MARKER',
    bg: 'var(--red-tint)',
    color: 'var(--red)',
    border: 'var(--canvas-border)',
  },
};

export const ProblemRow: React.FC<ProblemRowProps> = ({ problem }) => {
  const { isSolved, isBookmarked, toggleBookmark } = useCodeProgressStore();
  const solved = isSolved(problem.id);
  const bookmarked = isBookmarked(problem.id);
  const diffConfig = difficultyBadgeConfig[problem.difficulty];

  return (
    <div className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border-b border-[var(--canvas-border)] hover:bg-[var(--canvas-raised)] transition-colors">
      {/* Left: Status, ID, Title, Badges */}
      <div className="flex items-center gap-3.5 flex-1 min-w-0">
        {/* Solved Status Check */}
        <div className="shrink-0">
          {solved ? (
            <CheckCircle2 className="w-5 h-5 text-[var(--green)]" />
          ) : (
            <Circle className="w-5 h-5 text-[var(--ink-4)] group-hover:text-[var(--ink-3)] transition-colors" />
          )}
        </div>

        {/* Problem ID */}
        <span className="text-xs font-mono font-medium text-[var(--ink-3)] shrink-0 w-10">
          {problem.id.toUpperCase()}
        </span>

        {/* Title */}
        <Link
          href={`/code/${problem.slug}`}
          className="text-base sm:text-lg font-medium text-[var(--ink)] hover:text-[var(--blue)] transition-colors truncate"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {problem.title}
        </Link>

        {/* Difficulty Rubber Stamp Badge */}
        {problem.difficulty === 'pencil' && (
          <span className="stamp-badge stamp-badge-pencil">
            ✏️ Pencil
          </span>
        )}
        {problem.difficulty === 'pen' && (
          <span className="stamp-badge stamp-badge-pen">
            🖋️ Pen
          </span>
        )}
        {problem.difficulty === 'marker' && (
          <span className="stamp-badge stamp-badge-marker">
            🖍️ Marker
          </span>
        )}
      </div>

      {/* Right: Tags, Points, Bookmark, CTA */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0 pl-8 sm:pl-0">
        {/* Tags */}
        <div className="hidden md:flex items-center gap-1.5 flex-wrap max-w-xs">
          {problem.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="doodle-tag"
            >
              {tag}
            </span>
          ))}
          {problem.tags.length > 2 && (
            <span className="text-[10px] font-mono text-[var(--ink-3)] font-bold">
              +{problem.tags.length - 2}
            </span>
          )}
        </div>

        {/* Points */}
        <span className="text-xs font-mono text-[var(--ink-3)]">
          {problem.points} pts
        </span>

        {/* Bookmark button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleBookmark(problem.id);
          }}
          className={`p-1.5 rounded-lg border border-transparent hover:border-[var(--canvas-border)] hover:bg-[var(--canvas-sunken)] transition-colors ${
            bookmarked ? 'text-[var(--yellow)]' : 'text-[var(--ink-4)] hover:text-[var(--ink-2)]'
          }`}
          aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark problem'}
        >
          <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
        </button>

        {/* Link Button */}
        <Link
          href={`/code/${problem.slug}`}
          className="inline-flex items-center justify-center p-1.5 rounded-lg bg-[var(--canvas-sunken)] border border-[var(--canvas-border)] text-[var(--ink-2)] group-hover:text-[var(--blue)] group-hover:border-[var(--blue)] transition-colors"
          aria-label={`Solve ${problem.title}`}
        >
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
