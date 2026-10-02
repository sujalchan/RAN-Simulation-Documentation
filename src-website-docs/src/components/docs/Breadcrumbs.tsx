import { Link } from './Link';

export function Breadcrumbs({ title, group }: { title: string; group: string }) {
  return <nav className="breadcrumb" aria-label="Breadcrumb"><Link to="/docs/overview">Documentation</Link><span className="sep">/</span><span>{group}</span><span className="sep">/</span><span className="current" aria-current="page">{title}</span></nav>;
}
