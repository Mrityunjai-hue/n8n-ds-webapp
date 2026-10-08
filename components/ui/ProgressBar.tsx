import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
  color?: string;
  size?: 'sm' | 'md';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  color = 'bg-[var(--yellow)]',
  size = 'sm' 
}) => {
  return (
    <div className={`w-full bg-[var(--canvas-sunken)] border border-[var(--canvas-border)] rounded-[4px] overflow-hidden ${size === 'sm' ? 'h-[4px]' : 'h-3'}`}>
      <div 
        className={`h-full ${color} rounded-[2px]`}
        style={{ 
          width: `${Math.min(100, Math.max(0, progress))}%`,
          transition: 'width 0.4s cubic-bezier(0.23, 1, 0.32, 1)'
        }}
      />
    </div>
  );
};
