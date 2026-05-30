import { Topic } from '../../types/content';

export const deepLearningTopics: Topic[] = [
  {
    id: 'dl-intro',
    slug: 'introduction',
    title: 'Deep Learning Introduction',
    description: "Perceptron, ANN, Back Propagation, Activation Functions, Loss Functions, Optimizers, Dropout, CNN Basics.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "Deep Learning is a subset of machine learning based on artificial neural networks with multiple layers.\n\n### Key Concepts Covered:\n- **The Perceptron**: The fundamental unit of a neural network, mimicking a biological neuron. It takes inputs, multiplies by weights, adds a bias, and passes it through an activation function.\n- **Artificial Neural Networks (ANN)**: Stacking perceptrons into hidden layers. Used primarily for tabular data.\n- **Forward & Back Propagation**: Forward prop makes a prediction; Backprop uses calculus (the Chain Rule) to update weights backward based on the error.\n- **Activation Functions**: Sigmoid, Tanh, ReLU, Leaky ReLU. ReLU is the standard for hidden layers because it solves the Vanishing Gradient problem.\n- **Loss Functions & Optimizers**: MSE for regression, Categorical Crossentropy for classification. Adam is the go-to optimizer, combining momentum and RMSprop.\n- **Dropout**: A regularization technique where random neurons are 'dropped' during training to prevent overfitting.",
        eli5: "If Machine Learning is teaching a computer to follow a recipe, Deep Learning is giving a computer a million recipes and letting it figure out how to become a master chef on its own."
      },
      why: {
        text: "Deep Learning completely revolutionized AI. It is the only algorithm class that continues to improve as you feed it more data, completely dominating Computer Vision and NLP.",
        tip: "Never use Sigmoid in the hidden layers of a deep network! It squashes the gradients to near zero, stopping the network from learning. Use ReLU instead."
      },
      code: {
        code: "import tensorflow as tf\nfrom tensorflow.keras.models import Sequential\nfrom tensorflow.keras.layers import Dense, Dropout\n\n# Building a simple Artificial Neural Network (ANN)\nmodel = Sequential([\n    Dense(64, activation='relu', input_shape=(10,)), # Hidden layer 1\n    Dropout(0.2), # Regularization\n    Dense(32, activation='relu'), # Hidden layer 2\n    Dense(1, activation='sigmoid') # Output layer for binary classification\n])\n\nmodel.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])\n# model.fit(X_train, y_train, epochs=10, batch_size=32)"
      },
      examNotes: {
        examNotes: [
          "Backpropagation uses the chain rule of calculus to compute the gradient of the loss function with respect to each weight.",
          "The Vanishing Gradient Problem occurs when gradients become so small that early layers stop learning.",
          "Adam optimizer automatically adjusts the learning rate for each parameter."
        ]
      },
      quiz: {
        quiz: [
          {
            question: "Why is the ReLU (Rectified Linear Unit) activation function preferred over Sigmoid in the hidden layers of deep neural networks?",
            options: ["It outputs values between 0 and 1", "It helps prevent the Vanishing Gradient problem", "It is computationally more expensive", "It forces the model to be linear"],
            correctIndex: 1,
            explanation: "ReLU outputs the input directly if it is positive, meaning the gradient is exactly 1. This prevents the gradients from vanishing as they are multiplied back through the layers, a common issue with Sigmoid."
          }
        ]
      }
    }
  },
  {
    id: 'dl-ann-project',
    slug: 'ann-project',
    title: 'End to End DL Project Using ANN',
    description: "Classification Problem, Feature Transformation, Streamlit Web App Deployment.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "This module bridges theory and practice by building a complete end-to-end classification project using an Artificial Neural Network.\n\n### Key Concepts Covered:\n- **Data Preprocessing for Deep Learning**: Neural networks are extremely sensitive to unscaled data. We apply robust Feature Transformation (StandardScaler/MinMaxScaler).\n- **Model Checkpointing & Callbacks**: Using Keras Callbacks to save the best model weights during training and applying Early Stopping to prevent overfitting.\n- **Streamlit Deployment**: Taking the trained `.h5` model and deploying it to the web using Streamlit, allowing users to input raw data and get real-time predictions.",
        eli5: "We take everything we learned about basic neural networks and actually build a functioning app that real people can use on the internet."
      },
      why: {
        text: "A model sitting in a Jupyter Notebook provides zero business value. MLOps and deployment are what separate beginners from professionals.",
        tip: "When saving a model, always save the StandardScaler object (e.g., using `pickle`) as well! If you don't scale the user's input data exactly how you scaled the training data, your model will predict garbage."
      },
      code: {
        code: "from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint\n\n# Define callbacks\nearly_stop = EarlyStopping(monitor='val_loss', patience=5, restore_best_weights=True)\ncheckpoint = ModelCheckpoint('best_model.h5', monitor='val_loss', save_best_only=True)\n\n# Train model with callbacks\n# history = model.fit(X_train_scaled, y_train, validation_split=0.2, \n#                     epochs=100, callbacks=[early_stop, checkpoint])\n\n# To load in Streamlit later:\n# from tensorflow.keras.models import load_model\n# loaded_model = load_model('best_model.h5')"
      },
      examNotes: {
        examNotes: [
          "Early Stopping monitors a validation metric (like val_loss) and stops training if it doesn't improve for 'patience' epochs.",
          "Feature scaling is mandatory for Neural Networks to ensure fast and stable convergence of Gradient Descent.",
          "HDF5 (.h5) is a popular format for saving entire Keras models, including weights, architecture, and optimizer state."
        ]
      },
      quiz: {
        quiz: [
          {
            question: "What is the primary purpose of the 'Early Stopping' callback during neural network training?",
            options: ["To make the code run faster by skipping epochs", "To halt training when the validation loss stops improving, preventing overfitting", "To stop the script if an error occurs", "To pause training so the user can inspect weights"],
            correctIndex: 1,
            explanation: "Early Stopping prevents overfitting. If the model continues training, training loss will decrease, but validation loss will eventually rise. Early stopping catches the model at its optimal generalization point."
          }
        ]
      }
    }
  },
  {
    id: 'dl-rnn',
    slug: 'simple-rnn',
    title: 'Simple RNN Indepth Intuition',
    description: "RNN Architecture, Forward/Backward Propagation With Time, Problems With RNN.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "Recurrent Neural Networks (RNNs) are designed for sequence data (time series, text, audio). Unlike ANNs, RNNs have a 'memory'.\n\n### Key Concepts Covered:\n- **Sequential Data**: Data where order matters. 'I love dogs' vs 'Dogs love I'.\n- **RNN Architecture**: The hidden state from the previous time step ($h_{t-1}$) is fed as an input to the current time step alongside the new data ($x_t$).\n- **Backpropagation Through Time (BPTT)**: The algorithm used to train RNNs, unrolling the network across time steps to calculate gradients.\n- **The Exploding & Vanishing Gradient Problem**: Because gradients are multiplied repeatedly across many time steps, they either explode to infinity (causing NaN) or vanish to zero (causing the network to forget long-term dependencies).",
        eli5: "Reading a book word by word. An ANN forgets the previous word immediately. An RNN remembers what it just read and combines it with the current word to understand the context."
      },
      why: {
        text: "Standard neural networks assume all inputs are independent of each other. This makes them useless for translating languages or predicting stock prices where past data dictates future results.",
        tip: "Simple RNNs are rarely used in production anymore because of the vanishing gradient problem. They typically can't 'remember' context past 10-20 steps. We use LSTMs or Transformers instead."
      },
      code: {
        code: "from tensorflow.keras.models import Sequential\nfrom tensorflow.keras.layers import SimpleRNN, Dense\n\n# Input shape: (timesteps, features)\nmodel = Sequential([\n    SimpleRNN(32, input_shape=(10, 1), return_sequences=False),\n    Dense(1)\n])\n\nmodel.compile(optimizer='adam', loss='mse')\nmodel.summary()"
      },
      examNotes: {
        examNotes: [
          "RNNs share the same weights across all time steps.",
          "Gradient clipping is a common technique used to solve the Exploding Gradient problem in RNNs.",
          "BPTT (Backpropagation Through Time) unfolds the recurrent network in time to apply standard backpropagation."
        ]
      },
      quiz: {
        quiz: [
          {
            question: "What is the primary reason Simple RNNs struggle to learn long-term dependencies in sequence data?",
            options: ["They require too much memory", "The Vanishing Gradient Problem during Backpropagation Through Time", "They cannot process categorical data", "They only work on image data"],
            correctIndex: 1,
            explanation: "As the gradient is passed backward through many time steps, it is repeatedly multiplied by weights. If these weights are small, the gradient shrinks exponentially (vanishes), preventing the network from learning correlations between distant events."
          }
        ]
      }
    }
  },
  {
    id: 'dl-lstm-gru',
    slug: 'lstm-gru',
    title: 'LSTM And GRU RNN',
    description: "LSTM Architecture, Forget Gate, Input Gate, Output Gate, GRU Intuition.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "Long Short-Term Memory (LSTM) and Gated Recurrent Units (GRU) are advanced RNN architectures designed specifically to solve the Vanishing Gradient problem.\n\n### Key Concepts Covered:\n- **The Cell State**: The 'conveyor belt' that runs straight down the entire chain, allowing information to flow unchanged across hundreds of time steps.\n- **The 3 Gates of LSTM**:\n  - *Forget Gate*: Decides what information to throw away from the cell state.\n  - *Input Gate*: Decides what new information to store in the cell state.\n  - *Output Gate*: Decides what parts of the cell state to output as the hidden state.\n- **GRU (Gated Recurrent Unit)**: A newer, simplified version of LSTM. It merges the forget and input gates into a single 'Update Gate'. It trains faster and often performs just as well.",
        eli5: "An LSTM is an RNN with a smart notepad. It uses mathematical 'gates' to decide exactly what notes to write down, what to erase, and what to read back out."
      },
      why: {
        text: "If you want to generate text, translate languages, or predict stock trends spanning years, LSTMs are the foundational building blocks.",
        tip: "If you are struggling with training time, swap your LSTM layers for GRU layers. They have fewer parameters and train significantly faster with comparable accuracy."
      },
      code: {
        code: "from tensorflow.keras.models import Sequential\nfrom tensorflow.keras.layers import LSTM, GRU, Dense\n\n# LSTM Model\nlstm_model = Sequential([\n    LSTM(64, return_sequences=True, input_shape=(50, 1)), # Returns sequence to next LSTM\n    LSTM(32),\n    Dense(1)\n])\n\n# GRU Model (Lighter, faster)\ngru_model = Sequential([\n    GRU(64, input_shape=(50, 1)),\n    Dense(1)\n])"
      },
      examNotes: {
        examNotes: [
          "The Forget Gate uses a Sigmoid activation function to output a value between 0 (completely forget) and 1 (completely keep).",
          "The Cell State ($C_t$) is the internal memory of the LSTM.",
          "GRUs have two gates: Reset Gate and Update Gate."
        ]
      },
      quiz: {
        quiz: [
          {
            question: "In an LSTM cell, which mechanism specifically decides what information should be discarded from the cell state?",
            options: ["Input Gate", "Forget Gate", "Output Gate", "Update Gate"],
            correctIndex: 1,
            explanation: "The Forget Gate looks at the previous hidden state and the current input, passes them through a sigmoid function, and outputs a number between 0 and 1 for each number in the cell state (0 = forget completely)."
          }
        ]
      }
    }
  },
  {
    id: 'dl-seq2seq',
    slug: 'encoder-decoder',
    title: 'Encoder Decoder (Seq2Seq)',
    description: "Sequence To Sequence Architecture, Problems With Encoder And Decoder.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "Sequence-to-Sequence (Seq2Seq) is an architecture used for translating one sequence into another (e.g., English to French).\n\n### Key Concepts Covered:\n- **The Encoder**: An RNN/LSTM that reads the input sequence one word at a time and compresses all its meaning into a single, fixed-size vector called the **Context Vector**.\n- **The Decoder**: Another RNN/LSTM that takes the Context Vector and begins generating the output sequence one word at a time, until it outputs an <EOS> (End of Sentence) token.\n- **The Problem**: The 'Information Bottleneck'. Forcing an entire paragraph of context into a single, fixed-size vector causes the model to 'forget' early parts of the sentence, severely limiting translation quality for long sentences.",
        eli5: "Imagine a translator who listens to an entire Spanish sentence, writes down a single summary symbol on a piece of paper (Context Vector), and hands it to a friend who uses only that symbol to speak the English translation."
      },
      why: {
        text: "This was the massive breakthrough that powered Google Translate from 2014-2016 before Attention mechanisms were invented.",
        tip: "Seq2Seq models usually require reversing the input sequence before feeding it to the encoder. This ensures the start of the input is closer to the start of the output, creating better gradients."
      },
      code: {
        code: "# Conceptual representation of Seq2Seq\nfrom tensorflow.keras.layers import Input, LSTM, Dense\nfrom tensorflow.keras.models import Model\n\n# ENCODER\nencoder_inputs = Input(shape=(None, 256))\nencoder_lstm = LSTM(128, return_state=True)\nencoder_outputs, state_h, state_c = encoder_lstm(encoder_inputs)\nencoder_states = [state_h, state_c] # The Context Vector\n\n# DECODER\ndecoder_inputs = Input(shape=(None, 256))\ndecoder_lstm = LSTM(128, return_sequences=True, return_state=True)\n# Init decoder with encoder states\ndecoder_outputs, _, _ = decoder_lstm(decoder_inputs, initial_state=encoder_states)"
      },
      examNotes: {
        examNotes: [
          "The Context Vector is the final hidden state of the Encoder.",
          "During inference, the output of the decoder at step t is fed back as the input to step t+1 (Auto-regressive generation).",
          "The fixed-length context vector is a major bottleneck for long sequences."
        ]
      },
      quiz: {
        quiz: [
          {
            question: "What is the primary architectural limitation of a standard Encoder-Decoder (Seq2Seq) model without Attention?",
            options: ["It cannot handle numeric data", "It forces all input information into a single fixed-length context vector, causing information loss on long sequences", "It cannot use LSTM cells", "It generates outputs randomly"],
            correctIndex: 1,
            explanation: "The encoder must compress the entire input sequence into a single hidden state vector. If the input is a 50-word sentence, this fixed-size bottleneck results in severe memory/context loss."
          }
        ]
      }
    }
  },
  {
    id: 'dl-attention',
    slug: 'attention-mechanism',
    title: 'Attention Mechanism',
    description: "Attention Mechanism Indepth Architecture Explanation.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "The Attention Mechanism was invented to solve the 'Information Bottleneck' of the Seq2Seq architecture.\n\n### Key Concepts Covered:\n- **The Core Idea**: Instead of compressing the entire input sentence into a *single* context vector, the Encoder passes *all* of its hidden states to the Decoder.\n- **Alignment Scores**: At every single step of generation, the Decoder looks at all Encoder states and calculates a 'score' for how important each word is for the current translation step.\n- **Dynamic Context Vector**: The Decoder creates a custom, weighted context vector for *every single word* it generates.\n- **Bahdanau vs Luong Attention**: The two primary methods for calculating the alignment scores.",
        eli5: "Instead of forcing the translator to memorize the whole sentence at once, Attention gives the translator a written copy of the original sentence and a highlighter, allowing them to look back at specific words whenever they need to."
      },
      why: {
        text: "Attention fundamentally changed Natural Language Processing. It proved that models don't need to forget; they just need to know *where to look*.",
        tip: "Attention completely solves the long-range dependency problem of LSTMs. Translation accuracy on long sentences skyrockets when Attention is added."
      },
      code: {
        code: "# Conceptual representation of Attention\n# (Often implemented via specific layers or custom Keras logic)\n# query = Decoder Hidden State\n# values = Encoder Hidden States\n\nimport tensorflow as tf\n\n# Example of Dot-Product Attention calculation\ndef dot_product_attention(query, keys, values):\n    # Calculate alignment scores: query dot keys\n    scores = tf.matmul(query, keys, transpose_b=True)\n    \n    # Softmax to get probability distribution (attention weights)\n    attention_weights = tf.nn.softmax(scores, axis=-1)\n    \n    # Multiply weights by values to get the context vector\n    context_vector = tf.matmul(attention_weights, values)\n    return context_vector"
      },
      examNotes: {
        examNotes: [
          "Attention calculates a probability distribution (via Softmax) over the input words.",
          "It allows the model to align source and target sequences dynamically.",
          "Attention essentially performs a fuzzy dictionary lookup (Query, Key, Value)."
        ]
      },
      quiz: {
        quiz: [
          {
            question: "How does the Attention mechanism solve the Information Bottleneck problem in Seq2Seq models?",
            options: ["By adding more LSTM layers", "By allowing the decoder to look at ALL encoder hidden states and dynamically weight their importance at each step", "By using a larger fixed-size context vector", "By using CNNs instead of RNNs"],
            correctIndex: 1,
            explanation: "Attention allows the decoder to selectively 'attend' to different parts of the input sequence at every step of output generation, rather than relying on a single compressed vector."
          }
        ]
      }
    }
  },
  {
    id: 'dl-transformers',
    slug: 'transformers',
    title: 'Transformers',
    description: "Self Attention, Multi Head Attention, Positional Encoding, Layer Normalization, Complete Encoder-Decoder Architecture.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "The Transformer architecture (from the famous paper 'Attention Is All You Need') completely discarded RNNs and LSTMs. It relies entirely on Attention.\n\n### Key Concepts Covered:\n- **Self-Attention**: A word looking at all other words in the *same* sentence to understand its own context (e.g., 'bank' of a river vs 'bank' for money).\n- **Query, Key, Value (Q, K, V)**: The database retrieval concept applied to matrices. Query is what you're looking for, Key is what you check against, Value is what you extract.\n- **Multi-Head Attention**: Running multiple self-attention processes in parallel, allowing the model to focus on different things (e.g., one head looks at grammar, another looks at sentiment).\n- **Positional Encoding**: Because Transformers don't use sequential RNNs, they process all words simultaneously. They inject sine/cosine waves into the data so the model knows the order of words.\n- **LLMs**: This architecture is the exact foundation for GPT (Generative Pre-trained Transformer), BERT, and Claude.",
        eli5: "Instead of reading a book word by word (RNN), a Transformer looks at the entire page at once. To understand context, it draws invisible lines connecting every word to every other word that relates to it."
      },
      why: {
        text: "Transformers process data in parallel, meaning they can be trained on thousands of GPUs simultaneously. This massive scalability is what sparked the current AI revolution (ChatGPT).",
        tip: "Understanding Q, K, and V is critical. Think of Query as a search bar query, Key as the article title, and Value as the article content."
      },
      code: {
        code: "import numpy as np\nimport tensorflow as tf\n\n# Scaled Dot-Product Attention (The core of Transformers)\ndef scaled_dot_product_attention(q, k, v, mask=None):\n    matmul_qk = tf.matmul(q, k, transpose_b=True)\n    \n    # Scale by square root of depth\n    dk = tf.cast(tf.shape(k)[-1], tf.float32)\n    scaled_attention_logits = matmul_qk / tf.math.sqrt(dk)\n    \n    # Apply mask (e.g., to prevent looking into the future)\n    if mask is not None:\n        scaled_attention_logits += (mask * -1e9)\n        \n    attention_weights = tf.nn.softmax(scaled_attention_logits, axis=-1)\n    output = tf.matmul(attention_weights, v)\n    return output"
      },
      examNotes: {
        examNotes: [
          "Transformers process sequences in parallel, unlike RNNs which are strictly sequential.",
          "Positional Encoding provides the notion of word order.",
          "Multi-Head Attention concatenates multiple attention heads and projects them through a linear layer."
        ]
      },
      quiz: {
        quiz: [
          {
            question: "Why is Positional Encoding necessary in a Transformer architecture?",
            options: ["To compress the size of the vectors", "Because Transformers process all words simultaneously in parallel and have no inherent concept of sequence order", "To translate between different languages", "To convert text into audio"],
            correctIndex: 1,
            explanation: "Unlike RNNs which process words one by one, Transformers process the entire sequence at once. Without positional encoding, the model would treat the sentence as an unordered 'bag of words'."
          }
        ]
      }
    }
  },
  {
    id: 'dl-nlp-deep-learning',
    slug: 'nlp-deep-learning',
    title: 'NLP With Deep Learning',
    description: "Introduction to NLP in Deep Learning.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "Welcome to **NLP With Deep Learning**.\n\nThis module covers: Introduction to NLP in Deep Learning.\n\n### Core Concepts\nIn this section, we dive deep into the technical execution of NLP With Deep Learning. We will explore how it operates under the hood, mathematical intuition, and practical applications in the industry.\n\nMastering this architecture is essential for becoming a proficient AI Researcher.",
        eli5: "Think of NLP With Deep Learning as an advanced cognitive framework. It allows the neural network to process information much like a human brain handling complex tasks."
      },
      why: {
        text: "Understanding NLP With Deep Learning allows you to build state-of-the-art models that can understand context, generate text, or analyze sequence data at scale.",
        tip: "Always monitor your loss curves on TensorBoard. Deep Learning models are notorious for subtle bugs that compile perfectly but fail to learn anything."
      },
      code: {
        code: "# Implementation snippet for NLP With Deep Learning\nprint('Training Deep Neural Network for: NLP With Deep Learning')\n# Detailed code labs are available in the interactive editor."
      },
      examNotes: {
        examNotes: [
          "Key architectural component for NLP With Deep Learning.",
          "Understand the backpropagation flow.",
          "Know the typical hyperparameters."
        ]
      },
      quiz: {
        quiz: [
          {
            question: "What is a primary advantage of utilizing NLP With Deep Learning in a deep learning pipeline?",
            options: ["Increases manual feature engineering", "Improves ability to model complex, sequential or high-dimensional relationships", "Reduces GPU usage to zero", "Requires no training data"],
            correctIndex: 1,
            explanation: "Deep learning architectures automate feature extraction and model complex, non-linear relationships better than classical ML."
          }
        ]
      }
    }
  },
  {
    id: 'dl-rnn-project',
    slug: 'rnn-project',
    title: 'End To End DL Project With Simple RNN',
    description: "Word Embeddings, Keras/Tensorflow, IMDB Dataset, Streamlit Integration.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "Welcome to **End To End DL Project With Simple RNN**.\n\nThis module covers: Word Embeddings, Keras/Tensorflow, IMDB Dataset, Streamlit Integration.\n\n### Core Concepts\nIn this section, we dive deep into the technical execution of End To End DL Project With Simple RNN. We will explore how it operates under the hood, mathematical intuition, and practical applications in the industry.\n\nMastering this architecture is essential for becoming a proficient AI Researcher.",
        eli5: "Think of End To End DL Project With Simple RNN as an advanced cognitive framework. It allows the neural network to process information much like a human brain handling complex tasks."
      },
      why: {
        text: "Understanding End To End DL Project With Simple RNN allows you to build state-of-the-art models that can understand context, generate text, or analyze sequence data at scale.",
        tip: "Always monitor your loss curves on TensorBoard. Deep Learning models are notorious for subtle bugs that compile perfectly but fail to learn anything."
      },
      code: {
        code: "# Implementation snippet for End To End DL Project With Simple RNN\nprint('Training Deep Neural Network for: End To End DL Project With Simple RNN')\n# Detailed code labs are available in the interactive editor."
      },
      examNotes: {
        examNotes: [
          "Key architectural component for End To End DL Project With Simple RNN.",
          "Understand the backpropagation flow.",
          "Know the typical hyperparameters."
        ]
      },
      quiz: {
        quiz: [
          {
            question: "What is a primary advantage of utilizing End To End DL Project With Simple RNN in a deep learning pipeline?",
            options: ["Increases manual feature engineering", "Improves ability to model complex, sequential or high-dimensional relationships", "Reduces GPU usage to zero", "Requires no training data"],
            correctIndex: 1,
            explanation: "Deep learning architectures automate feature extraction and model complex, non-linear relationships better than classical ML."
          }
        ]
      }
    }
  },
  {
    id: 'dl-lstm-project',
    slug: 'lstm-project',
    title: 'LSTM And GRU Project',
    description: "Data Collection, Model Training, Streamlit Webapp Integration.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "Welcome to **LSTM And GRU Project**.\n\nThis module covers: Data Collection, Model Training, Streamlit Webapp Integration.\n\n### Core Concepts\nIn this section, we dive deep into the technical execution of LSTM And GRU Project. We will explore how it operates under the hood, mathematical intuition, and practical applications in the industry.\n\nMastering this architecture is essential for becoming a proficient AI Researcher.",
        eli5: "Think of LSTM And GRU Project as an advanced cognitive framework. It allows the neural network to process information much like a human brain handling complex tasks."
      },
      why: {
        text: "Understanding LSTM And GRU Project allows you to build state-of-the-art models that can understand context, generate text, or analyze sequence data at scale.",
        tip: "Always monitor your loss curves on TensorBoard. Deep Learning models are notorious for subtle bugs that compile perfectly but fail to learn anything."
      },
      code: {
        code: "# Implementation snippet for LSTM And GRU Project\nprint('Training Deep Neural Network for: LSTM And GRU Project')\n# Detailed code labs are available in the interactive editor."
      },
      examNotes: {
        examNotes: [
          "Key architectural component for LSTM And GRU Project.",
          "Understand the backpropagation flow.",
          "Know the typical hyperparameters."
        ]
      },
      quiz: {
        quiz: [
          {
            question: "What is a primary advantage of utilizing LSTM And GRU Project in a deep learning pipeline?",
            options: ["Increases manual feature engineering", "Improves ability to model complex, sequential or high-dimensional relationships", "Reduces GPU usage to zero", "Requires no training data"],
            correctIndex: 1,
            explanation: "Deep learning architectures automate feature extraction and model complex, non-linear relationships better than classical ML."
          }
        ]
      }
    }
  },
  {
    id: 'dl-bidirectional-rnn',
    slug: 'bidirectional-rnn',
    title: 'Bidirectional RNN',
    description: "Bidirectional RNN Architecture and Intuition.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "Welcome to **Bidirectional RNN**.\n\nThis module covers: Bidirectional RNN Architecture and Intuition.\n\n### Core Concepts\nIn this section, we dive deep into the technical execution of Bidirectional RNN. We will explore how it operates under the hood, mathematical intuition, and practical applications in the industry.\n\nMastering this architecture is essential for becoming a proficient AI Researcher.",
        eli5: "Think of Bidirectional RNN as an advanced cognitive framework. It allows the neural network to process information much like a human brain handling complex tasks."
      },
      why: {
        text: "Understanding Bidirectional RNN allows you to build state-of-the-art models that can understand context, generate text, or analyze sequence data at scale.",
        tip: "Always monitor your loss curves on TensorBoard. Deep Learning models are notorious for subtle bugs that compile perfectly but fail to learn anything."
      },
      code: {
        code: "# Implementation snippet for Bidirectional RNN\nprint('Training Deep Neural Network for: Bidirectional RNN')\n# Detailed code labs are available in the interactive editor."
      },
      examNotes: {
        examNotes: [
          "Key architectural component for Bidirectional RNN.",
          "Understand the backpropagation flow.",
          "Know the typical hyperparameters."
        ]
      },
      quiz: {
        quiz: [
          {
            question: "What is a primary advantage of utilizing Bidirectional RNN in a deep learning pipeline?",
            options: ["Increases manual feature engineering", "Improves ability to model complex, sequential or high-dimensional relationships", "Reduces GPU usage to zero", "Requires no training data"],
            correctIndex: 1,
            explanation: "Deep learning architectures automate feature extraction and model complex, non-linear relationships better than classical ML."
          }
        ]
      }
    }
  }
];
