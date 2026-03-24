import path from "node:path";
import { fileURLToPath } from "node:url";
import * as sass from "sass-embedded";
import YAML from "yaml";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function (eleventyConfig) {
  // ── YAML data files ─────────────────────────────────────────────
  eleventyConfig.addDataExtension("yml,yaml", (contents) =>
    YAML.parse(contents),
  );

  // ── SCSS via sass-embedded (intégré au build Eleventy) ──────────
  eleventyConfig.addTemplateFormats("scss");
  const cssEntryDir = path.join(__dirname, "src", "css");

  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    compile: async function (inputContent, inputPath) {
      const basename = path.basename(inputPath);
      const absoluteDir = path.resolve(path.dirname(inputPath));

      // Ignorer les partials (commençant par _) et les fichiers dans des sous-dossiers
      if (basename.startsWith("_") || absoluteDir !== cssEntryDir) return;

      const result = sass.compileString(inputContent, {
        loadPaths: [absoluteDir, path.join(__dirname, "node_modules")],
        sourceMap: false,
        style:
          process.env.ELEVENTY_RUN_MODE === "serve" ? "expanded" : "compressed",
        silenceDeprecations: [
          "import",
          "global-builtin",
          "color-functions",
          "slash-div",
          "if-function",
        ],
      });

      // Eleventy surveille les partials SCSS importés pour le live reload
      this.addDependencies(inputPath, result.loadedUrls);

      return async () => result.css;
    },
  });

  // ── Passthrough — copier le contenu de public/ à la racine de _site/ ─
  eleventyConfig.addPassthroughCopy({ public: "." });

  // Images : toutes les images de src/ sont copiées en préservant l'arborescence
  eleventyConfig.addPassthroughCopy("src/**/*.{webp,jpg,jpeg,png,svg,gif}");

  // ── Layout aliases ──────────────────────────────────────────────
  eleventyConfig.addLayoutAlias("base", "base.njk");
  eleventyConfig.addLayoutAlias("home", "home.njk");
  eleventyConfig.addLayoutAlias("portfolio", "work-list.njk");
  eleventyConfig.addLayoutAlias("page", "page-simple.njk");
  eleventyConfig.addLayoutAlias("contact", "contact.njk");

  // ── Filters ─────────────────────────────────────────────────────
  eleventyConfig.addFilter("truncate", (str, len) => {
    const plain = String(str || "").replace(/<[^>]+>/g, "");
    return plain.length > len ? `${plain.slice(0, len)}…` : plain;
  });

  // ── Shortcodes ──────────────────────────────────────────────────
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // ── Config ──────────────────────────────────────────────────────
  return {
    dir: {
      input: "src",
      includes: "../_includes",
      layouts: "../_includes/layouts",
      data: "../_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
