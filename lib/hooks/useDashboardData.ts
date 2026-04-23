'use client';

import { useState, useEffect } from 'react';
import { getBookmarks } from '@/lib/firebase/db';
import { useUserStore } from '@/lib/store/useUserStore';
import { getAllSubjects } from '@/lib/content';
import { Topic } from '@/lib/types/content';

export const useDashboardData = () => {
  const { user } = useUserStore();
  const [bookmarkedTopics, setBookmarkedTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        const bookmarkIds = await getBookmarks(user.uid);
        const allSubjects = getAllSubjects();
        
        const bookmarks: Topic[] = [];
        allSubjects.forEach(subject => {
          subject.topics.forEach(topic => {
            if (bookmarkIds.includes(topic.id)) {
              bookmarks.push(topic);
            }
          });
        });
        
        setBookmarkedTopics(bookmarks);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user]);

  return { bookmarkedTopics, isLoading };
};
