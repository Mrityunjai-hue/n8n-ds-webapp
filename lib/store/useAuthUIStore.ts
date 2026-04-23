import { create } from 'zustand';

interface AuthUIState {
  isModalOpen: boolean;
  view: 'login' | 'register';
  openModal: (view?: 'login' | 'register') => void;
  closeModal: () => void;
  setView: (view: 'login' | 'register') => void;
}

export const useAuthUIStore = create<AuthUIState>((set) => ({
  isModalOpen: false,
  view: 'login',
  openModal: (view = 'login') => set({ isModalOpen: true, view }),
  closeModal: () => set({ isModalOpen: false }),
  setView: (view) => set({ view }),
}));
