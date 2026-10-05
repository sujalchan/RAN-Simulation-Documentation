import { useEffect, useState } from 'react';
import { docPath } from '../../config/docsConfig';

// Builds a side index from rendered headings and tracks the section currently crossing the reading line.
export function TableOfContents({ pageId, markup, scriptFilter = 'all' }: { pageId: string; markup: string; scriptFilter?: string }) {
  const [active, setActive] = useState('');
  // The script index hides one place's heading and cards when its filter is active.
  const headings = [...markup.matchAll(/<h([23]) id="([^"]+)">([\s\S]*?)<\/h[23]>/g)].map((match) => ({ level: Number(match[1]), id: match[2], title: match[3].replace(/<[^>]+>/g, '') })).filter(({ id }) => scriptFilter === 'all' || (scriptFilter === 'material-lab' ? id !== 'small-town-scripts' : id !== 'material-lab-scripts'));
  useEffect(() => {
    const elements = headings.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!elements.length) return;
    // IntersectionObserver avoids scroll polling and lets the browser choose the visible section.
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: '-12% 0px -72% 0px' });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [markup, scriptFilter]);
  if (headings.length < 2) return null;
  return <aside className="page-toc" aria-label="On this page"><p>On this page</p>{headings.map(({ id, level, title }) => <a key={id} className={`${level === 3 ? 'toc-sub' : ''} ${active === id ? 'active' : ''}`} aria-current={active === id ? 'location' : undefined} href={docPath(pageId, id)} onClick={(event) => { event.preventDefault(); const behavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'; document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' }); history.replaceState({}, '', docPath(pageId, id)); }}>{title}</a>)}</aside>;
}
