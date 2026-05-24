'use client';

import { useInterviewStore } from '@/lib/store/useInterviewStore';
import { subjects } from '@/lib/content/subjects';

export default function SimulatorSetup() {
  const { config, setConfig, startSession } = useInterviewStore();

  return (
    <div className="max-w-lg mx-auto py-8 px-2">
      <h2 className="text-2xl font-extrabold text-text-primary mb-1">
        🎯 Mock Interview Simulator
      </h2>
      <p className="text-text-secondary text-sm mb-8">
        AI asks real interview questions. You answer. AI evaluates like a real interviewer — with scores, feedback, and weak-topic detection.
      </p>

      {/* Subject */}
      <div className="mb-6">
        <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary mb-2">
          Subject
        </label>
        <select
          value={config.subjectSlug}
          onChange={e => setConfig({ subjectSlug: e.target.value })}
          className="w-full px-3 py-2.5 bg-bg-elevated border border-border rounded-xl text-text-primary text-sm outline-none focus:border-accent-teal transition-colors"
        >
          <option value="all">All Subjects (Mixed)</option>
          {subjects.map(s => (
            <option key={s.slug} value={s.slug}>{s.name}</option>
          ))}
        </select>
      </div>

      {/* Difficulty */}
      <div className="mb-6">
        <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary mb-2">
          Difficulty
        </label>
        <div className="grid grid-cols-4 gap-2">
          {(['Mixed', 'Fresher', 'Mid', 'Senior'] as const).map(d => (
            <button
              key={d}
              onClick={() => setConfig({ difficulty: d })}
              className={`py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                config.difficulty === d
                  ? 'border-accent-teal bg-accent-teal/10 text-accent-teal'
                  : 'border-border text-text-secondary hover:border-accent-teal/40'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <div className="mb-6">
        <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary mb-2">
          Number of Questions
        </label>
        <div className="grid grid-cols-3 gap-2">
          {([5, 10, 15] as const).map(n => (
            <button
              key={n}
              onClick={() => setConfig({ count: n })}
              className={`py-2 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                config.count === n
                  ? 'border-accent-teal bg-accent-teal/10 text-accent-teal'
                  : 'border-border text-text-secondary hover:border-accent-teal/40'
              }`}
            >
              {n} Questions
            </button>
          ))}
        </div>
      </div>

      {/* Timer */}
      <label className="flex items-center gap-3 mb-8 cursor-pointer group">
        <input
          type="checkbox"
          checked={config.timerEnabled}
          onChange={e => setConfig({ timerEnabled: e.target.checked })}
          className="w-4 h-4 rounded accent-teal-500 cursor-pointer"
        />
        <div>
          <span className="text-sm font-semibold text-text-primary">Enable Timer</span>
          <span className="text-xs text-text-secondary ml-2">(30 seconds per question)</span>
        </div>
      </label>

      <button
        onClick={startSession}
        className="w-full py-4 bg-gradient-to-r from-accent-teal to-accent-purple text-text-inverse font-extrabold text-base rounded-2xl hover:opacity-90 transition-opacity border-none cursor-pointer shadow-lg shadow-accent-teal/20"
      >
        Start Interview →
      </button>

      <p className="text-xs text-text-secondary text-center mt-4">
        AI evaluation powered by Gemini · Results saved locally
      </p>
    </div>
  );
}
