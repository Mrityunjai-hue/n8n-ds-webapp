'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { TopicSidebar } from '@/components/learn/TopicSidebar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { sections, mockTopics } from '@/lib/mock-data';
import { ChevronLeft, ChevronRight, Menu, LayoutPanelLeft, Star, Info } from 'lucide-react';
import { InteractiveEditor } from '@/components/learn/InteractiveEditor';
import { SqlEditor } from '@/components/learn/SqlEditor';
import { LineByLineBreakdown } from '@/components/learn/LineByLineBreakdown';
import { MermaidDiagram } from '@/components/learn/MermaidDiagram';
import { InterviewQuestionCard } from '@/components/learn/InterviewQuestionCard';
import { MarkCompleteButton } from '@/components/learn/MarkCompleteButton';
import { ELI5Toggle } from '@/components/learn/ELI5Toggle';
import { TopicNotes } from '@/components/learn/TopicNotes';
import { ContentSection, ProTip, Warning, KeyPoints } from '@/components/learn/LessonContent';

export default function TopicPage() {
  const params = useParams();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isELI5, setIsELI5] = useState(false);
  
  const currentSubject = params.subject as string;
  const currentTopicSlug = params.topic as string;
  
  const currentTopicIndex = mockTopics.findIndex(t => t.slug === currentTopicSlug);
  const currentTopic = mockTopics[currentTopicIndex] || mockTopics[0];

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'n') {
        const next = mockTopics[currentTopicIndex + 1];
        if (next) router.push(`/learn/${currentSubject}/${next.slug}`);
      } else if (e.key.toLowerCase() === 'p') {
        const prev = mockTopics[currentTopicIndex - 1];
        if (prev) router.push(`/learn/${currentSubject}/${prev.slug}`);
      } else if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        setSidebarOpen(!sidebarOpen);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentTopicIndex, currentSubject, router, sidebarOpen]);

  return (
    <div className="flex min-h-screen bg-bg-primary">
      <TopicSidebar 
        subjectName={currentSubject.toUpperCase()} 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
      />

      <main className={`
        flex-grow transition-all duration-300 min-w-0
        ${sidebarOpen ? 'lg:pl-72' : 'pl-0'}
      `}>
        {/* Topic Header / Breadcrumbs */}
        <div className="sticky top-20 z-20 bg-bg-primary/80 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-bg-surface rounded-lg text-text-secondary lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 hover:bg-bg-surface rounded-lg text-text-secondary hidden lg:block ${!sidebarOpen ? 'bg-bg-surface text-accent-teal' : ''}`}
              title="Toggle Sidebar (Ctrl+/)"
            >
              <LayoutPanelLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs font-bold text-text-secondary">
              <span className="uppercase tracking-widest">{currentSubject}</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-text-primary">{currentTopic.title}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ELI5Toggle isELI5={isELI5} setIsELI5={setIsELI5} />
            <button className="p-2 hover:bg-bg-surface rounded-lg text-text-secondary">
              <Star className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-4xl mx-auto px-6 py-12 lg:py-20">
          <h1 className="text-4xl lg:text-6xl font-display font-bold mb-12">
            {currentTopic.title}
          </h1>

          <div className="space-y-24">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-40">
                <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-bg-surface border border-border flex items-center justify-center text-sm text-accent-teal font-mono">
                    {section.id === 'diagram' ? '4' : section.id === 'code' ? '6' : section.title.split('.')[0]}
                  </span>
                  {section.title.split('. ')[1] || section.title}
                </h2>
                
                {/* Section Rendering Logic */}
                {section.id === 'what' && (
                  <ContentSection title={section.title}>
                    <p>
                      {isELI5 
                        ? "Imagine you have a huge box of LEGOs. You need a special way to ask for exactly the blue bricks. That's what this is!"
                        : "SQL (Structured Query Language) is the standard language for managing and manipulating databases. It allows you to retrieve, insert, update, and delete data with precision."}
                    </p>
                    <KeyPoints points={[
                      "Declarative language structure",
                      "Industry standard for 40+ years",
                      "Foundation for all data science work"
                    ]} />
                  </ContentSection>
                )}

                {section.id === 'why' && (
                  <ContentSection title={section.title}>
                    <p>
                      In modern data environments, data is rarely stored in simple files. It lives in complex relational systems that require a high-performance way to filter millions of rows in milliseconds.
                    </p>
                    <ProTip>
                      Always think about performance. A poorly written query can slow down an entire application!
                    </ProTip>
                  </ContentSection>
                )}

                {section.id === 'diagram' && (
                  <MermaidDiagram 
                    chart={currentSubject === 'sql' 
                      ? `graph TD\n  A[Client App] -->|SELECT| B(SQL Database)\n  B -->|Result Set| C{Data Filter}\n  C -->|Matched| D[User View]\n  C -->|Unmatched| E[Empty State]`
                      : `graph LR\n  A[Input Data] --> B(Process)\n  B --> C{Decision}\n  C -->|Yes| D[Result A]\n  C -->|No| E[Result B]`
                    } 
                  />
                )}

                {section.id === 'code' && (
                  <div className="space-y-8">
                    {currentSubject === 'sql' ? (
                      <>
                        <SqlEditor 
                          initialQuery={`SELECT * FROM sales\nWHERE amount > 600\nORDER BY date DESC;`} 
                        />
                        <LineByLineBreakdown 
                          items={[
                            { line: 'SELECT * FROM sales', explanation: 'This fetches all columns from the sales table.' },
                            { line: 'WHERE amount > 600', explanation: 'Filters the results to only show products more expensive than $600.' },
                          ]}
                        />
                      </>
                    ) : (
                      <>
                        <InteractiveEditor 
                          initialCode={`# Python Basics\nname = "N8N Community"\nprint(f"Hello from {name}!")\n\n# Try changing the code and clicking Run!`} 
                        />
                        <LineByLineBreakdown 
                          items={[
                            { line: 'name = "N8N Community"', explanation: 'We define a variable called "name" and assign it a string value.' },
                            { line: 'print(f"Hello from {name}!")', explanation: 'We use an f-string to print a greeting that includes our variable.' },
                          ]}
                        />
                      </>
                    )}
                  </div>
                )}

                {section.id === 'mistakes' && (
                  <Warning>
                    Don't forget the semicolon at the end of your queries, and always double-check your table names for typos!
                  </Warning>
                )}

                {section.id === 'interview' && (
                  <div className="space-y-6">
                    <InterviewQuestionCard 
                      question="What is the difference between WHERE and HAVING in SQL?"
                      answer="WHERE is used to filter rows before any groupings are made, while HAVING is used to filter groups after the GROUP BY clause has been applied."
                      difficulty="Mid"
                      category="Conceptual"
                    />
                    <InterviewQuestionCard 
                      question="How do you handle NULL values in a SELECT statement?"
                      answer="You can use the IS NULL or IS NOT NULL operators, or functions like COALESCE to provide a default value."
                      difficulty="Fresher"
                      category="Scenario"
                    />
                  </div>
                )}

                {section.id === 'complete' && (
                  <MarkCompleteButton 
                    topicId={currentTopic.id}
                    nextTopicHref={mockTopics[currentTopicIndex + 1]?.slug ? `/learn/${currentSubject}/${mockTopics[currentTopicIndex + 1].slug}` : undefined}
                    nextTopicTitle={mockTopics[currentTopicIndex + 1]?.title}
                  />
                )}

                {section.id === 'notes' && (
                  <TopicNotes />
                )}

                {/* Default placeholder for other sections */}
                {!['what', 'why', 'diagram', 'code', 'mistakes', 'interview', 'complete', 'notes'].includes(section.id) && (
                  <div className="p-8 bg-bg-surface border border-border rounded-modal border-dashed flex flex-col items-center justify-center text-center group hover:border-accent-teal transition-colors">
                    <div className="w-12 h-12 rounded-full bg-bg-primary border border-border flex items-center justify-center text-text-secondary mb-4 group-hover:text-accent-teal transition-colors">
                      <Info className="w-6 h-6" />
                    </div>
                    <p className="text-text-secondary italic">
                      [Placeholder for {section.title.split('. ')[1] || section.title} content]
                    </p>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-32 pt-12 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="w-full sm:w-auto">
              {currentTopicIndex > 0 && (
                <Link href={`/learn/${currentSubject}/${mockTopics[currentTopicIndex - 1].slug}`}>
                  <button className="group flex flex-col items-start gap-1 p-4 rounded-xl border border-border hover:border-accent-teal transition-all w-full sm:w-64">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary flex items-center gap-1">
                      <ChevronLeft className="w-3 h-3" /> Previous
                    </span>
                    <span className="font-bold text-sm truncate w-full text-left">{mockTopics[currentTopicIndex - 1].title}</span>
                  </button>
                </Link>
              )}
            </div>

            <div className="w-full sm:w-auto">
              {currentTopicIndex < mockTopics.length - 1 && (
                <Link href={`/learn/${currentSubject}/${mockTopics[currentTopicIndex + 1].slug}`}>
                  <button className="group flex flex-col items-end gap-1 p-4 rounded-xl border border-border hover:border-accent-teal transition-all w-full sm:w-64 text-right">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary flex items-center gap-1">
                      Next <ChevronRight className="w-3 h-3" />
                    </span>
                    <span className="font-bold text-sm truncate w-full">{mockTopics[currentTopicIndex + 1].title}</span>
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Simple Link helper for internal pagination
function Link({ href, children }: { href: string, children: React.ReactNode }) {
  return <a href={href} className="w-full sm:w-auto block">{children}</a>;
}
