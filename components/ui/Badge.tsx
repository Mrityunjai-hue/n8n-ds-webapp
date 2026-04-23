import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'teal' | 'amber' | 'blue' | 'gray' | 'red' | 'green';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'gray', className = '' }) => {
  const variants = {
    teal: 'bg-accent-teal/10 text-accent-teal border-accent-teal/20',
    amber: 'bg-accent-amber/10 text-accent-amber border-accent-amber/20',
    blue: 'bg-accent-blue/10 text-accent-blue border-accent-blue/20',
    gray: 'bg-text-secondary/10 text-text-secondary border-text-secondary/20',
    red: 'bg-danger/10 text-danger border-danger/20',
    green: 'bg-success/10 text-success border-success/20',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
