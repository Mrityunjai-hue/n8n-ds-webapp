'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, BookOpen, Clock, BrainCircuit, Play } from 'lucide-react';
import { getSubjectBySlug } from '@/lib/content';

export default function SubjectPage() {
  const params = useParams();
  const subjectSlug = params.subject as string;
  const subject = getSubjectBySlug(subjectSlug);

  if (!subject) {
    notFound();
  }

  return (
    <div className="min-h-screen pb-20">
      {/* ── Hero Section ────────────────────────────────────────── */}
      <div className="bg-bg-secondary border-b border-border pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-bg-primary border border-border text-accent-teal">
              <subject.icon className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-display font-bold">{subject.name}</h1>
              <p className="text-text-secondary">{subject.description}</p>
            </div>
          </div>
          
          <div className="flex gap-8 border-t border-border/50 pt-8">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-text-secondary" />
              <span className="text-sm font-bold">{subject.topics.length} Topics</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-text-secondary" />
              <span className="text-sm font-bold">{subject.estimatedHours} Hours</span>
            </div>
            <div className="flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-text-secondary" />
              <span className="text-sm font-bold">Level {subject.level}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Topics List ─────────────────────────────────────────── */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-2xl font-display font-bold mb-8">Learning Modules</h2>
        <div className="grid gap-4 max-w-4xl">
          {subject.topics.map((topic, index) => (
            <Link 
              key={topic.id}
              href={`/learn/${subject.slug}/${topic.slug}`}
              className="group p-6 bg-bg-surface border border-border rounded-card flex items-center justify-between hover:border-accent-teal transition-all hover:-translate-y-1"
            >
              <div className="flex items-center gap-6">
                <div className="w-10 h-10 rounded-full bg-bg-primary border border-border flex items-center justify-center font-bold text-text-secondary group-hover:text-accent-teal group-hover:border-accent-teal transition-colors">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{topic.title}</h3>
                  <p className="text-sm text-text-secondary">{topic.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex flex-col items-end mr-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Status</span>
                  <span className="text-xs font-bold text-accent-amber">Ready to start</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-bg-primary border border-border flex items-center justify-center group-hover:bg-accent-teal group-hover:text-bg-primary transition-all">
                  <Play className="w-4 h-4 fill-current" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
