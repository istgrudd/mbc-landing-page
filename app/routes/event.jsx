import { useLoaderData, Link } from "react-router";
import { getBySlug } from "../lib/content";
import Markdown from "../components/Markdown";

export async function loader({ params }) {
  const item = getBySlug("events", params.slug);
  if (!item) throw new Response("Not Found", { status: 404 });
  return { item };
}

export function meta({ data }) {
  if (!data?.item) return [{ title: "Not found · MBC Lab" }];
  return [
    { title: `${data.item.title} · MBC Lab` },
    { name: "description", content: data.item.summary ?? "" },
  ];
}

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function EventDetail() {
  const { item } = useLoaderData();
  return (
    <article className="mx-auto max-w-3xl px-6 pb-24 pt-28 lg:px-8">
      <Link to="/events" className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-blue hover:underline">← Events</Link>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ink-3)]">{formatDate(item.date)}</span>
        <span
          className={`rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide ${
            item.status === "upcoming"
              ? "border-brand-blue text-brand-blue"
              : "border-[var(--line-2)] text-[var(--ink-3)]"
          }`}
        >
          {item.status}
        </span>
      </div>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl">{item.title}</h1>
      {item.location && <p className="mt-3 font-body text-base leading-relaxed text-[var(--ink-2)]">{item.location}</p>}
      {item.summary && <p className="mt-2 font-body text-lg leading-relaxed text-[var(--ink-2)]">{item.summary}</p>}
      <div className="prose prose-sm sm:prose-base mt-8">
        <Markdown>{item.body}</Markdown>
      </div>
    </article>
  );
}
