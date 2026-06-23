import { motion, useReducedMotion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

export default function FloatingThemeToggle({ isDark, onToggle }) {
  const shouldReduce = useReducedMotion()

  return (
    <motion.button
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full border border-[var(--line-2)] bg-[var(--surface)] text-[var(--ink)] shadow-lg shadow-black/10 transition-transform duration-200 hover:scale-110"
      whileTap={shouldReduce ? {} : { scale: 0.9 }}
      initial={shouldReduce ? false : { opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.4, ease: 'easeOut' }}
    >
      <motion.span
        key={isDark ? 'moon' : 'sun'}
        initial={shouldReduce ? false : { rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="block"
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </motion.span>
    </motion.button>
  )
}
