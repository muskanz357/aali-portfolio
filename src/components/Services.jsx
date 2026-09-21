import { Fragment, useRef, useState } from "react"
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionTemplate,
  useInView,
} from "motion/react"
import { services } from "../data/services"
import ServiceDetail from "./ServiceDetail"

const ease = [0.22, 1, 0.36, 1]

// moves the spotlight to where the cursor is inside the block
function spotlight(e) {
  const box = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty("--mx", `${e.clientX - box.left}px`)
  e.currentTarget.style.setProperty("--my", `${e.clientY - box.top}px`)
}

// dotted line that draws itself as you scroll past it
function Connector({ from }) {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 60%"],
  })

  const hidden = useTransform(scrollYProgress, [0, 1], [100, 0])
  const clipPath = useMotionTemplate`inset(-6px -6px ${hidden}% -6px)`

  const d =
    from === "left"
      ? "M 33 0 C 33 40, 67 20, 67 60"
      : "M 67 0 C 67 40, 33 20, 33 60"

  return (
    <div className="snake-link" aria-hidden="true" ref={ref}>
      <motion.svg
        viewBox="0 0 100 60"
        preserveAspectRatio="none"
        style={{ clipPath }}
      >
        <path
          d={d}
          fill="none"
          stroke="#C98F86"
          strokeWidth="2"
          strokeDasharray="2 9"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </motion.svg>
    </div>
  )
}

function SnakeItem({ service, index, onOpen }) {
  const { side, grad, title, text } = service
  const cardRef = useRef(null)
  // true while this block is in the middle band of the screen (used on phones)
  const centered = useInView(cardRef, { margin: "-40% 0px -40% 0px" })

  function openWithKey(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      onOpen(service)
    }
  }

  return (
    <motion.div
      className={`snake-item snake-${side}`}
      initial={{ opacity: 0, x: side === "left" ? -90 : 90 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease }}
    >
      <article
        ref={cardRef}
        className={`snake-card ${grad} ${centered ? "is-centered" : ""}`}
        role="button"
        tabIndex={0}
        onMouseMove={spotlight}
        onClick={() => onOpen(service)}
        onKeyDown={openWithKey}
      >
        <span className="snake-num">{index + 1}</span>
        <h3>{title}</h3>
        <p>{text}</p>
        <span className="snake-hint">View details</span>
      </article>
    </motion.div>
  )
}

function Services() {
  const [open, setOpen] = useState(null)

  return (
    <section className="container" id="services">
      <motion.div
        className="section-head"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease }}
      >
        <h2>What I Can Help With</h2>
      </motion.div>

      <div className="snake">
        {services.map((s, i) => (
          <Fragment key={s.id}>
            <SnakeItem service={s} index={i} onOpen={setOpen} />
            {i < services.length - 1 && <Connector from={s.side} />}
          </Fragment>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <ServiceDetail
            key="service-detail"
            service={open}
            onClose={() => setOpen(null)}
            onSelect={setOpen}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default Services