import { LucideIcon } from 'lucide-react';

export type Difficulty = 'Fresher' | 'Mid' | 'Senior';
export type TopicDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type InterviewCategory = 'Conceptual' | 'Scenario' | 'Coding' | 'Trap';

export interface InterviewQuestion {
  question: string;
  answer: string;
  difficulty: Difficulty;
  category: InterviewCategory;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface RealWorldItem {
  title: string;
  company: string;
  description: string;
  impact?: string;
}

export interface VideoResource {
  title: string;
  url: string;
  duration?: string;
  type: 'youtube' | 'playlist' | 'link';
}

export interface SectionContent {
  title?: string;
  text?: string;
  eli5?: string;
  points?: string[];
  items?: string[];
  tip?: string;
  warning?: string;
  chart?: string;
  code?: string;
  breakdown?: { line: string; explanation: string }[];
  components?: { title: string; description: string }[];
  hint?: string;
  // New rich section types
  examNotes?: string[];
  realWorld?: RealWorldItem[];
  quiz?: QuizQuestion[];
  videoResources?: VideoResource[];
}

export interface Topic {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty?: TopicDifficulty;
  estimatedMinutes?: number;
  prerequisites?: string[];
  tags?: string[];
  sections: Record<string, SectionContent>;
  interviewQuestions: InterviewQuestion[];
}

export interface SubjectContent {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color?: string;
  level: number;
  estimatedHours: number;
  topics: Topic[];
}
