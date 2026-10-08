'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  FlaskConical, 
  Clock, 
  ListChecks, 
  Database,
  ArrowRight,
  X,
  Copy,
  Check,
  Wrench,
  Sparkles
} from 'lucide-react';
import { PROJECTS, ProjectData, ProjectStep } from '@/lib/content/projectsLabData';
import { Button } from '@/components/ui/Button';

// Utility for copy to clipboard
const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy', error);
    }
  };

  return { isCopied, copy };
};

// Modal Component
const ProjectModal = ({ project, onClose }: { project: ProjectData, onClose: () => void }) => {
  const { isCopied: isPromptCopied, copy: copyPrompt } = useCopyToClipboard();

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-[680px] max-h-[90vh] bg-bg-primary border border-border/60 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-bg-surface hover:bg-bg-hover text-text-secondary hover:text-text-primary z-10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto overflow-x-hidden p-6 sm:p-8 space-y-10 custom-scrollbar">
          
          {/* Header */}
          <div className="space-y-4 pr-8">
            <div className="flex items-center gap-4 mb-2">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${project.iconBg}`}>
                {project.icon}
              </div>
              <div className="flex flex-wrap gap-2">
                <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-bg-surface border border-border/50 ${project.difficulty === 'beginner' ? 'text-green-500' : project.difficulty === 'advanced' ? 'text-purple-500' : 'text-amber-500'}`}>
                  {project.difficulty}
                </span>
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-bg-surface border border-border/50 text-text-primary">
                  {project.domain}
                </span>
              </div>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-display font-bold leading-tight">{project.title}</h2>
            <p className="text-text-secondary text-base">{project.tagline}</p>
            
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-text-muted mt-2 pt-2 border-t border-border/30">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-accent-teal" /> {project.duration}</span>
              <span className="flex items-center gap-1.5"><Database className="w-4 h-4 text-accent-teal" /> {project.dataset.split('—')[0].trim()}</span>
            </div>
          </div>

          {/* Section 1: Why this matters */}
          <section>
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent-amber" /> Why this project matters
            </h3>
            <div className="p-5 rounded-r-xl border-l-4 border-l-blue-500 bg-blue-500/5 text-sm text-text-secondary leading-relaxed">
              {project.realWorld}
            </div>
          </section>

          {/* Section 2: Where to do it */}
          <section>
            <h3 className="text-lg font-bold mb-4">Where to build it</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-bg-surface border border-border/40">
                <div className="text-[10px] font-bold uppercase text-text-muted mb-1">Platform</div>
                <div className="text-sm font-medium">{project.where.platform}</div>
              </div>
              <div className="p-4 rounded-xl bg-bg-surface border border-border/40">
                <div className="text-[10px] font-bold uppercase text-text-muted mb-1">Dataset Source</div>
                <div className="text-sm font-medium break-words">{project.where.dataset}</div>
              </div>
              <div className="p-4 rounded-xl bg-bg-surface border border-border/40">
                <div className="text-[10px] font-bold uppercase text-text-muted mb-1">Environment</div>
                <div className="text-sm font-medium">{project.where.environment}</div>
              </div>
              <div className="p-4 rounded-xl bg-bg-surface border border-border/40">
                <div className="text-[10px] font-bold uppercase text-text-muted mb-1">Data Storage</div>
                <div className="text-sm font-medium">{project.where.storage}</div>
              </div>
            </div>
          </section>

          {/* Section 3: Step-by-step guide */}
          <section>
            <h3 className="text-lg font-bold mb-6">Step-by-step guide</h3>
            <div className="space-y-8">
              {project.steps.map((step, idx) => (
                <div key={idx} className="relative pl-8 sm:pl-10">
                  {/* Step Number Circle */}
                  <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-accent-teal text-white flex items-center justify-center text-xs font-bold shadow-md shadow-accent-teal/20">
                    {idx + 1}
                  </div>
                  
                  {/* Connector Line (except last) */}
                  {idx !== project.steps.length - 1 && (
                    <div className="absolute left-3 top-8 bottom-[-2rem] w-[2px] bg-border/40" />
                  )}
                  
                  <h4 className="text-base font-bold text-text-primary mb-2">{step.title}</h4>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">{step.desc}</p>
                  
                  <CodeBlock code={step.code} />
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Tools & libraries */}
          <section>
            <h3 className="text-lg font-bold mb-4">Free Tools & Libraries Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool, idx) => (
                <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-bg-surface border border-border/60 rounded-full text-xs font-medium text-text-primary">
                  <Wrench className="w-3 h-3 text-text-muted" /> {tool}
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: What to deliver */}
          <section>
            <h3 className="text-lg font-bold mb-4">Required Deliverables</h3>
            <ul className="space-y-3 bg-bg-surface/50 border border-border/40 rounded-xl p-5">
              {project.deliverables.map((item, idx) => {
                const [boldPart, ...rest] = item.split('—');
                return (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-text-secondary leading-relaxed">
                      <strong className="text-text-primary">{boldPart.trim()}</strong>
                      {rest.length > 0 && <span className="text-text-muted"> — {rest.join('—').trim()}</span>}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-border/40 bg-bg-elevated/30 flex flex-col sm:flex-row items-center gap-4 justify-end shrink-0">
          <Button 
            variant="secondary" 
            className="w-full sm:w-auto border-accent-teal text-accent-teal hover:bg-accent-teal/10 min-w-[160px]"
            onClick={() => {
              const prompt = `I am building a data science project: ${project.title}. 
The goal is: ${project.tagline}. 
I will be using ${project.tools.join(', ')}. 
Can you act as my senior data science mentor and guide me through the implementation?`;
              copyPrompt(prompt);
            }}
          >
            {isPromptCopied ? <><Check className="w-4 h-4 mr-2" /> Copied!</> : <>Get AI prompt &rarr;</>}
          </Button>
          <Button 
            className="w-full sm:w-auto bg-accent-teal text-white border-none shadow-lg shadow-accent-teal/20"
            onClick={() => window.open(project.datasetUrl, '_blank')}
          >
            Start this project &rarr;
          </Button>
        </div>

      </div>
    </div>
  );
};

// Code Block Component with Copy functionality
const CodeBlock = ({ code }: { code: string }) => {
  const { isCopied, copy } = useCopyToClipboard();

  return (
    <div className="relative group rounded-xl overflow-hidden bg-[var(--canvas-sunken)] dark:bg-[#12082a] border-2 border-[var(--canvas-border)] font-mono text-[13px] leading-relaxed doodle-border">
      <div className="flex items-center justify-between px-4 py-2 bg-[var(--canvas-raised)] border-b border-[var(--canvas-border)]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--red)] border border-black/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--yellow)] border border-black/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--green)] border border-black/10" />
        </div>
        <button
          onClick={() => copy(code)}
          className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-[var(--ink-3)] hover:text-[var(--ink)] transition-colors cursor-pointer"
        >
          {isCopied ? <><Check className="w-3 h-3 text-[var(--green)]" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
        </button>
      </div>
      <div className="p-4 overflow-x-auto text-[var(--ink)] whitespace-pre font-mono">
        {code}
      </div>
    </div>
  );
};

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All Projects');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const FILTERS = [
    'All Projects', 'Beginner', 'Intermediate', 'Advanced', 
    'Finance', 'Health', 'NLP', 'SQL', 'MLOps', 'Analytics'
  ];

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All Projects') return PROJECTS;
    return PROJECTS.filter(p => 
      p.filters.includes(activeFilter.toLowerCase()) || 
      p.difficulty.toLowerCase() === activeFilter.toLowerCase()
    );
  }, [activeFilter]);

  return (
    <div className="min-h-screen pb-24 doodle-canvas">
      {/* ── Page Header ────────────────────────────────────────── */}
      <section className="pt-28 pb-12 bg-[var(--canvas-raised)] border-b border-[var(--canvas-border)] relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[var(--blue-tint)] text-[var(--blue)] border border-[var(--canvas-border)] flex items-center justify-center shadow-md">
              <FlaskConical className="w-6 h-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--ink)]">Projects Lab</h1>
          </div>
          <p className="text-[var(--ink-2)] max-w-3xl text-base md:text-lg leading-relaxed font-body">
            Industry-grade projects modelled on real problems solved at companies like Flipkart, Apollo Hospitals, Jio, and Swiggy. Each project tells you what to build, where to build it, which free tools to use, and exactly how to do it.
          </p>
        </div>
      </section>

      {/* ── Stats Row ──────────────────────────────────────────── */}
      <section className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[var(--canvas-raised)] border-2 border-[var(--canvas-border)] rounded-2xl p-6 text-center doodle-card shadow-[var(--shadow-sm)]">
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--ink-3)] font-mono mb-2">Total Projects</div>
            <div className="text-4xl font-display font-bold text-[var(--ink)]">8</div>
          </div>
          <div className="bg-[var(--canvas-raised)] border-2 border-[var(--canvas-border)] rounded-2xl p-6 text-center doodle-card shadow-[var(--shadow-sm)]">
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--ink-3)] font-mono mb-2">Domains Covered</div>
            <div className="text-4xl font-display font-bold text-[var(--green)]">6</div>
          </div>
          <div className="bg-[var(--canvas-raised)] border-2 border-[var(--canvas-border)] rounded-2xl p-6 text-center doodle-card shadow-[var(--shadow-sm)]">
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--ink-3)] font-mono mb-2">Skills Taught</div>
            <div className="text-4xl font-display font-bold text-[var(--blue)]">18+</div>
          </div>
          <div className="bg-[var(--canvas-raised)] border-2 border-[var(--canvas-border)] rounded-2xl p-6 text-center doodle-card shadow-[var(--shadow-sm)]">
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--ink-3)] font-mono mb-2">Avg. Duration</div>
            <div className="text-3xl font-display font-bold text-[var(--orange)] mt-1">3–5 Days</div>
          </div>
        </div>
      </section>

      {/* ── Filter Bar ─────────────────────────────────────────── */}
      <section className="container mx-auto px-6 mb-10">
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all duration-200 border
                ${activeFilter === filter 
                  ? 'bg-[var(--yellow)] border-black/20 text-[#111111] shadow-sm' 
                  : 'bg-[var(--canvas-raised)] border-[var(--canvas-border)] text-[var(--ink-2)] hover:border-[var(--blue)] hover:text-[var(--ink)]'
                }
              `}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* ── Project Cards Grid ─────────────────────────────────── */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`group cursor-pointer bg-[var(--canvas-raised)] rounded-2xl p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden border-2 border-[var(--canvas-border)] hover:border-[var(--blue)] doodle-card shadow-[var(--shadow-sm)]
                ${project.featured ? 'border-[var(--blue)]' : ''}
              `}
            >
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-0 right-0 bg-[var(--yellow)] text-[#111111] text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-xl z-10 font-mono">
                  Featured
                </div>
              )}

              {/* Card Top Row */}
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0 ${project.iconBg}`}>
                  {project.icon}
                </div>
                <div className="flex flex-col gap-1 items-start">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider font-mono border
                    ${project.difficulty === 'beginner' 
                      ? 'text-emerald-800 dark:text-green-400 bg-emerald-500/15 border-emerald-600/30' 
                      : project.difficulty === 'advanced' 
                        ? 'text-purple-800 dark:text-purple-400 bg-purple-500/15 border-purple-600/30' 
                        : 'text-amber-900 dark:text-amber-400 bg-amber-500/15 border-amber-600/30'
                    }`}
                  >
                    {project.difficulty}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider font-mono bg-[var(--canvas-sunken)] border border-[var(--canvas-border)] text-[var(--ink-2)]">
                    {project.domain}
                  </span>
                </div>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-xl font-bold text-[var(--ink)] group-hover:text-[var(--blue)] transition-colors mb-2 line-clamp-2 font-heading">
                {project.title}
              </h3>
              <p className="text-sm text-[var(--ink-2)] line-clamp-2 flex-grow mb-5 font-body">
                {project.tagline}
              </p>

              {/* Skill Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.skills.slice(0, 5).map((skill, idx) => (
                  <span key={idx} className="px-2 py-1 bg-[var(--canvas-sunken)] border border-[var(--canvas-border)] rounded text-[10px] text-[var(--ink-2)] font-mono font-medium">
                    {skill}
                  </span>
                ))}
                {project.skills.length > 5 && (
                  <span className="px-2 py-1 bg-[var(--canvas-sunken)] border border-[var(--canvas-border)] rounded text-[10px] text-[var(--ink-3)] font-mono font-bold">
                    +{project.skills.length - 5}
                  </span>
                )}
              </div>

              {/* Bottom Meta Row */}
              <div className="flex items-center justify-between pt-4 border-t border-[var(--canvas-border)] mt-auto font-mono">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[var(--ink-3)]" title="Estimated Duration">
                    <Clock className="w-3.5 h-3.5" /> {project.duration}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[var(--ink-3)]" title="Implementation Steps">
                    <ListChecks className="w-3.5 h-3.5" /> {project.steps.length} Steps
                  </div>
                </div>
                
                <div className="text-xs font-bold text-[var(--blue)] flex items-center gap-1 group-hover:gap-2 transition-all">
                  View guide <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

            </div>
          ))}

          {filteredProjects.length === 0 && (
            <div className="col-span-full py-20 text-center text-[var(--ink-3)] font-body">
              No projects found for this filter. Try selecting "All Projects".
            </div>
          )}
        </div>
      </section>

      {/* ── Modal Portal ───────────────────────────────────────── */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}

    </div>
  );
}
