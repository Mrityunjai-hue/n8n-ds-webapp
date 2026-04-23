'use client';

import React, { useEffect } from 'react';
import { useUserStore } from '@/lib/store/useUserStore';
import { useFirebaseAuth } from '@/lib/hooks/useFirebaseAuth';
import { syncLocalProgressToCloud, fetchCloudProgress } from '@/lib/services/SyncService';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useUserStore();
  useFirebaseAuth(); // Initialize listener

  useEffect(() => {
    if (user && !isLoading) {
      // Sync logic when user logs in
      const sync = async () => {
        await syncLocalProgressToCloud(user.uid);
        await fetchCloudProgress(user.uid);
      };
      sync();
    }
  }, [user, isLoading]);

  return <>{children}</>;
};
