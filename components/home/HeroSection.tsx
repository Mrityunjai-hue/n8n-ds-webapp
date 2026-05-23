'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 60;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
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
        ctx.fillStyle = 'rgba(0, 201, 167, 0.3)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = 600;
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

          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 201, 167, ${0.15 - distance / 1000})`;
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

  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32 bg-bg-primary">
      {/* Background Animation */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50"
      />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-teal/10 border border-accent-teal/20 text-accent-teal text-sm font-bold mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-accent-teal animate-pulse" />
          By N8N Data Science Community
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-8xl font-display font-bold leading-tight mb-8 animate-slide-up">
          Learn Data Science.<br />
          <span className="text-accent-teal">Actually understand it.</span>
        </h1>
        
        <p className="text-lg lg:text-2xl text-text-secondary max-w-3xl mx-auto mb-12 leading-relaxed animate-slide-up [animation-delay:100ms]">
          Free. Structured. Built by students, for students. From SQL fundamentals 
          to building Agentic AI systems — with live code and visual diagrams.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-slide-up [animation-delay:200ms]">
          <Link href="/roadmap">
            <Button size="lg" className="px-10 gap-2 group">
              Start Learning 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/roadmap">
            <Button variant="secondary" size="lg" className="px-10">
              View Roadmap
            </Button>
          </Link>
        </div>
      </div>

      {/* Decorative Gradients */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent-teal/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent-blue/10 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
};
