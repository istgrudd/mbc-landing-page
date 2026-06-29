// Compact division filter chips shared by the Projects and Research listings.
// `options` is the ordered list of division names to offer; `active` is the
// selected name (or null for "All"); `onChange(name|null)` toggles the filter.
export default function DivisionFilter({ options, active, onChange }) {
  if (!options || options.length < 2) return null; // nothing meaningful to filter

  const chip = (label, value) => {
    const isActive = active === value;
    return (
      <button
        key={label}
        type="button"
        onClick={() => onChange(value)}
        aria-pressed={isActive}
        className={`rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
          isActive
            ? "border-brand-blue bg-brand-blue text-white"
            : "border-[var(--line)] text-[var(--ink-2)] hover:border-[var(--ink-3)] hover:text-[var(--ink)]"
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="mt-8 flex flex-wrap gap-2">
      {chip("All", null)}
      {options.map((name) => chip(name, name))}
    </div>
  );
}
