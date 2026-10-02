import { useEffect, useState } from 'react';
import { docPath } from '../../config/docsConfig';

export function TableOfContents({ pageId, markup, scriptFilter = 'all' }: { pageId: string; markup: string; scriptFilter?: string }) {
  const [active, setActive] = useState('');
  const headings = [...markup.matchAll(/<h([23]) id="([^"]+)">([\s\S]*?)<\/h[23]>/g)].map((match) => ({ level: Number(match[1]), id: match[2], title: match[3].replace(/<[^>]+>/g, '') })).filter(({ id }) => scriptFilter === 'all' || (scriptFilter === 'material-lab' ? id !== 'small-town-scripts' : id !== 'material-lab-scripts'));
  useEffect(() => {
    const elements = headings.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!elements.length) return;
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
