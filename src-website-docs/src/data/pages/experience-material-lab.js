/* Page content: experience/material-lab. */
// Return metadata and a deferred HTML body; shared helpers are supplied by the page assembler.
export default (ctx) => {
  const { h, route, scriptLink, eventLink, pill, card, callout, table, highlight, code, diagram, script, scripts, events, page } = ctx;
  return page('experience/material-lab', 'Material lab', 'Experiences', 'The room-one and room-two interactive demonstrations implemented in the material-lab place.', ['room one', 'room two', 'materials', 'frequency', 'antenna'], () => `
      <h2 id="rooms">Room state</h2>
      <p>${scriptLink('lab-room-detection','RoomDetection')} tests the player root against <code>RoomOneZone</code> and <code>RoomTwoZone</code> every 0.1 seconds. It publishes <code>InRoomOne</code> and <code>InRoomTwo</code> attributes when state changes. Those flags show and hide dashboards, change camera zoom, and trigger the character shrink behavior in room one.</p>
      <h2 id="room-one">Room one · materials and signal</h2>
      <p>The player can place Concrete, Metal, or Wood blocks on the heatmap area using ${scriptLink('lab-room-one-material-placer','RoomOneMaterialPlacer')}. A local ${scriptLink('lab-ray-visual','RayVisual')} part connects the character to <code>SignalSource</code>. The server's ${scriptLink('lab-player-signal-handler','PlayerSignalHandler')} updates distance, material, RSRP, and SINR attributes; ${scriptLink('lab-room-one-dashboard','RoomOneDashboard')} displays them and exposes a frequency slider. The heatmap button switches between RSRP and SINR views.</p>
      <h2 id="room-two">Room two · antenna patterns</h2>
      <p>Room two shows antenna characteristics and a local nearest-antenna signal estimate in ${scriptLink('lab-room-two-dashboard','RoomTwoDashboard')}. ${scriptLink('lab-slider-controls','SliderControls')} exposes elevation for a directional antenna and elevation plus azimuth for NarrowBeam. The settings are sent to ${scriptLink('lab-antenna-beam-simulation','AntennaBeamSimulation')} for visual updates. ${scriptLink('lab-pop-up-script','PopUpScript')} shows type-specific explanatory text.</p>
      <h2 id="npc">NPC control</h2>
      <p>${scriptLink('lab-npc-control-script','NPCControlScript')} displays a room-one count slider. ${scriptLink('lab-npc-spawner','NPCSpawner')} maintains the server population, with a configured cap of 50 NPCs.</p>
    `);
};
