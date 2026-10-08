import { subjects } from '@/lib/content/subjects';
import { RoadmapGraph } from '@/components/home/RoadmapGraph';
import { SubjectContent } from '@/lib/types/content';
import Link from 'next/link';
import { Train, Sparkles, ArrowRight, Layers, MapPin } from 'lucide-react';

export default function RoadmapPage() {
  return (
    <div className="flex flex-col py-12 pb-24 min-h-screen doodle-canvas select-none">
      
      {/* ── HEADER TITLE SECTION ── */}
      <div className="container mx-auto px-6 mb-10 text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border-2 border-[var(--canvas-border)] bg-[var(--yellow-tint)] text-xs font-mono font-bold text-[var(--ink)] mb-4 shadow-sm">
          <Train className="w-4 h-4 text-[var(--blue)]" />
          <span>DATA SCIENCE TRANSIT NETWORK &bull; 3 INTERCONNECTED LINES</span>
        </div>

        <h1
          className="text-4xl lg:text-6xl font-bold mb-4 crayon-heading tracking-tight"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--ink)' }}
        >
          The Data Science <span className="crayon-blue">Metro Map</span>
        </h1>
        <p
          className="text-[var(--ink-2)] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Navigate the complete data science curriculum through a clean, structured transit system &mdash; from foundational databases and Python engineering to predictive ML and the Agentic AI terminal.
        </p>
      </div>

      {/* ── INTERACTIVE SUBWAY / METRO MAP CANVAS ── */}
      <div className="container mx-auto px-4 sm:px-6 mb-14 max-w-6xl">
        <RoadmapGraph />
      </div>

      {/* ── SUBJECT STATIONS DIRECTORY ── */}
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2
              className="text-3xl font-bold crayon-heading"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--ink)' }}
            >
              All Transit Stations &amp; Lines
            </h2>
            <p className="text-sm font-medium text-[var(--ink-2)] mt-1" style={{ fontFamily: 'var(--font-body)' }}>
              Explore detailed syllabus chapters and prerequisites for each station stop.
            </p>
          </div>
          <span className="hidden sm:inline text-xs font-mono font-bold text-[var(--ink-3)] bg-[var(--canvas-sunken)] px-3 py-1 rounded-full border border-[var(--canvas-border)]">
            11 Stations &bull; 100+ Topics
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjects.map((subject) => (
            <Link
              key={subject.id}
              href={`/learn/${subject.slug}`}
              className="p-5 bg-[var(--canvas-raised)] border-2 border-[var(--canvas-border)] rounded-2xl flex items-center justify-between group hover:border-[var(--blue)] transition-all hover:-translate-y-0.5 shadow-sm doodle-card"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-[var(--yellow-tint)] border border-[var(--canvas-border)] text-[var(--blue)] group-hover:scale-110 transition-transform">
                  <subject.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-[var(--canvas)] border border-[var(--canvas-border)] text-[var(--ink-3)]">
                      Lvl {subject.level}
                    </span>
                    <h3
                      className="font-bold text-xl text-[var(--ink)] group-hover:text-[var(--blue)] transition-colors"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {subject.name}
                    </h3>
                  </div>
                  <p
                    className="text-xs text-[var(--ink-2)] mt-1 line-clamp-2 leading-relaxed"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {subject.description}
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0 flex flex-col items-end gap-1 ml-3">
                <div className="text-xs font-mono font-bold text-[var(--ink)] bg-[var(--canvas-sunken)] px-2.5 py-0.5 rounded-full border border-[var(--canvas-border)]">
                  {subject.topics.length} Topics
                </div>
                <div className="text-[11px] font-mono text-[var(--ink-3)]">
                  ~{subject.estimatedHours}h
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
