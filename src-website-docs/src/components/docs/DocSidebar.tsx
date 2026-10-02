import { useEffect, useMemo, useRef } from 'react';
import { BookOpen, PanelLeftClose } from 'lucide-react';
import { docPath, navigation, pageById, scripts } from '../../config/docsConfig';
import { Link } from './Link';

export function DocSidebar({ active, close, collapsed, toggleCollapsed }: { active: string; close: () => void; collapsed: boolean; toggleCollapsed: () => void }) {
  const groups = useMemo(() => navigation, []);
  const scriptsDisclosure = useRef<HTMLDetailsElement>(null);
  const placeDisclosures = useRef<Record<string, HTMLDetailsElement | null>>({});
  useEffect(() => {
    if (!active.startsWith('script/')) return;
    const script = scripts.find((item) => `script/${item.id}` === active);
    if (script) {
      scriptsDisclosure.current?.setAttribute('open', '');
      const placeDisclosure = placeDisclosures.current[script.place];
      placeDisclosure?.setAttribute('open', '');
    }
  }, [active]);
  return <aside id="sidebar" className="sidebar" aria-label="Documentation navigation">
    <div className="sidebar-brand"><Link to="/docs/overview" className="brand-link"><span className="brand-mark"><BookOpen size={18}/></span><span className="brand-copy"><strong>RAN Simulator</strong><small>Developer documentation</small></span></Link><button className="icon-button sidebar-close" onClick={close} aria-label="Close navigation">×</button></div>
    <div className="sidebar-context"><span className="context-dot"/> Roblox Studio <span className="context-sep">/</span> Luau</div>
    <nav className="sidebar-nav" aria-label="Documentation topics">
      {groups.map((group) => <div className="nav-group" key={group.label}><p className="nav-label">{group.label}</p>{group.ids.map((id) => { const page = pageById.get(id); return page ? <Link className={`nav-link ${active === id ? 'active' : ''}`} aria-current={active === id ? 'page' : undefined} key={id} to={docPath(id)}>{page.title}</Link> : null; })}</div>)}
      <div className="nav-group"><p className="nav-label">Individual scripts</p><details ref={scriptsDisclosure} className="nav-details"><summary>Browse all {scripts.length} scripts</summary><div className="nav-nested">{(['material-lab', 'small-town'] as const).map((place) => <details key={place} ref={(node) => { placeDisclosures.current[place] = node; }} className="nav-details"><summary>{place === 'material-lab' ? 'Material lab' : 'Small town'}</summary><div className="nav-nested">{scripts.filter((script) => script.place === place).map((script) => { const id = `script/${script.id}`; return <Link key={id} className={`nav-link ${active === id ? 'active' : ''}`} aria-current={active === id ? 'page' : undefined} to={docPath(id)}>{script.name}</Link>; })}</div></details>)}</div></details></div>
    </nav>
    <button className="sidebar-collapse-hint" onClick={toggleCollapsed} aria-expanded={!collapsed}><PanelLeftClose size={15}/> Collapse sidebar</button>
  </aside>;
}
