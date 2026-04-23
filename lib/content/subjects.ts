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
  Bot 
} from 'lucide-react';
import { SubjectContent, Topic } from '../types/content';

// Helper to create basic topics for scaffolding
const createTopic = (id: string, title: string, slug: string): Topic => ({
  id,
  slug,
  title,
  description: `Learn everything about ${title} in this comprehensive lesson.`,
  sections: {
    what: { 
      text: `${title} is a fundamental concept in this subject.`,
      eli5: `Imagine ${title} is like a special tool in your toolbox.`
    },
    why: { text: `We use ${title} to solve complex problems more efficiently.` },
  },
  interviewQuestions: []
});

export const subjects: SubjectContent[] = [
  {
    id: 'sql',
    slug: 'sql',
    name: 'SQL Mastery',
    description: 'Learn to speak the language of databases. From SELECT to complex JOINs and CTEs.',
    icon: Database,
    level: 1,
    estimatedHours: 12,
    topics: [
      {
        id: 'sql-intro',
        slug: 'intro',
        title: 'What is SQL?',
        description: 'Introduction to Structured Query Language and Relational Databases.',
        sections: {
          what: {
            text: 'SQL (Structured Query Language) is the standard language for managing and manipulating relational databases.',
            eli5: 'Think of SQL as a way to talk to a giant, organized filing cabinet.',
            points: ['Declarative structure', 'Relational model', 'Data integrity']
          },
          why: {
            text: 'Data in modern applications is stored in tables. SQL allows us to extract meaningful insights from millions of rows instantly.',
            tip: 'SQL is the most requested skill for data scientists. Master it early!'
          },
          diagram: {
            chart: 'graph TD\n  A[App] -->|Query| B(Database)\n  B -->|Results| A'
          },
          code: {
            code: 'SELECT * FROM sales\nWHERE amount > 500\nORDER BY date DESC;',
            breakdown: [
              { line: 'SELECT *', explanation: 'Fetches all columns.' },
              { line: 'FROM sales', explanation: 'Target table.' }
            ]
          }
        },
        interviewQuestions: [
          {
            question: 'What is a Primary Key?',
            answer: 'A unique identifier for each record in a table.',
            difficulty: 'Fresher',
            category: 'Conceptual'
          }
        ]
      },
      createTopic('sql-select', 'SELECT Statements', 'select'),
      createTopic('sql-where', 'Filtering Data', 'where'),
    ]
  },
  {
    id: 'python',
    slug: 'python',
    name: 'Python Basics',
    description: 'Master the core of Data Science. Variables, loops, functions, and more.',
    icon: Code2,
    level: 2,
    estimatedHours: 15,
    topics: [
      {
        id: 'py-intro',
        slug: 'intro',
        title: 'Python for Data Science',
        description: 'Why Python is the king of data science and how to get started.',
        sections: {
          what: {
            text: 'Python is a high-level, interpreted language known for its readability and massive ecosystem of data science libraries.',
            eli5: 'Python is like a Swiss Army knife that is really easy to use.'
          },
          code: {
            code: 'name = "N8N"\nprint(f"Welcome to {name}!")',
            breakdown: [
              { line: 'print()', explanation: 'Outputs text to the console.' }
            ]
          }
        },
        interviewQuestions: []
      },
      createTopic('py-vars', 'Variables & Types', 'variables'),
    ]
  },
  // Add other subjects as placeholders for now
  { id: 'bi', slug: 'power-bi', name: 'Power BI', description: 'Data visualization.', icon: Layout, level: 3, estimatedHours: 10, topics: [] },
  { id: 'numpy', slug: 'numpy', name: 'NumPy', description: 'Numerical computing.', icon: Binary, level: 4, estimatedHours: 8, topics: [] },
  { id: 'pandas', slug: 'pandas', name: 'Pandas', description: 'Data manipulation.', icon: Table, level: 5, estimatedHours: 12, topics: [] },
  { id: 'viz', slug: 'data-viz', name: 'Data Visualization', description: 'Matplotlib & Seaborn.', icon: BarChart3, level: 6, estimatedHours: 10, topics: [] },
  { id: 'ml', slug: 'ml-basics', name: 'ML Basics', description: 'Machine Learning.', icon: Cpu, level: 7, estimatedHours: 20, topics: [] },
  { id: 'dl', slug: 'deep-learning', name: 'Deep Learning', description: 'Neural Networks.', icon: Network, level: 8, estimatedHours: 25, topics: [] },
  { id: 'genai', slug: 'gen-ai', name: 'Generative AI', description: 'LLMs & RAG.', icon: Sparkles, level: 9, estimatedHours: 15, topics: [] },
  { id: 'agentic', slug: 'agentic-ai', name: 'Agentic AI', description: 'AI Agents.', icon: Bot, level: 10, estimatedHours: 20, topics: [] },
];
