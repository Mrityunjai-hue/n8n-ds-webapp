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
    <div className={`bg-bg-elevated animate-pulse ${variants[variant]} ${className}`} />
  );
};

export const CardSkeleton = () => (
  <div className="p-6 border border-border rounded-modal bg-bg-surface space-y-4">
    <div className="flex items-center gap-4">
      <Skeleton className="w-12 h-12 rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="w-32 h-4" />
        <Skeleton className="w-24 h-3" />
      </div>
    </div>
    <div className="space-y-2">
      <Skeleton className="w-full h-3" />
      <Skeleton className="w-full h-3" />
      <Skeleton className="w-2/3 h-3" />
    </div>
  </div>
);

export const QuestionSkeleton = () => (
  <div className="p-6 border border-border rounded-modal bg-bg-surface space-y-4">
    <div className="flex justify-between">
      <div className="space-y-2">
        <Skeleton className="w-48 h-3" />
        <Skeleton className="w-64 h-5" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="w-16 h-6 rounded-full" />
        <Skeleton className="w-16 h-6 rounded-full" />
      </div>
    </div>
    <Skeleton className="w-full h-12 rounded-xl" />
  </div>
);
