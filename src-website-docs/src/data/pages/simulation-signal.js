/* Page content: simulation/signal. */
// Return metadata and a deferred HTML body; shared helpers are supplied by the page assembler.
export default (ctx) => {
  const { h, route, scriptLink, eventLink, pill, card, callout, table, highlight, code, diagram, script, scripts, events, page } = ctx;
  return page('simulation/signal', 'Signal metrics', 'Simulation', 'The implemented signal, RSRP-like, SINR, interference, and noise calculations.', ['RSRP', 'SINR', 'RSRQ', 'dBm', 'interference', 'signal strength'], () => `
      ${callout('info', 'Educational model.', 'The values below are simulation estimates for instruction and UI. Their formulas are specific to this project and should not be interpreted as standards-compliant radio measurements.')}
      ${diagram([[{title:'Signal source',note:'SignalSourcesFolder',tone:'orange'},{title:'Frequency + distance',note:'selected divisor and range'},{title:'Material loss',note:'first raycast hit',tone:'orange'},{title:'Signal metrics',note:'RSRP-like and SINR',tone:'green'}],[{title:'Player attributes',note:'server-published values',tone:'green'},{title:'Dashboard',note:'live metric display'},{title:'Heatmap',note:'separate tile estimate',tone:'green'}]], 'Signal source, range, and material inputs feed the player estimate and visual displays.')}
      <span id="distance"></span><h2 id="material-rsrp">Material-lab RSRP-like value</h2>
      <p>${scriptLink('lab-player-signal-handler','PlayerSignalHandler')} chooses the closest child of <code>SignalSourcesFolder</code>. It starts at <code>-50</code>, subtracts distance divided by the selected <code>FrequencyDivisor</code>, then subtracts the first configured material hit's <code>Attenuation</code> attribute. It bounds the value between <code>-120</code> and <code>-50</code> dBm and adds a smoothed small random offset before publishing <code>RSRP</code>.</p>
      ${code(`local baseSignal = math.clamp(\n\t-50 - towerDistance / rangeDivisor,\n\t-120,\n\t-50\n)`, 'PlayerSignalHandler.luau · calculateRSRP')}
      <h2 id="sinr">Material-lab SINR</h2>
      <p>The same handler estimates each configured source at the player position. It converts source levels from dBm to linear milliwatts, treats the closest source as serving power, sums the other sources as interference, adds a fixed <code>-100 dBm</code> noise floor, and calculates a power ratio in decibels. The displayed value is floored and clamped to <code>0–20 dB</code>.</p>
      <p>Because source selection is by nearest distance and the source model is simplified, this is a teaching visualization of SINR behavior. ${route('simulation/heatmap', 'The heatmap')} has a related but separate SINR routine and a <code>-104 dBm</code> noise floor.</p>
      <h2 id="town-signal">Small-town estimates</h2>
      <p>${scriptLink('town-tower-signal-manager','TowerSignalManager')} estimates a fixed tower's player signal from distance in studs divided by ten, a frequency divisor, tower power offset, and the player's material attenuation attribute. ${scriptLink('town-antenna-signal-manager','AntennaSignalManager')} chooses the closest in-range fixed or placed model when possible. For a selected placed antenna, it subtracts <code>2</code> per tracked NPC connection before a small noise adjustment. These are distinct calculations and publish different attributes.</p>
      ${code(`local scaledDistance = closest.dist / 10\nlocal baseSignal = -50 - (scaledDistance / divisor)`, 'AntennaSignalManager.luau · distance estimate')}
      <h2 id="rsrq">RSRQ status</h2>
      ${callout('warning', 'Not implemented in the Luau source.', 'RSRQ is part of the project’s educational subject matter, but no current Luau routine calculates or displays an RSRQ value. Do not read the RSRP or SINR outputs as RSRQ.')}
      <p>Related: ${route('simulation/frequency', 'frequency and range')}, ${route('simulation/materials', 'materials')}, ${route('terminology', 'terminology')}, and ${scriptLink('lab-player-signal-handler','the signal handler reference')}.</p>
    `);
};
