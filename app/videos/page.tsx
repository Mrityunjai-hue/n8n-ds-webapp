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
const ACCENTS: Record<string, { color: string; bg: string; border: string; gradient: string }> = {
  python:          { color: '#f59e0b', bg: 'rgba(245,158,11,0.06)',  border: 'rgba(245,158,11,0.2)',  gradient: 'from-yellow-500/10 via-transparent to-transparent'  },
  numpy:           { color: '#06b6d4', bg: 'rgba(6,182,212,0.06)',   border: 'rgba(6,182,212,0.2)',   gradient: 'from-cyan-500/10 via-transparent to-transparent'     },
  pandas:          { color: '#818cf8', bg: 'rgba(129,140,248,0.06)', border: 'rgba(129,140,248,0.2)', gradient: 'from-indigo-500/10 via-transparent to-transparent'    },
  visualization:   { color: '#f97316', bg: 'rgba(249,115,22,0.06)',  border: 'rgba(249,115,22,0.2)',  gradient: 'from-orange-500/10 via-transparent to-transparent'   },
  'ml-basics':     { color: '#10b981', bg: 'rgba(16,185,129,0.06)',  border: 'rgba(16,185,129,0.2)',  gradient: 'from-emerald-500/10 via-transparent to-transparent'  },
  'deep-learning': { color: '#a78bfa', bg: 'rgba(167,139,250,0.06)', border: 'rgba(167,139,250,0.2)', gradient: 'from-violet-500/10 via-transparent to-transparent'   },
  'gen-ai':        { color: '#f472b6', bg: 'rgba(244,114,182,0.06)', border: 'rgba(244,114,182,0.2)', gradient: 'from-pink-500/10 via-transparent to-transparent'     },
};

