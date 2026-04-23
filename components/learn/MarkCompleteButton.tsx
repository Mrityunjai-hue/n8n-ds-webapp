'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle, ArrowRight, PartyPopper } from 'lucide-react';
import { Button } from '../ui/Button';
import { useProgressStore } from '@/lib/store/useProgressStore';
import { useUserStore } from '@/lib/store/useUserStore';
import { saveTopicCompletion } from '@/lib/firebase/db';

interface MarkCompleteButtonProps {
  topicId: string;
  nextTopicHref?: string;
  nextTopicTitle?: string;
}

export const MarkCompleteButton: React.FC<MarkCompleteButtonProps> = ({ 
  topicId, 
  nextTopicHref,
  nextTopicTitle 
}) => {
  const { completedTopics, completeTopic } = useProgressStore();
  const { user } = useUserStore();
  const isCompleted = completedTopics.includes(topicId);
  const [justCompleted, setJustCompleted] = useState(false);

  const handleComplete = async () => {
    if (isCompleted) return;
    
    completeTopic(topicId);
    setJustCompleted(true);

    if (user) {
      await saveTopicCompletion(user.uid, topicId, true);
    }
    
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2DD4BF', '#FACC15', '#F8FAFC']
    });
  };

  return (
    <div className="w-full">
      {!isCompleted ? (
        <Button 
          size="lg" 
          className="w-full py-8 text-xl gap-4 group"
          onClick={handleComplete}
        >
          <CheckCircle className="w-6 h-6 group-hover:scale-125 transition-transform" />
          Mark Topic as Complete
        </Button>
      ) : (
        <div className="space-y-6 animate-scale-up">
          <div className="p-8 bg-accent-teal/10 border border-accent-teal/20 rounded-modal text-center">
            <div className="w-16 h-16 rounded-full bg-accent-teal flex items-center justify-center mx-auto mb-6 text-bg-primary">
              <PartyPopper className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-display font-bold text-accent-teal mb-2">Great Job!</h3>
            <p className="text-text-secondary">You've mastered this topic. Keep the momentum going!</p>
          </div>

          {nextTopicHref && (
            <a href={nextTopicHref} className="block w-full">
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-full py-6 text-lg gap-4 group hover:border-accent-teal"
              >
                <span>Up Next: <span className="text-text-primary">{nextTopicTitle}</span></span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Button>
            </a>
          )}
        </div>
      )}
    </div>
  );
};
