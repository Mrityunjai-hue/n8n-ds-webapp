import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hoverable = true }) => {
  return (
    <div className={`
      bg-bg-surface border border-border rounded-card p-6
      ${hoverable ? 'card-hover cursor-pointer' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};
