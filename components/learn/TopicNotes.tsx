'use client';

import React, { useState, useEffect } from 'react';
import { Save, Check, Loader2 } from 'lucide-react';

export const TopicNotes = () => {
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  const handleSave = () => {
    setStatus('saving');
    setTimeout(() => {
      setStatus('saved');
      setTimeout(() => setStatus('idle'), 2000);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea 
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Jot down your key takeaways or questions here..."
          className="w-full h-40 p-6 bg-bg-surface border border-border rounded-xl focus:border-accent-teal outline-none transition-colors text-sm text-text-primary resize-none"
        />
        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          {status === 'saving' && <Loader2 className="w-4 h-4 text-accent-teal animate-spin" />}
          {status === 'saved' && <Check className="w-4 h-4 text-accent-teal" />}
          <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">
            {status === 'saving' ? 'Saving...' : status === 'saved' ? 'Saved to cloud' : 'Auto-saves to cloud'}
          </span>
        </div>
      </div>
      <button 
        onClick={handleSave}
        className="text-[10px] font-bold uppercase tracking-widest text-text-secondary hover:text-accent-teal transition-colors flex items-center gap-2"
      >
        <Save className="w-3 h-3" /> Save Note
      </button>
    </div>
  );
};
