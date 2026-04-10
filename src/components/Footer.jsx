import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'

export default function Footer() {
  const { dark } = useTheme()

  return (
    <footer className="w-full" style={{ padding: '3rem 1.5rem', borderTop: dark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.08)' }}>
      <div className="w-full text-center" style={{ maxWidth: '768px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xl sm:text-2xl font-bold gradient-text"
        >
          Vamos trabalhar juntos?
        </motion.p>
        <p style={{ color: dark ? '#6b7280' : '#9ca3af' }} className="text-sm sm:text-base">Entre em contato e vamos criar algo incrível.</p>

        <div className="flex gap-4 justify-center">
          {[
            { icon: <FaGithub size={18} />, href: 'https://github.com/LuizzFerreira' },
            { icon: <FaLinkedin size={18} />, href: 'https://www.linkedin.com/in/luiz-gabriel-ferreira-b2875125b' },
            { icon: <FaWhatsapp size={18} />, href: 'https://wa.me/5521995575988' },
            { icon: <FaEnvelope size={18} />, href: 'mailto:luizgferreira13@gmail.com' },
          ].map((s, i) => (
            <motion.a
              key={i}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.2, y: -3 }}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              style={{
                color: dark ? '#9ca3af' : '#6b7280',
                background: dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                border: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.08)',
              }}
            >
              {s.icon}
            </motion.a>
          ))}
        </div>

        <p className="text-xs sm:text-sm" style={{ color: dark ? '#4b5563' : '#9ca3af' }}>
          © {new Date().getFullYear()} Luiz Gabriel.
        </p>
      </div>
    </footer>
  )
}
