import fm from "front-matter";

// Vite requires static, literal glob patterns — one per collection.
const MODULES = {
  projects: import.meta.glob("../content/projects/*.md", { eager: true, query: "?raw", import: "default" }),
  research: import.meta.glob("../content/research/*.md", { eager: true, query: "?raw", import: "default" }),
  events:   import.meta.glob("../content/events/*.md",   { eager: true, query: "?raw", import: "default" }),
};

function parseGroup(modules) {
  return Object.entries(modules)
    .map(([path, raw]) => {
      const slug = path.split("/").pop().replace(/\.md$/, "");
      const { attributes, body } = fm(raw);
      return { slug, ...attributes, body };
    })
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

const CONTENT = {
  projects: parseGroup(MODULES.projects),
  research: parseGroup(MODULES.research),
  events: parseGroup(MODULES.events),
};

export function getAll(group) {
  return CONTENT[group] ?? [];
}

export function getBySlug(group, slug) {
  return (CONTENT[group] ?? []).find((item) => item.slug === slug) ?? null;
}
