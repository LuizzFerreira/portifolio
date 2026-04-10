import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaPaperPlane } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'
import { skills } from '../data/skills'
import roboIcon from '../assets/icons/robo.svg'

const skillNames = skills.map((s) => s.name).join(', ')

const MENU_RESPONSE = 'Sobre qual assunto você gostaria de saber mais? 🤔\n\n🟢 Experiência atual no ONS\n🔵 Experiência anterior na MundiWare\n🟠 Skills e tecnologias\n🟣 Formação acadêmica\n🔴 Projetos\n⚪ Recomendações\n🟤 Contato\n\nÉ só digitar o tema! 😉'

// Each entry has: keys, answer, section (optional - for auto-scroll), suggest (optional - topic to follow up)
const knowledge = [
  {
    id: 'about',
    keys: ['nome', 'quem', 'quem é', 'sobre', 'conte', 'apresent', 'luiz', 'gabriel'],
    answer: 'Luiz Gabriel é um Desenvolvedor de TI de 21 anos, nascido em 16/12/2004. Mora na Freguesia, Jacarepaguá - RJ, Brasil. Atualmente é estagiário de TI no Operador Nacional do Sistema Elétrico (ONS) e está sempre em busca de novos desafios na área de tecnologia.\n\nQuer saber mais sobre as experiências dele? 😊',
    section: 'hero',
    suggest: 'experience',
  },
  {
    id: 'age',
    keys: ['idade', 'anos', 'velho', 'novo', 'quantos anos', 'nasceu', 'nascimento', 'aniversário', 'aniversario', 'data'],
    answer: 'Luiz Gabriel tem 21 anos! Nasceu em 16 de dezembro de 2004. 🎂\n\nGostaria de saber mais alguma coisa sobre ele?',
    suggest: 'menu',
  },
  {
    id: 'location',
    keys: ['mora', 'onde', 'cidade', 'localização', 'localizacao', 'região', 'regiao', 'bairro', 'freguesia', 'jacarepaguá', 'jacarepagua', 'rio', 'rj'],
    answer: 'Luiz mora na Freguesia, Jacarepaguá - Rio de Janeiro, RJ, Brasil. 📍\n\nQuer saber sobre a experiência profissional dele?',
    suggest: 'experience',
  },
  {
    id: 'experience',
    keys: ['experiência', 'experiencia', 'trabalho', 'trabalhou', 'empresa', 'profissional', 'carreira', 'emprego'],
    answer: 'Luiz tem duas experiências profissionais:\n\n🟢 Atualmente (desde abril/2025) é estagiário de TI no Operador Nacional do Sistema Elétrico (ONS), onde atua em projetos de apoio à equipe de TI, desenvolvendo e dando manutenção em soluções com HTML, CSS, JavaScript, React, C#, .NET, SQL Server, Power BI e mais.\n\n🔵 Anteriormente trabalhou por 9 meses na MundiWare, empresa especializada em portais de notícia. Começou como estagiário e foi efetivado!\n\nQuer saber mais detalhes sobre alguma dessas experiências? 😄',
    section: 'experiencia',
    suggest: 'exp_choice',
  },
  {
    id: 'ons',
    keys: ['ons', 'operador', 'sistema elétrico', 'atual', 'agora', 'hoje'],
    answer: 'Atualmente Luiz é estagiário de TI no Operador Nacional do Sistema Elétrico (ONS), desde abril de 2025. Lá ele atua em projetos de apoio à equipe de TI, desenvolvendo e dando manutenção em soluções com HTML, CSS, JavaScript, React, C#, .NET, SQL Server, Power BI e muito mais. Essa experiência tem ampliado sua visão e fortalecido suas habilidades técnicas e profissionais! 💡\n\nQuer saber sobre as tecnologias que ele domina?',
    section: 'experiencia',
    suggest: 'skills',
  },
  {
    id: 'mundiware',
    keys: ['mundiware', 'anterior', 'passado'],
    answer: 'Luiz trabalhou por 9 meses na MundiWare, uma empresa especializada em portais de notícia. Começou como estagiário por 4 meses e foi efetivado! Lá ele atuou como desenvolvedor front-end usando HTML, CSS, JavaScript e MWTPL. Foi muito elogiado pela equipe por seu rápido aprendizado e proatividade.\n\nQuer saber o que os colegas dizem sobre ele? 💬',
    section: 'experiencia',
    suggest: 'recommendations',
  },
  {
    id: 'skills',
    keys: ['skill', 'tecnologia', 'linguagem', 'ferramenta', 'sabe', 'domina', 'conhece', 'stack', 'tech'],
    get answer() {
      return `As tecnologias que o Luiz domina são: ${skillNames}.\n\nQuer saber onde ele aplica essas tecnologias? 🚀`
    },
    section: 'skills',
    suggest: 'experience',
  },
  {
    id: 'academic',
    keys: ['faculdade', 'universidade', 'ibmr', 'curso', 'graduação', 'graduacao', 'superior', 'formação', 'formacao', 'acadêmico', 'academico', 'estud'],
    answer: 'Luiz cursa Ciência da Computação no Centro Universitário IBMR, onde expandiu conhecimentos em Modelagem de Software, IA, Computação Gráfica, Análise de Dados e Big Data, entre outras áreas. Também concluiu o ensino médio no INSP, fez inglês na Cultura Inglesa e Excel na S.O.S Tecnologia.\n\nQuer saber sobre as skills dele? 📚',
    section: 'academico',
    suggest: 'skills',
  },
  {
    id: 'english',
    keys: ['inglês', 'ingles', 'idioma', 'língua', 'lingua', 'english'],
    answer: 'Luiz estudou inglês na Cultura Inglesa, onde aprimorou suas habilidades no idioma de maneira imersiva e dinâmica, desenvolvendo fluência em situações cotidianas e profissionais.\n\nAlguma outra dúvida sobre o Luiz? 😊',
    section: 'academico',
    suggest: 'menu',
  },
  {
    id: 'projects',
    keys: ['projeto', 'portfólio', 'portfolio', 'fez', 'criou', 'desenvolveu'],
    answer: 'Um dos projetos de destaque do Luiz é uma Plataforma de Previsão de Gastos em Apostas Esportivas, desenvolvida na faculdade usando React no front-end. Ele também construiu este portfólio que você está navegando agora! 😄\n\nQuer saber sobre a formação acadêmica dele?',
    section: 'projetos',
    suggest: 'academic',
  },
  {
    id: 'contact',
    keys: ['contato', 'email', 'telefone', 'whatsapp', 'linkedin', 'github', 'rede', 'social'],
    answer: 'Você pode entrar em contato com o Luiz por:\n• Email: luizgferreira13@gmail.com\n• LinkedIn: linkedin.com/in/luiz-gabriel-ferreira-b2875125b\n• GitHub: github.com/LuizzFerreira\n• WhatsApp: (21) 99557-5988\n\nFique à vontade para entrar em contato! 🤝',
  },
  {
    id: 'recommendations',
    keys: ['recomend', 'referência', 'referencia', 'colega', 'opinião', 'opiniao', 'falam', 'dizem'],
    answer: 'Os colegas de trabalho do Luiz o descrevem como proativo, comunicativo, com rápido aprendizado e ótimo trabalho em equipe. Vinicius Franco disse que ele se tornou seu "braço direito nas demandas". Todos recomendam ele com confiança!\n\nQuer saber sobre os projetos dele? 💼',
    section: 'recomendacoes',
    suggest: 'projects',
  },
  {
    id: 'cv',
    keys: ['currículo', 'curriculo', 'cv', 'download', 'baixar'],
    answer: 'Você pode baixar o currículo do Luiz clicando no botão "Currículo" na seção inicial do site!\n\nPosso ajudar com mais alguma coisa? 📄',
    section: 'hero',
    suggest: 'menu',
  },
  {
    id: 'greeting',
    keys: ['oi', 'olá', 'ola', 'hey', 'eae', 'eai', 'bom dia', 'boa tarde', 'boa noite', 'hello', 'hi'],
    answer: 'Olá! 👋 Eu sou o assistente virtual do Luiz Gabriel. Posso te contar sobre a experiência, skills, formação, projetos e contato dele. O que você gostaria de saber?',
  },
  {
    id: 'thanks',
    keys: ['obrigado', 'valeu', 'thanks', 'brigado', 'agradeço'],
    answer: 'De nada! 😊 Se tiver mais alguma dúvida sobre o Luiz, é só perguntar!',
  },
  {
    id: 'frontend',
    keys: ['front', 'frontend', 'front-end'],
    answer: 'Luiz tem forte experiência em front-end! Trabalhou na MundiWare desenvolvendo portais de notícia com HTML, CSS e JavaScript. Atualmente no ONS, continua atuando com React, Tailwind CSS e outras tecnologias modernas.\n\nQuer saber sobre o trabalho atual dele no ONS? 🖥️',
    section: 'experiencia',
    suggest: 'ons',
  },
  {
    id: 'backend',
    keys: ['back', 'backend', 'back-end', 'node', 'servidor'],
    answer: 'Luiz possui conhecimentos em Node.js para desenvolvimento back-end. No ONS, também trabalha com C#, .NET e SQL Server, expandindo cada vez mais suas habilidades!\n\nQuer saber mais sobre as tecnologias que ele domina? ⚙️',
    section: 'experiencia',
    suggest: 'skills',
  },
  {
    id: 'exp_choice',
    keys: [],
    answer: 'Qual experiência você quer saber mais? 🤔\n\n🟢 ONS (atual)\n🔵 MundiWare (anterior)\n\nÉ só digitar!',
  },
  {
    id: 'praise',
    keys: ['bom', 'boa', 'competente', 'talentoso', 'craque', 'fera', 'mito', 'genio', 'gênio', 'manja', 'qualidade', 'confia', 'capaz', 'habilidoso'],
    answer: 'Com certeza! 💪 O Luiz é um profissional muito dedicado e competente. Não sou só eu que digo isso — os próprios colegas de trabalho confirmam! Vinicius Franco disse que ele se tornou seu "braço direito", e todos destacam seu rápido aprendizado, proatividade e trabalho em equipe.\n\nDá uma olhada nas recomendações pra ver com seus próprios olhos! 👀',
    section: 'recomendacoes',
    suggest: 'recommendations',
  },
  {
    id: 'criticism',
    keys: ['ruim', 'péssimo', 'pessimo', 'fraco', 'lixo', 'horrivel', 'horrível', 'não presta', 'nao presta', 'incompetente', 'burro', 'mal', 'pior', 'nada', 'nenhum', 'sem talento', 'mediano', 'mediocre', 'medíocre'],
    answer: 'Epa, discordo totalmente! 😄 O Luiz é um profissional extremamente dedicado e que está sempre evoluindo. Na MundiWare, começou como estagiário e foi efetivado em apenas 4 meses! Hoje atua no ONS com tecnologias de ponta.\n\nMas não precisa acreditar só em mim — veja o que os colegas de trabalho dizem sobre ele nas recomendações! 👇',
    section: 'recomendacoes',
    suggest: 'recommendations',
  },
]

