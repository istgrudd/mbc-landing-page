import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { divisions } from '../data/divisions'
import { members } from '../data/members'
import MemberPhoto from './MemberPhoto'

const COLOR_BY_DIV = Object.fromEntries(divisions.map((d) => [d.id, d.color]))
const NAME_BY_DIV = Object.fromEntries(divisions.map((d) => [d.id, d.short]))

const FILTERS = [{ id: 'all', name: 'Everyone', color: 'var(--ink)' }, ...divisions]

function MemberCard({ member, index }) {
  const shouldReduce = useReducedMotion()
  const color = COLOR_BY_DIV[member.divisionId]

  return (
    <motion.figure
      layout
      initial={shouldReduce ? false : { opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: (index % 6) * 0.04 }}
      whileHover={shouldReduce ? {} : { y: -6 }}
      className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-[var(--line)]"
    >
      <MemberPhoto member={member} className="h-full w-full" />

      <figcaption className="absolute inset-x-0 bottom-0 z-10 p-4">
        <span
          className="mb-2 inline-block rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white"
          style={{ backgroundColor: color }}
        >
          {NAME_BY_DIV[member.divisionId]}
        </span>
        <p className="font-display text-[15px] font-bold leading-tight text-white">{member.name}</p>
        <p className="font-mono text-[10px] tracking-[0.12em] text-white/75">
          {member.role} · &rsquo;{String(member.year).slice(2)}
        </p>
      </figcaption>
    </motion.figure>
  )
}

export default function Members() {
  const shouldReduce = useReducedMotion()
  const [filter, setFilter] = useState('all')

  const shown = filter === 'all' ? members : members.filter((m) => m.divisionId === filter)

  return (
    <section id="members" className="relative overflow-hidden bg-[var(--surface)] px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-page">
        {/* header */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-xl">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--ink-3)]">
              The roster · {new Date().getFullYear()}
            </p>
            <h2
              className="font-display font-extrabold leading-[0.95] tracking-tight text-[var(--ink)]"
              style={{ fontSize: 'clamp(2.25rem, 4.2vw, 3.75rem)' }}
            >
              The people are the lab.
            </h2>
          </div>
          <p className="font-mono text-sm text-[var(--ink-2)]">
            <span className="text-3xl font-medium tnum text-[var(--ink)]">{members.length}</span>
            <span className="ml-2 align-middle text-[10px] uppercase tracking-[0.2em] text-[var(--ink-3)]">
              assistants on duty
            </span>
          </p>
        </motion.div>

        {/* filter chips */}
        <div className="mt-10 flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const isActive = filter === f.id
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className="rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200"
                style={{
                  borderColor: isActive ? f.color : 'var(--line-2)',
                  backgroundColor: isActive ? f.color : 'transparent',
                  color: isActive ? '#fff' : 'var(--ink-2)',
                }}
              >
                {f.id === 'all' ? f.name : f.short}
              </button>
            )
          })}
        </div>

        {/* photo wall */}
        <motion.div
          layout
          className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
        >
          <AnimatePresence mode="popLayout">
            {shown.map((m, i) => (
              <MemberCard key={m.id} member={m} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-3)]">
          Live 2026/2027 roster · names &amp; lab codes are real — portraits drop into{' '}
          <span className="text-[var(--ink-2)]">public/members/</span>
        </p>
      </div>
    </section>
  )
}
