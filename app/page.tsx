import { HeroSection } from '@/components/home/HeroSection';
import { StatsBar } from '@/components/home/StatsBar';
import { RoadmapGraph } from '@/components/home/RoadmapGraph';

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
    </div>
  );
}
