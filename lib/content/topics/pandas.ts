import { Topic } from '../../types/content';

export const pandasTopics: Topic[] = [
  {
    id: 'pd-intro',
    slug: 'intro',
    title: 'DataFrames & Series',
    description: 'Introduction to the core data structures of Pandas.',
    difficulty: 'Beginner',
    estimatedMinutes: 25,
    sections: {
      what: {
        text: 'Pandas is the go-to library for data manipulation in Python. It introduces two primary data structures: the Series (1D labeled array) and the DataFrame (2D labeled table).\n\nWhile NumPy is fantastic for raw numerical computation, it lacks features for dealing with heterogeneous, real-world data (like tables containing dates, text, and numbers side-by-side). Pandas builds on top of NumPy arrays to create the DataFrame — the Python equivalent of an Excel spreadsheet or a SQL table.\n\nA DataFrame provides a powerful API for data manipulation. You can effortlessly handle missing values (NaN), merge datasets like SQL JOINs, group data by categories, and pivot tables. Behind the scenes, each column in a DataFrame is a Pandas Series, which itself is powered by a NumPy array.',
        eli5: 'A Series is like a single column in an Excel sheet. A DataFrame is the entire Excel sheet itself.',
        points: ['Label-based indexing (loc vs iloc)', 'Handles missing data (NaN) automatically', 'SQL-like operations: merge, groupby, pivot', 'Reads CSV, Excel, JSON, SQL, Parquet']
      },
      why: {
        text: 'Raw data is messy. Pandas provides tools to clean, filter, group, and merge data with just a few lines of code.',
        tip: 'If you can do it in SQL, you can do it in Pandas (and usually faster for smaller datasets).'
      },
      diagram: {
        chart: 'graph TD\n  S["Series (1D)<br/>Col: [10, 20, 30]"] --> D["DataFrame (2D)<br/>Col1 | Col2 | Col3"]\n  D -->|loc/iloc| R[Row Selection]\n  D -->|groupby| G[GroupBy]\n  D -->|merge| M[Merged DF]'
      },
      breakdown: {
        components: [
          { title: 'DataFrame', description: '2D labeled data structure with columns of potentially different types — like a database table.' },
          { title: 'Series', description: '1D labeled array capable of holding any data type. Each DataFrame column is a Series.' },
          { title: 'Index', description: 'Row labels that allow for fast lookup and alignment. Default: 0, 1, 2... Custom: dates, IDs.' }
        ]
      },
      code: {
        code: `import pandas as pd
import numpy as np

# Create DataFrame from dict
data = {
    "name": ["Alice", "Bob", "Charlie", "Diana"],
    "age": [25, 30, 35, 28],
    "salary": [75000, 90000, 110000, 85000],
    "dept": ["Engineering", "Marketing", "Engineering", "HR"]
}
df = pd.DataFrame(data)

# Basic info
print("Shape:", df.shape)        # (4, 4)
print("Dtypes:", df.dtypes)
print("\\nDescriptive stats:")
print(df.describe())             # Count, mean, std, min, max

# Column access
print("\\nSalaries:", df["salary"].tolist())
print("Age mean:", df["age"].mean())

# loc: label-based, iloc: integer-based
print("\\nFirst 2 rows:", df.loc[0:1, ["name", "salary"]])
print("Top-left 2x2:", df.iloc[:2, :2])

# Filtering
high_earners = df[df["salary"] > 85000]
print("\\nHigh earners:")
print(high_earners[["name", "salary"]])`,
        breakdown: [
          { line: 'df.shape', explanation: 'Returns (rows, columns) tuple. First sanity check when loading any dataset.' },
          { line: 'df.describe()', explanation: 'Statistical summary for all numeric columns: count, mean, std, quartiles.' },
          { line: 'df.loc[0:1, ["name", "salary"]]', explanation: 'loc = label-based indexing. Rows 0 to 1 inclusive, specific named columns.' },
          { line: 'df[df["salary"] > 85000]', explanation: 'Boolean mask filtering — the most common way to filter DataFrames.' }
        ]
      },
      examNotes: {
        examNotes: [
          'loc: label-based (inclusive on both ends)',
          'iloc: integer-based (exclusive on stop, like Python slicing)',
          'df.dtypes: check column types (object=string, int64, float64)',
          'df.isnull().sum(): count missing values per column',
          'df.info(): concise summary with dtypes and non-null counts',
          'df.describe(): stats for numeric columns'
        ]
      },
      quiz: {
        quiz: [
          { question: 'What is the difference between loc and iloc?', options: ['No difference', 'loc uses label-based indexing; iloc uses integer position-based indexing', 'loc is faster; iloc is slower', 'loc works on rows; iloc works on columns'], correctIndex: 1, explanation: 'loc[a:b] uses row/column labels and includes both endpoints. iloc[a:b] uses integer positions and follows Python slice convention (exclusive stop).' }
        ]
      }
    },
    interviewQuestions: [
      { question: 'What is the difference between a Series and a DataFrame?', answer: 'A Series is a 1D labeled array — essentially a single column of a DataFrame. A DataFrame is a 2D tabular structure where each column is a Series sharing the same index. DataFrames are the primary data structure for real-world data manipulation in Python.', difficulty: 'Fresher', category: 'Conceptual' }
    ]
  },
  {
    id: 'pd-cleaning',
    slug: 'data-cleaning',
    title: 'Data Cleaning',
    description: 'Handle missing values, duplicates, type conversions, and outliers.',
    difficulty: 'Intermediate',
    estimatedMinutes: 35,
    sections: {
      what: {
        text: 'Data cleaning is the process of identifying and correcting errors, inconsistencies, and missing values in a dataset. Real-world data is almost never perfectly clean — it has missing values, duplicate rows, incorrect data types, inconsistent formatting, and outliers.\n\nMissing data in Pandas is represented as NaN (Not a Number) for numeric columns, or None/pd.NaT for datetime. You have three strategies: (1) Drop — remove rows or columns with missing values (quick but loses data), (2) Fill — replace with a meaningful value like the mean, median, mode, or a forward-fill from the previous value, (3) Interpolate — estimate missing values from surrounding values (good for time series).\n\nDuplicate rows silently inflate statistics and model training data. Always check with df.duplicated() and remove with df.drop_duplicates() at the start of any analysis.',
        eli5: "Data cleaning is like editing a messy essay — fixing typos, removing duplicate sentences, filling in blanks with reasonable guesses, and making sure everything is consistently formatted.",
        tip: 'Always profile your data first: df.info(), df.describe(), df.isnull().sum(). Know the shape and quality of your data before any analysis.'
      },
      code: {
        code: `import pandas as pd
import numpy as np

# Sample messy dataset
df = pd.DataFrame({
    "name": ["Alice", "Bob", None, "Alice", "Eve"],
    "age": [25, None, 35, 25, -5],
    "salary": [75000, 90000, 110000, 75000, 1000000],
    "join_date": ["2022-01-15", "2021-bad", "2023-03-01", "2022-01-15", "2022-07-22"]
})

print("Original shape:", df.shape)
print("Missing values:")
print(df.isnull().sum())

# 1. Fix data types
df["join_date"] = pd.to_datetime(df["join_date"], errors='coerce')  # 'coerce': invalid → NaT

# 2. Handle missing values
df["age"].fillna(df["age"].median(), inplace=True)     # Fill with median
df.dropna(subset=["name"], inplace=True)               # Drop rows where name is missing

# 3. Remove duplicates
print("Duplicates before:", df.duplicated().sum())
df.drop_duplicates(inplace=True)
print("Duplicates after:", df.duplicated().sum())

# 4. Handle outliers with IQR method
Q1 = df["salary"].quantile(0.25)
Q3 = df["salary"].quantile(0.75)
IQR = Q3 - Q1
df = df[(df["salary"] >= Q1 - 1.5*IQR) & (df["salary"] <= Q3 + 1.5*IQR)]

# 5. Remove invalid data
df = df[df["age"] > 0]  # Remove negative ages

print("\\nCleaned shape:", df.shape)
print(df)`,
        breakdown: [
          { line: "pd.to_datetime(df['join_date'], errors='coerce')", explanation: "errors='coerce': invalid date strings become NaT (Not a Time) instead of raising an error." },
          { line: 'df["age"].fillna(df["age"].median())', explanation: 'Replace NaN with the median age. Use median (not mean) when outliers may exist.' },
          { line: 'dropna(subset=["name"])', explanation: 'Drop only rows where the "name" column is missing, not rows with any missing value.' },
          { line: 'Q1 - 1.5*IQR, Q3 + 1.5*IQR', explanation: 'Tukey fence: standard outlier detection rule. Values beyond 1.5× IQR from Q1/Q3 are flagged as outliers.' }
        ]
      },
      examNotes: {
        examNotes: [
          'df.isnull().sum(): count NaN per column',
          'df.dropna(): drop rows with ANY NaN; dropna(subset=cols) for specific cols',
          'df.fillna(value): replace NaN with value, or method="ffill"/"bfill"',
          'df.duplicated().sum(): count duplicate rows',
          'IQR = Q3 - Q1; outliers: < Q1-1.5*IQR or > Q3+1.5*IQR',
          'pd.to_datetime(col, errors="coerce"): parse dates, bad → NaT'
        ]
      }
    },
    interviewQuestions: [
      { question: 'How would you handle missing values in a machine learning pipeline?', answer: 'Strategy depends on context: (1) If <5% missing and MCAR (missing completely at random): drop rows. (2) Numeric: impute with mean/median using SimpleImputer. (3) Categorical: impute with mode or "Unknown" category. (4) Time series: forward-fill or interpolate. (5) Use sklearn Pipeline with SimpleImputer to prevent data leakage. Never impute with statistics from the test set.', difficulty: 'Mid', category: 'Scenario' }
    ]
  },
  {
    id: 'pd-groupby',
    slug: 'groupby-aggregations',
    title: 'GroupBy & Aggregations',
    description: 'Powerful split-apply-combine operations on DataFrames.',
    difficulty: 'Intermediate',
    estimatedMinutes: 30,
    sections: {
      what: {
        text: 'Pandas GroupBy implements the split-apply-combine strategy: (1) Split the DataFrame into groups based on one or more column values, (2) Apply a function to each group independently, (3) Combine the results into a new DataFrame.\n\nThis mirrors SQL\'s GROUP BY + aggregate functions, but with Python\'s full power available in the apply step. You can apply standard aggregation functions (sum, mean, count, std, min, max), multiple aggregations simultaneously with agg(), or completely custom functions with apply().\n\nGroupBy is one of the most-used Pandas operations in real data science work — computing per-segment statistics for a business report, per-category encoding for machine learning, or per-group normalization for preprocessing.',
        eli5: "GroupBy is like sorting students into groups by subject, then calculating the average score for each group separately.",
        tip: 'Use named aggregations (agg with a dictionary) instead of chained operations — it produces cleaner column names and is easier to maintain.'
      },
      code: {
        code: `import pandas as pd

# Sales data
df = pd.DataFrame({
    "region": ["North", "South", "North", "East", "South", "North", "East"],
    "product": ["A", "B", "A", "C", "A", "B", "B"],
    "sales": [100, 200, 150, 300, 120, 180, 250],
    "profit": [30, 60, 45, 90, 36, 54, 75]
})

# Basic groupby: one column
region_sales = df.groupby("region")["sales"].sum()
print("Sales by region:")
print(region_sales)

# Multiple aggregations
stats = df.groupby("region")["sales"].agg(["sum", "mean", "count", "std"])
print("\\nDetailed stats by region:")
print(stats)

# Named aggregations (clean column names)
agg_result = df.groupby("region").agg(
    total_sales=("sales", "sum"),
    avg_profit=("profit", "mean"),
    num_transactions=("sales", "count"),
    max_sale=("sales", "max")
)
print("\\nNamed aggregations:")
print(agg_result)

# Multiple group keys
product_region = df.groupby(["region", "product"])["sales"].sum().reset_index()
print("\\nSales by region & product:")
print(product_region)

# Transform: add group-level stats as a new column
df["region_avg"] = df.groupby("region")["sales"].transform("mean")
df["above_avg"] = df["sales"] > df["region_avg"]
print("\\nWith regional average:")
print(df[["region", "sales", "region_avg", "above_avg"]])`,
        breakdown: [
          { line: 'df.groupby("region")["sales"].sum()', explanation: 'Split by region, take only the sales column, apply sum to each group.' },
          { line: '.agg(["sum", "mean", "count", "std"])', explanation: 'Apply multiple aggregation functions simultaneously — more efficient than running them separately.' },
          { line: 'total_sales=("sales", "sum")', explanation: 'Named aggregation syntax (Python 3.8+): gives the result column a clean, descriptive name.' },
          { line: 'df.groupby("region")["sales"].transform("mean")', explanation: 'transform() returns a Series with the same index as the original DataFrame — adds per-group stats as new columns without collapsing rows.' }
        ]
      },
      examNotes: {
        examNotes: [
          'groupby().agg(): apply functions to each group',
          'transform(): same as agg but returns same-length Series (for new columns)',
          'filter(): remove entire groups based on group-level condition',
          'reset_index(): convert GroupBy result index back to regular columns',
          'size() vs count(): size includes NaN, count excludes NaN',
          'Named aggregations: df.groupby(col).agg(new_name=(col, func))'
        ]
      }
    },
    interviewQuestions: [
      { question: 'What is the difference between agg() and transform() in Pandas?', answer: 'agg() reduces each group to a scalar value, returning a DataFrame with one row per group. transform() returns a value for each original row — the result has the same length as the input DataFrame. Use agg() for summary statistics; use transform() when you need to add per-group statistics as new columns.', difficulty: 'Mid', category: 'Conceptual' }
    ]
  }
,
{
    "id": "merge-join-concat",
    "slug": "pandas-merge-join-concat",
    "title": "Combining DataFrames: Merge, Join & Concat",
    "description": "Learn how to combine multiple DataFrames using merge, join, and concatenate operations in pandas, crucial for data integration and preparation.",
    "difficulty": "Intermediate",
    "estimatedMinutes": 60,
    "tags": [
      "data manipulation",
      "data integration",
      "SQL joins",
      "data preparation"
    ],
    "sections": {
      "what": {
        "text": "When working with real-world data, you often find information spread across multiple tables or files. Pandas provides powerful tools to combine DataFrames: `pd.merge()`, `DataFrame.join()`, and `pd.concat()`. Each method serves a distinct purpose.\n\n`pd.merge()` is primarily used for combining DataFrames based on common columns or indices, similar to SQL JOIN operations. It offers various merge types: 'inner' (default, keeps only matching keys), 'outer' (keeps all keys, fills non-matches with NaN), 'left' (keeps all keys from the left DataFrame), and 'right' (keeps all keys from the right DataFrame). Understanding which type to use is critical for preserving or filtering data.\n\n`DataFrame.join()` is a convenience method for combining DataFrames based on their indices, or a combination of an index and a column. It's often used when one DataFrame's index contains the keys to join on. While `merge()` is more general, `join()` can be more concise for index-based operations.\n\n`pd.concat()` is used for stacking DataFrames either vertically (row-wise, `axis=0`) or horizontally (column-wise, `axis=1`). Unlike `merge()` or `join()`, `concat()` doesn't necessarily look for common keys; it simply appends or adds columns. It's ideal for combining DataFrames that have similar structures (e.g., monthly sales reports for different months) or for adding new columns that are independent of existing key relationships.",
        "eli5": "Imagine you have different lists of toys. 'Merge' is like finding toys that are on BOTH lists and putting them together. You can also say 'show me all toys from list A, and if they are on list B, add that info too'. 'Join' is like doing a 'merge' but only using the special ID number on each toy. 'Concat' is just sticking one list on top of another, or side-by-side, even if the toys are totally different, just making one giant list.",
        "points": [
          "`pd.merge()` combines DataFrames based on common values in one or more columns (keys), similar to SQL JOINs.",
          "Merge types ('inner', 'outer', 'left', 'right') determine which rows are included based on key matches.",
          "`DataFrame.join()` is a convenience for index-based merging, often simpler for common index keys.",
          "`pd.concat()` stacks DataFrames vertically (rows, `axis=0`) or horizontally (columns, `axis=1`), useful for appending data."
        ]
      },
      "code": {
        "code": "import pandas as pd\n\n# Sample DataFrames\ndf1 = pd.DataFrame({\n    'ID': [1, 2, 3, 4],\n    'Name': ['Alice', 'Bob', 'Charlie', 'David'],\n    'City': ['NY', 'LA', 'SF', 'NY']\n})\n\ndf2 = pd.DataFrame({\n    'ID': [1, 3, 5],\n    'Age': [25, 30, 22],\n    'Gender': ['F', 'M', 'F']\n})\n\ndf3 = pd.DataFrame({\n    'Product': ['A', 'B', 'C'],\n    'Price': [10, 20, 30]\n})\n\ndf4 = pd.DataFrame({\n    'Product': ['D', 'E'],\n    'Price': [15, 25]\n})\n\nprint(\"--- df1 ---\")\nprint(df1)\nprint(\"\\n--- df2 ---\")\nprint(df2)\nprint(\"\\n--- df3 ---\")\nprint(df3)\nprint(\"\\n--- df4 ---\")\nprint(df4)\n\n# 1. pd.merge() - Inner Merge (default)\nmerged_inner = pd.merge(df1, df2, on='ID', how='inner')\nprint(\"\\n--- Inner Merge (df1, df2 on ID) ---\")\nprint(merged_inner)\n\n# 2. pd.merge() - Left Merge\nmerged_left = pd.merge(df1, df2, on='ID', how='left')\nprint(\"\\n--- Left Merge (df1, df2 on ID) ---\")\nprint(merged_left)\n\n# 3. df.join() - Index-based join (requires setting index)\ndf1_indexed = df1.set_index('ID')\ndf2_indexed = df2.set_index('ID')\njoined_df = df1_indexed.join(df2_indexed, how='left')\nprint(\"\\n--- Index Join (df1_indexed, df2_indexed) ---\")\nprint(joined_df)\n\n# 4. pd.concat() - Concatenating rows (axis=0)\nconcatenated_rows = pd.concat([df3, df4], axis=0)\nprint(\"\\n--- Concatenated Rows (df3, df4) ---\")\nprint(concatenated_rows)\n\n# 5. pd.concat() - Concatenating columns (axis=1)\n# Create DFs with matching indices for meaningful column concat\ndf_col1 = pd.DataFrame({'A': [1, 2], 'B': [3, 4]})\ndf_col2 = pd.DataFrame({'C': [5, 6], 'D': [7, 8]})\nconcatenated_cols = pd.concat([df_col1, df_col2], axis=1)\nprint(\"\\n--- Concatenated Columns (df_col1, df_col2) ---\")\nprint(concatenated_cols)",
        "breakdown": [
          {
            "line": "df1 = pd.DataFrame(...)",
            "explanation": "Creates the first sample DataFrame with ID, Name, City."
          },
          {
            "line": "df2 = pd.DataFrame(...)",
            "explanation": "Creates the second sample DataFrame with ID, Age, Gender."
          },
          {
            "line": "merged_inner = pd.merge(df1, df2, on='ID', how='inner')",
            "explanation": "Performs an inner merge, combining rows from df1 and df2 where 'ID' values match in both."
          },
          {
            "line": "merged_left = pd.merge(df1, df2, on='ID', how='left')",
            "explanation": "Performs a left merge, keeping all rows from df1 and adding matching data from df2. Non-matches in df2 result in NaN."
          },
          {
            "line": "df1_indexed = df1.set_index('ID')",
            "explanation": "Sets the 'ID' column as the index for df1, required for index-based join."
          },
          {
            "line": "joined_df = df1_indexed.join(df2_indexed, how='left')",
            "explanation": "Performs a left join using the indices of the DataFrames. Similar outcome to left merge on 'ID' here."
          },
          {
            "line": "concatenated_rows = pd.concat([df3, df4], axis=0)",
            "explanation": "Stacks df4 below df3 (row-wise concatenation). `axis=0` is the default."
          },
          {
            "line": "concatenated_cols = pd.concat([df_col1, df_col2], axis=1)",
            "explanation": "Joins df_col2 to the right of df_col1 (column-wise concatenation). `axis=1` is specified."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "Use `pd.merge()` for SQL-like joins on specific columns. Specify `on` for common columns or `left_on`/`right_on` for differently named columns.",
          "Understand `how` parameter for `merge()`: 'inner' (intersection), 'left' (all left, matching right), 'right' (all right, matching left), 'outer' (union).",
          "`df.join()` is convenient for joining DataFrames on their indices. If columns overlap, specify `lsuffix` and `rsuffix`.",
          "`pd.concat()` is for stacking or appending DataFrames. `axis=0` for rows (default), `axis=1` for columns. Use `ignore_index=True` to reset index for row concatenation."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "Which pandas function is best suited for combining two DataFrames based on a common key column, similar to a SQL JOIN?",
            "options": [
              "pd.concat()",
              "df.append()",
              "pd.merge()",
              "df.join()"
            ],
            "correctIndex": 2,
            "explanation": "`pd.merge()` is the primary function for combining DataFrames on common key columns, providing various join types."
          },
          {
            "question": "You have two DataFrames, `df_sales` (columns: OrderID, Product, Quantity) and `df_customers` (columns: CustomerID, Name, OrderID). You want to combine them to see customer names for each order, ensuring all orders from `df_sales` are included, even if a customer isn't found in `df_customers`. Which type of merge should you use?",
            "options": [
              "Inner Merge",
              "Outer Merge",
              "Left Merge",
              "Right Merge"
            ],
            "correctIndex": 2,
            "explanation": "A Left Merge (left DataFrame is `df_sales`) will include all rows from `df_sales` and matching rows from `df_customers`. If an `OrderID` in `df_sales` doesn't have a corresponding `CustomerID` in `df_customers`, the customer columns will be NaN, but the sales record will remain."
          },
          {
            "question": "What is the primary purpose of `pd.concat()` with `axis=1`?",
            "options": [
              "To stack DataFrames row-wise",
              "To perform an inner join on common columns",
              "To combine DataFrames column-wise",
              "To merge DataFrames based on their indices"
            ],
            "correctIndex": 2,
            "explanation": "`pd.concat()` with `axis=1` is used to combine DataFrames by adding them side-by-side, effectively concatenating their columns."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "Explain the difference between `pd.merge()` and `pd.concat()` in pandas. When would you use each?",
        "answer": "`pd.merge()` is used to combine DataFrames based on the values in common columns (or indices), much like SQL JOINs. It's for integrating data based on a logical relationship between entries (e.g., joining orders with customer details using an 'OrderID'). `pd.concat()` is used to stack DataFrames either row-wise (`axis=0`) or column-wise (`axis=1`). It's for combining DataFrames that conceptually represent parts of a larger dataset (e.g., combining monthly sales reports, or adding new feature columns that are aligned by index). You use `merge` for relational joins and `concat` for simple appending/stacking.",
        "difficulty": "Mid",
        "category": "Conceptual"
      },
      {
        "question": "Describe the different types of joins (how='...') available in `pd.merge()` and provide a scenario for each.",
        "answer": "There are four main types of joins:\n1.  **Inner Join (`how='inner'`):** Keeps only rows where the key exists in *both* DataFrames. Scenario: Finding customers who have placed orders, by merging a `customers` table with an `orders` table on `CustomerID`.\n2.  **Left Join (`how='left'`):** Keeps all rows from the *left* DataFrame and matching rows from the right DataFrame. Non-matches from the right are filled with NaNs. Scenario: Listing all products and their sales figures, even if some products haven't sold yet (merging `products` with `sales` on `ProductID`).\n3.  **Right Join (`how='right'`):** Keeps all rows from the *right* DataFrame and matching rows from the left DataFrame. Non-matches from the left are filled with NaNs. Scenario: Similar to left join, but if `sales` was the left table and `products` the right, ensuring all products are listed.\n4.  **Outer Join (`how='outer'`):** Keeps all rows from *both* DataFrames. Non-matches in either DataFrame are filled with NaNs. Scenario: Getting a complete list of all unique customers and all unique products, regardless of whether they have an order or sale, by merging `customers` and `products` (hypothetically, if they had a common key or you were looking for a full union).",
        "difficulty": "Mid",
        "category": "Conceptual"
      }
    ]
  },
  {
    "id": "time-series-pandas",
    "slug": "pandas-time-series",
    "title": "Time Series Analysis with Pandas",
    "description": "Explore pandas' robust capabilities for handling, manipulating, and analyzing time-stamped data, including resampling, shifting, and rolling windows.",
    "difficulty": "Advanced",
    "estimatedMinutes": 75,
    "tags": [
      "time series",
      "datetime",
      "resampling",
      "financial data",
      "data aggregation"
    ],
    "sections": {
      "what": {
        "text": "Time series data, which consists of observations recorded over time, is ubiquitous in many fields, from finance to environmental science. Pandas provides highly optimized and flexible tools for working with `datetime` objects and time-stamped data. The cornerstone of pandas time series capabilities is the `DatetimeIndex`, which allows for powerful operations like slicing by date, frequency conversion, and intelligent alignment.\n\nKey functionalities include `pd.to_datetime()` for converting columns to datetime objects, and setting a `DatetimeIndex`. Once indexed, you can perform `resampling`, which changes the frequency of your time series data (e.g., from daily to monthly averages). `resample()` requires an aggregation function (like `.mean()`, `.sum()`, `.ohlc()`).\n\n`Shifting` (`.shift()`) is used to move data forward or backward in time, often useful for calculating percentage changes or creating lag features. `Rolling windows` (`.rolling()`) allow you to compute statistics over a fixed or expanding window of observations, useful for smoothing data, identifying trends, or calculating moving averages and standard deviations. This helps in understanding local patterns without being overly sensitive to individual data points. Together, these tools make pandas an indispensable library for time series analysis.",
        "eli5": "Imagine you have a diary where you write down the temperature every hour. 'Time series' is just looking at those temperatures in order, from morning to night. 'Resampling' is like summarizing your diary entries: instead of every hour, you might just write down the average temperature for the whole day. 'Shifting' is looking at yesterday's temperature to compare with today's. 'Rolling windows' is like calculating the average temperature for the last 3 hours, and then doing it again for the next 3 hours, to see how hot it's been recently.",
        "points": [
          "Pandas provides `DatetimeIndex` for efficient handling and manipulation of time-stamped data.",
          "`pd.to_datetime()` converts various date/time formats into proper datetime objects.",
          "`resample()` changes the frequency of time series data (e.g., from daily to weekly) and requires an aggregation.",
          "`shift()` moves data points forward or backward in time, useful for lag features or comparisons.",
          "`rolling()` computes statistics over a moving window of data, enabling calculations like moving averages."
        ]
      },
      "code": {
        "code": "import pandas as pd\nimport numpy as np\n\n# 1. Create a time series DataFrame\ndates = pd.date_range(start='2023-01-01', periods=100, freq='D')\ndata = np.random.randn(100).cumsum() + 50\nts_df = pd.DataFrame({'Value': data}, index=dates)\nprint(\"--- Original Daily Time Series ---\")\nprint(ts_df.head())\nprint(ts_df.index)\n\n# 2. Resampling: Daily to Weekly Mean\nweekly_mean = ts_df['Value'].resample('W').mean()\nprint(\"\\n--- Weekly Mean ---\")\nprint(weekly_mean.head())\n\n# 3. Resampling: Daily to Monthly Sum\nmonthly_sum = ts_df['Value'].resample('M').sum()\nprint(\"\\n--- Monthly Sum ---\")\nprint(monthly_sum.head())\n\n# 4. Shifting Data\n# Calculate daily change (today's value - yesterday's value)\nts_df['Value_Shifted'] = ts_df['Value'].shift(1) # shift by 1 period (day)\nts_df['Daily_Change'] = ts_df['Value'] - ts_df['Value'].shift(1)\nprint(\"\\n--- Time Series with Shifted Value and Daily Change ---\")\nprint(ts_df.head())\n\n# 5. Rolling Window Operations: Moving Average\n# Calculate a 7-day rolling mean (weekly moving average)\nts_df['Rolling_Mean_7D'] = ts_df['Value'].rolling(window=7).mean()\n# Calculate a 7-day rolling standard deviation\nts_df['Rolling_Std_7D'] = ts_df['Value'].rolling(window=7).std()\nprint(\"\\n--- Time Series with 7-Day Rolling Mean and Std ---\")\nprint(ts_df.head(10))\n\n# 6. Expanding Window Operations: Cumulative Sum\nts_df['Expanding_Sum'] = ts_df['Value'].expanding().sum()\nprint(\"\\n--- Time Series with Expanding Sum ---\")\nprint(ts_df.head())",
        "breakdown": [
          {
            "line": "dates = pd.date_range(start='2023-01-01', periods=100, freq='D')",
            "explanation": "Generates 100 daily datetime objects starting from '2023-01-01'."
          },
          {
            "line": "ts_df = pd.DataFrame({'Value': data}, index=dates)",
            "explanation": "Creates a DataFrame with a `DatetimeIndex`, representing a daily time series."
          },
          {
            "line": "weekly_mean = ts_df['Value'].resample('W').mean()",
            "explanation": "Resamples the daily data to a weekly frequency, calculating the mean for each week."
          },
          {
            "line": "monthly_sum = ts_df['Value'].resample('M').sum()",
            "explanation": "Resamples the daily data to a monthly frequency, calculating the sum for each month."
          },
          {
            "line": "ts_df['Value_Shifted'] = ts_df['Value'].shift(1)",
            "explanation": "Creates a new column by shifting the 'Value' column down by one period (day), effectively getting the previous day's value."
          },
          {
            "line": "ts_df['Daily_Change'] = ts_df['Value'] - ts_df['Value'].shift(1)",
            "explanation": "Calculates the difference between the current day's value and the previous day's value."
          },
          {
            "line": "ts_df['Rolling_Mean_7D'] = ts_df['Value'].rolling(window=7).mean()",
            "explanation": "Calculates the 7-day rolling mean (moving average) of the 'Value' column. The first 6 values will be NaN."
          },
          {
            "line": "ts_df['Expanding_Sum'] = ts_df['Value'].expanding().sum()",
            "explanation": "Calculates the cumulative sum, where the window expands to include all data points up to the current one."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "Always convert date/time columns to `datetime` objects using `pd.to_datetime()` for full pandas time series functionality.",
          "Set the datetime column as the DataFrame's index (`.set_index()`) to enable `.resample()`, slicing by date, and other time series operations.",
          "`resample()` groups data into time-based bins and requires an aggregation function (e.g., `mean()`, `sum()`, `ohlc()`).",
          "`shift()` moves data along the time axis; use positive numbers for future values (lag) and negative for past values (lead).",
          "`rolling()` creates a rolling window object; specify `window` size. It requires an aggregation method (`mean()`, `std()`, `sum()`, etc.) to be applied to each window."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "Which pandas function is used to change the frequency of time series data (e.g., from daily to monthly)?",
            "options": [
              "df.groupby()",
              "df.aggregate()",
              "df.resample()",
              "df.pivot_table()"
            ],
            "correctIndex": 2,
            "explanation": "`df.resample()` is specifically designed for frequency conversion and aggregation of time series data."
          },
          {
            "question": "You have a Series of daily stock prices. You want to calculate the 30-day moving average. Which method should you use?",
            "options": [
              "df.shift(30).mean()",
              "df.rolling(window=30).mean()",
              "df.resample('M').mean()",
              "df.groupby(pd.Grouper(freq='30D')).mean()"
            ],
            "correctIndex": 1,
            "explanation": "`df.rolling(window=30).mean()` correctly calculates a 30-day moving average by applying the mean function over a 30-period sliding window."
          },
          {
            "question": "What is the primary benefit of using `df.shift(1)` on a time series column?",
            "options": [
              "To calculate the cumulative sum of the series.",
              "To fill missing values with the next available value.",
              "To create a lagged version of the series for comparison or feature engineering.",
              "To convert the series to a different time frequency."
            ],
            "correctIndex": 2,
            "explanation": "`df.shift(1)` moves all data points one period back, effectively creating a lagged version of the series, which is crucial for calculating differences, growth rates, or building time-series models."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "How do you handle time series data in pandas? What are some common operations you would perform?",
        "answer": "To handle time series data in pandas, I first ensure the date/time column is converted to `datetime` objects using `pd.to_datetime()`. Then, I typically set this column as the DataFrame's index using `.set_index()` to enable time series specific functionalities.\nCommon operations include:\n1.  **Resampling:** Changing the frequency of the data (e.g., daily to weekly) using `.resample()` followed by an aggregation function like `.mean()` or `.sum()`.\n2.  **Shifting/Lagging:** Moving data points forward or backward in time using `.shift()` to compare current values with past values or create features for modeling.\n3.  **Rolling Window Calculations:** Computing statistics (e.g., moving average, standard deviation) over a specified sliding window using `.rolling()` to smooth data or identify trends.\n4.  **Time-based Slicing:** Easily selecting data for specific date ranges (e.g., `df['2023-01':'2023-03']`).",
        "difficulty": "Mid",
        "category": "Conceptual"
      },
      {
        "question": "When would you use `resample()` versus `rolling()` for time series aggregation?",
        "answer": "`resample()` is used when you want to change the *frequency* of your time series data and aggregate data within those new time bins. For example, converting daily sales data into monthly sales sums. The bins are fixed and non-overlapping based on the specified frequency.\n`rolling()` is used when you want to compute a statistic over a *sliding window* of a fixed size, moving one step at a time along the time series. This creates a smoothed version of the series or highlights short-term trends. For example, calculating a 7-day moving average of stock prices. The windows overlap, and each point is influenced by its neighbors.",
        "difficulty": "Senior",
        "category": "Conceptual"
      }
    ]
  },
  {
    "id": "categorical-data",
    "slug": "pandas-categorical-data",
    "title": "Optimizing with Categorical Data Types",
    "description": "Understand and apply pandas Categorical data types to improve memory efficiency and speed up operations on columns with a limited number of unique values.",
    "difficulty": "Intermediate",
    "estimatedMinutes": 45,
    "tags": [
      "memory optimization",
      "performance",
      "data types",
      "feature engineering"
    ],
    "sections": {
      "what": {
        "text": "The `Categorical` data type in pandas is a powerful feature for working with columns that contain a limited number of unique, non-numeric values, such as 'gender', 'city', 'product_type', or 'education_level'. By converting such columns from `object` (string) type to `Categorical`, pandas can significantly reduce memory usage and often improve computational performance.\n\nInternally, a `Categorical` Series stores unique values (categories) once and represents each element in the Series as an integer code pointing to its corresponding category. This encoding is much more memory-efficient than storing repeated strings, especially for columns with many duplicate values. For instance, a column with millions of 'Male'/'Female' entries would store 'Male' and 'Female' only twice, with millions of 0s and 1s representing them.\n\nBeyond memory, `Categorical` types can speed up operations like comparisons, sorting, and `groupby()` because pandas can work with the underlying integer codes instead of comparing full strings. It also supports order for categories, which is useful for ordinal data (e.g., 'low', 'medium', 'high'). However, it's not a silver bullet; for columns with many unique values (e.g., IDs, free-form text), `Categorical` might consume more memory than `object` type because it has to store both the unique categories and the integer codes.",
        "eli5": "Imagine you have a big box of colored LEGO bricks, and many of them are red, blue, or yellow. Instead of writing 'red', 'blue', 'yellow' on every single brick, you could just say '1' for red, '2' for blue, '3' for yellow. Then, inside the box, you just store a list of which number each brick is. This saves a lot of space, especially if you have a thousand red bricks! The 'Categorical' type does this for data in pandas.",
        "points": [
          "The `Categorical` data type is for columns with a finite, usually small, number of unique values (categories).",
          "It significantly reduces memory usage by storing unique values once and representing elements as integer codes.",
          "Can improve performance for operations like `groupby()` and sorting.",
          "Supports ordered categories for ordinal data (e.g., 'low' < 'medium' < 'high').",
          "Not suitable for columns with many unique values, as it can sometimes increase memory overhead."
        ]
      },
      "code": {
        "code": "import pandas as pd\nimport numpy as np\n\n# Sample DataFrame with a 'Region' column that could be categorical\ndata = {\n    'Region': ['East', 'West', 'North', 'East', 'South', 'West', 'East', 'North'] * 100000,\n    'Sales': np.random.randint(100, 1000, 800000)\n}\ndf = pd.DataFrame(data)\n\nprint(\"--- Original DataFrame Info (Object Dtype) ---\")\ndf.info(memory_usage='deep')\n\n# Convert 'Region' to Categorical type\ndf['Region'] = df['Region'].astype('category')\n\nprint(\"\\n--- DataFrame Info (Categorical Dtype) ---\")\ndf.info(memory_usage='deep')\n\n# Demonstrate ordering categories\ndf_ordered = pd.DataFrame({\n    'Level': ['Low', 'Medium', 'High', 'Medium', 'Low'],\n    'Score': [10, 20, 30, 25, 15]\n})\n\n# Convert to categorical with explicit order\nlevel_order = ['Low', 'Medium', 'High']\ndf_ordered['Level'] = pd.Categorical(df_ordered['Level'], categories=level_order, ordered=True)\n\nprint(\"\\n--- Ordered Categorical Series ---\")\nprint(df_ordered['Level'])\nprint(\"Is 'Low' < 'Medium'?\", df_ordered['Level'][0] < df_ordered['Level'][1])\n\n# Groupby operation performance (conceptual - actual timing varies)\n# (Uncomment and run if you want to test performance)\n# import time\n# start_time = time.time()\n# df.groupby('Region')['Sales'].mean() # Using categorical\n# end_time = time.time()\n# print(f\"\\nCategorical Groupby time: {end_time - start_time:.4f}s\")\n\n# df_object = df.copy()\n# df_object['Region'] = df_object['Region'].astype('object')\n# start_time = time.time()\n# df_object.groupby('Region')['Sales'].mean() # Using object\n# end_time = time.time()\n# print(f\"Object Groupby time: {end_time - start_time:.4f}s\")",
        "breakdown": [
          {
            "line": "df = pd.DataFrame(data)",
            "explanation": "Creates a large DataFrame with a repeating 'Region' column, initially of `object` (string) dtype."
          },
          {
            "line": "df.info(memory_usage='deep')",
            "explanation": "Prints memory usage details for the DataFrame, showing memory used by the `object` type 'Region' column."
          },
          {
            "line": "df['Region'] = df['Region'].astype('category')",
            "explanation": "Converts the 'Region' column from `object` to `category` dtype."
          },
          {
            "line": "df.info(memory_usage='deep')",
            "explanation": "Prints memory usage again, demonstrating the significant reduction after converting to `category`."
          },
          {
            "line": "level_order = ['Low', 'Medium', 'High']",
            "explanation": "Defines the explicit order for the ordinal categories."
          },
          {
            "line": "df_ordered['Level'] = pd.Categorical(..., ordered=True)",
            "explanation": "Creates a `Categorical` Series with a defined order, allowing for comparison operations between categories."
          },
          {
            "line": "print(\"Is 'Low' < 'Medium'?\", ...)",
            "explanation": "Demonstrates that ordered categorical types support logical comparisons."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "Convert string columns with limited unique values (e.g., less than 50% unique values) to `category` dtype to save memory.",
          "Use `df['col'].astype('category')` or `pd.Categorical()` for conversion.",
          "For ordinal data, explicitly define `categories` and set `ordered=True` when creating the `Categorical` Series to enable logical comparisons.",
          "Be aware that `Categorical` type can sometimes increase memory usage if there are too many unique values or if the Series is small.",
          "Benefits extend to faster `groupby()`, `value_counts()`, and comparison operations."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "Which of the following scenarios is LEAST suitable for using the `Categorical` data type in pandas?",
            "options": [
              "A 'Gender' column with 'Male' and 'Female' values.",
              "A 'Product ID' column with millions of unique alphanumeric IDs.",
              "A 'Month' column with 'January' to 'December' values.",
              "A 'Rating' column with 'Bad', 'Okay', 'Good', 'Excellent' values."
            ],
            "correctIndex": 1,
            "explanation": "A 'Product ID' column with millions of unique values would likely result in minimal or no memory savings, and could potentially increase memory usage, because the overhead of storing the categories themselves would outweigh the benefits of integer encoding for so many unique items."
          },
          {
            "question": "What is the primary advantage of converting a Series from `object` to `Categorical` dtype?",
            "options": [
              "It automatically cleans messy string data.",
              "It enables complex mathematical operations on strings.",
              "It reduces memory usage and can speed up certain operations.",
              "It converts string values into numerical representations for all statistical models."
            ],
            "correctIndex": 2,
            "explanation": "The main benefits are memory efficiency (by storing integer codes instead of repeated strings) and potential performance improvements for operations like `groupby()` and sorting."
          },
          {
            "question": "How can you ensure that the categories in a 'Size' column ('Small', 'Medium', 'Large') maintain a specific order when converted to `Categorical` type?",
            "options": [
              "Use `df['Size'].sort_values().astype('category')`",
              "Set `df['Size'] = pd.Categorical(df['Size'], ordered=True)`",
              "Define `categories=['Small', 'Medium', 'Large']` and `ordered=True` when creating the `Categorical` Series.",
              "Pandas automatically infers the order from the first appearance."
            ],
            "correctIndex": 2,
            "explanation": "To define a specific order for categories, you must explicitly provide the `categories` list in the desired order and set `ordered=True` when creating the `Categorical` Series using `pd.Categorical()`."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "What is the purpose of the `Categorical` data type in pandas, and when should you use it?",
        "answer": "The `Categorical` data type is used for columns that contain a limited, fixed, and discrete set of values, often non-numeric, like 'gender', 'country', or 'education_level'. It's internally stored as an array of integer codes, with a separate array for the unique categories (the actual string values).\nI would use it primarily for two reasons:\n1.  **Memory Optimization:** For columns with many repeated string values, `Categorical` can significantly reduce memory usage by storing unique categories once and mapping values to integer codes.\n2.  **Performance Improvement:** Operations like `groupby()`, `sort_values()`, and comparisons can often be much faster on `Categorical` data because pandas can operate on the underlying integer codes rather than full strings.\nIt's most beneficial when the number of unique categories is small relative to the total number of rows.",
        "difficulty": "Mid",
        "category": "Conceptual"
      },
      {
        "question": "Are there any situations where using `Categorical` data type might not be beneficial or could even be detrimental?",
        "answer": "Yes, there are situations where `Categorical` might not be beneficial:\n1.  **High Cardinality:** If a column has a very large number of unique values (e.g., unique IDs, free-form text), converting to `Categorical` can actually increase memory usage. The overhead of storing the many unique categories might outweigh the savings from integer encoding.\n2.  **Few Duplicates:** If most values in a string column are unique, there's little benefit in encoding, and the `object` dtype might be just as or more efficient.\n3.  **Frequent Mutations:** If categories are frequently added or removed, or the column values change a lot, the overhead of updating the categorical codes and categories can negate performance benefits.\n4.  **Small DataFrames:** For very small DataFrames, the performance and memory gains are negligible, and the added complexity might not be worth it.",
        "difficulty": "Senior",
        "category": "Conceptual"
      }
    ]
  },
  {
    "id": "advanced-indexing-multiindex",
    "slug": "pandas-advanced-indexing-multiindex",
    "title": "Advanced Indexing and MultiIndex Hierarchies",
    "description": "Master advanced data selection techniques using .loc, .iloc, boolean indexing, and delve into the complexities and utility of MultiIndex (hierarchical indexing) for richer data structures.",
    "difficulty": "Advanced",
    "estimatedMinutes": 60,
    "tags": [
      "indexing",
      "data selection",
      "MultiIndex",
      "data reshaping"
    ],
    "sections": {
      "what": {
        "text": "While basic indexing with `[]` brackets is foundational, pandas offers powerful advanced indexing methods like `.loc`, `.iloc`, and boolean indexing for precise and flexible data selection. Understanding these allows for robust data manipulation.\n\n`.loc` is primarily label-based, meaning you use row and column labels (names) for selection. It can take single labels, lists of labels, label slices (inclusive of end label), or boolean arrays. `.iloc` is integer-location based, meaning you use integer positions for selection. It accepts integer positions, lists of integer positions, or integer slices (exclusive of end position), or boolean arrays. Boolean indexing (also called boolean masking) is incredibly versatile, allowing you to select rows (or columns) based on a condition applied to the data itself, returning `True` or `False` for each element.\n\n`MultiIndex`, also known as hierarchical indexing, is a critical feature for handling multi-dimensional data in a 1-dimensional Series or 2-dimensional DataFrame structure. It allows you to have multiple levels of indexes on either the rows or columns. This enables more complex data organization and allows for powerful grouping and aggregation operations that leverage the hierarchical structure. Operations like `stack()` and `unstack()` are instrumental in reshaping DataFrames with a MultiIndex, moving levels between the index and columns. Selecting data from a MultiIndex often involves tuples for specific levels or using `.xs()` for cross-section selection across different levels.",
        "eli5": "Imagine you have a giant spreadsheet. Normal indexing is like saying 'give me row 5' or 'give me column A'.\n'`.loc`' is like saying 'give me the row named 'John' and the column named 'Salary''.\n'`.iloc`' is like saying 'give me the 5th row and the 2nd column'.\n'Boolean indexing' is like saying 'give me all rows where the 'Age' column is greater than 30'.\n'MultiIndex' is like having super-organized sticky notes on your spreadsheet rows. Instead of just one label like 'John', you might have 'Year: 2023, Month: January, Employee: John'. This lets you find data for a specific year, or all data for January, or all data for John, even if he worked in different months and years.",
        "points": [
          "`.loc` is label-based indexing (inclusive of end labels for slices).",
          "`.iloc` is integer-position based indexing (exclusive of end positions for slices).",
          "Boolean indexing selects data based on conditions (e.g., `df[df['col'] > 5]`).",
          "`MultiIndex` provides hierarchical indexing, allowing multiple levels of indexes on rows or columns.",
          "`MultiIndex` facilitates complex data organization and advanced subsetting with tuples and `.xs()`."
        ]
      },
      "code": {
        "code": "import pandas as pd\nimport numpy as np\n\n# Sample DataFrame for .loc, .iloc, boolean indexing\ndf = pd.DataFrame({\n    'A': [1, 2, 3, 4, 5],\n    'B': [10, 20, 30, 40, 50],\n    'C': ['apple', 'banana', 'orange', 'grape', 'apple']\n}, index=['r1', 'r2', 'r3', 'r4', 'r5'])\nprint(\"--- Original DataFrame ---\")\nprint(df)\n\n# 1. .loc - Label-based indexing\nprint(\"\\n--- .loc examples ---\")\nprint(\"Select row 'r3':\\n\", df.loc['r3'])\nprint(\"Select rows 'r2' to 'r4' and column 'B':\\n\", df.loc['r2':'r4', 'B'])\nprint(\"Select specific rows and columns:\\n\", df.loc[['r1', 'r5'], ['A', 'C']])\n\n# 2. .iloc - Integer-location based indexing\nprint(\"\\n--- .iloc examples ---\")\nprint(\"Select 3rd row (index 2):\\n\", df.iloc[2])\nprint(\"Select 2nd to 4th rows (indices 1 to 3) and 2nd column (index 1):\\n\", df.iloc[1:4, 1])\nprint(\"Select specific rows and columns by index:\\n\", df.iloc[[0, 4], [0, 2]])\n\n# 3. Boolean Indexing\nprint(\"\\n--- Boolean Indexing examples ---\")\nprint(\"Rows where 'A' > 3:\\n\", df[df['A'] > 3])\nprint(\"Rows where 'C' is 'apple' and 'B' > 15:\\n\", df[(df['C'] == 'apple') & (df['B'] > 15)])\n\n# 4. MultiIndex (Hierarchical Indexing)\nprint(\"\\n--- MultiIndex examples ---\")\nidx = pd.MultiIndex.from_product([['A', 'B'], [1, 2]], names=['Level1', 'Level2'])\ncols = pd.MultiIndex.from_product([['X', 'Y'], ['P', 'Q']], names=['Metric', 'SubMetric'])\n\ndf_multi = pd.DataFrame(np.random.rand(4, 4), index=idx, columns=cols)\nprint(\"MultiIndexed DataFrame:\\n\", df_multi)\n\n# Select data from MultiIndex\nprint(\"\\nSelect all from Level1 'A':\\n\", df_multi.loc['A'])\nprint(\"\\nSelect specific tuple from MultiIndex (Level1='A', Level2=2):\\n\", df_multi.loc[('A', 2)])\nprint(\"\\nSelect specific column tuple (Metric='X', SubMetric='Q'):\\n\", df_multi.loc[:, ('X', 'Q')])\n\n# Using .xs() for cross-section (more flexible for selecting inner levels)\nprint(\"\\nCross-section for Level2 = 1 (across all Level1):\\n\", df_multi.xs(1, level='Level2'))\n\n# 5. Stack/Unstack with MultiIndex\nprint(\"\\n--- Stack/Unstack examples ---\")\nstacked_df = df_multi.stack(level='SubMetric')\nprint(\"Stacked DataFrame (SubMetric moved to new inner row level):\\n\", stacked_df.head())\nunstacked_df = stacked_df.unstack(level='Level2') # unstack a row level back to columns\nprint(\"\\nUnstacked DataFrame (Level2 moved back to column level):\\n\", unstacked_df.head())",
        "breakdown": [
          {
            "line": "df.loc['r3']",
            "explanation": "Selects the row with index label 'r3'."
          },
          {
            "line": "df.loc['r2':'r4', 'B']",
            "explanation": "Selects rows from 'r2' to 'r4' (inclusive) and the column 'B' by labels."
          },
          {
            "line": "df.iloc[2]",
            "explanation": "Selects the row at integer position 2 (the 3rd row)."
          },
          {
            "line": "df.iloc[1:4, 1]",
            "explanation": "Selects rows from integer position 1 up to (but not including) 4, and the column at integer position 1."
          },
          {
            "line": "df[df['A'] > 3]",
            "explanation": "Boolean indexing: selects rows where the value in column 'A' is greater than 3."
          },
          {
            "line": "idx = pd.MultiIndex.from_product(...)",
            "explanation": "Creates a `MultiIndex` for rows from a Cartesian product of lists."
          },
          {
            "line": "df_multi = pd.DataFrame(..., index=idx, columns=cols)",
            "explanation": "Creates a DataFrame with both a `MultiIndex` for rows and columns."
          },
          {
            "line": "df_multi.loc[('A', 2)]",
            "explanation": "Selects a specific row based on a tuple corresponding to the MultiIndex levels."
          },
          {
            "line": "df_multi.loc[:, ('X', 'Q')]",
            "explanation": "Selects a specific column based on a tuple corresponding to the MultiIndex columns across all rows."
          },
          {
            "line": "df_multi.xs(1, level='Level2')",
            "explanation": "Uses cross-section to select data where 'Level2' of the index is 1, across all 'Level1' values."
          },
          {
            "line": "stacked_df = df_multi.stack(level='SubMetric')",
            "explanation": "Reshapes the DataFrame by moving the 'SubMetric' level from columns to become an inner level of the row `MultiIndex`."
          },
          {
            "line": "unstacked_df = stacked_df.unstack(level='Level2')",
            "explanation": "Reshapes the DataFrame by moving the 'Level2' level from the row `MultiIndex` back to become a column level."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "`loc` uses labels (names) and includes the end label in slices. `iloc` uses integer positions and excludes the end position in slices.",
          "Boolean indexing creates a boolean mask (True/False Series) to select rows/columns based on conditions.",
          "`MultiIndex` allows for hierarchical indexing on rows or columns; ideal for complex tabular data.",
          "Accessing `MultiIndex` elements can be done with tuples (e.g., `df.loc[(level1, level2)]`) or by slicing using `pd.IndexSlice`.",
          "`.xs()` is powerful for selecting data 'across' levels in a `MultiIndex`, specifying the `level` parameter.",
          "`stack()` moves the innermost column level to become the innermost row level, while `unstack()` does the reverse, useful for reshaping data."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "Which of the following would select all rows where `df['Value']` is greater than 100 AND `df['Category']` is 'A'?",
            "options": [
              "`df.loc[(df['Value'] > 100) and (df['Category'] == 'A')]`",
              "`df[(df['Value'] > 100) | (df['Category'] == 'A')]`",
              "`df[(df['Value'] > 100) & (df['Category'] == 'A')]`",
              "`df.iloc[(df['Value'] > 100) & (df['Category'] == 'A')]`"
            ],
            "correctIndex": 2,
            "explanation": "Boolean indexing uses `&` for logical AND and `|` for logical OR. Each condition must be enclosed in parentheses."
          },
          {
            "question": "You have a DataFrame with a `MultiIndex` on rows: `('Year', 'Month')`. How would you select all data for 'March' across all years?",
            "options": [
              "`df.loc[:, 'March']`",
              "`df.iloc[:, 'March']`",
              "`df.xs('March', level='Month')`",
              "`df.loc[(':', 'March')]`"
            ],
            "correctIndex": 2,
            "explanation": "`.xs()` (cross-section) is specifically designed to select data at a particular level from a `MultiIndex`, allowing you to specify the label and the `level` name or integer."
          },
          {
            "question": "What is the key difference in how slicing works for `.loc` versus `.iloc`?",
            "options": [
              "`.loc` uses integers, `.iloc` uses labels.",
              "`.loc` slices are exclusive of the end, `.iloc` slices are inclusive of the end.",
              "`.loc` slices are inclusive of the end, `.iloc` slices are exclusive of the end.",
              "There is no difference in slicing behavior."
            ],
            "correctIndex": 2,
            "explanation": "`.loc` uses label-based slicing which is inclusive of the stop label. `.iloc` uses integer-position based slicing which is exclusive of the stop integer (like standard Python slicing)."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "Explain the difference between `.loc` and `.iloc` in pandas. Provide examples of when you would use each.",
        "answer": "`.loc` is a label-based indexer, used for selection by row and column labels. Slicing with `.loc` is inclusive of the end label. I'd use `.loc` when I know the specific names of rows or columns I want, or when working with descriptive indices like dates or categories. Example: `df.loc['2023-01-01':'2023-01-31', 'Sales']`.\n\n`.iloc` is an integer-location based indexer, used for selection by integer positions. Slicing with `.iloc` is exclusive of the end integer (like standard Python list slicing). I'd use `.iloc` when I need to select data by its absolute position, regardless of its label, or when I want to select the first/last 'n' rows/columns. Example: `df.iloc[0:5, [0, 2]]` to get the first 5 rows and the first and third columns.",
        "difficulty": "Mid",
        "category": "Conceptual"
      },
      {
        "question": "What is a `MultiIndex` in pandas, and how does it help in data analysis? How do you select data from a `MultiIndex` DataFrame?",
        "answer": "A `MultiIndex`, or hierarchical index, allows a pandas Series or DataFrame to have multiple levels of indexing on either the rows or columns. It's like having nested labels, enabling us to represent higher-dimensional data in a 2D structure.\n\nIt's useful for:\n1.  **Organizing Complex Data:** Naturally represents data with multiple categories, like sales by (Region, Product, Month).\n2.  **Advanced Grouping & Aggregation:** Simplifies operations by levels (e.g., sum sales by `Region` then by `Product`).\n3.  **Data Reshaping:** Works with `stack()` and `unstack()` to transform data between 'long' and 'wide' formats.\n\nTo select data from a `MultiIndex` DataFrame, I can use:\n*   **`.loc` with tuples:** For exact matches across levels, e.g., `df.loc[('USA', 'NY')]`.\n*   **Slicers (with `pd.IndexSlice`):** For more complex partial selections, e.g., `idx = pd.IndexSlice; df.loc[idx[:, 'NY'], :]` to get all entries for 'NY' across the second level.\n*   **`.xs()`:** For cross-section selection, especially useful for inner levels, e.g., `df.xs('NY', level='State')`.",
        "difficulty": "Senior",
        "category": "Conceptual"
      }
    ]
  },
  {
    "id": "string-accessor",
    "slug": "pandas-string-accessor",
    "title": "Text Data Manipulation with the .str Accessor",
    "description": "Utilize pandas' powerful `.str` accessor to perform efficient and vectorized string operations on Series containing text data, from cleaning to pattern matching.",
    "difficulty": "Intermediate",
    "estimatedMinutes": 50,
    "tags": [
      "text processing",
      "string manipulation",
      "regex",
      "feature engineering",
      "data cleaning"
    ],
    "sections": {
      "what": {
        "text": "Text data is notoriously messy and requires careful cleaning and transformation before it can be effectively analyzed or used in machine learning models. Pandas provides a dedicated `.str` accessor for Series containing string or object data, which allows you to apply string methods that are common in Python (e.g., `.lower()`, `.strip()`, `.contains()`, `.replace()`) in a vectorized manner. This means you don't need to write explicit loops, leading to more concise and efficient code.\n\nThe `.str` accessor mimics many standard Python string methods and also extends functionality with powerful operations for pattern matching using regular expressions. For instance, `.str.contains()` can check for the presence of a regex pattern, `.str.extract()` can pull out specific parts of strings that match a regex group, and `.str.replace()` can substitute patterns. These capabilities are crucial for tasks like standardizing text, extracting specific information (e.g., numbers, codes), or filtering data based on text content.\n\nWithout `.str`, you would typically have to use `apply(lambda x: x.some_string_method())`, which is often slower and less readable. The `.str` accessor handles missing values (`NaN`) gracefully, returning `NaN` for string methods when applied to non-string elements, which simplifies data cleaning workflows.",
        "eli5": "Imagine you have a list of messy words. Instead of going through each word one by one and fixing it, the `.str` tool in pandas lets you tell all the words at once to 'make yourselves lowercase!' or 'find all words that have the letter 'Q' in them!'. It's like a magical remote control for all your words, making them do things super fast and easily, even if some words are missing or broken.",
        "points": [
          "The `.str` accessor provides vectorized string operations for Series with `object` (string) dtype.",
          "It mimics standard Python string methods (e.g., `lower()`, `strip()`, `split()`) without explicit loops.",
          "Supports regular expressions for advanced pattern matching, extraction, and replacement (`contains()`, `extract()`, `replace()`).",
          "Handles missing values (`NaN`) gracefully, returning `NaN` for operations on non-string elements.",
          "Essential for text data cleaning, standardization, and feature engineering."
        ]
      },
      "code": {
        "code": "import pandas as pd\n\n# Sample DataFrame with text data\ndf = pd.DataFrame({\n    'Product_Name': [\n        '  Apple iPhone 13 Pro (256GB)  ',\n        'Samsung Galaxy S22 Ultra 5G',\n        'Google Pixel 6a',\n        'APPLE WATCH SE 2022',\n        'xiaomi 12 pro',\n        None, # Missing value\n        '  OnePlus 10 Pro (Black)  '\n    ],\n    'Description': [\n        'Latest iPhone model with A15 Bionic chip. Color: Graphite.',\n        'Flagship Android phone with S-Pen. Color: Phantom Black.',\n        'Mid-range phone with Google Tensor chip. Great Camera.',\n        'Smartwatch for fitness and health monitoring.',\n        'High-performance Android with Snapdragon Gen 1. 120Hz display.',\n        None,\n        'Premium Android phone with Hasselblad Camera. RAM: 12GB.'\n    ]\n})\n\nprint(\"--- Original DataFrame ---\")\nprint(df)\n\n# 1. Cleaning: Convert to lowercase and strip whitespace\ndf['Product_Name_Clean'] = df['Product_Name'].str.lower().str.strip()\nprint(\"\\n--- Product_Name after Lowercase and Strip ---\")\nprint(df[['Product_Name', 'Product_Name_Clean']])\n\n# 2. Filtering/Checking: Check for 'apple' in product names\ndf['Is_Apple'] = df['Product_Name_Clean'].str.contains('apple', na=False)\nprint(\"\\n--- Products containing 'apple' ---\")\nprint(df[df['Is_Apple']])\n\n# 3. Splitting: Extract brand from product name (simple split)\ndf['Brand_Simple'] = df['Product_Name_Clean'].str.split(' ').str[0]\nprint(\"\\n--- Extracted Brand (Simple Split) ---\")\nprint(df[['Product_Name_Clean', 'Brand_Simple']])\n\n# 4. Extracting with Regex: Get storage size in GB/TB from Product_Name\n# Regex: Look for one or more digits (\\d+), followed by 'GB' or 'TB' (GB|TB) in a non-capturing group (?:...) after a space (\\s)\npattern_storage = r'(\\d+)\\s*(GB|TB)'\ndf[['Storage_Size', 'Storage_Unit']] = df['Product_Name'].str.extract(pattern_storage, expand=True)\nprint(\"\\n--- Extracted Storage Size and Unit with Regex ---\")\nprint(df[['Product_Name', 'Storage_Size', 'Storage_Unit']])\n\n# 5. Replacing with Regex: Replace 'iPhone' with 'iOS Phone' in Description\ndf['Description_Modified'] = df['Description'].str.replace('iPhone', 'iOS Phone', regex=True)\nprint(\"\\n--- Description with 'iPhone' replaced ---\")\nprint(df[['Description', 'Description_Modified']])",
        "breakdown": [
          {
            "line": "df['Product_Name'].str.lower().str.strip()",
            "explanation": "Applies `.lower()` to convert all text to lowercase, then `.strip()` to remove leading/trailing whitespace, all in a vectorized way."
          },
          {
            "line": "df['Product_Name_Clean'].str.contains('apple', na=False)",
            "explanation": "Creates a boolean Series: `True` if 'apple' is in the cleaned product name, `False` otherwise. `na=False` treats NaN as False."
          },
          {
            "line": "df['Product_Name_Clean'].str.split(' ').str[0]",
            "explanation": "Splits each string by space, then takes the first element of the resulting list, effectively getting the first word (often the brand)."
          },
          {
            "line": "pattern_storage = r'(\\d+)\\s*(GB|TB)'",
            "explanation": "Defines a regular expression to capture one or more digits (storage size) followed by 'GB' or 'TB' (storage unit)."
          },
          {
            "line": "df['Product_Name'].str.extract(pattern_storage, expand=True)",
            "explanation": "Extracts groups from the regex pattern into new columns. `expand=True` creates separate columns for each capturing group."
          },
          {
            "line": "df['Description'].str.replace('iPhone', 'iOS Phone', regex=True)",
            "explanation": "Replaces all occurrences of 'iPhone' with 'iOS Phone' in the 'Description' column, using regex for the pattern matching."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "Always use the `.str` accessor for string operations on pandas Series; avoid `apply` with lambda for performance reasons.",
          "Common cleaning methods include `.str.lower()`, `.str.upper()`, `.str.strip()`, `.str.replace()`, `.str.capitalize()`.",
          "`.str.contains()` is vital for checking substring presence; use `regex=True` for regular expressions and `na=False/True` to handle missing values.",
          "`.str.extract(pattern)` is powerful for parsing structured information from text using capturing groups in regex.",
          "`.str.split(delimiter).str[index]` is useful for splitting strings and selecting specific parts.",
          "Remember to handle `NaN` values, as string operations on `None` or `NaN` will result in `NaN`."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "You have a Series of movie titles, and you want to convert all of them to uppercase. Which is the most efficient pandas method?",
            "options": [
              "`df['Title'].apply(lambda x: x.upper())`",
              "`df['Title'].str.upper()`",
              "`[title.upper() for title in df['Title']]`",
              "`df['Title'].map(str.upper)`"
            ],
            "correctIndex": 1,
            "explanation": "The `.str` accessor provides vectorized string methods that are highly optimized and generally more efficient than `apply()` or list comprehensions for Series-wide string operations."
          },
          {
            "question": "You have a column 'Address' and want to extract the 5-digit zip code from it. Which `.str` method combined with regex would be most suitable?",
            "options": [
              "`df['Address'].str.contains(r'\\d{5}')`",
              "`df['Address'].str.split(r'\\s').str[-1]`",
              "`df['Address'].str.replace(r'[^\\d]', '')`",
              "`df['Address'].str.extract(r'(\\d{5})')`"
            ],
            "correctIndex": 3,
            "explanation": "`.str.extract()` is designed to pull out specific patterns (defined by capturing groups in regex) into new columns, making it ideal for extracting the 5-digit zip code."
          },
          {
            "question": "What is the behavior of `.str` methods when encountering a `NaN` value in a Series?",
            "options": [
              "It raises an error.",
              "It skips the `NaN` value and continues with valid strings.",
              "It returns `NaN` for that position.",
              "It converts `NaN` to an empty string before applying the method."
            ],
            "correctIndex": 2,
            "explanation": "Pandas `.str` accessor methods are designed to handle missing values (NaN) gracefully; they simply return `NaN` at the corresponding position in the output Series."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "What is the `.str` accessor in pandas, and why is it important for working with text data?",
        "answer": "The `.str` accessor in pandas is a special attribute available on Series objects when their dtype is `object` (which typically holds strings). It provides a vectorized way to apply string methods to every element in the Series, just like you would to a single Python string.\n\nIt's crucial for text data because:\n1.  **Vectorization:** It eliminates the need for explicit loops, making operations significantly faster and more memory-efficient than `apply()` for most string tasks.\n2.  **Conciseness:** It makes code much cleaner and easier to read.\n3.  **Regex Support:** It integrates powerful regular expression capabilities for complex pattern matching, extraction (`.str.extract()`), and replacement (`.str.replace()`).\n4.  **Missing Value Handling:** It gracefully handles `NaN` values, returning `NaN` for non-string entries without raising errors.\nIt's essential for data cleaning, standardization, and feature engineering from text.",
        "difficulty": "Mid",
        "category": "Conceptual"
      },
      {
        "question": "You have a column `Comments` containing free-form text. You need to identify comments that mention either 'bug' or 'error' (case-insensitive) and extract the entire sentence where it occurs. How would you approach this using the `.str` accessor?",
        "answer": "To achieve this, I'd follow these steps:\n1.  **Normalize Case:** Convert the `Comments` column to lowercase first using `df['Comments'].str.lower()` to handle case-insensitivity.\n2.  **Identify Mentions:** Use `df['Comments'].str.contains(r'(bug|error)', case=False, na=False, regex=True)` to create a boolean mask identifying rows that contain either 'bug' or 'error'. `case=False` makes it case-insensitive, and `regex=True` allows for the 'or' operator `|`.\n3.  **Extract Sentence (if needed):** If the goal is to extract the *entire sentence* containing the match, that's more complex than a simple `.str` method. `.str.extract()` can extract a *pattern*, but not necessarily the full sentence containing it without a more sophisticated regex that defines a sentence. A common approach for this is to combine `.str.findall()` or `.str.extractall()` with a regex pattern that matches sentences (e.g., `r'[^.!?]*?(bug|error)[^.!?]*?[.!?]'`) and then filter or expand the results. Alternatively, one might iterate over the filtered sentences and apply a `re.search` or `re.findall` for more granular extraction of the sentence containing the keyword.",
        "difficulty": "Senior",
        "category": "Conceptual"
      }
    ]
  },
  {
    "id": "pandas-data-io",
    "slug": "data-io-with-pandas",
    "title": "Data Ingestion & Export: Reading and Writing Diverse Formats",
    "description": "Master how to efficiently load data from and save data to various file formats like CSV, Excel, SQL, JSON, Parquet, and HDF5 using pandas, including handling large datasets and specifying data types.",
    "difficulty": "Intermediate",
    "estimatedMinutes": 60,
    "tags": [
      "IO",
      "Data Loading",
      "CSV",
      "Excel",
      "SQL",
      "Parquet",
      "JSON",
      "HDF5"
    ],
    "sections": {
      "what": {
        "text": "Pandas provides a rich set of functions for interacting with various data sources, making it a cornerstone for data science workflows. The `read_` family of functions (e.g., `read_csv`, `read_excel`, `read_sql`, `read_json`, `read_parquet`, `read_hdf`) allows seamless data ingestion, while the corresponding `to_` methods (e.g., `to_csv`, `to_excel`, `to_sql`, `to_json`, `to_parquet`, `to_hdf`) facilitate data export. Each format has distinct characteristics and ideal use cases. For instance, CSV is human-readable and universal but lacks metadata and type enforcement. Excel is common for small, structured data but less performant for large datasets. SQL databases offer robust data management and query capabilities. Binary formats like Parquet and HDF5 are highly efficient for large datasets, offering faster read/write speeds and reduced file sizes, especially due to columnar storage (Parquet) or hierarchical structures (HDF5). Understanding key parameters like `dtype` for explicit type specification, `parse_dates` for correct date handling, and `chunksize` for memory-efficient loading of very large files is crucial for effective and robust data handling.",
        "eli5": "Imagine your data is a storybook. Pandas helps you open different kinds of books (like a plain notebook, a fancy photo album, or a digital scroll) and also write your own stories into them, choosing the best type of book for your story. It even helps you read really long books chapter by chapter so you don't get overwhelmed!",
        "points": [
          "Pandas offers functions to read and write common data formats (CSV, Excel, SQL, JSON, Parquet, HDF5).",
          "Each format has specific use cases and performance characteristics; binary formats like Parquet and HDF5 are ideal for large datasets.",
          "Key parameters like `dtype`, `parse_dates`, and `chunksize` are essential for efficient and correct I/O operations.",
          "Database interaction requires setting up an engine and executing SQL queries.",
          "Understanding memory management is vital when loading large files."
        ]
      },
      "code": {
        "code": "import pandas as pd\nimport numpy as np\nfrom sqlalchemy import create_engine\n\n# Sample DataFrame\ndf = pd.DataFrame({\n    'col_int': [1, 2, 3, 4, 5],\n    'col_float': [1.1, 2.2, 3.3, 4.4, 5.5],\n    'col_str': ['A', 'B', 'C', 'D', 'E'],\n    'col_date': pd.to_datetime(['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05'])\n})\n\nprint(\"Original DataFrame:\\n\", df)\nprint(\"\\nOriginal DataFrame info:\")\ndf.info()\n\n# --- 1. CSV I/O ---\n# Write to CSV\ndf.to_csv('sample_data.csv', index=False) # index=False prevents writing DataFrame index as a column\n\n# Read from CSV, specifying dtypes and parsing dates\ndf_from_csv = pd.read_csv(\n    'sample_data.csv',\n    dtype={'col_int': np.int8, 'col_float': np.float32},\n    parse_dates=['col_date']\n)\nprint(\"\\nDataFrame from CSV:\\n\", df_from_csv)\nprint(\"\\nDataFrame from CSV info:\")\ndf_from_csv.info()\n\n# --- 2. Excel I/O ---\n# Write to Excel\ndf.to_excel('sample_data.xlsx', index=False, sheet_name='Sheet1')\n\n# Read from Excel\ndf_from_excel = pd.read_excel('sample_data.xlsx', sheet_name='Sheet1')\nprint(\"\\nDataFrame from Excel:\\n\", df_from_excel)\n\n# --- 3. SQL I/O ---\n# Create an in-memory SQLite database engine\nengine = create_engine('sqlite:///:memory:')\n\n# Write to SQL table\ndf.to_sql('sample_table', engine, index=False, if_exists='replace')\n\n# Read from SQL table\ndf_from_sql = pd.read_sql('sample_table', engine)\nprint(\"\\nDataFrame from SQL:\\n\", df_from_sql)\n\n# --- 4. Parquet I/O (requires 'pyarrow' or 'fastparquet' installed) ---\n# Write to Parquet\ndf.to_parquet('sample_data.parquet', index=False)\n\n# Read from Parquet\ndf_from_parquet = pd.read_parquet('sample_data.parquet')\nprint(\"\\nDataFrame from Parquet:\\n\", df_from_parquet)\n\n# --- 5. HDF5 I/O (requires 'pytables' installed) ---\n# Write to HDF5\ndf.to_hdf('sample_data.h5', key='df_key', mode='w')\n\n# Read from HDF5\ndf_from_hdf = pd.read_hdf('sample_data.h5', key='df_key')\nprint(\"\\nDataFrame from HDF5:\\n\", df_from_hdf)\n\n# --- 6. Reading large CSV in chunks ---\n# Create a larger dummy CSV for chunking demonstration\nlarge_df = pd.DataFrame(np.random.randint(0, 100, size=(10000, 4)), columns=list('ABCD'))\nlarge_df.to_csv('large_sample.csv', index=False)\n\n# Read in chunks\nchunk_list = []\nfor chunk in pd.read_csv('large_sample.csv', chunksize=1000):\n    # Process each chunk (e.g., filter, aggregate)\n    chunk_list.append(chunk)\n\ndf_from_chunks = pd.concat(chunk_list, ignore_index=True)\nprint(f\"\\nDataFrame from chunks (first 5 rows):\\n{df_from_chunks.head()}\")\n\n# Clean up generated files\nimport os\nos.remove('sample_data.csv')\nos.remove('sample_data.xlsx')\nos.remove('sample_data.parquet')\nos.remove('sample_data.h5')\nos.remove('large_sample.csv')",
        "breakdown": [
          {
            "line": "df = pd.DataFrame({...})",
            "explanation": "Creates a sample pandas DataFrame to use for I/O demonstrations."
          },
          {
            "line": "df.to_csv('sample_data.csv', index=False)",
            "explanation": "Saves the DataFrame to a CSV file. `index=False` prevents writing the DataFrame's index as a column."
          },
          {
            "line": "df_from_csv = pd.read_csv('sample_data.csv', dtype={'col_int': np.int8, ...}, parse_dates=['col_date'])",
            "explanation": "Reads data from a CSV file. `dtype` explicitly sets column data types for memory efficiency, and `parse_dates` ensures specified columns are loaded as datetime objects."
          },
          {
            "line": "df.to_excel('sample_data.xlsx', index=False, sheet_name='Sheet1')",
            "explanation": "Saves the DataFrame to an Excel file, specifying the sheet name."
          },
          {
            "line": "df_from_excel = pd.read_excel('sample_data.xlsx', sheet_name='Sheet1')",
            "explanation": "Reads data from a specific sheet in an Excel file."
          },
          {
            "line": "engine = create_engine('sqlite:///:memory:')",
            "explanation": "Creates a SQLAlchemy engine for connecting to a database (here, an in-memory SQLite database)."
          },
          {
            "line": "df.to_sql('sample_table', engine, index=False, if_exists='replace')",
            "explanation": "Writes the DataFrame to a SQL table. `if_exists='replace'` will overwrite the table if it already exists."
          },
          {
            "line": "df_from_sql = pd.read_sql('sample_table', engine)",
            "explanation": "Reads data from a SQL table using the established database engine."
          },
          {
            "line": "df.to_parquet('sample_data.parquet', index=False)",
            "explanation": "Saves the DataFrame to a Parquet file, a columnar storage format optimized for large datasets and performance."
          },
          {
            "line": "df_from_parquet = pd.read_parquet('sample_data.parquet')",
            "explanation": "Reads data from a Parquet file."
          },
          {
            "line": "df.to_hdf('sample_data.h5', key='df_key', mode='w')",
            "explanation": "Saves the DataFrame to an HDF5 file, a binary format for storing hierarchical data. A `key` is required to identify the DataFrame within the HDF5 file."
          },
          {
            "line": "df_from_hdf = pd.read_hdf('sample_data.h5', key='df_key')",
            "explanation": "Reads data from a specific key within an HDF5 file."
          },
          {
            "line": "for chunk in pd.read_csv('large_sample.csv', chunksize=1000):",
            "explanation": "Demonstrates reading a large CSV file in smaller, manageable chunks, which is crucial for datasets larger than available memory."
          },
          {
            "line": "df_from_chunks = pd.concat(chunk_list, ignore_index=True)",
            "explanation": "After processing individual chunks, they are concatenated back into a single DataFrame if needed."
          },
          {
            "line": "import os; os.remove(...)",
            "explanation": "Cleans up the temporary files created during the demonstration."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "Understand the default `sep` (delimiter) for `read_csv` (comma) and how to change it.",
          "Know when to use `index_col` to set a specific column as the DataFrame index upon reading.",
          "`parse_dates` is crucial for correct date/time column interpretation.",
          "`chunksize` in `read_csv` and `read_sql` allows processing large files without loading them entirely into memory.",
          "For `to_sql`, remember the `if_exists` parameter (`'fail'`, `'replace'`, `'append'`) to control behavior when the table already exists.",
          "Parquet and HDF5 are generally preferred for performance and storage efficiency with large numerical datasets over CSV/Excel."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "Which parameter in `pd.read_csv()` would you use to prevent a very large file from consuming all your system's RAM?",
            "options": [
              "`header`",
              "`nrows`",
              "`chunksize`",
              "`skiprows`"
            ],
            "correctIndex": 2,
            "explanation": "`chunksize` allows reading the file in smaller, manageable pieces, preventing out-of-memory errors for large files."
          },
          {
            "question": "You have a DataFrame and want to save it to an Excel file, specifically on a sheet named 'Report'. Which method and parameter combination would you use?",
            "options": [
              "`df.to_csv('report.xlsx', sheet='Report')`",
              "`df.to_excel('report.xlsx', sheet_name='Report')`",
              "`pd.to_excel(df, 'report.xlsx', sheet='Report')`",
              "`df.save_excel('report.xlsx', sheet_name='Report')`"
            ],
            "correctIndex": 1,
            "explanation": "The correct method is `df.to_excel()` and the parameter to specify the sheet name is `sheet_name`."
          },
          {
            "question": "When saving a DataFrame to a SQL database table using `to_sql()`, which `if_exists` option ensures that if the table already exists, the new DataFrame data is added to it without deleting the old data?",
            "options": [
              "`'replace'`",
              "`'fail'`",
              "`'append'`",
              "`'create'`"
            ],
            "correctIndex": 2,
            "explanation": "The `'append'` option will add new rows to an existing table. `'replace'` overwrites, and `'fail'` raises an error if the table exists."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "How would you load a very large CSV file (e.g., 50GB) into pandas without running out of memory?",
        "answer": "For a 50GB CSV file, loading it entirely into RAM is likely impossible. I would use `pd.read_csv()` with the `chunksize` parameter. This reads the file in iterations, returning a `TextFileReader` object that yields DataFrames of the specified `chunksize`. I would then process each chunk (e.g., filter, aggregate, or save to a more efficient format like Parquet) before either combining the processed chunks or storing the results incrementally. Another approach, especially if the data type of columns is known, is to specify `dtype` explicitly to reduce memory usage, or consider using libraries like Dask for out-of-core processing.",
        "difficulty": "Mid",
        "category": "Conceptual"
      },
      {
        "question": "Compare and contrast CSV, Parquet, and HDF5 formats in the context of pandas I/O, highlighting their ideal use cases.",
        "answer": "CSV is a plain-text, human-readable format, universal and easy to share. However, it lacks schema enforcement, requires parsing types on read, and is not optimized for large datasets, making I/O slower. It's ideal for small, simple data exchange.\n\nParquet is a columnar binary format, highly efficient for large datasets. It supports schema evolution, data compression, and predicate pushdown (reading only necessary columns/rows), leading to faster reads and smaller file sizes. It's excellent for analytical workloads and data lakes where query performance and storage efficiency are critical.\n\nHDF5 is a hierarchical binary format that can store diverse datasets and metadata in a single file, organized like a filesystem. It's fast for random access and efficient for large numerical arrays. It's suitable for complex, scientific datasets or when you need to store multiple pandas objects (DataFrames, Series) within a single file, particularly for time series data or numerical simulations.",
        "difficulty": "Mid",
        "category": "Conceptual"
      }
    ]
  },
  {
    "id": "pandas-reshaping-pivoting",
    "slug": "reshaping-pivoting-data-pandas",
    "title": "Reshaping and Pivoting Data: From Wide to Long and Back",
    "description": "Learn to transform the structure of your DataFrames using powerful pandas functions like pivot, pivot_table, stack, unstack, and melt to prepare data for analysis or visualization.",
    "difficulty": "Intermediate",
    "estimatedMinutes": 45,
    "tags": [
      "Reshaping",
      "Pivoting",
      "Stack",
      "Unstack",
      "Melt",
      "Data Transformation"
    ],
    "sections": {
      "what": {
        "text": "Data often comes in various shapes, and reshaping it is a fundamental step in data preparation for analysis or visualization. Pandas provides powerful tools to transform data between 'wide' and 'long' formats. Wide format typically has each subject in a single row, with different attributes in separate columns. Long format has multiple rows per subject, with one column indicating the attribute type and another column holding its value.\n\n`pivot()` is used to reshape a DataFrame based on column values. It requires unique combinations of `index` and `columns` values; otherwise, it will raise an error. `pivot_table()` is a more flexible and commonly used alternative that extends `pivot` by allowing aggregation of duplicate entries using an `aggfunc`. This is incredibly useful for summarizing data. `melt()` is the primary function for transforming a DataFrame from wide format to long format, useful for preparing data for plotting libraries like Seaborn which often prefer long format data.\n\nConversely, `stack()` and `unstack()` are specialized for working with MultiIndex DataFrames (or Series). `stack()` 'pivots' a level from the columns to the inner-most level of the index, effectively transforming data from a wide to a long format. `unstack()` does the opposite, pivoting a level from the index to the column labels, transforming data from long to wide. Mastering these functions enables flexible data manipulation to suit any analytical requirement.",
        "eli5": "Imagine you have a list of all your toys, and for each toy, you wrote down its color, size, and type. Reshaping is like deciding if you want a list where each toy is a row and its details are columns (wide), or if you want a list where each toy's detail (e.g., 'red', 'big', 'car') is a separate row (long). Pandas helps you switch between these ways of organizing!",
        "points": [
          "Data can be represented in 'wide' or 'long' formats, each suitable for different analysis types.",
          "`pivot()` reshapes a DataFrame based on column values, requiring unique combinations of index and columns.",
          "`pivot_table()` is a more flexible version of `pivot()`, allowing aggregation of duplicate entries using an `aggfunc`.",
          "`melt()` transforms a DataFrame from wide format to long format, typically for visualization.",
          "`stack()` and `unstack()` are used for transposing levels in MultiIndex DataFrames, moving levels between the index and columns."
        ]
      },
      "code": {
        "code": "import pandas as pd\nimport numpy as np\n\n# Sample Data: Sales data in a 'long' format\ndata_long = pd.DataFrame({\n    'Date': ['2023-01-01', '2023-01-01', '2023-01-02', '2023-01-02', '2023-01-01'],\n    'Region': ['East', 'West', 'East', 'West', 'East'],\n    'Product': ['A', 'A', 'B', 'B', 'B'],\n    'Sales': [100, 150, 200, 120, 70]\n})\n\nprint(\"Original Long Data:\\n\", data_long)\n\n# --- 1. pivot_table: Long to Wide (with aggregation) ---\n# Get total sales per Date and Region, with products as columns\npivoted_sales = data_long.pivot_table(\n    values='Sales',\n    index='Date',\n    columns='Region',\n    aggfunc='sum' # Aggregate if multiple entries for Date/Region/Product exist\n)\nprint(\"\\n1. Pivoted Sales (Date as index, Region as columns, sum of Sales):\\n\", pivoted_sales)\n\n# More complex pivot_table with multiple value columns and index/columns\npivoted_multi = data_long.pivot_table(\n    values=['Sales'],\n    index=['Date', 'Product'], # MultiIndex for rows\n    columns='Region',\n    aggfunc={'Sales': 'sum'}\n)\nprint(\"\\n2. Pivoted Multi-level (Date & Product as index, Region as columns):\\n\", pivoted_multi)\n\n# --- 2. melt: Wide to Long ---\n# Create a wide DataFrame for melting demonstration\ndata_wide = pd.DataFrame({\n    'City': ['New York', 'Los Angeles'],\n    'Jan_Temp': [30, 55],\n    'Feb_Temp': [35, 60],\n    'Jan_Rain': [5, 2],\n    'Feb_Rain': [4, 3]\n})\n\nprint(\"\\nOriginal Wide Data:\\n\", data_wide)\n\nmelted_data = data_wide.melt(\n    id_vars=['City'],\n    value_vars=['Jan_Temp', 'Feb_Temp', 'Jan_Rain', 'Feb_Rain'],\n    var_name='Metric_Month',\n    value_name='Value'\n)\nprint(\"\\n3. Melted Data (wide to long):\\n\", melted_data)\n\n# Often you want to separate 'Metric' and 'Month'\nmelted_data[['Metric', 'Month']] = melted_data['Metric_Month'].str.split('_', expand=True)\nmelted_data = melted_data.drop(columns='Metric_Month')\nprint(\"\\n3a. Melted Data (with split Metric and Month):\\n\", melted_data)\n\n# --- 3. stack/unstack (requires MultiIndex) ---\n# Use the pivoted_multi DataFrame from earlier, which has a MultiIndex\nstacked_data = pivoted_multi.stack()\nprint(\"\\n4. Stacked Data (Region from columns to inner index level):\\n\", stacked_data)\n\nunstacked_data = stacked_data.unstack(level='Product') # Unstack the 'Product' level from index back to columns\nprint(\"\\n5. Unstacked Data (Product from index to columns):\\n\", unstacked_data)\n\n# Unstacking multiple levels\nunstacked_multi_level = stacked_data.unstack(level=[0,1]) # Unstack 'Date' and 'Product' from index\nprint(\"\\n6. Unstacked Data (multiple levels from index to columns):\\n\", unstacked_multi_level)\n",
        "breakdown": [
          {
            "line": "data_long = pd.DataFrame({...})",
            "explanation": "Creates a sample 'long' format DataFrame representing sales data for demonstration."
          },
          {
            "line": "pivoted_sales = data_long.pivot_table(values='Sales', index='Date', columns='Region', aggfunc='sum')",
            "explanation": "Uses `pivot_table` to transform the 'long' sales data into a 'wide' format. 'Date' becomes the index, 'Region' values become new columns, and 'Sales' values are aggregated (summed) where multiple entries exist for a given Date and Region."
          },
          {
            "line": "pivoted_multi = data_long.pivot_table(values=['Sales'], index=['Date', 'Product'], columns='Region', aggfunc={'Sales': 'sum'})",
            "explanation": "Demonstrates `pivot_table` with a MultiIndex for rows and a single aggregation function for a specific value column."
          },
          {
            "line": "data_wide = pd.DataFrame({...})",
            "explanation": "Creates a sample 'wide' format DataFrame with city temperatures and rainfall for demonstration."
          },
          {
            "line": "melted_data = data_wide.melt(id_vars=['City'], value_vars=['Jan_Temp', ...], var_name='Metric_Month', value_name='Value')",
            "explanation": "Transforms the `data_wide` DataFrame from wide to long format using `melt`. `id_vars` specifies columns to keep as identifiers, `value_vars` specifies columns to unpivot, and `var_name`/`value_name` set the names for the new 'variable' and 'value' columns."
          },
          {
            "line": "melted_data[['Metric', 'Month']] = melted_data['Metric_Month'].str.split('_', expand=True)",
            "explanation": "Further cleans the melted data by splitting the combined 'Metric_Month' column into separate 'Metric' and 'Month' columns using the `.str.split()` accessor."
          },
          {
            "line": "stacked_data = pivoted_multi.stack()",
            "explanation": "Applies `stack()` to the `pivoted_multi` DataFrame. This moves the outermost column level ('Region') into the innermost index level, resulting in a Series with a MultiIndex."
          },
          {
            "line": "unstacked_data = stacked_data.unstack(level='Product')",
            "explanation": "Applies `unstack()` to the `stacked_data`. This moves the 'Product' level from the index back into the columns, reversing part of the stacking operation."
          },
          {
            "line": "unstacked_multi_level = stacked_data.unstack(level=[0,1])",
            "explanation": "Demonstrates unstacking multiple levels of the MultiIndex simultaneously back into columns."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "`pivot()` requires unique (index, columns) pairs; `pivot_table()` handles non-unique pairs via `aggfunc`.",
          "`melt()` is primarily for converting wide to long format, specifying `id_vars` and `value_vars`.",
          "`stack()` moves column levels to the index; `unstack()` moves index levels to columns.",
          "Both `stack()` and `unstack()` are particularly useful when dealing with MultiIndex DataFrames or Series.",
          "Choosing between `pivot` and `pivot_table` depends on whether aggregation is needed for duplicate entries."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "Which pandas function is most appropriate for converting a 'wide' DataFrame (where different metrics are in separate columns) into a 'long' DataFrame (where metrics become rows with a column indicating metric type)?",
            "options": [
              "`pivot()`",
              "`pivot_table()`",
              "`melt()`",
              "`stack()`"
            ],
            "correctIndex": 2,
            "explanation": "`melt()` is specifically designed for transforming a DataFrame from wide to long format, making it ideal for preparing data for certain types of analysis or visualization tools."
          },
          {
            "question": "You have sales data with 'Date', 'Product', and 'Sales'. You want to create a table showing 'Date' as the index, 'Product' as columns, and the sum of 'Sales' for each cell. Which function should you use?",
            "options": [
              "`df.pivot(index='Date', columns='Product', values='Sales')`",
              "`df.pivot_table(index='Date', columns='Product', values='Sales', aggfunc='sum')`",
              "`df.melt(id_vars=['Date', 'Product'], value_vars=['Sales'])`",
              "`df.groupby(['Date', 'Product'])['Sales'].sum().unstack()`"
            ],
            "correctIndex": 1,
            "explanation": "`pivot_table` is the correct choice because it allows for aggregation (`aggfunc='sum'`) which is necessary if there are multiple sales entries for the same Date and Product. `pivot` would fail if duplicates existed."
          },
          {
            "question": "What is the primary effect of calling the `.stack()` method on a DataFrame with a MultiIndex in its columns?",
            "options": [
              "It converts the DataFrame into a Series by moving the outermost index level to the columns.",
              "It moves one or more column levels into the innermost level of the DataFrame's index.",
              "It aggregates data across multiple columns based on a specified function.",
              "It flattens the DataFrame by removing all MultiIndex levels from both rows and columns."
            ],
            "correctIndex": 1,
            "explanation": "`stack()` transforms column levels into index levels, effectively reshaping the DataFrame from a wider to a longer format by moving columns to the index."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "Explain the difference between `pivot` and `pivot_table` in pandas, and provide a scenario where you would choose one over the other.",
        "answer": "`pivot` is a simpler reshaping function that can only be used when there are no duplicate index/columns pairs. If the combination of values for the specified `index` and `columns` results in more than one entry, `pivot` will raise an error.\n`pivot_table`, on the other hand, is more powerful and flexible. It can handle duplicate index/columns pairs by applying an `aggfunc` (aggregation function like `sum`, `mean`, `count`, etc.) to combine the values. You would choose `pivot` when you're certain that your chosen `index` and `columns` combinations are unique. You would choose `pivot_table` when duplicates might exist or when you need to perform an aggregation during the reshaping process, which is often the case in real-world data.",
        "difficulty": "Mid",
        "category": "Conceptual"
      },
      {
        "question": "When would you use `melt` versus `stack` in pandas, and how do they differ in their primary purpose?",
        "answer": "`melt` is primarily used to transform a DataFrame from a 'wide' format to a 'long' format. Its main purpose is to take one or more columns that represent different measurements (variables) and unpivot them into rows, creating a new column for the variable name and another for its value. This is often done to prepare data for statistical modeling or visualization libraries (like Seaborn) that prefer data in a 'tidy' (long) format.\n`stack`, conversely, is designed for working with MultiIndex DataFrames or Series. It 'pivots' the innermost column level(s) of a DataFrame (or outermost in a Series) into the innermost row index level, effectively reducing the number of columns and increasing the number of rows and index levels. While it also converts data from wide to long, its mechanism is tied to the hierarchical structure of a MultiIndex, and it's more about transposing existing index/column levels rather than unpivoting a set of value columns as `melt` does.",
        "difficulty": "Senior",
        "category": "Conceptual"
      }
    ]
  },
  {
    "id": "pandas-window-functions",
    "slug": "advanced-window-functions",
    "title": "Advanced Window Functions: Rolling, Expanding, and Exponentially Weighted Operations",
    "description": "Explore pandas' powerful window functions like rolling, expanding, and exponentially weighted moving operations to calculate statistics over defined data subsets, crucial for time series and trend analysis.",
    "difficulty": "Advanced",
    "estimatedMinutes": 50,
    "tags": [
      "Window Functions",
      "Rolling",
      "Expanding",
      "EWM",
      "Time Series",
      "Financial Analysis"
    ],
    "sections": {
      "what": {
        "text": "Window functions in pandas allow you to apply operations over a 'window' of data, enabling calculations that depend on preceding, succeeding, or current rows. These are indispensable for time series analysis, financial modeling, and any task requiring local data aggregations or transformations. Pandas offers three primary types of window objects:\n\n1.  **`rolling()`**: This creates a fixed-size window that 'rolls' or slides across the data. For each point, the function operates on the `n` preceding (and optionally, succeeding) data points. Common uses include calculating moving averages, moving sums, or moving standard deviations, which help smooth out short-term fluctuations and highlight longer-term trends. Key parameters include `window` (the size of the moving window) and `min_periods` (the minimum number of observations in a window required to have a value).\n\n2.  **`expanding()`**: Unlike `rolling()`, an expanding window grows with the data. For each point, the function operates on all data points from the start of the series up to the current point. This is useful for cumulative calculations, such as cumulative sum, cumulative product, or tracking statistics over the entire history of the data up to the current moment.\n\n3.  **`ewm()` (Exponentially Weighted Moving)**: Exponentially weighted functions give more weight to recent observations and less weight to older ones, with the influence decaying exponentially. This is particularly useful when recent data is considered more relevant or predictive, common in financial analysis and forecasting. The decay is controlled by parameters like `span`, `halflife`, or `com` (center of mass), all of which relate to how quickly the weights decrease.",
        "eli5": "Imagine you're tracking your daily step count. A 'rolling' window is like looking at your average steps over the last 7 days, every single day – the window slides. An 'expanding' window is like looking at your average steps since you started walking – the window keeps growing. And 'exponentially weighted' is like giving more importance to what you did yesterday than what you did last month when calculating your average, because recent steps might be more relevant to your current fitness.",
        "points": [
          "Window functions apply operations over a defined subset (window) of data.",
          "`rolling()` creates a fixed-size, sliding window for local aggregations like moving averages.",
          "`expanding()` uses a window that grows from the start of the data up to the current point, useful for cumulative statistics.",
          "`ewm()` (Exponentially Weighted Moving) prioritizes recent data by assigning exponentially decreasing weights to older observations.",
          "Common methods include `.mean()`, `.sum()`, `.std()`, and `.apply()` for custom functions.",
          "Parameters like `window`, `min_periods`, and `halflife`/`span` control the behavior of these window objects."
        ]
      },
      "code": {
        "code": "import pandas as pd\nimport numpy as np\n\n# Sample Data: Daily stock prices\ndates = pd.to_datetime(pd.date_range(start='2023-01-01', periods=15))\nnp.random.seed(42)\nprices = np.random.normal(loc=100, scale=5, size=15).cumsum() + 50\ndf = pd.DataFrame({'Price': prices}, index=dates)\n\nprint(\"Original Data:\\n\", df)\n\n# --- 1. Rolling Window Functions ---\n# Calculate a 3-day rolling mean (moving average)\ndf['Rolling_Mean_3D'] = df['Price'].rolling(window=3).mean()\n# Calculate a 3-day rolling sum, requiring at least 2 periods to calculate\ndf['Rolling_Sum_3D_min2'] = df['Price'].rolling(window=3, min_periods=2).sum()\n# Calculate a 3-day rolling standard deviation, centered window\ndf['Rolling_Std_3D_Centered'] = df['Price'].rolling(window=3, center=True).std()\n\nprint(\"\\n1. Rolling Window Calculations:\\n\", df)\n\n# --- 2. Expanding Window Functions ---\n# Calculate an expanding mean (cumulative mean)\ndf['Expanding_Mean'] = df['Price'].expanding().mean()\n# Calculate an expanding sum (cumulative sum)\ndf['Expanding_Sum'] = df['Price'].expanding(min_periods=1).sum()\n\nprint(\"\\n2. Expanding Window Calculations:\\n\", df.loc[:, ['Price', 'Expanding_Mean', 'Expanding_Sum']])\n\n# --- 3. Exponentially Weighted Moving (EWM) Functions ---\n# Calculate EWM mean with a span of 3\ndf['EWM_Mean_Span3'] = df['Price'].ewm(span=3).mean()\n# Calculate EWM standard deviation with a halflife of 2 days\ndf['EWM_Std_Halflife2'] = df['Price'].ewm(halflife='2 days').std()\n\nprint(\"\\n3. EWM Window Calculations:\\n\", df.loc[:, ['Price', 'EWM_Mean_Span3', 'EWM_Std_Halflife2']])\n\n# --- 4. Combining with GroupBy ---\n# Example: Rolling mean for multiple groups (e.g., different stock tickers)\n# Create dummy data for multiple groups\nm_df = pd.DataFrame({\n    'Ticker': ['A'] * 5 + ['B'] * 5,\n    'Date': pd.to_datetime(pd.date_range(start='2023-01-01', periods=5).tolist() * 2),\n    'Price': np.random.rand(10) * 100\n})\n\nm_df['Rolling_Mean_Ticker'] = m_df.groupby('Ticker')['Price'].rolling(window=3, min_periods=1).mean().reset_index(level=0, drop=True)\nprint(\"\\n4. Rolling Mean per Ticker:\\n\", m_df)\n",
        "breakdown": [
          {
            "line": "df = pd.DataFrame({'Price': prices}, index=dates)",
            "explanation": "Creates a sample DataFrame with 'Price' indexed by 'Date', simulating time-series data."
          },
          {
            "line": "df['Rolling_Mean_3D'] = df['Price'].rolling(window=3).mean()",
            "explanation": "Calculates a 3-period (e.g., 3-day) rolling mean. Each value is the average of the current and the two preceding prices. Initial values will be NaN until enough data points are available."
          },
          {
            "line": "df['Rolling_Sum_3D_min2'] = df['Price'].rolling(window=3, min_periods=2).sum()",
            "explanation": "Calculates a 3-period rolling sum, but requires at least 2 observations (`min_periods=2`) in the window to produce a non-NaN result. This handles cases where the window is not yet full."
          },
          {
            "line": "df['Rolling_Std_3D_Centered'] = df['Price'].rolling(window=3, center=True).std()",
            "explanation": "Calculates a 3-period rolling standard deviation, with `center=True` meaning the window is centered around the current data point (using data before and after)."
          },
          {
            "line": "df['Expanding_Mean'] = df['Price'].expanding().mean()",
            "explanation": "Calculates the expanding mean. For each point, it averages all data points from the start of the series up to the current point. This is a cumulative mean."
          },
          {
            "line": "df['Expanding_Sum'] = df['Price'].expanding(min_periods=1).sum()",
            "explanation": "Calculates the expanding sum, allowing the first value to be non-NaN if at least 1 period is present. This is a cumulative sum."
          },
          {
            "line": "df['EWM_Mean_Span3'] = df['Price'].ewm(span=3).mean()",
            "explanation": "Calculates the exponentially weighted moving mean with a `span` of 3. `span` relates to the decay, where higher `span` values give more weight to older observations."
          },
          {
            "line": "df['EWM_Std_Halflife2'] = df['Price'].ewm(halflife='2 days').std()",
            "explanation": "Calculates the exponentially weighted moving standard deviation with a `halflife` of 2 days. `halflife` specifies the period over which an observation's weight decays to half."
          },
          {
            "line": "m_df.groupby('Ticker')['Price'].rolling(window=3, min_periods=1).mean().reset_index(level=0, drop=True)",
            "explanation": "Demonstrates applying a rolling window function within groups. `groupby('Ticker')` creates groups, then `rolling()` is applied to 'Price' within each group. `reset_index(level=0, drop=True)` is used to align the result back to the original DataFrame's index."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "`rolling()` windows have a fixed size; `expanding()` windows grow.",
          "`ewm()` weights recent data more heavily; its decay is controlled by `span`, `halflife`, or `com`.",
          "`min_periods` is crucial for handling initial `NaN` values in window calculations, especially at the start of a series.",
          "The `center` parameter for `rolling()` determines if the window is left-aligned (default) or centered.",
          "Window functions can be chained with `groupby()` for group-wise calculations."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "Which pandas window function would you use to calculate the cumulative sum of a series?",
            "options": [
              "`df.rolling().sum()`",
              "`df.expanding().sum()`",
              "`df.ewm().sum()`",
              "`df.groupby().sum()`"
            ],
            "correctIndex": 1,
            "explanation": "`expanding().sum()` calculates the cumulative sum, where the window grows from the beginning of the series up to the current point."
          },
          {
            "question": "What is the primary characteristic of an Exponentially Weighted Moving Average (EWMA) compared to a Simple Moving Average (SMA)?",
            "options": [
              "EWMA uses a fixed number of past observations, while SMA uses all past observations.",
              "EWMA gives equal weight to all observations in its window, while SMA weights recent observations more heavily.",
              "EWMA gives more weight to recent observations, while SMA gives equal weight to all observations in its window.",
              "EWMA requires a larger `window` parameter than SMA to achieve similar smoothing."
            ],
            "correctIndex": 2,
            "explanation": "EWMA assigns exponentially decreasing weights to older observations, making recent data more influential, whereas SMA gives equal weight to all observations within its defined window."
          },
          {
            "question": "In a `rolling()` window calculation, what does the `min_periods` parameter control?",
            "options": [
              "The maximum number of periods to include in the window.",
              "The minimum number of non-NaN observations required in a window to return a value.",
              "The period after which the window starts to expand.",
              "The frequency at which the window slides across the data."
            ],
            "correctIndex": 1,
            "explanation": "`min_periods` sets the minimum number of valid (non-NaN) observations within a window required for a calculation to be performed; otherwise, the result is `NaN`."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "When would you prefer an exponentially weighted moving average (EWMA) over a simple moving average (SMA) in time series analysis?",
        "answer": "I would prefer an EWMA over an SMA when recent observations are expected to be more relevant or predictive than older ones. For instance, in financial markets, the latest price movements often hold more predictive power for future prices than events from months ago. EWMA captures this by assigning exponentially decreasing weights to older observations, making it more responsive to recent changes while still providing some smoothing. SMA, by contrast, gives equal weight to all observations within its window, which can make it slower to react to new trends or changes in volatility.",
        "difficulty": "Mid",
        "category": "Conceptual"
      },
      {
        "question": "Describe a scenario where `expanding()` would be more appropriate than `rolling()` for a data calculation.",
        "answer": "An `expanding()` window is ideal for calculating cumulative statistics or when you need to understand how a metric evolves over the entire history of the data up to a given point. For example, if I want to track the 'all-time average' or 'total cumulative return' of an investment portfolio from its inception, `expanding().mean()` or `expanding().sum()` would be perfectly suited. In contrast, `rolling()` is better for local trends, like a 30-day moving average, where you're only interested in the recent fixed-size segment of data, not the entire history.",
        "difficulty": "Mid",
        "category": "Conceptual"
      }
    ]
  },
  {
    "id": "pandas-performance-optimization",
    "slug": "pandas-performance-best-practices",
    "title": "Performance Best Practices and Handling Large Datasets in Pandas",
    "description": "Discover techniques to write faster pandas code and manage memory effectively when working with large datasets, covering vectorization, data type optimization, and strategies for out-of-memory operations.",
    "difficulty": "Advanced",
    "estimatedMinutes": 60,
    "tags": [
      "Performance",
      "Optimization",
      "Large Data",
      "Vectorization",
      "Memory Management",
      "Dask"
    ],
    "sections": {
      "what": {
        "text": "Optimizing pandas performance is critical for efficient data processing, especially with large datasets. The cornerstone of performance in pandas is **vectorization**. Whenever possible, prefer built-in pandas or NumPy vectorized operations over explicit Python `for` loops or row-wise iteration (`.iterrows()`). Vectorized operations are implemented in C/Cython and are significantly faster. While `.apply()`, `.map()`, and `.applymap()` are better than `for` loops, they are generally slower than true vectorized operations.\n\n**Memory management** is equally important. Pandas often uses `float64` and `int64` by default, which can be overkill for many datasets. Explicitly downcasting data types (e.g., `int8`, `float32`, `category`) can dramatically reduce memory footprint and improve performance. Use `df.info(memory_usage='deep')` to inspect memory usage.\n\nFor **datasets larger than RAM**, pandas alone isn't sufficient. Strategies include:\n1.  **Chunking**: Reading data in smaller parts using `chunksize` in `pd.read_csv()`.\n2.  **Efficient Storage Formats**: Using binary formats like Parquet or HDF5, which are optimized for read/write speed and compression.\n3.  **Out-of-core Libraries**: Tools like Dask DataFrames provide a familiar pandas-like API but can operate on datasets that don't fit into memory by parallelizing computations and managing data lazily. Using `df.eval()` and `df.query()` can also provide performance boosts for certain string-based expressions by leveraging the NumExpr library.",
        "eli5": "Imagine you have a huge pile of papers to sort. Doing it one by one is super slow. Pandas is like having a machine that sorts whole stacks at once (that's vectorization!). Sometimes, you also need to pick the smallest size of paper clip to save space (that's choosing the right data type). And if the pile is too big for your desk, you either sort it in smaller batches (chunking), put it in a really efficient filing cabinet (Parquet), or send it to a bigger office with more workers (Dask)!",
        "points": [
          "Prioritize vectorized operations (pandas/NumPy) over Python `for` loops and `.iterrows()` for speed.",
          "Optimize memory by explicitly setting appropriate data types (`int8`, `float32`, `category`) for columns.",
          "`df.info(memory_usage='deep')` helps diagnose memory consumption.",
          "For datasets larger than RAM, use chunking (e.g., `pd.read_csv(chunksize=...)`) or efficient binary storage formats (Parquet).",
          "Consider libraries like Dask for true out-of-core processing of massive datasets.",
          "`df.eval()` and `df.query()` can accelerate certain element-wise and filtering operations."
        ]
      },
      "code": {
        "code": "import pandas as pd\nimport numpy as np\nimport time\n\n# --- 1. Vectorization vs. Loops/Apply ---\n# Create a large DataFrame\ndata_size = 1000000\ndf = pd.DataFrame({\n    'A': np.random.rand(data_size),\n    'B': np.random.rand(data_size),\n    'C': np.random.randint(1, 100, data_size)\n})\n\nprint(\"--- Vectorization vs. Loops/Apply ---\")\n\n# Method 1: Python Loop (Slow)\nstart_time = time.time()\nresult_loop = []\nfor index, row in df.iterrows():\n    result_loop.append(row['A'] * row['B'] + row['C'])\nduration_loop = time.time() - start_time\nprint(f\"Python Loop: {duration_loop:.4f} seconds\")\n\n# Method 2: .apply() (Better than loop, but not best)\nstart_time = time.time()\nresult_apply = df.apply(lambda row: row['A'] * row['B'] + row['C'], axis=1)\nduration_apply = time.time() - start_time\nprint(f\".apply(axis=1): {duration_apply:.4f} seconds\")\n\n# Method 3: Vectorized (Fastest)\nstart_time = time.time()\nresult_vectorized = df['A'] * df['B'] + df['C']\nduration_vectorized = time.time() - start_time\nprint(f\"Vectorized: {duration_vectorized:.4f} seconds\")\n\n# --- 2. Memory Optimization with Data Types ---\nprint(\"\\n--- Memory Optimization ---\")\n# Create a DataFrame with default dtypes\nmem_df = pd.DataFrame({\n    'ints': np.random.randint(0, 100000, 1000000),\n    'floats': np.random.rand(1000000) * 1000,\n    'objects': ['category_' + str(i % 10) for i in range(1000000)]\n})\n\nprint(\"Original DataFrame memory usage:\")\nmem_df.info(memory_usage='deep')\n\n# Optimize dtypes\nmem_df['ints'] = mem_df['ints'].astype(np.int32) # int32 sufficient for up to 2 billion\nmem_df['floats'] = mem_df['floats'].astype(np.float32) # float32 for smaller precision\nmem_df['objects'] = mem_df['objects'].astype('category') # convert to category\n\nprint(\"\\nOptimized DataFrame memory usage:\")\nmem_df.info(memory_usage='deep')\n\n# --- 3. Using .eval() and .query() ---\nprint(\"\\n--- .eval() and .query() ---\")\ndf_eval = pd.DataFrame({\n    'A': np.random.rand(100000),\n    'B': np.random.rand(100000),\n    'C': np.random.rand(100000)\n})\n\n# Simple operation\nstart_time = time.time()\nresult_normal = df_eval['A'] * df_eval['B'] + df_eval['C']\nduration_normal = time.time() - start_time\nprint(f\"Normal calculation: {duration_normal:.6f} seconds\")\n\nstart_time = time.time()\nresult_eval = df_eval.eval('A * B + C')\nduration_eval = time.time() - start_time\nprint(f\".eval() calculation: {duration_eval:.6f} seconds\")\n\n# Filtering with .query()\nstart_time = time.time()\nfiltered_normal = df_eval[(df_eval['A'] > 0.5) & (df_eval['B'] < 0.3)]\nduration_filtered_normal = time.time() - start_time\nprint(f\"Normal filtering: {duration_filtered_normal:.6f} seconds\")\n\nstart_time = time.time()\nfiltered_query = df_eval.query('A > 0.5 and B < 0.3')\nduration_filtered_query = time.time() - start_time\nprint(f\".query() filtering: {duration_filtered_query:.6f} seconds\")\n\n# Assert results are the same\nassert np.allclose(result_loop, result_vectorized)\nassert np.allclose(result_apply, result_vectorized)\nassert np.allclose(result_normal, result_eval)\nassert filtered_normal.equals(filtered_query)\nprint(\"\\nAssertions passed: Results are consistent across methods.\")\n",
        "breakdown": [
          {
            "line": "df = pd.DataFrame({...})",
            "explanation": "Initializes a large DataFrame for performance comparison of different operation styles."
          },
          {
            "line": "for index, row in df.iterrows(): ...",
            "explanation": "Demonstrates a standard Python `for` loop with `iterrows()`, which is generally the slowest method for row-wise operations in pandas."
          },
          {
            "line": "df.apply(lambda row: row['A'] * row['B'] + row['C'], axis=1)",
            "explanation": "Uses `DataFrame.apply()` with `axis=1` to operate row-wise. This is typically faster than `iterrows()` but still involves Python overhead for each row."
          },
          {
            "line": "df['A'] * df['B'] + df['C']",
            "explanation": "Shows the vectorized approach. Pandas (and NumPy) performs the operation on entire columns at once, leveraging optimized C implementations, leading to significantly faster execution."
          },
          {
            "line": "mem_df.info(memory_usage='deep')",
            "explanation": "Prints detailed memory usage for each column and the overall DataFrame. `deep` accounts for actual object sizes, not just pointers."
          },
          {
            "line": "mem_df['ints'] = mem_df['ints'].astype(np.int32)",
            "explanation": "Downcasts the 'ints' column from default `int64` to `int32` to save memory, assuming values fit within the `int32` range."
          },
          {
            "line": "mem_df['floats'] = mem_df['floats'].astype(np.float32)",
            "explanation": "Downcasts the 'floats' column from default `float64` to `float32`, reducing memory usage at the cost of some precision."
          },
          {
            "line": "mem_df['objects'] = mem_df['objects'].astype('category')",
            "explanation": "Converts a string (object) column with limited unique values to the `category` dtype, which can drastically reduce memory for such columns."
          },
          {
            "line": "df_eval.eval('A * B + C')",
            "explanation": "Uses `DataFrame.eval()` to perform an element-wise operation defined by a string expression. For complex expressions, `eval()` can be faster than standard vectorized operations as it uses NumExpr."
          },
          {
            "line": "df_eval.query('A > 0.5 and B < 0.3')",
            "explanation": "Uses `DataFrame.query()` for filtering rows based on a string expression. This can be more readable and faster than boolean indexing for complex conditions."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "Always prioritize vectorized pandas/NumPy operations over explicit Python loops (`for`, `iterrows()`).",
          "`apply()` is better than loops for custom functions but still slower than vectorization.",
          "Check and optimize data types (`astype()`) to reduce memory usage, especially for `int`, `float`, and `object` columns (`category`).",
          "Use `df.info(memory_usage='deep')` for accurate memory profiling.",
          "For out-of-memory situations, consider `chunksize` in I/O, using efficient file formats (Parquet), or external libraries like Dask.",
          "`eval()` and `query()` can offer performance benefits for specific computations and filtering by avoiding temporary object creation."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "Which of the following methods is generally the LEAST performant for applying a function across rows in a large pandas DataFrame?",
            "options": [
              "Vectorized NumPy operations (e.g., `df['col1'] + df['col2']`)",
              "`df.apply(lambda row: ..., axis=1)`",
              "`for index, row in df.iterrows(): ...`",
              "`df.eval('col1 + col2')`"
            ],
            "correctIndex": 2,
            "explanation": "Iterating row by row with `iterrows()` is the slowest method as it involves significant Python overhead for each row, avoiding pandas' optimized C implementations."
          },
          {
            "question": "You have a DataFrame with a column named 'customer_id' containing 10 million integer IDs, but all IDs are between 0 and 50,000. Which `dtype` would be most memory-efficient for this column?",
            "options": [
              "`np.int64` (default)",
              "`np.int32`",
              "`np.int16`",
              "`np.int8`"
            ],
            "correctIndex": 2,
            "explanation": "An `np.int16` can store values from -32,768 to 32,767. Since 50,000 exceeds this, `np.int32` (which stores values up to ~2 billion) is the most memory-efficient option among the choices that can correctly store IDs up to 50,000. If IDs were guaranteed positive, `np.uint16` would be even better, handling up to 65,535."
          },
          {
            "question": "For filtering a DataFrame based on multiple column conditions (e.g., `df[(df['A'] > 0.5) & (df['B'] < 0.3)]`), which pandas function can often provide a more concise and potentially faster alternative?",
            "options": [
              "`df.groupby()`",
              "`df.merge()`",
              "`df.query()`",
              "`df.loc[]`"
            ],
            "correctIndex": 2,
            "explanation": "`df.query()` allows filtering using string expressions, which can be more readable for complex conditions and sometimes faster by leveraging the NumExpr library to avoid intermediate boolean array creation."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "You have a DataFrame with 10 million rows. How would you apply a custom function to each row efficiently?",
        "answer": "My primary goal would be to **vectorize** the operation if possible. If the custom function can be expressed using pandas/NumPy operations (e.g., arithmetic, string methods, logical operations), I'd use that as it's the fastest. If true vectorization isn't possible (e.g., complex business logic), the next best option is `df.apply(lambda row: my_custom_func(row), axis=1)`. This is much faster than `iterrows()`. For extremely complex, row-wise operations, I might consider optimizing the custom function itself with Numba or Cython, and then applying it. For really large datasets that don't fit into memory, I'd consider Dask DataFrames which parallelize operations across chunks of data.",
        "difficulty": "Mid",
        "category": "Conceptual"
      },
      {
        "question": "What are some strategies you would employ if your pandas DataFrame exceeds your machine's available RAM?",
        "answer": "1.  **Optimize Data Types**: The first step is always to ensure columns are using the smallest possible data types (e.g., `int8`, `float32`, `category` for string columns with low cardinality). `df.info(memory_usage='deep')` helps identify memory hogs.\n2.  **Process in Chunks**: For I/O operations (like reading CSVs), use the `chunksize` parameter in `pd.read_csv()` to read and process the file in smaller, manageable parts.\n3.  **Efficient Storage Formats**: Save data to binary formats like Parquet or HDF5. These are compressed and optimized for faster I/O and lower memory footprint compared to CSV.\n4.  **Filter/Sample Data**: If possible, load only the necessary columns (`usecols` in `read_csv`) or a representative sample of rows.\n5.  **External Libraries**: For truly massive datasets, leverage out-of-core computing libraries like Dask DataFrames, which provide a pandas-like API but manage data that doesn't fit in RAM by operating on chunks and parallelizing computations.",
        "difficulty": "Senior",
        "category": "Conceptual"
      }
    ]
  }
];
