import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext'

const links = [
  { label: 'Início', href: '#hero' },
  { label: 'Experiência', href: '#experiencia' },
  { label: 'Acadêmico', href: '#academico' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Recomendações', href: '#recomendacoes' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { dark, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? (dark ? 'glass shadow-lg' : 'bg-white/80 backdrop-blur-md shadow-lg') : 'bg-transparent'
      }`}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%', padding: '1rem 2.5rem' }} className="flex items-center justify-between">
        <motion.a
          href="#hero"
          className="text-xl font-bold gradient-text"
          whileHover={{ scale: 1.05 }}
        >
          LG<span className="text-indigo-400">.</span>
        </motion.a>

        <div className="hidden md:flex gap-6 lg:gap-8 items-center">
          {links.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors relative group ${dark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
              whileHover={{ y: -2 }}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggle}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${dark ? 'text-yellow-400 hover:bg-white/10' : 'text-gray-600 hover:bg-gray-200'}`}
          >
            {dark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </motion.button>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggle}
            className={`w-9 h-9 rounded-full flex items-center justify-center ${dark ? 'text-yellow-400' : 'text-gray-600'}`}
          >
            {dark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </motion.button>
          <button className={dark ? 'text-white' : 'text-gray-800'} onClick={() => setOpen(!open)}>
            {open ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-t ${dark ? 'glass border-white/5' : 'bg-white/90 backdrop-blur-md border-gray-200'}`}
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block transition-colors ${dark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                style={{ padding: '0.75rem 1.5rem' }}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
