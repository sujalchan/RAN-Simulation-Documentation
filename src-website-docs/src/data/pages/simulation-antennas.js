/* Page content: simulation/antennas. */
export default (ctx) => {
  const { h, route, scriptLink, eventLink, pill, card, callout, table, highlight, code, diagram, script, scripts, events, page } = ctx;
  return page('simulation/antennas', 'Antennas and coverage', 'Simulation', 'How antenna patterns, placement, coverage spheres, and NPC load are visualized.', ['antenna', 'beamforming', 'azimuth', 'elevation', 'coverage', 'NPC'], () => `
      <h2 id="lab-patterns">Material-lab patterns</h2>
      <p>${scriptLink('lab-antenna-beam-simulation','AntennaBeamSimulation')} creates point clouds for directional, narrow, and omnidirectional antenna visuals. The directional routine maps sample points into antenna-local coordinates, computes horizontal and vertical angular offsets, reduces a modeled gain from its peak, and maps bounded strength to point position and color. The omnidirectional visualization uses a vertical-angle pattern.</p>
      <p>${scriptLink('lab-slider-controls','SliderControls')} sends elevation and azimuth through ${eventLink('UpdateAntennaEvent')}. The server accepts Directional or NarrowBeam values and updates the matching visualization. ${scriptLink('lab-room-detection','RoomDetection')} separately publishes nearby antenna characteristics as player attributes for UI panels.</p>
      ${callout('info', 'Visual boundary.', 'The beam visualization script updates drawn patterns. The current PlayerSignalHandler calculates player RSRP and SINR from source distance and material attenuation; it does not consume those beam point strengths.')}
      <h2 id="town-placement">Small-town placement</h2>
      <p>${scriptLink('town-antennaplacer','Antennaplacer')} creates a preview and budget UI. The client sends ${eventLink('PlaceAntenna','PlaceAntenna','small-town')} to ${scriptLink('town-antenna-server','AntennaServer')}, which clones a permitted template, aligns its base, tags its owner, and parents it under <code>PlacedAntennas</code>. The matching delete request checks that owner tag.</p>
      <h2 id="coverage">Range and score</h2>
      <p>${scriptLink('town-cell-tower-visualizer','CellTowerVisualizer')} draws three concentric spheres per tower or placed model. It estimates coverage by testing 50 × 50 points over fixed map bounds against outer spheres, then writes <code>CoverageScore</code>. ${scriptLink('town-antenna-signal-manager','AntennaSignalManager')} selects a nearby model for dashboard signal and subtracts a load penalty for NPCs on placed antennas.</p>
      <p>These radii and patterns are educational visuals, not a physical propagation solver. See ${route('simulation/signal','signal metrics')} and ${route('experience/small-town','the small-town activity')}.</p>
    `);
};
