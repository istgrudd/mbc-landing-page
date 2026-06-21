import { motion, useReducedMotion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

export default function FloatingThemeToggle({ isDark, onToggle }) {
  const shouldReduce = useReducedMotion()

  return (
    <motion.button
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/20 text-slate-800 dark:text-slate-200 hover:scale-110 shadow-lg shadow-black/20 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-glow"
      whileTap={shouldReduce ? {} : { scale: 0.9 }}
      initial={shouldReduce ? {} : { opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.4, ease: 'easeOut' }}
    >
      <motion.div
        key={isDark ? 'moon' : 'sun'}
        initial={shouldReduce ? {} : { rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={shouldReduce ? {} : { rotate: 90, opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </motion.div>
    </motion.button>
  )
}
