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
        
        // Seed comprehensive data for the SQL curriculum
        newDb.run(`
          CREATE TABLE customers (
            id INTEGER PRIMARY KEY,
            first_name TEXT,
            last_name TEXT,
            email TEXT,
            city TEXT,
            country TEXT,
            name TEXT
          );
          
          CREATE TABLE employees (
            employee_id INTEGER PRIMARY KEY,
            name TEXT,
            first_name TEXT,
            last_name TEXT,
            email TEXT,
            salary DECIMAL(10, 2),
            department TEXT,
            job_title TEXT,
            manager_id INTEGER
          );
          
          CREATE TABLE products (
            id INTEGER PRIMARY KEY,
            product_name TEXT,
            price DECIMAL(10, 2),
            category TEXT,
            revenue DECIMAL(10, 2)
          );
          
          CREATE TABLE orders (
            id INTEGER PRIMARY KEY,
            order_id INTEGER,
            customer_id INTEGER,
            order_date DATE,
            amount DECIMAL(10, 2),
            status TEXT
          );
          
          CREATE TABLE order_items (
            id INTEGER PRIMARY KEY,
            order_id INTEGER,
            product_id INTEGER,
            quantity INTEGER
          );
          
          CREATE TABLE sales (
            id INTEGER PRIMARY KEY,
            product TEXT,
            amount DECIMAL(10, 2),
            date DATE
          );

          INSERT INTO customers (id, first_name, last_name, name, email, city, country) VALUES
          (1, 'Alice', 'Smith', 'Alice Smith', 'alice@gmail.com', 'New York', 'USA'),
          (2, 'Bob', 'Jones', 'Bob Jones', 'bob@example.com', 'London', 'UK'),
          (3, 'Charlie', 'Brown', 'Charlie Brown', 'charlie@gmail.com', 'New York', 'USA'),
          (4, 'Diana', 'Prince', 'Diana Prince', NULL, 'Paris', 'France'),
          (5, 'Eve', 'Polastri', 'Eve Polastri', 'eve@example.com', 'Berlin', 'Germany');
          
          INSERT INTO employees (employee_id, name, first_name, last_name, email, salary, department, job_title, manager_id) VALUES
          (1, 'John Doe', 'John', 'Doe', 'john@acme.com', 120000.00, 'Engineering', 'Senior Developer', NULL),
          (2, 'Jane Smith', 'Jane', 'Smith', 'jane@acme.com', 95000.00, 'Engineering', 'Developer', 1),
          (3, 'Michael Scott', 'Michael', 'Scott', 'michael@acme.com', 85000.00, 'Sales', 'Regional Manager', NULL),
          (4, 'Jim Halpert', 'Jim', 'Halpert', 'jim@acme.com', 75000.00, 'Sales', 'Sales Rep', 3),
          (5, 'Dwight Schrute', 'Dwight', 'Schrute', 'dwight@acme.com', 80000.00, 'Sales', 'Assistant to the Regional Manager', 3),
          (6, 'Kelly Kapoor', 'Kelly', 'Kapoor', 'kelly@acme.com', 60000.00, 'Customer Service', 'Rep', NULL);
          
          INSERT INTO products (id, product_name, price, category, revenue) VALUES
          (1, 'Laptop', 1200.00, 'Electronics', 12000.00),
          (2, 'Mouse', 25.00, 'Electronics', 2500.00),
          (3, 'Keyboard', 75.00, 'Electronics', 3000.00),
          (4, 'Desk', 300.00, 'Furniture', 3000.00),
          (5, 'Chair', 150.00, 'Furniture', 1500.00),
          (6, 'Pen', 2.00, 'Office Supplies', 200.00);
          
          INSERT INTO orders (id, order_id, customer_id, order_date, amount, status) VALUES
          (1, 101, 1, '2023-01-05', 1225.00, 'Shipped'),
          (2, 102, 1, '2023-02-15', 300.00, 'Shipped'),
          (3, 103, 2, '2023-03-20', 150.00, 'Pending'),
          (4, 104, 3, '2023-04-10', 25.00, 'Processing'),
          (5, 105, 1, '2023-05-01', 75.00, 'Shipped'),
          (6, 106, 1, '2023-05-15', 1200.00, 'Pending');
          
          INSERT INTO order_items (id, order_id, product_id, quantity) VALUES
          (1, 101, 1, 1),
          (2, 101, 2, 1),
          (3, 102, 4, 1),
          (4, 103, 5, 1),
          (5, 104, 2, 1),
          (6, 105, 3, 1),
          (7, 106, 1, 1);

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
    if (!db) return { results: [], error: 'Database not loaded' };

    try {
      const execResults = db.exec(query);
      if (execResults.length === 0) return { results: [], error: null };
      
      const parsedResults = execResults.map(res => ({
        columns: res.columns,
        values: res.values
      }));

      return { 
        results: parsedResults, 
        error: null 
      };
    } catch (err: any) {
      return { results: [], error: err.message };
    }
  }, [db]);

  return { runQuery, isLoading, error };
};
