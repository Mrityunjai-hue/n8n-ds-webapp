'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Train, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Sparkles,
  MapPin,
  ExternalLink,
  Layers,
  Database,
  Code2,
  Cpu,
  Binary,
  Table,
  BarChart3,
  Network,
  Bot
} from 'lucide-react';
import { subjects } from '@/lib/content/subjects';
import { useProgressStore } from '@/lib/store/useProgressStore';
import { motion, AnimatePresence } from 'framer-motion';

interface Station {
  id: string;
  name: string;
  stationCode: string;
  line: 'core' | 'engineering' | 'intelligence';
  level: number;
  slug: string;
  x: number; // SVG coordinates
  y: number;
  topicsCount: number;
  estimatedHours: number;
  isInterchange?: boolean;
  isTerminal?: boolean;
  description: string;
  connections: string[];
}

const stations: Station[] = [
  // ── CORE & ANALYTICS LINE (BLUE) ──
  {
    id: 'foundation',
    name: 'Foundation Framework',
    stationCode: 'FND-00',
    line: 'core',
    level: 0,
    slug: 'foundation',
    x: 80,
    y: 280,
    topicsCount: 4,
    estimatedHours: 6,
    description: 'Computational logic, binary architecture, discrete math, and computer memory.',
    connections: ['sql'],
  },
  {
    id: 'sql',
    name: 'SQL Mastery',
    stationCode: 'SQL-01',
    line: 'core',
    level: 1,
    slug: 'sql',
    x: 240,
    y: 280,
    topicsCount: 20,
    estimatedHours: 20,
    isInterchange: true,
    description: 'Relational databases, multi-table JOINs, subqueries, CTEs, Window Functions & SQLite WASM.',
    connections: ['python', 'bi'],
  },
  {
    id: 'bi',
    name: 'Power BI & Analytics',
    stationCode: 'PBI-03',
    line: 'core',
    level: 3,
    slug: 'power-bi',
    x: 400,
    y: 440,
    topicsCount: 6,
    estimatedHours: 12,
    isTerminal: true,
    description: 'DAX formulas, star schemas, Power Query M & executive KPI dashboards.',
    connections: [],
  },

  // ── SOFTWARE & DATA ENGINEERING LINE (GREEN) ──
  {
    id: 'python',
    name: 'Python for Data Science',
    stationCode: 'PY-02',
    line: 'engineering',
    level: 2,
    slug: 'python',
    x: 400,
    y: 200,
    topicsCount: 18,
    estimatedHours: 25,
    isInterchange: true,
    description: 'Advanced OOP, decorators, generators, data structures & scientific algorithms.',
    connections: ['numpy', 'visualization'],
  },
  {
    id: 'numpy',
    name: 'NumPy Arrays & Tensors',
    stationCode: 'NUM-04',
    line: 'engineering',
    level: 4,
    slug: 'numpy',
    x: 560,
    y: 120,
    topicsCount: 10,
    estimatedHours: 14,
    description: 'N-dimensional arrays, vectorization, broadcasting & linear algebra.',
    connections: ['pandas'],
  },
  {
    id: 'visualization',
    name: 'Data Visualization',
    stationCode: 'VIZ-04',
    line: 'engineering',
    level: 4,
    slug: 'visualization',
    x: 560,
    y: 280,
    topicsCount: 8,
    estimatedHours: 10,
    description: 'Matplotlib, Seaborn, chart grammar, distribution plots & aesthetic design.',
    connections: ['ml'],
  },
  {
    id: 'pandas',
    name: 'Pandas Data Wrangling',
    stationCode: 'PD-05',
    line: 'engineering',
    level: 5,
    slug: 'pandas',
    x: 720,
    y: 120,
    topicsCount: 12,
    estimatedHours: 18,
    isInterchange: true,
    description: 'Dataframe manipulation, missing value strategies, groupbys & time series.',
    connections: ['ml'],
  },

  // ── MACHINE LEARNING & INTELLIGENCE LINE (RED) ──
  {
    id: 'ml',
    name: 'Machine Learning',
    stationCode: 'ML-06',
    line: 'intelligence',
    level: 6,
    slug: 'ml-basics',
    x: 880,
    y: 200,
    topicsCount: 20,
    estimatedHours: 30,
    isInterchange: true,
    description: 'Scikit-learn, regression, decision trees, random forests, boosting & metrics.',
    connections: ['dl'],
  },
  {
    id: 'dl',
    name: 'Deep Learning & PyTorch',
    stationCode: 'DL-08',
    line: 'intelligence',
    level: 8,
    slug: 'deep-learning',
    x: 1020,
    y: 200,
    topicsCount: 14,
    estimatedHours: 35,
    description: 'PyTorch autograd, CNNs for computer vision, RNNs & Transformer foundations.',
    connections: ['genai'],
  },
  {
    id: 'genai',
    name: 'Generative AI & LLMs',
    stationCode: 'GEN-09',
    line: 'intelligence',
    level: 9,
    slug: 'gen-ai',
    x: 1160,
    y: 120,
    topicsCount: 10,
    estimatedHours: 25,
    description: 'Prompt engineering, vector embeddings, semantic search, RAG & fine-tuning.',
    connections: ['agentic'],
  },
  {
    id: 'agentic',
    name: 'Agentic AI Systems',
    stationCode: 'AGI-10',
    line: 'intelligence',
    level: 10,
    slug: 'agentic-ai',
    x: 1160,
    y: 320,
    topicsCount: 10,
    estimatedHours: 30,
    isTerminal: true,
    description: 'Autonomous AI agents, tool invocation, LangGraph state machines & multi-agent swarms.',
    connections: [],
  },
];

