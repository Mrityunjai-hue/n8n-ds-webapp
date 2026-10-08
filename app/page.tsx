'use client';

import React, { useState } from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { StatsBar } from '@/components/home/StatsBar';
import { RoadmapGraph } from '@/components/home/RoadmapGraph';
import { SubjectGrid } from '@/components/home/SubjectGrid';

import { 
  Compass, 
  Cpu, 
  FileCheck2, 
  ArrowRight, 
  MessageSquare, 
  Building2, 
  Sparkles, 
  CheckCircle,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { DoodleDivider } from '@/components/ui/DoodleDivider';

const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Select Your Focus Track',
    description: 'Filter from beginner programming basics to high-end autonomous systems based on your experience level.',
    icon: Compass,
    color: 'lime'
  },
  {
    step: '02',
    title: 'Compile In-Browser WASM Code',
    description: 'Execute live SQL queries and train PyTorch models without downloading any local configurations.',
    icon: Cpu,
    color: 'acid'
  },
  {
    step: '03',
    title: 'Assess Your Readiness',
    description: 'Prepare for college exams and tech interviews using customized flashcards and practice quizzes.',
    icon: FileCheck2,
    color: 'warning'
  }
];

const INTERVIEW_PREVIEW_QUESTIONS = [
  {
    subject: 'SQL',
    question: 'How does a LEFT JOIN differ from an INNER JOIN?',
    difficulty: 'Fresher',
    answer: 'INNER JOIN returns only matching rows from both tables. LEFT JOIN returns all rows from the left table, and matching rows from the right table. Non-matching values are filled with NULLs.'
  },
  {
    subject: 'Python',
    question: 'Why is using a mutable default argument like def func(items=[]) a bug?',
    difficulty: 'Mid',
    answer: 'Default arguments are evaluated once at function definition time, not at execution. A shared list object is reused, causing appended data to persist across subsequent calls.'
  },
  {
    subject: 'Machine Learning',
    question: 'What is data leakage and how do you prevent it?',
    difficulty: 'Senior',
    answer: 'Data leakage happens when test set information influences the model during training (e.g. scaling before train-test split). Prevent it by fitting transformers ONLY on training folds using scikit-learn Pipelines.'
  }
];

const TESTIMONIALS = [
  {
    quote: "The interactive playgrounds saved my interview prep. Being able to run SQL and Python side-by-side with visual flowcharts helped me land a data role.",
    author: "Rohan Sharma",
    role: "Incoming Data Analyst",
    company: "Deloitte"
  },
  {
    quote: "This is far superior to standard courses. The curriculum flows from variables to actual Agentic state graphs. The explanations are incredibly clear.",
    author: "Ananya Mehta",
    role: "Computer Science Student",
    company: "BITS Pilani"
  }
];

const stepColorMap: Record<string, { iconBg: string; iconColor: string; borderColor: string }> = {
  lime: { iconBg: 'var(--yellow-tint)', iconColor: 'var(--ink)', borderColor: 'var(--canvas-border)' },
  acid: { iconBg: 'var(--blue-tint)', iconColor: 'var(--blue)', borderColor: 'var(--canvas-border)' },
  warning: { iconBg: 'var(--orange-tint)', iconColor: 'var(--orange)', borderColor: 'var(--canvas-border)' },
};

