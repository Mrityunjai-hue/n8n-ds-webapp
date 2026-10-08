import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  Ban, 
  Lightbulb, 
  Rocket, 
  TerminalSquare, 
  Target, 
  Map, 
  BrainCircuit, 
  Layers, 
  Unlock,
  Crown,
  Star,
  Flame,
  ArrowRight,
  Terminal,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { subjects } from '@/lib/content/subjects';
import { DoodleDivider } from '@/components/ui/DoodleDivider';

export const metadata: Metadata = {
  title: 'About — 404 Found | N8N Data Science Community',
  description: '404 Found is the official learning platform of N8N DS Community — a fully independent, student-led data science community. Free. Structured. SQL to Agentic AI.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen text-[var(--ink-2)] pb-20">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-cursor-blink {
          animation: cursor-blink 1s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-cursor-blink { animation: none; }
        }
      `}} />

      {/* SECTION 1 — HERO */}
      <section className="pt-24 pb-14 px-6 container mx-auto max-w-[1100px] flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--canvas-border)] bg-[var(--yellow-tint)] text-xs font-mono font-bold text-[var(--ink)]">
            <Sparkles className="w-3.5 h-3.5 text-[var(--yellow)]" />
            <span>ABOUT 404 FOUND</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight" style={{ fontFamily: 'var(--font-heading)', color: 'var(--ink)' }}>
            We were not found.<br />
            Until now.
          </h1>

          <p className="text-lg md:text-xl leading-relaxed max-w-lg" style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-2)' }}>
            404 Found is what happens when a group of data science students
            get tired of scattered resources, broken tutorials, and paywalled content.
            So they built the platform they always wished existed.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href="/code">
              <button className="btn-doodle-primary gap-2 shadow-[var(--shadow-md)]">
                <span>Start Practicing SQL</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="https://discord.gg/J8uNurwr" target="_blank" rel="noopener noreferrer">
              <button className="btn-doodle-secondary gap-2">
                <span>Join the Community</span>
              </button>
            </Link>
          </div>
        </div>
        
        {/* Terminal Notebook Block */}
        <div className="w-full lg:w-[440px] bg-[var(--canvas-sunken)] dark:bg-[#12082a] border-2 border-[var(--canvas-border)] rounded-2xl p-5 sm:p-6 font-mono text-[13px] leading-[1.7] shadow-[var(--shadow-md)] doodle-border relative overflow-hidden">
          {/* Tape Accent */}
          <div
            className="absolute -top-3 right-8 w-24 h-5 rounded-[2px] opacity-80 transform rotate-2 border border-black/10"
            style={{ backgroundColor: 'var(--yellow)' }}
          />

          <div className="text-[var(--orange)] font-bold mb-3">{`> 404 Not Found`}</div>
          <div className="text-[var(--ink-3)]">Searching for learning path...</div>
          <div className="text-[var(--ink-3)]">Searching for structured curriculum...</div>
          <div className="text-[var(--ink-3)] mb-3">Searching for free interview prep...</div>
          
          <div className="text-[var(--red)] font-bold">Error: Resource not found.</div>
          <div className="text-[var(--red)] font-bold">Error: Path is undefined.</div>
          <div className="text-[var(--red)] font-bold mb-3">Error: No clear roadmap exists.</div>
          
          <div className="text-[var(--orange)] font-bold mb-3">{`> Rethinking the problem...`}</div>
          
          <div className="text-[var(--ink)]">{`$ git clone https://github.com/404found`}</div>
          <div className="text-[var(--ink)]">{`$ cd 404-found`}</div>
          <div className="text-[var(--ink)] mb-3">{`$ npm run build:platform`}</div>
          
          <div className="text-[var(--green)] font-bold">✓ Compiled 10 subjects</div>
          <div className="text-[var(--green)] font-bold">✓ Loaded 155 SQL problems</div>
          <div className="text-[var(--green)] font-bold">✓ Connected SQLite WASM engine</div>
          <div className="text-[var(--green)] font-bold mb-3">✓ Deployed 404-Found-Code</div>
          
          <div className="text-[var(--blue)] font-bold">{`> 404 Found.`}</div>
          <div className="text-[var(--blue)] font-bold flex items-center gap-1">
            {`> The path exists now.`}
            <span className="w-2 h-4 bg-[var(--blue)] animate-cursor-blink inline-block" />
          </div>
        </div>
      </section>

      {/* Wavy Divider */}
      <div className="container mx-auto max-w-[1100px] px-6">
        <DoodleDivider />
      </div>

      {/* SECTION 2 — THE IDEA */}
      <section className="py-14 px-6 container mx-auto max-w-[1100px]">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-10" style={{ fontFamily: 'var(--font-heading)', color: 'var(--ink)' }}>
          The idea behind the name
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="doodle-card p-6 relative">
            <div className="w-12 h-12 bg-red-500/10 rounded-xl border border-red-500/30 flex items-center justify-center mb-5 text-[var(--red)]">
              <Ban className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--ink)' }}>
              The 404 Era
            </h3>
            <p className="text-base leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
              Every student hits it. Hours of YouTube videos with no structure.
              Blogs that stop halfway. Paid courses that teach theory with no practice.
              The resources exist — but the path doesn't. You keep getting 404s.
            </p>
          </div>

          <div className="paper-card-alt p-6 relative">
            <div className="w-12 h-12 bg-amber-500/10 rounded-xl border border-amber-500/30 flex items-center justify-center mb-5 text-[var(--yellow)]">
              <Lightbulb className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--ink)' }}>
              The Reframe
            </h3>
            <p className="text-base leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
              404 is not a dead end. It's a signal that something is missing
              and needs to be built. We took the error that symbolises
              &ldquo;not found&rdquo; and turned it into a declaration: <strong>Found</strong>.
            </p>
          </div>

          <div className="doodle-card p-6 relative">
            <div className="w-12 h-12 bg-[var(--blue-tint)] rounded-xl border border-[var(--blue)]/30 flex items-center justify-center mb-5 text-[var(--blue)]">
              <Rocket className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--ink)' }}>
              404 Found
            </h3>
            <p className="text-base leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
              A free, structured, browser-native platform where the path is
              clear — from SQL basics to Agentic AI. No confusion. No paywalls.
              No lost hours. Just curriculum, code, and community.
            </p>
          </div>
        </div>
      </section>

      {/* Wavy Divider */}
      <div className="container mx-auto max-w-[1100px] px-6">
        <DoodleDivider variant="zigzag" />
      </div>

      {/* SECTION 3 — WHAT YOU GET */}
      <section className="py-14 px-6 container mx-auto max-w-[1100px]">
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--ink)' }}>
            What you get — for free
          </h2>
          <p className="text-base text-[var(--ink-3)] font-mono">
            Everything a data science learner needs. Zero filler.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: TerminalSquare, title: 'In-Browser WASM Execution', body: 'Run Python and isolated SQLite directly in your browser. Zero setup, zero lag.' },
            { icon: Target, title: '155+ Real Interview Problems', body: 'Real SQL challenges sourced from LeetCode, HackerRank, StrataScratch & DataLemur with automated test cases.' },
            { icon: Map, title: 'Visual Learning & Flowcharts', body: 'Every concept comes with an interactive diagram. See how algorithms and databases work under the hood.' },
            { icon: BrainCircuit, title: 'Tiered Ink-Drop Hints', body: 'Progressive nudges from gentle clues to full query blueprints unlocked with challenge points.' },
            { icon: Layers, title: '10 Structured Subjects', body: 'SQL → Python → NumPy → Pandas → ML → Deep Learning → GenAI → Agentic AI.' },
            { icon: Unlock, title: '100% Free Forever', body: 'No paywalls. No subscription traps. Built by students who couldn\'t afford overpriced bootcamps.' },
          ].map((feature, i) => (
            <div key={i} className="doodle-card p-6 flex flex-col gap-3">
              <feature.icon className="w-6 h-6 text-[var(--blue)]" />
              <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--ink)' }}>
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-2)' }}>
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Wavy Divider */}
      <div className="container mx-auto max-w-[1100px] px-6">
        <DoodleDivider />
      </div>

      {/* SECTION 4 — BEHIND THE PLATFORM */}
      <section className="py-14 px-6 container mx-auto max-w-[1100px] grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--canvas-border)] bg-[var(--canvas-sunken)] text-xs font-mono font-bold text-[var(--ink-2)]">
            BEHIND THE PLATFORM
          </div>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--ink)' }}>
            The N8N Data Science Community
          </h2>
          <div className="space-y-3 text-base leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-2)' }}>
            <p>
              404 Found is the official learning platform of N8N DS Community —
              a fully independent, student-managed community built and run
              entirely by students, for students.
            </p>
            <p>
              We are not a club. We are a collective of practitioners who decided that learning data science the right way — through
              real datasets, live queries, and real peer collaboration — matters
              more than passive certificates.
            </p>
            <p>
              Backed by industry mentors actively working in AI and data engineering, the community bridges the gap between textbooks and production systems.
            </p>
          </div>
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link href="https://discord.gg/J8uNurwr" target="_blank" rel="noopener noreferrer">
              <button className="btn-doodle-primary text-sm gap-2">
                <span>Join Discord Server</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-[var(--canvas-sunken)] dark:bg-[#12082a] border-2 border-[var(--canvas-border)] rounded-2xl p-5 sm:p-6 font-mono text-[13px] leading-[1.7] shadow-[var(--shadow-md)] doodle-border overflow-x-auto">
          <div className="flex items-center gap-2 mb-4 text-[var(--ink-3)] border-b border-[var(--canvas-border)] pb-2">
            <Terminal className="w-4 h-4 text-[var(--yellow)]" />
            <span className="font-bold">bash | N8N-ds-community</span>
          </div>
          <div className="mb-3">
            <span className="text-[var(--orange)] font-bold">student@404found:~$</span> <span className="text-[var(--ink)] font-semibold">python3 -c &quot;import n8n&quot;</span>
          </div>
          <div className="text-[var(--green)] font-bold">✓ type: student-led · fully independent</div>
          <div className="text-[var(--green)] font-bold">✓ platform: Discord [connected]</div>
          <div className="text-[var(--green)] font-bold">✓ mentors: 5+ active data practitioners</div>
          <div className="text-[var(--green)] font-bold mb-4">✓ motto: &quot;beyond textbooks, into production&quot;</div>

          <div className="mb-3">
            <span className="text-[var(--orange)] font-bold">student@404found:~$</span> <span className="text-[var(--ink)] font-semibold">404-found-code status</span>
          </div>
          <div className="text-[var(--blue)] font-bold">● Community: ACTIVE</div>
          <div className="text-[var(--blue)] font-bold">● Problems:  155 verified challenges</div>
          <div className="text-[var(--blue)] font-bold">● Mode:      hands-on SQL sandbox</div>
          <div className="flex items-center gap-2 mt-4">
            <span className="text-[var(--orange)] font-bold">student@404found:~$</span>
            <span className="w-2 h-4 bg-[var(--ink)] animate-cursor-blink inline-block" />
          </div>
        </div>
      </section>

      {/* SECTION 5 — ROLES */}
      <section className="py-14 px-6 container mx-auto max-w-[1100px]">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8" style={{ fontFamily: 'var(--font-heading)', color: 'var(--ink)' }}>
          How we&apos;re organised
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {[
            { icon: Crown, iconColor: 'text-[var(--yellow)]', title: 'FOUNDER', desc: 'Maintains open source curriculum, sandbox tools & community vision' },
            { icon: Star, iconColor: 'text-[var(--blue)]', title: 'MENTOR (Industry)', desc: '5+ professionals in DS/AI roles providing project reviews and career guidance' },
            { icon: Flame, iconColor: 'text-[var(--orange)]', title: 'PROJECT LEAD', desc: 'Leads sprint-based collaborative builds and open-source data apps' },
            { icon: Rocket, iconColor: 'text-[var(--green)]', title: 'LEARNER / MEMBER', desc: 'Solves daily challenges, engages in discussions, and levels up' },
          ].map((role, i) => (
            <div key={i} className="doodle-card p-5 flex gap-4 items-start">
              <role.icon className={`w-5 h-5 shrink-0 mt-0.5 ${role.iconColor}`} />
              <div>
                <h4 className="font-bold mb-1 uppercase tracking-wide text-base" style={{ fontFamily: 'var(--font-heading)', color: 'var(--ink)' }}>
                  {role.title}
                </h4>
                <p className="text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-2)' }}>
                  {role.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center text-sm font-mono text-[var(--ink-3)]">
          Join as a Member. Grow into a Project Lead.
        </div>
      </section>
    </div>
  );
}
