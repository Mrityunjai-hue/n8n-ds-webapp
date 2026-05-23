'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, BookOpen, ChevronRight, Award } from 'lucide-react';
import { SubjectContent } from '@/lib/types/content';
import { motion } from 'framer-motion';

interface SubjectCardProps {
  subject: SubjectContent;
  progress?: number;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({ subject, progress = 0 }) => {
  const Icon = subject.icon as any;

  // Dynamic gradient map based on subject slug
  const getSubjectColorStyles = (slug: string) => {
    switch (slug) {
      case 'sql':
        return {
          glow: 'group-hover:shadow-[0_0_30px_rgba(0,242,254,0.15)]',
          border: 'group-hover:border-accent-teal/50',
          badge: 'text-accent-teal border-accent-teal/20 bg-accent-teal/5',
          iconBg: 'bg-accent-teal/10 border-accent-teal/20 text-accent-teal',
          textHover: 'group-hover:text-accent-teal'
        };
      case 'python':
        return {
          glow: 'group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]',
          border: 'group-hover:border-accent-blue/50',
          badge: 'text-accent-blue border-accent-blue/20 bg-accent-blue/5',
          iconBg: 'bg-accent-blue/10 border-accent-blue/20 text-accent-blue',
          textHover: 'group-hover:text-accent-blue'
        };
      case 'power-bi':
        return {
          glow: 'group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]',
          border: 'group-hover:border-accent-amber/50',
          badge: 'text-accent-amber border-accent-amber/20 bg-accent-amber/5',
          iconBg: 'bg-accent-amber/10 border-accent-amber/20 text-accent-amber',
          textHover: 'group-hover:text-accent-amber'
        };
      case 'deep-learning':
        return {
          glow: 'group-hover:shadow-[0_0_30px_rgba(251,113,133,0.15)]',
          border: 'group-hover:border-accent-rose/50',
          badge: 'text-accent-rose border-accent-rose/20 bg-accent-rose/5',
          iconBg: 'bg-accent-rose/10 border-accent-rose/20 text-accent-rose',
          textHover: 'group-hover:text-accent-rose'
        };
      default:
        return {
          glow: 'group-hover:shadow-[0_0_30px_rgba(167,139,250,0.15)]',
          border: 'group-hover:border-accent-purple/50',
          badge: 'text-accent-purple border-accent-purple/20 bg-accent-purple/5',
          iconBg: 'bg-accent-purple/10 border-accent-purple/20 text-accent-purple',
          textHover: 'group-hover:text-accent-purple'
        };
    }
  };

  const style = getSubjectColorStyles(subject.slug);

  // Take top 3 topics to show on hover
  const topTopics = subject.topics.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className={`flex flex-col h-full bg-bg-surface border border-border-subtle rounded-2xl p-6 relative overflow-hidden transition-all duration-300 group cursor-pointer ${style.border} ${style.glow}`}
    >
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full pointer-events-none" />

      {/* Top row */}
      <div className="flex items-start justify-between mb-6">
        <div className={`p-3 rounded-2xl border transition-all duration-300 group-hover:scale-110 ${style.iconBg}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${style.badge}`}>
          Level {subject.level}
        </div>
      </div>

      {/* Title & Description */}
      <h3 className={`text-xl font-display font-extrabold mb-2 transition-colors duration-300 ${style.textHover} text-text-primary`}>
        {subject.name}
      </h3>
      
      <p className="text-sm text-text-secondary mb-6 line-clamp-2 leading-relaxed">
        {subject.description}
      </p>

      {/* Top 3 topics list (visual teaser) */}
      <div className="mb-6 space-y-2 opacity-80 group-hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">Core Curriculum</span>
        <ul className="space-y-1.5">
          {topTopics.map((topic, i) => (
            <li key={i} className="text-xs text-text-secondary flex items-center gap-1.5 truncate">
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="hover:text-text-primary transition-colors truncate">{topic.title}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Progress & Metadata */}
      <div className="mt-auto space-y-4 pt-4 border-t border-border/40">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-text-secondary">
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{subject.topics.length} Topics</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{subject.estimatedHours}h</span>
          </div>
        </div>

        {/* Circular Progress Ring */}
        <div className="flex items-center justify-between gap-4 bg-bg-primary/20 p-3 rounded-xl border border-border/50">
          <div className="text-xs font-bold text-text-secondary">
            {progress > 0 ? 'CONTINUE LEARNING' : 'START MODULE'}
          </div>
          
          <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="18"
                cy="18"
                r="14"
                className="stroke-border/40"
                strokeWidth="3.5"
                fill="transparent"
              />
              <circle
                cx="18"
                cy="18"
                r="14"
                className={`transition-all duration-500 ${
                  subject.slug === 'sql' ? 'stroke-accent-teal' :
                  subject.slug === 'python' ? 'stroke-accent-blue' :
                  subject.slug === 'power-bi' ? 'stroke-accent-amber' :
                  'stroke-accent-purple'
                }`}
                strokeWidth="3.5"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 14}
                strokeDashoffset={2 * Math.PI * 14 * (1 - progress / 100)}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute text-[9px] font-mono font-bold text-text-primary">
              {progress}%
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <Link href={`/learn/${subject.slug}`} className="w-full mt-4">
        <button className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl border font-bold text-sm transition-all duration-300 cursor-pointer
          ${progress > 0 
            ? 'bg-transparent border-border-subtle text-text-secondary hover:text-text-primary hover:bg-bg-surface' 
            : 'bg-accent-teal text-text-inverse hover:opacity-90 border-transparent shadow-lg shadow-accent-teal/10'
          }`}
        >
          <span>{progress > 0 ? 'Resume Module' : 'Begin Module'}</span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </Link>
    </motion.div>
  );
};

