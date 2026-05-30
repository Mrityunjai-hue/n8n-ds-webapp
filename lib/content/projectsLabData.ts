export interface ProjectStep {
  title: string;
  desc: string;
  code: string;
}

export interface ProjectData {
  id: number;
  title: string;
  tagline: string;
  domain: string;
  filters: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  icon: string;
  iconBg: string;
  iconColor: string;
  featured: boolean;
  duration: string;
  dataset: string;
  datasetUrl: string;
  skills: string[];
  realWorld: string;
  where: {
    platform: string;
    dataset: string;
    environment: string;
    storage: string;
  };
  steps: ProjectStep[];
  tools: string[];
  deliverables: string[];
}

export const PROJECTS: ProjectData[] = [
  {
    id: 1,
    title: "Customer Churn Prediction for a Telecom",
    tagline: "Predict which subscribers cancel next month — saving crores in retention costs.",
    domain: "Finance",
    filters: ["intermediate", "finance"],
    difficulty: "intermediate",
    icon: "📡",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
    featured: true,
    duration: "3–4 days",
    dataset: "Telco Customer Churn — IBM / Kaggle",
    datasetUrl: "https://www.kaggle.com/datasets/blastchar/telco-customer-churn",
    skills: ["Python", "Pandas", "Scikit-learn", "XGBoost", "SHAP", "EDA", "Logistic Regression"],
    realWorld: "Telecom companies globally lose 15–25% of subscribers every year — a problem called churn. Acquiring a new customer costs 5× more than retaining an existing one. Companies like Jio, Airtel, Vodafone, and T-Mobile employ data scientists whose entire job is building churn prediction models that score every customer weekly. Customer success teams then call or send targeted retention offers to the highest-risk customers before they leave. A model that improves churn recall by even 5% can save ₹50+ crore/month at scale. This is one of the most common real-world ML projects across all industries.",
    where: {
      platform: "Google Colab (free, browser-based, no install required)",
      dataset: "Kaggle: search 'Telco Customer Churn' → Download WA_Fn-UseC_-Telco-Customer-Churn.csv",
      environment: "100% browser — open Colab, upload CSV, run all cells",
      storage: "CSV uploaded to Colab session → pd.read_csv() into Pandas DataFrame"
    },
    steps: [
      {
        title: "Load data and run exploratory analysis",
        desc: "Download the dataset from Kaggle. Load with pd.read_csv(). Check shape, dtypes, null counts. Run value_counts on the target variable — you'll see ~26% churn. This imbalance is the first problem you must address.",
        code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

df = pd.read_csv('WA_Fn-UseC_-Telco-Customer-Churn.csv')
print(df.shape)          # (7043, 21)
print(df.dtypes)
print(df['Churn'].value_counts(normalize=True))

# Fix TotalCharges — it's stored as string, has spaces
df['TotalCharges'] = pd.to_numeric(df['TotalCharges'], errors='coerce')
df['TotalCharges'].fillna(df['TotalCharges'].median(), inplace=True)`
      },
      {
        title: "Encode categoricals and engineer features",
        desc: "Convert Yes/No binary columns to 1/0. One-hot encode multi-class columns. Create two new features: tenure buckets (new/mid/loyal) and total spend (MonthlyCharges × tenure). These engineered features often rank in the top 5 by importance.",
        code: `# Binary encoding
binary_cols = ['gender','Partner','Dependents','PhoneService',
                'PaperlessBilling','Churn']
for col in binary_cols:
    df[col] = df[col].map({'Yes':1,'No':0,'Male':1,'Female':0})

# Feature engineering
df['tenure_group'] = pd.cut(df['tenure'],
                            bins=[0,12,36,72],
                            labels=['new','mid','loyal'])
df['total_spend'] = df['MonthlyCharges'] * df['tenure']

# One-hot encode remaining categoricals
df = pd.get_dummies(df, columns=['Contract','InternetService',
                                'PaymentMethod','tenure_group'],
                    drop_first=True)
df.drop('customerID', axis=1, inplace=True)`
      },
      {
        title: "Handle class imbalance with SMOTE",
        desc: "With only 26% churn, a naive model can get 74% accuracy by always predicting 'No Churn'. Use SMOTE to oversample the minority class in the training set only (never on the test set).",
        code: `from sklearn.model_selection import train_test_split
from imblearn.over_sampling import SMOTE   # pip install imbalanced-learn

X = df.drop('Churn', axis=1)
y = df['Churn']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y)

smote = SMOTE(random_state=42)
X_train_res, y_train_res = smote.fit_resample(X_train, y_train)
print("After SMOTE:", X_train_res.shape, y_train_res.value_counts())`
      },
      {
        title: "Train XGBoost and evaluate properly",
        desc: "Train an XGBClassifier. Critically, evaluate with AUC-ROC and the Precision-Recall curve — NOT just accuracy. Use a threshold of 0.4 instead of 0.5 to improve recall.",
        code: `from xgboost import XGBClassifier
from sklearn.metrics import roc_auc_score, classification_report

model = XGBClassifier(n_estimators=200, max_depth=4, learning_rate=0.05,
                      scale_pos_weight=3, eval_metric='auc',
                      random_state=42, use_label_encoder=False)
model.fit(X_train_res, y_train_res,
          eval_set=[(X_test, y_test)], verbose=False)

probs = model.predict_proba(X_test)[:, 1]
threshold = 0.40
preds = (probs >= threshold).astype(int)

print(f"AUC-ROC: {roc_auc_score(y_test, probs):.4f}")
print(classification_report(y_test, preds,
      target_names=['No Churn', 'Churn']))`
      },
      {
        title: "Explain predictions with SHAP values",
        desc: "Use SHAP TreeExplainer to generate feature importance. This shows WHICH features drive churn — typically Contract_Month-to-month, tenure, and InternetService_Fiber.",
        code: `import shap

explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_test)

plt.figure(figsize=(10, 7))
shap.summary_plot(shap_values, X_test, show=False)
plt.tight_layout()
plt.savefig('shap_churn.png', dpi=150, bbox_inches='tight')
plt.show()`
      },
      {
        title: "Write the business impact summary",
        desc: "Calculate the ROI based on precision and a hypothetical cost structure. This cell transforms your notebook from a code exercise into a business case.",
        code: `# Business impact calculation
flagged = 200
precision = 0.72
true_churners = int(flagged * precision)
retention_cost = 200      # ₹ per outreach call
ltv_saved = 2500          # ₹ per retained customer

net_benefit = (true_churners * ltv_saved) - (flagged * retention_cost)
print(f"True churners caught per batch: {true_churners}")
print(f"Net benefit per weekly run: ₹{net_benefit:,}")
print(f"Annual benefit (52 batches): ₹{net_benefit*52:,}")`
      }
    ],
    tools: ["Python 3.10+", "Google Colab", "Pandas", "Scikit-learn", "XGBoost", "SMOTE", "SHAP"],
    deliverables: [
      "churn_notebook.ipynb — fully runnable from top to bottom",
      "shap_churn.png — SHAP summary plot",
      "churn_model.json — XGBoost model",
      "business_impact.md — markdown file with ROI calculation"
    ]
  },
  {
    id: 2,
    title: "Hospital Readmission Risk Predictor",
    tagline: "Identify diabetic patients most likely to return within 30 days using real clinical data.",
    domain: "Health",
    filters: ["intermediate", "health", "sql"],
    difficulty: "intermediate",
    icon: "🏥",
    iconBg: "bg-green-500/10",
    iconColor: "text-green-500",
    featured: false,
    duration: "4–5 days",
    dataset: "Diabetes 130-US Hospitals (1999–2008) — UCI ML Repository",
    datasetUrl: "https://archive.ics.uci.edu/dataset/296/diabetes+130-us+hospitals+for+years+1999-2008",
    skills: ["SQL", "Python", "Pandas", "Logistic Regression", "Confusion Matrix", "Clinical Feature Engineering"],
    realWorld: "The US Centers for Medicare & Medicaid Services (CMS) penalises hospitals financially for every patient readmitted within 30 days. Indian hospital chains like Apollo, Fortis, and Max have begun implementing identical risk models to improve discharge planning. A readmission risk score allows discharge nurses to flag high-risk patients for a follow-up call on Day 7 and Day 14. This directly reduces readmissions, saves penalty costs, and improves patient outcomes.",
    where: {
      platform: "DB Browser for SQLite (free desktop app) + Google Colab",
      dataset: "UCI ML Repository → Download diabetic_data.csv",
      environment: "SQLite for EDA queries; Colab for ML pipeline",
      storage: "CSV → SQLite DB → CSV export → Pandas"
    },
    steps: [
      {
        title: "Import to SQLite and run exploratory SQL",
        desc: "Import the CSV into SQLite. Write SQL queries to understand readmission rates by specialty and medication counts.",
        code: `-- Query 1: Readmission rate by medical specialty
SELECT medical_specialty,
       COUNT(*) as total_patients,
       ROUND(AVG(CASE WHEN readmitted='<30' THEN 1.0 ELSE 0 END)*100, 2) as readmit_pct
FROM patients
GROUP BY medical_specialty
HAVING total_patients > 200
ORDER BY readmit_pct DESC
LIMIT 15;`
      },
      {
        title: "Define the binary target and handle missing values",
        desc: "Create a binary target for 30-day readmissions. Drop columns with >40% missing data like weight and payer_code.",
        code: `import pandas as pd
import numpy as np

df = pd.read_csv('diabetic_data.csv')
df.replace('?', np.nan, inplace=True)

df['readmit_30'] = (df['readmitted'] == '<30').astype(int)
high_missing = ['weight', 'payer_code', 'medical_specialty']
df.drop(columns=high_missing + ['readmitted', 'encounter_id'], inplace=True)
df.dropna(inplace=True)`
      },
      {
        title: "Engineer clinical features from ICD diagnosis codes",
        desc: "Map granular ICD-9 codes to 9 broader disease groups (Circulatory, Respiratory, etc.) to reduce cardinality and improve model learning.",
        code: `def icd_to_group(code):
    if pd.isna(code): return 'Other'
    code = str(code)
    if code.startswith('250'): return 'Diabetes'
    try:
        c = float(code)
        if 390 <= c <= 459 or c == 785: return 'Circulatory'
        if 460 <= c <= 519 or c == 786: return 'Respiratory'
        # ... other groups
    except: pass
    return 'Other'

for col in ['diag_1', 'diag_2', 'diag_3']:
    df[f'{col}_group'] = df[col].apply(icd_to_group)
df.drop(columns=['diag_1','diag_2','diag_3'], inplace=True)`
      },
      {
        title: "Train model with walk-forward evaluation",
        desc: "Train Logistic Regression with class_weight='balanced'. Tune the decision threshold from 0.5 to 0.35 because catching readmissions (recall) is preferred over precision in clinical settings.",
        code: `from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report, roc_auc_score

df_encoded = pd.get_dummies(df, drop_first=True)
X = df_encoded.drop('readmit_30', axis=1)
y = df_encoded['readmit_30']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y)
scaler = StandardScaler()
X_train_sc = scaler.fit_transform(X_train)
X_test_sc  = scaler.transform(X_test)

model = LogisticRegression(class_weight='balanced', max_iter=500)
model.fit(X_train_sc, y_train)

probs = model.predict_proba(X_test_sc)[:, 1]
print("AUC-ROC:", round(roc_auc_score(y_test, probs), 4))`
      }
    ],
    tools: ["Python", "SQLite", "DB Browser", "Pandas", "Scikit-learn"],
    deliverables: [
      "readmission_eda.sql — 5 SQL queries with comments",
      "readmission_model.ipynb — fully runnable notebook",
      "confusion_matrix.png — annotated confusion matrix",
      "clinical_summary.md — 1-page non-technical summary"
    ]
  },
  {
    id: 3,
    title: "E-Commerce Business Intelligence with SQL",
    tagline: "Turn raw Olist order data into CEO-ready insights using only SQL — no Python required.",
    domain: "Retail",
    filters: ["beginner", "sql"],
    difficulty: "beginner",
    icon: "🛒",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-500",
    featured: false,
    duration: "2–3 days",
    dataset: "Brazilian E-Commerce Public Dataset by Olist — Kaggle",
    datasetUrl: "https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce",
    skills: ["SQL", "CTEs", "Window Functions", "Aggregations", "Business Metrics", "Data Storytelling"],
    realWorld: "Every e-commerce company — Meesho, Amazon, Flipkart — has an analytics team that runs exactly these queries every Monday morning. A SQL analyst who can answer 'which product categories have the highest revenue growth YoY, and which states have the worst delivery performance?' is immediately hirable. The Olist dataset has 100,000 orders across 8 normalised tables — a near-perfect simulation of a production OLTP database.",
    where: {
      platform: "Mode Analytics (free tier) OR DB Browser for SQLite",
      dataset: "Kaggle: 'Brazilian E-Commerce Public Dataset by Olist'",
      environment: "100% free — Mode runs in browser; SQLite runs locally",
      storage: "8 CSVs imported as separate tables; joined via SQL FKs"
    },
    steps: [
      {
        title: "Monthly revenue with month-over-month growth",
        desc: "Use a CTE to calculate revenue per month. Use LAG() window function to pull the previous month's revenue and calculate percentage growth.",
        code: `WITH monthly_rev AS (
    SELECT
        strftime('%Y-%m', o.order_purchase_timestamp) AS month,
        ROUND(SUM(p.payment_value), 2) AS revenue
    FROM orders o
    JOIN order_payments p ON o.order_id = p.order_id
    WHERE o.order_status = 'delivered'
    GROUP BY 1
)
SELECT
    month,
    revenue,
    LAG(revenue) OVER (ORDER BY month) AS prev_month_rev,
    ROUND(
        (revenue - LAG(revenue) OVER (ORDER BY month)) * 100.0
        / LAG(revenue) OVER (ORDER BY month), 2
    ) AS mom_growth_pct
FROM monthly_rev;`
      },
      {
        title: "Customer cohort retention analysis",
        desc: "Find each customer's first purchase month (cohort). Then count what fraction of that cohort bought again in subsequent months. This is the holy grail of e-commerce metrics.",
        code: `WITH first_orders AS (
    SELECT
        customer_id,
        strftime('%Y-%m', MIN(order_purchase_timestamp)) AS cohort_month
    FROM orders
    GROUP BY customer_id
),
customer_orders AS (
    SELECT
        o.customer_id,
        f.cohort_month,
        strftime('%Y-%m', o.order_purchase_timestamp) AS order_month
    FROM orders o
    JOIN first_orders f ON o.customer_id = f.customer_id
)
SELECT
    cohort_month,
    order_month,
    COUNT(DISTINCT customer_id) AS active_customers
FROM customer_orders
GROUP BY cohort_month, order_month
ORDER BY cohort_month, order_month;`
      },
      {
        title: "Seller performance ranking with window functions",
        desc: "Use RANK() OVER to rank sellers by total revenue and join with review scores to find 'tolerated bad actors'.",
        code: `WITH seller_stats AS (
    SELECT
        i.seller_id,
        COUNT(DISTINCT i.order_id)          AS total_orders,
        ROUND(SUM(i.price + i.freight_value), 2) AS total_revenue,
        ROUND(AVG(r.review_score), 2)       AS avg_review
    FROM order_items i
    LEFT JOIN order_reviews r ON i.order_id = r.order_id
    GROUP BY i.seller_id
    HAVING total_orders >= 50
)
SELECT *,
       RANK() OVER (ORDER BY total_revenue DESC) AS revenue_rank,
       RANK() OVER (ORDER BY avg_review DESC)    AS review_rank
FROM seller_stats
ORDER BY revenue_rank
LIMIT 20;`
      }
    ],
    tools: ["SQLite", "Mode Analytics", "SQL"],
    deliverables: [
      "olist_analysis.sql — all queries neatly formatted",
      "insights_summary.md — 3 bullet points with business recommendations",
      "cohort_table.csv — exported cohort retention result"
    ]
  },
  {
    id: 4,
    title: "Sentiment Analysis on Product Reviews",
    tagline: "Classify reviews as positive/negative and discover exactly what drives 1-star ratings.",
    domain: "NLP",
    filters: ["beginner", "nlp"],
    difficulty: "beginner",
    icon: "💬",
    iconBg: "bg-pink-500/10",
    iconColor: "text-pink-500",
    featured: false,
    duration: "2–3 days",
    dataset: "Amazon Fine Food Reviews — Stanford SNAP / Kaggle",
    datasetUrl: "https://www.kaggle.com/datasets/snap/amazon-fine-food-reviews",
    skills: ["Python", "NLTK", "TF-IDF", "Logistic Regression", "Text Cleaning", "WordCloud"],
    realWorld: "Every consumer brand runs automated sentiment analysis on customer reviews 24/7. An analyst who finds that reviews mentioning 'delivery packaging broken' are 3× more likely to be 1-star has given the operations team an actionable fix. This project teaches the complete end-to-end NLP pipeline: raw text → cleaning → vectorisation → model → insight extraction.",
    where: {
      platform: "Google Colab",
      dataset: "Kaggle: 'Amazon Fine Food Reviews'",
      environment: "Browser-only",
      storage: "SQLite / CSV uploaded to Colab"
    },
    steps: [
      {
        title: "Clean text with a reusable preprocessing function",
        desc: "Amazon reviews have HTML tags, special characters, and stopwords. Clean all of these and apply NLTK's PorterStemmer.",
        code: `import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer

stemmer = PorterStemmer()
stop_words = set(stopwords.words('english'))

def clean_text(text):
    text = str(text).lower()
    text = re.sub('<.*?>', ' ', text)
    text = re.sub('[^a-z\s]', ' ', text)
    tokens = [stemmer.stem(w) for w in text.split() if w not in stop_words]
    return ' '.join(tokens)

df['cleaned'] = df['Text'].apply(clean_text)`
      },
      {
        title: "TF-IDF vectorisation with bigrams",
        desc: "TF-IDF with ngram_range=(1,2) captures bigrams like 'not good' — critical for sentiment since negation bigrams are strong signals.",
        code: `from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split

X_train_txt, X_test_txt, y_train, y_test = train_test_split(
    df['cleaned'], df['sentiment'], test_size=0.2, stratify=df['sentiment'])

vec = TfidfVectorizer(max_features=15000, ngram_range=(1,2), min_df=3)
X_train = vec.fit_transform(X_train_txt)
X_test  = vec.transform(X_test_txt)`
      },
      {
        title: "Extract the words that drive negative reviews",
        desc: "The model's coefficients tell you which words most strongly predict each class. Sort by the negative-class coefficient and extract the top 20.",
        code: `import numpy as np

feature_names = vec.get_feature_names_out()
coef = model.coef_[0]

top_neg_idx = np.argsort(coef)[:20]
print("Top 20 words driving NEGATIVE sentiment:")
print(list(feature_names[top_neg_idx]))`
      }
    ],
    tools: ["Python", "NLTK", "Scikit-learn", "WordCloud"],
    deliverables: [
      "sentiment_model.ipynb",
      "negative_wordcloud.png",
      "top_negative_bigrams.csv"
    ]
  },
  {
    id: 5,
    title: "Stock Price Forecasting with LSTM",
    tagline: "Build a sequence-learning model that predicts next-day closing prices using free market data.",
    domain: "Finance",
    filters: ["advanced", "finance", "mlops"],
    difficulty: "advanced",
    icon: "📈",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-500",
    featured: true,
    duration: "4–5 days",
    dataset: "Yahoo Finance via yfinance (live, free)",
    datasetUrl: "https://pypi.org/project/yfinance/",
    skills: ["Deep Learning", "LSTM", "Keras", "TensorFlow", "Time Series", "Backtesting"],
    realWorld: "Quantitative funds and fintech startups building automated trading systems use LSTM or Transformer-based sequence models for price prediction. The LSTM architecture was specifically designed for sequential data — it can remember that a stock fell 3 days in a row in a way that a standard neural network cannot. This project teaches the exact pipeline quant analysts use: time-indexed windowing, walk-forward validation, and rigorous comparison against a naive baseline.",
    where: {
      platform: "Google Colab (free GPU)",
      dataset: "Live via yfinance library",
      environment: "Colab with T4 GPU runtime",
      storage: "In-memory Pandas DataFrame"
    },
    steps: [
      {
        title: "Download and scale data",
        desc: "Use yfinance to download 5 years of historical data. Scale prices to [0,1] with MinMaxScaler — LSTMs are extremely sensitive to input scale.",
        code: `import yfinance as yf
from sklearn.preprocessing import MinMaxScaler

df = yf.download('RELIANCE.NS', start='2018-01-01', end='2024-12-31')
data = df[['Close']].dropna().values

split = int(len(data) * 0.80)
train_data, test_data = data[:split], data[split:]

scaler = MinMaxScaler(feature_range=(0, 1))
train_scaled = scaler.fit_transform(train_data)
test_scaled  = scaler.transform(test_data)`
      },
      {
        title: "Build windowed sequences",
        desc: "Create sequences: for each day T, input X = the previous 60 days of prices, label y = day T+1 price. Verify shapes carefully.",
        code: `import numpy as np

def create_sequences(arr, window=60):
    X, y = [], []
    for i in range(window, len(arr)):
        X.append(arr[i-window:i, 0])
        y.append(arr[i, 0])
    return np.array(X), np.array(y)

X_train, y_train = create_sequences(train_scaled)
X_test, y_test = create_sequences(test_scaled)

X_train = X_train.reshape(X_train.shape[0], X_train.shape[1], 1)
X_test = X_test.reshape(X_test.shape[0], X_test.shape[1], 1)`
      },
      {
        title: "Build and train LSTM",
        desc: "Use a 2-layer LSTM architecture with Dropout to prevent overfitting. Compile with Adam optimizer.",
        code: `from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dropout, Dense

model = Sequential([
    LSTM(50, return_sequences=True, input_shape=(60, 1)),
    Dropout(0.2),
    LSTM(50, return_sequences=False),
    Dropout(0.2),
    Dense(1)
])

model.compile(optimizer='adam', loss='mse')
model.fit(X_train, y_train, epochs=30, batch_size=32, validation_split=0.1)`
      },
      {
        title: "Evaluate against naive baseline",
        desc: "The naive baseline predicts tomorrow's price = today's price. Compute Directional Accuracy to see if your model predicts the correct trend.",
        code: `from sklearn.metrics import mean_squared_error

lstm_preds = scaler.inverse_transform(model.predict(X_test))
actual = scaler.inverse_transform(y_test.reshape(-1, 1))

naive_preds = actual[:-1]
lstm_rmse = np.sqrt(mean_squared_error(actual[1:], lstm_preds[1:]))
naive_rmse = np.sqrt(mean_squared_error(actual[1:], naive_preds))

# Directional Accuracy (Did it go up or down?)
lstm_dir = np.sign(lstm_preds[1:] - actual[:-1])
actual_dir = np.sign(actual[1:] - actual[:-1])
dir_acc = np.mean(lstm_dir == actual_dir)

print(f"LSTM RMSE: {lstm_rmse:.2f} | Naive RMSE: {naive_rmse:.2f}")
print(f"Directional Accuracy: {dir_acc * 100:.2f}%")`
      }
    ],
    tools: ["TensorFlow", "Keras", "yfinance", "Scikit-learn"],
    deliverables: [
      "lstm_forecasting.ipynb",
      "predictions_chart.png",
      "model_metrics.md"
    ]
  },
  {
    id: 6,
    title: "A/B Testing for E-Commerce Conversions",
    tagline: "Statistically prove whether a new website design actually increases sales.",
    domain: "Analytics",
    filters: ["beginner", "analytics"],
    difficulty: "beginner",
    icon: "⚖️",
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-500",
    featured: false,
    duration: "2–3 days",
    dataset: "E-commerce A/B Testing Dataset — Kaggle",
    datasetUrl: "https://www.kaggle.com/datasets/zhangluyuan/ab-testing",
    skills: ["Python", "Pandas", "SciPy", "Hypothesis Testing", "Statsmodels", "Data Visualisation"],
    realWorld: "Product Managers at tech companies constantly run experiments (A/B tests) to see if changing a button color, layout, or pricing model improves conversion rates. They rely on Data Analysts to parse the test logs and run rigorous statistical tests to ensure the observed lift isn't just random noise. Mastering A/B testing is a mandatory requirement for any product analyst role.",
    where: {
      platform: "Jupyter Notebook or Google Colab",
      dataset: "Kaggle: 'A/B Testing Dataset'",
      environment: "Browser or Local",
      storage: "CSV → Pandas"
    },
    steps: [
      {
        title: "Clean the experiment logs",
        desc: "Users sometimes get exposed to both the control and treatment groups due to cookie errors. Filter these corrupted users out first.",
        code: `import pandas as pd

df = pd.read_csv('ab_data.csv')
session_counts = df['user_id'].value_counts(ascending=False)
multi_users = session_counts[session_counts > 1].index

df_clean = df[~df['user_id'].isin(multi_users)]
print(f"Removed {len(multi_users)} corrupted users.")`
      },
      {
        title: "Calculate Conversion Rates",
        desc: "Find the baseline conversion rate for the control group and the new conversion rate for the treatment group.",
        code: `conversion_rates = df_clean.groupby('group')['converted'].mean() * 100
std_dev = df_clean.groupby('group')['converted'].std()

print("Conversion Rates (%):")
print(conversion_rates)`
      },
      {
        title: "Run a Z-Test for Proportions",
        desc: "Use statsmodels to perform a 2-sample Z-test to compute the p-value. If p < 0.05, the result is statistically significant.",
        code: `from statsmodels.stats.proportion import proportions_ztest

control_results = df_clean[df_clean['group'] == 'control']['converted']
treatment_results = df_clean[df_clean['group'] == 'treatment']['converted']

n_con = control_results.count()
n_treat = treatment_results.count()
successes = [control_results.sum(), treatment_results.sum()]
nobs = [n_con, n_treat]

z_stat, pval = proportions_ztest(successes, nobs=nobs)
print(f"Z-statistic: {z_stat:.3f}, p-value: {pval:.3f}")`
      }
    ],
    tools: ["Python", "Pandas", "Statsmodels", "SciPy"],
    deliverables: [
      "ab_test_analysis.ipynb",
      "executive_summary.md — final recommendation on whether to launch the feature"
    ]
  },
  {
    id: 7,
    title: "Credit Card Fraud Detection Pipeline",
    tagline: "Build a highly imbalanced classification model to block fraudulent transactions in real-time.",
    domain: "Finance",
    filters: ["intermediate", "finance", "mlops"],
    difficulty: "intermediate",
    icon: "💳",
    iconBg: "bg-red-500/10",
    iconColor: "text-red-500",
    featured: false,
    duration: "3–4 days",
    dataset: "Credit Card Fraud Detection — Kaggle",
    datasetUrl: "https://www.kaggle.com/mlg-ulb/creditcardfraud",
    skills: ["Python", "Random Forest", "Isolation Forest", "Imbalanced Data", "AUPRC"],
    realWorld: "Payment gateways process millions of transactions per second. Fraud accounts for 0.17% of all transactions, but costs billions. Detecting this needle in a haystack requires specialised techniques for extreme class imbalance. You will learn to use the Area Under the Precision-Recall Curve (AUPRC), which is the standard metric for fraud, rather than ROC-AUC.",
    where: {
      platform: "Google Colab",
      dataset: "Kaggle: 'Credit Card Fraud Detection'",
      environment: "Browser",
      storage: "CSV → Pandas"
    },
    steps: [
      {
        title: "Handle extreme class imbalance",
        desc: "The dataset has 284,807 transactions, but only 492 are fraud (0.17%). Use stratified splitting to ensure fraud cases are distributed properly.",
        code: `from sklearn.model_selection import train_test_split

X = df.drop('Class', axis=1)
y = df['Class']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42)`
      },
      {
        title: "Train a Random Forest with Class Weights",
        desc: "Instead of SMOTE, use the algorithm's native class_weight parameter to heavily penalise missing a fraud case.",
        code: `from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier(n_estimators=100, class_weight='balanced_subsample',
                               max_depth=10, random_state=42, n_jobs=-1)
