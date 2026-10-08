'use client';

import React, { useState } from 'react';
import { X, LogIn, Eye, EyeOff, AlertCircle, CheckCircle2, Loader2, Sparkles, Lock, Mail, User } from 'lucide-react';
import { useAuthUIStore } from '@/lib/store/useAuthUIStore';
import { useFirebaseAuth } from '@/lib/hooks/useFirebaseAuth';
import StickyNoteModal from '@/components/ui/StickyNoteModal';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '@/lib/firebase/config';

export const AuthModal = () => {
  const { isModalOpen, closeModal, view, setView } = useAuthUIStore();
  const { signInWithGoogle } = useFirebaseAuth();

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setError(null);
    setSuccess(null);
  };

  const handleSocialAuth = async (provider: 'google' | 'github') => {
    setIsLoading(true);
    setError(null);
    try {
      if (provider === 'google') await signInWithGoogle();
      closeModal();
      resetForm();
    } catch (e: any) {
      setError(e.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      if (view === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
        setSuccess('Welcome back! Redirecting…');
      } else {
        if (!name.trim()) {
          setError('Please enter your full name.');
          setIsLoading(false);
          return;
        }
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName: name.trim() });
        setSuccess('Account created! Welcome to 404-Found.');
      }
      setTimeout(() => {
        closeModal();
        resetForm();
      }, 1000);
    } catch (e: any) {
      const msg: Record<string, string> = {
        'auth/user-not-found': 'No account found with this email.',
        'auth/wrong-password': 'Incorrect password.',
        'auth/email-already-in-use': 'This email is already registered. Try signing in.',
        'auth/invalid-email': 'Please enter a valid email address.',
        'auth/too-many-requests': 'Too many attempts. Please wait a moment.',
        'auth/network-request-failed': 'Network error. Check your connection.',
      };
      setError(msg[e.code] || e.message || 'Something went wrong. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const switchView = (v: 'login' | 'register') => {
    setView(v);
    resetForm();
  };

  if (!isModalOpen) return null;

  return (
    <StickyNoteModal
      isOpen={isModalOpen}
      onClose={() => {
        closeModal();
        resetForm();
      }}
      pinType="pushpin"
      color="yellow"
    >
      <div className="space-y-4 pt-1">
        {/* Top Header with Handcrafted Notebook Pencil Emblem */}
        <div className="text-center">
          {/* Hand-Drawn Squircle Badge */}
          <div className="w-14 h-14 rounded-2xl bg-[#fef08a] dark:bg-[#eab308] border-2 border-black/80 shadow-[2px_2px_0px_#000] flex items-center justify-center mx-auto mb-3 transform -rotate-2 select-none">
            <span className="text-2xl">✏️</span>
          </div>

          <h2
            className="text-3xl font-bold tracking-tight crayon-heading leading-tight text-[#111827] dark:text-[#fbf5eb]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {view === 'login' ? 'Welcome Back!' : 'Join 404-Found!'}
          </h2>

          <p
            className="text-sm font-medium mt-1 text-[#374151] dark:text-[#d1d5db]"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {view === 'login'
              ? 'Sign in to sync your SQL streak and unlocked hints.'
              : 'Create your free account to track your progress & streaks.'}
          </p>
        </div>

        {/* Success Alert */}
        {success && (
          <div className="flex items-center gap-2 p-3 bg-emerald-100 border-2 border-emerald-600 rounded-xl text-emerald-900 text-xs font-mono font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="flex items-center gap-2 p-3 bg-rose-100 border-2 border-rose-600 rounded-xl text-rose-900 text-xs font-mono font-bold">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* ── GOOGLE SIGN IN BUTTON (AUTHENTIC HAND-DRAWN OUTLINE) ── */}
        <div>
          <button
            type="button"
            onClick={() => handleSocialAuth('google')}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border-2 border-black/80 bg-white hover:bg-neutral-50 text-[#111827] text-sm font-bold shadow-[2px_2px_0px_#000] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#000] transition-all cursor-pointer disabled:opacity-50"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M5.27 9.77A7.18 7.18 0 0 1 12 4.8c1.69 0 3.21.6 4.4 1.58l3.28-3.28A12 12 0 0 0 12 0C7.37 0 3.36 2.7 1.28 6.66l3.99 3.11z"
              />
              <path
                fill="#34A853"
                d="M16.04 18.01A7.17 7.17 0 0 1 12 19.2c-3.02 0-5.61-1.87-6.73-4.55l-4.02 3.1C3.38 21.3 7.38 24 12 24c2.93 0 5.72-1.01 7.83-2.85l-3.79-3.14z"
              />
              <path
                fill="#4A90D9"
                d="M19.83 21.15A12.04 12.04 0 0 0 24 12c0-.74-.07-1.46-.19-2.16H12v4.59h6.72a5.76 5.76 0 0 1-2.49 3.76l3.6 2.96z"
              />
              <path
                fill="#FBBC05"
                d="M5.27 14.65A7.27 7.27 0 0 1 4.8 12c0-.93.17-1.83.47-2.65L1.28 6.24A12.07 12.07 0 0 0 0 12c0 1.92.45 3.73 1.25 5.34l4.02-2.69z"
              />
            </svg>
            <span className="text-base">Continue with Google</span>
          </button>
        </div>

        {/* Hand-Drawn Divider with Ink Label */}
        <div className="relative my-3">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-black/15 dark:border-white/20" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[#fff9a6] dark:bg-[#2b184a] px-3 text-[11px] font-mono font-bold uppercase tracking-wider text-[#4b5563] dark:text-[#d1d5db]">
              &bull; OR WITH EMAIL &bull;
            </span>
          </div>
        </div>

        {/* Form Fields with High Contrast & Paper Inputs */}
        <form onSubmit={handleEmailAuth} className="space-y-3">
          {view === 'register' && (
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#111827] dark:text-[#f3f4f6] mb-1">
                FULL NAME
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ada Lovelace"
                  autoComplete="name"
                  className="w-full px-3.5 py-2.5 bg-white/90 dark:bg-[#1a0f30]/90 border-2 border-black/20 focus:border-[#2563eb] rounded-xl text-sm font-mono text-[#111827] dark:text-[#f3f4f6] placeholder:text-neutral-400 outline-none transition-colors shadow-inner"
                />
                <User className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#111827] dark:text-[#f3f4f6] mb-1">
              EMAIL ADDRESS
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@example.com"
                autoComplete="email"
                required
                className="w-full px-3.5 py-2.5 bg-white/90 dark:bg-[#1a0f30]/90 border-2 border-black/20 focus:border-[#2563eb] rounded-xl text-sm font-mono text-[#111827] dark:text-[#f3f4f6] placeholder:text-neutral-400 outline-none transition-colors shadow-inner"
              />
              <Mail className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#111827] dark:text-[#f3f4f6] mb-1">
              PASSWORD
            </label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 6 characters"
                autoComplete={view === 'login' ? 'current-password' : 'new-password'}
                required
                className="w-full px-3.5 py-2.5 pr-10 bg-white/90 dark:bg-[#1a0f30]/90 border-2 border-black/20 focus:border-[#2563eb] rounded-xl text-sm font-mono text-[#111827] dark:text-[#f3f4f6] placeholder:text-neutral-400 outline-none transition-colors shadow-inner"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-800 dark:hover:text-white transition-colors cursor-pointer"
                aria-label={showPw ? 'Hide password' : 'Show password'}
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit CTA Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-black bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-base shadow-[2px_2px_0px_#000] hover:translate-y-[-1px] transition-all cursor-pointer mt-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : null}
            <span>{view === 'login' ? '➔ Sign In ➔' : '➔ Create Account ➔'}</span>
          </button>
        </form>

        {/* Switch View Toggle with Ballpoint Blue Link */}
        <div className="pt-2 border-t border-black/10 dark:border-white/10 text-center text-xs font-mono text-[#4b5563] dark:text-[#d1d5db]">
          <span>{view === 'login' ? "Don't have an account? " : 'Already registered? '}</span>
          <button
            onClick={() => switchView(view === 'login' ? 'register' : 'login')}
            className="text-[#2563eb] dark:text-[#60a5fa] font-bold hover:underline cursor-pointer ml-1"
          >
            {view === 'login' ? 'Sign Up (Free)' : 'Sign In'}
          </button>
        </div>
      </div>
    </StickyNoteModal>
  );
};
