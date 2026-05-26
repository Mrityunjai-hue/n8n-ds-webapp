import { Topic } from '../../types/content';

export const foundationTopics: Topic[] = [
  {
    id: 'foundation-story-of-ds',
    slug: 'story-of-data-science',
    title: 'Lecture 1 — The Story of Data Science',
    description: 'Understand what the heck is Data Science !!',
    difficulty: 'Beginner',
    estimatedMinutes: 45,
    tags: ['data-science', 'fundamentals', 'intro'],
    sections: {
      what: {
        title: 'What is this?',
        text: 'An introduction to understand "what the heck is Data Science!!". It covers the overarching narrative, the evolution of data, and how it drives modern decisions.'
      },
      why: {
        title: 'Why It Is Important',
        text: 'Before diving into code, it is crucial to understand the "Why" behind Data Science. This story provides the context and motivation for everything that follows.'
      },
      resources: {
        videoResources: [
          {
            title: 'The Story of Data Science',
            url: 'https://youtube.com/playlist?list=PLL1nZBDCiAlaKdP82Cum5GQT5ZNvDN1Ui',
            duration: '41m 47s',
            type: 'playlist'
          }
        ]
      }
    },
    interviewQuestions: []
  },
  {
    id: 'foundation-how-computers-work',
    slug: 'how-computers-work',
    title: 'Lecture 2 — How Computers Work',
    description: 'A foundational deep-dive into the machinery that powers all our code.',
    difficulty: 'Beginner',
    estimatedMinutes: 45,
    tags: ['computers', 'hardware', 'programming-history'],
    sections: {
      what: {
        title: 'What is this?',
        text: 'A foundational deep-dive into the machinery that powers all our code. It is broken down into three core modules:\n1. A Brief History of Programming\n2. How Computer Works?\n3. How Computer Read Codes?'
      },
      why: {
        title: 'Why It Is Important',
        text: 'Data Science is applied computing. Understanding hardware limits, memory, processing, and how code is interpreted makes you a vastly better programmer and problem solver.'
      },
      resources: {
        videoResources: [
          {
            title: '2.1 A Brief History of Programming',
            url: 'https://youtu.be/9uW6B9LPntY',
            duration: '6m 9s',
            type: 'youtube'
          },
          {
            title: '2.2 How Computer Works?',
            url: 'https://youtube.com/playlist?list=PLzdnOPI1iJNcsRwJhvksEo1tJqjIqWbN',
            duration: '26m 55s',
            type: 'playlist'
          },
          {
            title: '2.3 How Computer Read Codes?',
            url: 'https://youtu.be/QXjU9qTsYCc',
            duration: '12m 1s',
            type: 'youtube'
          }
        ]
      }
    },
    interviewQuestions: []
  },
  {
    id: 'foundation-basic-math',
    slug: 'learning-basic-mathematics',
    title: 'Lecture 3 — Learning Basic Mathematics (Most Wanted)',
    description: 'Learning Basic Mathematics from Basics to understand Maths logically.',
    difficulty: 'Beginner',
    estimatedMinutes: 260,
    tags: ['math', 'logic', 'fundamentals'],
    sections: {
      what: {
        title: 'What is this?',
        text: 'Learning basic mathematics from the ground up to understand math logically. The primary goal is to make math feel visual and practical, avoiding rote memorization.'
      },
      why: {
        title: 'Why It Is Important',
        text: 'Math is the engine of Machine Learning and AI. A solid logical foundation in math eliminates the "black box" fear and allows you to understand algorithms deeply.'
      },
      resources: {
        videoResources: [
          {
            title: 'Learning Basic Mathematics',
            url: 'https://youtu.be/WUmWcMDWYzE',
            duration: '4h 17m',
            type: 'youtube'
          }
        ]
      }
    },
    interviewQuestions: []
  },
  {
    id: 'foundation-ai-roadmap',
    slug: 'ai-roadmap',
    title: 'Lecture 4 — Ultimate Roadmap to Learn Artificial Intelligence',
    description: 'A strategic, step-by-step roadmap tailored for 2026. It guides you from fundamentals to advanced AI concepts.',
    difficulty: 'Beginner',
    estimatedMinutes: 30,
    tags: ['roadmap', 'ai', 'career'],
    sections: {
      what: {
        title: 'What is this?',
        text: 'A strategic, step-by-step roadmap tailored for 2026. It guides you from fundamentals to advanced AI concepts.'
      },
      why: {
        title: 'Why It Is Important',
        text: 'It gives you a bird\'s-eye view of the journey ahead, ensuring you never feel lost while progressing through the levels.'
      },
      resources: {
        videoResources: [
          {
            title: 'Ultimate Roadmap to Learn AI',
            url: 'https://youtu.be/99KPe5hIfnE',
            type: 'youtube'
          },
          {
            title: 'Interactive Roadmap Diagram',
            url: 'https://roadmap.sh/r/ai-roadmap-for-2026---final-draft',
            type: 'link'
          }
        ]
      }
    },
    interviewQuestions: []
  }
];
