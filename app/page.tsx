import { HeroSection } from '@/components/home/HeroSection';
import { StatsBar } from '@/components/home/StatsBar';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <StatsBar />
      
      {/* Roadmap placeholder for next phase */}
      <section className="py-24 container mx-auto px-6 text-center">
        <h2 className="text-4xl font-display font-bold mb-8">
          Interactive Roadmap Coming Soon
        </h2>
        <div className="h-64 bg-bg-surface border border-dashed border-border rounded-modal flex items-center justify-center text-text-secondary">
          Phase 4: Interactive Node Roadmap
        </div>
      </section>
    </div>
  );
}
