/* Page content: configuration. */
export default (ctx) => {
  const { h, route, scriptLink, eventLink, pill, card, callout, table, highlight, code, diagram, script, scripts, events, page } = ctx;
  return page('configuration', 'Data and configuration', 'Reference', 'Where band, grid, range, material, NPC, and display settings live in source.', ['config', 'FrequencyData', 'constants', 'attenuation', 'heatmap'], () => `
      <h2 id="frequency">Frequency configuration</h2>
      <p>${scriptLink('lab-frequency-data','FrequencyData')} is the material-lab shared module. It provides <code>Options</code>, <code>ByBand</code>, and <code>Default</code>. The visible room-one slider also defines a local <code>frequencyOptions</code> list. Small-town ${scriptLink('town-tower-signal-manager','TowerSignalManager')}, ${scriptLink('town-antenna-signal-manager','AntennaSignalManager')}, and ${scriptLink('town-cell-tower-visualizer','CellTowerVisualizer')} use their own frequency tables.</p>
      ${code(`FrequencyData.Default = FrequencyData.ByBand["3500 MHz"]`, 'FrequencyData.luau · default band')}
      <h2 id="geometry">Grid and geometry</h2>
      ${table(['Setting', 'Value / location', 'Used for'], [['Heatmap tiles', '<code>ROWS = 24</code>, <code>COLUMNS = 30</code>, <code>SPACING = 2</code> in HeatmapHandler.', 'Creates the server tile grid.'], ['Heatmap update batch', '<code>updatesPerFrame = 30</code> in HeatmapHandler.', 'Random tile recoloring each Heartbeat.'], ['Material placement grid', '<code>GRID_SIZE = 2</code> in PlaceMaterialHandler; matching client settings.', 'Snapping placed blocks.'], ['Town coverage sample', '<code>gridSize = 50</code> in CellTowerVisualizer.', 'Estimates a percentage over fixed MAP_BOUNDS.']])}
      <h2 id="signal-values">Signal and antenna settings</h2>
      <p>The material-lab player calculation clamps RSRP-like values to <code>-120..-50</code> and displays SINR in <code>0..20 dB</code> with a <code>-100 dBm</code> noise floor. The heatmap uses its own RSRP bounds and a <code>-104 dBm</code> SINR noise floor. Its material priority is Metal (3), Concrete (2), then Wood (1).</p>
      <p>The small-town range tables depend on script: ${scriptLink('town-antenna-signal-manager','AntennaSignalManager')} and ${scriptLink('town-cell-tower-visualizer','CellTowerVisualizer')} use 20/40/60/90 type values, while ${scriptLink('town-tower-signal-manager','TowerSignalManager')} stores a 140 value for its Lattice tower type. Consult each script before changing or interpreting a range.</p>
      <h2 id="object-attributes">Object attributes</h2>
      <p>Many values come from Studio objects rather than literal Luau constants: material <code>Attenuation</code>, tower <code>TowerType</code>, <code>TowerName</code>, and <code>MaxPower</code>, and model <code>SignalOrigin</code>. Inspect the place models or Studio properties for their configured values.</p>
      <h2 id="npc-settings">NPC settings</h2>
      <p>Both NPC spawners cap population at 50. The town spawner tracks <code>NPCConnections</code> on towers and antennas; ${scriptLink('town-antenna-signal-manager','AntennaSignalManager')} uses the count as a signal penalty for placed antennas.</p>
    `);
};