export default function Home() {
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number | null>(null);

  return (
    <div className="flex flex-col bg-transparent">
      {/* 1. Hero Section */}
      <HeroSection />
      
      {/* 2. Stats Bar */}
      <StatsBar />

      <div className="container mx-auto px-6 max-w-5xl">
        <DoodleDivider />
      </div>
      
      {/* 3. The Visual Roadmap section */}
      <section className="py-16 overflow-hidden relative">
        <div className="container mx-auto px-6 text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono font-medium mb-4" style={{ backgroundColor: 'var(--yellow-tint)', borderColor: 'var(--canvas-border)', color: 'var(--ink)' }}>
            <Sparkles className="w-3.5 h-3.5 text-[var(--yellow)]" />
            <span>INTERACTIVE SYLLABUS</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--ink)' }}>
            Visual Learning <span className="underline decoration-[var(--yellow)] decoration-wavy" style={{ color: 'var(--blue)' }}>Pathways</span>
          </h2>
          <p className="max-w-xl mx-auto text-base sm:text-lg leading-relaxed" style={{ color: 'var(--ink-2)', fontFamily: 'var(--font-body)' }}>
            A comprehensive, structured study curriculum taking you from standard data primitives to fully autonomous agent design.
          </p>
        </div>
        <RoadmapGraph />
      </section>

      <div className="container mx-auto px-6 max-w-5xl">
        <DoodleDivider variant="zigzag" />
      </div>

      {/* 4. Subject Cards Grid */}
      <section className="py-16 container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl text-left">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--ink)' }}>
              Explore the <span style={{ color: 'var(--blue)' }}>Curriculum</span>
            </h2>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--ink-2)', fontFamily: 'var(--font-body)' }}>
              Every subject is structured with browser-based code executors, interactive diagrams, and customizable tests.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="px-3.5 py-1.5 border rounded-full text-xs font-mono font-medium" style={{ backgroundColor: 'var(--canvas-raised)', borderColor: 'var(--canvas-border)', color: 'var(--ink-2)' }}>
              10 Subjects
            </div>
            <div className="px-3.5 py-1.5 border rounded-full text-xs font-mono font-medium" style={{ backgroundColor: 'var(--canvas-raised)', borderColor: 'var(--canvas-border)', color: 'var(--ink-2)' }}>
              150+ Topics
            </div>
          </div>
        </div>

        <SubjectGrid />
      </section>

      {/* 5. How It Works Section */}
      <section className="py-20 border-b relative" style={{ borderColor: 'var(--canvas-border)', backgroundColor: 'var(--canvas-raised)' }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--ink)' }}>
              Engineered for <span className="underline decoration-[var(--yellow)] decoration-wavy" style={{ color: 'var(--yellow)' }}>Active Recall</span>
            </h2>
            <p className="max-w-xl mx-auto text-base sm:text-lg leading-relaxed" style={{ color: 'var(--ink-2)', fontFamily: 'var(--font-body)' }}>
              We replaced long theoretical lectures with an active three-step cycle to help you comprehend ideas deeply.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOW_IT_WORKS_STEPS.map((step, idx) => {
              const StepIcon = step.icon;
              const colors = stepColorMap[step.color];
              return (
                <div key={idx} className="p-6 border rounded-2xl paper-card relative overflow-hidden group">
                  <div className="text-5xl font-mono font-bold absolute -top-2 -right-2" style={{ color: 'var(--ink-4)', opacity: 0.35 }}>
                    {step.step}
                  </div>
                  
                  <span className="w-10 h-10 rounded-xl border flex items-center justify-center mb-4" style={{ backgroundColor: colors.iconBg, borderColor: colors.borderColor, color: colors.iconColor }}>
                    <StepIcon className="w-5 h-5" />
                  </span>

                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--ink)', fontFamily: 'var(--font-heading)' }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-2)', fontFamily: 'var(--font-body)' }}>{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Interview Questions Teaser Section */}
      <section className="py-20 border-b relative" style={{ borderColor: 'var(--canvas-border)' }}>
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--ink)' }}>
              Crack Technical <span style={{ color: 'var(--blue)' }}>Interviews</span>
            </h2>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--ink-2)', fontFamily: 'var(--font-body)' }}>
              Get familiar with actual questions asked during technical screenings at top tech firms.
            </p>
          </div>

          <div className="space-y-4">
            {INTERVIEW_PREVIEW_QUESTIONS.map((q, idx) => {
              const isOpen = activeQuestionIdx === idx;
              return (
                <div 
                  key={idx} 
                  className="border rounded-2xl overflow-hidden paper-card transition-all duration-200"
                  style={{ borderColor: isOpen ? 'var(--blue)' : 'var(--canvas-border)' }}
                >
                  <button
                    onClick={() => setActiveQuestionIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer"
                  >
                    <div className="space-y-1.5 pr-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border" style={{ color: 'var(--blue)', backgroundColor: 'var(--blue-tint)', borderColor: 'var(--canvas-border)' }}>
                          {q.subject}
                        </span>
                        <span className="text-xs font-mono" style={{ color: 'var(--ink-3)' }}>
                          {q.difficulty} Level
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold" style={{ color: 'var(--ink)', fontFamily: 'var(--font-heading)' }}>{q.question}</h3>
                    </div>
                    <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} style={{ color: 'var(--ink-3)' }} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-3 border-t text-sm leading-relaxed" style={{ borderColor: 'var(--canvas-border)', backgroundColor: 'var(--canvas-sunken)', color: 'var(--ink-2)', fontFamily: 'var(--font-body)', fontSize: '15px' }}>
                          <span className="text-xs font-mono font-bold uppercase tracking-wider block mb-2" style={{ color: 'var(--blue)' }}>Answer Breakdown</span>
                          <p>{q.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center mt-10">
            <Link href="/interview">
              <button className="btn-outline flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-base cursor-pointer">
                <span>Access Full Question Bank</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Testimonials/Social Proof */}
      <section className="py-20 border-b" style={{ borderColor: 'var(--canvas-border)', backgroundColor: 'var(--canvas-raised)' }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--ink)' }}>
              Learner Notes &amp; Success
            </h2>
            <p className="text-base" style={{ color: 'var(--ink-2)', fontFamily: 'var(--font-body)' }}>
              Read how developers and analysts are utilizing our scratchpad to land roles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="p-6 border rounded-2xl paper-card relative flex flex-col justify-between">
                <p className="text-base leading-relaxed italic mb-6" style={{ color: 'var(--ink)', fontFamily: 'var(--font-body)' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold font-mono shrink-0" style={{ backgroundColor: 'var(--blue)', color: '#ffffff' }}>
                    {t.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-base font-bold" style={{ color: 'var(--ink)', fontFamily: 'var(--font-heading)' }}>{t.author}</h4>
                    <span className="text-xs flex items-center gap-1 font-mono" style={{ color: 'var(--ink-3)' }}>
                      {t.role} <Building2 className="w-3.5 h-3.5" /> {t.company}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA Section */}
      <section className="py-20 relative overflow-hidden" style={{ backgroundColor: 'var(--canvas)' }}>
        <div className="container mx-auto px-6 max-w-3xl text-center relative z-10 space-y-6">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight" style={{ fontFamily: 'var(--font-heading)', color: 'var(--ink)' }}>
            Start Solving with <br />
            <span style={{ color: 'var(--blue)' }}>404-Found-Code</span>
          </h2>
          <p className="text-base sm:text-lg max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--ink-2)', fontFamily: 'var(--font-body)' }}>
            Join the community today. Access real interview SQL questions, in-browser sandboxes, and structured learning free forever.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/code">
              <button className="btn-primary text-base px-8 py-3 rounded-xl font-bold shadow-[var(--shadow-md)]">
                Launch SQL Practice
              </button>
            </Link>
            <Link href="https://discord.gg/jDRYPJQHKW" target="_blank" rel="noopener noreferrer">
              <button className="btn-ghost text-base px-6 py-3 rounded-xl font-medium">
                Join Discord
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

