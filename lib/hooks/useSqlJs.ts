'use client';

import { useState, useEffect, useCallback } from 'react';
import initSqlJs, { Database, SqlJsStatic } from 'sql.js';

export const useSqlJs = () => {
  const [db, setDb] = useState<Database | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const SQL = await initSqlJs({
          locateFile: (file) => `https://unpkg.com/sql.js@1.14.1/dist/${file}`,
        });
        const newDb = new SQL.Database();
        
        // Seed some initial data for testing
        newDb.run(`
          CREATE TABLE sales (
            id INTEGER PRIMARY KEY,
            product TEXT,
            amount DECIMAL(10, 2),
            date DATE
          );
          INSERT INTO sales (product, amount, date) VALUES 
          ('MacBook Pro', 2499.00, '2023-01-15'),
          ('iPad Air', 599.00, '2023-01-16'),
          ('iPhone 15', 999.00, '2023-01-17'),
          ('AirPods Max', 549.00, '2023-01-18');
        `);

        setDb(newDb);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to initialize SQL environment');
        setIsLoading(false);
      }
    };

    init();
  }, []);

  const runQuery = useCallback((query: string) => {
    if (!db) return { columns: [], values: [], error: 'Database not loaded' };

    try {
      const result = db.exec(query);
      if (result.length === 0) return { columns: [], values: [], error: null };
      
      return { 
        columns: result[0].columns, 
        values: result[0].values, 
        error: null 
      };
    } catch (err: any) {
      return { columns: [], values: [], error: err.message };
    }
  }, [db]);

  return { runQuery, isLoading, error };
};
