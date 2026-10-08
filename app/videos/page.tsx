'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search, ChevronRight, PlayCircle, BookOpen, Tv2,
  Clock, X, GraduationCap, Layers,
} from 'lucide-react';
import {
  videoLessons,
  getAllVideos,
  getVideosBySubject,
  SectionVideos,
} from '@/lib/content/videoLessons';
import { subjects } from '@/lib/content/subjects';
import { getTopicBySlug } from '@/lib/content';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/Skeleton';

const VideoTileGrid = dynamic(
  () => import('@/components/learn/VideoTileGrid'),
  { loading: () => <Skeleton className="h-[200px] w-full rounded-xl" />, ssr: false }
);

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getSubjectMeta(slug: string) {
  return subjects.find((s) => s.slug === slug);
}

function getSubjectsWithVideos() {
  const slugSet = new Set(videoLessons.map((v) => v.subjectSlug));
  return Array.from(slugSet).map((slug) => {
    const meta  = getSubjectMeta(slug);
    const count = getVideosBySubject(slug).reduce((a, e) => a + e.videos.length, 0);
    return { slug, meta, count };
  });
}

function enrichSection(sv: SectionVideos) {
  const resolved = getTopicBySlug(sv.subjectSlug, sv.topicSlug);
  return {
    ...sv,
    topicTitle: resolved?.topic?.title ??
      sv.topicSlug.split('-').map((w) => w[0]?.toUpperCase() + w.slice(1)).join(' '),
    topicDescription: resolved?.topic?.description ?? '',
    difficulty: resolved?.topic?.difficulty as string | undefined,
    estimatedMinutes: resolved?.topic?.estimatedMinutes,
  };
}

// Per-subject accent colours
const ACCENTS: Record<string, { color: string; bg: string; border: string }> = {
  python:          { color: '#b45309', bg: 'rgba(245,158,11,0.15)',  border: 'rgba(245,158,11,0.4)'  },
  numpy:           { color: '#0369a1', bg: 'rgba(6,182,212,0.15)',   border: 'rgba(6,182,212,0.4)'   },
  pandas:          { color: '#4338ca', bg: 'rgba(129,140,248,0.15)', border: 'rgba(129,140,248,0.4)' },
  visualization:   { color: '#c2410c', bg: 'rgba(249,115,22,0.15)',  border: 'rgba(249,115,22,0.4)'  },
  'ml-basics':     { color: '#047857', bg: 'rgba(16,185,129,0.15)',  border: 'rgba(16,185,129,0.4)'  },
  'deep-learning': { color: '#6d28d9', bg: 'rgba(167,139,250,0.15)', border: 'rgba(167,139,250,0.4)' },
  'gen-ai':        { color: '#be185d', bg: 'rgba(244,114,182,0.15)', border: 'rgba(244,114,182,0.4)' },
};

const DIFF: Record<string, { color: string; bg: string }> = {
  Beginner:     { color: 'var(--green)',  bg: 'var(--green-tint)'  },
  Intermediate: { color: 'var(--orange)', bg: 'var(--orange-tint)' },
  Advanced:     { color: 'var(--red)',    bg: 'var(--red-tint)'    },
};

