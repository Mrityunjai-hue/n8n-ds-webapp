import { subjects } from '@/lib/content/subjects';
import { RoadmapGraph } from '@/components/home/RoadmapGraph';
import { SubjectContent } from '@/lib/types/content';
import Link from 'next/link';

export default function RoadmapPage() {
  return (
    <div className="flex flex-col py-20 min-h-screen">
      <div className="container mx-auto px-6 mb-12 text-center">
        <h1 className="text-4xl lg:text-6xl font-display font-bold mb-4">
          Visual Learning <span className="text-accent-teal">Roadmap</span>
        </h1>
        <p className="text-text-secondary max-w-2xl mx-auto">
          From SQL to Agentic AI — follow the structured path to master the full data science stack. 
          Your progress is tracked automatically as you complete topics.
        </p>
      </div>

      <div className="bg-bg-surface/50 py-24 border-y border-border mb-20 overflow-hidden">
        <RoadmapGraph />
      </div>

      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-2xl font-display font-bold mb-8">Subject Overview</h2>
        <div className="grid gap-4">
          {subjects.map((subject) => (
            <Link 
              key={subject.id} 
              href={`/learn/${subject.slug}`}
              className="p-6 bg-bg-surface border border-border rounded-card flex items-center justify-between group hover:border-accent-teal transition-all hover:-translate-y-1"
            >
              <div className="flex items-center gap-6">
                <div className="p-3 rounded-xl bg-bg-primary border border-border text-text-secondary group-hover:text-accent-teal transition-colors">
                  <subject.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{subject.name}</h3>
                  <p className="text-sm text-text-secondary">{subject.description}</p>
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold">{subject.topics.length} Topics</div>
                <div className="text-xs text-text-secondary">{subject.estimatedHours} Hours</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
