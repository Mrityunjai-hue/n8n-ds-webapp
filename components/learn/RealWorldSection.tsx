import React from 'react';
import { RealWorldItem } from '@/lib/types/content';
import { Briefcase, Building, Target, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface RealWorldSectionProps {
  items: RealWorldItem[];
}

export const RealWorldSection: React.FC<RealWorldSectionProps> = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-accent-purple/10 border border-accent-purple/20 text-accent-purple">
          <Briefcase className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-text-primary">Real-World Case Studies</h3>
          <p className="text-xs text-text-secondary">How industry leaders leverage this concept in production</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col bg-bg-surface/40 border border-border rounded-2xl p-6 relative overflow-hidden group hover:border-accent-purple/30 transition-all duration-300"
          >
            {/* Background design */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent-purple/5 rounded-bl-full pointer-events-none group-hover:bg-accent-purple/10 transition-colors" />

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-bg-surface border border-border text-text-secondary group-hover:border-accent-purple/20 group-hover:text-accent-purple transition-all">
                <Building className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-accent-purple uppercase tracking-wider block">
                  {item.company}
                </span>
                <h4 className="text-sm font-bold text-text-primary group-hover:text-accent-purple transition-colors">
                  {item.title}
                </h4>
              </div>
            </div>

            <p className="text-sm text-text-secondary leading-relaxed mb-4 flex-grow">
              {item.description}
            </p>

            {item.impact && (
              <div className="pt-4 border-t border-border/40 flex items-start gap-2 text-xs text-accent-teal mt-auto">
                <TrendingUp className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block uppercase tracking-widest text-[9px] text-text-secondary mb-0.5">Business Impact</span>
                  <span className="font-medium text-text-primary">{item.impact}</span>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
