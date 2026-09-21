import { useRef, useState } from "react"
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useInView,
} from "motion/react"
import { projects } from "../data/projects"
import CaseStudy from "./CaseStudy"

const ease = [0.22, 1, 0.36, 1]

function WorkRow({ project, index, hovered, setHovered, onOpen }) {
  const ref = useRef(null)
  // true while this row is inside a thin band across the middle of the screen
  const centered = useInView(ref, { margin: "-42% 0px -42% 0px" })

  const gradient = `linear-gradient(145deg, ${project.colors[0]}, ${project.colors[1]})`

  return (
    <motion.li
      ref={ref}
      className={centered ? "is-centered" : ""}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.08, ease }}
    >
      <button
        className={`work-row ${hovered && hovered !== project.id ? "dim" : ""}`}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") setHovered(project.id)
        }}
        onFocus={() => setHovered(project.id)}
        onBlur={() => setHovered(null)}
        onClick={() => onOpen(project)}
      >
        <span className="work-index">0{index + 1}</span>
        <span className="work-name">{project.name}</span>
        <span className="work-meta">{project.tags.join(", ")}</span>
        <span className="work-year">{project.year}</span>
      </button>

      {/* touch screens only: preview under the name */}
      <motion.button
        className="work-inline"
        style={{ background: gradient }}
        animate={{ scale: centered ? 1 : 0.94, opacity: centered ? 1 : 0.5 }}
        transition={{ duration: 0.5, ease }}
        onClick={() => onOpen(project)}
        aria-label={`Open ${project.name} case study`}
      >
        {project.image ? (
          <img src={project.image} alt="" />
        ) : (
          <span>{project.name}</span>
        )}
        <em>Tap to view</em>
      </motion.button>
    </motion.li>
  )
}

function SelectedWork() {
  const [hovered, setHovered] = useState(null)
  const [open, setOpen] = useState(null)

  // cursor position, smoothed with a spring so the preview glides
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 22 })
  const sy = useSpring(y, { stiffness: 180, damping: 22 })

  function handleMove(e) {
    x.set(e.clientX)
    y.set(e.clientY)
  }

  const active = projects.find((p) => p.id === hovered)

  return (
    <section className="container" id="work">
      <motion.div
        className="section-head"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease }}
      >
        <h2>Selected Work</h2>
        <p>
          <span className="only-hover">
            Hover a project to preview it. Click to open the case study.
          </span>
          <span className="only-touch">
            Scroll through the projects. Tap one to open the case study.
          </span>
        </p>
      </motion.div>

      <ul
        className="work-list"
        onMouseMove={handleMove}
        onMouseLeave={() => setHovered(null)}
      >
        {projects.map((p, i) => (
          <WorkRow
            key={p.id}
            project={p}
            index={i}
            hovered={hovered}
            setHovered={setHovered}
            onOpen={setOpen}
          />
        ))}
      </ul>

      {/* desktop: preview that follows the cursor */}
      <motion.div className="work-preview" style={{ x: sx, y: sy }}>
        <AnimatePresence>
          {active && (
            <motion.div
              key={active.id}
              className="work-preview-inner"
              style={{
                background: `linear-gradient(145deg, ${active.colors[0]}, ${active.colors[1]})`,
              }}
              initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.35, ease }}
            >
              {active.image ? (
                <img src={active.image} alt="" />
              ) : (
                <span>{active.name}</span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {open && (
          <CaseStudy
            key="case-study"
            project={open}
            onClose={() => setOpen(null)}
            onSelect={setOpen}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default SelectedWork