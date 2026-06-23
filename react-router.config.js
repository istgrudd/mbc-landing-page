import { readdir } from "node:fs/promises";
import path from "node:path";

async function slugs(group) {
  const dir = path.join(process.cwd(), "app", "content", group);
  const files = await readdir(dir);
  return files.filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, ""));
}

/** @type {import('@react-router/dev/config').Config} */
export default {
  ssr: false, // no runtime server → fully static output
  async prerender() {
    const [p, r, e] = await Promise.all([slugs("projects"), slugs("research"), slugs("events")]);
    return [
      "/", "/projects", "/research", "/events",
      ...p.map((s) => `/projects/${s}`),
      ...r.map((s) => `/research/${s}`),
      ...e.map((s) => `/events/${s}`),
    ];
  },
};