const lineConfigs = {
  core: {
    name: 'Line 1: Database & BI Express',
    color: '#2563eb', // Blue
    darkColor: '#60a5fa',
    badge: 'bg-blue-500 text-white',
  },
  engineering: {
    name: 'Line 2: Python & Data Engineering',
    color: '#16a34a', // Green
    darkColor: '#4ade80',
    badge: 'bg-emerald-500 text-white',
  },
  intelligence: {
    name: 'Line 3: Machine Learning & Agentic AI',
    color: '#dc2626', // Red
    darkColor: '#f87171',
    badge: 'bg-red-500 text-white',
  },
};

export const RoadmapGraph: React.FC = () => {
  const { completedTopics } = useProgressStore();
  const [activeLine, setActiveLine] = useState<'all' | 'core' | 'engineering' | 'intelligence'>('all');
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [hoveredStation, setHoveredStation] = useState<Station | null>(null);

  const activeStation = hoveredStation || selectedStation;

  return (
    <div className="w-full select-none space-y-6">
      
      {/* ── TOP TRANSIT LINE FILTER BAR ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border-2 border-[var(--canvas-border)] bg-[var(--canvas-raised)] shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-[var(--canvas)] border-2 border-[var(--canvas-border)] flex items-center justify-center text-[var(--ink)]">
            <Train className="w-5 h-5 text-[var(--blue)]" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-mono uppercase text-[var(--ink)] leading-none">
              Transit Lines
            </h3>
            <span className="text-[11px] font-mono text-[var(--ink-3)]">
              Interactive System Map
            </span>
          </div>
        </div>

        {/* Line Switcher Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {[
            { id: 'all', label: '🚇 Full System (All 3 Lines)', color: 'bg-black text-white' },
            { id: 'core', label: '🔵 Line 1: SQL & BI', color: 'bg-blue-600 text-white' },
            { id: 'engineering', label: '🟢 Line 2: Python & Pandas', color: 'bg-emerald-600 text-white' },
            { id: 'intelligence', label: '🔴 Line 3: ML & Agentic AI', color: 'bg-red-600 text-white' },
          ].map((l) => (
            <button
              key={l.id}
              onClick={() => setActiveLine(l.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer border-2 ${
                activeLine === l.id
                  ? `${l.color} border-black shadow-[2px_2px_0px_#000]`
                  : 'bg-[var(--canvas)] text-[var(--ink-2)] border-[var(--canvas-border)] hover:border-[var(--ink)]'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          CLEAN SUBWAY / METRO TRANSIT MAP CANVAS
          ══════════════════════════════════════════════════════════════ */}
      <div className="relative w-full rounded-3xl border-3 border-[var(--canvas-border)] bg-[var(--canvas-raised)] shadow-[var(--shadow-md)] overflow-hidden">
        
        {/* Transit Header Title Strip */}
        <div className="px-6 py-3 border-b-2 border-[var(--canvas-border)] bg-[var(--canvas-sunken)] flex items-center justify-between text-xs font-mono font-bold text-[var(--ink-2)]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[var(--ink)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--blue)] inline-block" />
              <span>DATA SCIENCE TRANSIT NETWORK</span>
            </span>
            <span className="hidden sm:inline">&bull; 11 STATIONS</span>
            <span className="hidden sm:inline">&bull; 100+ TOPICS</span>
          </div>

          <div className="text-[11px] text-[var(--ink-3)]">
            Click any station to view connections
          </div>
        </div>

        {/* ── METRO VECTOR DIAGRAM (1280 x 520) ── */}
        <div className="relative w-full overflow-x-auto overflow-y-hidden bg-[var(--canvas-raised)]">
          <div className="min-w-[760px] lg:min-w-full aspect-[21/9] min-h-[360px] sm:min-h-[520px]">
            <svg
              viewBox="0 0 1280 520"
              className="w-full h-full select-none"
            >
            {/* Background Grid Pattern */}
            <defs>
              <pattern id="metro-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="40" y2="0" stroke="var(--canvas-border)" strokeWidth="0.8" opacity="0.3" />
                <line x1="0" y1="0" x2="0" y2="40" stroke="var(--canvas-border)" strokeWidth="0.8" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="1280" height="520" fill="url(#metro-grid)" />

            {/* ═════════ 1. TRANSIT TRACK LINES (45° & 90° ANGLES) ═════════ */}
            
            {/* LINE 1 (BLUE): Foundations -> SQL -> Power BI */}
            <g opacity={activeLine === 'all' || activeLine === 'core' ? 1 : 0.15} className="transition-opacity duration-300">
              {/* Main Track Segment */}
              <path
                d="M 80,280 L 240,280"
                fill="none"
                stroke="#2563eb"
                strokeWidth="10"
                strokeLinecap="round"
              />
              {/* Branch down to Power BI (90° then 45° angle) */}
              <path
                d="M 240,280 L 320,360 L 320,440 L 400,440"
                fill="none"
                stroke="#2563eb"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>

            {/* LINE 2 (GREEN): SQL -> Python -> NumPy/Viz -> Pandas */}
            <g opacity={activeLine === 'all' || activeLine === 'engineering' ? 1 : 0.15} className="transition-opacity duration-300">
              {/* Interchange from SQL up to Python (45° diagonal) */}
              <path
                d="M 240,280 L 320,200 L 400,200"
                fill="none"
                stroke="#16a34a"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Python -> NumPy (Up 45°) */}
              <path
                d="M 400,200 L 480,120 L 560,120 L 720,120"
                fill="none"
                stroke="#16a34a"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Python -> Data Viz (Down 45°) */}
              <path
                d="M 400,200 L 480,280 L 560,280"
                fill="none"
                stroke="#16a34a"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Data Viz -> ML connection */}
              <path
                d="M 560,280 L 720,280 L 800,200 L 880,200"
                fill="none"
                stroke="#16a34a"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>

            {/* LINE 3 (RED): Pandas/ML -> Deep Learning -> GenAI -> Agentic AI */}
            <g opacity={activeLine === 'all' || activeLine === 'intelligence' ? 1 : 0.15} className="transition-opacity duration-300">
              {/* Pandas to ML junction */}
              <path
                d="M 720,120 L 800,200 L 880,200 L 1020,200"
                fill="none"
                stroke="#dc2626"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* DL to GenAI (Up 45°) */}
              <path
                d="M 1020,200 L 1080,120 L 1160,120"
                fill="none"
                stroke="#dc2626"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* GenAI to Agentic AI (Down 90°) */}
              <path
                d="M 1160,120 L 1160,320"
                fill="none"
                stroke="#dc2626"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Direct express bypass from Python to Agentic AI (Dotted gold line) */}
              <path
                d="M 400,200 Q 780,420 1160,320"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="4"
                strokeDasharray="6 6"
                strokeLinecap="round"
              />
            </g>

            {/* ═════════ 2. METRO STATION STOPS (CIRCLES & BADGES) ═════════ */}
            {stations.map((st) => {
              const inActiveLine = activeLine === 'all' || activeLine === st.line;
              const isHovered = hoveredStation?.id === st.id;
              const isSelected = selectedStation?.id === st.id;

              const subject = subjects.find((s) => s.id === st.id);
              const topicIds = subject?.topics.map((t) => t.id) || [];
              const completedCount = topicIds.filter((id) => completedTopics.includes(id)).length;
              const isMastered = completedCount === topicIds.length && topicIds.length > 0;

              const lineColor =
                st.line === 'core'
                  ? '#2563eb'
                  : st.line === 'engineering'
                  ? '#16a34a'
                  : '#dc2626';

              return (
                <g
                  key={st.id}
                  transform={`translate(${st.x}, ${st.y})`}
                  className={`cursor-pointer transition-all duration-300 select-none ${
                    inActiveLine ? 'opacity-100' : 'opacity-25'
                  }`}
                  onClick={() => setSelectedStation(st)}
                  onMouseEnter={() => setHoveredStation(st)}
                  onMouseLeave={() => setHoveredStation(null)}
                >
                  {/* Outer Glow on Hover */}
                  {(isHovered || isSelected) && (
                    <circle
                      cx="0"
                      cy="0"
                      r="28"
                      fill={lineColor}
                      opacity="0.25"
                      className="animate-pulse"
                    />
                  )}

                  {/* Station Outer Ring */}
                  <circle
                    cx="0"
                    cy="0"
                    r={st.isInterchange ? '18' : st.isTerminal ? '16' : '14'}
                    fill="var(--canvas-raised)"
                    stroke={lineColor}
                    strokeWidth={st.isInterchange ? '5' : '4'}
                  />

                  {/* Inner Station Center Pill */}
                  <circle
                    cx="0"
                    cy="0"
                    r={st.isInterchange ? '8' : '6'}
                    fill={isMastered ? '#eab308' : 'var(--ink)'}
                  />

                  {/* Level Pill Above Station */}
                  <g transform="translate(0, -28)">
                    <rect
                      x="-22"
                      y="-8"
                      width="44"
                      height="16"
                      rx="8"
                      fill="var(--ink)"
                      stroke="var(--canvas-border)"
                      strokeWidth="1"
                    />
                    <text
                      x="0"
                      y="3.5"
                      textAnchor="middle"
                      fill="var(--canvas-raised)"
                      fontSize="9"
                      fontWeight="bold"
                      fontFamily="var(--font-mono)"
                    >
                      L{st.level}
                    </text>
                  </g>

                  {/* Station Name Below Station */}
                  <g transform="translate(0, 34)">
                    <rect
                      x="-80"
                      y="-13"
                      width="160"
                      height="26"
                      rx="13"
                      fill="var(--canvas-raised)"
                      stroke="var(--canvas-border)"
                      strokeWidth="2"
                      filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
                    />
                    <text
                      x="0"
                      y="4.5"
                      textAnchor="middle"
                      fill="var(--ink)"
                      fontSize="13"
                      fontWeight="800"
                      fontFamily="var(--font-heading)"
                    >
                      {st.name}
                    </text>
                  </g>

                  {/* Terminal Star Badge */}
                  {st.isTerminal && (
                    <g transform="translate(18, -18)">
                      <circle cx="0" cy="0" r="8" fill="#eab308" stroke="#111" strokeWidth="1.5" />
                      <text x="0" y="3" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#111">
                        ★
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

          </svg>
        </div>

          {/* ═════════ 3. INTERACTIVE TRANSIT STATION INSPECTION TICKET ═════════ */}
          <AnimatePresence>
            {activeStation && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 p-5 rounded-2xl border-2 border-[var(--canvas-border)] bg-[var(--canvas-raised)] text-[var(--ink)] shadow-[var(--shadow-lg)] z-30 doodle-card"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${lineConfigs[activeStation.line].badge}`}>
                        {activeStation.stationCode}
                      </span>
                      <span className="text-xs font-mono font-bold text-[var(--ink-3)]">
                        Level {activeStation.level} Stop
                      </span>
                    </div>

                    <h3
                      className="text-2xl font-bold tracking-tight text-[var(--ink)]"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {activeStation.name}
                    </h3>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedStation(null);
                      setHoveredStation(null);
                    }}
                    className="w-6 h-6 rounded-full bg-[var(--canvas-sunken)] hover:bg-[var(--canvas)] flex items-center justify-center text-xs font-bold font-mono cursor-pointer border border-[var(--canvas-border)]"
                  >
                    ✕
                  </button>
                </div>

                <p
                  className="text-xs font-medium text-[var(--ink-2)] mb-3 leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {activeStation.description}
                </p>

                <div className="grid grid-cols-2 gap-2 mb-3 text-xs font-mono">
                  <div className="p-2 rounded-xl bg-[var(--canvas)] border border-[var(--canvas-border)]">
                    <span className="text-[10px] text-[var(--ink-3)] uppercase block font-bold">Curriculum</span>
                    <span className="font-bold text-sm text-[var(--ink)]">{activeStation.topicsCount} Topics</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[var(--canvas)] border border-[var(--canvas-border)]">
                    <span className="text-[10px] text-[var(--ink-3)] uppercase block font-bold">Est. Duration</span>
                    <span className="font-bold text-sm text-[var(--ink)]">~{activeStation.estimatedHours}h Study</span>
                  </div>
                </div>

                {/* Board Train / Start Track CTA */}
                <Link
                  href={`/learn/${activeStation.slug}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border-2 border-black bg-[var(--blue)] hover:bg-[var(--blue-dim)] text-white font-bold text-sm shadow-[2px_2px_0px_#000] transition-transform hover:-translate-y-0.5"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  <span>Board Station / Start Track ➔</span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Bottom Transit System Legend */}
        <div className="px-6 py-3 border-t-2 border-[var(--canvas-border)] bg-[var(--canvas-sunken)] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono font-bold text-[var(--ink-2)]">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-[var(--ink)]">
              <Train className="w-3.5 h-3.5 text-[var(--blue)]" />
              <span>Transit Lines:</span>
            </span>
            <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
              <span className="w-3 h-1 bg-blue-600 rounded-full" />
              <span>Line 1 (SQL/BI)</span>
            </span>
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <span className="w-3 h-1 bg-emerald-600 rounded-full" />
              <span>Line 2 (Python/Data)</span>
            </span>
            <span className="flex items-center gap-1 text-red-600 dark:text-red-400">
              <span className="w-3 h-1 bg-red-600 rounded-full" />
              <span>Line 3 (ML/AI)</span>
            </span>
          </div>

          <div className="text-[11px] text-[var(--ink-3)]">
            Hover or click any stop to inspect topics
          </div>
        </div>

      </div>

    </div>
  );
};
