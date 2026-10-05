/* Page content: developer-guide. */
// Return metadata and a deferred HTML body; shared helpers are supplied by the page assembler.
export default (ctx) => {
  const { h, route, scriptLink, eventLink, pill, card, callout, table, highlight, code, diagram, script, scripts, events, page } = ctx;
  return page('developer-guide', 'Developer guide', 'Reference', 'How to trace, verify, and maintain features across the two places.', ['maintain', 'extend', 'trace', 'Roblox Studio'], () => `
      <h2 id="feature-trace">Trace a feature through the code</h2>
      <ol><li>Find the player control in <code>StarterGui</code> or <code>StarterPlayer</code>.</li><li>Look for a ${route('events','RemoteEvent')} or player attribute name used by that control.</li><li>Follow the event into <code>ServerScriptService</code>, or find the script writing the attribute.</li><li>Check dependent Workspace and ReplicatedStorage object names in that handler.</li><li>Return to the UI reader to see how the value is presented.</li></ol>
      <p>Example: frequency slider → ${scriptLink('lab-room-one-dashboard','RoomOneDashboard')} → ${eventLink('FrequencyChangedEvent')} → ${scriptLink('lab-player-signal-handler','PlayerSignalHandler')} and ${scriptLink('lab-heatmap-handler','HeatmapHandler')} → player metrics and tiles.</p>
      <h2 id="place-specific">Keep place-specific paths clear</h2>
      <p>The two places have separate NPC scripts, dashboards, signal models, and frequency state. Some event names recur in both places; interpret an event within its place. The ${route('code-reference','script index')} shows exact paths and execution roles.</p>
      <h2 id="changing-models">When a simulation setting changes</h2>
      <p>Identify every copy of a value before editing: material-lab frequency choices are present in ${scriptLink('lab-frequency-data','FrequencyData')} and the dashboard slider, while small-town scripts have independent tables. Heatmap, player metrics, and visual coverage each use different calculations. Document which display a change is meant to affect, then verify its event payload, server handler, and UI reader.</p>
      <h2 id="studio-dependencies">Roblox Studio dependencies</h2>
      <p>Many scripts use <code>WaitForChild</code> or <code>FindFirstChild</code> for templates, folders, zones, and RemoteEvents. The ${route('repository','repository map')} lists key object names; inspect the place hierarchy and object attributes in Roblox Studio when connecting or extending a feature.</p>
      <h2 id="evidence-limits">Evidence limits</h2>
      <p>The proposal establishes the 2degrees ShadowTech educational motivation, while the Luau source establishes current implementation. The Status Report provides project context; the Luau source remains the authority for implemented behavior. No ADB, Python telemetry pipeline, live phone data, or RSRQ calculation appears in the current source. The beam visualization also operates separately from player signal scoring.</p>
    `);
};