model.fit(X_train, y_train)`
      },
      {
        title: "Evaluate using AUPRC",
        desc: "Calculate the Area Under the Precision-Recall Curve (Average Precision). This is the gold standard metric for fraud detection.",
        code: `from sklearn.metrics import average_precision_score, classification_report

probs = model.predict_proba(X_test)[:, 1]
auprc = average_precision_score(y_test, probs)

print(f"AUPRC: {auprc:.4f}")

preds = (probs > 0.5).astype(int)
print(classification_report(y_test, preds))`
      }
    ],
    tools: ["Scikit-learn", "Pandas", "Matplotlib"],
    deliverables: [
      "fraud_model.pkl",
      "precision_recall_curve.png",
      "fraud_metrics_report.md"
    ]
  },
  {
    id: 8,
    title: "Customer Segmentation with K-Means",
    tagline: "Group supermarket shoppers into distinct personas to drive targeted marketing campaigns.",
    domain: "Retail",
    filters: ["beginner", "analytics"],
    difficulty: "beginner",
    icon: "👥",
    iconBg: "bg-teal-500/10",
    iconColor: "text-teal-500",
    featured: false,
    duration: "2–3 days",
    dataset: "Mall Customers Dataset — Kaggle",
    datasetUrl: "https://www.kaggle.com/vjchoudhary7/customer-segmentation-tutorial-in-python",
    skills: ["Python", "K-Means Clustering", "PCA", "Seaborn", "Unsupervised Learning"],
    realWorld: "Marketing teams cannot send the exact same email to a million customers. Unsupervised learning is used to cluster users based on spending habits, income, and recency. This allows businesses to create targeted 'personas' (e.g., 'High-income bargain hunters') and send highly personalized promotions.",
    where: {
      platform: "Local Jupyter Notebook or Colab",
      dataset: "Kaggle: 'Mall Customers Dataset'",
      environment: "Browser",
      storage: "CSV → Pandas"
    },
    steps: [
      {
        title: "Find the optimal K using the Elbow Method",
        desc: "Run K-Means for k=1 to 10 and plot the Within-Cluster Sum of Squares (WCSS) to find the 'elbow' point.",
        code: `from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

