import { Database, BarChart3, Binary, Layers, PieChart, Brain, Cpu, Sparkles, Network, Terminal } from 'lucide-react';

export interface Subject {
  id: string;
  name: string;
  slug: string;
  icon: any;
  topicCount: number;
  estimatedHours: number;
  description: string;
  level: number;
}

export const subjects: Subject[] = [
  {
    id: 'sql',
    name: 'SQL',
    slug: 'sql',
    icon: Database,
    topicCount: 12,
    estimatedHours: 15,
    description: 'Master data querying and manipulation with SQLite.',
    level: 1,
  },
  {
    id: 'power-bi',
    name: 'Power BI',
    slug: 'power-bi',
    icon: BarChart3,
    topicCount: 8,
    estimatedHours: 10,
    description: 'Build professional business intelligence dashboards.',
    level: 1,
  },
  {
    id: 'python-basics',
    name: 'Python Basics',
    slug: 'python-basics',
    icon: Terminal,
    topicCount: 9,
    estimatedHours: 12,
    description: 'Fundamental Python programming for data science.',
    level: 2,
  },
  {
    id: 'numpy',
    name: 'NumPy',
    slug: 'numpy',
    icon: Binary,
    topicCount: 8,
    estimatedHours: 8,
    description: 'Numerical computing and array manipulation.',
    level: 2,
  },
  {
    id: 'pandas',
    name: 'Pandas',
    slug: 'pandas',
    icon: Layers,
    topicCount: 12,
    estimatedHours: 15,
    description: 'The industry standard for data analysis and manipulation.',
    level: 2,
  },
  {
    id: 'visualization',
    name: 'Data Viz',
    slug: 'visualization',
    icon: PieChart,
    topicCount: 7,
    estimatedHours: 10,
    description: 'Tell stories with Matplotlib and Seaborn.',
    level: 3,
  },
  {
    id: 'ml',
    name: 'Machine Learning',
    slug: 'ml',
    icon: Brain,
    topicCount: 22,
    estimatedHours: 40,
    description: 'Supervised, unsupervised, and predictive modeling.',
    level: 4,
  },
  {
    id: 'deep-learning',
    name: 'Deep Learning',
    slug: 'deep-learning',
    icon: Cpu,
    topicCount: 19,
    estimatedHours: 45,
    description: 'Neural networks, CNNs, LSTMs, and Transformers.',
    level: 5,
  },
  {
    id: 'gen-ai',
    name: 'Gen AI',
    slug: 'gen-ai',
    icon: Sparkles,
    topicCount: 10,
    estimatedHours: 20,
    description: 'LLMs, Prompt Engineering, and RAG pipelines.',
    level: 6,
  },
  {
    id: 'agentic-ai',
    name: 'Agentic AI',
    slug: 'agentic-ai',
    icon: Network,
    topicCount: 8,
    estimatedHours: 25,
    description: 'Building autonomous AI agents and multi-agent systems.',
    level: 6,
  },
];
