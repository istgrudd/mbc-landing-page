import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { divisions } from '../data/divisions'
import { members } from '../data/members'
import MemberPhoto from './MemberPhoto'

const COLOR_BY_DIV = Object.fromEntries(divisions.map((d) => [d.id, d.color]))
const NAME_BY_DIV = Object.fromEntries(divisions.map((d) => [d.id, d.short]))

const FILTERS = [{ id: 'all', name: 'Everyone', color: 'var(--ink)' }, ...divisions]

// ── Roster ordering ─────────────────────────────────────────────────────────
// Leadership fills the opening row(s); everyone else is shuffled. Both passes are
// de-clustered so adjacent cards never share a division (no two same colours next
// to each other). Computed once at module scope with a fixed seed so SSR and the
// client produce the exact same order (no hydration mismatch).
const LEAD_ROLES = [
  'Koordinator Asisten',
  'Wakil Koordinator Asisten',
  'Kepala Cyber Security',
  'Kepala Big Data',
  'Kepala GIS',
  'Kepala Game Tech',
  'Practicum Coordinator',
]
const leadRank = (m) => LEAD_ROLES.indexOf(m.role)

function seededShuffle(list, seed) {
  const a = [...list]
  let s = seed >>> 0
  const rnd = () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Greedy reorder: always take the most-common remaining division that differs
// from the previous card, so same-colour cards don't end up side by side.
function declusterByDivision(list, startPrev = null) {
  const pool = [...list]
  const out = []
  let prev = startPrev
  while (pool.length) {
    const counts = {}
    for (const m of pool) counts[m.divisionId] = (counts[m.divisionId] || 0) + 1
    let pickDiv = null
    let best = -1
    for (const d in counts) {
      if (d === prev) continue
      if (counts[d] > best) {
        best = counts[d]
        pickDiv = d
      }
    }
    if (pickDiv === null) pickDiv = prev // only one division remains
    const idx = pool.findIndex((m) => m.divisionId === pickDiv)
    out.push(pool[idx])
    pool.splice(idx, 1)
    prev = pickDiv
  }
  return out
}

const HEADS = declusterByDivision(
  members.filter((m) => leadRank(m) >= 0).sort((a, b) => leadRank(a) - leadRank(b)),
)
const REST = declusterByDivision(
  seededShuffle(members.filter((m) => leadRank(m) < 0), 73),
  HEADS.length ? HEADS[HEADS.length - 1].divisionId : null,
)
const ORDERED = [...HEADS, ...REST]

function MemberCard({ member, index, isMarquee }) {
  const shouldReduce = useReducedMotion()
  const color = COLOR_BY_DIV[member.divisionId]

  return (
    <motion.figure
      layout={!isMarquee}
      initial={shouldReduce || isMarquee ? false : { opacity: 0, scale: 0.94 }}
      animate={isMarquee ? {} : { opacity: 1, scale: 1 }}
      exit={shouldReduce || isMarquee ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: (index % 6) * 0.04 }}
      whileHover={shouldReduce ? {} : { y: -6 }}
      className={`group relative aspect-[4/5] overflow-hidden rounded-xl border border-[var(--line)] ${isMarquee ? 'w-full h-full block' : ''}`}
    >
      <MemberPhoto member={member} className="h-full w-full" />

      <figcaption className="absolute inset-x-0 bottom-0 z-10 p-2.5 sm:p-4">
        <span
          className="mb-1 inline-block rounded-full px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.16em] text-white sm:mb-2 sm:px-2 sm:text-[9px] sm:tracking-[0.18em]"
          style={{ backgroundColor: color }}
        >
          {NAME_BY_DIV[member.divisionId]}
        </span>
        <p className="line-clamp-2 font-display text-[12px] font-bold leading-tight text-white sm:text-[15px]">
          {member.name}
        </p>
        <p className="mt-0.5 hidden font-mono text-[10px] tracking-[0.12em] text-white/75 sm:block">
          {member.role} · &rsquo;{String(member.year).slice(2)}
        </p>
      </figcaption>
    </motion.figure>
  )
}

export default function Members() {
  const shouldReduce = useReducedMotion()
  const [filter, setFilter] = useState('all')
  const [showAllEveryone, setShowAllEveryone] = useState(false)

  const shown = filter === 'all' ? ORDERED : ORDERED.filter((m) => m.divisionId === filter)
  const isMarqueeMode = filter === 'all' && !showAllEveryone

  const marqueeHalf = Math.ceil(ORDERED.length / 2)
  const row1 = isMarqueeMode ? ORDERED.slice(0, marqueeHalf) : []
  const row2 = isMarqueeMode ? ORDERED.slice(marqueeHalf) : []

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
          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--ink-3)]">
              The roster · {new Date().getFullYear()}
            </p>
            <h2
              className="font-display font-extrabold leading-[0.95] tracking-tight text-[var(--ink)] md:whitespace-nowrap"
              style={{ fontSize: 'clamp(2.25rem, 4.2vw, 3.75rem)' }}
            >
              The people are the lab.
            </h2>
          </div>
          <p className="shrink-0 font-mono text-sm text-[var(--ink-2)]">
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
                onClick={() => {
                  setFilter(f.id)
                  setShowAllEveryone(false)
                }}
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
        {isMarqueeMode ? (
          <div className="mt-8 flex flex-col items-center">
            <div className="relative w-full overflow-hidden py-4 flex flex-col gap-4">
              <div className="flex w-max marquee-track gap-3 sm:gap-4" style={{ '--marquee-dur': '100s' }}>
                {[...row1, ...row1].map((m, i) => (
                  <div key={`${m.id}-${i}`} className="w-40 shrink-0 sm:w-48 lg:w-56">
                    <MemberCard member={m} index={i} isMarquee />
                  </div>
                ))}
              </div>
              <div className="flex w-max marquee-track gap-3 sm:gap-4" style={{ '--marquee-dur': '100s', animationDirection: 'reverse' }}>
                {[...row2, ...row2].map((m, i) => (
                  <div key={`${m.id}-${i}`} className="w-40 shrink-0 sm:w-48 lg:w-56">
                    <MemberCard member={m} index={i} isMarquee />
                  </div>
                ))}
              </div>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[var(--surface)] to-transparent sm:w-24" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[var(--surface)] to-transparent sm:w-24" />
            </div>

            <button
              onClick={() => setShowAllEveryone(true)}
              className="mt-8 rounded-full border border-[var(--line-2)] px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-[var(--ink-2)] transition-colors hover:border-[var(--ink)] hover:text-[var(--ink)] sm:px-8 sm:py-3 sm:text-sm"
            >
              Show All
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-5 xl:grid-cols-6"
          >
            <AnimatePresence mode="popLayout">
              {shown.map((m, i) => (
                <MemberCard key={m.id} member={m} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  )
}
