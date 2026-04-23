import React from 'react';

interface BreakdownItem {
  line: string;
  explanation: string;
}

interface LineByLineBreakdownProps {
  items: BreakdownItem[];
}

export const LineByLineBreakdown: React.FC<LineByLineBreakdownProps> = ({ items }) => {
  return (
    <div className="mt-8 space-y-4">
      <h3 className="text-sm font-bold uppercase tracking-widest text-text-secondary mb-4 flex items-center gap-2">
        <div className="w-1.5 h-4 bg-accent-teal rounded-full" />
        Line-by-Line Breakdown
      </h3>
      <div className="border border-border rounded-xl overflow-hidden bg-bg-surface/50">
        {items.map((item, index) => (
          <div 
            key={index} 
            className={`flex flex-col sm:flex-row border-b border-border last:border-0 hover:bg-bg-elevated transition-colors`}
          >
            <div className="p-4 sm:w-1/3 bg-bg-elevated/50 font-mono text-xs text-accent-teal border-b sm:border-b-0 sm:border-r border-border">
              {item.line}
            </div>
            <div className="p-4 sm:w-2/3 text-sm text-text-secondary leading-relaxed">
              {item.explanation}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
