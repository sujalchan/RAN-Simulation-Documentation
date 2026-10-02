import { useMemo } from 'react';
import type { DocPage as DocPageData } from '../../config/docsConfig';
import { normalizeDocMarkup } from '../../config/docsConfig';
import { RelatedPages } from './RelatedPages';

export function DocPage({ page }: { page: DocPageData }) {
  const markup = useMemo(() => normalizeDocMarkup(page.body()), [page]);
  return <div className="page-enter"><p className="eyebrow">{page.group}</p><h1>{page.title}</h1><p className="lede">{page.summary}</p><hr className="article-rule"/><div className="doc-body" dangerouslySetInnerHTML={{ __html: markup }} /><RelatedPages id={page.id}/></div>;
}
