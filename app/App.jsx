import Nav from './components/Nav'
import Hero from './components/Hero'
import SignalBand from './components/SignalBand'
import About from './components/About'
import Divisions from './components/Divisions'
import Members from './components/Members'
import Gallery from './components/Gallery'
import Achievements from './components/Achievements'
import Events from './components/Events'
import Footer from './components/Footer'
import FloatingThemeToggle from './components/FloatingThemeToggle'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { isDark, toggle } = useTheme()

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
        <Hero />
        <SignalBand />
        <About />
        <Divisions />
        <Members />
        <Gallery />
        <Achievements />
        <Events />
        <Footer />
      </main>
      <FloatingThemeToggle isDark={isDark} onToggle={toggle} />
    </>
  )
}
