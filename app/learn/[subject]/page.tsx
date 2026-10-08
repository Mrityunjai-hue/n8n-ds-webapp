'use client';

import React from 'react';
import { useParams, notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ChevronRight, 
  ChevronLeft,
  BookOpen, 
  Clock, 
  BrainCircuit, 
  Play, 
  CheckCircle2, 
  Sparkles, 
  GraduationCap,
  Award,
  ArrowRight
} from 'lucide-react';
import { getSubjectBySlug } from '@/lib/content';
import { useProgressStore } from '@/lib/store/useProgressStore';
import { motion } from 'framer-motion';

export default function SubjectPage() {
  const params = useParams();
  const router = useRouter();
  const subjectSlug = params.subject as string;
  const subject = getSubjectBySlug(subjectSlug);
  const { completedTopics } = useProgressStore();

  if (!subject) {
    notFound();
  }

  // Calculate subject progress metrics
  const subjectTopicIds = subject.topics.map(t => t.id);
  const completedSubjectTopics = completedTopics.filter(id => subjectTopicIds.includes(id));
  const completedCount = completedSubjectTopics.length;
  const progressPercent = subject.topics.length > 0 
    ? Math.round((completedCount / subject.topics.length) * 100) 
    : 0;
  
  const totalXP = completedCount * 100;

  // Find next topic to study (first incomplete topic)
  const nextTopicToStudy = subject.topics.find(t => !completedTopics.includes(t.id));

  // Determine dynamic accent styling based on subject slug
  const getSubjectHeroStyles = (slug: string) => {
    switch (slug) {
      case 'sql':
        return {
          accentColor: 'var(--green)',
          accentBg: 'var(--green-tint)',
          outcomes: ['Write complex analytical queries using window functions and CTEs', 'Structure database layouts with indexes for 10x query performance', 'Implement robust transactional operations compliant with ACID principles']
        };
      case 'python':
        return {
          accentColor: 'var(--blue)',
          accentBg: 'var(--blue-tint)',
          outcomes: ['Develop scalable data parsing frameworks using Python collections', 'Master class constructors and inheritance hierarchies in OOP', 'Build concurrent pipelines utilizing generators and custom decorators']
        };
      case 'power-bi':
        return {
          accentColor: 'var(--orange)',
          accentBg: 'var(--orange-tint)',
          outcomes: ['Connect, model, and calculate Year-over-Year variables using DAX functions', 'Design premium interactive dashboards optimized for executive stakeholders', 'Configure secure sharing systems using Power BI Service environments']
        };
      case 'deep-learning':
        return {
          accentColor: 'var(--red)',
          accentBg: 'var(--red-tint)',
          outcomes: ['Construct neural net architectures from perceptrons to CNN filters', 'Manually implement backprop calculations and weights updates', 'Train sequence prediction pipelines using LSTMs and transformers']
        };
      default:
        return {
          accentColor: 'var(--blue)',
          accentBg: 'var(--blue-tint)',
          outcomes: ['Build Retrieval Augmented Generation (RAG) models using vector indexes', 'Leverage LangGraph state machines for multi-agent coordination loops', 'Incorporate Model Context Protocol (MCP) integrations in agent workflows']
        };
    }
  };

  const style = getSubjectHeroStyles(subjectSlug);

  return (
    <div className="min-h-screen pb-24 doodle-canvas">
      {/* ── Subject Header Section ────────────────────────────────────────── */}
      <div className="relative overflow-hidden pt-28 pb-14 border-b border-[var(--canvas-border)] bg-[var(--canvas-raised)]">
        <div className="container mx-auto px-6 relative z-10">
          {/* Back to Learn */}
          <div className="mb-6">
            <Link 
              href="/learn" 
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[var(--ink-3)] hover:text-[var(--ink)] transition-colors group"
            >
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> BACK TO ALL COURSES
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row justify-between gap-8 mb-10">
            <div className="flex items-start gap-5 text-left min-w-0 flex-1">
              <div 
                className="p-4 rounded-2xl border-2 border-[var(--canvas-border)] shadow-md shrink-0"
                style={{ backgroundColor: style.accentBg, color: style.accentColor }}
              >
                <subject.icon className="w-8 h-8 sm:w-9 sm:h-9" />
              </div>
              <div className="min-w-0 flex-1">
                <span 
                  className="text-xs font-mono font-bold uppercase tracking-widest block mb-1 truncate"
                  style={{ color: style.accentColor }}
                >
                  CURRICULUM MODULE
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[var(--ink)] leading-tight break-words">
                  {subject.name}
                </h1>
                <p className="text-sm sm:text-base text-[var(--ink-2)] max-w-xl leading-relaxed mt-2 font-body">
                  {subject.description}
                </p>
              </div>
            </div>

            {/* Progress indicators ring & XP bar */}
            <div className="flex items-center gap-5 sm:gap-6 bg-[var(--canvas)] border-2 border-[var(--canvas-border)] p-5 rounded-2xl shadow-[var(--shadow-sm)] shrink-0 w-full sm:w-auto self-start lg:self-auto doodle-card">
              <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    stroke="var(--canvas-border)"
                    strokeWidth="5"
                    fill="transparent"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    className="transition-all duration-500"
                    stroke={style.accentColor}
                    strokeWidth="5"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 26}
                    strokeDashoffset={2 * Math.PI * 26 * (1 - progressPercent / 100)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute text-sm font-mono font-bold text-[var(--ink)]">
                  {progressPercent}%
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono font-bold text-[var(--ink-3)] uppercase tracking-widest block mb-0.5">
                  XP EARNED
                </span>
                <span className="text-xl font-extrabold text-[var(--ink)] block font-mono">
                  {totalXP} <span className="text-xs font-normal text-[var(--ink-3)]">/ {subject.topics.length * 100} XP</span>
                </span>
                <span 
                  className="text-[10px] font-bold block mt-1 uppercase tracking-tighter"
                  style={{ color: style.accentColor }}
                >
                  {completedCount} of {subject.topics.length} topics finished
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-8 border-t border-[var(--canvas-border)] pt-6 text-[var(--ink-2)] font-mono text-xs">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[var(--ink-3)]" />
              <span>{subject.topics.length} LESSONS</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[var(--ink-3)]" />
              <span>{subject.estimatedHours} HOURS STUDY</span>
            </div>
            <div className="flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-[var(--ink-3)]" />
              <span>LEVEL {subject.level} TRACK</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* ── Left Column: Learning Timeline Path ─────────────────────────────────────────── */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-display font-extrabold text-[var(--ink)] flex items-center gap-2">
                <GraduationCap className="w-6 h-6" style={{ color: style.accentColor }} />
                Learning Timeline
              </h2>
            </div>

            {/* Vertical timeline */}
            <div className="space-y-4 relative pl-6 border-l-2 border-[var(--canvas-border)]">
              {subject.topics.map((topic, index) => {
                const isCompleted = completedTopics.includes(topic.id);
                const isActiveResume = nextTopicToStudy?.id === topic.id;
                
                return (
                  <div key={topic.id} className="relative group">
                    {/* Node Dot indicator */}
                    <div className={`absolute -left-[31px] top-6 w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center
                      ${isCompleted 
                        ? 'bg-[var(--green)] border-[var(--green)] text-white' 
                        : isActiveResume
                          ? 'bg-[var(--blue)] border-[var(--blue)] animate-pulse'
                          : 'bg-[var(--canvas-raised)] border-[var(--canvas-border)] group-hover:border-[var(--ink-3)]'
                      }`}
                    >
                      {isCompleted && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>

                    <Link href={`/learn/${subject.slug}/${topic.slug}`}>
                      <div className={`p-5 rounded-2xl border-2 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer text-left doodle-card
                        ${isCompleted 
                          ? 'bg-[var(--canvas-raised)] border-[var(--canvas-border)] hover:border-[var(--green)]' 
                          : isActiveResume
                            ? 'bg-[var(--canvas-raised)] border-[var(--blue)] shadow-[var(--shadow-md)]'
                            : 'bg-[var(--canvas-raised)] border-[var(--canvas-border)] hover:border-[var(--ink-3)]'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-8 h-8 rounded-xl font-bold font-mono text-sm flex items-center justify-center shrink-0 border
                            ${isCompleted 
                              ? 'bg-[var(--green-tint)] border-[var(--green)] text-[var(--green)]' 
                              : isActiveResume
                                ? 'bg-[var(--blue-tint)] border-[var(--blue)] text-[var(--blue)]'
                                : 'bg-[var(--canvas-sunken)] border-[var(--canvas-border)] text-[var(--ink-3)]'
                            }`}
                          >
                            {index + 1}
                          </div>
                          
                          <div className="space-y-1 min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-extrabold text-base text-[var(--ink)] break-words leading-snug font-heading">
                                {topic.title}
                              </h3>
                              {topic.difficulty && (
                                <span className="px-2 py-0.5 text-[9px] font-bold font-mono rounded-full bg-[var(--canvas-sunken)] border border-[var(--canvas-border)] text-[var(--ink-2)] whitespace-nowrap">
                                  {topic.difficulty}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[var(--ink-3)] line-clamp-2 sm:line-clamp-1 leading-relaxed font-body">
                              {topic.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 self-end sm:self-auto shrink-0">
                          {isCompleted ? (
                            <div className="flex items-center gap-1.5 text-xs text-[var(--green)] font-mono">
                              <CheckCircle2 className="w-4 h-4 shrink-0" />
                              <span className="hidden sm:inline font-bold">COMPLETED</span>
                            </div>
                          ) : isActiveResume ? (
                            <div className="flex items-center gap-1.5 text-xs text-[var(--blue)] font-mono font-bold animate-pulse">
                              <Sparkles className="w-4 h-4 shrink-0" />
                              <span className="hidden sm:inline">NEXT UP</span>
                            </div>
                          ) : (
                            <span className="text-[10px] text-[var(--ink-4)] font-mono">READY</span>
                          )}

                          <div className={`w-9 h-9 rounded-xl border-2 flex items-center justify-center transition-all duration-300
                            ${isCompleted
                              ? 'bg-[var(--green-tint)] border-[var(--green)] text-[var(--green)]'
                              : isActiveResume
                                ? 'bg-[var(--blue-tint)] border-[var(--blue)] text-[var(--blue)] group-hover:scale-105'
                                : 'bg-[var(--canvas-sunken)] border-[var(--canvas-border)] text-[var(--ink-3)] group-hover:border-[var(--ink-3)]'
                            }`}
                          >
                            <Play className="w-3.5 h-3.5 fill-current shrink-0" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Right Column: Resume Card & Outcome Box ─────────────────────────────────────────── */}
          <div className="lg:col-span-4 space-y-6 text-left">
            {/* Quick Resume studying box */}
            {nextTopicToStudy && (
              <div className="p-6 bg-[var(--canvas-raised)] border-2 border-[var(--blue)] rounded-2xl shadow-[var(--shadow-md)] relative overflow-hidden doodle-card">
                <h3 className="text-xs font-bold text-[var(--blue)] uppercase tracking-widest mb-3 flex items-center gap-1.5 font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  Resume Studying
                </h3>
                <h4 className="text-lg font-extrabold text-[var(--ink)] mb-2 leading-tight font-heading">
                  {nextTopicToStudy.title}
                </h4>
                <p className="text-xs text-[var(--ink-2)] leading-relaxed mb-6 font-body">
                  {nextTopicToStudy.description}
                </p>

                <Link href={`/learn/${subject.slug}/${nextTopicToStudy.slug}`}>
                  <button className="w-full flex items-center justify-center gap-2 py-3 bg-[var(--blue)] text-white font-bold text-sm rounded-xl hover:bg-[var(--blue-dim)] transition-colors cursor-pointer border-none shadow-[var(--shadow-sm)] font-mono">
                    <span>Resume Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            )}

            {/* Outcome master list box */}
            <div className="p-6 bg-[var(--canvas-raised)] border-2 border-[var(--canvas-border)] rounded-2xl space-y-5 doodle-card">
              <div className="flex items-center gap-2 pb-4 border-b border-[var(--canvas-border)]">
                <Award className="w-5 h-5 text-[var(--green)]" />
                <h3 className="text-sm font-bold text-[var(--ink)] uppercase tracking-wider font-mono">What you will master</h3>
              </div>

              <ul className="space-y-3.5">
                {style.outcomes.map((outcome, i) => (
                  <li key={i} className="flex gap-3 items-start text-xs text-[var(--ink-2)] leading-relaxed font-body">
                    <span className="p-0.5 rounded bg-[var(--green-tint)] border border-[var(--green)] text-[var(--green)] mt-0.5 shrink-0">
                      <CheckCircle2 className="w-3 h-3" />
                    </span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

