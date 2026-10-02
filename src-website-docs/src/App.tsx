import { useEffect, useMemo, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { Menu, Search, Sun, Moon } from 'lucide-react';
import { Breadcrumbs } from './components/docs/Breadcrumbs';
import { DocPage } from './components/docs/DocPage';
import { DocSearch } from './components/docs/DocSearch';
import { DocSidebar } from './components/docs/DocSidebar';
import { TableOfContents } from './components/docs/TableOfContents';
import { docPath, docsRegistry, navigation, pageById, parseDocLocation, scripts } from './config/docsConfig';
import { normalizeDocMarkup } from './config/docsConfig';
import { Link } from './components/docs/Link';
import { pageComponents } from './docs/pageRegistry';
import { ScriptReferencePage } from './components/docs/ScriptReferencePage';

export default function App() {
  const [location, setLocation] = useState(parseDocLocation);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchTrigger = useRef<HTMLButtonElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => { try { return localStorage.getItem('ran-docs-sidebar-collapsed') === 'true'; } catch { return false; } });
  const [scriptFilter, setScriptFilter] = useState('all');
  const [theme, setTheme] = useState(() => { try { return localStorage.getItem('ran-docs-theme') === 'light' ? 'light' : 'dark'; } catch { return 'dark'; } });
  const page = pageById.get(location.id);
  const html = useMemo(() => page ? normalizeDocMarkup(page.body()) : '', [page]);
  const script = scripts.find((item) => `script/${item.id}` === location.id);
  const navigationIds = docsRegistry.filter((entry) => !entry.id.startsWith('script/')).map((entry) => entry.id);
  const index = navigationIds.indexOf(location.id);
  const previous = index > 0 ? pageById.get(navigationIds[index - 1]) : undefined;
  const next = index >= 0 ? pageById.get(navigationIds[index + 1]) : undefined;
  const group = script ? 'Code reference' : page?.group || 'Documentation';

  useEffect(() => {
    const update = () => setLocation(parseDocLocation());
    window.addEventListener('popstate', update);
    window.addEventListener('hashchange', update);
    return () => { window.removeEventListener('popstate', update); window.removeEventListener('hashchange', update); };
  }, []);
  useEffect(() => {
    document.title = `${page?.title || 'Page not found'} · RAN Network Simulator Docs`;
    if (location.id === 'code-reference') setScriptFilter('all');
    if (location.anchor) requestAnimationFrame(() => document.getElementById(location.anchor)?.scrollIntoView({ block: 'start' }));
    else window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.id, location.anchor, page]);
  useEffect(() => { document.documentElement.dataset.theme = theme; try { localStorage.setItem('ran-docs-theme', theme); } catch { /* Theme remains active for this visit. */ } }, [theme]);
  useEffect(() => { document.body.classList.toggle('mobile-nav-open', mobileOpen); }, [mobileOpen]);
  useEffect(() => { document.body.classList.toggle('sidebar-collapsed', sidebarCollapsed); try { localStorage.setItem('ran-docs-sidebar-collapsed', String(sidebarCollapsed)); } catch { /* The preference is optional. */ } }, [sidebarCollapsed]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const editing = /^(INPUT|TEXTAREA|SELECT)$/.test((document.activeElement as HTMLElement | null)?.tagName || '');
      if (((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') || (event.key === '/' && !editing)) { event.preventDefault(); setSearchOpen(true); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const go = (href: string) => { window.history.pushState({}, '', href); setLocation(parseDocLocation()); setMobileOpen(false); };
  const closeSearch = () => { setSearchOpen(false); requestAnimationFrame(() => searchTrigger.current?.focus()); };
  const followDocLink = (event: MouseEvent<HTMLElement>) => {
    if (event.defaultPrevented) return;
    const target = event.target as HTMLElement;
    const anchor = target.closest('a');
    if (!anchor) {
      const filter = target.closest<HTMLButtonElement>('[data-filter]');
      if (filter) {
        const place = filter.dataset.filter;
        setScriptFilter(place || 'all');
        document.querySelectorAll<HTMLElement>('[data-script-place]').forEach((item) => { item.hidden = place !== 'all' && item.dataset.scriptPlace !== place; });
        document.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach((button) => { const active = button === filter; button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active)); });
        for (const [id, hidden] of [['material-lab-scripts', place === 'small-town'], ['small-town-scripts', place === 'material-lab']] as const) { const heading = document.getElementById(id); if (heading) { heading.hidden = hidden; if (heading.nextElementSibling) (heading.nextElementSibling as HTMLElement).hidden = hidden; } }
      }
      return;
    }
    const url = new URL(anchor.href, window.location.href);
    if (url.pathname.startsWith('/docs/')) { event.preventDefault(); go(`${url.pathname}${url.hash}`); }
  };

  return <><a className="skip-link" href="#main-content">Skip to content</a><div className="app-shell">
    <DocSidebar active={location.id} close={() => setMobileOpen(false)} collapsed={sidebarCollapsed} toggleCollapsed={() => setSidebarCollapsed((value) => !value)}/>
    <div className="mobile-scrim" hidden={!mobileOpen} onClick={() => setMobileOpen(false)} aria-hidden="true"/>
    <div className="workspace"><header className="topbar"><div className="topbar-start"><button className="icon-button menu-toggle" onClick={() => { if (matchMedia('(max-width: 820px)').matches) setMobileOpen((value) => !value); else setSidebarCollapsed((value) => !value); }} aria-label="Toggle documentation navigation" aria-controls="sidebar" aria-expanded={matchMedia('(max-width: 820px)').matches ? mobileOpen : !sidebarCollapsed}><Menu/></button><span className="topbar-divider"/><span className="topbar-location">Documentation <span>/</span> <strong>{page?.title || 'Page not found'}</strong></span></div><div className="topbar-actions"><button ref={searchTrigger} className="search-trigger" onClick={() => setSearchOpen(true)} aria-keyshortcuts="Control+k Meta+k /"><Search/><span>Search documentation</span><kbd>⌘ K</kbd></button><div className="theme-switch" role="group" aria-label="Color theme"><button className="theme-option" aria-label="Light mode" aria-pressed={theme === 'light'} onClick={() => setTheme('light')}><Sun/><span>Light</span></button><button className="theme-option" aria-label="Dark mode" aria-pressed={theme === 'dark'} onClick={() => setTheme('dark')}><Moon/><span>Dark</span></button></div></div></header>
      <div className="reading-layout"><main className="main-content" id="main-content" tabIndex={-1}><Breadcrumbs title={page?.title || 'Page not found'} group={group}/><article className="doc-article" onClick={followDocLink}>{page ? (script ? <ScriptReferencePage id={script.id}/> : pageComponents[page.id] ? <>{(() => { const PageComponent = pageComponents[page.id]; return <PageComponent/>; })()}</> : <DocPage page={page}/>) : <div className="page-enter"><p className="eyebrow">Documentation</p><h1>Page not found</h1><p className="lede">This documentation route does not exist.</p><Link to={docPath('overview')}>Return to the overview →</Link></div>}</article>
      {index >= 0 ? <nav className="page-neighbors" aria-label="Adjacent pages">{previous ? <Link className="neighbor-link" to={docPath(previous.id)}><small>Previous page</small><strong>← {previous.title}</strong></Link> : <span/>}{next ? <Link className="neighbor-link next" to={docPath(next.id)}><small>Next page</small><strong>{next.title} →</strong></Link> : <span/>}</nav> : <nav className="page-neighbors" aria-label="Adjacent pages"><Link className="neighbor-link" to={docPath('code-reference')}><small>Back to reference</small><strong>← All scripts</strong></Link></nav>}
      <footer className="content-footer">RAN Network Simulator · Developer documentation · Current implementation: Roblox Studio and Luau</footer></main>{page && <TableOfContents pageId={page.id} markup={html} scriptFilter={scriptFilter}/>}</div>
    </div></div>
    <DocSearch open={searchOpen} close={closeSearch} navigate={go}/>
  </>;
}
