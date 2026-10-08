'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Code2, Database, Brain, Sparkles, Terminal, Play, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { CosmicButton } from '../ui/CosmicButton';
import { motion, AnimatePresence } from 'framer-motion';

const TYPING_WORDS = [
  'Data Science',
  'Machine Learning',
  'Deep Learning',
  'Generative AI',
  'Agentic AI'
];

const CODE_SIMULATIONS = {
  python: {
    title: 'neural_network.py',
    code: `import torch
import torch.nn as nn

class Perceptron(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc = nn.Linear(2, 1)
        
    def forward(self, x):
        return torch.sigmoid(self.fc(x))

model = Perceptron()
print("Model created. Training network...")`,
    output: `[Epoch 1/5] Loss: 0.6931 | Accuracy: 54.0%
[Epoch 2/5] Loss: 0.5124 | Accuracy: 78.5%
[Epoch 3/5] Loss: 0.3642 | Accuracy: 92.1%
[Epoch 4/5] Loss: 0.2185 | Accuracy: 97.4%
[Epoch 5/5] Loss: 0.0984 | Accuracy: 99.8%
✓ Training complete! Accuracy: 99.8%`
  },
  sql: {
    title: 'churn_analysis.sql',
    code: `SELECT 
  customer_tier,
  COUNT(id) AS total_users,
  AVG(usage_hours) AS avg_hours,
  ROUND(AVG(churn_rate) * 100, 1) || '%' AS churn
FROM users
GROUP BY customer_tier
ORDER BY avg_hours DESC;`,
    output: `customer_tier | total_users | avg_hours | churn
--------------+-------------+-----------+-------
Enterprise    | 1,240       | 184.2     | 1.2%
Professional  | 5,420       | 92.5      | 4.6%
Free Tier     | 24,150      | 14.8      | 18.3%
(3 rows returned)`
  }
};

