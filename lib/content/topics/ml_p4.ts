import { Topic } from '../../types/content';

export const mlTopicsP4: Topic[] = [
  {
    id: 'ml-nlp-foundations',
    slug: 'nlp-foundations',
    title: 'NLP: Tokenization & Text Preprocessing',
    description: "Tokenization, Stemming, Lemmatization, Stopwords, POS, and NER.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "Natural Language Processing (NLP) is the field of teaching computers to understand, interpret, and generate human language. Before any model can be trained, raw text must be cleaned and broken down into usable structures.\n\n### 1. Tokenization\nTokenization splits raw text into individual units called **Tokens** (usually words or subwords).\n- \"I love Machine Learning\" \u2192 `[\"I\", \"love\", \"Machine\", \"Learning\"]`\n- **Sentence Tokenization**: Split into sentences.\n- **Word Tokenization**: Split into words.\n\n### 2. Stopwords\nStopwords are extremely common words (the, is, in, at, a) that carry almost no semantic meaning. Removing them reduces noise and shrinks the vocabulary.\n\n### 3. Stemming (Aggressive Simplification)\nStemming cuts off the suffix of words using a simple rule-based algorithm.\n- \"running\", \"runner\", \"runs\" \u2192 all become **\"run\"**\n- Uses the **Porter Stemmer** or **Snowball Stemmer**.\n- **Flaw**: Sometimes produces non-words. \"university\" \u2192 \"univers\".\n\n### 4. Lemmatization (Intelligent Simplification)\nLemmatization converts a word to its dictionary base form (the **Lemma**).\n- \"running\" \u2192 \"run\", \"better\" \u2192 \"good\", \"mice\" \u2192 \"mouse\"\n- It uses a vocabulary (like WordNet) and part-of-speech context. Much slower but far more accurate than Stemming.\n\n### 5. Parts-of-Speech (POS) Tagging\nAssigning a grammatical label (Noun, Verb, Adjective, Adverb) to each token.\n\n### 6. Named Entity Recognition (NER)\nNER identifies and classifies real-world entities in text into pre-defined categories.\n- \"Apple was founded by Steve Jobs in Cupertino, California.\"\n- \u2192 `Apple (ORG)`, `Steve Jobs (PERSON)`, `Cupertino (GPE)`, `California (GPE)`\nNER powers information extraction, knowledge graphs, and search engines.",
        eli5: "Before a computer can understand a sentence, it's like learning to read. First you learn individual letters (tokenization), then you ignore all the 'umms' and 'ahs' (stopwords), and finally you simplify each word to its core meaning (lemmatization)."
      },
      why: {
        text: "NLP sits at the intersection of Linguistics and Machine Learning. Every modern AI assistant (Siri, Alexa, ChatGPT) relies on these foundational preprocessing techniques before any model even sees the data.",
        tip: "Always prefer Lemmatization over Stemming in production. Stemming is fast but creates gibberish non-words that confuse downstream models. Lemmatization produces real, dictionary-valid base words."
      },
      code: {
        code: "import nltk\nnltk.download('punkt', quiet=True)\nnltk.download('stopwords', quiet=True)\nnltk.download('wordnet', quiet=True)\nnltk.download('averaged_perceptron_tagger', quiet=True)\nnltk.download('maxent_ne_chunker', quiet=True)\nnltk.download('words', quiet=True)\n\nfrom nltk.tokenize import word_tokenize, sent_tokenize\nfrom nltk.corpus import stopwords\nfrom nltk.stem import PorterStemmer, WordNetLemmatizer\n\ntext = \"The scientists are running numerous experiments on the latest machine learning models.\"\n\n# 1. Tokenization\nwords = word_tokenize(text)\nprint(\"Tokens:\", words)\n\n# 2. Remove Stopwords\nstop_words = set(stopwords.words('english'))\nfiltered = [w for w in words if w.lower() not in stop_words]\nprint(\"After removing stopwords:\", filtered)\n\n# 3. Stemming (Aggressive)\nps = PorterStemmer()\nstemmed = [ps.stem(w) for w in filtered]\nprint(\"After Stemming:\", stemmed)\n\n# 4. Lemmatization (Intelligent)\nlem = WordNetLemmatizer()\nlemmatized = [lem.lemmatize(w, pos='v') for w in filtered]\nprint(\"After Lemmatization:\", lemmatized)"
      },
      examNotes: {
        examNotes: [
          "Stemming uses rule-based suffix removal; Lemmatization uses a vocabulary dictionary.",
          "NER classifies entities into categories: PERSON, ORG, GPE, DATE, MONEY.",
          "Stopword removal is a crucial preprocessing step but should be skipped for Sentiment Analysis (negation words like 'not' are stopwords but carry huge semantic weight)."
]
      },
      quiz: {
        quiz: [
          {
            question: "When performing Sentiment Analysis on movie reviews, why would removing Stopwords potentially harm the model's performance?",
            options: ["Because removing stopwords increases computation time.", "Because words like 'not', 'never', and 'no' are typically classified as stopwords, but removing them completely destroys the sentiment meaning (e.g., 'not good' becomes 'good').", "Because stopwords are required for Bag-of-Words vectorization.", "Because the Stanford CoreNLP library cannot process text without stopwords."],
            correctIndex: 1,
            explanation: "Negation words ('not', 'never', 'barely', 'hardly') are listed as stopwords in most libraries, but they are semantically critical for sentiment. 'I did not enjoy this film' has the opposite sentiment to 'I enjoy this film'."
          }
        ]
      }
    }
  },
  {
    id: 'ml-nlp-vectorization',
    slug: 'nlp-vectorization',
    title: 'Text Vectorization: BoW, N-Grams & TF-IDF',
    description: "Converting Text to Numbers for Machine Learning.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "ML algorithms cannot process raw text. We must convert text into numerical vectors. This process is called **Text Vectorization** (or Feature Extraction).\n\n### 1. One-Hot Encoding (OHE)\nThe simplest method. Each unique word in the vocabulary gets its own column. A document is represented as a binary vector (1 if word is present, 0 if absent).\n- **Major Flaw**: Creates astronomically large sparse matrices. 50,000 word vocabulary = 50,000 columns per document!\n\n### 2. Bag of Words (BoW)\nInstead of just presence (1/0), BoW counts how many times each word appears in each document.\n- Each document is represented as a vector of **word frequencies**.\n- Completely **ignores word order and context** (\"dog bites man\" = \"man bites dog\").\n\n### 3. N-Grams (Capturing Word Order)\nN-Grams extend BoW by treating sequences of N consecutive words as a single token.\n- **Bigrams (N=2)**: \"machine learning\", \"deep learning\", \"not good\" are treated as single features.\n- This partially solves the word order problem by preserving local context.\n\n### 4. TF-IDF (Term Frequency-Inverse Document Frequency)\nBoW's flaw: Common words like \"movie\" appear in every movie review and get a high count, making them seem important when they are not.\nTF-IDF assigns a **weighted score** that rewards words that are frequent in *one document* but rare across *all documents*.\n$$TF\\text{-}IDF(t, d) = TF(t, d) \\times \\log\\left(\\frac{N}{df(t)}\\right)$$\n- $TF(t, d)$: Term Frequency. How often does word $t$ appear in document $d$?\n- $N$: Total number of documents.\n- $df(t)$: Number of documents containing word $t$.\n- A word that appears 10 times in ONE review but in only 2 of 1000 total reviews gets a very high TF-IDF score.\n- A common word like \"the\" appears in all 1000 reviews, so $\\log(1000/1000) = \\log(1) = 0$. Its score is zero!",
        eli5: "TF-IDF is a librarian's wisdom. If you want to find a book's topic, you don't search for the most common words (the, is, a). You search for the words that appear very often in THAT book but rarely in all the other books in the library."
      },
      why: {
        text: "TF-IDF is the industry standard vectorizer for classical NLP tasks (spam filtering, document search, news classification) and consistently outperforms BoW.",
        tip: "Always use `max_features` when creating a TF-IDF vectorizer. Uncapped vocabularies can create matrices with hundreds of thousands of columns, consuming gigabytes of RAM."
      },
      code: {
        code: "from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer\nimport numpy as np\n\n# A mini corpus of documents\ncorpus = [\n    \"I love machine learning algorithms\",\n    \"Machine learning is the future of technology\",\n    \"Deep learning is a subset of machine learning\",\n    \"I hate spam emails about free money\"\n]\n\n# 1. Bag of Words (CountVectorizer)\ncv = CountVectorizer(max_features=20)\nbow_matrix = cv.fit_transform(corpus)\nprint(\"Bag of Words Feature Names:\", cv.get_feature_names_out()[:10])\n\n# 2. TF-IDF Vectorizer with Bigrams (N=2)\ntfidf = TfidfVectorizer(ngram_range=(1, 2), max_features=30)\ntfidf_matrix = tfidf.fit_transform(corpus)\n\n# Show TF-IDF scores for the first document\ndoc1_scores = dict(zip(tfidf.get_feature_names_out(), np.array(tfidf_matrix[0].todense()).flatten()))\n# Sort by score and show top features\ntop_features = sorted(doc1_scores.items(), key=lambda x: x[1], reverse=True)[:5]\nprint(\"\\nTop TF-IDF features for Doc 1:\")\nfor word, score in top_features:\n    if score > 0:\n        print(f\"  '{word}': {score:.3f}\")"
      },
      examNotes: {
        examNotes: [
          "TF is high when a word appears often in a document. IDF is high when a word appears in few documents. TF-IDF is their product.",
          "N-Gram range of (1,2) captures both single words (unigrams) and two-word sequences (bigrams).",
          "BoW produces a sparse matrix (mostly zeros) because no single document contains all vocabulary words."
]
      },
      quiz: {
        quiz: [
          {
            question: "A word appears 50 times in one document, but appears in every single one of the 10,000 documents in the corpus. What will its TF-IDF score be?",
            options: ["Very high, because it has a high Term Frequency.", "Zero (or near zero), because log(10000/10000) = log(1) = 0, making the IDF component zero.", "Exactly 50.", "Negative, because the IDF will penalize it."],
            correctIndex: 1,
            explanation: "The IDF component is log(N/df). If a word appears in ALL N documents, then N/df = N/N = 1, and log(1) = 0. This mathematically zeroes out words that are too common across all documents to be meaningful."
          }
        ]
      }
    }
  },
  {
    id: 'ml-nlp-word2vec',
    slug: 'nlp-word2vec',
    title: 'Word Embeddings & Word2Vec',
    description: "Dense Vectors, CBOW, Skip-Gram, and AvgWord2Vec.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "TF-IDF and BoW create massive, sparse vectors that do not capture semantic meaning. The word 'King' and 'Queen' would be completely unrelated vectors, despite being semantically similar. Word Embeddings solve this.\n\n### 1. What are Word Embeddings?\nInstead of a massive binary/count vector (50,000 dimensions), each word is mapped to a small, **dense vector** of real numbers (e.g., 100 or 300 dimensions).\n- These dense vectors place semantically similar words physically close to each other in vector space!\n- Famous example: `King - Man + Woman \u2248 Queen` (Vector Arithmetic!)\n\n### 2. Word2Vec (Training Embeddings from Scratch)\nWord2Vec learns embeddings by predicting word context. Two architectures:\n\n**CBOW (Continuous Bag of Words)**:\nGiven the surrounding context words, predict the missing center word.\n- \"The cat sat on the ___\" \u2192 predict \"mat\"\n- Good for smaller datasets.\n\n**Skip-Gram**:\nGiven the center word, predict the surrounding context words.\n- \"mat\" \u2192 predict [\"The\", \"cat\", \"sat\", \"on\", \"the\"]\n- Good for larger datasets and rare words.\n\n```mermaid\ngraph LR\n    A[Context Words] --> B[CBOW Model] --> C[Predict Center Word]\n    D[Center Word] --> E[Skip-Gram Model] --> F[Predict Context Words]\n```\n\n### 3. AvgWord2Vec (Sentence Vectors)\nWord2Vec creates a vector for each individual word. But how do we get a vector for an entire sentence or document?\n**AvgWord2Vec** simply takes the element-wise **average** of all word vectors in the document to create a single fixed-size vector representing the whole document. This vector is then fed into a classifier.\n\n### 4. Advantages Over BoW/TF-IDF\n- Captures semantic relationships (synonyms, analogies).\n- Creates dense (not sparse) vectors, which are computationally much more efficient.\n- Pre-trained embeddings (Word2Vec, GloVe, FastText) transfer knowledge across tasks.",
        eli5: "Instead of giving each word an ID card with a number, Word2Vec gives each word a 100-dimensional GPS coordinate in meaning-space. Words that mean similar things live close to each other on the map."
      },
      why: {
        text: "Pre-trained Word2Vec embeddings trained on Google News (3 billion words) are publicly available. You can download them and instantly have excellent representations for any word, even if your own dataset is tiny.",
        tip: "Always pre-train or fine-tune your embeddings on domain-specific data if possible. Medical or legal text uses very different language from general news articles, and general-purpose embeddings will underperform."
      },
      code: {
        code: "from gensim.models import Word2Vec\nimport numpy as np\n\n# 1. Build a small training corpus (tokenized sentences)\ncorpus = [\n    \"machine learning is amazing\",\n    \"deep learning is a type of machine learning\",\n    \"neural networks are the basis of deep learning\",\n    \"machine learning models predict on new data\",\n    \"king and queen are royalty\",\n    \"man and woman are humans\"\n]\ntokenized = [sentence.split() for sentence in corpus]\n\n# 2. Train Word2Vec (Skip-Gram, sg=1)\n# vector_size=50: each word gets a 50-dimensional vector\n# window=3: context window of 3 words on each side\n# min_count=1: include words with only 1 occurrence\nmodel = Word2Vec(tokenized, vector_size=50, window=3, min_count=1, sg=1, epochs=100)\n\nprint(\"Vector for 'machine' (first 5 dims):\", model.wv['machine'][:5])\n\n# Find most similar words\nsimilar = model.wv.most_similar('learning', topn=3)\nprint(\"\\nWords most similar to 'learning':\")\nfor word, score in similar:\n    print(f\"  {word}: {score:.3f}\")\n\n# 3. AvgWord2Vec for a document\ndef avg_word2vec(sentence, model, vector_size=50):\n    words = sentence.split()\n    vectors = [model.wv[w] for w in words if w in model.wv]\n    if vectors:\n        return np.mean(vectors, axis=0)\n    return np.zeros(vector_size)\n\ndoc_vector = avg_word2vec(\"machine learning models\", model)\nprint(f\"\\nDocument vector shape: {doc_vector.shape}\")"
      },
      examNotes: {
        examNotes: [
          "Word2Vec learns from context. CBOW predicts the center word; Skip-Gram predicts surrounding words.",
          "AvgWord2Vec averages all word vectors in a document to create a single fixed-length sentence vector.",
          "Skip-Gram outperforms CBOW for rare words and large datasets."
]
      },
      quiz: {
        quiz: [
          {
            question: "Which architecture of Word2Vec takes a single center word as input and tries to predict all the surrounding context words?",
            options: ["CBOW (Continuous Bag of Words)", "GloVe (Global Vectors)", "AvgWord2Vec", "Skip-Gram"],
            correctIndex: 3,
            explanation: "Skip-Gram takes the center/target word as input and trains the model to predict what words typically surround it. CBOW does the opposite: it takes all the context words and predicts the missing center word."
          }
        ]
      }
    }
  },
  {
    id: 'ml-nlp-projects',
    slug: 'nlp-projects',
    title: 'NLP Projects: Spam Detection & Sentiment Analysis',
    description: "Spam/Ham with BoW & TF-IDF, Kindle Sentiment with Word2Vec.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "The best way to solidify NLP knowledge is to build real projects. We will build two classic NLP projects that directly demonstrate the different vectorization techniques.\n\n### Project 1: Spam/Ham Classifier (BoW & TF-IDF)\n**Problem**: Given an SMS message, classify it as Spam or Ham (not spam).\n**Dataset**: The classic SMS Spam Collection Dataset (5,574 messages).\n\n```mermaid\ngraph LR\n    A[Raw Text Messages] --> B[Lowercase + Punctuation Removal]\n    B --> C[Tokenization]\n    C --> D[Stopword Removal]\n    D --> E[Stemming / Lemmatization]\n    E --> F1[BoW Vectorizer]\n    E --> F2[TF-IDF Vectorizer]\n    F1 --> G[Multinomial Naive Bayes]\n    F2 --> G\n    G --> H[Spam or Ham?]\n```\n\n**Best Model**: Multinomial Naive Bayes + TF-IDF consistently achieves >97% accuracy on this dataset.\n\n### Project 2: Kindle Review Sentiment Analysis (Word2Vec)\n**Problem**: Given an Amazon Kindle book review, predict if the sentiment is Positive (rating >= 4) or Negative (rating <= 2).\n**Dataset**: Amazon Reviews dataset.\n\n**Pipeline**:\n1. Clean text (lowercase, remove HTML tags, punctuation).\n2. Train Word2Vec model on the corpus.\n3. Convert each review to a fixed-size vector using AvgWord2Vec.\n4. Train a Random Forest or Logistic Regression classifier on the vectors.\n\n**Best Practices**:\n- For Sentiment Analysis, **DO NOT remove negation stopwords** (not, never, no).\n- Word2Vec embedding quality improves dramatically with larger datasets.",
        eli5: "Project 1 is like teaching a computer to sort your physical mail: junk mail goes in the bin, important letters go on your desk. Project 2 is teaching it to read Goodreads book reviews and say 'the readers liked it' or 'they hated it'."
      },
      why: {
        text: "These two projects are the most commonly cited NLP projects in Data Science portfolios and job interviews. Mastering them demonstrates the complete NLP preprocessing and modeling pipeline.",
        tip: "Always check the class balance of your NLP dataset before training. The SMS Spam dataset is ~87% Ham and only ~13% Spam. Using accuracy alone will be misleading; use F1-Score and ROC-AUC."
      },
      code: {
        code: "from sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.naive_bayes import MultinomialNB\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import classification_report\n\n# Simulated SMS Spam Dataset\nmessages = [\n    \"WINNER!! As a valued network customer you have been selected to receivea prize\",\n    \"Hi, are you coming to dinner tonight? Let me know\",\n    \"Free entry in a weekly competition. Text WIN to 12345 to get your prize now!\",\n    \"Can I call you later? I'm in a meeting\",\n    \"Claim your lottery winnings. Click the link to get your 1000 dollar prize\",\n    \"Hey, the project meeting is tomorrow at 10am\",\n    \"You have won a free holiday. Provide your credit card number to claim\",\n    \"What time does your flight arrive? I'll pick you up\",\n]\nlabels = [1, 0, 1, 0, 1, 0, 1, 0]  # 1=Spam, 0=Ham\n\nX_train, X_test, y_train, y_test = train_test_split(messages, labels, test_size=0.3, random_state=42)\n\n# Build a Scikit-Learn Pipeline for Spam Detection\nspam_pipeline = Pipeline([\n    ('tfidf', TfidfVectorizer(ngram_range=(1,2), max_features=5000)),\n    ('nb', MultinomialNB(alpha=0.1))\n])\n\nspam_pipeline.fit(X_train, y_train)\npreds = spam_pipeline.predict(X_test)\n\nprint(\"=== Spam/Ham Classifier Results ===\")\nprint(classification_report(y_test, preds, target_names=[\"Ham\", \"Spam\"]))\n\n# Test on a new message\nnew_msgs = [\"You won a free prize! Claim now!\", \"Are you free for lunch tomorrow?\"]\npredictions = spam_pipeline.predict(new_msgs)\nfor msg, pred in zip(new_msgs, predictions):\n    print(f\"'{msg}' -> {'SPAM' if pred == 1 else 'HAM'}\")"
      },
      examNotes: {
        examNotes: [
          "TF-IDF + Multinomial Naive Bayes is the classic and highly effective baseline for text classification.",
          "Sentiment Analysis should not remove stopwords like 'not' and 'never' as they change meaning.",
          "AvgWord2Vec creates a fixed-size document vector by averaging individual word vectors."
]
      },
      quiz: {
        quiz: [
          {
            question: "Why does TF-IDF outperform Bag-of-Words (raw word counts) for the Spam/Ham classification task?",
            options: ["TF-IDF creates sparse matrices while BoW creates dense matrices, saving memory.", "TF-IDF downweights words that appear in almost every message (like 'you', 'your', 'the'), while heavily weighting words that are specific to spam messages (like 'winner', 'prize', 'claim'), making the features more discriminative.", "BoW cannot handle bigrams (N-Grams).", "TF-IDF is always better than BoW regardless of the task."],
            correctIndex: 1,
            explanation: "TF-IDF's IDF component mathematically penalizes words that appear in many documents (generic, non-discriminative words), while rewarding words that are concentrated in a smaller subset of documents (like spam-specific keywords)."
          }
        ]
      }
    }
  }
];
