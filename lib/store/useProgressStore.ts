import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ProgressState {
  completedTopics: string[];
  visitedTopics: string[];
  reviewedQuestions: string[];
  streak: number;
  lastVisit: string | null;
  
  // Actions
  completeTopic: (topicId: string) => void;
  visitTopic: (topicId: string) => void;
  toggleReviewedQuestion: (question: string) => void;
  updateStreak: () => void;
  resetProgress: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedTopics: [],
      visitedTopics: [],
      reviewedQuestions: [],
      streak: 0,
      lastVisit: null,

      completeTopic: (topicId: string) => set((state) => ({
        completedTopics: state.completedTopics.includes(topicId) 
          ? state.completedTopics 
          : [...state.completedTopics, topicId]
      })),

      visitTopic: (topicId: string) => set((state) => ({
        visitedTopics: state.visitedTopics.includes(topicId)
          ? state.visitedTopics
          : [...state.visitedTopics, topicId]
      })),

      toggleReviewedQuestion: (question: string) => set((state) => ({
        reviewedQuestions: state.reviewedQuestions.includes(question)
          ? state.reviewedQuestions.filter(q => q !== question)
          : [...state.reviewedQuestions, question]
      })),

      updateStreak: () => {
        const now = new Date();
        const last = get().lastVisit ? new Date(get().lastVisit!) : null;
        
        if (!last) {
          set({ streak: 1, lastVisit: now.toISOString() });
          return;
        }

        const diffDays = Math.floor((now.getTime() - last.getTime()) / (1000 * 3600 * 24));
        
        if (diffDays === 1) {
          set((state) => ({ streak: state.streak + 1, lastVisit: now.toISOString() }));
        } else if (diffDays > 1) {
          set({ streak: 1, lastVisit: now.toISOString() });
        }
      },

      resetProgress: () => set({ completedTopics: [], visitedTopics: [], reviewedQuestions: [], streak: 0, lastVisit: null }),
    }),
    {
      name: 'n8n-progress-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
