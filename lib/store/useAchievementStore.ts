import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AchievementState {
  unlockedAchievements: string[];
  unlockAchievement: (id: string) => boolean; // Returns true if newly unlocked
  hasAchievement: (id: string) => boolean;
  resetAchievements: () => void;
}

export const useAchievementStore = create<AchievementState>()(
  persist(
    (set, get) => ({
      unlockedAchievements: [],
      
      unlockAchievement: (id: string) => {
        const current = get().unlockedAchievements;
        if (current.includes(id)) return false;
        
        set({ unlockedAchievements: [...current, id] });
        return true;
      },
      
      hasAchievement: (id: string) => get().unlockedAchievements.includes(id),
      
      resetAchievements: () => set({ unlockedAchievements: [] }),
    }),
    {
      name: 'n8n-achievements-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
