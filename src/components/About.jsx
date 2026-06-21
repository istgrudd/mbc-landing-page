import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { divisions } from '../data/divisions'
import SectionWrapper from './SectionWrapper'

const DIV_META = {
  cybersec:  { color: 'text-red-400',    dot: 'bg-red-400',    accent: '#F87171', members:  9, projects:  3 },
  bigdata:   { color: 'text-blue-400',   dot: 'bg-blue-400',   accent: '#60A5FA', members: 12, projects:  1 },
  gis:       { color: 'text-green-400',  dot: 'bg-green-400',  accent: '#4ADE80', members:  9, projects:  3 },
  gametech:  { color: 'text-purple-400', dot: 'bg-purple-400', accent: '#C084FC', members:  9, projects:  4 },
  practicum: { color: 'text-yellow-400', dot: 'bg-yellow-400', accent: '#FBBF24', members: 12, projects:  0 },
}

/* ── Expandable division row ─────────────────────────────────── */
function DivisionRow({ division, index, isActive, onToggle }) {
  const shouldReduce = useReducedMotion()
  const Icon = Icons[division.icon] || Icons.Layers
  const meta = DIV_META[division.id] || DIV_META.bigdata

  return (
    <motion.div
      initial={shouldReduce ? {} : { opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }}
      className="border-b border-[var(--border)] last:border-b-0 cursor-pointer select-none"
      onClick={() => onToggle(index)}
    >
      {/* Collapsed row */}
      <div
        className="flex items-center gap-4 py-4 transition-colors duration-200"
        style={{ color: isActive ? meta.accent : undefined }}
      >
        {/* Left accent bar */}
        <div
          className="w-0.5 shrink-0 rounded-full transition-all duration-300"
          style={{
            height: 20,
            background: meta.accent,
            opacity: isActive ? 1 : 0,
            transform: isActive ? 'scaleY(1)' : 'scaleY(0.4)',
          }}
        />

        {/* Icon */}
        <span className={`shrink-0 transition-colors duration-200 ${isActive ? meta.color : 'text-[var(--text-muted)]'}`}>
          <Icon size={15} />
        </span>

        {/* Name */}
        <span className={`font-heading font-bold text-sm sm:text-base flex-1 transition-colors duration-200 ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>
          {division.name}
        </span>

        {/* Mono stats — always visible */}
        <div className="flex items-center gap-4 shrink-0">
          <span className={`font-mono text-xs tabular-nums transition-colors duration-200 ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
            {meta.members} <span className="text-[10px] opacity-50">mbr</span>
          </span>
          <span className={`font-mono text-xs tabular-nums transition-colors duration-200 ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
            {meta.projects} <span className="text-[10px] opacity-50">proj</span>
          </span>
        </div>

        {/* Expand indicator */}
        <motion.span
          className="font-mono text-[10px] text-[var(--text-muted)] shrink-0 w-3"
          animate={{ rotate: isActive ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          +
        </motion.span>
      </div>

      {/* Expanded description */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key="desc"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="font-body text-sm text-[var(--text-secondary)] leading-relaxed pb-4 pl-9 pr-4">
              {division.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ── Roster table ────────────────────────────────────────────── */
function RosterTable({ activeDivIdx }) {
  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl overflow-hidden">
      <div className="grid grid-cols-[1fr_48px_44px] px-5 py-2.5 border-b border-[var(--border)]">
        <span className="font-mono text-[10px] tracking-[0.22em] text-[var(--text-muted)] uppercase">Division</span>
        <span className="font-mono text-[10px] tracking-[0.22em] text-[var(--text-muted)] uppercase text-right">Mbr</span>
        <span className="font-mono text-[10px] tracking-[0.22em] text-[var(--text-muted)] uppercase text-right">Proj</span>
      </div>

      {divisions.map((div, i) => {
        const meta = DIV_META[div.id] || DIV_META.bigdata
        const isActive = activeDivIdx === i
        return (
          <div
            key={div.id}
            className="grid grid-cols-[1fr_48px_44px] px-5 py-3 border-b border-[var(--border)]/50 last:border-b-0 transition-colors duration-200"
            style={{ backgroundColor: isActive ? `${meta.accent}0D` : 'transparent' }}
          >
            <span className={`font-mono text-sm transition-colors duration-200 ${isActive ? meta.color : 'text-[var(--text-secondary)]'}`}>
              {div.name}
            </span>
            <span className={`font-mono text-sm text-right tabular-nums transition-colors duration-200 ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
              {meta.members}
            </span>
            <span className={`font-mono text-sm text-right tabular-nums transition-colors duration-200 ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
              {meta.projects}
            </span>
          </div>
        )
      })}

      <div className="grid grid-cols-[1fr_48px_44px] px-5 py-3 bg-[var(--bg-card)] border-t border-[var(--border)]">
        <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--text-muted)] uppercase">Total</span>
        <span className="font-mono text-sm text-right tabular-nums text-brand-glow">51</span>
        <span className="font-mono text-sm text-right tabular-nums text-brand-glow">8</span>
      </div>
    </div>
  )
}

/* ── Section ─────────────────────────────────────────────────── */
export default function About() {
  const shouldReduce = useReducedMotion()
  const [activeRow, setActiveRow] = useState(null)

  function handleToggle(i) {
    setActiveRow(prev => prev === i ? null : i)
  }

  return (
    <SectionWrapper id="about" className="relative py-24 px-8 lg:px-14 bg-[var(--bg-base)] overflow-hidden">

      {/* Faint section-number watermark */}
      <div aria-hidden="true" className="absolute right-8 top-12 font-heading font-black leading-none text-[var(--text-primary)] opacity-[0.025] select-none pointer-events-none"
        style={{ fontSize: 'clamp(6rem, 18vw, 14rem)' }}>
        01
      </div>

      {/* Right-side glow */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 40% 50% at 95% 20%, rgba(37,99,235,0.07) 0%, transparent 100%)'
      }} />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">

        {/* ── Zone 1: Header ─────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">

          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-[11px] tracking-[0.32em] text-[var(--text-muted)] uppercase mb-5">
              § Who We Are
            </p>
            <h2 className="font-heading font-extrabold leading-[0.92] tracking-tight text-[var(--text-primary)]"
              style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4rem)' }}>
              About<br />MBC Lab
            </h2>
          </motion.div>

          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="space-y-6"
          >
            <p className="font-body text-[var(--text-secondary)] leading-relaxed text-base">
              MBC Lab is an official research and development laboratory under the Faculty of Informatics at Telkom University, Bandung. We cultivate a community of curious, collaborative, and driven student researchers across five active divisions.
            </p>
            <div className="flex items-center gap-6 pt-1">
              {[['51', 'Assistants'], ['8', 'HKI Works'], ['3', 'Papers']].map(([val, lbl]) => (
                <div key={lbl}>
                  <span className="font-mono text-lg text-brand-glow tabular-nums">{val}</span>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--text-muted)] uppercase ml-2">{lbl}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-[var(--border)]" />

        {/* ── Zone 2: Division roster ─────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_340px] gap-10 items-start">

          {/* Left: expandable division rows */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.28em] text-[var(--text-muted)] uppercase mb-4">
              Active Divisions — click to expand
            </p>
            <div className="border-t border-[var(--border)]">
              {divisions.map((div, i) => (
                <DivisionRow
                  key={div.id}
                  division={div}
                  index={i}
                  isActive={activeRow === i}
                  onToggle={handleToggle}
                />
              ))}
            </div>
          </div>

          {/* Right: data table */}
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="lg:sticky lg:top-8"
          >
            <p className="font-mono text-[10px] tracking-[0.28em] text-[var(--text-muted)] uppercase mb-4">
              Lab Roster · {new Date().getFullYear()}
            </p>
            <RosterTable activeDivIdx={activeRow} />
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
