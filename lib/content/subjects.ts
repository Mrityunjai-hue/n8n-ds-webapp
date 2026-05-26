import { 
  Database, 
  Layout, 
  Code2, 
  Binary, 
  Table, 
  BarChart3, 
  Cpu, 
  Network, 
  Sparkles, 
  Bot,
  BookOpen
} from 'lucide-react';
import { SubjectContent } from '../types/content';

// ─── Rich topic content modules ───────────────────────────────────────────────
import { foundationTopics } from './topics/foundation';
import { sqlTopics } from './topics/sql';
import { pythonTopics } from './topics/python';
import { mlTopics } from './topics/ml';
import { deepLearningTopics } from './topics/deep-learning';
import { numpyTopics } from './topics/numpy';
import { genAITopics } from './topics/gen-ai';
import { pandasTopics } from './topics/pandas';
import { powerBITopics } from './topics/power-bi';
import { visualizationTopics } from './topics/visualization';
import { agenticAITopics } from './topics/agentic-ai';

export const subjects: SubjectContent[] = [
  {
    id: 'foundation',
    slug: 'foundation',
    name: 'Foundation Framework',
    description: 'Level 0: Understand the story of data, how computers work, basic math, and the AI roadmap.',
    icon: BookOpen,
    color: 'from-gray-500 to-slate-600',
    level: 0,
    estimatedHours: 6,
    topics: foundationTopics,
  },
  {
    id: 'sql',
    slug: 'sql',
    name: 'SQL Mastery',
    description: 'Learn to speak the language of databases. From SELECT to complex JOINs, Window Functions and CTEs.',
    icon: Database,
    color: 'from-blue-500 to-cyan-500',
    level: 1,
    estimatedHours: 20,
    topics: sqlTopics,
  },
  {
    id: 'python',
    slug: 'python',
    name: 'Python for DS',
    description: 'Master Python from fundamentals to advanced OOP, decorators, generators, and data science patterns.',
    icon: Code2,
    color: 'from-yellow-400 to-orange-500',
    level: 2,
    estimatedHours: 20,
    topics: pythonTopics,
  },
  {
    id: 'bi',
    slug: 'power-bi',
    name: 'Power BI',
    description: 'Data visualization and business intelligence reporting with Power BI, DAX, and Power Query.',
    icon: Layout,
    color: 'from-yellow-500 to-amber-600',
    level: 3,
    estimatedHours: 10,
    topics: powerBITopics,
  },
  {
    id: 'numpy',
    slug: 'numpy',
    name: 'NumPy Mastery',
    description: 'Fast numerical computing with ndarray. Master vectorization, broadcasting, indexing, and linear algebra.',
    icon: Binary,
    color: 'from-cyan-500 to-teal-500',
    level: 4,
    estimatedHours: 12,
    topics: numpyTopics,
  },
  {
    id: 'pandas',
    slug: 'pandas',
    name: 'Pandas for Data',
    description: 'Data manipulation and analysis with DataFrames — cleaning, merging, groupby, and time series.',
    icon: Table,
    color: 'from-indigo-500 to-blue-600',
    level: 5,
    estimatedHours: 15,
    topics: pandasTopics,
  },
  {
    id: 'ml',
    slug: 'ml-basics',
    name: 'Machine Learning',
    description: 'From Linear Regression to Ensemble Methods — supervised, unsupervised learning, and model evaluation.',
    icon: Cpu,
    color: 'from-green-500 to-emerald-500',
    level: 6,
    estimatedHours: 30,
    topics: mlTopics,
  },
  {
    id: 'visualization',
    slug: 'visualization',
    name: 'Data Visualization',
    description: 'Matplotlib, Seaborn, and Plotly — craft compelling visual stories from data.',
    icon: BarChart3,
    color: 'from-orange-500 to-red-500',
    level: 4,
    estimatedHours: 10,
    topics: visualizationTopics,
  },
  {
    id: 'dl',
    slug: 'deep-learning',
    name: 'Deep Learning',
    description: 'Perceptrons to Transformers. Neural networks, CNNs, RNNs, and the architecture powering modern AI.',
    icon: Network,
    color: 'from-purple-500 to-violet-600',
    level: 8,
    estimatedHours: 30,
    topics: deepLearningTopics,
  },
  {
    id: 'genai',
    slug: 'gen-ai',
    name: 'Generative AI',
    description: 'LLMs, prompt engineering, RAG, fine-tuning, and building AI-powered applications with real APIs.',
    icon: Sparkles,
    color: 'from-pink-500 to-rose-500',
    level: 9,
    estimatedHours: 20,
    topics: genAITopics,
  },
  {
    id: 'agentic',
    slug: 'agentic-ai',
    name: 'Agentic AI',
    description: 'Build autonomous AI agents with LangChain, LangGraph, MCP, tool use, and multi-agent orchestration.',
    icon: Bot,
    color: 'from-violet-600 to-indigo-600',
    level: 10,
    estimatedHours: 20,
    topics: agenticAITopics,
  }
];
