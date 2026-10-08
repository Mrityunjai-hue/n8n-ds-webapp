'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, User, ArrowRight, Search, BookOpen, Code2, Rocket, Map, HelpCircle, Sparkles } from 'lucide-react';
import NavLogo from '@/components/NavLogo';
import { ThemeToggle } from './ThemeToggle';
import { MobileSheet } from './MobileSheet';
import { useAuthUIStore } from '@/lib/store/useAuthUIStore';
import { useUserStore } from '@/lib/store/useUserStore';
import { useSearchStore } from '@/lib/store/useSearchStore';
import { motion } from 'framer-motion';

export const navLinks = [
  { name: 'Learn', href: '/learn', icon: BookOpen },
  { name: 'Code', href: '/code', badge: 'NEW', icon: Code2 },
  { name: 'Projects', href: '/projects', icon: Rocket },
  { name: 'Roadmap', href: '/roadmap', icon: Map },
  { name: 'About', href: '/about', icon: HelpCircle },
];

export const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const { openModal } = useAuthUIStore();
  const { user } = useUserStore();
  const { openSearch } = useSearchStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full z-40 py-2.5 sm:py-3.5 px-3 sm:px-6 pointer-events-none select-none transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          
          {/* ── 1. LEFT ZONE: BRAND LOGO (STICKER PILL) ── */}
          <div className="pointer-events-auto flex items-center">
            <motion.div
              whileHover={{ scale: 1.03, rotate: -0.5 }}
              whileTap={{ scale: 0.98 }}
              className="p-1 px-2.5 sm:p-1.5 sm:px-3 rounded-2xl bg-[var(--canvas-raised)]/95 backdrop-blur-md border-2 border-[var(--canvas-border)] shadow-sm transition-shadow hover:shadow-md"
            >
              <NavLogo href="/" size="md" showTag={true} />
            </motion.div>
          </div>

          {/* ── 2. CENTER ZONE: FLOATING DYNAMIC NAVIGATION PILL (DESKTOP) ── */}
          <nav className="hidden lg:flex items-center pointer-events-auto">
            <div className="flex items-center gap-1 sm:gap-1.5 p-1.5 px-2.5 rounded-full border-2 border-[var(--canvas-border)] bg-[var(--canvas-raised)]/95 backdrop-blur-md shadow-sm">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(`${link.href}/`));
                const Icon = link.icon;
                
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 ${
                      isActive
                        ? 'text-[var(--ink)] font-bold'
                        : 'text-[var(--ink-2)] hover:text-[var(--ink)] hover:bg-[var(--canvas-sunken)]/60'
                    }`}
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[var(--blue)]' : 'text-[var(--ink-3)]'}`} />
                    <span>{link.name}</span>
                    
                    {link.badge && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-red-500 text-white shadow-xs animate-pulse">
                        {link.badge}
                      </span>
                    )}

                    {/* Fluid Active Sliding Pill Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute inset-0 rounded-full bg-[var(--yellow-tint)] border border-[var(--yellow)] shadow-[inset_0_1px_2px_rgba(245,191,56,0.2)] -z-10"
                        transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* ── 3. RIGHT ZONE: FLOATING ACTIONS (SEARCH + THEME + SIGN IN) ── */}
          <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
            
            {/* Desktop Action Capsule Pill */}
            <div className="hidden sm:flex items-center gap-1.5 p-1.5 pl-2.5 pr-2 rounded-full border-2 border-[var(--canvas-border)] bg-[var(--canvas-raised)]/95 backdrop-blur-md shadow-sm">
              
              {/* Quick Search Button */}
              <button
                onClick={openSearch}
                className="flex items-center gap-2 py-1 px-2.5 rounded-full bg-[var(--canvas-sunken)] hover:bg-[var(--canvas)] text-[var(--ink-2)] text-xs font-mono transition-colors border border-[var(--canvas-border)]/60 cursor-pointer"
                title="Search topics & questions (⌘K)"
                aria-label="Search"
              >
                <Search className="w-3.5 h-3.5 text-[var(--ink-3)]" />
                <span className="hidden md:inline text-[11px] text-[var(--ink-3)]">Search</span>
                <kbd className="hidden md:inline-flex items-center text-[10px] font-bold px-1 py-0.2 rounded bg-[var(--canvas-raised)] border border-[var(--canvas-border)] text-[var(--ink-3)]">
                  ⌘K
                </kbd>
              </button>

              {/* Pencil Divider */}
              <div className="w-[1.5px] h-4 bg-[var(--canvas-border)] mx-0.5" />

              {/* Theme Toggle Inside Capsule */}
              <ThemeToggle />

              {/* Pencil Divider */}
              <div className="w-[1.5px] h-4 bg-[var(--canvas-border)] mx-0.5" />

              {/* User Profile / Sign In */}
              {user ? (
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 py-1 px-2.5 rounded-full bg-[var(--canvas)] hover:bg-[var(--canvas-sunken)] text-[var(--ink)] text-xs font-mono transition-colors border border-[var(--canvas-border)] shadow-xs"
                  title="Go to dashboard"
                >
                  <div className="w-5 h-5 rounded-full bg-[var(--blue)] text-white font-bold flex items-center justify-center text-[10px]">
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : <User className="w-3 h-3" />}
                  </div>
                  <span className="font-bold max-w-[80px] truncate">
                    {user.displayName?.split(' ')[0] || 'Profile'}
                  </span>
                </Link>
              ) : (
                <button
                  onClick={() => openModal('login')}
                  className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-[var(--blue)] hover:bg-[var(--blue-dim)] text-white text-xs font-bold font-mono transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
                >
                  <span>Sign In</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Mobile Header Controls (< 640px) */}
            <div className="sm:hidden flex items-center gap-1 p-1 rounded-full border-2 border-[var(--canvas-border)] bg-[var(--canvas-raised)]/95 backdrop-blur-md shadow-sm">
              <button
                onClick={openSearch}
                className="w-8 h-8 rounded-full bg-[var(--canvas-sunken)] flex items-center justify-center text-[var(--ink-2)]"
                aria-label="Search"
              >
                <Search className="w-3.5 h-3.5" />
              </button>

              <ThemeToggle />

              <button
                onClick={() => setIsMobileOpen(true)}
                className="w-8 h-8 rounded-full bg-[var(--canvas)] border border-[var(--canvas-border)] flex items-center justify-center text-[var(--ink)] active:scale-95"
                aria-label="Open mobile menu"
              >
                <Menu className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </header>

      {/* Mobile Drawer Sheet */}
      <MobileSheet
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        navLinks={navLinks}
        user={user}
        onOpenAuth={() => openModal('login')}
        onOpenSearch={openSearch}
      />
    </>
  );
};
