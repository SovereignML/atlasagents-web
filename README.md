# atlasagents-web

The **Atlas Agents product / marketing site** — served at **atlasagents.dev**.

Frontend only: **no database, no auth backend, no secrets.** Every route is statically
prerendered at build time.

This repo supersedes `sovereignml-web`, which served the same domain as a brand-first
landing page. The rebuild is **product-first**: what the product is, how you choose
between the ways to run it, what each agent role does, which runtime to pick, and what
it costs at spec level — modelled on the choice-architecture and depth of comparable
infrastructure sites.

`sovereignml-web` is left intact and untouched until you flip the deploy target.

## Develop

```bash
cp .env.example .env
npm install
npm run dev          # http://localhost:3002
npm run build        # production build — every route must stay static (○)
npm run lint
npm run typecheck
```

Dev runs on **3002** deliberately: `sovereignml-app` and `sovereignml-web` both claim
port 3000 and their `predev` scripts kill whatever holds it.

## Deploy

Two supported paths, both from the same source.

**Container** (any host) — builds on Next's `output: "standalone"`:

```bash
docker build -t atlasagents-web .
docker run --rm -p 3002:3000 --env-file .env atlasagents-web
```

`NEXT_PUBLIC_*` values are inlined at **build** time, so pass them as `--build-arg`
if they differ from the defaults in the Dockerfile.

**Vercel** — import the repo; it ignores the Dockerfile and builds from source. Set the
same `NEXT_PUBLIC_*` env vars in the project settings.

## How it links to the app

There are no sessions here. Auth/app links (`/login`, `/register`, `/dashboard`,
`/forgot-password`, `/admin`, `/tenant-admin`) are **redirected** to
`NEXT_PUBLIC_APP_URL` (default `https://app.atlasagents.dev`) by `next.config.ts`.
`next-auth` is replaced by a logged-out stub (`src/lib/auth-stub.tsx`), so the shared
navbar and analytics components render as anonymous.

Pre-rename hosts (`sovereignml.com`, `app.sovereignml.com`) are permanently redirected —
site hosts to this site, app hosts to the dashboard. See `BRANDING.legacyHosts`.

## Structure

```
src/
├── app/
│   ├── page.tsx              landing page
│   └── (marketing)/          every other route
├── components/
│   ├── layout/               navbar, footer
│   ├── marketing/
│   │   ├── primitives/       the density kit — spec tables, matrices, catalogs
│   │   ├── sections/         homepage sections
│   │   ├── pricing/          plan grids, toggles, BYOS panel
│   │   └── motion/           Reveal / RevealGroup / smooth scroll
│   └── ui/                   shared UI primitives
├── configs/                  ← all page content lives here
└── lib/                      client helpers
```

**Content lives in `src/configs/`, not in JSX.** Pages are presentational; every fact
(plans, server sizes, runtimes, agent roles, integrations) has exactly one home. Product
facts are mirrored from `sovereignml-app/docs/` — when the platform changes, update the
config, not the page.

`src/configs/agent-categories.ts` is intentionally kept in sync with the copy in
`sovereignml-app`. Marketing-only depth for each role lives beside it in
`agent-marketing.ts` so the shared file stays syncable.
