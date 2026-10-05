/* Page content: overview. */
export default (ctx) => {
  const { h, route, scriptLink, eventLink, pill, card, callout, table, highlight, code, diagram, script, scripts, events, page } = ctx;
  return page('overview', 'Overview', 'Getting started', 'Why the RAN Simulator was built for the 2degrees ShadowTech booth and how its activities introduce mobile network ideas.', ['RAN', 'Roblox', '2degrees', 'ShadowTech', 'Year 9–11'], () => `
      <div class="meta-row">${pill('Roblox Studio', 'blue')}${pill('Luau', 'blue')}${pill('2 places')}${pill('32 source files', 'orange')}</div>
      <h2 id="purpose">Purpose</h2>
      <p>The RAN Simulator was created for the <strong>2degrees booth at the ShadowTech programme</strong>. It gives Year 9–11 students a hands-on way to explore ideas behind mobile networks through a playful, simplified Roblox experience.</p>
      <p>Students can see how signal coverage responds to distance, frequency, materials, antenna placement, and interference. The goal is to make invisible network behavior easier to notice, discuss, and connect to the technology people use every day.</p>
      <aside class="overview-play-cta" aria-label="Play the Roblox experience"><div class="overview-play-copy"><span>Try it yourself</span><strong>ShadowTech Signal Challenge</strong><small>Explore the simulator on Roblox</small></div><a href="https://www.roblox.com/games/95885971158871/ShadowTech-Signal-Challenge" target="_blank" rel="noreferrer">Play on Roblox <span aria-hidden="true">↗</span></a></aside>
      <h2 id="booth-activities">At the booth</h2>
      <p>The experience includes two activities. In the <strong>material lab</strong>, students experiment with signal sources, materials, antennas, and room-based demonstrations. In the <strong>small town</strong>, they place antennas around a town and explore how coverage and signal displays change as the scene and its NPC population change.</p>
      <p>Both activities use visual displays such as signal metrics and heatmaps to support exploration. These are educational estimates designed to illustrate network concepts; they are not live measurements from a real mobile network.</p>
      <p>The documentation describes how those experiences are implemented: Luau scripts manage interactions, server-side simulation values, local visuals, and dashboards.</p>
      ${callout('info', 'Current implementation.', 'This documentation follows the Roblox Studio and Luau source. The earlier project proposal describes a phone, ADB, Python, and Matplotlib concept that was superseded during development.')}
      <h2 id="reading-map">Reading map</h2>
      <div class="card-grid">
        ${card('repository', 'Start here', 'Repository map', 'Find both places, their server scripts, client scripts, and shared module.')}
        ${card('architecture', 'Architecture', 'Runtime structure', 'Understand services, Workspace objects, attributes, and RemoteEvents.')}
        ${card('simulation/signal', 'Simulation', 'Signal metrics', 'Follow RSRP-like and SINR calculations and their display limits.')}
        ${card('code-reference', 'Reference', 'Script index', 'Open a conceptual reference page for every Luau source file.')}
      </div>
      <h2 id="scope">Documented scope</h2>
      <p>The source implements 4G/5G-labelled frequency choices, simulated signal values, material attenuation, RSRP and SINR displays, heatmaps, antenna patterns, NPC load, and gameplay controls. ${route('terminology', 'Terminology')} distinguishes the network concepts from the educational approximations used here.</p>
      <p>The source does not contain a computed RSRQ metric or the proposed hardware telemetry pipeline. See ${route('simulation/signal', 'signal metrics')} for the implemented formulas and their limits.</p>
      <h2 id="source-of-truth">Source of truth</h2>
      <p>Code behavior and exact file paths come from <code>src/Places</code>. The repository ${route('repository', 'map')} lists Studio objects referenced by those scripts. The README describes the current Roblox project; the proposal provides motivation and historical context. The supplied Status Report records the project’s shift to the current Roblox simulation and its planned deliverables.</p>
    `);
};
