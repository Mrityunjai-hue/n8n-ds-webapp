// lib/code/data/problems/index.ts

import { Problem, Difficulty, Track } from '../../types';
import { PENCIL_BATCH_1 } from './p001_p020';
import { PENCIL_BATCH_2 } from './p021_p060';
import { PEN_BATCH_1 } from './p061_p095';
import { PEN_BATCH_2 } from './p096_p125';
import { MARKER_BATCH } from './p126_p155';

export const ALL_PROBLEMS: Problem[] = [
  ...PENCIL_BATCH_1,
  ...PENCIL_BATCH_2,
  ...PEN_BATCH_1,
  ...PEN_BATCH_2,
  ...MARKER_BATCH,
];

export function getProblemBySlug(slug: string): Problem | undefined {
  return ALL_PROBLEMS.find((p) => p.slug === slug || p.id === slug);
}

export function getProblemById(id: string): Problem | undefined {
  return ALL_PROBLEMS.find((p) => p.id === id);
}

export function getProblemsByTrack(track: Track): Problem[] {
  return ALL_PROBLEMS.filter((p) => p.track === track && p.status === 'ready');
}

export function getProblemsByDifficulty(difficulty: Difficulty): Problem[] {
  return ALL_PROBLEMS.filter((p) => p.difficulty === difficulty && p.status === 'ready');
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  ALL_PROBLEMS.forEach((p) => {
    p.tags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}
