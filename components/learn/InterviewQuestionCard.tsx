'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BrainCircuit, ExternalLink } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

interface InterviewQuestionCardProps {
  question: string;
  answer: string;
  difficulty: 'Fresher' | 'Mid' | 'Senior';
  category: 'Conceptual' | 'Scenario' | 'Coding' | 'Trap';
}

export const InterviewQuestionCard: React.FC<InterviewQuestionCardProps> = ({ 
  question, 
  answer, 
  difficulty, 
  category 
}) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const difficultyColor = 
    difficulty === 'Fresher' ? 'teal' : 
    difficulty === 'Mid' ? 'amber' : 'red';

  return (
    <Card className="overflow-hidden border-border/50 hover:border-accent-teal transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-accent-teal/10 text-accent-teal">
            <BrainCircuit className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Interview Question</span>
        </div>
        <div className="flex gap-2">
          <Badge variant={difficultyColor as any}>{difficulty}</Badge>
          <Badge variant="gray">{category}</Badge>
        </div>
      </div>

      <h4 className="text-lg font-bold mb-6 leading-tight">
        {question}
      </h4>

      <div className="space-y-4">
        <button 
          onClick={() => setIsRevealed(!isRevealed)}
          className={`
            w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all
            ${isRevealed ? 'bg-bg-elevated text-text-primary' : 'bg-accent-teal text-bg-primary hover:bg-accent-teal/90'}
          `}
        >
          <span>{isRevealed ? 'Hide Answer' : 'Reveal Recommended Answer'}</span>
          {isRevealed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {isRevealed && (
          <div className="p-6 bg-bg-elevated border border-border rounded-xl animate-fade-in">
            <div className="prose prose-invert prose-sm max-w-none text-text-secondary leading-relaxed">
              {answer}
            </div>
            <div className="mt-6 pt-4 border-t border-border/50 flex justify-end">
              <button className="text-[10px] font-bold uppercase tracking-widest text-accent-teal flex items-center gap-2 hover:underline">
                Read full concept <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
