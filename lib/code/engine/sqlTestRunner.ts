// lib/code/engine/sqlTestRunner.ts

import { TestCase, TestResult, ExecutionResult, Assertion } from '../types';

/**
 * Compares two scalar values with loose normalization (handles string trimming, numbers, nulls).
 */
function valuesEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a === null || a === undefined) return b === null || b === undefined;
  if (b === null || b === undefined) return false;

  // Convert numbers or numeric strings
  if (typeof a === 'number' || typeof b === 'number') {
    const numA = Number(a);
    const numB = Number(b);
    if (!isNaN(numA) && !isNaN(numB)) {
      return Math.abs(numA - numB) < 0.0001;
    }
  }

  return String(a).trim().toLowerCase() === String(b).trim().toLowerCase();
}

/**
 * Checks if two 2D arrays contain equal rows (unordered match).
 */
function arraysEquivalent(actual: unknown[][], expected: unknown[][]): boolean {
  if (actual.length !== expected.length) return false;
  
  // Clone expected to mark matches
  const matchedIndices = new Set<number>();

  for (const actRow of actual) {
    let found = false;
    for (let i = 0; i < expected.length; i++) {
      if (matchedIndices.has(i)) continue;
      const expRow = expected[i];
      if (actRow.length === expRow.length && actRow.every((val, idx) => valuesEqual(val, expRow[idx]))) {
        matchedIndices.add(i);
        found = true;
        break;
      }
    }
    if (!found) return false;
  }

  return matchedIndices.size === expected.length;
}

/**
 * Checks if two 2D arrays are strictly identical in row and column order.
 */
function arraysOrderedMatch(actual: unknown[][], expected: unknown[][]): boolean {
  if (actual.length !== expected.length) return false;
  return actual.every((row, rowIdx) => {
    const expRow = expected[rowIdx];
    return row.length === expRow.length && row.every((val, colIdx) => valuesEqual(val, expRow[colIdx]));
  });
}

/**
 * Evaluates a single test case against query execution results.
 */
export function evaluateTestCase(
  testCase: TestCase,
  executionResult: ExecutionResult
): TestResult {
  if (!executionResult.success || executionResult.error) {
    return {
      testCaseId: testCase.id,
      passed: false,
      description: testCase.description,
      expected: testCase.expected,
      actual: executionResult.error || 'Execution failed',
      assertion: testCase.assertion,
      error: executionResult.error || 'Query failed to execute',
      isHidden: testCase.isHidden,
    };
  }

  const columns = executionResult.columns || [];
  const rows = executionResult.values || [];
  const expected = testCase.expected;

  let passed = false;
  let actual: unknown = null;

  switch (testCase.assertion) {
    case 'row_count': {
      const expCount = Number(expected);
      actual = rows.length;
      passed = rows.length === expCount;
      break;
    }

    case 'exact_match': {
      actual = rows;
      if (Array.isArray(expected)) {
        passed = arraysEquivalent(rows, expected as unknown[][]);
      } else {
        passed = false;
      }
      break;
    }

    case 'ordered_match': {
      actual = rows;
      if (Array.isArray(expected)) {
        passed = arraysOrderedMatch(rows, expected as unknown[][]);
      } else {
        passed = false;
      }
      break;
    }

    case 'contains_row': {
      actual = rows;
      if (Array.isArray(expected)) {
        passed = rows.some((row) =>
          row.length === (expected as unknown[]).length &&
          row.every((v, i) => valuesEqual(v, (expected as unknown[])[i]))
        );
      } else {
        passed = false;
      }
      break;
    }

    case 'column_names': {
      actual = columns;
      if (Array.isArray(expected)) {
        const expCols = (expected as string[]).map((c) => c.toLowerCase().trim());
        const actCols = columns.map((c) => c.toLowerCase().trim());
        passed = expCols.length === actCols.length && expCols.every((c, i) => c === actCols[i]);
      } else {
        passed = false;
      }
      break;
    }

    case 'value_in_column': {
      actual = rows;
      const target = expected;
      passed = rows.some((row) => row.some((val) => valuesEqual(val, target)));
      break;
    }

    case 'no_error': {
      actual = 'Success';
      passed = executionResult.success;
      break;
    }

    default:
      passed = false;
      actual = 'Unknown assertion';
  }

  return {
    testCaseId: testCase.id,
    passed,
    description: testCase.description,
    expected: testCase.expected,
    actual,
    assertion: testCase.assertion,
    isHidden: testCase.isHidden,
  };
}

/**
 * Runs a list of test cases against an execution result.
 */
export function evaluateAllTestCases(
  testCases: TestCase[],
  executionResult: ExecutionResult
): TestResult[] {
  return testCases.map((tc) => evaluateTestCase(tc, executionResult));
}
