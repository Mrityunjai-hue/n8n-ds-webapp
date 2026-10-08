// lib/code/data/problems/p096_p125.ts
import { Problem } from '../../types';

export const PEN_BATCH_2: Problem[] = [
  {
    id: 'p096',
    slug: 'tweets-rolling-averages',
    title: "Tweets' Rolling Averages",
    difficulty: 'pen',
    track: 'sql',
    tags: ['Window Function', 'AVG OVER', 'ROWS BETWEEN'],
    points: 20,
    status: 'ready',
    description: `### Tweets' Rolling Averages

Write a query to calculate the **3-day rolling average of tweets** for each user.

Output the \`user_id\`, \`tweet_date\`, and rolling average of tweet count rounded to **2 decimal places** under column name \`rolling_avg_3d\`.

Order results by \`user_id\` ASC, then \`tweet_date\` ASC.`,
    examples: [
      {
        input: `**tweets** table:
| user_id | tweet_date | tweet_count |
| 111 | 2022-06-01 | 2 |
| 111 | 2022-06-02 | 1 |
| 111 | 2022-06-03 | 3 |
| 111 | 2022-06-04 | 4 |`,
        output: `| user_id | tweet_date | rolling_avg_3d |
| 111 | 2022-06-01 | 2.00 |
| 111 | 2022-06-02 | 1.50 |
| 111 | 2022-06-03 | 2.00 |
| 111 | 2022-06-04 | 2.67 |`,
      },
    ],
    constraints: ['tweet_date is DATE.'],
    schemas: [
      {
        name: 'tweets',
        columns: [
          { name: 'user_id', type: 'INTEGER', nullable: false },
          { name: 'tweet_date', type: 'DATE', nullable: false },
          { name: 'tweet_count', type: 'INTEGER', nullable: false },
        ],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS tweets;
      CREATE TABLE tweets (user_id INTEGER, tweet_date DATE, tweet_count INTEGER);
      INSERT INTO tweets VALUES 
        (111, '2022-06-01', 2),
        (111, '2022-06-02', 1),
        (111, '2022-06-03', 3),
        (111, '2022-06-04', 4);
    `,
    starter_code: `-- Calculate 3-day rolling average of tweets per user
SELECT 
  user_id,
  tweet_date,
  ROUND(AVG(tweet_count * 1.0) OVER (
    PARTITION BY user_id 
    ORDER BY tweet_date 
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
  ), 2) AS rolling_avg_3d
FROM tweets
ORDER BY user_id ASC, tweet_date ASC;`,
    solution: `SELECT user_id, tweet_date, ROUND(AVG(tweet_count * 1.0) OVER (PARTITION BY user_id ORDER BY tweet_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS rolling_avg_3d FROM tweets ORDER BY user_id ASC, tweet_date ASC;`,
    hints: [
      { level: 1, title: 'Partition and Window Frame', content: 'Use `PARTITION BY user_id ORDER BY tweet_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW`.', inkDropCost: 0 },
      { level: 2, title: 'Float division', content: 'Ensure floating point math by multiplying by 1.0 before `AVG`.', inkDropCost: 5 },
      { level: 3, title: 'Full Query', content: `SELECT user_id, tweet_date, ROUND(AVG(tweet_count * 1.0) OVER (PARTITION BY user_id ORDER BY tweet_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS rolling_avg_3d FROM tweets ORDER BY user_id, tweet_date;`, inkDropCost: 20 },
    ],
    test_cases: [
      { id: 'tc_1', description: 'Returns 4 days', assertion: 'row_count', expected: 4 },
      { id: 'tc_2', description: 'Day 4 average is 2.67', assertion: 'contains_row', expected: [111, '2022-06-04', 2.67] },
    ],
    related: ['p067', 'p098', 'p108'],
    source: { platform: 'DataLemur', externalId: "Tweets' Rolling Averages", company: 'Twitter', adaptationNote: 'Adapted, not reproduced' },
  },
  {
    id: 'p098',
    slug: 'photoshop-revenue-growth',
    title: 'Photoshop Revenue Growth',
    difficulty: 'pen',
    track: 'sql',
    tags: ['LAG', 'CTE', 'Window Function'],
    points: 20,
    status: 'ready',
    description: `### Photoshop Revenue Growth

For every customer that bought **Photoshop**, return their \`customer_id\` and the **difference between their total spend in the year they bought Photoshop vs the previous year**.

Order results by \`customer_id\` ASC.`,
    examples: [
      {
        input: `**adobe_transactions**:
| customer_id | product | revenue | year |
| 123 | Photoshop | 50 | 2021 |
| 123 | Premiere | 100 | 2020 |
| 234 | Illustrator | 200 | 2019 |
| 234 | Photoshop | 150 | 2020 |`,
        output: `| customer_id | revenue_diff |
| 123 | -50 |
| 234 | -50 |`,
      },
    ],
    constraints: ['Calculate current_year_spend - previous_year_spend.'],
    schemas: [
      {
        name: 'adobe_transactions',
        columns: [
          { name: 'customer_id', type: 'INTEGER', nullable: false },
          { name: 'product', type: 'TEXT', nullable: false },
          { name: 'revenue', type: 'INTEGER', nullable: false },
          { name: 'year', type: 'INTEGER', nullable: false },
        ],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS adobe_transactions;
      CREATE TABLE adobe_transactions (customer_id INTEGER, product TEXT, revenue INTEGER, year INTEGER);
      INSERT INTO adobe_transactions VALUES 
        (123, 'Photoshop', 50, 2021),
        (123, 'Premiere', 100, 2020),
        (234, 'Illustrator', 200, 2019),
        (234, 'Photoshop', 150, 2020);
    `,
    starter_code: `-- Find revenue difference for Photoshop buyers vs previous year
WITH YearlySpend AS (
  SELECT customer_id, year, SUM(revenue) AS spend
  FROM adobe_transactions
  GROUP BY customer_id, year
),
WithLag AS (
  SELECT 
    customer_id, 
    year, 
    spend,
    LAG(spend) OVER (PARTITION BY customer_id ORDER BY year) AS prev_spend
  FROM YearlySpend
),
PhotoshopYears AS (
  SELECT DISTINCT customer_id, year
  FROM adobe_transactions
  WHERE product = 'Photoshop'
)
SELECT 
  w.customer_id,
  w.spend - w.prev_spend AS revenue_diff
FROM WithLag w
JOIN PhotoshopYears p ON w.customer_id = p.customer_id AND w.year = p.year
ORDER BY w.customer_id ASC;`,
    solution: `WITH YearlySpend AS (SELECT customer_id, year, SUM(revenue) AS spend FROM adobe_transactions GROUP BY customer_id, year), WithLag AS (SELECT customer_id, year, spend, LAG(spend) OVER (PARTITION BY customer_id ORDER BY year) AS prev_spend FROM YearlySpend), PhotoshopYears AS (SELECT DISTINCT customer_id, year FROM adobe_transactions WHERE product = 'Photoshop') SELECT w.customer_id, w.spend - w.prev_spend AS revenue_diff FROM WithLag w JOIN PhotoshopYears p ON w.customer_id = p.customer_id AND w.year = p.year ORDER BY w.customer_id ASC;`,
    hints: [
      { level: 1, title: 'Annual spend CTE', content: 'First calculate total spend per `(customer_id, year)`.', inkDropCost: 0 },
      { level: 2, title: 'LAG function', content: 'Use `LAG(spend) OVER (PARTITION BY customer_id ORDER BY year)` to access prior year spend.', inkDropCost: 5 },
      { level: 3, title: 'Filter on Photoshop year', content: 'Join with the year the customer actually purchased Photoshop.', inkDropCost: 20 },
    ],
    test_cases: [
      { id: 'tc_1', description: 'Returns 2 customers', assertion: 'row_count', expected: 2 },
      { id: 'tc_2', description: 'Customer 123 has diff -50', assertion: 'contains_row', expected: [123, -50] },
    ],
    related: ['p063', 'p096', 'p104'],
    source: { platform: 'DataLemur', externalId: 'Photoshop Revenue Growth', company: 'Adobe', adaptationNote: 'Adapted, not reproduced' },
  },
  {
    id: 'p115',
    slug: 'most-profitable-companies',
    title: 'Most Profitable Companies',
    difficulty: 'pen',
    track: 'sql',
    tags: ['DENSE_RANK', 'ORDER BY', 'LIMIT'],
    points: 20,
    status: 'ready',
    description: `### Most Profitable Companies

Find the **3 most profitable companies** in the world. Output the result along with their corresponding \`company\` name and \`profits\`. Sort the result from the most to the least profitable.`,
    examples: [
      {
        input: `**forbes_global_2010_2014**:
| company | profits |
| ICBC | 42.7 |
| Apple | 37.0 |
| Exxon Mobil | 32.6 |
| JPMorgan | 17.9 |`,
        output: `| company | profits |
| ICBC | 42.7 |
| Apple | 37.0 |
| Exxon Mobil | 32.6 |`,
      },
    ],
    constraints: ['profits is in billions.'],
    schemas: [
      {
        name: 'forbes_global_2010_2014',
        columns: [
          { name: 'company', type: 'TEXT', nullable: false },
          { name: 'profits', type: 'REAL', nullable: false },
        ],
      },
    ],
    seed_sql: `
      DROP TABLE IF EXISTS forbes_global_2010_2014;
      CREATE TABLE forbes_global_2010_2014 (company TEXT, profits REAL);
      INSERT INTO forbes_global_2010_2014 VALUES 
        ('ICBC', 42.7), ('Apple', 37.0), ('Exxon Mobil', 32.6), ('JPMorgan', 17.9);
    `,
    starter_code: `-- Find the top 3 most profitable companies
SELECT company, profits
FROM forbes_global_2010_2014
ORDER BY profits DESC
LIMIT 3;`,
    solution: `SELECT company, profits FROM forbes_global_2010_2014 ORDER BY profits DESC LIMIT 3;`,
    hints: [
      { level: 1, title: 'Simple ORDER BY', content: 'Order by `profits DESC` and take `LIMIT 3`.', inkDropCost: 0 },
      { level: 2, title: 'Rank alternative', content: '`DENSE_RANK() OVER (ORDER BY profits DESC) <= 3`.', inkDropCost: 5 },
      { level: 3, title: 'Full Query', content: `SELECT company, profits FROM forbes_global_2010_2014 ORDER BY profits DESC LIMIT 3;`, inkDropCost: 20 },
    ],
    test_cases: [
      { id: 'tc_1', description: 'Returns 3 companies', assertion: 'row_count', expected: 3 },
      { id: 'tc_2', description: 'Top is ICBC with 42.7', assertion: 'contains_row', expected: ['ICBC', 42.7] },
    ],
    related: ['p062', 'p064', 'p141'],
    source: { platform: 'StrataScratch', externalId: 'Most Profitable Companies', company: 'Forbes', adaptationNote: 'Adapted, not reproduced' },
  },
];
