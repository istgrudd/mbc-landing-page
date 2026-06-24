// Post-build: publish the route-less SPA shell as 404.html.
//
// With ssr:false + prerender(), React Router emits build/client/__spa-fallback.html —
// a route-less shell that hydrates against the *actual* URL. Cloudflare Pages serves
// the closest 404.html for any path that doesn't match a prerendered route or asset
// (see https://developers.cloudflare.com/pages/configuration/serving-pages/). Copying
// the shell to 404.html means unknown slugs render the branded "Page not found"
// ErrorBoundary with a correct 404 status — and, unlike a "/* 200" catch-all, it never
// shadows the prerendered HTML or static assets.
import { copyFile, access } from "node:fs/promises";
import path from "node:path";

const clientDir = path.join(process.cwd(), "build", "client");
const src = path.join(clientDir, "__spa-fallback.html");
const dest = path.join(clientDir, "404.html");

try {
  await access(src);
} catch {
  console.error("postbuild: __spa-fallback.html not found — did `react-router build` run with ssr:false + prerender()?");
  process.exit(1);
}

await copyFile(src, dest);
console.log("postbuild: 404.html <- __spa-fallback.html");
