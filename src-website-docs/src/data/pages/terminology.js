/* Page content: terminology. */
// Return metadata and a deferred HTML body; shared helpers are supplied by the page assembler.
export default (ctx) => {
  const { h, route, scriptLink, eventLink, pill, card, callout, table, highlight, code, diagram, script, scripts, events, page } = ctx;
  return page('terminology', 'Terminology and limits', 'Simulation', 'The network vocabulary used by this simulator and the boundaries of its simplified models.', ['RAN', 'RSRP', 'RSRQ', 'SINR', 'dBm', '4G', '5G'], () => `
      <h2 id="terms">Terms used in the project</h2>
      ${table(['Term', 'Meaning in this documentation'], [['RAN', 'Radio Access Network: the mobile access side that connects devices to cell sites. The experience uses towers and antennas as visual teaching elements.'], ['4G / 5G', 'Labels attached to selectable bands in FrequencyData. The Luau formulas are authored simulation behavior, not a network protocol implementation.'], ['dBm', 'A logarithmic power unit used for displayed signal levels and conversions in the SINR estimate.'], ['RSRP', 'Reference Signal Received Power. Scripts use the name RSRP for a bounded distance-and-attenuation estimate; they do not implement a standards measurement pipeline.'], ['SINR', 'Signal-to-Interference-plus-Noise Ratio. Player and heatmap scripts compare one serving estimate against other source estimates and a configured noise floor.'], ['RSRQ', 'Reference Signal Received Quality. This term appears in project goals but has no calculation in the current Luau source.'], ['Attenuation', 'A loss value read from material or zone attributes configured on Studio objects.'], ['Beamforming', 'Here, a visual antenna pattern updated by orientation sliders. It is not fed into the player signal formula.']])}
      <h2 id="models">Model boundaries</h2>
      <p>The player, heatmap, and small-town systems use related but separate settings, clamps, noise floors, and source selection rules. A value shown on one UI should be read as that script's simulation output. The site names the responsible script whenever it explains a formula.</p>
      <p>Start with ${route('simulation/signal','signal metrics')} or ${route('simulation/antennas','antenna visuals')} for implementation details.</p>
    `);
};
