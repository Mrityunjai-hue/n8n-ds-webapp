import { subjects } from '../content/subjects';
import { useMemo } from 'react';

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  type: 'subject' | 'topic' | 'question';
  href: string;
  subjectName?: string;
  topicName?: string;
}

export function useSearchIndex() {
  const searchIndex = useMemo(() => {
    const items: SearchItem[] = [
      {
        id: 'about',
        title: 'About N8N DS Hub',
        description: 'Learn about our mission, vision, and the community behind this project.',
        type: 'subject',
        href: '/about',
      }
    ];

    subjects.forEach((subject) => {
      // Add Subject
      items.push({
        id: `subject-${subject.id}`,
        title: subject.name,
        description: subject.description,
        type: 'subject',
        href: `/learn/${subject.slug}`,
      });

      // Add Topics
      subject.topics.forEach((topic) => {
        items.push({
          id: `topic-${topic.id}`,
          title: topic.title,
          description: `Topic in ${subject.name}`,
          type: 'topic',
          href: `/learn/${subject.slug}/${topic.slug}`,
          subjectName: subject.name,
        });

        // Add Interview Questions
        topic.interviewQuestions.forEach((q, idx) => {
          items.push({
            id: `question-${topic.id}-${idx}`,
            title: q.question,
            description: `Interview Question in ${topic.title}`,
            type: 'question',
            href: `/learn/${subject.slug}/${topic.slug}#interview-questions`,
            subjectName: subject.name,
            topicName: topic.title,
          });
        });
      });
    });

    return items;
  }, []);

  return searchIndex;
}
