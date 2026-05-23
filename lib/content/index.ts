import { subjects } from './subjects';
import { SubjectContent, Topic } from '../types/content';

export const getAllSubjects = (): SubjectContent[] => {
  return subjects;
};

export const getSubjectBySlug = (slug: string): SubjectContent | undefined => {
  return subjects.find(s => s.slug === slug || s.id === slug);
};

export const getTopicBySlug = (subjectSlug: string, topicSlug: string): { subject: SubjectContent, topic: Topic } | undefined => {
  const subject = getSubjectBySlug(subjectSlug);
  if (!subject) return undefined;
  
  const topic = subject.topics.find(t => t.slug === topicSlug || t.id === topicSlug);
  if (!topic) return undefined;
  
  return { subject, topic };
};

export const getAllTopicPaths = () => {
  const paths: { subject: string, topic: string }[] = [];
  
  subjects.forEach(subject => {
    subject.topics.forEach(topic => {
      paths.push({
        subject: subject.slug,
        topic: topic.slug,
      });
    });
  });
  
  return paths;
};
