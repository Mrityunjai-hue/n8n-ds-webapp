import React from 'react';
import { BookOpen, Code, MessageSquare, ShieldCheck } from 'lucide-react';

const stats = [
  { label: 'Learning Topics', value: '100+', icon: BookOpen, color: 'text-accent-teal' },
  { label: 'Real Projects', value: '18', icon: Code, color: 'text-accent-blue' },
  { label: 'Interview Qs', value: '500+', icon: MessageSquare, color: 'text-accent-amber' },
  { label: 'Free Forever', value: '₹0', icon: ShieldCheck, color: 'text-success' },
];

export const StatsBar = () => {
  return (
    <section className="py-12 bg-bg-surface border-y border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center group">
              <div className={`mb-4 p-3 rounded-2xl bg-bg-primary border border-border group-hover:scale-110 transition-transform ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-3xl lg:text-4xl font-display font-bold mb-1">
                {stat.value}
              </div>
              <div className="text-xs lg:text-sm font-bold text-text-secondary uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
