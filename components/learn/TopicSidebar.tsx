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
      <Link href="/roadmap" className="flex items-center gap-2 text-xs font-bold transition-colors mb-8" style={{ color: 'var(--fg3)' }}
        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--lime)'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--fg3)'}
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Roadmap
      </Link>

      <div className="mb-8">
        <h2 className="text-xs font-bold uppercase tracking-widest mb-4 font-mono" style={{ color: 'var(--fg3)' }}>{subjectName}</h2>
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-bold uppercase">
            <span style={{ color: 'var(--fg3)' }}>Progress</span>
            <span style={{ color: 'var(--lime)' }}>{currentProgress}%</span>
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
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all group"
              style={{
                backgroundColor: isActive ? 'var(--lime-tint)' : 'transparent',
                color: isActive ? 'var(--lime)' : isCompleted ? 'var(--success)' : 'var(--fg3)',
                fontWeight: isActive ? 500 : 400,
                border: isActive ? '1px solid var(--lime-border)' : '1px solid transparent',
              }}
              onMouseEnter={(e) => { 
                if (!isActive) { 
                  e.currentTarget.style.backgroundColor = 'var(--canvas-raised)'; 
                  e.currentTarget.style.color = 'var(--ink-2)'; 
                }
              }}
              onMouseLeave={(e) => { 
                if (!isActive) { 
                  e.currentTarget.style.backgroundColor = 'transparent'; 
                  e.currentTarget.style.color = isCompleted ? 'var(--success)' : 'var(--ink-3)'; 
                }
              }}
            >
              {isCompleted ? (
                <CheckCircle2 className="w-4 h-4" style={{ color: isActive ? 'var(--lime)' : 'var(--success)' }} />
              ) : (
                <Circle className="w-4 h-4" style={{ color: isActive ? 'var(--lime)' : 'var(--fg4)' }} />
              )}
              <span className="truncate">{topic.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
