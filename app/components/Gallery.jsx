import { motion, useReducedMotion } from 'framer-motion'

// The "fun" candid photos — milestones and life outside the work.
const SHOTS = [
  { src: '/photos/all-member-3.jpeg', caption: 'On the steps', tag: 'The cohort', accent: '#1F6FD6', w: 'w-[440px]' },
  { src: '/photos/panitia-1.jpeg', caption: 'Event committee', tag: 'Behind the scenes', accent: '#E5341F', w: 'w-[440px]' },
  { src: '/photos/all-member-4.jpeg', caption: 'Lab dinner', tag: 'Off the clock', accent: '#1F6FD6', w: 'w-[300px]' },
  { src: '/photos/wisuda-1-portrait.jpeg', caption: 'Graduation day', tag: 'Milestones', accent: '#E5341F', w: 'w-[300px]' },
  { src: '/photos/wisuda-2-portrait.jpeg', caption: 'Sending off the seniors', tag: 'Milestones', accent: '#1F6FD6', w: 'w-[300px]' },
]

function Shot({ shot }) {
  return (
    <figure
      className={`group relative h-72 ${shot.w} shrink-0 overflow-hidden rounded-2xl border border-[var(--line)]`}
    >
      <img
        src={shot.src}
        alt={shot.caption}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(8,10,15,0.85) 0%, transparent 55%)' }}
      />
      <figcaption className="absolute inset-x-0 bottom-0 p-5">
        <span
          className="mb-2 inline-block rounded-full px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white"
          style={{ backgroundColor: shot.accent }}
        >
          {shot.tag}
        </span>
        <p className="font-display text-lg font-bold leading-tight text-white">{shot.caption}</p>
      </figcaption>
    </figure>
  )
}

export default function Gallery() {
  const shouldReduce = useReducedMotion()
  const loop = [...SHOTS, ...SHOTS]

  return (
    <section id="life" className="relative overflow-hidden bg-[var(--paper)] py-24">
      <div className="mx-auto max-w-page px-6 lg:px-10">
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 max-w-2xl"
        >
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--ink-3)]">
            Beyond the work
          </p>
          <h2
            className="font-display font-extrabold leading-[0.95] tracking-tight text-[var(--ink)]"
            style={{ fontSize: 'clamp(2.25rem, 4.2vw, 3.75rem)' }}
          >
            Life at the lab.
          </h2>
        </motion.div>
      </div>

      {/* edge fades */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-28"
        style={{ background: 'linear-gradient(to right, var(--paper), transparent)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-28"
        style={{ background: 'linear-gradient(to left, var(--paper), transparent)' }}
      />

      {/* auto-scrolling track (pauses on hover; static under reduced-motion) */}
      <div className="flex overflow-hidden">
        <div
          className="marquee-track flex w-max shrink-0 gap-5 pl-5 hover:[animation-play-state:paused]"
          style={{ ['--marquee-dur']: '46s' }}
        >
          {loop.map((shot, i) => (
            <Shot key={`${shot.src}-${i}`} shot={shot} />
          ))}
        </div>
      </div>
    </section>
  )
}
