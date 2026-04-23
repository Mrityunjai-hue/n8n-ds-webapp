import { LucideIcon } from 'lucide-react';

export type Difficulty = 'Fresher' | 'Mid' | 'Senior';
export type InterviewCategory = 'Conceptual' | 'Scenario' | 'Coding' | 'Trap';

export interface InterviewQuestion {
  question: string;
  answer: string;
  difficulty: Difficulty;
  category: InterviewCategory;
}

export interface SectionContent {
  title?: string;
  text?: string;
  eli5?: string;
  points?: string[];
  items?: string[]; // For key points
  tip?: string;
  warning?: string;
  chart?: string; // Mermaid syntax
  code?: string; // Initial code for editor
  breakdown?: { line: string; explanation: string }[];
  components?: { title: string; description: string }[]; // For specialized breakdowns
}

export interface Topic {
  id: string;
  slug: string;
  title: string;
  description: string;
  sections: Record<string, SectionContent>;
  interviewQuestions: InterviewQuestion[];
}

export interface SubjectContent {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  level: number;
  estimatedHours: number;
  topics: Topic[];
}
