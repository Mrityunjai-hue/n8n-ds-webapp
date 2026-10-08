'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * ButtonAnimations — Client component that attaches DOM-level animation effects
 * to buttons across the app. Runs on mount and re-runs on route changes.
 * 
 * Effects:
 * - Particle burst on .btn-primary / .btn-hero click
 * - Shockwave ring on .btn-ghost / .btn-outline click
 * - SVG border-draw on .btn-ghost hover
 * - Magnetic pull on .btn-hero / .btn-magnetic hover
 */
export function ButtonAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    // ── Particle Burst ──
    function initParticleBurst() {
      const COLORS = ['#c8f135', '#00ffe0', '#ffb830', '#ff4060', '#ffffff'];

      document.querySelectorAll('.btn-primary, .btn-hero').forEach((btn) => {
        if ((btn as any)._particleBound) return;
        (btn as any)._particleBound = true;

        btn.addEventListener('click', function (e) {
          const rect = btn.getBoundingClientRect();
          const canvas = document.createElement('canvas');
          const size = 300;
          canvas.width = size;
          canvas.height = size;
          canvas.style.cssText = `
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            left: ${rect.left + rect.width / 2 - size / 2}px;
            top: ${rect.top + rect.height / 2 - size / 2}px;
          `;
          document.body.appendChild(canvas);
          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          const cx = size / 2;
          const cy = size / 2;

          const particles = Array.from({ length: 36 }, () => {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2.5 + Math.random() * 5.5;
            return {
              x: cx,
              y: cy,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              alpha: 1,
              size: 2 + Math.random() * 3.5,
              color: COLORS[Math.floor(Math.random() * COLORS.length)],
              decay: 0.022 + Math.random() * 0.028,
              square: Math.random() > 0.6,
            };
          });

          function draw() {
            if (!ctx) return;
            ctx.clearRect(0, 0, size, size);
            let alive = false;
            particles.forEach((p) => {
              if (p.alpha <= 0) return;
              alive = true;
              p.x += p.vx;
              p.y += p.vy;
              p.vy += 0.1;
              p.alpha -= p.decay;
              ctx.globalAlpha = Math.max(0, p.alpha);
              ctx.fillStyle = p.color;
              if (p.square) {
                ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
              } else {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
              }
            });
            ctx.globalAlpha = 1;
            if (alive) requestAnimationFrame(draw);
            else canvas.remove();
          }
          draw();
        });
      });
    }

    // ── Shockwave Ring ──
    function initShockwave() {
      document.querySelectorAll('.btn-ghost, .btn-outline').forEach((btn) => {
        if ((btn as any)._shockwaveBound) return;
        (btn as any)._shockwaveBound = true;

        btn.addEventListener('click', function () {
          [0, 160].forEach((delay) => {
            setTimeout(() => {
              const ring = document.createElement('div');
              ring.style.cssText = `
                position:      absolute;
                inset:         0;
                border-radius: inherit;
                border:        2px solid var(--lime);
                opacity:       0.7;
                pointer-events:none;
                z-index:       0;
                animation:     shockwave-expand 0.6s ease-out forwards;
              `;
              btn.appendChild(ring);
              ring.addEventListener('animationend', () => ring.remove());
            }, delay);
          });
        });
      });
    }

    // ── Border Draw (ghost buttons) ──
    function initBorderDraw() {
      document.querySelectorAll('.btn-ghost').forEach((btn) => {
        if (btn.querySelector('svg.btn-border-svg')) return;

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.classList.add('btn-border-svg');
        svg.style.cssText = `
          position:absolute;inset:0;width:100%;height:100%;
          overflow:visible;pointer-events:none;
        `;
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('width', '100%');
        rect.setAttribute('height', '100%');
        rect.setAttribute('rx', '8');
        rect.style.cssText = `
          fill:             none;
          stroke:           #c8f135;
          stroke-width:     1.5;
          stroke-dasharray: 600;
          stroke-dashoffset:600;
          transition:       stroke-dashoffset 0.5s ease;
        `;
        svg.appendChild(rect);
        btn.appendChild(svg);

        btn.addEventListener('mouseenter', () => {
          rect.style.strokeDashoffset = '0';
        });
        btn.addEventListener('mouseleave', () => {
          rect.style.strokeDashoffset = '600';
        });
      });
    }

    // ── Magnetic Pull (hero CTA) ──
    function initMagnetic() {
      document.querySelectorAll('.btn-hero, .btn-magnetic').forEach((wrap) => {
        if ((wrap as any)._magneticBound) return;
        (wrap as any)._magneticBound = true;

        wrap.addEventListener('mousemove', (e: Event) => {
          const mouseEvent = e as MouseEvent;
          const r = (wrap as HTMLElement).getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const dx = mouseEvent.clientX - cx;
          const dy = mouseEvent.clientY - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxD = r.width * 0.75;
          if (dist < maxD) {
            const pull = 1 - dist / maxD;
            const tx = dx * pull * 0.35;
            const ty = dy * pull * 0.35;
            (wrap as HTMLElement).style.transform = `translate(${tx}px, ${ty}px)`;
            (wrap as HTMLElement).style.transition = 'transform 0.1s ease-out';
          }
        });
        wrap.addEventListener('mouseleave', () => {
          (wrap as HTMLElement).style.transform = 'translate(0, 0)';
          (wrap as HTMLElement).style.transition = 'transform 0.45s cubic-bezier(0.23, 1, 0.32, 1)';
        });
      });
    }

    // Initialize all effects
    const timer = setTimeout(() => {
      initParticleBurst();
      initShockwave();
      initBorderDraw();
      initMagnetic();
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
