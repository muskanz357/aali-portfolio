import { useRef, useState } from "react"
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from "motion/react"

const ease = [0.22, 1, 0.36, 1]

const steps = [
  { title: "Discover", text: "Your brand, products and customers." },
  { title: "Design", text: "A clean store structure in your visual style." },
  { title: "Build", text: "The Shopify storefront, made to work everywhere." },
  { title: "Launch", text: "Tested, tuned and ready to sell." },
]

function HowIWork() {
  const listRef = useRef(null)
  const [reached, setReached] = useState(0)

  // 0 when the list reaches the 60% line of the screen, 1 when its end does
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 60%", "end 60%"],
  })

  // smooth the line so it glides instead of jumping
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.4,
  })

  // count how many steps the line has passed
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const count = steps.filter((_, i) => v >= (i + 0.5) / steps.length).length
    setReached(count)
  })

  return (
    <section className="band" id="process">
      <div className="container">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
        >
          <h2>How I Work</h2>
          <p>Four steps, from first call to launch.</p>
        </motion.div>

        <div className="process" ref={listRef}>
          <div className="process-track" aria-hidden="true">
            <motion.div className="process-fill" style={{ scaleY }} />
          </div>

          <ol className="process-steps">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className={`process-row ${i < reached ? "on" : ""}`}
              >
                <span className="process-dot">{i + 1}</span>
                <div className="process-body">
                  <h3 className="process-title">{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default HowIWork