/* Compose content and metadata into the single catalog consumed by the app. */
import * as helpers from './helpers.js';
import scripts from './scripts.js';
import events from './events.js';
import { buildPages } from './pages/index.js';

// Each page factory receives the same helpers and reference catalogs to build its HTML lazily.
const context = { ...helpers, scripts, events };
const pages = buildPages(context);

// This order controls both the sidebar's category organization and adjacent-page links.
const navigation = [
    { label: 'Getting started', ids: ['overview', 'repository'] },
    { label: 'Architecture', ids: ['architecture', 'data-flow', 'events'] },
    { label: 'Simulation', ids: ['simulation/signal', 'simulation/frequency', 'simulation/materials', 'simulation/heatmap', 'simulation/antennas', 'terminology'] },
    { label: 'Experiences', ids: ['experience/material-lab', 'experience/small-town', 'interface'] },
    { label: 'Reference', ids: ['code-reference', 'configuration', 'developer-guide'] }
  ];

export default { pages, scripts, events, navigation, h: helpers.h };
