import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"

const ease = [0.22, 1, 0.36, 1]

// When you have a photo, put it in the public folder and set it here,
// for example "/ali.jpg". Leave null to show the placeholder.
const PHOTO = null

const statement =
  "AALI is Ali's design and development studio. I build interactive websites, from Shopify stores to other web projects, with an eye for clean layouts and smooth, thoughtful motion. I pair a designer's eye with practical development skills, so what I build looks good and works well."

const words = statement.split(" ")

// one word that brightens as the scroll passes it
function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return <motion.span style={{ opacity }}>{children} </motion.span>
}

function About() {
  const photoRef = useRef(null)
  const textRef = useRef(null)

  // parallax: photo moves slower than the page, tag moves the other way
  const photoScroll = useScroll({
    target: photoRef,
    offset: ["start end", "end start"],
  })
  const imgY = useTransform(photoScroll.scrollYProgress, [0, 1], ["-8%", "8%"])
  const tagY = useTransform(photoScroll.scrollYProgress, [0, 1], [50, -50])

  // word-by-word reveal tied to scrolling through the paragraph
  const textScroll = useScroll({
    target: textRef,
    offset: ["start 85%", "end 55%"],
  })

  return (
    <section className="container" id="about">
      <div className="about">
        <div className="about-photo" ref={photoRef}>
          <motion.div className="about-photo-inner" style={{ y: imgY }}>
            {PHOTO ? (
              <img src={PHOTO} alt="Ali" />
            ) : (
              <span>A</span>
            )}
          </motion.div>

          <motion.div className="about-tag" style={{ y: tagY }}>
            Based in Pakistan
          </motion.div>
        </div>

        <div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
          >
            The person behind AALI.
          </motion.h2>

          <p className="about-statement" ref={textRef}>
            {words.map((word, i) => {
              const start = (i / words.length) * 0.85
              const end = start + 0.15
              return (
                <Word
                  key={i}
                  progress={textScroll.scrollYProgress}
                  range={[start, end]}
                >
                  {word}
                </Word>
              )
            })}
          </p>

          <motion.p
            className="about-meta"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Working with brands worldwide.
          </motion.p>
        </div>
      </div>
    </section>
  )
}

export default About