const AFFIRMATIVE_WORDS = ['quero', 'sim', 'claro', 'pode', 'manda', 'fala', 'conta', 'bora', 'vamos', 'show', 'beleza', 'top', 'isso', 'ss', 'sss', 'ok', 'blz', 'dale', 'tmj', 'aham', 'uhum', 'yes', 'yeah', 'yep']

const fallback = 'Hmm, não tenho certeza sobre isso. 🤔 Tente perguntar sobre a idade, onde mora, experiência, skills, formação, projetos ou contato do Luiz!'

function normalize(str) {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()
}

function isAffirmative(input) {
  const n = normalize(input)
  if (n.length > 30) return false
  return AFFIRMATIVE_WORDS.some((k) => n === k || n === k + '!')
}

function findById(id) {
  return knowledge.find((k) => k.id === id)
}

function findByInput(input) {
  const lower = normalize(input)
  let bestMatch = null
  let bestScore = 0

  for (const item of knowledge) {
    let score = 0
    for (const key of item.keys) {
      if (lower.includes(normalize(key))) {
        score += key.length
      }
    }
    if (score > bestScore) {
      bestScore = score
      bestMatch = item
    }
  }

  return bestMatch
}

function scrollToSection(sectionId) {
  if (!sectionId) return
  const el = document.getElementById(sectionId)
  if (el) {
    setTimeout(() => {
      const offset = 80
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }, 300)
  }
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Olá! 👋 Sou o assistente do Luiz Gabriel. Pergunte qualquer coisa sobre ele!' },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [lastSuggest, setLastSuggest] = useState(null)
  const endRef = useRef(null)
  const inputRef = useRef(null)
  const chatRef = useRef(null)
  const btnRef = useRef(null)
  const { dark } = useTheme()

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (chatRef.current?.contains(e.target) || btnRef.current?.contains(e.target)) return
      setOpen(false)
    }
    document.addEventListener('pointerdown', handler)
    return () => document.removeEventListener('pointerdown', handler)
  }, [open])

  const getResponse = (text) => {
    if (isAffirmative(text)) {
      if (lastSuggest) {
        const suggested = findById(lastSuggest)
        if (suggested) {
          setLastSuggest(suggested.suggest || null)
          scrollToSection(suggested.section)
          return suggested.answer
        }
      }
      return MENU_RESPONSE
    }

    const match = findByInput(text)
    if (match) {
      setLastSuggest(match.suggest || null)
      scrollToSection(match.section)
      return match.answer
    }

    setLastSuggest(null)
    return fallback
  }

  const send = () => {
    const text = input.trim()
    if (!text) return

    setMessages((m) => [...m, { from: 'user', text }])
    setInput('')
    setTyping(true)

    setTimeout(() => {
      const response = getResponse(text)
      setMessages((m) => [...m, { from: 'bot', text: response }])
      setTyping(false)
    }, 600 + Math.random() * 800)
  }

  const bg = dark ? '#13131a' : '#ffffff'
  const cardBg = dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'
  const borderColor = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'
  const textColor = dark ? '#e2e8f0' : '#1a1a2e'
  const subColor = dark ? '#9ca3af' : '#6b7280'

  return (
    <>
      <motion.button
        ref={btnRef}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="fixed z-50 w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white cursor-pointer shadow-lg shadow-indigo-500/25"
        style={{ bottom: '2rem', left: '2rem' }}
      >
        {open ? <FaTimes size={20} /> : <img src={roboIcon} alt="Assistente" style={{ width: '32px', height: '32px' }} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            ref={chatRef}
            className="fixed z-50 rounded-2xl flex flex-col"
            style={{
              bottom: '5.5rem',
              left: '2rem',
              width: '340px',
              maxWidth: 'calc(100vw - 2rem)',
              height: '480px',
              maxHeight: 'calc(100vh - 8rem)',
              background: bg,
              border: `1px solid ${borderColor}`,
              boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
            }}
          >
            <div
              className="flex items-center gap-3 shrink-0"
              style={{
                padding: '1rem 1.25rem',
                borderBottom: `1px solid ${borderColor}`,
                background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(168,85,247,0.1))',
                borderRadius: '1rem 1rem 0 0',
              }}
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center overflow-hidden">
                <img src={roboIcon} alt="Assistente" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <p className="font-semibold text-sm" style={{ color: textColor }}>Assistente do Luiz</p>
                <p className="text-xs" style={{ color: subColor }}>Online • Pergunte sobre mim</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto" style={{ padding: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      alignSelf: msg.from === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '85%',
                    }}
                  >
                    <div
                      style={{
                        padding: '0.625rem 0.875rem',
                        borderRadius: msg.from === 'user' ? '1rem 1rem 0.25rem 1rem' : '1rem 1rem 1rem 0.25rem',
                        background: msg.from === 'user'
                          ? 'linear-gradient(135deg, #6366f1, #a855f7)'
                          : cardBg,
                        color: msg.from === 'user' ? '#fff' : textColor,
                        fontSize: '0.8125rem',
                        lineHeight: '1.5',
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}

                {typing && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ alignSelf: 'flex-start' }}>
                    <div style={{ padding: '0.625rem 1rem', borderRadius: '1rem 1rem 1rem 0.25rem', background: cardBg, color: subColor, fontSize: '0.8125rem', display: 'flex', gap: '0.25rem' }}>
                      <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }}>●</motion.span>
                      <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}>●</motion.span>
                      <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}>●</motion.span>
                    </div>
                  </motion.div>
                )}

                <div ref={endRef} />
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2" style={{ padding: '0.75rem 1rem', borderTop: `1px solid ${borderColor}` }}>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Pergunte sobre o Luiz..."
                style={{ flex: 1, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '9999px', padding: '0.5rem 1rem', fontSize: '0.8125rem', color: textColor, outline: 'none' }}
              />
              <button
                onClick={send}
                className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white shrink-0"
                style={{ border: 'none', cursor: 'pointer' }}
              >
                <FaPaperPlane size={13} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
