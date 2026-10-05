/* Page content: architecture. */
// Return metadata and a deferred HTML body; shared helpers are supplied by the page assembler.
export default (ctx) => {
  const { h, route, scriptLink, eventLink, pill, card, callout, table, highlight, code, diagram, script, scripts, events, page } = ctx;
  return page('architecture', 'Runtime structure', 'Architecture', 'How Roblox server scripts, client scripts, shared data, and world objects fit together.', ['client server', 'Roblox services', 'ReplicatedStorage', 'Workspace'], () => `
      <h2 id="boundaries">Execution boundaries</h2>
      ${diagram([[{title:'Client scripts',note:'StarterPlayer and StarterGui',tone:'orange'},{title:'RemoteEvents',note:'ReplicatedStorage',tone:''},{title:'Server scripts',note:'ServerScriptService',tone:'green'}],[{title:'Client views',note:'Dashboards and local visuals',tone:'orange'},{title:'Player attributes + Workspace',note:'Replicated state and world objects',tone:''},{title:'Server estimates',note:'Signal, placement, NPCs, rooms',tone:'green'}]], 'RemoteEvents carry requests; attributes and Workspace state carry results back to clients.')}
      <p>Each place runs server scripts for authoritative world changes and calculated attributes. Client scripts handle pointer input, sliders, UI, camera behavior, and local visuals. The client sends requests through named RemoteEvents; server scripts may write player attributes that clients read each frame or on attribute changes.</p>
      <h2 id="services">Services in the source</h2>
      ${table(['Roblox service', 'Role in this project'], [['<code>Players</code>', 'Character lifecycle, LocalPlayer, and per-player attributes.'], ['<code>RunService</code>', 'Heartbeat sampling on the server and RenderStepped visual/UI updates on clients.'], ['<code>ReplicatedStorage</code>', 'RemoteEvents, material/antenna templates, heatmap tile template, and FrequencyData.'], ['<code>Workspace</code>', 'Zones, signal sources, towers, placed models, NPCs, visual folders, and raycasts.'], ['<code>UserInputService</code>', 'Cursor, keyboard, touch, and slider input.'], ['<code>PhysicsService</code>', 'NPC collision group setup.'], ['<code>TweenService</code>', 'Room-one dashboard and camera zoom transitions.']])}
      <h2 id="state">State distribution</h2>
      <p><strong>Player attributes</strong> carry values such as <code>InRoomOne</code>, <code>FrequencyBand</code>, <code>RSRP</code>, <code>SINR</code>, and town antenna selection fields. <strong>Workspace objects</strong> carry placed materials, antennas, NPCs, and drawn visual parts. <strong>Local tables</strong> hold script-specific configuration or cached state, such as noise history and NPC tower connection counts.</p>
      <p>The material lab uses ${scriptLink('lab-frequency-data','FrequencyData')} as a shared lookup. Small-town frequency tables are local to individual scripts, so the two places do not use one common frequency module.</p>
      <h2 id="assumptions">Script roles</h2>
      <p>The paths group server scripts in <code>ServerScriptService</code>, client scripts in <code>StarterPlayer</code> and <code>StarterGui</code>, and the shared <code>FrequencyData</code> module in <code>ReplicatedStorage</code>. FrequencyData returns a table used by the room-one dashboard and signal handler.</p>
      <p>Continue with ${route('data-flow', 'Data flow')} for request-to-display traces, or browse ${route('code-reference', 'all script pages')}.</p>
    `);
};
