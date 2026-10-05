import pageOverview from './overview.js';
import pageRepository from './repository.js';
import pageArchitecture from './architecture.js';
import pageDataFlow from './data-flow.js';
import pageSimulationSignal from './simulation-signal.js';
import pageSimulationFrequency from './simulation-frequency.js';
import pageSimulationMaterials from './simulation-materials.js';
import pageSimulationHeatmap from './simulation-heatmap.js';
import pageSimulationAntennas from './simulation-antennas.js';
import pageExperienceMaterialLab from './experience-material-lab.js';
import pageExperienceSmallTown from './experience-small-town.js';
import pageInterface from './interface.js';
import pageTerminology from './terminology.js';
import pageConfiguration from './configuration.js';
import pageDeveloperGuide from './developer-guide.js';
import eventsPage from './events.js';
import codeReferencePage from './code-reference.js';
import scriptReferencePages from './script-reference.js';

// Keep the public page order stable; generated script pages follow the hand-authored topics.
export function buildPages(context) {
  const pages = [
    pageOverview(context),
    pageRepository(context),
    pageArchitecture(context),
    pageDataFlow(context),
    pageSimulationSignal(context),
    pageSimulationFrequency(context),
    pageSimulationMaterials(context),
    pageSimulationHeatmap(context),
    pageSimulationAntennas(context),
    pageExperienceMaterialLab(context),
    pageExperienceSmallTown(context),
    pageInterface(context),
    pageTerminology(context),
    pageConfiguration(context),
    pageDeveloperGuide(context),
    eventsPage(context),
    codeReferencePage(context),
  ];
  // Script detail pages need the already-built topic pages to resolve their related links.
  pages.push(...scriptReferencePages({ ...context, pages }));
  return pages;
}
