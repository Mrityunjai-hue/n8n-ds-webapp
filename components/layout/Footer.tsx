import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-bg-surface border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-accent-teal flex items-center justify-center text-white font-bold">
                N
              </div>
              <span className="font-display font-bold text-xl tracking-tight">
                N8N <span className="text-accent-teal">DS Hub</span>
              </span>
            </Link>
            <p className="text-text-secondary max-w-sm mb-6 leading-relaxed">
              A free, professional, student-led learning platform covering the full data science stack. 
              Built with ♾️ for students, by students.
            </p>
            <div className="flex gap-4">
              <div className="px-3 py-1 bg-success/10 text-success text-[10px] font-bold uppercase tracking-wider rounded border border-success/20">
                Free Forever
              </div>
              <div className="px-3 py-1 bg-accent-blue/10 text-accent-blue text-[10px] font-bold uppercase tracking-wider rounded border border-accent-blue/20">
                No Ads
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-text-primary">Platform</h4>
            <ul className="flex flex-col gap-4 text-text-secondary text-sm font-medium">
              <li><Link href="/roadmap" className="hover:text-accent-teal transition-colors">Learning Roadmap</Link></li>
              <li><Link href="/projects" className="hover:text-accent-teal transition-colors">Project Library</Link></li>
              <li><Link href="/interview" className="hover:text-accent-teal transition-colors">Interview Prep</Link></li>
              <li><Link href="/dashboard" className="hover:text-accent-teal transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-text-primary">Community</h4>
            <ul className="flex flex-col gap-4 text-text-secondary text-sm font-medium">
              <li><Link href="/about" className="hover:text-accent-teal transition-colors">Our Story</Link></li>
              <li><Link href="#" className="hover:text-accent-teal transition-colors">Discord</Link></li>
              <li><Link href="#" className="hover:text-accent-teal transition-colors">LinkedIn</Link></li>
              <li><Link href="#" className="hover:text-accent-teal transition-colors">Contribute</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-secondary">
          <p>© {new Date().getFullYear()} N8N Data Science Community. All rights reserved.</p>
          <div className="flex gap-8">
            <span className="text-text-secondary/40 cursor-default">Privacy Policy</span>
            <span className="text-text-secondary/40 cursor-default">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
