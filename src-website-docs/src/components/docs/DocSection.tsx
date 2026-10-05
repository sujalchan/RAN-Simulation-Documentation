import type { PropsWithChildren } from 'react';

// Adds a semantic section wrapper with a heading that can be targeted by the table of contents.
export function DocSection({ id, title, children }: PropsWithChildren<{ id: string; title: string }>) {
  return <section className="doc-section" aria-labelledby={id}><h2 id={id}>{title}</h2>{children}</section>;
}
