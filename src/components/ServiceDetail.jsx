import { useEffect, useRef } from "react"
import { motion } from "motion/react"
import { services } from "../data/services"

const ease = [0.22, 1, 0.36, 1]

function ServiceDetail({ service, onClose, onSelect }) {
  const scroller = useRef(null)
  const index = services.findIndex((s) => s.id === service.id)
  const next = services[(index + 1) % services.length]

  // Esc closes, and the page behind stops scrolling
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = previous
    }
  }, [onClose])

  // jump back to the top when switching to the next service
  useEffect(() => {
    scroller.current?.scrollTo(0, 0)
  }, [service.id])

  // close the page, then scroll to the contact form
  function startProject() {
    onClose()
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
    }, 800)
  }

  return (
    <motion.div
      className="case"
      ref={scroller}
      style={{
        background: `linear-gradient(170deg, ${service.colors[0]} 0%, #1A0B0D 55%, #0D0405 100%)`,
      }}
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.7, ease }}
    >
      <div className="case-inner">
        <div className="case-top">
          <span className="logo">AALI</span>
          <button className="btn btn-ghost btn-small" onClick={onClose}>
            Close
          </button>
        </div>

        <motion.div
          key={service.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease }}
        >
          <h2 className="svc-title">{service.title}</h2>
          <p className="svc-intro">{service.intro}</p>

          <div className="svc-groups">
            {service.groups.map((group, g) => (
              <motion.div
                className="svc-group"
                key={group.heading}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: g * 0.06, ease }}
              >
                <h3>{group.heading}</h3>
                <ul className="svc-list">
                  {group.items.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.06, ease }}
                    >
                      <span className="svc-item">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="svc-cta">
            <p>Want this for your brand?</p>
            <button className="btn" onClick={startProject}>
              Start a project
            </button>
          </div>

          <button className="case-next" onClick={() => onSelect(next)}>
            <span>Next service</span>
            <strong>{next.title}</strong>
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ServiceDetail