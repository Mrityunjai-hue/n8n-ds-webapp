'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import { Search, Book, FileText, HelpCircle, X } from 'lucide-react';
import { useSearchIndex, SearchItem } from '@/lib/hooks/use-search';
import { useSearchStore } from '@/lib/store/useSearchStore';

export function GlobalSearch() {
  const { isOpen, closeSearch, toggleSearch } = useSearchStore();
  const router = useRouter();
  const searchIndex = useSearchIndex();

  // Ctrl+K keyboard shortcut
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleSearch();
      }
      if (e.key === 'Escape' && isOpen) {
        closeSearch();
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [isOpen, toggleSearch, closeSearch]);

  const onSelect = React.useCallback((item: SearchItem) => {
    closeSearch();
    router.push(item.href);
  }, [router, closeSearch]);

  if (!isOpen) return null;

  const subjects  = searchIndex.filter(item => item.type === 'subject');
  const topics    = searchIndex.filter(item => item.type === 'topic');
  const questions = searchIndex.filter(item => item.type === 'question');

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => { if (e.target === e.currentTarget) closeSearch(); }}
    >
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden mx-4 animate-in slide-in-from-top-4 duration-200">
        <Command
          className="flex flex-col h-full"
          filter={(value, search) =>
            value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0
          }
        >
          {/* Search Input */}
          <div className="flex items-center px-4 border-b border-slate-800">
            <Search className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" />
            <Command.Input
              autoFocus
              placeholder="Search subjects, topics, questions…"
              className="w-full py-4 bg-transparent outline-none text-slate-100 placeholder:text-slate-500 text-sm"
            />
            <button
              onClick={closeSearch}
              className="p-1.5 hover:bg-slate-800 rounded-md text-slate-400 transition-colors flex-shrink-0"
              aria-label="Close search"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results */}
          <Command.List className="max-h-[60vh] overflow-y-auto p-2">
            <Command.Empty className="py-10 text-center text-slate-500 text-sm">
              No results found.
            </Command.Empty>

            {/* Subjects */}
            {subjects.length > 0 && (
              <Command.Group
                heading={
                  <span className="px-2 py-1 text-[10px] font-bold text-teal-500 uppercase tracking-widest">
                    Subjects
                  </span>
                }
              >
                {subjects.map((item) => (
                  <Command.Item
                    key={item.id}
                    value={item.title}
                    onSelect={() => onSelect(item)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer aria-selected:bg-slate-800 text-slate-300 aria-selected:text-white transition-colors group"
                  >
                    <div className="p-2 rounded-md bg-slate-800 group-aria-selected:bg-teal-500/20 transition-colors flex-shrink-0">
                      <Book className="w-4 h-4 text-teal-500" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{item.title}</div>
                      <div className="text-xs text-slate-500 line-clamp-1">{item.description}</div>
                    </div>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {topics.length > 0 && (
              <Command.Group
                heading={
                  <span className="px-2 py-1 text-[10px] font-bold text-amber-500 uppercase tracking-widest">
                    Topics
                  </span>
                }
              >
                {topics.map((item) => (
                  <Command.Item
                    key={item.id}
                    value={`${item.title} ${item.subjectName}`}
                    onSelect={() => onSelect(item)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer aria-selected:bg-slate-800 text-slate-300 aria-selected:text-white transition-colors group"
                  >
                    <div className="p-2 rounded-md bg-slate-800 group-aria-selected:bg-amber-500/20 transition-colors flex-shrink-0">
                      <FileText className="w-4 h-4 text-amber-500" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{item.title}</div>
                      <div className="text-xs text-slate-500">{item.subjectName}</div>
                    </div>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {questions.length > 0 && (
              <Command.Group
                heading={
                  <span className="px-2 py-1 text-[10px] font-bold text-blue-500 uppercase tracking-widest">
                    Interview Questions
                  </span>
                }
              >
                {questions.map((item) => (
                  <Command.Item
                    key={item.id}
                    value={`${item.title} ${item.topicName}`}
                    onSelect={() => onSelect(item)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer aria-selected:bg-slate-800 text-slate-300 aria-selected:text-white transition-colors group"
                  >
                    <div className="p-2 rounded-md bg-slate-800 group-aria-selected:bg-blue-500/20 transition-colors flex-shrink-0">
                      <HelpCircle className="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                      <div className="font-medium text-sm line-clamp-1">{item.title}</div>
                      <div className="text-xs text-slate-500">{item.subjectName} · {item.topicName}</div>
                    </div>
                  </Command.Item>
                ))}
              </Command.Group>
            )}
          </Command.List>

          {/* Footer hints */}
          <div className="p-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">↑↓</kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">Enter</kbd>
                Select
              </span>
            </div>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">Esc</kbd>
              Close
            </span>
          </div>
        </Command>
      </div>
    </div>
  );
}
