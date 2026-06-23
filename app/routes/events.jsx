import { useLoaderData, Link } from "react-router";
import { getAll } from "../lib/content";

export function meta() {
  return [
    { title: "Events · MBC Lab" },
    { name: "description", content: "Events and recruitment from MBC Lab." },
  ];
}

export async function loader() {
  return { items: getAll("events") };
}

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function Events() {
  const { items } = useLoaderData();
  return (
    <section className="mx-auto max-w-page px-6 pb-20 pt-28 lg:px-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--ink-3)]">Events</p>
      <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl">
        What's happening at the lab
      </h1>
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((e) => (
          <Link
            key={e.slug}
            to={`/events/${e.slug}`}
            className="group flex flex-col rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--ink-3)]"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[11px] text-[var(--ink-3)]">{formatDate(e.date)}</span>
              <span
                className={`rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide ${
                  e.status === "upcoming"
                    ? "border-brand-blue text-brand-blue"
                    : "border-[var(--line-2)] text-[var(--ink-3)]"
                }`}
              >
                {e.status}
              </span>
            </div>
            <h3 className="mt-2 font-display text-lg font-bold leading-snug text-[var(--ink)] group-hover:text-brand-blue">
              {e.title}
            </h3>
            {e.location && (
              <p className="mt-1 font-mono text-[11px] text-[var(--ink-3)]">{e.location}</p>
            )}
            <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-[var(--ink-2)]">{e.summary}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
