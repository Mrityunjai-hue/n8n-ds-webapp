import { PageContext } from '@/hooks/usePageContext';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export type NovaMode = 'explain' | 'quiz' | 'debug' | 'summarise' | 'whatnext';

export const MODE_OPTIONS: {
  key: NovaMode;
  label: string;
  icon: string;
  placeholder: string;
  modePrompt: (ctx: PageContext) => string;
}[] = [
  {
    key: 'explain',
    label: 'Explain',
    icon: '💡',
    placeholder: 'Ask Nova anything about this topic...',
    modePrompt: (ctx) =>
      `Explain ${ctx.currentTopic ?? 'this topic'} using a fresh analogy. Make it concrete with a real-world example.`,
  },
  {
    key: 'quiz',
    label: 'Quiz Me',
    icon: '❓',
    placeholder: 'Nova will quiz you on this topic...',
    modePrompt: (ctx) =>
      `Quiz me on ${ctx.currentTopic ?? ctx.currentSubject ?? 'data science'}. Ask me ONE interview-style question and wait for my answer before revealing yours. Start now.`,
  },
  {
    key: 'debug',
    label: 'Debug',
    icon: '🐛',
    placeholder: 'Paste your broken code here...',
    modePrompt: () => `Help me debug this code. Find the bug, explain why it's wrong, and show the fixed version:\n\n`,
  },
  {
    key: 'summarise',
    label: 'Summarise',
    icon: '⚡',
    placeholder: 'Nova will give you a revision summary...',
    modePrompt: (ctx) =>
      `Give me a 5-bullet revision summary of ${ctx.currentTopic ?? ctx.currentSubject ?? 'this topic'} that I can review right before an interview. Use **bold** for the most critical point in each bullet.`,
  },
  {
    key: 'whatnext',
    label: 'What Next',
    icon: '🗺️',
    placeholder: 'Nova will guide your next steps...',
    modePrompt: (ctx) =>
      `Based on what I've studied (${ctx.currentSubject ?? 'data science'} — ${ctx.currentTopic ?? 'various topics'}), what should I study next and why? Give me a clear learning path with specific reasons.`,
  },
];

export function getSuggestedPrompts(ctx: PageContext): string[] {
  if (ctx.isOnLesson && ctx.currentTopic) {
    const t = ctx.currentTopic;
    return [
      `Explain ${t} with a real-world analogy`,
      `What's the most common interview trap with ${t}?`,
      `Quiz me on ${t}`,
      `Summarise ${t} in 5 bullets for revision`,
    ];
  }
  if (ctx.pageType === 'interview') {
    return [
      'Give me a SQL interview question',
      'What are common ML interview topics?',
      'How do I answer a technical question in an interview?',
      'What is the STAR method?',
    ];
  }
  if (ctx.pageType === 'projects') {
    return [
      'What project should I build first?',
      'How do I make a data science portfolio?',
      'How do I deploy a Python project?',
      'Suggest a project for my current skill level',
    ];
  }
  return [
    'Where should I start in data science?',
    'What skills do I need for a data analyst role?',
    'Difference between ML and Deep Learning?',
    'Quiz me on SQL basics',
  ];
}

export async function sendNovaMessage({
  messages,
  userMessage,
  mode,
  ctx,
  onChunk,
}: {
  messages: ChatMessage[];
  userMessage: string;
  mode: NovaMode;
  ctx: PageContext;
  onChunk: (chunk: string) => void;
}): Promise<void> {
  // For first message with an active mode (other than explain), prepend the mode prompt
  const isFirstMessage = messages.length === 0;
  const modeOption = MODE_OPTIONS.find(m => m.key === mode)!;
  const finalMessage =
    isFirstMessage && mode !== 'explain'
      ? modeOption.modePrompt(ctx) + (mode === 'debug' ? userMessage : '')
      : userMessage;

  const response = await fetch('/api/nova', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: messages.slice(-16),
      userMessage: finalMessage,
      pageContext: ctx,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(err.error ?? `HTTP ${response.status}`);
  }

  if (!response.body) throw new Error('No response body');

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';

    for (const line of lines) {
      if (!line.startsWith('data: ')) continue;
      const data = line.slice(6).trim();
      if (data === '[DONE]') return;
      try {
        const parsed = JSON.parse(data);
        if (parsed.text) onChunk(parsed.text);
      } catch {
        // skip malformed chunks
      }
    }
  }
}
