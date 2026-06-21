import Hero from './components/HeroB'
import About from './components/About'
import Events from './components/Events'
import Achievements from './components/Achievements'
import Footer from './components/Footer'
import FloatingThemeToggle from './components/FloatingThemeToggle'
import { useTheme } from './hooks/useTheme'
import './index.css'

export default function App() {
  const { isDark, toggle } = useTheme()

  return (
    <>
      <main className="bg-[var(--bg-base)] text-[var(--text-primary)] min-h-screen">
        <Hero />
        <About />
        <Events />
        <Achievements />
        <Footer />
      </main>
      <FloatingThemeToggle isDark={isDark} onToggle={toggle} />
    </>
  )
}
