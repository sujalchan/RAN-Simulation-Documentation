import data from '../data/docsData.js';

export type DocPage = (typeof data.pages)[number];
export type ScriptReference = {
  id: string; name: string; path: string; place: string; runtime: string; kind: string; summary: string;
  functions: string[]; state: string; services: string[]; objects: string[];
  events: [string, string, string][]; modules: string[]; related: string[]; terms: string[];
};
export type RemoteEvent = (typeof data.events)[number];

export const pages = data.pages as DocPage[];
export const scripts = data.scripts as ScriptReference[];
export const events = data.events as RemoteEvent[];
export const pageById = new Map(pages.map((page) => [page.id, page]));
export const scriptCount = scripts.length;
const relatedById: Record<string, string[]> = {
  overview: ['repository', 'architecture', 'simulation/signal', 'code-reference'],
  repository: ['architecture', 'events', 'code-reference'],
  architecture: ['data-flow', 'events', 'repository'],
  'data-flow': ['events', 'simulation/frequency', 'simulation/materials'],
  'simulation/signal': ['simulation/frequency', 'simulation/materials', 'simulation/heatmap'],
  'simulation/frequency': ['simulation/signal', 'simulation/heatmap', 'configuration'],
  'simulation/materials': ['simulation/signal', 'simulation/heatmap', 'experience/material-lab'],
  'simulation/heatmap': ['simulation/signal', 'simulation/materials', 'configuration'],
  'simulation/antennas': ['experience/material-lab', 'experience/small-town', 'simulation/signal'],
  'experience/material-lab': ['simulation/materials', 'simulation/heatmap', 'interface'],
  'experience/small-town': ['simulation/antennas', 'events', 'interface'],
  events: ['data-flow', 'code-reference', 'developer-guide'],
  'code-reference': ['events', 'configuration', 'developer-guide'],
  configuration: ['simulation/frequency', 'simulation/heatmap', 'developer-guide'],
  'developer-guide': ['repository', 'events', 'code-reference'],
};
export const docsRegistry = pages.map((page, order) => ({
  id: page.id,
  title: page.title,
  description: page.summary,
  category: page.group === 'Code reference' ? 'Reference' : page.group,
  path: `${import.meta.env.BASE_URL}docs/${page.id}`,
  order,
  keywords: page.tags,
  related: page.id.startsWith('script/') ? scripts.find((item) => `script/${item.id}` === page.id)?.related || [] : relatedById[page.id] || [],
  component: page.id.startsWith('script/') ? 'ScriptReferencePage' : `${page.id.replace(/(^|[-/])([a-z])/g, (_match: string, _sep: string, letter: string) => letter.toUpperCase())}Page`,
}));
const categoryOrder = ['Getting started', 'Architecture', 'Simulation', 'Experiences', 'Reference'];
export const navigation = categoryOrder.map((label) => ({
  label,
  ids: docsRegistry.filter((entry) => entry.category === label && !entry.id.startsWith('script/')).map((entry) => entry.id),
})).filter((group) => group.ids.length);
const routeAliases: Record<string, string> = {
  'architecture/client-server': 'architecture',
  'architecture/data-flow': 'data-flow',
  'getting-started/overview': 'overview',
  'getting-started/project-structure': 'repository',
  'simulation/rsrp': 'simulation/signal',
  'simulation/sinr': 'simulation/signal',
  'systems/heatmap': 'simulation/heatmap',
};

export function docPath(id: string, anchor = '') {
  const normalized = id.startsWith('script/') ? id : id;
  return `${import.meta.env.BASE_URL}docs/${normalized}${anchor ? `#${anchor}` : ''}`;
}

export function parseDocLocation() {
  const mountPath = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/$/, '');
  const mountedPath = window.location.pathname.startsWith(mountPath) ? window.location.pathname.slice(mountPath.length) : window.location.pathname;
  const route = mountedPath.startsWith('/docs/') ? decodeURIComponent(mountedPath.slice(6)) : 'overview';
  const id = route.replace(/\/$/, '') || 'overview';
  return { id: routeAliases[id] || id, anchor: decodeURIComponent(window.location.hash.slice(1)) };
}

export function toDocHref(href: string) {
  const route = href.replace(/^#\//, '');
  const marker = route.indexOf('@');
  if (marker >= 0) return docPath(route.slice(0, marker), route.slice(marker + 1));
  return docPath(route);
}

export function normalizeDocMarkup(markup: string) {
  return markup.replace(/href="#\/([^"]+)"/g, (_match, route: string) => `href="${toDocHref(`#/${route}`)}"`);
}

export const searchablePages = pages.map((page) => {
  const content = document.createElement('div');
  content.innerHTML = page.body();
  const script = scripts.find((entry) => page.id === `script/${entry.id}`);
  return {
    id: page.id,
    title: page.title,
    kind: script ? 'Script reference' : page.group,
    summary: script?.path || page.summary,
    href: docPath(page.id),
    terms: `${page.tags.join(' ')} ${content.textContent || ''} ${script?.path || ''} ${script?.events.flat().join(' ') || ''}`.toLocaleLowerCase(),
  };
}).concat(events.map((event) => ({
  id: `events#${event.id}`,
  title: event.name,
  kind: `${event.place} RemoteEvent`,
  summary: event.arguments,
  href: docPath('events', event.id),
  terms: `${event.name} ${event.place} ${event.direction} ${event.purpose} ${event.arguments}`.toLocaleLowerCase(),
})));
