# Phase 19: Content Wave 4 — Generative AI & LLMs

## Objective
Establish the Generative AI track by populating 5 high-impact topics covering Transformers, Attention mechanisms, and modern AI workflows like RAG.

## 📋 Topics to Implement
1. **Transformers Architecture**: The bedrock of modern NLP. Understanding Encoders, Decoders, and the "Attention is All You Need" breakthrough.
2. **The Attention Mechanism**: Deep dive into Self-Attention, Multi-Head Attention, and how models focus on relevant context.
3. **Large Language Models (LLMs)**: Evolutionary path from BERT/GPT-2 to GPT-4 and beyond.
4. **Retrieval Augmented Generation (RAG)**: Connecting LLMs to external data using Vector Databases and Retrieval pipelines.
5. **Prompt Engineering & Fine-tuning**: Practical techniques for steerability, few-shot prompting, and PEFT (Parameter-Efficient Fine-Tuning).

## 🛠️ Content Requirements (Per Topic)
- **ELI5**: Simple analogies for complex probabilistic systems.
- **Diagrams**: Mermaid.js visualizations for the Transformer block, RAG workflow, and Attention heatmaps.
- **Components Breakdown**: Deep dive into hyperparameters (Temperature, Top-p, Context Window) and architectural components (Tokenizers, Embeddings).
- **Interview Questions**: 10 questions per topic (Total 50 questions) covering architecture, limitations (hallucinations), and deployment.

## 📝 Execution Plan
1. **Initialize Subject Data**: Add topic metadata for 'genai' in `lib/content/subjects.ts`.
2. **Draft Transformer/Attention Content**: Implement the core theoretical modules with detailed diagrams.
3. **Build LLM Evolutionary Track**: Document the shift from discriminative to generative models.
4. **Implement RAG & Tooling**: Explain the modern AI stack (Embeddings -> Vector DB -> LLM).
5. **Populate Interview Bank**: Inject 50 specialized questions for GenAI roles.
6. **Verification**: Run `type-check` and visual audit of diagrams.

## 🎯 Success Criteria
- [ ] 5 complete GenAI topics in `subjects.ts`.
- [ ] Complex RAG and Attention diagrams.
- [ ] 50 interview questions added.
- [ ] 100% type safety.
