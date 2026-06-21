import { motion, useReducedMotion } from 'framer-motion'
import { Code2, BookOpen, Handshake } from 'lucide-react'
import { achievements } from '../data/achievements'
import SectionWrapper from './SectionWrapper'

const COLUMNS = [
  {
    id:     'projects',
    label:  'Projects',
    icon:   Code2,
    accent: '#3B82F6',
  },
  {
    id:     'research',
    label:  'Research',
    icon:   BookOpen,
    accent: '#A855F7',
  },
  {
    id:     'partnerships',
    label:  'Partnerships',
    icon:   Handshake,
    accent: '#22C55E',
  },
]

function ProjectEntry({ item, index }) {
  const shouldReduce = useReducedMotion()
  return (
    <motion.div
      initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      className="p-5 border-b border-[var(--border)] last:border-b-0 group"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-heading font-bold text-sm text-[var(--text-primary)] leading-snug group-hover:text-blue-400 transition-colors duration-200">
          {item.title}
        </h3>
        <span className="font-mono text-[10px] text-[var(--text-muted)] tabular-nums shrink-0 mt-0.5">{item.year}</span>
      </div>
      <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-3">
        {item.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {item.tags.map(tag => (
          <span key={tag} className="font-mono text-[10px] px-2 py-0.5 rounded border border-blue-500/20 text-blue-400 bg-blue-500/08">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

function ResearchEntry({ item, index }) {
  const shouldReduce = useReducedMotion()
  return (
    <motion.div
      initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      className="p-5 border-b border-[var(--border)] last:border-b-0 group"
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <h3 className="font-heading font-bold text-sm text-[var(--text-primary)] leading-snug group-hover:text-purple-400 transition-colors duration-200">
          {item.title}
        </h3>
        <span className="font-mono text-[10px] text-[var(--text-muted)] tabular-nums shrink-0 mt-0.5">{item.year}</span>
      </div>
      <p className="font-body text-xs text-[var(--text-secondary)] italic mb-2">{item.authors}</p>
      <p className="font-mono text-[11px] text-purple-400 font-medium">{item.venue}</p>
    </motion.div>
  )
}

function PartnershipEntry({ item, index }) {
  const shouldReduce = useReducedMotion()
  return (
    <motion.div
      initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      className="p-5 border-b border-[var(--border)] last:border-b-0 group"
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        <h3 className="font-heading font-bold text-sm text-[var(--text-primary)] leading-snug group-hover:text-green-400 transition-colors duration-200">
          {item.org}
        </h3>
        <span className="font-mono text-[10px] text-[var(--text-muted)] tabular-nums shrink-0 mt-0.5">{item.year}</span>
      </div>
      <p className="font-mono text-[11px] text-green-400 font-medium mb-1.5">{item.event}</p>
      <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed">{item.description}</p>
    </motion.div>
  )
}

const ENTRY_MAP = {
  projects:     ProjectEntry,
  research:     ResearchEntry,
  partnerships: PartnershipEntry,
}

export default function Achievements() {
  const shouldReduce = useReducedMotion()

  return (
    <SectionWrapper id="achievements" className="relative py-24 px-6 bg-[var(--bg-surface)] overflow-hidden">

      {/* Faint section watermark */}
      <div aria-hidden="true" className="absolute right-8 top-12 font-heading font-black leading-none text-[var(--text-primary)] opacity-[0.025] select-none pointer-events-none"
        style={{ fontSize: 'clamp(6rem, 18vw, 14rem)' }}>
        02
      </div>

      {/* Corner glow */}
      <div aria-hidden="true" className="absolute bottom-0 right-0 w-96 h-96 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom right, rgba(37,99,235,0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <p className="font-mono text-[11px] tracking-[0.32em] text-[var(--text-muted)] uppercase mb-4">
            § What We&rsquo;ve Built
          </p>
          <h2
            className="font-heading font-extrabold text-[var(--text-primary)] leading-tight"
            style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)' }}
          >
            Achievements
          </h2>
        </motion.div>

        {/* 3-column ledger */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {COLUMNS.map((col, ci) => {
            const Icon = col.icon
            const EntryComponent = ENTRY_MAP[col.id]
            const items = achievements[col.id]

            return (
              <motion.div
                key={col.id}
                initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: ci * 0.1 }}
                className="border border-[var(--border)] rounded-2xl overflow-hidden bg-[var(--bg-card)]"
              >
                {/* Column header */}
                <div
                  className="px-5 py-4 border-b border-[var(--border)] flex items-center gap-2.5"
                  style={{ background: `${col.accent}10` }}
                >
                  <Icon size={13} style={{ color: col.accent }} />
                  <span
                    className="font-mono text-[10px] tracking-[0.28em] uppercase font-medium"
                    style={{ color: col.accent }}
                  >
                    {col.label}
                  </span>
                  <span
                    className="ml-auto font-mono text-[10px] tabular-nums"
                    style={{ color: col.accent, opacity: 0.5 }}
                  >
                    {items.length}
                  </span>
                </div>

                {/* Entries */}
                {items.map((item, i) => (
                  <EntryComponent key={item.id} item={item} index={i} />
                ))}
              </motion.div>
            )
          })}
        </div>
      </div>
    </SectionWrapper>
  )
}
