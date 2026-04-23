'use client';

import React from 'react';
import { X, LogIn } from 'lucide-react';
import { useAuthUIStore } from '@/lib/store/useAuthUIStore';
import { useFirebaseAuth } from '@/lib/hooks/useFirebaseAuth';
import { Button } from '../ui/Button';

export const AuthModal = () => {
  const { isModalOpen, closeModal, view, setView } = useAuthUIStore();
  const { signInWithGoogle, signInWithGithub } = useFirebaseAuth();

  const handleAuth = async (provider: 'google' | 'github') => {
    if (provider === 'google') await signInWithGoogle();
    else await signInWithGithub();
    closeModal();
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-bg-primary/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-bg-surface border border-border w-full max-w-md rounded-modal p-8 shadow-2xl relative animate-scale-up">
        <button 
          onClick={closeModal}
          className="absolute top-6 right-6 text-text-secondary hover:text-text-primary transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-accent-teal flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
            N
          </div>
          <h2 className="text-2xl font-display font-bold mb-2">
            {view === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-sm text-text-secondary">
            {view === 'login' 
              ? 'Sign in to sync your progress across devices.' 
              : 'Join the community and start your data science journey.'}
          </p>
        </div>

        <div className="space-y-4">
          <Button 
            variant="secondary" 
            className="w-full gap-3 py-3"
            onClick={() => handleAuth('github')}
          >
            <LogIn className="w-5 h-5" />
            Continue with GitHub
          </Button>
          <Button 
            variant="secondary" 
            className="w-full gap-3 py-3"
            onClick={() => handleAuth('google')}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.90 3.16-1.78 4.04-1.12 1.12-2.88 2.32-6.06 2.32-5.12 0-9.28-4.16-9.28-9.28s4.16-9.28 9.28-9.28c2.8 0 4.94 1.1 6.54 2.62l2.3-2.3C18.96 1.48 16.2 0 12.48 0 5.86 0 .3 5.4.3 12s5.56 12 12.18 12c3.56 0 6.36-1.18 8.52-3.42 2.22-2.22 2.92-5.34 2.92-7.86 0-.74-.06-1.44-.18-2.12H12.48z"/>
            </svg>
            Continue with Google
          </Button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
              <span className="bg-bg-surface px-4 text-text-secondary">Or with email</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary mb-2">Email Address</label>
              <input 
                type="email" 
                placeholder="name@example.com"
                className="w-full px-4 py-3 bg-bg-primary border border-border rounded-card focus:border-accent-teal outline-none transition-colors text-sm"
              />
            </div>
            {view === 'register' && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary mb-2">Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-bg-primary border border-border rounded-card focus:border-accent-teal outline-none transition-colors text-sm"
                />
              </div>
            )}
            <Button className="w-full py-3">
              {view === 'login' ? 'Sign In' : 'Create Account'}
            </Button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center text-sm">
          <span className="text-text-secondary">
            {view === 'login' ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button 
            onClick={() => setView(view === 'login' ? 'register' : 'login')}
            className="text-accent-teal font-bold hover:underline"
          >
            {view === 'login' ? 'Sign Up' : 'Log In'}
          </button>
        </div>
      </div>
    </div>
  );
};
