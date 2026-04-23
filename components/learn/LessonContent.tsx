import React from 'react';
import { Info, Lightbulb, AlertTriangle, ListChecks } from 'lucide-react';

export const ContentSection: React.FC<{ title: string, children: React.ReactNode, icon?: React.ReactNode }> = ({ title, children, icon }) => (
  <div className="space-y-6">
    <div className="prose prose-invert prose-slate max-w-none leading-relaxed text-text-secondary">
      {children}
    </div>
  </div>
);

export const ProTip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="p-6 bg-accent-amber/5 border border-accent-amber/20 rounded-xl flex gap-4">
    <Lightbulb className="w-6 h-6 text-accent-amber shrink-0" />
    <div className="text-sm text-text-secondary leading-relaxed italic">
      <span className="font-bold text-accent-amber block mb-1 uppercase tracking-widest text-[10px]">Pro Tip</span>
      {children}
    </div>
  </div>
);

export const Warning: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="p-6 bg-danger/5 border border-danger/20 rounded-xl flex gap-4">
    <AlertTriangle className="w-6 h-6 text-danger shrink-0" />
    <div className="text-sm text-text-secondary leading-relaxed">
      <span className="font-bold text-danger block mb-1 uppercase tracking-widest text-[10px]">Common Mistake</span>
      {children}
    </div>
  </div>
);

export const KeyPoints: React.FC<{ points: string[] }> = ({ points }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {points.map((point, i) => (
      <div key={i} className="p-4 bg-bg-surface border border-border rounded-xl flex gap-3 items-start">
        <div className="mt-1">
          <ListChecks className="w-4 h-4 text-accent-teal" />
        </div>
        <span className="text-sm text-text-secondary">{point}</span>
      </div>
    ))}
  </div>
);
