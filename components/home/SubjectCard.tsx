'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, BookOpen, ChevronRight } from 'lucide-react';
import { SubjectContent } from '@/lib/types/content';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { Button } from '../ui/Button';

interface SubjectCardProps {
  subject: SubjectContent;
  progress?: number;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({ subject, progress = 0 }) => {
  const Icon = subject.icon as any;

  return (
    <Card className="flex flex-col h-full group">
      <div className="flex items-start justify-between mb-6">
        <div className="p-3 rounded-2xl bg-bg-primary border border-border text-accent-teal group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6" />
        </div>
        <div className="text-[10px] font-bold uppercase tracking-widest text-text-secondary bg-bg-elevated px-2 py-1 rounded">
          Level {subject.level}
        </div>
      </div>

      <h3 className="text-xl font-display font-bold mb-2 group-hover:text-accent-teal transition-colors">
        {subject.name}
      </h3>
      
      <p className="text-sm text-text-secondary mb-6 line-clamp-2 flex-grow">
        {subject.description}
      </p>

      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-tighter">
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-text-secondary" />
              <span>{subject.topics.length} Topics</span>
            </div>
          <div className="flex items-center gap-2 text-text-secondary">
            <Clock className="w-4 h-4" />
            {subject.estimatedHours}h
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
            <span className="text-text-secondary">Progress</span>
            <span className={progress > 0 ? 'text-accent-teal' : 'text-text-secondary'}>
              {progress}%
            </span>
          </div>
          <ProgressBar progress={progress} />
        </div>
      </div>

      <Link href={`/learn/${subject.slug}`} className="w-full">
        <Button variant={progress > 0 ? 'secondary' : 'primary'} className="w-full gap-2 group/btn">
          {progress > 0 ? 'Continue' : 'Start Learning'}
          <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </Link>
    </Card>
  );
};
