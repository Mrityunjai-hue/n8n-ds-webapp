import { Topic } from '../../types/content';

export const mlTopicsP1: Topic[] = [
  {
    id: 'ml-intro-to-ml',
    slug: 'intro-to-ml',
    title: 'Introduction To Machine Learning',
    description: "Types of ML, Equation of a Line/Hyperplane, Distance Metrics, and Learning Types.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "### 1. Introduction\nMachine Learning is a subset of AI where computers learn from data without being explicitly programmed. Instead of writing manual rules (e.g., `if pixel_color == red: return 'apple'`), we feed the algorithm data and let it discover the rules mathematically.\n\n### 2. Types of ML Techniques\n- **Supervised Learning**: The algorithm is trained on labeled data (it knows the 'answers'). Used for Classification (predicting categories) and Regression (predicting continuous numbers).\n- **Unsupervised Learning**: The data has no labels. The algorithm finds hidden structures (e.g., Clustering, Dimensionality Reduction).\n- **Reinforcement Learning**: An agent interacts with an environment, learning to maximize rewards through trial and error.\n\n### 3. Equation of Line, 3D, and Hyperplane\nML algorithms rely on geometry. \n- In **2D**, a boundary is a line: $y = mx + c$ (or $\\beta_0 + \\beta_1x$)\n- In **3D**, a boundary is a plane: $z = \\beta_0 + \\beta_1x + \\beta_2y$\n- In **N-Dimensions**, a boundary is a **Hyperplane**. Even though we can't visualize it, the math scales perfectly.\n\n### 4. Distance of a Point from a Plane\nTo classify data, algorithms calculate how far a data point is from a hyperplane boundary.\n- **Euclidean Distance (L2)**: The straight-line distance. $$d = \\sqrt{\\sum (q_i - p_i)^2}$$\n- **Manhattan Distance (L1)**: Distance along grid lines. $$d = \\sum |q_i - p_i|$$\n\n### 5. Instance-Based vs Model-Based Learning\n- **Instance-Based (e.g., KNN)**: The algorithm memorizes the training data. To predict a new point, it simply searches for the most similar memorized points.\n- **Model-Based (e.g., Linear Regression)**: The algorithm studies the data to build a mathematical formula (a model), then discards the data and uses only the formula to predict.",
        eli5: "Instead of teaching a child exactly how to walk by moving their joints, you just let them try, fall down, and adjust until they figure it out themselves. That's Machine Learning."
      },
      why: {
        text: "Traditional programming scales with human effort (more rules = more programmers). Machine Learning scales with data (more data = better accuracy).",
        tip: "The hardest part of ML isn't the algorithms; it's the data. 80% of a Data Scientist's job is cleaning and preparing data."
      },
      code: {
        code: "from sklearn.datasets import make_classification\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LogisticRegression\nimport numpy as np\n\n# Let's generate a dataset representing 1000 patients with 4 health metrics\nX, y = make_classification(n_samples=1000, n_features=4, random_state=42)\n\n# Split into Training (80%) and Testing (20%) data\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n\n# Initialize a Model-Based Learning algorithm\nmodel = LogisticRegression()\n\n# The model 'learns' the mathematical relationship\nmodel.fit(X_train, y_train)\n\n# Evaluate on unseen test data\naccuracy = model.score(X_test, y_test)\nprint(f\"Model generalized with {accuracy*100:.2f}% accuracy!\")"
      },
      examNotes: {
        examNotes: [
          "Supervised learning requires labels (Y); Unsupervised learning only has features (X).",
          "A Hyperplane is a subspace whose dimension is one less than that of its ambient space.",
          "Instance-based learning is lazy (no training phase), while Model-based learning is eager (builds a formula)."
]
      },
      quiz: {
        quiz: [
          {
            question: "Which of the following best describes 'Instance-Based Learning'?",
            options: ["The algorithm builds a complex mathematical formula during training and discards the raw data.", "The algorithm memorizes the training dataset and classifies new data points by comparing them to the stored points.", "The algorithm automatically groups unlabeled data into distinct clusters.", "The algorithm updates its weights using Gradient Descent."],
            correctIndex: 1,
            explanation: "Instance-based algorithms (like KNN) do not learn a mathematical formula. They simply memorize the training data and make predictions based on similarity (distance) to those instances."
          }
        ]
      }
    }
  },
  {
    id: 'ml-linear-regression-deep-dive',
    slug: 'linear-regression-deep-dive',
    title: 'Complete Linear Regression In-depth',
    description: "Simple/Multiple Regression, Cost Functions, OLS, and Convergence.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "Linear Regression models the relationship between an independent variable ($X$) and a continuous dependent variable ($Y$) by fitting a linear equation to observed data.\n\n### 1. Simple vs Multiple Linear Regression\n- **Simple**: One independent variable. Equation: $y = \\beta_0 + \\beta_1 x$\n- **Multiple**: Multiple independent variables. Equation: $y = \\beta_0 + \\beta_1 x_1 + \\beta_2 x_2 + \\dots + \\beta_n x_n$\n\n### 2. The Cost Function (MSE)\nTo find the 'best fit' line, we need to mathematically define 'best'. We do this by minimizing the **Mean Squared Error (MSE)**.\n$$MSE = \\frac{1}{N} \\sum_{i=1}^{N} (y_i - \\hat{y}_i)^2$$\n- We square the errors (residuals) to penalize larger errors exponentially and ensure positive and negative errors don't cancel out.\n\n### 3. Convergence Algorithm (Gradient Descent)\nInstead of guessing the $\\beta$ weights, we use Gradient Descent to find the minimum of the Cost Function.\n- **Math Intuition**: The MSE cost function forms a convex (bowl-shaped) parabola. The derivative (gradient) tells us the slope. We take steps in the opposite direction of the slope until the slope is 0 (the bottom of the bowl).\n- **Update Rule**: $$\\beta_j := \\beta_j - \\alpha \\frac{\\partial}{\\partial \\beta_j} J(\\beta)$$\n  where $\\alpha$ is the Learning Rate.\n\n### 4. Ordinary Least Squares (OLS)\nGradient Descent is an iterative optimization algorithm. However, for Linear Regression, there is an exact mathematical solution called the **Normal Equation (OLS)** that finds the minimum in one step using Matrix Calculus:\n$$\\beta = (X^T X)^{-1} X^T y$$\n\n### 5. Performance Metrics & Over/Underfitting\n- **MAE (Mean Absolute Error)**: Average of absolute errors. Robust to outliers.\n- **RMSE (Root Mean Squared Error)**: Square root of MSE. Heavily penalizes large outliers.\n- **Overfitting**: Model memorizes noise (High Variance).\n- **Underfitting**: Model is too simple to capture the trend (High Bias).",
        eli5: "Imagine dropping a rigid stick onto a scatter plot of dots. You adjust the angle of the stick until the total distance from the stick to all the dots is as small as possible."
      },
      why: {
        text: "Linear regression is computationally incredibly cheap, highly interpretable (you know exactly how much X affects Y), and is the mathematical foundation for Deep Learning.",
        tip: "Linear regression is extremely sensitive to outliers! A single massive outlier can pull the 'line of best fit' far away from the true trend."
      },
      code: {
        code: "import numpy as np\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import mean_squared_error, mean_absolute_error\n\n# Simple Linear Regression: Years of Experience vs Salary\nX = np.array([[1], [2], [3], [4], [5]])\ny = np.array([45000, 52000, 60000, 71000, 78000])\n\n# Using OLS (Ordinary Least Squares) under the hood\nmodel = LinearRegression()\nmodel.fit(X, y)\n\npreds = model.predict(X)\n\nprint(f\"Base Salary (Intercept beta_0): ${model.intercept_:.2f}\")\nprint(f\"Salary per Year of Exp (Slope beta_1): ${model.coef_[0]:.2f}\")\nprint(f\"MSE: {mean_squared_error(y, preds):.2f}\")\nprint(f\"MAE: {mean_absolute_error(y, preds):.2f}\")"
      },
      examNotes: {
        examNotes: [
          "Gradient Descent requires a Learning Rate (alpha); if too high, it diverges; if too low, it's slow.",
          "OLS (Normal Equation) solves for weights perfectly but is extremely slow if the dataset has millions of features due to matrix inversion $O(N^3)$.",
          "RMSE is generally preferred over MSE because it is in the same units as the target variable (Y)."
]
      },
      quiz: {
        quiz: [
          {
            question: "In Gradient Descent, what is the primary role of the Learning Rate (Alpha)?",
            options: ["It dictates the size of the steps taken towards the minimum of the cost function.", "It acts as an L2 Regularization penalty to prevent overfitting.", "It controls the degree of the polynomial used to fit the data.", "It dictates the number of layers in the regression network."],
            correctIndex: 0,
            explanation: "The Learning Rate scales the gradient during the weight update step. If it's too large, the algorithm takes huge steps and overshoots the minimum. If it's too small, the algorithm takes tiny steps and takes too long to converge."
          }
        ]
      }
    }
  },
  {
    id: 'ml-regularization',
    slug: 'regularization',
    title: 'Ridge, Lasso And ElasticNet',
    description: "Regularization, Cross Validation, and Pipelines.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "When a model is too complex, it **overfits** the training data (High Variance). Regularization combats this by mathematically penalizing large $\\beta$ weights.\n\n### 1. Ridge Regression (L2 Regularization)\nAdds a penalty equal to the **square** of the magnitude of coefficients.\n$$Cost = MSE + \\lambda \\sum_{j=1}^{p} \\beta_j^2$$\n- **Effect**: Shrinks weights closer to zero, but never exactly to zero. Excellent at handling multicollinearity (highly correlated features) by distributing weights among them.\n\n### 2. Lasso Regression (L1 Regularization)\nAdds a penalty equal to the **absolute value** of the magnitude of coefficients.\n$$Cost = MSE + \\lambda \\sum_{j=1}^{p} |\\beta_j|$$\n- **Effect**: The geometry of L1 creates sharp corners in the constraint space. This causes Gradient Descent to hit exactly zero for useless features. Therefore, Lasso performs **Automatic Feature Selection**.\n\n### 3. ElasticNet\nCombines both L1 and L2 penalties. It overcomes the limitations of Lasso (which randomly drops one of two highly correlated features) while maintaining feature selection.\n\n### 4. Cross Validation & Hyperparameter Tuning\nHow do we choose the best $\\lambda$ (Alpha) penalty?\n- **K-Fold Cross Validation**: We split the training data into K chunks (folds). We train on K-1 folds and validate on the remaining fold, rotating until every fold has been used for validation. This guarantees our $\\lambda$ choice generalizes well.\n\n### 5. Pipelines & Feature Engineering\nBefore applying Regularization, you **MUST** scale your data (e.g., `StandardScaler`). If one feature is measured in millions and another in decimals, the penalty term will unfairly target the large feature. We use Scikit-Learn `Pipeline`s to chain scaling and modeling to prevent data leakage.",
        eli5: "Regularization is like a strict teacher grading a math test. Even if your final answer is correct (low MSE), the teacher will deduct points if your working out is unnecessarily long and complicated."
      },
      why: {
        text: "If you have 10,000 features (like genes) but only 100 patients, standard Linear Regression will fail completely. Lasso Regression will automatically delete the 9,900 irrelevant genes.",
        tip: "Always use a Pipeline to scale your data inside your Cross-Validation loop. If you scale your entire dataset before splitting, information from the validation set 'leaks' into the training set."
      },
      code: {
        code: "from sklearn.linear_model import Ridge, Lasso\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.datasets import make_regression\nimport numpy as np\n\n# Dataset with 20 features, but only 5 are actually useful!\nX, y = make_regression(n_samples=200, n_features=20, n_informative=5, random_state=42)\n\n# Create a Pipeline to prevent data leakage during CV\nlasso_pipe = Pipeline([\n    ('scaler', StandardScaler()),\n    ('lasso', Lasso(alpha=1.0))\n])\n\n# 5-Fold Cross Validation\ncv_scores = cross_val_score(lasso_pipe, X, y, cv=5, scoring='neg_mean_squared_error')\nprint(f\"Lasso CV MSE: {-np.mean(cv_scores):.2f}\")\n\n# Train on full data to see Feature Selection in action\nlasso_pipe.fit(X, y)\nweights = lasso_pipe.named_steps['lasso'].coef_\nprint(f\"Number of features kept by Lasso: {sum(weights != 0)} / 20\")"
      },
      examNotes: {
        examNotes: [
          "L1 Regularization (Lasso) results in sparse models by zeroing out coefficients.",
          "L2 Regularization (Ridge) prevents multicollinearity.",
          "Scaling is mandatory before Regularization because penalties are sensitive to the magnitude of weights."
]
      },
      quiz: {
        quiz: [
          {
            question: "Why does Lasso Regression (L1) shrink coefficients to exactly zero, while Ridge Regression (L2) only shrinks them close to zero?",
            options: ["Lasso randomly drops features using a dropout algorithm.", "The L1 penalty uses absolute values, creating a diamond-shaped constraint region with sharp corners where the loss gradient frequently intersects exactly on the axes.", "Lasso uses the Normal Equation which guarantees exact zeros.", "L2 regularization is mathematically incapable of reducing a number."],
            correctIndex: 1,
            explanation: "The geometry of the L1 penalty (absolute value) creates a sharp diamond shape in 2D constraint space. The expanding elliptical contours of the Cost Function are mathematically highly likely to hit a sharp corner (where a coefficient is exactly zero) before hitting a flat edge."
          }
        ]
      }
    }
  },
  {
    id: 'ml-ml-lifecycle-project',
    slug: 'ml-lifecycle-project',
    title: 'Step-By-Step Project Implementation',
    description: "Lifecycle of ML, Pickling, Pipelines, and Deployment.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "An end-to-end Machine Learning project is far more than just calling `model.fit()`. It involves a structured lifecycle.\n\n```mermaid\ngraph TD\n    A[Business Problem & Data Ingestion] --> B[EDA & Feature Engineering]\n    B --> C[Data Transformation Pipeline]\n    C --> D[Model Training & Cross Validation]\n    D --> E[Hyperparameter Tuning]\n    E --> F[Model Pickling / Artifacts]\n    F --> G[Deployment to AWS/Azure]\n```\n\n### 1. EDA and Feature Engineering\n- **EDA (Exploratory Data Analysis)**: Checking for null values, plotting distributions, finding correlations (e.g., Pearson correlation matrix).\n- **Feature Engineering**: Handling categorical data (One-Hot Encoding, Label Encoding), handling outliers, and creating derived features.\n\n### 2. Model Training with CV (Lasso, Ridge, ElasticNet)\nWe evaluate multiple models using K-Fold Cross Validation. We compare their MSE/R2 scores to select a champion model.\n\n### 3. Model Pickling in ML\nOnce a model is trained and tuned, it exists only in RAM. To deploy it, we must serialize it to disk. \n- **Pickle / Joblib**: Python libraries that convert the model object (and its trained weights) into a byte stream (e.g., `model.pkl`).\n- **CRITICAL**: You must pickle the entire **Pipeline** (including the Scaler and Encoders), not just the model! If you don't scale incoming production data using the exact same means/variances from training, your predictions will be garbage.\n\n### 4. End-to-End Deployment (AWS/Azure)\n- The pickled model is wrapped in a Web Framework (Flask or FastAPI).\n- The API receives JSON payloads, passes them through the unpickled Pipeline, and returns predictions.\n- This app is deployed to Cloud VMs (AWS EC2, Elastic Beanstalk) or Containers.",
        eli5: "Training an ML model on your laptop is like building a car engine on your desk. 'Pickling' is boxing up the engine. 'Deployment' is putting that engine into a real car so other people can actually drive it."
      },
      why: {
        text: "Never just pickle the model! Always pickle the preprocessing steps (StandardScaler, OneHotEncoder) as a single Pipeline. Production data must undergo the exact same transformations as training data.",
        tip: "If your model performs brilliantly on your laptop but terribly in production, you likely suffer from 'Data Leakage' or 'Data Drift'."
      },
      code: {
        code: "import pickle\nimport numpy as np\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import Ridge\nfrom sklearn.datasets import make_regression\n\n# 1. Train a full Pipeline\nX, y = make_regression(n_samples=100, n_features=3, random_state=42)\npipe = Pipeline([\n    ('scaler', StandardScaler()),\n    ('model', Ridge(alpha=1.0))\n])\npipe.fit(X, y)\n\n# 2. Serialize (Pickle) the entire Pipeline to a byte stream\n# (In a real project, we use open('model.pkl', 'wb'))\npickled_model = pickle.dumps(pipe)\nprint(\"Pipeline serialized successfully!\")\n\n# --- IN PRODUCTION SERVER ---\n# 3. Deserialize (Unpickle) and Predict\nprod_pipeline = pickle.loads(pickled_model)\nnew_user_data = np.array([[0.5, -1.2, 3.4]])\nprediction = prod_pipeline.predict(new_user_data)\n\nprint(f\"Production Prediction: {prediction[0]:.2f}\")"
      },
      examNotes: {
        examNotes: [
          "The ML Lifecycle encompasses everything from Data Ingestion to Monitoring.",
          "Pickling converts Python objects into byte streams for storage.",
          "Always deploy Pipelines, not bare models, to ensure data is scaled correctly in production."
]
      },
      quiz: {
        quiz: [
          {
            question: "When preparing a trained Machine Learning model for production deployment using Pickle, what is the best practice regarding data preprocessing steps (like StandardScaler)?",
            options: ["Preprocessors should be re-fitted on the live production data as it arrives.", "You only need to pickle the Model; preprocessing can be skipped in production if the model is robust.", "You should combine the preprocessors and the model into a single Scikit-Learn Pipeline and pickle the entire Pipeline object.", "Preprocessors cannot be pickled, so they must be rewritten in JavaScript for the frontend."],
            correctIndex: 2,
            explanation: "The preprocessors contain learned parameters (like the 'mean' and 'variance' of the training data). If you don't save them in a Pipeline, you cannot apply the exact same mathematical transformation to the live production data."
          }
        ]
      }
    }
  },
  {
    id: 'ml-logistic-regression-deep-dive',
    slug: 'logistic-regression-deep-dive',
    title: 'Logistic Regression & Classification',
    description: "Math Intuition, OVR, ROC, and Imbalanced Datasets.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "Can Linear Regression solve classification problems? Technically yes, but poorly. A linear line can predict values $< 0$ or $> 1$, which makes no sense for probabilities, and it is highly skewed by outliers.\n\n### 1. Math Intuition (The Sigmoid Function)\nLogistic Regression solves this by taking the linear equation ($z = \\beta_0 + \\beta_1x$) and passing it through the **Sigmoid** activation function:\n$$S(z) = \\frac{1}{1 + e^{-z}}$$\nThis guarantees the output is a probability strictly bounded between 0 and 1. \n\n### 2. Log-Loss (Binary Cross-Entropy)\nWe cannot use MSE for Logistic Regression because the Sigmoid function makes the MSE error surface non-convex (wavy with fake minimums). Instead, we use Log-Loss:\n$$Cost = - \\frac{1}{N} \\sum_{i=1}^{N} [y_i \\log(\\hat{y}_i) + (1 - y_i) \\log(1 - \\hat{y}_i)]$$\nThis creates a perfect convex 'bowl', allowing Gradient Descent to easily find the global minimum.\n\n### 3. One-vs-Rest (OVR) for Multiclass\nLogistic Regression is inherently binary (Yes/No). To predict 3 classes (e.g., Cat, Dog, Bird), we use OVR:\n- Model 1: Cat vs (Dog+Bird)\n- Model 2: Dog vs (Cat+Bird)\n- Model 3: Bird vs (Cat+Dog)\nWe run all 3 models and output the class with the highest probability.\n\n### 4. Performance Metrics (ROC & Imbalanced Data)\nIf your dataset is 99% non-spam and 1% spam, a model that just guesses 'non-spam' every time is 99% accurate! Accuracy is a lie.\n- **Precision**: Out of all predicted Spam, how many were actually Spam?\n- **Recall**: Out of all actual Spam, how many did we catch?\n- **ROC Curve**: Plots True Positive Rate vs False Positive Rate across all classification thresholds. The **AUC** (Area Under Curve) summarizes this into a single score (1.0 is perfect).",
        eli5: "It works exactly like Linear Regression, but instead of outputting a raw number like 500,000, it squashes that number through a mathematical filter to output a clean percentage between 0% and 100%."
      },
      why: {
        text: "It gives us the *probability* of an event. If a bank sees a 90% default probability, they act differently than if it was 51%.",
        tip: "When dealing with imbalanced datasets (like fraud detection), always optimize for F1-Score or ROC-AUC, never Accuracy."
      },
      code: {
        code: "from sklearn.datasets import make_classification\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import classification_report, roc_auc_score\nfrom sklearn.model_selection import train_test_split\nimport numpy as np\n\n# Imbalanced Dataset: 90% Class 0, 10% Class 1\nX, y = make_classification(n_samples=1000, weights=[0.9, 0.1], random_state=42)\nX_train, X_test, y_train, y_test = train_test_split(X, y)\n\n# class_weight='balanced' mathematically penalizes mistakes on the minority class more!\nclf = LogisticRegression(class_weight='balanced')\nclf.fit(X_train, y_train)\n\nprobs = clf.predict_proba(X_test)[:, 1]\npreds = clf.predict(X_test)\n\nprint(classification_report(y_test, preds))\nprint(f\"ROC AUC Score: {roc_auc_score(y_test, probs):.2f}\")"
      },
      examNotes: {
        examNotes: [
          "Sigmoid function bounds outputs between 0 and 1.",
          "Log-Loss is used because MSE is non-convex for Logistic Regression.",
          "One-vs-Rest (OVR) allows binary classifiers to handle multiclass problems by training N separate models."
]
      },
      quiz: {
        quiz: [
          {
            question: "Why is Accuracy considered a flawed metric when evaluating a Logistic Regression model trained on a highly imbalanced dataset (e.g., 99% Class A, 1% Class B)?",
            options: ["Because Accuracy can only be calculated for Regression tasks.", "Because the model can achieve 99% accuracy simply by hardcoding the prediction to always guess the majority class, completely failing to identify the minority class.", "Because imbalanced datasets cause the Sigmoid function to output values greater than 1.", "Because Accuracy relies on MSE."],
            correctIndex: 1,
            explanation: "Accuracy is heavily biased by the majority class. If 99% of transactions are legitimate and 1% are fraud, a useless model that just says 'Legitimate' to everything will boast a 99% accuracy rate, despite catching 0 fraud."
          }
        ]
      }
    }
  },
  {
    id: 'ml-svm-deep-dive',
    slug: 'svm-deep-dive',
    title: 'Support Vector Machines In-depth',
    description: "Hard/Soft Margins, SVR, and the Kernel Trick.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "SVMs are powerful algorithms that draw the optimal decision boundary (Hyperplane) by maximizing the empty space (Margin) between classes.\n\n### 1. Margins and Support Vectors\n- **Support Vectors**: The data points physically closest to the hyperplane. They 'support' the margin. If you move them, the boundary moves. If you delete all other background points, the boundary stays exactly the same.\n- **Objective**: Maximize the distance (Margin) between the support vectors of Class A and Class B.\n\n### 2. Hard Margin vs Soft Margin (C Parameter)\n- **Hard Margin**: Strictly enforces that no points can violate the margin. Fails if data has outliers.\n- **Soft Margin**: Uses a penalty hyperparameter `C`. \n  - **High C**: Strict. Small margin, few violations. (High Variance / Overfitting)\n  - **Low C**: Relaxed. Wide margin, allows violations. (High Bias / Underfitting)\n\n### 3. SVM Kernels & The Kernel Trick\nWhat if the data is a circle of red dots surrounded by a ring of blue dots? A flat line cannot separate them.\nThe **Kernel Trick** mathematically transforms the data into a higher-dimensional space (e.g., 2D to 3D) where a flat plane *can* separate them, without actually performing the impossibly heavy computational cost of moving the data!\n- **Polynomial Kernel**: Elevates data using degrees. $K(x, y) = (x \\cdot y + c)^d$\n- **RBF (Radial Basis Function)**: The default. Acts like throwing a blanket over landmarks; points close to the landmark rise up in 3D space.\n\n### 4. Support Vector Regression (SVR)\nInstead of classification, SVR predicts continuous numbers. Instead of keeping points *outside* the margin, SVR tries to fit as many points as possible *inside* a tube (called the $\\epsilon$-tube). Errors inside the tube are ignored!",
        eli5: "Imagine separating cats and dogs with a fence. SVM tries to build the fence exactly in the middle of the yard so the cats are as far away from the fence as possible, and the dogs are as far away as possible."
      },
      why: {
        text: "SVMs with the RBF kernel are incredibly powerful on tabular data, but they scale poorly. Training an SVM on 1,000,000 rows can take hours due to $O(N^3)$ complexity.",
        tip: "SVMs are completely dependent on distance geometry. You MUST use a StandardScaler before training an SVM."
      },
      code: {
        code: "from sklearn.svm import SVC\nfrom sklearn.datasets import make_circles\nimport numpy as np\n\n# A circular dataset (inner circle and outer ring)\n# A linear line cannot solve this!\nX, y = make_circles(n_samples=200, noise=0.1, factor=0.5, random_state=42)\n\n# We use the RBF Kernel to solve the non-linear problem\nclf = SVC(kernel='rbf', C=1.0)\nclf.fit(X, y)\n\nprint(f\"SVM (RBF Kernel) Accuracy: {clf.score(X, y)*100}%\")\nprint(f\"Number of Support Vectors dictating the boundary: {len(clf.support_vectors_)}\")"
      },
      examNotes: {
        examNotes: [
          "SVMs maximize the margin (distance) between Support Vectors.",
          "The Kernel Trick calculates high-dimensional dot-products without actually transforming the features, saving massive computational overhead.",
          "SVR ignores errors that fall within the epsilon tube."
]
      },
      quiz: {
        quiz: [
          {
            question: "In Support Vector Machines, what happens when you decrease the hyperparameter 'C'?",
            options: ["The algorithm switches from the RBF kernel to the Polynomial kernel.", "The margin becomes extremely strict (Hard Margin), attempting to perfectly classify every single training point, risking overfitting.", "The margin becomes wider and softer, allowing more misclassifications in the training data to achieve better generalization.", "The model converts into a Support Vector Regressor (SVR)."],
            correctIndex: 2,
            explanation: "A low C value relaxes the penalty for misclassification. This allows the SVM to draw a wider, more robust margin that ignores noisy outliers, reducing variance and preventing overfitting."
          }
        ]
      }
    }
  },
  {
    id: 'ml-naive-bayes',
    slug: 'naive-bayes',
    title: 'Naive Bayes Theorem',
    description: "Bayes Theorem, Conditional Probability, and Variants.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "Naive Bayes is a probabilistic classifier based on **Bayes' Theorem**. It is notoriously fast, scales perfectly to massive datasets, and is the classic algorithm for Text Classification (e.g., Spam Filtering).\n\n### 1. Bayes' Theorem\nBayes' Theorem calculates the probability of an event occurring based on prior knowledge of conditions related to the event.\n$$P(A|B) = \\frac{P(B|A) \\cdot P(A)}{P(B)}$$\n- $P(A|B)$: Posterior Probability. The probability of A (e.g., Spam) given B (e.g., the word 'Lottery' is in the email).\n- $P(B|A)$: Likelihood. If the email IS spam, what is the probability it contains the word 'Lottery'?\n- $P(A)$: Prior Probability. What is the baseline probability of ANY email being spam?\n\n### 2. Why is it 'Naive'?\nThe algorithm makes a massive, mathematically naive assumption: **It assumes that every single feature is completely independent of all other features.**\nIn reality, the word \"New\" and the word \"York\" are highly correlated. Naive Bayes ignores this and calculates their probabilities completely separately. Despite this flaw, it works incredibly well in practice!\n\n### 3. Variants of Naive Bayes\n- **Gaussian Naive Bayes**: Used when features are continuous numbers. It assumes the numbers follow a normal (Gaussian/Bell-curve) distribution.\n- **Multinomial Naive Bayes**: Used for discrete counts (e.g., the number of times a word appears in a document). The absolute gold standard for Bag-of-Words text classification.\n- **Bernoulli Naive Bayes**: Used for boolean/binary features (e.g., Does the word exist? True/False).",
        eli5: "It uses probability to make guesses. If an email has the words 'Free', 'Money', and 'Click', it calculates the odds of a normal email having those words vs a spam email having them, and picks the higher percentage."
      },
      why: {
        text: "Naive Bayes is the go-to baseline model for NLP and text classification. Because it relies on simple counting and probability multiplication, training takes literal milliseconds even on gigabytes of text.",
        tip: "If Naive Bayes encounters a word in the test set that it never saw during training, its probability formula multiplies by zero, destroying the entire prediction. This is fixed using 'Laplace Smoothing'."
      },
      code: {
        code: "from sklearn.naive_bayes import MultinomialNB\nfrom sklearn.feature_extraction.text import CountVectorizer\nimport numpy as np\n\n# A tiny dataset of text messages\ntexts = [\"win free money now\", \"call me back later\", \"claim your lottery prize\", \"dinner at 8\"]\nlabels = [1, 0, 1, 0] # 1 is Spam, 0 is Ham\n\n# Convert text to word counts (Bag of Words)\nvectorizer = CountVectorizer()\nX = vectorizer.fit_transform(texts)\n\n# Train Multinomial Naive Bayes\nnb = MultinomialNB()\nnb.fit(X, labels)\n\n# Predict a new message\nnew_msg = vectorizer.transform([\"win a prize now\"])\npred = nb.predict(new_msg)\n\nprint(f\"Prediction for 'win a prize now': {'Spam' if pred[0] == 1 else 'Ham'}\")\nprint(f\"Class Probabilities: {np.round(nb.predict_proba(new_msg), 2)}\")"
      },
      examNotes: {
        examNotes: [
          "Bayes Theorem calculates Posterior Probability using the Prior and the Likelihood.",
          "The 'Naive' assumption is that all features are conditionally independent.",
          "Multinomial NB is best for word counts; Gaussian NB is best for continuous normal data."
]
      },
      quiz: {
        quiz: [
          {
            question: "What is the 'naive' assumption that the Naive Bayes algorithm makes about the data?",
            options: ["It assumes that the dataset has absolutely no outliers.", "It assumes that every feature is completely independent of every other feature, given the class label.", "It assumes that the data can be perfectly separated by a linear hyperplane.", "It assumes that all prior probabilities are exactly 50/50."],
            correctIndex: 1,
            explanation: "Naive Bayes calculates the total probability by simply multiplying the individual probabilities of each feature together. This mathematical shortcut requires the assumption that features don't influence each other (independence)."
          }
        ]
      }
    }
  }
];
