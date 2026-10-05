import type { AnchorHTMLAttributes, MouseEvent, PropsWithChildren } from 'react';

// Keeps internal docs navigation in the current app; external links retain normal browser behavior.
export function Link({ to, children, onClick, ...props }: PropsWithChildren<{ to: string; onClick?: (event: MouseEvent<HTMLAnchorElement>) => void } & AnchorHTMLAttributes<HTMLAnchorElement>>) {
  const docsBase = `${import.meta.env.BASE_URL}docs/`;
  // Push a docs route into history without reloading, then let App read the new URL.
  return <a href={to} onClick={(event) => { onClick?.(event); if (!event.defaultPrevented && to.startsWith(docsBase)) { event.preventDefault(); window.history.pushState({}, '', to); window.dispatchEvent(new PopStateEvent('popstate')); } }} {...props}>{children}</a>;
}
