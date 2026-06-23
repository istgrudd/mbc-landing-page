import { useLoaderData, Link } from "react-router";
import { getAll } from "../lib/content";

export function meta() {
  return [
    { title: "Research · MBC Lab" },
    { name: "description", content: "Papers and research from MBC Lab." },
  ];
}

export async function loader() {
  return { items: getAll("research") };
}

export default function Research() {
  const { items } = useLoaderData();
  return (
    <section className="mx-auto max-w-page px-6 pb-20 pt-28 lg:px-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--ink-3)]">Research</p>
      <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl">
        Papers & publications
      </h1>
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {items.map((r) => (
          <Link
            key={r.slug}
            to={`/research/${r.slug}`}
            className="group flex flex-col rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--ink-3)]"
          >
            <h3 className="font-display text-lg font-bold leading-snug text-[var(--ink)] group-hover:text-brand-blue">
              {r.title}
            </h3>
            <p className="mt-2 font-body text-sm italic leading-relaxed text-[var(--ink-2)]">{r.authors}</p>
            <div className="mt-3 flex items-center justify-between gap-2 font-mono text-[11px]">
              <span className="text-brand-blue">{r.venue}</span>
              <span className="text-[var(--ink-3)]">{r.year}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
