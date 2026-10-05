/* Page content: experience/small-town. */
// Return metadata and a deferred HTML body; shared helpers are supplied by the page assembler.
export default (ctx) => {
  const { h, route, scriptLink, eventLink, pill, card, callout, table, highlight, code, diagram, script, scripts, events, page } = ctx;
  return page('experience/small-town', 'Small town', 'Experiences', 'The fixed-tower and player-placed-antenna activity in the small-town place.', ['town', 'tower', 'placement', 'coverage', 'NPC'], () => `
      <h2 id="session">Starting and resetting</h2>
      <p>${scriptLink('town-start-game','StartGame')} listens to the <code>StartButton</code> proximity prompt, records the active player, and fires ${eventLink('StartGame','StartGame','small-town')} to that client. A reset request through ${eventLink('ResetGame','ResetGame','small-town')} removes that player's owned antennas, clears NPCs, restores speed, moves the character near <code>SpawnLocation</code>, and notifies the client.</p>
      <h2 id="antennas">Building coverage</h2>
      <p>${scriptLink('town-antennaplacer','Antennaplacer')} presents four priced antenna options, a placement preview, rotation, deletion, and a budget starting at 850,000. ${scriptLink('town-antenna-server','AntennaServer')} validates and clones models. ${scriptLink('town-cell-tower-visualizer','CellTowerVisualizer')} can show range spheres and a coverage percentage, which the placement UI uses for results.</p>
      <h2 id="signal">Moving through the network</h2>
      <p>${scriptLink('town-tower-signal-manager','TowerSignalManager')} samples fixed-tower signal and material attenuation. ${scriptLink('town-antenna-signal-manager','AntennaSignalManager')} also considers placed antennas and their NPC load for the town dashboard. ${scriptLink('town-ray-material-detection','RayMaterialDetection')} reads attenuation zones; ${scriptLink('town-wall-detection','WallDetection')} inspects overlap along a visual ray.</p>
      <h2 id="support">Supporting systems</h2>
      <p>${scriptLink('town-npc-spawner','NPCSpawner')} creates wandering NPCs and tracks their nearest tower connection counts. ${scriptLink('town-npc-control-script','NPCControlScript')} adjusts population. ${scriptLink('town-speed-control-script','SpeedControlScript')} and ${scriptLink('town-third-person-camera','ThirdPersonCamera')} provide movement and zoom controls. ${scriptLink('town-led-manager','LEDManager')} changes marked LED visibility with time of day.</p>
    `);
};
