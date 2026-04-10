import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaWhatsapp, FaDownload } from 'react-icons/fa'
import { useMemo } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function Hero() {
  const { dark } = useTheme()

  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 5,
      })),
    []
  )

  return (
    <section id="hero" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden" style={{ padding: '6rem 1.5rem 2rem' }}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            background: dark ? 'rgba(99, 102, 241, 0.3)' : 'rgba(99, 102, 241, 0.15)',
          }}
        />
      ))}

      <div className="absolute top-1/4 -left-32 w-64 sm:w-96 h-64 sm:h-96 bg-indigo-600/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 -right-32 w-64 sm:w-96 h-64 sm:h-96 bg-purple-600/20 rounded-full blur-[128px]" />

      <div className="relative z-10 text-center w-full" style={{ maxWidth: '768px' }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-1 animate-pulse-glow"
          style={{ margin: '0 auto 2rem' }}
        >
          <div
            className="w-full h-full rounded-full flex items-center justify-center text-3xl sm:text-4xl font-bold gradient-text"
            style={{ background: dark ? '#111827' : '#ffffff' }}
          >
            LG
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-indigo-400 font-medium mb-3 sm:mb-4 tracking-widest uppercase text-xs sm:text-sm"
        >
          Desenvolvedor de TI
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-3xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
        >
          Olá, eu sou{' '}
          <span className="gradient-text">Luiz Gabriel</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-base sm:text-lg lg:text-xl leading-relaxed px-2"
          style={{ maxWidth: '640px', margin: '0 auto 2.5rem', color: dark ? '#9ca3af' : '#6b7280' }}
        >
          Transformando ideias em soluções digitais com
          design intuitivo, performance e tecnologia de ponta.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
        >
          <a
            href="#experiencia"
            className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full font-medium text-white hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-1 text-center"
            style={{ padding: '0.75rem 2rem' }}
          >
            Conheça meu trabalho
          </a>
          <a
            href="#recomendacoes"
            className="w-full sm:w-auto rounded-full font-medium transition-all duration-300 hover:-translate-y-1 text-center"
            style={{
              padding: '0.75rem 2rem',
              border: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.15)',
              color: dark ? '#e2e8f0' : '#1a1a2e',
            }}
          >
            Recomendações
          </a>
          <a
            href="/docs/curriculo.pdf"
            download
            className="w-full sm:w-auto rounded-full font-medium transition-all duration-300 hover:-translate-y-1 text-center inline-flex items-center justify-center gap-2"
            style={{
              padding: '0.75rem 2rem',
              border: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.15)',
              color: dark ? '#e2e8f0' : '#1a1a2e',
            }}
          >
            <FaDownload size={14} /> Currículo
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex gap-5 justify-center"
          style={{ marginTop: '2.5rem' }}
        >
          {[
            { icon: <FaGithub size={20} />, href: 'https://github.com/LuizzFerreira' },
            { icon: <FaLinkedin size={20} />, href: 'https://www.linkedin.com/in/luiz-gabriel-ferreira-b2875125b' },
            { icon: <FaWhatsapp size={20} />, href: 'https://wa.me/5521995575988' },
          ].map((s, i) => (
            <motion.a
              key={i}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="w-11 h-11 rounded-full glass flex items-center justify-center hover:border-indigo-500/50 transition-colors"
              style={{ color: dark ? '#9ca3af' : '#6b7280' }}
            >
              {s.icon}
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{ marginTop: '3rem' }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full flex justify-center pt-2"
            style={{ margin: '0 auto', border: dark ? '2px solid rgba(255,255,255,0.2)' : '2px solid rgba(0,0,0,0.15)' }}
          >
            <div className="w-1 h-2 bg-indigo-400 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