const DIFF: Record<string, { color: string; bg: string }> = {
  Beginner:     { color: '#34d399', bg: 'rgba(52,211,153,0.12)'  },
  Intermediate: { color: '#fbbf24', bg: 'rgba(251,191,36,0.12)'  },
  Advanced:     { color: '#f87171', bg: 'rgba(248,113,113,0.12)' },
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
    <div className="min-h-screen bg-[#030712] neural-grid">

      {/* ══════════ HERO ════════════════════════════════════════════════ */}
      <div
        className="relative overflow-hidden border-b border-border/30 pt-32 pb-14"
        style={{ background: 'linear-gradient(160deg,#0a0416 0%,#060312 55%,#030712 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-red-600/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-purple-600/5 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[11px] font-mono font-bold mb-8">
            <Link href="/dashboard" className="text-text-muted hover:text-white transition-colors">Dashboard</Link>
            <ChevronRight className="w-3 h-3 text-text-muted" />
            <span className="text-red-400">Video Library</span>
          </nav>

          {/* Title row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-10">
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl shrink-0"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)' }}
              >
                <Tv2 className="w-8 h-8 text-red-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full"
                    style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}
                  >
                    @krishnaik06
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full"
                    style={{ background: 'rgba(0,229,255,0.07)', color: 'var(--accent-cyan)', border: '1px solid rgba(0,229,255,0.15)' }}
                  >
                    Free · In-App Player
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white leading-tight">
                  Video Lessons
                </h1>
                <p className="text-sm text-text-secondary mt-1.5 max-w-md leading-relaxed">
                  Topic-mapped walkthroughs from Krish Naik. Click any tile to watch inside the app.
                </p>
              </div>
            </div>

            {/* Stat pills */}
            <div className="flex items-center gap-3 shrink-0">
              {[
                { n: allVideos.length,          label: 'Videos',   color: '#f87171',             icon: PlayCircle },
                { n: videoLessons.length,        label: 'Topics',   color: 'var(--accent-cyan)',   icon: BookOpen  },
                { n: subjectsWithVideos.length,  label: 'Subjects', color: '#a78bfa',             icon: Layers    },
              ].map(({ n, label, color, icon: Icon }) => (
                <div key={label}
                  className="flex flex-col items-center px-4 py-3 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <Icon className="w-3.5 h-3.5 mb-1.5" style={{ color }} />
                  <span className="text-xl font-extrabold font-mono text-white leading-none">{n}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest mt-1 text-text-muted">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Search bar ──────────────────────────────────────────────── */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="search"
              placeholder="Search by video title, topic, or concept…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-10 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none bg-transparent"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: '12px',
              }}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-lg transition-colors no-min-h"
              >
                <X className="w-3.5 h-3.5 text-text-muted" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ══════════ SUBJECT FILTER TABS ═════════════════════════════════ */}
      <div
        className="sticky top-[72px] z-20 border-b border-border/30"
        style={{ background: 'rgba(3,7,18,0.92)', backdropFilter: 'blur(16px)' }}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-3">
            {/* All tab */}
            <FilterTab
              active={activeSubject === 'all'}
              onClick={() => setActiveSubject('all')}
              label="All"
              count={allVideos.length}
              color="var(--accent-cyan)"
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
        <p className="text-xs text-text-muted font-mono mb-10">
          {search.trim()
            ? `${totalVideos} result${totalVideos !== 1 ? 's' : ''} for "${search}"`
            : `${totalVideos} videos · ${filtered.length} topics`}
        </p>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-32 text-center">
            <PlayCircle className="w-14 h-14 text-text-muted opacity-20 mb-5" />
            <p className="text-lg font-bold text-text-secondary mb-2">No videos found</p>
            <p className="text-sm text-text-muted mb-6">Try a different keyword</p>
            <button
              onClick={() => setSearch('')}
              className="px-5 py-2 rounded-xl text-sm font-bold no-min-h"
              style={{ background: 'rgba(0,229,255,0.08)', color: 'var(--accent-cyan)', border: '1px solid rgba(0,229,255,0.2)' }}
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="space-y-20">
            {grouped.map(([slug, sections]) => {
              const meta    = getSubjectMeta(slug);
              const accent  = ACCENTS[slug] ?? { color: 'var(--accent-cyan)', bg: 'transparent', border: 'var(--border-subtle)', gradient: '' };
              const SubIcon = meta?.icon;
              const subTotal = sections.reduce((a, sv) => a + sv.videos.length, 0);

              return (
                <section key={slug}>
                  {/* ── Subject heading ─────────────────────────────── */}
                  <div className={`flex items-center justify-between mb-8 pb-5 border-b`}
                    style={{ borderColor: accent.border }}
                  >
                    <div className="flex items-center gap-3">
                      {SubIcon && (
                        <span className="p-2 rounded-xl"
                          style={{ background: accent.bg, border: `1px solid ${accent.border}` }}
                        >
                          <SubIcon className="w-5 h-5" style={{ color: accent.color }} />
                        </span>
                      )}
                      <div>
                        <h2 className="text-xl font-display font-extrabold text-white break-words">
                          {meta?.name ?? slug}
                        </h2>
                        <p className="text-xs text-text-muted mt-0.5">
                          {subTotal} videos · {sections.length} topic{sections.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/learn/${slug}`}
                      className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors no-min-h"
                      style={{ color: accent.color, background: accent.bg, border: `1px solid ${accent.border}` }}
                    >
                      <GraduationCap className="w-3.5 h-3.5" />
                      Open Course
                    </Link>
                  </div>

                  {/* ── Topic tile groups ────────────────────────────── */}
                  <div className="space-y-12">
                    {sections.map((sv) => {
                      const diff = sv.difficulty ? DIFF[sv.difficulty] : null;
                      return (
                        <div key={`${sv.subjectSlug}/${sv.topicSlug}`}>
                          {/* Topic label row */}
                          <div className="flex flex-wrap items-center gap-3 mb-5">
                            {/* Accent strip */}
                            <span className="w-1 h-8 rounded-full shrink-0"
                              style={{ background: accent.color }}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-base font-bold text-white leading-tight break-words">
                                  {sv.topicTitle}
                                </h3>
                                {diff && (
                                  <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                                    style={{ background: diff.bg, color: diff.color }}
                                  >
                                    {sv.difficulty}
                                  </span>
                                )}
                                {sv.estimatedMinutes && (
                                  <span className="flex items-center gap-1 text-[10px] text-text-muted">
                                    <Clock className="w-3 h-3" />
                                    {sv.estimatedMinutes} min
                                  </span>
                                )}
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                                  style={{ background: accent.bg, color: accent.color, border: `1px solid ${accent.border}` }}
                                >
                                  {sv.videos.length} video{sv.videos.length !== 1 ? 's' : ''}
                                </span>
                              </div>
                              {sv.topicDescription && (
                                <p className="text-xs text-text-secondary mt-1 leading-relaxed line-clamp-2 sm:line-clamp-1 max-w-2xl break-words">
                                  {sv.topicDescription}
                                </p>
                              )}
                            </div>
                            <Link
                              href={`/learn/${sv.subjectSlug}/${sv.topicSlug}`}
                              className="flex items-center gap-1 text-[10px] font-bold text-text-muted hover:text-white transition-colors no-min-h shrink-0"
                            >
                              <BookOpen className="w-3 h-3" />
                              Full Lesson
                              <ChevronRight className="w-3 h-3" />
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
  const activeColor = color ?? 'var(--accent-cyan)';
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all duration-150 no-min-h shrink-0"
      style={{
        background: active ? `${activeColor}14` : 'transparent',
        border: `1px solid ${active ? activeColor : 'transparent'}`,
        color: active ? activeColor : 'var(--text-muted)',
      }}
    >
      {Icon && <Icon className="w-3 h-3" />}
      {label}
      <span
        className="text-[10px] px-1.5 py-0.5 rounded-full font-bold"
        style={{
          background: active ? `${activeColor}20` : 'rgba(255,255,255,0.06)',
          color: active ? activeColor : 'var(--text-muted)',
        }}
      >
        {count}
      </span>
    </button>
  );
}
