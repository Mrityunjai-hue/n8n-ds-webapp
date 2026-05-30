import { Topic } from '../../types/content';

export const mlTopicsP3: Topic[] = [
  {
    id: 'ml-docker',
    slug: 'docker',
    title: 'Docker For Data Scientists',
    description: "Containers, Images, Docker Hub, and Docker Compose.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "Docker is a platform that packages your ML application and ALL its dependencies (Python version, scikit-learn version, NumPy version, system libraries) into a single, portable **Container**.\n\n```mermaid\ngraph LR\n    A[Your Code + Model.pkl] --> B[Dockerfile]\n    B --> C[docker build]\n    C --> D[Docker Image]\n    D --> E[docker run]\n    E --> F[Running Container]\n    D --> G[docker push to Docker Hub]\n    G --> H[Cloud Server pulls Image]\n    H --> I[docker run on EC2 / Azure]\n```\n\n### 1. Docker vs Virtual Machines\n- **Virtual Machine (VM)**: Emulates an entire computer. It has its own complete Operating System kernel (several gigabytes). Slow to start.\n- **Docker Container**: Shares the host machine's OS kernel. Only packages the application and its dependencies (a few megabytes). Starts in milliseconds.\nThink of VMs as buying a whole new apartment, and Containers as just packing your furniture into a moving box.\n\n### 2. Docker Image vs Container\n- **Docker Image**: A static, read-only blueprint/snapshot. Defined in a `Dockerfile`.\n- **Docker Container**: A running *instance* of an Image. You can run 10 containers from the same Image simultaneously.\n\n### 3. Key Dockerfile Commands for ML\n```dockerfile\nFROM python:3.11-slim           # Base image (Operating System + Python)\nWORKDIR /app                    # Set working directory inside the container\nCOPY requirements.txt .         # Copy the file listing all Python packages\nRUN pip install -r requirements.txt  # Install all packages during the build\nCOPY . .                        # Copy your entire application code\nEXPOSE 8080                     # Tell Docker the app uses port 8080\nCMD [\"python\", \"app.py\"]        # The command to start the application\n```\n\n### 4. Docker Compose\nWhen your ML system has multiple services (a web server + a database + a model serving API), Docker Compose lets you define and start ALL of them with a single `docker-compose up` command using a `docker-compose.yml` file.",
        eli5: "Docker is like shipping containers for software. A shipping container standardizes how goods are transported \u2014 regardless of what's inside, it fits on any truck, train, or ship. Docker does the same for your code."
      },
      why: {
        text: "Without Docker, your model works on your laptop but fails in production because the server has Python 3.8 and you have 3.11. Docker eliminates the 'It works on my machine' problem permanently.",
        tip: "Always use a specific base image version (e.g., `python:3.11.4-slim`) rather than `python:latest` in your Dockerfile. Using `latest` means tomorrow's build might use a completely different Python version, breaking your app."
      },
      code: {
        code: "# This is a Python script that simulates building and running Docker concepts.\n# In a real environment, you'd run these commands in your terminal.\n\nprint(\"=== Docker Workflow for ML Deployment ===\\n\")\n\ndockerfile_content = '''\nFROM python:3.11-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install -r requirements.txt --no-cache-dir\nCOPY model.pkl .\nCOPY app.py .\nEXPOSE 8000\nCMD [\"uvicorn\", \"app:app\", \"--host\", \"0.0.0.0\", \"--port\", \"8000\"]\n'''\n\nrequirements = '''\nfastapi==0.104.1\nuvicorn==0.24.0\nscikit-learn==1.3.0\nnumpy==1.26.0\n'''\n\nprint(\"Dockerfile contents:\")\nprint(dockerfile_content)\n\nprint(\"\\nTerminal Commands to build and run:\")\nprint(\"1. docker build -t my-ml-model:v1.0 .\")\nprint(\"2. docker run -p 8000:8000 my-ml-model:v1.0\")\nprint(\"3. docker push username/my-ml-model:v1.0  # Push to Docker Hub\")\nprint(\"\\nYour ML API is now live and accessible at http://localhost:8000\")"
      },
      examNotes: {
        examNotes: [
          "A Docker Image is immutable (read-only); a Container is a live, running instance.",
          "Docker containers share the host OS kernel, making them significantly lighter than Virtual Machines.",
          "Docker Compose manages multi-container applications with a single YAML configuration file."
]
      },
      quiz: {
        quiz: [
          {
            question: "What is the fundamental difference between a Docker Image and a Docker Container?",
            options: ["A Docker Image runs live applications; a Container is a static file.", "A Docker Image is a read-only, static blueprint defined by a Dockerfile; a Docker Container is a live, running instance created from that Image.", "Docker Containers can only run on Linux; Images run on any OS.", "Docker Images are stored in the cloud; Containers only exist on local machines."],
            correctIndex: 1,
            explanation: "A Docker Image is an immutable template (a snapshot of code + dependencies). When you run a Docker Image, Docker creates a writable layer on top of it \u2014 this live, running process is called a Container."
          }
        ]
      }
    }
  },
  {
    id: 'ml-git',
    slug: 'git',
    title: 'Git Version Control For ML',
    description: "Branches, Merges, Conflicts, and Collaborative Workflows.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "Git is a Distributed Version Control System. It tracks every change made to your code, allowing you to revert mistakes, collaborate with teams, and maintain a complete history of your project.\n\n```mermaid\ngitGraph\n   commit id: \"Initial Project\"\n   commit id: \"EDA Notebook\"\n   branch feature/model-training\n   commit id: \"Added Ridge Regression\"\n   commit id: \"Hyperparameter Tuning\"\n   checkout main\n   commit id: \"Fix data loading bug\"\n   merge feature/model-training id: \"Merge Model\"\n   commit id: \"Deploy to AWS\"\n```\n\n### 1. Core Concepts\n- **Repository (Repo)**: The project folder that Git is tracking (a hidden `.git` folder stores all history).\n- **Commit**: A snapshot of your project at a specific point in time, with a message describing what changed.\n- **Branch**: An independent line of development. The `main` branch is the stable, production branch.\n\n### 2. Essential Commands\n| Command | Purpose |\n|---|---|\n| `git init` | Initialize a new Git repository |\n| `git add .` | Stage ALL changed files for the next commit |\n| `git commit -m \"message\"` | Save a snapshot with a descriptive message |\n| `git push origin main` | Upload local commits to GitHub |\n| `git pull` | Download latest changes from the remote repo |\n| `git checkout -b new-branch` | Create and switch to a new branch |\n| `git merge branch-name` | Merge another branch into the current branch |\n| `git log --oneline` | View concise commit history |\n\n### 3. Resolving Merge Conflicts\nA **Merge Conflict** occurs when two branches modify the same line of the same file. Git cannot automatically decide which version to keep, so it marks the conflict and asks you to manually resolve it.\n```\n<<<<<<< HEAD (your branch)\nmodel = Ridge(alpha=1.0)\n=======\nmodel = Lasso(alpha=0.5)\n>>>>>>> feature/lasso-model (incoming branch)\n```\nYou must delete the conflict markers and choose the correct code.",
        eli5: "Git is a 'Save Game' system for your code. Every `git commit` creates a save point. If you break something, you can instantly rewind to any previous save point."
      },
      why: {
        text: "In professional ML teams, Git is absolutely non-negotiable. Every model experiment, data change, and code modification must be committed. GitHub also hosts your code so teammates can contribute simultaneously.",
        tip: "Write descriptive commit messages! 'Fixed stuff' tells you nothing in 6 months. 'Added polynomial features for interaction terms in house price model' is what you actually need."
      },
      code: {
        code: "# Simulating a Git workflow for an ML project\nprint(\"=== Complete Git Workflow for ML Project ===\\n\")\n\nworkflow = [\n    (\"git init\", \"Initialize a new repository\"),\n    (\"git add .\", \"Stage all files (train.py, model.pkl, requirements.txt)\"),\n    ('git commit -m \"Initial project: EDA and baseline model\"', \"First commit\"),\n    (\"git checkout -b feature/xgboost\", \"Create a feature branch for XGBoost experiments\"),\n    ('git commit -m \"Add XGBoost with hyperparameter tuning\"', \"Commit XGBoost work\"),\n    (\"git checkout main\", \"Switch back to the main branch\"),\n    (\"git merge feature/xgboost\", \"Merge XGBoost into main branch\"),\n    (\"git push origin main\", \"Upload to GitHub for team access and CI/CD triggers\"),\n]\n\nfor cmd, desc in workflow:\n    print(f\"$ {cmd}\")\n    print(f\"  -> {desc}\\n\")"
      },
      examNotes: {
        examNotes: [
          "A branch is an independent parallel version of the codebase; merging integrates it back.",
          "Merge Conflicts must be manually resolved when two branches edit the same file lines.",
          "git add stages changes; git commit saves them; git push uploads to the remote repository."
]
      },
      quiz: {
        quiz: [
          {
            question: "In a Git workflow, what triggers a Merge Conflict?",
            options: ["Running `git push` without first running `git pull`.", "Committing a file that is larger than 100MB.", "Two different branches have both modified the exact same lines of the same file, and Git cannot automatically determine which version is correct.", "Having more than 10 open branches simultaneously."],
            correctIndex: 2,
            explanation: "Git automatically merges branches that touch different parts of the code. A conflict only occurs when two branches have divergently changed the exact same lines of the same file, requiring a human to decide the correct version."
          }
        ]
      }
    }
  },
  {
    id: 'ml-mlops-aws',
    slug: 'mlops-aws',
    title: 'End-to-End ML Project with AWS Deployment',
    description: "Project Structure, Pipelines, Logging, and Cloud Deployment.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "A production ML project has a very specific structure built for reliability, maintainability, and scalability.\n\n### 1. Professional Project Structure\n```\nml_project/\n\u251c\u2500\u2500 src/\n\u2502   \u251c\u2500\u2500 components/\n\u2502   \u2502   \u251c\u2500\u2500 data_ingestion.py     # Load data from database/S3/APIs\n\u2502   \u2502   \u251c\u2500\u2500 data_transformation.py  # Feature Engineering Pipeline\n\u2502   \u2502   \u251c\u2500\u2500 model_trainer.py      # Train & evaluate models\n\u2502   \u2502   \u2514\u2500\u2500 model_evaluator.py    # Compare models, select champion\n\u2502   \u251c\u2500\u2500 pipeline/\n\u2502   \u2502   \u251c\u2500\u2500 training_pipeline.py  # Orchestrates all components\n\u2502   \u2502   \u2514\u2500\u2500 prediction_pipeline.py # Unpickles model, serves predictions\n\u2502   \u251c\u2500\u2500 exception.py              # Custom error handling\n\u2502   \u2514\u2500\u2500 logger.py                 # Structured logging\n\u251c\u2500\u2500 notebooks/                    # EDA and experiments\n\u251c\u2500\u2500 artifacts/                    # Saved models, preprocessors, reports\n\u251c\u2500\u2500 app.py                        # FastAPI/Flask web server\n\u251c\u2500\u2500 Dockerfile                    # Container definition\n\u251c\u2500\u2500 setup.py                      # Makes the project installable\n\u2514\u2500\u2500 requirements.txt              # Package dependencies\n```\n\n### 2. Logging and Exception Handling\nProduction code must never fail silently.\n- **Logging**: Use Python's `logging` module to record every event with a timestamp, severity (INFO, WARNING, ERROR), and the file/line number where it occurred.\n- **Custom Exceptions**: Wrap all component calls in try/except blocks that raise descriptive custom exceptions with the source file and line number embedded.\n\n### 3. Deployment Pipeline (AWS)\n1. **GitHub Actions (CI/CD)**: When you push code to GitHub, a workflow is triggered.\n2. **Build Docker Image**: GitHub Actions builds the Docker image from your Dockerfile.\n3. **Push to AWS ECR (Elastic Container Registry)**: The image is pushed to AWS's private Docker Image repository.\n4. **Deploy to EC2**: AWS EC2 (a cloud virtual machine) pulls the latest image from ECR and runs it as a live container.\n5. **AWS Elastic Beanstalk**: A simpler option that manages the EC2 infrastructure for you, handling load balancing and auto-scaling automatically.",
        eli5: "It's the difference between a science fair project and a real commercial product. The science fair project just needs to work once. The commercial product needs to work reliably 24 hours a day, handle 10,000 users, and automatically restart if it crashes."
      },
      why: {
        text: "GitHub Actions + Docker + AWS ECR + EC2 is the most common professional ML deployment pipeline in the industry. Understanding this stack makes you a 10x more valuable Data Scientist.",
        tip: "Log EVERYTHING. Model predictions, input data distributions, prediction latencies, errors. These logs are how you detect Data Drift and debug production failures."
      },
      code: {
        code: "import logging\nimport sys\nimport os\n\n# 1. Professional Logger Setup\nlogging.basicConfig(\n    format=\"[%(asctime)s] %(lineno)d %(name)s - %(levelname)s - %(message)s\",\n    level=logging.INFO,\n)\nlogger = logging.getLogger(__name__)\n\n# 2. Custom Exception with traceback info\ndef get_error_message(error, error_detail: sys):\n    _, _, exc_tb = error_detail.exc_info()\n    file_name = exc_tb.tb_frame.f_code.co_filename\n    line_number = exc_tb.tb_lineno\n    return f\"Error in [{file_name}] at line [{line_number}]: {str(error)}\"\n\nclass CustomException(Exception):\n    def __init__(self, error_message, error_detail: sys):\n        super().__init__(error_message)\n        self.error_message = get_error_message(error_message, error_detail)\n    def __str__(self):\n        return self.error_message\n\n# 3. Usage in a Component\nclass DataIngestion:\n    def __init__(self):\n        logger.info(\"DataIngestion component initialized.\")\n\n    def initiate_data_ingestion(self, source_path):\n        logger.info(f\"Starting data ingestion from: {source_path}\")\n        try:\n            # Simulating loading data\n            if not os.path.exists(source_path):\n                raise FileNotFoundError(f\"Source not found: {source_path}\")\n            logger.info(\"Data ingestion successful.\")\n        except Exception as e:\n            raise CustomException(e, sys)\n\n# --- Testing\ningestion = DataIngestion()\ntry:\n    ingestion.initiate_data_ingestion(\"data/train.csv\")\nexcept CustomException as e:\n    logger.error(f\"Pipeline Failed: {e}\")"
      },
      examNotes: {
        examNotes: [
          "setup.py makes a project pip-installable, enabling clean imports across the codebase.",
          "AWS ECR is a private Docker Image registry; EC2 is a cloud Virtual Machine that runs containers.",
          "CI/CD (Continuous Integration/Continuous Deployment) automates testing and deployment on every git push."
]
      },
      quiz: {
        quiz: [
          {
            question: "In a professional ML deployment pipeline, what is the purpose of AWS ECR (Elastic Container Registry)?",
            options: ["It is a cloud database for storing training data.", "It trains the ML model in the cloud using distributed GPUs.", "It is a private registry that stores and versions Docker Images, allowing cloud servers like EC2 to pull and run the latest application version.", "It is a monitoring tool for tracking model drift."],
            correctIndex: 2,
            explanation: "AWS ECR is Docker Hub's private enterprise alternative. After GitHub Actions builds your Docker Image, it pushes it to ECR. Your EC2 instance is then configured to pull the latest image from ECR and start a running container."
          }
        ]
      }
    }
  },
  {
    id: 'ml-mlops-mlflow',
    slug: 'mlops-mlflow',
    title: 'MLOps: ETL Pipelines, MLflow & Dagshub',
    description: "Data Versioning, Experiment Tracking, and Model Registry.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "MLOps (Machine Learning Operations) is the discipline of automating the end-to-end ML lifecycle \u2014 from data ingestion to production deployment to monitoring.\n\n### 1. ETL Pipelines (Extract, Transform, Load)\nAn ETL Pipeline is the automated data journey from raw source to clean training data.\n- **Extract**: Pull raw data from sources like MongoDB, PostgreSQL, REST APIs, or CSV files. \n- **Transform**: Apply Feature Engineering, validation, normalization, and schema checks.\n- **Load**: Write the clean, processed data to a data warehouse or artifact store.\n\n### 2. MLflow: Experiment Tracking\nWhen you run 50 different models (XGBoost with alpha=0.1, XGBoost with alpha=0.5, LightGBM, etc.), how do you compare them? This is Experiment Tracking.\nMLflow automatically logs for every single run:\n- **Parameters**: Hyperparameters (`learning_rate`, `max_depth`, `alpha`)\n- **Metrics**: Performance results (`RMSE`, `MAE`, `R2`, `AUC`)\n- **Artifacts**: The saved model itself (`model.pkl`)\n- **Source Code**: The exact Git commit that generated this run\n\n### 3. Dagshub: Remote MLflow Server\nMLflow by default saves experiment data locally. Dagshub is a free GitHub-like platform for ML that hosts a **remote MLflow tracking server** and provides **Data Version Control (DVC)**. This allows your entire team to see each other's experiment results in real-time.\n\n### 4. BentoML: Model Serving\nBentoML is a framework that takes a trained scikit-learn, XGBoost, or PyTorch model and automatically generates a fully-featured, optimized REST API with batching, caching, and observability. It packages the API into a Docker container with a single `bentoml build` command.",
        eli5: "Without MLflow, you are running 50 experiments in 50 Jupyter Notebooks, trying to remember which one had the best result. MLflow is an automatic laboratory notebook that records every experiment so you can compare them in a beautiful UI."
      },
      why: {
        text: "MLflow's Model Registry is the 'deployment switch'. You can register model versions as 'Staging', 'Production', or 'Archived'. Switching the production model requires no code change \u2014 just clicking 'Transition to Production' in the UI.",
        tip: "MLflow's tracking server stores artifacts (models) in a URI. If you are using Dagshub as the remote server, make sure your `MLFLOW_TRACKING_URI` environment variable is set correctly before running experiments."
      },
      code: {
        code: "import mlflow\nimport mlflow.sklearn\nfrom sklearn.linear_model import Ridge, Lasso\nfrom sklearn.datasets import make_regression\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import mean_squared_error\n\n# Setup MLflow\nmlflow.set_experiment(\"Housing-Price-Prediction\")\n\nX, y = make_regression(n_samples=200, n_features=10, noise=5, random_state=42)\nX_train, X_test, y_train, y_test = train_test_split(X, y)\n\n# Run 1: Ridge Regression\nwith mlflow.start_run(run_name=\"Ridge_alpha_1.0\"):\n    model = Ridge(alpha=1.0)\n    model.fit(X_train, y_train)\n    rmse = mean_squared_error(y_test, model.predict(X_test), squared=False)\n    \n    # Log hyperparameters\n    mlflow.log_param(\"model_type\", \"Ridge\")\n    mlflow.log_param(\"alpha\", 1.0)\n    # Log metric\n    mlflow.log_metric(\"rmse\", rmse)\n    # Log the entire model as an artifact\n    mlflow.sklearn.log_model(model, \"ridge_model\")\n    print(f\"Ridge RMSE: {rmse:.4f} | Run logged to MLflow!\")\n\n# Run 2: Lasso Regression\nwith mlflow.start_run(run_name=\"Lasso_alpha_0.5\"):\n    model = Lasso(alpha=0.5)\n    model.fit(X_train, y_train)\n    rmse = mean_squared_error(y_test, model.predict(X_test), squared=False)\n    \n    mlflow.log_param(\"model_type\", \"Lasso\")\n    mlflow.log_param(\"alpha\", 0.5)\n    mlflow.log_metric(\"rmse\", rmse)\n    mlflow.sklearn.log_model(model, \"lasso_model\")\n    print(f\"Lasso RMSE: {rmse:.4f} | Run logged to MLflow!\")"
      },
      examNotes: {
        examNotes: [
          "MLflow tracks Parameters (hyperparams), Metrics (performance), and Artifacts (model files) for every experiment run.",
          "DVC (Data Version Control) tracks changes to large data files and model binaries using Git-like commands.",
          "BentoML generates an optimized Docker container for model serving from a single Python decorator."
]
      },
      quiz: {
        quiz: [
          {
            question: "What is the primary purpose of MLflow Experiment Tracking in a Machine Learning project?",
            options: ["To automatically deploy models to AWS EC2 without manual intervention.", "To provide a version control system like Git for source code files.", "To automatically record the hyperparameters, performance metrics, and saved model artifacts for every single experiment run, enabling systematic comparison and reproducibility.", "To replace the need for Docker containers in production."],
            correctIndex: 2,
            explanation: "MLflow's core job is to act as a structured laboratory notebook for ML experiments. Each run is logged with all its configuration and results, so teams can reproducibly compare hundreds of experiments and identify the best-performing model."
          }
        ]
      }
    }
  }
];
