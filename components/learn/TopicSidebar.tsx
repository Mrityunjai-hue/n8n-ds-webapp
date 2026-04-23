'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CheckCircle2, Circle, ChevronLeft, LayoutPanelLeft } from 'lucide-react';
import { ProgressBar } from '../ui/ProgressBar';
import { mockTopics } from '@/lib/mock-data';

interface TopicSidebarProps {
  subjectName: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const TopicSidebar: React.FC<TopicSidebarProps> = ({ subjectName, isOpen, setIsOpen }) => {
  const pathname = usePathname();
  const currentProgress = 33; // Mock progress

  return (
    <>
      {/* Sidebar Desktop */}
      <aside className={`
        fixed left-0 top-20 h-[calc(100vh-5rem)] bg-bg-surface border-r border-border transition-all duration-300 z-30
        ${isOpen ? 'w-72' : 'w-0 -translate-x-full lg:translate-x-0 lg:w-0 lg:opacity-0'}
      `}>
        <div className="flex flex-col h-full p-6">
          <Link href="/roadmap" className="flex items-center gap-2 text-xs font-bold text-text-secondary hover:text-accent-teal transition-colors mb-8">
            <ChevronLeft className="w-4 h-4" />
            Back to Roadmap
          </Link>

          <div className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-4">{subjectName}</h2>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase">
                <span>Subject Progress</span>
                <span className="text-accent-teal">{currentProgress}%</span>
              </div>
              <ProgressBar progress={currentProgress} />
            </div>
          </div>

          <nav className="flex-grow overflow-y-auto no-scrollbar space-y-1">
            {mockTopics.map((topic, index) => {
              const isActive = pathname.includes(topic.slug);
              const isCompleted = index < 2; // Mock completion

              return (
                <Link
                  key={topic.id}
                  href={`/learn/sql/${topic.slug}`}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all group
                    ${isActive ? 'bg-accent-teal/10 text-accent-teal font-bold' : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary'}
                  `}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-accent-teal" />
                  ) : (
                    <Circle className={`w-4 h-4 ${isActive ? 'text-accent-teal' : 'text-border group-hover:text-text-secondary'}`} />
                  )}
                  <span className="truncate">{topic.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-bg-primary/60 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
