import { ArrowUpRight } from 'lucide-react';
import { docsRegistry, pageById, docPath } from '../../config/docsConfig';
import { Link } from './Link';

// Provides curated cross-links from the registry; generated script pages manage their own links.
export function RelatedPages({ id }: { id: string }) {
  const related = docsRegistry.find((page) => page.id === id)?.related || [];
  const pages = related.map((pageId) => pageById.get(pageId)).filter(Boolean);
  if (!pages.length || id.startsWith('script/')) return null;
  return <aside className="related-pages"><h2>Related documentation</h2><div className="related-links">{pages.map((page) => page && <Link key={page.id} to={docPath(page.id)}><span>{page.title}</span><ArrowUpRight size={15}/></Link>)}</div></aside>;
}
