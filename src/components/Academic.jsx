import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaGraduationCap, FaLanguage, FaFileExcel, FaSchool } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'
import SectionTitle from './SectionTitle'

const education = [
  {
    icon: <FaGraduationCap size={22} />,
    title: 'IBMR - Centro Universitário',
    type: 'Ensino Superior',
    description: 'Expandiu conhecimentos em Modelagem de Software, Programação de Soluções Computacionais, IA, Computação Gráfica, Análise de Dados e Big Data, Segurança e Estruturas Matemáticas.',
    color: 'from-purple-500 to-pink-500',
    colorBg: 'bg-purple-500/10',
    colorText: 'text-purple-400',
  },
  {
    icon: <FaSchool size={22} />,
    title: 'INSP',
    type: 'Ensino Médio',
    description: 'Concluiu os estudos aos 18 anos, desenvolvendo habilidades de comunicação, liderança e resolução de problemas em um ambiente estimulante.',
    color: 'from-blue-500 to-cyan-500',
    colorBg: 'bg-blue-500/10',
    colorText: 'text-blue-400',
  },
  {
    icon: <FaLanguage size={22} />,
    title: 'Cultura Inglesa',
    type: 'Idioma - Inglês',
    description: 'Aprimorou habilidades no idioma inglês de maneira imersiva e dinâmica, desenvolvendo fluência em situações cotidianas e profissionais.',
    color: 'from-emerald-500 to-teal-500',
    colorBg: 'bg-emerald-500/10',
    colorText: 'text-emerald-400',
  },
  {
    icon: <FaFileExcel size={22} />,
    title: 'S.O.S Tecnologia e Educação',
    type: 'Curso - Excel',
    description: 'Realizou o curso de Excel, dominando as principais ferramentas e funcionalidades para aplicação eficaz no ambiente profissional.',
    color: 'from-orange-500 to-amber-500',
    colorBg: 'bg-orange-500/10',
    colorText: 'text-orange-400',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: 'easeOut' },
  }),
}

export default function Academic() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })
  const { dark } = useTheme()

  return (
    <section id="academico" className="w-full" style={{ padding: '2rem 1.5rem' }}>
      <div className="w-full" style={{ maxWidth: '768px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <SectionTitle title="Acadêmico" subtitle="Formação e cursos" />

        <div ref={ref} className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {education.map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="rounded-2xl transition-all duration-500 group cursor-default"
              style={{
                padding: '1.25rem',
                background: dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                border: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.08)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-xl ${item.colorBg} flex items-center justify-center ${item.colorText}`}>
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-bold truncate" style={{ color: dark ? '#fff' : '#1a1a2e' }}>{item.title}</h3>
                  <span className={`text-xs sm:text-sm font-medium ${item.colorText}`}>{item.type}</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: dark ? '#9ca3af' : '#6b7280' }}>{item.description}</p>

              <div className={`mt-4 h-1 rounded-full bg-gradient-to-r ${item.color} w-0 group-hover:w-full transition-all duration-700`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
