'use client';

import React, { useState, useEffect } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useUserStore } from '@/lib/store/useUserStore';
import { toggleBookmark, getBookmarks } from '@/lib/firebase/db';
import { Button } from '../ui/Button';

interface BookmarkButtonProps {
  topicId: string;
}

export const BookmarkButton: React.FC<BookmarkButtonProps> = ({ topicId }) => {
  const { user } = useUserStore();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkBookmark = async () => {
      if (user) {
        const bookmarks = await getBookmarks(user.uid);
        setIsBookmarked(bookmarks.includes(topicId));
      }
    };
    checkBookmark();
  }, [user, topicId]);

  const handleToggle = async () => {
    if (!user) return; // Maybe show auth modal here in future
    
    setIsLoading(true);
    const newState = !isBookmarked;
    await toggleBookmark(user.uid, topicId, newState);
    setIsBookmarked(newState);
    setIsLoading(false);
  };

  if (!user) return null;

  return (
    <button 
      onClick={handleToggle}
      disabled={isLoading}
      className={`
        p-2 rounded-lg transition-all duration-300
        ${isBookmarked 
          ? 'bg-accent-teal/10 text-accent-teal shadow-[0_0_15px_rgba(0,201,167,0.1)]' 
          : 'text-text-secondary hover:bg-bg-surface hover:text-text-primary'}
      `}
      title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Topic'}
    >
      {isBookmarked ? (
        <BookmarkCheck className="w-5 h-5 fill-current" />
      ) : (
        <Bookmark className="w-5 h-5" />
      )}
    </button>
  );
};
