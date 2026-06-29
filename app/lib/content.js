import fm from "front-matter";

// Vite requires static, literal glob patterns — one per collection.
const MODULES = {
  projects: import.meta.glob("../content/projects/*.md", { eager: true, query: "?raw", import: "default" }),
  research: import.meta.glob("../content/research/*.md", { eager: true, query: "?raw", import: "default" }),
  events:   import.meta.glob("../content/events/*.md",   { eager: true, query: "?raw", import: "default" }),
  awards:   import.meta.glob("../content/awards/*.md",   { eager: true, query: "?raw", import: "default" }),
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
  awards: parseGroup(MODULES.awards),
};

export function getAll(group) {
  return CONTENT[group] ?? [];
}

export function getBySlug(group, slug) {
  return (CONTENT[group] ?? []).find((item) => item.slug === slug) ?? null;
}

// Live per-division tally derived from the `division` frontmatter of every
// project and research markdown file. Keyed by the canonical division name
// (matching `divisions[].name`), so adding a new .md file with a `division:`
// automatically bumps the count shown on the Divisions cards — no manual edits.
export function getDivisionCounts() {
  const counts = {};
  const tally = (group) => {
    for (const item of CONTENT[group]) {
      const name = item.division?.trim();
      if (!name) continue;
      (counts[name] ??= { projects: 0, research: 0 })[group] += 1;
    }
  };
  tally("projects");
  tally("research");
  return counts;
}
