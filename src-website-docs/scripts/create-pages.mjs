import { cp, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import data from '../src/data/docsData.js';

const output = 'dist';
const aliases = [
  'architecture/client-server',
  'architecture/data-flow',
  'getting-started/overview',
  'getting-started/project-structure',
  'simulation/rsrp',
  'simulation/sinr',
  'systems/heatmap',
];
const routes = [...new Set([...data.pages.map((page) => page.id), ...aliases])];

for (const route of routes) {
  const target = join(output, 'docs', route, 'index.html');
  await mkdir(dirname(target), { recursive: true });
  await cp(join(output, 'index.html'), target);
}

await cp(join(output, 'index.html'), join(output, '404.html'));
console.log(`Generated direct-load pages for ${routes.length} documentation routes.`);
