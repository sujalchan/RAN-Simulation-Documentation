/* Generated detail pages for the individual Luau scripts. */
export default (ctx) => {
  const { h, route, eventLink, pill, table, page, scripts, events, pages } = ctx;
const scriptBody = (item) => {
    const remoteRows = item.events.map(([direction, name, description]) => [
      h(direction),
      events.some((event) => event.name === name && (item.place === 'material-lab' ? event.place === 'Material lab' : event.place === 'Small town'))
        ? eventLink(name, name, item.place) : `<code>${h(name)}</code>`,
      h(description)
    ]);
    return `
      <div class="meta-row">${pill(item.place === 'material-lab' ? 'Material lab' : 'Small town', 'blue')}${pill(item.runtime)}${pill(item.kind, 'orange')}</div>
      <p class="script-path"><code class="path-code">${h(item.path)}</code></p>
      <div class="script-details"><div class="script-detail"><b>Expected Roblox class</b><span>${h(item.kind)} · ${h(item.runtime.toLowerCase())}</span></div><div class="script-detail"><b>Location</b><span>${h(item.path.split('/').slice(3,-1).join('/'))}</span></div></div>
      <h2 id="purpose">Purpose</h2><p>${h(item.summary)}</p>
      <h2 id="functions">Main functions and behavior</h2>
      <ul class="compact-list">${(item.functions.length ? item.functions : ['No named functions; its current behavior is contained directly in the script body.']).map((entry) => `<li>${h(entry)}</li>`).join('')}</ul>
      <h2 id="state">State and configuration</h2><p>${h(item.state || 'No independent configuration is defined in this file.')}</p>
      <h2 id="communication">Events and shared values</h2>
      ${remoteRows.length ? table(['Direction', 'Event or state', 'Role'], remoteRows) : '<p>This file does not fire or handle a RemoteEvent. Its role is local data or a simple standalone behavior.</p>'}
      <h2 id="dependencies">Dependencies</h2>
      ${table(['Category', 'Used here'], [['Roblox services / context', h(item.services.length ? item.services.join(', ') : 'No service calls in this file.')], ['Named objects or attributes', h(item.objects.length ? item.objects.join(', ') : 'No named external object dependency.')], ['Modules', h(item.modules.length ? item.modules.join(' ') : 'No ModuleScript is required by this file.')]])}
      <h2 id="related">Related documentation</h2>
      <ul>${item.related.map((id) => { const target = pages.find((entry) => entry.id === id); return `<li>${route(id, target ? h(target.title) : h(id))}</li>`; }).join('')}</ul>
    `;
  };

  return scripts.map((item) => page(`script/${item.id}`, item.name, 'Code reference', item.summary,
    [item.path, item.name, item.place, item.runtime, item.kind, ...item.functions, item.state, ...item.services, ...item.objects, ...item.events.flat(), ...item.modules, ...item.terms],
    () => scriptBody(item)));
};
