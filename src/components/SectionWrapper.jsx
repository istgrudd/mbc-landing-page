import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

export default function SectionWrapper({ children, id, className = '', style }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  const variants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 40 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id={id} ref={ref} className={className} style={style}>
      <motion.div
        variants={variants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </section>
  )
}
