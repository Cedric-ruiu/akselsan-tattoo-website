# Aksel San Tattoo — Website

Static website for Aksel San Tattoo, a professional tattoo studio based in Strasbourg (Studio Asphalt Jungle, Ostwald).

**Stack:** Eleventy v3 · Bootstrap 5.3 · SCSS (sass-embedded) · Biome · GitHub Pages
**Deploy:** Automatic on push to `main` via GitHub Actions
**Author:** [Cédric Ruiu](https://github.com/cedric-ruiu)

## Licence

Le code source de ce projet (templates, configuration, assets techniques) est distribué sous licence MIT.
Le contenu présent dans ce dépôt — incluant les textes, photographies, logo et identité visuelle — est la propriété exclusive de **Aksel San Tattoo** et n'est pas couvert par la licence MIT. Toute reproduction, distribution ou utilisation de ce contenu sans autorisation écrite préalable est interdite.

---

## Guide de mise à jour du contenu

Ce guide permet de mettre à jour le contenu du site **sans aucune connaissance en développement**, uniquement via l'interface de GitHub.

> **Important** : toujours commiter sur la branche `main`. Le site se met à jour automatiquement en 1–2 minutes après chaque modification.

---

### Le Markdown

Les textes des pages utilisent le **Markdown**, un format simple pour mettre en forme du texte.
Référence complète : [markdownguide.org/basic-syntax](https://www.markdownguide.org/basic-syntax/)

Éléments essentiels :

```
## Titre de section
**texte en gras**
[texte du lien](/contact/)
```

---

### Modifier le texte d'une page

**Fichiers à modifier :**

| Page | Fichier |
|------|---------|
| Accueil | `src/index.md` |
| Portfolio | `src/portfolio/index.md` |
| Déroulement | `src/deroulement/index.md` |
| Flashs | `src/flashs/index.md` |
| Cover | `src/cover/index.md` |
| Contact | `src/contact/index.md` |

**Étapes sur GitHub :**

1. Ouvrir le fichier dans la liste ci-dessus
2. Cliquer sur l'icône crayon ✏️ (en haut à droite du fichier)
3. Modifier le texte **sous** la zone délimitée par `---` (ne pas modifier la zone entre les `---`)
4. Cliquer sur **Commit changes**
5. Vérifier que la branche est bien `main`, puis cliquer à nouveau sur **Commit changes**

---

### Préparer une image

Avant d'uploader une photo, suivre ces trois étapes :

1. **Redimensionner** la photo à la résolution souhaitée et l'enregistrer en bonne qualité (JPEG)
2. **Convertir en WebP** : [pixelied.com/convert/jpg-converter/jpg-to-webp](https://pixelied.com/convert/jpg-converter/jpg-to-webp)
3. **Compresser** le fichier `.webp` : [tinypng.com](https://tinypng.com/)

> Convention de nommage : minuscules, sans espaces ni accents (ex: `portfolio18.webp`, `cover-fond.webp`).

---

### Portfolio — Ajouter une photo

Le portfolio est géré par une liste de fichiers dans `_data/portfolio_images.yml`. Deux étapes :

**Étape 1 — Déposer l'image**

1. Aller dans le dossier `src/portfolio/` sur GitHub
2. Cliquer sur **Add file > Upload files**
3. Déposer l'image au format `.webp` (ex: `portfolio18.webp`)
4. Commiter sur `main`

> Convention de nommage : minuscules, sans espaces (ex: `portfolio18.webp`).
> Format recommandé : `.webp` (meilleure compression).

**Étape 2 — Référencer l'image**

1. Ouvrir le fichier `_data/portfolio_images.yml`
2. Ajouter une entrée à la fin de la liste :

```yaml
  - src: /portfolio/portfolio18.webp
    alt: "Tatouage [style] réalisé par Aksel San à Strasbourg — [courte description]"
```

> Remplacer `[style]` et `[courte description]` par les informations réelles (ex: `japonais`, `Carpe Koï sur l'avant-bras`).

3. Commiter sur `main`. L'image apparaît automatiquement dans la grille.

---

### Portfolio — Supprimer une photo

1. Ouvrir `_data/portfolio_images.yml`
2. Supprimer les deux lignes correspondantes (`- src:` et `alt:`). L'image disparaît de la grille.

> Le fichier image dans `src/portfolio/` peut être supprimé séparément via GitHub (ouvrir le fichier > icône poubelle), mais ce n'est pas obligatoire.

---

### Flashs — Mettre à jour les photos

La page Flashs affiche **exactement 2 images** : `flashs01.webp` et `flashs02.webp`.

**Pour remplacer une image :**

1. Aller dans `src/flashs/` sur GitHub
2. Supprimer l'ancien fichier (ouvrir le fichier > icône poubelle, commiter sur `main`)
3. Uploader le nouveau fichier **avec le même nom** (`flashs01.webp` ou `flashs02.webp`)
4. Commiter sur `main`

> Conserver les mêmes noms de fichiers évite toute modification supplémentaire.

---

### Modifier l'image dans le corps d'une page

Les pages **Accueil**, **Déroulement** et **Cover** affichent une photo au milieu du texte. Elle est placée directement dans le fichier `index.md` de la page, entre deux paragraphes, sous la forme d'une balise HTML :

```html
<img src="/cover/cover-fond.webp" alt="Exemple de cover-up réalisé par Aksel San" class="img-fluid page-content-image" loading="lazy">
```

**Pour remplacer cette image :**

1. Uploader la nouvelle image `.webp` dans le dossier de la page (ex: `src/cover/`)
2. Ouvrir le fichier `index.md` de la page
3. Repérer la ligne `<img src="...">` dans le corps du texte (sous la zone `---`)
4. Remplacer la valeur `src="..."` par le chemin de la nouvelle image, et `alt="..."` par une description adaptée
5. Commiter sur `main`

> Ne pas modifier les attributs `class="img-fluid page-content-image"` et `loading="lazy"`.

---

### Modifier l'image de fond d'une page

Chaque page a une image d'arrière-plan dans son dossier :

| Page | Dossier | Fichier actuel |
|------|---------|----------------|
| Accueil | `src/` | `accueil_fond.webp` |
| Portfolio | `src/portfolio/` | `portfolio01.webp` |
| Déroulement | `src/deroulement/` | `processus.webp` |
| Flashs | `src/flashs/` | `flashs01.webp` |
| Cover | `src/cover/` | `cover-fond.webp` |
| Contact | `src/contact/` | `contact-fond.webp` |

**Pour changer l'image de fond :**

1. Uploader la nouvelle image `.webp` dans le dossier correspondant
2. Ouvrir le fichier `index.md` de la page
3. Dans la zone entre `---`, modifier la valeur `heroBackground` :

```yaml
heroBackground: "/deroulement/nouvelle-image.webp"
```

4. Commiter sur `main`
