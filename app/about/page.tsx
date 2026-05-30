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
  Terminal
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { subjects } from '@/lib/content/subjects';
import N8NLogo from '@/components/N8NLogo';

export const metadata: Metadata = {
  title: 'About — 404 Found | N8N Data Science Community',
  description: '404 Found is the official learning platform of N8N DS Community — a fully independent, student-led data science community. Free. Structured. SQL to Agentic AI.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen font-body text-[var(--text-secondary)]">
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
      <section className="pt-32 pb-20 px-6 container mx-auto max-w-[1100px] flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--text-muted)]">
            ● ABOUT 404 FOUND
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-[var(--text-primary)] leading-tight tracking-tight">
            We were not found.<br />
            Until now.
          </h1>
          <p className="text-[15px] leading-[1.7] max-w-lg">
            404 Found is what happens when a group of data science students
            get tired of scattered resources, broken tutorials, and paywalled content.
            So they built the platform they always wished existed.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link href="/">
              <Button size="lg" className="bg-[var(--accent-cyan)] text-bg-base hover:opacity-90 transition-opacity gap-2 border-none">
                Start Learning <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="https://discord.gg/J8uNurwr" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="lg" className="bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-primary)]">
                Join the Community
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Terminal Decoration */}
        <div className="hidden lg:block w-[420px] bg-[#070b14] border border-[var(--border-default)] rounded-[10px] p-5 font-mono text-[13px] leading-[1.7] shadow-[0_0_30px_rgba(0,229,255,0.08)]">
          <div className="text-[#f59e0b] mb-4">{`> 404 Not Found`}</div>
          <div className="text-[var(--text-secondary)]">Searching for learning path...</div>
          <div className="text-[var(--text-secondary)]">Searching for structured curriculum...</div>
          <div className="text-[var(--text-secondary)] mb-4">Searching for free interview prep...</div>
          
          <div className="text-[#f43f5e]">Error: Resource not found.</div>
          <div className="text-[#f43f5e]">Error: Path is undefined.</div>
          <div className="text-[#f43f5e] mb-4">Error: No clear roadmap exists.</div>
          
          <div className="text-[#f59e0b] mb-4">{`> Rethinking the problem...`}</div>
          
          <div className="text-[var(--text-secondary)]">{`$ git clone https://github.com/404found`}</div>
          <div className="text-[var(--text-secondary)]">{`$ cd 404-found`}</div>
          <div className="text-[var(--text-secondary)] mb-4">{`$ npm run build:platform`}</div>
          
          <div className="text-[#10b981]">✓ Compiled 10 subjects</div>
          <div className="text-[#10b981]">✓ Loaded 224 interview questions</div>
          <div className="text-[#10b981]">✓ Connected browser Python runtime</div>
          <div className="text-[#10b981] mb-4">✓ Deployed learning platform</div>
          
          <div className="text-[var(--accent-cyan)]">{`> 404 Found.`}</div>
          <div className="text-[var(--accent-cyan)] flex items-center gap-1">
            {`> The path exists now.`}
            <span className="w-2 h-4 bg-[var(--accent-cyan)] animate-cursor-blink inline-block" />
          </div>
        </div>
      </section>

      {/* SECTION 2 — THE IDEA */}
      <section className="py-20 px-6 container mx-auto max-w-[1100px]">
        <h2 className="text-[2rem] font-display font-bold text-[var(--text-primary)] text-center mb-12">
          The idea behind the name
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-6">
            <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-6">
              <Ban className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">The 404 Era</h3>
            <p className="text-[15px] leading-[1.7]">
              Every student hits it. Hours of YouTube videos with no structure.
              Blogs that stop halfway. Paid courses that teach theory with no practice.
              The resources exist — but the path doesn't. You keep getting 404s.
            </p>
          </div>
          <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-6">
            <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-6">
              <Lightbulb className="w-6 h-6 text-amber-500" />
            </div>
            <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">The Reframe</h3>
            <p className="text-[15px] leading-[1.7]">
              404 is not a dead end. It's a signal that something is missing
              and needs to be built. We took the error that symbolises
              "not found" and turned it into a declaration: Found.
            </p>
          </div>
          <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-6">
            <div className="w-12 h-12 bg-[var(--accent-cyan)]/10 rounded-lg flex items-center justify-center mb-6">
              <Rocket className="w-6 h-6 text-[var(--accent-cyan)]" />
            </div>
            <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">404 Found</h3>
            <p className="text-[15px] leading-[1.7]">
              A free, structured, browser-native platform where the path is
              clear — from SQL basics to Agentic AI. No confusion. No walls.
              No lost hours. Just the curriculum, the code, and the community.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 — WHAT YOU GET */}
      <section className="py-20 px-6 container mx-auto max-w-[1100px]">
        <div className="text-center mb-12">
          <h2 className="text-[2rem] font-display font-bold text-[var(--text-primary)] mb-3">
            What you get — for free
          </h2>
          <p className="text-[15px] text-[var(--text-muted)]">
            Everything a data science learner needs. Nothing they don't.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: TerminalSquare, title: 'Browser Code Execution', body: 'Run Python and SQL directly in your browser. No Jupyter. No installs. Just write and execute.' },
            { icon: Target, title: '224+ Interview Questions', body: 'Every topic has real interview questions tagged by difficulty — Fresher, Mid, and Senior — with full model answers.' },
            { icon: Map, title: 'Visual Learning', body: 'Every concept comes with a Mermaid diagram. See how systems connect, not just how they\'re defined.' },
            { icon: BrainCircuit, title: 'ELI5 Mode', body: 'Toggle "Explain Like I\'m 5" on any topic. Complex ideas explained with real-world analogies.' },
            { icon: Layers, title: '10 Deep Subjects', body: 'SQL → Python → NumPy → Pandas → ML → Deep Learning → GenAI → Agentic AI. Each level builds on the last.' },
            { icon: Unlock, title: 'Forever Free', body: 'No paywalls. No login required to learn. Built by students who couldn\'t afford expensive platforms.' },
          ].map((feature, i) => (
            <div key={i} className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-6 flex flex-col gap-4">
              <feature.icon className="w-6 h-6 text-[var(--accent-cyan)]" />
              <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">{feature.title}</h3>
              <p className="text-[15px] leading-[1.7]">{feature.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4 — BEHIND THE PLATFORM */}
      <section className="py-20 px-6 container mx-auto max-w-[1100px] grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--text-muted)]">
            BEHIND THE PLATFORM
          </div>
          <h2 className="text-[2rem] font-display font-bold text-[var(--text-primary)]">
            The N8N Data Science Community
          </h2>
          <div className="space-y-4 text-[15px] leading-[1.7]">
            <p>
              404 Found is the official learning platform of N8N DS Community —
              a fully independent, student-managed community built and run
              entirely by students, for students. No institution. No oversight.
            </p>
            <p>
              We are not a club. We are not a class. We are a group of people
              who decided that learning data science the right way — through
              real datasets, real projects, and real collaboration — matters
              more than any certificate or classroom.
            </p>
            <p>
              Backed by 5+ industry mentors actively working in data science
              and AI, the community bridges the gap between academic learning
              and what the industry actually demands.
            </p>
            <p>
              The platform was built so every member — and anyone else who
              finds it — has access to the structured learning they deserve.
            </p>
          </div>
          <div className="pt-4 flex flex-col gap-3">
            <Link href="https://n8n-ds-community.netlify.app" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-cyan)] font-bold hover:underline flex items-center gap-2">
              → Visit Community Site
            </Link>
            <Link href="https://discord.gg/J8uNurwr" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-cyan)] font-bold hover:underline flex items-center gap-2">
              → Join on Discord
            </Link>
          </div>
        </div>

        <div className="bg-[#070b14] border border-[var(--border-default)] rounded-[10px] p-5 font-mono text-[13px] leading-[1.7] shadow-xl overflow-x-auto">
          <div className="flex items-center gap-2 mb-4 text-[#4a5d7a] border-b border-[#2a3f5f] pb-2">
            <Terminal className="w-4 h-4" />
            <span>bash | N8N-ds-community</span>
          </div>
          <div className="mb-4">
            <span className="text-[#f59e0b]">student@hbtu:~$</span> <span className="text-white">python3 -c "import n8n"</span>
          </div>
          <div className="text-[#10b981]">✓ type: student-led · fully independent</div>
          <div className="text-[#10b981]">✓ platform: Discord [connected]</div>
          <div className="text-[#10b981]">✓ industry_mentors: 5+ active [verified]</div>
          <div className="text-[#10b981] mb-6">✓ motto: "beyond textbooks, into production"</div>

          <div className="mb-4">
            <span className="text-[#f59e0b]">student@hbtu:~$</span> <span className="text-white">n8n status</span>
          </div>
          <div className="text-[var(--accent-cyan)]">● Community:  ACTIVE</div>
          <div className="text-[var(--accent-cyan)]">● Members:    Growing</div>
          <div className="text-[var(--accent-cyan)]">● Mode:       hands-on</div>
          <div className="text-[var(--accent-cyan)] flex mb-6">
            <span className="w-28 shrink-0">● Channels:</span>
            <span className="text-[var(--text-secondary)]">#ml-ai-chat #data-analytics<br/>#project-showcase #kaggle-collab</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#f59e0b]">student@hbtu:~$</span>
            <span className="w-2 h-4 bg-white animate-cursor-blink inline-block" />
          </div>
        </div>
      </section>

      {/* SECTION 5 — COMMUNITY STATS */}
      <section className="py-20 px-6 container mx-auto max-w-[1100px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {[
            { num: '96+', label: 'Community Members', sub: 'across 4 learning tracks' },
            { num: '10', label: 'Subjects Covered', sub: 'SQL to Agentic AI' },
            { num: '224+', label: 'Interview Questions', sub: 'Fresher to Senior level' },
            { num: '5+', label: 'Industry Mentors', sub: 'active professionals guiding the community' },
            { num: '150+', label: 'Topics', sub: 'with browser-executable code' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col gap-1">
              <div className="font-display text-5xl font-bold text-[var(--accent-cyan)] tracking-tight">
                {stat.num}
              </div>
              <div className="font-bold text-[var(--text-primary)] text-sm">{stat.label}</div>
              <div className="text-xs text-[var(--text-muted)] leading-tight">{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6 — ROLES */}
      <section className="py-20 px-6 container mx-auto max-w-[1100px]">
        <h2 className="text-[2rem] font-display font-bold text-[var(--text-primary)] mb-8">
          How we're organised
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {[
            { icon: Crown, iconColor: 'text-yellow-500', title: 'FOUNDER', desc: 'Admin access · Manages platform and community direction' },
            { icon: Star, iconColor: 'text-purple-400', title: 'MENTOR (Industry)', desc: '5+ professionals from real DS/AI roles · Guide projects · Provide career insights' },
            { icon: Flame, iconColor: 'text-orange-500', title: 'PROJECT LEAD', desc: 'Leads real-world projects · Manages sprints · Guides members' },
            { icon: Rocket, iconColor: 'text-blue-400', title: 'MEMBER', desc: 'Joins discussions · Collaborates on projects · Grows daily' },
          ].map((role, i) => (
            <div key={i} className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-5 flex gap-4 items-start">
              <role.icon className={`w-5 h-5 shrink-0 mt-0.5 ${role.iconColor}`} />
              <div>
                <h4 className="font-bold text-[var(--text-primary)] mb-1 uppercase tracking-wide text-sm">{role.title}</h4>
                <p className="text-sm text-[var(--text-secondary)]">{role.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center text-sm font-bold text-[var(--text-muted)]">
          Join as a Member. Grow into a Project Lead.
        </div>
      </section>

      {/* SECTION 7 — SUBJECTS PREVIEW */}
      <section className="py-20 px-6 container mx-auto max-w-[1100px] overflow-hidden">
        <h2 className="text-[2rem] font-display font-bold text-[var(--text-primary)] mb-8">
          What we cover
        </h2>
        <div className="flex overflow-x-auto pb-6 -mx-6 px-6 gap-4 no-scrollbar items-center">
          {subjects.map((sub) => {
            const SubIcon = sub.icon as any;
            return (
              <div key={sub.id} className="shrink-0 flex items-center gap-3 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-full px-5 py-3 shadow-sm hover:border-[var(--accent-cyan)] transition-colors">
                <SubIcon className="w-4 h-4 text-[var(--accent-cyan)]" />
                <span className="font-bold text-sm text-[var(--text-primary)] whitespace-nowrap">{sub.name}</span>
                <span className="text-xs font-mono text-[var(--text-muted)] bg-[var(--bg-elevated)] px-2 py-0.5 rounded-md">L{sub.level}</span>
              </div>
            );
          })}
        </div>
        <Link href="/" className="inline-block mt-4 text-[15px] font-bold text-[var(--accent-cyan)] hover:underline">
          Start from L1 or jump to any level →
        </Link>
      </section>

      {/* SECTION 8 — FINAL CTA (JOIN) */}
      <section className="py-24 px-6 bg-[#030712] border-t border-[var(--border-subtle)] mt-12">
        <div className="container mx-auto max-w-[700px]">
          <div className="bg-[#070b14] border border-[var(--border-default)] rounded-[10px] p-6 md:p-8 font-mono text-[13px] leading-[1.7] mb-8 shadow-2xl overflow-x-auto">
            <div className="text-[#4a5d7a] mb-4 whitespace-nowrap"># One line to change your data science journey</div>
            
            <div className="text-[var(--accent-cyan)] mb-4">
              <span className="text-[#c678dd]">from</span> n8n_ds_community <span className="text-[#c678dd]">import</span> Discord
            </div>
            
            <div className="text-white mb-2">
              invite = <span className="text-[#98c379]">"https://discord.gg/J8uNurwr"</span>
            </div>
            
            <div className="text-white">
              <span className="text-[#61afef]">Discord.join</span>(
            </div>
            <div className="text-white pl-4">
              server=invite,
            </div>
            <div className="text-white pl-4">
              skills=<span className="text-[#98c379]">"any"</span>,
            </div>
            <div className="text-white pl-4 mb-2">
              attitude=<span className="text-[#98c379]">"growth_mindset"</span>
            </div>
            <div className="text-white mb-6">)</div>
            
            <div className="text-[#4a5d7a]"># Output:</div>
            <div className="text-[#10b981]"># ✓ Welcome to N8N Data Science Community 🚀</div>
            <div className="text-[#10b981] flex items-center gap-2">
              # &gt;&gt; Your learning journey starts now.
              <span className="w-2 h-4 bg-[#10b981] animate-cursor-blink inline-block" />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link href="https://discord.gg/J8uNurwr" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-[var(--accent-cyan)] text-[#030712] hover:opacity-90 font-bold border-none gap-2">
                ▶ Run community.join()
              </Button>
            </Link>
            <Link href="/" className="w-full sm:w-auto">
              <Button variant="ghost" size="lg" className="w-full border border-[var(--accent-cyan)] text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)] hover:text-[#030712] bg-transparent transition-colors">
                Start Learning on 404 Found →
              </Button>
            </Link>
          </div>
          
          <div className="text-center font-mono text-[11px] text-[#4a5d7a] space-y-1">
            <div>N8N Data Science Community · student-led · fully independent</div>
            <div>build: passing | python 3.11 | industry-mentored · community-driven</div>
          </div>
        </div>
      </section>

      {/* SECTION 9 — FOOTER ATTRIBUTION */}
      <footer className="py-8 bg-[var(--bg-base)] border-t border-[var(--border-subtle)]">
        <div className="container mx-auto px-6 text-center">
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="flex items-center gap-2 text-[15px] font-bold text-[var(--text-primary)]">
              Built with <span className="text-red-500">❤️</span> by <N8NLogo variant="navbar" animated={false} className="ml-1" />
            </div>
            <div className="text-[13px] text-[var(--text-muted)] font-medium">
              Student-led · Fully Independent · Industry Mentored
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
