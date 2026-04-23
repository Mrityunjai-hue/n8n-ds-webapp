'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Cpu } from 'lucide-react';

interface ComponentItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface ComponentsBreakdownProps {
  items: ComponentItem[];
}

export const ComponentsBreakdown: React.FC<ComponentsBreakdownProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div 
          key={index}
          className={`
            border rounded-xl overflow-hidden transition-all duration-300
            ${openIndex === index ? 'border-accent-teal/50 bg-accent-teal/5 shadow-[0_0_20px_rgba(0,201,167,0.05)]' : 'border-border bg-bg-surface hover:border-text-secondary/30'}
          `}
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full p-5 flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-4">
              <div className={`
                p-2 rounded-lg border
                ${openIndex === index ? 'border-accent-teal/30 bg-accent-teal/10 text-accent-teal' : 'border-border bg-bg-primary text-text-secondary'}
              `}>
                <Cpu className="w-5 h-5" />
              </div>
              <span className={`font-bold transition-colors ${openIndex === index ? 'text-text-primary' : 'text-text-secondary'}`}>
                {item.title}
              </span>
            </div>
            {openIndex === index ? (
              <ChevronUp className="w-5 h-5 text-accent-teal" />
            ) : (
              <ChevronDown className="w-5 h-5 text-text-secondary" />
            )}
          </button>
          
          <div className={`
            overflow-hidden transition-all duration-300
            ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
          `}>
            <div className="p-5 pt-0 text-sm leading-relaxed text-text-secondary border-t border-accent-teal/10">
              {item.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
