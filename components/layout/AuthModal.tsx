'use client';

import React, { useState } from 'react';
import { X, LogIn, Eye, EyeOff, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useAuthUIStore } from '@/lib/store/useAuthUIStore';
import { useFirebaseAuth } from '@/lib/hooks/useFirebaseAuth';
import { Button } from '../ui/Button';
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
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [name, setName]         = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const [success, setSuccess]   = useState<string | null>(null);

  const resetForm = () => {
    setEmail(''); setPassword(''); setName('');
    setError(null); setSuccess(null);
  };

  const handleSocialAuth = async (provider: 'google' | 'github') => {
    setIsLoading(true); setError(null);
    try {
      if (provider === 'google') await signInWithGoogle();
      closeModal(); resetForm();
    } catch (e: any) {
      setError(e.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all required fields.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }

    setIsLoading(true); setError(null);
    try {
      if (view === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
        setSuccess('Welcome back! Redirecting…');
      } else {
        if (!name.trim()) { setError('Please enter your full name.'); setIsLoading(false); return; }
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName: name.trim() });
        setSuccess('Account created! Welcome to the hub.');
      }
      setTimeout(() => { closeModal(); resetForm(); }, 1000);
    } catch (e: any) {
      const msg: Record<string, string> = {
        'auth/user-not-found':      'No account found with this email.',
        'auth/wrong-password':      'Incorrect password.',
        'auth/email-already-in-use':'This email is already registered. Try signing in.',
        'auth/invalid-email':       'Please enter a valid email address.',
        'auth/too-many-requests':   'Too many attempts. Please wait a moment.',
        'auth/network-request-failed': 'Network error. Check your connection.',
      };
      setError(msg[e.code] || e.message || 'Something went wrong. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const switchView = (v: 'login' | 'register') => {
    setView(v); resetForm();
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-bg-primary/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-bg-surface border border-border w-full max-w-md rounded-2xl p-8 shadow-2xl relative animate-in zoom-in-95 duration-200">
        {/* Close */}
        <button
          onClick={() => { closeModal(); resetForm(); }}
          className="absolute top-5 right-5 text-text-secondary hover:text-text-primary transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-accent-teal flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
            N
          </div>
          <h2 className="text-2xl font-display font-bold mb-1">
            {view === 'login' ? 'Welcome Back' : 'Join the Hub'}
          </h2>
          <p className="text-sm text-text-secondary">
            {view === 'login'
              ? 'Sign in to sync your progress across devices.'
              : 'Create your free account and start learning today.'}
          </p>
        </div>

        {/* Success message */}
        {success && (
          <div className="flex items-center gap-3 p-3 mb-6 bg-success/10 border border-success/30 rounded-xl text-success text-sm">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            {success}
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="flex items-center gap-3 p-3 mb-6 bg-danger/10 border border-danger/30 rounded-xl text-danger text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Social Buttons */}
        <div className="space-y-3 mb-6">
          {/* Removed GitHub button */}
          <Button
            variant="secondary"
            className="w-full gap-3 py-3"
            onClick={() => handleSocialAuth('google')}
            disabled={isLoading}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M5.27 9.77A7.18 7.18 0 0 1 12 4.8c1.69 0 3.21.6 4.4 1.58l3.28-3.28A12 12 0 0 0 12 0C7.37 0 3.36 2.7 1.28 6.66l3.99 3.11z"/>
              <path fill="#34A853" d="M16.04 18.01A7.17 7.17 0 0 1 12 19.2c-3.02 0-5.61-1.87-6.73-4.55l-4.02 3.1C3.38 21.3 7.38 24 12 24c2.93 0 5.72-1.01 7.83-2.85l-3.79-3.14z"/>
              <path fill="#4A90D9" d="M19.83 21.15A12.04 12.04 0 0 0 24 12c0-.74-.07-1.46-.19-2.16H12v4.59h6.72a5.76 5.76 0 0 1-2.49 3.76l3.6 2.96z"/>
              <path fill="#FBBC05" d="M5.27 14.65A7.27 7.27 0 0 1 4.8 12c0-.93.17-1.83.47-2.65L1.28 6.24A12.07 12.07 0 0 0 0 12c0 1.92.45 3.73 1.25 5.34l4.02-2.69z"/>
            </svg>
            Continue with Google
          </Button>
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-bg-surface px-4 text-xs uppercase tracking-widest font-bold text-text-secondary">
              Or with email
            </span>
          </div>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleEmailAuth} className="space-y-4">
          {view === 'register' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                autoComplete="name"
                className="w-full px-4 py-3 bg-bg-primary border border-border rounded-xl focus:border-accent-teal outline-none transition-colors text-sm"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              autoComplete="email"
              required
              className="w-full px-4 py-3 bg-bg-primary border border-border rounded-xl focus:border-accent-teal outline-none transition-colors text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 6 characters"
                autoComplete={view === 'login' ? 'current-password' : 'new-password'}
                required
                className="w-full px-4 py-3 pr-12 bg-bg-primary border border-border rounded-xl focus:border-accent-teal outline-none transition-colors text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
                aria-label={showPw ? 'Hide password' : 'Show password'}
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-accent-teal hover:bg-accent-teal/90 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <LogIn className="w-4 h-4" />
            )}
            {view === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Switch view */}
        <div className="mt-6 pt-6 border-t border-border text-center text-sm">
          <span className="text-text-secondary">
            {view === 'login' ? "Don't have an account? " : 'Already have an account? '}
          </span>
          <button
            onClick={() => switchView(view === 'login' ? 'register' : 'login')}
            className="text-accent-teal font-bold hover:underline"
          >
            {view === 'login' ? 'Sign Up' : 'Log In'}
          </button>
        </div>
      </div>
    </div>
  );
};
