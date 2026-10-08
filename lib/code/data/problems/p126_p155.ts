// lib/code/data/problems/p126_p155.ts
import { Problem } from '../../types';

export const MARKER_BATCH: Problem[] = [
  {
    id: 'p126',
    slug: 'department-top-three-salaries',
    title: 'Department Top Three Salaries',
    difficulty: 'marker',
    track: 'sql',
    tags: ['DENSE_RANK', 'CTE', 'Window Function', 'JOIN'],
    points: 30,
    status: 'ready',
    description: `### Department Top Three Salaries

A company's executives are interested in seeing who earns the most money in each of the company's departments. A **high earner** in a department is an employee who has a salary in the **top three unique salaries** for that department.

Write a SQL query to find the employees who are high earners in each of the departments.

Return the result table with columns \`Department\`, \`Employee\`, and \`Salary\` in **any order**.`,
    examples: [
      {
        input: `**Employee**:
| id | name | salary | departmentId |
| 1 | Joe | 85000 | 1 |
| 2 | Henry | 80000 | 2 |
| 3 | Sam | 60000 | 2 |
| 4 | Max | 90000 | 1 |
| 5 | Janet | 69000 | 1 |
| 6 | Randy | 85000 | 1 |
| 7 | Will | 70000 | 1 |

**Department**:
| id | name |
| 1 | IT |
| 2 | Sales |`,
        output: `| Department | Employee | Salary |
| IT | Max | 90000 |
| IT | Joe | 85000 |
| IT | Randy | 85000 |
| IT | Will | 70000 |
| Sales | Henry | 80000 |
| Sales | Sam | 60000 |`,
      },
    ],
    constraints: ['departmentId is a foreign key to Department.id.'],
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
      INSERT INTO Employee VALUES 
        (1, 'Joe', 85000, 1),
        (2, 'Henry', 80000, 2),
        (3, 'Sam', 60000, 2),
        (4, 'Max', 90000, 1),
        (5, 'Janet', 69000, 1),
        (6, 'Randy', 85000, 1),
        (7, 'Will', 70000, 1);
      INSERT INTO Department VALUES (1, 'IT'), (2, 'Sales');
    `,
    starter_code: `-- Find employees earning in the top 3 unique salaries per department
WITH RankedSalaries AS (
  SELECT 
    d.name AS Department,
    e.name AS Employee,
    e.salary AS Salary,
    DENSE_RANK() OVER (PARTITION BY e.departmentId ORDER BY e.salary DESC) AS rnk
  FROM Employee e
  JOIN Department d ON e.departmentId = d.id
)
SELECT Department, Employee, Salary
FROM RankedSalaries
WHERE rnk <= 3;`,
    solution: `WITH RankedSalaries AS (SELECT d.name AS Department, e.name AS Employee, e.salary AS Salary, DENSE_RANK() OVER (PARTITION BY e.departmentId ORDER BY e.salary DESC) AS rnk FROM Employee e JOIN Department d ON e.departmentId = d.id) SELECT Department, Employee, Salary FROM RankedSalaries WHERE rnk <= 3;`,
    hints: [
      { level: 1, title: 'Dense Rank with Partition', content: 'Use `DENSE_RANK() OVER (PARTITION BY departmentId ORDER BY salary DESC) <= 3`.', inkDropCost: 0 },
      { level: 2, title: 'Why DENSE_RANK?', content: '`DENSE_RANK` ranks unique salary values without skipping ranks for ties (90k = 1, 85k = 2, 70k = 3).', inkDropCost: 5 },
      { level: 3, title: 'Full Query', content: `WITH RankedSalaries AS (SELECT d.name AS Department, e.name AS Employee, e.salary AS Salary, DENSE_RANK() OVER (PARTITION BY e.departmentId ORDER BY e.salary DESC) AS rnk FROM Employee e JOIN Department d ON e.departmentId = d.id) SELECT Department, Employee, Salary FROM RankedSalaries WHERE rnk <= 3;`, inkDropCost: 20 },
    ],
    test_cases: [
      { id: 'tc_1', description: 'Returns 6 employees across departments', assertion: 'row_count', expected: 6 },
      { id: 'tc_2', description: 'Includes tied Joe and Randy in IT', assertion: 'contains_row', expected: ['IT', 'Joe', 85000] },
      { id: 'tc_3', description: 'Includes 3rd rank Will in IT', assertion: 'contains_row', expected: ['IT', 'Will', 70000] },
    ],
    related: ['p062', 'p064', 'p128'],
    source: { platform: 'LeetCode', externalId: '#185', company: 'Amazon / Google / Facebook / Microsoft' },
  },
  {
    id: 'p129',
    slug: 'trips-and-users',
    title: 'Trips and Users',
    difficulty: 'marker',
    track: 'sql',
    tags: ['Multi-JOIN', 'CASE WHEN', 'ROUND', 'Cancellation Rate'],
    points: 30,
    status: 'ready',
    description: `### Trips and Users

The **cancellation rate** is computed by dividing the number of canceled (by client or driver) requests with unbanned users by the total number of requests with unbanned users on that day.

Write a SQL query to find the **cancellation rate** of requests with unbanned users (both client and driver must not be banned) each day between \`"2013-10-01"\` and \`"2013-10-03"\`. Round \`Cancellation Rate\` to **two decimal places**.

Return columns \`Day\` and \`Cancellation Rate\`.`,
    examples: [
      {
        input: `**Trips**:
| id | client_id | driver_id | city_id | status | request_at |
| 1 | 1 | 10 | 1 | completed | 2013-10-01 |
| 2 | 2 | 11 | 1 | cancelled_by_driver | 2013-10-01 |
| 3 | 3 | 12 | 6 | completed | 2013-10-01 |
| 4 | 4 | 13 | 6 | cancelled_by_client | 2013-10-01 |

**Users** (Client 2 is Banned, others unbanned):
| users_id | banned | role |
| 1 | No | client |
| 2 | Yes | client |
| 3 | No | client |
| 4 | No | client |
| 10 | No | driver |
| 11 | No | driver |
| 12 | No | driver |
| 13 | No | driver |`,
        output: `| Day | Cancellation Rate |
| 2013-10-01 | 0.33 |`,
        explanation: 'On 2013-10-01: 4 requests total, but trip 2 is with banned user 2. Among the 3 unbanned requests (1, 3, 4), 1 was cancelled (trip 4). Rate: 1 / 3 = 0.33.',
      },
    ],
    constraints: ['request_at is between 2013-10-01 and 2013-10-03.'],
    schemas: [
      {
        name: 'Trips',
        columns: [
          { name: 'id', type: 'INTEGER', nullable: false, isPrimaryKey: true },
          { name: 'client_id', type: 'INTEGER', nullable: false },
          { name: 'driver_id', type: 'INTEGER', nullable: false },
          { name: 'city_id', type: 'INTEGER', nullable: false },
          { name: 'status', type: 'TEXT', nullable: false },
          { name: 'request_at', type: 'DATE', nullable: false },
        ],
      },
      {
        name: 'Users',
        columns: [
          { name: 'users_id', type: 'INTEGER', nullable: false, isPrimaryKey: true },
          { name: 'banned', type: 'TEXT', nullable: false },
          { name: 'role', type: 'TEXT', nullable: false },
        ],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS Trips;
      DROP TABLE IF EXISTS Users;
      CREATE TABLE Trips (id INTEGER PRIMARY KEY, client_id INTEGER, driver_id INTEGER, city_id INTEGER, status TEXT, request_at DATE);
      CREATE TABLE Users (users_id INTEGER PRIMARY KEY, banned TEXT, role TEXT);
      INSERT INTO Trips VALUES 
        (1, 1, 10, 1, 'completed', '2013-10-01'),
        (2, 2, 11, 1, 'cancelled_by_driver', '2013-10-01'),
        (3, 3, 12, 6, 'completed', '2013-10-01'),
        (4, 4, 13, 6, 'cancelled_by_client', '2013-10-01');
      INSERT INTO Users VALUES 
        (1, 'No', 'client'), (2, 'Yes', 'client'), (3, 'No', 'client'), (4, 'No', 'client'),
        (10, 'No', 'driver'), (11, 'No', 'driver'), (12, 'No', 'driver'), (13, 'No', 'driver');
    `,
    starter_code: `-- Calculate cancellation rate for unbanned users
SELECT 
  t.request_at AS Day,
  ROUND(SUM(CASE WHEN t.status != 'completed' THEN 1.0 ELSE 0.0 END) / COUNT(*), 2) AS 'Cancellation Rate'
FROM Trips t
JOIN Users c ON t.client_id = c.users_id AND c.banned = 'No'
JOIN Users d ON t.driver_id = d.users_id AND d.banned = 'No'
WHERE t.request_at BETWEEN '2013-10-01' AND '2013-10-03'
GROUP BY t.request_at;`,
    solution: `SELECT t.request_at AS Day, ROUND(SUM(CASE WHEN t.status != 'completed' THEN 1.0 ELSE 0.0 END) / COUNT(*), 2) AS 'Cancellation Rate' FROM Trips t JOIN Users c ON t.client_id = c.users_id AND c.banned = 'No' JOIN Users d ON t.driver_id = d.users_id AND d.banned = 'No' WHERE t.request_at BETWEEN '2013-10-01' AND '2013-10-03' GROUP BY t.request_at;`,
    hints: [
      { level: 1, title: 'Two joins to Users table', content: 'Join `Users` once for client (`t.client_id = c.users_id`) and once for driver (`t.driver_id = d.users_id`), checking `banned = \'No\'` on both.', inkDropCost: 0 },
      { level: 2, title: 'Cancellation logic', content: 'Count cancellations using `SUM(CASE WHEN status != \'completed\' THEN 1.0 ELSE 0.0 END)` divided by `COUNT(*)`.', inkDropCost: 5 },
      { level: 3, title: 'Full Query', content: `SELECT t.request_at AS Day, ROUND(SUM(t.status != 'completed') * 1.0 / COUNT(*), 2) AS "Cancellation Rate" FROM Trips t JOIN Users c ON t.client_id = c.users_id AND c.banned = 'No' JOIN Users d ON t.driver_id = d.users_id AND d.banned = 'No' WHERE t.request_at BETWEEN '2013-10-01' AND '2013-10-03' GROUP BY t.request_at;`, inkDropCost: 20 },
    ],
    test_cases: [
      { id: 'tc_1', description: 'Returns 1 day', assertion: 'row_count', expected: 1 },
      { id: 'tc_2', description: '2013-10-01 has 0.33 rate', assertion: 'contains_row', expected: ['2013-10-01', 0.33] },
    ],
    related: ['p019', 'p022', 'p148'],
    source: { platform: 'LeetCode', externalId: '#262', company: 'Uber / Grab' },
  },
  {
    id: 'p148',
    slug: 'the-number-of-employees-which-report-to-each-employee',
    title: 'The Number of Employees Which Report to Each Employee',
    difficulty: 'marker',
    track: 'sql',
    tags: ['SELF JOIN', 'COUNT', 'AVG', 'ROUND', 'GROUP BY'],
    points: 30,
    status: 'ready',
    description: `### The Number of Employees Which Report to Each Employee

For this problem, we will consider a **manager** an employee who has at least 1 other employee reporting to them.

Write a SQL query to report the \`employee_id\` and \`name\` of all managers, the number of employees who report directly to them (\`reports_count\`), and the average age of the reports rounded to the nearest integer (\`average_age\`).

Return the result table ordered by \`employee_id\` in **ascending order**.`,
    examples: [
      {
        input: `**Employees** table:
| employee_id | name | reports_to | age |
| 9 | Hercy | NULL | 43 |
| 6 | Alice | 9 | 41 |
| 4 | Bob | 9 | 36 |
| 2 | Winston | NULL | 37 |`,
        output: `| employee_id | name | reports_count | average_age |
| 9 | Hercy | 2 | 39 |`,
        explanation: 'Hercy (id 9) has 2 direct reports (Alice age 41, Bob age 36). Average age is (41 + 36) / 2 = 38.5 -> rounded to 39.',
      },
    ],
    constraints: ['employee_id is the primary key.'],
    schemas: [
      {
        name: 'Employees',
        columns: [
          { name: 'employee_id', type: 'INTEGER', nullable: false, isPrimaryKey: true },
          { name: 'name', type: 'TEXT', nullable: false },
          { name: 'reports_to', type: 'INTEGER', nullable: true },
          { name: 'age', type: 'INTEGER', nullable: false },
        ],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS Employees;
      CREATE TABLE Employees (employee_id INTEGER PRIMARY KEY, name TEXT, reports_to INTEGER, age INTEGER);
      INSERT INTO Employees VALUES 
        (9, 'Hercy', NULL, 43),
        (6, 'Alice', 9, 41),
        (4, 'Bob', 9, 36),
        (2, 'Winston', NULL, 37);
    `,
    starter_code: `-- Report manager id, name, reports_count, and average_age
SELECT 
  m.employee_id,
  m.name,
  COUNT(e.employee_id) AS reports_count,
  ROUND(AVG(e.age * 1.0)) AS average_age
FROM Employees m
JOIN Employees e ON m.employee_id = e.reports_to
GROUP BY m.employee_id, m.name
ORDER BY m.employee_id ASC;`,
    solution: `SELECT m.employee_id, m.name, COUNT(e.employee_id) AS reports_count, ROUND(AVG(e.age * 1.0)) AS average_age FROM Employees m JOIN Employees e ON m.employee_id = e.reports_to GROUP BY m.employee_id, m.name ORDER BY m.employee_id ASC;`,
    hints: [
      { level: 1, title: 'Self Join on reports_to', content: 'Join `Employees m` (manager) to `Employees e` (report) on `m.employee_id = e.reports_to`.', inkDropCost: 0 },
      { level: 2, title: 'Aggregate Direct Reports', content: 'Group by `m.employee_id, m.name`, then compute `COUNT(e.employee_id)` and `ROUND(AVG(e.age))`.', inkDropCost: 5 },
      { level: 3, title: 'Full Query', content: `SELECT m.employee_id, m.name, COUNT(e.employee_id) AS reports_count, ROUND(AVG(e.age * 1.0)) AS average_age FROM Employees m JOIN Employees e ON m.employee_id = e.reports_to GROUP BY m.employee_id, m.name ORDER BY m.employee_id ASC;`, inkDropCost: 20 },
    ],
    test_cases: [
      { id: 'tc_1', description: 'Returns 1 manager', assertion: 'row_count', expected: 1 },
      { id: 'tc_2', description: 'Hercy has 2 reports and avg age 39', assertion: 'contains_row', expected: [9, 'Hercy', 2, 39] },
    ],
    related: ['p004', 'p017', 'p149'],
    source: { platform: 'LeetCode', externalId: '#1731', company: 'Amazon / Apple' },
  },
  {
    id: 'p155',
    slug: 'the-grand-finale-sql-synthesis',
    title: 'The Grand Finale: Multi-CTE Synthesis',
    difficulty: 'marker',
    track: 'sql',
    tags: ['CTE', 'Window Function', 'SELF JOIN', 'CASE WHEN', 'Boss Challenge'],
    points: 50,
    status: 'ready',
    description: `### The Grand Finale: Multi-CTE Synthesis

This is the ultimate synthesis challenge of **404-Found-Code**.

Given tables \`organizations\`, \`members\`, and \`contributions\`:
1. Calculate the total contributions made by each member across all projects.
2. Determine their department rank within their organization based on contribution volume.
3. Classify members with rank 1 as \`'Pinnacle Contributor'\`, rank 2–3 as \`'Core Contributor'\`, and all others as \`'Active Member'\`.
4. Report \`org_name\`, \`member_name\`, \`total_amount\`, \`dept_rank\`, and \`contributor_tier\`.

Order results by \`org_name\` ASC, \`total_amount\` DESC, \`member_name\` ASC.`,
    examples: [
      {
        input: `**organizations**:
| id | name |
| 1 | Antigravity AI |

**members**:
| id | org_id | name |
| 1 | 1 | Neo |
| 2 | 1 | Trinity |
| 3 | 1 | Morpheus |

**contributions**:
| id | member_id | amount |
| 1 | 1 | 5000 |
| 2 | 1 | 3000 |
| 3 | 2 | 6000 |
| 4 | 3 | 2000 |`,
        output: `| org_name | member_name | total_amount | dept_rank | contributor_tier |
| Antigravity AI | Neo | 8000 | 1 | Pinnacle Contributor |
| Antigravity AI | Trinity | 6000 | 2 | Core Contributor |
| Antigravity AI | Morpheus | 2000 | 3 | Core Contributor |`,
      },
    ],
    constraints: ['Member contributions must be aggregated prior to ranking.'],
    schemas: [
      {
        name: 'organizations',
        columns: [
          { name: 'id', type: 'INTEGER', nullable: false, isPrimaryKey: true },
          { name: 'name', type: 'TEXT', nullable: false },
        ],
      },
      {
        name: 'members',
        columns: [
          { name: 'id', type: 'INTEGER', nullable: false, isPrimaryKey: true },
          { name: 'org_id', type: 'INTEGER', nullable: false },
          { name: 'name', type: 'TEXT', nullable: false },
        ],
      },
      {
        name: 'contributions',
        columns: [
          { name: 'id', type: 'INTEGER', nullable: false, isPrimaryKey: true },
          { name: 'member_id', type: 'INTEGER', nullable: false },
          { name: 'amount', type: 'INTEGER', nullable: false },
        ],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS organizations;
      DROP TABLE IF EXISTS members;
      DROP TABLE IF EXISTS contributions;
      CREATE TABLE organizations (id INTEGER PRIMARY KEY, name TEXT);
      CREATE TABLE members (id INTEGER PRIMARY KEY, org_id INTEGER, name TEXT);
      CREATE TABLE contributions (id INTEGER PRIMARY KEY, member_id INTEGER, amount INTEGER);
      
      INSERT INTO organizations VALUES (1, 'Antigravity AI');
      INSERT INTO members VALUES (1, 1, 'Neo'), (2, 1, 'Trinity'), (3, 1, 'Morpheus');
      INSERT INTO contributions VALUES (1, 1, 5000), (2, 1, 3000), (3, 2, 6000), (4, 3, 2000);
    `,
    starter_code: `-- Solve the Grand Finale multi-CTE challenge
WITH MemberTotals AS (
  SELECT 
    m.org_id,
    m.name AS member_name,
    SUM(c.amount) AS total_amount
  FROM members m
  JOIN contributions c ON m.id = c.member_id
  GROUP BY m.org_id, m.id, m.name
),
Ranked AS (
  SELECT 
    org_id,
    member_name,
    total_amount,
    DENSE_RANK() OVER (PARTITION BY org_id ORDER BY total_amount DESC) AS dept_rank
  FROM MemberTotals
)
SELECT 
  o.name AS org_name,
  r.member_name,
  r.total_amount,
  r.dept_rank,
  CASE 
    WHEN r.dept_rank = 1 THEN 'Pinnacle Contributor'
    WHEN r.dept_rank IN (2, 3) THEN 'Core Contributor'
    ELSE 'Active Member'
  END AS contributor_tier
FROM Ranked r
JOIN organizations o ON r.org_id = o.id
ORDER BY org_name ASC, total_amount DESC, member_name ASC;`,
    solution: `WITH MemberTotals AS (SELECT m.org_id, m.name AS member_name, SUM(c.amount) AS total_amount FROM members m JOIN contributions c ON m.id = c.member_id GROUP BY m.org_id, m.id, m.name), Ranked AS (SELECT org_id, member_name, total_amount, DENSE_RANK() OVER (PARTITION BY org_id ORDER BY total_amount DESC) AS dept_rank FROM MemberTotals) SELECT o.name AS org_name, r.member_name, r.total_amount, r.dept_rank, CASE WHEN r.dept_rank = 1 THEN 'Pinnacle Contributor' WHEN r.dept_rank IN (2, 3) THEN 'Core Contributor' ELSE 'Active Member' END AS contributor_tier FROM Ranked r JOIN organizations o ON r.org_id = o.id ORDER BY org_name ASC, total_amount DESC, member_name ASC;`,
    hints: [
      { level: 1, title: 'Step 1: Aggregate totals', content: 'Sum contributions per member inside a `MemberTotals` CTE.', inkDropCost: 0 },
      { level: 2, title: 'Step 2: DENSE_RANK', content: 'Use `DENSE_RANK() OVER (PARTITION BY org_id ORDER BY total_amount DESC) AS dept_rank`.', inkDropCost: 5 },
      { level: 3, title: 'Step 3: Tier classification', content: 'Use `CASE WHEN dept_rank = 1 THEN \'Pinnacle Contributor\' WHEN dept_rank IN (2, 3) THEN \'Core Contributor\' ELSE \'Active Member\' END`.', inkDropCost: 20 },
    ],
    test_cases: [
      { id: 'tc_1', description: 'Returns 3 member rows', assertion: 'row_count', expected: 3 },
      { id: 'tc_2', description: 'Neo is Pinnacle Contributor with 8000', assertion: 'contains_row', expected: ['Antigravity AI', 'Neo', 8000, 1, 'Pinnacle Contributor'] },
      { id: 'tc_3', description: 'Trinity is Core Contributor with 6000', assertion: 'contains_row', expected: ['Antigravity AI', 'Trinity', 6000, 2, 'Core Contributor'] },
    ],
    related: ['p126', 'p129', 'p148'],
    source: { platform: 'Original', externalId: '#155', company: '404-Found-Code' },
  },
];
