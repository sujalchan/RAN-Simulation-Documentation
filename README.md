# RAN Simulator Documentation

Developer documentation website for the **RAN Simulator**, built with React, TypeScript, and Vite.

The RAN Simulator is a hands-on Roblox experience created for the **2degrees booth at the ShadowTech programme**. It helps Year 9–11 students explore mobile network ideas through interactive activities about signal coverage, materials, frequencies, and antenna placement.

The site documents the architecture, Luau scripts, simulation systems, client/server communication, and telecommunications concepts used by the Roblox Studio implementation.

The site should be avaliable here: [RAN-Simulation-Documentation Site](https://sujalchan.github.io/RAN-Simulation-Documentation/docs/overview/)

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) — version 22 recommended
- npm
- Git

You can check your installed versions with:

```sh
node --version
npm --version
git --version
```

### Clone the Repository

Clone the repository from GitHub:

```sh
git clone https://github.com/sujalchan/RAN-Simulation-Documentation.git
```

Move into the project directory:

```sh
cd RAN-Simulation-Documentation/src-website-docs
```

### Install Dependencies

Install the required Node packages:

```sh
npm install
```

### Run Locally

Start the Vite development server:

```sh
npm run dev
```

Vite will display the local development URL in the terminal, typically:

```text
http://localhost:5173
```

Open this address in your browser to view the documentation site.

Changes made to the source files will automatically update the site during development.

## Production Build

Create an optimised production build with:

```sh
npm run build
```

The generated static site will be placed in `dist/`.

To preview the production build locally:

```sh
npm run preview
```

The build creates a static entry file for each documentation URL, so GitHub Pages can serve direct links and refreshes without server-side rewrites. `.github/workflows/deploy-docs.yml` deploys the site when relevant files are pushed to `main`.

## Project Structure

```text
src/
├── components/
│   └── docs/          Shared documentation UI components
│
├── config/
│   └── docsConfig.ts  Documentation registry and navigation metadata
│
├── data/
│   └── docsData.js    Source-led documentation and project metadata
│
├── docs/              Individual documentation pages
│
└── styles/
    └── site.css       Main responsive glass and gradient styling
```

### Key Files

- `src/config/docsConfig.ts` defines documentation routes, searchable metadata, page ordering, categories, and navigation.
- `src/docs/` contains the individual documentation pages and code-reference content.
- `src/components/docs/` contains shared layout, sidebar, navigation, search, breadcrumb, and table-of-contents components.
- `src/data/docsData.js` contains source-led project information, script metadata, RemoteEvent information, diagrams, and documentation sections migrated from the earlier site.
- `src/styles/site.css` contains the responsive glassmorphism and gradient visual design, including reduced-motion support.

## Documentation Sources

The documentation describes the **current Roblox Studio implementation** of the RAN Simulator.

When determining how the system behaves, the documentation follows this source priority:

1. Current Roblox Studio / Luau source code
2. `resources/status report.md`
3. Current supporting project documentation
4. `Project Proposal.md` for historical project context

The original project proposal described an earlier approach involving a rooted Android device, ADB, Python, and Matplotlib. That approach was replaced during development and is **not** the current system architecture.

The current project uses **Roblox Studio and Luau** to provide an educational simulation of Radio Access Network concepts.

## Technology

- React
- TypeScript
- Vite
- Node.js
- HTML / CSS
- Roblox Studio and Luau as the documented platform

## Repository

Source code is available at:

https://github.com/sujalchan/RAN-Simulation-Documentation
