// lib/code/types.ts

export type Difficulty = 'pencil' | 'pen' | 'marker';
export type Track = 'sql' | 'python' | 'numpy' | 'pandas' | 'ml';
export type Assertion =
  | 'row_count'
  | 'exact_match'
  | 'ordered_match'
  | 'contains_row'
  | 'column_names'
  | 'value_in_column'
  | 'no_error';

export interface ColumnDef {
  name: string;
  type: 'INTEGER' | 'TEXT' | 'REAL' | 'DATE' | 'DATETIME' | 'TIMESTAMP' | 'VARCHAR' | 'DECIMAL' | 'BOOLEAN';
  nullable: boolean;
  isPrimaryKey?: boolean;
  isForeignKey?: boolean;
  references?: { table: string; column: string };
  description?: string;
}

export interface TableSchema {
  name: string;
  columns: ColumnDef[];
  description?: string;
  sample_rows?: Record<string, any>[];
}

export interface TestCase {
  id: string;
  description: string;    // e.g. "Returns exactly 3 rows"
  assertion: Assertion;
  expected: unknown;      // e.g. 3 for row_count, string[][] for exact_match
  isHidden?: boolean;     // Hidden test cases revealed only on submit
}

export interface HintLevel {
  level: 1 | 2 | 3;
  title: string;
  content: string;        // Markdown content
  inkDropCost: number;   // 0 for level 1 (always free), 5 for level 2, 20 for level 3
}

export interface ProblemSource {
  platform: 'LeetCode' | 'HackerRank' | 'StrataScratch' | 'DataLemur' | 'Mode' | 'SQLZoo' | 'Original';
  externalId?: string;   // e.g. "#176"
  company?: string;      // e.g. "Amazon"
  adaptationNote?: string;
  flagged?: string;      // 'UNVERIFIED' if source could not be confirmed
}

export interface Problem {
  id: string;              // "p001"
  slug: string;            // "combine-two-tables" (URL segment)
  title: string;
  difficulty: Difficulty;
  track: Track;
  tags: string[];          // e.g. ['JOIN', 'LEFT JOIN', 'NULL']
  points: number;
  acceptanceRate?: number;
  status: 'ready' | 'draft' | 'flagged'; // Only 'ready' problems appear to users

  // Content
  description: string;    // Markdown — problem statement
  examples: {
    input?: string;       // Optional: describe input state
    query?: string;       // Optional: sample query
    output: string;       // Expected output description or table
    explanation?: string;
  }[];
  constraints: string[];  // e.g. ["PersonId is the primary key column for Person table"]

  // Database & Execution
  schemas: TableSchema[]; // Tables available in this problem's DB
  seed_sql: string;       // SQL to CREATE and INSERT into problem DB
  starter_code: string;   // Shown in editor on first load
  solution: string;       // Reference solution

  // Learning
  hints: HintLevel[];     // Max 3
  test_cases: TestCase[]; // 3–5 per problem
  related: string[];      // Related problem slugs
  notes?: string;         // Author note / learning insight

  // Provenance
  source: ProblemSource;
}

export interface TestResult {
  testCaseId: string;
  passed: boolean;
  description: string;
  expected: unknown;
  actual: unknown;
  assertion: Assertion;
  error?: string;
  isHidden?: boolean;
}

export interface ExecutionResult {
  success: boolean;
  columns?: string[];
  values?: unknown[][];
  rowCount?: number;
  executionTimeMs?: number;
  error?: string;
}

export interface SubmissionResult {
  passed: boolean;
  totalTests: number;
  passedTests: number;
  results: TestResult[];
  executionTimeMs: number;
}
