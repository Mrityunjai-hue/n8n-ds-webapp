'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CheckCircle2, Circle, ChevronLeft } from 'lucide-react';
import { ProgressBar } from '../ui/ProgressBar';

interface TopicSidebarProps {
  subjectName: string;
  subjectSlug: string;
  topics: { id: string; title: string; slug: string; isCompleted: boolean }[];
  currentTopicId: string;
}

export const TopicSidebar: React.FC<TopicSidebarProps> = ({ 
  subjectName, 
  subjectSlug,
  topics, 
  currentTopicId 
}) => {
  const completedCount = topics.filter(t => t.isCompleted).length;
  const currentProgress = topics.length > 0 ? Math.round((completedCount / topics.length) * 100) : 0;

  return (
    <div className="flex flex-col h-full p-6">
      <Link href="/roadmap" className="flex items-center gap-2 text-xs font-bold text-text-secondary hover:text-accent-teal transition-colors mb-8">
        <ChevronLeft className="w-4 h-4" />
        Back to Roadmap
      </Link>

      <div className="mb-8">
        <h2 className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-4">{subjectName}</h2>
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-bold uppercase">
            <span>Progress</span>
            <span className="text-accent-teal">{currentProgress}%</span>
          </div>
          <ProgressBar progress={currentProgress} />
        </div>
      </div>

      <nav className="flex-grow overflow-y-auto no-scrollbar space-y-1">
        {topics.map((topic) => {
          const isActive = topic.id === currentTopicId;
          const isCompleted = topic.isCompleted;

          return (
            <Link
              key={topic.id}
              href={`/learn/${subjectSlug}/${topic.slug}`}
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
  );
};
