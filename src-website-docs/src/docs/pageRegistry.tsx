import type { ComponentType } from 'react';
import Page0 from './getting-started/OverviewPage';
import Page1 from './getting-started/ProjectStructurePage';
import Page2 from './architecture/ArchitecturePage';
import Page3 from './architecture/DataFlowPage';
import Page4 from './architecture/RemoteEventsPage';
import Page5 from './simulation/SignalMetricsPage';
import Page6 from './simulation/FrequencyPage';
import Page7 from './simulation/AttenuationPage';
import Page8 from './simulation/HeatmapPage';
import Page9 from './simulation/AntennaPage';
import Page10 from './simulation/TerminologyPage';
import Page11 from './systems/MaterialLabPage';
import Page12 from './systems/SmallTownPage';
import Page13 from './systems/InterfacePage';
import Page14 from './reference/ConfigurationPage';
import Page15 from './reference/DeveloperGuidePage';
import Page16 from './reference/ScriptIndexPage';

// Page content data supplies the text; these React components adapt each route to DocPage.
export const pageComponents: Record<string, ComponentType> = {
  'overview': Page0,
  'repository': Page1,
  'architecture': Page2,
  'data-flow': Page3,
  'events': Page4,
  'simulation/signal': Page5,
  'simulation/frequency': Page6,
  'simulation/materials': Page7,
  'simulation/heatmap': Page8,
  'simulation/antennas': Page9,
  'terminology': Page10,
  'experience/material-lab': Page11,
  'experience/small-town': Page12,
  'interface': Page13,
  'configuration': Page14,
  'developer-guide': Page15,
  'code-reference': Page16,
};
