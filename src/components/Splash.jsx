import { useEffect } from "react"
import { motion } from "motion/react"

const ease = [0.22, 1, 0.36, 1]
const letters = ["A", "A", "L", "I"]

function Splash() {
  // page can't scroll while the splash is showing
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  return (
    <motion.div
      className="splash"
      aria-hidden="true"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
    >
      <div className="splash-word">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 + i * 0.25, ease }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

export default Splash