'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, User, Search, Sun, Moon, Compass, Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import Link from 'next/link';

interface MobileSheetProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: Array<{ name: string; href: string; badge?: string; icon: React.ComponentType<{ className?: string }> }>;
  user: any;
  onOpenAuth: () => void;
  onOpenSearch?: () => void;
}

export const MobileSheet: React.FC<MobileSheetProps> = ({
  isOpen,
  onClose,
  navLinks,
  user,
  onOpenAuth,
  onOpenSearch,
}) => {
  const pathname = usePathname();
  const { theme, resolvedTheme, setTheme } = useTheme();
  const isDark = (theme === 'system' ? resolvedTheme : theme) === 'dark';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Bottom Sheet Drawer */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 260 }}
            className="absolute bottom-0 left-0 right-0 max-h-[88vh] overflow-y-auto overflow-x-hidden rounded-t-[28px] border-t-3 border-[var(--canvas-border)] bg-[var(--canvas)] p-5 sm:p-6 shadow-2xl flex flex-col gap-4 doodle-canvas select-none"
            style={{
              paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))',
            }}
          >
            {/* Sheet Drag Indicator */}
            <div className="w-12 h-1.5 rounded-full bg-[var(--canvas-border)] mx-auto opacity-70" />

            {/* Header: Brand Greeting & Close Button */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-[var(--canvas-border)]">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[var(--yellow-tint)] border-2 border-[var(--canvas-border)] flex items-center justify-center text-[var(--blue)] shadow-xs">
                  <Compass className="w-5 h-5 animate-[spin_12s_linear_infinite]" />
                </div>
                <div>
                  <div className="text-sm font-bold font-mono text-[var(--ink)] flex items-center gap-1.5">
                    <span>404 Found</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[var(--blue)] text-white">
                      STUDY HUB
                    </span>
                  </div>
                  <div className="text-xs text-[var(--ink-3)] font-mono">
                    Ready to master Data Science?
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-[var(--canvas-border)] bg-[var(--canvas-raised)] flex items-center justify-center text-[var(--ink)] active:scale-95 shadow-xs cursor-pointer"
                aria-label="Close navigation"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Input Trigger inside Mobile Sheet */}
            {onOpenSearch && (
              <button
                onClick={() => {
                  onClose();
                  onOpenSearch();
                }}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border-2 border-[var(--canvas-border)] bg-[var(--canvas-sunken)] text-[var(--ink-2)] text-xs font-mono transition-colors active:scale-[0.99] cursor-pointer shadow-xs"
              >
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-[var(--ink-3)]" />
                  <span>Search lessons, SQL & models...</span>
                </div>
                <kbd className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[var(--canvas-raised)] border border-[var(--canvas-border)] text-[var(--ink-3)]">
                  Search
                </kbd>
              </button>
            )}

            {/* Navigation Cards Grid / List */}
            <div className="flex flex-col gap-2 py-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(`${link.href}/`));
                const Icon = link.icon;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border-2 transition-all active:scale-[0.98] ${
                      isActive
                        ? 'border-[#111111] bg-[var(--yellow-tint)] shadow-[3px_3px_0px_var(--ink)]'
                        : 'border-[var(--canvas-border)] bg-[var(--canvas-raised)] hover:bg-[var(--canvas-sunken)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                          isActive
                            ? 'bg-[var(--yellow)] text-[#111111] border-[#111111]'
                            : 'bg-[var(--canvas)] text-[var(--ink-2)] border-[var(--canvas-border)]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div
                          className="text-lg font-bold font-heading leading-tight"
                          style={{ color: 'var(--ink)' }}
                        >
                          {link.name}
                        </div>
                        <div className="text-[11px] font-mono text-[var(--ink-3)]">
                          {link.name === 'Learn' && 'Curriculum & Notebooks'}
                          {link.name === 'Code' && '155+ SQL & Python Sandbox'}
                          {link.name === 'Projects' && 'End-to-End ML Architecture'}
                          {link.name === 'Roadmap' && 'Treasure Map Learning Path'}
                          {link.name === 'About' && 'Community & Documentation'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {link.badge && (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-red-500 text-white shadow-xs">
                          {link.badge}
                        </span>
                      )}
                      <ArrowRight className={`w-4 h-4 ${isActive ? 'text-[var(--ink)]' : 'text-[var(--ink-4)]'}`} />
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Theme Toggle Pill Bar */}
            <div className="p-3 rounded-2xl border-2 border-[var(--canvas-border)] bg-[var(--canvas-raised)] flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[var(--ink-2)]">Theme Mode</span>
              <div className="flex items-center gap-1 p-1 rounded-full bg-[var(--canvas-sunken)] border border-[var(--canvas-border)]">
                <button
                  onClick={() => setTheme('light')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold transition-all ${
                    !isDark
                      ? 'bg-[var(--canvas)] text-[var(--ink)] shadow-xs border border-[var(--canvas-border)]'
                      : 'text-[var(--ink-3)] hover:text-[var(--ink)]'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5 text-[var(--yellow)]" />
                  <span>Day</span>
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold transition-all ${
                    isDark
                      ? 'bg-[var(--canvas)] text-[var(--ink)] shadow-xs border border-[var(--canvas-border)]'
                      : 'text-[var(--ink-3)] hover:text-[var(--ink)]'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5 text-[var(--blue)]" />
                  <span>Night</span>
                </button>
              </div>
            </div>

            {/* Auth / Account Footer */}
            <div className="pt-2">
              {user ? (
                <Link
                  href="/dashboard"
                  onClick={onClose}
                  className="flex items-center justify-between p-3.5 rounded-2xl border-2 border-[var(--canvas-border)] bg-[var(--canvas-raised)] text-[var(--ink)] active:scale-[0.99]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[var(--blue)] text-white font-bold flex items-center justify-center font-mono text-sm shadow-xs">
                      {user.displayName ? user.displayName.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="font-bold text-sm font-mono">{user.displayName || 'Learner'}</div>
                      <div className="text-xs font-mono text-[var(--ink-3)] truncate max-w-[190px]">{user.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-mono font-bold text-[var(--blue)]">
                    <span>Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ) : (
                <button
                  onClick={() => {
                    onClose();
                    onOpenAuth();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[var(--blue)] hover:bg-[var(--blue-dim)] text-white font-bold text-sm font-mono shadow-[3px_3px_0px_#111111] active:scale-[0.99] cursor-pointer"
                >
                  <span>Sign In / Create Free Account</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
