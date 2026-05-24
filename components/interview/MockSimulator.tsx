'use client';

import { useInterviewStore } from '@/lib/store/useInterviewStore';
import SimulatorSetup from './SimulatorSetup';
import SimulatorSession from './SimulatorSession';
import SimulatorResults from './SimulatorResults';

export default function MockSimulator() {
  const status = useInterviewStore(s => s.status);

  if (status === 'idle' || status === 'setup') return <SimulatorSetup />;
  if (status === 'active') return <SimulatorSession />;
  if (status === 'complete') return <SimulatorResults />;
  return null;
}
