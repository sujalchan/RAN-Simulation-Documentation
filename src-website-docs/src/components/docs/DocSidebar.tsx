import { useEffect, useMemo, useState } from 'react';
import { BookOpen, ChevronDown, PanelLeftClose } from 'lucide-react';
import { docPath, navigation, pageById, scripts } from '../../config/docsConfig';
import { Link } from './Link';

// Renders the main topic tree and a second, place-filtered tree for individual script references.
export function DocSidebar({ active, close, collapsed, toggleCollapsed }: { active: string; close: () => void; collapsed: boolean; toggleCollapsed: () => void }) {
  const groups = useMemo(() => navigation, []);
  const [scriptsExpanded, setScriptsExpanded] = useState(false);
  const [expandedPlaces, setExpandedPlaces] = useState<Record<string, boolean>>({});
  useEffect(() => {
    if (!active.startsWith('script/')) return;
    // Opening a script directly also opens its place group so the active link remains visible.
    const script = scripts.find((item) => `script/${item.id}` === active);
    if (script) {
      setScriptsExpanded(true);
      setExpandedPlaces((current) => ({ ...current, [script.place]: true }));
    }
  }, [active]);
  return <aside id="sidebar" className="sidebar" aria-label="Documentation navigation">
    <div className="sidebar-brand"><Link to={docPath('overview')} className="brand-link"><span className="brand-mark"><BookOpen size={18}/></span><span className="brand-copy"><strong>RAN Simulator</strong><small>Developer documentation</small></span></Link><button className="icon-button sidebar-close" onClick={close} aria-label="Close navigation">×</button></div>
    <nav className="sidebar-nav" aria-label="Documentation topics">
      {groups.map((group) => <div className="nav-group" key={group.label}><p className="nav-label">{group.label}</p>{group.ids.map((id) => { const page = pageById.get(id); return page ? <Link className={`nav-link ${active === id ? 'active' : ''}`} aria-current={active === id ? 'page' : undefined} key={id} to={docPath(id)}>{page.title}</Link> : null; })}</div>)}
      <div className="nav-group"><p className="nav-label">Individual scripts</p><button type="button" className="nav-disclosure" aria-expanded={scriptsExpanded} aria-controls="script-place-groups" onClick={() => setScriptsExpanded((expanded) => !expanded)}>Browse all {scripts.length} scripts<ChevronDown size={15}/></button><div id="script-place-groups" className="nav-nested" hidden={!scriptsExpanded}>{(['material-lab', 'small-town'] as const).map((place) => <div key={place} className="nav-disclosure-group"><button type="button" className="nav-disclosure" aria-expanded={Boolean(expandedPlaces[place])} aria-controls={`scripts-${place}`} onClick={() => setExpandedPlaces((current) => ({ ...current, [place]: !current[place] }))}>{place === 'material-lab' ? 'Material lab' : 'Small town'}<ChevronDown size={15}/></button><div id={`scripts-${place}`} className="nav-nested" hidden={!expandedPlaces[place]}>{scripts.filter((script) => script.place === place).map((script) => { const id = `script/${script.id}`; return <Link key={id} className={`nav-link ${active === id ? 'active' : ''}`} aria-current={active === id ? 'page' : undefined} to={docPath(id)}>{script.name}</Link>; })}</div></div>)}</div></div>
    </nav>
    <button type="button" className="sidebar-collapse-hint" onClick={toggleCollapsed} aria-controls="sidebar" aria-expanded={!collapsed}><PanelLeftClose size={15}/> Collapse sidebar</button>
  </aside>;
}
