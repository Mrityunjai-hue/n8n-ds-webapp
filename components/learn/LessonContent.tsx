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
    <div className="prose prose-invert prose-teal max-w-none leading-relaxed text-text-secondary marker:text-accent-teal prose-code:text-accent-teal prose-code:bg-accent-teal/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-strong:text-text-primary">
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
  <div className="p-6 bg-accent-amber/5 border border-accent-amber/20 rounded-xl flex gap-4">
    <Lightbulb className="w-6 h-6 text-accent-amber shrink-0" />
    <div className="text-sm text-text-secondary leading-relaxed italic prose prose-invert prose-amber max-w-none prose-p:my-0">
      <span className="font-bold text-accent-amber block mb-1 uppercase tracking-widest text-[10px] not-italic">Pro Tip</span>
      {typeof children === 'string' ? <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]} components={markdownComponents}>{children}</ReactMarkdown> : children}
    </div>
  </div>
);

export const Warning: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="p-6 bg-danger/5 border border-danger/20 rounded-xl flex gap-4">
    <AlertTriangle className="w-6 h-6 text-danger shrink-0" />
    <div className="text-sm text-text-secondary leading-relaxed prose prose-invert prose-red max-w-none prose-p:my-0">
      <span className="font-bold text-danger block mb-1 uppercase tracking-widest text-[10px]">Common Mistake</span>
      {typeof children === 'string' ? <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]} components={markdownComponents}>{children}</ReactMarkdown> : children}
    </div>
  </div>
);

export const KeyPoints: React.FC<{ points: string[] }> = ({ points }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {points.map((point, i) => (
      <div key={i} className="p-4 bg-bg-surface border border-border rounded-xl flex gap-3 items-start">
        <div className="mt-1">
          <ListChecks className="w-4 h-4 text-accent-teal" />
        </div>
        <div className="text-sm text-text-secondary prose prose-invert prose-teal max-w-none prose-p:my-0">
          <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]} components={markdownComponents}>{point}</ReactMarkdown>
        </div>
      </div>
    ))}
  </div>
);
