'use client';

import React, { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { PROJECTS, Project, ProjectStep } from '@/lib/content/projects';
import { InteractiveEditor } from '@/components/learn/InteractiveEditor';
import { SqlEditor } from '@/components/learn/SqlEditor';
import { Button } from '@/components/ui/Button';
import { ChevronLeft, ChevronRight, CheckCircle, Database, BrainCircuit, Play } from 'lucide-react';
import Link from 'next/link';

export default function ProjectLabPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  useEffect(() => {
    const found = PROJECTS.find(p => p.id === params.id);
    if (!found) {
      notFound();
    } else {
      setProject(found);
    }
  }, [params.id]);

  if (!project) return null;

  const activeStep = project.steps[activeStepIdx];
  const isLastStep = activeStepIdx === project.steps.length - 1;

  const handleNext = () => {
    if (!isLastStep) setActiveStepIdx(prev => prev + 1);
  };

  const handlePrev = () => {
    if (activeStepIdx > 0) setActiveStepIdx(prev => prev - 1);
  };

  return (
    <div className="min-h-screen bg-bg-secondary pb-20 pt-24">
      {/* ── Top Nav ──────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/projects" className="text-text-secondary hover:text-accent-teal transition-colors flex items-center gap-2 text-sm font-semibold">
            <ChevronLeft className="w-4 h-4" /> Back to Projects
          </Link>
          <span className="text-border">|</span>
          <div className="flex items-center gap-2">
            <project.icon className={`w-5 h-5 ${project.color}`} />
            <h1 className="font-bold text-lg">{project.title}</h1>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm font-bold">
          <span className="text-text-secondary">Step {activeStepIdx + 1} of {project.steps.length}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 xl:grid-cols-12 gap-8 h-[calc(100vh-180px)] min-h-[600px]">
        {/* ── Left Sidebar (Instructions) ─────────────────────────── */}
        <div className="xl:col-span-4 flex flex-col h-full gap-4">
          <div className="bg-bg-surface border border-border rounded-3xl p-6 flex flex-col h-full relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-1 ${project.bg.replace('/10', '')}`} />
            
            {/* Steps Timeline */}
            <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar py-2">
              {project.steps.map((step, idx) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStepIdx(idx)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors
                    ${idx === activeStepIdx ? 'bg-accent-teal text-bg-primary' : 
                      idx < activeStepIdx ? 'bg-success/20 text-success border border-success/30' : 
                      'bg-bg-elevated text-text-secondary border border-border'}
                  `}
                >
                  {idx < activeStepIdx ? <CheckCircle className="w-4 h-4" /> : idx + 1}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar pr-2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-text-primary">{activeStep.title}</h2>
                <div className="prose prose-invert prose-sm text-text-secondary leading-relaxed">
                  <p>{activeStep.instructions}</p>
                </div>
              </div>

              <div className="p-4 bg-accent-amber/10 border border-accent-amber/20 rounded-xl">
                <h4 className="text-xs font-bold uppercase tracking-wider text-accent-amber mb-2">Goal</h4>
                <p className="text-sm text-accent-amber/90 font-mono">Execute the code to complete this step.</p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-6 pt-6 border-t border-border flex items-center justify-between gap-4">
              <Button 
                variant="ghost" 
                onClick={handlePrev}
                disabled={activeStepIdx === 0}
                className="opacity-70 hover:opacity-100 disabled:opacity-30"
              >
                Previous
              </Button>
              <Button 
                variant="primary" 
                onClick={handleNext}
                disabled={isLastStep}
                className="gap-2 bg-gradient-to-r from-accent-teal to-accent-blue border-none shadow-lg shadow-accent-teal/20"
              >
                {isLastStep ? 'Finish Project' : 'Next Step'} <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* ── Right Main Area (Editor) ────────────────────────────── */}
        <div className="xl:col-span-8 flex flex-col h-full rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/5 bg-[#1E1E1E]">
          {project.language === 'python' ? (
             // Key added to force re-mount and reset initialCode when step changes
            <div key={activeStep.id} className="h-full">
               <InteractiveEditor 
                  initialCode={activeStep.starterCode} 
                  hint={activeStep.hint}
               />
            </div>
          ) : (
             <div key={activeStep.id} className="h-full">
                <SqlEditor 
                  initialQuery={activeStep.starterCode}
                  hint={activeStep.hint}
                />
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
