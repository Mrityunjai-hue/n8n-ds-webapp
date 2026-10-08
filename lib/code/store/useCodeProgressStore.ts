'use client';

import { create } from 'zustand';

export interface SolvedRecord {
  solvedAt: string;
  attempts: number;
  hintsUsed: number;
  executionTimeMs: number;
  pointsEarned: number;
}

interface CodeProgressState {
  solved: Record<string, SolvedRecord>;
  bookmarks: string[];
  unlockedHints: Record<string, number[]>; // problemId -> levels [1, 2, 3]
  inkDrops: number;
  streak: number;
  lastSolvedDate: string | null;
  totalPoints: number;

  markSolved: (id: string, record: SolvedRecord) => void;
  toggleBookmark: (id: string) => void;
  spendInkDrops: (amount: number) => boolean;
  unlockHint: (problemId: string, level: number, cost: number) => boolean;
  isHintUnlocked: (problemId: string, level: number) => boolean;
  isSolved: (id: string) => boolean;
  isBookmarked: (id: string) => boolean;
  rehydrate: () => void;
}

const STORAGE_KEY = '404fc-progress-store';

export const useCodeProgressStore = create<CodeProgressState>((set, get) => ({
  solved: {},
  bookmarks: [],
  unlockedHints: {},
  inkDrops: 50,
  streak: 1,
  lastSolvedDate: null,
  totalPoints: 0,

  markSolved: (id, record) => {
    set((state) => {
      const isFirstSolve = !state.solved[id];
      const today = new Date().toISOString().split('T')[0];
      let newStreak = state.streak;

      if (isFirstSolve) {
        if (!state.lastSolvedDate) {
          newStreak = 1;
        } else {
          const lastDate = new Date(state.lastSolvedDate);
          const currentDate = new Date(today);
          const diffDays = Math.round((currentDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
          
          if (diffDays === 1) {
            newStreak += 1;
          } else if (diffDays > 1) {
            newStreak = 1;
          }
        }
      }

      const updated = {
        ...state,
        solved: { ...state.solved, [id]: record },
        lastSolvedDate: today,
        streak: newStreak,
        totalPoints: state.totalPoints + (isFirstSolve ? record.pointsEarned : 0),
        inkDrops: state.inkDrops + (isFirstSolve ? 5 : 0), // Reward 5 drops per new solve
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          solved: updated.solved,
          bookmarks: updated.bookmarks,
          unlockedHints: updated.unlockedHints,
          inkDrops: updated.inkDrops,
          streak: updated.streak,
          lastSolvedDate: updated.lastSolvedDate,
          totalPoints: updated.totalPoints,
        }));
      }

      return updated;
    });
  },

  toggleBookmark: (id) => {
    set((state) => {
      const isBookmarked = state.bookmarks.includes(id);
      const bookmarks = isBookmarked
        ? state.bookmarks.filter((b) => b !== id)
        : [...state.bookmarks, id];

      const updated = { ...state, bookmarks };
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          solved: updated.solved,
          bookmarks: updated.bookmarks,
          unlockedHints: updated.unlockedHints,
          inkDrops: updated.inkDrops,
          streak: updated.streak,
          lastSolvedDate: updated.lastSolvedDate,
          totalPoints: updated.totalPoints,
        }));
      }
      return updated;
    });
  },

  spendInkDrops: (amount) => {
    const { inkDrops } = get();
    if (inkDrops < amount) return false;

    set((state) => {
      const updated = { ...state, inkDrops: state.inkDrops - amount };
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          solved: updated.solved,
          bookmarks: updated.bookmarks,
          unlockedHints: updated.unlockedHints,
          inkDrops: updated.inkDrops,
          streak: updated.streak,
          lastSolvedDate: updated.lastSolvedDate,
          totalPoints: updated.totalPoints,
        }));
      }
      return updated;
    });
    return true;
  },

  unlockHint: (problemId, level, cost) => {
    const { isHintUnlocked, spendInkDrops } = get();
    if (isHintUnlocked(problemId, level)) return true;

    if (cost > 0) {
      const ok = spendInkDrops(cost);
      if (!ok) return false;
    }

    set((state) => {
      const currentUnlocked = state.unlockedHints[problemId] || [];
      const updatedHints = {
        ...state.unlockedHints,
        [problemId]: Array.from(new Set([...currentUnlocked, level])),
      };

      const updated = { ...state, unlockedHints: updatedHints };
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          solved: updated.solved,
          bookmarks: updated.bookmarks,
          unlockedHints: updated.unlockedHints,
          inkDrops: updated.inkDrops,
          streak: updated.streak,
          lastSolvedDate: updated.lastSolvedDate,
          totalPoints: updated.totalPoints,
        }));
      }
      return updated;
    });

    return true;
  },

  isHintUnlocked: (problemId, level) => {
    if (level === 1) return true; // Level 1 is always free and unlocked
    const hints = get().unlockedHints[problemId];
    return Array.isArray(hints) && hints.includes(level);
  },

  isSolved: (id) => {
    return Boolean(get().solved[id]);
  },

  isBookmarked: (id) => {
    return get().bookmarks.includes(id);
  },

  rehydrate: () => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        set({
          solved: parsed.solved || {},
          bookmarks: parsed.bookmarks || [],
          unlockedHints: parsed.unlockedHints || {},
          inkDrops: typeof parsed.inkDrops === 'number' ? parsed.inkDrops : 50,
          streak: typeof parsed.streak === 'number' ? parsed.streak : 1,
          lastSolvedDate: parsed.lastSolvedDate || null,
          totalPoints: typeof parsed.totalPoints === 'number' ? parsed.totalPoints : 0,
        });
      }
    } catch (e) {
      console.error('Failed to load 404fc progress', e);
    }
  },
}));
