'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle, ArrowRight, PartyPopper } from 'lucide-react';
import { Button } from '../ui/Button';
import { CosmicButton } from '../ui/CosmicButton';
import { useProgressStore } from '@/lib/store/useProgressStore';
import { useUserStore } from '@/lib/store/useUserStore';
import { saveTopicCompletion } from '@/lib/firebase/db';
import { useAchievementStore } from '@/lib/store/useAchievementStore';
import { getAllSubjects } from '@/lib/content';

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
  const { unlockAchievement } = useAchievementStore();
  const { user } = useUserStore();
  const isCompleted = completedTopics.includes(topicId);
  const [justCompleted, setJustCompleted] = useState(false);

  const handleComplete = async () => {
    if (isCompleted) return;
    
    completeTopic(topicId);
    setJustCompleted(true);

    // ── Unlock Achievements ───────────────────────────────────────────────
    // 1. First topic completed (Genesis)
    unlockAchievement('genesis');

    // 2. 15+ topics completed (Polymath)
    if (completedTopics.length + 1 >= 15) {
      unlockAchievement('polymath');
    }

    // 3. Subject mastery checks
    const allSubjects = getAllSubjects();
    const currentSubject = allSubjects.find(s => s.topics.some(t => t.id === topicId));
    if (currentSubject) {
      const otherSubjectTopics = currentSubject.topics.filter(t => t.id !== topicId);
      const allOthersCompleted = otherSubjectTopics.every(t => completedTopics.includes(t.id));
      if (allOthersCompleted) {
        if (currentSubject.id === 'sql') {
          unlockAchievement('sql_commander');
        } else if (currentSubject.id === 'python') {
          unlockAchievement('pythonic');
        }
      }

      // 4. Mastered first AI/ML topic (AI Vanguard)
      const aiSubjectIds = ['ml', 'dl', 'genai', 'agentic'];
      if (aiSubjectIds.includes(currentSubject.id)) {
        unlockAchievement('ai_vanguard');
      }
    }

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
        <CosmicButton 
          size="lg" 
          className="w-full"
          onClick={handleComplete}
          icon={<CheckCircle className="w-6 h-6 text-[#38bdf8]" />}
        >
          Mark Topic as Complete
        </CosmicButton>
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
              <CosmicButton 
                size="lg" 
                className="w-full"
                icon={<ArrowRight className="w-5 h-5 text-[#38bdf8]" />}
              >
                Up Next: {nextTopicTitle}
              </CosmicButton>
            </a>
          )}
        </div>
      )}
    </div>
  );
};
