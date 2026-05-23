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

const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Select Your Focus Track',
    description: 'Filter from beginner programming basics to high-end autonomous systems based on your experience level.',
    icon: Compass,
    color: 'text-accent-teal border-accent-teal/20 bg-accent-teal/5'
  },
  {
    step: '02',
    title: 'Compile In-Browser WASM Code',
    description: 'Execute live SQL queries and train PyTorch models without downloading any local configurations.',
    icon: Cpu,
    color: 'text-accent-purple border-accent-purple/20 bg-accent-purple/5'
  },
  {
    step: '03',
    title: 'Assess Your Readiness',
    description: 'Prepare for college exams and tech interviews using customized flashcards and practice quizzes.',
    icon: FileCheck2,
    color: 'text-accent-rose border-accent-rose/20 bg-accent-rose/5'
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

export default function Home() {
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number | null>(null);

  return (
    <div className="flex flex-col bg-bg-base">
      {/* 1. Hero Section */}
      <HeroSection />
      
      {/* 2. Stats Bar */}
      <StatsBar />
      
      {/* 3. The Visual Roadmap section */}
      <section className="py-24 overflow-hidden border-b border-border/40 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-teal/5 rounded-full filter blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-6 text-center mb-16">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent-teal/10 border border-accent-teal/20 text-accent-teal text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE SYLLABUS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold mb-4 text-text-primary">
            Visual Learning <span className="bg-gradient-to-r from-accent-teal to-accent-purple bg-clip-text text-transparent">Pathways</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            A comprehensive, structured study curriculum taking you from standard data primitives to fully autonomous agent design.
          </p>
        </div>
        <RoadmapGraph />
      </section>

      {/* 4. Subject Cards Grid */}
      <section className="py-24 container mx-auto px-6 border-b border-border/40">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold mb-4 text-text-primary">
              Explore the <span className="bg-gradient-to-r from-accent-teal to-accent-purple bg-clip-text text-transparent">Curriculum</span>
            </h2>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
              Every subject is structured with browser-based code executors, interactive diagrams, and customizable tests.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-bg-surface/30 border border-border/50 rounded-full text-xs font-bold uppercase tracking-widest text-text-secondary backdrop-blur-sm">
              10 Subjects
            </div>
            <div className="px-4 py-2 bg-bg-surface/30 border border-border/50 rounded-full text-xs font-bold uppercase tracking-widest text-text-secondary backdrop-blur-sm">
              150+ Topics
            </div>
          </div>
        </div>

        <SubjectGrid />
      </section>

      {/* 5. How It Works Section */}
      <section className="py-24 border-b border-border-subtle relative bg-bg-subtle/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold mb-4 text-text-primary">
              Engineered for <span className="bg-gradient-to-r from-accent-purple to-accent-rose bg-clip-text text-transparent">Active Recall</span>
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              We replaced long theoretical lectures with a three-step cycle that helps you comprehend ideas deeply.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS_STEPS.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div key={idx} className="p-6 bg-bg-surface/20 border border-border/50 rounded-2xl relative overflow-hidden group hover:border-text-secondary/20 transition-colors">
                  <div className="text-5xl font-mono font-black text-border/20 absolute -top-2 -right-2">
                    {step.step}
                  </div>
                  
                  <span className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-6 ${step.color}`}>
                    <StepIcon className="w-5 h-5" />
                  </span>

                  <h3 className="text-lg font-bold text-text-primary mb-2">{step.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Interview Questions Teaser Section */}
      <section className="py-24 border-b border-border/40 relative">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold mb-4 text-text-primary">
              Crack Technical <span className="bg-gradient-to-r from-accent-teal to-accent-purple bg-clip-text text-transparent">Interviews</span>
            </h2>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
              Get familiar with actual questions asked during technical screenings at top tech firms.
            </p>
          </div>

          <div className="space-y-4">
            {INTERVIEW_PREVIEW_QUESTIONS.map((q, idx) => {
              const isOpen = activeQuestionIdx === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-bg-surface/20 border border-border/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-text-secondary/20"
                >
                  <button
                    onClick={() => setActiveQuestionIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
                  >
                    <div className="space-y-1 pr-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-accent-teal uppercase tracking-widest px-2 py-0.5 bg-accent-teal/10 border border-accent-teal/20 rounded">
                          {q.subject}
                        </span>
                        <span className="text-xs text-text-secondary font-mono">
                          {q.difficulty} Level
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-text-primary">{q.question}</h3>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-text-secondary shrink-0 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-border-subtle bg-bg-elevated/40 text-sm text-text-secondary leading-relaxed">
                          <span className="text-xs font-bold text-accent-purple uppercase tracking-wider block mb-2">Answer Breakdown</span>
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
              <button className="flex items-center gap-2 px-6 py-3 border border-border hover:bg-bg-surface rounded-xl font-bold text-sm text-text-secondary hover:text-text-primary transition-all cursor-pointer">
                <span>Access Full Question Bank</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Testimonials/Social Proof */}
      <section className="py-24 border-b border-border-subtle bg-bg-subtle/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold mb-2 text-text-primary">
              Student Success Stories
            </h2>
            <p className="text-text-secondary text-sm">
              Read how developers and analysts are utilizing our platform to land roles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="p-6 bg-bg-surface border border-border-subtle rounded-2xl relative flex flex-col justify-between">
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent-teal to-accent-purple flex items-center justify-center text-sm font-bold text-text-primary font-mono shrink-0">
                    {t.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text-primary">{t.author}</h4>
                    <span className="text-xs text-text-secondary flex items-center gap-1">
                      {t.role} <Building2 className="w-3.5 h-3.5 text-text-secondary" /> {t.company}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA Section */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-r from-bg-elevated via-bg-base to-bg-subtle">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-accent-teal/5 rounded-full filter blur-[150px] pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-3xl text-center relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-text-primary leading-tight">
            Step into the Future of <br />
            <span className="bg-gradient-to-r from-accent-teal to-accent-purple bg-clip-text text-transparent">Data Science & AI</span>
          </h2>
          <p className="text-base text-text-secondary max-w-xl mx-auto leading-relaxed">
            Join the community today. Access fully interactive modules, visual charts, and localized developer sandboxes free forever.
          </p>

          <div className="pt-4 flex justify-center">
            <Link href="/learn/sql/intro">
              <Button size="lg" className="px-10 gap-2 bg-white text-bg-primary hover:bg-opacity-95 font-extrabold transition-all shadow-xl shadow-white/5 border-none">
                Start Learning Now
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

