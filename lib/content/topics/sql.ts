import { Topic } from '../../types/content';

export const sqlTopics: Topic[] = [
  {
    id: 'sql-intro',
    slug: 'intro',
    title: 'What is SQL?',
    description: 'Introduction to Structured Query Language and relational databases.',
    difficulty: 'Beginner',
    estimatedMinutes: 15,
    tags: ['sql', 'database', 'fundamentals'],
    sections: {
      what: {
        text: `SQL (Structured Query Language) is the universal standard language for communicating with relational databases. It allows you to create, read, update, and delete data stored in tables — operations collectively known as CRUD.

At its core, a relational database organizes data into tables (similar to Excel spreadsheets), where each table has named columns and rows of data. These tables are linked together via shared keys, which is why it is called a "relational" database. SQL is the language that lets you ask questions of this data, join tables together, and extract meaningful insights.

SQL is a **declarative** language — meaning you describe *what* you want (e.g., "show me all customers from New York"), and the database engine figures out *how* to retrieve it efficiently. This is fundamentally different from procedural languages like Python where you specify step-by-step instructions.

SQL was developed at IBM in the 1970s based on Edgar Codd's relational model research. Today, it powers virtually every major application on the internet — from Facebook's data warehouses to the e-commerce database behind Amazon.`,
        eli5: 'SQL is like telling a super-organized librarian exactly what book you want, which shelf to find it on, and they bring it to you instantly — even from a library with a million books.',
        points: ['Declarative: you say WHAT, not HOW', 'Works with tables (rows and columns)', 'Powers 90%+ of modern databases', 'Used by data scientists, analysts, and engineers']
      },
      why: {
        text: 'Almost every company in the world stores its data in a relational database. Whether you are analyzing sales data, building a web app, or doing machine learning, your raw data almost certainly lives in SQL tables. Without SQL, you cannot access the data you need to do your job.',
        tip: 'SQL is consistently the #1 most requested skill in data science job postings. Master it first.'
      },
      diagram: {
        chart: `graph TD
  A[Your SQL Query] -->|Sent to| B(Database Engine)
  B -->|Parses & Plans| C{Query Optimizer}
  C -->|Executes Against| D[("Data Tables")]
  D -->|Returns| E[Result Set]
  E -->|Displayed to| F[You]`
      },
      breakdown: {
        components: [
          { title: 'DDL (Data Definition Language)', description: 'CREATE, ALTER, DROP — defines the structure of tables.' },
          { title: 'DML (Data Manipulation Language)', description: 'SELECT, INSERT, UPDATE, DELETE — works with the data itself.' },
          { title: 'DCL (Data Control Language)', description: 'GRANT, REVOKE — controls permissions and access.' },
          { title: 'TCL (Transaction Control Language)', description: 'COMMIT, ROLLBACK — manages transactions.' }
        ]
      },
      code: {
        code: `-- Your first SQL query: asking a question of a database
SELECT first_name, last_name, email
FROM customers
WHERE city = 'New York'
ORDER BY last_name ASC;`,
        breakdown: [
          { line: 'SELECT first_name, last_name, email', explanation: 'Pick exactly which columns you want to see.' },
          { line: 'FROM customers', explanation: 'Specify which table to look in.' },
          { line: "WHERE city = 'New York'", explanation: 'Filter: only show rows matching this condition.' },
          { line: 'ORDER BY last_name ASC', explanation: 'Sort results alphabetically by last name.' }
        ]
      },
      examNotes: {
        examNotes: [
        'SQL = Structured Query Language (not "Sequel" officially, but pronounced that way)',
        'Relational DB = data stored in tables linked by keys (Primary Key → Foreign Key)',
        'SQL is DECLARATIVE — you define the result, not the steps',
        'RDBMS examples: MySQL, PostgreSQL, SQLite, SQL Server, Oracle',
        'NoSQL databases (MongoDB, Redis) do NOT use SQL'
      ]
      },
      realWorld: {
        realWorld: [
        { title: 'Netflix Recommendations', company: 'Netflix', description: 'Uses SQL to query user watch history, ratings, and behavioral data to feed into the recommendation algorithm.', impact: '80% of Netflix viewing comes from recommendations driven by SQL analytics.' },
        { title: 'Bank Transaction Queries', company: 'JPMorgan Chase', description: 'Every time you check your balance or transfer money, SQL queries are running against massive relational databases in milliseconds.' },
        { title: 'E-Commerce Analytics', company: 'Amazon', description: "Amazon's data analysts write thousands of SQL queries daily to track inventory, analyze sales funnels, and detect fraud patterns." }
      ]
      },
      quiz: {
        quiz: [
        { question: 'What does SQL stand for?', options: ['Structured Query Language', 'Sequential Query Logic', 'System Query Language', 'Structured Question Logic'], correctIndex: 0, explanation: 'SQL stands for Structured Query Language, the standard language for relational databases.' },
        { question: 'Which type of language is SQL?', options: ['Procedural', 'Object-Oriented', 'Declarative', 'Functional'], correctIndex: 2, explanation: 'SQL is declarative — you specify WHAT you want, not HOW to get it. The database engine handles the execution plan.' },
        { question: 'Which of these is NOT a relational database?', options: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite'], correctIndex: 2, explanation: 'MongoDB is a NoSQL document database. It stores data as JSON-like documents, not in relational tables.' }
      ]
      }
    },
    interviewQuestions: [
      { question: 'What is the difference between SQL and NoSQL databases?', answer: 'SQL databases are relational, use structured tables with fixed schemas, and are ideal for structured data with complex queries. NoSQL databases are non-relational, support flexible schemas, and handle unstructured/semi-structured data better. SQL excels at ACID compliance; NoSQL at horizontal scaling.', difficulty: 'Fresher', category: 'Conceptual' },
      { question: 'What is a Primary Key?', answer: 'A Primary Key is a column (or combination of columns) that uniquely identifies each row in a table. It cannot be NULL and must be unique. Every table should have one.', difficulty: 'Fresher', category: 'Conceptual' },
      { question: 'What is a Foreign Key?', answer: 'A Foreign Key is a column in one table that references the Primary Key of another table, creating a link between them. It enforces referential integrity — you cannot insert a foreign key value that does not exist in the referenced table.', difficulty: 'Fresher', category: 'Conceptual' }
    ]
  },

  {
    id: 'sql-select',
    slug: 'select',
    title: 'SELECT & FROM',
    description: 'The fundamental building blocks of any SQL query.',
    difficulty: 'Beginner',
    estimatedMinutes: 20,
    tags: ['select', 'from', 'columns'],
    sections: {
      what: {
        text: `The SELECT statement is the most fundamental SQL command. It tells the database which columns of data you want to retrieve, while the FROM clause tells it which table to look in.

Every single data retrieval operation in SQL starts with SELECT...FROM. Think of a database table as a massive spreadsheet with millions of rows and hundreds of columns. The SELECT keyword is how you choose which columns (vertical slices) to see, and FROM specifies the spreadsheet (table) to read from.

When you write SELECT *, the asterisk is a wildcard meaning "all columns." While convenient for exploration, this is considered bad practice in production because: (1) it returns unnecessary data over the network, (2) it breaks if new columns are added, and (3) it makes code harder to understand at a glance.

Column **aliasing** with the AS keyword allows you to rename columns in your output without changing the table. This is crucial for creating readable reports and for working with calculated expressions.`,
        eli5: "SELECT is like pointing at a menu and saying 'I want the name and price columns.' FROM is saying 'from the products table.' Together they're how you tell a database what information to show you.",
        points: ['SELECT specifies columns (vertical slice)', 'FROM specifies the table', 'Use AS to rename columns in output', 'SELECT * returns all columns — avoid in production']
      },
      why: {
        text: 'In real databases, tables can have 50-200+ columns. Selecting only the columns you need reduces memory usage, network traffic, and query time. It also makes your code self-documenting.',
        tip: "Always name your columns explicitly. Future-you (and your teammates) will thank you."
      },
      diagram: {
        chart: `graph LR
  T[("customers table<br/>id | name | email | age | city")]
  T -->|SELECT name, email| R["Result<br/>name | email"]
  T -->|SELECT *| R2["Result<br/>id | name | email | age | city"]`
      },
      breakdown: {
        components: [
          { title: 'Column Selection', description: 'List specific columns separated by commas: SELECT name, price, category' },
          { title: 'Wildcard *', description: 'Returns ALL columns. Useful for exploration, bad for production.' },
          { title: 'Column Aliasing (AS)', description: "Renames output columns: SELECT first_name AS 'First Name'" },
          { title: 'Literal Values', description: 'You can select static values: SELECT name, 0.1 AS tax_rate' },
          { title: 'Calculated Columns', description: "Create new columns on the fly: SELECT price * 1.1 AS 'price_with_tax'" }
        ]
      },
      code: {
        code: `-- Basic SELECT: choose specific columns
SELECT first_name, last_name, email
FROM customers;

-- Column aliasing: rename output columns
SELECT 
    first_name AS "First Name",
    salary * 12 AS "Annual Salary",
    department AS dept
FROM employees;

-- DISTINCT: remove duplicate values
SELECT DISTINCT city
FROM customers;`,
        breakdown: [
          { line: 'SELECT first_name, last_name, email', explanation: 'Only fetch these 3 columns, not all 20 columns in the table.' },
          { line: 'salary * 12 AS "Annual Salary"', explanation: 'Calculate a new value (monthly salary × 12) and name the output column.' },
          { line: 'SELECT DISTINCT city', explanation: 'Return only unique city values — removes all duplicates.' }
        ]
      },
      proTip: {
        title: 'DISTINCT vs GROUP BY',
        text: 'Both can remove duplicates, but DISTINCT is for unique values of entire row combinations, while GROUP BY is for aggregating data. Use DISTINCT for simple deduplication.'
      },
      warning: {
        title: "Don't use SELECT * in production",
        text: 'SELECT * has three problems: (1) performance — it fetches unnecessary columns, (2) fragility — adding a column breaks applications expecting specific column positions, (3) clarity — nobody knows what data is returned without checking the table schema.'
      },
      examNotes: {
        examNotes: [
        'SELECT is always the first clause in a query',
        'FROM comes after SELECT',
        'AS keyword creates column aliases (the AS keyword is optional in most databases)',
        'DISTINCT keyword removes duplicate rows from the result',
        'Calculated expressions can be used in SELECT: SELECT price * 0.9 AS discounted_price',
        'SQL keywords are case-insensitive (SELECT = select = Select), but convention is UPPERCASE'
      ]
      },
      quiz: {
        quiz: [
        { question: 'What does SELECT DISTINCT do?', options: ['Selects all rows', 'Removes duplicate rows from results', 'Selects only NULL values', 'Selects random rows'], correctIndex: 1, explanation: 'SELECT DISTINCT returns only unique rows, eliminating duplicates.' },
        { question: 'Which query correctly renames a column in the output?', options: ["SELECT name = 'Customer' FROM orders", "SELECT name AS 'Customer' FROM orders", "SELECT name RENAME 'Customer' FROM orders", "SELECT name LABEL 'Customer' FROM orders"], correctIndex: 1, explanation: 'The AS keyword creates a column alias in SQL output.' }
      ]
      }
    },
    interviewQuestions: [
      { question: 'What is the difference between SELECT * and SELECT column_name?', answer: 'SELECT * retrieves all columns from the table, which is resource-intensive and fragile. SELECT column_name retrieves only specified columns, improving performance and making queries more explicit and maintainable.', difficulty: 'Fresher', category: 'Conceptual' },
      { question: 'What happens if you run SELECT without FROM?', answer: 'Most SQL engines allow it for literals: SELECT 1+1, SELECT GETDATE(). But to query actual data, FROM is required to specify the data source.', difficulty: 'Fresher', category: 'Trap' }
    ]
  },

  {
    id: 'sql-where',
    slug: 'where',
    title: 'Filtering with WHERE',
    description: 'Filter rows using conditions, operators, and logical expressions.',
    difficulty: 'Beginner',
    estimatedMinutes: 25,
    tags: ['where', 'filter', 'conditions', 'operators'],
    sections: {
      what: {
        text: `The WHERE clause is the gatekeeper of your query. While SELECT controls which columns you see, WHERE controls which rows are returned by applying conditions to filter the data.

Every row in the result set passes through the WHERE filter individually. If the condition evaluates to TRUE for a row, that row is included. If it evaluates to FALSE or NULL, the row is discarded. This happens before any grouping, ordering, or limiting — WHERE operates on raw data.

You can build complex multi-condition filters using logical operators: AND (both conditions must be true), OR (either condition can be true), and NOT (inverts the condition). SQL also provides specialized operators for common patterns: LIKE for pattern matching, IN for list membership, BETWEEN for range checks, and IS NULL/IS NOT NULL for handling missing data.

A critical concept: **NULL values require special treatment**. You cannot compare NULL using '= NULL' — this always returns NULL (not TRUE or FALSE). Instead, you must use 'IS NULL' or 'IS NOT NULL'. This is one of the most common SQL bugs.`,
        eli5: "WHERE is like the filters on a shopping website. You check the boxes for 'Electronics', 'Price under $100', and 'In Stock' — and the site only shows products matching ALL your filters.",
        points: ['WHERE filters rows, SELECT filters columns', 'Conditions evaluate to TRUE, FALSE, or NULL', 'NULL must use IS NULL / IS NOT NULL', 'AND, OR, NOT combine multiple conditions']
      },
      why: {
        text: 'Without filtering, every query would return the entire table — potentially millions of rows. WHERE is fundamental to data analysis: isolating segments, finding anomalies, and answering specific business questions.',
        tip: 'WHERE conditions are evaluated before GROUP BY and HAVING. Always filter early to improve performance.'
      },
      diagram: {
        chart: `graph TD
  A[("All Rows<br/>1M rows")] --> B{"WHERE<br/>Condition"}
  B -->|TRUE| C[✅ Include Row]
  B -->|FALSE| D[❌ Discard Row]
  B -->|NULL| E[❌ Discard Row]
  C --> F[Result Set<br/>~5K rows]`
      },
      breakdown: {
        components: [
          { title: 'Comparison Operators', description: '= (equal), != or <> (not equal), > (greater), < (less), >= (greater or equal), <= (less or equal)' },
          { title: 'LIKE & Wildcards', description: "Pattern matching: % = any characters, _ = single character. e.g., WHERE name LIKE 'A%' matches all names starting with A." },
          { title: 'IN Operator', description: "Check against a list: WHERE country IN ('USA', 'Canada', 'UK') — more readable than multiple OR conditions." },
          { title: 'BETWEEN Operator', description: 'Inclusive range check: WHERE price BETWEEN 10 AND 50 is equivalent to WHERE price >= 10 AND price <= 50.' },
          { title: 'IS NULL / IS NOT NULL', description: 'Checks for missing values. WHERE email IS NULL finds all rows with no email address.' }
        ]
      },
      code: {
        code: `-- Basic conditions
SELECT product_name, price, category
FROM products
WHERE price > 100 AND category = 'Electronics';

-- LIKE: pattern matching
SELECT name, email
FROM customers
WHERE email LIKE '%@gmail.com';  -- ends with @gmail.com

-- IN: match against a list (cleaner than multiple ORs)
SELECT * FROM orders
WHERE status IN ('Pending', 'Processing', 'Shipped');

-- BETWEEN: inclusive range
SELECT * FROM products
WHERE price BETWEEN 50 AND 200;

-- IS NULL: find missing data
SELECT employee_id, name
FROM employees
WHERE manager_id IS NULL;  -- Top-level employees (no manager)`,
        breakdown: [
          { line: "WHERE price > 100 AND category = 'Electronics'", explanation: 'Both conditions must be true — only expensive electronics are returned.' },
          { line: "WHERE email LIKE '%@gmail.com'", explanation: '% matches any characters before @gmail.com, so this finds all Gmail addresses.' },
          { line: "WHERE status IN ('Pending', 'Processing', 'Shipped')", explanation: 'Equivalent to: WHERE status = Pending OR status = Processing OR status = Shipped — but far more readable.' },
          { line: 'WHERE price BETWEEN 50 AND 200', explanation: 'Returns products priced at exactly 50, 200, and everything in between (inclusive).' },
          { line: 'WHERE manager_id IS NULL', explanation: 'You CANNOT write manager_id = NULL. NULL comparisons always return NULL, not TRUE.' }
        ]
      },
      warning: {
        title: 'The NULL Trap',
        text: "WHERE salary = NULL will NEVER return any rows — even if salary IS null! This is because NULL = anything is always NULL (unknown), not TRUE. Always use WHERE salary IS NULL."
      },
      examNotes: {
        examNotes: [
        'WHERE filters rows before GROUP BY and HAVING',
        'NULL = NULL is NOT TRUE — use IS NULL',
        'LIKE uses % (any chars) and _ (one char) wildcards',
        'IN is shorthand for multiple OR conditions',
        'BETWEEN is inclusive on both ends',
        'Operator precedence: NOT > AND > OR — use parentheses to be explicit',
        "WHERE 'A%' vs WHERE '%A%': first matches strings starting with A, second contains A anywhere"
      ]
      },
      quiz: {
        quiz: [
        { question: 'Which query correctly finds rows where email is missing?', options: ["WHERE email = NULL", "WHERE email == NULL", "WHERE email IS NULL", "WHERE email = 'NULL'"], correctIndex: 2, explanation: 'NULL comparisons require IS NULL or IS NOT NULL. Using = NULL always evaluates to NULL (not TRUE), returning zero rows.' },
        { question: 'What does the % wildcard do in LIKE?', options: ['Matches exactly one character', 'Matches any number of any characters (including zero)', 'Matches only numeric characters', 'Matches the start of a string'], correctIndex: 1, explanation: '% in LIKE matches any sequence of characters including an empty string.' },
        { question: "WHERE price BETWEEN 10 AND 50 is equivalent to:", options: ['WHERE price > 10 AND price < 50', 'WHERE price >= 10 AND price <= 50', 'WHERE price >= 10 AND price < 50', 'WHERE price > 10 AND price <= 50'], correctIndex: 1, explanation: 'BETWEEN is inclusive on BOTH ends — it includes the boundary values 10 and 50.' }
      ]
      }
    },
    interviewQuestions: [
      { question: 'Why can you not use = NULL in SQL?', answer: "NULL represents unknown/missing data. Any comparison with NULL (including NULL = NULL) returns NULL, not TRUE. The three-valued logic (TRUE/FALSE/NULL) in SQL means you must use IS NULL or IS NOT NULL to test for missing values.", difficulty: 'Fresher', category: 'Trap' },
      { question: 'What is the difference between WHERE and HAVING?', answer: 'WHERE filters individual rows BEFORE grouping (operates on raw data). HAVING filters groups AFTER a GROUP BY has been applied (operates on aggregated data). You cannot use aggregate functions (SUM, COUNT) in a WHERE clause.', difficulty: 'Mid', category: 'Conceptual' }
    ]
  },

  {
    id: 'sql-order',
    slug: 'ordering',
    title: 'ORDER BY & LIMIT',
    description: 'Sort results and control result set size for performance and pagination.',
    difficulty: 'Beginner',
    estimatedMinutes: 15,
    tags: ['order by', 'limit', 'offset', 'sort'],
    sections: {
      what: {
        text: `After filtering your data with WHERE, the results arrive in an unpredictable order (the database returns data in whatever order it finds it, which depends on storage internals). ORDER BY gives you precise control over the sequence of results.

You can sort by any column — ascending (ASC, the default) or descending (DESC). SQL also allows multi-column sorting: first sort by Department, and within each department, sort by Salary. This is done by listing multiple columns after ORDER BY, separated by commas.

The LIMIT clause (called TOP in SQL Server, ROWNUM in older Oracle) restricts how many rows are returned. This is critical for two use cases: (1) performance — never pull a million rows when you only need the top 10, and (2) pagination — showing 20 results per page in a web app.

The OFFSET clause, combined with LIMIT, enables pagination: skip the first N rows and return the next M rows. This is the foundation of "Load More" and page-number navigation in applications.`,
        eli5: 'ORDER BY is like sorting your contacts list alphabetically. LIMIT is like saying "only show me the first 10 contacts." OFFSET is like "skip the first 10 and show me the next 10."',
        points: ['ORDER BY sorts results ASC (default) or DESC', 'Multi-column sort: ORDER BY dept, salary DESC', 'LIMIT restricts how many rows are returned', 'OFFSET enables pagination (skip N rows)']
      },
      diagram: {
        chart: `graph TD
  A[Filtered Data<br/>1000 rows] --> B[ORDER BY salary DESC]
  B --> C[Sorted Data<br/>1000 rows]
  C --> D[LIMIT 10<br/>OFFSET 0]
  D --> E[Page 1<br/>10 rows]
  C --> F[LIMIT 10<br/>OFFSET 10]
  F --> G[Page 2<br/>10 rows]`
      },
      breakdown: {
        components: [
          { title: 'ORDER BY column ASC', description: 'Sorts from lowest to highest (A→Z, 1→100). ASC is the default and can be omitted.' },
          { title: 'ORDER BY column DESC', description: 'Sorts from highest to lowest (Z→A, 100→1). Must be specified explicitly.' },
          { title: 'Multi-column sorting', description: 'ORDER BY dept ASC, salary DESC sorts by department first, then by salary descending within each department.' },
          { title: 'LIMIT N', description: 'Return only the first N rows after sorting. Essential for performance.' },
          { title: 'LIMIT N OFFSET M', description: 'Skip M rows, then return N rows. Used for pagination.' }
        ]
      },
      code: {
        code: `-- Top 5 highest-paid employees
SELECT name, salary, department
FROM employees
ORDER BY salary DESC
LIMIT 5;

-- Multi-column sort: by department, then salary
SELECT name, department, salary
FROM employees
ORDER BY department ASC, salary DESC;

-- Pagination: Page 2 (items 11-20)
SELECT product_name, price
FROM products
ORDER BY price DESC
LIMIT 10 OFFSET 10;

-- Classic interview problem: 2nd highest salary
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 1;`,
        breakdown: [
          { line: 'ORDER BY salary DESC', explanation: 'Sort salaries from highest to lowest first.' },
          { line: 'LIMIT 5', explanation: 'Then take only the top 5 results — the 5 highest earners.' },
          { line: 'ORDER BY department ASC, salary DESC', explanation: 'First sort alphabetically by dept, then within each dept, sort by salary highest first.' },
          { line: 'LIMIT 10 OFFSET 10', explanation: 'Skip the first 10 rows (page 1), then return the next 10 (page 2).' },
          { line: 'LIMIT 1 OFFSET 1', explanation: 'Skip the #1 salary, return the next one — this is the 2nd highest.' }
        ]
      },
      examNotes: {
        examNotes: [
        'ORDER BY is always evaluated LAST in query execution (after WHERE, GROUP BY, HAVING)',
        'ASC is the default sort order — you can omit it',
        'NULL values sort first in ASC, last in DESC (varies by database)',
        'LIMIT (MySQL/PostgreSQL) = TOP (SQL Server) = ROWNUM (Oracle)',
        '2nd highest salary: ORDER BY salary DESC LIMIT 1 OFFSET 1',
        'OFFSET 0 = no skip, OFFSET 10 = skip 10 rows'
      ]
      },
      quiz: {
        quiz: [
        { question: 'Which clause restricts the number of rows returned?', options: ['WHERE', 'HAVING', 'LIMIT', 'ORDER BY'], correctIndex: 2, explanation: 'LIMIT (or TOP in SQL Server) restricts how many rows the query returns.' },
        { question: 'How do you get the 2nd highest salary?', options: ['ORDER BY salary DESC LIMIT 1 OFFSET 2', 'ORDER BY salary DESC LIMIT 2 OFFSET 1', 'ORDER BY salary DESC LIMIT 1 OFFSET 1', 'ORDER BY salary ASC LIMIT 1 OFFSET 1'], correctIndex: 2, explanation: 'LIMIT 1 OFFSET 1: skip the first row (highest) and return the next one (2nd highest).' }
      ]
      }
    },
    interviewQuestions: [
      { question: 'How would you find the 2nd highest salary without using OFFSET?', answer: "SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees). This subquery first finds the maximum salary, then finds the maximum salary that's less than that — the 2nd highest.", difficulty: 'Mid', category: 'Coding' },
      { question: 'What is the order of SQL clause execution?', answer: 'FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. This is important because it explains why you cannot reference SELECT aliases in WHERE clauses.', difficulty: 'Mid', category: 'Conceptual' }
    ]
  },

  {
    id: 'sql-aggregate',
    slug: 'aggregate-functions',
    title: 'Aggregate Functions',
    description: 'COUNT, SUM, AVG, MIN, MAX — perform calculations across rows of data.',
    difficulty: 'Beginner',
    estimatedMinutes: 20,
    tags: ['aggregate', 'count', 'sum', 'avg', 'min', 'max'],
    sections: {
      what: {
        text: `Aggregate functions perform calculations across an entire set of rows and return a single summary value. Instead of looking at individual rows, you're asking questions like: "What is the total revenue?" or "How many customers do we have?" or "What's the average order value?"

The five core aggregate functions are: COUNT (how many), SUM (total), AVG (mean), MIN (smallest), and MAX (largest). These are applied to columns but operate on all rows that meet your WHERE conditions.

A critically important behavior: **aggregate functions ignore NULL values** (except COUNT(*), which counts all rows including those with NULLs). If you have 100 rows and 10 have a NULL salary, AVG(salary) will calculate the average of only the 90 non-NULL rows, which can lead to misleading results if not accounted for.

The GROUP BY clause is aggregate functions' best friend. Instead of aggregating all rows into one number, GROUP BY splits the data into groups (e.g., by department, by country, by product category) and then applies the aggregate function to each group separately.`,
        eli5: "Aggregate functions are like calculators for entire columns. COUNT counts how many rows, SUM adds them all up, AVG finds the average, MIN finds the smallest, MAX finds the biggest.",
        points: ['Aggregate functions summarize multiple rows into one value', 'NULL values are ignored by aggregate functions (except COUNT(*))', 'Used with GROUP BY to get per-group summaries', 'Cannot mix aggregate and non-aggregate columns without GROUP BY']
      },
      why: {
        text: 'Business questions are almost always aggregate in nature: total revenue, average customer age, maximum order value. Without aggregate functions, you would have to pull all data to Python/Excel just to compute these simple statistics.',
        tip: 'Always pair aggregate functions with GROUP BY when you need per-category metrics. Without GROUP BY, you get a single total for the entire table.'
      },
      diagram: {
        chart: `graph TD
  A[("orders table<br/>1M rows")] --> B{"GROUP BY<br/>department"}
  B --> C[Dept: Engineering<br/>250 rows]
  B --> D[Dept: Marketing<br/>150 rows]
  B --> E[Dept: Sales<br/>300 rows]
  C --> F["SUM(salary)<br/>$5M"]
  D --> G["SUM(salary)<br/>$2M"]
  E --> H["SUM(salary)<br/>$4M"]`
      },
      breakdown: {
        components: [
          { title: 'COUNT(*)', description: 'Counts ALL rows including NULLs. COUNT(column) counts only non-NULL values in that column.' },
          { title: 'SUM(column)', description: 'Adds all non-NULL values in a numeric column.' },
          { title: 'AVG(column)', description: 'Computes the mean of non-NULL values. Be aware this skips NULLs, which can skew results.' },
          { title: 'MIN / MAX', description: 'Returns the smallest/largest non-NULL value. Works on numbers, dates, and strings.' },
          { title: 'GROUP BY', description: 'Splits data into groups before aggregating. Every non-aggregate column in SELECT must appear in GROUP BY.' }
        ]
      },
      code: {
        code: `-- Basic aggregation: whole-table stats
SELECT 
    COUNT(*) AS total_orders,
    SUM(amount) AS total_revenue,
    AVG(amount) AS avg_order_value,
    MIN(amount) AS smallest_order,
    MAX(amount) AS largest_order
FROM orders;

-- GROUP BY: stats per department
SELECT 
    department,
    COUNT(*) AS employee_count,
    AVG(salary) AS avg_salary,
    MAX(salary) AS max_salary
FROM employees
GROUP BY department
ORDER BY avg_salary DESC;

-- COUNT(*) vs COUNT(column): key difference
SELECT 
    COUNT(*) AS total_rows,          -- Counts all rows
    COUNT(email) AS rows_with_email  -- Counts non-NULL emails only
FROM customers;`,
        breakdown: [
          { line: 'COUNT(*) AS total_orders', explanation: 'Count every row in the result — includes NULL values in any column.' },
          { line: 'SUM(amount) AS total_revenue', explanation: 'Add up all the values in the amount column.' },
          { line: 'GROUP BY department', explanation: 'Split data into groups by department, then apply aggregates to each group.' },
          { line: 'COUNT(email)', explanation: 'Only counts rows where email is NOT NULL — gives you how many customers have an email on file.' }
        ]
      },
      examNotes: {
        examNotes: [
        'Five core aggregate functions: COUNT, SUM, AVG, MIN, MAX',
        'COUNT(*) counts all rows; COUNT(col) skips NULLs',
        'AVG = SUM / COUNT (only over non-NULL values)',
        'GROUP BY splits data into groups BEFORE aggregation',
        'SELECT columns not in GROUP BY must be inside aggregate functions',
        'Execution order: WHERE → GROUP BY → HAVING → SELECT',
        'HAVING filters groups (post-aggregation); WHERE filters rows (pre-aggregation)'
      ]
      },
      quiz: {
        quiz: [
        { question: 'What is the difference between COUNT(*) and COUNT(column)?', options: ['No difference', 'COUNT(*) includes NULL rows; COUNT(col) only counts non-NULL values', 'COUNT(col) includes NULLs; COUNT(*) skips them', 'COUNT(*) is faster always'], correctIndex: 1, explanation: 'COUNT(*) counts every row including those with NULLs. COUNT(column) only counts rows where that specific column is not NULL.' },
        { question: 'Which clause filters GROUPS in SQL?', options: ['WHERE', 'HAVING', 'FILTER', 'GROUP BY'], correctIndex: 1, explanation: 'HAVING filters groups after GROUP BY. WHERE cannot use aggregate functions and filters rows before grouping.' }
      ]
      }
    },
    interviewQuestions: [
      { question: 'Can you use a WHERE clause with aggregate functions?', answer: 'Not directly. WHERE filters rows before aggregation, so you cannot write WHERE SUM(salary) > 100000. You must use HAVING to filter after aggregation: GROUP BY dept HAVING SUM(salary) > 100000.', difficulty: 'Mid', category: 'Conceptual' },
      { question: 'Find the department with the highest average salary.', answer: "SELECT department, AVG(salary) AS avg_salary FROM employees GROUP BY department ORDER BY avg_salary DESC LIMIT 1;", difficulty: 'Mid', category: 'Coding' }
    ]
  },

  {
    id: 'sql-group',
    slug: 'group-by-having',
    title: 'GROUP BY & HAVING',
    description: 'Aggregate data into groups and filter them with precision.',
    difficulty: 'Beginner',
    estimatedMinutes: 25,
    tags: ['group by', 'having', 'aggregate', 'filter groups'],
    sections: {
      what: {
        text: `GROUP BY is one of the most powerful SQL clauses. It takes your filtered data and divides it into groups based on the unique values of one or more columns — then applies aggregate functions independently to each group.

Without GROUP BY, an aggregate function like SUM(revenue) would return a single total for the entire table. With GROUP BY region, it returns the total revenue for each region as separate rows. This is the foundation of analytical SQL.

The HAVING clause is GROUP BY's companion filter. While WHERE filters individual rows before grouping, HAVING filters the resulting groups after aggregation. This distinction is crucial: you can use aggregate functions in HAVING (like HAVING COUNT(*) > 5), but you cannot in WHERE.

A key rule: **every column in your SELECT list must either appear in GROUP BY or be wrapped in an aggregate function**. This rule exists because SQL needs to know how to reduce multiple rows in a group to a single output row.`,
        eli5: "GROUP BY is like sorting your Lego bricks into piles by color. Then you COUNT how many are in each pile. HAVING is like saying 'only show me the piles with more than 10 bricks.'",
        points: ['GROUP BY groups rows by column values', 'HAVING filters groups (not rows)', 'Every SELECT column must be in GROUP BY or aggregated', 'Execution: WHERE → GROUP BY → HAVING → SELECT → ORDER BY']
      },
      diagram: {
        chart: `graph TD
  A[Raw Data] --> B[WHERE<br/>filter rows]
  B --> C[GROUP BY<br/>region]
  C --> D[Group: North<br/>500 rows]
  C --> E[Group: South<br/>300 rows]
  C --> F[Group: East<br/>150 rows]
  D --> G["COUNT(*): 500<br/>SUM(sales): $2M"]
  E --> H["COUNT(*): 300<br/>SUM(sales): $1.2M"]
  F --> I["COUNT(*): 150<br/>SUM(sales): $0.6M"]
  G --> J["HAVING COUNT > 200"]
  H --> J
  I -->|Filtered out| K[❌]`
      },
      code: {
        code: `-- GROUP BY: sales by category
SELECT 
    category,
    COUNT(*) AS product_count,
    SUM(revenue) AS total_revenue,
    ROUND(AVG(price), 2) AS avg_price
FROM products
GROUP BY category
ORDER BY total_revenue DESC;

-- HAVING: only categories with 5+ products and $10K+ revenue
SELECT 
    category,
    COUNT(*) AS product_count,
    SUM(revenue) AS total_revenue
FROM products
GROUP BY category
HAVING COUNT(*) >= 5 AND SUM(revenue) > 10000
ORDER BY total_revenue DESC;

-- GROUP BY multiple columns
SELECT department, job_title, AVG(salary) AS avg_salary
FROM employees
GROUP BY department, job_title
ORDER BY department, avg_salary DESC;`,
        breakdown: [
          { line: 'GROUP BY category', explanation: 'Split all products into groups by category — each unique category becomes one output row.' },
          { line: 'COUNT(*) AS product_count', explanation: 'Count how many products are in each category group.' },
          { line: 'HAVING COUNT(*) >= 5 AND SUM(revenue) > 10000', explanation: 'Filter out groups that have fewer than 5 products OR less than $10K revenue.' },
          { line: 'GROUP BY department, job_title', explanation: 'Create groups for each unique COMBINATION of department + job title.' }
        ]
      },
      examNotes: {
        examNotes: [
        'WHERE vs HAVING: WHERE → before grouping (rows), HAVING → after grouping (groups)',
        'Cannot use aggregate functions in WHERE clause',
        'All non-aggregated SELECT columns MUST be in GROUP BY',
        'GROUP BY executes before SELECT — column aliases are NOT available in HAVING in some databases',
        'HAVING without GROUP BY applies to the entire table as one group'
      ]
      },
      quiz: {
        quiz: [
        { question: 'Which clause is used to filter groups after GROUP BY?', options: ['WHERE', 'HAVING', 'FILTER', 'GROUPED WHERE'], correctIndex: 1, explanation: 'HAVING is specifically designed to filter groups after aggregation. WHERE cannot use aggregate functions.' },
        { question: 'Is the following query valid? SELECT department, name, COUNT(*) FROM employees GROUP BY department', options: ['Yes, it is valid', 'No — name must be in GROUP BY or an aggregate function', 'No — COUNT(*) cannot be used with GROUP BY', 'Yes, name is automatically grouped'], correctIndex: 1, explanation: "Every non-aggregate column in SELECT must appear in GROUP BY. Since 'name' is not in GROUP BY and not aggregated, this query is invalid." }
      ]
      }
    },
    interviewQuestions: [
      { question: 'Find all customers who placed more than 3 orders.', answer: "SELECT customer_id, COUNT(*) AS order_count FROM orders GROUP BY customer_id HAVING COUNT(*) > 3 ORDER BY order_count DESC;", difficulty: 'Mid', category: 'Coding' },
      { question: 'Explain the difference between WHERE and HAVING.', answer: 'WHERE filters individual rows before any grouping occurs — it operates on raw data and cannot use aggregate functions. HAVING filters groups after GROUP BY has been applied — it can use aggregate functions like HAVING SUM(revenue) > 10000.', difficulty: 'Fresher', category: 'Conceptual' }
    ]
  },

  {
    id: 'sql-joins',
    slug: 'joins',
    title: 'Mastering JOINs',
    description: 'Combine data from multiple tables using INNER, LEFT, RIGHT, and FULL JOINs.',
    difficulty: 'Intermediate',
    estimatedMinutes: 40,
    tags: ['joins', 'inner join', 'left join', 'right join', 'full join'],
    sections: {
      what: {
        text: `JOINs are the most powerful and distinctive feature of relational databases. They allow you to combine rows from two or more tables based on a matching column (the relationship). In a properly normalized database, data is split across multiple tables to avoid redundancy — JOINs are how you weave it back together.

**INNER JOIN** is the most common. It returns only the rows where the join condition is met in BOTH tables. If a customer has no orders, they won't appear in an INNER JOIN of customers and orders.

**LEFT JOIN** (or LEFT OUTER JOIN) returns ALL rows from the left table, and matching rows from the right table. Where there's no match, the right table's columns are filled with NULL. This is perfect for finding "customers who have never placed an order."

**RIGHT JOIN** is the mirror image of LEFT JOIN. It returns all rows from the right table and matching rows from the left.

**FULL OUTER JOIN** returns all rows from both tables, filling NULLs where there is no match on either side. It combines the results of a LEFT and RIGHT JOIN.

Understanding which JOIN to use is a critical thinking skill — the wrong JOIN type will silently return incorrect results with no error.`,
        eli5: "Imagine two lists: a customer list and an orders list. INNER JOIN shows only customers who bought something. LEFT JOIN shows all customers — even those who never bought anything (with blank order details). FULL JOIN shows everyone from both lists.",
        points: ['INNER JOIN: only matching rows from both tables', 'LEFT JOIN: all left rows + matching right rows', 'RIGHT JOIN: all right rows + matching left rows', 'FULL OUTER JOIN: all rows from both tables']
      },
      why: {
        text: 'Real-world data is ALWAYS spread across multiple tables. User data, order data, product data, shipping data — they all live in separate tables. JOINs are how you combine them into meaningful reports. A data scientist without JOIN mastery cannot extract real insights.',
        tip: 'Always alias your tables (customers c, orders o) when joining — it makes the query dramatically more readable.'
      },
      diagram: {
        chart: `graph LR
  subgraph "INNER JOIN"
    A[👤 Customers] --> |match| B[📦 Orders]
    B --> C[Only matched rows]
  end
  subgraph "LEFT JOIN"
    D[👤 ALL Customers] --> |match if exists| E[📦 Orders]
    E --> F[All customers + matching orders]
  end
  subgraph "FULL JOIN"
    G[👤 ALL Customers] --> H[ALL Orders 📦]
    H --> I[Everyone from both]
  end`
      },
      breakdown: {
        components: [
          { title: 'INNER JOIN', description: 'Returns rows with matches in BOTH tables. Most restrictive — only intersection data.' },
          { title: 'LEFT JOIN', description: 'Returns ALL rows from left table. Right table NULLs where no match. Use to find unmatched left rows.' },
          { title: 'RIGHT JOIN', description: 'Returns ALL rows from right table. Left table NULLs where no match. Rarely used (swap table order instead).' },
          { title: 'FULL OUTER JOIN', description: 'Returns ALL rows from both tables. NULLs on either side where no match.' },
          { title: 'SELF JOIN', description: 'A table joined with itself. Used for hierarchical data like employee-manager relationships.' }
        ]
      },
      code: {
        code: `-- INNER JOIN: customers who have placed orders
SELECT c.name, c.email, o.order_id, o.amount
FROM customers c
INNER JOIN orders o ON c.id = o.customer_id;

-- LEFT JOIN: ALL customers, including those without orders
SELECT c.name, o.order_id, o.amount
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id;

-- Find customers who have NEVER placed an order
SELECT c.name, c.email
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.order_id IS NULL;  -- The magic: NULLs mean no match in right table

-- Multi-table JOIN: customers + orders + products
SELECT c.name, o.order_date, p.product_name, oi.quantity
FROM customers c
INNER JOIN orders o ON c.id = o.customer_id
INNER JOIN order_items oi ON o.id = oi.order_id
INNER JOIN products p ON oi.product_id = p.id;`,
        breakdown: [
          { line: 'INNER JOIN orders o ON c.id = o.customer_id', explanation: 'Only returns rows where the customer ID exists in both tables.' },
          { line: 'LEFT JOIN orders o ON c.id = o.customer_id', explanation: 'Returns ALL customers. If no order exists, o.order_id and o.amount will be NULL.' },
          { line: 'WHERE o.order_id IS NULL', explanation: 'Filter for only the unmatched customers — those who never ordered.' },
          { line: 'INNER JOIN order_items oi ON o.id = oi.order_id', explanation: 'Chain multiple joins — each JOIN adds a new table to the result.' }
        ]
      },
      warning: {
        title: 'Cartesian Products — The Accidental Explosion',
        text: 'Forgetting the ON condition creates a CROSS JOIN (every row × every row). 100 customers × 1000 orders = 100,000 rows returned. Always verify your JOIN has a proper ON condition.'
      },
      examNotes: {
        examNotes: [
        'INNER JOIN = intersection; LEFT JOIN = left table + matching right',
        'LEFT JOIN WHERE right.id IS NULL = find unmatched/orphaned left rows',
        'CROSS JOIN = no condition, returns m × n rows (Cartesian product)',
        'SELF JOIN: join a table to itself, uses table aliases',
        'JOIN conditions use = most of the time, but can use >, <, LIKE etc.',
        'Always use table aliases when joining (makes queries readable)'
      ]
      },
      quiz: {
        quiz: [
        { question: 'Which JOIN returns only rows with matches in BOTH tables?', options: ['LEFT JOIN', 'FULL OUTER JOIN', 'INNER JOIN', 'RIGHT JOIN'], correctIndex: 2, explanation: 'INNER JOIN is the most restrictive JOIN — it only returns rows where the join condition is true in both tables.' },
        { question: 'How do you find all customers who have NEVER placed an order?', options: ['INNER JOIN orders WHERE orders.id = NULL', 'LEFT JOIN orders WHERE orders.customer_id IS NULL', 'LEFT JOIN orders WHERE orders.id IS NULL', 'RIGHT JOIN orders WHERE customers.id IS NULL'], correctIndex: 2, explanation: 'LEFT JOIN gives all customers. Where there is no matching order, the order columns are NULL. Filter for those NULLs to find customers without orders.' }
      ]
      }
    },
    interviewQuestions: [
      { question: 'What is the difference between INNER JOIN and LEFT JOIN?', answer: 'INNER JOIN returns only rows where the join condition matches in both tables. LEFT JOIN returns ALL rows from the left table plus matching rows from the right table — unmatched rows have NULLs in the right table columns.', difficulty: 'Fresher', category: 'Conceptual' },
      { question: 'Write a query to find employees and their managers (self join).', answer: "SELECT e.name AS employee, m.name AS manager FROM employees e LEFT JOIN employees m ON e.manager_id = m.id;", difficulty: 'Mid', category: 'Coding' },
      { question: 'What is a Cartesian product and how does it happen in SQL?', answer: "A Cartesian product is when every row from table A is combined with every row from table B, resulting in m × n rows. It happens when you JOIN without an ON condition (CROSS JOIN) or accidentally omit the join condition.", difficulty: 'Mid', category: 'Conceptual' }
    ]
  },

  {
    id: 'sql-subqueries',
    slug: 'subqueries',
    title: 'Subqueries & Nested Queries',
    description: 'Use queries inside queries for complex analytical operations.',
    difficulty: 'Intermediate',
    estimatedMinutes: 35,
    tags: ['subquery', 'nested query', 'correlated', 'EXISTS', 'IN'],
    sections: {
      what: {
        text: `A subquery is a SQL query nested inside another query. They allow you to use the result of one query as input to another — enabling complex, multi-step analytical operations in a single SQL statement.

Subqueries can appear in three key places: in the WHERE clause (as a filter), in the FROM clause (as a derived table/virtual table), or in the SELECT clause (as a computed column).

**Scalar subqueries** return a single value and can be used anywhere a value is expected. For example: WHERE salary > (SELECT AVG(salary) FROM employees).

**Correlated subqueries** are more powerful but slower — they reference the outer query and are re-executed for each row of the outer query. They are like a "for each row, run this inner query" loop.

The EXISTS operator is one of the most important SQL constructs: it returns TRUE if the subquery returns any rows at all, regardless of what data those rows contain. It's more efficient than IN for large datasets because it short-circuits on the first match.`,
        eli5: "A subquery is like a question-within-a-question. 'Show me employees who earn more than the average' needs two questions: first 'what IS the average salary?' and second 'who earns more than THAT?'",
        points: ['Subqueries can go in WHERE, FROM, or SELECT', 'Scalar subquery returns exactly one value', 'Correlated subqueries run once per outer row (slower)', 'EXISTS is more efficient than IN for large data']
      },
      diagram: {
        chart: `graph TD
  A[Outer Query] -->|needs a value| B[Subquery runs first]
  B -->|returns value| A
  A --> C[Final Result]
  subgraph "Execution"
    B --> D[AVG salary = $75K]
    D --> A
  end`
      },
      code: {
        code: `-- Scalar subquery in WHERE: employees earning above average
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- Subquery in FROM: derived table (virtual table)
SELECT dept_avg.department, dept_avg.avg_salary
FROM (
    SELECT department, AVG(salary) AS avg_salary
    FROM employees
    GROUP BY department
) AS dept_avg
WHERE dept_avg.avg_salary > 70000;

-- EXISTS: customers who have placed at least one order
SELECT name, email
FROM customers c
WHERE EXISTS (
    SELECT 1 FROM orders o WHERE o.customer_id = c.id
);

-- NOT EXISTS: customers who have NEVER ordered
SELECT name, email
FROM customers c
WHERE NOT EXISTS (
    SELECT 1 FROM orders o WHERE o.customer_id = c.id
);`,
        breakdown: [
          { line: 'WHERE salary > (SELECT AVG(salary) FROM employees)', explanation: 'Inner query runs FIRST, returns a single average value, then outer query uses that number as the filter threshold.' },
          { line: 'FROM (...) AS dept_avg', explanation: 'The entire inner query becomes a virtual table called dept_avg that the outer query treats as a real table.' },
          { line: 'WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id)', explanation: 'For each customer row, check if any order exists for that customer. SELECT 1 — the value doesnt matter, only whether a row is found.' }
        ]
      },
      examNotes: {
        examNotes: [
        'Scalar subquery: returns exactly 1 row × 1 column',
        'Correlated subquery: references outer query column (slow, runs once per outer row)',
        'EXISTS is faster than IN for large datasets (short-circuits on first match)',
        'NOT IN with NULLs returns no rows — use NOT EXISTS instead to be safe',
        'Subquery in FROM clause must always have an alias'
      ]
      },
      quiz: {
        quiz: [
        { question: 'Where can a subquery appear in a SQL query?', options: ['Only in WHERE', 'Only in FROM', 'In WHERE, FROM, or SELECT', 'Only in SELECT'], correctIndex: 2, explanation: 'Subqueries can be used in WHERE (as a filter value), FROM (as a derived table), and SELECT (as a computed column).' },
        { question: 'What does EXISTS return?', options: ['The number of matching rows', 'TRUE if subquery returns any rows, FALSE otherwise', 'The first matching row', 'The sum of matching rows'], correctIndex: 1, explanation: 'EXISTS returns TRUE if the subquery returns at least one row (regardless of content) and FALSE if it returns no rows.' }
      ]
      }
    },
    interviewQuestions: [
      { question: 'What is a correlated subquery?', answer: 'A correlated subquery references a column from the outer query. It is executed once for every row processed by the outer query, making it potentially slow. Example: WHERE salary > (SELECT AVG(salary) FROM employees e2 WHERE e2.department = e1.department) — the inner query references e1.department from the outer query.', difficulty: 'Mid', category: 'Conceptual' },
      { question: 'Why is NOT IN dangerous with NULL values?', answer: "NOT IN with NULLs can return an empty result set. If the subquery returns even one NULL value, NOT IN will return nothing because NULL comparisons always result in UNKNOWN (not TRUE or FALSE). Use NOT EXISTS instead for safety.", difficulty: 'Senior', category: 'Trap' }
    ]
  },

  {
    id: 'sql-cte',
    slug: 'ctes',
    title: 'CTEs (Common Table Expressions)',
    description: 'Write readable, modular SQL using WITH clauses and recursive queries.',
    difficulty: 'Intermediate',
    estimatedMinutes: 30,
    tags: ['cte', 'with clause', 'recursive', 'readability'],
    sections: {
      what: {
        text: `A Common Table Expression (CTE), introduced with the WITH keyword, is a named temporary result set that you can reference within the same query. Think of it as giving a subquery a name so you can reference it like a real table.

CTEs are transformative for SQL readability. A deeply nested subquery with 5 levels of nesting is nearly impossible to maintain. The same logic rewritten with CTEs reads like a step-by-step algorithm — each CTE is one logical step that builds on previous steps.

You can chain multiple CTEs together by separating them with commas after the WITH keyword. Each CTE can reference the previously defined CTEs, allowing you to build complex logic incrementally.

**Recursive CTEs** are a special type that can reference themselves, enabling SQL to traverse hierarchical data like organizational trees, bill-of-materials, or graph traversal — things that would be impossible with standard SQL.`,
        eli5: "A CTE is like a named scratch pad. Instead of writing one giant complicated query, you write: 'First, I'll call this thing monthly_sales. Then I'll call this thing top_months. Now show me the results using top_months.'",
        points: ['CTE = named temporary query defined with WITH', 'Makes complex queries readable and maintainable', 'Can chain multiple CTEs together', 'Recursive CTEs handle hierarchical/tree data']
      },
      code: {
        code: `-- Basic CTE: average salary by department
WITH dept_averages AS (
    SELECT department, AVG(salary) AS avg_salary
    FROM employees
    GROUP BY department
)
SELECT e.name, e.salary, d.avg_salary,
       e.salary - d.avg_salary AS salary_difference
FROM employees e
JOIN dept_averages d ON e.department = d.department
ORDER BY salary_difference DESC;

-- Multiple CTEs chained together
WITH 
monthly_revenue AS (
    SELECT DATE_TRUNC('month', order_date) AS month,
           SUM(amount) AS revenue
    FROM orders
    GROUP BY DATE_TRUNC('month', order_date)
),
revenue_with_growth AS (
    SELECT month, revenue,
           LAG(revenue) OVER (ORDER BY month) AS prev_revenue
    FROM monthly_revenue
)
SELECT month, revenue, prev_revenue,
       ROUND((revenue - prev_revenue) / prev_revenue * 100, 2) AS growth_pct
FROM revenue_with_growth
WHERE prev_revenue IS NOT NULL;

-- Recursive CTE: traverse an org chart
WITH RECURSIVE org_tree AS (
    -- Base case: CEO (top-level employees)
    SELECT id, name, manager_id, 0 AS level
    FROM employees WHERE manager_id IS NULL
    
    UNION ALL
    
    -- Recursive case: find direct reports
    SELECT e.id, e.name, e.manager_id, ot.level + 1
    FROM employees e
    JOIN org_tree ot ON e.manager_id = ot.id
)
SELECT REPEAT('  ', level) || name AS org_chart, level
FROM org_tree
ORDER BY level, name;`,
        breakdown: [
          { line: 'WITH dept_averages AS (...)', explanation: 'Define a named temporary result set called dept_averages — like creating a virtual table.' },
          { line: 'FROM employees e JOIN dept_averages d ON e.department = d.department', explanation: 'Use the CTE just like a regular table in the main query.' },
          { line: 'WITH monthly_revenue AS (...), revenue_with_growth AS (...)', explanation: 'Chain multiple CTEs — the second CTE can reference the first.' },
          { line: 'WITH RECURSIVE org_tree AS (... UNION ALL ...)', explanation: 'Base case defines the starting point (CEO); recursive case keeps joining until no more direct reports are found.' }
        ]
      },
      examNotes: {
        examNotes: [
        'CTE syntax: WITH cte_name AS (SELECT ...) SELECT ... FROM cte_name',
        'CTEs do NOT persist after the query — they are temporary',
        'Multiple CTEs: WITH cte1 AS (...), cte2 AS (...) SELECT ...',
        'Recursive CTE requires RECURSIVE keyword (in PostgreSQL/SQLite), two parts: base case + UNION ALL + recursive case',
        'CTEs vs Subqueries: CTEs are more readable; subqueries can sometimes be faster (optimizer can inline them)'
      ]
      },
      quiz: {
        quiz: [
        { question: 'What keyword introduces a CTE?', options: ['TEMP', 'CREATE', 'WITH', 'DEFINE'], correctIndex: 2, explanation: 'CTEs are introduced with the WITH keyword: WITH cte_name AS (...).' },
        { question: 'What is a recursive CTE used for?', options: ['Making queries run faster', 'Traversing hierarchical data like trees', 'Creating permanent tables', 'Joining more than 2 tables'], correctIndex: 1, explanation: 'Recursive CTEs can traverse hierarchical/tree structures like org charts, file systems, and bill-of-materials by repeatedly joining a table to itself.' }
      ]
      }
    },
    interviewQuestions: [
      { question: 'When would you use a CTE instead of a subquery?', answer: 'Use a CTE when: (1) the same subquery is referenced multiple times, (2) the logic has multiple steps that are hard to read as nested subqueries, (3) you need recursive logic. CTEs improve readability and maintainability, though performance is often similar.', difficulty: 'Mid', category: 'Scenario' }
    ]
  },

  {
    id: 'sql-window',
    slug: 'window-functions',
    title: 'Window Functions',
    description: 'Perform calculations across related rows without collapsing them — ROW_NUMBER, RANK, LAG, LEAD, SUM OVER.',
    difficulty: 'Intermediate',
    estimatedMinutes: 45,
    tags: ['window functions', 'over', 'partition by', 'row_number', 'rank', 'lag', 'lead'],
    sections: {
      what: {
        text: `Window functions are arguably the most powerful feature in SQL. Unlike GROUP BY which collapses rows into groups, window functions perform calculations across a "window" of related rows while keeping all original rows intact. This allows you to add analytical computations to each row without losing the row-level detail.

The key syntax is: FUNCTION() OVER (PARTITION BY ... ORDER BY ...). The OVER() clause defines the "window" — the subset of rows the function operates on. PARTITION BY (optional) divides the data into groups, and ORDER BY defines the order within each partition.

**Ranking functions**: ROW_NUMBER() gives unique sequential numbers. RANK() gives the same rank to ties but skips numbers after ties. DENSE_RANK() gives the same rank to ties without skipping numbers.

**Offset functions**: LAG(col, n) returns the value from n rows before the current row. LEAD(col, n) returns the value n rows ahead. These are perfect for period-over-period comparisons (this month vs last month).

**Aggregate window functions**: SUM(), AVG(), COUNT() with OVER() calculate running totals, moving averages, and cumulative counts while preserving every row.

Window functions are heavily tested in data science interviews at top companies. Master them.`,
        eli5: "Normal GROUP BY is like collapsing all students in a class into one row with averages. Window functions let you ADD a 'class average' column next to each student's row — you see individual students AND their ranking within the class at the same time.",
        points: ['Do NOT collapse rows (unlike GROUP BY)', 'OVER() defines the window of rows', 'PARTITION BY = group within the window', 'ORDER BY = row sequence within the partition']
      },
      diagram: {
        chart: `graph TD
  A[All Rows Preserved] --> B[OVER PARTITION BY dept]
  B --> C[Window: Engineering Dept]
  B --> D[Window: Marketing Dept]
  C --> E[ROW_NUMBER 1,2,3...<br/>RANK 1,1,3...<br/>SUM running total]
  D --> F[ROW_NUMBER 1,2,3...<br/>RANK 1,1,3...<br/>SUM running total]
  E --> G[All rows returned<br/>with new columns]
  F --> G`
      },
      code: {
        code: `-- ROW_NUMBER vs RANK vs DENSE_RANK
SELECT 
    name, department, salary,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS row_num,
    RANK()       OVER (PARTITION BY department ORDER BY salary DESC) AS rank,
    DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dense_rank
FROM employees;
-- If two people tie at $80K:
-- ROW_NUMBER: 1, 2 (unique, arbitrary)
-- RANK:       1, 1, 3 (skips 2)
-- DENSE_RANK: 1, 1, 2 (no skip)

-- LAG/LEAD: month-over-month revenue change
SELECT 
    month, revenue,
    LAG(revenue) OVER (ORDER BY month) AS last_month,
    LEAD(revenue) OVER (ORDER BY month) AS next_month,
    revenue - LAG(revenue) OVER (ORDER BY month) AS mom_change
FROM monthly_revenue;

-- Running total and moving average
SELECT 
    order_date, amount,
    SUM(amount) OVER (ORDER BY order_date) AS running_total,
    AVG(amount) OVER (ORDER BY order_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS rolling_7_avg
FROM daily_orders;

-- Top 3 earners per department (using window function in CTE)
WITH ranked AS (
    SELECT name, department, salary,
           DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank
    FROM employees
)
SELECT name, department, salary, dept_rank
FROM ranked
WHERE dept_rank <= 3;`,
        breakdown: [
          { line: 'PARTITION BY department ORDER BY salary DESC', explanation: 'Within each department group, rank employees by salary from highest to lowest.' },
          { line: 'LAG(revenue) OVER (ORDER BY month)', explanation: 'For each row, look back 1 row in the date order and return that revenue value.' },
          { line: 'SUM(amount) OVER (ORDER BY order_date)', explanation: 'Running total — each row gets the cumulative sum from the first row up to and including the current row.' },
          { line: 'ROWS BETWEEN 6 PRECEDING AND CURRENT ROW', explanation: 'Define an explicit window frame: the 6 rows before the current row plus the current row = a 7-day rolling window.' }
        ]
      },
      examNotes: {
        examNotes: [
        'Syntax: FUNCTION() OVER (PARTITION BY col ORDER BY col)',
        'ROW_NUMBER: unique numbers even for ties',
        'RANK: same rank for ties, skips next rank (1,1,3)',
        'DENSE_RANK: same rank for ties, no skip (1,1,2)',
        'LAG(col, n): value from n rows before; LEAD(col, n): n rows after',
        'FIRST_VALUE / LAST_VALUE: first/last value in the window',
        'Running total: SUM(col) OVER (ORDER BY date)',
        'NTILE(4): divides rows into 4 equal buckets (quartiles)'
      ]
      },
      quiz: {
        quiz: [
        { question: 'What is the difference between RANK() and DENSE_RANK()?', options: ['No difference', 'RANK skips numbers after ties; DENSE_RANK does not', 'DENSE_RANK skips numbers after ties; RANK does not', 'RANK gives unique numbers; DENSE_RANK allows ties'], correctIndex: 1, explanation: 'With two rows tied at rank 1: RANK gives 1,1,3 (skips 2); DENSE_RANK gives 1,1,2 (no skip).' },
        { question: 'Which window function gets the value from the previous row?', options: ['LEAD', 'LAG', 'PREV', 'OFFSET'], correctIndex: 1, explanation: 'LAG(col) returns the value from the previous row. LEAD(col) returns the value from the next row.' }
      ]
      }
    },
    interviewQuestions: [
      { question: 'How do you find the top 3 earners in each department?', answer: "WITH ranked AS (SELECT name, dept, salary, DENSE_RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS rnk FROM employees) SELECT * FROM ranked WHERE rnk <= 3;", difficulty: 'Senior', category: 'Coding' },
      { question: 'What is the difference between a window function and GROUP BY?', answer: 'GROUP BY collapses multiple rows into one row per group. Window functions add computed columns to each original row without collapsing them. With GROUP BY you lose row-level detail; with window functions you keep all rows.', difficulty: 'Mid', category: 'Conceptual' },
      { question: 'Calculate month-over-month revenue growth percentage.', answer: "SELECT month, revenue, LAG(revenue) OVER (ORDER BY month) AS prev_revenue, ROUND((revenue - LAG(revenue) OVER (ORDER BY month)) / LAG(revenue) OVER (ORDER BY month) * 100, 2) AS growth_pct FROM monthly_revenue;", difficulty: 'Senior', category: 'Coding' }
    ]
  },

  {
    id: 'sql-indexes',
    slug: 'indexes-performance',
    title: 'Indexes & Query Performance',
    description: 'Make queries 100x faster with proper indexing and query optimization techniques.',
    difficulty: 'Advanced',
    estimatedMinutes: 35,
    tags: ['index', 'performance', 'explain', 'query optimization', 'b-tree'],
    sections: {
      what: {
        text: `A database index is a data structure that allows the database to find rows much faster than scanning every row in the table. Without an index, the database performs a "full table scan" — reading every single row to find matches. With an index, it's like using the index in the back of a book instead of reading every page.

The most common index type is the **B-Tree** (Balanced Tree). It maintains a sorted copy of the indexed column(s) in a tree structure, allowing the database to find any value in O(log n) time instead of O(n) for a full scan. This means searching 1 million rows takes ~20 lookups instead of 1,000,000.

But indexes are not free. They consume disk space (sometimes significant). More importantly, every INSERT, UPDATE, and DELETE on the table must also update all its indexes — this slows write operations. The classic tradeoff: indexes speed up reads, slow down writes. Read-heavy workloads (analytics) benefit enormously from indexes; write-heavy workloads need careful indexing.

**Composite indexes** (indexes on multiple columns) follow the "leftmost prefix" rule — a composite index on (department, salary) can be used for queries filtering by department alone, or by department AND salary, but NOT by salary alone.`,
        eli5: "An index is like the index in a textbook. Without it, you read every page to find 'photosynthesis.' With an index, you jump directly to page 234. Database indexes work the same way — they create shortcuts.",
        points: ['Index = sorted data structure for fast lookups', 'B-Tree: O(log n) lookups vs O(n) full scan', 'Indexes speed up reads, slow down writes', 'Composite indexes follow leftmost prefix rule']
      },
      code: {
        code: `-- Create a basic index
CREATE INDEX idx_customers_email ON customers(email);

-- Create a composite index (useful for common JOIN + WHERE patterns)
CREATE INDEX idx_orders_customer_date 
ON orders(customer_id, order_date);

-- Unique index (also enforces uniqueness constraint)
CREATE UNIQUE INDEX idx_users_username ON users(username);

-- EXPLAIN: see how the database executes your query
EXPLAIN SELECT * FROM orders WHERE customer_id = 42;
-- Without index: Seq Scan (reads all rows)
-- With index: Index Scan using idx_orders_customer_date

-- Query that USES the index (leftmost prefix)
SELECT * FROM orders WHERE customer_id = 42;
SELECT * FROM orders WHERE customer_id = 42 AND order_date > '2024-01-01';

-- Query that DOES NOT use the composite index
SELECT * FROM orders WHERE order_date > '2024-01-01';  -- order_date alone cannot use it`,
        breakdown: [
          { line: 'CREATE INDEX idx_customers_email ON customers(email)', explanation: 'Creates a B-Tree index on the email column — makes WHERE email = ... queries instant.' },
          { line: 'CREATE INDEX idx_orders_customer_date ON orders(customer_id, order_date)', explanation: 'Composite index for the common pattern of filtering by customer then date.' },
          { line: 'EXPLAIN SELECT ...', explanation: 'Shows the query execution plan — whether an index is used, estimated rows, and cost.' }
        ]
      },
      examNotes: {
        examNotes: [
        'Primary Key automatically gets an index',
        'Foreign Keys should almost always be indexed',
        'Leftmost prefix rule: composite index (a,b,c) helps queries on a, a+b, a+b+c — but NOT b alone',
        'Index selectivity: high-cardinality columns (email, user_id) benefit most from indexes',
        'Low-cardinality columns (gender: M/F) benefit little from B-tree indexes',
        'EXPLAIN / EXPLAIN ANALYZE: use to diagnose slow queries',
        'Too many indexes slow down INSERT/UPDATE/DELETE'
      ]
      },
      quiz: {
        quiz: [
        { question: 'What type of scan does a query perform WITHOUT an index?', options: ['Index Scan', 'Bitmap Scan', 'Sequential/Full Table Scan', 'Partial Scan'], correctIndex: 2, explanation: 'Without an index, the database reads every row in the table sequentially — called a Full Table Scan or Sequential Scan.' }
      ]
      }
    },
    interviewQuestions: [
      { question: 'What is the tradeoff of adding indexes?', answer: 'Indexes speed up SELECT queries (reads) but slow down INSERT, UPDATE, and DELETE (writes) because every write must update all indexes on the table. They also consume additional disk space. The general rule: add indexes on columns frequently used in WHERE, JOIN, and ORDER BY clauses.', difficulty: 'Mid', category: 'Conceptual' },
      { question: 'Explain the leftmost prefix rule for composite indexes.', answer: 'A composite index on (A, B, C) can be used for queries filtering on A; A and B; or A, B, and C. But it CANNOT be used for queries filtering only on B or C alone. The index must be used from the leftmost column.', difficulty: 'Senior', category: 'Conceptual' }
    ]
  }
,
{
    "id": "sql-views-materialized-views",
    "slug": "sql-views-materialized-views",
    "title": "SQL Views and Materialized Views",
    "description": "Explore virtual tables (Views) for data abstraction, security, and simplification, and learn about their performance-boosting cousins, Materialized Views.",
    "difficulty": "Intermediate",
    "estimatedMinutes": 45,
    "tags": [
      "views",
      "materialized views",
      "performance",
      "security",
      "abstraction"
    ],
    "sections": {
      "what": {
        "text": "A SQL View is a virtual table based on the result-set of a SQL query. A view contains rows and columns, just like a real table. The fields in a view are fields from one or more real tables in the database. When you query a view, the underlying SQL query is executed, and the result set is presented as if it were a table.\n\nViews offer several advantages: they simplify complex queries by encapsulating joins and aggregations, enhance security by allowing users to access only specific rows and columns without seeing the underlying tables, and provide data abstraction, meaning changes to the underlying schema might not require changes to applications that use the view. However, views do not store data themselves, so they can incur performance overhead for complex queries.\n\nA Materialized View, unlike a regular view, actually stores the pre-computed result set of a query in the database. This means that when you query a materialized view, the database doesn't have to execute the underlying query every time; it simply retrieves the stored results. This significantly improves query performance, especially for complex analytical queries involving many joins or aggregations. The trade-off is that the data in a materialized view can become stale if the underlying tables are updated. Therefore, materialized views must be periodically 'refreshed' to reflect changes in the base tables, which can be a resource-intensive operation.",
        "eli5": "Imagine you have a huge cookbook. A 'View' is like a sticky note that says, 'To make the super-duper dessert, look at page 5 for ingredients and page 10 for steps.' When you want the dessert, you follow the note. A 'Materialized View' is like actually making the super-duper dessert once and putting it in the fridge. When you want it again, you just take it out – much faster! But if someone changes the recipe in the cookbook, your dessert in the fridge will be old and won't match the new recipe until you make it again.",
        "points": [
          "Views are virtual tables, results of a stored query, not storing data.",
          "Views simplify complex queries, enforce security, and provide data abstraction.",
          "Materialized Views store the actual data from a query for performance benefits.",
          "Materialized Views need periodic 'refreshing' to ensure data freshness.",
          "Views are ideal for security and simplicity; Materialized Views for performance on stable data."
        ]
      },
      "code": {
        "code": "-- Example Schema (PostgreSQL/SQL Server syntax)\nCREATE TABLE Employees (\n    employee_id INT PRIMARY KEY,\n    first_name VARCHAR(50),\n    last_name VARCHAR(50),\n    department_id INT,\n    salary DECIMAL(10, 2)\n);\n\nCREATE TABLE Departments (\n    department_id INT PRIMARY KEY,\n    department_name VARCHAR(50)\n);\n\nINSERT INTO Employees VALUES (1, 'Alice', 'Smith', 101, 60000);\nINSERT INTO Employees VALUES (2, 'Bob', 'Johnson', 102, 75000);\nINSERT INTO Employees VALUES (3, 'Charlie', 'Brown', 101, 62000);\nINSERT INTO Departments VALUES (101, 'Sales');\nINSERT INTO Departments VALUES (102, 'Marketing');\n\n-- 1. Create a simple View to show employee details with department names\nCREATE VIEW Employee_Department_Details AS\nSELECT\n    e.employee_id,\n    e.first_name,\n    e.last_name,\n    d.department_name,\n    e.salary\nFROM\n    Employees e\nJOIN\n    Departments d ON e.department_id = d.department_id\nWHERE\n    e.salary > 60000;\n\n-- 2. Query the View\nSELECT * FROM Employee_Department_Details;\n\n-- 3. Create a Materialized View for aggregated sales data (e.g., total salary per department)\n-- Note: Materialized View syntax can vary significantly across databases.\n-- This example uses PostgreSQL syntax. For SQL Server, use 'WITH (NOLOCK)' on base tables \n-- and manage refresh manually or with scheduler.\nCREATE MATERIALIZED VIEW Department_Salary_Summary AS\nSELECT\n    d.department_name,\n    COUNT(e.employee_id) AS total_employees,\n    SUM(e.salary) AS total_salary\nFROM\n    Departments d\nLEFT JOIN\n    Employees e ON d.department_id = e.department_id\nGROUP BY\n    d.department_name;\n\n-- 4. Query the Materialized View\nSELECT * FROM Department_Salary_Summary;\n\n-- 5. Refresh the Materialized View after underlying data changes\n-- (e.g., new employee added or salary updated)\nINSERT INTO Employees VALUES (4, 'David', 'Lee', 101, 70000);\nREFRESH MATERIALIZED VIEW Department_Salary_Summary;\n\n-- 6. Re-query to see updated data\nSELECT * FROM Department_Salary_Summary;",
        "breakdown": [
          {
            "line": "CREATE TABLE Employees (...); CREATE TABLE Departments (...);",
            "explanation": "Sets up sample tables for employees and their departments."
          },
          {
            "line": "INSERT INTO Employees VALUES (...); INSERT INTO Departments VALUES (...);",
            "explanation": "Populates the sample tables with some data."
          },
          {
            "line": "CREATE VIEW Employee_Department_Details AS SELECT ... FROM ... JOIN ... WHERE ...;",
            "explanation": "Defines a view named `Employee_Department_Details`. It encapsulates a join and a filter, showing only employees with salaries above 60000."
          },
          {
            "line": "SELECT * FROM Employee_Department_Details;",
            "explanation": "Queries the view. The database executes the underlying `SELECT` statement and returns the results."
          },
          {
            "line": "CREATE MATERIALIZED VIEW Department_Salary_Summary AS SELECT ... FROM ... GROUP BY ...;",
            "explanation": "Defines a materialized view. This query's result (total employees and salary per department) is computed and stored on disk."
          },
          {
            "line": "SELECT * FROM Department_Salary_Summary;",
            "explanation": "Queries the materialized view. This is very fast as it reads directly from stored data."
          },
          {
            "line": "INSERT INTO Employees VALUES (4, 'David', 'Lee', 101, 70000);",
            "explanation": "Inserts new data into the base `Employees` table. At this point, `Department_Salary_Summary` is outdated."
          },
          {
            "line": "REFRESH MATERIALIZED VIEW Department_Salary_Summary;",
            "explanation": "Re-executes the materialized view's underlying query and updates its stored data to reflect changes in `Employees`."
          },
          {
            "line": "SELECT * FROM Department_Salary_Summary;",
            "explanation": "Queries the refreshed materialized view, now showing the updated sum for the 'Sales' department including David Lee."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "Regular Views: Don't store data, always reflect real-time data, performance depends on complexity of underlying query, good for security/simplification.",
          "Materialized Views: Store data (cached result), faster queries, data can be stale, require explicit refresh (e.g., `REFRESH MATERIALIZED VIEW` in PostgreSQL/Oracle or scheduled jobs in SQL Server).",
          "Use a regular view for logical abstraction and security, especially if data freshness is paramount and query performance is acceptable.",
          "Use a materialized view for performance-critical aggregation or reporting on large datasets where some data latency is acceptable."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "Which of the following is NOT a primary benefit of using a SQL View?",
            "options": [
              "Simplifying complex queries",
              "Improving query performance by pre-storing data",
              "Enhancing data security",
              "Providing data abstraction"
            ],
            "correctIndex": 1,
            "explanation": "Views do not pre-store data; that is a characteristic of Materialized Views. Regular views execute their underlying query every time they are accessed, so they don't inherently improve query performance by storing results."
          },
          {
            "question": "What is the main drawback of a Materialized View compared to a regular View?",
            "options": [
              "It cannot use joins or aggregate functions.",
              "Its data might be stale.",
              "It requires more complex syntax to create.",
              "It cannot be queried using `SELECT *`."
            ],
            "correctIndex": 1,
            "explanation": "Since Materialized Views store data, they need to be refreshed periodically. If not refreshed, their stored data may not reflect the latest changes in the underlying base tables, leading to stale data."
          },
          {
            "question": "To update the stored data in a Materialized View (e.g., in PostgreSQL), what command is typically used?",
            "options": [
              "UPDATE MATERIALIZED VIEW",
              "REFRESH MATERIALIZED VIEW",
              "SYNCHRONIZE MATERIALIZED VIEW",
              "REBUILD MATERIALIZED VIEW"
            ],
            "correctIndex": 1,
            "explanation": "The `REFRESH MATERIALIZED VIEW` command (or similar `ALTER MATERIALIZED VIEW REFRESH` in Oracle) is used to re-execute the underlying query and update the data stored in the materialized view."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "Explain the difference between a SQL View and a Materialized View. When would you use each?",
        "answer": "A SQL View is a virtual table defined by a query; it does not store data itself but executes its underlying query every time it's referenced, always providing real-time data. I'd use a regular view for security (restricting column/row access), simplifying complex queries for end-users, or providing a stable interface despite underlying schema changes. \nA Materialized View, on the other hand, stores the actual data result of its defining query on disk. This offers significant performance benefits for complex or aggregated queries, as the query doesn't need to be re-executed. However, the data can become stale, requiring explicit refresh operations. I'd use a materialized view for reporting dashboards or analytical queries on large datasets where high performance is critical and some data latency is acceptable.",
        "difficulty": "Mid",
        "category": "Conceptual"
      },
      {
        "question": "How do Views contribute to database security?",
        "answer": "Views enhance database security by allowing administrators to grant users access only to specific subsets of data. Instead of giving users direct access to base tables, which might contain sensitive information, a view can be created to expose only the necessary columns and rows. For example, a view might show employee names and departments but hide salaries or personal contact details. Permissions are then granted on the view, not the underlying tables, ensuring that users only see what they're authorized to see.",
        "difficulty": "Mid",
        "category": "Conceptual"
      }
    ]
  },
  {
    "id": "recursive-ctes",
    "slug": "recursive-ctes",
    "title": "Recursive Common Table Expressions (CTEs)",
    "description": "Dive into advanced CTEs to query hierarchical data, perform graph traversals, and generate sequences using recursive patterns.",
    "difficulty": "Advanced",
    "estimatedMinutes": 60,
    "tags": [
      "cte",
      "recursion",
      "hierarchical data",
      "graph traversal",
      "advanced sql"
    ],
    "sections": {
      "what": {
        "text": "A Common Table Expression (CTE) is a named temporary result set that you can reference within a single SQL statement (SELECT, INSERT, UPDATE, or DELETE). While standard CTEs provide a way to break down complex queries into simpler, readable steps, Recursive CTEs take this a step further by allowing a CTE to refer to itself. This self-referencing capability makes them incredibly powerful for handling hierarchical or tree-structured data.\n\nThe structure of a Recursive CTE consists of two main parts, joined by a `UNION ALL` operator:\n1.  **Anchor Member**: This is the non-recursive part of the CTE. It's the initial query that defines the base result set. This is where the recursion starts.\n2.  **Recursive Member**: This part refers back to the CTE itself. It processes the results from the anchor member (or the previous iteration of the recursive member) and generates new rows. This process continues until a termination condition is met, preventing an infinite loop.\n\nRecursive CTEs are primarily used for tasks such as:\n*   **Querying Hierarchical Data**: Navigating organizational charts (manager-employee relationships), bill of materials (parent-component relationships), or file system structures.\n*   **Graph Traversal**: Finding paths in a network or social graph.\n*   **Generating Sequences**: Creating a series of numbers, dates, or other items.",
        "eli5": "Imagine you want to find all your ancestors. A 'Recursive CTE' is like starting with yourself (the 'anchor') and then asking, 'Who are my parents?' Then, for each parent, you ask, 'Who are THEIR parents?' You keep doing this (the 'recursive' part) until you reach someone who doesn't have parents in your records (the 'termination condition'). It helps you explore family trees or chains of command very easily.",
        "points": [
          "Recursive CTEs allow a CTE to refer to itself, ideal for hierarchical or graph-like data.",
          "Composed of an 'Anchor Member' (initial query) and a 'Recursive Member' (self-referencing query).",
          "The Anchor and Recursive members are combined using `UNION ALL`.",
          "A crucial 'Termination Condition' is needed in the recursive member to prevent infinite loops.",
          "Commonly used for organizational charts, bill of materials, and sequence generation."
        ]
      },
      "code": {
        "code": "-- Example Schema: Employee-Manager Hierarchy\nCREATE TABLE Employees (\n    employee_id INT PRIMARY KEY,\n    employee_name VARCHAR(50),\n    manager_id INT NULL  -- NULL for the top-level manager (CEO)\n);\n\nINSERT INTO Employees VALUES (1, 'CEO Alice', NULL);\nINSERT INTO Employees VALUES (2, 'Bob (Manager)', 1);\nINSERT INTO Employees VALUES (3, 'Charlie (Manager)', 1);\nINSERT INTO Employees VALUES (4, 'David (Engineer)', 2);\nINSERT INTO Employees VALUES (5, 'Eve (Engineer)', 2);\nINSERT INTO Employees VALUES (6, 'Frank (Analyst)', 3);\n\n-- Find all employees reporting up to a specific manager (e.g., CEO Alice - employee_id 1)\nWITH RECURSIVE EmployeeHierarchy AS (\n    -- Anchor Member: Select the initial employee (CEO Alice)\n    SELECT\n        employee_id,\n        employee_name,\n        manager_id,\n        0 AS level\n    FROM\n        Employees\n    WHERE\n        employee_id = 1\n\n    UNION ALL\n\n    -- Recursive Member: Find direct reports of the previous level\n    SELECT\n        e.employee_id,\n        e.employee_name,\n        e.manager_id,\n        eh.level + 1 AS level\n    FROM\n        Employees e\n    JOIN\n        EmployeeHierarchy eh ON e.manager_id = eh.employee_id\n)\nSELECT\n    employee_id,\n    employee_name,\n    manager_id,\n    level\nFROM\n    EmployeeHierarchy\nORDER BY\n    level, employee_id;\n\n-- Example: Generate a sequence of numbers (1 to 10)\nWITH RECURSIVE NumberSequence AS (\n    -- Anchor Member: Starting number\n    SELECT 1 AS num\n    UNION ALL\n    -- Recursive Member: Add 1 to the previous number\n    SELECT num + 1\n    FROM NumberSequence\n    WHERE num < 10 -- Termination condition\n)\nSELECT num FROM NumberSequence;",
        "breakdown": [
          {
            "line": "CREATE TABLE Employees (...); INSERT INTO Employees VALUES (...);",
            "explanation": "Sets up a sample `Employees` table with a self-referencing `manager_id` column to represent an organizational hierarchy."
          },
          {
            "line": "WITH RECURSIVE EmployeeHierarchy AS ( ... )",
            "explanation": "Declares a recursive CTE named `EmployeeHierarchy`. The `RECURSIVE` keyword is crucial."
          },
          {
            "line": "SELECT employee_id, employee_name, manager_id, 0 AS level FROM Employees WHERE employee_id = 1",
            "explanation": "This is the **Anchor Member**. It selects the top-level employee (CEO Alice) and assigns her `level` 0. This is the starting point of the recursion."
          },
          {
            "line": "UNION ALL",
            "explanation": "Connects the anchor member with the recursive member. `UNION ALL` is used because we want to include all rows, even duplicates, from each iteration."
          },
          {
            "line": "SELECT e.employee_id, e.employee_name, e.manager_id, eh.level + 1 AS level FROM Employees e JOIN EmployeeHierarchy eh ON e.manager_id = eh.employee_id",
            "explanation": "This is the **Recursive Member**. It joins `Employees` (`e`) with the CTE itself (`eh`). For each employee found in the previous iteration (`eh`), it finds their direct reports (`e.manager_id = eh.employee_id`) and increments their `level`. This process repeats until no new employees are found (the implicit termination condition)."
          },
          {
            "line": "SELECT ... FROM EmployeeHierarchy ORDER BY ...;",
            "explanation": "The final `SELECT` statement retrieves all rows generated by the `EmployeeHierarchy` CTE, showing the full chain of command with their respective levels."
          },
          {
            "line": "WITH RECURSIVE NumberSequence AS ( ... )",
            "explanation": "Another example showing sequence generation using a recursive CTE."
          },
          {
            "line": "SELECT 1 AS num",
            "explanation": "Anchor member: Starts the sequence with the number 1."
          },
          {
            "line": "SELECT num + 1 FROM NumberSequence WHERE num < 10",
            "explanation": "Recursive member: Adds 1 to the current number (`num`) from the previous iteration. The `WHERE num < 10` is the **Termination Condition**, stopping the recursion once `num` reaches 10."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "Every Recursive CTE requires an `ANCHOR MEMBER` (base case) and a `RECURSIVE MEMBER` (iterative step), connected by `UNION ALL`.",
          "The `RECURSIVE MEMBER` must reference the CTE itself.",
          "A `TERMINATION CONDITION` in the `RECURSIVE MEMBER`'s `WHERE` clause is crucial to prevent infinite loops.",
          "Common use cases include organizational hierarchies, bill of materials, network pathfinding, and generating date/number sequences.",
          "Be aware of potential performance issues with deep hierarchies or large datasets, and ensure your termination condition is correct."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "Which keyword is essential when defining a recursive CTE?",
            "options": [
              "ITERATIVE",
              "LOOP",
              "RECURSIVE",
              "HIERARCHICAL"
            ],
            "correctIndex": 2,
            "explanation": "The `RECURSIVE` keyword must be explicitly used in the `WITH` clause to indicate that the CTE can refer to itself."
          },
          {
            "question": "What separates the anchor member from the recursive member in a recursive CTE?",
            "options": [
              "UNION",
              "JOIN",
              "INTERSECT",
              "UNION ALL"
            ],
            "correctIndex": 3,
            "explanation": "The `UNION ALL` operator is used to combine the result sets of the anchor and recursive members. `UNION` would remove duplicates, which might not be desired in recursive scenarios."
          },
          {
            "question": "What is the primary purpose of the 'anchor member' in a recursive CTE?",
            "options": [
              "To define the termination condition for the recursion.",
              "To repeatedly process previous results.",
              "To establish the initial base result set for the recursion.",
              "To perform an aggregation on the final recursive output."
            ],
            "correctIndex": 2,
            "explanation": "The anchor member provides the starting point or initial set of rows from which the recursion begins. Without it, the recursive part would have no base to build upon."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "Describe a scenario where a Recursive CTE would be more appropriate than a series of JOINs or subqueries.",
        "answer": "Recursive CTEs are ideal for situations involving hierarchical or tree-structured data where the depth of the hierarchy is unknown or variable. For example, an organizational chart where you need to find all direct and indirect subordinates of a specific manager, or a bill of materials where you need to list all sub-components and their sub-components. Standard JOINs or subqueries would require a fixed number of levels, meaning you'd have to write a separate join for each potential level of the hierarchy, which is impractical for arbitrary depths. A Recursive CTE handles this dynamically by iterating until the top or bottom of the hierarchy is reached.",
        "difficulty": "Mid",
        "category": "Conceptual"
      },
      {
        "question": "What is the most critical element to include in a recursive CTE to prevent errors, and why?",
        "answer": "The most critical element is the **termination condition** within the recursive member's `WHERE` clause. Without a proper termination condition, the recursive member would continue to execute indefinitely, leading to an infinite loop. This would consume excessive system resources, potentially crash the database, or result in an 'recursion limit exceeded' error. The termination condition ensures the recursion stops once the desired base or edge case is reached.",
        "difficulty": "Mid",
        "category": "Scenario"
      }
    ]
  },
  {
    "id": "sql-pivot-unpivot",
    "slug": "sql-pivot-unpivot",
    "title": "Pivoting and Unpivoting Data in SQL",
    "description": "Learn how to transform row-based data into column-based summaries (pivot) and vice-versa (unpivot) for better reporting and analysis.",
    "difficulty": "Intermediate",
    "estimatedMinutes": 50,
    "tags": [
      "pivot",
      "unpivot",
      "data transformation",
      "reporting",
      "analytics"
    ],
    "sections": {
      "what": {
        "text": "Pivoting data in SQL involves rotating rows into columns. This is a common requirement in reporting and analytics, where you want to summarize data from a 'long' format (many rows for a single entity, with a column indicating the category) into a 'wide' format (fewer rows, with categories becoming distinct columns). For example, turning a list of sales for each month into a table where each month is a column, showing total sales for specific products.\n\nMost SQL databases support pivoting, either through specific `PIVOT` syntax (like in SQL Server or Oracle) or by using conditional aggregation with `CASE` statements and aggregate functions (like `SUM`, `COUNT`, `AVG`). The `CASE` statement approach is more universally portable across different SQL dialects, though it can be more verbose.\n\nUnpivoting is the inverse operation: it transforms columns into rows. This is useful when data is stored in a 'wide' format, but you need to analyze it in a 'long' format, perhaps for normalization, easier filtering, or input into analytical tools that prefer a row-based structure. For example, if you have a table with 'Q1_Sales', 'Q2_Sales', 'Q3_Sales' as separate columns, unpivoting would transform these into rows, each containing a 'Quarter' column and a 'Sales' value column. Unpivoting can also be achieved with specific `UNPIVOT` syntax (again, common in SQL Server/Oracle) or by using `UNION ALL` to combine queries for each column you wish to unpivot.",
        "eli5": "Imagine a student's grade report. Pivoting is like turning a list that says 'John scored 90 in Math, John scored 85 in Science, Jane scored 92 in Math, Jane scored 88 in Science' into a table that looks like this:\n\n| Student | Math | Science |\n|---------|------|---------|\n| John    | 90   | 85      |\n| Jane    | 92   | 88      |\n\nUnpivoting is doing the exact opposite. If you have the second table, you turn it back into the first list.",
        "points": [
          "Pivoting transforms rows into columns, creating a 'wide' data format for reporting.",
          "Unpivoting transforms columns into rows, creating a 'long' data format for analysis or normalization.",
          "Pivoting can be done with `CASE` statements and aggregation (universal) or specific `PIVOT` syntax (database-specific).",
          "Unpivoting can be done with `UNION ALL` (universal) or specific `UNPIVOT` syntax (database-specific).",
          "These transformations are crucial for adapting data to different analytical or reporting needs."
        ]
      },
      "code": {
        "code": "-- Example Schema: Sales Data\nCREATE TABLE ProductSales (\n    product_id INT,\n    sale_month VARCHAR(10),\n    sales_amount DECIMAL(10, 2)\n);\n\nINSERT INTO ProductSales VALUES (101, 'Jan', 1500.00);\nINSERT INTO ProductSales VALUES (101, 'Feb', 2000.00);\nINSERT INTO ProductSales VALUES (102, 'Jan', 1200.00);\nINSERT INTO ProductSales VALUES (102, 'Mar', 1800.00);\nINSERT INTO ProductSales VALUES (101, 'Mar', 2500.00);\nINSERT INTO ProductSales VALUES (103, 'Feb', 900.00);\n\n-- 1. Pivoting Data using Conditional Aggregation (Universal Approach)\n-- Goal: Show total sales for each product, with months as columns.\nSELECT\n    product_id,\n    SUM(CASE WHEN sale_month = 'Jan' THEN sales_amount ELSE 0 END) AS Jan_Sales,\n    SUM(CASE WHEN sale_month = 'Feb' THEN sales_amount ELSE 0 END) AS Feb_Sales,\n    SUM(CASE WHEN sale_month = 'Mar' THEN sales_amount ELSE 0 END) AS Mar_Sales\nFROM\n    ProductSales\nGROUP BY\n    product_id\nORDER BY\n    product_id;\n\n-- 2. Unpivoting Data using UNION ALL (Universal Approach)\n-- Goal: Transform the pivoted data back into a 'long' format if it were stored wide.\n-- Let's simulate a 'wide' table first:\nCREATE TABLE ProductSalesWide (\n    product_id INT,\n    Jan_Sales DECIMAL(10, 2),\n    Feb_Sales DECIMAL(10, 2),\n    Mar_Sales DECIMAL(10, 2)\n);\nINSERT INTO ProductSalesWide VALUES (101, 1500.00, 2000.00, 2500.00);\nINSERT INTO ProductSalesWide VALUES (102, 1200.00, NULL, 1800.00);\nINSERT INTO ProductSalesWide VALUES (103, NULL, 900.00, NULL);\n\nSELECT product_id, 'Jan' AS sale_month, Jan_Sales AS sales_amount FROM ProductSalesWide WHERE Jan_Sales IS NOT NULL\nUNION ALL\nSELECT product_id, 'Feb' AS sale_month, Feb_Sales AS sales_amount FROM ProductSalesWide WHERE Feb_Sales IS NOT NULL\nUNION ALL\nSELECT product_id, 'Mar' AS sale_month, Mar_Sales AS sales_amount FROM ProductSalesWide WHERE Mar_Sales IS NOT NULL\nORDER BY product_id, sale_month;",
        "breakdown": [
          {
            "line": "CREATE TABLE ProductSales (...); INSERT INTO ProductSales VALUES (...);",
            "explanation": "Sets up a sample `ProductSales` table in a 'long' format (one row per product, per month)."
          },
          {
            "line": "SELECT product_id, SUM(CASE WHEN sale_month = 'Jan' THEN sales_amount ELSE 0 END) AS Jan_Sales, ... FROM ProductSales GROUP BY product_id;",
            "explanation": "This performs pivoting. For each `product_id`, it uses `CASE` statements inside `SUM` to check the `sale_month`. If the month matches, it adds the `sales_amount` to the respective new column (`Jan_Sales`, `Feb_Sales`, etc.); otherwise, it adds 0. The `GROUP BY product_id` aggregates these sums for each product, effectively turning month rows into month columns."
          },
          {
            "line": "CREATE TABLE ProductSalesWide (...); INSERT INTO ProductSalesWide VALUES (...);",
            "explanation": "Creates and populates a sample table that is already in a 'wide' format, mimicking the output of a pivot, for the unpivot demonstration."
          },
          {
            "line": "SELECT product_id, 'Jan' AS sale_month, Jan_Sales AS sales_amount FROM ProductSalesWide WHERE Jan_Sales IS NOT NULL",
            "explanation": "The first part of the unpivot. It selects `product_id`, explicitly names the month 'Jan', and selects `Jan_Sales` from the wide table. `WHERE Jan_Sales IS NOT NULL` is used to exclude months where a product had no sales, preventing unwanted rows."
          },
          {
            "line": "UNION ALL",
            "explanation": "Combines the result of the 'Jan' selection with the next month's selection. This operator is crucial for stacking the results of multiple `SELECT` statements into a single, unpivoted result set."
          },
          {
            "line": "SELECT product_id, 'Feb' AS sale_month, Feb_Sales AS sales_amount FROM ProductSalesWide WHERE Feb_Sales IS NOT NULL",
            "explanation": "The second part, similar to the 'Jan' part, for the 'Feb' sales. This pattern repeats for all columns to be unpivoted."
          },
          {
            "line": "ORDER BY product_id, sale_month;",
            "explanation": "Orders the final unpivoted results for readability."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "Pivoting: Rows to columns. Best for summary reports where specific categories become headers. Use `SUM(CASE WHEN condition THEN value ELSE 0 END)` with `GROUP BY` for a universal solution.",
          "Unpivoting: Columns to rows. Best for normalizing data or preparing it for tools that expect a 'long' format. Use `UNION ALL` for a universal solution, selecting each column as a new row.",
          "`PIVOT` and `UNPIVOT` operators exist in some SQL dialects (SQL Server, Oracle) but are not universally supported.",
          "When pivoting, ensure correct aggregation function (`SUM`, `COUNT`, `MAX`, etc.) is used within the `CASE` statement.",
          "When unpivoting, handle `NULL` values carefully (e.g., `WHERE column IS NOT NULL`) to avoid unnecessary rows."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "Which SQL operation transforms rows into columns?",
            "options": [
              "Normalize",
              "Aggregate",
              "Pivot",
              "Join"
            ],
            "correctIndex": 2,
            "explanation": "Pivoting is the process of rotating row values into column headers, transforming a 'long' dataset into a 'wide' one."
          },
          {
            "question": "To perform pivoting using only standard SQL, which construct is most commonly used in conjunction with aggregate functions?",
            "options": [
              "IF-ELSE statements",
              "WHILE loops",
              "CASE expressions",
              "SUBSTRING functions"
            ],
            "correctIndex": 2,
            "explanation": "Conditional aggregation using `CASE` expressions within aggregate functions (like `SUM` or `COUNT`) is the standard, portable way to achieve pivoting without dialect-specific `PIVOT` operators."
          },
          {
            "question": "If you have a table with columns 'Region_A_Sales', 'Region_B_Sales', 'Region_C_Sales' and you want to transform it into a table with 'Region' and 'Sales' columns, what operation would you perform?",
            "options": [
              "Pivoting",
              "Unpivoting",
              "Grouping",
              "Joining"
            ],
            "correctIndex": 1,
            "explanation": "This is a classic unpivoting scenario, where multiple columns representing different categories (regions) are transformed into a single 'Region' column and a corresponding 'Sales' value column, creating a 'long' format."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "You have a table `DailyWeather (date DATE, city VARCHAR(50), temperature DECIMAL(5,2))`. How would you write a query to show the temperature for three specific cities (e.g., 'London', 'Paris', 'New York') as separate columns for each date?",
        "answer": "This is a pivoting problem. I would use conditional aggregation with `CASE` statements. The `date` column would be grouped, and for each city, a `SUM` (or `MAX`/`AVG` if only one temperature per city per day) of temperature would be conditionally selected.\n\n```sql\nSELECT\n    date,\n    MAX(CASE WHEN city = 'London' THEN temperature ELSE NULL END) AS London_Temp,\n    MAX(CASE WHEN city = 'Paris' THEN temperature ELSE NULL END) AS Paris_Temp,\n    MAX(CASE WHEN city = 'New York' THEN temperature ELSE NULL END) AS NewYork_Temp\nFROM\n    DailyWeather\nWHERE\n    city IN ('London', 'Paris', 'New York')\nGROUP BY\n    date\nORDER BY\n    date;\n```",
        "difficulty": "Mid",
        "category": "Coding"
      },
      {
        "question": "What are the advantages of using `UNION ALL` for unpivoting compared to a database-specific `UNPIVOT` operator?",
        "answer": "The main advantage of using `UNION ALL` for unpivoting is its **portability**. It's standard SQL and works across virtually all relational database systems (PostgreSQL, MySQL, SQL Server, Oracle, etc.). This makes the code more reusable and less dependent on a specific database vendor's extensions. \n\nThe disadvantages are that it can be more verbose, especially for many columns, and potentially less optimized by the query optimizer compared to a native `UNPIVOT` operator, which the database might be able to handle more efficiently. However, for a moderate number of columns, `UNION ALL` is often perfectly acceptable and preferred for cross-platform compatibility.",
        "difficulty": "Mid",
        "category": "Conceptual"
      }
    ]
  },
  {
    "id": "sql-stored-procedures-udfs",
    "slug": "sql-stored-procedures-udfs",
    "title": "Stored Procedures and User-Defined Functions (UDFs)",
    "description": "Master the art of creating reusable code blocks in SQL to encapsulate complex logic, improve performance, and maintain database integrity.",
    "difficulty": "Intermediate",
    "estimatedMinutes": 60,
    "tags": [
      "stored procedures",
      "udf",
      "functions",
      "modularity",
      "performance",
      "programmability"
    ],
    "sections": {
      "what": {
        "text": "Stored Procedures and User-Defined Functions (UDFs) are powerful features in SQL that allow developers to encapsulate complex logic into reusable modules. They bring programmability to the database layer, offering benefits such as improved performance, enhanced security, reduced network traffic, and better maintainability.\n\n**Stored Procedures (SPs)** are named blocks of SQL statements and procedural code (like IF-ELSE, loops, variable declarations) that are stored in the database and can be executed on demand. They can accept input parameters and can return output parameters or multiple result sets. SPs are typically used for performing actions (DML operations like INSERT, UPDATE, DELETE), executing complex business logic, or managing transactions. They can modify data and have side effects, meaning they can change the state of the database.\n\n**User-Defined Functions (UDFs)** are also named blocks of SQL or procedural code, but they are designed to return a single, scalar value or a table. UDFs are typically used for calculations, data formatting, or complex transformations that can be applied to data within a query. A key characteristic of UDFs is that they are generally expected to be 'side-effect free' – they should not modify database data or state. There are two main types:\n1.  **Scalar UDFs**: Return a single value (e.g., `calculate_tax(amount)` returns a tax amount).\n2.  **Table-Valued UDFs (TVFs)**: Return a result set, similar to a view, but can accept parameters to make the result dynamic (e.g., `get_employee_by_department(dept_id)` returns a table of employees for that department).\n\nThe primary distinctions lie in their purpose: SPs are for performing actions, while UDFs are for returning values (scalar or tabular) and can be used directly within `SELECT`, `WHERE`, `HAVING` clauses.",
        "eli5": "Imagine a big kitchen (your database). A 'Stored Procedure' is like a chef's special recipe for cooking a whole meal. You tell the chef 'Cook me the Feast!', and the chef does many things: chops veggies, fries meat, serves it all up, and might even clean up a bit. It does a lot of work and can change things. A 'User-Defined Function' is like a special gadget in the kitchen, maybe a super-slicer. You put an apple in (input), press a button, and it always gives you perfectly sliced apples (output). It just does one specific job and doesn't change anything else in the kitchen.",
        "points": [
          "Stored Procedures (SPs) are reusable code blocks for performing actions and complex logic; can modify data.",
          "User-Defined Functions (UDFs) are reusable code blocks for returning a single scalar value or a table; generally side-effect free.",
          "SPs can return multiple result sets and output parameters.",
          "UDFs come in Scalar (single value) and Table-Valued (table result set) types.",
          "Both improve performance (compiled execution plans), security (controlled access), and modularity."
        ]
      },
      "code": {
        "code": "-- Example Schema\nCREATE TABLE Products (\n    product_id INT PRIMARY KEY,\n    product_name VARCHAR(100),\n    price DECIMAL(10, 2),\n    stock_quantity INT\n);\n\nINSERT INTO Products VALUES (1, 'Laptop', 1200.00, 50);\nINSERT INTO Products VALUES (2, 'Mouse', 25.00, 200);\nINSERT INTO Products VALUES (3, 'Keyboard', 75.00, 150);\n\n-- 1. Create a Stored Procedure (Example using SQL Server/PostgreSQL-like syntax)\n-- This procedure updates stock and logs the transaction\nCREATE PROCEDURE ProcessOrder (\n    @productId INT,\n    @orderQuantity INT,\n    OUT @statusMessage VARCHAR(255)\n) -- OUT parameter for SQL Server, for PostgreSQL use INOUT or RETURN value\nAS\nBEGIN\n    -- For PostgreSQL, use PERFORM or SELECT into variables for procedural logic\n    -- IF @orderQuantity <= (SELECT stock_quantity FROM Products WHERE product_id = @productId) THEN\n    --     UPDATE Products SET stock_quantity = stock_quantity - @orderQuantity WHERE product_id = @productId;\n    --     SELECT 'Order processed successfully.' INTO @statusMessage;\n    -- ELSE\n    --     SELECT 'Insufficient stock.' INTO @statusMessage;\n    -- END IF;\n    \n    -- Generic SQL-like logic (simplified for demonstration, specific syntax varies)\n    DECLARE current_stock INT;\n    SELECT stock_quantity INTO current_stock FROM Products WHERE product_id = @productId;\n\n    IF @orderQuantity <= current_stock THEN\n        UPDATE Products SET stock_quantity = stock_quantity - @orderQuantity WHERE product_id = @productId;\n        SET @statusMessage = 'Order processed successfully.';\n    ELSE\n        SET @statusMessage = 'Insufficient stock.';\n    END IF;\nEND;\n\n-- 2. Execute the Stored Procedure\nDECLARE @msg VARCHAR(255);\nEXEC ProcessOrder @productId = 1, @orderQuantity = 10, @statusMessage = @msg OUTPUT; -- SQL Server syntax\n-- For PostgreSQL, simpler call: SELECT ProcessOrder(1, 10, NULL); (if function returns status)\nSELECT @msg AS Status;\nSELECT * FROM Products WHERE product_id = 1;\n\n-- 3. Create a Scalar User-Defined Function\n-- This function calculates discounted price\nCREATE FUNCTION GetDiscountedPrice (\n    @originalPrice DECIMAL(10, 2),\n    @discountPercent DECIMAL(5, 2)\n) \nRETURNS DECIMAL(10, 2)\nAS\nBEGIN\n    RETURN @originalPrice * (1 - @discountPercent / 100);\nEND;\n\n-- 4. Use the Scalar UDF in a SELECT statement\nSELECT\n    product_name,\n    price AS OriginalPrice,\n    dbo.GetDiscountedPrice(price, 10) AS PriceAfter10PercentDiscount -- dbo. prefix for SQL Server\nFROM\n    Products;\n\n-- 5. Create a Table-Valued User-Defined Function (PostgreSQL-like syntax)\n-- Returns products above a certain stock level\nCREATE FUNCTION GetProductsAboveStock (\n    targetStock INT\n)\nRETURNS TABLE (\n    product_id INT,\n    product_name VARCHAR(100),\n    stock_quantity INT\n)\nAS $$\nBEGIN\n    RETURN QUERY\n    SELECT p.product_id, p.product_name, p.stock_quantity\n    FROM Products p\n    WHERE p.stock_quantity > targetStock;\nEND;\n$$ LANGUAGE plpgsql;\n\n-- 6. Use the Table-Valued UDF\nSELECT * FROM GetProductsAboveStock(100);",
        "breakdown": [
          {
            "line": "CREATE TABLE Products (...); INSERT INTO Products VALUES (...);",
            "explanation": "Sets up a sample `Products` table with inventory details."
          },
          {
            "line": "CREATE PROCEDURE ProcessOrder (@productId INT, @orderQuantity INT, OUT @statusMessage VARCHAR(255)) AS BEGIN ... END;",
            "explanation": "Defines a stored procedure named `ProcessOrder`. It takes product ID and quantity, and returns a status message. Inside, it declares a local variable, checks stock, updates it, and sets the status message. This demonstrates procedural logic and data modification."
          },
          {
            "line": "DECLARE @msg VARCHAR(255); EXEC ProcessOrder @productId = 1, @orderQuantity = 10, @statusMessage = @msg OUTPUT; SELECT @msg AS Status; SELECT * FROM Products WHERE product_id = 1;",
            "explanation": "Executes the `ProcessOrder` stored procedure. It passes input parameters and captures the output message into a local variable `@msg`, then displays the message and verifies the stock update."
          },
          {
            "line": "CREATE FUNCTION GetDiscountedPrice (@originalPrice DECIMAL(10, 2), @discountPercent DECIMAL(5, 2)) RETURNS DECIMAL(10, 2) AS BEGIN RETURN ... END;",
            "explanation": "Defines a scalar UDF named `GetDiscountedPrice`. It takes two numbers and returns a single calculated discounted price. This function performs a calculation and returns a single value, without modifying any data."
          },
          {
            "line": "SELECT product_name, price AS OriginalPrice, dbo.GetDiscountedPrice(price, 10) AS PriceAfter10PercentDiscount FROM Products;",
            "explanation": "Uses the `GetDiscountedPrice` UDF directly within a `SELECT` statement to calculate discounted prices for all products. This showcases how UDFs integrate into queries."
          },
          {
            "line": "CREATE FUNCTION GetProductsAboveStock (targetStock INT) RETURNS TABLE (...) AS $$ BEGIN RETURN QUERY ... END; $$ LANGUAGE plpgsql;",
            "explanation": "Defines a table-valued UDF named `GetProductsAboveStock`. It takes a `targetStock` parameter and returns a table of products whose stock quantity exceeds that target. This function returns a set of rows, making it dynamic and reusable."
          },
          {
            "line": "SELECT * FROM GetProductsAboveStock(100);",
            "explanation": "Executes the `GetProductsAboveStock` table-valued UDF, passing 100 as the target stock. It returns a result set containing products with more than 100 units in stock."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "Stored Procedures: Can perform DML (INSERT, UPDATE, DELETE), return multiple result sets/output parameters, contain complex control flow (loops, conditionals), and improve security and performance (pre-compiled).",
          "User-Defined Functions (UDFs): Can be Scalar (returns single value) or Table-Valued (returns a table), generally used for calculations/data retrieval, cannot perform DML (side-effect free), can be used in `SELECT`, `WHERE`, `HAVING` clauses.",
          "SPs are executed with `EXEC` (SQL Server) or `CALL` (some others). UDFs are called like built-in functions within queries.",
          "Performance: SPs generally perform well. UDFs, especially scalar UDFs used in `WHERE` clauses, can sometimes hinder query optimizer and lead to performance degradation if not designed carefully (e.g., row-by-row processing).",
          "Security: Both allow granular permissions, limiting direct table access."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "Which of the following operations can a User-Defined Function (UDF) typically NOT perform?",
            "options": [
              "Return a single scalar value.",
              "Return a table of data.",
              "Execute an `INSERT` statement to add new rows.",
              "Perform complex calculations."
            ],
            "correctIndex": 2,
            "explanation": "User-Defined Functions are generally designed to be side-effect free, meaning they should not modify database data. `INSERT`, `UPDATE`, or `DELETE` statements are typically not allowed within UDFs (though some database systems might have specific exceptions or allow them with certain restrictions for specific types of UDFs, the general principle is no DML)."
          },
          {
            "question": "A Stored Procedure is best suited for which of these tasks?",
            "options": [
              "Calculating the square root of a number within a `SELECT` statement.",
              "Retrieving a list of all employees for a given department.",
              "Executing a multi-step business transaction that updates several tables and logs the changes.",
              "Formatting a date string into a specific format for display."
            ],
            "correctIndex": 2,
            "explanation": "Stored Procedures are ideal for complex, multi-step operations involving DML, transaction management, and intricate business logic, as they can perform actions and have side effects."
          },
          {
            "question": "What is a primary performance benefit of using Stored Procedures and UDFs?",
            "options": [
              "They force parallel execution of queries.",
              "They automatically compress data before execution.",
              "Their execution plans are often compiled and cached, reducing parsing overhead.",
              "They eliminate the need for indexes on underlying tables."
            ],
            "correctIndex": 2,
            "explanation": "When Stored Procedures and UDFs are executed for the first time, the database compiles an optimal execution plan. This plan is often cached and reused for subsequent calls, reducing the overhead of parsing and optimizing the query each time, thus improving performance."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "When would you choose a Stored Procedure over a User-Defined Function, and vice versa?",
        "answer": "I would choose a Stored Procedure when the primary goal is to perform an action, execute complex business logic, or manage transactions. SPs can perform DML operations (INSERT, UPDATE, DELETE), return multiple result sets, and have output parameters. They're good for encapsulating an entire business process.\n\nI would choose a User-Defined Function when the goal is to compute a value or return a data set that can be used within a query, much like a built-in function. UDFs are generally side-effect free and cannot perform DML. Scalar UDFs are for single values (e.g., calculations, formatting), and Table-Valued UDFs are for dynamic result sets. They integrate seamlessly into `SELECT`, `WHERE`, `HAVING` clauses.",
        "difficulty": "Mid",
        "category": "Conceptual"
      },
      {
        "question": "Discuss the potential performance implications of using Scalar User-Defined Functions extensively in your SQL queries.",
        "answer": "While UDFs offer modularity, extensive use of Scalar UDFs, especially in `SELECT` lists or `WHERE` clauses that operate on many rows, can severely impact query performance. This is because they often prevent the query optimizer from performing certain optimizations, such as index usage or parallel processing. The database might have to execute the UDF row-by-row for each row processed by the query, leading to high CPU usage and I/O. In many cases, it's more efficient to convert the UDF logic into an inline expression, a CTE, or a Table-Valued Function if possible, or even rewrite it directly into the main query, to allow the optimizer better flexibility.",
        "difficulty": "Senior",
        "category": "Conceptual"
      }
    ]
  },
  {
    "id": "sql-regular-expressions",
    "slug": "sql-regular-expressions",
    "title": "SQL Regular Expressions",
    "description": "Unlock powerful pattern matching capabilities in SQL using regular expressions for advanced text search, validation, and data extraction.",
    "difficulty": "Intermediate",
    "estimatedMinutes": 40,
    "tags": [
      "regex",
      "pattern matching",
      "text functions",
      "data validation",
      "advanced search"
    ],
    "sections": {
      "what": {
        "text": "Regular Expressions (Regex or Regexp) provide a powerful and flexible way to search, match, and manipulate text based on specific patterns. While SQL's `LIKE` operator with wildcards (`%`, `_`) is useful for simple pattern matching, Regex offers a far more sophisticated toolkit for complex text analysis, such as validating email addresses, extracting specific data formats (e.g., phone numbers), or finding text that adheres to intricate rules.\n\nDifferent SQL database systems implement regular expression functionality with varying syntax and functions:\n*   **PostgreSQL and MySQL**: Use the `~` operator for case-sensitive matching, `~*` for case-insensitive. `REGEXP_REPLACE`, `REGEXP_SUBSTR`, `REGEXP_MATCHES` functions are also available.\n*   **Oracle**: Provides `REGEXP_LIKE`, `REGEXP_SUBSTR`, `REGEXP_INSTR`, `REGEXP_REPLACE` functions.\n*   **SQL Server**: Does not have native regex support prior to SQL Server 2022 (where it got `REGEX_IS_MATCH`, `REGEX_SUBSTRING`, `REGEX_REPLACE`), requiring workarounds using CLR functions or `PATINDEX` for very limited patterns (which is not a true regex engine).\n\nKey Regular Expression Metacharacters:\n*   `.`: Matches any single character (except newline).\n*   `*`: Matches zero or more occurrences of the preceding character/group.\n*   `+`: Matches one or more occurrences of the preceding character/group.\n*   `?`: Matches zero or one occurrence of the preceding character/group.\n*   `[abc]`: Matches any single character in the set 'a', 'b', or 'c'.\n*   `[^abc]`: Matches any single character NOT in the set 'a', 'b', or 'c'.\n*   `[0-9]`: Matches any digit.\n*   `[a-z]`: Matches any lowercase letter.\n*   `^`: Matches the beginning of the string.\n*   `$`: Matches the end of the string.\n*   `\\d`: Matches any digit (equivalent to `[0-9]`).\n*   `\\w`: Matches any word character (alphanumeric + underscore).\n*   `\\s`: Matches any whitespace character.\n*   `|`: OR operator (e.g., `cat|dog` matches 'cat' or 'dog').\n*   `()`: Grouping and capturing.\n\nUnderstanding these elements allows for highly precise and flexible text manipulation within SQL queries.",
        "eli5": "Imagine you have a list of people's names and phone numbers, but they're all messy. `LIKE` is like asking 'Does this entry start with the letter J?'. It's okay, but not super smart. 'Regular Expressions' (Regex) are like giving the computer a super-smart detective. You can tell it: 'Find me entries that start with exactly three letters, then have a space, then exactly three numbers, a dash, and then four more numbers.' It can find very specific patterns that `LIKE` could never dream of!",
        "points": [
          "Regular Expressions (Regex) offer advanced pattern matching beyond `LIKE` wildcards.",
          "Syntax and functions vary by database (e.g., `~` in PostgreSQL, `REGEXP_LIKE` in Oracle, `REGEXP` in MySQL).",
          "Key metacharacters like `.`, `*`, `+`, `?`, `[]`, `^`, `$`, `\\d`, `\\w`, `|` define complex patterns.",
          "Used for data validation (e.g., email, phone), complex search queries, and data extraction.",
          "Can be powerful but also complex and potentially performance-intensive for large datasets."
        ]
      },
      "code": {
        "code": "-- Example Schema\nCREATE TABLE Users (\n    user_id INT PRIMARY KEY,\n    user_name VARCHAR(100),\n    email VARCHAR(100),\n    phone_number VARCHAR(20),\n    bio TEXT\n);\n\nINSERT INTO Users VALUES (1, 'Alice Smith', 'alice.smith@example.com', '123-456-7890', 'Loves coding and hiking.');\nINSERT INTO Users VALUES (2, 'Bob Johnson', 'bob@domain.org', '(987) 654-3210', 'Always learning new things.');\nINSERT INTO Users VALUES (3, 'Charlie Brown', 'charlie@email', '555-1234', 'Just a regular guy.'); -- Invalid email/phone for demo\nINSERT INTO Users VALUES (4, 'David Lee', 'david.lee@co.uk', NULL, 'Data enthusiast.');\n\n-- Examples using PostgreSQL/MySQL REGEXP operator and functions\n\n-- 1. Find users with emails ending in .com or .org\nSELECT user_name, email\nFROM Users\nWHERE email ~* '\\.(com|org)$'; -- ~* for case-insensitive matching\n\n-- 2. Find users with a phone number in a common format (e.g., XXX-XXX-XXXX or (XXX) XXX-XXXX)\nSELECT user_name, phone_number\nFROM Users\nWHERE phone_number ~ '^\\(?\\d{3}\\)?[ -]?\\d{3}[ -]?\\d{4}$';\n\n-- 3. Extract the domain name from an email address (using REGEXP_SUBSTR in PostgreSQL/Oracle, similar in MySQL)\nSELECT user_name,\n       email,\n       REGEXP_SUBSTR(email, '@([[:alnum:]-]+\\.)+[[:alnum:]-]{2,}', 1, 1, 'i', 1) AS domain -- 1=start pos, 1=occurrence, 'i'=case-insensitive, 1=capture group\nFROM Users\nWHERE email IS NOT NULL AND email ~ '@';\n\n-- 4. Replace specific patterns in bio text (e.g., replace 'coding' with 'programming')\nSELECT user_name,\n       bio AS original_bio,\n       REGEXP_REPLACE(bio, 'coding', 'programming', 'ig') AS modified_bio -- 'ig' for case-insensitive global replace\nFROM Users;",
        "breakdown": [
          {
            "line": "CREATE TABLE Users (...); INSERT INTO Users VALUES (...);",
            "explanation": "Sets up a sample `Users` table with various text fields for demonstration."
          },
          {
            "line": "WHERE email ~* '\\.(com|org)$';",
            "explanation": "Uses the `~*` operator (PostgreSQL/MySQL for case-insensitive regex match) to find emails ending with '.com' or '.org'. `\\.` escapes the dot, `(com|org)` creates a group for 'com' OR 'org', and `$` asserts end of string."
          },
          {
            "line": "WHERE phone_number ~ '^\\(?\\d{3}\\)?[ -]?\\d{3}[ -]?\\d{4}$';",
            "explanation": "Uses `~` (PostgreSQL/MySQL for case-sensitive regex match) to validate phone number formats. `^` and `$` anchor to start/end. `\\(?` matches an optional opening parenthesis. `\\d{3}` matches exactly three digits. `\\)?` matches an optional closing parenthesis. `[ -]?` matches an optional space or dash. This covers formats like `123-456-7890` and `(123) 456-7890`."
          },
          {
            "line": "REGEXP_SUBSTR(email, '@([[:alnum:]-]+\\.)+[[:alnum:]-]{2,}', 1, 1, 'i', 1) AS domain",
            "explanation": "Uses `REGEXP_SUBSTR` (PostgreSQL/Oracle) to extract the domain name from the email. The pattern `@([[:alnum:]-]+\\.)+[[:alnum:]-]{2,}` looks for an '@' symbol followed by one or more alphanumeric/hyphen characters, then a dot, repeated, ending with 2+ alphanumeric/hyphen characters. The last `1` indicates to return the first captured group (the domain itself)."
          },
          {
            "line": "REGEXP_REPLACE(bio, 'coding', 'programming', 'ig') AS modified_bio",
            "explanation": "Uses `REGEXP_REPLACE` to find all occurrences of 'coding' (case-insensitive due to `i` flag, global due to `g` flag) in the `bio` column and replaces them with 'programming'."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "Regex is far more powerful than `LIKE` for complex pattern matching.",
          "Key metacharacters: `.` (any char), `*` (0+), `+` (1+), `?` (0 or 1), `[]` (char set), `^` (start), `$` (end), `|` (OR).",
          "Character classes: `\\d` (digit), `\\w` (word char), `\\s` (whitespace).",
          "Always be aware of specific database syntax (operators like `~`, `~*` or functions like `REGEXP_LIKE`, `REGEXP_SUBSTR`).",
          "Regex operations can be computationally expensive; use them judiciously, especially on large text fields without appropriate indexing (though regex typically doesn't use standard indexes effectively)."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "Which regular expression metacharacter matches zero or more occurrences of the preceding element?",
            "options": [
              "+",
              "?",
              "*",
              "|"
            ],
            "correctIndex": 2,
            "explanation": "The asterisk `*` quantifier matches zero or more occurrences of the preceding character or group."
          },
          {
            "question": "If you want to find all emails that start with 'admin' followed by any number of characters and end with '.net', which regex pattern would be most appropriate?",
            "options": [
              "'admin%.net'",
              "'^admin.*\\.net$'",
              "'admin[a-z0-9]*\\.net'",
              "'admin.+net'"
            ],
            "correctIndex": 1,
            "explanation": "`^` anchors to the start, `admin` matches literally, `.*` matches any character zero or more times, `\\.` escapes the dot, `net` matches literally, and `$` anchors to the end. This pattern correctly matches emails like 'admin123@example.net'."
          },
          {
            "question": "Which SQL operator or function is generally used for case-insensitive regular expression matching in PostgreSQL and MySQL?",
            "options": [
              "LIKE",
              "REGEXP_LIKE",
              "~*",
              "PATINDEX"
            ],
            "correctIndex": 2,
            "explanation": "In PostgreSQL and MySQL, `~*` is the operator for case-insensitive regular expression matching. `REGEXP_LIKE` is used in Oracle, and `PATINDEX` in SQL Server has limited regex capabilities."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "When would you choose to use SQL Regular Expressions over the `LIKE` operator, and what are the limitations?",
        "answer": "I would choose Regular Expressions over `LIKE` when the pattern to match is complex and cannot be easily expressed with `_` (single character) and `%` (zero or more characters). For example, validating email formats, extracting specific sequences of numbers/letters, or matching text that must appear in a specific order or count (e.g., exactly 3 digits). `LIKE` is sufficient for simple prefix, suffix, or substring checks.\n\nThe main limitations of Regex in SQL are: 1. **Database-specific syntax**: Functions and operators vary significantly across SQL dialects, making code less portable. 2. **Performance**: Regex operations can be much more computationally intensive than simple `LIKE` comparisons, especially on large datasets or complex patterns, and they generally cannot leverage standard indexes to speed up searches. 3. **Complexity**: Writing and debugging complex regex patterns can be challenging.",
        "difficulty": "Mid",
        "category": "Conceptual"
      },
      {
        "question": "How would you extract all numbers from a string column using regular expressions?",
        "answer": "To extract all numbers from a string, I would use a regular expression function like `REGEXP_SUBSTR` (available in PostgreSQL, Oracle) or `REGEXP_REPLACE` (available in many databases). \n\nUsing `REGEXP_SUBSTR` (e.g., in PostgreSQL):\n```sql\nSELECT REGEXP_SUBSTR(your_column, '[0-9]+') AS extracted_number\nFROM your_table;\n```\nThis would extract the first sequence of one or more digits. To get all numbers if there are multiple, I might need to use a loop (in procedural SQL) or more advanced regex features (e.g., `REGEXP_MATCHES` in PostgreSQL, which returns a set of matches).\n\nAlternatively, using `REGEXP_REPLACE` to remove non-digit characters (e.g., in PostgreSQL/MySQL):\n```sql\nSELECT REGEXP_REPLACE(your_column, '[^0-9]', '', 'g') AS all_numbers_concatenated\nFROM your_table;\n```\nThis replaces anything that is NOT a digit (`[^0-9]`) with an empty string, effectively concatenating all digits present in the string.",
        "difficulty": "Mid",
        "category": "Coding"
      }
    ]
  },
  {
    "id": "time-series-analysis-gap-handling-sql",
    "slug": "time-series-sql-gaps",
    "title": "Time Series Analysis and Gap Handling in SQL",
    "description": "Learn advanced SQL techniques to manage, analyze, and impute missing data in time-series datasets, including generating continuous date sequences and identifying streaks.",
    "difficulty": "Intermediate",
    "estimatedMinutes": 50,
    "tags": [
      "Time Series",
      "Dates",
      "Gaps",
      "Data Imputation",
      "Analytics",
      "PostgreSQL"
    ],
    "sections": {
      "what": {
        "text": "Time series data, which tracks observations over time, is ubiquitous in analytics for areas like sales, sensor readings, and user activity. A common challenge with real-world time series data is its inherent 'messiness' – data might be missing for certain time intervals (gaps), or recorded at irregular frequencies. Standard SQL queries might struggle to accurately represent trends or perform calculations over these incomplete sequences.\n\nThis topic delves into sophisticated SQL patterns to effectively handle these issues. We'll explore how to generate a continuous sequence of dates or timestamps, which serves as a baseline against which actual data can be joined. This technique is crucial for tasks like visualizing trends over an uninterrupted timeline, calculating cumulative sums correctly even when data points are absent, or identifying periods of inactivity (streaks or islands).\n\nBy learning to 'fill the gaps' in your time series, you can ensure more accurate analytical insights, prevent misinterpretations due to sparse data, and enable robust reporting on temporal patterns. We'll utilize concepts like common table expressions (CTEs) for sequence generation and `LEFT JOIN` operations to merge actual data with our complete time sequence, often combined with `COALESCE` for imputing default values for missing data points.",
        "eli5": "Imagine you're tracking how many ice creams you sell each day. Some days you might not sell any, or forget to write it down. If you just look at your notes, it might look like you sold ice cream on Monday, then Wednesday, then Friday. But what about Tuesday and Thursday? This topic teaches you how to use SQL to make sure you see *every* day, even the empty ones, so you get a full picture of your ice cream sales all week.",
        "points": [
          "Time series data often has missing intervals (gaps) that can skew analysis.",
          "Generating a continuous sequence of dates/times is a fundamental technique for time series analysis.",
          "Use `LEFT JOIN` to combine actual data with a generated time series to reveal gaps.",
          "`COALESCE` can impute default values (e.g., 0) for missing data points in generated gaps.",
          "This technique is vital for accurate trend analysis, cumulative calculations, and identifying periods of inactivity."
        ]
      },
      "code": {
        "code": "-- Example Table: daily_sales\nCREATE TABLE daily_sales (\n    sale_date DATE PRIMARY KEY,\n    sales_amount DECIMAL(10, 2)\n);\n\n-- Insert some sample data with a gap\nINSERT INTO daily_sales (sale_date, sales_amount) VALUES\n('2023-01-01', 100.00),\n('2023-01-02', 150.00),\n('2023-01-04', 200.00), -- Gap on 2023-01-03\n('2023-01-05', 120.00),\n('2023-01-07', 300.00); -- Gap on 2023-01-06\n\n-- Query 1: Generate a continuous date series and fill gaps\nWITH date_series AS (\n    SELECT generate_series(\n        '2023-01-01'::date, -- Start date\n        '2023-01-07'::date, -- End date\n        '1 day'::interval   -- Interval step\n    )::date AS dt\n)\nSELECT\n    ds.dt AS full_date,\n    COALESCE(s.sales_amount, 0.00) AS sales_amount_filled,\n    s.sales_amount AS original_sales_amount\nFROM\n    date_series ds\nLEFT JOIN\n    daily_sales s ON ds.dt = s.sale_date\nORDER BY\n    ds.dt;\n\n-- Query 2: Calculate a running total over the filled series\nWITH date_series AS (\n    SELECT generate_series(\n        '2023-01-01'::date,\n        '2023-01-07'::date,\n        '1 day'::interval\n    )::date AS dt\n),\nfilled_sales AS (\n    SELECT\n        ds.dt AS full_date,\n        COALESCE(s.sales_amount, 0.00) AS sales_amount\n    FROM\n        date_series ds\n    LEFT JOIN\n        daily_sales s ON ds.dt = s.sale_date\n)\nSELECT\n    fs.full_date,\n    fs.sales_amount,\n    SUM(fs.sales_amount) OVER (ORDER BY fs.full_date) AS running_total_sales\nFROM\n    filled_sales fs\nORDER BY\n    fs.full_date;\n",
        "breakdown": [
          {
            "line": "CREATE TABLE daily_sales (...);",
            "explanation": "Defines a sample table `daily_sales` with a date and sales amount."
          },
          {
            "line": "INSERT INTO daily_sales (...);",
            "explanation": "Populates the `daily_sales` table with some data, intentionally creating gaps (e.g., '2023-01-03', '2023-01-06' are missing)."
          },
          {
            "line": "WITH date_series AS ( SELECT generate_series(...) AS dt )",
            "explanation": "A Common Table Expression (CTE) named `date_series` is created. `generate_series` (PostgreSQL specific) produces a sequence of dates from a start date to an end date, incrementing by a specified interval (e.g., '1 day')."
          },
          {
            "line": "SELECT ds.dt AS full_date, COALESCE(s.sales_amount, 0.00) AS sales_amount_filled, ...",
            "explanation": "Selects the generated date and uses `COALESCE` to replace NULL sales amounts (from the `LEFT JOIN`) with 0.00, effectively 'filling' the gaps."
          },
          {
            "line": "FROM date_series ds LEFT JOIN daily_sales s ON ds.dt = s.sale_date",
            "explanation": "Performs a `LEFT JOIN` between the continuous `date_series` and `daily_sales`. This ensures all dates from `date_series` are present, with matching sales data where available, and NULLs for missing dates."
          },
          {
            "line": "ORDER BY ds.dt;",
            "explanation": "Orders the results chronologically."
          },
          {
            "line": "WITH date_series AS ( ... ), filled_sales AS ( ... )",
            "explanation": "Defines two CTEs: `date_series` (same as before) and `filled_sales`, which is the result of joining the date series with original sales and filling `NULL`s with 0."
          },
          {
            "line": "SELECT fs.full_date, fs.sales_amount, SUM(fs.sales_amount) OVER (ORDER BY fs.full_date) AS running_total_sales",
            "explanation": "Calculates a running total of sales. The `SUM(...) OVER (ORDER BY ...)` is a window function that computes the sum of sales up to the current date, ensuring that even days with 0 sales (the filled gaps) are included in the cumulative sum."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "Understand that `generate_series` (PostgreSQL) or similar techniques (e.g., recursive CTEs in SQL Server, `CONNECT BY LEVEL` in Oracle) are crucial for creating continuous date sequences.",
          "`LEFT JOIN` is essential when combining a complete time series with sparse actual data to retain all time points.",
          "`COALESCE(column, default_value)` is key for imputing values (like 0 for counts/sums) for missing data in the generated gaps.",
          "Window functions (e.g., `SUM() OVER (ORDER BY date)`) become more powerful when applied to a gap-filled time series for accurate cumulative calculations."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "Which SQL join type is best suited for combining a generated continuous date series with a table that might have missing dates?",
            "options": [
              "INNER JOIN",
              "RIGHT JOIN",
              "FULL OUTER JOIN",
              "LEFT JOIN"
            ],
            "correctIndex": 3,
            "explanation": "A LEFT JOIN ensures that all dates from the 'left' table (your generated series) are preserved, even if there's no matching data in the 'right' table (your actual data), allowing you to identify and handle gaps."
          },
          {
            "question": "What is the primary purpose of using `COALESCE` when handling time series gaps after performing a LEFT JOIN?",
            "options": [
              "To convert date formats",
              "To combine multiple columns into one",
              "To replace NULL values with a specified default",
              "To filter out unwanted rows"
            ],
            "correctIndex": 2,
            "explanation": "`COALESCE` is used to replace NULL values, which occur for the generated dates that do not have corresponding entries in the original data, with a meaningful default like 0."
          },
          {
            "question": "Which of the following problems does generating a continuous date series primarily help to solve?",
            "options": [
              "Calculating the average sales per day of the week",
              "Identifying specific sales transactions",
              "Accurately visualizing trends and calculating cumulative metrics over potentially sparse periods",
              "Optimizing query performance for large date ranges"
            ],
            "correctIndex": 2,
            "explanation": "Generating a continuous series is crucial for accurate trend analysis and cumulative calculations, as it ensures all time points are considered, even if data is missing, preventing misinterpretations from sparse data."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "Imagine you have a table `user_logins` with `user_id` and `login_date`. How would you find all users who had a 'streak' of at least 3 consecutive login days within a specific month?",
        "answer": "This is a classic 'gaps and islands' problem. I would start by generating a series of all dates for the target month. Then, `LEFT JOIN` the `user_logins` table to this series. For each user, I would assign a row number based on `login_date` and another row number based on `login_date` minus `ROW_NUMBER()`. If the difference between these two row numbers is constant, it indicates a streak. Finally, I'd group by this difference and count consecutive days to identify streaks of 3 or more.",
        "difficulty": "Senior",
        "category": "Scenario"
      },
      {
        "question": "You have daily website traffic data, but some days are missing due to tracking issues. How would you use SQL to report the average daily traffic for a month, treating missing days as zero traffic?",
        "answer": "First, I would generate a complete series of dates for the month using `generate_series` (or a similar method). Then, I would `LEFT JOIN` my actual traffic data to this complete date series. For the `traffic_count` column, I'd use `COALESCE(actual_traffic_count, 0)` to treat missing days as 0. Finally, I would calculate the `AVG()` of this coalesced traffic count over the entire month to get an accurate average including the zero-traffic days.",
        "difficulty": "Mid",
        "category": "Conceptual"
      }
    ]
  },
  {
    "id": "advanced-concurrency-transactions-isolation",
    "slug": "sql-concurrency-isolation-levels",
    "title": "Advanced Concurrency: Transactions and Isolation Levels",
    "description": "Dive deep into how SQL databases manage concurrent operations, exploring transaction isolation levels, their associated phenomena (dirty reads, non-repeatable reads, phantom reads), and their impact on data consistency and performance.",
    "difficulty": "Advanced",
    "estimatedMinutes": 60,
    "tags": [
      "Transactions",
      "Concurrency",
      "Isolation Levels",
      "ACID",
      "Performance",
      "Database Architecture"
    ],
    "sections": {
      "what": {
        "text": "In a multi-user database environment, multiple transactions often execute concurrently. Without proper management, these concurrent operations can lead to data inconsistencies and corruption. This is where the concept of concurrency control and transaction isolation levels becomes critical. While Transaction Control Language (TCL) commands like `COMMIT` and `ROLLBACK` manage the atomicity and durability of individual transactions, isolation levels determine *how* concurrent transactions interact with each other and what data visibility guarantees they offer.\n\nThe ACID properties (Atomicity, Consistency, Isolation, Durability) are the cornerstone of reliable transaction processing. Isolation, specifically, dictates that the concurrent execution of transactions should appear to be serializable, meaning the final state of the database should be the same as if the transactions had executed one after another. However, achieving perfect isolation often comes at a significant performance cost due to extensive locking.\n\nTo balance consistency and performance, SQL standards define four primary isolation levels: `READ UNCOMMITTED`, `READ COMMITTED`, `REPEATABLE READ`, and `SERIALIZABLE`. Each level prevents a specific set of concurrency anomalies, which include dirty reads, non-repeatable reads, and phantom reads. Understanding these anomalies and which isolation level prevents them is crucial for designing robust and performant database applications that maintain data integrity under heavy load.",
        "eli5": "Imagine lots of people trying to write in the same notebook at the same time. If they're not careful, they might write over each other's work or read something someone else hasn't finished writing yet. This topic is about the rules (isolation levels) that databases use to let many people work on the data at once, making sure everything stays neat and correct, without always having to make everyone wait for someone else to finish.",
        "points": [
          "Concurrency allows multiple transactions to execute simultaneously.",
          "Transaction Isolation Levels define how concurrent transactions interact and what data anomalies are prevented.",
          "The four standard isolation levels are `READ UNCOMMITTED`, `READ COMMITTED`, `REPEATABLE READ`, and `SERIALIZABLE`.",
          "Key concurrency anomalies include dirty reads, non-repeatable reads, and phantom reads.",
          "There's a trade-off between higher isolation (better consistency) and lower isolation (better performance)."
        ]
      },
      "code": {
        "code": "-- Example of demonstrating a Dirty Read using two concurrent sessions\n-- (This example assumes PostgreSQL or a similar SQL dialect)\n\n-- Setup: Create a simple table\nCREATE TABLE accounts (\n    account_id INT PRIMARY KEY,\n    balance DECIMAL(10, 2)\n);\nINSERT INTO accounts (account_id, balance) VALUES (101, 1000.00);\n\n-- Session 1 (Transaction 1)\n-- SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;\n-- Note: PostgreSQL's default is READ COMMITTED, and it does not support\n-- 'READ UNCOMMITTED' in the standard way; it typically defaults to READ COMMITTED.\n-- For a true dirty read example, you might need a different DB (e.g., SQL Server)\n-- or a very specific setup. We'll simulate the *effect* with READ COMMITTED.\n\n-- Start a transaction\nBEGIN;\nUPDATE accounts SET balance = balance - 200 WHERE account_id = 101; -- Balance is now 800.00 in this session\nSELECT 'Session 1 Balance (uncommitted):', balance FROM accounts WHERE account_id = 101;\n\n-- DO NOT COMMIT YET!\n\n-- Session 2 (Transaction 2) - running concurrently\n-- Set isolation level to demonstrate dirty read (if supported, e.g., SQL Server)\n-- For PostgreSQL, this will still show 1000.00 if READ COMMITTED is default\n-- SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED; -- Attempt to read uncommitted data\nBEGIN;\nSELECT 'Session 2 Balance (attempting dirty read):', balance FROM accounts WHERE account_id = 101;\n-- In a DB supporting true READ UNCOMMITTED, Session 2 would see 800.00 here.\n-- In PostgreSQL (default READ COMMITTED), Session 2 would still see 1000.00 until Session 1 commits.\n\n-- Session 1 continues\n-- ROLLBACK; -- Session 1 rolls back, balance reverts to 1000.00\n\n-- Session 2 continues\n-- If Session 2 had read 800.00 (dirty read), it would now be inconsistent.\nSELECT 'Session 2 Balance (after T1 rollback):', balance FROM accounts WHERE account_id = 101;\n-- Now both sessions will see 1000.00\nROLLBACK;\n\n-- Cleanup\nDROP TABLE accounts;\n",
        "breakdown": [
          {
            "line": "CREATE TABLE accounts (...);",
            "explanation": "Creates a simple `accounts` table to demonstrate transaction behavior."
          },
          {
            "line": "INSERT INTO accounts (...);",
            "explanation": "Inserts an initial record with a balance."
          },
          {
            "line": "BEGIN;",
            "explanation": "Starts a transaction in Session 1. All subsequent DML operations in this session are part of this transaction until `COMMIT` or `ROLLBACK`."
          },
          {
            "line": "UPDATE accounts SET balance = balance - 200 WHERE account_id = 101;",
            "explanation": "Session 1 updates the balance, but this change is not yet committed to the database."
          },
          {
            "line": "SELECT 'Session 1 Balance (uncommitted):', balance FROM accounts WHERE account_id = 101;",
            "explanation": "Session 1 sees its own uncommitted change (e.g., balance 800.00)."
          },
          {
            "line": "BEGIN;",
            "explanation": "Starts a transaction in Session 2, concurrently with Session 1."
          },
          {
            "line": "SELECT 'Session 2 Balance (attempting dirty read):', balance FROM accounts WHERE account_id = 101;",
            "explanation": "Session 2 attempts to read the balance. Depending on the isolation level, it might see Session 1's uncommitted change (dirty read) or the committed value (before Session 1's update)."
          },
          {
            "line": "ROLLBACK; -- Session 1 rolls back",
            "explanation": "Session 1's transaction is rolled back, meaning its update is undone, and the balance reverts to its original committed value."
          },
          {
            "line": "SELECT 'Session 2 Balance (after T1 rollback):', balance FROM accounts WHERE account_id = 101;",
            "explanation": "Session 2 reads the balance again. If a dirty read occurred, Session 2 might have operated on incorrect data that was later undone."
          },
          {
            "line": "ROLLBACK;",
            "explanation": "Session 2's transaction is also rolled back."
          },
          {
            "line": "DROP TABLE accounts;",
            "explanation": "Cleans up the sample table."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "Memorize the four standard isolation levels (`READ UNCOMMITTED`, `READ COMMITTED`, `REPEATABLE READ`, `SERIALIZABLE`) and the concurrency anomalies they prevent (dirty reads, non-repeatable reads, phantom reads).",
          "`READ UNCOMMITTED` allows dirty reads (reading uncommitted data).",
          "`READ COMMITTED` prevents dirty reads but allows non-repeatable reads (re-reading data and finding it changed by a committed transaction) and phantom reads (re-executing a query and finding new rows matching the criteria).",
          "`REPEATABLE READ` prevents dirty reads and non-repeatable reads, but still allows phantom reads.",
          "`SERIALIZABLE` prevents all three common anomalies, offering the highest level of isolation but typically with the highest performance overhead due to more extensive locking.",
          "Understand that the default isolation level varies by database system (e.g., PostgreSQL defaults to `READ COMMITTED`, SQL Server `READ COMMITTED`, Oracle `READ COMMITTED` or `SERIALIZABLE` depending on specific setup)."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "Which of the following transaction isolation levels allows a 'dirty read'?",
            "options": [
              "READ COMMITTED",
              "REPEATABLE READ",
              "READ UNCOMMITTED",
              "SERIALIZABLE"
            ],
            "correctIndex": 2,
            "explanation": "READ UNCOMMITTED is the lowest isolation level and allows transactions to read uncommitted changes made by other transactions, leading to dirty reads."
          },
          {
            "question": "A 'non-repeatable read' occurs when:",
            "options": [
              "A transaction reads data that was never committed.",
              "A transaction re-reads the same data and finds that another committed transaction has modified it.",
              "A transaction re-executes a query and finds new rows that satisfy the query condition.",
              "A transaction is unable to acquire a lock on a row."
            ],
            "correctIndex": 1,
            "explanation": "A non-repeatable read happens when a transaction queries the same row twice and gets different values because another transaction committed an update to that row in between the two reads."
          },
          {
            "question": "Which isolation level provides the highest degree of data consistency by preventing dirty reads, non-repeatable reads, AND phantom reads?",
            "options": [
              "READ COMMITTED",
              "REPEATABLE READ",
              "SERIALIZABLE",
              "SNAPSHOT (if applicable)"
            ],
            "correctIndex": 2,
            "explanation": "SERIALIZABLE is the highest standard isolation level and ensures that concurrent transactions appear to execute sequentially, preventing all three common anomalies: dirty reads, non-repeatable reads, and phantom reads."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "Explain the concept of transaction isolation levels. What are dirty reads, non-repeatable reads, and phantom reads, and how can you prevent them in SQL?",
        "answer": "Transaction isolation levels define how concurrent transactions interact and the degree to which one transaction's changes are visible to others. A dirty read is when a transaction reads uncommitted data from another. A non-repeatable read is when a transaction reads the same row twice and gets different values because another transaction committed an update. A phantom read is when a transaction re-executes a query and finds new rows that satisfy the criteria due to another committed transaction. These are prevented by increasing isolation levels: READ COMMITTED prevents dirty reads; REPEATABLE READ prevents dirty reads and non-repeatable reads; SERIALIZABLE prevents all three.",
        "difficulty": "Mid",
        "category": "Conceptual"
      },
      {
        "question": "You are building a high-traffic e-commerce application. Discuss the trade-offs you would consider when choosing an appropriate transaction isolation level for updating product inventory.",
        "answer": "For updating product inventory, data consistency is paramount to avoid overselling. `READ UNCOMMITTED` is definitely out due to dirty reads. `READ COMMITTED` prevents dirty reads but allows non-repeatable reads (someone else could update the stock level after I've read it but before I commit my update), which is problematic. `REPEATABLE READ` would prevent this specific issue, but a phantom read (new products added) might still subtly affect aggregate inventory counts. `SERIALIZABLE` offers the highest consistency by preventing all anomalies, making it ideal for critical inventory updates where accuracy is non-negotiable. However, `SERIALIZABLE` can lead to high contention and reduce concurrency, potentially impacting performance in a high-traffic system. A common approach is to use `READ COMMITTED` as a default for most operations, but explicitly escalate to `SERIALIZABLE` (or use explicit locking mechanisms like `SELECT ... FOR UPDATE`) for highly critical operations like decrementing stock to prevent race conditions, balancing performance with strict consistency needs.",
        "difficulty": "Senior",
        "category": "Scenario"
      }
    ]
  },
  {
    "id": "querying-semi-structured-data-json-xml",
    "slug": "sql-json-xml-queries",
    "title": "Querying Semi-structured Data with SQL (JSON/XML)",
    "description": "Master SQL functions and operators for parsing, extracting, and transforming JSON and XML data directly within your relational database, bridging the gap between structured and semi-structured worlds.",
    "difficulty": "Intermediate",
    "estimatedMinutes": 50,
    "tags": [
      "JSON",
      "XML",
      "Semi-structured Data",
      "Data Extraction",
      "Data Transformation",
      "PostgreSQL",
      "SQL Server"
    ],
    "sections": {
      "what": {
        "text": "The world of data is no longer purely relational. With the rise of web services, APIs, and microservices, it's increasingly common for relational databases to store semi-structured data formats like JSON (JavaScript Object Notation) and XML (Extensible Markup Language) directly within columns. This approach offers flexibility, allowing developers to store complex, evolving data schemas without immediately altering the database's strict relational structure.\n\nTraditional SQL, designed for tabular data, needed to evolve to handle these new data types. Modern SQL databases (like PostgreSQL, SQL Server, MySQL, Oracle) have introduced powerful sets of functions and operators specifically designed for querying and manipulating JSON and XML data. This enables you to parse these structures, extract specific values, arrays, or objects, and even transform them into a tabular format for traditional SQL analysis.\n\nMastering these functions bridges the gap between the structured and semi-structured data worlds. It allows you to leverage the robust querying capabilities of SQL for data that might originate from NoSQL sources or API responses, without the need for complex application-level parsing. You'll learn how to navigate nested structures, filter based on elements within JSON/XML, and aggregate data that lives inside these flexible formats.",
        "eli5": "Imagine you have a box (your database) where some items are neatly organized in shelves (regular tables), but other items are in a jumbled bag (a JSON or XML string). This topic teaches you how to reach into those bags with special SQL tools to find exactly what you need, even if it's buried deep inside, and then put it on a shelf to analyze like everything else.",
        "points": [
          "Modern databases often store JSON/XML for flexibility in handling evolving data schemas.",
          "SQL provides specific functions and operators to query and manipulate semi-structured data.",
          "Key tasks include extracting scalar values, entire objects/arrays, and transforming JSON/XML into tabular data.",
          "Understanding path expressions (e.g., dot notation for JSON) is crucial for navigating nested structures.",
          "These capabilities allow for robust analysis of diverse data sources directly within SQL."
        ]
      },
      "code": {
        "code": "-- Example Table with JSON data (PostgreSQL syntax)\nCREATE TABLE products (\n    product_id SERIAL PRIMARY KEY,\n    product_name VARCHAR(100),\n    details JSONB -- JSONB is PostgreSQL's optimized binary JSON type\n);\n\n-- Insert sample data\nINSERT INTO products (product_name, details) VALUES\n('Laptop X1', '{\"brand\": \"TechCorp\", \"specs\": {\"cpu\": \"i7\", \"ram\": \"16GB\", \"storage\": \"512GB SSD\"}, \"price\": 1200.00, \"features\": [\"webcam\", \"backlit keyboard\"]}'),\n('Smartphone Z', '{\"brand\": \"MobilePro\", \"specs\": {\"cpu\": \"Snapdragon\", \"ram\": \"8GB\"}, \"price\": 750.00, \"features\": [\"5G\", \"dual camera\"]}'),\n('Monitor G27', '{\"brand\": \"DisplayLux\", \"specs\": {\"resolution\": \"1440p\", \"refresh_rate\": \"144Hz\"}, \"price\": 400.00, \"warranty\": \"2 years\"}');\n\n-- Query 1: Extract a scalar value (brand) from the JSON\nSELECT\n    product_name,\n    details ->> 'brand' AS brand\nFROM\n    products;\n\n-- Query 2: Extract a nested scalar value (CPU spec)\nSELECT\n    product_name,\n    details -> 'specs' ->> 'cpu' AS cpu_spec\nFROM\n    products\nWHERE\n    details ->> 'brand' = 'TechCorp';\n\n-- Query 3: Extract an array element (first feature)\nSELECT\n    product_name,\n    details -> 'features' ->> 0 AS first_feature -- Array elements are 0-indexed\nFROM\n    products\nWHERE\n    details -> 'features' IS NOT NULL;\n\n-- Query 4: Filter products based on a value within JSON (price < 1000)\nSELECT\n    product_name,\n    (details ->> 'price')::numeric AS price\nFROM\n    products\nWHERE\n    (details ->> 'price')::numeric < 1000.00;\n\n-- Query 5: Unnest an array from JSON into separate rows (using JSONB_ARRAY_ELEMENTS)\nSELECT\n    p.product_name,\n    feature.value AS feature_item\nFROM\n    products p,\n    jsonb_array_elements(p.details -> 'features') AS feature;\n\n-- Example for SQL Server (syntax differs slightly)\n/*\n-- SQL Server equivalent for a JSON column\nCREATE TABLE products_sqlserver (\n    product_id INT IDENTITY(1,1) PRIMARY KEY,\n    product_name VARCHAR(100),\n    details NVARCHAR(MAX) -- Store JSON as NVARCHAR(MAX)\n);\n\nINSERT INTO products_sqlserver (product_name, details) VALUES\n('Laptop X1', '{\"brand\": \"TechCorp\", \"specs\": {\"cpu\": \"i7\", \"ram\": \"16GB\", \"storage\": \"512GB SSD\"}, \"price\": 1200.00, \"features\": [\"webcam\", \"backlit keyboard\"]}'),\n('Smartphone Z', '{\"brand\": \"MobilePro\", \"specs\": {\"cpu\": \"Snapdragon\", \"ram\": \"8GB\"}, \"price\": 750.00, \"features\": [\"5G\", \"dual camera\"]}');\n\n-- Extract a scalar value (brand)\nSELECT product_name, JSON_VALUE(details, '$.brand') AS brand FROM products_sqlserver;\n\n-- Extract a nested scalar value (CPU spec)\nSELECT product_name, JSON_VALUE(details, '$.specs.cpu') AS cpu_spec FROM products_sqlserver WHERE JSON_VALUE(details, '$.brand') = 'TechCorp';\n\n-- Filter by price\nSELECT product_name, CAST(JSON_VALUE(details, '$.price') AS DECIMAL(10,2)) AS price FROM products_sqlserver WHERE CAST(JSON_VALUE(details, '$.price') AS DECIMAL(10,2)) < 1000.00;\n\n-- Unnest array (using OPENJSON)\nSELECT p.product_name, feature.value AS feature_item\nFROM products_sqlserver p\nCROSS APPLY OPENJSON(p.details, '$.features') AS feature;\n*/\n\n-- Cleanup\nDROP TABLE products;\n",
        "breakdown": [
          {
            "line": "CREATE TABLE products (...);",
            "explanation": "Creates a `products` table with a `JSONB` column named `details` (PostgreSQL's optimized JSON type)."
          },
          {
            "line": "INSERT INTO products (...);",
            "explanation": "Populates the table with product data, where `details` contains semi-structured JSON."
          },
          {
            "line": "details ->> 'brand'",
            "explanation": "PostgreSQL operator `->>` extracts a JSON object field as text. Here, it retrieves the 'brand' value."
          },
          {
            "line": "details -> 'specs' ->> 'cpu'",
            "explanation": "This demonstrates extracting a nested value. `details -> 'specs'` extracts the 'specs' JSON object, and then `->> 'cpu'` extracts the 'cpu' field from that nested object as text."
          },
          {
            "line": "details -> 'features' ->> 0",
            "explanation": "Extracts the element at index 0 from the 'features' JSON array as text. JSON arrays are 0-indexed."
          },
          {
            "line": "WHERE (details ->> 'price')::numeric < 1000.00;",
            "explanation": "Filters rows based on a value inside the JSON. `details ->> 'price'` extracts the price as text, which is then cast (`::numeric`) to a numeric type for comparison."
          },
          {
            "line": "FROM products p, jsonb_array_elements(p.details -> 'features') AS feature;",
            "explanation": "Uses `jsonb_array_elements` (a table function in PostgreSQL) to unnest the 'features' array from the JSON `details` column. Each element in the array becomes a separate row, effectively transforming semi-structured array data into a tabular format."
          },
          {
            "line": "/* ... SQL Server equivalents ... */",
            "explanation": "Provides commented-out examples for SQL Server, showing the syntax differences for similar operations (e.g., `JSON_VALUE`, `OPENJSON`)."
          },
          {
            "line": "DROP TABLE products;",
            "explanation": "Cleans up the sample table."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "Be familiar with the JSON operators and functions specific to your target database (e.g., PostgreSQL: `->`, `->>`, `jsonb_array_elements`; SQL Server: `JSON_VALUE`, `JSON_QUERY`, `OPENJSON`).",
          "Understand the difference between extracting a JSON object/array (which returns JSON) vs. a scalar value (which returns text).",
          "Path expressions (e.g., `$.key.nestedKey`, `$.array[0]`) are fundamental for navigating JSON structures.",
          "Remember to cast extracted values to appropriate data types (e.g., `::numeric`, `CAST(...) AS INT`) before performing numeric or date operations.",
          "Table functions like `jsonb_array_elements` (PostgreSQL) or `OPENJSON` (SQL Server) are critical for 'unnesting' arrays or objects into rows and columns for relational analysis."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "In PostgreSQL, which operator is used to extract a JSON object field as plain text?",
            "options": [
              "->",
              "->>",
              "#>",
              "#>>"
            ],
            "correctIndex": 1,
            "explanation": "The `->>` operator extracts a JSON object field's value as `TEXT`. The `->` operator extracts it as `JSONB`."
          },
          {
            "question": "You have a JSON column `data` with a structure like `{\"user\": {\"id\": 123, \"name\": \"Alice\"}}`. To extract 'Alice' in SQL Server, which path would you use with `JSON_VALUE`?",
            "options": [
              "$.user.name",
              "$.user['name']",
              "$.user->name",
              "$[user].name"
            ],
            "correctIndex": 0,
            "explanation": "SQL Server's `JSON_VALUE` uses dot notation for object fields. `$.user.name` correctly specifies the path to the 'name' field within the 'user' object."
          },
          {
            "question": "Which SQL Server function is used to convert a JSON array or object into a relational set of rows and columns?",
            "options": [
              "JSON_QUERY",
              "JSON_VALUE",
              "OPENJSON",
              "JSON_MODIFY"
            ],
            "correctIndex": 2,
            "explanation": "`OPENJSON` is specifically designed in SQL Server to parse JSON text and return objects or arrays from the JSON input as a set of rows, effectively 'unnesting' the JSON."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "You have a `customer_orders` table with an `order_details` column storing JSON data, including product IDs and quantities for each item in an order. How would you find the total quantity sold for a specific product ID across all orders?",
        "answer": "I would use a table function like PostgreSQL's `jsonb_array_elements` or SQL Server's `OPENJSON` to 'unnest' the array of items within the `order_details` JSON into separate rows. This would give me a table-like structure where each row represents an individual product in an order. Then, I could filter by the specific product ID and sum the quantities. For example, in PostgreSQL, `SELECT SUM((item->>'quantity')::int) FROM customer_orders, jsonb_array_elements(order_details->'items') AS item WHERE (item->>'product_id')::int = 123;`.",
        "difficulty": "Senior",
        "category": "Scenario"
      },
      {
        "question": "When would you choose to store JSON data directly in a relational database column instead of using a dedicated NoSQL document database?",
        "answer": "Storing JSON in a relational database is suitable when the semi-structured data is complementary to strongly relational data, and you still need to leverage relational features like ACID transactions, complex joins with other structured tables, or existing SQL toolchains. It's often chosen for flexibility when parts of the schema are evolving rapidly or are optional, while the core data remains relational. If the entire application is primarily document-centric with no strong relational ties, or requires massive scale-out and eventual consistency, a NoSQL document database might be more appropriate. The choice depends on the primary access patterns, data relationships, and consistency requirements.",
        "difficulty": "Mid",
        "category": "Scenario"
      }
    ]
  },
  {
    "id": "database-triggers-automated-logic-data-integrity",
    "slug": "sql-database-triggers",
    "title": "Database Triggers for Automated Logic and Data Integrity",
    "description": "Explore SQL triggers, event-driven stored procedures that automatically execute in response to DML operations (INSERT, UPDATE, DELETE), enabling complex data validation, auditing, and maintenance of data consistency.",
    "difficulty": "Intermediate",
    "estimatedMinutes": 45,
    "tags": [
      "Triggers",
      "Data Integrity",
      "Auditing",
      "Automation",
      "DML",
      "Database Administration"
    ],
    "sections": {
      "what": {
        "text": "Database triggers are powerful, event-driven constructs in SQL that automatically execute a specified set of SQL statements or a stored procedure whenever a particular data manipulation language (DML) event (INSERT, UPDATE, DELETE) occurs on a table or view. They serve as an automated mechanism to enforce complex business rules, maintain data integrity, and implement auditing without requiring explicit calls from application code.\n\nUnlike constraints (like `CHECK` or `FOREIGN KEY`), which handle basic data validation, triggers can implement more intricate, procedural logic. They can operate either 'BEFORE' or 'AFTER' the DML event, and often 'FOR EACH ROW' affected by the operation (or 'FOR EACH STATEMENT' in some databases). During their execution, triggers can access the 'OLD' and 'NEW' values of the rows being affected, allowing them to compare states, log changes, or even prevent the DML operation from completing if certain conditions are not met.\n\nCommon use cases for triggers include: implementing advanced validation beyond simple constraints, automatically updating `last_modified_at` timestamps, maintaining audit trails of data changes, replicating data to other tables, or cascading complex updates/deletes across non-foreign-key relationships. While incredibly useful, triggers also add complexity to the database system, can be harder to debug, and might introduce performance overhead if not carefully designed.",
        "eli5": "Imagine your database is like a rule-following robot. You tell it: 'Every time someone adds a new customer, immediately write down the exact time they joined in a special logbook.' Or 'If someone tries to change a customer's age to something silly like 0, stop them!' Triggers are these automatic 'if this happens, then do that' instructions that your database robot follows all by itself, without anyone needing to tell it to do it every single time.",
        "points": [
          "Triggers are SQL objects that execute automatically in response to DML events (INSERT, UPDATE, DELETE).",
          "They enable automated logic, complex data validation, and data integrity enforcement.",
          "Triggers can fire 'BEFORE' or 'AFTER' a DML event, and often 'FOR EACH ROW' affected.",
          "They have access to `OLD` and `NEW` values of the data being modified.",
          "Common uses: auditing, maintaining timestamps, enforcing complex business rules, and data replication."
        ]
      },
      "code": {
        "code": "-- Example Table: employees\nCREATE TABLE employees (\n    employee_id SERIAL PRIMARY KEY,\n    first_name VARCHAR(50) NOT NULL,\n    last_name VARCHAR(50) NOT NULL,\n    salary DECIMAL(10, 2) NOT NULL,\n    last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\n-- Example Table: audit_log (to store changes)\nCREATE TABLE employee_audit_log (\n    log_id SERIAL PRIMARY KEY,\n    employee_id INT NOT NULL,\n    change_type VARCHAR(10) NOT NULL, -- 'INSERT', 'UPDATE', 'DELETE'\n    old_salary DECIMAL(10, 2),\n    new_salary DECIMAL(10, 2),\n    change_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\n-- Trigger 1: AFTER INSERT for audit log\nCREATE OR REPLACE FUNCTION audit_employee_insert()\nRETURNS TRIGGER AS $$\nBEGIN\n    INSERT INTO employee_audit_log (employee_id, change_type, new_salary)\n    VALUES (NEW.employee_id, 'INSERT', NEW.salary);\n    RETURN NEW;\nEND;\n$$ LANGUAGE plpgsql;\n\nCREATE TRIGGER trg_employee_insert_audit\nAFTER INSERT ON employees\nFOR EACH ROW\nEXECUTE FUNCTION audit_employee_insert();\n\n-- Trigger 2: BEFORE UPDATE to update last_updated_at and log salary changes\nCREATE OR REPLACE FUNCTION update_employee_and_audit_update()\nRETURNS TRIGGER AS $$\nBEGIN\n    -- Update the last_updated_at column automatically\n    NEW.last_updated_at = CURRENT_TIMESTAMP;\n\n    -- Log salary changes only if salary was actually changed\n    IF NEW.salary IS DISTINCT FROM OLD.salary THEN\n        INSERT INTO employee_audit_log (employee_id, change_type, old_salary, new_salary)\n        VALUES (NEW.employee_id, 'UPDATE', OLD.salary, NEW.salary);\n    END IF;\n\n    RETURN NEW; -- Return NEW to allow the update to proceed with modified last_updated_at\nEND;\n$$ LANGUAGE plpgsql;\n\nCREATE TRIGGER trg_employee_update_audit\nBEFORE UPDATE ON employees\nFOR EACH ROW\nEXECUTE FUNCTION update_employee_and_audit_update();\n\n-- Test Inserts\nINSERT INTO employees (first_name, last_name, salary) VALUES ('Alice', 'Smith', 60000.00);\nINSERT INTO employees (first_name, last_name, salary) VALUES ('Bob', 'Johnson', 75000.00);\n\n-- Test Updates\nUPDATE employees SET salary = 62000.00 WHERE employee_id = 1; -- Should trigger update log and timestamp\nUPDATE employees SET first_name = 'Alicia' WHERE employee_id = 1; -- Should only update timestamp (salary not changed)\n\n-- Test Delete (optional, but demonstrates another trigger type)\n/*\nCREATE OR REPLACE FUNCTION audit_employee_delete()\nRETURNS TRIGGER AS $$\nBEGIN\n    INSERT INTO employee_audit_log (employee_id, change_type, old_salary)\n    VALUES (OLD.employee_id, 'DELETE', OLD.salary);\n    RETURN OLD; -- For AFTER DELETE, RETURN OLD is typical\nEND;\n$$ LANGUAGE plpgsql;\n\nCREATE TRIGGER trg_employee_delete_audit\nAFTER DELETE ON employees\nFOR EACH ROW\nEXECUTE FUNCTION audit_employee_delete();\n\nDELETE FROM employees WHERE employee_id = 2;\n*/\n\n-- View results\nSELECT * FROM employees ORDER BY employee_id;\nSELECT * FROM employee_audit_log ORDER BY log_id;\n\n-- Cleanup\nDROP TABLE employee_audit_log;\nDROP TABLE employees;\n",
        "breakdown": [
          {
            "line": "CREATE TABLE employees (...);",
            "explanation": "Creates a sample `employees` table with an `employee_id`, `name`, `salary`, and `last_updated_at` columns."
          },
          {
            "line": "CREATE TABLE employee_audit_log (...);",
            "explanation": "Creates a separate `employee_audit_log` table to store records of changes made to the `employees` table."
          },
          {
            "line": "CREATE OR REPLACE FUNCTION audit_employee_insert() RETURNS TRIGGER AS $$ ... $$ LANGUAGE plpgsql;",
            "explanation": "Defines a PostgreSQL PL/pgSQL function that will be executed by the trigger. This function inserts a new record into `employee_audit_log` whenever an employee is inserted."
          },
          {
            "line": "INSERT INTO employee_audit_log (...) VALUES (NEW.employee_id, 'INSERT', NEW.salary);",
            "explanation": "Inside the function, `NEW.employee_id` and `NEW.salary` refer to the values of the row *being inserted*. This logs the new employee's details."
          },
          {
            "line": "CREATE TRIGGER trg_employee_insert_audit AFTER INSERT ON employees FOR EACH ROW EXECUTE FUNCTION audit_employee_insert();",
            "explanation": "Creates the actual trigger. It fires `AFTER INSERT` on the `employees` table, `FOR EACH ROW` affected, and executes the `audit_employee_insert()` function."
          },
          {
            "line": "CREATE OR REPLACE FUNCTION update_employee_and_audit_update() RETURNS TRIGGER AS $$ ... $$ LANGUAGE plpgsql;",
            "explanation": "Defines another function for updates. This one handles two tasks: updating a timestamp and logging salary changes."
          },
          {
            "line": "NEW.last_updated_at = CURRENT_TIMESTAMP;",
            "explanation": "Inside a `BEFORE UPDATE` trigger function, modifying `NEW` changes the data that will actually be written to the table. Here, it automatically updates the `last_updated_at` column."
          },
          {
            "line": "IF NEW.salary IS DISTINCT FROM OLD.salary THEN ... END IF;",
            "explanation": "Compares the `NEW` salary (the proposed new value) with the `OLD` salary (the value before the update). `IS DISTINCT FROM` handles NULLs correctly. If they are different, it logs the salary change."
          },
          {
            "line": "INSERT INTO employee_audit_log (...) VALUES (NEW.employee_id, 'UPDATE', OLD.salary, NEW.salary);",
            "explanation": "Logs the salary change, including both the `OLD` and `NEW` salary values for auditing."
          },
          {
            "line": "RETURN NEW;",
            "explanation": "For `BEFORE` triggers, returning `NEW` allows the DML operation to proceed with any modifications made within the trigger function."
          },
          {
            "line": "CREATE TRIGGER trg_employee_update_audit BEFORE UPDATE ON employees FOR EACH ROW EXECUTE FUNCTION update_employee_and_audit_update();",
            "explanation": "Creates the update trigger. It fires `BEFORE UPDATE` on `employees`, `FOR EACH ROW`, and executes the `update_employee_and_audit_update()` function."
          },
          {
            "line": "INSERT INTO employees (...);",
            "explanation": "Inserts test data, which will automatically activate `trg_employee_insert_audit`."
          },
          {
            "line": "UPDATE employees SET salary = 62000.00 WHERE employee_id = 1;",
            "explanation": "Updates an employee's salary. This will activate `trg_employee_update_audit`, update `last_updated_at`, and log the salary change."
          },
          {
            "line": "UPDATE employees SET first_name = 'Alicia' WHERE employee_id = 1;",
            "explanation": "Updates a non-salary field. This will activate `trg_employee_update_audit`, update `last_updated_at`, but *not* log a salary change because the `IF` condition isn't met."
          },
          {
            "line": "SELECT * FROM employees; SELECT * FROM employee_audit_log;",
            "explanation": "Queries to verify the changes in the `employees` table and the entries in the `employee_audit_log`."
          },
          {
            "line": "DROP TABLE employee_audit_log; DROP TABLE employees;",
            "explanation": "Cleans up the sample tables and their associated triggers (triggers are dropped automatically when the table is dropped)."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "Understand the difference between `BEFORE` and `AFTER` triggers: `BEFORE` triggers can modify the `NEW` row or prevent the operation; `AFTER` triggers see the final state and are often used for auditing or cascading.",
          "`FOR EACH ROW` triggers execute for every row affected by the DML statement; `FOR EACH STATEMENT` triggers execute once per statement (less common for row-level logic).",
          "Know how to access `OLD` (original row values before DML) and `NEW` (new row values after DML or proposed new values for `BEFORE` triggers) pseudo-records.",
          "Triggers can be used for complex data validation, auditing, referential integrity (beyond simple foreign keys), and automatic data updates (e.g., `last_updated_at` timestamps).",
          "Be aware of potential downsides: complexity, debugging challenges, and performance overhead."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "Which type of trigger timing allows you to modify the data that is about to be written to the database?",
            "options": [
              "AFTER INSERT",
              "AFTER UPDATE",
              "BEFORE INSERT",
              "FOR EACH STATEMENT"
            ],
            "correctIndex": 2,
            "explanation": "BEFORE triggers (e.g., `BEFORE INSERT`, `BEFORE UPDATE`) fire before the DML operation completes. In `BEFORE` row-level triggers, you can access and modify the `NEW` pseudo-record, influencing the data that eventually gets saved."
          },
          {
            "question": "In a `BEFORE UPDATE FOR EACH ROW` trigger, what do `OLD.column_name` and `NEW.column_name` represent?",
            "options": [
              "OLD is the value after update, NEW is the value before update.",
              "OLD is the value before update, NEW is the value after update (or proposed new value).",
              "OLD and NEW both refer to the current value after the update.",
              "OLD refers to the previous row, NEW refers to the next row."
            ],
            "correctIndex": 1,
            "explanation": "`OLD.column_name` contains the value of the column before the `UPDATE` operation, while `NEW.column_name` contains the proposed new value for the column. In a `BEFORE` trigger, `NEW` can still be modified."
          },
          {
            "question": "Which of the following is a common use case for a database trigger?",
            "options": [
              "Performing a complex `SELECT` query",
              "Executing a `TRUNCATE` command",
              "Maintaining an audit log of data changes",
              "Defining a new table structure"
            ],
            "correctIndex": 2,
            "explanation": "Maintaining an audit log is a very common and powerful use case for triggers, as they can automatically record who changed what, when, and what the old/new values were, without requiring application-level code for every DML operation."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "What is a database trigger, and can you give an example of when you would use one in a real-world scenario?",
        "answer": "A database trigger is a special type of stored procedure that automatically executes when a specified event (INSERT, UPDATE, or DELETE) occurs on a table or view. A common real-world example is for auditing. If you have a `products` table and need to track every price change, you could create an `AFTER UPDATE` trigger. This trigger would insert a record into a separate `price_audit_log` table, containing the product ID, old price, new price, and timestamp, whenever the `price` column in the `products` table is updated.",
        "difficulty": "Mid",
        "category": "Conceptual"
      },
      {
        "question": "Discuss the advantages and disadvantages of using database triggers. When might you choose to avoid them?",
        "answer": "Advantages include: enforcing complex business rules and data integrity automatically, centralizing logic within the database (single source of truth), auditing changes, and automatically updating derived data. Disadvantages include: increased complexity and debugging difficulty (logic is hidden from application code), potential performance overhead due to implicit execution, cascading triggers leading to unexpected behavior, and making schema changes harder. I would avoid triggers if the logic can be handled by simpler constraints, if performance is extremely critical and the trigger logic is heavy, or if the logic is primarily application-specific and not fundamental to data integrity, preferring to keep business logic in the application layer for better visibility and testability.",
        "difficulty": "Senior",
        "category": "Scenario"
      }
    ]
  }
];
