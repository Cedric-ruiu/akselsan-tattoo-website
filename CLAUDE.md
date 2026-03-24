# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev       # Start dev server with live reload (Eleventy --serve)
yarn build     # Build the site to _site/
yarn lint      # Check code with Biome
yarn format    # Auto-format and fix with Biome
```

Use `yarn` (v4, Berry) as the package manager — not npm or npx.

## Stack

- **Static site generator**: Eleventy (11ty) v3
- **CSS framework**: Bootstrap 5.3 (variables overridden in `src/css/_bootstrap-variables.scss`)
- **SCSS compiler**: sass-embedded (integrated into Eleventy, no separate step)
- **Linter/formatter**: Biome v2 (replaces ESLint + Prettier)
- **Output directory**: `_site/` (generated, not committed)

## Code style

Biome enforces: 2-space indentation, double quotes for JS strings, recommended linting rules. Run `yarn format` before committing.

## Architecture des fichiers

```
akselsan-tattoo-website/
├── _data/                    # Données globales (YAML) — navigation, contact, images portfolio
│   ├── site.yml              # Titre, navigation, SEO, réseaux sociaux
│   ├── contact.yml           # Infos studio (adresse, téléphone, email)
│   └── portfolio_images.yml  # Liste des images du portfolio (chemins)
├── _includes/
│   ├── layouts/              # Templates de page (héritent de base.njk)
│   └── partials/             # Composants réutilisables (header, footer, hero…)
├── src/                      # Sources du site (input Eleventy)
│   ├── index.md              # Page d'accueil
│   ├── accueil_fond.webp     # Images de la page d'accueil
│   ├── portfolio/
│   │   ├── index.md          # Page portfolio
│   │   └── portfolio01.webp  # Images du portfolio (même dossier)
│   ├── deroulement/
│   │   ├── index.md
│   │   └── processus.webp
│   ├── contact/
│   │   ├── index.md
│   │   └── contact.webp
│   ├── cover/
│   │   ├── index.md
│   │   └── cover.webp
│   ├── flashs/
│   │   ├── index.md
│   │   └── flashs01.webp, flashs02.webp
│   ├── img/
│   │   └── akselsan-logo.svg # Logo (asset global)
│   └── css/                  # Styles SCSS
│       ├── style.scss         # Point d'entrée (imports)
│       ├── _bootstrap-variables.scss
│       └── components/        # Partials SCSS (_hero-image.scss, _buttons.scss…)
├── public/                   # Assets statiques globaux (copiés tels quels)
│   ├── favicon.png
│   ├── images/
│   │   └── chevron-down.svg
│   └── js/
│       └── scripts.js        # Menu mobile (vanilla JS)
└── eleventy.config.js        # Configuration Eleventy
```

## Ajouter ou modifier des images

Les images sont placées **dans le même dossier que la page qui les utilise**.

| Page | Dossier des images |
|------|--------------------|
| Accueil | `src/` (racine) |
| Portfolio | `src/portfolio/` |
| Déroulement | `src/deroulement/` |
| Contact | `src/contact/` |
| Cover | `src/cover/` |
| Flashs | `src/flashs/` |

Toutes les images en format `.webp` sont copiées automatiquement vers `_site/` lors du build — pas de configuration nécessaire.

### Ajouter une image de portfolio

1. Déposer l'image dans `src/portfolio/` (ex: `portfolio18.webp`)
2. Ajouter la ligne correspondante dans `_data/portfolio_images.yml` :
   ```yaml
   - /portfolio/portfolio18.webp
   ```
3. L'image apparaît automatiquement dans la grille.

### Convention de nommage

- Utiliser le format `.webp` (meilleure compression, qualité identique)
- Noms en minuscules, sans espaces ni accents (ex: `contact.webp`, `portfolio01.webp`)

## Modifier les données du site

- **Navigation, réseaux sociaux, SEO** → `_data/site.yml`
- **Coordonnées du studio** → `_data/contact.yml`
- **Textes des pages** → fichiers `src/*/index.md`

## Content ownership

Site content (texts, photos, logo, visual identity) is owned exclusively by Aksel San Tattoo and is **not** covered by the MIT license. Only modify content with explicit authorization.
