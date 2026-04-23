'use client';

import React from 'react';
import { Baby, GraduationCap } from 'lucide-react';

interface ELI5ToggleProps {
  isELI5: boolean;
  setIsELI5: (val: boolean) => void;
}

export const ELI5Toggle: React.FC<ELI5ToggleProps> = ({ isELI5, setIsELI5 }) => {
  return (
    <div className="flex items-center bg-bg-surface border border-border p-1 rounded-full">
      <button 
        onClick={() => setIsELI5(false)}
        className={`
          flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all
          ${!isELI5 ? 'bg-bg-elevated text-text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'}
        `}
      >
        <GraduationCap className="w-3 h-3" />
        Professional
      </button>
      <button 
        onClick={() => setIsELI5(true)}
        className={`
          flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all
          ${isELI5 ? 'bg-accent-teal text-bg-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'}
        `}
      >
        <Baby className="w-3 h-3" />
        ELI5
      </button>
    </div>
  );
};
