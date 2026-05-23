import { 
  Database, 
  Layout, 
  Code2, 
  Binary, 
  Table, 
  BarChart3, 
  Cpu, 
  Network, 
  Sparkles, 
  Bot 
} from 'lucide-react';
import { SubjectContent, Topic } from '../types/content';

// Helper to create basic topics for scaffolding
const createTopic = (id: string, title: string, slug: string): Topic => ({
  id,
  slug,
  title,
  description: `Learn everything about ${title} in this comprehensive lesson.`,
  sections: {
    what: { 
      text: `${title} is a fundamental concept in this subject.`,
      eli5: `Imagine ${title} is like a special tool in your toolbox.`
    },
    why: { text: `We use ${title} to solve complex problems more efficiently.` },
  },
  interviewQuestions: []
});

export const subjects: SubjectContent[] = [
  {
    id: 'sql',
    slug: 'sql',
    name: 'SQL Mastery',
    description: 'Learn to speak the language of databases. From SELECT to complex JOINs and CTEs.',
    icon: Database,
    level: 1,
    estimatedHours: 12,
    topics: [
      {
        id: 'sql-intro',
        slug: 'intro',
        title: 'What is SQL?',
        description: 'Introduction to Structured Query Language and Relational Databases.',
        sections: {
          what: {
            text: 'SQL (Structured Query Language) is the standard language for managing and manipulating relational databases.\n\nAt its core, a relational database is a collection of tables (like spreadsheets) that are linked together by shared data. SQL is the unified syntax we use to create these tables, insert data into them, update them, and most importantly, ask questions about the data.\n\nWhether you are a data analyst calculating monthly revenue, a data engineer building ETL pipelines, or a machine learning scientist extracting training datasets, SQL is your primary interface to the raw data. It is considered a "declarative" language, meaning you tell the database WHAT you want, and the database engine figures out HOW to retrieve it efficiently.',
            eli5: 'Think of SQL as a way to talk to a giant, organized filing cabinet.',
            points: ['Declarative structure', 'Relational model', 'Data integrity']
          },
          why: {
            text: 'Data in modern applications is stored in tables. SQL allows us to extract meaningful insights from millions of rows instantly.',
            tip: 'SQL is the most requested skill for data scientists. Master it early!'
          },
          diagram: {
            chart: 'graph TD\n  A[App] -->|Query| B(Database)\n  B -->|Results| A'
          },
          code: {
            code: 'SELECT * FROM sales\nWHERE amount > 500\nORDER BY date DESC;',
            breakdown: [
              { line: 'SELECT *', explanation: 'Fetches all columns.' },
              { line: 'FROM sales', explanation: 'Target table.' }
            ]
          }
        },
        interviewQuestions: [
          {
            question: 'What is a Primary Key?',
            answer: 'A unique identifier for each record in a table.',
            difficulty: 'Fresher',
            category: 'Conceptual'
          }
        ]
      },
      {
        id: 'sql-select',
        slug: 'select',
        title: 'SELECT & FROM',
        description: 'The fundamental building blocks of any SQL query. Learn how to specify the data you want.',
        sections: {
          what: {
            text: 'The SELECT statement is used to pick specific columns from a table, while FROM specifies which table those columns live in.\n\nThink of a database table as a massive grid. The SELECT keyword determines the vertical slice of the grid you want to see (the columns), and the FROM keyword tells the database engine exactly which grid to look at. Without these two foundational keywords, no data retrieval is possible.\n\nWhen writing a query, the SELECT clause always comes first, followed by the columns you want, separated by commas. If you want to retrieve every single column in the table, you can use the asterisk (*) symbol as a wildcard. However, in production environments, explicitly naming your columns is considered a best practice because it saves memory and network bandwidth.',
            eli5: 'It\'s like pointing at a menu and saying "I want the Burger (Column) from this Restaurant (Table)."',
            points: ['Columns are vertical', 'Rows are horizontal', 'Case insensitivity in keywords']
          },
          why: {
            text: 'In real-world databases, tables can have hundreds of columns. SELECT helps you focus only on the data relevant to your analysis, saving memory and time.',
            tip: 'Always list specific columns instead of using SELECT *. It makes your code faster and easier to maintain.'
          },
          diagram: {
            chart: 'graph LR\n  T[Table] -->|SELECT name, age| R[Result Set]\n  T -->|FROM users| T'
          },
          code: {
            code: '-- Fetching specific columns\nSELECT first_name, email\nFROM customers;',
            breakdown: [
              { line: 'SELECT first_name', explanation: 'Tells SQL to only look at the name column.' },
              { line: 'FROM customers', explanation: 'Tells SQL to look inside the customers table.' }
            ]
          },
          proTip: {
            title: 'Column Aliasing',
            text: 'You can rename columns in your output using the AS keyword. This is incredibly useful for making reports more readable.'
          },
          warning: {
            title: 'Avoid SELECT *',
            text: 'Using the asterisk (*) fetches every single column. In a table with millions of rows, this can seriously slow down the database and the network.'
          },
          keyPoints: {
            title: 'Query Basics',
            points: [
              'SQL queries usually end with a semicolon (;).',
              'Keywords like SELECT are often written in UPPERCASE by convention.',
              'You can select multiple columns by separating them with commas.'
            ]
          }
        },
        interviewQuestions: [
          {
            question: 'What happens if you omit the FROM clause in a query?',
            answer: 'Most modern SQL engines will throw an error because they don\'t know which table to search, though some allow SELECT on literal values (e.g., SELECT 1+1).',
            difficulty: 'Fresher',
            category: 'Trap'
          }
        ]
      },
      {
        id: 'sql-where',
        slug: 'where',
        title: 'Filtering with WHERE',
        description: 'Learn how to filter your data using logical conditions and operators.',
        sections: {
          what: {
            text: 'The WHERE clause allows you to filter records that fulfill a specified condition. It acts as a gatekeeper for your rows.\n\nWhile SELECT controls the vertical slice of your data (columns), the WHERE clause controls the horizontal slice (rows). By applying conditional logic, you can instruct the database to only return rows where specific criteria are met, completely ignoring the rest of the dataset.\n\nYou can build highly complex filters by chaining conditions using logical operators like AND, OR, and NOT. You can also use comparison operators such as equal to (=), greater than (>), less than (<), and IN to check against a list of values. Mastering the WHERE clause is the key to isolating the exact subset of data you need for your analysis.',
            eli5: 'It\'s like a filter on an e-commerce site where you only show "Shoes" that are "Size 10".'
          },
          why: {
            text: 'Without filtering, you would always get every row in a table. WHERE allows you to zoom in on specific segments, like "active users" or "high-value transactions".'
          },
          diagram: {
            chart: 'graph LR\n  A[All Rows] --> B{WHERE Condition}\n  B -->|True| C[Keep Row]\n  B -->|False| D[Discard]'
          },
          breakdown: {
            components: [
              { title: 'Condition', description: 'The logical test applied to each row.' },
              { title: 'Operators', description: 'Includes =, >, <, LIKE, IN, BETWEEN.' }
            ]
          },
          code: {
            code: 'SELECT product_name, price\nFROM products\nWHERE price > 100\nAND category = \'Electronics\';',
            breakdown: [
              { line: 'WHERE price > 100', explanation: 'Filters for items costing more than 100.' },
              { line: 'AND category = \'Electronics\'', explanation: 'Adds a second required condition.' }
            ]
          },
          proTip: {
            title: 'The Power of LIKE',
            text: 'Use the LIKE operator with wildcards (%) to search for patterns. e.g., WHERE name LIKE "A%" finds all names starting with A.'
          },
          warning: {
            title: 'NULL Values',
            text: 'You cannot use = to check for NULL. You must use IS NULL or IS NOT NULL. This is a very common mistake!'
          }
        },
        interviewQuestions: [
          {
            question: 'What is the difference between = and LIKE?',
            answer: '= looks for an exact match, while LIKE allows for pattern matching using wildcards.',
            difficulty: 'Fresher',
            category: 'Conceptual'
          }
        ]
      },
      {
        id: 'sql-order',
        slug: 'ordering',
        title: 'Ordering & Limiting',
        description: 'Learn how to sort your data and control the number of results returned.',
        sections: {
          what: {
            text: 'ORDER BY is used to sort the result-set in ascending or descending order. LIMIT is used to specify the number of records to return.\n\nOnce you have filtered and selected your data, it often arrives in an unpredictable order. The ORDER BY clause allows you to strictly define the sequence of your results, such as sorting products by price from highest to lowest, or sorting employees alphabetically by name. You can even sort by multiple columns sequentially (e.g., sort by Department, and then by Salary within each department).\n\nThe LIMIT clause is critical for performance and pagination. If your table has millions of rows, returning all sorted results will crash your application. Using LIMIT 10 ensures only the top 10 rows are returned over the network, making operations like "Top 5 Highest Earners" instantaneous.',
            eli5: 'ORDER BY is like sorting your contact list by name. LIMIT is like only looking at the first 10 names.'
          },
          diagram: {
            chart: 'graph TD\n  A[Unsorted Data] --> B[ORDER BY]\n  B --> C[Sorted Data]\n  C --> D[LIMIT]\n  D --> E[Top N Results]'
          },
          breakdown: {
            components: [
              { title: 'ORDER BY', description: 'Sorts the results. Can be ASC (default) or DESC.' },
              { title: 'LIMIT', description: 'Restricts the final output to a specific number of rows.' }
            ]
          },
          code: {
            code: 'SELECT name, salary\nFROM employees\nORDER BY salary DESC\nLIMIT 5;',
            breakdown: [
              { line: 'ORDER BY salary DESC', explanation: 'Sorts highest salary first.' },
              { line: 'LIMIT 5', explanation: 'Only shows the top 5 earners.' }
            ]
          }
        },
        interviewQuestions: [
          {
            question: 'How do you find the 2nd highest salary?',
            answer: 'SELECT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1;',
            difficulty: 'Mid',
            category: 'Coding'
          }
        ]
      },
      {
        id: 'sql-joins',
        slug: 'joins',
        title: 'Merging Tables (JOINs)',
        description: 'The real power of SQL. Learn how to combine data from multiple tables.',
        sections: {
          what: {
            text: 'A JOIN clause is used to combine rows from two or more tables, based on a related column between them.\n\nRelational databases are designed around normalization—splitting data into multiple tables to avoid duplication. For example, user details are in a `users` table, while their purchases are in an `orders` table. To see a report of "User Names and their Order Totals", you must weave these two tables back together. That is what a JOIN does.\n\nThere are several types of JOINs, but the most common are INNER JOIN (returns only records that match in both tables) and LEFT JOIN (returns everything from the first table, and matching data from the second table). Mastering JOINs is the absolute most important skill for a data professional, as virtually all real-world data is spread across dozens of tables.',
            eli5: 'It\'s like connecting a "Customer ID" on an order to the "Customer ID" in the customers list to see who bought what.'
          },
          diagram: {
            chart: 'graph LR\n  A((Table A)) ---|Match ID| B((Table B))\n  A --- C[INNER JOIN Result]'
          },
          breakdown: {
            components: [
              { title: 'INNER JOIN', description: 'Returns records that have matching values in both tables.' },
              { title: 'LEFT JOIN', description: 'Returns all records from the left table, and the matched records from the right table.' }
            ]
          },
          code: {
            code: 'SELECT orders.id, customers.name\nFROM orders\nINNER JOIN customers ON orders.customer_id = customers.id;',
            breakdown: [
              { line: 'INNER JOIN', explanation: 'Only keeps rows where there is a match in both.' }
            ]
          }
        },
        interviewQuestions: [
          {
            question: 'What is the difference between INNER and LEFT JOIN?',
            answer: 'INNER JOIN returns only matching rows. LEFT JOIN returns all rows from the left table and matching rows from the right.',
            difficulty: 'Mid',
            category: 'Conceptual'
          }
        ]
      }
    ]
  },
  {
    id: 'python',
    slug: 'python',
    name: 'Python Basics',
    description: 'Master the core of Data Science. Variables, loops, functions, and more.',
    icon: Code2,
    level: 2,
    estimatedHours: 15,
    topics: [
      {
        id: 'py-intro',
        slug: 'intro',
        title: 'Python for Data Science',
        description: 'Why Python is the king of data science and how to get started.',
        sections: {
          what: {
            text: 'Python is a high-level, interpreted language known for its readability and massive ecosystem of data science libraries.\n\nUnlike lower-level languages like C++ or Java, Python reads almost like plain English. This allows data scientists to focus on solving complex mathematical and statistical problems rather than fighting with memory management and compilation errors. Furthermore, Python is interpreted, meaning you can execute code line-by-line in environments like Jupyter Notebooks, which is perfect for exploratory data analysis.\n\nWhat truly makes Python the undisputed king of Data Science is its ecosystem. Built-in libraries are extended by powerful third-party packages like NumPy (for fast mathematics), Pandas (for data manipulation), and Scikit-Learn (for machine learning), turning Python into a computational powerhouse.',
            eli5: 'Python is like a Swiss Army knife that is really easy to use.'
          },
          diagram: {
            chart: 'graph LR\n  A[Code.py] --> B(Interpreter)\n  B --> C[Execution/Output]'
          },
          breakdown: {
            components: [
              { title: 'Interpreted', description: 'Code is executed line-by-line, making it easy to debug.' },
              { title: 'Dynamically Typed', description: 'You don\'t need to declare variable types explicitly.' }
            ]
          },
          code: {
            code: 'name = "N8N"\nprint(f"Welcome to {name}!")',
            breakdown: [
              { line: 'print()', explanation: 'Outputs text to the console.' }
            ]
          }
        },
        interviewQuestions: []
      },
      {
        id: 'py-vars',
        slug: 'variables',
        title: 'Variables & Types',
        description: 'Understanding how Python stores data.',
        sections: {
          what: {
            text: 'Variables are containers for storing data values. Python has various types like integers, floats, strings, and booleans.\n\nWhen writing a program, you need a way to store data temporarily in the computer\'s memory so you can manipulate it later. A variable is simply a named label pointing to that memory location. Because Python is "dynamically typed", you do not have to explicitly declare the type of a variable before assigning it. The interpreter automatically figures out if your variable holds a number, text, or a list.\n\nUnderstanding data types is crucial. An `int` (integer) is a whole number, a `float` is a decimal number, a `str` (string) is text wrapped in quotes, and a `bool` (boolean) represents True or False. You cannot mathematically add a string and an integer together without explicitly converting (casting) them first.',
            eli5: 'Think of variables as labeled boxes where you can store different items.'
          },
          code: {
            code: 'age = 25          # Integer\nprice = 19.99     # Float\nname = "Alice"    # String\nis_active = True  # Boolean',
            breakdown: [
              { line: 'age = 25', explanation: 'Creates an integer variable.' }
            ]
          }
        },
        interviewQuestions: [
          {
            question: 'Is Python statically or dynamically typed?',
            answer: 'Dynamically typed. You don\'t need to declare the type of a variable.',
            difficulty: 'Fresher',
            category: 'Conceptual'
          }
        ]
      },
      {
        id: 'py-loops',
        slug: 'loops',
        title: 'Loops & Iteration',
        description: 'Learn how to automate repetitive tasks using For and While loops.',
        sections: {
          what: {
            text: 'Loops allow you to execute a block of code multiple times. For loops are great for iterating over collections, while While loops run as long as a condition is true.\n\nIn data science, you rarely process just one piece of data. You usually have thousands or millions of records. Loops give you the power to automate repetitive tasks, such as applying a mathematical transformation to every number in a list or downloading data from multiple URLs sequentially.\n\nA `for` loop in Python operates like an iterator, stepping through each element in a list, string, or dictionary automatically without needing an index counter. A `while` loop, on the other hand, evaluates a boolean condition before every iteration. If the condition is true, the loop runs. This makes `while` loops perfect for tasks where you don\'t know exactly how many iterations you need in advance (e.g., polling an API until it returns a success message).',
            eli5: 'It\'s like telling someone to "Keep jumping until I say stop" (While) or "Jump 5 times" (For).'
          },
          diagram: {
            chart: 'graph TD\n  A[Start Loop] --> B{Condition True?}\n  B -->|Yes| C[Execute Block]\n  C --> B\n  B -->|No| D[Exit Loop]'
          },
          breakdown: {
            components: [
              { title: 'For Loop', description: 'Best when you know exactly how many times you want to iterate (e.g. over a list).' },
              { title: 'While Loop', description: 'Best when you want to iterate until a specific condition changes.' }
            ]
          },
          code: {
            code: 'fruits = ["apple", "banana", "cherry"]\nfor fruit in fruits:\n    print(fruit)',
            breakdown: [
              { line: 'for fruit in fruits', explanation: 'Goes through each item in the list.' }
            ]
          }
        },
        interviewQuestions: [
          {
            question: 'What is the purpose of "break" in a loop?',
            answer: 'It immediately terminates the loop.',
            difficulty: 'Fresher',
            category: 'Conceptual'
          }
        ]
      },
      {
        id: 'py-funcs',
        slug: 'functions',
        title: 'Reusable Functions',
        description: 'Don\'t Repeat Yourself. Learn to package logic into functions.',
        sections: {
          what: {
            text: 'A function is a block of code which only runs when it is called. You can pass data, known as parameters, into a function.\n\nAs your codebase grows, writing the same logic multiple times leads to messy, hard-to-maintain scripts. Functions solve this by wrapping logic into a single, named block that you can invoke from anywhere. This follows the DRY principle: Don\'t Repeat Yourself.\n\nIn Python, functions are defined using the `def` keyword. You can specify inputs (arguments) that the function should expect, and use the `return` keyword to pass the result back to the caller. Advanced function concepts include default parameters, variable-length arguments (`*args` and `**kwargs`), and anonymous lambda functions. Well-named functions make your code read like a story.',
            eli5: 'It\'s like a recipe. You define it once, and you can cook it as many times as you want by just calling its name.'
          },
          code: {
            code: 'def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("N8N"))',
            breakdown: [
              { line: 'def greet(name)', explanation: 'Defines the function with a parameter.' }
            ]
          }
        },
        interviewQuestions: [
          {
            question: 'What does the "return" keyword do?',
            answer: 'It exits the function and sends a value back to the caller.',
            difficulty: 'Fresher',
            category: 'Conceptual'
          }
        ]
      },
      {
        id: 'py-collections',
        slug: 'collections',
        title: 'Lists & Dictionaries',
        description: 'Master the most important data structures in Python.',
        sections: {
          what: {
            text: 'Lists are ordered collections. Dictionaries are key-value pairs. Together, they form the backbone of data manipulation in Python.\n\nA **List** is an ordered, mutable sequence of elements. You can think of it as an array. Lists are incredibly versatile: you can append items, remove them, sort them, or slice them to extract sub-sections. Because they maintain their order, they are perfect for sequences like time-series data or logs.\n\nA **Dictionary** (`dict`) is an unordered collection of key-value pairs, completely identical to a JSON object. Instead of accessing data via a numerical index like a list, you access data using a unique key (usually a string). This allows for lightning-fast lookups ($O(1)$ time complexity). If you want to store a user\'s profile with their name, age, and email, a dictionary is the perfect data structure.',
            eli5: 'A list is like a grocery list. A dictionary is like a real dictionary where you look up a word (key) to find its meaning (value).'
          },
          code: {
            code: 'user = {"id": 1, "name": "Alice"}\nscores = [85, 92, 78]',
            breakdown: [
              { line: 'user = {...}', explanation: 'Creates a dictionary.' }
            ]
          }
        },
        interviewQuestions: [
          {
            question: 'What is the difference between a List and a Tuple?',
            answer: 'Lists are mutable (can change), Tuples are immutable (cannot change).',
            difficulty: 'Fresher',
            category: 'Conceptual'
          }
        ]
      }
    ]
  },
  { 
    id: 'bi', 
    slug: 'power-bi', 
    name: 'Power BI', 
    description: 'Data visualization and business intelligence reporting.', 
    icon: Layout, 
    level: 3, 
    estimatedHours: 10, 
    topics: [
      {
        id: 'bi-intro',
        slug: 'intro',
        title: 'Introduction to Power BI',
        description: 'The industry standard for interactive dashboards.',
        sections: {
          what: {
            text: 'Power BI is a collection of software services, apps, and connectors that work together to turn your unrelated sources of data into coherent, visually immersive, and interactive insights.\n\nIn the modern enterprise, data is scattered everywhere: Excel files on local drives, SQL databases on local servers, and cloud services like Salesforce or Google Analytics. Power BI acts as a centralized bridge. It pulls data from hundreds of connectors, allows you to clean and shape the data, and then build relational models to connect it all together.\n\nThe final output is a dynamic, interactive dashboard. Unlike static Excel charts, Power BI visuals cross-filter each other. If you click on a specific product category in a bar chart, every other visual on the page immediately updates to reflect that category\'s data. This interactivity allows executives and analysts to intuitively "drill down" into the data to discover hidden trends.',
            eli5: 'It\'s like a magic dashboard that connects to all your messy spreadsheets and databases, and turns them into beautiful, clickable charts.'
          },
          breakdown: {
            components: [
              { title: 'Power Query', description: 'Used to extract, transform, and load (ETL) data.' },
              { title: 'Power Pivot', description: 'Used for data modeling and DAX calculations.' },
              { title: 'Power View', description: 'Used for creating interactive visualizations.' }
            ]
          },
          diagram: {
            chart: 'graph LR\n  A[Excel] -->|Load| PQ[Power Query]\n  B[SQL DB] -->|Load| PQ\n  PQ -->|Transform| PP[Power Pivot]\n  PP -->|Model| PV[Dashboard]\n  PV -->|Share| PBI[Power BI Service]'
          }
        },
        interviewQuestions: [
          { question: 'What are the main components of Power BI?', answer: 'Power Query (Data Transformation), Power Pivot (Data Modeling Engine), Power View (Data Visualization), and Power BI Service (Sharing/Collaboration).', difficulty: 'Fresher', category: 'Conceptual' }
        ]
      },
      {
        id: 'bi-dax',
        slug: 'dax-basics',
        title: 'DAX Formulas',
        description: 'Data Analysis Expressions for custom calculations.',
        sections: {
          what: {
            text: 'DAX (Data Analysis Expressions) is a library of functions and operators that can be combined to build formulas and expressions in Power BI.\n\nWhile Power BI\'s drag-and-drop interface is great for basic charts, real business logic requires custom calculations. This is where DAX comes in. DAX allows you to calculate Year-over-Year growth, cumulative totals, rolling averages, and complex filtering logic that standard aggregations cannot handle.\n\nDAX introduces two primary calculation types: **Calculated Columns** and **Measures**. A calculated column is computed row-by-row during data refresh, permanently adding data to the table. A measure, on the other hand, is calculated "on the fly" when a user interacts with a report. Measures are highly dependent on the "Evaluation Context" (the filters currently applied to the visual), making them incredibly powerful but tricky to master for beginners.',
            eli5: 'It\'s like Excel formulas on steroids. Instead of calculating a single cell, DAX calculates over entire tables and columns based on filters.'
          },
          breakdown: {
            components: [
              { title: 'Calculated Columns', description: 'Computed row-by-row based on other columns.' },
              { title: 'Measures', description: 'Aggregated values that respond dynamically to dashboard filters.' }
            ]
          }
        },
        interviewQuestions: [
          { question: 'What is the difference between a Calculated Column and a Measure?', answer: 'Calculated columns are evaluated row-by-row and stored in memory. Measures are evaluated on the fly based on the current context/filters in the report.', difficulty: 'Mid', category: 'Conceptual' }
        ]
      }
    ] 
  },
  {
    id: 'numpy',
    slug: 'numpy',
    name: 'NumPy Mastery',
    description: 'Numerical computing for Data Science. Master arrays and vectorization.',
    icon: Binary,
    level: 3,
    estimatedHours: 8,
    topics: [
      {
        id: 'np-intro',
        slug: 'intro',
        title: 'The NumPy Array',
        description: 'Why NumPy is the backbone of scientific computing.',
        sections: {
          what: { 
            text: 'NumPy (Numerical Python) is the foundational library for numerical computing in Python. It provides the ndarray (n-dimensional array), which is much faster and more memory-efficient than standard Python lists.\n\nUnder the hood, standard Python lists are actually arrays of pointers to objects scattered around memory. While flexible, this is incredibly slow for mathematical operations. NumPy solves this by storing arrays in contiguous blocks of memory and enforcing a single data type for the entire array (usually C-type floats or integers).\n\nBecause NumPy is written heavily in optimized C and Fortran code, operations bypass Python\'s slow interpreter. This architecture makes NumPy the engine driving almost every other data science library, including Pandas, Scikit-Learn, and TensorFlow. You simply cannot do Data Science in Python without mastering the NumPy ndarray.',
            eli5: 'Think of a Python list like a messy bag of items. A NumPy array is like a perfectly organized, multi-layered tray of identical items.'
          },
          why: {
            text: 'NumPy uses vectorization to perform operations on entire arrays at once without explicit for-loops. This can be 10x-100x faster than standard Python.',
            tip: 'If you see a for-loop in your data processing, try to vectorize it with NumPy!'
          },
          diagram: {
            chart: 'graph TD\n  A[Standard Python List] -->|Loop| B[Slow]\n  C[NumPy Array] -->|Vectorized| D[Fast C-Code Execution]'
          },
          breakdown: {
            components: [
              { title: 'ndarray', description: 'The core multi-dimensional array object.' },
              { title: 'Vectorization', description: 'Applying operations to entire arrays instead of individual elements.' }
            ]
          },
          code: {
            code: 'import numpy as np\n\n# Create a 1D array\na = np.array([1, 2, 3])\n\n# Perform vector operations\nb = a * 2\nprint("Doubled:", b)\n\n# Generate random data\nrand = np.random.randn(5)\nprint("Random Normal:", rand)',
            breakdown: [
              { line: 'np.array([1, 2, 3])', explanation: 'Creates a fixed-type array.' },
              { line: 'a * 2', explanation: 'Vectorized multiplication — happens in parallel!' }
            ]
          }
        },
        interviewQuestions: [
          { question: 'Why is NumPy faster than standard Python lists?', answer: 'NumPy arrays are stored in contiguous blocks of memory and operations are implemented in highly optimized C code using vectorization.', difficulty: 'Mid', category: 'Conceptual' }
        ]
      },
      {
        id: 'np-indexing',
        slug: 'indexing-slicing',
        title: 'Indexing & Slicing',
        description: 'Accessing and modifying specific parts of your data.',
        sections: {
          what: { 
            text: 'Just like Python lists, but powerful. You can slice in multiple dimensions simultaneously.\n\nWith a standard Python list of lists (a 2D matrix), extracting a specific column requires writing a `for` loop to grab the i-th element of every inner list. In NumPy, you can simply use multidimensional slicing syntax: `array[:, 1]` grabs the entire second column instantly without any loops.\n\nBeyond basic slicing, NumPy introduces "Boolean Indexing" (also known as masking). You can pass an array of True/False values (or a logical condition like `array > 5`) directly into the brackets. NumPy will instantly return a new array containing only the elements that met the condition. This completely eliminates the need to iterate through data to filter it.',
            eli5: 'It\'s like cutting a specific piece out of a grid-shaped cake.' 
          },
          diagram: {
            chart: 'graph LR\n  A[Array] -->|arr[row, col]| B[Specific Element]\n  A -->|arr[:, col]| C[Entire Column]'
          },
          breakdown: {
            components: [
              { title: 'Boolean Indexing', description: 'Selecting elements based on conditions (e.g., arr[arr > 5]).' },
              { title: 'Slicing', description: 'Extracting sub-arrays using the start:stop:step syntax.' }
            ]
          },
          code: { 
            code: 'import numpy as np\narr = np.array([[1, 2], [3, 4]])\nprint("Element:", arr[0, 1])\nprint("Column:", arr[:, 0])',
            breakdown: [
              { line: 'arr[0, 1]', explanation: 'Selects Row 0, Column 1.' }
            ]
          }
        },
        interviewQuestions: [
          { question: 'What is boolean indexing in NumPy?', answer: 'Using an array of boolean values to filter or select data from another array.', difficulty: 'Fresher', category: 'Conceptual' }
        ]
      }
    ]
  },
  {
    id: 'pandas',
    slug: 'pandas',
    name: 'Pandas for Data',
    description: 'Data manipulation and analysis with DataFrames. The heart of every data scientist.',
    icon: Table,
    level: 4,
    estimatedHours: 12,
    topics: [
      {
        id: 'pd-intro',
        slug: 'intro',
        title: 'DataFrames & Series',
        description: 'Introduction to the core structures of Pandas.',
        sections: {
          what: { 
            text: 'Pandas is the go-to library for data manipulation in Python. It introduces two primary data structures: the Series (1D) and the DataFrame (2D).\n\nWhile NumPy is fantastic for raw numerical computation, it lacks features for dealing with heterogeneous, real-world data (like tables containing dates, text, and numbers side-by-side). Pandas builds on top of NumPy arrays to create the DataFrame—the Python equivalent of an Excel spreadsheet or a SQL table.\n\nA DataFrame provides a powerful API for data manipulation. You can effortlessly handle missing values (NaN), merge datasets, group data by categories to calculate aggregates, and pivot tables. Behind the scenes, each column in a DataFrame is a Pandas Series, which itself is powered by a NumPy array, giving you incredible speed alongside human-readable column and row labels.',
            eli5: 'A Series is like a single column in an Excel sheet. A DataFrame is the entire Excel sheet itself.',
            points: ['Label-based indexing', 'Handles missing data (NaN) automatically', 'Seamless integration with NumPy']
          },
          why: {
            text: 'Raw data is messy. Pandas provides tools to clean, filter, group, and merge data with just a few lines of code.',
            tip: 'If you can do it in SQL, you can do it in Pandas (and usually faster for smaller datasets).'
          },
          diagram: {
            chart: 'graph TD\n  S["Series (1D)"] --> D["DataFrame (2D)"]\n  D -->|Columns| C1[Col 1]\n  D -->|Columns| C2[Col 2]\n  D -->|Index| R1[Row 1]\n  D -->|Index| R2[Row 2]'
          },
          breakdown: {
            components: [
              { title: 'DataFrames', description: '2D labeled data structure with columns of potentially different types.' },
              { title: 'Series', description: '1D labeled array capable of holding any data type.' },
              { title: 'Index', description: 'The row labels that allow for fast lookup and alignment.' }
            ]
          },
          code: {
            code: 'import pandas as pd\n\n# Create a DataFrame\ndata = {\n    "name": ["Alice", "Bob", "Charlie"],\n    "age": [25, 30, 35],\n    "city": ["NY", "SF", "LA"]\n}\ndf = pd.DataFrame(data)\n\nprint("DataFrame Overview:")\nprint(df)\nprint("\\nMean Age:", df["age"].mean())',
            breakdown: [
              { line: 'pd.DataFrame(data)', explanation: 'Converts a Python dictionary into a structured table.' },
              { line: 'df["age"].mean()', explanation: 'Calculates the average of the age column instantly.' }
            ]
          }
        },
        interviewQuestions: [
          {
            question: 'What is the difference between a Series and a DataFrame?',
            answer: 'A Series is a one-dimensional array-like object, while a DataFrame is a two-dimensional tabular data structure with labeled axes.',
            difficulty: 'Fresher',
            category: 'Conceptual'
          }
        ]
      },
      {
        id: 'pd-io',
        slug: 'reading-data',
        title: 'Reading & Writing Data',
        description: 'How to load CSV, Excel, and SQL data into Pandas.',
        sections: {
          what: {
            text: 'Pandas supports a wide range of file formats including CSV, XLSX, JSON, and even direct SQL queries.\n\nData rarely starts natively inside a Python script. It lives in cloud buckets, legacy Excel files, or production SQL databases. Pandas acts as a universal adapter. Functions like `pd.read_csv()` or `pd.read_sql()` automatically parse external data formats, infer the correct data types for each column, and load everything directly into memory as a structured DataFrame.\n\nEqually important is writing data back out. Once you have cleaned, transformed, and analyzed your data in Pandas, you can export your findings. A single line of code like `df.to_excel()` will generate a formatted spreadsheet ready for business stakeholders, or `df.to_parquet()` will compress the data for efficient storage in data lakes.',
            eli5: 'It\'s like a universal translator for data files.'
          },
          diagram: {
            chart: 'graph LR\n  CSV[data.csv] -->|pd.read_csv| DF[(DataFrame)]\n  SQL[(Database)] -->|pd.read_sql| DF\n  DF -->|df.to_excel| EXCEL[output.xlsx]'
          },
          breakdown: {
            components: [
              { title: 'pd.read_csv()', description: 'Reads a comma-separated values file into a DataFrame.' },
              { title: 'df.to_json()', description: 'Exports the DataFrame to a JSON string or file.' }
            ]
          },
          code: {
            code: 'import pandas as pd\n\n# Mocking a CSV read (since we don\'t have a file here)\ndata = {"col1": [1, 2], "col2": [3, 4]}\ndf = pd.DataFrame(data)\n\nprint("DataFrame loaded successfully!")\nprint(df)',
            breakdown: [
              { line: 'read_csv', explanation: 'The most common way to load data.' },
              { line: 'to_excel', explanation: 'Exports your cleaned data for sharing.' }
            ]
          }
        },
        interviewQuestions: [
          { question: 'How do you handle missing values when reading a CSV in Pandas?', answer: 'You can use the `na_values` parameter in read_csv to specify additional strings to recognize as NA/NaN, and then use `df.fillna()` or `df.dropna()` afterwards.', difficulty: 'Mid', category: 'Scenario' }
        ]
      }
    ]
  },
  {
    id: 'ml',
    slug: 'ml-basics',
    name: 'ML Foundations',
    description: 'From Linear Regression to Logistic Regression. The math and the code.',
    icon: Cpu,
    level: 5,
    estimatedHours: 20,
    topics: [
      {
        id: 'ml-intro',
        slug: 'intro',
        title: 'What is Machine Learning?',
        description: 'The paradigm shift from explicit programming to data-driven learning.',
        sections: {
          what: { 
            text: 'Machine Learning (ML) is a branch of AI that enables systems to learn from data and improve from experience without being explicitly programmed.\n\nHistorically, programmers had to write explicit rules for a computer to follow (e.g., `if pixel_color == red: return "apple"`). Machine Learning flips this paradigm on its head. Instead of writing the rules, you give the computer a massive dataset containing inputs and outputs (e.g., thousands of pictures of apples and bananas, correctly labeled). The machine learning algorithm analyzes the statistical patterns in the data and automatically generates the rules needed to tell them apart.\n\nThere are three main categories of Machine Learning: Supervised Learning (learning from labeled data), Unsupervised Learning (finding hidden patterns in unlabeled data), and Reinforcement Learning (learning by trial-and-error using a reward system). Modern applications like recommendation engines, fraud detection, and self-driving cars all rely on these principles.',
            eli5: 'Instead of giving a computer a list of rules, we give it a million examples and let it figure out the rules itself.'
          },
          breakdown: {
            components: [
              { title: 'Training Data', description: 'The examples the model learns from.' },
              { title: 'Model', description: 'The mathematical algorithm that represents the patterns.' },
              { title: 'Inference', description: 'Using the model to make predictions on new data.' }
            ]
          },
          diagram: { chart: 'graph LR\n  D[Data] -->|Train| M[Model]\n  N[New Data] --> M\n  M -->|Predict| P[Result]' }
        },
        interviewQuestions: [
          { question: 'What is Overfitting?', answer: 'When a model learns the noise in the training data too well, failing to generalize to new data.', difficulty: 'Fresher', category: 'Conceptual' },
          { question: 'Supervised vs Unsupervised?', answer: 'Supervised uses labeled data; Unsupervised looks for hidden patterns in unlabeled data.', difficulty: 'Fresher', category: 'Conceptual' },
          { question: 'What is a Loss Function?', answer: 'A measure of how far off the model\'s predictions are from the actual values.', difficulty: 'Mid', category: 'Conceptual' },
          { question: 'What is Gradient Descent?', answer: 'An optimization algorithm used to minimize the loss function.', difficulty: 'Mid', category: 'Conceptual' },
          { question: 'Train/Test split purpose?', answer: 'To evaluate how the model performs on data it hasn\'t seen during training.', difficulty: 'Fresher', category: 'Conceptual' },
          { question: 'What is Bias?', answer: 'Error from erroneous assumptions in the learning algorithm.', difficulty: 'Mid', category: 'Conceptual' },
          { question: 'What is Variance?', answer: 'Error from sensitivity to small fluctuations in the training set.', difficulty: 'Mid', category: 'Conceptual' },
          { question: 'What is a Hyperparameter?', answer: 'A configuration value that is set before the learning process begins.', difficulty: 'Senior', category: 'Conceptual' }
        ]
      },
      {
        id: 'ml-linear',
        slug: 'linear-regression',
        title: 'Linear Regression',
        description: 'Predicting continuous values using the power of lines.',
        sections: {
          what: { text: 'Linear regression models the relationship between a dependent variable and one or more independent variables.\n\nImagine you want to predict the price of a house based on its square footage. If you plot past sales on a graph (Square Footage on the X-axis, Price on the Y-axis), you will likely see a trend where larger houses cost more. Linear Regression is an algorithm that mathematically finds the "Line of Best Fit" through those data points. \n\nThe equation of this line is `y = mx + c`, where `y` is the prediction (Price), `x` is the input (Square Footage), `m` is the slope (how much price increases per square foot), and `c` is the intercept (base price). During the training process, the algorithm uses a loss function (like Mean Squared Error) and optimization techniques (like Gradient Descent) to iteratively adjust `m` and `c` until the line perfectly represents the underlying trend.' },
          breakdown: {
            components: [
              { title: 'Slope (m)', description: 'How much the output changes for every unit change in input.' },
              { title: 'Intercept (c)', description: 'The value of the output when the input is zero.' }
            ]
          },
          diagram: {
            chart: 'graph LR\n  X[Independent Variable] -->|Model: y = mx + c| Y[Dependent Variable]'
          },
          code: { 
            code: 'from sklearn.linear_model import LinearRegression\nimport numpy as np\n\n# Dummy Data\nX_train = np.array([[1], [2], [3]])\ny_train = np.array([2, 4, 6])\n\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\n\nprint("Prediction for x=4:", model.predict([[4]]))\nprint("Slope (m):", model.coef_[0])',
            breakdown: [{ line: 'model.fit()', explanation: 'Trains the model on our data.' }]
          }
        },
        interviewQuestions: [
          { question: 'What does the R-squared value indicate?', answer: 'It represents the proportion of the variance in the dependent variable that is predictable from the independent variables.', difficulty: 'Fresher', category: 'Conceptual' }
        ]
      },
      {
        id: 'ml-workflow',
        slug: 'workflow',
        title: 'The ML Workflow',
        description: 'The step-by-step process of building a machine learning system.',
        sections: {
          what: { text: 'Building an ML model isn\'t just about the algorithm. It is a multi-stage lifecycle.\n\nBeginners often think Machine Learning is all about writing complex code for neural networks. In reality, the algorithm is only a small piece of the puzzle. The ML Workflow defines the end-to-end process required to turn raw data into a reliable, production-ready system.\n\nThe workflow begins with **Data Collection** and **Exploratory Data Analysis (EDA)**. Once you understand the data, you move to **Preprocessing** (handling missing values, scaling features, and encoding text into numbers). Only then do you **Train** the model. After training, you must rigorously **Evaluate** its performance on unseen data to ensure it hasn\'t simply memorized the training set (Overfitting). Finally, the model is **Deployed** via an API so applications can use it to make live predictions.' },
          breakdown: {
            components: [
              { title: 'Data Collection', description: 'Gathering raw data from various sources.' },
              { title: 'Preprocessing', description: 'Cleaning and preparing data for the model.' },
              { title: 'Training', description: 'The model learns patterns from the data.' },
              { title: 'Evaluation', description: 'Testing the model on unseen data.' },
              { title: 'Deployment', description: 'Making the model available for real-world use.' }
            ]
          },
          diagram: { chart: 'graph TD\n  A[Collect] --> B[Clean]\n  B --> C[Train]\n  C --> D[Evaluate]\n  D --> E[Deploy]' },
          code: {
            code: 'print("1. Data Collection: SQL, APIs, Web Scraping")\nprint("2. Preprocessing: Pandas, NumPy, Scikit-learn (Imputation, Scaling)")\nprint("3. Training: Scikit-learn, PyTorch, TensorFlow")\nprint("4. Evaluation: Accuracy, F1-Score, MSE")\nprint("5. Deployment: FastAPI, Docker, AWS")',
            breakdown: [
              { line: 'Preprocessing', explanation: 'Often takes 80% of a data scientist\'s time!' }
            ]
          }
        },
        interviewQuestions: [
          { question: 'Why is data preprocessing so important?', answer: 'Garbage In, Garbage Out. ML models cannot learn useful patterns if the input data is full of errors, missing values, or irrelevant noise.', difficulty: 'Fresher', category: 'Conceptual' }
        ]
      },
      {
        id: 'ml-logistic',
        slug: 'logistic-regression',
        title: 'Logistic Regression',
        description: 'The foundation of classification. Predicting categories instead of values.',
        sections: {
          what: { 
            text: 'Logistic regression is used to estimate the probability that an instance belongs to a particular class (e.g., Spam vs. Not Spam).\n\nDespite its name, Logistic Regression is actually a *classification* algorithm, not a regression algorithm. While Linear Regression predicts a continuous number (like house price), Logistic Regression predicts a binary outcome (Yes/No, True/False, 1/0). \n\nIt achieves this by taking the linear equation (`y = mx + c`) and passing the result through a mathematical function called the **Sigmoid function**. The Sigmoid function creates an S-shaped curve that squashes any input value to a number strictly between 0 and 1. This output is interpreted as a probability. If the probability is greater than 0.5 (50%), the model classifies the input as Class A; otherwise, it classifies it as Class B. It is the fundamental building block for modern deep learning neural networks.',
            eli5: 'It\'s like a light switch that doesn\'t just turn on or off, but tells you the probability of it being on.'
          },

          diagram: {
            chart: 'graph LR\n  X[Inputs] --> S[Sigmoid]\n  S -->|0.7| P["Class A"]\n  S -->|0.3| Q["Class B"]'
          },
          breakdown: {
            components: [
              { title: 'Inputs', description: 'Features passed into the model.' },
              { title: 'Sigmoid', description: 'Activation function to squash output.' },
              { title: 'Classification', description: 'Final decision based on threshold.' }
            ]
          },
          code: {
            code: 'from sklearn.linear_model import LogisticRegression\nmodel = LogisticRegression()\nmodel.fit(X_train, y_train)\n\n# Get probabilities\nprobs = model.predict_proba(X_test)',
            breakdown: [
              { line: 'predict_proba', explanation: 'Returns the raw probability for each class.' }
            ]
          }
        },
        interviewQuestions: [
          { question: 'Why use Sigmoid in Logistic Regression?', answer: 'To map predictions to probabilities between 0 and 1.', difficulty: 'Mid', category: 'Conceptual' }
        ]
      },
      {
        id: 'ml-trees',
        slug: 'decision-trees',
        title: 'Decision Trees',
        description: 'Learning rules from data. The intuitive "If-Then" model.',
        sections: {
          what: { 
            text: 'Decision Trees split data into branches based on feature values, creating a tree-like structure of decisions.\n\nUnlike Linear or Logistic Regression, which rely heavily on mathematical equations, a Decision Tree learns by creating a set of IF-THEN rules. Starting at the "Root Node" containing the entire dataset, the algorithm searches for the specific feature (e.g., Age) and threshold (e.g., Age > 30) that best splits the data into distinct classes. It measures the quality of the split using mathematical metrics like Gini Impurity or Information Gain.\n\nThe data is recursively split down through "Internal Nodes" until it reaches the end "Leaf Nodes", which represent the final prediction. Because of this structure, Decision Trees are highly interpretable—you can literally trace the path a model took to reach its conclusion. However, they are highly prone to overfitting, which is why they are often combined into "Random Forests".',
            eli5: 'It\'s like playing a game of 20 Questions. "Is the temperature > 30?" Yes -> "Is it humid?" -> No -> Wear a T-shirt.'
          },
          diagram: {
            chart: 'graph TD\n  Q1{Temp > 30?} -->|Yes| Q2{Humid?}\n  Q1 -->|No| A1[Jacket]\n  Q2 -->|Yes| A2[Stay Inside]\n  Q2 -->|No| A3[T-shirt]'
          },
          breakdown: {
            components: [
              { title: 'Root Node', description: 'The very top decision node.' },
              { title: 'Leaf Node', description: 'The final classification/prediction.' },
              { title: 'Entropy / Gini', description: 'Metrics used to decide where to split the data to maximize information gain.' }
            ]
          },
          code: {
            code: 'from sklearn.tree import DecisionTreeClassifier\nimport numpy as np\n\n# Features: [Temperature, Humidity (1=High, 0=Low)]\nX = np.array([[35, 1], [35, 0], [20, 0]])\ny = np.array(["Stay Inside", "T-shirt", "Jacket"])\n\ntree = DecisionTreeClassifier()\ntree.fit(X, y)\n\nprint("Prediction for Temp=25, Low Humidity:", tree.predict([[25, 0]]))',
            breakdown: [
              { line: 'DecisionTreeClassifier()', explanation: 'Creates the model object.' }
            ]
          }
        },
        interviewQuestions: [
          { question: 'What is Pruning in a Decision Tree?', answer: 'Removing sections of the tree that provide little power to classify instances, reducing overfitting.', difficulty: 'Mid', category: 'Conceptual' }
        ]
      }
    ]
  },
  { 
    id: 'dl', 
    slug: 'deep-learning', 
    name: 'Deep Learning', 
    description: 'Neural Networks & Deep Architectures.', 
    icon: Network, 
    level: 8, 
    estimatedHours: 25, 
    topics: [
      {
        id: 'dl-perceptrons',
        slug: 'perceptrons',
        title: 'The Perceptron',
        description: 'The single unit of a neural network.',
        sections: {
          what: { 
            text: 'A perceptron is a mathematical model of a biological neuron. It takes multiple inputs, applies weights, and produces a binary output based on a threshold.\n\nInvented in 1957, the Perceptron is the absolute smallest building block of Deep Learning. In the human brain, a biological neuron receives electrical signals from dendrites. If the combined signal is strong enough, the neuron "fires" an output signal. The Perceptron mathematically mimics this exact process.\n\nIt takes an array of numerical inputs and multiplies each by a corresponding "weight" (which represents the importance of that input). It sums these values up, adds a "bias" (a baseline threshold), and passes the result through an Activation Function (originally a simple Step Function). If the final number is greater than zero, the perceptron outputs a 1; otherwise, it outputs a 0. While a single perceptron can only learn linearly separable patterns (like a basic AND/OR logic gate), networking millions of them together creates modern AI.',
            eli5: 'Think of it as a small voting machine. Each input is a vote, but some voters are more important (higher weights) than others.'
          },
          breakdown: {
            components: [
              { title: 'Weights', description: 'Strength of the input signal.' },
              { title: 'Bias', description: 'A threshold that must be overcome for the neuron to fire.' },
              { title: 'Step Function', description: 'The rule that decides if the output is 0 or 1.' }
            ]
          },
          diagram: {
            chart: 'graph LR\n  X1[Input 1] -->|w1| S((Sum))\n  X2[Input 2] -->|w2| S\n  B[Bias] --> S\n  S --> F[Step Function]\n  F --> O[Output]'
          },
          code: {
            code: 'import numpy as np\n\ndef perceptron(x, w, b):\n    # Weighted sum + bias\n    z = np.dot(x, w) + b\n    # Step function\n    return 1 if z > 0 else 0\n\nx = np.array([0.5, 0.8])\nw = np.array([0.4, 0.6])\nb = -0.5\n\nprint("Perceptron Output:", perceptron(x, w, b))',
            breakdown: [
              { line: 'np.dot(x, w)', explanation: 'Calculates the dot product of inputs and weights.' },
              { line: 'return 1 if z > 0 else 0', explanation: 'The step function threshold.' }
            ]
          }
        },
        interviewQuestions: [
          { question: 'What is a Perceptron?', answer: 'A linear classifier that makes predictions by calculating a weighted sum of inputs.', difficulty: 'Fresher', category: 'Conceptual' }
        ]
      },
      {
        id: 'dl-ann',
        slug: 'neural-networks',
        title: 'Artificial Neural Networks',
        description: 'Stacking layers to learn complex patterns.',
        sections: {
          what: { text: 'ANNs are inspired by the human brain, consisting of input, hidden, and output layers.\n\nWhile a single Perceptron can only draw a straight line to classify data, an Artificial Neural Network (ANN), or Multi-Layer Perceptron (MLP), stacks these neurons into layers to learn highly complex, non-linear relationships. The architecture always consists of an Input Layer (raw data), an Output Layer (predictions), and one or more "Hidden Layers" in between.\n\nThe magic of ANNs lies in how they learn: a process called **Backpropagation**. During training, the network makes a prediction and compares it to the correct answer using a Loss Function. It then works backward through the network, using calculus (gradients) to figure out exactly how much each individual weight and bias contributed to the error. An optimizer (like Adam or Stochastic Gradient Descent) then tweaks those weights. Over thousands of iterations (epochs), the network slowly minimizes its error, effectively "learning" the dataset.' },
          breakdown: {
            components: [
              { title: 'Input Layer', description: 'Passes raw features into the network.' },
              { title: 'Hidden Layers', description: 'Where the complex feature extraction happens.' },
              { title: 'Backpropagation', description: 'The algorithm that updates weights by calculating gradients of the loss.' }
            ]
          },
          diagram: { chart: 'graph LR\n  I[Input] --> H1[Hidden 1]\n  H1 --> H2[Hidden 2]\n  H2 --> O[Output]' },
          code: {
            code: 'from sklearn.neural_network import MLPClassifier\n\n# Multi-Layer Perceptron (ANN)\nmodel = MLPClassifier(hidden_layer_sizes=(10, 10), max_iter=1000)\nmodel.fit(X_train, y_train)\nprint("Accuracy:", model.score(X_test, y_test))',
            breakdown: [
              { line: 'hidden_layer_sizes=(10, 10)', explanation: 'Creates two hidden layers with 10 neurons each.' }
            ]
          }
        },
        interviewQuestions: []
      },
      {
        id: 'dl-activations',
        slug: 'activation-functions',
        title: 'Activation Functions',
        description: 'Introducing non-linearity to the network.',
        sections: {
          what: { text: 'Activation functions decide whether a neuron should be activated or not by calculating a weighted sum and adding bias.\n\nIf you stack multiple layers of neurons together without an activation function, the entire network simply collapses back into one massive linear equation (`y = mx + c`). The network would be completely incapable of learning complex patterns like curves or circles. Activation functions introduce **non-linearity** to the network, allowing it to bend and warp its decision boundaries.\n\nDifferent layers use different activation functions. Hidden layers predominantly use **ReLU** (Rectified Linear Unit), which simply turns any negative number to zero. ReLU is mathematically extremely cheap to compute and solves the infamous "Vanishing Gradient" problem. For output layers, the activation function depends on the task: **Sigmoid** is used for binary classification (squashing values between 0 and 1), while **Softmax** is used for multi-class classification (creating a probability distribution that sums to 1).' },
          breakdown: {
            components: [
              { title: 'ReLU', description: 'Rectified Linear Unit. Returns 0 for negative, input for positive. Solves vanishing gradient.' },
              { title: 'Softmax', description: 'Converts a vector of values into a probability distribution.' },
              { title: 'Sigmoid', description: 'Squashes values between 0 and 1. Good for binary classification.' }
            ]
          },
          diagram: {
            chart: 'graph TD\n  N[Neuron Weighted Sum] --> A{Activation Function}\n  A -->|ReLU| O1[Max(0, x)]\n  A -->|Sigmoid| O2[0 to 1]\n  A -->|Softmax| O3[Probabilities]'
          },
          code: {
            code: 'import numpy as np\n\ndef relu(x):\n    return np.maximum(0, x)\n\ndef sigmoid(x):\n    return 1 / (1 + np.exp(-x))\n\ndata = np.array([-2, -1, 0, 1, 2])\nprint("ReLU:", relu(data))\nprint("Sigmoid:", np.round(sigmoid(data), 2))',
            breakdown: [
              { line: 'np.maximum(0, x)', explanation: 'ReLU converts all negative numbers to 0.' }
            ]
          }
        },
        interviewQuestions: []
      },
      {
        id: 'dl-cnn',
        slug: 'cnn',
        title: 'Convolutional Neural Networks',
        description: 'Deep Learning for computer vision.',
        sections: {
          what: { text: 'CNNs are specialized neural networks for processing structured arrays of data, such as images.\n\nIf you try to feed a high-resolution image into a standard Artificial Neural Network, the model will immediately crash because it requires a unique weight for every single pixel. A standard ANN also loses all spatial information (it doesn\'t know that two pixels next to each other form a nose). Convolutional Neural Networks (CNNs) were designed specifically to solve these problems.\n\nInstead of connecting every neuron to every pixel, CNNs drag small mathematical filters (kernels) across the image. These filters perform **Convolutions**, automatically learning to detect low-level features like horizontal lines, vertical edges, and color gradients in the early layers. Deeper layers combine these simple edges to recognize complex shapes like eyes or wheels. This process of parameter-sharing drastically reduces the computational power required, allowing CNNs to power facial recognition, medical image analysis, and self-driving cars.' },
          breakdown: {
            components: [
              { title: 'Convolutional Layer', description: 'Filters applied to extract features like edges and patterns.' },
              { title: 'Pooling', description: 'Reducing the spatial size of the representation to reduce parameters.' },
              { title: 'Fully Connected', description: 'Final layers that perform classification based on extracted features.' }
            ]
          },
          diagram: {
            chart: 'graph LR\n  IMG[Image] --> C1[Conv Layer]\n  C1 --> P1[Max Pooling]\n  P1 --> C2[Conv Layer]\n  C2 --> FC[Fully Connected]\n  FC --> O[Output Probabilities]'
          },
          code: {
            code: '# Note: Deep Learning libraries like TensorFlow/PyTorch are massive.\n# Here is pseudo-code for a CNN architecture:\n"""\nmodel = Sequential([\n  Conv2D(32, kernel_size=(3,3), activation="relu", input_shape=(28,28,1)),\n  MaxPooling2D(pool_size=(2,2)),\n  Flatten(),\n  Dense(10, activation="softmax")\n])\n"""\nprint("CNNs extract spatial hierarchies of features automatically!")',
            breakdown: [
              { line: 'Conv2D', explanation: 'Applies visual filters.' },
              { line: 'MaxPooling2D', explanation: 'Downsamples the image to reduce computation.' }
            ]
          }
        },
        interviewQuestions: []
      },
      {
        id: 'dl-rnn',
        slug: 'rnn',
        title: 'Recurrent Neural Networks',
        description: 'Handling sequential data and memory.',
        sections: {
          what: { text: 'RNNs are a class of neural networks where the output from a previous step is fed as input to the current step.\n\nStandard Neural Networks and CNNs assume that all inputs are completely independent of each other. However, if you are translating a sentence, predicting stock prices, or forecasting weather, the sequence and order of the data are absolutely critical. Recurrent Neural Networks (RNNs) are designed specifically for sequential data.\n\nRNNs achieve this by maintaining a **Hidden State**—a form of short-term memory. When an RNN processes the second word in a sentence, it doesn\'t just look at the second word; it looks at the second word *combined* with its memory of the first word. Unfortunately, basic RNNs suffer from "forgetfulness" on long sequences (the vanishing gradient problem). Modern architectures use specialized memory cells like **LSTM** (Long Short-Term Memory) or **GRU** to determine exactly what information to remember, what to forget, and what to pass on to the next step.' },
          breakdown: {
            components: [
              { title: 'Hidden State', description: 'The memory of the network that carries information across time steps.' },
              { title: 'LSTM', description: 'Long Short-Term Memory. Specialized RNN to solve the vanishing gradient problem.' },
              { title: 'GRU', description: 'Gated Recurrent Unit. A simpler version of LSTM.' }
            ]
          },
          diagram: {
            chart: 'graph LR\n  X0[Input t=0] --> RNN0[RNN Cell]\n  RNN0 -->|Hidden State| RNN1[RNN Cell t=1]\n  X1[Input t=1] --> RNN1\n  RNN1 --> O1[Output]'
          },
          code: {
            code: 'print("RNNs are designed for sequential data like Time Series or NLP.")\nprint("Instead of treating each input independently, they maintain a Hidden State memory.")',
            breakdown: [
              { line: 'Hidden State memory', explanation: 'Allows the network to remember past inputs in the sequence.' }
            ]
          }
        },
        interviewQuestions: []
      }
    ]
  },
  { 
    id: 'genai', 
    slug: 'gen-ai', 
    name: 'Generative AI', 
    description: 'The era of Transformers, LLMs, and RAG.', 
    icon: Sparkles, 
    level: 9, 
    estimatedHours: 15, 
    topics: [
      {
        id: 'genai-transformers',
        slug: 'transformers',
        title: 'Transformers Architecture',
        description: 'The architecture that changed AI forever.',
        sections: {
          what: { 
            text: 'Transformers are neural networks that use self-attention to process entire sequences of data at once, enabling parallelization and capturing long-range dependencies.\n\nBefore 2017, the AI community relied on Recurrent Neural Networks (RNNs) for language tasks. However, RNNs process text sequentially (word-by-word), which means they are incredibly slow to train and tend to forget the beginning of a long paragraph by the time they reach the end. Google\'s landmark paper, "Attention Is All You Need," introduced the Transformer architecture to solve this.\n\nInstead of reading left-to-right, Transformers look at the entire sentence simultaneously. The architecture relies entirely on the "Attention Mechanism" to figure out the mathematical relationship between every single word in the sequence, regardless of how far apart they are. Because they process data in parallel, Transformers can be trained on thousands of GPUs simultaneously, giving birth to the era of massive models trained on the entire internet.',
            eli5: 'Imagine a translator who doesn\'t read sentence by sentence, but looks at the entire page at once to understand the context of every word simultaneously.'
          },
          breakdown: {
            components: [
              { title: 'Encoder', description: 'Processes the input sequence and creates a numerical representation (embeddings).' },
              { title: 'Decoder', description: 'Uses the encoder output and previous tokens to generate the next token in the sequence.' },
              { title: 'Self-Attention', description: 'Allows the model to weigh the importance of different words in a sentence.' }
            ]
          },
          diagram: { chart: 'graph TD\n  I[Input] --> E[Encoder]\n  E --> D[Decoder]\n  D --> O[Output]' },
          code: {
            code: 'print("The Transformer Architecture introduced the Attention Mechanism.")\nprint("It eliminated the need for recurrent layers (RNNs), allowing massive parallelization and giving rise to modern LLMs.")',
            breakdown: [
              { line: 'massive parallelization', explanation: 'Why transformers can be trained on GPUs so effectively.' }
            ]
          }
        },
        interviewQuestions: [
          { question: 'What is the core breakthrough of the Transformer architecture?', answer: 'The self-attention mechanism, which allows parallel processing of sequences and handles long-range dependencies better than RNNs.', difficulty: 'Fresher', category: 'Conceptual' },
          { question: 'Explain the difference between Encoder and Decoder.', answer: 'Encoders process input into context vectors (e.g. BERT), while Decoders generate sequences based on context (e.g. GPT).', difficulty: 'Mid', category: 'Conceptual' }
        ]
      },
      {
        id: 'genai-attention',
        slug: 'attention-mechanism',
        title: 'Attention Mechanism',
        description: 'How AI focuses on what matters.',
        sections: {
          what: { text: 'The attention mechanism allows a model to focus on specific parts of the input when producing an output, mimicking human cognitive attention.\n\nConsider the sentence: "The animal didn\'t cross the street because it was too tired." What does the word "it" refer to? Humans instantly know "it" refers to the animal, not the street. However, for a computer, this requires deep contextual understanding. Self-attention solves this mathematically.\n\nFor every word in the sentence, the attention mechanism calculates a "score" against every other word to determine how strongly they are related. In the example above, the self-attention layer will assign a very high mathematical weight between the word "it" and the word "animal." The model generates three vectors for each word: Queries (Q), Keys (K), and Values (V). By taking the dot product of the Queries and Keys, the model calculates these attention scores, fundamentally understanding syntax and context without any human grammar rules.' },
          breakdown: {
            components: [
              { title: 'Queries (Q)', description: 'What the model is looking for.' },
              { title: 'Keys (K)', description: 'The index of information available.' },
              { title: 'Values (V)', description: 'The actual information to be extracted.' }
            ]
          },
          diagram: {
            chart: 'graph TD\n  Q[Query] --> MatMul\n  K[Key] --> MatMul\n  MatMul --> Scale\n  Scale --> Softmax\n  Softmax --> Mult[Multiply with Value]\n  V[Value] --> Mult'
          },
          code: {
            code: 'import numpy as np\n\ndef scaled_dot_product_attention(q, k, v):\n    # Calculate raw scores\n    scores = np.dot(q, k.T) / np.sqrt(k.shape[-1])\n    # Softmax for probabilities (mocked here)\n    weights = np.exp(scores) / np.sum(np.exp(scores))\n    return np.dot(weights, v)\n\nprint("Attention allows the model to dynamically weight the importance of context.")',
            breakdown: [
              { line: 'np.dot(q, k.T)', explanation: 'Matches Queries to Keys.' }
            ]
          }
        },
        interviewQuestions: [
          { question: 'What are Q, K, and V in self-attention?', answer: 'Queries (what we look for), Keys (what we match against), and Values (the information we extract).', difficulty: 'Mid', category: 'Conceptual' },
          { question: 'Why is Multi-Head Attention used?', answer: 'It allows the model to jointly attend to information from different representation subspaces at different positions.', difficulty: 'Senior', category: 'Conceptual' }
        ]
      },
      {
        id: 'genai-llms',
        slug: 'llms',
        title: 'Large Language Models (LLMs)',
        description: 'From BERT to GPT-4.',
        sections: {
          what: { text: 'LLMs are massive neural networks trained on vast amounts of text data to understand and generate human-like language.\n\nAt a fundamental level, Large Language Models like GPT-4 or Claude are simply next-word prediction engines. They are trained on terabytes of human text (books, Wikipedia, code repositories) using the Transformer architecture. During training, the model is fed a sequence of text with the last word hidden, and it adjusts its billions of internal weights to correctly guess that hidden word.\n\nWhen you interact with an LLM, you are providing a "Prompt." The model mathematically calculates the statistical probability of every possible word that could logically follow your prompt, and then selects one (influenced by a randomness parameter called Temperature). It then takes that new word, adds it to your prompt, and repeats the process over and over until it generates a "Stop Token." Despite this seemingly simple mechanism, at a massive scale, LLMs display emergent reasoning and problem-solving capabilities.' },
          breakdown: {
            components: [
              { title: 'Tokenization', description: 'Breaking down text into smaller units (tokens) for the model to process.' },
              { title: 'Context Window', description: 'The maximum amount of text the model can "remember" at once.' },
              { title: 'Temperature', description: 'A hyperparameter that controls the randomness/creativity of the output.' }
            ]
          },
          diagram: {
            chart: 'graph LR\n  P[Prompt] --> T[Tokenizer]\n  T --> E[Embeddings]\n  E --> LLM[Transformer Blocks]\n  LLM --> O[Output Probabilities]\n  O --> W[Next Word]'
          },
          code: {
            code: 'prompt = "The sky is"\n\n# LLMs predict the most statistically likely next token\nprint(f"Prompt: {prompt}")\nprint("Predicted Next Tokens: [\'blue\' (0.8), \'dark\' (0.1), \'falling\' (0.01)]")\nprint("At Temperature 0, it always picks \'blue\'.")',
            breakdown: [
              { line: 'predict the most statistically likely next token', explanation: 'The fundamental task of autoregressive LLMs.' }
            ]
          }
        },
        interviewQuestions: [
          { question: 'What is a Hallucination in LLMs?', answer: 'When a model generates factually incorrect or nonsensical information with high confidence.', difficulty: 'Mid', category: 'Conceptual' },
          { question: 'How does Temperature affect LLM output?', answer: 'Higher temperature increases randomness/creativity, while lower temperature makes the output more deterministic and focused.', difficulty: 'Fresher', category: 'Conceptual' },
          { question: 'Explain RLHF (Reinforcement Learning from Human Feedback).', answer: 'A technique to align LLMs with human values by training a reward model on human rankings of model outputs.', difficulty: 'Senior', category: 'Conceptual' }
        ]
      },
      {
        id: 'genai-rag',
        slug: 'rag',
        title: 'Retrieval Augmented Generation (RAG)',
        description: 'Connecting LLMs to your data.',
        sections: {
          what: { 
            text: 'RAG is a framework for retrieving relevant information from an external knowledge base and providing it to the LLM as context to improve accuracy.\n\nLarge Language Models have two major flaws: their training data is cut off at a specific date, and they hallucinate (make up confident-sounding facts) when they don\'t know the answer. Retraining a foundation model on new company data is prohibitively expensive. Retrieval-Augmented Generation (RAG) is the industry-standard solution.\n\nIn a RAG pipeline, your private documents (PDFs, Confluence pages, SQL schemas) are broken into chunks and converted into numerical arrays called Vector Embeddings. When a user asks a question, the system searches the Vector Database for the most semantically similar text chunks. It then takes those specific chunks, pastes them into the prompt along with the user\'s question, and says to the LLM: "Answer the user\'s question using ONLY the provided text." This gives the LLM perfectly accurate, real-time knowledge.',
            eli5: 'It\'s like giving an AI an open-book exam where it can look up specific facts in a library before answering.'
          },
          breakdown: {
            components: [
              { title: 'Vector Database', description: 'Stores data as high-dimensional vectors (embeddings) for fast semantic search.' },
              { title: 'Retrieval Pipeline', description: 'The process of finding the most relevant chunks of text for a given query.' },
              { title: 'Augmented Prompt', description: 'The final prompt sent to the LLM containing the retrieved context.' }
            ]
          },
          diagram: { chart: 'graph LR\n  Q[Query] --> R[Retriever]\n  DB[(Vector DB)] --> R\n  R --> P[Augmented Prompt]\n  P --> LLM[Large Language Model]' },
          code: {
            code: 'print("RAG Execution Flow:")\nprint("1. User asks: \'What is the company leave policy?\'")\nprint("2. System converts query to a Vector Embedding.")\nprint("3. System searches Vector DB for similar documents.")\nprint("4. System creates prompt: \'Context: [Found Doc]. Query: [User Query]\'")\nprint("5. LLM generates a grounded answer based ONLY on the context.")',
            breakdown: [
              { line: 'grounded answer based ONLY on the context', explanation: 'This prevents the LLM from hallucinating answers.' }
            ]
          }
        },
        interviewQuestions: [
          { question: 'What is the main advantage of RAG over fine-tuning?', answer: 'RAG allows access to real-time/private data without retraining and reduces hallucinations by grounding answers in context.', difficulty: 'Mid', category: 'Scenario' },
          { question: 'What are Embeddings in the context of RAG?', answer: 'Numerical representations of text that capture semantic meaning, allowing for similarity-based retrieval.', difficulty: 'Fresher', category: 'Conceptual' }
        ]
      },
      {
        id: 'genai-prompting',
        slug: 'prompt-engineering',
        title: 'Prompt Engineering',
        description: 'The art of talking to AI.',
        sections: {
          what: { text: 'Prompt Engineering is the practice of optimizing input text to guide LLMs toward generating more accurate, relevant, and safe responses.\n\nBecause LLMs are statistical engines, the way you phrase your request drastically alters the mathematical landscape of the output. A vague prompt like "Write code for a website" forces the model to guess your intent, often resulting in generic or incorrect output. Prompt Engineering is the skill of constraining the model\'s mathematical search space.\n\nAdvanced prompt engineering relies on several specific techniques. **System Prompts** establish the base persona and non-negotiable rules. **Few-Shot Prompting** provides 2-3 perfect examples of the desired output format, teaching the model through pattern recognition. **Chain-of-Thought (CoT)** forces the model to output its step-by-step reasoning before outputting the final answer. Because an LLM\'s "thoughts" are generated linearly, forcing it to explain its logic actually gives it more computational time to arrive at the correct answer.' },
          breakdown: {
            components: [
              { title: 'Few-Shot Prompting', description: 'Providing a few examples in the prompt to show the model how to perform a task.' },
              { title: 'Chain-of-Thought', description: 'Encouraging the model to explain its reasoning step-by-step.' },
              { title: 'System Prompts', description: 'High-level instructions that define the model\'s persona and constraints.' }
            ]
          },
          diagram: {
            chart: 'graph TD\n  S[System Prompt] --> P[Final Prompt]\n  E[Few-Shot Examples] --> P\n  U[User Query] --> P\n  P --> LLM[Model Output]'
          },
          code: {
            code: 'system_prompt = "You are a senior data scientist. Answer concisely."\nuser_prompt = "Explain standard deviation."\n\n# Chain of Thought example\ncot_prompt = "Q: If I have 3 apples and eat 1, how many are left? A: Let\'s think step by step. I started with 3. I ate 1. 3 - 1 = 2. The answer is 2."\n\nprint("Good prompting shapes the output format, tone, and accuracy.")',
            breakdown: [
              { line: 'Let\'s think step by step', explanation: 'A magic phrase that forces the LLM to use more computation for reasoning.' }
            ]
          }
        },
        interviewQuestions: [
          { question: 'What is Zero-Shot vs Few-Shot prompting?', answer: 'Zero-shot asks the model to perform a task without examples; few-shot provides example input-output pairs.', difficulty: 'Fresher', category: 'Scenario' },
          { question: 'Explain the Chain-of-Thought technique.', answer: 'Asking the model to "think step-by-step" to improve logical reasoning on complex tasks.', difficulty: 'Mid', category: 'Scenario' }
        ]
      }
    ]
  },
  {
    id: 'agentic',
    slug: 'agentic-ai',
    name: 'Agentic AI',
    description: 'Autonomous agents, tool use, and multi-agent systems.',
    icon: Bot,
    level: 10,
    estimatedHours: 20,
    topics: [
      {
        id: 'agent-fundamentals',
        slug: 'ai-agents-vs-llms',
        title: 'AI Agents vs LLMs',
        description: 'Understanding the shift from passive language models to active autonomous agents.',
        sections: {
          what: {
            text: 'While a standard LLM is like a library—it provides information when asked—an AI Agent is like an intern. It has a goal, a plan, and the ability to use tools to achieve that goal.\n\nThe evolution of AI has moved from simple chat interfaces to autonomous systems. If you ask a standard LLM (like ChatGPT) to "book a flight," it will write out the steps you need to take. If you ask an AI Agent to "book a flight," it will actually browse the web, navigate the airline website, input your credit card, and send you the confirmation email.\n\nThis is possible because an Agent is wrapped in a cognitive loop. It takes your prompt, breaks it down into a multi-step plan, executes the first step using an API (tool), observes the result of that tool, and then updates its plan based on the new information. This "Stateful" reasoning allows Agents to navigate complex, unpredictable environments without continuous human hand-holding.',
            eli5: 'An LLM is a brain. An Agent is a brain with hands and a to-do list.'
          },
          breakdown: {
            components: [
              { title: 'Stateless vs. Stateful', description: 'LLMs respond to individual prompts; Agents maintain state across steps.' },
              { title: 'Reasoning Engines', description: 'LLMs serve as the "brain" that plans the next move.' },
              { title: 'The Agent Loop', description: 'Perception (Input) -> Reasoning (LLM) -> Action (Tool) -> Observation (Feedback).' }
            ]
          },
          diagram: {
            chart: 'graph TD\n    A[Goal/Input] --> B{Reasoning Engine}\n    B -->|Plan| C[Action/Tool Use]\n    C --> D[Observation/Result]\n    D --> B\n    B -->|Final Answer| E[User]'
          }
        },
        interviewQuestions: [
          { question: 'What is the primary difference between a standard LLM and an AI Agent?', answer: 'An LLM is a stateless predictor; an Agent is a stateful system that uses an LLM to plan and execute actions in an environment.', difficulty: 'Fresher', category: 'Conceptual' },
          { question: 'Describe the "Perception-Reasoning-Action" loop.', answer: 'The agent perceives context, reasons about the next step using an LLM, and takes an action (like calling a tool) to change the environment.', difficulty: 'Mid', category: 'Conceptual' },
          { question: 'How does an agent handle "hallucinations" during planning?', answer: 'By using self-correction loops where the observation from an action contradicts the plan, forcing the agent to re-reason.', difficulty: 'Senior', category: 'Conceptual' }
        ]
      },
      {
        id: 'tool-use',
        slug: 'function-calling-tools',
        title: 'Tool Use & Function Calling',
        description: 'How agents interact with APIs, databases, and external software.',
        sections: {
          what: {
            text: 'Function calling is the bridge between natural language and structured code. It allows an LLM to request the execution of a specific function with specific parameters.\n\nBy default, an LLM only knows how to generate text. It cannot calculate real-time math, search the live web, or read a database. To give an Agent these abilities, developers use "Tools" (or Function Calling). When setting up an Agent, you provide it with a JSON schema describing the tools it has available (e.g., `get_weather(location)`).\n\nWhen the user asks "What is the weather in Tokyo?", the LLM detects that it needs external information. Instead of generating a conversational response, it outputs a structured JSON object: `{"name": "get_weather", "arguments": {"location": "Tokyo"}}`. The application layer intercepts this JSON, executes the actual Python or Node.js function, and feeds the raw weather data back into the LLM. The LLM then uses that data to generate the final human-readable response.'
          },
          breakdown: {
            components: [
              { title: 'Tool Definition', description: 'Describing functions via JSON Schema.' },
              { title: 'Output Parsing', description: 'Converting LLM strings into executable arguments.' },
              { title: 'Feedback Integration', description: 'Feeding tool results back into the context window.' }
            ]
          },
          diagram: {
            chart: 'sequenceDiagram\n    participant L as LLM\n    participant P as Parser\n    participant T as Tool/API\n    L->>P: Natural Language / JSON\n    P->>T: Structured Function Call\n    T->>P: JSON Result\n    P->>L: Context Enrichment'
          }
        },
        interviewQuestions: [
          { question: 'How does an LLM "call" a function?', answer: 'The LLM is provided with function definitions (schemas). When it decides to use a tool, it generates the arguments in a structured format (like JSON) instead of natural language.', difficulty: 'Mid', category: 'Conceptual' },
          { question: 'What is a "Tool" in the context of LangChain or OpenAI?', answer: 'A Tool is a wrapper around a function that includes a name, description, and schema so the LLM knows when and how to use it.', difficulty: 'Fresher', category: 'Conceptual' },
          { question: 'Why is tool description quality important?', answer: 'The LLM uses the description to decide when to use the tool. Vague descriptions lead to incorrect tool selection.', difficulty: 'Mid', category: 'Conceptual' }
        ]
      },
      {
        id: 'react-pattern',
        slug: 'react-framework',
        title: 'The ReAct Framework',
        description: 'Implementing the "Reason + Act" logic for complex task solving.',
        sections: {
          what: {
            text: 'ReAct combines Reasoning (Chain-of-Thought) and Acting. This allows the model to explain why it is taking an action before it actually performs it.\n\nEarly agents would often get stuck in loops or use the wrong tools because they would immediately act without thinking. The ReAct framework (Reason + Act) solved this by forcing a strict sequence: Thought $\\rightarrow$ Action $\\rightarrow$ Observation.\n\nFirst, the agent generates a **Thought** explaining its current understanding of the problem. Second, it generates an **Action** (the tool call). Third, it receives the **Observation** (the tool result). By enforcing the "Thought" step, the LLM utilizes its language modeling capabilities to maintain logical consistency. If an API returns an error, the next "Thought" will acknowledge the error and plan a workaround, making ReAct agents incredibly resilient to failures.'
          },
          breakdown: {
            components: [
              { title: 'Thought', description: 'Internal reasoning about the current state.' },
              { title: 'Action', description: 'The specific tool to call.' },
              { title: 'Observation', description: 'The real-world output of that tool.' }
            ]
          },
          diagram: {
            chart: 'graph LR\n    T[Thought] --> A[Action]\n    A --> O[Observation]\n    O --> T'
          }
        },
        interviewQuestions: [
          { question: 'Explain the ReAct (Reason + Act) pattern.', answer: 'It is a prompting technique where the model generates a "Thought" (reasoning step), then an "Action" (tool call), and receives an "Observation" (result) before continuing.', difficulty: 'Mid', category: 'Conceptual' },
          { question: 'Why is the "Thought" step important in ReAct?', answer: 'It allows the model to break down complex problems and "think out loud," which reduces errors in tool selection and argument generation.', difficulty: 'Senior', category: 'Conceptual' },
          { question: 'Compare ReAct to simple Chain-of-Thought.', answer: 'CoT is internal reasoning for static answers; ReAct extends this by allowing the reasoning to interact with external environments via actions.', difficulty: 'Senior', category: 'Conceptual' }
        ]
      },
      {
        id: 'multi-agent',
        slug: 'multi-agent-orchestration',
        title: 'Multi-Agent Orchestration',
        description: 'Coordinating multiple agents to solve larger, multi-step problems.',
        sections: {
          what: {
            text: 'One agent can do much, but a team of specialized agents (Researcher, Coder, QA) can handle enterprise-grade tasks with higher reliability.\n\nAs tasks become more complex, a single agent with 50 different tools becomes easily confused and prone to hallucination. Multi-Agent Orchestration solves this by dividing labor. Just like a human company, you create specialized agents: a "Researcher" with web-search tools, a "Coder" with Python execution tools, and a "QA" agent that reviews code.\n\nFrameworks like LangGraph, AutoGen, and CrewAI allow you to orchestrate these agents. They can pass messages to each other in a sequential chain, or operate in a hierarchical structure where a "Manager Agent" breaks down the user\'s prompt and delegates tasks to the worker agents. This paradigm drastically reduces errors because each agent has a narrow, highly focused system prompt.'
          },
          breakdown: {
            components: [
              { title: 'Supervisor Pattern', description: 'One agent manages others.' },
              { title: 'Sequential Flow', description: 'Agents pass work in a linear chain.' },
              { title: 'Broadcast Pattern', description: 'Agents collaborate in a shared workspace (Blackboard architecture).' }
            ]
          },
          diagram: {
            chart: 'graph TD\n    S[Supervisor Agent] --> A[Research Agent]\n    S --> B[Writing Agent]\n    S --> C[Formatting Agent]\n    A -->|Data| S\n    B -->|Draft| S\n    C -->|Final| S'
          }
        },
        interviewQuestions: [
          { question: 'What is Multi-Agent Orchestration?', answer: 'The practice of dividing a complex task among multiple specialized agents that communicate and share state.', difficulty: 'Senior', category: 'Conceptual' },
          { question: 'Describe a "Manager" agent pattern.', answer: 'One central agent acts as a supervisor, delegating tasks to sub-agents and synthesizing their results into a final output.', difficulty: 'Mid', category: 'Scenario' },
          { question: 'What are the benefits of using multiple agents instead of one large prompt?', answer: 'Separation of concerns, reduced context noise, better debugging, and the ability to use different models for different tasks.', difficulty: 'Senior', category: 'Conceptual' }
        ]
      },
      {
        id: 'future-ai',
        slug: 'future-autonomous-systems',
        title: 'Future of Autonomous Systems',
        description: 'Looking ahead at AGI, AutoGPT, and the evolution of AI workflows.',
        sections: {
          what: {
            text: 'The trajectory of AI is moving from completion (answering) to agency (executing). This path introduces new challenges in alignment, safety, and reliability.\n\nWe are currently transitioning from Level 2 AI (Chatbots) to Level 3 AI (Agents). In the near future, we will see Level 4 systems: fully autonomous swarms of agents that can run for weeks at a time, managing entire business departments, launching software products, and negotiating with other AI agents over APIs.\n\nThis shift brings massive engineering challenges. Agents can suffer from "Goal Drift" (forgetting their original purpose over long time horizons) or get stuck in infinite API loops that rack up thousands of dollars in cloud computing bills. To mitigate this, developers implement "Human-in-the-loop" (HITL) architecture, where the agent is forced to pause and request human approval before executing sensitive actions like transferring money or deleting databases.'
          },
          breakdown: {
            components: [
              { title: 'Goal Drift', description: 'Ensuring agents don\'t deviate from their original objective.' },
              { title: 'Infinite Loops', description: 'Preventing agents from getting stuck in repetitive actions.' },
              { title: 'Human-in-the-Loop (HITL)', description: 'Critical checkpoints for autonomous agents.' }
            ]
          }
        },
        interviewQuestions: [
          { question: 'What are the main challenges in long-running autonomous agents?', answer: 'Infinite loops (cost), context window limits, and "goal drift" where the agent loses sight of the original objective.', difficulty: 'Senior', category: 'Conceptual' },
          { question: 'What was the significance of projects like AutoGPT?', answer: 'They popularized the idea of self-prompting agents that recursively break down goals without human intervention.', difficulty: 'Mid', category: 'Conceptual' },
          { question: 'What is "Human-in-the-loop" in agentic systems?', answer: 'A design pattern where an agent must pause and get human approval before taking sensitive or expensive actions.', difficulty: 'Fresher', category: 'Conceptual' }
        ]
      }
    ]
  },
  {
    id: 'vis',
    slug: 'visualization',
    name: 'Data Visualization',
    description: 'Tell a story with your data using Matplotlib and Seaborn.',
    icon: BarChart3,
    level: 4,
    estimatedHours: 10,
    topics: [
      {
        id: 'vis-intro',
        slug: 'intro',
        title: 'Matplotlib Basics',
        description: 'The foundation of plotting in Python.',
        sections: {
          what: { 
            text: 'Matplotlib is the "grandfather" of Python visualization. It gives you total control over every element of a plot.\n\nData without visualization is just a wall of numbers. The human brain is highly optimized for visual pattern recognition, which is why charts and graphs are critical for communicating data science findings. Matplotlib is the foundational 2D plotting library for Python, upon which almost all other visualization tools are built.\n\nIt operates on two main objects: the `Figure` (the overall window or page) and the `Axes` (the actual plot area with an X and Y axis). While the code to make a beautiful Matplotlib chart can sometimes be verbose, it offers unparalleled customization. You can tweak the exact pixel location of legends, the font size of tick marks, and the color gradients of scatter plots.',
            eli5: 'It\'s like a professional canvas where you can draw any chart you can imagine, pixel by pixel.'
          },
          diagram: {
            chart: 'graph TD\n  Data --> Plot[Figure/Canvas]\n  Plot --> Axes\n  Axes --> Line/Bar\n  Axes --> Labels/Title'
          },
          breakdown: {
            components: [
              { title: 'Figure', description: 'The overall window or page that everything is drawn on.' },
              { title: 'Axes', description: 'The area where data is plotted with ticks and labels.' }
            ]
          },
          code: {
            code: 'import matplotlib.pyplot as plt\n\nx = [1, 2, 3, 4]\ny = [10, 20, 25, 30]\n\nplt.plot(x, y)\nplt.title("Sample Chart")\nplt.show()',
            breakdown: [
              { line: 'plt.plot(x, y)', explanation: 'Creates a line chart.' },
              { line: 'plt.show()', explanation: 'Renders the plot in the viewer.' }
            ]
          }
        },
        interviewQuestions: [
          { question: 'What is the difference between a Figure and an Axes in Matplotlib?', answer: 'A Figure is the entire window/canvas. An Axes is the actual plot area (with x/y boundaries) where data is drawn. A Figure can hold multiple Axes.', difficulty: 'Mid', category: 'Conceptual' }
        ]
      },
      {
        id: 'vis-seaborn',
        slug: 'seaborn',
        title: 'Beautiful Charts with Seaborn',
        description: 'Statistical data visualization made easy and beautiful.',
        sections: {
          what: { 
            text: 'Seaborn is built on top of Matplotlib. It provides a high-level interface for drawing attractive and informative statistical graphics.\n\nWhile Matplotlib gives you absolute control, it requires a lot of boilerplate code to make a chart look "modern" and professional. Seaborn was created to solve this. It comes with stunning default themes, sophisticated color palettes, and functions specifically designed to visualize statistical relationships.\n\nMore importantly, Seaborn integrates natively with Pandas DataFrames. Instead of manually extracting X and Y arrays like in Matplotlib, you can pass your entire DataFrame directly into a Seaborn function like `sns.scatterplot(data=df, x="age", y="salary", hue="department")`. Seaborn will automatically group the data by department, color-code the points, and generate a beautiful legend in a single line of code.',
            eli5: 'If Matplotlib is painting a picture from scratch, Seaborn is using beautiful pre-made stencils and color palettes.'
          },
          diagram: {
            chart: 'graph LR\n  Pandas[Pandas DataFrame] --> Seaborn\n  Seaborn -->|Wraps| Matplotlib[Matplotlib Canvas]\n  Matplotlib --> Output[Beautiful Chart]'
          },
          breakdown: {
            components: [
              { title: 'Data Integration', description: 'Seaborn is designed to work directly with Pandas DataFrames.' },
              { title: 'Themes', description: 'Built-in themes to quickly make plots look modern.' }
            ]
          },
          code: {
            code: 'import seaborn as sns\nimport pandas as pd\n\ndata = pd.DataFrame({"Category": ["A", "B", "A", "B"], "Value": [10, 20, 15, 25]})\nsns.barplot(data=data, x="Category", y="Value")\n# Note: In Pyodide, plots might not render without specific display logic, but the code executes.',
            breakdown: [
              { line: 'sns.barplot', explanation: 'Automatically aggregates and plots data with error bars.' }
            ]
          }
        },
        interviewQuestions: [
          { question: 'Why use Seaborn over Matplotlib?', answer: 'Seaborn requires much less code for statistical plots, integrates natively with Pandas DataFrames, and has better default aesthetics.', difficulty: 'Fresher', category: 'Conceptual' }
        ]
      }
    ]
  }
];
