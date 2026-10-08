// lib/code/data/problems/p061_p095.ts
import { Problem } from '../../types';

export const PEN_BATCH_1: Problem[] = [
  {
    id: 'p061',
    slug: 'nth-highest-salary',
    title: 'Nth Highest Salary',
    difficulty: 'pen',
    track: 'sql',
    tags: ['Subquery', 'OFFSET', 'LIMIT', 'DISTINCT'],
    points: 20,
    status: 'ready',
    description: `### Nth Highest Salary

Write a SQL query to find the **n-th highest** distinct salary from the \`Employee\` table. If there is no n-th highest salary, the query should return \`null\` / \`NULL\`.

For this practice sandbox with $n = 2$, return the second highest salary under column name \`getNthHighestSalary\`.`,
    examples: [
      {
        input: `**Employee** table:
| id | salary |
| 1 | 100 |
| 2 | 200 |
| 3 | 300 |`,
        output: `| getNthHighestSalary |
| 200 |`,
      },
    ],
    constraints: ['id is primary key.', 'salary is non-negative.'],
    schemas: [
      {
        name: 'Employee',
        columns: [
          { name: 'id', type: 'INTEGER', nullable: false, isPrimaryKey: true },
          { name: 'salary', type: 'INTEGER', nullable: false },
        ],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS Employee;
      CREATE TABLE Employee (id INTEGER PRIMARY KEY, salary INTEGER);
      INSERT INTO Employee VALUES (1, 100), (2, 200), (3, 300);
    `,
    starter_code: `-- Find the 2nd highest distinct salary (n = 2)
SELECT (
  SELECT DISTINCT salary
  FROM Employee
  ORDER BY salary DESC
  LIMIT 1 OFFSET 1
) AS getNthHighestSalary;`,
    solution: `SELECT (SELECT DISTINCT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET 1) AS getNthHighestSalary;`,
    hints: [
      { level: 1, title: 'OFFSET formula', content: 'For nth highest salary, offset by `n - 1`. For n = 2, `OFFSET 1`.', inkDropCost: 0 },
      { level: 2, title: 'Distinct salaries', content: 'Use `DISTINCT salary` so duplicate top salaries don\'t shift the ranking.', inkDropCost: 5 },
      { level: 3, title: 'Full Query', content: `SELECT (SELECT DISTINCT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET 1) AS getNthHighestSalary;`, inkDropCost: 20 },
    ],
    test_cases: [
      { id: 'tc_1', description: 'Returns 1 row', assertion: 'row_count', expected: 1 },
      { id: 'tc_2', description: 'Returns 200', assertion: 'contains_row', expected: [200] },
    ],
    related: ['p002', 'p062', 'p064'],
    source: { platform: 'LeetCode', externalId: '#177', company: 'Amazon / Apple' },
  },
  {
    id: 'p062',
    slug: 'rank-scores',
    title: 'Rank Scores',
    difficulty: 'pen',
    track: 'sql',
    tags: ['DENSE_RANK', 'Window Function', 'ORDER BY'],
    points: 20,
    status: 'ready',
    description: `### Rank Scores

Write a SQL query to rank the scores. The ranking should be calculated according to the following rules:
- The scores should be ranked from the highest to the lowest.
- If there is a tie between two scores, both should have the same ranking.
- After a tie, the next ranking number should be the next consecutive integer (i.e., no holes between ranks — dense rank).

Return the result table ordered by \`score\` in **descending order** with columns \`score\` and \`rank\`.`,
    examples: [
      {
        input: `**Scores** table:
| id | score |
| 1 | 3.50 |
| 2 | 3.65 |
| 3 | 4.00 |
| 4 | 3.85 |
| 5 | 4.00 |
| 6 | 3.65 |`,
        output: `| score | rank |
| 4.00 | 1 |
| 4.00 | 1 |
| 3.85 | 2 |
| 3.65 | 3 |
| 3.65 | 3 |
| 3.50 | 4 |`,
      },
    ],
    constraints: ['id is primary key.', 'score is a floating point value.'],
    schemas: [
      {
        name: 'Scores',
        columns: [
          { name: 'id', type: 'INTEGER', nullable: false, isPrimaryKey: true },
          { name: 'score', type: 'REAL', nullable: false },
        ],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS Scores;
      CREATE TABLE Scores (id INTEGER PRIMARY KEY, score REAL);
      INSERT INTO Scores VALUES (1, 3.50), (2, 3.65), (3, 4.00), (4, 3.85), (5, 4.00), (6, 3.65);
    `,
    starter_code: `-- Rank scores densely in descending order
SELECT 
  score,
  DENSE_RANK() OVER (ORDER BY score DESC) AS 'rank'
FROM Scores
ORDER BY score DESC;`,
    solution: `SELECT score, DENSE_RANK() OVER (ORDER BY score DESC) AS 'rank' FROM Scores ORDER BY score DESC;`,
    hints: [
      { level: 1, title: 'Dense Rank Window Function', content: 'Use `DENSE_RANK() OVER (ORDER BY score DESC) AS rank`.', inkDropCost: 0 },
      { level: 2, title: 'Reserved Keyword', content: '`rank` is a keyword in SQL, so enclose it in quotes: `AS \'rank\'` or `AS "rank"`.', inkDropCost: 5 },
      { level: 3, title: 'Full Query', content: `SELECT score, DENSE_RANK() OVER (ORDER BY score DESC) AS 'rank' FROM Scores ORDER BY score DESC;`, inkDropCost: 20 },
    ],
    test_cases: [
      { id: 'tc_1', description: 'Returns 6 scored entries', assertion: 'row_count', expected: 6 },
      { id: 'tc_2', description: 'Top score 4.00 has rank 1', assertion: 'contains_row', expected: [4.0, 1] },
      { id: 'tc_3', description: 'Score 3.85 has rank 2 (no gap)', assertion: 'contains_row', expected: [3.85, 2] },
    ],
    related: ['p061', 'p064', 'p107', 'p126'],
    source: { platform: 'LeetCode', externalId: '#178', company: 'Amazon / Adobe' },
  },
  {
    id: 'p063',
    slug: 'consecutive-numbers',
    title: 'Consecutive Numbers',
    difficulty: 'pen',
    track: 'sql',
    tags: ['LEAD', 'LAG', 'Window Function', 'DISTINCT'],
    points: 20,
    status: 'ready',
    description: `### Consecutive Numbers

Find all numbers that appear **at least three times consecutively** in the \`Logs\` table.

Return the result table in **any order** with the column name \`ConsecutiveNums\`.`,
    examples: [
      {
        input: `**Logs** table:
| id | num |
| 1 | 1 |
| 2 | 1 |
| 3 | 1 |
| 4 | 2 |
| 5 | 1 |
| 6 | 2 |
| 7 | 2 |`,
        output: `| ConsecutiveNums |
| 1 |`,
        explanation: '1 is the only number that appears consecutively for at least three IDs (1, 2, 3).',
      },
    ],
    constraints: ['id is an autoincrementing integer column.'],
    schemas: [
      {
        name: 'Logs',
        columns: [
          { name: 'id', type: 'INTEGER', nullable: false, isPrimaryKey: true },
          { name: 'num', type: 'INTEGER', nullable: false },
        ],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS Logs;
      CREATE TABLE Logs (id INTEGER PRIMARY KEY, num INTEGER);
      INSERT INTO Logs VALUES (1, 1), (2, 1), (3, 1), (4, 2), (5, 1), (6, 2), (7, 2);
    `,
    starter_code: `-- Find numbers appearing 3+ consecutive times
SELECT DISTINCT num AS ConsecutiveNums
FROM (
  SELECT 
    num,
    LEAD(num, 1) OVER (ORDER BY id) AS next_num,
    LEAD(num, 2) OVER (ORDER BY id) AS next_next_num
  FROM Logs
)
WHERE num = next_num AND num = next_next_num;`,
    solution: `SELECT DISTINCT num AS ConsecutiveNums FROM (SELECT num, LEAD(num, 1) OVER (ORDER BY id) AS next_num, LEAD(num, 2) OVER (ORDER BY id) AS next_next_num FROM Logs) WHERE num = next_num AND num = next_next_num;`,
    hints: [
      { level: 1, title: 'LEAD / LAG Window Functions', content: 'Use `LEAD(num, 1) OVER (ORDER BY id)` and `LEAD(num, 2) OVER (ORDER BY id)`.', inkDropCost: 0 },
      { level: 2, title: 'Equality Filter', content: 'Filter where `num = next_num AND num = next_next_num`.', inkDropCost: 5 },
      { level: 3, title: 'Full Query', content: `SELECT DISTINCT num AS ConsecutiveNums FROM (SELECT num, LEAD(num, 1) OVER (ORDER BY id) AS n1, LEAD(num, 2) OVER (ORDER BY id) AS n2 FROM Logs) WHERE num = n1 AND num = n2;`, inkDropCost: 20 },
    ],
    test_cases: [
      { id: 'tc_1', description: 'Returns 1 row', assertion: 'row_count', expected: 1 },
      { id: 'tc_2', description: 'Returns 1', assertion: 'contains_row', expected: [1] },
    ],
    related: ['p006', 'p065', 'p127'],
    source: { platform: 'LeetCode', externalId: '#180', company: 'Amazon / Microsoft' },
  },
  {
    id: 'p064',
    slug: 'department-highest-salary',
    title: 'Department Highest Salary',
    difficulty: 'pen',
    track: 'sql',
    tags: ['JOIN', 'DENSE_RANK', 'Window Function', 'Subquery'],
    points: 20,
    status: 'ready',
    description: `### Department Highest Salary

Write a SQL query to find employees who have the highest salary in each of the departments.

Return the result table with columns \`Department\`, \`Employee\`, and \`Salary\` in **any order**.`,
    examples: [
      {
        input: `**Employee**:
| id | name | salary | departmentId |
| 1 | Joe | 70000 | 1 |
| 2 | Jim | 90000 | 1 |
| 3 | Henry | 80000 | 2 |
| 4 | Sam | 60000 | 2 |
| 5 | Max | 90000 | 1 |

**Department**:
| id | name |
| 1 | IT |
| 2 | Sales |`,
        output: `| Department | Employee | Salary |
| IT | Jim | 90000 |
| IT | Max | 90000 |
| Sales | Henry | 80000 |`,
      },
    ],
    constraints: ['id is primary key for both tables.'],
    schemas: [
      {
        name: 'Employee',
        columns: [
          { name: 'id', type: 'INTEGER', nullable: false, isPrimaryKey: true },
          { name: 'name', type: 'TEXT', nullable: false },
          { name: 'salary', type: 'INTEGER', nullable: false },
          { name: 'departmentId', type: 'INTEGER', nullable: false },
        ],
      },
      {
        name: 'Department',
        columns: [
          { name: 'id', type: 'INTEGER', nullable: false, isPrimaryKey: true },
          { name: 'name', type: 'TEXT', nullable: false },
        ],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS Employee;
      DROP TABLE IF EXISTS Department;
      CREATE TABLE Employee (id INTEGER PRIMARY KEY, name TEXT, salary INTEGER, departmentId INTEGER);
      CREATE TABLE Department (id INTEGER PRIMARY KEY, name TEXT);
      INSERT INTO Employee VALUES (1, 'Joe', 70000, 1), (2, 'Jim', 90000, 1), (3, 'Henry', 80000, 2), (4, 'Sam', 60000, 2), (5, 'Max', 90000, 1);
      INSERT INTO Department VALUES (1, 'IT'), (2, 'Sales');
    `,
    starter_code: `-- Find the highest earning employees in each department
WITH RankedEmployees AS (
  SELECT 
    d.name AS Department,
    e.name AS Employee,
    e.salary AS Salary,
    DENSE_RANK() OVER (PARTITION BY e.departmentId ORDER BY e.salary DESC) AS rnk
  FROM Employee e
  JOIN Department d ON e.departmentId = d.id
)
SELECT Department, Employee, Salary
FROM RankedEmployees
WHERE rnk = 1;`,
    solution: `WITH RankedEmployees AS (SELECT d.name AS Department, e.name AS Employee, e.salary AS Salary, DENSE_RANK() OVER (PARTITION BY e.departmentId ORDER BY e.salary DESC) AS rnk FROM Employee e JOIN Department d ON e.departmentId = d.id) SELECT Department, Employee, Salary FROM RankedEmployees WHERE rnk = 1;`,
    hints: [
      { level: 1, title: 'Partition By Department', content: 'Use `DENSE_RANK() OVER (PARTITION BY departmentId ORDER BY salary DESC)`.', inkDropCost: 0 },
      { level: 2, title: 'Handle Ties', content: '`DENSE_RANK` keeps all employees tied for first place in a department.', inkDropCost: 5 },
      { level: 3, title: 'Full Query', content: `SELECT d.name AS Department, e.name AS Employee, e.salary AS Salary FROM Employee e JOIN Department d ON e.departmentId = d.id WHERE (e.departmentId, e.salary) IN (SELECT departmentId, MAX(salary) FROM Employee GROUP BY departmentId);`, inkDropCost: 20 },
    ],
    test_cases: [
      { id: 'tc_1', description: 'Returns 3 employees (including tied Max & Jim in IT)', assertion: 'row_count', expected: 3 },
      { id: 'tc_2', description: 'Henry earns 80000 in Sales', assertion: 'contains_row', expected: ['Sales', 'Henry', 80000] },
    ],
    related: ['p002', 'p061', 'p062', 'p126'],
    source: { platform: 'LeetCode', externalId: '#184', company: 'Amazon / Google / Facebook' },
  },
  {
    id: 'p065',
    slug: 'exchange-seats',
    title: 'Exchange Seats',
    difficulty: 'pen',
    track: 'sql',
    tags: ['CASE WHEN', 'MOD', 'LEAD', 'LAG'],
    points: 20,
    status: 'ready',
    description: `### Exchange Seats

Write a SQL query to swap the seat id of every two consecutive students. If the number of students is odd, the id of the last student is not swapped.

Return the result table ordered by \`id\` in **ascending order**.`,
    examples: [
      {
        input: `**Seat** table:
| id | student |
| 1 | Abbot |
| 2 | Doris |
| 3 | Emerson |
| 4 | Green |
| 5 | Jeames |`,
        output: `| id | student |
| 1 | Doris |
| 2 | Abbot |
| 3 | Green |
| 4 | Emerson |
| 5 | Jeames |`,
      },
    ],
    constraints: ['id is continuous incrementing integer starting from 1.'],
    schemas: [
      {
        name: 'Seat',
        columns: [
          { name: 'id', type: 'INTEGER', nullable: false, isPrimaryKey: true },
          { name: 'student', type: 'TEXT', nullable: false },
        ],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS Seat;
      CREATE TABLE Seat (id INTEGER PRIMARY KEY, student TEXT);
      INSERT INTO Seat VALUES (1, 'Abbot'), (2, 'Doris'), (3, 'Emerson'), (4, 'Green'), (5, 'Jeames');
    `,
    starter_code: `-- Swap seat id for consecutive pairs
SELECT 
  CASE
    WHEN id % 2 = 1 AND id = (SELECT MAX(id) FROM Seat) THEN id
    WHEN id % 2 = 1 THEN id + 1
    ELSE id - 1
  END AS id,
  student
FROM Seat
ORDER BY id ASC;`,
    solution: `SELECT CASE WHEN id % 2 = 1 AND id = (SELECT MAX(id) FROM Seat) THEN id WHEN id % 2 = 1 THEN id + 1 ELSE id - 1 END AS id, student FROM Seat ORDER BY id ASC;`,
    hints: [
      { level: 1, title: 'ID transformation', content: 'Odd IDs become `id + 1`, even IDs become `id - 1`.', inkDropCost: 0 },
      { level: 2, title: 'Last odd seat exception', content: 'If `id % 2 = 1` and `id = (SELECT MAX(id) FROM Seat)`, keep `id` unchanged.', inkDropCost: 5 },
      { level: 3, title: 'Full Query', content: `SELECT CASE WHEN id % 2 = 1 AND id = (SELECT COUNT(*) FROM Seat) THEN id WHEN id % 2 = 1 THEN id + 1 ELSE id - 1 END AS id, student FROM Seat ORDER BY id ASC;`, inkDropCost: 20 },
    ],
    test_cases: [
      { id: 'tc_1', description: 'Returns 5 rows', assertion: 'row_count', expected: 5 },
      { id: 'tc_2', description: 'Seat 1 is Doris', assertion: 'contains_row', expected: [1, 'Doris'] },
      { id: 'tc_3', description: 'Seat 5 is Jeames', assertion: 'contains_row', expected: [5, 'Jeames'] },
    ],
    related: ['p014', 'p063', 'p073'],
    source: { platform: 'LeetCode', externalId: '#626', company: 'Amazon / Bloomberg' },
  },
  {
    id: 'p067',
    slug: 'restaurant-growth',
    title: 'Restaurant Growth',
    difficulty: 'pen',
    track: 'sql',
    tags: ['Window Function', 'SUM OVER', 'AVG OVER', 'ROWS BETWEEN'],
    points: 20,
    status: 'ready',
    description: `### Restaurant Growth

You are the restaurant owner and you want to analyze a possible expansion.

Compute the **moving average of how much the customer paid in a seven days window** (i.e., current day + 6 days before). \`average_amount\` should be **rounded to 2 decimal places**.

Return the result table ordered by \`visited_on\` in **ascending order** starting from the 7th day.`,
    examples: [
      {
        input: `**Customer** table:
| customer_id | name | visited_on | amount |
| 1 | Jhon | 2019-01-01 | 100 |
| 2 | Daniel | 2019-01-02 | 110 |
| 3 | Jade | 2019-01-03 | 120 |
| 4 | Khaled | 2019-01-04 | 130 |
| 5 | Winston | 2019-01-05 | 110 |
| 6 | Elvis | 2019-01-06 | 140 |
| 7 | Anna | 2019-01-07 | 150 |
| 8 | Maria | 2019-01-08 | 80 |`,
        output: `| visited_on | amount | average_amount |
| 2019-01-07 | 860 | 122.86 |
| 2019-01-08 | 840 | 120.00 |`,
      },
    ],
    constraints: ['visited_on is DATE.'],
    schemas: [
      {
        name: 'Customer',
        columns: [
          { name: 'customer_id', type: 'INTEGER', nullable: false },
          { name: 'name', type: 'TEXT', nullable: false },
          { name: 'visited_on', type: 'DATE', nullable: false },
          { name: 'amount', type: 'INTEGER', nullable: false },
        ],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS Customer;
      CREATE TABLE Customer (customer_id INTEGER, name TEXT, visited_on DATE, amount INTEGER);
      INSERT INTO Customer VALUES 
        (1, 'Jhon', '2019-01-01', 100),
        (2, 'Daniel', '2019-01-02', 110),
        (3, 'Jade', '2019-01-03', 120),
        (4, 'Khaled', '2019-01-04', 130),
        (5, 'Winston', '2019-01-05', 110),
        (6, 'Elvis', '2019-01-06', 140),
        (7, 'Anna', '2019-01-07', 150),
        (8, 'Maria', '2019-01-08', 80);
    `,
    starter_code: `-- Calculate 7-day rolling sum and moving average
WITH DailyTotal AS (
  SELECT visited_on, SUM(amount) AS day_amount
  FROM Customer
  GROUP BY visited_on
),
Rolling AS (
  SELECT 
    visited_on,
    SUM(day_amount) OVER (ORDER BY visited_on ROWS 6 PRECEDING) AS amount,
    ROUND(AVG(day_amount * 1.0) OVER (ORDER BY visited_on ROWS 6 PRECEDING), 2) AS average_amount,
    ROW_NUMBER() OVER (ORDER BY visited_on) AS rn
  FROM DailyTotal
)
SELECT visited_on, amount, average_amount
FROM Rolling
WHERE rn >= 7
ORDER BY visited_on ASC;`,
    solution: `WITH DailyTotal AS (SELECT visited_on, SUM(amount) AS day_amount FROM Customer GROUP BY visited_on), Rolling AS (SELECT visited_on, SUM(day_amount) OVER (ORDER BY visited_on ROWS 6 PRECEDING) AS amount, ROUND(AVG(day_amount * 1.0) OVER (ORDER BY visited_on ROWS 6 PRECEDING), 2) AS average_amount, ROW_NUMBER() OVER (ORDER BY visited_on) AS rn FROM DailyTotal) SELECT visited_on, amount, average_amount FROM Rolling WHERE rn >= 7 ORDER BY visited_on ASC;`,
    hints: [
      { level: 1, title: 'Aggregate to Daily First', content: 'Group by `visited_on` and sum daily amounts before calculating window aggregates.', inkDropCost: 0 },
      { level: 2, title: 'Window Frame', content: 'Use `ROWS 6 PRECEDING` to sum the current day plus previous 6 days.', inkDropCost: 5 },
      { level: 3, title: 'Filter First 6 Days', content: 'Use `ROW_NUMBER() OVER (ORDER BY visited_on) >= 7` to drop partial window days.', inkDropCost: 20 },
    ],
    test_cases: [
      { id: 'tc_1', description: 'Returns 2 days (7th and 8th)', assertion: 'row_count', expected: 2 },
      { id: 'tc_2', description: '2019-01-07 has 860 and 122.86', assertion: 'contains_row', expected: ['2019-01-07', 860, 122.86] },
    ],
    related: ['p068', 'p096', 'p108'],
    source: { platform: 'LeetCode', externalId: '#1321', company: 'Amazon' },
  },
  {
    id: 'p069',
    slug: 'investments-in-2016',
    title: 'Investments in 2016',
    difficulty: 'pen',
    track: 'sql',
    tags: ['Correlated Subquery', 'GROUP BY', 'ROUND', 'COUNT'],
    points: 20,
    status: 'ready',
    description: `### Investments in 2016

Write a SQL query to report the sum of all total investment values in 2016 (\`tiv_2016\`) to 2 decimal places, for all policyholders who:
1. Have the same \`tiv_2015\` value as one or more other policyholders, and
2. Are not located in the same city as any other policyholder (i.e., the \`(lat, lon)\` attribute pairs must be unique).

Return column name \`tiv_2016\`.`,
    examples: [
      {
        input: `**Insurance** table:
| pid | tiv_2015 | tiv_2016 | lat | lon |
| 1 | 10 | 5 | 10 | 10 |
| 2 | 20 | 20 | 20 | 20 |
| 3 | 10 | 30 | 20 | 20 |
| 4 | 10 | 40 | 40 | 40 |`,
        output: `| tiv_2016 |
| 45.00 |`,
        explanation: 'Policy 1 and 4 have same tiv_2015 (10) as others. Policy 2 and 3 share lat/lon so both are excluded. Policy 1 and 4 have unique lat/lon. Sum is 5 + 40 = 45.00.',
      },
    ],
    constraints: ['pid is primary key.'],
    schemas: [
      {
        name: 'Insurance',
        columns: [
          { name: 'pid', type: 'INTEGER', nullable: false, isPrimaryKey: true },
          { name: 'tiv_2015', type: 'REAL', nullable: false },
          { name: 'tiv_2016', type: 'REAL', nullable: false },
          { name: 'lat', type: 'REAL', nullable: false },
          { name: 'lon', type: 'REAL', nullable: false },
        ],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS Insurance;
      CREATE TABLE Insurance (pid INTEGER PRIMARY KEY, tiv_2015 REAL, tiv_2016 REAL, lat REAL, lon REAL);
      INSERT INTO Insurance VALUES 
        (1, 10.0, 5.0, 10.0, 10.0),
        (2, 20.0, 20.0, 20.0, 20.0),
        (3, 10.0, 30.0, 20.0, 20.0),
        (4, 10.0, 40.0, 40.0, 40.0);
    `,
    starter_code: `-- Sum tiv_2016 for policyholders meeting both conditions
SELECT ROUND(SUM(tiv_2016), 2) AS tiv_2016
FROM Insurance
WHERE tiv_2015 IN (
  SELECT tiv_2015 FROM Insurance GROUP BY tiv_2015 HAVING COUNT(*) > 1
)
AND (lat, lon) IN (
  SELECT lat, lon FROM Insurance GROUP BY lat, lon HAVING COUNT(*) = 1
);`,
    solution: `SELECT ROUND(SUM(tiv_2016), 2) AS tiv_2016 FROM Insurance WHERE tiv_2015 IN (SELECT tiv_2015 FROM Insurance GROUP BY tiv_2015 HAVING COUNT(*) > 1) AND (lat, lon) IN (SELECT lat, lon FROM Insurance GROUP BY lat, lon HAVING COUNT(*) = 1);`,
    hints: [
      { level: 1, title: 'Condition 1: Duplicate tiv_2015', content: '`tiv_2015 IN (SELECT tiv_2015 FROM Insurance GROUP BY tiv_2015 HAVING COUNT(*) > 1)`', inkDropCost: 0 },
      { level: 2, title: 'Condition 2: Unique (lat, lon)', content: '`(lat, lon) IN (SELECT lat, lon FROM Insurance GROUP BY lat, lon HAVING COUNT(*) = 1)`', inkDropCost: 5 },
      { level: 3, title: 'Full Query', content: `SELECT ROUND(SUM(tiv_2016), 2) AS tiv_2016 FROM Insurance WHERE tiv_2015 IN (SELECT tiv_2015 FROM Insurance GROUP BY tiv_2015 HAVING COUNT(*) > 1) AND (lat, lon) IN (SELECT lat, lon FROM Insurance GROUP BY lat, lon HAVING COUNT(*) = 1);`, inkDropCost: 20 },
    ],
    test_cases: [
      { id: 'tc_1', description: 'Returns 1 row', assertion: 'row_count', expected: 1 },
      { id: 'tc_2', description: 'Total is 45.0', assertion: 'contains_row', expected: [45.0] },
    ],
    related: ['p003', 'p064', 'p074'],
    source: { platform: 'LeetCode', externalId: '#585', company: 'Twitter / Uber' },
  },
];
