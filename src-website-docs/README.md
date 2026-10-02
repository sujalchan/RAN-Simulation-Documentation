# RAN Network Simulator documentation

React, TypeScript, and Vite application for the Roblox Studio and Luau simulator documentation.

## Development

```sh
npm install
npm run dev
```

Create the deployable static site with `npm run build`; preview it locally with `npm run preview`. The Vite history fallback serves deep documentation URLs during development and preview. Production hosting should rewrite `/docs/**` requests to `index.html` so direct links continue to work.

## Structure

- `src/config/docsConfig.ts` defines the documentation registry, routes, searchable metadata, and navigation source.
- `src/docs/` has a component for each main documentation topic; script references use the shared script reference page layout.
- `src/components/docs/` contains shared page, navigation, search, breadcrumb, and table-of-contents components.
- `src/data/docsData.js` preserves the source-led material, script metadata, event metadata, diagrams, and page sections from the prior site.
- `src/styles/site.css` carries forward the existing responsive glass and gradient design, with reduced-motion support.

The Luau source is the authority for runtime behavior and paths. `resources/status report.md` gives project context; the proposal is historical. This site documents the Roblox implementation and does not describe the retired Android/ADB/Python plan as current.
