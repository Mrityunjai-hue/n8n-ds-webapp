'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Search, Flame, User, BookOpen, ChevronDown } from 'lucide-react';
import { DarkModeToggle } from './DarkModeToggle';
import { Button } from '../ui/Button';
import { useAuthUIStore } from '@/lib/store/useAuthUIStore';
import { useProgressStore } from '@/lib/store/useProgressStore';
import { useUserStore } from '@/lib/store/useUserStore';
import { useSearchStore } from '@/lib/store/useSearchStore';
import { subjects } from '@/lib/content/subjects';

const navLinks = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Roadmap', href: '/roadmap' },
  { name: 'Projects', href: '/projects' },
  { name: 'Interview', href: '/interview' },
  { name: 'About', href: '/about' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const pathname = usePathname();
  const router = useRouter();
  const { openModal } = useAuthUIStore();
  const { streak, completedTopics } = useProgressStore();
  const { user } = useUserStore();
  const { openSearch } = useSearchStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleEsc);
    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleEsc);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Calculate global curriculum progress
  const totalTopics = subjects.reduce((acc, sub) => acc + sub.topics.length, 0);
  const progressPercent = totalTopics > 0 ? Math.round((completedTopics.length / totalTopics) * 100) : 0;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
      scrolled 
        ? 'bg-bg-surface/85 backdrop-blur-xl border-border-subtle py-3' 
        : 'bg-bg-base/20 border-transparent py-5'
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group" aria-label="Home">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-accent-teal to-accent-purple flex items-center justify-center text-white font-extrabold text-xl group-hover:rotate-12 transition-transform">
              N
            </div>
            <span className="font-display font-extrabold text-xl tracking-tight text-text-primary hidden sm:block">
              N8N <span className="bg-gradient-to-r from-accent-teal to-accent-purple bg-clip-text text-transparent">DS OS</span>
            </span>
          </Link>

          {/* Subjects Mega Menu Trigger (Desktop only) */}
          <div className="hidden lg:block relative" ref={dropdownRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-border/50 hover:border-text-secondary/40 rounded-xl text-xs font-bold text-text-secondary hover:text-white transition-all bg-bg-surface/20 backdrop-blur-sm cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Curriculum</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${menuOpen ? 'rotate-180' : ''}`} />
            </button>

            {menuOpen && (
              <div className="absolute left-0 mt-3 w-[450px] bg-bg-surface border border-border-default rounded-2xl shadow-2xl p-4 grid grid-cols-2 gap-2 animate-fade-in z-50">
                <div className="col-span-2 border-b border-border/40 pb-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">Explore Subjects</span>
                </div>
                {subjects.map((sub) => {
                  const SubIcon = sub.icon as any;
                  return (
                    <Link
                      key={sub.id}
                      href={`/learn/${sub.slug}`}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-bg-surface/30 group transition-colors"
                    >
                      <span className="p-1.5 rounded-lg bg-bg-elevated border border-border-subtle text-text-secondary group-hover:text-accent-teal group-hover:border-accent-teal/20 transition-all shrink-0">
                        <SubIcon className="w-3.5 h-3.5" />
                      </span>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-text-primary block group-hover:text-accent-teal transition-colors truncate">
                          {sub.name}
                        </span>
                        <span className="text-[9px] text-text-secondary truncate block">
                          {sub.topics.length} topics • Level {sub.level}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-bold transition-colors hover:text-accent-teal ${
                pathname === link.href ? 'text-accent-teal' : 'text-text-secondary'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Global Progress Bar Teaser */}
          {completedTopics.length > 0 && (
            <div className="flex flex-col items-end gap-1 shrink-0">
              <span className="text-[9px] font-bold text-text-secondary uppercase tracking-widest font-mono">
                Progress: {completedTopics.length}/{totalTopics}
              </span>
              <div className="w-24 h-1.5 bg-border rounded-full overflow-hidden border border-border/40">
                <div 
                  className="h-full bg-gradient-to-r from-accent-teal to-accent-purple"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Search Button */}
          <button
            onClick={openSearch}
            className="p-2 text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2 text-sm border border-border-subtle rounded-xl bg-bg-surface/20 hover:bg-bg-surface/40 px-3 cursor-pointer"
            aria-label="Open search (Ctrl+K)"
          >
            <Search className="w-4 h-4" />
            <span className="hidden lg:inline text-xs opacity-50">Ctrl+K</span>
          </button>

          {/* Streak Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent-amber/15 border border-accent-amber/30 text-accent-amber text-xs font-bold font-mono">
            <Flame className="w-4 h-4 fill-current animate-pulse text-accent-amber" />
            <span>{streak}d</span>
          </div>

          <DarkModeToggle />

          {user ? (
            <button
              onClick={() => router.push('/dashboard')}
              className="w-10 h-10 rounded-xl bg-gradient-to-tr from-accent-teal to-accent-purple flex items-center justify-center text-white font-bold text-sm hover:ring-2 hover:ring-accent-teal/50 transition-all cursor-pointer"
              aria-label="Go to Dashboard"
            >
              {user.displayName?.[0]?.toUpperCase() || <User className="w-5 h-5" />}
            </button>
          ) : (
            <Button variant="primary" size="sm" onClick={() => openModal('login')} className="rounded-xl px-5 font-bold">
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <DarkModeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-text-primary rounded-lg hover:bg-bg-surface transition-colors"
            style={{ WebkitTapHighlightColor: 'transparent' }}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 bg-bg-base/98 backdrop-blur-xl z-40 md:hidden transition-transform duration-300 transform overflow-y-auto ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
        style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="flex flex-col p-6 pt-20 gap-2 min-h-full">
          {/* Nav Links */}
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                style={{ WebkitTapHighlightColor: 'transparent' }}
                className={`flex items-center px-4 py-4 rounded-2xl text-xl font-bold transition-colors ${
                  pathname === link.href
                    ? 'text-accent-teal bg-accent-teal/5'
                    : 'text-text-primary hover:bg-bg-surface'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Subjects */}
          <div className="mt-4 border-t border-border pt-4">
            <span className="text-[11px] font-bold uppercase tracking-widest text-text-secondary px-4 block mb-2">Subjects</span>
            <div className="grid grid-cols-2 gap-2">
              {subjects.map((sub) => {
                const SubIcon = sub.icon as any;
                return (
                  <Link
                    key={sub.id}
                    href={`/learn/${sub.slug}`}
                    onClick={() => setIsOpen(false)}
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                    className="flex items-center gap-2 p-3 rounded-xl hover:bg-bg-surface border border-border/40 group transition-colors"
                  >
                    <span className="p-1.5 rounded-lg bg-bg-elevated border border-border-subtle text-text-secondary group-hover:text-accent-teal transition-colors shrink-0">
                      <SubIcon className="w-3.5 h-3.5" />
                    </span>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-text-primary truncate block">{sub.name}</span>
                      <span className="text-[10px] text-text-secondary">{sub.topics.length} topics</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Search */}
          <button
            onClick={() => { setIsOpen(false); openSearch(); }}
            style={{ WebkitTapHighlightColor: 'transparent' }}
            className="flex items-center gap-3 px-4 py-4 rounded-2xl text-text-secondary hover:bg-bg-surface transition-colors mt-2"
          >
            <Search className="w-5 h-5" />
            <span className="text-lg font-bold">Search Topics</span>
          </button>

          {/* Footer Actions */}
          <div className="mt-auto pt-6 border-t border-border flex flex-col gap-4">
            {/* Streak + Progress */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-accent-amber">
                <Flame className="w-5 h-5 fill-current" />
                <span className="text-lg font-bold">{streak} Day Streak</span>
              </div>
              {completedTopics.length > 0 && (
                <span className="text-sm font-mono text-text-secondary">{progressPercent}% done</span>
              )}
            </div>
            {completedTopics.length > 0 && (
              <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-accent-teal to-accent-purple transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            )}
            {user ? (
              <button
                className="w-full py-4 rounded-2xl bg-bg-surface border border-border font-bold text-text-primary"
                onClick={() => { setIsOpen(false); router.push('/dashboard'); }}
              >
                Go to Dashboard
              </button>
            ) : (
              <button
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-accent-teal to-accent-purple font-bold text-text-inverse border-none"
                onClick={() => { setIsOpen(false); openModal('register'); }}
              >
                Sign In / Register
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

