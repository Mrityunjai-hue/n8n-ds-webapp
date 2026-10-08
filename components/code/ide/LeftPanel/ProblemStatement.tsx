'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Problem } from '@/lib/code/types';
import { Bookmark, CheckCircle2, Copy, Check, ExternalLink, Lightbulb, Tag, Award } from 'lucide-react';
import { useCodeProgressStore } from '@/lib/code/store/useCodeProgressStore';

interface ProblemStatementProps {
  problem: Problem;
}

export const ProblemStatement: React.FC<ProblemStatementProps> = ({ problem }) => {
  const { bookmarks, toggleBookmark, isSolved } = useCodeProgressStore();
  const [copied, setCopied] = useState(false);

  const solved = isSolved(problem.id);
  const bookmarked = bookmarks.includes(problem.id);

  const handleCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getDifficultyBadge = () => {
    switch (problem.difficulty) {
      case 'pencil':
        return (
          <span className="stamp-badge stamp-badge-pencil">
            ✏️ Pencil
          </span>
        );
      case 'pen':
        return (
          <span className="stamp-badge stamp-badge-pen">
            🖋️ Pen
          </span>
        );
      case 'marker':
        return (
          <span className="stamp-badge stamp-badge-marker">
            🖍️ Marker
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Section */}
      <div className="space-y-3 border-b border-[var(--canvas-border)] pb-5">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          {/* Metadata Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded border border-[var(--canvas-border)] bg-[var(--canvas-sunken)] text-[var(--ink-2)]">
              {problem.id.toUpperCase()}
            </span>
            {getDifficultyBadge()}
            <span className="inline-flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded border border-[var(--canvas-border)] bg-[var(--canvas-raised)] text-[var(--ink-3)]">
              <Award className="w-3 h-3 text-[var(--yellow)]" />
              <span>{problem.points} pts</span>
            </span>
            {solved && (
              <span className="inline-flex items-center gap-1 text-xs font-mono font-bold px-2 py-0.5 rounded border border-[var(--green)] bg-[var(--green-tint)] text-[var(--green)]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Solved</span>
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => toggleBookmark(problem.id)}
              className={`p-1.5 rounded-lg border transition-colors ${
                bookmarked
                  ? 'border-[var(--yellow)] bg-[var(--yellow-tint)] text-[var(--yellow)]'
                  : 'border-[var(--canvas-border)] bg-[var(--canvas-raised)] text-[var(--ink-3)] hover:text-[var(--ink)]'
              }`}
              title={bookmarked ? 'Remove Bookmark' : 'Bookmark Problem'}
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-raised)] text-[var(--ink-3)] hover:text-[var(--ink)] transition-colors"
              title="Copy Problem Link"
            >
              {copied ? <Check className="w-4 h-4 text-[var(--green)]" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Title */}
        <h1
          className="text-2xl sm:text-3xl font-bold tracking-tight"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--ink)' }}
        >
          {problem.title}
        </h1>

        {/* Sourced Info */}
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--ink-3)]">
          <span className="opacity-75">Source:</span>
          <span className="text-[var(--ink-2)] font-medium underline underline-offset-2 decoration-dotted">
            {problem.source.platform === 'LeetCode' && `LeetCode ${problem.source.externalId || ''}`}
            {problem.source.platform === 'HackerRank' && `HackerRank ${problem.source.externalId || ''}`}
            {problem.source.platform === 'StrataScratch' && `StrataScratch ${problem.source.externalId || ''}`}
            {problem.source.platform === 'DataLemur' && `DataLemur ${problem.source.externalId || ''}`}
            {problem.source.platform === 'Mode' && `Mode Analytics ${problem.source.externalId || ''}`}
            {problem.source.platform === 'SQLZoo' && `SQLZoo ${problem.source.externalId || ''}`}
            {problem.source.platform === 'Original' && '404-Found-Code Original'}
          </span>
          {problem.source.adaptationNote && (
            <span className="text-[10px] text-[var(--ink-4)] italic">
              ({problem.source.adaptationNote})
            </span>
          )}
        </div>
      </div>

      {/* Main Description Markdown Body */}
      <div className="prose prose-doodle max-w-none text-base leading-relaxed text-[var(--ink)]" style={{ fontFamily: 'var(--font-body)' }}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({ node, ...props }) => (
              <h2
                className="text-xl font-bold font-heading mt-6 mb-2 border-b border-[var(--canvas-border)] pb-1"
                style={{ color: 'var(--ink)' }}
                {...props}
              />
            ),
            h3: ({ node, ...props }) => (
              <h3
                className="text-lg font-bold font-heading mt-4 mb-2"
                style={{ color: 'var(--ink)' }}
                {...props}
              />
            ),
            p: ({ node, ...props }) => (
              <p className="my-2.5 text-base leading-relaxed text-[var(--ink)]" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul className="list-disc pl-5 my-3 space-y-1 text-[var(--ink)]" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-decimal pl-5 my-3 space-y-1 text-[var(--ink)]" {...props} />
            ),
            li: ({ node, ...props }) => (
              <li className="text-[var(--ink)]" {...props} />
            ),
            code: ({ node, className, children, ...props }: any) => {
              const isInline = !className?.includes('language-');
              if (isInline) {
                return (
                  <code
                    className="font-mono text-xs px-1.5 py-0.5 rounded border border-[var(--canvas-border)] bg-[var(--canvas-sunken)] text-[var(--ink)]"
                    {...props}
                  >
                    {children}
                  </code>
                );
              }
              return (
                <div className="rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-sunken)] p-3 my-3 overflow-x-auto font-mono text-xs text-[var(--ink)]">
                  <code {...props}>{children}</code>
                </div>
              );
            },
            table: ({ node, ...props }) => (
              <div className="my-4 overflow-x-auto rounded-xl border border-[var(--canvas-border)] shadow-[var(--shadow-sm)]">
                <table className="min-w-full divide-y divide-[var(--canvas-border)] text-xs font-mono" {...props} />
              </div>
            ),
            thead: ({ node, ...props }) => (
              <thead className="bg-[var(--canvas-raised)] text-[var(--ink)]" {...props} />
            ),
            th: ({ node, ...props }) => (
              <th className="px-3 py-2 text-left font-bold border-r last:border-r-0 border-[var(--canvas-border)]" {...props} />
            ),
            td: ({ node, ...props }) => (
              <td className="px-3 py-2 border-r last:border-r-0 border-[var(--canvas-border)] bg-[var(--canvas)] text-[var(--ink-2)]" {...props} />
            ),
            blockquote: ({ node, ...props }) => (
              <blockquote
                className="border-l-4 border-[var(--yellow)] bg-[var(--yellow-tint)] pl-4 py-2 my-3 rounded-r-lg text-sm italic text-[var(--ink-2)]"
                {...props}
              />
            ),
          }}
        >
          {problem.description}
        </ReactMarkdown>
      </div>

      {/* Constraints Box */}
      {problem.constraints && problem.constraints.length > 0 && (
        <div className="rounded-2xl border border-[var(--canvas-border)] bg-[var(--canvas-raised)] p-4 space-y-2">
          <h3
            className="text-base font-bold font-heading flex items-center gap-1.5"
            style={{ color: 'var(--ink)' }}
          >
            <span>📌</span>
            <span>Constraints &amp; Schema Notes</span>
          </h3>
          <ul className="space-y-1.5 pl-2">
            {problem.constraints.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-xs font-mono text-[var(--ink-2)]">
                <span className="text-[var(--yellow)] select-none">&bull;</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags & Topic Footer */}
      <div className="pt-2 flex items-center gap-1.5 flex-wrap">
        <span className="text-xs font-mono text-[var(--ink-3)] flex items-center gap-1 mr-1">
          <Tag className="w-3.5 h-3.5" />
          <span>Tags:</span>
        </span>
        {problem.tags.map((tag) => (
          <span
            key={tag}
            className="doodle-tag"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
