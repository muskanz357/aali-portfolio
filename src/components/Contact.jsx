import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"

// Paste your Formspree link here
const FORM_URL = "https://formspree.io/f/YOUR_FORM_ID"

// Shown on the page. Change to your real email.
const EMAIL = "hello@yourdomain.com"

const ease = [0.22, 1, 0.36, 1]

const emptyForm = {
  name: "",
  email: "",
  brand: "",
  help: "",
  budget: "",
  message: "",
}

function Contact() {
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState("idle") // idle, sending, sent, error

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus("sending")

    try {
      const res = await fetch(FORM_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus("sent")
        setForm(emptyForm)
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section className="container" id="contact">
      <div className="contact">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
        >
          <h2>Let's work together.</h2>
          <p className="contact-lead">
            Share a few details and I'll reply with next steps.
          </p>

          <ul className="contact-list">
            <li>Instagram: @yourusername</li>
            <li>LinkedIn: /yourusername</li>
            <li>Email: {EMAIL}</li>
          </ul>
        </motion.div>

        <AnimatePresence mode="wait">
          {status === "sent" ? (
            <motion.div
              className="contact-form contact-done"
              key="done"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease }}
            >
              <svg className="done-check" viewBox="0 0 52 52" aria-hidden="true">
                <motion.circle
                  cx="26"
                  cy="26"
                  r="23"
                  fill="none"
                  stroke="#E8B4A0"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7, ease }}
                />
                <motion.path
                  d="M15 27 L23 35 L37 19"
                  fill="none"
                  stroke="#E8B4A0"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.55, ease }}
                />
              </svg>
              <h3>Message sent</h3>
              <p>Thank you. I'll reply soon with next steps.</p>
              <button
                className="btn btn-ghost"
                type="button"
                onClick={() => setStatus("idle")}
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <motion.form
              className="contact-form"
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease }}
            >
              <div className="field float">
                <input id="name" name="name" placeholder=" " value={form.name} onChange={handleChange} required />
                <label htmlFor="name">Name</label>
              </div>

              <div className="field float">
                <input id="email" name="email" type="email" placeholder=" " value={form.email} onChange={handleChange} required />
                <label htmlFor="email">Email</label>
              </div>

              <div className="field float">
                <input id="brand" name="brand" placeholder=" " value={form.brand} onChange={handleChange} />
                <label htmlFor="brand">Brand / business</label>
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="help">What do you need help with?</label>
                  <select id="help" name="help" value={form.help} onChange={handleChange}>
                    <option value="">Select an option</option>
                    <option>Shopify store design</option>
                    <option>Store setup</option>
                    <option>Social media marketing</option>
                    <option>Not sure yet</option>
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="budget">Budget (approx.)</label>
                  <select id="budget" name="budget" value={form.budget} onChange={handleChange}>
                    <option value="">Select a range</option>
                    <option>Under $500</option>
                    <option>$500 to $1,000</option>
                    <option>$1,000 to $3,000</option>
                    <option>$3,000+</option>
                  </select>
                </div>
              </div>

              <div className="field float">
                <textarea id="message" name="message" rows="4" placeholder=" " value={form.message} onChange={handleChange} />
                <label htmlFor="message">Message</label>
              </div>

              <button className="btn" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending..." : "Send inquiry"}
              </button>

              {status === "error" && (
                <p className="form-status bad" role="alert">
                  Something went wrong. Please try again, or email me at {EMAIL}.
                </p>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Contact