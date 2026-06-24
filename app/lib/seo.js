// Per-route SEO meta helper. Builds Open Graph + Twitter + canonical tags
// from a single descriptor so every route emits link-preview-quality markup.
// Absolute URLs use the production domain.
const BASE = "https://mbclaboratory.com";

export function pageMeta({ title, description, path = "/", image = "/logo.png" }) { 
  const url = BASE + path;
  const img = image.startsWith("http") ? image : BASE + image;
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: img },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: img },
    { tagName: "link", rel: "canonical", href: url },
  ];
}
