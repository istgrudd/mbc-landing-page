import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { alumni } from '../data/alumni'
import SectionWrapper from './SectionWrapper'

const DIV_ACCENT = {
  cybersec:  '#F87171',
  bigdata:   '#60A5FA',
  gis:       '#4ADE80',
  gametech:  '#C084FC',
  practicum: '#FBBF24',
}

const ITEMS = [...alumni, ...alumni]
const CARD_WIDTH = 380
const GAP = 20

function AlumniCard({ person }) {
  const accent = DIV_ACCENT[person.divisionId] || '#60A5FA'

  return (
    <div
      className="relative rounded-xl overflow-hidden border border-[var(--border)] shrink-0 flex flex-col"
      style={{ width: CARD_WIDTH, background: 'var(--bg-card)' }}
    >
      {/* Division-colored top accent strip */}
      <div style={{ height: 3, background: accent }} />

      <div className="p-6 flex flex-col gap-4 flex-1">
        {/* Giant background quote mark */}
        <div
          aria-hidden="true"
          className="absolute top-4 right-4 font-heading font-black leading-none select-none pointer-events-none"
          style={{ fontSize: '88px', color: accent, opacity: 0.055 }}
        >
          &ldquo;
        </div>

        {/* Quote text */}
        <p
          className="font-body text-[var(--text-primary)] leading-relaxed relative z-10 flex-1"
          style={{ fontSize: '0.9375rem' }}
        >
          &ldquo;{person.quote}&rdquo;
        </p>

        {/* Attribution row */}
        <div className="flex items-end justify-between gap-3 relative z-10">
          <div>
            <p className="font-heading font-bold text-[var(--text-primary)] text-base leading-tight">
              {person.name}
            </p>
            <p className="font-mono text-[10px] text-[var(--text-muted)] tracking-[0.18em] mt-0.5">
              Class of {person.year}
            </p>
          </div>
          <span
            className="font-mono text-[9px] tracking-[0.24em] uppercase px-2.5 py-1 rounded border shrink-0"
            style={{
              color: accent,
              borderColor: `${accent}40`,
              background: `${accent}12`,
            }}
          >
            {person.division}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function AlumniSays() {
  const shouldReduce = useReducedMotion()
  const [paused, setPaused] = useState(false)
  const TOTAL_WIDTH = alumni.length * (CARD_WIDTH + GAP)

  return (
    <SectionWrapper id="alumni" className="relative py-24 overflow-hidden crosshatch-grid bg-[var(--bg-base)]">

      {/* Faint section watermark */}
      <div aria-hidden="true"
        className="absolute right-8 top-12 font-heading font-black leading-none text-[var(--text-primary)] opacity-[0.025] select-none pointer-events-none"
        style={{ fontSize: 'clamp(6rem, 18vw, 14rem)' }}
      >
        03
      </div>

      {/* Tone gradient over crosshatch */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, var(--bg-base) 100%)' }}
      />

      {/* Section header — left aligned */}
      <div className="max-w-6xl mx-auto px-6 mb-14 relative z-10">
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-[11px] tracking-[0.32em] text-[var(--text-muted)] uppercase mb-4">
            § Voices from the Lab
          </p>
          <h2
            className="font-heading font-extrabold text-[var(--text-primary)] leading-tight"
            style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)' }}
          >
            Alumni Says
          </h2>
        </motion.div>
      </div>

      {/* Marquee */}
      <div
        className="relative z-10"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--bg-base)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--bg-base)] to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex px-6"
          style={{ gap: GAP, width: 'max-content' }}
          animate={shouldReduce || paused ? {} : { x: [0, -TOTAL_WIDTH] }}
          transition={{
            x: { duration: alumni.length * 6, repeat: Infinity, ease: 'linear' },
          }}
        >
          {ITEMS.map((person, i) => (
            <AlumniCard key={`${person.id}-${i}`} person={person} />
          ))}
        </motion.div>
      </div>

      {/* Footer note */}
      <div className="max-w-6xl mx-auto px-6 mt-12 relative z-10">
        <p className="font-mono text-[10px] tracking-[0.22em] text-[var(--text-muted)] uppercase">
          {alumni.length} alumni voices · hover to pause
        </p>
      </div>
    </SectionWrapper>
  )
}
