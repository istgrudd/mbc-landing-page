// Generates public/sitemap.xml from the markdown content dirs + static routes.
// Runs before `react-router build`; Vite copies public/ into build/client,
// so the sitemap ships at https://mbclaboratory.com/sitemap.xml.
import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const BASE = "https://mbclaboratory.com";
const groups = ["projects", "research", "events"];

async function slugs(g) {
  const files = await readdir(path.join(process.cwd(), "app", "content", g));
  return files.filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, ""));
}

const paths = ["/", "/projects", "/research", "/events"];
for (const g of groups) for (const s of await slugs(g)) paths.push(`/${g}/${s}`);

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  paths.map((p) => `  <url><loc>${BASE}${p}</loc></url>`).join("\n") +
  `\n</urlset>\n`;

await writeFile(path.join(process.cwd(), "public", "sitemap.xml"), xml);
console.log(`sitemap: ${paths.length} urls`);
