// lib/code/data/problems/p021_p060.ts
import { Problem } from '../../types';

export const PENCIL_BATCH_2: Problem[] = [
  {
    id: 'p021',
    slug: 'employee-bonus',
    title: 'Employee Bonus',
    difficulty: 'pencil',
    track: 'sql',
    tags: ['LEFT JOIN', 'NULL', 'WHERE'],
    points: 10,
    status: 'ready',
    description: `### Employee Bonus

Write a SQL query to report the name and bonus amount of each employee with a bonus **less than 1000** (or who received no bonus at all).

Return the result table in **any order** with columns \`name\` and \`bonus\`.`,
    examples: [
      {
        input: `**Employee** table:
| empId | name | supervisor | salary |
| :--- | :--- | :--- | :--- |
| 1 | John | 3 | 1000 |
| 2 | Dan | 3 | 2000 |
| 3 | Brad | NULL | 4000 |
| 4 | Thomas | 3 | 4000 |

**Bonus** table:
| empId | bonus |
| :--- | :--- |
| 2 | 500 |
| 4 | 2000 |`,
        output: `| name | bonus |
| :--- | :--- |
| Brad | NULL |
| John | NULL |
| Dan | 500 |`,
      },
    ],
    constraints: ['empId is the primary key column.'],
    schemas: [
      {
        name: 'Employee',
        columns: [
          { name: 'empId', type: 'INTEGER', nullable: false, isPrimaryKey: true },
          { name: 'name', type: 'TEXT', nullable: false },
          { name: 'supervisor', type: 'INTEGER', nullable: true },
          { name: 'salary', type: 'INTEGER', nullable: false },
        ],
      },
      {
        name: 'Bonus',
        columns: [
          { name: 'empId', type: 'INTEGER', nullable: false, isPrimaryKey: true },
          { name: 'bonus', type: 'INTEGER', nullable: false },
        ],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS Employee;
      DROP TABLE IF EXISTS Bonus;
      CREATE TABLE Employee (empId INTEGER PRIMARY KEY, name TEXT, supervisor INTEGER, salary INTEGER);
      CREATE TABLE Bonus (empId INTEGER PRIMARY KEY, bonus INTEGER);
      INSERT INTO Employee VALUES (1, 'John', 3, 1000), (2, 'Dan', 3, 2000), (3, 'Brad', NULL, 4000), (4, 'Thomas', 3, 4000);
      INSERT INTO Bonus VALUES (2, 500), (4, 2000);
    `,
    starter_code: `-- Report employees with bonus < 1000 or no bonus
SELECT e.name, b.bonus
FROM Employee e
LEFT JOIN Bonus b ON e.empId = b.empId
WHERE b.bonus < 1000 OR b.bonus IS NULL;`,
    solution: `SELECT e.name, b.bonus FROM Employee e LEFT JOIN Bonus b ON e.empId = b.empId WHERE b.bonus < 1000 OR b.bonus IS NULL;`,
    hints: [
      {
        level: 1,
        title: 'LEFT JOIN',
        content: 'Use `LEFT JOIN` so employees without a bonus record are included with `NULL` bonus.',
        inkDropCost: 0,
      },
      {
        level: 2,
        title: 'NULL check in WHERE',
        content: 'Remember that `NULL < 1000` is unknown/false in SQL, so explicitly add `OR b.bonus IS NULL`.',
        inkDropCost: 5,
      },
      {
        level: 3,
        title: 'Full Query',
        content: `SELECT e.name, b.bonus FROM Employee e LEFT JOIN Bonus b ON e.empId = b.empId WHERE b.bonus < 1000 OR b.bonus IS NULL;`,
        inkDropCost: 20,
      },
    ],
    test_cases: [
      { id: 'tc_1', description: 'Returns 3 employees', assertion: 'row_count', expected: 3 },
      { id: 'tc_2', description: 'Includes Dan with 500', assertion: 'contains_row', expected: ['Dan', 500] },
    ],
    related: ['p001', 'p005', 'p009'],
    source: { platform: 'LeetCode', externalId: '#577', company: 'Amazon' },
  },
  {
    id: 'p022',
    slug: 'percentage-of-users-attended-a-contest',
    title: 'Percentage of Users Attended a Contest',
    difficulty: 'pencil',
    track: 'sql',
    tags: ['ROUND', 'COUNT', 'GROUP BY', 'ORDER BY'],
    points: 10,
    status: 'ready',
    description: `### Percentage of Users Attended a Contest

Write a SQL query to find the percentage of the users registered in each contest rounded to **two decimal places**.

Return the result table ordered by \`percentage\` in **descending order**. In case of a tie, order it by \`contest_id\` in **ascending order**.`,
    examples: [
      {
        input: `**Users** table (3 total users):
| user_id | user_name |
| 6 | Alice |
| 2 | Bob |
| 7 | Alex |

**Register** table:
| contest_id | user_id |
| 215 | 6 |
| 215 | 7 |
| 215 | 2 |
| 208 | 2 |
| 208 | 6 |`,
        output: `| contest_id | percentage |
| 215 | 100.00 |
| 208 | 66.67 |`,
      },
    ],
    constraints: ['(contest_id, user_id) is primary key for Register table.'],
    schemas: [
      {
        name: 'Users',
        columns: [
          { name: 'user_id', type: 'INTEGER', nullable: false, isPrimaryKey: true },
          { name: 'user_name', type: 'TEXT', nullable: false },
        ],
      },
      {
        name: 'Register',
        columns: [
          { name: 'contest_id', type: 'INTEGER', nullable: false },
          { name: 'user_id', type: 'INTEGER', nullable: false },
        ],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS Users;
      DROP TABLE IF EXISTS Register;
      CREATE TABLE Users (user_id INTEGER PRIMARY KEY, user_name TEXT);
      CREATE TABLE Register (contest_id INTEGER, user_id INTEGER, PRIMARY KEY (contest_id, user_id));
      INSERT INTO Users VALUES (6, 'Alice'), (2, 'Bob'), (7, 'Alex');
      INSERT INTO Register VALUES (215, 6), (215, 7), (215, 2), (208, 2), (208, 6), (209, 2);
    `,
    starter_code: `-- Find percentage of all users who attended each contest
SELECT 
  contest_id,
  ROUND(COUNT(user_id) * 100.0 / (SELECT COUNT(*) FROM Users), 2) AS percentage
FROM Register
GROUP BY contest_id
ORDER BY percentage DESC, contest_id ASC;`,
    solution: `SELECT contest_id, ROUND(COUNT(user_id) * 100.0 / (SELECT COUNT(*) FROM Users), 2) AS percentage FROM Register GROUP BY contest_id ORDER BY percentage DESC, contest_id ASC;`,
    hints: [
      { level: 1, title: 'Total Users Subquery', content: 'Divide by `(SELECT COUNT(*) FROM Users)`.', inkDropCost: 0 },
      { level: 2, title: 'Multi-column Sorting', content: 'Order by `percentage DESC, contest_id ASC`.', inkDropCost: 5 },
      { level: 3, title: 'Full Query', content: `SELECT contest_id, ROUND(COUNT(user_id) * 100.0 / (SELECT COUNT(*) FROM Users), 2) AS percentage FROM Register GROUP BY contest_id ORDER BY percentage DESC, contest_id ASC;`, inkDropCost: 20 },
    ],
    test_cases: [
      { id: 'tc_1', description: 'Returns 3 contests', assertion: 'row_count', expected: 3 },
      { id: 'tc_2', description: 'Contest 215 has 100%', assertion: 'contains_row', expected: [215, 100] },
    ],
    related: ['p018', 'p019', 'p035'],
    source: { platform: 'LeetCode', externalId: '#1633', company: 'Google' },
  },
  {
    id: 'p023',
    slug: 'monthly-transactions-i',
    title: 'Monthly Transactions I',
    difficulty: 'pencil',
    track: 'sql',
    tags: ['DATE', 'GROUP BY', 'CASE WHEN', 'SUM'],
    points: 10,
    status: 'ready',
    description: `### Monthly Transactions I

Write an SQL query to find for each month and country, the number of transactions and their total amount, the number of approved transactions and their total amount.

Return the result table with columns \`month\`, \`country\`, \`trans_count\`, \`approved_count\`, \`trans_total_amount\`, and \`approved_total_amount\`.`,
    examples: [
      {
        input: `**Transactions** table:
| id | country | state | amount | trans_date |
| 121 | US | approved | 1000 | 2018-12-18 |
| 122 | US | declined | 2000 | 2018-12-19 |
| 123 | US | approved | 2000 | 2019-01-01 |
| 124 | DE | approved | 2000 | 2019-01-07 |`,
        output: `| month | country | trans_count | approved_count | trans_total_amount | approved_total_amount |
| 2018-12 | US | 2 | 1 | 3000 | 1000 |
| 2019-01 | US | 1 | 1 | 2000 | 2000 |
| 2019-01 | DE | 1 | 1 | 2000 | 2000 |`,
      },
    ],
    constraints: ['id is primary key.', 'state is enum ("approved", "declined").'],
    schemas: [
      {
        name: 'Transactions',
        columns: [
          { name: 'id', type: 'INTEGER', nullable: false, isPrimaryKey: true },
          { name: 'country', type: 'TEXT', nullable: true },
          { name: 'state', type: 'TEXT', nullable: false },
          { name: 'amount', type: 'INTEGER', nullable: false },
          { name: 'trans_date', type: 'DATE', nullable: false },
        ],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS Transactions;
      CREATE TABLE Transactions (id INTEGER PRIMARY KEY, country TEXT, state TEXT, amount INTEGER, trans_date DATE);
      INSERT INTO Transactions VALUES 
        (121, 'US', 'approved', 1000, '2018-12-18'),
        (122, 'US', 'declined', 2000, '2018-12-19'),
        (123, 'US', 'approved', 2000, '2019-01-01'),
        (124, 'DE', 'approved', 2000, '2019-01-07');
    `,
    starter_code: `-- Find monthly stats per country
SELECT 
  strftime('%Y-%m', trans_date) AS month,
  country,
  COUNT(id) AS trans_count,
  SUM(CASE WHEN state = 'approved' THEN 1 ELSE 0 END) AS approved_count,
  SUM(amount) AS trans_total_amount,
  SUM(CASE WHEN state = 'approved' THEN amount ELSE 0 END) AS approved_total_amount
FROM Transactions
GROUP BY month, country;`,
    solution: `SELECT strftime('%Y-%m', trans_date) AS month, country, COUNT(id) AS trans_count, SUM(CASE WHEN state = 'approved' THEN 1 ELSE 0 END) AS approved_count, SUM(amount) AS trans_total_amount, SUM(CASE WHEN state = 'approved' THEN amount ELSE 0 END) AS approved_total_amount FROM Transactions GROUP BY month, country;`,
    hints: [
      { level: 1, title: 'SQLite Month Extraction', content: 'Use `strftime(\'%Y-%m\', trans_date)` to extract year and month.', inkDropCost: 0 },
      { level: 2, title: 'Conditional SUM', content: 'Use `SUM(CASE WHEN state = \'approved\' THEN amount ELSE 0 END)`.', inkDropCost: 5 },
      { level: 3, title: 'Full Query', content: `SELECT strftime('%Y-%m', trans_date) AS month, country, COUNT(*) AS trans_count, SUM(state = 'approved') AS approved_count, SUM(amount) AS trans_total_amount, SUM(CASE WHEN state = 'approved' THEN amount ELSE 0 END) AS approved_total_amount FROM Transactions GROUP BY month, country;`, inkDropCost: 20 },
    ],
    test_cases: [
      { id: 'tc_1', description: 'Returns 3 groups', assertion: 'row_count', expected: 3 },
      { id: 'tc_2', description: '2018-12 US has 3000 total', assertion: 'contains_row', expected: ['2018-12', 'US', 2, 1, 3000, 1000] },
    ],
    related: ['p055', 'p070', 'p108'],
    source: { platform: 'LeetCode', externalId: '#1193', company: 'Amazon' },
  },
  {
    id: 'p024',
    slug: 'weather-observation-station-1',
    title: 'Weather Observation Station 1',
    difficulty: 'pencil',
    track: 'sql',
    tags: ['SELECT', 'DISTINCT', 'basics'],
    points: 10,
    status: 'ready',
    description: `### Weather Observation Station 1

Query a list of \`CITY\` and \`STATE\` from the \`STATION\` table.`,
    examples: [
      {
        input: `**STATION** table:
| ID | CITY | STATE | LAT_N | LONG_W |
| 794 | Kissee Mills | MO | 139 | 73 |
| 824 | Loma Rica | CA | 59 | 134 |`,
        output: `| CITY | STATE |
| Kissee Mills | MO |
| Loma Rica | CA |`,
      },
    ],
    constraints: ['ID is primary key.'],
    schemas: [
      {
        name: 'STATION',
        columns: [
          { name: 'ID', type: 'INTEGER', nullable: false, isPrimaryKey: true },
          { name: 'CITY', type: 'TEXT', nullable: false },
          { name: 'STATE', type: 'TEXT', nullable: false },
          { name: 'LAT_N', type: 'REAL', nullable: false },
          { name: 'LONG_W', type: 'REAL', nullable: false },
        ],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS STATION;
      CREATE TABLE STATION (ID INTEGER PRIMARY KEY, CITY TEXT, STATE TEXT, LAT_N REAL, LONG_W REAL);
      INSERT INTO STATION VALUES (794, 'Kissee Mills', 'MO', 139.0, 73.0), (824, 'Loma Rica', 'CA', 59.0, 134.0), (900, 'Springfield', 'IL', 40.0, 89.0);
    `,
    starter_code: `SELECT CITY, STATE FROM STATION;`,
    solution: `SELECT CITY, STATE FROM STATION;`,
    hints: [
      { level: 1, title: 'Direct Selection', content: 'Simply select `CITY, STATE` from `STATION`.', inkDropCost: 0 },
      { level: 2, title: 'Syntax', content: '`SELECT CITY, STATE FROM STATION;`', inkDropCost: 5 },
      { level: 3, title: 'Full Query', content: `SELECT CITY, STATE FROM STATION;`, inkDropCost: 20 },
    ],
    test_cases: [
      { id: 'tc_1', description: 'Returns all 3 rows', assertion: 'row_count', expected: 3 },
      { id: 'tc_2', description: 'Contains Kissee Mills MO', assertion: 'contains_row', expected: ['Kissee Mills', 'MO'] },
    ],
    related: ['p025', 'p026', 'p027'],
    source: { platform: 'HackerRank', externalId: 'Weather Observation Station 1' },
  },
  {
    id: 'p025',
    slug: 'weather-observation-station-3',
    title: 'Weather Observation Station 3',
    difficulty: 'pencil',
    track: 'sql',
    tags: ['MOD', 'DISTINCT', 'WHERE'],
    points: 10,
    status: 'ready',
    description: `### Weather Observation Station 3

Query a list of \`CITY\` names from \`STATION\` for cities that have an **even \`ID\` number**. Exclude duplicates from your answer.`,
    examples: [
      {
        input: `**STATION** table:
| ID | CITY | STATE |
| 794 | Kissee Mills | MO |
| 824 | Loma Rica | CA |
| 825 | Dallas | TX |`,
        output: `| CITY |
| Kissee Mills |
| Loma Rica |`,
      },
    ],
    constraints: ['Exclude duplicates (use DISTINCT).'],
    schemas: [
      {
        name: 'STATION',
        columns: [
          { name: 'ID', type: 'INTEGER', nullable: false, isPrimaryKey: true },
          { name: 'CITY', type: 'TEXT', nullable: false },
          { name: 'STATE', type: 'TEXT', nullable: false },
        ],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS STATION;
      CREATE TABLE STATION (ID INTEGER PRIMARY KEY, CITY TEXT, STATE TEXT);
      INSERT INTO STATION VALUES (794, 'Kissee Mills', 'MO'), (824, 'Loma Rica', 'CA'), (825, 'Dallas', 'TX'), (826, 'Loma Rica', 'CA');
    `,
    starter_code: `-- Query unique city names with even ID
SELECT DISTINCT CITY
FROM STATION
WHERE ID % 2 = 0;`,
    solution: `SELECT DISTINCT CITY FROM STATION WHERE ID % 2 = 0;`,
    hints: [
      { level: 1, title: 'Even Check', content: 'Use `ID % 2 = 0` to filter even IDs.', inkDropCost: 0 },
      { level: 2, title: 'Distinct', content: 'Add `DISTINCT` keyword right after `SELECT`.', inkDropCost: 5 },
      { level: 3, title: 'Full Query', content: `SELECT DISTINCT CITY FROM STATION WHERE ID % 2 = 0;`, inkDropCost: 20 },
    ],
    test_cases: [
      { id: 'tc_1', description: 'Returns 2 unique cities', assertion: 'row_count', expected: 2 },
      { id: 'tc_2', description: 'Contains Loma Rica', assertion: 'contains_row', expected: ['Loma Rica'] },
    ],
    related: ['p014', 'p024', 'p026'],
    source: { platform: 'HackerRank', externalId: 'Weather Observation Station 3' },
  },
  {
    id: 'p026',
    slug: 'weather-observation-station-5',
    title: 'Weather Observation Station 5',
    difficulty: 'pencil',
    track: 'sql',
    tags: ['ORDER BY', 'LENGTH', 'LIMIT', 'UNION'],
    points: 10,
    status: 'ready',
    description: `### Weather Observation Station 5

Query the two cities in \`STATION\` with the **shortest** and **longest** \`CITY\` names, as well as their respective lengths (i.e.: number of characters in the name).

If there is more than one smallest or largest city, choose the one that comes first when ordered alphabetically.`,
    examples: [
      {
        input: `**STATION** table:
| CITY |
| DEF |
| ABC |
| PQRS |
| WXY |`,
        output: `| CITY | LENGTH(CITY) |
| ABC | 3 |
| PQRS | 4 |`,
      },
    ],
    constraints: ['Length is character count.'],
    schemas: [
      {
        name: 'STATION',
        columns: [{ name: 'CITY', type: 'TEXT', nullable: false }],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS STATION;
      CREATE TABLE STATION (CITY TEXT);
      INSERT INTO STATION VALUES ('DEF'), ('ABC'), ('PQRS'), ('WXY'), ('Austin');
    `,
    starter_code: `-- Shortest city name + Longest city name with lengths
SELECT CITY, LENGTH(CITY) FROM STATION ORDER BY LENGTH(CITY) ASC, CITY ASC LIMIT 1;
-- followed by
SELECT CITY, LENGTH(CITY) FROM STATION ORDER BY LENGTH(CITY) DESC, CITY ASC LIMIT 1;`,
    solution: `SELECT CITY, LENGTH(CITY) FROM STATION ORDER BY LENGTH(CITY) ASC, CITY ASC LIMIT 1;`,
    hints: [
      { level: 1, title: 'LENGTH function', content: 'Use `LENGTH(CITY)` to measure string length.', inkDropCost: 0 },
      { level: 2, title: 'Two sub-queries or UNION ALL', content: 'Combine the shortest query and longest query.', inkDropCost: 5 },
      { level: 3, title: 'Full Query', content: `SELECT * FROM (SELECT CITY, LENGTH(CITY) FROM STATION ORDER BY LENGTH(CITY) ASC, CITY ASC LIMIT 1) UNION ALL SELECT * FROM (SELECT CITY, LENGTH(CITY) FROM STATION ORDER BY LENGTH(CITY) DESC, CITY ASC LIMIT 1);`, inkDropCost: 20 },
    ],
    test_cases: [
      { id: 'tc_1', description: 'Returns 1 query check', assertion: 'no_error', expected: 'Success' },
    ],
    related: ['p024', 'p025', 'p028'],
    source: { platform: 'HackerRank', externalId: 'Weather Observation Station 5' },
  },
  {
    id: 'p028',
    slug: 'top-earners',
    title: 'Top Earners',
    difficulty: 'pencil',
    track: 'sql',
    tags: ['MAX', 'GROUP BY', 'COUNT'],
    points: 10,
    status: 'ready',
    description: `### Top Earners

We define an employee's total earnings to be their monthly \`salary * months\` worked.

Write a query to find the **maximum total earnings** for any employee in the \`Employee\` table as well as the **total number of employees** who have maximum total earnings.`,
    examples: [
      {
        input: `**Employee** table:
| employee_id | name | months | salary |
| 1 | Rose | 15 | 1968 |
| 2 | Angela | 1 | 3443 |
| 3 | Frank | 17 | 1608 |
| 4 | Patrick | 7 | 4992 |`,
        output: `| max_earnings | count |
| 34944 | 1 |`,
      },
    ],
    constraints: ['salary and months are positive integers.'],
    schemas: [
      {
        name: 'Employee',
        columns: [
          { name: 'employee_id', type: 'INTEGER', nullable: false, isPrimaryKey: true },
          { name: 'name', type: 'TEXT', nullable: false },
          { name: 'months', type: 'INTEGER', nullable: false },
          { name: 'salary', type: 'INTEGER', nullable: false },
        ],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS Employee;
      CREATE TABLE Employee (employee_id INTEGER PRIMARY KEY, name TEXT, months INTEGER, salary INTEGER);
      INSERT INTO Employee VALUES (1, 'Rose', 15, 1968), (2, 'Angela', 1, 3443), (3, 'Frank', 17, 1608), (4, 'Patrick', 7, 4992);
    `,
    starter_code: `-- Find maximum earnings and count of employees with that amount
SELECT 
  months * salary AS earnings,
  COUNT(*)
FROM Employee
GROUP BY earnings
ORDER BY earnings DESC
LIMIT 1;`,
    solution: `SELECT months * salary AS earnings, COUNT(*) FROM Employee GROUP BY earnings ORDER BY earnings DESC LIMIT 1;`,
    hints: [
      { level: 1, title: 'Group By Computed Column', content: 'Group by `months * salary`.', inkDropCost: 0 },
      { level: 2, title: 'Order DESC Limit 1', content: 'Order by `earnings DESC LIMIT 1`.', inkDropCost: 5 },
      { level: 3, title: 'Full Query', content: `SELECT (months * salary) AS earnings, COUNT(*) FROM Employee GROUP BY earnings ORDER BY earnings DESC LIMIT 1;`, inkDropCost: 20 },
    ],
    test_cases: [
      { id: 'tc_1', description: 'Returns 1 row', assertion: 'row_count', expected: 1 },
      { id: 'tc_2', description: 'Returns 34944 and count 1', assertion: 'contains_row', expected: [34944, 1] },
    ],
    related: ['p010', 'p013', 'p064'],
    source: { platform: 'HackerRank', externalId: 'Top Earners' },
  },
  {
    id: 'p035',
    slug: 'app-click-through-rate-ctr',
    title: 'App Click-Through Rate (CTR)',
    difficulty: 'pencil',
    track: 'sql',
    tags: ['CASE WHEN', 'SUM', 'ROUND', 'GROUP BY'],
    points: 10,
    status: 'ready',
    description: `### App Click-Through Rate (CTR)

Assume you have an events table on Facebook app analytics. Write a query to calculate the click-through rate (CTR) for the app in 2022 and round the results to 2 decimal places.

Definition: $\\text{CTR} = 100.0 \\times \\frac{\\text{Number of Clicks}}{\\text{Number of Impressions}}$

Return columns \`app_id\` and \`ctr\`.`,
    examples: [
      {
        input: `**events** table:
| app_id | event_type | timestamp |
| 123 | impression | 2022-07-18 11:36:12 |
| 123 | impression | 2022-07-18 11:37:12 |
| 123 | click | 2022-07-18 11:38:12 |
| 234 | impression | 2022-07-18 14:15:12 |
| 234 | click | 2022-07-18 14:16:12 |`,
        output: `| app_id | ctr |
| 123 | 50.00 |
| 234 | 100.00 |`,
      },
    ],
    constraints: ['Filter for year 2022.'],
    schemas: [
      {
        name: 'events',
        columns: [
          { name: 'app_id', type: 'INTEGER', nullable: false },
          { name: 'event_type', type: 'TEXT', nullable: false },
          { name: 'timestamp', type: 'DATETIME', nullable: false },
        ],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS events;
      CREATE TABLE events (app_id INTEGER, event_type TEXT, timestamp DATETIME);
      INSERT INTO events VALUES 
        (123, 'impression', '2022-07-18 11:36:12'),
        (123, 'impression', '2022-07-18 11:37:12'),
        (123, 'click', '2022-07-18 11:38:12'),
        (234, 'impression', '2022-07-18 14:15:12'),
        (234, 'click', '2022-07-18 14:16:12');
    `,
    starter_code: `-- Calculate Click-Through Rate per app in 2022
SELECT 
  app_id,
  ROUND(100.0 * SUM(CASE WHEN event_type = 'click' THEN 1 ELSE 0 END) / 
        SUM(CASE WHEN event_type = 'impression' THEN 1 ELSE 0 END), 2) AS ctr
FROM events
WHERE strftime('%Y', timestamp) = '2022'
GROUP BY app_id;`,
    solution: `SELECT app_id, ROUND(100.0 * SUM(CASE WHEN event_type = 'click' THEN 1 ELSE 0 END) / SUM(CASE WHEN event_type = 'impression' THEN 1 ELSE 0 END), 2) AS ctr FROM events WHERE strftime('%Y', timestamp) = '2022' GROUP BY app_id;`,
    hints: [
      { level: 1, title: 'Conditional Aggregation', content: 'Count clicks using `SUM(CASE WHEN event_type = \'click\' THEN 1 ELSE 0 END)`.', inkDropCost: 0 },
      { level: 2, title: 'Division by Impressions', content: 'Divide by `SUM(CASE WHEN event_type = \'impression\' THEN 1 ELSE 0 END)`.', inkDropCost: 5 },
      { level: 3, title: 'Full Query', content: `SELECT app_id, ROUND(100.0 * SUM(event_type = 'click') / SUM(event_type = 'impression'), 2) AS ctr FROM events WHERE strftime('%Y', timestamp) = '2022' GROUP BY app_id;`, inkDropCost: 20 },
    ],
    test_cases: [
      { id: 'tc_1', description: 'Returns 2 apps', assertion: 'row_count', expected: 2 },
      { id: 'tc_2', description: 'App 123 has 50.00 CTR', assertion: 'contains_row', expected: [123, 50] },
    ],
    related: ['p018', 'p022', 'p050'],
    source: { platform: 'DataLemur', externalId: 'App Click-Through Rate', company: 'Meta', adaptationNote: 'Adapted, not reproduced' },
  },
  {
    id: 'p047',
    slug: 'page-with-no-likes',
    title: 'Page With No Likes',
    difficulty: 'pencil',
    track: 'sql',
    tags: ['LEFT JOIN', 'NULL', 'ORDER BY'],
    points: 10,
    status: 'ready',
    description: `### Page With No Likes

Assume you have two tables on Facebook pages and page likes. Write a query to return the IDs of the Facebook pages that have **zero likes**.

The output should be sorted in **ascending order** by \`page_id\`.`,
    examples: [
      {
        input: `**pages** table:
| page_id | page_name |
| 20701 | Simplified SQL |
| 32728 | Tech Blog |
| 98765 | Cooking |

**page_likes** table:
| user_id | page_id |
| 111 | 20701 |
| 121 | 20701 |
| 255 | 98765 |`,
        output: `| page_id |
| 32728 |`,
      },
    ],
    constraints: ['page_id is unique in pages table.'],
    schemas: [
      {
        name: 'pages',
        columns: [
          { name: 'page_id', type: 'INTEGER', nullable: false, isPrimaryKey: true },
          { name: 'page_name', type: 'TEXT', nullable: false },
        ],
      },
      {
        name: 'page_likes',
        columns: [
          { name: 'user_id', type: 'INTEGER', nullable: false },
          { name: 'page_id', type: 'INTEGER', nullable: false },
        ],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS pages;
      DROP TABLE IF EXISTS page_likes;
      CREATE TABLE pages (page_id INTEGER PRIMARY KEY, page_name TEXT);
      CREATE TABLE page_likes (user_id INTEGER, page_id INTEGER);
      INSERT INTO pages VALUES (20701, 'Simplified SQL'), (32728, 'Tech Blog'), (98765, 'Cooking');
      INSERT INTO page_likes VALUES (111, 20701), (121, 20701), (255, 98765);
    `,
    starter_code: `-- Find page_ids with zero likes sorted by page_id ASC
SELECT p.page_id
FROM pages p
LEFT JOIN page_likes pl ON p.page_id = pl.page_id
WHERE pl.page_id IS NULL
ORDER BY p.page_id ASC;`,
    solution: `SELECT p.page_id FROM pages p LEFT JOIN page_likes pl ON p.page_id = pl.page_id WHERE pl.page_id IS NULL ORDER BY p.page_id ASC;`,
    hints: [
      { level: 1, title: 'Left Join', content: 'Left join `pages` with `page_likes` on `page_id`.', inkDropCost: 0 },
      { level: 2, title: 'Filter IS NULL', content: 'Where `pl.page_id IS NULL`.', inkDropCost: 5 },
      { level: 3, title: 'Full Query', content: `SELECT p.page_id FROM pages p LEFT JOIN page_likes pl ON p.page_id = pl.page_id WHERE pl.page_id IS NULL ORDER BY p.page_id ASC;`, inkDropCost: 20 },
    ],
    test_cases: [
      { id: 'tc_1', description: 'Returns 1 page', assertion: 'row_count', expected: 1 },
      { id: 'tc_2', description: 'Returns 32728', assertion: 'contains_row', expected: [32728] },
    ],
    related: ['p005', 'p011', 'p048'],
    source: { platform: 'DataLemur', externalId: 'Page With No Likes', company: 'Meta', adaptationNote: 'Adapted, not reproduced' },
  },
  {
    id: 'p051',
    slug: 'salaries-differences',
    title: 'Salaries Differences',
    difficulty: 'pencil',
    track: 'sql',
    tags: ['MAX', 'ABS', 'JOIN', 'Subquery'],
    points: 10,
    status: 'ready',
    description: `### Salaries Differences

Write a query that calculates the difference between the highest salaries found in the **marketing** and **engineering** departments. Output just the absolute difference in salary under column name \`salary_difference\`.`,
    examples: [
      {
        input: `**db_employee**:
| id | first_name | salary | department_id |
| 1 | John | 100000 | 1 |
| 2 | Sarah | 120000 | 2 |

**db_dept**:
| id | department |
| 1 | engineering |
| 2 | marketing |`,
        output: `| salary_difference |
| 20000 |`,
      },
    ],
    constraints: ['Calculate ABS(max_marketing - max_engineering).'],
    schemas: [
      {
        name: 'db_employee',
        columns: [
          { name: 'id', type: 'INTEGER', nullable: false, isPrimaryKey: true },
          { name: 'first_name', type: 'TEXT', nullable: false },
          { name: 'salary', type: 'INTEGER', nullable: false },
          { name: 'department_id', type: 'INTEGER', nullable: false },
        ],
      },
      {
        name: 'db_dept',
        columns: [
          { name: 'id', type: 'INTEGER', nullable: false, isPrimaryKey: true },
          { name: 'department', type: 'TEXT', nullable: false },
        ],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS db_employee;
      DROP TABLE IF EXISTS db_dept;
      CREATE TABLE db_employee (id INTEGER PRIMARY KEY, first_name TEXT, salary INTEGER, department_id INTEGER);
      CREATE TABLE db_dept (id INTEGER PRIMARY KEY, department TEXT);
      INSERT INTO db_employee VALUES (1, 'John', 100000, 1), (2, 'Sarah', 120000, 2), (3, 'Mike', 140000, 1);
      INSERT INTO db_dept VALUES (1, 'engineering'), (2, 'marketing');
    `,
    starter_code: `-- Find ABS difference between MAX salary in marketing vs engineering
SELECT ABS(
  (SELECT MAX(salary) FROM db_employee e JOIN db_dept d ON e.department_id = d.id WHERE d.department = 'marketing') -
  (SELECT MAX(salary) FROM db_employee e JOIN db_dept d ON e.department_id = d.id WHERE d.department = 'engineering')
) AS salary_difference;`,
    solution: `SELECT ABS((SELECT MAX(salary) FROM db_employee e JOIN db_dept d ON e.department_id = d.id WHERE d.department = 'marketing') - (SELECT MAX(salary) FROM db_employee e JOIN db_dept d ON e.department_id = d.id WHERE d.department = 'engineering')) AS salary_difference;`,
    hints: [
      { level: 1, title: 'Two Scalar Subqueries', content: 'Compute `MAX(salary)` for marketing and engineering independently.', inkDropCost: 0 },
      { level: 2, title: 'ABS Function', content: 'Subtract them and wrap in `ABS(...)`.', inkDropCost: 5 },
      { level: 3, title: 'Full Query', content: `SELECT ABS((SELECT MAX(salary) FROM db_employee e JOIN db_dept d ON e.department_id = d.id WHERE d.department = 'marketing') - (SELECT MAX(salary) FROM db_employee e JOIN db_dept d ON e.department_id = d.id WHERE d.department = 'engineering')) AS salary_difference;`, inkDropCost: 20 },
    ],
    test_cases: [
      { id: 'tc_1', description: 'Returns 1 scalar row', assertion: 'row_count', expected: 1 },
      { id: 'tc_2', description: 'Difference is 20000', assertion: 'contains_row', expected: [20000] },
    ],
    related: ['p002', 'p064', 'p077'],
    source: { platform: 'StrataScratch', externalId: 'Salaries Differences', company: 'Microsoft / Amazon', adaptationNote: 'Adapted, not reproduced' },
  },
];
