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
    <div className="min-h-screen doodle-canvas font-patrick pb-20 pt-24">
      {/* ── Top Nav ──────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/projects" className="text-[var(--ink-3)] hover:text-[var(--blue)] transition-colors flex items-center gap-2 text-sm font-bold">
            <ChevronLeft className="w-4 h-4" /> Back to Projects
          </Link>
          <span className="text-[var(--canvas-border)]">|</span>
          <div className="flex items-center gap-2">
            <project.icon className={`w-5 h-5 ${project.color}`} />
            <h1 className="font-caveat font-extrabold text-2xl text-[var(--ink)]">{project.title}</h1>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm font-mono font-bold text-[var(--ink-3)]">
          <span>Step {activeStepIdx + 1} of {project.steps.length}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 xl:grid-cols-12 gap-8 h-[calc(100vh-180px)] min-h-[600px]">
        {/* ── Left Sidebar (Instructions) ─────────────────────────── */}
        <div className="xl:col-span-4 flex flex-col h-full gap-4">
          <div className="bg-[var(--canvas-raised)] border-2 border-[var(--canvas-border)] rounded-3xl p-6 flex flex-col h-full relative overflow-hidden shadow-[var(--shadow-md)]">
            {/* Steps Timeline */}
            <div className="flex items-center gap-2 mb-6 overflow-x-auto no-scrollbar py-2">
              {project.steps.map((step, idx) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStepIdx(idx)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0 transition-all border-2 cursor-pointer
                    ${idx === activeStepIdx ? 'bg-[var(--yellow)] text-[#111111] border-black/30 shadow-sm scale-105' : 
                      idx < activeStepIdx ? 'bg-[var(--green-tint)] text-[var(--green)] border-[var(--green)]/40' : 
                      'bg-[var(--canvas-sunken)] text-[var(--ink-3)] border-[var(--canvas-border)]'}
                  `}
                >
                  {idx < activeStepIdx ? <CheckCircle className="w-4 h-4" /> : idx + 1}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar pr-2 space-y-6">
              <div>
                <h2 className="text-2xl font-caveat font-extrabold mb-3 text-[var(--ink)]">{activeStep.title}</h2>
                <div className="prose dark:prose-invert prose-sm text-[var(--ink-2)] leading-relaxed font-patrick text-base">
                  <p>{activeStep.instructions}</p>
                </div>
              </div>

              <div className="p-4 bg-[var(--orange-tint)] border-2 border-[var(--orange)]/30 rounded-2xl">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--orange)] mb-1">Goal</h4>
                <p className="text-sm text-[var(--ink-2)] font-mono">Execute the code to complete this step.</p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-6 pt-4 border-t-2 border-[var(--canvas-border)] flex items-center justify-between gap-4">
              <Button 
                variant="ghost" 
                onClick={handlePrev}
                disabled={activeStepIdx === 0}
                className="opacity-80 hover:opacity-100 disabled:opacity-30 font-bold text-[var(--ink)]"
              >
                Previous
              </Button>
              <Button 
                variant="primary" 
                onClick={handleNext}
                disabled={isLastStep}
                className="gap-2 bg-[var(--blue)] hover:bg-[var(--blue-dim)] text-white font-bold border-2 border-black/20 shadow-md"
              >
                {isLastStep ? 'Finish Project' : 'Next Step'} <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* ── Right Main Area (Editor) ────────────────────────────── */}
        <div className="xl:col-span-8 flex flex-col h-full rounded-3xl overflow-hidden shadow-2xl border-2 border-[var(--canvas-border)] bg-[var(--ide-bg)]">
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
