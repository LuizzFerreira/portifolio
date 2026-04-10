import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaExternalLinkAlt, FaReact } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'
import SectionTitle from './SectionTitle'

export default function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const { dark } = useTheme()

  return (
    <section id="projetos" className="w-full" style={{ padding: '2rem 1.5rem' }}>
      <div className="w-full" style={{ maxWidth: '768px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <SectionTitle title="Projetos" subtitle="O que construí" />

        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -5 }}
            className="rounded-2xl overflow-hidden group transition-all duration-500"
            style={{
              background: dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
              border: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.08)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div className="h-36 sm:h-48 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-pink-600/20 relative flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="text-indigo-400/30"
              >
                <FaReact size={80} />
              </motion.div>
              <div className="absolute inset-0" style={{ background: dark ? 'linear-gradient(to top, #0a0a0f, transparent)' : 'linear-gradient(to top, #f8f9fc, transparent)' }} />
            </div>

            <div className="relative z-10" style={{ padding: '1.25rem', marginTop: '-1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <span
                className="text-xs font-medium text-indigo-400 bg-indigo-500/10 rounded-full border border-indigo-500/20 w-fit"
                style={{ padding: '0.25rem 0.75rem' }}
              >
                Projeto Acadêmico
              </span>

              <h3 className="text-xl sm:text-2xl font-bold" style={{ color: dark ? '#fff' : '#1a1a2e' }}>
                Plataforma de Previsão de Gastos em Apostas Esportivas
              </h3>

              <p className="text-sm sm:text-base leading-relaxed" style={{ color: dark ? '#9ca3af' : '#6b7280' }}>
                Projeto realizado na faculdade com o objetivo de criar uma plataforma que fizesse previsões de gastos
                em apostas esportivas. Atuei na parte do front-end, utilizando React para o desenvolvimento da interface.
              </p>

              <div className="flex flex-wrap gap-2">
                {['React', 'JavaScript', 'CSS', 'Front-End'].map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-medium rounded-full"
                    style={{
                      padding: '0.25rem 0.75rem',
                      background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                      border: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                      color: dark ? '#d1d5db' : '#4b5563',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <motion.a
                href="#"
                whileHover={{ x: 5 }}
                className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Ver projeto <FaExternalLinkAlt size={12} />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
