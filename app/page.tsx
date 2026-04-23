import { HeroSection } from '@/components/home/HeroSection';
import { StatsBar } from '@/components/home/StatsBar';
import { RoadmapGraph } from '@/components/home/RoadmapGraph';
import { SubjectGrid } from '@/components/home/SubjectGrid';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <StatsBar />
      
      <section className="py-24 overflow-hidden border-b border-border">
        <div className="container mx-auto px-6 text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-4">
            The Visual <span className="text-accent-teal">Path</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            A structured, step-by-step curriculum to take you from a data novice to an AI architect.
          </p>
        </div>
        <RoadmapGraph />
      </section>

      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-4xl lg:text-5xl font-display font-bold mb-4">
              Explore the <span className="text-accent-teal">Curriculum</span>
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Every subject is broken down into structured topics with live code editors, 
              visual flow diagrams, and targeted interview preparation.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-bg-surface border border-border rounded-full text-xs font-bold uppercase tracking-widest text-text-secondary">
              10 Subjects
            </div>
            <div className="px-4 py-2 bg-bg-surface border border-border rounded-full text-xs font-bold uppercase tracking-widest text-text-secondary">
              100+ Topics
            </div>
          </div>
        </div>

        <SubjectGrid />
      </section>
    </div>
  );
}
