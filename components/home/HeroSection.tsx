'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Code2, Database, Brain, Sparkles, Terminal, Play, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
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

  // Particle network physics canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 80;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 2 + 0.6;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        // Color code based on subject tracks
        const colors = [
          'rgba(0, 229, 255, 0.4)',  // Cyan
          'rgba(124, 58, 237, 0.4)', // Violet
          'rgba(244, 63, 94, 0.4)'   // Rose
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
      canvas.width = window.innerWidth;
      canvas.height = 750;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 140) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(124, 58, 237, ${0.12 - distance / 1200})`;
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

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
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
    <section className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28 bg-bg-base neural-grid">
      {/* Background Animated Gradient Mesh */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-accent-teal/5 rounded-full filter blur-[150px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent-purple/5 rounded-full filter blur-[150px] pointer-events-none" />

      {/* Connection lines canvas */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-60"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text/Content Column */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-accent-teal/10 border border-accent-teal/20 text-accent-teal text-xs font-bold font-mono">
              <span className="w-2 h-2 rounded-full bg-accent-teal animate-pulse" />
              <span>AI-POWERED INTERACTIVE LEARNING ENGINE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold leading-none tracking-tight text-text-primary">
              The OS to master <br />
              <span className="bg-gradient-to-r from-accent-teal via-accent-purple to-accent-rose bg-clip-text text-transparent h-[76px] inline-block">
                {displayText}
              </span>
              <span className="text-text-primary animate-pulse">|</span>
            </h1>

            <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl">
              An immersive interactive platform providing live-compiler sandboxes, visual mapping diagrams, real-world case studies, and customized exams for developers and scientists.
            </p>

            {/* Platform Statistics */}
            <div className="grid grid-cols-3 gap-4 py-4 max-w-lg border-y border-border-subtle">
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-text-primary font-mono block">150+</span>
                <span className="text-xs text-text-secondary">Core Topics</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-text-primary font-mono block">10</span>
                <span className="text-xs text-text-secondary">Deep Modules</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-text-primary font-mono block">100%</span>
                <span className="text-xs text-text-secondary">Browser Compiler</span>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-wrap gap-4 items-center">
              <Link href="/learn/sql/intro">
                <Button size="lg" className="px-8 gap-2 bg-gradient-to-r from-accent-teal to-accent-purple border-none text-text-inverse font-extrabold hover:opacity-90 transition-opacity">
                  Start Interactive Journey
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/roadmap">
                <button className="px-6 py-3 border border-border-subtle hover:border-border-default rounded-xl font-bold text-sm text-text-secondary hover:text-text-primary transition-all bg-bg-surface/20 backdrop-blur-sm cursor-pointer">
                  View Core Roadmap
                </button>
              </Link>
            </div>
          </div>

          {/* Code Execution Preview Column */}
          <div className="lg:col-span-5">
            <div className="w-full bg-bg-elevated/80 border border-border-subtle rounded-2xl overflow-hidden shadow-2xl relative">
              {/* Header block controls */}
              <div className="flex items-center justify-between px-4 py-3 bg-bg-elevated border-b border-border-subtle">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
                  <div className="w-3 h-3 rounded-full bg-[#eab308]" />
                  <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
                </div>
                
                {/* Tabs */}
                <div className="flex border border-border-subtle rounded-lg overflow-hidden bg-bg-base/20 p-0.5">
                  <button
                    onClick={() => { setActiveCodeLang('python'); setShowCodeOutput(false); }}
                    className={`px-3 py-1 text-xs font-mono font-bold rounded cursor-pointer transition-colors ${activeCodeLang === 'python' ? 'bg-bg-base text-accent-teal' : 'text-text-secondary'}`}
                  >
                    Python
                  </button>
                  <button
                    onClick={() => { setActiveCodeLang('sql'); setShowCodeOutput(false); }}
                    className={`px-3 py-1 text-xs font-mono font-bold rounded cursor-pointer transition-colors ${activeCodeLang === 'sql' ? 'bg-bg-base text-accent-teal' : 'text-text-secondary'}`}
                  >
                    SQL
                  </button>
                </div>
              </div>

              {/* Code Section */}
              <div className="p-4 font-mono text-xs text-text-secondary leading-relaxed bg-bg-elevated h-52 overflow-y-auto text-left relative">
                <div className="text-[10px] text-accent-purple/60 absolute top-2 right-4 uppercase font-bold">
                  Workspace Sandbox
                </div>
                <pre className="text-text-primary overflow-x-auto whitespace-pre">
                  {simulation.code}
                </pre>
              </div>

              {/* Compile and Run button */}
              <div className="px-4 py-2 border-t border-b border-border-subtle bg-bg-elevated flex items-center justify-between">
                <span className="text-[10px] text-text-secondary font-mono flex items-center gap-1">
                  <Terminal className="w-3 h-3 text-accent-teal" />
                  {simulation.title}
                </span>

                <button
                  onClick={handleRunCode}
                  disabled={isRunningCode}
                  className="flex items-center gap-1.5 px-3 py-1 bg-accent-teal text-text-inverse text-xs font-bold rounded-lg hover:opacity-95 transition-opacity disabled:opacity-50 cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Run Code</span>
                </button>
              </div>

              {/* Console Output Terminal */}
              <div className="bg-bg-base p-4 min-h-[140px] font-mono text-[11px] text-left relative flex flex-col justify-between">
                <div className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-2">
                  Terminal Output
                </div>

                <div className="flex-grow">
                  {isRunningCode ? (
                    <div className="flex items-center gap-2 text-accent-teal">
                      <span className="w-3 h-3 rounded-full border-2 border-accent-teal border-t-transparent animate-spin" />
                      <span>Compiling modules &amp; running in browser WASM sandbox...</span>
                    </div>
                  ) : showCodeOutput ? (
                    <motion.pre 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-text-primary whitespace-pre overflow-x-auto"
                    >
                      {simulation.output}
                    </motion.pre>
                  ) : (
                    <span className="text-text-secondary/50 italic">Click &quot;Run Code&quot; to compile and execute instantly.</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Level Quick Start Row */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto">
          <div className="p-6 bg-bg-surface/10 border border-border-subtle rounded-2xl backdrop-blur-sm hover:border-accent-teal/30 transition-all group">
            <span className="w-10 h-10 rounded-xl bg-accent-teal/10 text-accent-teal flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Database className="w-5 h-5" />
            </span>
            <h3 className="text-base font-bold text-text-primary mb-2">Beginner Track</h3>
            <p className="text-xs text-text-secondary mb-4">Master relational SQL databases, clean Python coding, NumPy structures, and tabular Pandas formatting.</p>
            <Link href="/learn/sql/intro" className="text-xs text-accent-teal font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
              <span>Start from base level</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 bg-bg-surface/10 border border-border-subtle rounded-2xl backdrop-blur-sm hover:border-accent-purple/30 transition-all group">
            <span className="w-10 h-10 rounded-xl bg-accent-purple/10 text-accent-purple flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Brain className="w-5 h-5" />
            </span>
            <h3 className="text-base font-bold text-text-primary mb-2">Intermediate Track</h3>
            <p className="text-xs text-text-secondary mb-4">Build statistical machine learning systems, data visualizations, random forests, and deep learning backprop models.</p>
            <Link href="/learn/ml/intro" className="text-xs text-accent-purple font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
              <span>Explore ML concepts</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 bg-bg-surface/10 border border-border-subtle rounded-2xl backdrop-blur-sm hover:border-accent-rose/30 transition-all group">
            <span className="w-10 h-10 rounded-xl bg-accent-rose/10 text-accent-rose flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </span>
            <h3 className="text-base font-bold text-text-primary mb-2">Advanced Track</h3>
            <p className="text-xs text-text-secondary mb-4">Construct custom Large Language Models, Generative RAG structures, function-calling agents, and MCP ecosystems.</p>
            <Link href="/learn/gen-ai/transformers-intro" className="text-xs text-accent-rose font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
              <span>Advance to GenAI/Agents</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
