import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function SectionTitle({ title, subtitle }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <div ref={ref} className="text-center">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        className="text-indigo-400 font-medium tracking-widest uppercase text-sm mb-3"
      >
        {subtitle}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-5xl font-bold gradient-text"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: 80 } : {}}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-4 rounded-full"
      />
    </div>
  )
}
