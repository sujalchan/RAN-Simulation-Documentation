/* Page content: searchable index of individual Luau scripts. */
export default (ctx) => {
  const { h, page, scripts } = ctx;
  // Render the catalog as filterable groups; App handles the data-filter buttons after HTML insertion.
  return page('code-reference', 'Script index', 'Reference', 'All 32 Luau files, grouped by place with a conceptual reference page for each one.', ['scripts', 'ModuleScript', 'LocalScript', 'Script', 'paths'], () => `
    <p>Each script page records its exact path, execution side, main functions, state, services, Roblox objects, and communication points.</p>
    <div class="script-filters" role="group" aria-label="Filter scripts by place">
      <button class="filter-button active" type="button" data-filter="all" aria-pressed="true">All <span>${scripts.length}</span></button>
      <button class="filter-button" type="button" data-filter="material-lab" aria-pressed="false">Material lab <span>${scripts.filter((item) => item.place === 'material-lab').length}</span></button>
      <button class="filter-button" type="button" data-filter="small-town" aria-pressed="false">Small town <span>${scripts.filter((item) => item.place === 'small-town').length}</span></button>
    </div>
    <h2 id="material-lab-scripts">Material lab</h2>
    <div class="reference-grid">${scripts.filter((item) => item.place === 'material-lab').map((item) => `<a class="reference-item" data-script-place="material-lab" href="#/script/${item.id}"><strong>${h(item.name)} →</strong><code>${h(item.path)}</code><p>${h(item.summary)}</p></a>`).join('')}</div>
    <h2 id="small-town-scripts">Small town</h2>
    <div class="reference-grid">${scripts.filter((item) => item.place === 'small-town').map((item) => `<a class="reference-item" data-script-place="small-town" href="#/script/${item.id}"><strong>${h(item.name)} →</strong><code>${h(item.path)}</code><p>${h(item.summary)}</p></a>`).join('')}</div>
  `);
};
