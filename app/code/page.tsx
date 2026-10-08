'use client';

import React, { useState } from 'react';
import { ALL_PROBLEMS } from '@/lib/code/data/problems';
import { ProblemBoard } from '@/components/code/ProblemBoard';
import { WelcomeDialog } from '@/components/code/WelcomeDialog';

export default function CodePage() {
  const [showWelcome, setShowWelcome] = useState(false);

  return (
    <>
      <ProblemBoard
        problems={ALL_PROBLEMS}
        onOpenWelcome={() => setShowWelcome(true)}
      />
      <WelcomeDialog
        forceShow={showWelcome}
        onClose={() => setShowWelcome(false)}
      />
    </>
  );
}
