/* Page content: simulation/heatmap. */
// Return metadata and a deferred HTML body; shared helpers are supplied by the page assembler.
export default (ctx) => {
  const { h, route, scriptLink, eventLink, pill, card, callout, table, highlight, code, diagram, script, scripts, events, page } = ctx;
  return page('simulation/heatmap', 'Heatmap generation', 'Simulation', 'Grid creation, incremental RSRP/SINR updates, colors, and mode switching.', ['heatmap', 'RSRP', 'SINR', 'tiles', 'ToggleHeatmapEvent'], () => `
      ${diagram([[{title:'World grid',note:'24 × 30 tiles',tone:'orange'},{title:'Sample tile',note:'one of 30 per Heartbeat'},{title:'Signal estimate',note:'source distance'},{title:'Material overlap',note:'priority + attenuation',tone:'orange'}],[{title:'Signal value',note:'RSRP or SINR',tone:'green'},{title:'Colour mapping',note:'red → yellow → green'},{title:'Heatmap tile',note:'updated in Workspace',tone:'green'}]], 'Each update samples tiles, estimates signal, applies material loss, then maps the value to a tile color.')}
      <h2 id="grid">Tile grid</h2>
      <p>${scriptLink('lab-heatmap-handler','HeatmapHandler')} clones <code>LevelOne.HeatmapTile</code> into a <code>HeatmapGrid</code> folder: <strong>24 rows × 30 columns</strong> with 2 stud spacing, centered around <code>Vector3.new(32, 0.5, -10)</code>. A red-to-yellow-to-green color map represents normalized values with a small visual noise amount.</p>
      <p>Each <code>Heartbeat</code> updates 30 randomly chosen tiles; the grid is therefore refreshed incrementally, not as one full synchronous pass. <code>signalSources</code> is captured from <code>SignalSourcesFolder:GetChildren()</code> when the script starts.</p>
      <h2 id="rsrp-tiles">RSRP tile estimate</h2>
      <p>For each chosen tile, the script maps distance from each source linearly across <code>maxDistance</code> between the configured <code>-50</code> and <code>-120 dBm</code> bounds. It applies at most one prioritized material loss with distance-dependent falloff, then uses the strongest source's estimate to color the tile.</p>
      <h2 id="sinr-tiles">SINR tile estimate</h2>
      <p>For SINR mode, source estimates are converted to milliwatts. The strongest source is the serving power; all other source powers form the interference term. A <code>-104 dBm</code> noise floor is added before conversion back to dB and color normalization over <code>-10 to 30 dB</code>.</p>
      ${code(`local interferencePower = totalReceivedPower - strongestSignalPower\nlocal noisePower = dBmToMilliwatts(NOISE_FLOOR_DBM)`, 'HeatmapHandler.luau · updateSINR')}
      <h2 id="controls">Mode and frequency controls</h2>
      <p>${scriptLink('lab-heatmap-toggle','HeatmapToggle')} sends <code>"RSRP"</code> or <code>"SINR"</code> through ${eventLink('ToggleHeatmapEvent')}. ${eventLink('FrequencyChangedEvent')} updates the heatmap's distance limit from the submitted <code>newMaxDistance</code> argument. Both mode and range are script-level state in this server handler, so they are shared by its grid rather than maintained per player.</p>
      <p>Related: ${route('simulation/signal','signal metrics')}, ${route('simulation/materials','material handling')}, and ${route('configuration','configuration')}.</p>
    `);
};
