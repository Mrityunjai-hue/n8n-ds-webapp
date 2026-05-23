import React from 'react';
import { Construction, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import Link from 'next/link';

export const StayTuned: React.FC = () => {
  return (
    <div className="py-20 px-8 bg-bg-secondary rounded-3xl border border-dashed border-border text-center overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-accent-teal/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-accent-blue/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        <div className="w-16 h-16 bg-bg-surface rounded-2xl border border-border flex items-center justify-center mx-auto mb-6 shadow-sm">
          <Construction className="w-8 h-8 text-accent-amber" />
        </div>
        <h3 className="text-2xl font-display font-bold mb-3 flex items-center justify-center gap-2">
          Knowledge Loading <Sparkles className="w-5 h-5 text-accent-teal animate-pulse" />
        </h3>
        <p className="text-text-secondary max-w-md mx-auto mb-8 leading-relaxed">
          We are currently crafting high-quality interactive content for this module. 
          Stay tuned as we bring deep-dives, visualizations, and interactive labs here soon!
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/roadmap">
            <Button variant="secondary" className="gap-2">
              Back to Roadmap
            </Button>
          </Link>
          <Link href="/interview">
            <Button className="gap-2">
              Practice Interviews <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
