import { PageContext } from '@/hooks/usePageContext';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export type NovaMode = 'explain' | 'quiz' | 'debug' | 'summarise' | 'whatnext';

export const MODE_OPTIONS: {
  key: NovaMode;
  label: string;
  icon: string;
  placeholder: string;
  modePrompt: (ctx: PageContext) => string;
}[] = [
  {
    key: 'explain',
    label: 'Explain',
    icon: '💡',
    placeholder: 'Ask Nova anything about this topic...',
    modePrompt: (ctx) =>
      `Explain ${ctx.currentTopic ?? 'this topic'} using a fresh analogy. Make it concrete with a real-world example.`,
  },
  {
    key: 'quiz',
    label: 'Quiz Me',
    icon: '❓',
    placeholder: 'Nova will quiz you on this topic...',
    modePrompt: (ctx) =>
      `Quiz me on ${ctx.currentTopic ?? ctx.currentSubject ?? 'data science'}. Ask me ONE interview-style question and wait for my answer before revealing yours. Start now.`,
  },
  {
    key: 'debug',
    label: 'Debug',
    icon: '🐛',
    placeholder: 'Paste your broken code here...',
    modePrompt: () => `Help me debug this code. Find the bug, explain why it's wrong, and show the fixed version:\n\n`,
  },
  {
    key: 'summarise',
    label: 'Summarise',
    icon: '⚡',
    placeholder: 'Nova will give you a revision summary...',
    modePrompt: (ctx) =>
      `Give me a 5-bullet revision summary of ${ctx.currentTopic ?? ctx.currentSubject ?? 'this topic'} that I can review right before an interview. Use **bold** for the most critical point in each bullet.`,
  },
  {
    key: 'whatnext',
    label: 'What Next',
    icon: '🗺️',
    placeholder: 'Nova will guide your next steps...',
    modePrompt: (ctx) =>
      `Based on what I've studied (${ctx.currentSubject ?? 'data science'} — ${ctx.currentTopic ?? 'various topics'}), what should I study next and why? Give me a clear learning path with specific reasons.`,
  },
];

export function getSuggestedPrompts(ctx: PageContext): string[] {
  if (ctx.isOnLesson && ctx.currentTopic) {
    const t = ctx.currentTopic;
    return [
      `Explain ${t} with a real-world analogy`,
      `What's the most common interview trap with ${t}?`,
      `Quiz me on ${t}`,
      `Summarise ${t} in 5 bullets for revision`,
    ];
  }
  if (ctx.pageType === 'interview') {
    return [
      'Give me a SQL interview question',
      'What are common ML interview topics?',
      'How do I answer a technical question in an interview?',
      'What is the STAR method?',
    ];
  }
  if (ctx.pageType === 'projects') {
    return [
      'What project should I build first?',
      'How do I make a data science portfolio?',
      'How do I deploy a Python project?',
      'Suggest a project for my current skill level',
    ];
  }
  return [
    'Where should I start in data science?',
    'What skills do I need for a data analyst role?',
    'Difference between ML and Deep Learning?',
    'Quiz me on SQL basics',
  ];
}

export async function sendNovaMessage({
  messages,
  userMessage,
  mode,
  ctx,
  onChunk,
}: {
  messages: ChatMessage[];
  userMessage: string;
  mode: NovaMode;
  ctx: PageContext;
  onChunk: (chunk: string) => void;
}): Promise<void> {
  const isFirstMessage = messages.length === 0;
  
  let responseText = '';
  const lowerInput = userMessage.toLowerCase();
  
  // Extract topic from context or user input
  let topic = 'data science';
  if (lowerInput.includes('numpy')) topic = 'numpy';
  else if (lowerInput.includes('pandas')) topic = 'pandas';
  else if (lowerInput.includes('sql')) topic = 'sql';
  else if (lowerInput.includes('python')) topic = 'python';
  else if (lowerInput.includes('machine learning') || lowerInput.includes('ml')) topic = 'machine learning';
  else if (lowerInput.includes('deep learning')) topic = 'deep learning';
  else if (lowerInput.includes('git')) topic = 'git';
  else if (ctx.currentSubject) topic = ctx.currentSubject.toLowerCase();
  
  // Knowledge Base for offline mode
  const knowledgeBase: Record<string, any> = {
    'numpy': {
      quiz: `Here is a quiz question on **NumPy**:\n\n**Q: What is the key difference between a Python List and a NumPy Array?**\n\nTake a moment to think about memory and performance, then let me know when you're ready for the answer!`,
      explain: `**NumPy** (Numerical Python) is the core library for scientific computing in Python. It provides a high-performance multidimensional array object (\`ndarray\`).\n\nUnlike standard Python lists, NumPy arrays are stored in continuous memory, making operations mathematically vectorized and incredibly fast.`,
      summary: `**NumPy Quick Summary:**\n- **Core Concept:** \`ndarray\` (N-dimensional array).\n- **Creation:** \`np.array([1, 2, 3])\` or \`np.zeros((3,3))\`\n- **Operations:** Vectorized (no \`for\` loops needed for math!).\n- **Pro Tip:** Always check the \`.shape\` of your arrays to debug broadcasting errors.`
    },
    'pandas': {
      quiz: `Here is a quiz question on **Pandas**:\n\n**Q: What is the difference between \`loc\` and \`iloc\` when selecting data in a DataFrame?**\n\nThink about how rows are indexed, then let me know your answer!`,
      explain: `**Pandas** is the ultimate data manipulation tool in Python. Think of it as "Excel on steroids."\n\nIt introduces two main data structures: **Series** (1D column) and **DataFrame** (2D table). It allows you to clean, filter, group, and analyze massive datasets effortlessly.`,
      summary: `**Pandas Quick Summary:**\n- **Core Concept:** DataFrames (tables) and Series (columns).\n- **Reading Data:** \`pd.read_csv('file.csv')\`\n- **Filtering:** \`df[df['age'] > 25]\`\n- **Aggregation:** \`df.groupby('city')['sales'].mean()\``
    },
    'sql': {
      quiz: `Here is a quiz question on **SQL**:\n\n**Q: What is the difference between \`WHERE\` and \`HAVING\`?**\n\nThis is a classic interview question! Think about aggregation, then type your answer.`,
      explain: `**SQL** (Structured Query Language) is the standard language for communicating with relational databases.\n\nIt allows you to read, write, update, and delete data using simple, declarative commands like \`SELECT\`, \`INSERT\`, and \`UPDATE\`.`,
      summary: `**SQL Quick Summary:**\n- **Core Concept:** Relational tables and declarative querying.\n- **Order of Execution:** FROM > WHERE > GROUP BY > HAVING > SELECT > ORDER BY\n- **Pro Tip:** \`JOIN\` connects tables horizontally, \`UNION\` connects them vertically.`
    },
    'python': {
      quiz: `Here is a quiz question on **Python**:\n\n**Q: What is a dictionary comprehension, and how does it differ from a list comprehension?**\n\nThink about the syntax, then let me know!`,
      explain: `**Python** is an interpreted, high-level programming language known for its readability. In data science, it is the glue that connects powerful C/C++ libraries (like NumPy and TensorFlow) through a simple, beginner-friendly syntax.`,
      summary: `**Python Quick Summary:**\n- **Data Structures:** Lists \`[]\`, Tuples \`()\`, Sets \`{}\`, Dicts \`{k:v}\`.\n- **Control Flow:** \`if/elif/else\`, \`for/while\` loops.\n- **Functions:** Defined with \`def\` or anonymous \`lambda\`.\n- **Pro Tip:** List comprehensions \`[x for x in list]\` are faster and cleaner than loops.`
    },
    'machine learning': {
      quiz: `Here is a quiz question on **Machine Learning**:\n\n**Q: What is the difference between Supervised and Unsupervised Learning?**\n\nThink about labels, then let me know when you're ready!`,
      explain: `**Machine Learning** is a subset of AI where systems learn patterns from data instead of being explicitly programmed.\n\nFor example, instead of writing \`if (house_size > 2000) price = 500k\`, an ML model looks at past data to figure out that rule itself.`,
      summary: `**ML Quick Summary:**\n- **Supervised:** Learning with labeled data (Regression, Classification).\n- **Unsupervised:** Learning without labels (Clustering, PCA).\n- **Evaluation:** Accuracy, Precision, Recall, F1-Score, RMSE.\n- **Pro Tip:** Always split your data into Train/Test sets to avoid overfitting!`
    },
    'default': {
      quiz: `Here is a general data science quiz question:\n\n**Q: Why is data cleaning often considered the most important step in a data science project?**\n\nTake a moment to answer, then let me know!`,
      explain: `Data Science is the field of extracting insights from messy data using math, statistics, and programming. It involves data cleaning, exploratory data analysis (EDA), and predictive modeling.`,
      summary: `**Topic Summary:**\n- **Core Concept:** It's the foundational building block for this section.\n- **When to use:** Whenever you need to optimize your workflow.\n- **Common Trap:** Forgetting edge cases during implementation.\n- **Next Steps:** Apply this in the interactive lab!`
    }
  };

  const kbEntry = knowledgeBase[topic] || knowledgeBase['default'];

  // Simulated AI Engine (Offline Mode)
  if (mode === 'quiz' || lowerInput.includes('quiz')) {
    responseText = kbEntry.quiz;
  } else if (mode === 'summarise' || lowerInput.includes('summarize') || lowerInput.includes('summary')) {
    responseText = kbEntry.summary;
  } else if (mode === 'whatnext') {
    responseText = `Based on what you've studied in **${topic.toUpperCase()}**, I highly recommend jumping into the **Interactive Lab** for this section to apply what you've learned.\n\nAlternatively, you can check out the **Projects Lab** to start building a portfolio piece!`;
  } else if (mode === 'debug' || lowerInput.includes('debug') || lowerInput.includes('error')) {
    responseText = `I see you're looking for help debugging. Since I'm currently running in **Offline Mode**, I can't analyze code dynamically.\n\nHowever, here is a quick debugging checklist:\n1. Check for typos in variable names\n2. Ensure all brackets and quotes are closed\n3. Verify that your data types match what the function expects\n4. Use \`print()\` statements to track where the code breaks`;
  } else if (lowerInput.includes('project') || lowerInput.includes('portfolio')) {
    responseText = `Building projects is the best way to stand out!\n\nIf you are a beginner, I highly recommend the **Netflix EDA** project in the Projects Lab. If you are more advanced, try the **End-to-End Churn Prediction** model.\n\nHead over to the **Projects Lab** from the main dashboard to get started!`;
  } else if (lowerInput.includes('interview')) {
    responseText = `For interviews, focus on the STAR method (Situation, Task, Action, Result) for behavioral questions, and practice explaining your thought process out loud for technical questions. Check out the **Interview Prep** tab in the curriculum!`;
  } else if (lowerInput.includes('hello') || lowerInput.includes('hi ') || lowerInput.includes('hey')) {
    responseText = `Hello there! I'm Nova, your AI study companion. I'm currently running in offline guide mode. How can I help you navigate the curriculum today?`;
  } else if (mode === 'explain' && Object.keys(knowledgeBase).includes(topic)) {
    responseText = kbEntry.explain;
  } else {
    // Default fallback
    const contextName = ctx.currentTopic ? ` **${ctx.currentTopic}**` : '';
    responseText = `I'm currently running in **Offline Guide Mode** to keep the platform 100% free! \n\nWhile I can't generate custom AI answers right now, I'm here to help you navigate. I recommend checking out the interactive labs or interview prep for${contextName}. What specific area are you looking to explore?`;
  }

  // Simulate network delay before starting to stream
  await new Promise(resolve => setTimeout(resolve, 500));

  // Simulate streaming chunk by chunk
  const chunkSize = 4;
  for (let i = 0; i < responseText.length; i += chunkSize) {
    const chunk = responseText.slice(i, i + chunkSize);
    onChunk(chunk);
    // Randomize delay slightly for realistic typing effect (10-30ms)
    await new Promise(resolve => setTimeout(resolve, Math.random() * 20 + 10));
  }
}