export const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [wordIdx, setWordIdx] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeCodeLang, setActiveCodeLang] = useState<'python' | 'sql'>('python');
  const [isRunningCode, setIsRunningCode] = useState(false);
  const [showCodeOutput, setShowCodeOutput] = useState(false);

  // Typewriter effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentWord = TYPING_WORDS[wordIdx];
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(currentWord.substring(0, displayText.length - 1));
      }, 50);
    } else {
      timer = setTimeout(() => {
        setDisplayText(currentWord.substring(0, displayText.length + 1));
      }, 100);
    }

    if (!isDeleting && displayText === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setWordIdx(prev => (prev + 1) % TYPING_WORDS.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIdx]);

  const sectionRef = useRef<HTMLElement>(null);

  // Particle network physics canvas with viewport intersection observer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Skip heavy canvas loop on small mobile viewports
    if (window.innerWidth < 640) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number | null = null;
    let isVisible = true;
    let particles: Particle[] = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 35), 45);

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * (canvas?.width || 800);
        this.y = Math.random() * (canvas?.height || 600);
        this.size = Math.random() * 2 + 0.6;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        const colors = [
          'rgba(29, 91, 206, 0.35)',   // Blue
          'rgba(245, 191, 56, 0.35)',  // Yellow
          'rgba(27, 138, 62, 0.35)',   // Green
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas!.width) this.x = 0;
        else if (this.x < 0) this.x = canvas!.width;
        if (this.y > canvas!.height) this.y = 0;
        else if (this.y < 0) this.y = canvas!.height;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 650;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(29, 91, 206, ${0.1 - distance / 1200})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    // Pause animation when scrolled away to prevent CPU thrashing
    const observer = new IntersectionObserver(
      ([entry]) => {
        const nowVisible = entry.isIntersecting;
        if (nowVisible && !isVisible) {
          isVisible = true;
          animate();
        } else if (!nowVisible && isVisible) {
          isVisible = false;
          if (animationFrameId) cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const handleResize = () => {
      if (window.innerWidth < 640) {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        return;
      }
      init();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleRunCode = () => {
    setIsRunningCode(true);
    setShowCodeOutput(false);
    setTimeout(() => {
      setIsRunningCode(false);
      setShowCodeOutput(true);
    }, 1500);
  };

  const simulation = CODE_SIMULATIONS[activeCodeLang];

  return (
    <section ref={sectionRef} className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24">
      {/* Background Animated Gradient Highlight */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full filter blur-[120px] pointer-events-none opacity-40" style={{ backgroundColor: 'var(--yellow-tint)' }} />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full filter blur-[120px] pointer-events-none opacity-30" style={{ backgroundColor: 'var(--blue-tint)' }} />

      {/* Connection lines canvas — hidden on mobile for performance */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30 hidden sm:block"
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text/Content Column */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl border text-[11px] sm:text-xs font-medium font-mono" style={{ backgroundColor: 'var(--yellow-tint)', borderColor: 'var(--canvas-border)', color: 'var(--ink)' }}>
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: 'var(--yellow)' }} />
              <span className="truncate">INTERACTIVE DATA SCIENCE NOTEBOOK &amp; PRACTICE</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold leading-none" style={{ fontFamily: 'var(--font-heading)', color: 'var(--ink)' }}>
              The scratchpad to master
              <span className="block min-h-[1.2em] underline decoration-[var(--yellow)] decoration-wavy" style={{ color: 'var(--blue)' }}>
                {displayText}<span className="animate-pulse" style={{ color: 'var(--ink)' }}>|</span>
              </span>
            </h1>

            <p className="text-base sm:text-lg leading-relaxed max-w-xl mx-auto sm:mx-0" style={{ color: 'var(--ink-2)', fontFamily: 'var(--font-body)' }}>
              A hands-on notebook platform with live in-browser SQL sandboxes, data science coding challenges, visual study guides, and interview prep.
            </p>

            {/* Platform Statistics */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 py-4 max-w-lg mx-auto sm:mx-0" style={{ borderTop: '1px solid var(--canvas-border)', borderBottom: '1px solid var(--canvas-border)' }}>
              <div className="text-center sm:text-left">
                <span className="text-2xl sm:text-3xl font-bold font-mono block" style={{ color: 'var(--ink)' }}>155+</span>
                <span className="text-[12px] font-mono uppercase" style={{ color: 'var(--ink-3)' }}>Practice Problems</span>
              </div>
              <div className="text-center sm:text-left">
                <span className="text-2xl sm:text-3xl font-bold font-mono block" style={{ color: 'var(--ink)' }}>10</span>
                <span className="text-[12px] font-mono uppercase" style={{ color: 'var(--ink-3)' }}>Curriculum Tracks</span>
              </div>
              <div className="text-center sm:text-left">
                <span className="text-2xl sm:text-3xl font-bold font-mono block" style={{ color: 'var(--ink)' }}>100%</span>
                <span className="text-[12px] font-mono uppercase" style={{ color: 'var(--ink-3)' }}>In-Browser WASM</span>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center sm:items-start">
              <Link href="/code" className="w-full sm:w-auto">
                <CosmicButton icon={<ArrowRight className="w-5 h-5 text-white" />}>
                  Start Solving SQL
                </CosmicButton>
              </Link>
              <Link href="/learn" className="w-full sm:w-auto">
                <button className="btn-ghost w-full sm:w-auto px-6 py-3 rounded-xl font-medium text-base cursor-pointer">
                  Explore Curriculum
                </button>
              </Link>
            </div>
          </div>

            {/* Code Execution Preview Column */}
            <div className="block lg:col-span-5 w-full max-w-full mt-4 lg:mt-0">
            <div className="w-full border-2 rounded-2xl overflow-hidden shadow-[var(--shadow-md)] relative doodle-card bg-[var(--canvas-sunken)] dark:bg-[#12082a] border-[var(--canvas-border)]">
              {/* Tape Accent on Top */}
              <div
                className="absolute -top-3 right-10 w-24 h-5 rounded-[2px] opacity-80 transform rotate-1 border border-black/10 z-10"
                style={{ backgroundColor: 'var(--yellow)' }}
              />

              {/* Header block controls */}
              <div className="flex items-center justify-between px-4 py-3 border-b bg-[var(--canvas-raised)] border-[var(--canvas-border)]">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[var(--red)] border border-black/10" />
                  <div className="w-3 h-3 rounded-full bg-[var(--yellow)] border border-black/10" />
                  <div className="w-3 h-3 rounded-full bg-[var(--green)] border border-black/10" />
                </div>
                
                {/* Tabs */}
                <div className="flex border rounded-lg overflow-hidden p-0.5 bg-[var(--canvas)] border-[var(--canvas-border)]">
                  <button
                    onClick={() => { setActiveCodeLang('python'); setShowCodeOutput(false); }}
                    className={`px-3 py-1 text-xs font-mono font-bold rounded cursor-pointer transition-colors ${activeCodeLang === 'python' ? 'bg-[var(--yellow)] text-[var(--ink)] shadow-sm' : 'text-[var(--ink-3)]'}`}
                  >
                    Python
                  </button>
                  <button
                    onClick={() => { setActiveCodeLang('sql'); setShowCodeOutput(false); }}
                    className={`px-3 py-1 text-xs font-mono font-bold rounded cursor-pointer transition-colors ${activeCodeLang === 'sql' ? 'bg-[var(--yellow)] text-[var(--ink)] shadow-sm' : 'text-[var(--ink-3)]'}`}
                  >
                    SQL
                  </button>
                </div>
              </div>

              {/* Code Section */}
              <div className="p-4 font-mono text-xs leading-relaxed h-52 overflow-y-auto text-left relative text-[var(--ink)]">
                <div className="text-[10px] absolute top-2 right-4 uppercase font-bold font-mono px-2 py-0.5 rounded border border-[var(--canvas-border)] bg-[var(--canvas)] text-[var(--ink-3)]">
                  ✏️ Live WASM
                </div>
                <pre className="overflow-x-auto whitespace-pre font-mono font-medium">
                  {simulation.code}
                </pre>
              </div>

              {/* Compile and Run button */}
              <div className="px-4 py-2 border-t border-b flex items-center justify-between bg-[var(--canvas-raised)] border-[var(--canvas-border)]">
                <span className="text-[10px] font-mono flex items-center gap-1 text-[var(--ink-2)]">
                  <Terminal className="w-3 h-3 text-[var(--blue)]" />
                  {simulation.title}
                </span>

                <button
                  onClick={handleRunCode}
                  disabled={isRunningCode}
                  className="btn-doodle-primary text-xs px-3 py-1 rounded-lg font-mono font-bold flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-current text-white" />
                  <span>Run Code</span>
                </button>
              </div>

              {/* Console Output Terminal */}
              <div className="p-4 min-h-[140px] font-mono text-[11px] text-left relative flex flex-col justify-between bg-[var(--canvas)] border-t border-[var(--canvas-border)]">
                <div className="text-[10px] font-bold uppercase tracking-widest mb-2 text-[var(--ink-3)] flex items-center gap-1">
                  <span>Terminal Output</span>
                </div>

                <div className="flex-grow">
                  {isRunningCode ? (
                    <div className="flex items-center gap-2 text-[var(--orange)]">
                      <span className="w-3 h-3 rounded-full border-2 border-t-transparent animate-spin border-[var(--orange)]" />
                      <span>Executing in isolated browser sandbox...</span>
                    </div>
                  ) : showCodeOutput ? (
                    <motion.pre 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="whitespace-pre overflow-x-auto text-[var(--green)] font-bold"
                    >
                      {simulation.output}
                    </motion.pre>
                  ) : (
                    <span className="italic text-[var(--ink-4)] font-mono">Click &quot;Run Code&quot; to execute SQL/Python in browser.</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Level Quick Start Row */}
        <div className="mt-12 sm:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-left max-w-4xl mx-auto">
          <div className="p-6 border rounded-2xl paper-card transition-all group">
            <span className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ backgroundColor: 'var(--yellow-tint)', color: 'var(--ink)' }}>
              <Database className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--ink)' }}>404-Found-Code</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--ink-2)' }}>155 real-world interview SQL problems. Practice Joins, CTEs, Window Functions, and Query Optimization.</p>
            <Link href="/code" className="text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: 'var(--blue)' }}>
              <span>Open Problem Board</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 border rounded-2xl paper-card transition-all group">
            <span className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ backgroundColor: 'var(--blue-tint)', color: 'var(--blue)' }}>
              <Brain className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--ink)' }}>Data Science Curriculum</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--ink-2)' }}>Interactive lessons covering Python, NumPy, Pandas, Machine Learning, Deep Learning, and GenAI.</p>
            <Link href="/learn" className="text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: 'var(--blue)' }}>
              <span>Explore Curriculum</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 border rounded-2xl paper-card transition-all group">
            <span className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ backgroundColor: 'var(--orange-tint)', color: 'var(--orange)' }}>
              <Sparkles className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--ink)' }}>Interview Prep &amp; Q&amp;A</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--ink-2)' }}>Technical questions, active recall flashcards, and step-by-step solutions tested at top tech companies.</p>
            <Link href="/interview" className="text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: 'var(--orange)' }}>
              <span>Practice Questions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
