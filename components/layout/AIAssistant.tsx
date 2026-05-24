'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  ChatMessage,
  NovaMode,
  MODE_OPTIONS,
  getSuggestedPrompts,
  sendNovaMessage,
} from '@/lib/services/novaChatService';
import { usePageContext } from '@/hooks/usePageContext';

// ── Markdown renderer ──────────────────────────────────────────────────────────

function renderBotContent(content: string) {
  // Split on code fences
  const parts = content.split(/(```[\s\S]*?```)/g);

  return parts.map((part, i) => {
    if (part.startsWith('```')) {
      const langMatch = part.match(/^```(\w+)?/);
      const lang = langMatch?.[1] ?? 'code';
      const code = part.replace(/^```\w*\n?/, '').replace(/\n?```$/, '').trim();
      const isRunnable = ['sql', 'python', 'py'].includes(lang.toLowerCase());

      return (
        <div
          key={i}
          style={{
            background: '#1e2030',
            borderRadius: '8px',
            margin: '8px 0',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)',
            fontSize: '12px',
          }}
        >
          {/* Code block header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '4px 10px',
              background: 'rgba(255,255,255,0.04)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <span style={{ color: '#64748b', fontSize: '10px', fontFamily: 'monospace' }}>{lang}</span>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <button
                onClick={() => navigator.clipboard.writeText(code)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  cursor: 'pointer',
                  fontSize: '10px',
                  padding: '2px 6px',
                  borderRadius: '3px',
                }}
              >
                Copy
              </button>
              {isRunnable && (
                <button
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent('nova-fill-sandbox', {
                        detail: {
                          code,
                          language:
                            lang.toLowerCase() === 'py' ? 'python' : lang.toLowerCase(),
                        },
                      })
                    )
                  }
                  style={{
                    background: 'var(--accent-teal, #00bcd4)',
                    border: 'none',
                    color: '#000',
                    cursor: 'pointer',
                    fontSize: '10px',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontWeight: 600,
                  }}
                >
                  ▶ Run in Lab
                </button>
              )}
            </div>
          </div>
          <pre
            style={{
              margin: 0,
              padding: '10px 12px',
              color: '#cdd6f4',
              overflowX: 'auto',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              lineHeight: 1.6,
            }}
          >
            {code}
          </pre>
        </div>
      );
    }

    // Inline markdown: bold + inline code
    const lines = part.split('\n');
    return (
      <div key={i} style={{ lineHeight: 1.65 }}>
        {lines.map((line, li) => {
          if (!line) return <br key={li} />;

          // Replace **bold** and `code`
          const html = line
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/`([^`]+)`/g, '<code style="background:rgba(255,255,255,0.08);padding:1px 5px;border-radius:3px;font-family:monospace;font-size:11px;">$1</code>');

          return (
            <p
              key={li}
              style={{ margin: '2px 0', fontSize: '13px' }}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        })}
      </div>
    );
  });
}

