import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hoverable = true }) => {
  return (
    <div className={`
      bg-bg-surface border border-[rgba(255,255,255,0.055)] rounded-[10px] p-6
      transition-all duration-200 ease-out
      ${hoverable ? 'hover:bg-bg-hover hover:border-[rgba(255,255,255,0.10)] cursor-pointer hover:scale-[1.01] hover:shadow-2xl' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};
