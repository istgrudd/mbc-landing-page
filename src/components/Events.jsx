import { MapPin } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { events } from '../data/events'
import SectionWrapper from './SectionWrapper'

function getDateParts(dateStr) {
  const d = new Date(dateStr)
  if (isNaN(d)) return { day: '??', month: '???', year: '????' }
  return {
    day: String(d.getDate()).padStart(2, '0'),
    month: d.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
    year: d.getFullYear(),
  }
}

const TAG_ACCENT = {
  Workshop:    { color: '#A855F7', text: '#A855F7' },
  Competition: { color: '#F59E0B', text: '#F59E0B' },
  Seminar:     { color: '#14B8A6', text: '#14B8A6' },
  Conference:  { color: '#F43F5E', text: '#F43F5E' },
  Recruitment: { color: '#2563EB', text: '#3B82F6' },
}

function tagAccent(tag) {
  return TAG_ACCENT[tag] || { color: '#2563EB', text: '#2563EB' }
}

function EventCard({ event, index }) {
  const shouldReduce = useReducedMotion()
  const { day, month, year } = getDateParts(event.date)
  const accent = tagAccent(event.tag)

  return (
    <motion.article
      initial={shouldReduce ? {} : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 }}
      className="relative rounded-2xl overflow-hidden border border-[var(--border)] group hover:border-[var(--text-muted)] transition-colors duration-300 bg-[var(--bg-card)]"
    >
      {/* Colored top accent strip */}
      <div style={{ height: 3, background: accent.color }} />

      <div className="p-7 pt-6">
        {/* Tag + year */}
        <div className="flex justify-between items-center mb-5">
          <span
            className="font-mono text-[10px] tracking-[0.32em] uppercase font-medium"
            style={{ color: accent.text }}
          >
            {event.tag}
          </span>
          <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest">
            {year}
          </span>
        </div>

        {/* Giant date */}
        <div className="flex items-baseline gap-3 mb-6">
          <span
            className="font-heading font-extrabold tabular-nums leading-none text-[var(--text-primary)] group-hover:text-[var(--text-primary)] transition-colors duration-300"
            style={{ fontSize: 'clamp(4rem, 8vw, 6rem)' }}
          >
            {day}
          </span>
          <span className="font-mono text-sm text-[var(--text-muted)] tracking-[0.22em]">
            {month}
          </span>
        </div>

        {/* Hover glow */}
        <div
          aria-hidden="true"
          className="absolute -bottom-12 -right-12 w-52 h-52 rounded-full pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
          style={{ background: `radial-gradient(ellipse, ${accent.color}18 0%, transparent 70%)` }}
        />

        {/* Title */}
        <h3
          className="font-heading font-bold text-[var(--text-primary)] leading-snug mb-3 relative z-10"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}
        >
          {event.title}
        </h3>

        {/* Description */}
        <p className="font-body text-sm text-[var(--text-secondary)] leading-relaxed mb-6 relative z-10">
          {event.description}
        </p>

        {/* Location */}
        <div className="flex items-center gap-2 relative z-10">
          <MapPin size={11} className="text-[var(--text-muted)] shrink-0" />
          <span className="font-mono text-[11px] text-[var(--text-muted)] tracking-wide">
            {event.location}
          </span>
        </div>
      </div>
    </motion.article>
  )
}

export default function Events() {
  if (events.length === 0) return null

  return (
    <SectionWrapper id="events" className="relative py-24 px-6 overflow-hidden bg-[var(--bg-surface)]">

      {/* Atmospheric glows */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 60% at 80% 50%, rgba(37,99,235,0.07) 0%, transparent 70%)'
      }} />
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 40% 40% at 20% 80%, rgba(168,85,247,0.05) 0%, transparent 70%)'
      }} />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <p className="font-mono text-[11px] tracking-[0.32em] text-[var(--text-muted)] uppercase mb-4">
            § What&rsquo;s Coming
          </p>
          <h2
            className="font-heading font-extrabold text-[var(--text-primary)] leading-tight"
            style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)' }}
          >
            Upcoming Events
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className={`grid gap-5 ${events.length === 1 ? 'grid-cols-1 max-w-md' : 'grid-cols-1 md:grid-cols-2'}`}>
          {events.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-[var(--border)] flex justify-between items-center"
        >
          <span className="font-mono text-[10px] tracking-[0.22em] text-[var(--text-muted)] uppercase">
            {events.length} event{events.length !== 1 ? 's' : ''} scheduled
          </span>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
