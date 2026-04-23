'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter, notFound } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  Star, 
  Info 
} from 'lucide-react';
import { InteractiveEditor } from '@/components/learn/InteractiveEditor';
import { SqlEditor } from '@/components/learn/SqlEditor';
import { LineByLineBreakdown } from '@/components/learn/LineByLineBreakdown';
import { MermaidDiagram } from '@/components/learn/MermaidDiagram';
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

// Standard 11-section lesson structure
const LESSON_SECTIONS = [
  { id: 'what', title: '1. What is this?' },
  { id: 'why', title: '2. Why does it exist?' },
  { id: 'how', title: '3. How it works?' },
  { id: 'diagram', title: '4. Visual Flow Diagram' },
  { id: 'breakdown', title: '5. Components Breakdown' },
  { id: 'code', title: '6. Interactive Lab' },
  { id: 'mistakes', title: '7. Common Mistakes' },
  { id: 'interview', title: '8. Interview Questions' },
  { id: 'summary', title: '9. Quick Summary' },
  { id: 'complete', title: '10. Mark Complete' },
  { id: 'notes', title: '11. Personal Notes' },
];

export default function TopicPage() {
  const params = useParams();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isELI5, setIsELI5] = useState(false);
  
  const subjectSlug = params.subject as string;
  const topicSlug = params.topic as string;

  const { setLastTopic } = useRecentStore();
  
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

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-bg-primary text-text-primary">
      {/* Sidebar - Desktop */}
      <div className={`
        fixed inset-y-16 left-0 z-40 w-72 transform border-r border-border bg-bg-primary transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:hidden'}
      `}>
        <TopicSidebar 
          subjectName={subject.name} 
          topics={subject.topics.map(t => ({ id: t.id, title: t.title, slug: t.slug, isCompleted: false }))} 
          currentTopicId={topic.id}
          subjectSlug={subjectSlug}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-grow">
        {/* Sticky Header */}
        <header className="sticky top-16 z-30 border-b border-border bg-bg-primary/80 backdrop-blur-md">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-bg-surface rounded-lg text-text-secondary lg:hidden"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-secondary">
                <span>{subject.name}</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-text-primary">{topic.title}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ELI5Toggle isELI5={isELI5} setIsELI5={setIsELI5} />
              <BookmarkButton topicId={topic.id} />
            </div>
          </div>
        </header>

        {/* Content Container */}
        <main className="mx-auto max-w-4xl px-6 py-12">
          {/* Hero/Intro Section */}
          <div className="mb-20">
            <h1 className="mb-4 text-4xl lg:text-5xl font-display font-bold tracking-tight bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">
              {topic.title}
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed max-w-2xl">
              {topic.description}
            </p>
          </div>

          <div className="space-y-24">
            {LESSON_SECTIONS.map((section) => {
              const content = topic.sections[section.id];
              
              return (
                <section key={section.id} id={section.id} className="scroll-mt-40">
                  <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-bg-surface border border-border flex items-center justify-center text-sm text-accent-teal font-mono">
                      {section.title.split('.')[0]}
                    </span>
                    {section.title.split('. ')[1]}
                  </h2>
                  
                  {/* Section Rendering Logic */}
                  {section.id === 'what' && content && (
                    <ContentSection title={section.title}>
                      <p>
                        {isELI5 ? content.eli5 : content.text}
                      </p>
                      {content.points && <KeyPoints points={content.points} />}
                    </ContentSection>
                  )}

                  {section.id === 'why' && content && (
                    <ContentSection title={section.title}>
                      <p>{content.text}</p>
                      {content.tip && <ProTip>{content.tip}</ProTip>}
                    </ContentSection>
                  )}

                  {section.id === 'components' && content?.components && (
                    <ComponentsBreakdown items={content.components} />
                  )}

                  {section.id === 'diagram' && content?.chart && (
                    <MermaidDiagram chart={content.chart} />
                  )}

                  {section.id === 'code' && content && (
                    <div className="space-y-8">
                      {subjectSlug === 'sql' ? (
                        <SqlEditor initialQuery={content.code || ''} />
                      ) : (
                        <InteractiveEditor initialCode={content.code || ''} />
                      )}
                      {content.breakdown && <LineByLineBreakdown items={content.breakdown} />}
                    </div>
                  )}

                  {section.id === 'mistakes' && content?.warning && (
                    <Warning>{content.warning}</Warning>
                  )}

                  {section.id === 'interview' && (
                    <div className="space-y-6">
                      {topic.interviewQuestions.map((q, i) => (
                        <InterviewQuestionCard key={i} {...q} />
                      ))}
                    </div>
                  )}

                  {section.id === 'complete' && (
                    <MarkCompleteButton 
                      topicId={topic.id}
                      nextTopicHref={nextTopic ? `/learn/${subjectSlug}/${nextTopic.slug}` : undefined}
                      nextTopicTitle={nextTopic?.title}
                    />
                  )}

                  {section.id === 'notes' && (
                    <TopicNotes />
                  )}

                  {/* Placeholder for missing content in sections */}
                  {!content && !['interview', 'complete', 'notes'].includes(section.id) && (
                    <div className="p-8 bg-bg-surface border border-border rounded-modal border-dashed flex flex-col items-center justify-center text-center group hover:border-accent-teal transition-colors">
                      <div className="w-12 h-12 rounded-full bg-bg-primary border border-border flex items-center justify-center text-text-secondary mb-4 group-hover:text-accent-teal transition-colors">
                        <Info className="w-6 h-6" />
                      </div>
                      <p className="text-text-secondary italic">
                        Visualizing data for this section... Stay tuned.
                      </p>
                    </div>
                  )}
                </section>
              );
            })}
          </div>

          {/* Footer Navigation */}
          <footer className="mt-32 pt-8 border-t border-border flex items-center justify-between gap-4">
            <button 
              onClick={() => prevTopic && router.push(`/learn/${subjectSlug}/${prevTopic.slug}`)}
              disabled={!prevTopic}
              className={`
                flex items-center gap-3 px-6 py-3 rounded-xl border border-border font-bold transition-all
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
                flex items-center gap-3 px-6 py-3 rounded-xl border border-border font-bold transition-all
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
