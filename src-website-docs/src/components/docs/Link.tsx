import type { AnchorHTMLAttributes, MouseEvent, PropsWithChildren } from 'react';

export function Link({ to, children, onClick, ...props }: PropsWithChildren<{ to: string; onClick?: (event: MouseEvent<HTMLAnchorElement>) => void } & AnchorHTMLAttributes<HTMLAnchorElement>>) {
  return <a href={to} onClick={(event) => { onClick?.(event); if (!event.defaultPrevented && to.startsWith('/docs/')) { event.preventDefault(); window.history.pushState({}, '', to); window.dispatchEvent(new PopStateEvent('popstate')); } }} {...props}>{children}</a>;
}
