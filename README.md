# devleadhunter-website-template-starter

GitHub **Template Repository** to scaffold a new DevLeadHunter website template — a
self-contained **Nuxt 4 layer** (Tailwind v4, strict TypeScript) that renders a typed
`SiteContent` into an artisan site and is consumed by `demo-host` via `extends`.

> Architecture reference: `TEMPLATES_ARCHITECTURE.md` in the main `devleadhunter` repo.
> A template knows **nothing** about the tunnel (Storyblok, PostHog, slugs, DB). It receives
> `content` and renders a site. That's it.

## Create a new template

1. Click **“Use this template”** → name the repo `devleadhunter-template-<id>`
   (e.g. `devleadhunter-template-plumber-cuivre`).
2. `npm install`
3. `npm run dev` → open the `.playground` and build your design.
4. Rename `app/components/DevLeadHunterStarterRoot.vue` → `<TemplateId>Root.vue`
   (a unique root name per template) and update the import in `.playground/app/app.vue`.
5. Build your sections in `app/components/sections/`, tune the DA in
   `app/assets/css/template.css`, and set your fonts in the root component's `useHead`.
6. `npm run lint` must pass, then tag `v1.0.0`.

## The contract (only 3 coupling points)

1. **`template_id`** — the id in the repo name, the demo-host dispatch and the Python builder.
2. **`SiteContent`** — the typed props (see `app/types/SiteContent.ts`). Every key is optional;
   an empty/absent key hides its section.
3. **`api/services/templates/<id>.py`** — produces a `content_json` conforming to `SiteContent`.

> `app/types/SiteContent.ts` is a **temporary local copy**. Once the shared
> `@devleadhunter/website-content` package exists (Phase 2), replace that file's body with a
> re-export from the package so the type never drifts.

## How demo-host consumes it

The template repos are **public**, so demo-host pulls them as Nuxt layers with **no token**:

```ts
// demo-host/nuxt.config.ts
export default defineNuxtConfig({
  extends: [
    'github:DevLeadHunter/devleadhunter-template-plumber-cuivre#v1.0.0',
    // …one line per template, pinned by tag
  ],
})
```

demo-host dispatches `template_id → root component` with `defineAsyncComponent`, so each
prospect's demo only downloads that template's chunk.

## Collision-free by construction

Only the **root** component is auto-registered globally (unique name per template). Sections
live in `app/components/sections/` and are **imported relatively** by the root — they are
ignored from global auto-import (`nuxt.config.ts`), so two templates can both have a
`HeroSection` without clashing in demo-host's registry.

## Local development

```bash
npm install
npm run dev        # http://localhost:3000 — renders the root with content.ts mock
npm run lint       # prettier + eslint + vue-tsc
npm run lint:fix
npm run build      # builds the .playground in isolation
```

## Structure

```
devleadhunter-website-template-starter/
├── app/
│   ├── assets/css/template.css              # Tailwind v4 + design tokens (the DA)
│   ├── components/
│   │   ├── DevLeadHunterStarterRoot.vue      # THE root — rename per template
│   │   └── sections/                         # relative-only sections (not global)
│   └── types/SiteContent.ts                  # content contract (temporary local copy)
├── .playground/                              # dev/preview app (extends the layer)
├── content.ts                                # mock SiteContent for the playground
├── nuxt.config.ts                            # layer config
└── package.json                              # main: ./nuxt.config.ts
```

## Conventions

Same code standards as the main repo (TypeScript strict, runtime `defineProps` + `PropType`,
JSDoc, conventional commits). See `STANDARDS_CODE_ET_ARCHITECTURE.md` in the `devleadhunter` repo.
