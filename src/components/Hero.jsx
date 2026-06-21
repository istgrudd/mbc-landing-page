import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const PARTICLES = [
  { width: 300, height: 300, top: '10%', left: '5%',  delay: 0   },
  { width: 200, height: 200, top: '60%', left: '80%', delay: 1.5 },
  { width: 150, height: 150, top: '30%', left: '70%', delay: 0.8 },
  { width: 250, height: 250, top: '70%', left: '15%', delay: 2   },
  { width: 180, height: 180, top: '5%',  left: '50%', delay: 1   },
  { width: 120, height: 120, top: '50%', left: '45%', delay: 2.5 },
]

const DIVISIONS = [
  { text: 'Cyber Security',        color: 'text-red-400',    glow: 'rgba(248,113,113,0.4)'  },
  { text: 'Big Data',              color: 'text-blue-400',   glow: 'rgba(96,165,250,0.4)'   },
  { text: 'Geographic Info',       color: 'text-green-400',  glow: 'rgba(74,222,128,0.4)'   },
  { text: 'Game Technology',       color: 'text-purple-400', glow: 'rgba(192,132,252,0.4)'  },
  { text: 'Practicum',             color: 'text-yellow-400', glow: 'rgba(251,191,36,0.4)'   },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function Hero() {
  const shouldReduce = useReducedMotion()
  const [divIndex, setDivIndex] = useState(0)

  useEffect(() => {
    if (shouldReduce) return
    const id = setInterval(() => setDivIndex(i => (i + 1) % DIVISIONS.length), 2800)
    return () => clearInterval(id)
  }, [shouldReduce])

  const current = DIVISIONS[divIndex]

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden dot-grid">
      {!shouldReduce &&
        PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-brand-blue opacity-10 blur-3xl pointer-events-none"
            style={{ width: p.width, height: p.height, top: p.top, left: p.left }}
            animate={{ y: [0, -30, 0], opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
          />
        ))}

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-base/80 pointer-events-none" />

      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.img
          variants={shouldReduce ? {} : itemVariants}
          src="/logo.png"
          alt="MBC Lab logo"
          className="h-20 w-auto mb-10 drop-shadow-lg"
        />

        {/* Eyebrow */}
        <motion.p
          variants={shouldReduce ? {} : itemVariants}
          className="font-body text-sm sm:text-base text-slate-400 uppercase tracking-[0.35em] mb-4 select-none"
        >
          Center of
        </motion.p>

        {/* Cycling division name */}
        <motion.div
          variants={shouldReduce ? {} : itemVariants}
          className="relative mb-3 min-h-[3.5rem] sm:min-h-[4.5rem] md:min-h-[5.5rem] flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.h1
              key={divIndex}
              initial={shouldReduce ? {} : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduce ? {} : { opacity: 0, y: -28 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className={`font-heading font-extrabold text-5xl sm:text-6xl md:text-7xl leading-tight ${current.color}`}
              style={{ textShadow: `0 0 60px ${current.glow}` }}
            >
              {current.text}
            </motion.h1>
          </AnimatePresence>
        </motion.div>

        {/* Division indicator dots */}
        <motion.div
          variants={shouldReduce ? {} : itemVariants}
          className="flex items-center gap-2 mb-8"
        >
          {DIVISIONS.map((d, i) => (
            <button
              key={i}
              onClick={() => setDivIndex(i)}
              aria-label={`Show ${d.text}`}
              className={`transition-all duration-300 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-glow ${
                i === divIndex
                  ? `w-6 h-1.5 ${d.color.replace('text-', 'bg-')}`
                  : 'w-1.5 h-1.5 bg-slate-600 hover:bg-slate-400'
              }`}
            />
          ))}
        </motion.div>

        <motion.p
          variants={shouldReduce ? {} : itemVariants}
          className="font-body text-base sm:text-lg text-slate-400 max-w-xl mb-10 leading-relaxed"
        >
          A research and development laboratory at Telkom University pushing the frontiers of
          technology, innovation, and applied science.
        </motion.p>

        <motion.div
          variants={shouldReduce ? {} : itemVariants}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#about"
            className="px-8 py-3 rounded-lg bg-brand-blue text-white font-heading font-semibold text-sm tracking-wide hover:bg-brand-glow transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-brand-glow focus-visible:outline-none"
          >
            Explore
          </a>
          <a
            href="mailto:mbc@telkomuniversity.ac.id"
            className="px-8 py-3 rounded-lg border border-brand-blue text-brand-blue font-heading font-semibold text-sm tracking-wide hover:bg-brand-blue/10 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-brand-glow focus-visible:outline-none"
          >
            Join Us
          </a>
        </motion.div>
      </motion.div>

      {!shouldReduce && (
        <motion.a
          href="#about"
          aria-label="Scroll to About section"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-brand-blue transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-glow rounded"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={28} />
        </motion.a>
      )}
    </div>
  )
}
