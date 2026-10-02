import { Link } from './Link';
import { docPath } from '../../config/docsConfig';

export function Breadcrumbs({ title, group }: { title: string; group: string }) {
  return <nav className="breadcrumb" aria-label="Breadcrumb"><Link to={docPath('overview')}>Documentation</Link><span className="sep">/</span><span>{group}</span><span className="sep">/</span><span className="current" aria-current="page">{title}</span></nav>;
}