// ─────────────────────────────────────────────────────────────────────────────
export default function VideosPage() {
  const [search, setSearch]             = useState('');
  const [activeSubject, setActiveSubject] = useState('all');

  const subjectsWithVideos = useMemo(() => getSubjectsWithVideos(), []);
  const allVideos          = useMemo(() => getAllVideos(), []);
  const enriched           = useMemo(() => videoLessons.map(enrichSection), []);

  // Filter
  const filtered = useMemo(() => {
    let pool = enriched;
    if (activeSubject !== 'all') {
      pool = pool.filter((sv) => sv.subjectSlug === activeSubject);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      pool = pool
        .map((sv) => ({
          ...sv,
          videos: sv.videos.filter(
            (v) =>
              v.title.toLowerCase().includes(q) ||
              v.section.toLowerCase().includes(q) ||
              sv.topicTitle.toLowerCase().includes(q) ||
              (sv.topicDescription ?? '').toLowerCase().includes(q),
          ),
        }))
        .filter((sv) => sv.videos.length > 0);
    }
    return pool;
  }, [enriched, activeSubject, search]);

  // Group by subject
  const grouped = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    for (const sv of filtered) {
      const arr = map.get(sv.subjectSlug) ?? [];
      arr.push(sv);
      map.set(sv.subjectSlug, arr);
    }
    return Array.from(map.entries());
  }, [filtered]);

  const totalVideos = filtered.reduce((a, sv) => a + sv.videos.length, 0);

  return (
    <div className="min-h-screen doodle-canvas font-patrick">

      {/* ══════════ HERO ════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden border-b-2 border-[var(--canvas-border)] pt-32 pb-14 bg-[var(--canvas-raised)]">
        <div className="container mx-auto px-6 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs font-mono font-bold mb-6">
            <Link href="/dashboard" className="text-[var(--ink-3)] hover:text-[var(--ink)] transition-colors">Dashboard</Link>
            <ChevronRight className="w-3 h-3 text-[var(--ink-3)]" />
            <span className="text-[var(--blue)]">Video Library</span>
          </nav>

          {/* Title row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-8">
            <div className="flex items-start sm:items-center gap-4">
              <div className="p-4 rounded-2xl shrink-0 bg-[var(--red-tint)] border-2 border-[var(--red)] shadow-sm">
                <Tv2 className="w-8 h-8 text-[var(--red)]" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border bg-[var(--blue-tint)] text-[var(--blue)] border-[var(--blue)]/30">
                    Top Educators
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border bg-[var(--green-tint)] text-[var(--green)] border-[var(--green)]/30">
                    Free · In-App Player
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-caveat font-extrabold text-[var(--ink)] leading-tight">
                  Video Lessons
                </h1>
                <p className="text-base text-[var(--ink-2)] mt-1.5 max-w-lg leading-relaxed">
                  Topic-mapped walkthroughs from top educators like Krish Naik, Codebasics, and CampusX. Click any tile to watch inside the app.
                </p>
              </div>
            </div>

            {/* Stat pills */}
            <div className="flex items-center gap-3 shrink-0">
              {[
                { n: allVideos.length,          label: 'Videos',   color: 'var(--red)',   icon: PlayCircle },
                { n: videoLessons.length,        label: 'Topics',   color: 'var(--blue)',  icon: BookOpen  },
                { n: subjectsWithVideos.length,  label: 'Subjects', color: 'var(--green)', icon: Layers    },
              ].map(({ n, label, color, icon: Icon }) => (
                <div key={label}
                  className="flex flex-col items-center px-4 py-3 rounded-2xl bg-[var(--canvas-sunken)] border-2 border-[var(--canvas-border)] shadow-sm"
                >
                  <Icon className="w-4 h-4 mb-1" style={{ color }} />
                  <span className="text-2xl font-extrabold font-mono text-[var(--ink)] leading-none">{n}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest mt-1 text-[var(--ink-3)]">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Search bar ──────────────────────────────────────────────── */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--ink-3)]" />
            <input
              type="search"
              placeholder="Search by video title, topic, or concept…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-10 py-3 text-sm font-patrick text-[var(--ink)] placeholder:text-[var(--ink-3)] focus:outline-none bg-[var(--canvas)] border-2 border-[var(--canvas-border)] focus:border-[var(--blue)] rounded-xl shadow-inner transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-colors no-min-h"
              >
                <X className="w-3.5 h-3.5 text-[var(--ink-3)]" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ══════════ SUBJECT FILTER TABS ═════════════════════════════════ */}
      <div className="sticky top-[72px] z-20 border-b-2 border-[var(--canvas-border)] bg-[var(--canvas-raised)]/95 backdrop-blur-md">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-3">
            {/* All tab */}
            <FilterTab
              active={activeSubject === 'all'}
              onClick={() => setActiveSubject('all')}
              label="All"
              count={allVideos.length}
              color="var(--blue)"
            />
            {subjectsWithVideos.map(({ slug, meta, count }) => {
              const a = ACCENTS[slug];
              return (
                <FilterTab
                  key={slug}
                  active={activeSubject === slug}
                  onClick={() => setActiveSubject(slug)}
                  label={meta?.name ?? slug}
                  count={count}
                  color={a?.color}
                  icon={meta?.icon}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* ══════════ CONTENT ═════════════════════════════════════════════ */}
      <div className="container mx-auto px-6 py-12">

        {/* Result summary */}
        <p className="text-xs text-[var(--ink-3)] font-mono mb-8 font-bold">
          {search.trim()
            ? `${totalVideos} result${totalVideos !== 1 ? 's' : ''} for "${search}"`
            : `${totalVideos} videos · ${filtered.length} topics`}
        </p>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-24 text-center bg-[var(--canvas-raised)] border-2 border-dashed border-[var(--canvas-border)] rounded-3xl p-8 max-w-lg mx-auto">
            <PlayCircle className="w-14 h-14 text-[var(--ink-3)] opacity-40 mb-4" />
            <p className="text-xl font-caveat font-bold text-[var(--ink)] mb-1">No videos found</p>
            <p className="text-sm text-[var(--ink-2)] mb-6">Try searching with a different keyword or topic.</p>
            <button
              onClick={() => setSearch('')}
              className="px-5 py-2.5 rounded-xl text-sm font-bold bg-[var(--blue)] text-white shadow-md hover:bg-[var(--blue-dim)] transition-colors no-min-h cursor-pointer"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="space-y-16">
            {grouped.map(([slug, sections]) => {
              const meta    = getSubjectMeta(slug);
              const accent  = ACCENTS[slug] ?? { color: 'var(--blue)', bg: 'var(--blue-tint)', border: 'var(--canvas-border)' };
              const SubIcon = meta?.icon;
              const subTotal = sections.reduce((a, sv) => a + sv.videos.length, 0);

              return (
                <section key={slug} className="p-6 sm:p-8 rounded-3xl bg-[var(--canvas-raised)] border-2 border-[var(--canvas-border)] shadow-[var(--shadow-md)]">
                  {/* ── Subject heading ─────────────────────────────── */}
                  <div className="flex items-center justify-between mb-8 pb-5 border-b-2"
                    style={{ borderColor: accent.border }}
                  >
                    <div className="flex items-center gap-3">
                      {SubIcon && (
                        <span className="p-2.5 rounded-2xl border-2"
                          style={{ background: accent.bg, borderColor: accent.border }}
                        >
                          <SubIcon className="w-6 h-6" style={{ color: accent.color }} />
                        </span>
                      )}
                      <div>
                        <h2 className="text-2xl font-caveat font-extrabold text-[var(--ink)] break-words">
                          {meta?.name ?? slug}
                        </h2>
                        <p className="text-xs font-mono font-bold text-[var(--ink-3)] mt-0.5">
                          {subTotal} videos · {sections.length} topic{sections.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/learn/${slug}`}
                      className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-sm border-2 no-min-h cursor-pointer hover:translate-y-[-1px]"
                      style={{ color: accent.color, background: accent.bg, borderColor: accent.border }}
                    >
                      <GraduationCap className="w-4 h-4" />
                      Open Course
                    </Link>
                  </div>

                  {/* ── Topic tile groups ────────────────────────────── */}
                  <div className="space-y-10">
                    {sections.map((sv) => {
                      const diff = sv.difficulty ? DIFF[sv.difficulty] : null;
                      return (
                        <div key={`${sv.subjectSlug}/${sv.topicSlug}`} className="bg-[var(--canvas)] p-5 rounded-2xl border-2 border-[var(--canvas-border)] shadow-sm">
                          {/* Topic label row */}
                          <div className="flex flex-wrap items-center gap-3 mb-4">
                            {/* Accent strip */}
                            <span className="w-1.5 h-7 rounded-full shrink-0"
                              style={{ background: accent.color }}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-lg font-caveat font-bold text-[var(--ink)] leading-tight break-words">
                                  {sv.topicTitle}
                                </h3>
                                {diff && (
                                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border"
                                    style={{ background: diff.bg, color: diff.color, borderColor: `${diff.color}40` }}
                                  >
                                    {sv.difficulty}
                                  </span>
                                )}
                                {sv.estimatedMinutes && (
                                  <span className="flex items-center gap-1 text-xs font-mono text-[var(--ink-3)] font-bold">
                                    <Clock className="w-3.5 h-3.5" />
                                    {sv.estimatedMinutes} min
                                  </span>
                                )}
                                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full border"
                                  style={{ background: accent.bg, color: accent.color, borderColor: accent.border }}
                                >
                                  {sv.videos.length} video{sv.videos.length !== 1 ? 's' : ''}
                                </span>
                              </div>
                              {sv.topicDescription && (
                                <p className="text-sm text-[var(--ink-2)] mt-1 leading-relaxed line-clamp-2 sm:line-clamp-1 max-w-2xl break-words">
                                  {sv.topicDescription}
                                </p>
                              )}
                            </div>
                            <Link
                              href={`/learn/${sv.subjectSlug}/${sv.topicSlug}`}
                              className="flex items-center gap-1 text-xs font-bold text-[var(--blue)] hover:underline no-min-h shrink-0"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              Full Lesson
                              <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>

                          {/* Video tile grid */}
                          <VideoTileGrid
                            videos={sv.videos}
                            title=""
                          />
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Filter tab pill ─────────────────────────────────────────────────────────
interface FilterTabProps {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
  color?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

function FilterTab({ active, onClick, label, count, color, icon: Icon }: FilterTabProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 no-min-h shrink-0 border-2 cursor-pointer shadow-sm"
      style={{
        background: active ? 'var(--yellow)' : 'var(--canvas)',
        borderColor: active ? 'rgba(0,0,0,0.3)' : 'var(--canvas-border)',
        color: active ? '#111111' : 'var(--ink-2)',
        fontWeight: active ? 800 : 600,
      }}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {label}
      <span
        className="text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold"
        style={{
          background: active ? 'rgba(0,0,0,0.15)' : 'var(--canvas-sunken)',
          color: active ? '#111111' : 'var(--ink-3)',
        }}
      >
        {count}
      </span>
    </button>
  );
}
