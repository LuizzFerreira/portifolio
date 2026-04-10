import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useTheme } from '../context/ThemeContext'
import { skills } from '../data/skills'
import SectionTitle from './SectionTitle'

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const { dark } = useTheme()

  return (
    <section id="skills" className="relative w-full" style={{ padding: '2rem 1.5rem' }}>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[128px]" />

      <div className="relative z-10 w-full" style={{ maxWidth: '768px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <SectionTitle title="Skills" subtitle="Tecnologias" />

        <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
              whileHover={{ y: -10, rotate: [0, -2, 2, 0] }}
              className="rounded-2xl text-center group transition-all duration-300 cursor-default overflow-hidden"
              style={{
                padding: '1rem',
                background: dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                border: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.08)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div
                className="text-3xl sm:text-4xl mb-3 transition-transform duration-300 group-hover:scale-125"
                style={{ color: skill.color }}
              >
                {skill.icon}
              </div>
              <p className="text-xs sm:text-sm font-semibold mb-2" style={{ color: dark ? '#fff' : '#1a1a2e' }}>{skill.name}</p>
              <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.08)' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : {}}
                  transition={{ delay: i * 0.1 + 0.3, duration: 1, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ background: skill.color }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
