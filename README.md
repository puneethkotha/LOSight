# LOSight

Length of stay prediction for New York State hospitals. Risk-stratify patients at admission for proactive discharge planning and bed management. Built on SPARCS 2024 data.

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

### GitHub Pages

1. Push to GitHub. Ensure `vite.config.ts` has `base: './'` for project sites, or `base: '/repo-name/'` if the site will live at `username.github.io/repo-name`.
2. In repo Settings, Pages, set source to GitHub Actions.
3. Add `.github/workflows/deploy.yml` (see below) and push. The workflow builds and deploys automatically.

### Vercel

1. Import the repo at [vercel.com](https://vercel.com).
2. Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`.
3. Deploy. For project subpath, set Root Directory if needed.

### Base Path

For GitHub Pages project sites (`username.github.io/repo-name`), set in `vite.config.ts`:

```ts
base: '/LOSight/',  // or your repo name
```

For Vercel or root domain, use `base: '/'`.
