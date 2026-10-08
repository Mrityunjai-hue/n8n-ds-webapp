import React from 'react';
import { Info, Lightbulb, AlertTriangle, ListChecks } from 'lucide-react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { MermaidDiagram } from './MermaidDiagram';

const markdownComponents: Components = {
  code({ node, inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || '');
    if (!inline && match && match[1] === 'mermaid') {
      return <MermaidDiagram chart={String(children).replace(/\n$/, '')} />;
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }
};

export const ContentSection: React.FC<{ title: string, children?: React.ReactNode, icon?: React.ReactNode, markdownText?: string }> = ({ title, children, icon, markdownText }) => (
  <div className="space-y-6">
    <div className="prose dark:prose-invert prose-neutral max-w-none leading-relaxed text-[var(--ink)] prose-headings:text-[var(--ink)] prose-p:text-[var(--ink-2)] prose-strong:text-[var(--ink)] prose-code:text-[var(--blue)] dark:prose-code:text-[var(--yellow)] prose-code:bg-[var(--canvas-sunken)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:border prose-code:border-[var(--canvas-border)]">
      {markdownText ? (
        <ReactMarkdown 
          remarkPlugins={[remarkGfm, remarkMath]} 
          rehypePlugins={[rehypeKatex]}
          components={markdownComponents}
        >
          {markdownText}
        </ReactMarkdown>
      ) : (
        children
      )}
    </div>
  </div>
);

export const ProTip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="p-6 bg-amber-500/10 border-2 border-amber-600/30 rounded-2xl flex gap-4 text-[var(--ink)]">
    <Lightbulb className="w-6 h-6 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
    <div className="text-sm text-[var(--ink-2)] leading-relaxed italic prose dark:prose-invert max-w-none prose-p:my-0">
      <span className="font-bold text-amber-800 dark:text-amber-400 block mb-1 uppercase tracking-widest text-[10px] not-italic font-mono">Pro Tip</span>
      {typeof children === 'string' ? <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]} components={markdownComponents}>{children}</ReactMarkdown> : children}
    </div>
  </div>
);

export const Warning: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="p-6 bg-rose-500/10 border-2 border-rose-600/30 rounded-2xl flex gap-4 text-[var(--ink)]">
    <AlertTriangle className="w-6 h-6 text-rose-700 dark:text-rose-400 shrink-0 mt-0.5" />
    <div className="text-sm text-[var(--ink-2)] leading-relaxed prose dark:prose-invert max-w-none prose-p:my-0">
      <span className="font-bold text-rose-800 dark:text-rose-400 block mb-1 uppercase tracking-widest text-[10px] font-mono">Common Mistake</span>
      {typeof children === 'string' ? <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]} components={markdownComponents}>{children}</ReactMarkdown> : children}
    </div>
  </div>
);

export const KeyPoints: React.FC<{ points: string[] }> = ({ points }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {points.map((point, i) => (
      <div key={i} className="p-4 bg-[var(--canvas-raised)] border-2 border-[var(--canvas-border)] rounded-xl flex gap-3 items-start doodle-card">
        <div className="mt-1">
          <ListChecks className="w-4 h-4 text-[var(--green)]" />
        </div>
        <div className="text-sm text-[var(--ink-2)] prose dark:prose-invert max-w-none prose-p:my-0">
          <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]} components={markdownComponents}>{point}</ReactMarkdown>
        </div>
      </div>
    ))}
  </div>
);
