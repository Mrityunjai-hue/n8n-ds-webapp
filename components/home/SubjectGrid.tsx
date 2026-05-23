'use client';

import React from 'react';
import { subjects } from '@/lib/content/subjects';
import { SubjectCard } from './SubjectCard';
import { useProgressStore } from '@/lib/store/useProgressStore';

export const SubjectGrid = () => {
  const { completedTopics } = useProgressStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {subjects.map((subject) => {
        const subjectTopics = subject.topics || [];
        const subjectCompleted = subjectTopics.filter(t => completedTopics.includes(t.id)).length;
        const progress = subjectTopics.length > 0 ? Math.round((subjectCompleted / subjectTopics.length) * 100) : 0;

        return (
          <SubjectCard 
            key={subject.id} 
            subject={subject} 
            progress={progress}
          />
        );
      })}
    </div>
  );
};
