import { ThemeProvider, useTheme } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Academic from './components/Academic'
import Projects from './components/Projects'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Chatbot from './components/Chatbot'

function AppContent() {
  const { dark } = useTheme()

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center overflow-x-hidden transition-colors duration-500"
      style={{ background: dark ? '#0a0a0f' : '#f8f9fc', color: dark ? '#e2e8f0' : '#1a1a2e', gap: '3rem' }}
    >
      <Navbar />
      <Hero />
      <Experience />
      <Skills />
      <Academic />
      <Projects />
      <Testimonials />
      <Footer />
      <ScrollToTop />
      <Chatbot />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
