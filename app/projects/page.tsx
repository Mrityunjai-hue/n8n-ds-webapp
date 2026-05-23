'use client';

import React from 'react';
import { 
  Play, 
  ArrowUpRight, 
  Code, 
  Database, 
  BrainCircuit, 
  BarChart3,
  Terminal,
  Bot
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

const PROJECTS = [
  {
    id: 'sql-analytics',
    title: 'E-commerce SQL Analytics',
    description: 'Build a complex database schema for an e-commerce platform and write advanced CTEs to analyze customer lifetime value.',
    difficulty: 'Intermediate',
    subject: 'SQL',
    icon: Database,
    color: 'text-accent-teal',
    bg: 'bg-accent-teal/10',
  },
  {
    id: 'titanic-ml',
    title: 'Titanic Survival Predictor',
    description: 'The classic ML project. Clean the Titanic dataset using Pandas and build a Logistic Regression model to predict survivors.',
    difficulty: 'Beginner',
    subject: 'ML Basics',
    icon: BrainCircuit,
    color: 'text-accent-blue',
    bg: 'bg-accent-blue/10',
  },
  {
    id: 'agentic-researcher',
    title: 'Autonomous Research Agent',
    description: 'Build an AI Agent using LangChain and OpenAI that can browse the web, summarize papers, and write reports.',
    difficulty: 'Advanced',
    subject: 'Agentic AI',
    icon: Bot,
    color: 'text-accent-amber',
    bg: 'bg-accent-amber/10',
  },
  {
    id: 'crypto-dashboard',
    title: 'Real-time Crypto Dashboard',
    description: 'Fetch live cryptocurrency prices using Python APIs and visualize them with Matplotlib and Streamlit.',
    difficulty: 'Intermediate',
    subject: 'Data Vis',
    icon: BarChart3,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
  }
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pb-20">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="pt-32 pb-16 bg-bg-secondary border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <Play className="w-6 h-6 text-accent-teal" />
            <span className="text-xs font-bold uppercase tracking-widest text-accent-teal">Hands-on Labs</span>
          </div>
          <h1 className="text-5xl font-display font-bold mb-6">Real-world <span className="text-accent-teal">Projects</span></h1>
          <p className="text-text-secondary max-w-2xl text-lg">
            Theory is good, but building is better. Apply what you&apos;ve learned in our curriculum to 
            end-to-end data science projects.
          </p>
        </div>
      </section>

      {/* ── Project Grid ────────────────────────────────────────── */}
      <section className="py-20 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project) => (
            <div 
              key={project.id}
              className="p-8 bg-bg-surface border border-border rounded-3xl group hover:border-accent-teal transition-all hover:-translate-y-1 flex flex-col"
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`p-4 rounded-2xl ${project.bg}`}>
                  <project.icon className={`w-8 h-8 ${project.color}`} />
                </div>
                <div className="px-3 py-1 rounded-full bg-bg-primary border border-border text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                  {project.difficulty}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-accent-teal transition-colors">{project.title}</h3>
              <p className="text-text-secondary mb-8 flex-grow leading-relaxed">
                {project.description}
              </p>
              <div className="flex items-center justify-between pt-6 border-t border-border/50">
                <span className="text-sm font-bold text-text-primary">{project.subject}</span>
                <Link href={`/learn/${project.subject === 'SQL' ? 'sql' : project.subject === 'ML Basics' ? 'ml-basics' : project.subject === 'Agentic AI' ? 'agentic-ai' : 'visualization'}`}>
                  <Button variant="secondary" size="sm" className="gap-2">
                    Start Lab <ArrowUpRight className="w-3 h-3" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ── Empty State / Call to action ───────────────────────── */}
        <div className="mt-16 p-12 bg-bg-secondary rounded-3xl border border-dashed border-border text-center">
          <Terminal className="w-10 h-10 text-text-secondary mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-bold mb-2">More projects coming soon</h3>
          <p className="text-text-secondary text-sm max-w-md mx-auto mb-8">
            We are constantly adding new end-to-end projects. Have a project idea? Contribute to our open-source repo!
          </p>
          <Link href="https://github.com" target="_blank">
            <Button variant="ghost" className="gap-2">
              <Code className="w-4 h-4" /> Contribute on GitHub
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
