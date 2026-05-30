import { Topic } from '../../types/content';

export const mlTopicsP2: Topic[] = [
  {
    id: 'ml-knn-deep-dive',
    slug: 'knn-deep-dive',
    title: 'K-Nearest Neighbours (KNN)',
    description: "KD Tree, Ball Tree, and Instance-based Optimization.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "K-Nearest Neighbours (KNN) is an Instance-Based, Lazy Learning algorithm used for Classification and Regression. It classifies a point based on the majority vote of its 'K' nearest neighbors.\n\n### 1. The Algorithm\n1. Calculate the distance (Euclidean, Manhattan, Minkowski) from the new point to ALL points in the dataset.\n2. Sort the distances in ascending order.\n3. Take the top `K` points.\n4. **Classification**: Output the most frequent label.\n5. **Regression**: Output the average (mean) of the labels.\n\n### 2. The Problem with KNN ($O(N)$ Complexity)\nIf you have 1 million rows of data, predicting a single new point requires 1 million distance calculations. This makes standard KNN (Brute Force) incredibly slow at prediction time.\n\n### 3. Optimization: KD Tree (K-Dimensional Tree)\nA KD Tree solves this by partitioning the data space into a binary tree during 'training'.\n- It cuts the data in half along the X-axis, then the Y-axis, etc.\n- When predicting a new point, it navigates the tree (like a binary search) in $O(\\log N)$ time, completely ignoring regions of space that are too far away.\n- **Flaw**: KD Trees degrade to brute force $O(N)$ when the number of dimensions/features is very high ($>20$) due to the Curse of Dimensionality.\n\n### 4. Optimization: Ball Tree\nUnlike KD Trees that partition space with straight lines, a Ball Tree partitions data into nested hyper-spheres.\n- It is much more efficient than KD Trees in higher-dimensional spaces. \n- During a search, if the distance to a ball's center minus its radius is greater than our current nearest neighbor, we can mathematically ignore every single point inside that ball!",
        eli5: "If you move to a new city and want to know if a neighborhood is wealthy, you look at the 5 closest houses to yours. If 4 of them are mansions, you are probably in a wealthy neighborhood."
      },
      why: {
        text: "KNN is the baseline for Recommendation Systems. 'Users who liked this movie also liked...' is often powered by finding the K-nearest neighbors in user-preference space.",
        tip: "Always choose an ODD number for K (e.g., 3, 5, 7) in binary classification to prevent a tie vote!"
      },
      code: {
        code: "from sklearn.neighbors import KNeighborsClassifier\nfrom sklearn.datasets import make_classification\nfrom sklearn.model_selection import train_test_split\nimport time\n\n# Dataset with 3,000 samples and 5 features\n# (Large datasets like 100k will be slow in the browser sandbox)\nX, y = make_classification(n_samples=3000, n_features=5, random_state=42)\nX_train, X_test, y_train, y_test = train_test_split(X, y)\n\n# 1. Brute Force: scans every point to find nearest neighbors\nknn_brute = KNeighborsClassifier(n_neighbors=5, algorithm='brute')\nknn_brute.fit(X_train, y_train)\nstart = time.time()\n_ = knn_brute.predict(X_test)\nbrute_ms = (time.time() - start) * 1000\nprint(f\"Brute Force Accuracy: {knn_brute.score(X_test, y_test):.3f} | Time: {brute_ms:.1f}ms\")\n\n# 2. KD Tree: binary-searches the partitioned space (O(log N))\nknn_kd = KNeighborsClassifier(n_neighbors=5, algorithm='kd_tree')\nknn_kd.fit(X_train, y_train)\nstart = time.time()\n_ = knn_kd.predict(X_test)\nkd_ms = (time.time() - start) * 1000\nprint(f\"KD Tree   Accuracy: {knn_kd.score(X_test, y_test):.3f} | Time: {kd_ms:.1f}ms\")\n\nif kd_ms > 0:\n    print(f\"KD Tree is {brute_ms/kd_ms:.1f}x faster than Brute Force on this dataset.\")\nprint(\"(At 1M rows, the speedup gap becomes orders of magnitude larger.)\")"
      },
      examNotes: {
        examNotes: [
          "KNN is a Lazy Learner (training phase is essentially zero, all computation happens during prediction).",
          "KD Trees partition space with orthogonal splits; Ball Trees use hyper-spheres.",
          "High dimensions ruin KD Trees (Curse of Dimensionality), making Ball Trees or Brute Force necessary."
]
      },
      quiz: {
        quiz: [
          {
            question: "Why does the KD Tree algorithm become highly inefficient when applied to a dataset with a very high number of features (e.g., 1,000 dimensions)?",
            options: ["Because KD Trees cannot process categorical data.", "Because high dimensions cause the KD Tree to require too much RAM to store the hyper-spheres.", "Because of the Curse of Dimensionality: distances between all points become extremely similar, forcing the algorithm to backtrack and search almost every branch, degrading performance to O(N).", "Because KD Trees only work for regression, not classification."],
            correctIndex: 2,
            explanation: "In high-dimensional space, the volume increases exponentially, causing all data points to become nearly equidistant. The KD Tree's spatial pruning fails because the bounds of the branches overlap too much with the search radius."
          }
        ]
      }
    }
  },
  {
    id: 'ml-decision-trees-deep-dive',
    slug: 'decision-trees-deep-dive',
    title: 'Decision Tree Classifier & Regressor',
    description: "Entropy, Information Gain, and Pruning.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "Decision Trees partition the data by asking sequential questions (IF-ELSE rules).\n\n### 1. Entropy vs Gini Impurity\nTo decide which feature to split on, the tree measures Impurity.\n- **Entropy**: Measures chaos. $$H = - \\sum_{i=1}^{C} p_i \\log_2(p_i)$$\n- **Gini Impurity**: Measures the probability of misclassifying a random element. $$G = 1 - \\sum_{i=1}^{C} (p_i)^2$$\n**Difference**: Gini is slightly faster to compute because it avoids the logarithmic calculation. Scikit-learn uses Gini by default (CART algorithm).\n\n### 2. Information Gain\nThe tree calculates the Entropy *before* the split, and subtracts the weighted average Entropy of the two child nodes *after* the split. The feature that yields the highest Information Gain (the biggest drop in chaos) is chosen for the split.\n\n### 3. Splitting Numerical Features\nHow does a tree split a continuous number like 'Salary'?\nIt sorts all the salaries in the dataset, calculates the midpoint between every adjacent salary, and tests every single midpoint as a threshold (e.g., `Salary <= 50,000`), calculating the Information Gain for each!\n\n### 4. Decision Tree Regression\nInstead of Entropy, a Regression Tree minimizes **MSE (Mean Squared Error)** or **Variance**. It splits the data so that the numbers in the resulting leaves are as close to each other as possible. The prediction is the average of the leaf.\n\n### 5. Pre-Pruning vs Post-Pruning\nTrees are incredibly prone to overfitting (they will grow until leaves are 100% pure).\n- **Pre-Pruning**: Stopping the tree from growing early (`max_depth`, `min_samples_split`).\n- **Post-Pruning (Cost Complexity Pruning)**: Letting the tree grow fully, then mathematically cutting off branches that don't provide enough information gain (controlled by the `ccp_alpha` parameter).",
        eli5: "It's the game of 'Guess Who?'. You ask 'Does the person have a hat?' to split the board in half. A Decision Tree does this mathematically to split the data perfectly."
      },
      why: {
        text: "Decision Trees are one of the only 'White Box' models. You can print out the tree rules and explain exactly why the algorithm denied a customer's loan, which is crucial for legal compliance.",
        tip: "Decision Trees are unstable. Changing just one row of training data can cause the entire tree structure to change completely."
      },
      code: {
        code: "from sklearn.tree import DecisionTreeClassifier, export_text\nfrom sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\n\n# Load Iris Dataset (3-class classification problem)\nX, y = load_iris(return_X_y=True)\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)\n\n# 1. Unlimited tree (will memorize training data - overfitting!)\noverfit_tree = DecisionTreeClassifier(random_state=42)\noverfit_tree.fit(X_train, y_train)\nprint(\"Overfit Tree  | Depth:\", overfit_tree.get_depth(), \"| Train:\", round(overfit_tree.score(X_train, y_train), 2), \"| Test:\", round(overfit_tree.score(X_test, y_test), 2))\n\n# 2. Pre-Pruned tree (max_depth=3 stops it growing indefinitely)\npruned_tree = DecisionTreeClassifier(criterion='gini', max_depth=3, random_state=42)\npruned_tree.fit(X_train, y_train)\nprint(\"Pruned Tree   | Depth:\", pruned_tree.get_depth(), \"| Train:\", round(pruned_tree.score(X_train, y_train), 2), \"| Test:\", round(pruned_tree.score(X_test, y_test), 2))\n\n# 3. Print the actual readable rules the tree learned!\nrules = export_text(pruned_tree, feature_names=['sepal_len', 'sepal_wid', 'petal_len', 'petal_wid'])\nprint(\"\")\nprint(\"Learned Decision Rules:\")\nprint(rules)"
      },
      examNotes: {
        examNotes: [
          "Entropy calculates impurity using logarithms; Gini uses squares.",
          "Decision Tree Regressors split based on Variance Reduction (MSE).",
          "Post-Pruning uses `ccp_alpha` to penalize large, complex trees."
]
      },
      quiz: {
        quiz: [
          {
            question: "When training a Decision Tree Regressor (predicting continuous values), what metric does the algorithm use to evaluate the quality of a split?",
            options: ["Information Gain based on Entropy.", "Gini Impurity.", "Mean Squared Error (Variance Reduction).", "Log-Loss."],
            correctIndex: 2,
            explanation: "While Classifiers use Entropy or Gini to measure class purity, Regressors minimize the variance of the numbers falling into the child nodes, effectively using Mean Squared Error."
          }
        ]
      }
    }
  },
  {
    id: 'ml-random-forest-deep-dive',
    slug: 'random-forest-deep-dive',
    title: 'Random Forest Machine Learning',
    description: "Bagging, Feature Randomness, and OOB Error.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "Random Forest is an Ensemble technique that relies on **Bagging (Bootstrap Aggregating)**.\n\n### 1. Bagging vs Boosting\n- **Bagging**: Trains hundreds of trees completely **independently and in parallel**. Averages the results to reduce Variance (Overfitting).\n- **Boosting**: Trains trees **sequentially**. Each tree learns from the mistakes of the previous tree to reduce Bias (Underfitting).\n\n### 2. The Core Mechanics of Random Forest\nIf we train 100 trees on the same data, they will all look identical. We force them to be different using two methods:\n1. **Row Sampling (Bootstrapping)**: Each tree gets a random sample of the dataset, drawn *with replacement*. \n2. **Column Sampling (Feature Randomness)**: At *every single split*, the tree is only allowed to look at a random subset of features (usually $\\sqrt{total\\_features}$). \nThis guarantees that even if 'Salary' is the most predictive feature, many trees won't even be allowed to look at 'Salary' at the root node, forcing them to find other hidden patterns.\n\n### 3. Out-Of-Bag (OOB) Evaluation\nBecause Bootstrapping samples with replacement, roughly **37%** of the data is never seen by any given tree. \nWe can pass this unseen 'Out-Of-Bag' data through the tree to calculate a validation score for free, without needing to manually hold out a validation set!",
        eli5: "Instead of asking one expert, you ask 100 different experts who have read slightly different books, and take a majority vote. The crowd is smarter than the individual."
      },
      why: {
        text: "Random Forest is the 'Swiss Army Knife' of ML. If you have no idea what algorithm to use, run a Random Forest. It rarely overfits and requires almost no hyperparameter tuning.",
        tip: "Random Forests cannot extrapolate! If predicting House Prices, and the highest price in the training data is $1M, a Random Forest can NEVER predict a price higher than $1M, even for a mansion."
      },
      code: {
        code: "from sklearn.ensemble import RandomForestClassifier\nfrom sklearn.datasets import make_classification\nfrom sklearn.model_selection import train_test_split\nimport numpy as np\n\nX, y = make_classification(n_samples=500, n_features=10, random_state=42)\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n\n# oob_score=True gives us a FREE validation score from unseen Out-Of-Bag samples\n# No need to set aside a separate validation set!\nrf = RandomForestClassifier(n_estimators=100, oob_score=True, random_state=42)\nrf.fit(X_train, y_train)\n\nprint(f\"Training Accuracy:      {rf.score(X_train, y_train):.3f}\")\nprint(f\"Test Set Accuracy:      {rf.score(X_test, y_test):.3f}\")\nprint(f\"Out-Of-Bag (OOB) Score: {rf.oob_score_:.3f}  <- FREE estimate!\")\nprint()\n\n# Feature Importances: how much each feature contributed to reducing Gini impurity\nimportances = rf.feature_importances_\nranked = np.argsort(importances)[::-1]\nprint(\"Feature Importance Ranking (top 5):\")\nfor rank, idx in enumerate(ranked[:5], 1):\n    print(f\"  {rank}. Feature {idx:2d}: {importances[idx]:.4f}\")"
      },
      examNotes: {
        examNotes: [
          "Bagging reduces Variance (Overfitting) without increasing Bias.",
          "Feature Randomness prevents trees from being highly correlated.",
          "Random Forests provide Feature Importances by tracking how much Gini impurity is reduced by each feature across all trees."
]
      },
      quiz: {
        quiz: [
          {
            question: "What is the statistical reason that Out-Of-Bag (OOB) samples exist in a Random Forest?",
            options: ["Because the user manually specifies a 37% test_size in the hyper-parameters.", "Because drawing samples 'with replacement' mathematically leaves roughly 36.8% of the original dataset unselected for any given tree.", "Because the algorithm drops rows that contain missing values (NaNs).", "Because the Random Forest algorithm prunes 37% of the tree leaves to prevent overfitting."],
            correctIndex: 1,
            explanation: "As the dataset size N approaches infinity, the probability that a specific row is NEVER selected during N draws with replacement is (1 - 1/N)^N, which mathematically converges to 1/e (approximately 0.368, or 37%)."
          }
        ]
      }
    }
  },
  {
    id: 'ml-adaboost-deep-dive',
    slug: 'adaboost-deep-dive',
    title: 'AdaBoost Machine Learning',
    description: "Decision Stumps, Weight Updates, and Sequential Learning.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "AdaBoost (Adaptive Boosting) is the first successful Boosting algorithm. It combines many weak learners to create one strong learner.\n\n### 1. Decision Stumps\nAdaBoost does not use deep decision trees. It uses **Stumps**: a tree with a depth of exactly 1 (one root, two leaves). A stump is a terrible model on its own (only slightly better than random guessing).\n\n### 2. The Weight Update Mechanism\n1. **Initialize**: Every row in the training data gets an equal weight ($W_i = 1/N$).\n2. **Train Stump 1**: The stump makes predictions. It will get some wrong.\n3. **Calculate Stump Error**: How many did it get wrong? This dictates the 'Amount of Say' (alpha) this stump gets in the final vote.\n   $$Amount\\ of\\ Say = \\frac{1}{2} \\ln \\left( \\frac{1 - TotalError}{TotalError} \\right)$$\n4. **Update Row Weights**: \n   - We heavily **INCREASE** the weight of the rows the stump got *wrong*.\n   - We **DECREASE** the weight of the rows the stump got *right*.\n5. **Normalize Weights**: Divide all weights so they add up to 1.\n6. **Train Stump 2**: The next stump looks at the data, but because the misclassified points now have massive weights, Stump 2 focuses almost entirely on getting those specific points right!\n\n### 3. Final Prediction\nTo make a prediction, every stump votes. But instead of a democratic vote, they vote using their 'Amount of Say'. A highly accurate stump's vote counts for more than a weak stump's vote.",
        eli5: "It's like a sports team. Player 1 is good at offense but bad at defense. The coach hires Player 2 specifically to cover Player 1's defensive weakness. Together, they are a perfect team."
      },
      why: {
        text: "AdaBoost is highly sensitive to noisy data and outliers. Because it exponentially increases the weight of misclassified points, an outlier will force the model to warp itself entirely trying to fix it.",
        tip: "You can use AdaBoost with any algorithm, but it is almost always paired with Decision Stumps because stumps are incredibly fast to train."
      },
      code: {
        code: "from sklearn.ensemble import AdaBoostClassifier\nfrom sklearn.tree import DecisionTreeClassifier\nfrom sklearn.datasets import make_classification\n\nX, y = make_classification(n_samples=500, random_state=42)\n\n# AdaBoost using Decision Stumps (max_depth=1)\n# n_estimators=50 means it will build 50 sequential stumps\nada = AdaBoostClassifier(\n    estimator=DecisionTreeClassifier(max_depth=1), \n    n_estimators=50, \n    learning_rate=1.0, \n    random_state=42\n)\nada.fit(X, y)\n\nprint(f\"AdaBoost Accuracy: {ada.score(X, y):.3f}\")\n# Look at the 'Amount of Say' (estimator weights) for the first 5 stumps\nprint(f\"Amount of Say (first 5): {ada.estimator_weights_[:5]}\")"
      },
      examNotes: {
        examNotes: [
          "AdaBoost builds trees sequentially, updating the sample weights after each tree.",
          "Misclassified samples have their weights increased; correctly classified have their weights decreased.",
          "Final predictions are made via a weighted majority vote (Amount of Say)."
]
      },
      quiz: {
        quiz: [
          {
            question: "In the AdaBoost algorithm, what is the structure of the default 'weak learner'?",
            options: ["A full-depth Random Forest.", "A deep neural network with 1 hidden layer.", "A Decision Tree with a maximum depth of 1, known as a 'Stump'.", "A Logistic Regression model."],
            correctIndex: 2,
            explanation: "AdaBoost traditionally relies on Decision Stumps. Because the algorithm relies on building hundreds of sequential models to correct errors, the base model must be extremely fast to train, and a depth-1 tree fits this requirement perfectly."
          }
        ]
      }
    }
  },
  {
    id: 'ml-gradient-boosting',
    slug: 'gradient-boosting',
    title: 'Gradient Boosting',
    description: "Residuals, Sequential Trees, and Loss Minimization.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "Gradient Boosting is a massive step up from AdaBoost. Instead of tweaking the weights of rows, Gradient Boosting trains new models on the **Residual Errors** of the previous models.\n\n### 1. The Core Concept (Regression)\n1. **Base Prediction**: The algorithm starts with a naive guess, usually the average (mean) of all target values.\n2. **Calculate Residuals**: $Residual = Actual - Predicted$. If a house costs \\$300k, and we predicted \\$200k, the residual is \\$100k.\n3. **Train Tree 1**: We train a small Decision Tree (usually depth 3-5). But instead of predicting the House Price, it predicts the **Residual (\\$100k)**!\n4. **Update Prediction**: $New Prediction = Old Prediction + (Learning Rate \\times Tree Prediction)$\n5. **Repeat**: Calculate the new residuals, train Tree 2 on the new residuals, and repeat.\n\n### 2. The Math (Gradient Descent)\nWhy is it called *Gradient* Boosting? Because the Residuals are actually the negative gradient (derivative) of the Mean Squared Error (MSE) loss function!\n- By training a tree on the residuals, we are literally training a tree to point in the direction of the steepest descent on the cost function curve.\n\n### 3. Classification\nFor classification, Gradient Boosting uses Log-Loss. It starts by predicting the log-odds of the classes, converts them to probabilities using the Sigmoid function, calculates the residual (Actual - Probability), and builds trees to predict that residual.",
        eli5: "It's like playing golf. Your first shot (base model) gets you close to the hole. The distance remaining is the 'residual'. Your next shot (Tree 1) covers most of that distance. The remaining distance is the new residual. You keep taking smaller shots until you are in the hole."
      },
      why: {
        text: "Gradient Boosting is the foundation for XGBoost and LightGBM, which dominate tabular data competitions on Kaggle.",
        tip: "Unlike Random Forests, Gradient Boosting WILL overfit if you add too many trees. You must carefully tune the `learning_rate` and `n_estimators` using early stopping."
      },
      code: {
        code: "from sklearn.ensemble import GradientBoostingRegressor\nfrom sklearn.datasets import make_regression\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import mean_squared_error\n\nX, y = make_regression(n_samples=500, noise=10.0, random_state=42)\nX_train, X_test, y_train, y_test = train_test_split(X, y)\n\n# learning_rate is crucial. It scales the contribution of each tree.\n# Smaller learning rate = more robust, but requires more trees.\ngbr = GradientBoostingRegressor(n_estimators=100, learning_rate=0.1, max_depth=3)\ngbr.fit(X_train, y_train)\n\npreds = gbr.predict(X_test)\nprint(f\"Gradient Boosting RMSE: {mean_squared_error(y_test, preds)**.5:.2f}\")"
      },
      examNotes: {
        examNotes: [
          "Gradient Boosting models fit sequential trees to the Pseudo-Residuals of the previous ensemble.",
          "For regression, the initial prediction is the mean of Y. For classification, it is the log-odds.",
          "The Learning Rate scales the leaf outputs, preventing the model from correcting the residual completely in a single step, reducing overfitting."
]
      },
      quiz: {
        quiz: [
          {
            question: "How does Gradient Boosting differ from AdaBoost in the way it corrects the mistakes of previous models?",
            options: ["Gradient Boosting uses Random Forests instead of Decision Trees.", "AdaBoost changes the weights of misclassified data points, whereas Gradient Boosting trains the next model to predict the numerical residual errors of the previous model.", "Gradient Boosting uses Bagging instead of sequential training.", "There is no difference; they are two names for the same algorithm."],
            correctIndex: 1,
            explanation: "While AdaBoost increases the sample weight of a misclassified row to force the next stump to focus on it, Gradient Boosting directly replaces the target variable (Y) with the mathematical error (Residual) of the previous ensemble."
          }
        ]
      }
    }
  },
  {
    id: 'ml-xgboost',
    slug: 'xgboost',
    title: 'XGBoost Machine Learning Algorithm',
    description: "Extreme Gradient Boosting, Second-Order Derivatives, and Regularization.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "XGBoost (Extreme Gradient Boosting) is an optimized, heavily upgraded version of standard Gradient Boosting. It is the king of tabular data.\n\n### 1. Mathematical Upgrades\n- **Second-Order Derivatives (Hessian)**: Standard Gradient Boosting uses Gradient Descent (first derivative) to optimize the loss function. XGBoost uses Newton-Raphson optimization, which utilizes the **second derivative (Hessian)**. This allows it to find the minimum of the loss function much faster and more accurately.\n- **Built-in Regularization**: XGBoost adds $L1$ (Lasso) and $L2$ (Ridge) penalties directly to the leaf weights of the trees. This severely limits overfitting, which is the main weakness of standard Gradient Boosting.\n\n### 2. System and Hardware Optimizations\n- **Handling Missing Values**: If a value is NaN, XGBoost automatically tests sending it down the left branch and the right branch, and permanently assigns it to the branch that yields the best loss reduction.\n- **Parallel Processing**: Boosting is sequential by nature, but XGBoost builds the *individual trees* in parallel. It sorts and caches data in blocks to find the best split points across all CPU cores simultaneously.\n- **Cache Awareness & Out-of-Core Computing**: It compresses data to fit into the CPU cache, and can handle datasets larger than RAM by writing to the hard drive efficiently.\n\n### 3. XGBoost Regressor vs Classifier\n- **Regressor**: Minimizes MSE or RMSE using the Hessian.\n- **Classifier**: Minimizes Log-Loss. Outputs log-odds, converts to probabilities.",
        eli5: "If standard Gradient Boosting is a stock Honda Civic, XGBoost is a Formula 1 race car. It is fundamentally the same machine, but engineered to absolute perfection for speed and performance."
      },
      why: {
        text: "If you have a clean spreadsheet of data (tabular data) and you want to maximize accuracy, XGBoost should be your first and primary choice.",
        tip: "Because XGBoost is so fast and optimized, it has dozens of hyperparameters (`eta`, `gamma`, `max_depth`, `subsample`). Hyperparameter tuning using GridSearch or Optuna is mandatory for peak performance."
      },
      code: {
        code: "import xgboost as xgb\nfrom sklearn.datasets import make_classification\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import accuracy_score\n\n# Create a dataset\nX, y = make_classification(n_samples=1000, n_features=20, random_state=42)\nX_train, X_test, y_train, y_test = train_test_split(X, y)\n\n# XGBoost uses a highly optimized DMatrix structure under the hood\n# But provides a scikit-learn compatible API!\nmodel = xgb.XGBClassifier(\n    n_estimators=100,\n    learning_rate=0.1,\n    max_depth=4,\n    reg_lambda=1.0, # L2 Regularization!\n    use_label_encoder=False,\n    eval_metric='logloss'\n)\n\nmodel.fit(X_train, y_train)\npreds = model.predict(X_test)\n\nprint(f\"XGBoost Accuracy: {accuracy_score(y_test, preds):.3f}\")"
      },
      examNotes: {
        examNotes: [
          "XGBoost uses Taylor Expansion (second-order derivatives) to approximate the loss function.",
          "It natively handles missing data by learning default directions for NaNs.",
          "It includes L1 (alpha) and L2 (lambda) regularization on leaf weights (Similarity Score)."
]
      },
      quiz: {
        quiz: [
          {
            question: "Which mathematical optimization allows XGBoost to converge on the optimal loss function faster and more accurately than standard Gradient Boosting?",
            options: ["Stochastic Gradient Descent.", "Using the second-order derivative (the Hessian) of the loss function via Newton-Raphson optimization.", "Calculating the Euclidean distance in a KD-Tree.", "Applying a Soft-Margin kernel trick."],
            correctIndex: 1,
            explanation: "Standard Gradient Boosting relies only on the first derivative (the gradient) for optimization. XGBoost incorporates the second derivative (the curvature/Hessian), allowing it to take smarter, more optimal steps toward the minimum."
          }
        ]
      }
    }
  },
  {
    id: 'ml-pca-unsupervised',
    slug: 'pca-unsupervised',
    title: 'Unsupervised ML & PCA',
    description: "The Curse of Dimensionality, Covariance, and Eigenvectors.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "### 1. Unsupervised Machine Learning\nIn Supervised Learning, we predict a known target ($Y$). In Unsupervised Learning, there is no $Y$. The algorithm is given raw data and told to find hidden structures, clusters, or compress the data.\n\n### 2. The Curse of Dimensionality\nAs you add more features (dimensions) to a dataset, the volume of the spatial representation grows exponentially. \n- Data becomes incredibly sparse.\n- Distance metrics (like Euclidean distance) break down because all points become nearly equidistant.\n- Models overfit to noise.\n\n### 3. Principal Component Analysis (PCA)\nPCA is a Dimensionality Reduction technique. It compresses a dataset with hundreds of features down to 2 or 3 features, while retaining as much **Variance** (information) as possible.\n\n### 4. The Math: Eigen Decomposition\n1. **Standardize the Data**: Center the data to mean=0, variance=1.\n2. **Covariance Matrix**: Calculate the covariance between every single feature. This shows how features move together.\n3. **Eigenvectors and Eigenvalues**: \n   - We extract the Eigenvectors from the Covariance matrix. These are the *directions* (new axes) that maximize variance.\n   - The Eigenvalues represent the *magnitude* of variance along those directions.\n4. **Sort and Project**: We sort the Eigenvectors by highest Eigenvalue. The top one is Principal Component 1 (PC1). The second is PC2 (which is strictly orthogonal/perpendicular to PC1). We drop the rest, compressing the data.\n\n```mermaid\ngraph TD\n    A[Raw 100D Data] --> B[StandardScaler]\n    B --> C[Calculate Covariance Matrix]\n    C --> D[Extract Eigenvectors & Eigenvalues]\n    D --> E[Keep Top 2 Eigenvectors PC1 & PC2]\n    E --> F[Project Data onto 2D Space]\n```",
        eli5: "Imagine looking at a 3D teapot. If you look at it from the top, it just looks like a circle. If you look from the side, you see the spout and handle. PCA mathematically finds the perfect 'camera angle' to see the most detail, allowing us to drop the 3D depth and use a 2D picture instead."
      },
      why: {
        text: "PCA is mandatory for data visualization. Humans cannot see in 4D or 100D. By running PCA(n_components=2), we can plot our 100-feature dataset on a standard X/Y scatter plot.",
        tip: "PCA creates artificial features. If you reduce 'Age' and 'Salary' to 'PC1', 'PC1' is a mathematical hybrid of both. You completely lose human interpretability."
      },
      code: {
        code: "from sklearn.decomposition import PCA\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.datasets import load_breast_cancer\nimport numpy as np\n\n# Breast Cancer Dataset: 569 patients, 30 features\nX, y = load_breast_cancer(return_X_y=True)\n\n# Step 1: MANDATORY \u2014 StandardScaler so all features have mean=0, std=1\n# Without this, features measured in large numbers dominate the PCA\nscaler = StandardScaler()\nX_scaled = scaler.fit_transform(X)\n\n# Step 2: PCA \u2014 find the 2 directions of maximum variance\npca = PCA(n_components=2)\nX_compressed = pca.fit_transform(X_scaled)\n\nprint(f\"Original:   {X.shape[0]} patients x {X.shape[1]:2d} features\")\nprint(f\"Compressed: {X_compressed.shape[0]} patients x  {X_compressed.shape[1]} features\")\nprint()\n\nvar1 = pca.explained_variance_ratio_[0] * 100\nvar2 = pca.explained_variance_ratio_[1] * 100\nprint(f\"PC1 captures {var1:.1f}% of total information\")\nprint(f\"PC2 captures {var2:.1f}% of total information\")\nprint(f\"Together they retain {var1+var2:.1f}% while cutting 28 features!\")\nprint()\n\n# Cumulative variance: how many PCs do we need to keep 95% information?\npca_full = PCA().fit(X_scaled)\ncumvar = np.cumsum(pca_full.explained_variance_ratio_) * 100\nn_for_95 = np.argmax(cumvar >= 95) + 1\nprint(f\"To retain 95% of information, we only need {n_for_95} principal components (not 30).\")"
      },
      examNotes: {
        examNotes: [
          "PCA seeks to maximize Variance.",
          "Eigenvectors are strictly orthogonal (perpendicular) to each other.",
          "Standardizing data (mean=0, var=1) is mandatory; otherwise, features with large numeric scales (like Salary) will artificially dominate the Covariance matrix."
]
      },
      quiz: {
        quiz: [
          {
            question: "In Principal Component Analysis (PCA), what do the Eigenvalues of the Covariance Matrix represent?",
            options: ["The distance from the data points to the origin.", "The number of clusters in the dataset.", "The amount of variance (information) captured along the direction of their corresponding Eigenvector.", "The error rate of the compression."],
            correctIndex: 2,
            explanation: "The Eigenvector points in the direction of the new Principal Component axis, while the Eigenvalue tells us the magnitude of the data's spread (variance) along that axis."
          }
        ]
      }
    }
  },
  {
    id: 'ml-clustering-kmeans-hierarchical',
    slug: 'clustering-kmeans-hierarchical',
    title: 'K-Means & Hierarchical Clustering',
    description: "K-Means++, WCSS/Inertia, Agglomerative.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "Clustering is an Unsupervised Learning technique used to group unlabeled data into similar buckets.\n\n### 1. K-Means Clustering\nThe goal of K-Means is to partition data into `K` distinct clusters.\n1. **Initialize**: Randomly place `K` centroids in the data space.\n2. **Assign**: Assign each data point to the closest centroid (using Euclidean distance).\n3. **Update**: Move the centroid to the mean average of all points assigned to it.\n4. **Repeat**: Repeat until centroids stop moving.\n\n### 2. K-Means++ (The Random Initialization Trap)\nIf K-Means spawns two centroids very close to each other by random chance, it can converge into a terrible local minimum.\n- **K-Means++** fixes this. It places the first centroid randomly. It then calculates the distances of all points to that centroid, and places the next centroid on a data point that is *as far away as possible*. \n\n### 3. Finding the Right K (Elbow Method)\nWe calculate **Inertia (Within-Cluster Sum of Squares - WCSS)**, which is the sum of squared distances from points to their centroids. \nWe plot Inertia for K=1 to K=10. The curve drops rapidly, then flattens. The 'Elbow' of the plot is the optimal K.\n\n### 4. Hierarchical (Agglomerative) Clustering\nInstead of guessing `K`, Hierarchical Clustering builds a tree of clusters (a **Dendrogram**).\n- **Agglomerative (Bottom-Up)**: \n  1. Start by treating every single data point as its own cluster (N clusters).\n  2. Find the two closest clusters and merge them.\n  3. Repeat until all points are merged into 1 giant cluster.\n- You then slice the Dendrogram horizontally to get your desired number of clusters.",
        eli5: "K-Means is like dividing students into reading groups based on their test scores, by guessing 3 group centers, assigning students to the closest center, and then recalculating the centers over and over."
      },
      why: {
        text: "Clustering is heavily used for Customer Segmentation. By clustering purchasing behavior, marketing teams can discover distinct buyer personas (e.g., 'Discount Shoppers' vs 'Luxury Buyers').",
        tip: "K-Means assumes clusters are perfectly spherical and roughly the same size. If your data forms a U-shape or concentric circles, K-Means will fail spectacularly. (Use DBSCAN instead!)."
      },
      code: {
        code: "from sklearn.cluster import KMeans, AgglomerativeClustering\nfrom sklearn.datasets import make_blobs\n\n# Generate 3 distinct clusters of data\nX, y = make_blobs(n_samples=300, centers=3, cluster_std=1.0, random_state=42)\n\n# 1. K-Means++\nkmeans = KMeans(n_clusters=3, init='k-means++', random_state=42)\nkmeans_labels = kmeans.fit_predict(X)\nprint(f\"K-Means Inertia (WCSS): {kmeans.inertia_:.2f}\")\n\n# 2. Hierarchical (Agglomerative)\n# linkage='ward' minimizes the variance of the clusters being merged\nhier = AgglomerativeClustering(n_clusters=3, linkage='ward')\nhier_labels = hier.fit_predict(X)\n\nprint(f\"Agglomerative Clustering complete. Found {len(set(hier_labels))} clusters.\")"
      },
      examNotes: {
        examNotes: [
          "K-Means++ ensures initial centroids are mathematically spread far apart.",
          "Inertia (WCSS) measures how tightly packed a cluster is. Lower is better.",
          "Agglomerative clustering is bottom-up; Divisive clustering is top-down."
]
      },
      quiz: {
        quiz: [
          {
            question: "When using the Elbow Method to determine the optimal number of clusters (K) in K-Means, what is plotted on the Y-axis?",
            options: ["The number of iterations required to converge.", "The learning rate of the algorithm.", "The Silhouette Score.", "The Inertia (Within-Cluster Sum of Squares)."],
            correctIndex: 3,
            explanation: "The Elbow Method plots K (number of clusters) on the X-axis and Inertia on the Y-axis. The point where adding more clusters no longer yields a significant drop in Inertia forms the 'elbow'."
          }
        ]
      }
    }
  },
  {
    id: 'ml-dbscan-anomaly',
    slug: 'dbscan-anomaly',
    title: 'DBSCAN, Silhouette & Anomaly Detection',
    description: "Density-based Clustering, Isolation Forest, LOF.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "K-Means forces every point into a cluster and assumes spherical shapes. DBSCAN and Anomaly Detection algorithms operate on **Density**.\n\n### 1. DBSCAN (Density-Based Spatial Clustering of Applications with Noise)\nDBSCAN groups points that are closely packed together, and marks points in low-density regions as **Outliers (Noise)**.\n- **Epsilon ($\\epsilon$)**: The maximum distance (radius) a point can look to find neighbors.\n- **MinPts**: The minimum number of points required inside the $\\epsilon$-radius to form a dense region (a Core Point).\n- **Mechanics**: If a point has $\\ge$ MinPts within $\\epsilon$, it creates a cluster. It then chains outward, expanding the cluster to all reachable dense points. Points that cannot be reached are labeled as Noise (-1).\n- **Pros**: Can find arbitrarily shaped clusters (e.g., U-shapes, circles). Does NOT require you to specify the number of clusters `K`!\n\n### 2. Silhouette Score\nA metric to evaluate clustering performance when you don't have true labels. \n- Evaluates how close a point is to its own cluster compared to how close it is to the next nearest cluster.\n- **Range**: -1 to +1. (+1 means perfectly clustered, 0 means overlapping, -1 means assigned to the wrong cluster).\n\n### 3. Anomaly (Outlier) Detection\n- **Isolation Forest**: Builds an ensemble of Random Decision Trees. Because anomalies are rare and distinct, they require very few random splits to be isolated into a leaf node. The algorithm flags points with short path lengths as Anomalies.\n- **Local Outlier Factor (LOF)**: Compares the local density of a point to the local densities of its K-neighbors. If a point's density is significantly lower than its neighbors, it is flagged as an anomaly.",
        eli5: "If K-Means is drawing perfect circles on a map, DBSCAN is tracing the exact irregular shape of a dense city. Anyone living out in the empty desert is automatically flagged as an Outlier (Anomaly)."
      },
      why: {
        text: "Anomaly detection is the backbone of credit card Fraud Detection and predictive maintenance for heavy machinery (detecting when an engine vibration is 'abnormal').",
        tip: "DBSCAN is extremely sensitive to the Epsilon parameter. A tiny change in Epsilon can cause all your clusters to merge into one, or shatter into hundreds of pieces."
      },
      code: {
        code: "from sklearn.cluster import DBSCAN\nfrom sklearn.ensemble import IsolationForest\nfrom sklearn.metrics import silhouette_score\nfrom sklearn.datasets import make_moons\nimport numpy as np\n\n# 1. DBSCAN on non-spherical data (Make Moons)\nX, _ = make_moons(n_samples=200, noise=0.05, random_state=42)\n\n# Epsilon=0.2, Min points=5\ndbscan = DBSCAN(eps=0.2, min_samples=5)\nlabels = dbscan.fit_predict(X)\n\n# Calculate Silhouette Score (ignoring noise points labeled as -1)\nclean_X = X[labels != -1]\nclean_labels = labels[labels != -1]\nif len(set(clean_labels)) > 1:\n    print(f\"DBSCAN Silhouette Score: {silhouette_score(clean_X, clean_labels):.3f}\")\n\n# 2. Isolation Forest for Anomaly Detection\n# contamination=0.05 means we expect 5% of data to be anomalies\niso_forest = IsolationForest(contamination=0.05, random_state=42)\noutlier_preds = iso_forest.fit_predict(X)\n\n# Isolation forest outputs -1 for anomalies, 1 for normal\nanomalies = np.sum(outlier_preds == -1)\nprint(f\"Isolation Forest detected {anomalies} anomalies.\")"
      },
      examNotes: {
        examNotes: [
          "DBSCAN does not require specifying K.",
          "DBSCAN labels outliers automatically as -1.",
          "Isolation Forest isolates anomalies near the root of the tree (short average path length).",
          "A Silhouette Score of +1 indicates perfect clustering."
]
      },
      quiz: {
        quiz: [
          {
            question: "Why is the Isolation Forest algorithm highly effective at detecting anomalies/outliers?",
            options: ["Because it calculates the exact Euclidean distance to the center of the dataset.", "Because outliers are few and distinct, meaning they require significantly fewer random splits to be isolated into a leaf node compared to normal data.", "Because it uses Gradient Descent to maximize Log-Loss.", "Because it maps the data into a high-dimensional kernel space."],
            correctIndex: 1,
            explanation: "Isolation Forests split data completely at random. Normal data points are packed tightly together, requiring many splits to isolate. Anomalies are isolated quickly, resulting in very short tree path lengths."
          }
        ]
      }
    }
  }
];
