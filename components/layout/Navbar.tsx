'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, Flame } from 'lucide-react';
import { DarkModeToggle } from './DarkModeToggle';
import { Button } from '../ui/Button';

const navLinks = [
  { name: 'Roadmap', href: '/roadmap' },
  { name: 'Projects', href: '/projects' },
  { name: 'Interview', href: '/interview' },
  { name: 'About', href: '/about' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-200 border-b ${
      scrolled ? 'bg-bg-primary/80 backdrop-blur-md border-border py-3' : 'bg-transparent border-transparent py-5'
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-accent-teal flex items-center justify-center text-white font-bold text-xl group-hover:rotate-12 transition-transform">
            N
          </div>
          <span className="font-display font-bold text-xl tracking-tight hidden sm:block">
            N8N <span className="text-accent-teal">DS Hub</span>
          </span>
        </Link>

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
          <button className="p-2 text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2 text-sm border border-border rounded-card bg-bg-surface px-3">
            <Search className="w-4 h-4" />
            <span className="hidden lg:inline text-xs opacity-50">Ctrl+K</span>
          </button>
          
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-amber/10 border border-accent-amber/20 text-accent-amber text-xs font-bold">
            <Flame className="w-4 h-4 fill-current" />
            <span>0</span>
          </div>

          <DarkModeToggle />
          
          <Button variant="primary" size="sm">
            Sign In
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <DarkModeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-text-primary"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 bg-bg-primary z-40 md:hidden transition-transform duration-300 transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col p-8 pt-24 gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-2xl font-bold ${
                pathname === link.href ? 'text-accent-teal' : 'text-text-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="mt-8 pt-8 border-t border-border flex flex-col gap-6">
            <div className="flex items-center gap-4 text-accent-amber">
              <Flame className="w-6 h-6 fill-current" />
              <span className="text-xl font-bold">0 Day Streak</span>
            </div>
            <Button variant="primary" size="lg" className="w-full">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
