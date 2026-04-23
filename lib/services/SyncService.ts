'use client';

import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useProgressStore } from '../store/useProgressStore';

export const syncLocalProgressToCloud = async (userId: string) => {
  const localCompletedTopics = useProgressStore.getState().completedTopics;
  
  if (localCompletedTopics.length === 0) return;

  const userDocRef = doc(db, 'users', userId);
  
  try {
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      // Create new user record with local progress
      await setDoc(userDocRef, {
        completedTopics: localCompletedTopics,
        updatedAt: new Date().toISOString(),
      });
    } else {
      // Merge with existing progress
      await updateDoc(userDocRef, {
        completedTopics: arrayUnion(...localCompletedTopics),
        updatedAt: new Date().toISOString(),
      });
    }
    
    console.log('Progress synced to cloud successfully');
  } catch (error) {
    console.error('Error syncing progress:', error);
  }
};

export const fetchCloudProgress = async (userId: string) => {
  const userDocRef = doc(db, 'users', userId);
  
  try {
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const data = userDoc.data();
      const cloudCompleted = data.completedTopics || [];
      
      // Update local store with cloud data
      cloudCompleted.forEach((topicId: string) => {
        useProgressStore.getState().completeTopic(topicId);
      });
    }
  } catch (error) {
    console.error('Error fetching cloud progress:', error);
  }
};
