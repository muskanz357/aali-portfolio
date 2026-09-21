import { motion } from "motion/react"

const ease = [0.22, 1, 0.36, 1]

const reasons = [
  {
    title: "Brand-first design",
    text: "Your store should feel like your brand, not a template.",
  },
  {
    title: "Mobile-first experience",
    text: "Most shoppers browse on phones, so I design there first.",
  },
  {
    title: "Clean, intentional layouts",
    text: "Every section has a purpose.",
  },
  {
    title: "Clear communication",
    text: "You always know what is being designed and built.",
  },
]

function WhyWorkWithMe() {
  return (
    <section className="band">
      <div className="container">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
        >
          <h2>Why Brands Work With Me</h2>
        </motion.div>

        <ul className="why-list">
          {reasons.map((r, i) => (
            <motion.li
              className="why-row"
              key={r.title}
              tabIndex={0}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease }}
            >
              <span className="why-num">0{i + 1}</span>
              <div className="why-body">
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default WhyWorkWithMe