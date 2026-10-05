/* Shared helpers for documentation content modules. */
// Escape plain text before inserting it into HTML authored by the page modules.
export const h = (value) => String(value).replace(/[&<>"']/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"})[char]);
// Internal links use a hash-like authoring form that docsConfig converts for the current deployment base.
export const route = (id, label) => `<a href="#/${id}">${label}</a>`;
export const scriptLink = (id, label) => route(`script/${id}`, label);
export const eventLink = (name, label = name, place = 'material-lab') => route(`events@${place === 'small-town' ? 'town' : 'lab'}-${name.toLowerCase()}`, `<code>${h(label)}</code>`);
// Small HTML builders keep repeated UI markup consistent across content pages.
export const pill = (label, color = '') => `<span class="pill ${color}">${h(label)}</span>`;
export const card = (id, kicker, title, description) => `<a class="doc-card" href="#/${id}"><span class="card-kicker">${h(kicker)}</span><strong>${h(title)} →</strong><p>${h(description)}</p></a>`;
export const callout = (kind, title, body) => `<aside class="callout ${kind}"><span class="callout-icon" aria-hidden="true">${kind === 'warning' ? '!' : kind === 'info' ? 'i' : '✓'}</span><p><strong>${title}</strong> ${body}</p></aside>`;
export const table = (heads, rows) => `<div class="data-table-wrap${heads.length >= 4 ? ' is-wide' : heads.length === 3 ? ' is-medium' : ''}"><table class="data-table"><thead><tr>${heads.map((head) => `<th scope="col">${head}</th>`).join('')}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
export const highlight = (source) => {
    // Tokenize only the Luau constructs highlighted by this site; preserve all other source as text.
    const pattern = /(--[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b(?:local|function|return|if|then|else|elseif|end|for|in|do|and|or|not|true|false|nil|continue)\b|\b\d+(?:\.\d+)?\b)/g;
    let output = '';
    let previous = 0;
    for (const match of source.matchAll(pattern)) {
      output += h(source.slice(previous, match.index));
      const token = match[0];
      const type = token.startsWith('--') ? 'comment' : /^['"]/.test(token) ? 'string' : /^\d/.test(token) ? 'number' : 'keyword';
      output += `<span class="tok-${type}">${h(token)}</span>`;
      previous = match.index + token.length;
    }
    return output + h(source.slice(previous));
  };
export const code = (source, caption = 'From the Luau source') => `<div class="code-block"><div class="code-caption"><span>${h(caption)}</span><span class="language">Luau</span></div><pre><code>${highlight(source.trim())}</code></pre></div>`;
export const diagram = (rows, caption) => `<div class="diagram" role="img" aria-label="${h(caption)}">${rows.map((nodes) => `<div class="diagram-row">${nodes.map((node, index) => `${index ? '<span class="diagram-arrow" aria-hidden="true">→</span>' : ''}<div class="diagram-node ${node.tone || ''}"><strong>${h(node.title)}</strong><span>${h(node.note)}</span></div>`).join('')}</div>`).join('')}<div class="diagram-caption">${h(caption)}</div></div>`;

// Derive each script's stable docs ID and Roblox runtime metadata from its place and source path.
export const script = (place, location, summary, options = {}) => {
    const filename = location.split('/').pop();
    const stem = filename.replace(/\.luau$/, '');
    const id = `${place === 'material-lab' ? 'lab' : 'town'}-${stem.replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`;
    const runtime = location.startsWith('ReplicatedStorage/') ? 'Shared' : location.startsWith('ServerScriptService/') ? 'Server' : 'Client';
    const kind = runtime === 'Shared' ? 'ModuleScript' : runtime === 'Server' ? 'Script' : 'LocalScript';
    return { id, name: stem, path: `src/Places/${place}/${location}`, place, runtime, kind, summary, functions: [], state: '', services: [], objects: [], events: [], modules: [], related: [], terms: [], ...options };
  };

export const page = (id, title, group, summary, tags, body) => ({ id, title, group, summary, tags, body });
