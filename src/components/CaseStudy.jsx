import { useEffect, useRef } from "react"
import { motion } from "motion/react"
import { projects } from "../data/projects"

const ease = [0.22, 1, 0.36, 1]

function CaseStudy({ project, onClose, onSelect }) {
  const scroller = useRef(null)
  const index = projects.findIndex((p) => p.id === project.id)
  const next = projects[(index + 1) % projects.length]

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

  // jump back to the top when switching to the next project
  useEffect(() => {
    scroller.current?.scrollTo(0, 0)
  }, [project.id])

  const gradient = `linear-gradient(145deg, ${project.colors[0]}, ${project.colors[1]})`

  return (
    <motion.div
      className="case"
      ref={scroller}
      style={{
        background: `linear-gradient(170deg, ${project.colors[0]} 0%, #1A0B0D 55%, #0D0405 100%)`,
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
          key={project.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease }}
        >
          <h2 className="case-title">{project.name}</h2>

          <dl className="case-meta">
            <div>
              <dt>Platform</dt>
              <dd>{project.platform}</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
          </dl>

          <motion.div
            className="case-visual"
            style={{ background: gradient }}
            initial={{ scale: 0.94, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
          >
            {project.image ? (
              <img src={project.image} alt={`${project.name} store`} />
            ) : (
              <span>{project.name}</span>
            )}
          </motion.div>

          <div className="case-cols">
            <div>
              <h3>Overview</h3>
              <p>{project.summary}</p>
            </div>

            <div>
              <h3>What I did</h3>
              <ul className="case-list">
                {project.did.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          <motion.div
            className="case-result"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            <h3>Result</h3>
            <p>{project.result}</p>
          </motion.div>

          <button className="case-next" onClick={() => onSelect(next)}>
            <span>Next project</span>
            <strong>{next.name}</strong>
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default CaseStudy