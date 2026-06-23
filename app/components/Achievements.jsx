import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router'
import { Code2, BookOpen, Handshake } from 'lucide-react'
import { getAll } from '../lib/content'
import { achievements } from '../data/achievements'

const COLUMNS = [
  { id: 'projects', label: 'Projects', icon: Code2, accent: '#2D5BFF' },
  { id: 'research', label: 'Research', icon: BookOpen, accent: '#8B5CF6' },
  { id: 'partnerships', label: 'Partnerships', icon: Handshake, accent: '#13A36B' },
]

// Projects & Research are markdown-driven; Partnerships stays on achievements.js.
const COLUMN_DATA = {
  projects: getAll('projects'),
  research: getAll('research'),
  partnerships: achievements.partnerships,
}

function Entry({ children, index }) {
  const shouldReduce = useReducedMotion()
  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      className="border-b border-[var(--line)] p-5 last:border-b-0"
    >
      {children}
    </motion.div>
  )
}

function ProjectEntry({ item, index, accent }) {
  return (
    <Entry index={index}>
      <Link to={`/projects/${item.slug}`} className="block transition-opacity hover:opacity-80">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="font-display text-sm font-bold leading-snug text-[var(--ink)]">{item.title}</h3>
          <span className="shrink-0 font-mono text-[10px] tnum text-[var(--ink-3)]">{item.year}</span>
        </div>
        <p className="mb-3 font-body text-xs leading-relaxed text-[var(--ink-2)]">{item.summary}</p>
        <div className="flex flex-wrap gap-1.5">
          {(item.tags ?? []).map((tag) => (
            <span
              key={tag}
              className="rounded border px-2 py-0.5 font-mono text-[10px]"
              style={{ color: accent, borderColor: `${accent}33`, backgroundColor: `${accent}12` }}
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </Entry>
  )
}

function ResearchEntry({ item, index, accent }) {
  return (
    <Entry index={index}>
      <Link to={`/research/${item.slug}`} className="block transition-opacity hover:opacity-80">
        <div className="mb-1.5 flex items-start justify-between gap-2">
          <h3 className="font-display text-sm font-bold leading-snug text-[var(--ink)]">{item.title}</h3>
          <span className="shrink-0 font-mono text-[10px] tnum text-[var(--ink-3)]">{item.year}</span>
        </div>
        <p className="mb-2 font-body text-xs italic text-[var(--ink-2)]">{item.authors}</p>
        <p className="font-mono text-[11px] font-medium" style={{ color: accent }}>{item.venue}</p>
      </Link>
    </Entry>
  )
}

function PartnershipEntry({ item, index, accent }) {
  return (
    <Entry index={index}>
      <div className="mb-1 flex items-start justify-between gap-2">
        <h3 className="font-display text-sm font-bold leading-snug text-[var(--ink)]">{item.org}</h3>
        <span className="shrink-0 font-mono text-[10px] tnum text-[var(--ink-3)]">{item.year}</span>
      </div>
      <p className="mb-1.5 font-mono text-[11px] font-medium" style={{ color: accent }}>{item.event}</p>
      <p className="font-body text-xs leading-relaxed text-[var(--ink-2)]">{item.description}</p>
    </Entry>
  )
}

const ENTRY_MAP = { projects: ProjectEntry, research: ResearchEntry, partnerships: PartnershipEntry }

export default function Achievements() {
  const shouldReduce = useReducedMotion()

  return (
    <section id="work" className="relative overflow-hidden bg-[var(--paper)] px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-page">
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 max-w-2xl"
        >
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--ink-3)]">
            Selected work
          </p>
          <h2
            className="font-display font-extrabold leading-[0.95] tracking-tight text-[var(--ink)]"
            style={{ fontSize: 'clamp(2.25rem, 4.2vw, 3.75rem)' }}
          >
            Shipped, published, partnered.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {COLUMNS.map((col, ci) => {
            const Icon = col.icon
            const EntryComponent = ENTRY_MAP[col.id]
            const items = COLUMN_DATA[col.id]
            return (
              <motion.div
                key={col.id}
                initial={shouldReduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: ci * 0.1 }}
                className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)]"
              >
                <div
                  className="flex items-center gap-2.5 border-b border-[var(--line)] px-5 py-4"
                  style={{ backgroundColor: `${col.accent}0f` }}
                >
                  <Icon size={14} style={{ color: col.accent }} />
                  <span
                    className="font-mono text-[10px] font-medium uppercase tracking-[0.24em]"
                    style={{ color: col.accent }}
                  >
                    {col.label}
                  </span>
                  <span className="ml-auto font-mono text-[10px] tnum" style={{ color: col.accent, opacity: 0.6 }}>
                    {items.length}
                  </span>
                </div>
                {items.map((item, i) => (
                  <EntryComponent key={item.slug ?? item.id} item={item} index={i} accent={col.accent} />
                ))}
                {col.id !== 'partnerships' && (
                  <Link
                    to={`/${col.id}`}
                    className="block border-t border-[var(--line)] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] hover:underline"
                    style={{ color: col.accent }}
                  >
                    View all →
                  </Link>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
