import React, { useState } from 'react';
import { FileText, Copy, Check, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExamNotesProps {
  notes: string[];
}

export const ExamNotes: React.FC<ExamNotesProps> = ({ notes }) => {
  const [copied, setCopied] = useState(false);

  if (!notes || notes.length === 0) return null;

  const handleCopy = () => {
    const textToCopy = notes.map(note => `• ${note}`).join('\n');
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="w-full bg-bg-surface/30 border border-border rounded-2xl p-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent-teal/10 border border-accent-teal/20 text-accent-teal">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-primary">Revision Notes</h3>
            <p className="text-xs text-text-secondary">Key points summarized for exams and quick reference</p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 border border-border hover:bg-bg-surface rounded-lg text-xs font-mono font-bold transition-all text-text-secondary hover:text-text-primary"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-accent-teal" />
              <span className="text-accent-teal">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Notes</span>
            </>
          )}
        </button>
      </div>

      <div className="space-y-3">
        {notes.map((note, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex gap-3 items-start p-3 bg-bg-primary/40 border border-border/50 rounded-xl hover:border-border transition-colors group"
          >
            <div className="mt-0.5 p-0.5 rounded bg-bg-surface border border-border/50 text-accent-teal shrink-0 group-hover:bg-accent-teal/10 group-hover:text-accent-teal transition-all">
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
            <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors leading-relaxed">
              {note}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