X = df[['Annual Income (k$)', 'Spending Score (1-100)']].values
wcss = []

for i in range(1, 11):
    kmeans = KMeans(n_clusters=i, init='k-means++', random_state=42)
    kmeans.fit(X)
    wcss.append(kmeans.inertia_)

plt.plot(range(1, 11), wcss, marker='o')
plt.title('Elbow Method')
plt.xlabel('Number of clusters')
plt.ylabel('WCSS')
plt.show()`
      },
      {
        title: "Fit the final K-Means model",
        desc: "Fit the model with the chosen K (usually 5 for this dataset) and visualize the clusters in a scatter plot.",
        code: `kmeans = KMeans(n_clusters=5, init='k-means++', random_state=42)
y_kmeans = kmeans.fit_predict(X)

plt.scatter(X[y_kmeans == 0, 0], X[y_kmeans == 0, 1], s=50, c='red', label='Cluster 1')
plt.scatter(X[y_kmeans == 1, 0], X[y_kmeans == 1, 1], s=50, c='blue', label='Cluster 2')
plt.scatter(X[y_kmeans == 2, 0], X[y_kmeans == 2, 1], s=50, c='green', label='Cluster 3')
plt.scatter(X[y_kmeans == 3, 0], X[y_kmeans == 3, 1], s=50, c='cyan', label='Cluster 4')
plt.scatter(X[y_kmeans == 4, 0], X[y_kmeans == 4, 1], s=50, c='magenta', label='Cluster 5')
plt.scatter(kmeans.cluster_centers_[:, 0], kmeans.cluster_centers_[:, 1], s=200, c='black', marker='X')
plt.legend()
plt.show()`
      }
    ],
    tools: ["Python", "Scikit-learn", "Matplotlib", "Seaborn"],
    deliverables: [
      "segmentation.ipynb",
      "cluster_scatter_plot.png",
      "marketing_personas.md — description of the 5 discovered customer types"
    ]
  }
];
