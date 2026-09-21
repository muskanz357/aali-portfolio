import { useEffect, useState } from "react"
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
} from "motion/react"
import Splash from "./components/Splash"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import SelectedWork from "./components/SelectedWork"
import HowIWork from "./components/HowIWork"
import Services from "./components/Services"
import WhyWorkWithMe from "./components/WhyWorkWithMe"
import About from "./components/About"
import Testimonials from "./components/Testimonials"
import FAQ from "./components/FAQ"
import CTA from "./components/CTA"
import Contact from "./components/Contact"
import Footer from "./components/Footer"

function App() {
  const [splash, setSplash] = useState(true)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  // after 1.5s the splash starts fading out (0.5s), so it lasts 2s in total
  useEffect(() => {
    const timer = setTimeout(() => setSplash(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence>{splash && <Splash key="splash" />}</AnimatePresence>

      <motion.div className="progress" style={{ scaleX }} />
      <Navbar />
      {/* the key makes the hero replay its intro when the splash fades */}
      <Hero key={splash ? "waiting" : "playing"} />
      <SelectedWork />
      <HowIWork />
      <Services />
      <WhyWorkWithMe />
      <About />
      <Testimonials />
      <FAQ />
      <CTA />
      <Contact />
      <Footer />
    </>
  )
}

export default App