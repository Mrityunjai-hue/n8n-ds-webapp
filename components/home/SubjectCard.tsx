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

  // Dynamic color map based on subject slug — keeping per-subject accent variety
  const getSubjectColorStyles = (slug: string) => {
    switch (slug) {
      case 'sql':
        return {
          glow: '0 0 30px rgba(29,91,206,0.12)',
          borderHover: 'var(--blue)',
          badgeColor: 'var(--green)',
          badgeBg: 'var(--green-tint)',
          badgeBorder: 'var(--canvas-border)',
          iconBg: 'var(--green-tint)',
          iconBorder: 'var(--canvas-border)',
          iconColor: 'var(--green)',
          textHover: 'var(--blue)',
          strokeColor: 'var(--green)',
        };
      case 'python':
        return {
          glow: '0 0 30px rgba(29,91,206,0.12)',
          borderHover: 'var(--blue)',
          badgeColor: 'var(--blue)',
          badgeBg: 'var(--blue-tint)',
          badgeBorder: 'var(--canvas-border)',
          iconBg: 'var(--blue-tint)',
          iconBorder: 'var(--canvas-border)',
          iconColor: 'var(--blue)',
          textHover: 'var(--blue)',
          strokeColor: 'var(--blue)',
        };
      case 'power-bi':
        return {
          glow: '0 0 30px rgba(230,106,53,0.12)',
          borderHover: 'var(--orange)',
          badgeColor: 'var(--orange)',
          badgeBg: 'var(--orange-tint)',
          badgeBorder: 'var(--canvas-border)',
          iconBg: 'var(--orange-tint)',
          iconBorder: 'var(--canvas-border)',
          iconColor: 'var(--orange)',
          textHover: 'var(--orange)',
          strokeColor: 'var(--orange)',
        };
      case 'deep-learning':
        return {
          glow: '0 0 30px rgba(211,47,47,0.12)',
          borderHover: 'var(--red)',
          badgeColor: 'var(--red)',
          badgeBg: 'var(--red-tint)',
          badgeBorder: 'var(--canvas-border)',
          iconBg: 'var(--red-tint)',
          iconBorder: 'var(--canvas-border)',
          iconColor: 'var(--red)',
          textHover: 'var(--red)',
          strokeColor: 'var(--red)',
        };
      default:
        return {
          glow: '0 0 30px rgba(29,91,206,0.12)',
          borderHover: 'var(--blue)',
          badgeColor: 'var(--blue)',
          badgeBg: 'var(--blue-tint)',
          badgeBorder: 'var(--canvas-border)',
          iconBg: 'var(--blue-tint)',
          iconBorder: 'var(--canvas-border)',
          iconColor: 'var(--blue)',
          textHover: 'var(--blue)',
          strokeColor: 'var(--blue)',
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
      className="flex flex-col h-full rounded-2xl p-6 relative overflow-hidden transition-all duration-300 group cursor-pointer doodle-card"
      style={{ 
        backgroundColor: 'var(--canvas-raised)', 
        border: '1.5px solid var(--canvas-border)',
      }}
      onMouseEnter={(e) => { 
        e.currentTarget.style.borderColor = style.borderHover;
        e.currentTarget.style.boxShadow = style.glow;
      }}
      onMouseLeave={(e) => { 
        e.currentTarget.style.borderColor = 'var(--canvas-border)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-6">
        <div className="p-3 rounded-2xl border transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: style.iconBg, borderColor: style.iconBorder, color: style.iconColor }}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border font-mono" style={{ color: style.badgeColor, backgroundColor: style.badgeBg, borderColor: style.badgeBorder }}>
          Level {subject.level}
        </div>
      </div>

      {/* Title & Description */}
      <h3 className="text-2xl font-bold mb-2 transition-colors duration-300 font-heading" style={{ color: 'var(--ink)' }}>
        {subject.name}
      </h3>
      
      <p className="text-base mb-6 line-clamp-2 leading-relaxed font-body" style={{ color: 'var(--ink-2)' }}>
        {subject.description}
      </p>

      {/* Top 3 topics list (visual teaser) */}
      <div className="mb-6 space-y-2 opacity-90 group-hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-bold uppercase tracking-wider font-mono" style={{ color: 'var(--ink-3)' }}>Core Curriculum</span>
        <ul className="space-y-1.5">
          {topTopics.map((topic, i) => (
            <li key={i} className="text-xs flex items-center gap-1.5 truncate" style={{ color: 'var(--ink-2)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: style.iconColor }} />
              <span className="truncate font-medium">{topic.title}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Progress & Metadata */}
      <div className="mt-auto space-y-4 pt-4" style={{ borderTop: '1px solid var(--canvas-border)' }}>
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider font-mono" style={{ color: 'var(--ink-3)' }}>
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
        <div className="flex items-center justify-between gap-4 p-3 rounded-xl border" style={{ backgroundColor: 'var(--canvas-sunken)', borderColor: 'var(--canvas-border)' }}>
          <div className="text-xs font-bold font-mono" style={{ color: 'var(--ink-2)' }}>
            {progress > 0 ? 'CONTINUE LEARNING' : 'START MODULE'}
          </div>
          
          <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="18"
                cy="18"
                r="14"
                strokeWidth="3.5"
                fill="transparent"
                style={{ stroke: 'var(--canvas-border)' }}
              />
              <circle
                cx="18"
                cy="18"
                r="14"
                className="transition-all duration-500"
                stroke={style.strokeColor}
                strokeWidth="3.5"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 14}
                strokeDashoffset={2 * Math.PI * 14 * (1 - progress / 100)}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute text-[9px] font-mono font-bold" style={{ color: 'var(--ink)' }}>
              {progress}%
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <Link href={`/learn/${subject.slug}`} className="w-full mt-4">
        <button className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border font-bold text-sm transition-all duration-200 cursor-pointer shadow-[var(--shadow-sm)]`}
          style={progress > 0 
            ? { backgroundColor: 'var(--canvas-raised)', borderColor: 'var(--canvas-border)', color: 'var(--ink)' }
            : { backgroundColor: 'var(--blue)', color: '#ffffff', borderColor: 'var(--blue-dim)' }
          }
        >
          <span>{progress > 0 ? 'Resume Module' : 'Begin Module'}</span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </Link>
    </motion.div>
  );
};

