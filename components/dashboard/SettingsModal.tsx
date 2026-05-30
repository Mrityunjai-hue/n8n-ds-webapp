'use client';

import React, { useState } from 'react';
import { X, Moon, Sun, Monitor, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useTheme } from 'next-themes';
import { useProgressStore } from '@/lib/store/useProgressStore';
import { useAchievementStore } from '@/lib/store/useAchievementStore';
import { useRecentStore } from '@/lib/store/useRecentStore';
import { useUserStore } from '@/lib/store/useUserStore';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const { theme, setTheme } = useTheme();
  const { user } = useUserStore();
  
  const resetProgress = useProgressStore(state => state.resetProgress);
  const resetAchievements = useAchievementStore(state => state.resetAchievements);
  const setLastTopic = useRecentStore(state => state.setLastTopic);
  
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  if (!isOpen) return null;

  const handleReset = () => {
    resetProgress();
    resetAchievements();
    // @ts-ignore - passing null to reset it
    setLastTopic(null);
    setShowConfirmReset(false);
    setResetSuccess(true);
    
    setTimeout(() => {
      setResetSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-border/40 bg-bg-elevated/50">
          <h2 className="text-xl font-display font-bold">Settings</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-bg-hover text-text-secondary hover:text-text-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-8 overflow-y-auto">
          
          {/* Account Section */}
          <section className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted">Account</h3>
            <div className="bg-bg-elevated rounded-xl p-4 border border-border/40 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent-teal/10 text-accent-teal flex items-center justify-center font-display font-bold text-lg">
                {user?.displayName?.[0] || 'U'}
              </div>
              <div className="min-w-0">
                <div className="font-bold text-text-primary truncate">{user?.displayName || 'Student'}</div>
                <div className="text-sm text-text-secondary truncate">{user?.email || 'Logged in'}</div>
              </div>
            </div>
          </section>

          {/* Appearance Section */}
          <section className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted">Appearance</h3>
            <div className="grid grid-cols-3 gap-3">
              <button 
                onClick={() => setTheme('light')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all duration-200
                  ${theme === 'light' 
                    ? 'bg-accent-teal/10 border-accent-teal text-accent-teal' 
                    : 'bg-bg-elevated border-border/40 text-text-secondary hover:bg-bg-hover'
                  }
                `}
              >
                <Sun className="w-5 h-5" />
                <span className="text-xs font-bold">Light</span>
              </button>
              
              <button 
                onClick={() => setTheme('dark')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all duration-200
                  ${theme === 'dark' 
                    ? 'bg-accent-teal/10 border-accent-teal text-accent-teal' 
                    : 'bg-bg-elevated border-border/40 text-text-secondary hover:bg-bg-hover'
                  }
                `}
              >
                <Moon className="w-5 h-5" />
                <span className="text-xs font-bold">Dark</span>
              </button>
              
              <button 
                onClick={() => setTheme('system')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all duration-200
                  ${theme === 'system' 
                    ? 'bg-accent-teal/10 border-accent-teal text-accent-teal' 
                    : 'bg-bg-elevated border-border/40 text-text-secondary hover:bg-bg-hover'
                  }
                `}
              >
                <Monitor className="w-5 h-5" />
                <span className="text-xs font-bold">System</span>
              </button>
            </div>
          </section>

          {/* Danger Zone */}
          <section className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-danger">Danger Zone</h3>
            
            {resetSuccess ? (
              <div className="bg-success/10 border border-success/30 rounded-xl p-4 flex items-center gap-3 text-success">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-bold">Progress reset successfully!</span>
              </div>
            ) : showConfirmReset ? (
              <div className="bg-danger/10 border border-danger/30 rounded-xl p-4 space-y-4">
                <div className="flex gap-3 text-danger">
                  <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <strong className="block mb-1">Are you absolutely sure?</strong>
                    This will permanently delete all your local learning progress, streak, and unlocked achievements. Bookmarks will not be affected.
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="danger" size="sm" className="flex-1" onClick={handleReset}>
                    Yes, Reset Everything
                  </Button>
                  <Button variant="secondary" size="sm" className="flex-1 bg-bg-surface" onClick={() => setShowConfirmReset(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-bg-elevated border border-border/40 rounded-xl p-4 flex items-center justify-between gap-4">
                <div>
                  <div className="font-bold text-text-primary text-sm">Reset Progress</div>
                  <div className="text-xs text-text-secondary mt-0.5">Clear local learning data and achievements</div>
                </div>
                <Button variant="secondary" size="sm" className="text-danger border-danger/20 hover:bg-danger/10 hover:border-danger/30" onClick={() => setShowConfirmReset(true)}>
                  Reset
                </Button>
              </div>
            )}
          </section>

        </div>
      </div>
    </div>
  );
};
