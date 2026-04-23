'use client';

import { doc, updateDoc, arrayUnion, arrayRemove, setDoc, getDoc } from 'firebase/firestore';
import { db } from './config';

export const saveTopicCompletion = async (userId: string, topicId: string, isCompleted: boolean) => {
  const userDocRef = doc(db, 'users', userId);
  
  try {
    await updateDoc(userDocRef, {
      completedTopics: isCompleted ? arrayUnion(topicId) : arrayRemove(topicId),
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error updating topic completion:', error);
  }
};

export const saveTopicNote = async (userId: string, topicId: string, note: string) => {
  const noteDocRef = doc(db, 'users', userId, 'notes', topicId);
  
  try {
    await setDoc(noteDocRef, {
      content: note,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (error) {
    console.error('Error saving note:', error);
  }
};

export const getTopicNote = async (userId: string, topicId: string) => {
  const noteDocRef = doc(db, 'users', userId, 'notes', topicId);
  
  try {
    const docSnap = await getDoc(noteDocRef);
    if (docSnap.exists()) {
      return docSnap.data().content;
    }
    return '';
  } catch (error) {
    console.error('Error fetching note:', error);
    return '';
  }
};
export const toggleBookmark = async (userId: string, topicId: string, isBookmarked: boolean) => {
  const userDocRef = doc(db, 'users', userId);
  
  try {
    await updateDoc(userDocRef, {
      bookmarks: isBookmarked ? arrayUnion(topicId) : arrayRemove(topicId),
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error toggling bookmark:', error);
  }
};

export const getBookmarks = async (userId: string) => {
  const userDocRef = doc(db, 'users', userId);
  
  try {
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      return docSnap.data().bookmarks || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    return [];
  }
};
