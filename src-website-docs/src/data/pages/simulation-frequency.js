/* Page content: simulation/frequency. */
// Return metadata and a deferred HTML body; shared helpers are supplied by the page assembler.
export default (ctx) => {
  const { h, route, scriptLink, eventLink, pill, card, callout, table, highlight, code, diagram, script, scripts, events, page } = ctx;
  return page('simulation/frequency', 'Frequency and range', 'Simulation', 'How selectable bands influence per-player signal estimates and heatmap distance.', ['4G', '5G', '700 MHz', '1800 MHz', '2100 MHz', '3500 MHz', 'FrequencyChangedEvent'], () => `
      <h2 id="bands">Material-lab band table</h2>
      <p>${scriptLink('lab-frequency-data','FrequencyData')} defines four choices. Their 4G/5G labels appear in the shared data. The <code>divisor</code> is a simulation parameter: smaller values make the distance term larger in the player signal formula.</p>
      ${table(['Display name', 'Band key', 'Divisor', 'Max distance'], [['4G 700 MHz','<code>700 MHz</code>','1.2','45'], ['4G 1800 MHz','<code>1800 MHz</code>','0.9','40'], ['4G 2100 MHz','<code>2100 MHz</code>','0.7','35'], ['5G 3500 MHz','<code>3500 MHz</code>','0.5','30']])}
      <p>The module's default is <code>3500 MHz</code>. ${scriptLink('lab-room-one-dashboard','RoomOneDashboard')} sends the selected band and maxDistance through ${eventLink('FrequencyChangedEvent')}. ${scriptLink('lab-player-signal-handler','PlayerSignalHandler')} uses the band lookup; ${scriptLink('lab-heatmap-handler','HeatmapHandler')} uses the distance argument to change its tile mapping.</p>
      <h2 id="small-town">Small-town frequency data</h2>
      <p>Small-town signal and visualizer scripts carry local tables for the same four band keys and divisors. Their default is <code>2100 MHz</code>. In that place, fixed and placed antenna outer radii are multiplied by a frequency divisor in ${scriptLink('town-antenna-signal-manager','AntennaSignalManager')} and ${scriptLink('town-cell-tower-visualizer','CellTowerVisualizer')}.</p>
      ${callout('info', 'Scope of the numbers.', 'The numeric divisors and ranges are authored simulation settings. The repository does not establish that they reproduce measured 4G or 5G propagation in a real environment.')}
      <h2 id="where-to-edit">Configuration locations</h2>
      <p>See ${route('configuration', 'Data and configuration')} for exact files and other constants. The material-lab module is shared; the small-town tables are script-local.</p>
    `);
};
