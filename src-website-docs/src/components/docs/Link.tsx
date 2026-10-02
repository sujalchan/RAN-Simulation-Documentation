import type { AnchorHTMLAttributes, MouseEvent, PropsWithChildren } from 'react';

export function Link({ to, children, onClick, ...props }: PropsWithChildren<{ to: string; onClick?: (event: MouseEvent<HTMLAnchorElement>) => void } & AnchorHTMLAttributes<HTMLAnchorElement>>) {
  const docsBase = `${import.meta.env.BASE_URL}docs/`;
  return <a href={to} onClick={(event) => { onClick?.(event); if (!event.defaultPrevented && to.startsWith(docsBase)) { event.preventDefault(); window.history.pushState({}, '', to); window.dispatchEvent(new PopStateEvent('popstate')); } }} {...props}>{children}</a>;
}
