import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'teal' | 'amber' | 'blue' | 'gray' | 'red' | 'green';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'gray', className = '' }) => {
  const variants = {
    teal: 'bg-emerald-500/15 text-emerald-800 dark:text-[#c8f135] border-emerald-600/30 dark:border-[rgba(200,241,53,0.3)]',
    amber: 'bg-amber-500/15 text-amber-900 dark:text-[#ffb830] border-amber-600/30 dark:border-[rgba(255,184,48,0.3)]',
    blue: 'bg-blue-500/15 text-blue-900 dark:text-[#818cf8] border-blue-600/30 dark:border-[rgba(99,102,241,0.3)]',
    gray: 'bg-[var(--canvas-sunken)] text-[var(--ink-2)] border-[var(--canvas-border)]',
    red: 'bg-rose-500/15 text-rose-900 dark:text-[#ff4060] border-rose-600/30 dark:border-[rgba(255,64,96,0.3)]',
    green: 'bg-green-500/15 text-green-900 dark:text-[#00c9a0] border-green-600/30 dark:border-[rgba(0,201,160,0.3)]',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold border tracking-[0.12em] uppercase font-mono ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
