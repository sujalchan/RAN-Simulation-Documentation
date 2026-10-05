/* Page content: simulation/materials. */
export default (ctx) => {
  const { h, route, scriptLink, eventLink, pill, card, callout, table, highlight, code, diagram, script, scripts, events, page } = ctx;
  return page('simulation/materials', 'Materials and attenuation', 'Simulation', 'How placed blocks and town zones affect simulated signal attributes and heatmap tiles.', ['attenuation', 'concrete', 'metal', 'wood', 'raycast', 'obstacles'], () => `
      <h2 id="lab-placement">Placed materials in room one</h2>
      <p>${scriptLink('lab-room-one-material-placer','RoomOneMaterialPlacer')} lets a player select Concrete, Metal, or Wood, preview a grid position, and send a placement request. ${scriptLink('lab-place-material-handler','PlaceMaterialHandler')} validates the request on the server, snaps it to the configured 2 stud grid, and places the clone in <code>LevelOneMaterials</code>.</p>
      <p>${scriptLink('lab-player-signal-handler','PlayerSignalHandler')} raycasts from the player toward a source with an Include filter for that material folder. It reads the first hit's <code>Attenuation</code> attribute and subtracts it from its signal estimate. The numeric attenuation attributes live on Roblox objects; their values are not present in the Luau source.</p>
      <h2 id="heatmap-obstacles">Heatmap obstacle choice</h2>
      <p>${scriptLink('lab-heatmap-handler','HeatmapHandler')} checks a thin oriented box between a tile and antenna. If multiple placed blocks overlap that volume, it chooses by explicit priority: <strong>Metal → Concrete → Wood</strong>. The chosen block's attenuation is scaled by an exponential shadow falloff based on tile-to-material distance.</p>
      <h2 id="town-zones">Small-town detectors</h2>
      <p>${scriptLink('town-ray-material-detection','RayMaterialDetection')} casts toward the nearest fixed tower through <code>TownAttenuationZones</code> and writes <code>Material</code> and <code>Attenuation</code>. ${scriptLink('town-wall-detection','WallDetection')} also writes those attributes by inspecting parts overlapping its visual ray toward <code>Source</code>. Both scripts are present; the source does not define a single precedence rule between their updates.</p>
      <p>The town's ${scriptLink('town-tower-signal-manager','TowerSignalManager')} reads the attenuation attribute. The material-lab and town systems therefore use different world objects and detection methods.</p>
      ${callout('info', 'Where losses are configured.', 'The scripts read the Attenuation attribute from material models or zones. Inspect those Studio objects when adjusting the loss values; the Luau source does not define a complete table of them.')}
    `);
};
