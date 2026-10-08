'use client';
// Force webpack chunk hash invalidation to clear browser cache

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

const VideoTileGrid = dynamic(
  () => import('@/components/learn/VideoTileGrid'),
  { loading: () => <Skeleton className="h-[200px] w-full rounded-modal" />, ssr: false }
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
import { VideoTile } from '@/components/learn/VideoTile';
import { ContentSection, ProTip, Warning, KeyPoints } from '@/components/learn/LessonContent';
import { ComponentsBreakdown } from '@/components/learn/ComponentsBreakdown';
import { getTopicBySlug } from '@/lib/content';
import { getVideosByTopic } from '@/lib/content/videoLessons';
import { useRecentStore } from '@/lib/store/useRecentStore';
import { StayTuned } from '@/components/learn/StayTuned';

// Import new components
import { QuizSection } from '@/components/learn/QuizSection';
import { ExamNotes } from '@/components/learn/ExamNotes';
import { RealWorldSection } from '@/components/learn/RealWorldSection';
import { ProgressBar } from '@/components/ui/ProgressBar';

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

  const renderLearnContent = () => (
    <div className="space-y-12">
      <div className="space-y-16">
        {/* What is it */}
        {topic.sections.what && (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-text-primary flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-accent-teal/15 text-accent-teal flex items-center justify-center text-xs font-mono">1</span>
              What is this?
            </h2>
            <ContentSection 
              title="What is this?" 
              markdownText={isELI5 ? topic.sections.what.eli5 : topic.sections.what.text}
            />
            {topic.sections.what.points && <KeyPoints points={topic.sections.what.points} />}
          </div>
        )}

        {/* Why does it exist */}
        {topic.sections.why && (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-text-primary flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-accent-teal/15 text-accent-teal flex items-center justify-center text-xs font-mono">2</span>
              Why does it exist?
            </h2>
            <ContentSection 
              title="Why does it exist?"
              markdownText={topic.sections.why.text}
            />
            {topic.sections.why.tip && <ProTip>{topic.sections.why.tip}</ProTip>}
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

        {/* Interactive Video Resources (existing data-driven tiles) */}
        {topic.sections.resources?.videoResources && topic.sections.resources.videoResources.length > 0 && (
          <div className="space-y-6 pt-4">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-text-primary flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-accent-teal/15 text-accent-teal flex items-center justify-center text-xs font-mono">▶</span>
              Video Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topic.sections.resources.videoResources.map((resource, idx) => (
                <VideoTile key={idx} resource={resource} />
              ))}
            </div>
          </div>
        )}

        {/* ── Krish Naik Video Lessons ──────────────────────────── */}
        {(() => {
          const topicVideos = getVideosByTopic(subjectSlug, topicSlug);
          if (!topicVideos) return null;
          return (
            <VideoTileGrid
              videos={topicVideos.videos}
              title="Video Lessons by Krish Naik"
            />
          );
        })()}
      </div>
    </div>
  );

  const renderInteractiveContent = () => (
    <div className="space-y-8 animate-in fade-in duration-300">
      {topic.sections.code && (
        <>
          <div className="h-[600px] xl:h-[700px] w-full relative">
            {subjectSlug === 'sql' ? (
              <SqlEditor 
                initialQuery={topic.sections.code.code || ''} 
                breakdown={topic.sections.code.breakdown}
                hint={topic.sections.code.hint || topic.sections.why?.tip}
              />
            ) : (
              <InteractiveEditor 
                initialCode={topic.sections.code.code || ''} 
                breakdown={topic.sections.code.breakdown}
                hint={topic.sections.code.hint || topic.sections.why?.tip}
              />
            )}
          </div>
        </>
      )}
    </div>
  );

  const renderPrepContent = () => (
    <div className="space-y-12 animate-in fade-in duration-300">
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
  );

  const renderQuizContent = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
      {topic.sections.quiz?.quiz && <QuizSection questions={topic.sections.quiz.quiz} />}
    </div>
  );

  const currentStepIndex = tabs.findIndex(t => t.id === activeTab);
  const currentProgress = tabs.length > 0 ? Math.round(((currentStepIndex) / tabs.length) * 100) : 0;

  const handleContinue = () => {
    if (currentStepIndex < tabs.length - 1) {
      setActiveTab(tabs[currentStepIndex + 1].id);
      window.scrollTo(0, 0);
    } else if (nextTopic) {
      router.push(`/learn/${subjectSlug}/${nextTopic.slug}`);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[var(--canvas)] text-[var(--ink)]">
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <button 
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden w-full h-full cursor-pointer border-none"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar: Shows Steps of the Topic */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-72 transform border-r border-[var(--canvas-border)] bg-[var(--canvas-raised)] transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:hidden'}
      `}>
         <div className="flex flex-col h-full p-6">
            {/* Progress Card */}
            <div className="bg-[var(--canvas-sunken)] border border-[var(--canvas-border)] rounded-xl p-4 mb-6 doodle-card">
               <h3 className="font-bold text-sm mb-2 text-[var(--ink)] font-heading">Your Progress</h3>
               <div className="flex justify-between text-xs text-[var(--ink-3)] mb-2 font-mono">
                 <span>{currentProgress}% complete</span>
                 <span>Step {currentStepIndex + 1} of {tabs.length}</span>
               </div>
               <ProgressBar progress={currentProgress} />
            </div>
            
            {/* Steps */}
            <nav className="flex-grow space-y-1.5">
              {tabs.map((tab, idx) => {
                const isActive = activeTab === tab.id;
                const isCompleted = currentStepIndex > idx;
                const Icon = tab.icon;
                return (
                   <button 
                     key={tab.id}
                     onClick={() => setActiveTab(tab.id)}
                     className={`relative w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm transition-all duration-200 group border
                       ${isActive 
                         ? 'bg-[var(--yellow)] text-[#111111] font-bold border-black/20 shadow-sm' 
                         : 'bg-transparent border-transparent text-[var(--ink-2)] hover:bg-[var(--canvas-sunken)] hover:text-[var(--ink)]'
                       }`}
                   >
                      <div className="relative z-10 flex items-center gap-3 w-full">
                        {isCompleted && !isActive ? (
                          <CheckCircle className="w-4 h-4 shrink-0 text-[var(--green)]" />
                        ) : (
                          <Icon className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isActive ? 'text-[#111111] scale-110' : 'text-[var(--ink-3)] group-hover:scale-110'}`} />
                        )}
                        <span className={`font-medium ${isActive ? 'text-[#111111] font-bold' : 'text-[var(--ink-2)]'}`}>
                          {tab.label.split(' ').slice(1).join(' ')}
                        </span>
                      </div>
                   </button>
                )
              })}
            </nav>

            <div className="mt-auto pt-6 border-t border-[var(--canvas-border)] flex items-center text-xs text-[var(--ink-3)] font-mono">
               <Clock className="w-4 h-4 mr-2" />
               About {topic.estimatedMinutes} min
            </div>
         </div>
      </div>
      
      {/* Main Area */}
      <div className="flex-grow flex flex-col min-w-0 min-h-screen">
         {/* Top bar */}
         <header className="sticky top-0 z-20 bg-[var(--canvas-raised)]/95 backdrop-blur-md px-4 sm:px-6 py-4 flex items-center justify-between border-b border-[var(--canvas-border)]">
            <div className="flex items-center gap-3 text-sm text-[var(--ink-3)]">
               <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden mr-2 p-1 hover:bg-[var(--canvas-sunken)] rounded-lg">
                 <Menu className="w-5 h-5 text-[var(--ink)]" />
               </button>
               <Link href={`/learn/${subjectSlug}`} className="hover:text-[var(--blue)] transition-colors flex items-center font-bold text-[var(--ink-2)]">
                 <ChevronLeft className="w-4 h-4 mr-1" />
                 <span className="hidden sm:inline">Back to Course</span>
               </Link>
               <span className="hidden sm:inline text-[var(--canvas-border)]">|</span>
               <span className="hidden md:inline text-xs font-mono uppercase tracking-widest truncate max-w-[300px]">
                 Courses &gt; {subject.name} &gt; <span className="text-[var(--ink)] font-bold">{topic.title}</span>
               </span>
            </div>
            <div className="flex items-center gap-3">
               <ELI5Toggle isELI5={isELI5} setIsELI5={setIsELI5} />
               <BookmarkButton topicId={topic.id} />
               {nextTopic ? (
                 <Link 
                   href={`/learn/${subjectSlug}/${nextTopic.slug}`}
                   className="hidden sm:flex items-center gap-1 text-sm font-bold text-text-secondary hover:text-text-primary border border-border hover:bg-bg-surface transition-colors px-3 py-1.5 rounded-lg"
                 >
                   Skip Lesson <ChevronRight className="w-4 h-4" /> 
                 </Link>
               ) : (
                 <button 
                   disabled
                   className="hidden sm:flex items-center gap-1 text-sm font-bold text-text-secondary border border-border px-3 py-1.5 rounded-lg opacity-50 cursor-not-allowed"
                 >
                   Skip Lesson <ChevronRight className="w-4 h-4" /> 
                 </button>
               )}
            </div>
         </header>

         <main className="flex-grow w-full max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
            {/* Header Area */}
            <div className="mb-8 space-y-4">
               <div className="flex flex-wrap items-center gap-3">
                 <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-widest rounded-lg bg-bg-surface text-text-secondary border border-border flex items-center gap-1.5">
                   Lesson {currentTopicIndex + 1}
                 </span>
                 {topic.difficulty && (
                   <span className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${getDifficultyColor(topic.difficulty)}`}>
                     {topic.difficulty}
                   </span>
                 )}
               </div>

               <h1 className="text-3xl sm:text-5xl font-display font-bold text-text-primary break-words">
                 {topic.title}
               </h1>
            </div>

            {/* Content Card Wrapper */}
            <div className="bg-bg-surface/20 border border-border rounded-2xl sm:rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl shadow-black/5">
               {/* Decorative Gradient Line */}
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-teal via-accent-purple to-accent-amber" />
               
               {/* Tab Header inside the Card */}
               <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border/50">
                  <div className="w-14 h-14 rounded-2xl bg-bg-surface border border-border text-accent-teal flex items-center justify-center shrink-0 shadow-inner">
                     {React.createElement(tabs.find(t => t.id === activeTab)?.icon || BookOpen, { className: "w-6 h-6" })}
                  </div>
                  <div>
                     <h2 className="text-xl sm:text-2xl font-bold font-display text-text-primary">
                       {tabs.find(t => t.id === activeTab)?.label.split(' ').slice(1).join(' ')}
                     </h2>
                     <p className="text-text-secondary text-sm mt-1">Take your time to understand the concept</p>
                  </div>
               </div>

               {/* Render actual content block based on activeTab */}
               <div className="min-h-[400px]">
                 <AnimatePresence mode="wait">
                   <motion.div
                     key={activeTab}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -10 }}
                     transition={{ duration: 0.2 }}
                   >
                     {activeTab === 'learn' && renderLearnContent()}
                     {activeTab === 'lab' && renderInteractiveContent()}
                     {activeTab === 'prep' && renderPrepContent()}
                     {activeTab === 'quiz' && renderQuizContent()}
                   </motion.div>
                 </AnimatePresence>
               </div>

               {/* Continue Button */}
               <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-sm text-text-secondary">
                    {currentStepIndex < tabs.length - 1 ? 'Ready for the next step?' : 'Great job completing this lesson!'}
                  </p>
                  <motion.button 
                    onClick={handleContinue} 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto relative group overflow-hidden rounded-2xl p-[2px] transition-all shadow-[0_0_30px_rgba(45,212,191,0.1)] hover:shadow-[0_0_50px_rgba(139,92,246,0.2)]"
                  >
                     {/* Spinning comet tail 1 */}
                     <motion.div 
                       className="absolute inset-[-100%] w-[300%] h-[300%] bg-[conic-gradient(from_0deg,transparent_70%,#2dd4bf_100%)]"
                       animate={{ rotate: 360 }}
                       transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                     />
                     {/* Spinning comet tail 2 */}
                     <motion.div 
                       className="absolute inset-[-100%] w-[300%] h-[300%] bg-[conic-gradient(from_180deg,transparent_70%,#a78bfa_100%)]"
                       animate={{ rotate: 360 }}
                       transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                     />
                     
                     {/* Inner core */}
                     <div className="relative flex items-center justify-center gap-3 bg-[#050b14] hover:bg-[#08101f] transition-colors duration-500 text-white font-extrabold py-4 px-10 rounded-2xl w-full h-full">
                       <span className="bg-gradient-to-r from-white to-[#cbd5e1] bg-clip-text text-transparent text-base">
                         {currentStepIndex < tabs.length - 1 ? 'Continue Journey' : 'Complete Topic'}
                       </span> 
                       <motion.div
                         animate={{ x: [0, 6, 0] }}
                         transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                       >
                         <ChevronRight className="w-5 h-5 text-accent-teal" />
                       </motion.div>
                     </div>
                  </motion.button>
               </div>
            </div>

            {/* Topic Complete Action (Only show at the very end of topic) */}
            {currentStepIndex === tabs.length - 1 && (
               <div className="mt-12">
                 <MarkCompleteButton 
                   topicId={topic.id}
                   nextTopicHref={nextTopic ? `/learn/${subjectSlug}/${nextTopic.slug}` : undefined}
                   nextTopicTitle={nextTopic?.title}
                 />
               </div>
            )}

            <div className="flex justify-between items-center mt-12 pt-8 border-t border-border gap-4">
               <Link 
                  href={`/learn/${subjectSlug}`}
                  className="px-6 py-4 rounded-xl border border-border hover:bg-bg-surface hover:border-accent-teal/50 transition-colors flex flex-col items-start gap-1 w-[48%]"
               >
                  <span className="text-[10px] sm:text-xs text-text-secondary uppercase tracking-widest font-bold flex items-center gap-1">
                    <ChevronLeft className="w-3 h-3"/> Back to Course
                  </span>
                  <span className="font-bold text-sm sm:text-base truncate w-full text-left text-text-primary">Course Overview</span>
               </Link>
               
               {nextTopic ? (
                 <Link 
                    href={`/learn/${subjectSlug}/${nextTopic.slug}`}
                    className="px-6 py-4 rounded-xl border border-border transition-colors flex flex-col items-end gap-1 w-[48%] hover:bg-bg-surface hover:border-accent-teal/50"
                 >
                    <span className="text-[10px] sm:text-xs text-text-secondary uppercase tracking-widest font-bold flex items-center gap-1">
                      Next <ChevronRight className="w-3 h-3"/>
                    </span>
                    <span className="font-bold text-sm sm:text-base line-clamp-2 sm:truncate w-full text-right text-text-primary break-words">{nextTopic.title}</span>
                 </Link>
               ) : (
                 <button 
                    disabled
                    className="px-6 py-4 rounded-xl border border-border transition-colors flex flex-col items-end gap-1 w-[48%] opacity-50 cursor-not-allowed"
                 >
                    <span className="text-[10px] sm:text-xs text-text-secondary uppercase tracking-widest font-bold flex items-center gap-1">
                      Next <ChevronRight className="w-3 h-3"/>
                    </span>
                    <span className="font-bold text-sm sm:text-base line-clamp-2 sm:truncate w-full text-right text-text-primary break-words">Course Complete</span>
                 </button>
               )}
            </div>
         </main>
      </div>
    </div>
  );
}
