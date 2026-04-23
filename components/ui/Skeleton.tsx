import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'rectangular' | 'circular' | 'text';
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', variant = 'rectangular' }) => {
  const variants = {
    rectangular: 'rounded-sm',
    circular: 'rounded-full',
    text: 'rounded-sm h-4 w-full',
  };

  return (
    <div className={`bg-bg-elevated animate-pulse-slow ${variants[variant]} ${className}`} />
  );
};
