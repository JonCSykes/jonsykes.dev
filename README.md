<div align="center">
  <img src="public/logo/jonsykesdev_logo-black-bg.svg" width="150" height="150" alt="jonsykes.dev logo" />
  <h1>jonsykes.dev</h1>
  <p>Builder, founder, and engineering leader. Notes on AI, architecture, and modern engineering.</p>

  [![Astro](https://img.shields.io/badge/Astro-5.16-black?logo=astro)](https://astro.build/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-Native-blue?logo=typescript)](https://www.typescriptlang.org/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)<br/>
  [![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
  [![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
  [![PNPM](https://img.shields.io/badge/PNPM-package_manager-F69220?logo=pnpm)](https://pnpm.io/)

  [Deploy](https://jonsykes.dev) <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  [About](https://jonsykes.dev/about) <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  [Blog](https://jonsykes.dev/blog) <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  [Projects](https://jonsykes.dev/projects)
</div>

## 📌 About

This is the source for https://jonsykes.dev. It includes:

- A blog powered by Astro Content Collections
- A projects page with external links
- A personal biography section with a local portrait asset

## 📌 Technologies

- 🔥 _Astro - Framework_
- 🔥 _TailwindCSS - Style_
- 🔥 _TypeScript - Typing_
- 🔥 _Content Collections API - Content_
- 🔥 _Plaiceholder - Image placeholders_
- 🔥 _Tooling - ESLint, Prettier, Husky_

## 📌 Specifications

- ✅ _Responsive_
- ✅ _SEO-friendly_
- ✅ _Accessible_
- ✅ _Tailwind Styled_
- ✅ _Auto Generated Sitemap_
- ✅ _Auto Generated RSS Feed_
- ✅ _Markdown Support_

## 💻 Setup

To run this project, you need the following tools installed:

- 🟢 [Node.js](https://nodejs.org/) (v22 or higher)
- 🟠 [pnpm](https://pnpm.io/) (Package Manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/JonCSykes/jonsykes.dev
   cd jonsykes.dev
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm run dev
   ```

### 🔑 Environment Variables

Create a `.env` file in the project root. You can start from `.env.example`:

```bash
cp .env.example .env
```

Required values:

```env
# No required environment variables for core site/blog rendering.
```

## 🧞 Commands

| Command               | Action                                       |
| :-------------------- | :------------------------------------------- |
| `pnpm install`        | Installs dependencies                        |
| `pnpm run dev`        | Starts local dev server at `localhost:4321`  |
| `pnpm run build`      | Build your production site to `./dist/`      |
| `pnpm run preview`    | Preview your build locally, before deploying |
| `pnpm run lint`       | Run ESLint with autofix                      |
| `pnpm run format`     | Run Prettier                                |
| `pnpm run astro sync` | Sync content collections and generate types  |
