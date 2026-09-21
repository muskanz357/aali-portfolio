import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"

const ease = [0.22, 1, 0.36, 1]

const testimonials = [
  {
    quote: "[Replace with a real client quote about the result or the experience.]",
    name: "[Client name]",
    brand: "[Brand name]",
  },
  {
    quote: "[Replace with a second real client quote.]",
    name: "[Client name]",
    brand: "[Brand name]",
  },
]

const variants = {
  enter: (d) => ({ opacity: 0, x: d * 60 }),
  center: { opacity: 1, x: 0 },
  exit: (d) => ({ opacity: 0, x: d * -60 }),
}

function Testimonials() {
  const [[index, dir], setPage] = useState([0, 1])
  const total = testimonials.length
  const t = testimonials[index]

  function go(step) {
    setPage([(index + step + total) % total, step])
  }

  return (
    <section className="container">
      <motion.div
        className="section-head"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease }}
      >
        <h2>What Clients Say</h2>
      </motion.div>

      <div className="slider">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.blockquote
            className="slide"
            key={index}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, info) => {
              if (info.offset.x < -60) go(1)
              else if (info.offset.x > 60) go(-1)
            }}
          >
            <span className="slide-mark" aria-hidden="true">“</span>
            <p className="slide-quote">{t.quote}</p>
            <footer>
              <span className="quote-name">{t.name}</span>
              <span className="quote-brand">{t.brand}</span>
            </footer>
          </motion.blockquote>
        </AnimatePresence>

        <div className="slider-bar" aria-hidden="true">
          <span style={{ width: `${((index + 1) / total) * 100}%` }} />
        </div>

        <div className="slider-controls">
          <button className="slider-btn" onClick={() => go(-1)} aria-label="Previous testimonial">←</button>
          <button className="slider-btn" onClick={() => go(1)} aria-label="Next testimonial">→</button>
          <span className="slider-count">0{index + 1} / 0{total}</span>
        </div>
      </div>
    </section>
  )
}

export default Testimonials