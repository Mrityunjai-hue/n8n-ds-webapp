import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
  color?: string;
  size?: 'sm' | 'md';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  color = 'bg-accent-teal',
  size = 'sm' 
}) => {
  return (
    <div className={`w-full bg-bg-elevated rounded-full overflow-hidden ${size === 'sm' ? 'h-1.5' : 'h-3'}`}>
      <div 
        className={`h-full ${color} transition-all duration-500 ease-out`}
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  );
};
