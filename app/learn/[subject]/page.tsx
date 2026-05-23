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

  // Determine dynamic gradient background based on subject slug
  const getSubjectHeroStyles = (slug: string) => {
    switch (slug) {
      case 'sql':
        return {
          bg: 'from-[#05131a] via-[#040e14] to-[#030712]',
          glow: 'bg-accent-teal/10',
          accent: 'text-accent-teal',
          border: 'border-accent-teal/30',
          outcomes: ['Write complex analytical queries using window functions and CTEs', 'Structure database layouts with indexes for 10x query performance', 'Implement robust transactional operations compliant with ACID principles']
        };
      case 'python':
        return {
          bg: 'from-[#051026] via-[#040b1b] to-[#030712]',
          glow: 'bg-accent-blue/10',
          accent: 'text-accent-blue',
          border: 'border-accent-blue/30',
          outcomes: ['Develop scalable data parsing frameworks using Python collections', 'Master class constructors and inheritance hierarchies in OOP', 'Build concurrent pipelines utilizing generators and custom decorators']
        };
      case 'power-bi':
        return {
          bg: 'from-[#191105] via-[#120c04] to-[#030712]',
          glow: 'bg-accent-amber/10',
          accent: 'text-accent-amber',
          border: 'border-accent-amber/30',
          outcomes: ['Connect, model, and calculate Year-over-Year variables using DAX functions', 'Design premium interactive dashboards optimized for executive stakeholders', 'Configure secure sharing systems using Power BI Service environments']
        };
      case 'deep-learning':
        return {
          bg: 'from-[#1a060e] via-[#13040a] to-[#030712]',
          glow: 'bg-accent-rose/10',
          accent: 'text-accent-rose',
          border: 'border-accent-rose/30',
          outcomes: ['Construct neural net architectures from perceptrons to CNN filters', 'Manually implement backprop calculations and weights updates', 'Train sequence prediction pipelines using LSTMs and transformers']
        };
      default:
        return {
          bg: 'from-[#11051a] via-[#0c0413] to-[#030712]',
          glow: 'bg-accent-purple/10',
          accent: 'text-accent-purple',
          border: 'border-accent-purple/30',
          outcomes: ['Build Retrieval Augmented Generation (RAG) models using vector indexes', 'Leverage LangGraph state machines for multi-agent coordination loops', 'Incorporate Model Context Protocol (MCP) integrations in agent workflows']
        };
    }
  };

  const style = getSubjectHeroStyles(subjectSlug);

  return (
    <div className="min-h-screen pb-24 bg-[#030712] neural-grid">
      {/* ── Cinematic Hero Section ────────────────────────────────────────── */}
      <div className={`relative overflow-hidden pt-32 pb-16 border-b border-border/40 bg-gradient-to-b ${style.bg}`}>
        {/* Glow effect */}
        <div className={`absolute top-1/2 right-10 w-96 h-96 ${style.glow} rounded-full filter blur-[120px] pointer-events-none`} />

        <div className="container mx-auto px-6 relative z-10">
          {/* Back to Dashboard */}
          <div className="mb-6">
            <Link 
              href="/dashboard" 
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-text-secondary hover:text-white transition-colors group"
            >
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> BACK TO DASHBOARD
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
            <div className="flex items-center gap-5 text-left">
              <div className={`p-4 rounded-2xl bg-[#0c1220] border ${style.border} ${style.accent} shadow-2xl`}>
                <subject.icon className="w-9 h-9" />
              </div>
              <div>
                <span className={`text-xs font-mono font-bold uppercase tracking-widest ${style.accent} block mb-1`}>
                  CURRICULUM MODULE
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white leading-tight">
                  {subject.name}
                </h1>
                <p className="text-sm sm:text-base text-text-secondary max-w-xl leading-relaxed mt-1">
                  {subject.description}
                </p>
              </div>
            </div>

            {/* Progress indicators ring & XP bar */}
            <div className="flex items-center gap-6 bg-bg-surface/20 border border-border p-5 rounded-2xl backdrop-blur-sm shadow-xl shrink-0 self-start lg:self-auto">
              <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    className="stroke-border/40"
                    strokeWidth="5"
                    fill="transparent"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    className={`transition-all duration-500 stroke-accent-teal`}
                    strokeWidth="5"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 26}
                    strokeDashoffset={2 * Math.PI * 26 * (1 - progressPercent / 100)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute text-sm font-mono font-bold text-white">
                  {progressPercent}%
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono font-bold text-text-secondary uppercase tracking-widest block mb-0.5">
                  XP EARNED
                </span>
                <span className="text-xl font-extrabold text-white block font-mono">
                  {totalXP} <span className="text-xs font-normal text-text-secondary">/ {subject.topics.length * 100} XP</span>
                </span>
                <span className="text-[10px] font-bold text-accent-teal block mt-1 uppercase tracking-tighter">
                  {completedCount} of {subject.topics.length} topics finished
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-8 border-t border-border/30 pt-8 text-white font-mono text-xs">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-text-secondary" />
              <span>{subject.topics.length} LESSONS</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-text-secondary" />
              <span>{subject.estimatedHours} HOURS STUDY</span>
            </div>
            <div className="flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-text-secondary" />
              <span>LEVEL {subject.level} TRACK</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* ── Left Column: Learning Timeline Path ─────────────────────────────────────────── */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-accent-teal" />
                Learning Timeline
              </h2>
            </div>

            {/* Vertical timeline timeline */}
            <div className="space-y-6 relative pl-6 border-l border-border/80">
              {subject.topics.map((topic, index) => {
                const isCompleted = completedTopics.includes(topic.id);
                const isActiveResume = nextTopicToStudy?.id === topic.id;
                
                return (
                  <div key={topic.id} className="relative group">
                    {/* Node Dot indicator */}
                    <div className={`absolute -left-[31px] top-6 w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center
                      ${isCompleted 
                        ? 'bg-accent-teal border-accent-teal text-bg-primary' 
                        : isActiveResume
                          ? 'bg-accent-purple border-accent-purple animate-pulse'
                          : 'bg-bg-primary border-border group-hover:border-text-secondary/40'
                      }`}
                    >
                      {isCompleted && <span className="w-1.5 h-1.5 bg-bg-primary rounded-full" />}
                    </div>

                    <Link href={`/learn/${subject.slug}/${topic.slug}`}>
                      <div className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer text-left
                        ${isCompleted 
                          ? 'bg-[#0c1220]/30 border-border/50 hover:border-accent-teal/40' 
                          : isActiveResume
                            ? 'bg-[#0f1126]/60 border-accent-purple/40 shadow-lg shadow-accent-purple/5 hover:border-accent-purple'
                            : 'bg-bg-surface/20 border-border/50 hover:border-text-secondary/30'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-8 h-8 rounded-xl font-bold font-mono text-sm flex items-center justify-center shrink-0 border
                            ${isCompleted 
                              ? 'bg-accent-teal/10 border-accent-teal/20 text-accent-teal' 
                              : isActiveResume
                                ? 'bg-accent-purple/10 border-accent-purple/20 text-accent-purple'
                                : 'bg-bg-primary border-border/60 text-text-secondary'
                            }`}
                          >
                            {index + 1}
                          </div>
                          
                          <div className="space-y-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-extrabold text-base text-white truncate">{topic.title}</h3>
                              {topic.difficulty && (
                                <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-bg-primary border border-border/60 text-text-secondary">
                                  {topic.difficulty}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-text-secondary line-clamp-1 leading-relaxed">
                              {topic.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 self-end sm:self-auto shrink-0">
                          {isCompleted ? (
                            <div className="flex items-center gap-1.5 text-xs text-accent-teal font-mono">
                              <CheckCircle2 className="w-4 h-4 shrink-0" />
                              <span className="hidden sm:inline font-bold">COMPLETED</span>
                            </div>
                          ) : isActiveResume ? (
                            <div className="flex items-center gap-1.5 text-xs text-accent-purple font-mono font-bold animate-pulse">
                              <Sparkles className="w-4 h-4 shrink-0" />
                              <span className="hidden sm:inline">NEXT UP</span>
                            </div>
                          ) : (
                            <span className="text-[10px] text-text-secondary font-mono">READY</span>
                          )}

                          <div className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-300
                            ${isCompleted
                              ? 'bg-accent-teal/10 border-accent-teal/20 text-accent-teal'
                              : isActiveResume
                                ? 'bg-accent-purple/10 border-accent-purple/20 text-accent-purple group-hover:scale-105'
                                : 'bg-bg-primary border-border/80 text-text-secondary group-hover:border-text-secondary/40'
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
          <div className="lg:col-span-4 space-y-8 text-left">
            {/* Quick Resume studying box */}
            {nextTopicToStudy && (
              <div className="p-6 bg-gradient-to-br from-[#0c1220] to-[#0f1126] border border-accent-purple/20 rounded-2xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-accent-purple/5 rounded-bl-full pointer-events-none" />
                <h3 className="text-xs font-bold text-accent-purple uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Resume Studying
                </h3>
                <h4 className="text-base font-extrabold text-white mb-2 leading-tight">
                  {nextTopicToStudy.title}
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed mb-6">
                  {nextTopicToStudy.description}
                </p>

                <Link href={`/learn/${subject.slug}/${nextTopicToStudy.slug}`}>
                  <button className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-accent-teal to-accent-purple text-bg-primary font-bold text-xs rounded-xl hover:opacity-90 transition-opacity cursor-pointer border-none">
                    <span>Resume Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
              </div>
            )}

            {/* Outcome master list box */}
            <div className="p-6 bg-bg-surface/20 border border-border/80 rounded-2xl space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-border/40">
                <Award className="w-5 h-5 text-accent-teal" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">What you will master</h3>
              </div>

              <ul className="space-y-4">
                {style.outcomes.map((outcome, i) => (
                  <li key={i} className="flex gap-3 items-start text-xs text-text-secondary leading-relaxed">
                    <span className="p-0.5 rounded bg-accent-teal/10 border border-accent-teal/20 text-accent-teal mt-0.5 shrink-0">
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

