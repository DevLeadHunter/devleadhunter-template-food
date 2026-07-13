# devleadhunter-template-food

Nuxt 4 layer — template **food trucks** (restaurant / food truck landing), intégrée pixel-perfect depuis la maquette Pencil.

## Dev

```bash
npm install
npm run dev
```

Playground : [http://localhost:3000](http://localhost:3000) (ou le port alternatif affiché).

## Structure

- `app/components/FoodRoot.vue` — point d’entrée layer
- `app/components/sections/*` — Hero, About, Menu, Testimonial, Contact
- `app/data/site.ts` — contenu hardcodé (miroir maquette)
- `public/images/` — assets + SVG exportés depuis Pencil
- `.playground/` — app de preview isolée

## Hors scope (plus tard)

Contrat `SiteContent`, Storyblok, registre API, `extends` demo-host.
