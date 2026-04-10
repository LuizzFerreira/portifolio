import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaBriefcase, FaExternalLinkAlt } from 'react-icons/fa'
import logoOns from '../assets/img/logo-ons-branca-pequena.png'
import logoMundiware from '../assets/img/mundiware-logo.png'
import { useTheme } from '../context/ThemeContext'
import SectionTitle from './SectionTitle'

const experiences = [
  {
    title: 'Estagiário de TI',
    company: 'Operador Nacional do Sistema Elétrico (ONS)',
    logo: logoOns,
    period: 'Abr/2025 - Atual • Estagiário',
    description:
      'Atuo em projetos de apoio à equipe de TI, desenvolvendo e dando manutenção em soluções com HTML, CSS, JavaScript, React, C#, .NET, SQL Server, Power BI e muito mais. Essa experiência tem me proporcionado contato direto com diferentes tecnologias e práticas do setor, ampliando minha visão e fortalecendo minhas habilidades técnicas e profissionais.',
    techs: ['HTML', 'CSS', 'JavaScript', 'React', 'C#', '.NET', 'SQL Server', 'Power BI'],
    link: 'https://www.ons.org.br',
  },
  {
    title: 'Desenvolvedor Front-End',
    company: 'MundiWare',
    logo: logoMundiware,
    period: '9 meses • Estágio → Efetivado',
    description:
      'Atuei como desenvolvedor front-end em uma empresa especializada no desenvolvimento e suporte de portais de notícia. Iniciei como estagiário por 4 meses e fui efetivado, completando 9 meses de atuação. Participei de reuniões, colaborei em projetos e contribuí em diversas atividades junto a toda a equipe.',
    techs: ['HTML', 'CSS', 'JavaScript', 'MWTPL'],
    link: 'https://www.mundiware.com',
  },
]

export default function Experience() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const { dark } = useTheme()

  const cardStyle = {
    display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '1.25rem',
    background: dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
    border: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.08)',
    backdropFilter: 'blur(12px)',
  }

  const badgeStyle = {
    padding: '0.25rem 0.75rem',
    color: dark ? '#6b7280' : '#9ca3af',
    background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
  }

  const techStyle = { padding: '0.25rem 0.75rem' }

  return (
    <section id="experiencia" className="relative w-full" style={{ padding: '2rem 1.5rem' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[128px]" />

      <div className="relative z-10 w-full" style={{ maxWidth: '768px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <SectionTitle title="Experiência" subtitle="Trajetória profissional" />

        <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              <div className="rounded-2xl group transition-all duration-500" style={cardStyle}>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-indigo-500/10 flex items-center justify-center overflow-hidden">
                      {exp.logo ? <img src={exp.logo} alt={exp.company} className="w-8 h-8 object-contain" /> : <FaBriefcase className="text-indigo-400" size={20} />}
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold" style={{ color: dark ? '#fff' : '#1a1a2e' }}>{exp.title}</h3>
                      <p className="text-indigo-400 font-medium text-sm sm:text-base">{exp.company}</p>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm rounded-full w-fit" style={badgeStyle}>
                    {exp.period}
                  </span>
                </div>

                <p className="text-sm sm:text-base leading-relaxed" style={{ color: dark ? '#9ca3af' : '#6b7280' }}>
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {exp.techs.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-medium rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                      style={techStyle}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <motion.a
                  href={exp.link}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Visitar site da empresa <FaExternalLinkAlt size={12} />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
