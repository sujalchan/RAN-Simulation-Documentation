import type { PropsWithChildren } from 'react';

// Reusable note panel; `kind` selects the matching visual tone and icon.
export function Callout({ title, kind = 'info', children }: PropsWithChildren<{ title: string; kind?: 'info' | 'warning' | 'success' }>) {
  const tone = kind === 'success' ? '' : kind;
  return <aside className={`callout ${tone}`}><span className="callout-icon" aria-hidden="true">{kind === 'warning' ? '!' : kind === 'info' ? 'i' : '✓'}</span><p><strong>{title}</strong> {children}</p></aside>;
}
