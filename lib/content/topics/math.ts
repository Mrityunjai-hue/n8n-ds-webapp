import { Topic } from '../../types/content';

export const mathTopics: Topic[] = [
  {
    "id": "math-statistics-intro",
    "slug": "statistics-intro",
    "title": "Getting Started With Statistics",
    "description": "Population vs Sample, Central Tendency, Dispersion, Variables, Histograms, Correlation.",
    "estimatedMinutes": 60,
    "interviewQuestions": [],
    "sections": {
      "what": {
        "text": "Statistics is the fundamental mathematical language used to extract meaning from data. In Data Science and Machine Learning, models do not 'think'\u2014they apply statistical principles at scale to find patterns.\n\n### Population vs Sample\nIn statistics, a **Population** is the entire set of items you care about (e.g., every person on Earth). Because querying a population is usually impossible, we take a **Sample** (a subset). We then use *Inferential Statistics* to estimate the population parameters based on our sample statistics.\n\n### Measures of Central Tendency\nThese metrics describe the 'center' of our data.\n\n**1. Mean (Arithmetic Average)**\n**Formula:** $$ \\bar{x} = \\frac{1}{n} \\sum_{i=1}^{n} x_i $$\n**Formula Terms Explained:**\n- $\\bar{x}$ (x-bar): The mean of the **Sample**.\n- $n$: The total number of observations in the **Sample**.\n- $\\sum$: The summation operator (meaning 'add everything up').\n- $x_i$: The value of the specific $i$-th observation.\n\n**2. Median & Mode**\n- **Median**: The middle value when sorted. Extremely robust against outliers!\n- **Mode**: The most frequently occurring value.\n\n### Measures of Dispersion\nCentral tendency doesn't tell the whole story. We must know how 'spread out' the data is.\n\n**1. Variance (Sample)**\nThe average of the squared differences from the Mean.\n**Formula:** $$ s^2 = \\frac{\\sum_{i=1}^{n}(x_i - \\bar{x})^2}{n - 1} $$\n**Formula Terms Explained:**\n- $s^2$: The **Sample Variance**.\n- $x_i - \\bar{x}$: The deviation (difference) of a single data point from the **Sample Mean**.\n- $n - 1$: Bessel's Correction. We subtract 1 from the **Sample Size** to mathematically correct the fact that samples naturally underestimate the true variance of a **Population**.\n\n**2. Standard Deviation**\nThe square root of variance, returning the metric to the original units (e.g., dollars instead of squared-dollars).\n**Formula:** $$ s = \\sqrt{s^2} $$\n**Formula Terms Explained:**\n- $s$: The **Sample Standard Deviation**.\n- $s^2$: The **Sample Variance**.",
        "eli5": "Statistics is just a way to summarize a giant messy pile of numbers into a few simple facts, like 'what is the average?' or 'how weird is this specific number compared to the rest of the group?'"
      },
      "diagram": {
        "chart": "graph TD\n  A[\"Statistics\"] --> B[\"Descriptive\"]\n  A --> C[\"Inferential\"]\n  B --> D[\"Central Tendency\"]\n  B --> E[\"Dispersion\"]\n  D --> F[\"Mean\"]\n  D --> G[\"Median\"]\n  D --> H[\"Mode\"]\n  E --> I[\"Variance\"]\n  E --> J[\"Std Deviation\"]"
      },
      "why": {
        "text": "Without basic statistics, you cannot evaluate whether your ML model is actually performing well, or if its results are just due to random chance. It is the absolute prerequisite for everything else.",
        "tip": "Always visualize your data with a histogram before calculating the mean. If the data is highly skewed (like income), the mean is a liar. The median is the truth!"
      },
      "code": {
        "code": "import numpy as np\n\ndata = np.array([45, 52, 48, 60, 42, 55, 47, 98])  # Note the 98 is an outlier!\n\n# 1. Central Tendency\nmean_val = np.mean(data)\nmedian_val = np.median(data)\n\n# 2. Dispersion (ddof=1 applies Bessel's correction for Sample Std Dev)\nvariance_biased = np.var(data)          # Divides by n (Population)\nvariance_unbiased = np.var(data, ddof=1) # Divides by n-1 (Sample)\nstd_dev = np.std(data, ddof=1)\n\nprint(f\"Mean: {mean_val:.2f}\")\nprint(f\"Median: {median_val:.2f}\")\nprint(f\"Sample Variance: {variance_unbiased:.2f}\")\nprint(f\"Sample Std Dev: {std_dev:.2f}\")",
        "breakdown": [
          {
            "line": "data = np.array([...])",
            "explanation": "Creates a highly optimized NumPy array of numerical data. Notice '98' is an outlier."
          },
          {
            "line": "mean_val = np.mean(data)",
            "explanation": "Calculates the average. Because 98 is an outlier, the mean gets heavily dragged upwards (calculates to 55.88)."
          },
          {
            "line": "median_val = np.median(data)",
            "explanation": "Calculates the median. The median is exactly 50.0, completely ignoring the massive outlier. This is why median is robust!"
          },
          {
            "line": "variance_unbiased = np.var(data, ddof=1)",
            "explanation": "Calculates Sample Variance. `ddof=1` (Delta Degrees of Freedom) tells NumPy to use n-1 instead of n in the denominator (Bessel's Correction)."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "Variance is the average squared deviation from the mean.",
          "Standard deviation is the square root of variance.",
          "Bessel's correction (n-1) is used when calculating sample variance to correct downward bias of estimating the population mean."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "Why do we divide by (n-1) instead of (n) when calculating the sample variance?",
            "options": [
              "To make the math easier",
              "To correct for bias in estimating the population variance",
              "Because the sample is smaller than the population",
              "It is a historical mistake"
            ],
            "correctIndex": 1,
            "explanation": "Dividing by n-1 (Bessel's correction) corrects the bias in the estimation of the population variance. Because the sample mean is derived from the sample itself, it tends to be closer to the sample data points than the true population mean, thus underestimating true variance."
          }
        ]
      }
    }
  },
  {
    "id": "math-probability",
    "slug": "probability",
    "title": "Introduction To Probability",
    "description": "Addition Rule, Multiplication Rule, Independent and Dependent Events, Bayes Theorem.",
    "estimatedMinutes": 60,
    "interviewQuestions": [],
    "sections": {
      "what": {
        "text": "Probability is the mathematical language of uncertainty. In AI, almost every prediction is probabilistic, not deterministic. When an AI classifies an image as a 'Cat', it is actually saying: 'The probability of Cat is 98%'.\n\n### 1. Events and Sample Spaces\nThe **Sample Space (S)** is the set of all possible outcomes (e.g., rolling a 6-sided die, $S = \\{1, 2, 3, 4, 5, 6\\}$). An **Event (E)** is a subset of outcomes (e.g., rolling an even number, $E = \\{2, 4, 6\\}$).\n\n**Baseline Probability Formula:** $$ P(E) = \\frac{\\text{Favorable Outcomes}}{\\text{Total Outcomes}} $$\n\n### 2. Mutually Exclusive & Addition Rule\nEvents are Mutually Exclusive if they CANNOT occur at the same time (e.g. you cannot draw a card that is both a Heart and a Spade).\n\n**Addition Rule Formula:** $$ P(A \\cup B) = P(A) + P(B) - P(A \\cap B) $$\n**Formula Terms Explained:**\n- $P(A \\cup B)$: The probability of Event A **OR** Event B occurring (the Union).\n- $P(A) + P(B)$: The isolated probabilities of Event A and Event B added together.\n- $P(A \\cap B)$: The probability of A **AND** B occurring simultaneously (the Intersection). We subtract this overlap to avoid double-counting if the events are not mutually exclusive.\n\n### 3. Independent Events & Multiplication Rule\nEvents are Independent if the outcome of one does not affect the other (e.g. flipping a coin twice).\n\n**Multiplication Rule Formula:** $$ P(A \\cap B) = P(A) \\times P(B) $$\n**Formula Terms Explained:**\n- $P(A \\cap B)$: The probability of Event A **AND** Event B both occurring.\n- $P(A) \\times P(B)$: The probabilities multiplied together (e.g. getting two Heads in a row is $0.5 \\times 0.5 = 0.25$).\n\n### 4. Dependent Events & Bayes' Theorem\nIf drawing a red card without replacement changes the odds of drawing a red card next, the events are Dependent. We use Conditional Probability $P(A|B)$ (Probability of A given B has occurred).\n\n**Bayes' Theorem Formula:** $$ P(A|B) = \\frac{P(B|A) \\cdot P(A)}{P(B)} $$\n**Formula Terms Explained:**\n- $P(A|B)$ (Posterior): The probability of Event A occurring, given that Event B has already occurred.\n- $P(B|A)$ (Likelihood): The probability of Event B occurring, given that Event A is true.\n- $P(A)$ (Prior): The initial probability of Event A occurring, regardless of B.\n- $P(B)$ (Marginal): The total overall probability of Event B occurring under any circumstances.",
        "eli5": "Probability is a score from 0 (impossible) to 1 (absolutely certain). Everything in between represents how likely something is to happen."
      },
      "diagram": {
        "chart": "graph TD\n  A[\"Probability Rules\"] --> B[\"Addition Rule (OR)\"]\n  A --> C[\"Multiplication Rule (AND)\"]\n  B --> D[\"Mutually Exclusive\"]\n  B --> E[\"Not Mutually Exclusive\"]\n  C --> F[\"Independent Events\"]\n  C --> G[\"Dependent Events\"]\n  D -->|\"P(A) + P(B)\"| H[\"Formula 1\"]\n  E -->|\"P(A) + P(B) - P(A and B)\"| I[\"Formula 2\"]\n  F -->|\"P(A) * P(B)\"| J[\"Formula 3\"]\n  G -->|\"Conditional P(A|B)\"| K[\"Bayes Theorem\"]"
      },
      "why": {
        "text": "Algorithms like Logistic Regression and Naive Bayes output probabilities. If you don't understand the multiplication rule and Bayes Theorem, you cannot understand how algorithms evaluate evidence.",
        "tip": "When you see the word 'OR' in probability questions, think Addition (+). When you see 'AND', think Multiplication (*)."
      },
      "code": {
        "code": "import numpy as np\n\n# Monte Carlo Simulation: The Law of Large Numbers\n# Let's simulate flipping a fair coin (Probability of Heads = 0.5)\n\ndef simulate_flips(num_flips):\n    # Generate array of 0s and 1s randomly\n    flips = np.random.choice([0, 1], size=num_flips)\n    \n    # Calculate probability\n    prob_heads = np.sum(flips) / num_flips\n    return prob_heads\n\nprint(f\"10 flips: P(Heads) = {simulate_flips(10):.3f}\")\nprint(f\"100 flips: P(Heads) = {simulate_flips(100):.3f}\")\nprint(f\"10,000 flips: P(Heads) = {simulate_flips(10000):.3f}\")\nprint(f\"1,000,000 flips: P(Heads) = {simulate_flips(1000000):.3f}\")",
        "breakdown": [
          {
            "line": "flips = np.random.choice([0, 1], size=num_flips)",
            "explanation": "Uses NumPy's highly optimized random module to simulate flipping a coin 'num_flips' times instantly, returning an array of 0s (Tails) and 1s (Heads)."
          },
          {
            "line": "prob_heads = np.sum(flips) / num_flips",
            "explanation": "Applies the baseline probability formula: (Favorable Outcomes) / (Total Outcomes). We sum the 1s and divide by the total flips."
          },
          {
            "line": "print(f\"... {simulate_flips(1000000)}\")",
            "explanation": "Proves the Law of Large Numbers. With 10 flips, the result might be 0.2 or 0.8. But with 1,000,000 flips, the experimental probability flawlessly converges to exactly 0.500."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "Mutually exclusive events cannot happen at the same time, therefore P(A \u2229 B) = 0.",
          "If events A and B are independent, P(A|B) = P(A).",
          "The Law of Large Numbers states that as the number of trials increases, the experimental probability converges to the theoretical probability."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "According to Bayes' Theorem, how is P(A|B) calculated?",
            "options": [
              "P(A) * P(B)",
              "( P(B|A) * P(A) ) / P(B)",
              "P(A) + P(B) - P(B|A)",
              "1 - P(A)"
            ],
            "correctIndex": 1,
            "explanation": "Bayes Theorem states that the probability of A given B is the probability of B given A, multiplied by the prior probability of A, all divided by the total probability of B."
          }
        ]
      }
    }
  },
  {
    "id": "math-prob-dist",
    "slug": "probability-distributions",
    "title": "Probability Distributions Explained",
    "description": "Deep dive into Bernoulli, Binomial, Poisson, Normal, Z-Score, Uniform, Log Normal, Power Law, and Pareto distributions with formula breakdowns.",
    "estimatedMinutes": 120,
    "interviewQuestions": [],
    "sections": {
      "what": {
        "text": "A probability distribution is a mathematical map showing how likely different outcomes are. We split these into Discrete (using a Probability Mass Function or PMF) and Continuous (using a Probability Density Function or PDF).\n\nHere is a detailed breakdown of the 9 most critical distributions in Data Science:\n\n---\n\n### 1. Bernoulli Distribution (Discrete)\n**What it is:** A distribution modeling a single trial with only two possible outcomes (Success or Failure).\n\n**Formula (PMF):** $$ P(X=x) = p^x (1-p)^{1-x} $$\n\n**Formula Terms Explained:**\n- $P(X=x)$: The probability that the outcome $X$ equals the specific value $x$.\n- $p$: The probability of a successful outcome (e.g., $p=0.5$ for a fair coin).\n- $x$: The actual outcome. $1$ represents Success, and $0$ represents Failure.\n- $1-p$: The probability of failure.\n\n**Use Case & Examples:**\n- **Use Case:** Any binary event where you only care if something happened or didn't happen.\n- **Example:** Did a user click the checkout button? (Click = 1, Ignore = 0). Will it rain today? (Yes = 1, No = 0).\n\n---\n\n### 2. Binomial Distribution (Discrete)\n**What it is:** Expanding on Bernoulli, this models the number of successes in multiple, independent Bernoulli trials.\n\n**Formula (PMF):** $$ P(X=k) = \\binom{n}{k} p^k (1-p)^{n-k} $$\n\n**Formula Terms Explained:**\n- $P(X=k)$: The probability of getting exactly $k$ successes.\n- $n$: The total number of trials (e.g., flipping a coin 10 times).\n- $k$: The number of successes you want to calculate the probability for (e.g., exactly 7 heads).\n- $\\binom{n}{k}$: 'N choose K'. The mathematical combination calculating how many different ways those $k$ successes can be arranged across $n$ trials.\n- $p$: Probability of success on a single trial.\n\n**Use Case & Examples:**\n- **Use Case:** Predicting success rates across a batch of identical, independent events.\n- **Example:** If an email marketing campaign has a 5% click rate ($p=0.05$), what is the probability that out of 100 emails sent ($n=100$), exactly 3 people click ($k=3$)?\n\n---\n\n### 3. Poisson Distribution (Discrete)\n**What it is:** Models the number of independent events occurring in a fixed interval of time or space, given a known average rate.\n\n**Formula (PMF):** $$ P(X=k) = \\frac{\\lambda^k e^{-\\lambda}}{k!} $$\n\n**Formula Terms Explained:**\n- $\\lambda$ (Lambda): The known average rate of events per interval (e.g., average 4 buses per hour).\n- $k$: The number of occurrences you want to find the probability of (e.g., exactly 6 buses arriving).\n- $e$: Euler's number (approximately 2.71828).\n- $k!$: K Factorial (e.g., $4! = 4 \\times 3 \\times 2 \\times 1$).\n\n**Use Case & Examples:**\n- **Use Case:** Predicting rare events or traffic flows over time.\n- **Example:** A server normally crashes 2 times a month ($\\lambda = 2$). What is the probability it crashes exactly 0 times ($k=0$) next month?\n\n---\n\n### 4. Normal / Gaussian Distribution (Continuous)\n**What it is:** The famous 'Bell Curve'. A continuous distribution where data clusters symmetrically around the **Population Mean**. The probability of hitting an exact number (like $5.0001$) is zero, so we calculate the area under the curve (PDF).\n\n**Formula (PDF):** $$ f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{1}{2}\\left(\\frac{x-\\mu}{\\sigma}\\right)^2} $$\n\n**Formula Terms Explained:**\n- $f(x)$: The density height of the curve at point $x$.\n- $x$: The value you are evaluating.\n- $\\mu$ (Mu): The **Population Mean** (the center tip of the bell curve).\n- $\\sigma$ (Sigma): The **Population Standard Deviation** (how wide/flat the bell is).\n- $\\pi$ (Pi): Approx 3.14159.\n- $e$: Euler's number.\n\n**Use Case & Examples:**\n- **Use Case:** Modeling naturally occurring phenomena and errors in Machine Learning (Linear Regression assumes errors are normally distributed).\n- **Example:** Human heights, IQ scores, or the measurement error of a physical sensor.\n\n---\n\n### 5. Standard Normal Distribution & Z-Score\n**What it is:** A specialized version of the Normal Distribution where the **Population Mean** is forcibly shifted to 0, and the **Population Standard Deviation** is exactly 1. We use a formula called the **Z-Score** to convert ANY normal distribution into a Standard Normal one.\n\n**Formula (Z-Score):** $$ Z = \\frac{X - \\mu}{\\sigma} $$\n\n**Formula Terms Explained:**\n- $Z$: The resulting Z-Score. It tells you exactly how many standard deviations $X$ is away from the mean.\n- $X$: The raw data point you want to convert.\n- $\\mu$: The original **Population Mean** of the dataset.\n- $\\sigma$: The original **Population Standard Deviation**.\n\n**Use Case & Examples:**\n- **Use Case:** Comparing completely different metrics on the same scale, or identifying extreme outliers (A Z-score $> 3$ is usually considered an outlier).\n- **Example:** Comparing a student's SAT score (Scale 400-1600) directly against an ACT score (Scale 1-36). Convert both to Z-Scores to see who performed better relative to their peers.\n\n---\n\n### 6. Uniform Distribution (Continuous)\n**What it is:** A 'flat' distribution where every single outcome within a range has the exact same probability of occurring.\n\n**Formula (PDF):** $$ f(x) = \\frac{1}{b - a} $$\n\n**Formula Terms Explained:**\n- $f(x)$: The density height, which is a flat horizontal line.\n- $a$: The minimum possible value.\n- $b$: The maximum possible value.\n\n**Use Case & Examples:**\n- **Use Case:** True randomness where no cluster exists.\n- **Example:** Generating a random number between 1 and 10 in a computer program.\n\n---\n\n### 7. Log Normal Distribution (Continuous)\n**What it is:** A distribution where, if you take the Logarithm of the data, the resulting values form a Normal Distribution. The raw data itself is heavily right-skewed and cannot be negative.\n\n**Formula (PDF):** $$ f(x) = \\frac{1}{x\\sigma\\sqrt{2\\pi}} e^{-\\frac{(\\ln x-\\mu)^2}{2\\sigma^2}} $$\n\n**Formula Terms Explained:**\n- $\\ln x$: The natural logarithm of the value $x$.\n- $\\mu$: The mean of the variable's logarithm.\n- $\\sigma$: The standard deviation of the variable's logarithm.\n\n**Use Case & Examples:**\n- **Use Case:** Data that grows multiplicatively rather than additively, and has a hard zero floor.\n- **Example:** Stock market prices (prices cannot drop below $0, but can grow infinitely high). Individual incomes.\n\n---\n\n### 8. Power Law Distribution\n**What it is:** A functional relationship where a relative change in one quantity results in a proportional relative change in the other. It produces an extremely heavy tail, meaning massive outliers are expected, not anomalies.\n\n**Formula:** $$ f(x) = C x^{-\\alpha} $$\n\n**Formula Terms Explained:**\n- $C$: A normalization constant to ensure the probabilities sum to 1.\n- $x$: The value.\n- $\\alpha$ (Alpha): The scaling parameter determining how aggressively the tail drops off.\n\n**Use Case & Examples:**\n- **Use Case:** Modeling scale-free networks and extreme inequality.\n- **Example:** The size of craters on the moon. Word frequencies in human languages (the word 'the' is used exponentially more than the next most common word).\n\n---\n\n### 9. Pareto Distribution (The 80/20 Rule)\n**What it is:** A specific, formalized continuous probability distribution based on the Power Law. It mathematically models the \"Pareto Principle\" where roughly 80% of consequences come from 20% of causes.\n\n**Formula (PDF):** $$ f(x) = \\frac{\\alpha x_m^\\alpha}{x^{\\alpha+1}} $$\n\n**Formula Terms Explained:**\n- $x_m$: The minimum possible value of $X$ (the scale parameter).\n- $\\alpha$: The shape parameter. An alpha of $\\approx 1.16$ perfectly mirrors the 80/20 rule.\n- $x$: The value being evaluated, where $x \\ge x_m$.\n\n**Use Case & Examples:**\n- **Use Case:** Analyzing wealth inequality, business sales, or bug reports.\n- **Example:** 80% of a company's sales come from 20% of its clients. 80% of internet traffic flows through 20% of websites.",
        "eli5": "A distribution is just a map. Bernoulli/Binomial maps coin flips. Poisson maps waiting for buses. Normal maps human heights. Pareto maps the fact that 20% of people hold 80% of the wealth."
      },
      "diagram": {
        "chart": "graph TD\n  A[\"Distributions\"] --> B[\"Discrete (Countable)\"]\n  A --> C[\"Continuous (Infinite)\"]\n  B --> D[\"Bernoulli: 1 Coin Flip\"]\n  B --> E[\"Binomial: N Coin Flips\"]\n  B --> F[\"Poisson: Bus Arrivals in 1 Hour\"]\n  C --> G[\"Uniform: Flat Randomness\"]\n  C --> H[\"Normal: The Bell Curve\"]\n  H --> H2[\"Standard Normal: Z-Score\"]\n  C --> I[\"Log-Normal: Right Skewed\"]\n  C --> J[\"Pareto: The 80-20 Rule\"]"
      },
      "why": {
        "text": "Machine learning models make strict assumptions about data. If your data follows a Pareto distribution (extreme wealth inequality), but your model assumes it's Normal, your model will fail catastrophically. Identifying the distribution is the absolute first step in EDA.",
        "tip": "Never use a Z-Score to detect outliers on a Pareto or Log-Normal distribution! Because those distributions naturally have massive \"heavy tails\", the Z-score will falsely flag completely valid data points as errors."
      },
      "code": {
        "code": "import numpy as np\nfrom scipy.stats import binom, poisson, norm, pareto, lognorm\n\n# 1. BINOMIAL: PMF (Probability of exactly 7 successes in 10 trials)\nprob_binom = binom.pmf(k=7, n=10, p=0.5)\n\n# 2. POISSON: PMF (Exactly 6 occurrences if historical average is 4/interval)\nprob_poisson = poisson.pmf(k=6, mu=4)\n\n# 3. NORMAL: CDF (Probability value is <= 115 if mean=100, std=15)\nprob_normal = norm.cdf(x=115, loc=100, scale=15)\n\n# 4. STANDARD NORMAL: (Z-Score of 1.0 is mathematically identical to x=115 above)\nprob_standard_normal = norm.cdf(x=1.0, loc=0, scale=1)\n\n# 5. PARETO (Power Law): CDF (80/20 wealth distribution rule)\n# Shape parameter b=1.16 is classic Pareto\nprob_pareto = pareto.cdf(x=5, b=1.16) \n\n# 6. LOG-NORMAL: CDF\n# s is the standard deviation of the underlying normal distribution\nprob_log_normal = lognorm.cdf(x=10, s=0.5)\n\nprint(f\"Binomial P(X=7): {prob_binom:.4f}\")\nprint(f\"Poisson P(X=6): {prob_poisson:.4f}\")\nprint(f\"Normal P(X<=115): {prob_normal:.4f}\")\nprint(f\"Standard Normal P(Z<=1.0): {prob_standard_normal:.4f}\")\nprint(f\"Pareto CDF P(X<=5): {prob_pareto:.4f}\")\nprint(f\"Log-Normal P(X<=10): {prob_log_normal:.4f}\")",
        "breakdown": [
          {
            "line": "from scipy.stats import binom, poisson, norm, pareto, lognorm",
            "explanation": "SciPy's stats module contains highly accurate mathematical implementations of all probability distributions."
          },
          {
            "line": "binom.pmf(k=7, n=10, p=0.5)",
            "explanation": "Calls the Probability Mass Function for the Binomial distribution. It executes the formula (10 C 7) * 0.5^7 * 0.5^3 to get the exact probability."
          },
          {
            "line": "norm.cdf(x=115, loc=100, scale=15)",
            "explanation": "Because Normal is a Continuous distribution, we cannot use PMF. We use CDF to calculate the area under the bell curve from negative infinity up to x=115 (approx 84.1%)."
          },
          {
            "line": "norm.cdf(x=1.0, loc=0, scale=1)",
            "explanation": "Demonstrates the Z-Score! Because 115 is exactly +1 standard deviation above the mean of 100, checking Z=1.0 on a Standard Normal yields the exact same 84.1% probability."
          },
          {
            "line": "pareto.cdf(x=5, b=1.16)",
            "explanation": "Calculates probabilities on a heavy-tailed Power Law distribution, commonly used to model massive wealth inequalities or internet traffic."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "Discrete variables use PMF, Continuous variables use PDF.",
          "Log-Normal means the LOG of the variable is normally distributed. The variable itself is heavily skewed to the right.",
          "Pareto distributions perfectly model the 80/20 rule, where a small percentage of inputs cause a massive percentage of the outputs."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "Which distribution is best suited to model the number of customer arrivals at a bank per hour?",
            "options": [
              "Normal Distribution",
              "Poisson Distribution",
              "Pareto Distribution",
              "Uniform Distribution"
            ],
            "correctIndex": 1,
            "explanation": "The Poisson distribution mathematically models the probability of a given number of events occurring in a fixed interval of time or space."
          }
        ]
      }
    }
  },
  {
    "id": "math-inferential-stats",
    "slug": "inferential-statistics",
    "title": "Inferential Statistics & Hypothesis Testing",
    "description": "Null Hypothesis, P Value, Z-Test, T-Test, ANOVA, and Chi-Square.",
    "estimatedMinutes": 60,
    "interviewQuestions": [],
    "sections": {
      "what": {
        "text": "Inferential statistics uses random samples to make concrete mathematical conclusions (inferences) about the overall population. This is heavily used in A/B Testing.\n\n### 1. Hypothesis Testing\nEvery test starts with two opposing hypotheses:\n- **Null Hypothesis ($H_0$)**: The default state. States there is *NO* significant difference or effect (e.g. 'The new website UI does not increase sales').\n- **Alternative Hypothesis ($H_A$)**: What you are trying to prove (e.g. 'The new website UI increases sales').\n\n### 2. The P-Value\nThe most misunderstood metric in data science. The P-Value is the probability of observing results at least as extreme as yours, **ASSUMING the Null Hypothesis ($H_0$) is true**. \nIf the P-Value is very small (typically $< 0.05$ or $5\\%$), we say the results are statistically significant, and we **Reject the Null Hypothesis**.\n\n### 3. Z-Test\nTests if two means are different. Used when your **Sample Size** is large ($n > 30$) AND the **Population Variance** is completely known.\n\n**Z-Test Formula:** $$ Z = \\frac{\\bar{x} - \\mu}{\\sigma / \\sqrt{n}} $$\n**Formula Terms Explained:**\n- $Z$: The calculated Z-statistic (how extreme your sample is).\n- $\\bar{x}$ (x-bar): The **Sample Mean** (the average from the small group you actually tested).\n- $\\mu$ (Mu): The **Population Mean** (the assumed average of the entire real world).\n- $\\sigma$ (Sigma): The **Population Standard Deviation** (how spread out the whole world is).\n- $n$: The **Sample Size** (how many people you actually tested).\n- $\\sigma / \\sqrt{n}$: The Standard Error (adjusts the expected spread based on how big your sample is).\n\n### 4. T-Test\nTests if two means are different. Used when the **Sample Size** is small OR the **Population Variance** is unknown (which is almost always the case in real life).\n\n**T-Test Formula (Independent):** $$ t = \\frac{\\bar{x}_1 - \\bar{x}_2}{\\sqrt{ \\frac{s_1^2}{n_1} + \\frac{s_2^2}{n_2} }} $$\n**Formula Terms Explained:**\n- $t$: The calculated T-statistic.\n- $\\bar{x}_1, \\bar{x}_2$ (x-bar): The **Sample Means** of group 1 and group 2 (e.g., the average weight loss of the Placebo group vs the Pill group).\n- $s_1^2, s_2^2$: The **Sample Variances** of group 1 and group 2 (how spread out the data is within each specific group).\n- $n_1, n_2$: The **Sample Sizes** (how many people were placed in group 1 and group 2).\n\n### 5. Chi-Square Test ($\\chi^2$)\nUsed exclusively for categorical data. Tests if two categorical variables are mathematically independent.\n\n**Chi-Square Formula:** $$ \\chi^2 = \\sum \\frac{(O_i - E_i)^2}{E_i} $$\n**Formula Terms Explained:**\n- $\\chi^2$: The chi-square test statistic.\n- $O_i$: The **Observed Frequency** (what you actually counted) for a specific category $i$.\n- $E_i$: The **Expected Frequency** (what you would mathematically expect if the null hypothesis were true) for category $i$.\n- $\\sum$: Sum these calculations across all categories.",
        "eli5": "Inferential stats is like tasting one spoonful of soup to decide if the whole pot needs more salt. The p-value tells you how likely it is that you just scooped up a randomly salty spoonful by accident."
      },
      "diagram": {
        "chart": "graph TD\n  A[\"Which Statistical Test?\"] --> B{\"Data Type\"}\n  B -->|\"Categorical\"| C[\"Chi-Square Test\"]\n  B -->|\"Numerical\"| D{\"How many groups?\"}\n  D -->|\"1 or 2 Groups\"| E{\"Sample Size and Variance\"}\n  D -->|\"3+ Groups\"| F[\"ANOVA\"]\n  E -->|\"n > 30, Variance Known\"| G[\"Z-Test\"]\n  E -->|\"n < 30, Variance Unknown\"| H[\"T-Test\"]"
      },
      "why": {
        "text": "If you A/B test a new Machine Learning model and it gets 5% better accuracy on a sample, is that a real improvement or just random luck? Inferential statistics proves mathematically whether the result is statistically significant and safe to deploy.",
        "tip": "A p-value of 0.05 does NOT mean there is a 5% chance the null hypothesis is true. It means if the null hypothesis were true, you'd see data this extreme 5% of the time."
      },
      "code": {
        "code": "import numpy as np\nfrom scipy import stats\n\n# A/B Test Example: Did the new diet pill actually work?\n# We track the weight loss of 2 groups (n=20 for both)\ngroup_a_placebo = np.random.normal(loc=2.0, scale=1.5, size=20) # Mean loss 2 lbs\ngroup_b_pill = np.random.normal(loc=3.5, scale=1.5, size=20)    # Mean loss 3.5 lbs\n\n# Perform independent T-Test (Comparing two continuous means)\nt_statistic, p_value = stats.ttest_ind(group_b_pill, group_a_placebo)\n\nprint(f\"T-Statistic: {t_statistic:.3f}\")\nprint(f\"P-Value: {p_value:.5f}\")\n\n# Standard alpha is 0.05\nif p_value < 0.05:\n    print(\"Result is statistically significant! Reject H0. The pill works.\")\nelse:\n    print(\"Not statistically significant. Fail to reject H0.\")",
        "breakdown": [
          {
            "line": "from scipy import stats",
            "explanation": "SciPy stats contains all industry-standard hypothesis tests."
          },
          {
            "line": "np.random.normal(loc=2.0, ...)",
            "explanation": "We simulate two samples of continuous data (weight loss in lbs)."
          },
          {
            "line": "stats.ttest_ind(group_b_pill, group_a_placebo)",
            "explanation": "Runs an Independent Two-Sample T-Test. We use a T-Test because we are comparing two numerical means and the population variance is technically unknown."
          },
          {
            "line": "if p_value < 0.05:",
            "explanation": "Evaluates the P-Value against our Alpha significance level (0.05). If it is smaller, the chance of this difference happening by random luck is less than 5%, so we confidently reject the Null Hypothesis!"
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "Type I Error (False Positive, Alpha \u03b1): Rejecting a true null hypothesis.",
          "Type II Error (False Negative, Beta \u03b2): Failing to reject a false null hypothesis.",
          "ANOVA partitions variance into 'Between-Group Variance' and 'Within-Group Variance'. If Between > Within, the groups are significantly different."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "You want to test if Gender (Male/Female) is independent of Voting Preference (Party A / Party B). Both are categorical variables. Which test must you use?",
            "options": [
              "Z-Test",
              "T-Test",
              "ANOVA",
              "Chi-Square Test"
            ],
            "correctIndex": 3,
            "explanation": "The Chi-Square test of independence is specifically designed to determine if there is a significant association between two categorical variables."
          }
        ]
      }
    }
  },
  {
    "id": "math-feature-eng",
    "slug": "feature-engineering",
    "title": "Feature Engineering & Preprocessing",
    "description": "Handling Missing Values, Imbalanced Datasets (SMOTE), Scaling, and Data Encoding.",
    "estimatedMinutes": 60,
    "interviewQuestions": [],
    "sections": {
      "what": {
        "text": "Feature engineering is the process of using domain knowledge and mathematics to extract features from raw data. ML algorithms require strict mathematical matrices\u2014they cannot process messy text or missing holes in data.\n\n### 1. Scaling and Normalization\nMany algorithms (like KNN and Neural Networks) rely on distance metrics. If one feature is 'Age' (0-100) and another is 'Salary' (0-100,000), the Salary feature will mathematically dominate the Age feature due to its sheer size. We must scale them.\n\n**Standardization (Z-Score Scaling)**\nCenters data at mean 0 with standard deviation 1. Doesn't bound to a specific range.\n**Formula:** $$ Z = \\frac{X - \\mu}{\\sigma} $$\n**Formula Terms Explained:**\n- $Z$: The newly scaled value.\n- $X$: The original raw value.\n- $\\mu$: The mean of that entire feature column.\n- $\\sigma$: The standard deviation of that entire feature column.\n\n**Min-Max Normalization**\nSqueezes all data perfectly into a strict range between 0 and 1.\n**Formula:** $$ X_{norm} = \\frac{X - X_{min}}{X_{max} - X_{min}} $$\n**Formula Terms Explained:**\n- $X_{norm}$: The normalized value (between 0 and 1).\n- $X$: The original raw value.\n- $X_{min}, X_{max}$: The absolute minimum and maximum values found in that feature column.\n\n### 2. Encoding Categorical Data\nMachines only understand numbers. We must encode string categories (like 'Red', 'Blue').\n- **One-Hot Encoding (OHE)**: Creates a new binary (0/1) column for every unique category. Excellent for Nominal (unordered) data, but can cause the *Curse of Dimensionality* if there are too many categories.\n- **Ordinal/Label Encoding**: Assigns an integer (1, 2, 3) to categories. ONLY use this if the data has a strict mathematical order (e.g. Low, Medium, High).\n\n### 3. Handling Imbalanced Datasets (SMOTE)\nIf you train a fraud model on a dataset that is 99% Non-Fraud and 1% Fraud, the model will just guess 'Non-Fraud' every time and achieve 99% accuracy while failing its objective entirely. We solve this mathematically using **SMOTE** (Synthetic Minority Over-sampling Technique), which uses K-Nearest Neighbors mathematics to interpolate and generate *fake but statistically valid* examples of the minority class.",
        "eli5": "Raw data is like an unpeeled, muddy potato. Feature engineering is washing it, peeling it, and cutting it into identical fries so the machine learning model (the deep fryer) can cook it evenly."
      },
      "diagram": {
        "chart": "graph TD\n  A[\"Feature Engineering\"] --> B[\"Missing Values\"]\n  A --> C[\"Categorical Encoding\"]\n  A --> D[\"Feature Scaling\"]\n  A --> E[\"Imbalanced Data\"]\n  B --> F[\"Imputation Mean/Median\"]\n  C --> G[\"Nominal to One-Hot\"]\n  C --> H[\"Ordered to Ordinal\"]\n  D --> I[\"Distance Models to Standardize\"]\n  E --> J[\"Minority Class to SMOTE\"]"
      },
      "why": {
        "text": "Better features beat better algorithms. A simple Logistic Regression model with brilliantly engineered features will consistently outperform a complex Deep Neural Network trained on messy, unscaled raw data.",
        "tip": "Be careful with One-Hot Encoding on high-cardinality features (like Zip Codes). It will create thousands of sparse columns, drastically slowing down your model and causing overfitting!"
      },
      "code": {
        "code": "import pandas as pd\nimport numpy as np\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\n\n# Raw messy dataset\ndf = pd.DataFrame({\n    'City': ['New York', 'London', 'New York', 'Paris'],\n    'Salary': [80000, 50000, np.nan, 120000]\n})\n\n# 1. Imputation: Handle Missing Values using Median (robust to outliers)\ndf['Salary'] = df['Salary'].fillna(df['Salary'].median())\n\n# 2. Scaling: Standardize the massive Salary numbers to Z-Scores\nscaler = StandardScaler()\n# We use [[]] to pass a 2D array, which sklearn requires\ndf['Salary_Scaled'] = scaler.fit_transform(df[['Salary']])\n\n# 3. Encoding: One-Hot Encode the nominal City names\nencoder = OneHotEncoder(sparse_output=False)\ncity_encoded = encoder.fit_transform(df[['City']])\n\nprint(\"Processed Dataframe:\")\nprint(df[['City', 'Salary', 'Salary_Scaled']])\nprint(\"\\nOne-Hot Encoded Matrix:\")\nprint(city_encoded)",
        "breakdown": [
          {
            "line": "df['Salary'].fillna(df['Salary'].median())",
            "explanation": "Finds the median of the existing salaries (80000) and mathematically injects it into the NaN hole (Imputation)."
          },
          {
            "line": "scaler = StandardScaler()",
            "explanation": "Instantiates the Z-Score standardization tool from Scikit-Learn."
          },
          {
            "line": "scaler.fit_transform(df[['Salary']])",
            "explanation": "First it 'fits' (calculates the mean and standard deviation of the column), then it 'transforms' (applies the Z-score formula to every single row), resulting in numbers near 0."
          },
          {
            "line": "encoder = OneHotEncoder(sparse_output=False)",
            "explanation": "Instantiates the OHE tool. Setting sparse_output to False forces it to return a standard NumPy array instead of a memory-optimized sparse matrix, making it easier to read."
          },
          {
            "line": "encoder.fit_transform(df[['City']])",
            "explanation": "Generates the binary matrix. Since there are 3 unique cities, it generates 3 columns of 0s and 1s."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "SMOTE generates synthetic examples of the minority class using K-Nearest Neighbors interpolation.",
          "Standardization (Z-score normalization) scales data to have mean=0 and std=1. It does NOT make the distribution normal if it was previously skewed.",
          "Tree-based models (Random Forest, XGBoost) do NOT require feature scaling because they split on thresholds, not distances."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "Why is One-Hot Encoding preferred over Ordinal Encoding for a feature like 'Color' (Red, Blue, Green)?",
            "options": [
              "It saves memory",
              "Ordinal encoding implies a mathematical hierarchy (e.g. Green > Blue), which is false for nominal colors",
              "One-Hot encoding is faster for the CPU",
              "Ordinal encoding cannot handle strings"
            ],
            "correctIndex": 1,
            "explanation": "If you encode Red=1, Blue=2, Green=3, the machine learning math will think Green is '3 times larger' than Red. One-Hot Encoding prevents this false mathematical relationship by giving each color its own binary dimension."
          }
        ]
      }
    }
  },
  {
    "id": "math-eda",
    "slug": "eda",
    "title": "Exploratory Data Analysis (EDA)",
    "description": "Univariate Analysis, Bivariate Analysis, Correlation coefficients, and visual intuition.",
    "estimatedMinutes": 60,
    "interviewQuestions": [],
    "sections": {
      "what": {
        "text": "Exploratory Data Analysis (EDA) is the mathematical and visual approach to analyzing data sets to summarize their main characteristics. It is the crucial step BEFORE building any machine learning models.\n\n### 1. Univariate Analysis\nExamining a single variable to understand its mathematical distribution and detect extreme outliers.\n- **Histograms**: Visualize the Probability Density.\n- **Boxplots**: A visual representation of the 5-number summary (Minimum, Q1, Median, Q3, Maximum). The box represents the Interquartile Range (IQR). Any dot plotted completely outside the 'whiskers' (typically $1.5 \\times IQR$) is a mathematical outlier.\n\n### 2. Bivariate Analysis & Correlation\nExamining relationships between exactly two variables.\n- **Scatterplots**: Provide an immediate visual cue if a linear relationship exists.\n\n**Pearson Correlation Coefficient ($r$)**\nMeasures the linear mathematical correlation between two continuous variables.\n**Formula:** $$ r = \\frac{\\sum (x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum (x_i - \\bar{x})^2 \\sum (y_i - \\bar{y})^2}} $$\n**Formula Terms Explained:**\n- $r$: The Pearson correlation coefficient, constrained strictly between $-1$ and $1$.\n- $x_i, y_i$: The individual paired data points for variable X and variable Y.\n- $\\bar{x}, \\bar{y}$: The mean average of variable X and variable Y.\n- $\\sum$: The summation operator across all pairs in the dataset.\n- **Interpretation:**\n  - $r = 1$: Perfect positive correlation.\n  - $r = -1$: Perfect negative correlation.\n  - $r = 0$: Absolutely no linear correlation.\n\n### 3. Multivariate Analysis\nExamining more than two variables. We typically generate a **Correlation Matrix Heatmap** which runs the Pearson formula across every single combination of numerical columns simultaneously.",
        "eli5": "EDA is being a detective. You look at the evidence (data), draw sketches (graphs), and look for mathematical clues (correlations) before you make an accusation (train a model)."
      },
      "diagram": {
        "chart": "graph TD\n  A[\"Exploratory Data Analysis\"] --> B[\"Univariate\"]\n  A --> C[\"Bivariate / Multivariate\"]\n  B --> D[\"Histograms\"]\n  B --> E[\"Boxplots / IQR\"]\n  C --> F[\"Scatterplots\"]\n  C --> G[\"Pearson Correlation Matrix\"]\n  G -->|\"r = 1\"| H[\"Positive\"]\n  G -->|\"r = -1\"| I[\"Negative\"]\n  G -->|\"r = 0\"| J[\"None\"]"
      },
      "why": {
        "text": "If you blindly feed data into a machine learning model without exploring it first, you are flying blind. EDA uncovers hidden patterns, prevents errors, and tells you exactly which features have the mathematical power to predict your target.",
        "tip": "Correlation does NOT imply causation! Just because ice cream sales and shark attacks have a Pearson correlation of 0.95 doesn't mean eating ice cream causes shark attacks. Both are caused by a hidden third variable: Summer heat."
      },
      "code": {
        "code": "import pandas as pd\nimport numpy as np\n\n# Generate synthetic data\nnp.random.seed(42)\nsquare_footage = np.random.uniform(500, 3000, 50)\n# Price is strongly positively correlated with square footage, plus some noise\nhouse_prices = (square_footage * 150) + np.random.normal(0, 20000, 50)\n# Age is randomly distributed (no correlation)\nhouse_age = np.random.uniform(1, 100, 50)\n\ndf = pd.DataFrame({\n    'SqFt': square_footage,\n    'Price': house_prices,\n    'Age': house_age\n})\n\n# Generate the Pearson Correlation Matrix\ncorrelation_matrix = df.corr(method='pearson')\n\nprint(\"Pearson Correlation Matrix:\")\nprint(correlation_matrix.round(3))\n\n# Notice:\n# SqFt & Price correlation is ~0.95 (Extremely strong)\n# Age & Price correlation is near 0.0 (No relationship)",
        "breakdown": [
          {
            "line": "house_prices = (square_footage * 150) + np.random.normal(...)",
            "explanation": "We explicitly mathematically link price to square footage, but we inject a Normal Distribution of 'noise' so it isn't a perfect 1.0 correlation."
          },
          {
            "line": "correlation_matrix = df.corr(method='pearson')",
            "explanation": "Pandas runs the massive Pearson Correlation formula on every single numerical pair in the DataFrame simultaneously."
          },
          {
            "line": "print(correlation_matrix.round(3))",
            "explanation": "Outputs a grid. The diagonal is always 1.0 (SqFt is perfectly correlated with itself). The intersection of SqFt and Price will show a high positive decimal."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "The Pearson correlation coefficient ONLY measures linear relationships. Two variables can have a complex non-linear relationship but a Pearson score of 0.",
          "Spearman's Rank Correlation is an alternative to Pearson that handles monotonic, non-linear relationships.",
          "Outliers are generally mathematically defined as points falling below (Q1 - 1.5 * IQR) or above (Q3 + 1.5 * IQR)."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "You calculate a Pearson correlation coefficient (r) of 0.02 between Feature A and the Target Variable. What should you conclude?",
            "options": [
              "Feature A strongly predicts the Target",
              "Feature A has almost no linear mathematical relationship with the Target",
              "You made a calculation error",
              "Feature A is perfectly negatively correlated"
            ],
            "correctIndex": 1,
            "explanation": "A Pearson score near 0 indicates there is virtually no linear correlation. This feature will likely be useless for linear machine learning models."
          }
        ]
      }
    }
  }
];
