/* Page content: repository. */
export default (ctx) => {
  const { h, route, scriptLink, eventLink, pill, card, callout, table, highlight, code, diagram, script, scripts, events, page } = ctx;
  return page('repository', 'Repository map', 'Getting started', 'How the two Roblox places and documentation files are arranged in the project source.', ['folders', 'paths', 'Studio', 'source tree'], () => `
      <h2 id="layout">Source layout</h2>
      ${code(`src/Places/\n├── material-lab/\n│   ├── ReplicatedStorage/FrequencyData.luau\n│   ├── ServerScriptService/       (7 server scripts)\n│   ├── StarterPlayer/             (4 client scripts)\n│   └── StarterGui/                (6 client scripts)\n└── small-town/\n    ├── ServerScriptService/       (8 server scripts)\n    ├── StarterPlayer/             (3 client scripts)\n    └── StarterGui/                (3 client scripts)`, 'Repository source directories').replace('<span class="language">Luau</span>', '<span class="language">Tree</span>')}
      <p>Those locations mirror Roblox service containers. <code>ServerScriptService</code> holds the server-side logic. <code>StarterPlayer</code> and <code>StarterGui</code> hold code intended to run on a player client. <code>ReplicatedStorage</code> holds the shared <code>FrequencyData</code> module and is referenced for RemoteEvents and assets.</p>
      <h2 id="place-boundary">Two separate places</h2>
      <p>The material lab and small town each have their own <code>NPCSpawner</code> and <code>NPCControlScript</code>. Their similarly named scripts implement place-specific behavior; do not treat them as one shared runtime. ${route('code-reference', 'The script index')} groups the exact paths by place.</p>
      <h2 id="studio-objects">Studio objects referenced by code</h2>
      ${table(['Material lab', 'Small town'], [[`<code>RoomOneZone</code>, <code>RoomTwoZone</code>, <code>SignalSourcesFolder</code>, <code>LevelOneMaterials</code>`, `<code>CellTowers</code>, <code>PlacedAntennas</code>, <code>TownAttenuationZones</code>, <code>NPCs</code>`], [`<code>LevelOne.HeatmapTile</code>, <code>PlaceableMaterials</code>, <code>DashboardGui</code>`, `<code>AntennaModels</code>, <code>StartButton.ProximityPrompt</code>, <code>DashboardGui</code>`]])}
      <h2 id="reading-source">Finding a feature</h2>
      <p>Start with a UI control in <code>StarterGui</code> or <code>StarterPlayer</code>, follow any ${route('events', 'RemoteEvent')} through <code>ReplicatedStorage</code>, then read its server handler. For displayed metrics, also follow the player attributes written by server scripts back to dashboard readers.</p>
    `);
};
