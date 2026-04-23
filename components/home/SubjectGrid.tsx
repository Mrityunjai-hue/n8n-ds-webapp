'use client';

import React from 'react';
import { subjects } from '@/lib/subjects';
import { SubjectCard } from './SubjectCard';

export const SubjectGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {subjects.map((subject, index) => {
        // Mock progress for demonstration
        let progress = 0;
        if (index === 0) progress = 100;
        if (index === 1) progress = 100;
        if (index === 2) progress = 45;

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
