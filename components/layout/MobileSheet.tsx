'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, User, Search, Sun, Moon, Compass } from 'lucide-react';
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

  // Lock body scroll when drawer is open & support Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end lg:hidden">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/65 backdrop-blur-sm"
          />

          {/* Drawer Container (Strictly pinned within screen boundary, never overflows) */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative w-full max-w-lg mx-auto max-h-[82dvh] h-[82dvh] flex flex-col rounded-t-[28px] border-t-3 border-x-2 border-[var(--canvas-border)] bg-[var(--canvas)] shadow-2xl overflow-hidden doodle-canvas select-none"
            style={{
              marginTop: 'max(1.5rem, env(safe-area-inset-top, 24px))',
              paddingBottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))',
            }}
          >
            {/* 1. FIXED TOP HEADER: NEVER SCROLLS AWAY (Close button is always visible, centered & accessible) */}
            <div className="flex-shrink-0 px-5 pt-3.5 pb-3 border-b-2 border-[var(--canvas-border)] bg-[var(--canvas)] flex flex-col gap-2.5 z-30">
              {/* Drag Handle Indicator */}
              <div className="w-12 h-1.5 rounded-full bg-[var(--canvas-border)] mx-auto opacity-70 cursor-grab" />

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 min-w-[36px] min-h-[36px] rounded-xl bg-[var(--yellow-tint)] border-2 border-[var(--canvas-border)] flex items-center justify-center text-[var(--blue)] shadow-xs shrink-0">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold font-mono text-[var(--ink)] flex items-center gap-1.5 truncate">
                      <span>404 Found</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[var(--blue)] text-white shrink-0">
                        STUDY HUB
                      </span>
                    </div>
                    <div className="text-[11px] text-[var(--ink-3)] font-mono truncate">
                      Data Science &amp; AI Practice Platform
                    </div>
                  </div>
                </div>

                {/* Fixed, Prominent, Safe-Zone Close Button */}
                <button
                  onClick={onClose}
                  className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full border-2 border-[var(--canvas-border)] bg-[var(--canvas-raised)] hover:bg-[var(--canvas-sunken)] active:scale-90 flex items-center justify-center text-[var(--ink)] shadow-xs transition-transform cursor-pointer shrink-0"
                  aria-label="Close navigation"
                  title="Close navigation"
                >
                  <X className="w-5 h-5 text-[var(--ink)] stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* 2. SCROLLABLE DRAWER BODY (All content scrolls smoothly within boundary) */}
            <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3.5 overscroll-contain">
              {/* Search Trigger Bar */}
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
                    <span>Search lessons, SQL &amp; models...</span>
                  </div>
                  <kbd className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[var(--canvas-raised)] border border-[var(--canvas-border)] text-[var(--ink-3)]">
                    Search
                  </kbd>
                </button>
              )}

              {/* Navigation Cards List */}
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(`${link.href}/`));
                  const Icon = link.icon;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={onClose}
                      className={`flex items-center justify-between p-3 rounded-2xl border-2 transition-all active:scale-[0.98] ${
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
                            className="text-base font-bold font-heading leading-tight"
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
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
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
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
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

              {/* Auth / Profile CTA */}
              <div className="pt-1">
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
                    <span>Sign In / Create Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileSheet;
