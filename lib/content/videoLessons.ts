// ─────────────────────────────────────────────────────────────────────────────
// Video Lessons — Sourced exclusively from @krishnaik06 (Krish Naik)
// ─────────────────────────────────────────────────────────────────────────────

export interface VideoLesson {
  id: string; // YouTube video ID (the part after ?v=)
  title: string; // Display title
  duration?: string; // e.g. "12:34"
  section: string; // Which curriculum section this belongs to
  playlistId?: string; // YouTube playlist ID if part of a playlist
  description?: string; // Short description
  creator?: string; // e.g. "Codebasics", "Gate Smashers", "CodeWithHarry", etc.
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

/** Returns the YouTube embed URL for a specific video.
 *  NOTE: We intentionally do NOT pass `list=PLAYLIST_ID` here because
 *  YouTube's embed player overrides the videoId and always starts at
 *  video #1 of the playlist when `list` is present. Each tile must
 *  play its own unique video.
 */
export function getYTEmbed(videoId: string, _playlistId?: string): string {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
}

/** Returns the full YouTube playlist URL (for "View Playlist" links) */
export function getYTPlaylistUrl(playlistId: string): string {
  return `https://www.youtube.com/playlist?list=${playlistId}`;
}

// ─── Verified Playlist IDs ────────────────────────────────────────────────────
const PYTHON_PLAYLIST = "PLZoTAELRMXVNUL99R4bDlVYsncUNvwUBB";
const STATS_PLAYLIST = "PLZoTAELRMXVMhVyr3Ri9IQ-t5QPBtxzJO";
const ML_PLAYLIST = "PLZoTAELRMXVPMbdMTjwolBI0cJcvASePD";
const DL_NLP_PLAYLIST = "PLZoTAELRMXVPGU70ZGsckrMdr0FteeRUi";
const NLP_LIVE_PLAYLIST = "PLZoTAELRMXVNNrHSKv36Lr3_156yCo6Nn";
const FEAT_ENG_PLAYLIST = "PLZoTAELRMXVPwYGE2PXD3x0bfKnR0cJjN";
const EDA_PLAYLIST = "PLxvLUL96MOO6F8x2fLgFlNrJVcKPQuS3a";
const PROJECTS_PLAYLIST = "PLZoTAELRMXVPS-dOaVbAux22vzqdgoGhG";
const FLASK_PLAYLIST = "PLZoTAELRMXVPBaLN3e-uoVRR9hlRFRfUc";
const GIT_PLAYLIST = "PLZoTAELRMXVOSsBerFZKsdCaA4RYr4RGW";

// ─── Video Lesson Mappings ────────────────────────────────────────────────────

export const videoLessons: SectionVideos[] = [
  // ── SECTION 1 — Getting Started ──────────────────────────────────────────
  {
    subjectSlug: "python",
    topicSlug: "getting-started",
    videos: [
      {
        id: "27u8xHqLMZE",
        title: "Complete Python Roadmap & Anaconda Installation",
        creator: "Codebasics",
        section: "Getting Started",
        playlistId: PYTHON_PLAYLIST,
        description: "Roadmap to master Python + Anaconda setup",
      },
      {
        id: "eykoKxsYtow",
        title: "Getting Started With VS Code For Python",
        creator: "Codebasics",
        section: "Getting Started",
        description: "Complete VS Code setup for Python development",
      },
    ],
  },

  // ── SECTION 2 — Python Basics ────────────────────────────────────────────
  {
    subjectSlug: "python",
    topicSlug: "basics",
    videos: [
      {
        id: "aqvDTCpNRek",
        title: "Python Basics - Syntax And Semantics",
        creator: "CodeWithHarry",
        section: "Python Basics",
        playlistId: PYTHON_PLAYLIST,
      },
      {
        id: "8tCe1P_cgoY",
        title: "Variables In Python - Complete Guide",
        creator: "Codebasics",
        section: "Python Basics",
        playlistId: PYTHON_PLAYLIST,
      },
      {
        id: "ORCuz7s5cCY",
        title: "Basic Data Types In Python",
        creator: "CodeWithHarry",
        section: "Python Basics",
        playlistId: PYTHON_PLAYLIST,
      },
      {
        id: "OlumSBDDR3U",
        title: "Operators In Python",
        creator: "CodeWithHarry",
        section: "Python Basics",
        playlistId: PYTHON_PLAYLIST,
      },
    ],
  },

  // ── SECTION 3 — Control Flow ─────────────────────────────────────────────
  {
    subjectSlug: "python",
    topicSlug: "control-flow",
    videos: [
      {
        id: "hNddJ3_hahk",
        title: "Conditional Statements - if, elif, else In Python",
        creator: "Codebasics",
        section: "Control Flow",
        playlistId: PYTHON_PLAYLIST,
      },
      {
        id: "3ykIpmAxdoY",
        title: "Loops In Python - for and while",
        creator: "Codebasics",
        section: "Control Flow",
        playlistId: PYTHON_PLAYLIST,
      },
    ],
  },

  // ── SECTION 4 — Data Structures ──────────────────────────────────────────
  {
    subjectSlug: "python",
    topicSlug: "data-structures",
    videos: [
      {
        id: "fz2PKpPdlRo",
        title: "List And List Comprehension In Python",
        creator: "Codebasics",
        section: "Data Structures",
        playlistId: PYTHON_PLAYLIST,
      },
      {
        id: "8H40EU7QrtI",
        title: "Tuple In Python - Complete Guide",
        creator: "Codebasics",
        section: "Data Structures",
        playlistId: PYTHON_PLAYLIST,
      },
      {
        id: "l3kCO8cVA6o",
        title: "Sets In Python - Complete Guide",
        creator: "CodeWithHarry",
        section: "Data Structures",
        playlistId: PYTHON_PLAYLIST,
      },
      {
        id: "RCM-lVAfXFg",
        title: "Dictionaries In Python - Complete Guide",
        creator: "Codebasics",
        section: "Data Structures",
        playlistId: PYTHON_PLAYLIST,
      },
    ],
  },

  // ── SECTION 5 — Functions ────────────────────────────────────────────────
  {
    subjectSlug: "python",
    topicSlug: "functions",
    videos: [
      {
        id: "rruGL7nD3ss",
        title: "Getting Started With Functions In Python",
        creator: "Codebasics",
        section: "Functions",
        playlistId: PYTHON_PLAYLIST,
      },
      {
        id: "UfFWf-PXUqE",
        title: "Lambda Function In Python",
        creator: "CodeWithHarry",
        section: "Functions",
        playlistId: PYTHON_PLAYLIST,
      },
      {
        id: "j1lTvjmOJbQ",
        title: "Map And Filter Functions In Python",
        creator: "Krish Naik",
        section: "Functions",
        playlistId: PYTHON_PLAYLIST,
      },
    ],
  },

  // ── SECTION 8 — OOP & Modules ─────────────────────────────────────────────
  {
    subjectSlug: "python",
    topicSlug: "oops-concepts",
    videos: [
      {
        id: "DdGVBZv46PI",
        title: "Import Modules And Packages In Python",
        creator: "Codebasics",
        section: "Modules",
        playlistId: PYTHON_PLAYLIST,
      },
      {
        id: "mrhccLHtyN4",
        title: "Classes And Objects In Python - OOP",
        creator: "Codebasics",
        section: "OOP",
        playlistId: PYTHON_PLAYLIST,
      },
      {
        id: "-KsfUaQEY9Y",
        title: "Inheritance In Python OOP",
        creator: "CodeWithHarry",
        section: "OOP",
        playlistId: PYTHON_PLAYLIST,
      },
      {
        id: "xnb-9TI-BjQ",
        title: "Polymorphism In Python",
        creator: "CodeWithHarry",
        section: "OOP",
        playlistId: PYTHON_PLAYLIST,
      },
      {
        id: "g0wmOM0NS7w",
        title: "Magic Methods And Operator Overloading",
        creator: "Krish Naik",
        section: "OOP",
        playlistId: PYTHON_PLAYLIST,
      },
    ],
  },

  // ── SECTION 9 — File Handling & Exception Handling ───────────────────────
  {
    subjectSlug: "python",
    topicSlug: "exception-handling",
    videos: [
      {
        id: "p1rrj07Spy4",
        title: "File Handling In Python - Complete Guide",
        creator: "Codebasics",
        section: "File Handling",
        playlistId: PYTHON_PLAYLIST,
      },
      {
        id: "my7XMrBXsLs",
        title: "Exception Handling - try, except, else, finally",
        creator: "Krish Naik",
        section: "Exception Handling",
        playlistId: PYTHON_PLAYLIST,
      },
    ],
  },

  // ── SECTION 12 — Advanced Python ─────────────────────────────────────────
  {
    subjectSlug: "python",
    topicSlug: "advance-python",
    videos: [
      {
        id: "ffFRuB03qLE",
        title: "Generators And Iterators In Python",
        creator: "Codebasics",
        section: "Advanced Python",
        playlistId: PYTHON_PLAYLIST,
      },
      {
        id: "nYDKH9fvlBY",
        title: "Closures And Decorators In Python",
        creator: "Codebasics",
        section: "Advanced Python",
        playlistId: PYTHON_PLAYLIST,
      },
    ],
  },

  // ── SECTION 13 — NumPy ───────────────────────────────────────────────────
  {
    subjectSlug: "numpy",
    topicSlug: "intro",
    videos: [
      {
        id: "a8aDcLk4vRc",
        title: "NumPy Complete Tutorial - Arrays & Operations",
        creator: "Codebasics",
        section: "NumPy",
        playlistId: PYTHON_PLAYLIST,
      },
      {
        id: "_d_Ka-ks2a0",
        title: "NumPy Indexing, Slicing & Broadcasting",
        creator: "Codebasics",
        section: "NumPy",
        playlistId: PYTHON_PLAYLIST,
      },
    ],
  },

  // ── SECTION 13 — Pandas ──────────────────────────────────────────────────
  {
    subjectSlug: "pandas",
    topicSlug: "intro",
    videos: [
      {
        id: "CmorAWRsCAw",
        title: "Pandas DataFrame And Series - Complete Guide",
        creator: "Codebasics",
        section: "Pandas",
        playlistId: PYTHON_PLAYLIST,
      },
      {
        id: "XF6DCrNTzug",
        title: "Data Manipulation With Pandas And NumPy",
        creator: "CampusX",
        section: "Pandas",
        playlistId: PYTHON_PLAYLIST,
      },
      {
        id: "kq9Vmg5d7Sk",
        title: "Reading Data From Various Sources With Pandas",
        creator: "CampusX",
        section: "Pandas",
        playlistId: PYTHON_PLAYLIST,
      },
    ],
  },

  // ── SECTION 13 — Data Visualization ─────────────────────────────────────
  {
    subjectSlug: "visualization",
    topicSlug: "matplotlib",
    videos: [
      {
        id: "czQO1_GEEos",
        title: "Matplotlib - Complete Data Visualization Tutorial",
        creator: "Krish Naik",
        section: "Visualization",
        playlistId: PYTHON_PLAYLIST,
      },
      {
        id: "UsglokDLa2o",
        title: "Seaborn Tutorial - Complete Guide",
        creator: "Krish Naik",
        section: "Visualization",
        playlistId: PYTHON_PLAYLIST,
      },
    ],
  },

  // ── SECTION 15 — Logging ─────────────────────────────────────────────────
  {
    subjectSlug: "python",
    topicSlug: "logging",
    videos: [
      {
        id: "gmvvaobm7eQ",
        title: "Python Logging - Complete Practical Implementation",
        creator: "Codebasics",
        section: "Logging",
        playlistId: PYTHON_PLAYLIST,
      },
    ],
  },

  // ── SECTION 16 — Concurrency ─────────────────────────────────────────────
  {
    subjectSlug: "python",
    topicSlug: "multithreading-multiprocessing",
    videos: [
      {
        id: "PJ4t2U15ACo",
        title: "Multithreading In Python - Practical Implementation",
        creator: "Codebasics",
        section: "Concurrency",
        playlistId: PYTHON_PLAYLIST,
      },
      {
        id: "zGe-9LfnAaA",
        title: "Multiprocessing In Python - Practical Implementation",
        creator: "CodeWithHarry",
        section: "Concurrency",
        playlistId: PYTHON_PLAYLIST,
      },
    ],
  },

  // ── SECTION 18 — Flask ───────────────────────────────────────────────────
  {
    subjectSlug: "python",
    topicSlug: "flask",
    videos: [
      {
        id: "4L_xAWDRs7w",
        title: "Introduction To Flask Framework",
        creator: "Krish Naik",
        section: "Flask",
        playlistId: FLASK_PLAYLIST,
      },
      {
        id: "0HXg9_r_7MM",
        title: "Flask - Working With HTTP Verbs GET and POST",
        creator: "CodeWithHarry",
        section: "Flask",
        playlistId: FLASK_PLAYLIST,
      },
      {
        id: "Jzv3G5iDLvw",
        title: "Flask - REST APIs And HTTP Verbs PUT and DELETE",
        creator: "CodeWithHarry",
        section: "Flask",
        playlistId: FLASK_PLAYLIST,
      },
    ],
  },

  // ── SECTION 20 — Statistics ──────────────────────────────────────────────
  {
    subjectSlug: "ml-basics",
    topicSlug: "intro-to-ml",
    videos: [
      {
        id: "7y3XckjaVOw",
        title: "Complete Statistics In One Shot - Krish Naik",
        creator: "Krish Naik",
        section: "Statistics Overview",
        description: "Full statistics crash course for data science",
      },
      {
        id: "2GV_ouHBw30",
        title: "What Is Statistics And Its Application",
        creator: "CampusX",
        section: "Descriptive Statistics",
        playlistId: STATS_PLAYLIST,
      },
      {
        id: "X48cZ6DGaSw",
        title: "Measure Of Central Tendency",
        creator: "Krish Naik",
        section: "Descriptive Statistics",
        playlistId: STATS_PLAYLIST,
      },
      {
        id: "l_YszNIJfFA",
        title: "Measure Of Dispersion - Variance & Standard Deviation",
        creator: "Krish Naik",
        section: "Descriptive Statistics",
        playlistId: STATS_PLAYLIST,
      },
      {
        id: "jPwRlpefNY4",
        title: "Correlation And Covariance",
        creator: "Krish Naik",
        section: "Descriptive Statistics",
        playlistId: STATS_PLAYLIST,
      },
      {
        id: "OES4fdLEHkw",
        title: "Percentile, Quartiles and 5 Number Summary",
        creator: "Krish Naik",
        section: "Descriptive Statistics",
        playlistId: STATS_PLAYLIST,
      },
    ],
  },

  // ── SECTION 21–22 — Probability Distributions ────────────────────────────
  {
    subjectSlug: "ml-basics",
    topicSlug: "linear-regression-deep-dive",
    videos: [
      {
        id: "bcv61eKpYto",
        title: "Normal / Gaussian Distribution Complete Explanation",
        creator: "Krish Naik",
        section: "Probability Distributions",
        playlistId: STATS_PLAYLIST,
      },
      {
        id: "eRh-k6776Hk",
        title: "Binomial Distribution - Complete Explanation",
        creator: "Dream Maths",
        section: "Probability Distributions",
        playlistId: STATS_PLAYLIST,
      },
      {
        id: "layunsQRmYk",
        title: "Central Limit Theorem - Complete Explanation",
        creator: "Krish Naik",
        section: "Probability Distributions",
        playlistId: STATS_PLAYLIST,
      },
    ],
  },

  // ── SECTION 23 — Inferential Statistics ──────────────────────────────────
  {
    subjectSlug: "ml-basics",
    topicSlug: "regularization",
    videos: [
      {
        id: "Y3QzLIBp64M",
        title: "Hypothesis Testing - Complete Explanation",
        creator: "Krish Naik",
        section: "Inferential Statistics",
        playlistId: STATS_PLAYLIST,
      },
      {
        id: "zII6KLR4Lb4",
        title: "P Value - Complete Explanation",
        creator: "Krish Naik",
        section: "Inferential Statistics",
        playlistId: STATS_PLAYLIST,
      },
      {
        id: "7234-lDesHI",
        title: "Z Test And T Test - Hypothesis Testing",
        creator: "Krish Naik",
        section: "Inferential Statistics",
        playlistId: STATS_PLAYLIST,
      },
      {
        id: "O47boiErNwI",
        title: "Chi Square Test - Complete Explanation",
        creator: "Krish Naik",
        section: "Inferential Statistics",
        playlistId: STATS_PLAYLIST,
      },
      {
        id: "BtTvYflNMjk",
        title: "ANOVA Test - Complete Explanation",
        creator: "Krish Naik",
        section: "Inferential Statistics",
        playlistId: STATS_PLAYLIST,
      },
      {
        id: "71oNiqPoKD8",
        title: "Bayes Theorem - Complete Explanation",
        creator: "Krish Naik",
        section: "Inferential Statistics",
        playlistId: STATS_PLAYLIST,
      },
    ],
  },

  // ── SECTION 24 — Feature Engineering ─────────────────────────────────────
  {
    subjectSlug: "pandas",
    topicSlug: "data-cleaning",
    videos: [
      {
        id: "6WDFfaYtN6s",
        title: "Feature Engineering - Handling Missing Values",
        creator: "Krish Naik",
        section: "Feature Engineering",
        playlistId: FEAT_ENG_PLAYLIST,
      },
      {
        id: "pDw_JHHvj-0",
        title: "Handling Imbalanced Dataset",
        creator: "Krish Naik",
        section: "Feature Engineering",
        playlistId: FEAT_ENG_PLAYLIST,
      },
      {
        id: "A3gClkblXK8",
        title: "Handling Outliers Using Python",
        creator: "Codebasics",
        section: "Feature Engineering",
        playlistId: FEAT_ENG_PLAYLIST,
      },
      {
        id: "Bac5xZWPMyc",
        title: "Data Encoding - One Hot Encoding",
        creator: "Krish Naik",
        section: "Feature Engineering",
        playlistId: FEAT_ENG_PLAYLIST,
      },
      {
        id: "jv1jMmGKb7A",
        title: "Label Encoding And Ordinal Encoding",
        creator: "Krish Naik",
        section: "Feature Engineering",
        playlistId: FEAT_ENG_PLAYLIST,
      },
    ],
  },

  // ── SECTION 25 — EDA ─────────────────────────────────────────────────────
  {
    subjectSlug: "pandas",
    topicSlug: "groupby-aggregations",
    videos: [
      {
        id: "dP170R-wO-8",
        title: "EDA - How To Be Expert In Exploratory Data Analysis",
        creator: "Krish Naik",
        section: "EDA",
        playlistId: EDA_PLAYLIST,
      },
      {
        id: "PPEHpg2RixQ",
        title: "EDA - Red Wine Dataset Complete Analysis",
        creator: "CampusX",
        section: "EDA",
        playlistId: EDA_PLAYLIST,
      },
      {
        id: "v5dqavbyE-I",
        title: "EDA - Flight Price Dataset Analysis",
        creator: "Krish Naik",
        section: "EDA",
        playlistId: EDA_PLAYLIST,
      },
      {
        id: "fHFOANOHwh8",
        title: "Data Cleaning With Google Play Store Dataset",
        creator: "Krish Naik",
        section: "EDA",
        playlistId: EDA_PLAYLIST,
      },
    ],
  },

  // ── SECTION 26–29 — Introduction To ML & Linear Regression ───────────────
  {
    subjectSlug: "ml-basics",
    topicSlug: "intro-to-ml",
    videos: [
      {
        id: "ZftI2fEz0Fw",
        title: "Complete Machine Learning In 6 Hours - One Shot",
        creator: "CampusX",
        section: "ML Overview",
        description: "Complete ML crash course by Krish Naik",
      },
      {
        id: "UZPfbG0jNec",
        title: "Simple Linear Regression - Indepth Intuition",
        creator: "CampusX",
        section: "Linear Regression",
        playlistId: ML_PLAYLIST,
      },
      {
        id: "3xXInc1Bf0w",
        title: "Cost Function In Linear Regression",
        creator: "CampusX",
        section: "Linear Regression",
        playlistId: ML_PLAYLIST,
      },
      {
        id: "FpDsDn-fBKA",
        title: "Gradient Descent - Convergence Algorithm",
        creator: "Krish Naik",
        section: "Linear Regression",
        playlistId: ML_PLAYLIST,
      },
      {
        id: "m5E6QxKFYlM",
        title: "Overfitting And Underfitting In ML",
        creator: "Krish Naik",
        section: "ML Concepts",
        playlistId: ML_PLAYLIST,
      },
      {
        id: "KUrm-F8mXJQ",
        title: "Performance Metrics - MAE, MSE, RMSE, R²",
        creator: "Krish Naik",
        section: "ML Evaluation",
        playlistId: ML_PLAYLIST,
      },
    ],
  },

  // ── SECTION 28 — Ridge, Lasso, ElasticNet ────────────────────────────────
  {
    subjectSlug: "ml-basics",
    topicSlug: "linear-regression-deep-dive",
    videos: [
      {
        id: "aEow1QoTLo0",
        title: "Ridge Regression - Indepth Intuition",
        creator: "CampusX",
        section: "Regularization",
        playlistId: ML_PLAYLIST,
      },
      {
        id: "2g2DBkFhTTY",
        title: "Lasso And ElasticNet Regression",
        creator: "CampusX",
        section: "Regularization",
        playlistId: ML_PLAYLIST,
      },
      {
        id: "7062skdX05Y",
        title: "Cross Validation Techniques",
        creator: "Krish Naik",
        section: "Model Validation",
        playlistId: ML_PLAYLIST,
      },
    ],
  },

  // ── SECTION 30 — Logistic Regression ─────────────────────────────────────
  {
    subjectSlug: "ml-basics",
    topicSlug: "logistic-regression-deep-dive",
    videos: [
      {
        id: "XNXzVfItWGY",
        title: "Logistic Regression - Indepth Math Intuition",
        creator: "CampusX",
        section: "Logistic Regression",
        playlistId: ML_PLAYLIST,
      },
      {
        id: "XNXzVfItWGY",
        title: "Logistic Regression Performance Metrics",
        creator: "CampusX",
        section: "Logistic Regression",
        playlistId: ML_PLAYLIST,
      },
      {
        id: "A_ZKMsZ3f3o",
        title: "ROC Curve And AUC Score",
        creator: "Krish Naik",
        section: "Classification Metrics",
        playlistId: ML_PLAYLIST,
      },
    ],
  },

  // ── SECTION 31 — SVM ─────────────────────────────────────────────────────
  {
    subjectSlug: "ml-basics",
    topicSlug: "svm-deep-dive",
    videos: [
      {
        id: "H9yACitf-KM",
        title: "Support Vector Machine - Complete Intuition",
        creator: "Krish Naik",
        section: "SVM",
        playlistId: ML_PLAYLIST,
      },
      {
        id: "ugTxMLjLS8M",
        title: "SVM Kernels - RBF, Polynomial, Linear",
        creator: "CampusX",
        section: "SVM",
        playlistId: ML_PLAYLIST,
      },
    ],
  },

  // ── SECTION 32–34 — Naive Bayes, KNN, Decision Trees ─────────────────────
  {
    subjectSlug: "ml-basics",
    topicSlug: "decision-trees-deep-dive",
    videos: [
      {
        id: "jS1CKhALUBQ",
        title: "Naive Bayes - Complete Intuition",
        creator: "Krish Naik",
        section: "Naive Bayes",
        playlistId: ML_PLAYLIST,
      },
      {
        id: "BYaoDZM1IcU",
        title: "K Nearest Neighbour - KNN Indepth Intuition",
        creator: "CampusX",
        section: "KNN",
        playlistId: ML_PLAYLIST,
      },
      {
        id: "gwgmSSTdiXs",
        title: "Decision Tree - Entropy And Gini Impurity",
        creator: "CampusX",
        section: "Decision Trees",
        playlistId: ML_PLAYLIST,
      },
      {
        id: "gwgmSSTdiXs",
        title: "Decision Tree - Information Gain Indepth",
        creator: "CampusX",
        section: "Decision Trees",
        playlistId: ML_PLAYLIST,
      },
    ],
  },

  // ── SECTION 35–38 — Ensemble Methods ─────────────────────────────────────
  {
    subjectSlug: "ml-basics",
    topicSlug: "random-forest-deep-dive",
    videos: [
      {
        id: "5TOSlFQnnPU",
        title: "Bagging And Boosting - Ensemble Techniques",
        creator: "Krish Naik",
        section: "Ensemble Methods",
        playlistId: ML_PLAYLIST,
      },
      {
        id: "WjLjjx8wSz0",
        title: "Random Forest - Complete Indepth Intuition",
        creator: "Krish Naik",
        section: "Random Forest",
        playlistId: ML_PLAYLIST,
      },
      {
        id: "fbKz7N92mhQ",
        title: "Gradient Boosting - Regression",
        creator: "CampusX",
        section: "Boosting",
        playlistId: ML_PLAYLIST,
      },
      {
        id: "gPciUPwWJQQ",
        title: "XGBoost - Complete Indepth Intuition",
        creator: "Krish Naik",
        section: "XGBoost",
        playlistId: ML_PLAYLIST,
      },
    ],
  },

  // ── SECTION 39–45 — Unsupervised ML ──────────────────────────────────────
  {
    subjectSlug: "ml-basics",
    topicSlug: "pca-unsupervised",
    videos: [
      {
        id: "iRbsBi5W0-c",
        title: "PCA - Principal Component Analysis Intuition",
        creator: "CampusX",
        section: "Dimensionality Reduction",
        playlistId: ML_PLAYLIST,
      },
      {
        id: "AWKCCK5YHsE",
        title: "K-Means Clustering - Complete Intuition",
        creator: "Krish Naik",
        section: "Clustering",
        playlistId: ML_PLAYLIST,
      },
      {
        id: "461Opp1TShk",
        title: "Hierarchical Clustering - Complete Explanation",
        creator: "Krish Naik",
        section: "Clustering",
        playlistId: ML_PLAYLIST,
      },
      {
        id: "C3r7tGRe2eI",
        title: "DBSCAN Clustering - How It Works",
        creator: "Krish Naik",
        section: "Clustering",
        playlistId: ML_PLAYLIST,
      },
      {
        id: "OS9xRGKfx4E",
        title: "Anomaly Detection - Isolation Forest",
        creator: "Krish Naik",
        section: "Anomaly Detection",
        playlistId: ML_PLAYLIST,
      },
    ],
  },

  // ── SECTION 46 — Docker ───────────────────────────────────────────────────
  {
    subjectSlug: "python",
    topicSlug: "api-requests",
    videos: [
      {
        id: "8vmKtS8W7IQ",
        title: "Complete Docker In One Shot - Krish Naik",
        creator: "Krish Naik",
        section: "Docker",
        description: "Complete Docker tutorial from basics to deployment",
      },
      {
        id: "qN1CzLdCq5g",
        title: "Docker Image vs Containers - Complete Guide",
        creator: "CodeWithHarry",
        section: "Docker",
      },
      {
        id: "WNUCAPKa44Y",
        title: "Docker Compose - Complete Tutorial",
        creator: "CodeWithHarry",
        section: "Docker",
      },
    ],
  },

  // ── SECTION 47 — Git & GitHub ────────────────────────────────────────────
  {
    subjectSlug: "python",
    topicSlug: "api-requests",
    videos: [
      {
        id: "GW7B6vwktPA",
        title: "Git And GitHub - Introduction And Basic Commands",
        creator: "Krish Naik",
        section: "Git",
        playlistId: GIT_PLAYLIST,
      },
      {
        id: "SMqxisMGfYM",
        title: "Git Merge, Push, Checkout And Log With Commands",
        creator: "Krish Naik",
        section: "Git",
        playlistId: GIT_PLAYLIST,
      },
      {
        id: "J_TLvwNYliM",
        title: "Resolving Git Branch Merge Conflict",
        creator: "Krish Naik",
        section: "Git",
        playlistId: GIT_PLAYLIST,
      },
    ],
  },

  // ── SECTION 48–49 — End-to-End ML Projects ───────────────────────────────
  {
    subjectSlug: "ml-basics",
    topicSlug: "mlops-mlflow",
    videos: [
      {
        id: "Rv6UFGNmNZg",
        title: "End To End ML Project - GitHub And Code Setup",
        creator: "Krish Naik",
        section: "MLOps Project",
        playlistId: PROJECTS_PLAYLIST,
      },
      {
        id: "_0v1UK7smBc",
        title: "Data Ingestion Implementation",
        creator: "Krish Naik",
        section: "MLOps Project",
        playlistId: PROJECTS_PLAYLIST,
      },
      {
        id: "355u2bDqB7c",
        title: "Model Training And Evaluation With Hyperparameter Tuning",
        creator: "Krish Naik",
        section: "MLOps Project",
        playlistId: PROJECTS_PLAYLIST,
      },
      {
        id: "VokAGy8C6K4",
        title: "MLflow - Model Experiment Tracking",
        creator: "Krish Naik",
        section: "MLOps",
      },
      {
        id: "VCwk0Xk1oR0",
        title: "MLflow And Dagshub - Complete Tutorial",
        creator: "Krish Naik",
        section: "MLOps",
      },
    ],
  },

  // ── SECTION 51 — NLP ─────────────────────────────────────────────────────
  {
    subjectSlug: "gen-ai",
    topicSlug: "intro",
    videos: [
      {
        id: "fM4qTMfCoak",
        title: "NLP Roadmap - Complete Guide",
        creator: "Krish Naik",
        section: "NLP Introduction",
        playlistId: NLP_LIVE_PLAYLIST,
      },
      {
        id: "zza-0hUsipw",
        title: "Tokenisation And Text Preprocessing - NLTK",
        creator: "Krish Naik",
        section: "NLP Basics",
        playlistId: NLP_LIVE_PLAYLIST,
      },
      {
        id: "IKgBLTeQQL8",
        title: "Bag Of Words - BOW Intuition And Implementation",
        creator: "Krish Naik",
        section: "Text Representation",
        playlistId: NLP_LIVE_PLAYLIST,
      },
      {
        id: "D2V1okCEsiE",
        title: "TF-IDF - Intuition And Implementation",
        creator: "Krish Naik",
        section: "Text Representation",
        playlistId: NLP_LIVE_PLAYLIST,
      },
      {
        id: "Q95SIG4g7SA",
        title: "Word2Vec - Complete Intuition",
        creator: "Krish Naik",
        section: "Word Embeddings",
        playlistId: NLP_LIVE_PLAYLIST,
      },
    ],
  },

  // ── SECTION 52–58 — Deep Learning: ANN ───────────────────────────────────
  {
    subjectSlug: "deep-learning",
    topicSlug: "introduction",
    videos: [
      {
        id: "SlbbvhO3jKY",
        title: "Deep Learning Complete Playlist - Krish Naik",
        creator: "Krish Naik",
        section: "Deep Learning Overview",
        playlistId: DL_NLP_PLAYLIST,
      },
      {
        id: "FKJeFvDgyTA",
        title: "Perceptron - Intuition And Working",
        creator: "Krish Naik",
        section: "Neural Networks",
        playlistId: DL_NLP_PLAYLIST,
      },
      {
        id: "83E3g9a4Psg",
        title: "ANN - Backpropagation And Weight Updation",
        creator: "Krish Naik",
        section: "Neural Networks",
        playlistId: DL_NLP_PLAYLIST,
      },
      {
        id: "JIWXbzRXk1I",
        title: "Vanishing Gradient Problem And Sigmoid",
        creator: "Krish Naik",
        section: "Neural Networks",
        playlistId: DL_NLP_PLAYLIST,
      },
      {
        id: "DDBk3ZFNtJc",
        title: "ReLU Activation Function - Complete Guide",
        creator: "Krish Naik",
        section: "Activation Functions",
        playlistId: DL_NLP_PLAYLIST,
      },
      {
        id: "V8fS0T_ktn4",
        title: "Softmax For Multiclass Classification",
        creator: "Krish Naik",
        section: "Activation Functions",
        playlistId: DL_NLP_PLAYLIST,
      },
      {
        id: "TudQZtgpoHk",
        title: "Adam, SGD And Other Gradient Descent Optimisers",
        creator: "Krish Naik",
        section: "Optimizers",
        playlistId: DL_NLP_PLAYLIST,
      },
    ],
  },

  // ── Deep Learning: CNN ────────────────────────────────────────────────────
  {
    subjectSlug: "deep-learning",
    topicSlug: "ann-project",
    videos: [
      {
        id: "Etksi-F5ug8",
        title: "CNN Introduction - Convolution Operation",
        creator: "Krish Naik",
        section: "CNN",
        playlistId: DL_NLP_PLAYLIST,
      },
      {
        id: "VpSLtKiPhLM",
        title: "Pooling - Max, Min And Average Pooling In CNN",
        creator: "Krish Naik",
        section: "CNN",
        playlistId: DL_NLP_PLAYLIST,
      },
    ],
  },

  // ── Deep Learning: RNN & LSTM ─────────────────────────────────────────────
  {
    subjectSlug: "deep-learning",
    topicSlug: "simple-rnn",
    videos: [
      {
        id: "CPl9XdIFbYA",
        title: "RNN Architecture - RNN vs ANN",
        creator: "Krish Naik",
        section: "RNN",
        playlistId: DL_NLP_PLAYLIST,
      },
      {
        id: "rdkIOM78ZPk",
        title: "LSTM RNN - Why LSTM?",
        creator: "Krish Naik",
        section: "LSTM",
        playlistId: DL_NLP_PLAYLIST,
      },
      {
        id: "E8f6vyuxb9A",
        title: "LSTM - Forget Gate, Input Gate, Output Gate",
        creator: "Gate Smashers",
        section: "LSTM",
        playlistId: DL_NLP_PLAYLIST,
      },
      {
        id: "tOuXgORsXJ4",
        title: "GRU - Complete Indepth Intuition",
        creator: "Codebasics",
        section: "GRU",
        playlistId: DL_NLP_PLAYLIST,
      },
    ],
  },

  // ── SECTION 61–62 — Attention & Transformers ──────────────────────────────
  {
    subjectSlug: "gen-ai",
    topicSlug: "prompt-engineering",
    videos: [
      {
        id: "SMZQrJ_L1vo",
        title: "Attention Mechanism - Indepth Architecture",
        creator: "Krish Naik",
        section: "Attention",
        playlistId: DL_NLP_PLAYLIST,
      },
      {
        id: "csWluHwfsB8",
        title: "Transformers - What And Why",
        creator: "Krish Naik",
        section: "Transformers",
        playlistId: DL_NLP_PLAYLIST,
      },
      {
        id: "SMZQrJ_L1vo",
        title: "Self Attention Layer - Working",
        creator: "Krish Naik",
        section: "Transformers",
        playlistId: DL_NLP_PLAYLIST,
      },
      {
        id: "7uwa9aPbBRU",
        title: "Positional Encoding - Indepth Intuition",
        creator: "Krish Naik",
        section: "Transformers",
        playlistId: DL_NLP_PLAYLIST,
      },
      {
        id: "3bPhDUSAUYI",
        title: "Complete Encoder Transformer Architecture",
        creator: "Krish Naik",
        section: "Transformers",
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
