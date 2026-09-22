import { motion } from "motion/react"

const ease = [0.22, 1, 0.36, 1]

const lines = [
  "Shopify stores",
  "designed for modern",
  "fashion and lifestyle",
  "brands.",
]

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-inner">
        <div className="hero-text">
          <motion.p
            className="hero-label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Shopify design and development
          </motion.p>

          <h1 aria-label="Shopify stores designed for modern fashion and lifestyle brands.">
            {lines.map((line, i) => (
              <span className="line" key={line} aria-hidden="true">
                <motion.span
                  className="line-inner"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="hero-lead"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease }}
          >
            I design and build clean, conversion-focused Shopify stores that
            help growing brands create a professional online shopping
            experience.
          </motion.p>

          <motion.div
            className="actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease }}
          >
            <a className="btn" href="#work">View my work</a>
            <a className="btn btn-ghost" href="#contact">Let's work together</a>
          </motion.div>
        </div>

                <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease }}
          onMouseMove={(e) => {
            const box = e.currentTarget.getBoundingClientRect()
            const px = (e.clientX - box.left) / box.width - 0.5
            const py = (e.clientY - box.top) / box.height - 0.5
            e.currentTarget.style.setProperty("--px", px.toFixed(3))
            e.currentTarget.style.setProperty("--py", py.toFixed(3))
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.setProperty("--px", 0)
            e.currentTarget.style.setProperty("--py", 0)
          }}
        >
          <div className="mock-store">
            <div className="mock-topbar">
              <span className="mock-dot" />
              <span className="mock-dot" />
              <span className="mock-dot" />
            </div>

            <div className="mock-nav">
              <span className="mock-logo">TERZI</span>
              <span className="mock-links">
                <em />
                <em />
                <em />
              </span>
              <span className="mock-cart" />
            </div>

            <div className="mock-banner">
              <span className="mock-banner-title" />
              <span className="mock-banner-sub" />
            </div>

            <div className="mock-grid">
              <div className="mock-card">
                <div className="mock-card-img" />
                <span className="mock-card-name" />
                <span className="mock-card-price" />
              </div>
              <div className="mock-card">
                <div className="mock-card-img mock-card-img-alt" />
                <span className="mock-card-name" />
                <span className="mock-card-price" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero