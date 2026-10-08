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
      className="fixed inset-0 z-[200] flex items-start justify-center pt-[max(1.5rem,env(safe-area-inset-top,24px))] sm:pt-[10vh] px-3 sm:px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => { if (e.target === e.currentTarget) closeSearch(); }}
    >
      <div className="relative w-full max-w-2xl bg-[var(--canvas-raised)] border-2 border-[var(--canvas-border)] rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-top-4 duration-200 font-patrick">
        <Command
          className="flex flex-col h-full"
          filter={(value, search) =>
            value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0
          }
        >
          {/* Search Input */}
          <div className="flex items-center px-4 border-b-2 border-[var(--canvas-border)] bg-[var(--canvas)]">
            <Search className="w-5 h-5 text-[var(--ink-3)] mr-3 flex-shrink-0" />
            <Command.Input
              autoFocus
              placeholder="Search subjects, topics, questions…"
              className="w-full py-4 bg-transparent outline-none text-[var(--ink)] placeholder:text-[var(--ink-3)] text-base font-patrick"
            />
            <button
              onClick={closeSearch}
              className="w-8 h-8 rounded-full border border-[var(--canvas-border)] bg-[var(--canvas-raised)] hover:bg-[var(--canvas-sunken)] active:scale-90 text-[var(--ink)] flex items-center justify-center transition-all flex-shrink-0 cursor-pointer shadow-xs ml-2"
              aria-label="Close search"
            >
              <X className="w-4 h-4 text-[var(--ink)] stroke-[2.5]" />
            </button>
          </div>

          {/* Results */}
          <Command.List className="max-h-[60vh] overflow-y-auto p-2">
            <Command.Empty className="py-10 text-center text-[var(--ink-3)] text-sm font-bold">
              No results found.
            </Command.Empty>

            {/* Subjects */}
            {subjects.length > 0 && (
              <Command.Group
                heading={
                  <span className="px-3 py-1 text-[11px] font-bold text-[var(--green)] uppercase tracking-widest">
                    Subjects
                  </span>
                }
              >
                {subjects.map((item) => (
                  <Command.Item
                    key={item.id}
                    value={item.title}
                    onSelect={() => onSelect(item)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer aria-selected:bg-[var(--yellow)] aria-selected:text-[#111111] text-[var(--ink)] transition-colors group"
                  >
                    <div className="p-2 rounded-xl bg-[var(--green-tint)] group-aria-selected:bg-black/10 border border-[var(--green)]/30 transition-colors flex-shrink-0">
                      <Book className="w-4 h-4 text-[var(--green)] group-aria-selected:text-[#111111]" />
                    </div>
                    <div>
                      <div className="font-bold text-sm">{item.title}</div>
                      <div className="text-xs text-[var(--ink-3)] group-aria-selected:text-[#222222] line-clamp-1">{item.description}</div>
                    </div>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {topics.length > 0 && (
              <Command.Group
                heading={
                  <span className="px-3 py-1 text-[11px] font-bold text-[var(--orange)] uppercase tracking-widest">
                    Topics
                  </span>
                }
              >
                {topics.map((item) => (
                  <Command.Item
                    key={item.id}
                    value={`${item.title} ${item.subjectName}`}
                    onSelect={() => onSelect(item)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer aria-selected:bg-[var(--yellow)] aria-selected:text-[#111111] text-[var(--ink)] transition-colors group"
                  >
                    <div className="p-2 rounded-xl bg-[var(--orange-tint)] group-aria-selected:bg-black/10 border border-[var(--orange)]/30 transition-colors flex-shrink-0">
                      <FileText className="w-4 h-4 text-[var(--orange)] group-aria-selected:text-[#111111]" />
                    </div>
                    <div>
                      <div className="font-bold text-sm">{item.title}</div>
                      <div className="text-xs text-[var(--ink-3)] group-aria-selected:text-[#222222]">{item.subjectName}</div>
                    </div>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {questions.length > 0 && (
              <Command.Group
                heading={
                  <span className="px-3 py-1 text-[11px] font-bold text-[var(--blue)] uppercase tracking-widest">
                    Interview Questions
                  </span>
                }
              >
                {questions.map((item) => (
                  <Command.Item
                    key={item.id}
                    value={`${item.title} ${item.topicName}`}
                    onSelect={() => onSelect(item)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer aria-selected:bg-[var(--yellow)] aria-selected:text-[#111111] text-[var(--ink)] transition-colors group"
                  >
                    <div className="p-2 rounded-xl bg-[var(--blue-tint)] group-aria-selected:bg-black/10 border border-[var(--blue)]/30 transition-colors flex-shrink-0">
                      <HelpCircle className="w-4 h-4 text-[var(--blue)] group-aria-selected:text-[#111111]" />
                    </div>
                    <div>
                      <div className="font-bold text-sm line-clamp-1">{item.title}</div>
                      <div className="text-xs text-[var(--ink-3)] group-aria-selected:text-[#222222]">{item.subjectName} · {item.topicName}</div>
                    </div>
                  </Command.Item>
                ))}
              </Command.Group>
            )}
          </Command.List>

          {/* Footer hints */}
          <div className="p-3 border-t-2 border-[var(--canvas-border)] bg-[var(--canvas)] flex items-center justify-between text-xs text-[var(--ink-3)] font-mono font-bold">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded-md bg-[var(--canvas-sunken)] border border-[var(--canvas-border)] text-[var(--ink)]">↑↓</kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded-md bg-[var(--canvas-sunken)] border border-[var(--canvas-border)] text-[var(--ink)]">Enter</kbd>
                Select
              </span>
            </div>
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded-md bg-[var(--canvas-sunken)] border border-[var(--canvas-border)] text-[var(--ink)]">Esc</kbd>
              Close
            </span>
          </div>
        </Command>
      </div>
    </div>
  );
}
