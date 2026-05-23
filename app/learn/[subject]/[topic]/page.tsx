'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter, notFound } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  Star, 
  Info,
  BookOpen, 
  Code, 
  Award, 
  HelpCircle, 
  Clock, 
  CheckCircle,
  Lightbulb,
  AlertTriangle
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/Skeleton';
import { motion, AnimatePresence } from 'framer-motion';

const InteractiveEditor = dynamic(
  () => import('@/components/learn/InteractiveEditor').then(mod => mod.InteractiveEditor),
  { loading: () => <Skeleton className="h-[400px] w-full rounded-modal" />, ssr: false }
);

const SqlEditor = dynamic(
  () => import('@/components/learn/SqlEditor').then(mod => mod.SqlEditor),
  { loading: () => <Skeleton className="h-[400px] w-full rounded-modal" />, ssr: false }
);

const MermaidDiagram = dynamic(
  () => import('@/components/learn/MermaidDiagram').then(mod => mod.MermaidDiagram),
  { loading: () => <Skeleton className="h-[300px] w-full rounded-modal" />, ssr: false }
);

import { LineByLineBreakdown } from '@/components/learn/LineByLineBreakdown';
import { InterviewQuestionCard } from '@/components/learn/InterviewQuestionCard';
import { MarkCompleteButton } from '@/components/learn/MarkCompleteButton';
import { ELI5Toggle } from '@/components/learn/ELI5Toggle';
import { BookmarkButton } from '@/components/learn/BookmarkButton';
import { TopicNotes } from '@/components/learn/TopicNotes';
import { ContentSection, ProTip, Warning, KeyPoints } from '@/components/learn/LessonContent';
import { ComponentsBreakdown } from '@/components/learn/ComponentsBreakdown';
import { TopicSidebar } from '@/components/learn/TopicSidebar';
import { getTopicBySlug } from '@/lib/content';
import { useRecentStore } from '@/lib/store/useRecentStore';
import { StayTuned } from '@/components/learn/StayTuned';

// Import new components
import { QuizSection } from '@/components/learn/QuizSection';
import { ExamNotes } from '@/components/learn/ExamNotes';
import { RealWorldSection } from '@/components/learn/RealWorldSection';

export default function TopicPage() {
  const params = useParams();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isELI5, setIsELI5] = useState(false);
  const [activeTab, setActiveTab] = useState('learn');
  
  const subjectSlug = params.subject as string;
  const topicSlug = params.topic as string;

  const { setLastTopic } = useRecentStore();
  
  useEffect(() => {
    // Close sidebar on mobile by default
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, []);
  
  const resolved = getTopicBySlug(subjectSlug, topicSlug);
  
  if (!resolved) {
    notFound();
  }

  const { subject, topic } = resolved;

  // Track recent topic
  useEffect(() => {
    if (topic) {
      setLastTopic({
        subjectSlug,
        topicSlug: topic.slug,
        topicTitle: topic.title,
        timestamp: Date.now(),
      });
      // Reset active tab on topic change
      setActiveTab('learn');
    }
  }, [topic, subjectSlug, setLastTopic]);

  const currentTopicIndex = subject.topics.findIndex(t => t.id === topic.id);
  const nextTopic = subject.topics[currentTopicIndex + 1];
  const prevTopic = subject.topics[currentTopicIndex - 1];

  // Shortcut keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === '/') {
        setSidebarOpen(prev => !prev);
      }
      if (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement) return;
      
      if (e.key === 'n' && nextTopic) {
        router.push(`/learn/${subjectSlug}/${nextTopic.slug}`);
      }
      if (e.key === 'p' && prevTopic) {
        router.push(`/learn/${subjectSlug}/${prevTopic.slug}`);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sidebarOpen, nextTopic, prevTopic, router, subjectSlug]);

  // Determine available tabs
  const hasCode = !!(topic.sections.code?.code);
  const hasPrep = !!(
    topic.sections.examNotes?.examNotes || 
    topic.sections.realWorld?.realWorld || 
    topic.interviewQuestions?.length
  );
  const hasQuiz = !!(topic.sections.quiz?.quiz);

  const tabs = [
    { id: 'learn', label: '📖 Learn Concept', icon: BookOpen, show: true },
    { id: 'lab', label: '💻 Interactive Lab', icon: Code, show: hasCode },
    { id: 'prep', label: '🎯 Exam & Interview', icon: Award, show: hasPrep },
    { id: 'quiz', label: '🧠 Practice Quiz', icon: HelpCircle, show: hasQuiz },
  ].filter(tab => tab.show);

  // Set default tab if current active tab is not shown
  useEffect(() => {
    if (!tabs.find(t => t.id === activeTab) && tabs.length > 0) {
      setActiveTab(tabs[0].id);
    }
  }, [topic, tabs, activeTab]);

  const getDifficultyColor = (diff?: string) => {
    switch (diff) {
      case 'Beginner':
        return 'text-accent-teal border-accent-teal/20 bg-accent-teal/5';
      case 'Intermediate':
        return 'text-accent-amber border-accent-amber/20 bg-accent-amber/5';
      case 'Advanced':
        return 'text-accent-purple border-accent-purple/20 bg-accent-purple/5';
      default:
        return 'text-text-secondary border-border bg-bg-surface';
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-bg-primary text-text-primary">
      {/* Sidebar - Desktop/Mobile */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-72 transform border-r border-border bg-bg-primary transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 pt-16
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:hidden'}
      `}>
        <TopicSidebar 
          subjectName={subject.name} 
          topics={subject.topics.map(t => ({ id: t.id, title: t.title, slug: t.slug, isCompleted: false }))} 
          currentTopicId={topic.id}
          subjectSlug={subjectSlug}
        />
      </div>

      {/* Sidebar Backdrop - Mobile only */}
      {sidebarOpen && (
        <button 
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden w-full h-full cursor-pointer border-none"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-w-0">
        {/* Sticky Header */}
        <header className="sticky top-16 z-30 border-b border-border bg-bg-primary/80 backdrop-blur-md">
          <div className="flex h-14 sm:h-16 items-center justify-between px-3 sm:px-6">
            <div className="flex items-center gap-1 sm:gap-2">
              <Link 
                href={`/learn/${subjectSlug}`}
                className="p-2 hover:bg-bg-surface rounded-lg text-text-secondary hover:text-text-primary transition-colors flex items-center justify-center"
                title={`Back to ${subject.name}`}
              >
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-bg-surface rounded-lg text-text-secondary lg:hidden"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-bold uppercase tracking-widest text-text-secondary">
                <Link href={`/learn/${subjectSlug}`} className="hover:text-accent-teal transition-colors hidden sm:block">
                  {subject.name}
                </Link>
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 hidden sm:block" />
                <span className="text-text-primary truncate max-w-[140px] sm:max-w-[200px] md:max-w-none">{topic.title}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <ELI5Toggle isELI5={isELI5} setIsELI5={setIsELI5} />
              <BookmarkButton topicId={topic.id} />
            </div>
          </div>
        </header>

        {/* Dynamic Navigation Tabs */}
        <div className="sticky top-[112px] sm:top-[128px] z-20 border-b border-border bg-bg-primary/95 backdrop-blur-sm px-2 sm:px-6">
          <div className="flex gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                  className={`
                    flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold rounded-xl border transition-all shrink-0 cursor-pointer
                    ${isActive 
                      ? 'border-accent-teal text-accent-teal bg-accent-teal/5 shadow-lg shadow-accent-teal/5' 
                      : 'border-transparent text-text-secondary hover:text-text-primary hover:bg-bg-surface'}
                  `}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="hidden sm:inline">{tab.label.split(' ').slice(1).join(' ')}</span>
                  <span className="sm:hidden">{tab.label.split(' ').slice(1, 2).join('')}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Container */}
        <main className="flex-grow mx-auto max-w-4xl w-full px-4 sm:px-6 py-6 sm:py-10 flex flex-col">
          {/* Hero/Intro Section */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {topic.difficulty && (
                <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${getDifficultyColor(topic.difficulty)}`}>
                  {topic.difficulty}
                </span>
              )}
              {topic.estimatedMinutes && (
                <span className="flex items-center gap-1.5 text-xs text-text-secondary font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  {topic.estimatedMinutes} min read
                </span>
              )}
            </div>

            <h1 className="mb-4 text-3xl sm:text-4xl font-display font-bold tracking-tight bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">
              {topic.title}
            </h1>
            
            {/* Concept at a Glance Summary Card */}
            <div className="p-5 bg-bg-surface/30 border border-border rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent-teal to-accent-purple" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-2">Concept at a Glance</h3>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                {topic.description}
              </p>
            </div>
          </div>

          {/* Main Tab Content */}
          <div className="flex-grow py-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-12"
              >
                {/* 1. LEARN TAB */}
                {activeTab === 'learn' && (
                  <div className="space-y-16">
                    {/* What is it */}
                    {topic.sections.what && (
                      <div className="space-y-6">
                        <h2 className="text-xl sm:text-2xl font-display font-bold text-text-primary flex items-center gap-2">
                          <span className="w-6 h-6 rounded bg-accent-teal/15 text-accent-teal flex items-center justify-center text-xs font-mono">1</span>
                          What is this?
                        </h2>
                        <ContentSection title="What is this?">
                          <div className="space-y-4 text-base">
                            {(isELI5 ? topic.sections.what.eli5 : topic.sections.what.text)?.split('\n\n').map((paragraph: string, idx: number) => (
                              <p key={idx} className="leading-relaxed">{paragraph}</p>
                            ))}
                          </div>
                          {topic.sections.what.points && <KeyPoints points={topic.sections.what.points} />}
                        </ContentSection>
                      </div>
                    )}

                    {/* Why does it exist */}
                    {topic.sections.why && (
                      <div className="space-y-6">
                        <h2 className="text-xl sm:text-2xl font-display font-bold text-text-primary flex items-center gap-2">
                          <span className="w-6 h-6 rounded bg-accent-teal/15 text-accent-teal flex items-center justify-center text-xs font-mono">2</span>
                          Why does it exist?
                        </h2>
                        <ContentSection title="Why does it exist?">
                          <div className="space-y-4 text-base">
                            {topic.sections.why.text?.split('\n\n').map((paragraph: string, idx: number) => (
                              <p key={idx} className="leading-relaxed">{paragraph}</p>
                            ))}
                          </div>
                          {topic.sections.why.tip && <ProTip>{topic.sections.why.tip}</ProTip>}
                        </ContentSection>
                      </div>
                    )}

                    {/* Pro Tips / Warning custom sections (if in data keys) */}
                    {topic.sections.proTip && (
                      <div className="space-y-4">
                        <ProTip>{topic.sections.proTip.text}</ProTip>
                      </div>
                    )}

                    {topic.sections.warning && (
                      <div className="space-y-4">
                        <Warning>{topic.sections.warning.text}</Warning>
                      </div>
                    )}

                    {/* Visual Flow Diagram */}
                    {topic.sections.diagram?.chart && (
                      <div className="space-y-6">
                        <h2 className="text-xl sm:text-2xl font-display font-bold text-text-primary flex items-center gap-2">
                          <span className="w-6 h-6 rounded bg-accent-teal/15 text-accent-teal flex items-center justify-center text-xs font-mono">3</span>
                          Visual Flow Diagram
                        </h2>
                        <MermaidDiagram chart={topic.sections.diagram.chart} />
                      </div>
                    )}

                    {/* Components Breakdown */}
                    {topic.sections.breakdown?.components && (
                      <div className="space-y-6">
                        <h2 className="text-xl sm:text-2xl font-display font-bold text-text-primary flex items-center gap-2">
                          <span className="w-6 h-6 rounded bg-accent-teal/15 text-accent-teal flex items-center justify-center text-xs font-mono">4</span>
                          Key Components
                        </h2>
                        <ComponentsBreakdown items={topic.sections.breakdown.components} />
                      </div>
                    )}
                  </div>
                )}

                {/* 2. INTERACTIVE LAB TAB */}
                {activeTab === 'lab' && topic.sections.code && (
                  <div className="space-y-8">
                    <h2 className="text-xl sm:text-2xl font-display font-bold text-text-primary flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-accent-teal/15 text-accent-teal flex items-center justify-center text-xs font-mono">⚡</span>
                      Interactive Code Lab
                    </h2>
                    <div className="space-y-8">
                      {subjectSlug === 'sql' ? (
                        <>
                          <SqlEditor 
                            initialQuery={topic.sections.code.code || ''} 
                            breakdown={topic.sections.code.breakdown}
                            hint={topic.sections.code.hint || topic.sections.why?.tip}
                          />
                        </>
                      ) : (
                        <InteractiveEditor 
                          initialCode={topic.sections.code.code || ''} 
                          breakdown={topic.sections.code.breakdown}
                          hint={topic.sections.code.hint || topic.sections.why?.tip}
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* 3. EXAM & INTERVIEW TAB */}
                {activeTab === 'prep' && (
                  <div className="space-y-12">
                    {/* Exam Notes */}
                    {topic.sections.examNotes?.examNotes && (
                      <div>
                        <ExamNotes notes={topic.sections.examNotes.examNotes} />
                      </div>
                    )}

                    {/* Real World Applications */}
                    {topic.sections.realWorld?.realWorld && (
                      <div>
                        <RealWorldSection items={topic.sections.realWorld.realWorld} />
                      </div>
                    )}

                    {/* Interview Questions */}
                    {topic.interviewQuestions && topic.interviewQuestions.length > 0 && (
                      <div className="space-y-6">
                        <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
                          <span className="w-6 h-6 rounded bg-accent-purple/15 text-accent-purple flex items-center justify-center text-xs font-mono">❓</span>
                          Interview Prep Q&A
                        </h3>
                        <div className="space-y-6">
                          {topic.interviewQuestions.map((q, i) => (
                            <InterviewQuestionCard key={i} {...q} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 4. PRACTICE QUIZ TAB */}
                {activeTab === 'quiz' && topic.sections.quiz?.quiz && (
                  <div className="space-y-6">
                    <h2 className="text-xl sm:text-2xl font-display font-bold text-text-primary flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-accent-teal/15 text-accent-teal flex items-center justify-center text-xs font-mono">🧠</span>
                      Topic Quiz
                    </h2>
                    <QuizSection questions={topic.sections.quiz.quiz} />
                  </div>
                )}

                {/* Topic Completed / Mark Complete Button (shows in all tabs except maybe Quiz where they finish quiz) */}
                <div className="pt-10 border-t border-border/40 mt-12 space-y-12">
                  <MarkCompleteButton 
                    topicId={topic.id}
                    nextTopicHref={nextTopic ? `/learn/${subjectSlug}/${nextTopic.slug}` : undefined}
                    nextTopicTitle={nextTopic?.title}
                  />
                  <TopicNotes />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer Navigation */}
          <footer className="mt-auto pt-8 border-t border-border flex items-center justify-between gap-4">
            <button 
              onClick={() => prevTopic && router.push(`/learn/${subjectSlug}/${prevTopic.slug}`)}
              disabled={!prevTopic}
              className={`
                flex items-center gap-3 px-6 py-3 rounded-xl border border-border font-bold transition-all cursor-pointer
                ${!prevTopic ? 'opacity-30 cursor-not-allowed' : 'hover:bg-bg-surface hover:border-accent-teal'}
              `}
            >
              <ChevronLeft className="w-5 h-5" />
              <div className="text-left hidden sm:block">
                <div className="text-[10px] uppercase tracking-widest text-text-secondary">Previous</div>
                <div className="text-sm truncate max-w-[150px]">{prevTopic?.title}</div>
              </div>
            </button>

            <button 
              onClick={() => nextTopic && router.push(`/learn/${subjectSlug}/${nextTopic.slug}`)}
              disabled={!nextTopic}
              className={`
                flex items-center gap-3 px-6 py-3 rounded-xl border border-border font-bold transition-all cursor-pointer
                ${!nextTopic ? 'opacity-30 cursor-not-allowed' : 'hover:bg-bg-surface hover:border-accent-teal'}
              `}
            >
              <div className="text-right hidden sm:block">
                <div className="text-[10px] uppercase tracking-widest text-text-secondary">Next</div>
                <div className="text-sm truncate max-w-[150px]">{nextTopic?.title}</div>
              </div>
              <ChevronRight className="w-5 h-5" />
            </button>
          </footer>
        </main>
      </div>
    </div>
  );
}

