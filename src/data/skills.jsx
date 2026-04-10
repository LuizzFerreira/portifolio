import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaGitAlt, FaFigma, FaNodeJs, FaDatabase } from 'react-icons/fa'
import { SiTailwindcss, SiVite, SiDotnet } from 'react-icons/si'
import { TbChartBar } from 'react-icons/tb'

export const skills = [
  { name: 'HTML5', icon: <FaHtml5 />, level: 95, color: '#e34f26' },
  { name: 'CSS3', icon: <FaCss3Alt />, level: 90, color: '#1572b6' },
  { name: 'JavaScript', icon: <FaJsSquare />, level: 85, color: '#f7df1e' },
  { name: 'React', icon: <FaReact />, level: 80, color: '#61dafb' },
  { name: 'Node.js', icon: <FaNodeJs />, level: 70, color: '#339933' },
  { name: 'Tailwind CSS', icon: <SiTailwindcss />, level: 80, color: '#06b6d4' },
  { name: 'Git', icon: <FaGitAlt />, level: 75, color: '#f05032' },
  { name: 'Figma', icon: <FaFigma />, level: 70, color: '#f24e1e' },
  { name: 'Vite', icon: <SiVite />, level: 70, color: '#646cff' },
  { name: 'Power BI', icon: <TbChartBar />, level: 60, color: '#f2c811' },
  { name: 'C#', icon: <SiDotnet />, level: 40, color: '#512bd4' },
  { name: 'SQL Server', icon: <FaDatabase />, level: 40, color: '#cc2927' },
]
