import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router'

const LINKS = [
  { href: '/#about', label: 'About' },
  { href: '/#divisions', label: 'Divisions' },
  { href: '/#members', label: 'People' },
  { href: '/#work', label: 'Work' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const onHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // The transparent/white treatment only reads well over the home hero.
  // On every other route the page starts on a light surface, so use the
  // solid treatment from the top.
  const solid = scrolled || !onHome

  return (
    <motion.header
      initial={{ y: -48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      className="fixed inset-x-0 top-0 z-40 backdrop-blur-md transition-colors duration-300"
      style={{
        backgroundColor: solid ? 'color-mix(in srgb, var(--paper) 82%, transparent)' : 'transparent',
        borderBottom: `1px solid ${solid ? 'var(--line)' : 'transparent'}`,
      }}
    >
      <div className="mx-auto flex max-w-page items-center justify-between px-6 py-4 lg:px-10">
        <Link to="/" className="flex items-center gap-3" aria-label="MBC Lab — home">
          <img src="/logo.png" alt="MBC Lab" className="h-7 w-auto" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-200 ${
                solid
                  ? 'text-[var(--ink-2)] hover:text-[var(--ink)]'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="/#recruit"
          className="group inline-flex items-center gap-2 rounded-full bg-brand-blue px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white transition-transform duration-200 hover:scale-[1.04]"
        >
          Join the lab
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-red transition-transform duration-300 group-hover:scale-150" />
        </a>
      </div>
    </motion.header>
  )
}
