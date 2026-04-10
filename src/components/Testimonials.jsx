import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'
import SectionTitle from './SectionTitle'

const testimonials = [
  { name: 'Vinicius Franco', role: 'Colega de Trabalho', text: 'Trabalhei com Luiz na empresa Mundiware, desde a base até ele se tornar meu braço direito nas demandas. Rápido aprendizado, conhecimento prévio, trabalho em equipe, pro ativo, responsável. Domina HTML, CSS e Javascript.', color: 'from-indigo-500 to-blue-500' },
  { name: 'João Victor Neves', role: 'Colega de Trabalho', text: 'Ótimo desenvolvedor! Trabalhei alguns meses com ele, sempre disposto a ajudar, dando dicas para melhoria do código. Muito inteligente, aprende bem rápido, comunicativo, proativo e ágil. Recomendo demais! Tmj!', color: 'from-purple-500 to-pink-500' },
  { name: 'Diego Felipe Alves', role: 'Colega de Trabalho', text: 'Luiz Gabriel apresentou skills na área de Desenvolvimento web de portais de notícias utilizando tecnologias atuais do mercado. Sempre entregou suas demandas dentro do prazo e ofertou suas habilidades como ajuda para colegas de trabalho. Foi uma ótima experiência trabalhar ao lado do Luiz.', color: 'from-emerald-500 to-teal-500' },
  { name: 'Everton Dos Santos', role: 'Colega de Trabalho', text: 'Tive a oportunidade de trabalhar com Luiz Gabriel em projetos desafiadores, e ele demonstrou ser um profissional extremamente competente em Desenvolvimento Web e Experiência do Usuário. Sempre disposto a enfrentar novos desafios, ele alia habilidades técnicas sólidas com um foco claro nas necessidades do usuário.', color: 'from-orange-500 to-amber-500' },
  { name: 'Kledisom Oliveira', role: 'Colega de Trabalho', text: 'Tive o prazer de trabalhar com o Luiz na Mundiware e posso dizer, com toda a certeza, que ele é um profissional altamente qualificado e comprometido. Sua habilidade de identificar problemas e propor soluções práticas foi impressionante. Ele é proativo, trabalha muito bem em equipe e sempre está disposto a compartilhar conhecimento.', color: 'from-rose-500 to-red-500' },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const { dark } = useTheme()

  const next = useCallback(() => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1)), [])
  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))

  useEffect(() => {
    if (paused) return
    const timer = setInterval(next, 12000)
    return () => clearInterval(timer)
  }, [paused, next])

  const t = testimonials[current]

  return (
    <section id="recomendacoes" className="relative w-full" style={{ padding: '2rem 1.5rem' }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[128px]" />

      <div className="relative z-10 w-full" style={{ maxWidth: '768px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <SectionTitle title="Recomendações" subtitle="O que dizem sobre mim" />

        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            <div
              className="rounded-2xl min-h-[280px]"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              style={{
                padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.5rem',
                background: dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                border: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.08)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <FaQuoteLeft className="text-2xl sm:text-4xl" style={{ color: dark ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.15)' }} />

              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-base sm:text-lg leading-relaxed italic" style={{ color: dark ? '#d1d5db' : '#4b5563' }}>
                    "{t.text}"
                  </p>

                  <div className="flex items-center gap-3 sm:gap-4" style={{ marginTop: '1.5rem' }}>
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-base sm:text-lg`}>
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm sm:text-base" style={{ color: dark ? '#fff' : '#1a1a2e' }}>{t.name}</p>
                      <p className="text-xs sm:text-sm" style={{ color: dark ? '#6b7280' : '#9ca3af' }}>{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prev}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{
                  color: dark ? '#9ca3af' : '#6b7280',
                  background: dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                  border: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.08)',
                }}
              >
                <FaChevronLeft />
              </motion.button>

              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: i === current ? '1.5rem' : '0.5rem',
                      background: i === current ? '#6366f1' : (dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'),
                    }}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={next}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{
                  color: dark ? '#9ca3af' : '#6b7280',
                  background: dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                  border: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.08)',
                }}
              >
                <FaChevronRight />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
