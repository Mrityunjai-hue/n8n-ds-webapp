// lib/code/data/problems/p001_p020.ts
import { Problem } from '../../types';

export const PENCIL_BATCH_1: Problem[] = [
  {
    id: 'p001',
    slug: 'combine-two-tables',
    title: 'Combine Two Tables',
    difficulty: 'pencil',
    track: 'sql',
    tags: ['JOIN', 'LEFT JOIN', 'NULL'],
    points: 10,
    status: 'ready',
    description: `### Combine Two Tables

Write a SQL query to report the first name, last name, city, and state of each person in the \`Person\` table.

If the address of a \`personId\` is not present in the \`Address\` table, report \`null\` / \`NULL\` for their city and state.

Return the result table in **any order**.`,
    examples: [
      {
        input: `**Person** table:
| personId | lastName | firstName |
| :--- | :--- | :--- |
| 1 | Wang | Allen |
| 2 | Alice | Bob |

**Address** table:
| addressId | personId | city | state |
| :--- | :--- | :--- | :--- |
| 1 | 2 | New York City | New York |
| 2 | 3 | Leetcode | California |`,
        output: `| firstName | lastName | city | state |
| :--- | :--- | :--- | :--- |
| Allen | Wang | NULL | NULL |
| Bob | Alice | New York City | New York |`,
        explanation: 'There is no address in the Address table for personId = 1, so city and state remain NULL.',
      },
    ],
    constraints: [
      'personId is the primary key column for the Person table.',
      'addressId is the primary key column for the Address table.',
      'Each row contains information about the ID of a person and their location.',
    ],
    schemas: [
      {
        name: 'Person',
        columns: [
          { name: 'personId', type: 'INTEGER', nullable: false, isPrimaryKey: true },
          { name: 'lastName', type: 'TEXT', nullable: false },
          { name: 'firstName', type: 'TEXT', nullable: false },
        ],
      },
      {
        name: 'Address',
        columns: [
          { name: 'addressId', type: 'INTEGER', nullable: false, isPrimaryKey: true },
          { name: 'personId', type: 'INTEGER', nullable: false },
          { name: 'city', type: 'TEXT', nullable: false },
          { name: 'state', type: 'TEXT', nullable: false },
        ],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS Person;
      DROP TABLE IF EXISTS Address;
      CREATE TABLE Person (personId INTEGER PRIMARY KEY, lastName TEXT, firstName TEXT);
      CREATE TABLE Address (addressId INTEGER PRIMARY KEY, personId INTEGER, city TEXT, state TEXT);
      
      INSERT INTO Person VALUES (1, 'Wang', 'Allen');
      INSERT INTO Person VALUES (2, 'Alice', 'Bob');
      INSERT INTO Person VALUES (3, 'Smith', 'John');
      
      INSERT INTO Address VALUES (1, 2, 'New York City', 'New York');
      INSERT INTO Address VALUES (2, 3, 'Leetcode', 'California');
    `,
    starter_code: `-- Write your SQL query below
SELECT 
  p.firstName,
  p.lastName,
  a.city,
  a.state
FROM Person p
LEFT JOIN Address a ON p.personId = a.personId;`,
    solution: `SELECT p.firstName, p.lastName, a.city, a.state FROM Person p LEFT JOIN Address a ON p.personId = a.personId;`,
    hints: [
      {
        level: 1,
        title: 'Join Type',
        content: 'Since we need all persons even if they have no corresponding address, an `INNER JOIN` will drop rows. Use a `LEFT JOIN`.',
        inkDropCost: 0,
      },
      {
        level: 2,
        title: 'Query Skeleton',
        content: `\`\`\`sql
SELECT p.firstName, p.lastName, a.city, a.state
FROM Person p
LEFT JOIN Address a ON p.personId = a.personId;
\`\`\``,
        inkDropCost: 5,
      },
      {
        level: 3,
        title: 'Full Explanation',
        content: '`LEFT JOIN` guarantees that every record from the left table (`Person`) is preserved. When no match is found in `Address`, SQLite automatically outputs `NULL` for `city` and `state`.',
        inkDropCost: 20,
      },
    ],
    test_cases: [
      {
        id: 'tc_1',
        description: 'Returns exactly 3 persons',
        assertion: 'row_count',
        expected: 3,
      },
      {
        id: 'tc_2',
        description: 'Contains Allen Wang with NULL address',
        assertion: 'contains_row',
        expected: ['Allen', 'Wang', null, null],
      },
      {
        id: 'tc_3',
        description: 'Correct column headers in result set',
        assertion: 'column_names',
        expected: ['firstName', 'lastName', 'city', 'state'],
      },
    ],
    related: ['p005', 'p011', 'p021'],
    source: {
      platform: 'LeetCode',
      externalId: '#175',
      company: 'Amazon / Apple',
    },
  },
  {
    id: 'p002',
    slug: 'second-highest-salary',
    title: 'Second Highest Salary',
    difficulty: 'pencil',
    track: 'sql',
    tags: ['Subquery', 'NULL', 'LIMIT', 'OFFSET'],
    points: 10,
    status: 'ready',
    description: `### Second Highest Salary

Write a SQL query to find the **second highest** distinct salary from the \`Employee\` table.

If there is no second highest salary, the query should return \`null\` / \`NULL\` under the column name \`SecondHighestSalary\`.`,
    examples: [
      {
        input: `**Employee** table:
| id | salary |
| :--- | :--- |
| 1 | 100 |
| 2 | 200 |
| 3 | 300 |`,
        output: `| SecondHighestSalary |
| :--- |
| 200 |`,
      },
    ],
    constraints: [
      'id is the primary key column for the Employee table.',
      'salary is a non-negative integer.',
    ],
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
      INSERT INTO Employee VALUES (1, 100);
      INSERT INTO Employee VALUES (2, 200);
      INSERT INTO Employee VALUES (3, 300);
    `,
    starter_code: `-- Find the second highest salary, or return NULL if not present
SELECT (
  SELECT DISTINCT salary
  FROM Employee
  ORDER BY salary DESC
  LIMIT 1 OFFSET 1
) AS SecondHighestSalary;`,
    solution: `SELECT (SELECT DISTINCT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET 1) AS SecondHighestSalary;`,
    hints: [
      {
        level: 1,
        title: 'Handling NULL Edge Cases',
        content: 'If you just use `LIMIT 1 OFFSET 1` on a table with 1 row, it returns empty (0 rows) instead of a row with `NULL`. Wrapping the subquery in `SELECT (...) AS SecondHighestSalary` guarantees a `NULL` scalar.',
        inkDropCost: 0,
      },
      {
        level: 2,
        title: 'Alternative: MAX() with Subquery',
        content: 'You can also write: `SELECT MAX(salary) AS SecondHighestSalary FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee);`',
        inkDropCost: 5,
      },
      {
        level: 3,
        title: 'Full Explanation',
        content: 'Using `SELECT MAX(salary) ... WHERE salary < (SELECT MAX(salary) ...)` will naturally return `NULL` when there are no salaries strictly less than the maximum.',
        inkDropCost: 20,
      },
    ],
    test_cases: [
      {
        id: 'tc_1',
        description: 'Returns exactly 1 row',
        assertion: 'row_count',
        expected: 1,
      },
      {
        id: 'tc_2',
        description: 'Returns 200 as SecondHighestSalary',
        assertion: 'contains_row',
        expected: [200],
      },
      {
        id: 'tc_3',
        description: 'Column header must be SecondHighestSalary',
        assertion: 'column_names',
        expected: ['SecondHighestSalary'],
      },
    ],
    related: ['p061', 'p064', 'p078'],
    source: {
      platform: 'LeetCode',
      externalId: '#176',
      company: 'Amazon / Google / Microsoft',
    },
  },
  {
    id: 'p003',
    slug: 'duplicate-emails',
    title: 'Duplicate Emails',
    difficulty: 'pencil',
    track: 'sql',
    tags: ['GROUP BY', 'HAVING', 'COUNT'],
    points: 10,
    status: 'ready',
    description: `### Duplicate Emails

Write a SQL query to report all the duplicate emails in the \`Person\` table.

Return the result table in **any order**. The output column should be named \`Email\` (or \`email\`).`,
    examples: [
      {
        input: `**Person** table:
| id | email |
| :--- | :--- |
| 1 | a@b.com |
| 2 | c@d.com |
| 3 | a@b.com |`,
        output: `| Email |
| :--- |
| a@b.com |`,
      },
    ],
    constraints: ['id is the primary key column.', 'email is a string of lowercase letters.'],
    schemas: [
      {
        name: 'Person',
        columns: [
          { name: 'id', type: 'INTEGER', nullable: false, isPrimaryKey: true },
          { name: 'email', type: 'TEXT', nullable: false },
        ],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS Person;
      CREATE TABLE Person (id INTEGER PRIMARY KEY, email TEXT);
      INSERT INTO Person VALUES (1, 'a@b.com');
      INSERT INTO Person VALUES (2, 'c@d.com');
      INSERT INTO Person VALUES (3, 'a@b.com');
    `,
    starter_code: `-- Find all emails that appear more than once
SELECT email AS Email
FROM Person
GROUP BY email
HAVING COUNT(email) > 1;`,
    solution: `SELECT email AS Email FROM Person GROUP BY email HAVING COUNT(email) > 1;`,
    hints: [
      {
        level: 1,
        title: 'Aggregation Filter',
        content: 'Group by `email` and use the `HAVING` clause with `COUNT(email) > 1`.',
        inkDropCost: 0,
      },
      {
        level: 2,
        title: 'HAVING vs WHERE',
        content: 'Remember that `WHERE` filters before grouping, whereas `HAVING` filters aggregated groups.',
        inkDropCost: 5,
      },
      {
        level: 3,
        title: 'Full Query',
        content: `\`\`\`sql
SELECT email AS Email
FROM Person
GROUP BY email
HAVING COUNT(*) > 1;
\`\`\``,
        inkDropCost: 20,
      },
    ],
    test_cases: [
      {
        id: 'tc_1',
        description: 'Returns 1 duplicate email',
        assertion: 'row_count',
        expected: 1,
      },
      {
        id: 'tc_2',
        description: 'Identifies a@b.com as duplicate',
        assertion: 'contains_row',
        expected: ['a@b.com'],
      },
    ],
    related: ['p008', 'p015', 'p038'],
    source: {
      platform: 'LeetCode',
      externalId: '#182',
      company: 'Apple / Adobe',
    },
  },
  {
    id: 'p004',
    slug: 'employees-earning-more-than-their-managers',
    title: 'Employees Earning More Than Their Managers',
    difficulty: 'pencil',
    track: 'sql',
    tags: ['SELF JOIN', 'WHERE'],
    points: 10,
    status: 'ready',
    description: `### Employees Earning More Than Their Managers

Write a SQL query to find the employees who earn more than their managers.

Return the result table with the column name \`Employee\`.`,
    examples: [
      {
        input: `**Employee** table:
| id | name | salary | managerId |
| :--- | :--- | :--- | :--- |
| 1 | Joe | 70000 | 3 |
| 2 | Henry | 80000 | 4 |
| 3 | Sam | 60000 | NULL |
| 4 | Max | 90000 | NULL |`,
        output: `| Employee |
| :--- |
| Joe |`,
        explanation: 'Joe earns 70000 and his manager Sam earns 60000. Joe earns more than Sam.',
      },
    ],
    constraints: ['id is the primary key.', 'managerId is the id of an employee in the same table.'],
    schemas: [
      {
        name: 'Employee',
        columns: [
          { name: 'id', type: 'INTEGER', nullable: false, isPrimaryKey: true },
          { name: 'name', type: 'TEXT', nullable: false },
          { name: 'salary', type: 'INTEGER', nullable: false },
          { name: 'managerId', type: 'INTEGER', nullable: true },
        ],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS Employee;
      CREATE TABLE Employee (id INTEGER PRIMARY KEY, name TEXT, salary INTEGER, managerId INTEGER);
      INSERT INTO Employee VALUES (1, 'Joe', 70000, 3);
      INSERT INTO Employee VALUES (2, 'Henry', 80000, 4);
      INSERT INTO Employee VALUES (3, 'Sam', 60000, NULL);
      INSERT INTO Employee VALUES (4, 'Max', 90000, NULL);
    `,
    starter_code: `-- Find employees earning more than their direct managers
SELECT e.name AS Employee
FROM Employee e
JOIN Employee m ON e.managerId = m.id
WHERE e.salary > m.salary;`,
    solution: `SELECT e.name AS Employee FROM Employee e JOIN Employee m ON e.managerId = m.id WHERE e.salary > m.salary;`,
    hints: [
      {
        level: 1,
        title: 'Self Join',
        content: 'Join the `Employee` table with itself, connecting `e.managerId = m.id`.',
        inkDropCost: 0,
      },
      {
        level: 2,
        title: 'Salary Comparison',
        content: 'Filter the joined rows with `WHERE e.salary > m.salary`.',
        inkDropCost: 5,
      },
      {
        level: 3,
        title: 'Full Query',
        content: `\`\`\`sql
SELECT e.name AS Employee
FROM Employee e
INNER JOIN Employee m ON e.managerId = m.id
WHERE e.salary > m.salary;
\`\`\``,
        inkDropCost: 20,
      },
    ],
    test_cases: [
      {
        id: 'tc_1',
        description: 'Returns exactly 1 employee',
        assertion: 'row_count',
        expected: 1,
      },
      {
        id: 'tc_2',
        description: 'Returns Joe',
        assertion: 'contains_row',
        expected: ['Joe'],
      },
      {
        id: 'tc_3',
        description: 'Header named Employee',
        assertion: 'column_names',
        expected: ['Employee'],
      },
    ],
    related: ['p063', 'p064', 'p116'],
    source: {
      platform: 'LeetCode',
      externalId: '#181',
      company: 'Amazon / Bloomberg',
    },
  },
  {
    id: 'p005',
    slug: 'customers-who-never-order',
    title: 'Customers Who Never Order',
    difficulty: 'pencil',
    track: 'sql',
    tags: ['LEFT JOIN', 'NULL', 'NOT IN'],
    points: 10,
    status: 'ready',
    description: `### Customers Who Never Order

Write a SQL query to report all customers who never order anything.

Return the result table with the column name \`Customers\`.`,
    examples: [
      {
        input: `**Customers** table:
| id | name |
| :--- | :--- |
| 1 | Joe |
| 2 | Henry |
| 3 | Sam |
| 4 | Max |

**Orders** table:
| id | customerId |
| :--- | :--- |
| 1 | 3 |
| 2 | 1 |`,
        output: `| Customers |
| :--- |
| Henry |
| Max |`,
      },
    ],
    constraints: ['id is the primary key for both tables.', 'customerId is a foreign key referencing Customers.id.'],
    schemas: [
      {
        name: 'Customers',
        columns: [
          { name: 'id', type: 'INTEGER', nullable: false, isPrimaryKey: true },
          { name: 'name', type: 'TEXT', nullable: false },
        ],
      },
      {
        name: 'Orders',
        columns: [
          { name: 'id', type: 'INTEGER', nullable: false, isPrimaryKey: true },
          { name: 'customerId', type: 'INTEGER', nullable: false },
        ],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS Customers;
      DROP TABLE IF EXISTS Orders;
      CREATE TABLE Customers (id INTEGER PRIMARY KEY, name TEXT);
      CREATE TABLE Orders (id INTEGER PRIMARY KEY, customerId INTEGER);
      INSERT INTO Customers VALUES (1, 'Joe'), (2, 'Henry'), (3, 'Sam'), (4, 'Max');
      INSERT INTO Orders VALUES (1, 3), (2, 1);
    `,
    starter_code: `-- Find customers who have no entries in Orders table
SELECT c.name AS Customers
FROM Customers c
LEFT JOIN Orders o ON c.id = o.customerId
WHERE o.id IS NULL;`,
    solution: `SELECT c.name AS Customers FROM Customers c LEFT JOIN Orders o ON c.id = o.customerId WHERE o.id IS NULL;`,
    hints: [
      {
        level: 1,
        title: 'Anti-Join Strategy',
        content: 'Use `LEFT JOIN` and filter for where `o.id IS NULL`, or use `WHERE id NOT IN (SELECT customerId FROM Orders)`.',
        inkDropCost: 0,
      },
      {
        level: 2,
        title: 'LEFT JOIN IS NULL',
        content: 'Left joining preserves all customers. For those without orders, all order columns will be `NULL`.',
        inkDropCost: 5,
      },
      {
        level: 3,
        title: 'Full Query',
        content: `\`\`\`sql
SELECT c.name AS Customers
FROM Customers c
LEFT JOIN Orders o ON c.id = o.customerId
WHERE o.customerId IS NULL;
\`\`\``,
        inkDropCost: 20,
      },
    ],
    test_cases: [
      {
        id: 'tc_1',
        description: 'Returns 2 customers',
        assertion: 'row_count',
        expected: 2,
      },
      {
        id: 'tc_2',
        description: 'Contains Henry and Max',
        assertion: 'contains_row',
        expected: ['Henry'],
      },
    ],
    related: ['p001', 'p011', 'p047'],
    source: {
      platform: 'LeetCode',
      externalId: '#183',
      company: 'Amazon / Apple',
    },
  },
  {
    id: 'p006',
    slug: 'rising-temperature',
    title: 'Rising Temperature',
    difficulty: 'pencil',
    track: 'sql',
    tags: ['DATE', 'JULIANDAY', 'JOIN'],
    points: 10,
    status: 'ready',
    description: `### Rising Temperature

Write a SQL query to find all dates' \`id\` with higher temperatures compared to its previous dates (yesterday).

Return the result table in **any order** with the column name \`id\`.`,
    examples: [
      {
        input: `**Weather** table:
| id | recordDate | temperature |
| :--- | :--- | :--- |
| 1 | 2015-01-01 | 10 |
| 2 | 2015-01-02 | 25 |
| 3 | 2015-01-03 | 20 |
| 4 | 2015-01-04 | 30 |`,
        output: `| id |
| :--- |
| 2 |
| 4 |`,
        explanation: 'In 2015-01-02, the temperature was higher than previous day (25 vs 10). In 2015-01-04, 30 vs 20.',
      },
    ],
    constraints: ['id is the primary key.', 'No two rows have the same recordDate.'],
    schemas: [
      {
        name: 'Weather',
        columns: [
          { name: 'id', type: 'INTEGER', nullable: false, isPrimaryKey: true },
          { name: 'recordDate', type: 'DATE', nullable: false },
          { name: 'temperature', type: 'INTEGER', nullable: false },
        ],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS Weather;
      CREATE TABLE Weather (id INTEGER PRIMARY KEY, recordDate DATE, temperature INTEGER);
      INSERT INTO Weather VALUES (1, '2015-01-01', 10), (2, '2015-01-02', 25), (3, '2015-01-03', 20), (4, '2015-01-04', 30);
    `,
    starter_code: `-- Find IDs where temperature is higher than yesterday
SELECT w1.id
FROM Weather w1
JOIN Weather w2 ON date(w1.recordDate, '-1 day') = w2.recordDate
WHERE w1.temperature > w2.temperature;`,
    solution: `SELECT w1.id FROM Weather w1 JOIN Weather w2 ON date(w1.recordDate, '-1 day') = w2.recordDate WHERE w1.temperature > w2.temperature;`,
    hints: [
      {
        level: 1,
        title: 'Date Arithmetic in SQLite',
        content: 'In SQLite, calculate yesterday using `date(w1.recordDate, \'-1 day\')` or `julianday(w1.recordDate) - julianday(w2.recordDate) = 1`.',
        inkDropCost: 0,
      },
      {
        level: 2,
        title: 'Joining On Consecutive Days',
        content: 'Join `w1` and `w2` on `w2.recordDate = date(w1.recordDate, \'-1 day\')` and compare temperatures.',
        inkDropCost: 5,
      },
      {
        level: 3,
        title: 'Full Query',
        content: `\`\`\`sql
SELECT w1.id
FROM Weather w1
INNER JOIN Weather w2 
  ON w2.recordDate = date(w1.recordDate, '-1 day')
WHERE w1.temperature > w2.temperature;
\`\`\``,
        inkDropCost: 20,
      },
    ],
    test_cases: [
      {
        id: 'tc_1',
        description: 'Returns exactly 2 rows',
        assertion: 'row_count',
        expected: 2,
      },
      {
        id: 'tc_2',
        description: 'Identifies ID 2 and ID 4',
        assertion: 'contains_row',
        expected: [2],
      },
    ],
    related: ['p063', 'p072', 'p104'],
    source: {
      platform: 'LeetCode',
      externalId: '#197',
      company: 'Amazon / Adobe',
    },
  },
  {
    id: 'p007',
    slug: 'big-countries',
    title: 'Big Countries',
    difficulty: 'pencil',
    track: 'sql',
    tags: ['WHERE', 'OR', 'UNION'],
    points: 10,
    status: 'ready',
    description: `### Big Countries

A country is **big** if:
1. It has an area of at least three million (i.e., \`area >= 3000000\`), or
2. It has a population of at least twenty-five million (i.e., \`population >= 25000000\`).

Write a SQL query to report the name, population, and area of the big countries.`,
    examples: [
      {
        input: `**World** table:
| name | continent | area | population | gdp |
| :--- | :--- | :--- | :--- | :--- |
| Afghanistan | Asia | 652230 | 25500100 | 20343000000 |
| Albania | Europe | 28748 | 2831741 | 12960000000 |
| Algeria | Africa | 2381741 | 37100000 | 188681000000 |
| Andorra | Europe | 468 | 78115 | 3712000000 |
| Angola | Africa | 1246700 | 20609294 | 100990000000 |`,
        output: `| name | population | area |
| :--- | :--- | :--- |
| Afghanistan | 25500100 | 652230 |
| Algeria | 37100000 | 2381741 |`,
      },
    ],
    constraints: ['name is the primary key column for World table.'],
    schemas: [
      {
        name: 'World',
        columns: [
          { name: 'name', type: 'TEXT', nullable: false, isPrimaryKey: true },
          { name: 'continent', type: 'TEXT', nullable: false },
          { name: 'area', type: 'INTEGER', nullable: false },
          { name: 'population', type: 'INTEGER', nullable: false },
          { name: 'gdp', type: 'INTEGER', nullable: false },
        ],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS World;
      CREATE TABLE World (name TEXT PRIMARY KEY, continent TEXT, area INTEGER, population INTEGER, gdp INTEGER);
      INSERT INTO World VALUES 
        ('Afghanistan', 'Asia', 652230, 25500100, 20343000000),
        ('Albania', 'Europe', 28748, 2831741, 12960000000),
        ('Algeria', 'Africa', 2381741, 37100000, 188681000000),
        ('Andorra', 'Europe', 468, 78115, 3712000000),
        ('Angola', 'Africa', 1246700, 20609294, 100990000000);
    `,
    starter_code: `-- Find countries that meet the area or population criteria
SELECT name, population, area
FROM World
WHERE area >= 3000000 OR population >= 25000000;`,
    solution: `SELECT name, population, area FROM World WHERE area >= 3000000 OR population >= 25000000;`,
    hints: [
      {
        level: 1,
        title: 'Logical OR',
        content: 'Combine both conditions using `OR`: `area >= 3000000 OR population >= 25000000`.',
        inkDropCost: 0,
      },
      {
        level: 2,
        title: 'Column Order',
        content: 'Make sure your output columns are `name, population, area` in that exact order.',
        inkDropCost: 5,
      },
      {
        level: 3,
        title: 'Full Query',
        content: `\`\`\`sql
SELECT name, population, area
FROM World
WHERE area >= 3000000 OR population >= 25000000;
\`\`\``,
        inkDropCost: 20,
      },
    ],
    test_cases: [
      {
        id: 'tc_1',
        description: 'Returns exactly 2 countries',
        assertion: 'row_count',
        expected: 2,
      },
      {
        id: 'tc_2',
        description: 'Correct column sequence',
        assertion: 'column_names',
        expected: ['name', 'population', 'area'],
      },
    ],
    related: ['p014', 'p032'],
    source: {
      platform: 'LeetCode',
      externalId: '#595',
      company: 'Amazon / Google',
    },
  },
  {
    id: 'p008',
    slug: 'classes-more-than-5-students',
    title: 'Classes With 5+ Students',
    difficulty: 'pencil',
    track: 'sql',
    tags: ['GROUP BY', 'HAVING', 'COUNT'],
    points: 10,
    status: 'ready',
    description: `### Classes With 5+ Students

Write a SQL query to report all the classes that have **at least five students**.

Return the result table in **any order** with the column name \`class\`.`,
    examples: [
      {
        input: `**Courses** table:
| student | class |
| :--- | :--- |
| A | Math |
| B | English |
| C | Math |
| D | Biology |
| E | Math |
| F | Computer |
| G | Math |
| H | Math |
| I | Math |`,
        output: `| class |
| :--- |
| Math |`,
      },
    ],
    constraints: ['(student, class) is the primary key for Courses table.'],
    schemas: [
      {
        name: 'Courses',
        columns: [
          { name: 'student', type: 'TEXT', nullable: false },
          { name: 'class', type: 'TEXT', nullable: false },
        ],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS Courses;
      CREATE TABLE Courses (student TEXT, class TEXT, PRIMARY KEY (student, class));
      INSERT INTO Courses VALUES 
        ('A', 'Math'), ('B', 'English'), ('C', 'Math'), 
        ('D', 'Biology'), ('E', 'Math'), ('F', 'Computer'), 
        ('G', 'Math'), ('H', 'Math'), ('I', 'Math');
    `,
    starter_code: `-- Find classes with at least 5 students
SELECT class
FROM Courses
GROUP BY class
HAVING COUNT(student) >= 5;`,
    solution: `SELECT class FROM Courses GROUP BY class HAVING COUNT(student) >= 5;`,
    hints: [
      {
        level: 1,
        title: 'Group & Count',
        content: 'Group by `class` and filter with `HAVING COUNT(student) >= 5`.',
        inkDropCost: 0,
      },
      {
        level: 2,
        title: 'Distinct Students',
        content: 'If duplicate (student, class) entries were possible, you would use `COUNT(DISTINCT student) >= 5`.',
        inkDropCost: 5,
      },
      {
        level: 3,
        title: 'Full Query',
        content: `\`\`\`sql
SELECT class
FROM Courses
GROUP BY class
HAVING COUNT(DISTINCT student) >= 5;
\`\`\``,
        inkDropCost: 20,
      },
    ],
    test_cases: [
      {
        id: 'tc_1',
        description: 'Returns 1 class',
        assertion: 'row_count',
        expected: 1,
      },
      {
        id: 'tc_2',
        description: 'Identifies Math',
        assertion: 'contains_row',
        expected: ['Math'],
      },
    ],
    related: ['p003', 'p015', 'p083'],
    source: {
      platform: 'LeetCode',
      externalId: '#596',
      company: 'Amazon',
    },
  },
  {
    id: 'p009',
    slug: 'find-customer-referee',
    title: 'Find Customer Referee',
    difficulty: 'pencil',
    track: 'sql',
    tags: ['WHERE', 'NULL', 'IS NOT'],
    points: 10,
    status: 'ready',
    description: `### Find Customer Referee

Write a SQL query to report the names of the customer that are **not referred by** the customer with \`id = 2\`.

Return the result table in **any order** with the column name \`name\`.`,
    examples: [
      {
        input: `**Customer** table:
| id | name | referee_id |
| :--- | :--- | :--- |
| 1 | Will | NULL |
| 2 | Jane | NULL |
| 3 | Alex | 2 |
| 4 | Bill | NULL |
| 5 | Zack | 1 |
| 6 | Mark | 2 |`,
        output: `| name |
| :--- |
| Will |
| Jane |
| Bill |
| Zack |`,
      },
    ],
    constraints: ['id is the primary key column.', 'referee_id can be NULL.'],
    schemas: [
      {
        name: 'Customer',
        columns: [
          { name: 'id', type: 'INTEGER', nullable: false, isPrimaryKey: true },
          { name: 'name', type: 'TEXT', nullable: false },
          { name: 'referee_id', type: 'INTEGER', nullable: true },
        ],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS Customer;
      CREATE TABLE Customer (id INTEGER PRIMARY KEY, name TEXT, referee_id INTEGER);
      INSERT INTO Customer VALUES 
        (1, 'Will', NULL),
        (2, 'Jane', NULL),
        (3, 'Alex', 2),
        (4, 'Bill', NULL),
        (5, 'Zack', 1),
        (6, 'Mark', 2);
    `,
    starter_code: `-- Find customers not referred by id = 2 (including NULL referees)
SELECT name
FROM Customer
WHERE referee_id != 2 OR referee_id IS NULL;`,
    solution: `SELECT name FROM Customer WHERE referee_id != 2 OR referee_id IS NULL;`,
    hints: [
      {
        level: 1,
        title: 'Three-Valued Logic in SQL',
        content: 'In SQL, `NULL != 2` evaluates to `UNKNOWN` (falsy), so rows with `NULL` will be filtered out unless you explicitly add `OR referee_id IS NULL`.',
        inkDropCost: 0,
      },
      {
        level: 2,
        title: 'Alternative: COALESCE',
        content: 'You can write `WHERE COALESCE(referee_id, 0) != 2`.',
        inkDropCost: 5,
      },
      {
        level: 3,
        title: 'Full Query',
        content: `\`\`\`sql
SELECT name
FROM Customer
WHERE referee_id != 2 OR referee_id IS NULL;
\`\`\``,
        inkDropCost: 20,
      },
    ],
    test_cases: [
      {
        id: 'tc_1',
        description: 'Returns 4 customers',
        assertion: 'row_count',
        expected: 4,
      },
      {
        id: 'tc_2',
        description: 'Excludes Alex and Mark',
        assertion: 'contains_row',
        expected: ['Zack'],
      },
    ],
    related: ['p005', 'p014', 'p021'],
    source: {
      platform: 'LeetCode',
      externalId: '#584',
      company: 'Amazon / Apple',
    },
  },
  {
    id: 'p010',
    slug: 'customer-placing-the-largest-number-of-orders',
    title: 'Customer Placing Largest Number of Orders',
    difficulty: 'pencil',
    track: 'sql',
    tags: ['GROUP BY', 'ORDER BY', 'LIMIT'],
    points: 10,
    status: 'ready',
    description: `### Customer Placing the Largest Number of Orders

Write a SQL query to find the \`customer_number\` for the customer who has placed the largest number of orders.

The test cases are generated so that exactly one customer will have placed more orders than any other customer.`,
    examples: [
      {
        input: `**Orders** table:
| order_number | customer_number |
| :--- | :--- |
| 1 | 1 |
| 2 | 2 |
| 3 | 3 |
| 4 | 3 |`,
        output: `| customer_number |
| :--- |
| 3 |`,
        explanation: 'The customer with number 3 has two orders, which is greater than either customer 1 or 2.',
      },
    ],
    constraints: ['order_number is the primary key column for Orders table.'],
    schemas: [
      {
        name: 'Orders',
        columns: [
          { name: 'order_number', type: 'INTEGER', nullable: false, isPrimaryKey: true },
          { name: 'customer_number', type: 'INTEGER', nullable: false },
        ],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS Orders;
      CREATE TABLE Orders (order_number INTEGER PRIMARY KEY, customer_number INTEGER);
      INSERT INTO Orders VALUES (1, 1), (2, 2), (3, 3), (4, 3);
    `,
    starter_code: `-- Find the customer_number with the most orders
SELECT customer_number
FROM Orders
GROUP BY customer_number
ORDER BY COUNT(order_number) DESC
LIMIT 1;`,
    solution: `SELECT customer_number FROM Orders GROUP BY customer_number ORDER BY COUNT(order_number) DESC LIMIT 1;`,
    hints: [
      {
        level: 1,
        title: 'Group and Sort by Count',
        content: 'Group by `customer_number`, order by `COUNT(*) DESC`, and take `LIMIT 1`.',
        inkDropCost: 0,
      },
      {
        level: 2,
        title: 'Query Structure',
        content: `\`\`\`sql
SELECT customer_number
FROM Orders
GROUP BY customer_number
ORDER BY COUNT(*) DESC
LIMIT 1;
\`\`\``,
        inkDropCost: 5,
      },
      {
        level: 3,
        title: 'Edge Case Tie Handling',
        content: 'If ties were possible, you would use `DENSE_RANK() OVER (ORDER BY COUNT(*) DESC) = 1`.',
        inkDropCost: 20,
      },
    ],
    test_cases: [
      {
        id: 'tc_1',
        description: 'Returns 1 row',
        assertion: 'row_count',
        expected: 1,
      },
      {
        id: 'tc_2',
        description: 'Returns customer 3',
        assertion: 'contains_row',
        expected: [3],
      },
    ],
    related: ['p008', 'p013', 'p049'],
    source: {
      platform: 'LeetCode',
      externalId: '#586',
      company: 'Twitter / Uber',
    },
  },
  {
    id: 'p011',
    slug: 'sales-person',
    title: 'Sales Person',
    difficulty: 'pencil',
    track: 'sql',
    tags: ['LEFT JOIN', 'NOT IN', 'Subquery'],
    points: 10,
    status: 'ready',
    description: `### Sales Person

Write a SQL query to report the names of all the salespersons who **did not have any orders related to the company with the name 'RED'**.

Return the result table in **any order** with the column name \`name\`.`,
    examples: [
      {
        input: `**SalesPerson**:
| sales_id | name | salary |
| :--- | :--- | :--- |
| 1 | John | 100000 |
| 2 | Amy | 12000 |
| 3 | Mark | 65000 |
| 4 | Pam | 25000 |
| 5 | Alex | 50000 |

**Company**:
| com_id | name | city |
| :--- | :--- | :--- |
| 1 | RED | Boston |
| 2 | ORANGE | New York |

**Orders**:
| order_id | order_date | com_id | sales_id | amount |
| :--- | :--- | :--- | :--- | :--- |
| 1 | 1/1/2014 | 3 | 4 | 10000 |
| 2 | 2/1/2014 | 1 | 1 | 25000 |
| 3 | 3/1/2014 | 1 | 2 | 50000 |`,
        output: `| name |
| :--- |
| Mark |
| Pam |
| Alex |`,
        explanation: 'John and Amy have orders with company RED (com_id 1). Mark, Pam, and Alex do not.',
      },
    ],
    constraints: ['sales_id and com_id are primary keys.'],
    schemas: [
      {
        name: 'SalesPerson',
        columns: [
          { name: 'sales_id', type: 'INTEGER', nullable: false, isPrimaryKey: true },
          { name: 'name', type: 'TEXT', nullable: false },
          { name: 'salary', type: 'INTEGER', nullable: false },
        ],
      },
      {
        name: 'Company',
        columns: [
          { name: 'com_id', type: 'INTEGER', nullable: false, isPrimaryKey: true },
          { name: 'name', type: 'TEXT', nullable: false },
        ],
      },
      {
        name: 'Orders',
        columns: [
          { name: 'order_id', type: 'INTEGER', nullable: false, isPrimaryKey: true },
          { name: 'com_id', type: 'INTEGER', nullable: false },
          { name: 'sales_id', type: 'INTEGER', nullable: false },
          { name: 'amount', type: 'INTEGER', nullable: false },
        ],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS SalesPerson;
      DROP TABLE IF EXISTS Company;
      DROP TABLE IF EXISTS Orders;
      CREATE TABLE SalesPerson (sales_id INTEGER PRIMARY KEY, name TEXT, salary INTEGER);
      CREATE TABLE Company (com_id INTEGER PRIMARY KEY, name TEXT);
      CREATE TABLE Orders (order_id INTEGER PRIMARY KEY, com_id INTEGER, sales_id INTEGER, amount INTEGER);
      
      INSERT INTO SalesPerson VALUES (1, 'John', 100000), (2, 'Amy', 12000), (3, 'Mark', 65000), (4, 'Pam', 25000), (5, 'Alex', 50000);
      INSERT INTO Company VALUES (1, 'RED'), (2, 'ORANGE');
      INSERT INTO Orders VALUES (1, 2, 4, 10000), (2, 1, 1, 25000), (3, 1, 2, 50000);
    `,
    starter_code: `-- Find salespersons who have no orders with company RED
SELECT name
FROM SalesPerson
WHERE sales_id NOT IN (
  SELECT o.sales_id
  FROM Orders o
  JOIN Company c ON o.com_id = c.com_id
  WHERE c.name = 'RED'
);`,
    solution: `SELECT name FROM SalesPerson WHERE sales_id NOT IN (SELECT o.sales_id FROM Orders o JOIN Company c ON o.com_id = c.com_id WHERE c.name = 'RED');`,
    hints: [
      {
        level: 1,
        title: 'Find RED Sales IDs',
        content: 'First, find all `sales_id` values associated with RED company orders: `SELECT o.sales_id FROM Orders o JOIN Company c ON o.com_id = c.com_id WHERE c.name = \'RED\'`.',
        inkDropCost: 0,
      },
      {
        level: 2,
        title: 'NOT IN Subquery',
        content: 'Select names from `SalesPerson` where `sales_id NOT IN (...)`.',
        inkDropCost: 5,
      },
      {
        level: 3,
        title: 'Full Explanation',
        content: 'Using `NOT IN` excludes John and Amy who have RED orders, leaving Mark, Pam, and Alex.',
        inkDropCost: 20,
      },
    ],
    test_cases: [
      {
        id: 'tc_1',
        description: 'Returns 3 salespeople',
        assertion: 'row_count',
        expected: 3,
      },
      {
        id: 'tc_2',
        description: 'Includes Mark and Alex',
        assertion: 'contains_row',
        expected: ['Mark'],
      },
    ],
    related: ['p005', 'p016', 'p057'],
    source: {
      platform: 'LeetCode',
      externalId: '#607',
      company: 'Amazon',
    },
  },
  {
    id: 'p012',
    slug: 'triangle-judgement',
    title: 'Triangle Judgement',
    difficulty: 'pencil',
    track: 'sql',
    tags: ['CASE WHEN', 'Logic'],
    points: 10,
    status: 'ready',
    description: `### Triangle Judgement

Report for every three line segments whether they can form a triangle.

The condition to form a triangle is: for any three sides $x, y, z$, the sum of any two sides must be strictly greater than the third side:
- $x + y > z$
- $x + z > y$
- $y + z > x$

Return the result table with columns \`x\`, \`y\`, \`z\`, and \`triangle\` ('Yes' or 'No').`,
    examples: [
      {
        input: `**Triangle** table:
| x | y | z |
| :--- | :--- | :--- |
| 13 | 15 | 30 |
| 10 | 20 | 15 |`,
        output: `| x | y | z | triangle |
| :--- | :--- | :--- | :--- |
| 13 | 15 | 30 | No |
| 10 | 20 | 15 | Yes |`,
      },
    ],
    constraints: ['(x, y, z) are positive integers.'],
    schemas: [
      {
        name: 'Triangle',
        columns: [
          { name: 'x', type: 'INTEGER', nullable: false },
          { name: 'y', type: 'INTEGER', nullable: false },
          { name: 'z', type: 'INTEGER', nullable: false },
        ],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS Triangle;
      CREATE TABLE Triangle (x INTEGER, y INTEGER, z INTEGER);
      INSERT INTO Triangle VALUES (13, 15, 30), (10, 20, 15);
    `,
    starter_code: `-- Determine if x, y, z can form a triangle
SELECT 
  x, 
  y, 
  z,
  CASE 
    WHEN x + y > z AND x + z > y AND y + z > x THEN 'Yes'
    ELSE 'No'
  END AS triangle
FROM Triangle;`,
    solution: `SELECT x, y, z, CASE WHEN x + y > z AND x + z > y AND y + z > x THEN 'Yes' ELSE 'No' END AS triangle FROM Triangle;`,
    hints: [
      {
        level: 1,
        title: 'Triangle Inequality Theorem',
        content: 'Check that `x + y > z AND x + z > y AND y + z > x`.',
        inkDropCost: 0,
      },
      {
        level: 2,
        title: 'CASE Expression',
        content: 'Wrap the condition in a `CASE WHEN ... THEN \'Yes\' ELSE \'No\' END AS triangle`.',
        inkDropCost: 5,
      },
      {
        level: 3,
        title: 'Full Query',
        content: `\`\`\`sql
SELECT x, y, z,
  CASE 
    WHEN x + y > z AND x + z > y AND y + z > x THEN 'Yes'
    ELSE 'No'
  END AS triangle
FROM Triangle;
\`\`\``,
        inkDropCost: 20,
      },
    ],
    test_cases: [
      {
        id: 'tc_1',
        description: 'Returns 2 rows',
        assertion: 'row_count',
        expected: 2,
      },
      {
        id: 'tc_2',
        description: '10, 20, 15 forms a triangle (Yes)',
        assertion: 'contains_row',
        expected: [10, 20, 15, 'Yes'],
      },
    ],
    related: ['p014', 'p018', 'p035'],
    source: {
      platform: 'LeetCode',
      externalId: '#610',
      company: 'Apple',
    },
  },
  {
    id: 'p013',
    slug: 'biggest-single-number',
    title: 'Biggest Single Number',
    difficulty: 'pencil',
    track: 'sql',
    tags: ['GROUP BY', 'HAVING', 'MAX', 'Subquery'],
    points: 10,
    status: 'ready',
    description: `### Biggest Single Number

A **single number** is a number that appeared only once in the \`MyNumbers\` table.

Find the largest single number. If there is no single number, report \`null\` / \`NULL\`.

Return the result with column name \`num\`.`,
    examples: [
      {
        input: `**MyNumbers** table:
| num |
| :--- |
| 8 |
| 8 |
| 3 |
| 3 |
| 1 |
| 4 |
| 5 |
| 6 |`,
        output: `| num |
| :--- |
| 6 |`,
        explanation: 'Single numbers are 1, 4, 5, 6. The largest is 6.',
      },
    ],
    constraints: ['num is an integer.'],
    schemas: [
      {
        name: 'MyNumbers',
        columns: [{ name: 'num', type: 'INTEGER', nullable: false }],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS MyNumbers;
      CREATE TABLE MyNumbers (num INTEGER);
      INSERT INTO MyNumbers VALUES (8), (8), (3), (3), (1), (4), (5), (6);
    `,
    starter_code: `-- Find the largest single number or NULL
SELECT MAX(num) AS num
FROM (
  SELECT num
  FROM MyNumbers
  GROUP BY num
  HAVING COUNT(num) = 1
);`,
    solution: `SELECT MAX(num) AS num FROM (SELECT num FROM MyNumbers GROUP BY num HAVING COUNT(num) = 1);`,
    hints: [
      {
        level: 1,
        title: 'Find Single Numbers First',
        content: 'Write a subquery: `SELECT num FROM MyNumbers GROUP BY num HAVING COUNT(*) = 1`.',
        inkDropCost: 0,
      },
      {
        level: 2,
        title: 'Aggregate with MAX()',
        content: 'Select `MAX(num)` from that derived subquery. If the subquery is empty, `MAX()` automatically returns `NULL`.',
        inkDropCost: 5,
      },
      {
        level: 3,
        title: 'Full Query',
        content: `\`\`\`sql
SELECT MAX(num) AS num
FROM (
  SELECT num
  FROM MyNumbers
  GROUP BY num
  HAVING COUNT(*) = 1
) AS singles;
\`\`\``,
        inkDropCost: 20,
      },
    ],
    test_cases: [
      {
        id: 'tc_1',
        description: 'Returns 1 row',
        assertion: 'row_count',
        expected: 1,
      },
      {
        id: 'tc_2',
        description: 'Returns 6',
        assertion: 'contains_row',
        expected: [6],
      },
    ],
    related: ['p002', 'p008', 'p037'],
    source: {
      platform: 'LeetCode',
      externalId: '#619',
      company: 'Twitter / Apple',
    },
  },
  {
    id: 'p014',
    slug: 'not-boring-movies',
    title: 'Not Boring Movies',
    difficulty: 'pencil',
    track: 'sql',
    tags: ['WHERE', 'MOD', 'ORDER BY'],
    points: 10,
    status: 'ready',
    description: `### Not Boring Movies

Write a SQL query to report the movies with an **odd-numbered ID** and a description that is **not \`'boring'\`**.

Return the result table ordered by \`rating\` in **descending order**.`,
    examples: [
      {
        input: `**Cinema** table:
| id | movie | description | rating |
| :--- | :--- | :--- | :--- |
| 1 | War | great 3D | 8.9 |
| 2 | Science | fiction | 8.5 |
| 3 | irish | boring | 6.2 |
| 4 | Ice song | Fantacy | 8.6 |
| 5 | House card | Interesting | 9.1 |`,
        output: `| id | movie | description | rating |
| :--- | :--- | :--- | :--- |
| 5 | House card | Interesting | 9.1 |
| 1 | War | great 3D | 8.9 |`,
      },
    ],
    constraints: ['id is the primary key column.', 'rating is a 2 decimal place float.'],
    schemas: [
      {
        name: 'Cinema',
        columns: [
          { name: 'id', type: 'INTEGER', nullable: false, isPrimaryKey: true },
          { name: 'movie', type: 'TEXT', nullable: false },
          { name: 'description', type: 'TEXT', nullable: false },
          { name: 'rating', type: 'REAL', nullable: false },
        ],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS Cinema;
      CREATE TABLE Cinema (id INTEGER PRIMARY KEY, movie TEXT, description TEXT, rating REAL);
      INSERT INTO Cinema VALUES 
        (1, 'War', 'great 3D', 8.9),
        (2, 'Science', 'fiction', 8.5),
        (3, 'irish', 'boring', 6.2),
        (4, 'Ice song', 'Fantacy', 8.6),
        (5, 'House card', 'Interesting', 9.1);
    `,
    starter_code: `-- Find odd ID movies that are not boring, sorted by rating DESC
SELECT id, movie, description, rating
FROM Cinema
WHERE id % 2 = 1 AND description != 'boring'
ORDER BY rating DESC;`,
    solution: `SELECT id, movie, description, rating FROM Cinema WHERE id % 2 = 1 AND description != 'boring' ORDER BY rating DESC;`,
    hints: [
      {
        level: 1,
        title: 'Modulo Operator',
        content: 'Check for odd ID using `id % 2 = 1` or `MOD(id, 2) = 1`.',
        inkDropCost: 0,
      },
      {
        level: 2,
        title: 'String Filter & Ordering',
        content: 'Combine `description != \'boring\'` with `ORDER BY rating DESC`.',
        inkDropCost: 5,
      },
      {
        level: 3,
        title: 'Full Query',
        content: `\`\`\`sql
SELECT *
FROM Cinema
WHERE id % 2 = 1 AND description != 'boring'
ORDER BY rating DESC;
\`\`\``,
        inkDropCost: 20,
      },
    ],
    test_cases: [
      {
        id: 'tc_1',
        description: 'Returns 2 movies',
        assertion: 'row_count',
        expected: 2,
      },
      {
        id: 'tc_2',
        description: 'House card is top rated',
        assertion: 'contains_row',
        expected: [5, 'House card', 'Interesting', 9.1],
      },
    ],
    related: ['p007', 'p025', 'p032'],
    source: {
      platform: 'LeetCode',
      externalId: '#620',
      company: 'Amazon',
    },
  },
  {
    id: 'p015',
    slug: 'actors-and-directors-who-cooperated-at-least-three-times',
    title: 'Actor and Director Who Cooperated 3+ Times',
    difficulty: 'pencil',
    track: 'sql',
    tags: ['GROUP BY', 'HAVING', 'COUNT'],
    points: 10,
    status: 'ready',
    description: `### Actors and Directors Who Cooperated at Least Three Times

Write a SQL query for a report that provides the pairs \`(actor_id, director_id)\` where the actor has cooperated with the director **at least three times**.

Return the result table in **any order** with columns \`actor_id\` and \`director_id\`.`,
    examples: [
      {
        input: `**ActorDirector** table:
| actor_id | director_id | timestamp |
| :--- | :--- | :--- |
| 1 | 1 | 0 |
| 1 | 1 | 1 |
| 1 | 1 | 2 |
| 1 | 2 | 3 |
| 1 | 2 | 4 |
| 2 | 1 | 5 |
| 2 | 1 | 6 |`,
        output: `| actor_id | director_id |
| :--- | :--- |
| 1 | 1 |`,
        explanation: 'The only pair with at least 3 collaborations is (1, 1).',
      },
    ],
    constraints: ['timestamp is the primary key column for ActorDirector table.'],
    schemas: [
      {
        name: 'ActorDirector',
        columns: [
          { name: 'actor_id', type: 'INTEGER', nullable: false },
          { name: 'director_id', type: 'INTEGER', nullable: false },
          { name: 'timestamp', type: 'INTEGER', nullable: false, isPrimaryKey: true },
        ],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS ActorDirector;
      CREATE TABLE ActorDirector (actor_id INTEGER, director_id INTEGER, timestamp INTEGER PRIMARY KEY);
      INSERT INTO ActorDirector VALUES 
        (1, 1, 0), (1, 1, 1), (1, 1, 2), (1, 2, 3), (1, 2, 4), (2, 1, 5), (2, 1, 6);
    `,
    starter_code: `-- Find (actor_id, director_id) pairs with 3+ collaborations
SELECT actor_id, director_id
FROM ActorDirector
GROUP BY actor_id, director_id
HAVING COUNT(*) >= 3;`,
    solution: `SELECT actor_id, director_id FROM ActorDirector GROUP BY actor_id, director_id HAVING COUNT(*) >= 3;`,
    hints: [
      {
        level: 1,
        title: 'Multi-Column Grouping',
        content: 'You can group by multiple columns simultaneously: `GROUP BY actor_id, director_id`.',
        inkDropCost: 0,
      },
      {
        level: 2,
        title: 'HAVING Threshold',
        content: 'Use `HAVING COUNT(*) >= 3` to keep pairs with 3 or more entries.',
        inkDropCost: 5,
      },
      {
        level: 3,
        title: 'Full Query',
        content: `\`\`\`sql
SELECT actor_id, director_id
FROM ActorDirector
GROUP BY actor_id, director_id
HAVING COUNT(*) >= 3;
\`\`\``,
        inkDropCost: 20,
      },
    ],
    test_cases: [
      {
        id: 'tc_1',
        description: 'Returns 1 pair',
        assertion: 'row_count',
        expected: 1,
      },
      {
        id: 'tc_2',
        description: 'Contains (1, 1)',
        assertion: 'contains_row',
        expected: [1, 1],
      },
    ],
    related: ['p003', 'p008', 'p038'],
    source: {
      platform: 'LeetCode',
      externalId: '#1050',
      company: 'Amazon',
    },
  },
  {
    id: 'p016',
    slug: 'product-sales-analysis-i',
    title: 'Product Sales Analysis I',
    difficulty: 'pencil',
    track: 'sql',
    tags: ['JOIN', 'INNER JOIN'],
    points: 10,
    status: 'ready',
    description: `### Product Sales Analysis I

Write a SQL query that reports the \`product_name\`, \`year\`, and \`price\` for each \`sale_id\` in the \`Sales\` table.

Return the resulting table in **any order**.`,
    examples: [
      {
        input: `**Sales** table:
| sale_id | product_id | year | quantity | price |
| :--- | :--- | :--- | :--- | :--- |
| 1 | 100 | 2008 | 10 | 5000 |
| 2 | 100 | 2009 | 12 | 5000 |
| 7 | 200 | 2011 | 15 | 9000 |

**Product** table:
| product_id | product_name |
| :--- | :--- |
| 100 | Nokia |
| 200 | Apple |
| 300 | Samsung |`,
        output: `| product_name | year | price |
| :--- | :--- | :--- |
| Nokia | 2008 | 5000 |
| Nokia | 2009 | 5000 |
| Apple | 2011 | 9000 |`,
      },
    ],
    constraints: ['(sale_id, year) is the primary key for Sales table.', 'product_id is foreign key.'],
    schemas: [
      {
        name: 'Sales',
        columns: [
          { name: 'sale_id', type: 'INTEGER', nullable: false },
          { name: 'product_id', type: 'INTEGER', nullable: false },
          { name: 'year', type: 'INTEGER', nullable: false },
          { name: 'quantity', type: 'INTEGER', nullable: false },
          { name: 'price', type: 'INTEGER', nullable: false },
        ],
      },
      {
        name: 'Product',
        columns: [
          { name: 'product_id', type: 'INTEGER', nullable: false, isPrimaryKey: true },
          { name: 'product_name', type: 'TEXT', nullable: false },
        ],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS Sales;
      DROP TABLE IF EXISTS Product;
      CREATE TABLE Sales (sale_id INTEGER, product_id INTEGER, year INTEGER, quantity INTEGER, price INTEGER, PRIMARY KEY(sale_id, year));
      CREATE TABLE Product (product_id INTEGER PRIMARY KEY, product_name TEXT);
      INSERT INTO Sales VALUES (1, 100, 2008, 10, 5000), (2, 100, 2009, 12, 5000), (7, 200, 2011, 15, 9000);
      INSERT INTO Product VALUES (100, 'Nokia'), (200, 'Apple'), (300, 'Samsung');
    `,
    starter_code: `-- Report product_name, year, price for each sale
SELECT p.product_name, s.year, s.price
FROM Sales s
JOIN Product p ON s.product_id = p.product_id;`,
    solution: `SELECT p.product_name, s.year, s.price FROM Sales s JOIN Product p ON s.product_id = p.product_id;`,
    hints: [
      {
        level: 1,
        title: 'Simple Inner Join',
        content: 'Join `Sales` and `Product` on `product_id`.',
        inkDropCost: 0,
      },
      {
        level: 2,
        title: 'Select Requested Columns',
        content: 'Select `p.product_name, s.year, s.price`.',
        inkDropCost: 5,
      },
      {
        level: 3,
        title: 'Full Query',
        content: `\`\`\`sql
SELECT p.product_name, s.year, s.price
FROM Sales s
INNER JOIN Product p ON s.product_id = p.product_id;
\`\`\``,
        inkDropCost: 20,
      },
    ],
    test_cases: [
      {
        id: 'tc_1',
        description: 'Returns 3 sales records',
        assertion: 'row_count',
        expected: 3,
      },
      {
        id: 'tc_2',
        description: 'Includes Apple 2011 price 9000',
        assertion: 'contains_row',
        expected: ['Apple', 2011, 9000],
      },
    ],
    related: ['p001', 'p017', 'p029'],
    source: {
      platform: 'LeetCode',
      externalId: '#1068',
      company: 'Amazon',
    },
  },
  {
    id: 'p017',
    slug: 'project-employees-i',
    title: 'Project Employees I',
    difficulty: 'pencil',
    track: 'sql',
    tags: ['JOIN', 'AVG', 'ROUND', 'GROUP BY'],
    points: 10,
    status: 'ready',
    description: `### Project Employees I

Write an SQL query that reports the **average experience years** of all the employees for each project, **rounded to 2 decimal places**.

Return the result table in **any order** with columns \`project_id\` and \`average_years\`.`,
    examples: [
      {
        input: `**Project** table:
| project_id | employee_id |
| :--- | :--- |
| 1 | 1 |
| 1 | 2 |
| 1 | 3 |
| 2 | 1 |
| 2 | 4 |

**Employee** table:
| employee_id | name | experience_years |
| :--- | :--- | :--- |
| 1 | Khaled | 3 |
| 2 | Ali | 2 |
| 3 | John | 1 |
| 4 | Doe | 2 |`,
        output: `| project_id | average_years |
| :--- | :--- |
| 1 | 2.00 |
| 2 | 2.50 |`,
        explanation: 'Average for project 1 is (3 + 2 + 1) / 3 = 2.00. Average for project 2 is (3 + 2) / 2 = 2.50.',
      },
    ],
    constraints: ['(project_id, employee_id) is the primary key for Project table.'],
    schemas: [
      {
        name: 'Project',
        columns: [
          { name: 'project_id', type: 'INTEGER', nullable: false },
          { name: 'employee_id', type: 'INTEGER', nullable: false },
        ],
      },
      {
        name: 'Employee',
        columns: [
          { name: 'employee_id', type: 'INTEGER', nullable: false, isPrimaryKey: true },
          { name: 'name', type: 'TEXT', nullable: false },
          { name: 'experience_years', type: 'INTEGER', nullable: false },
        ],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS Project;
      DROP TABLE IF EXISTS Employee;
      CREATE TABLE Project (project_id INTEGER, employee_id INTEGER, PRIMARY KEY (project_id, employee_id));
      CREATE TABLE Employee (employee_id INTEGER PRIMARY KEY, name TEXT, experience_years INTEGER);
      INSERT INTO Project VALUES (1, 1), (1, 2), (1, 3), (2, 1), (2, 4);
      INSERT INTO Employee VALUES (1, 'Khaled', 3), (2, 'Ali', 2), (3, 'John', 1), (4, 'Doe', 2);
    `,
    starter_code: `-- Report average experience years per project rounded to 2 decimals
SELECT 
  p.project_id,
  ROUND(AVG(e.experience_years), 2) AS average_years
FROM Project p
JOIN Employee e ON p.employee_id = e.employee_id
GROUP BY p.project_id;`,
    solution: `SELECT p.project_id, ROUND(AVG(e.experience_years), 2) AS average_years FROM Project p JOIN Employee e ON p.employee_id = e.employee_id GROUP BY p.project_id;`,
    hints: [
      {
        level: 1,
        title: 'Join and Group By Project',
        content: 'Join `Project` with `Employee` and group by `project_id`.',
        inkDropCost: 0,
      },
      {
        level: 2,
        title: 'Rounding the Average',
        content: 'Use `ROUND(AVG(e.experience_years), 2) AS average_years`.',
        inkDropCost: 5,
      },
      {
        level: 3,
        title: 'Full Query',
        content: `\`\`\`sql
SELECT 
  p.project_id,
  ROUND(AVG(e.experience_years * 1.0), 2) AS average_years
FROM Project p
JOIN Employee e ON p.employee_id = e.employee_id
GROUP BY p.project_id;
\`\`\``,
        inkDropCost: 20,
      },
    ],
    test_cases: [
      {
        id: 'tc_1',
        description: 'Returns 2 projects',
        assertion: 'row_count',
        expected: 2,
      },
      {
        id: 'tc_2',
        description: 'Project 1 has 2.0 avg years',
        assertion: 'contains_row',
        expected: [1, 2],
      },
      {
        id: 'tc_3',
        description: 'Project 2 has 2.5 avg years',
        assertion: 'contains_row',
        expected: [2, 2.5],
      },
    ],
    related: ['p016', 'p018', 'p031'],
    source: {
      platform: 'LeetCode',
      externalId: '#1075',
      company: 'Facebook / Meta',
    },
  },
  {
    id: 'p018',
    slug: 'queries-quality-and-percentage',
    title: 'Queries Quality and Percentage',
    difficulty: 'pencil',
    track: 'sql',
    tags: ['AVG', 'CASE', 'ROUND', 'GROUP BY'],
    points: 10,
    status: 'ready',
    description: `### Queries Quality and Percentage

We define query \`quality\` as:
> The average of the ratio between query rating and its position.

We also define \`poor_query_percentage\` as:
> The percentage of all queries for this query_name that had rating less than 3.

Write a SQL query to find each \`query_name\`, its \`quality\` rounded to 2 decimal places, and \`poor_query_percentage\` rounded to 2 decimal places.

Return the result table in **any order**.`,
    examples: [
      {
        input: `**Queries** table:
| query_name | result | position | rating |
| :--- | :--- | :--- | :--- |
| Dog | Golden Retriever | 1 | 5 |
| Dog | German Shepherd | 2 | 5 |
| Dog | Mule | 200 | 1 |
| Cat | Shirazi | 5 | 2 |
| Cat | Siamese | 3 | 3 |
| Cat | Sphynx | 7 | 4 |`,
        output: `| query_name | quality | poor_query_percentage |
| :--- | :--- | :--- |
| Dog | 2.50 | 33.33 |
| Cat | 0.66 | 33.33 |`,
        explanation: 'Dog quality: ((5/1) + (5/2) + (1/200)) / 3 = 2.50. Dog poor %: (1 / 3) * 100 = 33.33%.',
      },
    ],
    constraints: ['position is between 1 and 500.', 'rating is between 1 and 5.'],
    schemas: [
      {
        name: 'Queries',
        columns: [
          { name: 'query_name', type: 'TEXT', nullable: false },
          { name: 'result', type: 'TEXT', nullable: false },
          { name: 'position', type: 'INTEGER', nullable: false },
          { name: 'rating', type: 'INTEGER', nullable: false },
        ],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS Queries;
      CREATE TABLE Queries (query_name TEXT, result TEXT, position INTEGER, rating INTEGER);
      INSERT INTO Queries VALUES 
        ('Dog', 'Golden Retriever', 1, 5),
        ('Dog', 'German Shepherd', 2, 5),
        ('Dog', 'Mule', 200, 1),
        ('Cat', 'Shirazi', 5, 2),
        ('Cat', 'Siamese', 3, 3),
        ('Cat', 'Sphynx', 7, 4);
    `,
    starter_code: `-- Calculate quality and poor query percentage per query_name
SELECT 
  query_name,
  ROUND(AVG(rating * 1.0 / position), 2) AS quality,
  ROUND(AVG(CASE WHEN rating < 3 THEN 1.0 ELSE 0.0 END) * 100, 2) AS poor_query_percentage
FROM Queries
GROUP BY query_name;`,
    solution: `SELECT query_name, ROUND(AVG(rating * 1.0 / position), 2) AS quality, ROUND(AVG(CASE WHEN rating < 3 THEN 1.0 ELSE 0.0 END) * 100, 2) AS poor_query_percentage FROM Queries GROUP BY query_name;`,
    hints: [
      {
        level: 1,
        title: 'Ratio Quality',
        content: 'Calculate `AVG(rating * 1.0 / position)` for quality.',
        inkDropCost: 0,
      },
      {
        level: 2,
        title: 'Percentage with CASE WHEN',
        content: 'Use `AVG(CASE WHEN rating < 3 THEN 1.0 ELSE 0.0 END) * 100` to find the poor percentage.',
        inkDropCost: 5,
      },
      {
        level: 3,
        title: 'Full Query',
        content: `\`\`\`sql
SELECT 
  query_name,
  ROUND(AVG(rating * 1.0 / position), 2) AS quality,
  ROUND(AVG(CASE WHEN rating < 3 THEN 100.0 ELSE 0.0 END), 2) AS poor_query_percentage
FROM Queries
GROUP BY query_name;
\`\`\``,
        inkDropCost: 20,
      },
    ],
    test_cases: [
      {
        id: 'tc_1',
        description: 'Returns 2 query names',
        assertion: 'row_count',
        expected: 2,
      },
      {
        id: 'tc_2',
        description: 'Dog has quality 2.50',
        assertion: 'contains_row',
        expected: ['Dog', 2.5, 33.33],
      },
    ],
    related: ['p012', 'p022', 'p035'],
    source: {
      platform: 'LeetCode',
      externalId: '#1211',
      company: 'Facebook / Meta',
    },
  },
  {
    id: 'p019',
    slug: 'immediate-food-delivery-i',
    title: 'Immediate Food Delivery I',
    difficulty: 'pencil',
    track: 'sql',
    tags: ['ROUND', 'AVG', 'CASE WHEN'],
    points: 10,
    status: 'ready',
    description: `### Immediate Food Delivery I

If the customer's preferred delivery date is the same as the order date, then the order is called **immediate**; otherwise, it is called **scheduled**.

Write a SQL query to find the percentage of immediate orders in the table, **rounded to 2 decimal places**.

Return the result with the column name \`immediate_percentage\`.`,
    examples: [
      {
        input: `**Delivery** table:
| delivery_id | customer_id | order_date | customer_pref_delivery_date |
| :--- | :--- | :--- | :--- |
| 1 | 1 | 2019-08-01 | 2019-08-02 |
| 2 | 5 | 2019-08-02 | 2019-08-02 |
| 3 | 1 | 2019-08-11 | 2019-08-11 |
| 4 | 3 | 2019-08-24 | 2019-08-26 |
| 5 | 4 | 2019-08-21 | 2019-08-22 |
| 6 | 2 | 2019-08-11 | 2019-08-13 |`,
        output: `| immediate_percentage |
| :--- |
| 33.33 |`,
        explanation: 'Orders 2 and 3 are immediate (2 out of 6 = 33.33%).',
      },
    ],
    constraints: ['delivery_id is the primary key column.'],
    schemas: [
      {
        name: 'Delivery',
        columns: [
          { name: 'delivery_id', type: 'INTEGER', nullable: false, isPrimaryKey: true },
          { name: 'customer_id', type: 'INTEGER', nullable: false },
          { name: 'order_date', type: 'DATE', nullable: false },
          { name: 'customer_pref_delivery_date', type: 'DATE', nullable: false },
        ],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS Delivery;
      CREATE TABLE Delivery (delivery_id INTEGER PRIMARY KEY, customer_id INTEGER, order_date DATE, customer_pref_delivery_date DATE);
      INSERT INTO Delivery VALUES 
        (1, 1, '2019-08-01', '2019-08-02'),
        (2, 5, '2019-08-02', '2019-08-02'),
        (3, 1, '2019-08-11', '2019-08-11'),
        (4, 3, '2019-08-24', '2019-08-26'),
        (5, 4, '2019-08-21', '2019-08-22'),
        (6, 2, '2019-08-11', '2019-08-13');
    `,
    starter_code: `-- Find the percentage of immediate orders rounded to 2 decimals
SELECT 
  ROUND(AVG(CASE WHEN order_date = customer_pref_delivery_date THEN 100.0 ELSE 0.0 END), 2) AS immediate_percentage
FROM Delivery;`,
    solution: `SELECT ROUND(AVG(CASE WHEN order_date = customer_pref_delivery_date THEN 100.0 ELSE 0.0 END), 2) AS immediate_percentage FROM Delivery;`,
    hints: [
      {
        level: 1,
        title: 'Compare Dates',
        content: 'Check whether `order_date = customer_pref_delivery_date`.',
        inkDropCost: 0,
      },
      {
        level: 2,
        title: 'Average Condition',
        content: '`AVG(order_date = customer_pref_delivery_date) * 100` computes the percentage directly in SQLite.',
        inkDropCost: 5,
      },
      {
        level: 3,
        title: 'Full Query',
        content: `\`\`\`sql
SELECT ROUND(100.0 * SUM(CASE WHEN order_date = customer_pref_delivery_date THEN 1 ELSE 0 END) / COUNT(*), 2) AS immediate_percentage
FROM Delivery;
\`\`\``,
        inkDropCost: 20,
      },
    ],
    test_cases: [
      {
        id: 'tc_1',
        description: 'Returns 1 row',
        assertion: 'row_count',
        expected: 1,
      },
      {
        id: 'tc_2',
        description: 'Returns 33.33',
        assertion: 'contains_row',
        expected: [33.33],
      },
    ],
    related: ['p018', 'p022', 'p071'],
    source: {
      platform: 'LeetCode',
      externalId: '#1174',
      company: 'DoorDash / Uber',
    },
  },
  {
    id: 'p020',
    slug: 'game-play-analysis-i',
    title: 'Game Play Analysis I',
    difficulty: 'pencil',
    track: 'sql',
    tags: ['MIN', 'GROUP BY', 'DATE'],
    points: 10,
    status: 'ready',
    description: `### Game Play Analysis I

Write a SQL query to report the **first login date** for each player.

Return the result table in **any order** with columns \`player_id\` and \`first_login\`.`,
    examples: [
      {
        input: `**Activity** table:
| player_id | device_id | event_date | games_played |
| :--- | :--- | :--- | :--- |
| 1 | 2 | 2016-03-01 | 5 |
| 1 | 2 | 2016-05-02 | 6 |
| 2 | 3 | 2017-06-25 | 1 |
| 3 | 1 | 2016-03-02 | 0 |
| 3 | 4 | 2018-07-03 | 5 |`,
        output: `| player_id | first_login |
| :--- | :--- |
| 1 | 2016-03-01 |
| 2 | 2017-06-25 |
| 3 | 2016-03-02 |`,
      },
    ],
    constraints: ['(player_id, event_date) is the primary key for Activity table.'],
    schemas: [
      {
        name: 'Activity',
        columns: [
          { name: 'player_id', type: 'INTEGER', nullable: false },
          { name: 'device_id', type: 'INTEGER', nullable: false },
          { name: 'event_date', type: 'DATE', nullable: false },
          { name: 'games_played', type: 'INTEGER', nullable: false },
        ],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS Activity;
      CREATE TABLE Activity (player_id INTEGER, device_id INTEGER, event_date DATE, games_played INTEGER, PRIMARY KEY (player_id, event_date));
      INSERT INTO Activity VALUES 
        (1, 2, '2016-03-01', 5),
        (1, 2, '2016-05-02', 6),
        (2, 3, '2017-06-25', 1),
        (3, 1, '2016-03-02', 0),
        (3, 4, '2018-07-03', 5);
    `,
    starter_code: `-- Find the first login date for each player
SELECT 
  player_id,
  MIN(event_date) AS first_login
FROM Activity
GROUP BY player_id;`,
    solution: `SELECT player_id, MIN(event_date) AS first_login FROM Activity GROUP BY player_id;`,
    hints: [
      {
        level: 1,
        title: 'Group By Player',
        content: 'Group by `player_id` and find the earliest date using `MIN(event_date)`.',
        inkDropCost: 0,
      },
      {
        level: 2,
        title: 'Column Alias',
        content: 'Ensure the output column is named `first_login`.',
        inkDropCost: 5,
      },
      {
        level: 3,
        title: 'Full Query',
        content: `\`\`\`sql
SELECT player_id, MIN(event_date) AS first_login
FROM Activity
GROUP BY player_id;
\`\`\``,
        inkDropCost: 20,
      },
    ],
    test_cases: [
      {
        id: 'tc_1',
        description: 'Returns 3 players',
        assertion: 'row_count',
        expected: 3,
      },
      {
        id: 'tc_2',
        description: 'Player 1 first login is 2016-03-01',
        assertion: 'contains_row',
        expected: [1, '2016-03-01'],
      },
    ],
    related: ['p072', 'p145', 'p146'],
    source: {
      platform: 'LeetCode',
      externalId: '#511',
      company: 'Amazon / Microsoft',
    },
  },
];
