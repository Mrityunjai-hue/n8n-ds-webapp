import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RecentTopic {
  subjectSlug: string;
  topicSlug: string;
  topicTitle: string;
  timestamp: number;
}

interface RecentStore {
  lastTopic: RecentTopic | null;
  setLastTopic: (topic: RecentTopic) => void;
}

export const useRecentStore = create<RecentStore>()(
  persist(
    (set) => ({
      lastTopic: null,
      setLastTopic: (lastTopic) => set({ lastTopic }),
    }),
    {
      name: 'n8n-recent-storage',
    }
  )
);
