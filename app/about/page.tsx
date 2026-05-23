'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Heart, 
  Code, 
  Users, 
  Zap, 
  Shield, 
  Globe, 
  Cpu, 
  Database,
  Layout,
  Terminal,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AboutPage() {
  const techStack = [
    { name: 'Next.js 14', icon: Layout, color: 'text-white' },
    { name: 'Tailwind CSS', icon: Zap, color: 'text-accent-blue' },
    { name: 'TypeScript', icon: Code, color: 'text-accent-blue' },
    { name: 'Pyodide', icon: Terminal, color: 'text-accent-amber' },
    { name: 'SQL.js', icon: Database, color: 'text-accent-teal' },
    { name: 'Monaco Editor', icon: Cpu, color: 'text-accent-teal' },
    { name: 'Firebase', icon: Shield, color: 'text-accent-amber' },
    { name: 'Lucide Icons', icon: Info, color: 'text-accent-teal' },
  ];

  return (
    <div className="min-h-screen">
      {/* ── Hero Section ────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 overflow-hidden border-b border-border bg-bg-secondary">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-teal/10 border border-accent-teal/20 text-accent-teal text-sm font-bold mb-8">
            <Heart className="w-4 h-4 fill-current" />
            Built for the Community
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight">
            Democratizing <span className="text-accent-teal">Data Science</span> Education.
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            The N8N Data Science Learning Hub is a free, open-source platform designed to take students 
            from fundamentals to building production-ready AI systems.
          </p>
        </div>
      </section>

      {/* ── Our Mission ──────────────────────────────────────────── */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-display font-bold mb-6">Our Mission</h2>
            <div className="space-y-6 text-text-secondary leading-relaxed text-lg">
              <p>
                Data Science shouldn&apos;t be gatekept by expensive bootcamps or disconnected tutorials. 
                We believe in a <strong>structured, visual, and interactive</strong> approach to learning.
              </p>
              <p>
                Every lesson in our hub is built with the goal of making complex concepts intuitive. 
                Whether it&apos;s the math behind Self-Attention or the logic of a complex SQL JOIN, 
                we use interactive labs and visual diagrams to bridge the gap between theory and practice.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-bg-surface border border-border rounded-xl">
                  <Shield className="w-5 h-5 text-accent-teal" />
                  <span className="text-sm font-bold">Free Forever</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-bg-surface border border-border rounded-xl">
                  <Globe className="w-5 h-5 text-accent-blue" />
                  <span className="text-sm font-bold">Open Source</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-bg-surface border border-border rounded-xl">
                  <Users className="w-5 h-5 text-accent-amber" />
                  <span className="text-sm font-bold">Community Driven</span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-square bg-accent-teal/10 rounded-3xl border border-accent-teal/20 flex items-center justify-center">
                <Zap className="w-12 h-12 text-accent-teal" />
              </div>
              <div className="aspect-[4/3] bg-bg-surface rounded-3xl border border-border flex items-center justify-center p-8 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-text-secondary">Interactive Labs</p>
              </div>
            </div>
            <div className="space-y-4 pt-12">
              <div className="aspect-[4/3] bg-bg-surface rounded-3xl border border-border flex items-center justify-center p-8 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-text-secondary">Visual Diagrams</p>
              </div>
              <div className="aspect-square bg-accent-blue/10 rounded-3xl border border-accent-blue/20 flex items-center justify-center">
                <Zap className="w-12 h-12 text-accent-blue" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Technology Stack ────────────────────────────────────── */}
      <section className="py-24 bg-bg-secondary border-y border-border overflow-hidden">
        <div className="container mx-auto px-6 text-center mb-16">
          <h2 className="text-3xl font-display font-bold mb-4">The Tech Stack</h2>
          <p className="text-text-secondary">Powered by modern open-source technologies.</p>
        </div>
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {techStack.map((tech) => (
            <div 
              key={tech.name}
              className="p-6 bg-bg-primary border border-border rounded-2xl flex flex-col items-center gap-4 group hover:border-accent-teal transition-all hover:-translate-y-1"
            >
              <div className={`p-4 rounded-xl bg-bg-surface group-hover:bg-accent-teal/10 transition-colors`}>
                <tech.icon className={`w-8 h-8 ${tech.color}`} />
              </div>
              <span className="text-sm font-bold">{tech.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contribution ────────────────────────────────────────── */}
      <section className="py-24 container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="w-16 h-16 bg-accent-teal/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Code className="w-8 h-8 text-accent-teal" />
          </div>
          <h2 className="text-4xl font-display font-bold mb-6">Open Source at Heart</h2>
          <p className="text-lg text-text-secondary mb-12">
            This project is part of the N8N Data Science Community. We welcome contributions from everyone — 
            whether you&apos;re fixing a bug, adding a new lesson, or improving documentation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="https://github.com" target="_blank">
              <Button size="lg" className="px-10 gap-3">
                <Code className="w-5 h-5" />
                View on GitHub
              </Button>
            </Link>
            <Link href="https://discord.com" target="_blank">
              <Button variant="secondary" size="lg" className="px-10 gap-3">
                <Users className="w-5 h-5" />
                Join Community
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer Credits ──────────────────────────────────────── */}
      <footer className="py-12 border-t border-border bg-bg-secondary">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 text-text-secondary text-sm font-bold mb-4">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-danger fill-current" />
            <span>by N8N Data Science Community</span>
          </div>
          <p className="text-xs text-text-secondary opacity-50">
            &copy; {new Date().getFullYear()} N8N DS Hub. Licensed under MIT.
          </p>
        </div>
      </footer>
    </div>
  );
}
