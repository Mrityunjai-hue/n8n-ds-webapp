export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-6xl font-bold text-accent-teal mb-4">
        N8N Data Science Community
      </h1>
      <p className="text-xl text-text-secondary max-w-2xl text-center">
        The full data science stack — from SQL to Agentic AI — with live code, visual explanations, and project tracking.
      </p>
      <div className="mt-12 flex gap-4">
        <button className="px-8 py-3 bg-accent-teal text-white rounded-card font-bold hover:opacity-90 transition-opacity">
          Start Learning
        </button>
        <button className="px-8 py-3 border border-border rounded-card font-bold hover:bg-bg-surface transition-colors">
          View Roadmap
        </button>
      </div>
    </main>
  );
}