// ── Main Nova component ────────────────────────────────────────────────────────

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<NovaMode>('explain');
  const [loading, setLoading] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [hasNew, setHasNew] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const ctx = usePageContext();

  const suggestedPrompts = getSuggestedPrompts(ctx);
  const currentMode = MODE_OPTIONS.find(m => m.key === mode)!;

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingText]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setHasNew(false);
    }
  }, [open]);

  // Listen for sandbox fill requests from Nova buttons
  const handleFill = useCallback((e: CustomEvent) => {
    window.dispatchEvent(new CustomEvent('nova-fill-sandbox', { detail: e.detail }));
  }, []);

  useEffect(() => {
    window.addEventListener('fill-sandbox', handleFill as EventListener);
    return () => window.removeEventListener('fill-sandbox', handleFill as EventListener);
  }, [handleFill]);

  async function sendMessage(text?: string) {
    const userText = (text ?? input).trim();
    if (!userText || loading) return;

    setInput('');
    const newMessages: ChatMessage[] = [
      ...messages,
      { role: 'user', content: userText },
    ];
    setMessages(newMessages);
    setLoading(true);
    setStreamingText('');

    let fullResponse = '';

    try {
      await sendNovaMessage({
        messages,
        userMessage: userText,
        mode,
        ctx,
        onChunk: (chunk) => {
          fullResponse += chunk;
          setStreamingText(fullResponse);
        },
      });

      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: fullResponse },
      ]);
      if (!open) setHasNew(true);
    } catch {
      const errMsg = 'Sorry, I hit a connection error. Please try again in a moment.';
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: errMsg },
      ]);
    } finally {
      setLoading(false);
      setStreamingText('');
    }
  }

  function clearConversation() {
    setMessages([]);
    setStreamingText('');
    setInput('');
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  const contextLabel = ctx.isOnLesson
    ? (ctx.currentTopic ?? ctx.currentSubject ?? 'Lesson')
    : ctx.pageType === 'interview'
    ? 'Interview Prep'
    : ctx.pageType === 'projects'
    ? 'Projects'
    : 'N8N DS Hub';

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 50 }}>
      {/* ── Floating Button ── */}
      <button
        onClick={() => { setOpen(o => !o); setHasNew(false); }}
        aria-label="Open Nova AI Study Companion"
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent-teal, #00bcd4), var(--accent-purple, #7c3aed))',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          boxShadow: '0 4px 24px rgba(0,188,212,0.35)',
          transition: 'transform 0.15s, box-shadow 0.15s',
          position: 'relative',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
      >
        {open ? '✕' : '🤖'}
        {/* Unread badge */}
        {hasNew && !open && (
          <span
            style={{
              position: 'absolute',
              top: '2px',
              right: '2px',
              width: '10px',
              height: '10px',
              background: '#ef4444',
              borderRadius: '50%',
              border: '2px solid var(--bg-base, #0a0f1e)',
            }}
          />
        )}
      </button>

      {/* ── Chat Panel ── */}
      {open && (
        <div
          role="dialog"
          aria-label="Nova AI chat panel"
          style={{
            position: 'absolute',
            bottom: '64px',
            right: '0',
            width: 'min(92vw, 420px)',
            height: 'min(80vh, 580px)',
            borderRadius: '16px',
            background: 'var(--bg-surface, #0d1424)',
            border: '1px solid var(--border-default, #2a3f5f)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 12px 48px rgba(0,0,0,0.5)',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 14px',
              borderBottom: '1px solid var(--border-subtle, #1e2d47)',
              background: 'var(--bg-elevated, #131d30)',
              flexShrink: 0,
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent-teal, #00bcd4), var(--accent-purple, #7c3aed))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 700,
                color: '#fff',
                flexShrink: 0,
              }}
            >
              N
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary, #f0f4ff)' }}>
                Nova
              </div>
              <div
                style={{
                  fontSize: '10px',
                  color: 'var(--text-secondary, #8899bb)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {contextLabel}
              </div>
            </div>
            <button
              onClick={clearConversation}
              title="Clear conversation"
              aria-label="Clear conversation"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted, #4a5d7a)',
                fontSize: '15px',
                padding: '4px',
                lineHeight: 1,
              }}
            >
              🗑
            </button>
          </div>

          {/* Mode Pills */}
          <div
            style={{
              display: 'flex',
              gap: '4px',
              padding: '8px 10px',
              overflowX: 'auto',
              borderBottom: '1px solid var(--border-subtle, #1e2d47)',
              flexShrink: 0,
              scrollbarWidth: 'none',
            }}
          >
            {MODE_OPTIONS.map(m => (
              <button
                key={m.key}
                onClick={() => setMode(m.key)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '999px',
                  border: '1px solid',
                  borderColor:
                    mode === m.key
                      ? 'var(--accent-teal, #00bcd4)'
                      : 'var(--border-subtle, #1e2d47)',
                  background:
                    mode === m.key ? 'rgba(0,188,212,0.12)' : 'transparent',
                  color:
                    mode === m.key
                      ? 'var(--accent-teal, #00bcd4)'
                      : 'var(--text-muted, #4a5d7a)',
                  fontSize: '11px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  fontWeight: mode === m.key ? 600 : 400,
                  transition: 'all 0.15s',
                  flexShrink: 0,
                }}
              >
                {m.icon} {m.label}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            {/* Empty state — suggested prompts */}
            {messages.length === 0 && !loading && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div
                  style={{
                    fontSize: '11px',
                    color: 'var(--text-muted, #4a5d7a)',
                    textAlign: 'center',
                    marginBottom: '4px',
                  }}
                >
                  👋 Hi! I&apos;m Nova — try asking:
                </div>
                {suggestedPrompts.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(p)}
                    style={{
                      background: 'var(--bg-elevated, #131d30)',
                      border: '1px solid var(--border-subtle, #1e2d47)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      fontSize: '12px',
                      color: 'var(--text-secondary, #8899bb)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'border-color 0.15s',
                      lineHeight: 1.4,
                    }}
                    onMouseEnter={e =>
                      ((e.currentTarget as HTMLButtonElement).style.borderColor =
                        'var(--accent-teal, #00bcd4)')
                    }
                    onMouseLeave={e =>
                      ((e.currentTarget as HTMLButtonElement).style.borderColor =
                        'var(--border-subtle, #1e2d47)')
                    }
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            {/* Message list */}
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                {msg.role === 'user' ? (
                  <div
                    style={{
                      background: 'var(--accent-teal, #00bcd4)',
                      color: '#000',
                      borderRadius: '12px 12px 2px 12px',
                      padding: '9px 13px',
                      fontSize: '13px',
                      lineHeight: 1.5,
                      maxWidth: '85%',
                    }}
                  >
                    {msg.content}
                  </div>
                ) : (
                  <div
                    style={{
                      maxWidth: '95%',
                      color: 'var(--text-primary, #f0f4ff)',
                    }}
                  >
                    {renderBotContent(msg.content)}
                  </div>
                )}
              </div>
            ))}

            {/* Streaming response */}
            {streamingText && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ maxWidth: '95%', color: 'var(--text-primary, #f0f4ff)' }}>
                  {renderBotContent(streamingText + '▌')}
                </div>
              </div>
            )}

            {/* Loading dots */}
            {loading && !streamingText && (
              <div style={{ display: 'flex', gap: '4px', padding: '4px 2px' }}>
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--accent-teal, #00bcd4)',
                      animation: `nova-bounce 1s ease-in-out ${i * 0.15}s infinite`,
                    }}
                  />
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          <div
            style={{
              padding: '10px 12px',
              borderTop: '1px solid var(--border-subtle, #1e2d47)',
              display: 'flex',
              gap: '8px',
              alignItems: 'flex-end',
              flexShrink: 0,
              background: 'var(--bg-elevated, #131d30)',
            }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={currentMode.placeholder}
              rows={1}
              style={{
                flex: 1,
                background: 'var(--bg-surface, #0d1424)',
                border: '1px solid var(--border-subtle, #1e2d47)',
                borderRadius: '8px',
                padding: '8px 10px',
                fontSize: '13px',
                color: 'var(--text-primary, #f0f4ff)',
                resize: 'none',
                outline: 'none',
                fontFamily: 'inherit',
                lineHeight: 1.5,
                maxHeight: '80px',
                overflowY: 'auto',
              }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              aria-label="Send message"
              style={{
                background:
                  input.trim() && !loading
                    ? 'var(--accent-teal, #00bcd4)'
                    : 'var(--bg-surface, #0d1424)',
                border: '1px solid var(--border-subtle, #1e2d47)',
                borderRadius: '8px',
                width: '36px',
                height: '36px',
                cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                color: input.trim() && !loading ? '#000' : 'var(--text-muted, #4a5d7a)',
                transition: 'background 0.15s',
              }}
            >
              ↑
            </button>
          </div>
        </div>
      )}

      {/* Bounce animation for loading dots */}
      <style>{`
        @keyframes nova-bounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default AIAssistant;
