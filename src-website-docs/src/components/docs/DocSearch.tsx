import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { searchablePages } from '../../config/docsConfig';

export function DocSearch({ open, close, navigate }: { open: boolean; close: () => void; navigate: (href: string) => void }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const results = useMemo(() => {
    const terms = query.toLocaleLowerCase().normalize('NFKD').trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return searchablePages.filter((item) => ['overview', 'simulation/signal', 'events', 'code-reference', 'developer-guide'].includes(item.id)).slice(0, 5);
    return searchablePages.map((item) => {
      let score = 0;
      for (const term of terms) {
        if (item.title.toLocaleLowerCase() === term) score += 90;
        else if (item.title.toLocaleLowerCase().startsWith(term)) score += 48;
        else if (item.title.toLocaleLowerCase().includes(term)) score += 28;
        else if (item.terms.includes(term)) score += 5;
        else return { item, score: 0 };
      }
      return { item, score };
    }).filter(({ score }) => score > 0).sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title)).slice(0, 10).map(({ item }) => item);
  }, [query]);
  useEffect(() => { if (open) { setQuery(''); setSelected(0); requestAnimationFrame(() => input.current?.focus()); } }, [open]);
  useEffect(() => { setSelected(0); }, [query]);
  if (!open) return null;
  const choose = (index = selected) => { const item = results[index]; if (item) { close(); navigate(item.href); } };
  return <div className="search-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}><section className="search-dialog" role="dialog" aria-modal="true" aria-label="Search documentation" onKeyDown={(event) => { if (event.key !== 'Tab') return; const controls = [...event.currentTarget.querySelectorAll<HTMLElement>('input, button:not([disabled])')]; const first = controls[0]; const last = controls[controls.length - 1]; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); } }}><div className="search-box"><div className="search-input-row"><Search size={19}/><input ref={input} type="search" value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === 'Escape') close(); if (event.key === 'ArrowDown') { event.preventDefault(); setSelected((value) => (value + 1) % Math.max(results.length, 1)); } if (event.key === 'ArrowUp') { event.preventDefault(); setSelected((value) => (value + results.length - 1) % Math.max(results.length, 1)); } if (event.key === 'Enter') { event.preventDefault(); choose(); } }} placeholder="Search topics, scripts, events…" aria-label="Search topics, scripts, and events"/><button onClick={close} aria-label="Close search"><X size={16}/></button></div><div className="search-results" role="listbox">{results.length ? results.map((item, index) => <button key={`${item.id}-${index}`} role="option" aria-selected={selected === index} className={`search-result ${selected === index ? 'selected' : ''}`} onMouseEnter={() => setSelected(index)} onClick={() => choose(index)}><small>{item.kind}</small><strong>{item.title}</strong><span>{item.summary}</span></button>) : <p className="search-empty">No matching topic, script, or event.</p>}</div><div className="search-hint"><span>↑ ↓ to navigate</span><span>Enter to open</span><span>Esc to close</span></div></div></section></div>;
}
