'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { subjects } from '@/lib/content/subjects';
import { SubjectContent } from '@/lib/types/content';

interface RoadmapNodeProps {
  subject: SubjectContent;
  status: 'not-started' | 'in-progress' | 'completed';
  isLast?: boolean;
}

const RoadmapNode: React.FC<RoadmapNodeProps> = ({ subject, status, isLast }) => {
  const Icon = subject.icon as any;

  const statusColors = {
    'not-started': 'bg-bg-elevated text-text-secondary border-border grayscale opacity-50',
    'in-progress': 'bg-accent-amber/10 text-accent-amber border-accent-amber/50 shadow-[0_0_15px_rgba(245,158,11,0.1)]',
    'completed': 'bg-accent-teal/10 text-accent-teal border-accent-teal/50 shadow-[0_0_15px_rgba(0,201,167,0.1)]',
  };

  const dotColors = {
    'not-started': 'bg-text-secondary',
    'in-progress': 'bg-accent-amber animate-pulse',
    'completed': 'bg-accent-teal',
  };


  return (
    <div className="flex flex-col items-center relative group">
      {/* Subject Node */}
      <Link href={`/learn/${subject.slug}`} className="z-10">
        <div className={`
          w-16 h-16 lg:w-24 lg:h-24 rounded-2xl border-2 flex flex-col items-center justify-center gap-2
          transition-all duration-300 cursor-pointer group-hover:scale-110 group-hover:-translate-y-1
          ${statusColors[status]}
        `}>
          <Icon className="w-6 h-6 lg:w-10 lg:h-10" />
          <span className="text-[10px] lg:text-xs font-bold uppercase tracking-tighter hidden lg:block">
            {subject.name}
          </span>
        </div>
      </Link>

      {/* Label (Desktop) */}
      <div className="mt-4 absolute -bottom-12 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap bg-bg-surface px-3 py-1 rounded-full border border-border text-[10px] font-bold z-20">
        {subject.topics.length} Topics • {subject.estimatedHours}h
      </div>

      {/* Connection Line */}
      {!isLast && (
        <div className="hidden lg:block absolute left-full top-1/2 -translate-y-1/2 w-12 h-[2px] bg-border overflow-hidden">
          <div className={`h-full transition-all duration-500 ${status === 'completed' ? 'w-full bg-accent-teal' : 'w-0'}`} />
        </div>
      )}

      {/* Status Dot */}
      <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-bg-primary z-20 ${dotColors[status]}`} />
    </div>
  );
};

export const RoadmapGraph = () => {
  return (
    <div className="w-full overflow-x-auto pb-20 pt-10 no-scrollbar">
      <div className="container mx-auto px-6 min-w-max">
        <div className="flex items-center justify-between gap-4 lg:gap-12">
          {subjects.map((subject, index) => {
            // Mock status for now
            let status: 'not-started' | 'in-progress' | 'completed' = 'not-started';
            if (index < 2) status = 'completed';
            if (index === 2) status = 'in-progress';

            return (
              <RoadmapNode
                key={subject.id}
                subject={subject}
                status={status}
                isLast={index === subjects.length - 1}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
