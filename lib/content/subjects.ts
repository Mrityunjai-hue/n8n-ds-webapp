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
            text: 'SQL (Structured Query Language) is the standard language for managing and manipulating relational databases.',
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
            text: 'The SELECT statement is used to pick specific columns from a table, while FROM specifies which table those columns live in.',
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
            text: 'The WHERE clause allows you to filter records that fulfill a specified condition. It acts as a gatekeeper for your rows.',
            eli5: 'It\'s like a filter on an e-commerce site where you only show "Shoes" that are "Size 10".'
          },
          why: {
            text: 'Without filtering, you would always get every row in a table. WHERE allows you to zoom in on specific segments, like "active users" or "high-value transactions".'
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
            text: 'ORDER BY is used to sort the result-set in ascending or descending order. LIMIT is used to specify the number of records to return.',
            eli5: 'ORDER BY is like sorting your contact list by name. LIMIT is like only looking at the first 10 names.'
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
            text: 'A JOIN clause is used to combine rows from two or more tables, based on a related column between them.',
            eli5: 'It\'s like connecting a "Customer ID" on an order to the "Customer ID" in the customers list to see who bought what.'
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
            text: 'Python is a high-level, interpreted language known for its readability and massive ecosystem of data science libraries.',
            eli5: 'Python is like a Swiss Army knife that is really easy to use.'
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
            text: 'Variables are containers for storing data values. Python has various types like integers, floats, strings, and booleans.',
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
            text: 'Loops allow you to execute a block of code multiple times. For loops are great for iterating over collections, while While loops run as long as a condition is true.',
            eli5: 'It\'s like telling someone to "Keep jumping until I say stop" (While) or "Jump 5 times" (For).'
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
            text: 'A function is a block of code which only runs when it is called. You can pass data, known as parameters, into a function.',
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
            text: 'Lists are ordered collections. Dictionaries are key-value pairs. Together, they form the backbone of data manipulation in Python.',
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
  // Add other subjects as placeholders for now
  { id: 'bi', slug: 'power-bi', name: 'Power BI', description: 'Data visualization.', icon: Layout, level: 3, estimatedHours: 10, topics: [] },
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
        description: 'Why NumPy is faster than Python lists.',
        sections: {
          what: { text: 'NumPy is the fundamental package for scientific computing in Python.' },
          code: { code: 'import numpy as np\narr = np.array([1, 2, 3])' }
        },
        interviewQuestions: []
      }
    ]
  },
  {
    id: 'pandas',
    slug: 'pandas',
    name: 'Pandas for Data',
    description: 'Data manipulation and analysis with DataFrames.',
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
          what: { text: 'Pandas provides high-performance data structures like the DataFrame.' },
          code: { code: 'import pandas as pd\ndf = pd.read_csv("data.csv")' }
        },
        interviewQuestions: []
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
            text: 'Machine Learning (ML) is a branch of AI that enables systems to learn from data and improve from experience without being explicitly programmed.',
            eli5: 'Instead of giving a computer a list of rules, we give it a million examples and let it figure out the rules itself.'
          },
          components: {
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
          what: { text: 'Linear regression models the relationship between a dependent variable and one or more independent variables.' },
          components: {
            components: [
              { title: 'Slope (m)', description: 'How much the output changes for every unit change in input.' },
              { title: 'Intercept (c)', description: 'The value of the output when the input is zero.' }
            ]
          },
          code: { 
            code: 'from sklearn.linear_model import LinearRegression\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)',
            breakdown: [{ line: 'model.fit()', explanation: 'Trains the model on our data.' }]
          }
        },
        interviewQuestions: []
      },
      {
        id: 'ml-workflow',
        slug: 'workflow',
        title: 'The ML Workflow',
        description: 'The step-by-step process of building a machine learning system.',
        sections: {
          what: { text: 'Building an ML model isn\'t just about the algorithm. it\'s a multi-stage lifecycle.' },
          components: {
            components: [
              { title: 'Data Collection', description: 'Gathering raw data from various sources.' },
              { title: 'Preprocessing', description: 'Cleaning and preparing data for the model.' },
              { title: 'Training', description: 'The model learns patterns from the data.' },
              { title: 'Evaluation', description: 'Testing the model on unseen data.' },
              { title: 'Deployment', description: 'Making the model available for real-world use.' }
            ]
          },
          diagram: { chart: 'graph TD\n  A[Collect] --> B[Clean]\n  B --> C[Train]\n  C --> D[Evaluate]\n  D --> E[Deploy]' }
        },
        interviewQuestions: []
      },
      {
        id: 'ml-logistic',
        slug: 'logistic-regression',
        title: 'Logistic Regression',
        description: 'The foundation of classification. Predicting categories instead of values.',
        sections: {
          what: { text: 'Logistic regression is used to estimate the probability that an instance belongs to a particular class.' },
          components: {
            components: [
              { title: 'Sigmoid Function', description: 'Squashes any real-valued number into a value between 0 and 1.' },
              { title: 'Decision Boundary', description: 'The threshold used to classify an instance (usually 0.5).' }
            ]
          }
        },
        interviewQuestions: [
          { question: 'Why use Sigmoid in Logistic Regression?', answer: 'To map predictions to probabilities between 0 and 1.', difficulty: 'Mid', category: 'Conceptual' }
        ]
      }
    ]
  },
  { id: 'dl', slug: 'deep-learning', name: 'Deep Learning', description: 'Neural Networks.', icon: Network, level: 8, estimatedHours: 25, topics: [] },
  { id: 'genai', slug: 'gen-ai', name: 'Generative AI', description: 'LLMs & RAG.', icon: Sparkles, level: 9, estimatedHours: 15, topics: [] },
  { id: 'agentic', slug: 'agentic-ai', name: 'Agentic AI', description: 'AI Agents.', icon: Bot, level: 10, estimatedHours: 20, topics: [] },
];
