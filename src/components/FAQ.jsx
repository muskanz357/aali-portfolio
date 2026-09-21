import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"

const ease = [0.22, 1, 0.36, 1]

const faqs = [
  {
    question: "Do you work with international clients?",
    answer: "Yes. I work with brands worldwide, and we communicate online.",
  },
  {
    question: "Do you provide Shopify setup?",
    answer: "Yes. I can set up a new store, including theme, products, collections and navigation.",
  },
  {
    question: "Do you redesign existing Shopify stores?",
    answer: "Yes. I can refresh the design, improve the layout and make the store easier to use on mobile.",
  },
  {
    question: "How long does a Shopify project take?",
    answer: "Most projects take two to four weeks, depending on the size of the store and the features needed.",
  },
  {
    question: "Do you provide support after launch?",
    answer: "Yes. I provide updates and improvements after the store goes live.",
  },
]

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className="band" id="faq">
      <div className="container">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
        >
          <h2>Frequently Asked Questions</h2>
        </motion.div>

        <div className="faq-list">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index

            return (
              <motion.div
                className="faq-item"
                key={item.question}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: index * 0.06, ease }}
              >
                <button
                  className="faq-question"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  {item.question}
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease }}
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      style={{ overflow: "hidden" }}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease }}
                    >
                      <p className="faq-answer">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQