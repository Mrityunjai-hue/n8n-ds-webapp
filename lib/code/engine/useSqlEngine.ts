'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import initSqlJs, { Database, SqlJsStatic } from 'sql.js';
import { Problem, ExecutionResult, SubmissionResult, TableSchema } from '../types';
import { evaluateAllTestCases } from './sqlTestRunner';

let sqlPromise: Promise<SqlJsStatic> | null = null;

function getSqlJs(): Promise<SqlJsStatic> {
  if (!sqlPromise) {
    sqlPromise = initSqlJs({
      locateFile: (file) => `https://unpkg.com/sql.js@1.14.1/dist/${file}`,
    });
  }
  return sqlPromise;
}

export function useSqlEngine(problem?: Problem) {
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dbRef = useRef<Database | null>(null);
  const sqlInstanceRef = useRef<SqlJsStatic | null>(null);

  // Initialize SQL.js and database instance
  const initDb = useCallback(async (seedSql?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const SQL = await getSqlJs();
      sqlInstanceRef.current = SQL;

      // Close existing db if open
      if (dbRef.current) {
        try {
          dbRef.current.close();
        } catch {
          // ignore
        }
      }

      const db = new SQL.Database();
      if (seedSql && seedSql.trim()) {
        db.run(seedSql);
      }

      dbRef.current = db;
      setIsReady(true);
      setIsLoading(false);
    } catch (err: any) {
      console.error('SQL Engine Init Error:', err);
      setError(err?.message || 'Failed to initialize SQLite WASM engine');
      setIsLoading(false);
    }
  }, []);

  // Initialize whenever problem changes
  useEffect(() => {
    initDb(problem?.seed_sql);
    return () => {
      if (dbRef.current) {
        try {
          dbRef.current.close();
        } catch {
          // ignore
        }
      }
    };
  }, [problem?.id, problem?.seed_sql, initDb]);

  // Execute an ad-hoc query
  const runQuery = useCallback((query: string): ExecutionResult => {
    if (!dbRef.current) {
      return {
        success: false,
        error: 'Database engine not ready. Please wait...',
      };
    }

    const trimmed = query.trim();
    if (!trimmed) {
      return {
        success: false,
        error: 'Query is empty. Type a SQL statement and click Run.',
      };
    }

    const start = performance.now();
    try {
      const results = dbRef.current.exec(trimmed);
      const executionTimeMs = Math.round((performance.now() - start) * 100) / 100;

      if (!results || results.length === 0) {
        return {
          success: true,
          columns: [],
          values: [],
          rowCount: 0,
          executionTimeMs,
        };
      }

      // Return the final result set
      const lastResult = results[results.length - 1];
      return {
        success: true,
        columns: lastResult.columns,
        values: lastResult.values,
        rowCount: lastResult.values.length,
        executionTimeMs,
      };
    } catch (err: any) {
      const executionTimeMs = Math.round((performance.now() - start) * 100) / 100;
      return {
        success: false,
        error: err?.message || 'SQLite syntax error or execution failure',
        executionTimeMs,
      };
    }
  }, []);

  // Run full submission with test cases
  const runSubmission = useCallback(
    async (userQuery: string, currentProblem: Problem): Promise<SubmissionResult> => {
      const start = performance.now();

      // Fresh re-seed to ensure state isn't polluted
      if (sqlInstanceRef.current && currentProblem.seed_sql) {
        if (dbRef.current) {
          try {
            dbRef.current.close();
          } catch {
            // ignore
          }
        }
        dbRef.current = new sqlInstanceRef.current.Database();
        dbRef.current.run(currentProblem.seed_sql);
      }

      const execResult = runQuery(userQuery);
      const executionTimeMs = Math.round((performance.now() - start) * 100) / 100;

      const testResults = evaluateAllTestCases(currentProblem.test_cases, execResult);
      const passedCount = testResults.filter((r) => r.passed).length;
      const allPassed = passedCount === currentProblem.test_cases.length && execResult.success;

      return {
        passed: allPassed,
        totalTests: currentProblem.test_cases.length,
        passedTests: passedCount,
        results: testResults,
        executionTimeMs,
      };
    },
    [runQuery]
  );

  // Helper to extract live schemas from SQLite
  const inspectLiveTables = useCallback((): TableSchema[] => {
    if (!dbRef.current) return [];
    try {
      const tableNamesResult = dbRef.current.exec(
        "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name;"
      );
      if (!tableNamesResult || tableNamesResult.length === 0 || !tableNamesResult[0].values) {
        return [];
      }

      const tableNames = tableNamesResult[0].values.map((row) => String(row[0]));
      const liveSchemas: TableSchema[] = [];

      for (const name of tableNames) {
        // Get column details
        const infoResult = dbRef.current.exec(`PRAGMA table_info(${name});`);
        const columns = [];

        if (infoResult && infoResult.length > 0 && infoResult[0].values) {
          for (const colRow of infoResult[0].values) {
            // cid, name, type, notnull, dflt_value, pk
            const colName = String(colRow[1]);
            const colType = String(colRow[2]).toUpperCase() as any;
            const notNull = Number(colRow[3]) === 1;
            const isPk = Number(colRow[5]) >= 1;

            columns.push({
              name: colName,
              type: colType || 'TEXT',
              nullable: !notNull && !isPk,
              isPrimaryKey: isPk,
            });
          }
        }

        // Get sample rows
        let sample_rows: Record<string, any>[] = [];
        try {
          const sampleResult = dbRef.current.exec(`SELECT * FROM ${name} LIMIT 5;`);
          if (sampleResult && sampleResult.length > 0) {
            const cols = sampleResult[0].columns;
            sample_rows = sampleResult[0].values.map((vRow) => {
              const rObj: Record<string, any> = {};
              cols.forEach((cName, idx) => {
                rObj[cName] = vRow[idx];
              });
              return rObj;
            });
          }
        } catch {
          // ignore
        }

        liveSchemas.push({
          name,
          columns,
          sample_rows,
          description: `Active in-memory table with ${columns.length} columns`,
        });
      }

      return liveSchemas;
    } catch (e) {
      console.error('Error inspecting live tables:', e);
      return [];
    }
  }, []);

  // Inject synthetic or custom SQL statements into active database
  const injectSql = useCallback((sql: string): { success: boolean; error?: string } => {
    if (!dbRef.current) {
      return { success: false, error: 'Database engine is not ready.' };
    }
    try {
      dbRef.current.run(sql);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Execution error during SQL injection' };
    }
  }, []);

  // Reset database back to seed state
  const resetDatabase = useCallback(() => {
    initDb(problem?.seed_sql);
  }, [initDb, problem?.seed_sql]);

  return {
    isReady,
    isLoading,
    error,
    runQuery,
    runSubmission,
    injectSql,
    inspectLiveTables,
    resetDatabase,
  };
}

