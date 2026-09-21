import { useRef } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"

const ease = [0.22, 1, 0.36, 1]

const lines = ["Ready to build a store", "your customers remember?"]

// wraps a button so it is pulled toward the cursor
function Magnetic({ children }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 14 })
  const sy = useSpring(y, { stiffness: 200, damping: 14 })

  function move(e) {
    const box = ref.current.getBoundingClientRect()
    x.set((e.clientX - (box.left + box.width / 2)) * 0.35)
    y.set((e.clientY - (box.top + box.height / 2)) * 0.35)
  }

  function leave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className="magnetic"
      style={{ x: sx, y: sy }}
      onMouseMove={move}
      onMouseLeave={leave}
    >
      {children}
    </motion.div>
  )
}

function CTA() {
  return (
    <section className="container cta-wrap">
      <div className="cta">
        <h2 aria-label={lines.join(" ")}>
          {lines.map((line, i) => (
            <span className="mask" key={line} aria-hidden="true">
              <motion.span
                className="mask-inner"
                initial={{ y: "110%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.9, delay: i * 0.12, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Tell me about your brand and what you're looking to build.
        </motion.p>

        <div className="actions">
          <Magnetic>
            <a className="btn" href="#contact">Start a project</a>
          </Magnetic>
          <Magnetic>
            <a className="btn btn-ghost" href="#contact">Get a free store audit</a>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}

export default CTA