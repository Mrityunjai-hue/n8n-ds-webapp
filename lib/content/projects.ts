import { Database, BrainCircuit, BarChart3, Bot, LucideIcon } from 'lucide-react';

export interface ProjectStep {
  id: string;
  title: string;
  instructions: string;
  starterCode: string;
  expectedOutput?: string;
  hint?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  subject: string;
  language: 'python' | 'sql';
  icon: any; // LucideIcon
  color: string;
  bg: string;
  steps: ProjectStep[];
}

export const PROJECTS: Project[] = [
  {
    id: 'sql-analytics',
    title: 'E-commerce SQL Analytics',
    description: 'Build a complex database schema for an e-commerce platform and write advanced CTEs to analyze customer lifetime value.',
    difficulty: 'Intermediate',
    subject: 'SQL',
    language: 'sql',
    icon: Database,
    color: 'text-accent-teal',
    bg: 'bg-accent-teal/10',
    steps: [
      {
        id: 'step-1',
        title: 'Create the Schema',
        instructions: "Let's start by setting up our e-commerce tables. Create a customers table and an orders table. Customers should have an id, name, and join_date. Orders should have an id, customer_id, order_date, and total_amount.",
        starterCode: "-- Write your CREATE TABLE statements here\n\n",
        hint: "Use standard SQLite syntax. Create customers first, then orders with a foreign key referencing customers(id)."
      },
      {
        id: 'step-2',
        title: 'Insert Sample Data',
        instructions: 'Populate the tables with some sample data. Add at least 3 customers and 5 orders distributed among them.',
        starterCode: "-- Insert data into customers and orders\n\n",
        hint: 'INSERT INTO customers (id, name, join_date) VALUES (1, "Alice", "2023-01-01");'
      },
      {
        id: 'step-3',
        title: 'Calculate LTV (Lifetime Value)',
        instructions: 'Write a query using a CTE to calculate the total amount spent by each customer, also known as their Lifetime Value (LTV). Order the results from highest to lowest LTV.',
        starterCode: "WITH CustomerTotals AS (\n  SELECT 1 as customer_id, 0 as total_amount\n  -- Replace this with your CTE\n)\nSELECT * FROM CustomerTotals;\n",
        hint: 'GROUP BY customer_id and SUM(total_amount)'
      }
    ]
  },
  {
    id: 'titanic-ml',
    title: 'Titanic Survival Predictor',
    description: 'The classic ML project. Clean the Titanic dataset using Pandas and build a Logistic Regression model to predict survivors.',
    difficulty: 'Beginner',
    subject: 'ML Basics',
    language: 'python',
    icon: BrainCircuit,
    color: 'text-accent-blue',
    bg: 'bg-accent-blue/10',
    steps: [
      {
        id: 'step-1',
        title: 'Load and Inspect Data',
        instructions: 'Import pandas and create a mock DataFrame representing the Titanic dataset with columns: PassengerId, Survived, Pclass, Sex, Age, Fare.',
        starterCode: "import pandas as pd\nimport numpy as np\n\n# Let's create a mock dataset since we don't have the CSV file here\ndata = {\n    'PassengerId': [1, 2, 3, 4, 5],\n    'Survived': [0, 1, 1, 1, 0],\n    'Pclass': [3, 1, 3, 1, 3],\n    'Sex': ['male', 'female', 'female', 'female', 'male'],\n    'Age': [22, 38, 26, 35, 35],\n    'Fare': [7.25, 71.28, 7.92, 53.1, 8.05]\n}\n\ndf = pd.DataFrame(data)\n\n# Your task: Print the first 5 rows and summary statistics\n",
        hint: 'Use df.head() and df.describe()'
      },
      {
        id: 'step-2',
        title: 'Data Preprocessing',
        instructions: 'Convert the "Sex" column to numeric values (male=0, female=1) to prepare it for the ML model.',
        starterCode: "# Convert categorical variable 'Sex' to numeric\n",
        hint: 'df["Sex"] = df["Sex"].map({"male": 0, "female": 1})'
      },
      {
        id: 'step-3',
        title: 'Train the Model',
        instructions: 'Since we cannot load scikit-learn in Pyodide without micropip, write a simple custom heuristic function that predicts survival based on Sex and Pclass.',
        starterCode: "def predict_survival(row):\n    # Write a simple heuristic:\n    # e.g., females in 1st class survive, males in 3rd class don't\n    pass\n\n# Apply the function to create a 'Prediction' column\ndf['Prediction'] = df.apply(predict_survival, axis=1)\nprint(df[['Survived', 'Prediction']])\n",
        hint: 'if row["Sex"] == 1 and row["Pclass"] == 1: return 1 ...'
      }
    ]
  },
  {
    id: 'agentic-researcher',
    title: 'Autonomous Research Agent',
    description: 'Build an AI Agent using basic Python principles to simulate reasoning, tool selection, and execution.',
    difficulty: 'Advanced',
    subject: 'Agentic AI',
    language: 'python',
    icon: Bot,
    color: 'text-accent-amber',
    bg: 'bg-accent-amber/10',
    steps: [
      {
        id: 'step-1',
        title: 'Define Tools',
        instructions: 'Create a dictionary of "tools" (functions) the agent can use, such as a mock `search_web` and `calculate`.',
        starterCode: "def search_web(query):\n    return f'Search results for {query}'\n\ndef calculate(expression):\n    return eval(expression)\n\n# Create a dictionary mapping tool names to functions\ntools = {\n    \n}\n",
        hint: '{"search": search_web, "calc": calculate}'
      },
      {
        id: 'step-2',
        title: 'Agent Loop',
        instructions: 'Write a basic ReAct (Reason+Act) loop. Given a user query, parse it to find which tool to call, execute the tool, and return the result.',
        starterCode: "def agent_execute(prompt):\n    # Very simple mock parser\n    if 'search' in prompt.lower():\n        return tools['search'](prompt.split('search for ')[-1])\n    elif 'calculate' in prompt.lower():\n        return tools['calc'](prompt.split('calculate ')[-1])\n    return 'I dont know how to do that.'\n\nprint(agent_execute('search for Quantum Computing'))\n",
        hint: 'Use the `tools` dictionary you created in step 1.'
      }
    ]
  },
  {
    id: 'crypto-dashboard',
    title: 'Real-time Crypto Dashboard',
    description: 'Simulate fetching cryptocurrency prices and visualize them using basic console plots.',
    difficulty: 'Intermediate',
    subject: 'Data Vis',
    language: 'python',
    icon: BarChart3,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    steps: [
      {
        id: 'step-1',
        title: 'Mock Data Fetch',
        instructions: 'Create a function that returns mock time-series data for Bitcoin prices over 5 days.',
        starterCode: "import json\n\ndef fetch_btc_data():\n    # Return a mock JSON string\n    return '{\"prices\": [40000, 42000, 41500, 43000, 45000]}'\n\n# Parse the JSON and print prices\n",
        hint: 'Use json.loads()'
      },
      {
        id: 'step-2',
        title: 'ASCII Bar Chart',
        instructions: 'Write a function to print a simple ASCII bar chart representing the prices.',
        starterCode: "data = json.loads(fetch_btc_data())\nprices = data['prices']\n\ndef print_chart(prices):\n    # Map prices to a number of asterisks (*)\n    pass\n\nprint_chart(prices)\n",
        hint: 'Divide the price by 1000 to get a reasonable number of asterisks.'
      }
    ]
  }
];
