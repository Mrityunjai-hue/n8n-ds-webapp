// ─────────────────────────────────────────────────────────────────────────────
// Video Lessons — Sourced exclusively from @krishnaik06 (Krish Naik)
// ─────────────────────────────────────────────────────────────────────────────

export interface VideoLesson {
  id: string;          // YouTube video ID (the part after ?v=)
  title: string;       // Display title
  duration?: string;   // e.g. "12:34"
  section: string;     // Which curriculum section this belongs to
  playlistId?: string; // YouTube playlist ID if part of a playlist
  description?: string;// Short description
}

export interface SectionVideos {
  subjectSlug: string;
  topicSlug: string;
  videos: VideoLesson[];
}

// ─── Thumbnail & Embed helpers ────────────────────────────────────────────────

/** Returns the mqdefault YouTube thumbnail URL for a given video ID */
export function getYTThumb(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
}

/** Returns the YouTube embed URL, optionally scoped to a playlist */
export function getYTEmbed(videoId: string, playlistId?: string): string {
  const base = `https://www.youtube.com/embed/${videoId}`;
  return playlistId
    ? `${base}?list=${playlistId}&autoplay=1`
    : `${base}?autoplay=1`;
}

// ─── Verified Playlist IDs ────────────────────────────────────────────────────
const PYTHON_PLAYLIST    = 'PLZoTAELRMXVNUL99R4bDlVYsncUNvwUBB';
const STATS_PLAYLIST     = 'PLZoTAELRMXVMhVyr3Ri9IQ-t5QPBtxzJO';
const ML_PLAYLIST        = 'PLZoTAELRMXVPMbdMTjwolBI0cJcvASePD';
const DL_NLP_PLAYLIST    = 'PLZoTAELRMXVPGU70ZGsckrMdr0FteeRUi';
const NLP_LIVE_PLAYLIST  = 'PLZoTAELRMXVNNrHSKv36Lr3_156yCo6Nn';
const FEAT_ENG_PLAYLIST  = 'PLZoTAELRMXVPwYGE2PXD3x0bfKnR0cJjN';
const EDA_PLAYLIST       = 'PLxvLUL96MOO6F8x2fLgFlNrJVcKPQuS3a';
const PROJECTS_PLAYLIST  = 'PLZoTAELRMXVPS-dOaVbAux22vzqdgoGhG';
const FLASK_PLAYLIST     = 'PLZoTAELRMXVPBaLN3e-uoVRR9hlRFRfUc';
const GIT_PLAYLIST       = 'PLZoTAELRMXVOSsBerFZKsdCaA4RYr4RGW';

// ─── Video Lesson Mappings ────────────────────────────────────────────────────

export const videoLessons: SectionVideos[] = [

  // ── SECTION 1 — Getting Started ──────────────────────────────────────────
  {
    subjectSlug: 'python',
    topicSlug: 'getting-started',
    videos: [
      {
        id: 'bPrmA1SEN2k',
        title: 'Complete Python Roadmap & Anaconda Installation',
        section: 'Getting Started',
        playlistId: PYTHON_PLAYLIST,
        description: 'Roadmap to master Python + Anaconda setup',
      },
      {
        id: 'GkSRG3AfzGE',
        title: 'Getting Started With VS Code For Python',
        section: 'Getting Started',
        description: 'Complete VS Code setup for Python development',
      },
    ],
  },

  // ── SECTION 2 — Python Basics ────────────────────────────────────────────
  {
    subjectSlug: 'python',
    topicSlug: 'basics',
    videos: [
      {
        id: 'ip4WxEZwEPc',
        title: 'Python Basics - Syntax And Semantics',
        section: 'Python Basics',
        playlistId: PYTHON_PLAYLIST,
      },
      {
        id: 'XBiSIM44iqw',
        title: 'Variables In Python - Complete Guide',
        section: 'Python Basics',
        playlistId: PYTHON_PLAYLIST,
      },
      {
        id: 'ppFBOzBbq3E',
        title: 'Basic Data Types In Python',
        section: 'Python Basics',
        playlistId: PYTHON_PLAYLIST,
      },
      {
        id: 'khKv-8q7YmY',
        title: 'Operators In Python',
        section: 'Python Basics',
        playlistId: PYTHON_PLAYLIST,
      },
    ],
  },

  // ── SECTION 3 — Control Flow ─────────────────────────────────────────────
  {
    subjectSlug: 'python',
    topicSlug: 'control-flow',
    videos: [
      {
        id: 'f4KOjWS_KZs',
        title: 'Conditional Statements - if, elif, else In Python',
        section: 'Control Flow',
        playlistId: PYTHON_PLAYLIST,
      },
      {
        id: 'Ndo7-nvfSv8',
        title: 'Loops In Python - for and while',
        section: 'Control Flow',
        playlistId: PYTHON_PLAYLIST,
      },
    ],
  },

  // ── SECTION 4 — Data Structures ──────────────────────────────────────────
  {
    subjectSlug: 'python',
    topicSlug: 'data-structures',
    videos: [
      {
        id: 'Eaz5e6M8tL4',
        title: 'List And List Comprehension In Python',
        section: 'Data Structures',
        playlistId: PYTHON_PLAYLIST,
      },
      {
        id: 'QJAz9AYBz3A',
        title: 'Tuple In Python - Complete Guide',
        section: 'Data Structures',
        playlistId: PYTHON_PLAYLIST,
      },
      {
        id: 'W8KRzm-HUcc',
        title: 'Sets In Python - Complete Guide',
        section: 'Data Structures',
        playlistId: PYTHON_PLAYLIST,
      },
      {
        id: 'XCcpzWs-CI4',
        title: 'Dictionaries In Python - Complete Guide',
        section: 'Data Structures',
        playlistId: PYTHON_PLAYLIST,
      },
    ],
  },

  // ── SECTION 5 — Functions ────────────────────────────────────────────────
  {
    subjectSlug: 'python',
    topicSlug: 'functions',
    videos: [
      {
        id: 'mxuUBSXHxJ4',
        title: 'Getting Started With Functions In Python',
        section: 'Functions',
        playlistId: PYTHON_PLAYLIST,
      },
      {
        id: '25ovCm9jKfA',
        title: 'Lambda Function In Python',
        section: 'Functions',
        playlistId: PYTHON_PLAYLIST,
      },
      {
        id: 'my4-HyHR4Zs',
        title: 'Map And Filter Functions In Python',
        section: 'Functions',
        playlistId: PYTHON_PLAYLIST,
      },
    ],
  },

  // ── SECTION 8 — OOP & Modules ─────────────────────────────────────────────
  {
    subjectSlug: 'python',
    topicSlug: 'oops-concepts',
    videos: [
      {
        id: 'mFSMLHNRvEQ',
        title: 'Import Modules And Packages In Python',
        section: 'Modules',
        playlistId: PYTHON_PLAYLIST,
      },
      {
        id: 'xoL6WvCARJY',
        title: 'Classes And Objects In Python - OOP',
        section: 'OOP',
        playlistId: PYTHON_PLAYLIST,
      },
      {
        id: 'Ej_02ICOIgs',
        title: 'Inheritance In Python OOP',
        section: 'OOP',
        playlistId: PYTHON_PLAYLIST,
      },
      {
        id: 'wfTtqnv65-c',
        title: 'Polymorphism In Python',
        section: 'OOP',
        playlistId: PYTHON_PLAYLIST,
      },
      {
        id: 'u4NXQE0EsTQ',
        title: 'Magic Methods And Operator Overloading',
        section: 'OOP',
        playlistId: PYTHON_PLAYLIST,
      },
    ],
  },

  // ── SECTION 9 — File Handling & Exception Handling ───────────────────────
  {
    subjectSlug: 'python',
    topicSlug: 'exception-handling',
    videos: [
      {
        id: '6tNS--WetLI',
        title: 'File Handling In Python - Complete Guide',
        section: 'File Handling',
        playlistId: PYTHON_PLAYLIST,
      },
      {
        id: 'NIWwJbo-9_8',
        title: 'Exception Handling - try, except, else, finally',
        section: 'Exception Handling',
        playlistId: PYTHON_PLAYLIST,
      },
    ],
  },

  // ── SECTION 12 — Advanced Python ─────────────────────────────────────────
  {
    subjectSlug: 'python',
    topicSlug: 'advance-python',
    videos: [
      {
        id: '7KkJKCRSqDE',
        title: 'Generators And Iterators In Python',
        section: 'Advanced Python',
        playlistId: PYTHON_PLAYLIST,
      },
      {
        id: 'FsAPt_9Bf3U',
        title: 'Closures And Decorators In Python',
        section: 'Advanced Python',
        playlistId: PYTHON_PLAYLIST,
      },
    ],
  },

  // ── SECTION 13 — NumPy ───────────────────────────────────────────────────
  {
    subjectSlug: 'numpy',
    topicSlug: 'intro',
    videos: [
      {
        id: 'M011SoakCyQ',
        title: 'NumPy Complete Tutorial - Arrays & Operations',
        section: 'NumPy',
        playlistId: PYTHON_PLAYLIST,
      },
      {
        id: 'a8aDcLk4vRc',
        title: 'NumPy Indexing, Slicing & Broadcasting',
        section: 'NumPy',
        playlistId: PYTHON_PLAYLIST,
      },
    ],
  },

  // ── SECTION 13 — Pandas ──────────────────────────────────────────────────
  {
    subjectSlug: 'pandas',
    topicSlug: 'intro',
    videos: [
      {
        id: 'vlHQHtE83SY',
        title: 'Pandas DataFrame And Series - Complete Guide',
        section: 'Pandas',
        playlistId: PYTHON_PLAYLIST,
      },
      {
        id: 'k0O2bCBMNEU',
        title: 'Data Manipulation With Pandas And NumPy',
        section: 'Pandas',
        playlistId: PYTHON_PLAYLIST,
      },
      {
        id: 'ue-FkSE89rg',
        title: 'Reading Data From Various Sources With Pandas',
        section: 'Pandas',
        playlistId: PYTHON_PLAYLIST,
      },
    ],
  },

  // ── SECTION 13 — Data Visualization ─────────────────────────────────────
  {
    subjectSlug: 'visualization',
    topicSlug: 'matplotlib',
    videos: [
      {
        id: 'qqwf4Vuj8oM',
        title: 'Matplotlib - Complete Data Visualization Tutorial',
        section: 'Visualization',
        playlistId: PYTHON_PLAYLIST,
      },
      {
        id: 'GcXcSZ0gQps',
        title: 'Seaborn Tutorial - Complete Guide',
        section: 'Visualization',
        playlistId: PYTHON_PLAYLIST,
      },
    ],
  },

  // ── SECTION 15 — Logging ─────────────────────────────────────────────────
  {
    subjectSlug: 'python',
    topicSlug: 'logging',
    videos: [
      {
        id: 'jxmzY9soFXg',
        title: 'Python Logging - Complete Practical Implementation',
        section: 'Logging',
        playlistId: PYTHON_PLAYLIST,
      },
    ],
  },

  // ── SECTION 16 — Concurrency ─────────────────────────────────────────────
  {
    subjectSlug: 'python',
    topicSlug: 'multithreading-multiprocessing',
    videos: [
      {
        id: 'IEEhzQoKtQU',
        title: 'Multithreading In Python - Practical Implementation',
        section: 'Concurrency',
        playlistId: PYTHON_PLAYLIST,
      },
      {
        id: 'X7vBbelRXn0',
        title: 'Multiprocessing In Python - Practical Implementation',
        section: 'Concurrency',
        playlistId: PYTHON_PLAYLIST,
      },
    ],
  },

  // ── SECTION 18 — Flask ───────────────────────────────────────────────────
  {
    subjectSlug: 'python',
    topicSlug: 'flask',
    videos: [
      {
        id: '4L_xAWDRs7w',
        title: 'Introduction To Flask Framework',
        section: 'Flask',
        playlistId: FLASK_PLAYLIST,
      },
      {
        id: 'msX4oAXAmD0',
        title: 'Flask - Working With HTTP Verbs GET and POST',
        section: 'Flask',
        playlistId: FLASK_PLAYLIST,
      },
      {
        id: 'Vxg7PFRRzbE',
        title: 'Flask - REST APIs And HTTP Verbs PUT and DELETE',
        section: 'Flask',
        playlistId: FLASK_PLAYLIST,
      },
    ],
  },

  // ── SECTION 20 — Statistics ──────────────────────────────────────────────
  {
    subjectSlug: 'ml-basics',
    topicSlug: 'intro-to-ml',
    videos: [
      {
        id: 'LZzq1zSL1bs',
        title: 'Complete Statistics In One Shot - Krish Naik',
        section: 'Statistics Overview',
        description: 'Full statistics crash course for data science',
      },
      {
        id: 'zRUliXuwJCQ',
        title: 'What Is Statistics And Its Application',
        section: 'Descriptive Statistics',
        playlistId: STATS_PLAYLIST,
      },
      {
        id: 'mk8tOD0t8M0',
        title: 'Measure Of Central Tendency',
        section: 'Descriptive Statistics',
        playlistId: STATS_PLAYLIST,
      },
      {
        id: 'E4HAYd0QnRc',
        title: 'Measure Of Dispersion - Variance & Standard Deviation',
        section: 'Descriptive Statistics',
        playlistId: STATS_PLAYLIST,
      },
      {
        id: 'MbHRsM-FEvo',
        title: 'Correlation And Covariance',
        section: 'Descriptive Statistics',
        playlistId: STATS_PLAYLIST,
      },
      {
        id: 'yZU1C9LzGAU',
        title: 'Percentile, Quartiles and 5 Number Summary',
        section: 'Descriptive Statistics',
        playlistId: STATS_PLAYLIST,
      },
    ],
  },

  // ── SECTION 21–22 — Probability Distributions ────────────────────────────
  {
    subjectSlug: 'ml-basics',
    topicSlug: 'linear-regression-deep-dive',
    videos: [
      {
        id: 'YXLVjCKVP7U',
        title: 'Normal / Gaussian Distribution Complete Explanation',
        section: 'Probability Distributions',
        playlistId: STATS_PLAYLIST,
      },
      {
        id: 'uIFw4_db4Lw',
        title: 'Binomial Distribution - Complete Explanation',
        section: 'Probability Distributions',
        playlistId: STATS_PLAYLIST,
      },
      {
        id: 'Fk02TW6reiA',
        title: 'Central Limit Theorem - Complete Explanation',
        section: 'Probability Distributions',
        playlistId: STATS_PLAYLIST,
      },
    ],
  },

  // ── SECTION 23 — Inferential Statistics ──────────────────────────────────
  {
    subjectSlug: 'ml-basics',
    topicSlug: 'regularization',
    videos: [
      {
        id: 'UxAPAeohsKg',
        title: 'Hypothesis Testing - Complete Explanation',
        section: 'Inferential Statistics',
        playlistId: STATS_PLAYLIST,
      },
      {
        id: 'KS6KEWaoOOE',
        title: 'P Value - Complete Explanation',
        section: 'Inferential Statistics',
        playlistId: STATS_PLAYLIST,
      },
      {
        id: '5ABpqVSx33I',
        title: 'Z Test And T Test - Hypothesis Testing',
        section: 'Inferential Statistics',
        playlistId: STATS_PLAYLIST,
      },
      {
        id: 'JRecklMyHqo',
        title: 'Chi Square Test - Complete Explanation',
        section: 'Inferential Statistics',
        playlistId: STATS_PLAYLIST,
      },
      {
        id: 'ITf4vHhyGpc',
        title: 'ANOVA Test - Complete Explanation',
        section: 'Inferential Statistics',
        playlistId: STATS_PLAYLIST,
      },
      {
        id: 'mHNSPD2OeXk',
        title: 'Bayes Theorem - Complete Explanation',
        section: 'Inferential Statistics',
        playlistId: STATS_PLAYLIST,
      },
    ],
  },

  // ── SECTION 24 — Feature Engineering ─────────────────────────────────────
  {
    subjectSlug: 'pandas',
    topicSlug: 'data-cleaning',
    videos: [
      {
        id: '6WDFfaYtN6s',
        title: 'Feature Engineering - Handling Missing Values',
        section: 'Feature Engineering',
        playlistId: FEAT_ENG_PLAYLIST,
      },
      {
        id: 'nYIh2ThKwMQ',
        title: 'Handling Imbalanced Dataset',
        section: 'Feature Engineering',
        playlistId: FEAT_ENG_PLAYLIST,
      },
      {
        id: 'TJie1L0oWMk',
        title: 'Handling Outliers Using Python',
        section: 'Feature Engineering',
        playlistId: FEAT_ENG_PLAYLIST,
      },
      {
        id: 'w4GEY-_f2YQ',
        title: 'Data Encoding - One Hot Encoding',
        section: 'Feature Engineering',
        playlistId: FEAT_ENG_PLAYLIST,
      },
      {
        id: 'nt8NEkzCBDQ',
        title: 'Label Encoding And Ordinal Encoding',
        section: 'Feature Engineering',
        playlistId: FEAT_ENG_PLAYLIST,
      },
    ],
  },

  // ── SECTION 25 — EDA ─────────────────────────────────────────────────────
  {
    subjectSlug: 'pandas',
    topicSlug: 'groupby-aggregations',
    videos: [
      {
        id: 'F-X82zhIfBo',
        title: 'EDA - How To Be Expert In Exploratory Data Analysis',
        section: 'EDA',
        playlistId: EDA_PLAYLIST,
      },
      {
        id: '2wHBUMwRDKs',
        title: 'EDA - Red Wine Dataset Complete Analysis',
        section: 'EDA',
        playlistId: EDA_PLAYLIST,
      },
      {
        id: 'fHFas1_TCvE',
        title: 'EDA - Flight Price Dataset Analysis',
        section: 'EDA',
        playlistId: EDA_PLAYLIST,
      },
      {
        id: 'SBjBuHbWwgc',
        title: 'Data Cleaning With Google Play Store Dataset',
        section: 'EDA',
        playlistId: EDA_PLAYLIST,
      },
    ],
  },

  // ── SECTION 26–29 — Introduction To ML & Linear Regression ───────────────
  {
    subjectSlug: 'ml-basics',
    topicSlug: 'intro-to-ml',
    videos: [
      {
        id: 'JxgmHe2NyeY',
        title: 'Complete Machine Learning In 6 Hours - One Shot',
        section: 'ML Overview',
        description: 'Complete ML crash course by Krish Naik',
      },
      {
        id: 'E5RjzSK0frI',
        title: 'Simple Linear Regression - Indepth Intuition',
        section: 'Linear Regression',
        playlistId: ML_PLAYLIST,
      },
      {
        id: 'l_qjO6dFQL8',
        title: 'Cost Function In Linear Regression',
        section: 'Linear Regression',
        playlistId: ML_PLAYLIST,
      },
      {
        id: 'vsWXXsOZpRE',
        title: 'Gradient Descent - Convergence Algorithm',
        section: 'Linear Regression',
        playlistId: ML_PLAYLIST,
      },
      {
        id: 'UZPfbG0jNec',
        title: 'Overfitting And Underfitting In ML',
        section: 'ML Concepts',
        playlistId: ML_PLAYLIST,
      },
      {
        id: 'sDv4f4s2SB8',
        title: 'Performance Metrics - MAE, MSE, RMSE, R²',
        section: 'ML Evaluation',
        playlistId: ML_PLAYLIST,
      },
    ],
  },

  // ── SECTION 28 — Ridge, Lasso, ElasticNet ────────────────────────────────
  {
    subjectSlug: 'ml-basics',
    topicSlug: 'linear-regression-deep-dive',
    videos: [
      {
        id: 'Xm2C_gTAl8c',
        title: 'Ridge Regression - Indepth Intuition',
        section: 'Regularization',
        playlistId: ML_PLAYLIST,
      },
      {
        id: 'NGf0voTMlcs',
        title: 'Lasso And ElasticNet Regression',
        section: 'Regularization',
        playlistId: ML_PLAYLIST,
      },
      {
        id: 'fI9eiLfxeIk',
        title: 'Cross Validation Techniques',
        section: 'Model Validation',
        playlistId: ML_PLAYLIST,
      },
    ],
  },

  // ── SECTION 30 — Logistic Regression ─────────────────────────────────────
  {
    subjectSlug: 'ml-basics',
    topicSlug: 'logistic-regression-deep-dive',
    videos: [
      {
        id: 'L_xBe7MbPwk',
        title: 'Logistic Regression - Indepth Math Intuition',
        section: 'Logistic Regression',
        playlistId: ML_PLAYLIST,
      },
      {
        id: '0pJWSa2cCFE',
        title: 'Logistic Regression Performance Metrics',
        section: 'Logistic Regression',
        playlistId: ML_PLAYLIST,
      },
      {
        id: 'T1qFxnkXlLM',
        title: 'ROC Curve And AUC Score',
        section: 'Classification Metrics',
        playlistId: ML_PLAYLIST,
      },
    ],
  },

  // ── SECTION 31 — SVM ─────────────────────────────────────────────────────
  {
    subjectSlug: 'ml-basics',
    topicSlug: 'svm-deep-dive',
    videos: [
      {
        id: 'H9wKqDCVby0',
        title: 'Support Vector Machine - Complete Intuition',
        section: 'SVM',
        playlistId: ML_PLAYLIST,
      },
      {
        id: 'mxU27xrLz3o',
        title: 'SVM Kernels - RBF, Polynomial, Linear',
        section: 'SVM',
        playlistId: ML_PLAYLIST,
      },
    ],
  },

  // ── SECTION 32–34 — Naive Bayes, KNN, Decision Trees ─────────────────────
  {
    subjectSlug: 'ml-basics',
    topicSlug: 'decision-trees-deep-dive',
    videos: [
      {
        id: 'ejBBOkiqcEk',
        title: 'Naive Bayes - Complete Intuition',
        section: 'Naive Bayes',
        playlistId: ML_PLAYLIST,
      },
      {
        id: '4sXFkWfBos4',
        title: 'K Nearest Neighbour - KNN Indepth Intuition',
        section: 'KNN',
        playlistId: ML_PLAYLIST,
      },
      {
        id: 'RmajweUFKok',
        title: 'Decision Tree - Entropy And Gini Impurity',
        section: 'Decision Trees',
        playlistId: ML_PLAYLIST,
      },
      {
        id: 'Bew7L_9FLts',
        title: 'Decision Tree - Information Gain Indepth',
        section: 'Decision Trees',
        playlistId: ML_PLAYLIST,
      },
    ],
  },

  // ── SECTION 35–38 — Ensemble Methods ─────────────────────────────────────
  {
    subjectSlug: 'ml-basics',
    topicSlug: 'random-forest-deep-dive',
    videos: [
      {
        id: 'nxFG5xdpDto',
        title: 'Bagging And Boosting - Ensemble Techniques',
        section: 'Ensemble Methods',
        playlistId: ML_PLAYLIST,
      },
      {
        id: 'ok2s1vV9XW0',
        title: 'Random Forest - Complete Indepth Intuition',
        section: 'Random Forest',
        playlistId: ML_PLAYLIST,
      },
      {
        id: 'fbKz7rKEF0g',
        title: 'Gradient Boosting - Regression',
        section: 'Boosting',
        playlistId: ML_PLAYLIST,
      },
      {
        id: '8b1JEDvenQU',
        title: 'XGBoost - Complete Indepth Intuition',
        section: 'XGBoost',
        playlistId: ML_PLAYLIST,
      },
    ],
  },

  // ── SECTION 39–45 — Unsupervised ML ──────────────────────────────────────
  {
    subjectSlug: 'ml-basics',
    topicSlug: 'pca-unsupervised',
    videos: [
      {
        id: 'FD4DeN81ODQ',
        title: 'PCA - Principal Component Analysis Intuition',
        section: 'Dimensionality Reduction',
        playlistId: ML_PLAYLIST,
      },
      {
        id: 'EItlUEPCIzM',
        title: 'K-Means Clustering - Complete Intuition',
        section: 'Clustering',
        playlistId: ML_PLAYLIST,
      },
      {
        id: 'RDZUdRSDOok',
        title: 'Hierarchical Clustering - Complete Explanation',
        section: 'Clustering',
        playlistId: ML_PLAYLIST,
      },
      {
        id: 'C3r7tGRe2eI',
        title: 'DBSCAN Clustering - How It Works',
        section: 'Clustering',
        playlistId: ML_PLAYLIST,
      },
      {
        id: 'TP2OLPIBzVw',
        title: 'Anomaly Detection - Isolation Forest',
        section: 'Anomaly Detection',
        playlistId: ML_PLAYLIST,
      },
    ],
  },

  // ── SECTION 46 — Docker ───────────────────────────────────────────────────
  {
    subjectSlug: 'python',
    topicSlug: 'docker',
    videos: [
      {
        id: '8vmKtS8W7IQ',
        title: 'Complete Docker In One Shot - Krish Naik',
        section: 'Docker',
        description: 'Complete Docker tutorial from basics to deployment',
      },
      {
        id: 'UtmMp5XHQE8',
        title: 'Docker Image vs Containers - Complete Guide',
        section: 'Docker',
      },
      {
        id: 'gAkwW2tuIqE',
        title: 'Docker Compose - Complete Tutorial',
        section: 'Docker',
      },
    ],
  },

  // ── SECTION 47 — Git & GitHub ────────────────────────────────────────────
  {
    subjectSlug: 'python',
    topicSlug: 'git',
    videos: [
      {
        id: 'GW7B6vwktPA',
        title: 'Git And GitHub - Introduction And Basic Commands',
        section: 'Git',
        playlistId: GIT_PLAYLIST,
      },
      {
        id: 'hMfi_ONvGEs',
        title: 'Git Merge, Push, Checkout And Log With Commands',
        section: 'Git',
        playlistId: GIT_PLAYLIST,
      },
      {
        id: 'JOAnFMkKoEA',
        title: 'Resolving Git Branch Merge Conflict',
        section: 'Git',
        playlistId: GIT_PLAYLIST,
      },
    ],
  },

  // ── SECTION 48–49 — End-to-End ML Projects ───────────────────────────────
  {
    subjectSlug: 'ml-basics',
    topicSlug: 'mlops-mlflow',
    videos: [
      {
        id: 'S_F_c9e2bz4',
        title: 'End To End ML Project - GitHub And Code Setup',
        section: 'MLOps Project',
        playlistId: PROJECTS_PLAYLIST,
      },
      {
        id: 'Rv6UFGNmNZg',
        title: 'Data Ingestion Implementation',
        section: 'MLOps Project',
        playlistId: PROJECTS_PLAYLIST,
      },
      {
        id: 'p7V4K1OoqYM',
        title: 'Model Training And Evaluation With Hyperparameter Tuning',
        section: 'MLOps Project',
        playlistId: PROJECTS_PLAYLIST,
      },
      {
        id: 'pxk1Fr33-L4',
        title: 'MLflow - Model Experiment Tracking',
        section: 'MLOps',
      },
      {
        id: 'qdcHHrsXA48',
        title: 'MLflow And Dagshub - Complete Tutorial',
        section: 'MLOps',
      },
    ],
  },

  // ── SECTION 51 — NLP ─────────────────────────────────────────────────────
  {
    subjectSlug: 'gen-ai',
    topicSlug: 'intro',
    videos: [
      {
        id: 'w3coRFpyddQ',
        title: 'NLP Roadmap - Complete Guide',
        section: 'NLP Introduction',
        playlistId: NLP_LIVE_PLAYLIST,
      },
      {
        id: 'EYIKy19nn2c',
        title: 'Tokenisation And Text Preprocessing - NLTK',
        section: 'NLP Basics',
        playlistId: NLP_LIVE_PLAYLIST,
      },
      {
        id: 'nxhCyeRR75Q',
        title: 'Bag Of Words - BOW Intuition And Implementation',
        section: 'Text Representation',
        playlistId: NLP_LIVE_PLAYLIST,
      },
      {
        id: 'D2V1okCEsiE',
        title: 'TF-IDF - Intuition And Implementation',
        section: 'Text Representation',
        playlistId: NLP_LIVE_PLAYLIST,
      },
      {
        id: 'hQwFeIupka0',
        title: 'Word2Vec - Complete Intuition',
        section: 'Word Embeddings',
        playlistId: NLP_LIVE_PLAYLIST,
      },
    ],
  },

  // ── SECTION 52–58 — Deep Learning: ANN ───────────────────────────────────
  {
    subjectSlug: 'deep-learning',
    topicSlug: 'introduction',
    videos: [
      {
        id: 'YFNKnUhm_-s',
        title: 'Deep Learning Complete Playlist - Krish Naik',
        section: 'Deep Learning Overview',
        playlistId: DL_NLP_PLAYLIST,
      },
      {
        id: 'aircAruvnKk',
        title: 'Perceptron - Intuition And Working',
        section: 'Neural Networks',
        playlistId: DL_NLP_PLAYLIST,
      },
      {
        id: 'vOppzHpvTiQ',
        title: 'ANN - Backpropagation And Weight Updation',
        section: 'Neural Networks',
        playlistId: DL_NLP_PLAYLIST,
      },
      {
        id: '-7scQpJT7uo',
        title: 'Vanishing Gradient Problem And Sigmoid',
        section: 'Neural Networks',
        playlistId: DL_NLP_PLAYLIST,
      },
      {
        id: 'fn3KWM1kuAw',
        title: 'ReLU Activation Function - Complete Guide',
        section: 'Activation Functions',
        playlistId: DL_NLP_PLAYLIST,
      },
      {
        id: 'Fro_r-dqFbQ',
        title: 'Softmax For Multiclass Classification',
        section: 'Activation Functions',
        playlistId: DL_NLP_PLAYLIST,
      },
      {
        id: '2osIclTFFcI',
        title: 'Adam, SGD And Other Gradient Descent Optimisers',
        section: 'Optimizers',
        playlistId: DL_NLP_PLAYLIST,
      },
    ],
  },

  // ── Deep Learning: CNN ────────────────────────────────────────────────────
  {
    subjectSlug: 'deep-learning',
    topicSlug: 'ann-project',
    videos: [
      {
        id: 'zfiSAzpy9NM',
        title: 'CNN Introduction - Convolution Operation',
        section: 'CNN',
        playlistId: DL_NLP_PLAYLIST,
      },
      {
        id: 'bNb2fEVKeEo',
        title: 'Pooling - Max, Min And Average Pooling In CNN',
        section: 'CNN',
        playlistId: DL_NLP_PLAYLIST,
      },
    ],
  },

  // ── Deep Learning: RNN & LSTM ─────────────────────────────────────────────
  {
    subjectSlug: 'deep-learning',
    topicSlug: 'simple-rnn',
    videos: [
      {
        id: 'AsNTP8Kwu80',
        title: 'RNN Architecture - RNN vs ANN',
        section: 'RNN',
        playlistId: DL_NLP_PLAYLIST,
      },
      {
        id: 'LfnrRPFhkuY',
        title: 'LSTM RNN - Why LSTM?',
        section: 'LSTM',
        playlistId: DL_NLP_PLAYLIST,
      },
      {
        id: 'FIjy3xmkMUQ',
        title: 'LSTM - Forget Gate, Input Gate, Output Gate',
        section: 'LSTM',
        playlistId: DL_NLP_PLAYLIST,
      },
      {
        id: '8HyCNIVRoSU',
        title: 'GRU - Complete Indepth Intuition',
        section: 'GRU',
        playlistId: DL_NLP_PLAYLIST,
      },
    ],
  },

  // ── SECTION 61–62 — Attention & Transformers ──────────────────────────────
  {
    subjectSlug: 'gen-ai',
    topicSlug: 'prompt-engineering',
    videos: [
      {
        id: 'xI0HHN5XKDo',
        title: 'Attention Mechanism - Indepth Architecture',
        section: 'Attention',
        playlistId: DL_NLP_PLAYLIST,
      },
      {
        id: '4Bdc55j80l4',
        title: 'Transformers - What And Why',
        section: 'Transformers',
        playlistId: DL_NLP_PLAYLIST,
      },
      {
        id: 'j7k6hOokbZc',
        title: 'Self Attention Layer - Working',
        section: 'Transformers',
        playlistId: DL_NLP_PLAYLIST,
      },
      {
        id: 'dichIcUZfOw',
        title: 'Positional Encoding - Indepth Intuition',
        section: 'Transformers',
        playlistId: DL_NLP_PLAYLIST,
      },
      {
        id: 'ysHGkyeJGM4',
        title: 'Complete Encoder Transformer Architecture',
        section: 'Transformers',
        playlistId: DL_NLP_PLAYLIST,
      },
    ],
  },
];

// ─── Convenience lookup helper ───────────────────────────────────────────────

/**
 * Returns the SectionVideos entry for the given subject + topic slugs,
 * or undefined if no videos are mapped.
 */
export function getVideosByTopic(
  subjectSlug: string,
  topicSlug: string,
): SectionVideos | undefined {
  return videoLessons.find(
    (v) => v.subjectSlug === subjectSlug && v.topicSlug === topicSlug,
  );
}

/**
 * Returns ALL video lessons that belong to a given subject slug.
 */
export function getVideosBySubject(subjectSlug: string): SectionVideos[] {
  return videoLessons.filter((v) => v.subjectSlug === subjectSlug);
}

/** Flat list of every VideoLesson across the entire curriculum. */
export function getAllVideos(): VideoLesson[] {
  return videoLessons.flatMap((sv) => sv.videos);
}
