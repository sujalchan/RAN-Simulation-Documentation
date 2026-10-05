/* Generated page content: RemoteEvents and replicated attributes. */
export default (ctx) => {
  const { h, route, scriptLink, table, page, events, scripts } = ctx;
  // Build the sender/receiver rows from the event catalog so references stay in sync with script metadata.
  const eventRows = (place) => events.filter((event) => event.place === place).map((event) => [
    `<span id="${event.id}"></span><code>${h(event.name)}</code><br><small>${h(event.direction)}</small>`,
    scriptLink(event.sender, scripts.find((item) => item.id === event.sender)?.name || event.sender),
    event.receivers.map((id) => scriptLink(id, scripts.find((item) => item.id === id)?.name || id)).join(', '),
    `<code>${h(event.arguments)}</code><br>${h(event.purpose)}`
  ]);
  return page('events', 'Events and communication', 'Architecture', 'RemoteEvent payloads, senders, receivers, and replicated attribute flows.', ['RemoteEvent', 'FrequencyChangedEvent', 'ToggleHeatmapEvent', 'NPCSpawnEvent', 'PlaceAntenna', 'ResetGame'], () => `
    <h2 id="lab-events">Material-lab RemoteEvents</h2>
    ${table(['Event', 'Sender', 'Receiver', 'Arguments and purpose'], eventRows('Material lab'))}
    <h2 id="town-events">Small-town RemoteEvents</h2>
    ${table(['Event', 'Sender', 'Receiver', 'Arguments and purpose'], eventRows('Small town'))}
    <h2 id="attributes">Player attributes</h2>
    ${table(['Place', 'Written by', 'Important values and readers'], [
      ['Material lab', scriptLink('lab-room-detection','RoomDetection'), '<code>InRoomOne</code>, <code>InRoomTwo</code>, antenna type and angles → camera, dashboards, popup, and controls.'],
      ['Material lab', scriptLink('lab-player-signal-handler','PlayerSignalHandler'), '<code>FrequencyBand</code>, <code>FrequencyDivisor</code>, <code>RSRP</code>, <code>SINR</code>, <code>Material</code>, <code>Attenuation</code>, <code>TowerDistance</code>, <code>ClosestSignalSource</code> → room dashboards and controls.'],
      ['Small town', scriptLink('town-ray-material-detection','RayMaterialDetection') + ' / ' + scriptLink('town-wall-detection','WallDetection'), '<code>Material</code> and <code>Attenuation</code> → TowerSignalManager; both detectors write these names.'],
      ['Small town', scriptLink('town-antenna-signal-manager','AntennaSignalManager'), '<code>PlacedAntennaName</code>, <code>PlacedAntennaSignal</code>, <code>PlacedAntennaNPCLoad</code>, <code>PlacedAntennaInRange</code> → TownDashboardScript.'],
      ['Small town', scriptLink('town-cell-tower-visualizer','CellTowerVisualizer'), '<code>CoverageScore</code> → antenna placement results UI. This LocalScript writes the attribute on the client.']
    ])}
    <p>Follow complete feature paths in ${route('data-flow','Data flow')}; the ${route('code-reference','script index')} gives per-file interfaces.</p>
  `);
};
