# Content Guide — MBC Lab Website

This site is **content-driven**. To add a project, paper, or event you create **one Markdown
(`.md`) file** — no code changes. The landing-page cards, the list pages (`/projects`,
`/research`, `/events`), and the detail pages are all generated automatically when the site
is built.

You only need a text editor and (optionally) some images.

---

## 1. The big picture

| You want to add… | Create a file in… | It appears at… |
|---|---|---|
| A project | `app/content/projects/` | `/projects` and `/projects/<slug>` |
| A research paper | `app/content/research/` | `/research` and `/research/<slug>` |
| An event | `app/content/events/` | `/events` and `/events/<slug>` |
| An award | `app/content/awards/` | Landing page Awards section |

**The file name is the URL.** `app/content/projects/cycle-chess.md` becomes
`https://mbclaboratory.com/projects/cycle-chess`.

> **Naming rule:** use **lowercase letters, numbers, and hyphens** only — no spaces, no
> capitals, no special characters. `webgis-pariwisata-bandung.md` ✅ — `WebGIS Bandung.md` ❌

Each `.md` file has two parts:

```markdown
---
(frontmatter: the fields below, between the --- lines)
---
The body: free Markdown text that becomes the detail page
(headings, paragraphs, lists, tables, links, etc.)
```

---

## 2. Frontmatter fields

**REQUIRED** fields must always be filled in. If a required field is missing or mistyped, the
card or the build can break. `order` must be **unique within each collection**.

### Projects (`app/content/projects/*.md`)

| Field | Required | Notes |
|---|---|---|
| `title` | ✅ | Project name. |
| `summary` | ✅ | One line shown on the card. |
| `division` | ✅ | Must match a division **exactly** — see §3. |
| `year` | ✅ | e.g. `"2025"`. |
| `order` | ✅ | Display order, lower = first. **Unique** among projects. |
| `tags` | — | List of short labels, e.g. `["Unity", "C#", "HKI"]`. |
| `images` | — | Up to 3 image paths — see §4. |
| `featured` | — | `true` shows it on the landing page; default `false`. |
| `status` | — | `completed` or `in-progress`. |
| `links` | — | `{ github: "", demo: "", hki: "" }` — empty values hide the button. |

### Research (`app/content/research/*.md`)

| Field | Required | Notes |
|---|---|---|
| `title` | ✅ | Paper title. |
| `authors` | ✅ | e.g. `"A. Pratama, B. Santoso, C. Hidayat"`. |
| `venue` | ✅ | e.g. `"IEEE Access, Vol. 12"`. |
| `division` | ✅ | Must match a division **exactly** — see §3. |
| `year` | ✅ | e.g. `"2025"`. |
| `order` | ✅ | Lower = first. **Unique** among research. |
| `images` | — | Up to 3 (figures/diagrams) — see §4. |
| `links` | — | `{ doi: "", pdf: "" }` — empty values hide the button. |

### Events (`app/content/events/*.md`)

| Field | Required | Notes |
|---|---|---|
| `title` | ✅ | Event name. |
| `date` | ✅ | ISO format `YYYY-MM-DD`, e.g. `"2026-08-01"`. |
| `location` | ✅ | e.g. `"Telkom University, Bandung"`. |
| `status` | ✅ | `upcoming` or `past`. |
| `summary` | ✅ | One line shown on the card. |
| `order` | ✅ | Lower = first. **Unique** among events. |
| `images` | — | Up to 3 (poster/photos) — see §4. Image #1 also shows full-size on the event page. |
| `links` | — | `{ portal: "" }` — a registration/recruitment URL; shows an **Apply** button on the event page and the landing recruitment ticket. |

### Awards (`app/content/awards/*.md`)

| Field | Required | Notes |
|---|---|---|
| `title` | ✅ | Competition/Award name. |
| `award` | ✅ | The placement or award (e.g. "1st Winner", "Finalist"). |
| `members` | ✅ | Line-break separated list of members. |
| `year` | ✅ | e.g. `"2025"`. |
| `order` | ✅ | Lower = first. **Unique** among awards. |

---

## 3. Division values (projects **and** research)

Both projects and research papers carry a `division`. The value must match **one of these
exactly** (capitalisation matters):

- `Cyber Security`
- `Big Data`
- `Geographic Information System`
- `Game Tech`
- `Practicum`

A typo here (e.g. `GIS` or `game tech`) will show the wrong label, hide the item from the
division filter, and leave it out of the counts.

**What the division drives automatically — no code changes needed:**

- The **project / research counts** on the landing-page division cards ("3 proj · 8 rsch")
  are tallied live from these fields. Add a file with a given division and its count goes up.
- The **division filter chips** on the `/projects` and `/research` pages are generated from
  the divisions that actually appear in the content.

The five divisions themselves (names, colours, member counts) live in
`app/data/divisions.js` — editing that file is a code change, not part of this content flow.

---

## 4. Images

Images are **optional**. If you omit `images` (or leave it as `[]`), the card is text-only —
that is fine.

**How to add images:**

1. Put the image files in `public/images/<group>/`
   (`public/images/projects/`, `public/images/research/`, or `public/images/events/`).
2. Name them after the slug, e.g. `cycle-chess-1.png`, `cycle-chess-2.png`.
3. Reference them in the frontmatter with a path that starts with `/images/...`:

```yaml
images:
  - "/images/projects/cycle-chess-1.png"
  - "/images/projects/cycle-chess-2.png"
  - "/images/projects/cycle-chess-3.png"
```

**Rules:**

- **Maximum 3 images.**
- **Image #1 is the card thumbnail** (shown on the landing/list cards).
- **Images #2 and #3** appear in the **carousel on the detail page**.
- With only 1 image: it is the thumbnail and there is no carousel.
- Use web-friendly files (`.png`, `.jpg`, or `.webp`). `.webp` is smallest/fastest.

---

## 5. Ordering

Every item needs an `order` number. **Lower numbers appear first.** Keep the numbers
**unique within each collection** (don't give two projects `order: 1`). Leaving gaps
(`10, 20, 30…`) makes it easy to insert items later.

---

## 6. Copy-paste templates

### New project
```markdown
---
title: "Project Name"
summary: "One-line description for the card."
division: "Game Tech"
tags: ["Unity", "C#", "HKI"]
year: "2025"
images: []
featured: false
order: 99
status: "completed"
links: { github: "", demo: "", hki: "" }
---
Describe the project here: the problem, the approach, the results.
You can use **bold**, *italics*, lists, and [links](https://example.com).
```

### New research paper
```markdown
---
title: "Paper Title"
authors: "A. Author, B. Author"
venue: "Journal / Conference, Vol. X"
division: "Big Data"
year: "2025"
images: []
order: 99
links: { doi: "", pdf: "" }
---
Abstract / summary and key contributions go here.
```

### New event
```markdown
---
title: "Event Name"
date: "2026-08-01"
location: "Telkom University, Bandung"
status: "upcoming"
summary: "One-line description for the card."
images: []
order: 99
links: { portal: "" }
---
Event details, agenda, requirements, and how to register.
```

---

## 7. Preview, build & publish

| Step | Command | What it does |
|---|---|---|
| Preview locally | `npm run dev` | Opens a live preview with hot reload — edits show instantly. |
| Production build | `npm run build` | Builds the static site into `build/client` (also regenerates `sitemap.xml`). |

**Publishing:** commit your `.md` file (and any images) and **push to GitHub**. Cloudflare
Pages is connected to the repo and **auto-deploys** every push to the main branch. Within a
minute or two the new content is live at `https://mbclaboratory.com`.

**Cloudflare Pages settings** (already configured — for reference):

- **Build command:** `npm run build`
- **Output directory:** `build/client`

---

## 8. Quick checklist before publishing

- [ ] File is in the right folder (`app/content/projects` / `research` / `events`).
- [ ] File name is lowercase-with-hyphens (this becomes the URL).
- [ ] All **REQUIRED** fields are filled in.
- [ ] `order` is unique within its collection.
- [ ] (Projects & research) `division` matches one of the five values **exactly**.
- [ ] Images (if any) are in `public/images/<group>/`, max 3, paths start with `/images/...`.
- [ ] Previewed with `npm run dev` and it looks right.
