import { useEffect, useRef } from "react"

// These must match the stops of the body gradient in index.css
const stops = [
  [0, "#5A1A22"],
  [0.12, "#3A1016"],
  [0.3, "#1A0B0D"],
  [0.5, "#0D0405"],
  [0.68, "#1A0709"],
  [0.86, "#3A1016"],
  [1, "#5A1A22"],
]

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

// Blend between the two gradient stops around position p (0 to 1)
function colorAt(p) {
  const t = Math.min(1, Math.max(0, p))

  for (let i = 0; i < stops.length - 1; i++) {
    const [p1, c1] = stops[i]
    const [p2, c2] = stops[i + 1]

    if (t <= p2) {
      const k = (t - p1) / (p2 - p1)
      const a = hexToRgb(c1)
      const b = hexToRgb(c2)
      const rgb = a.map((v, j) => Math.round(v + (b[j] - v) * k))
      return `rgba(${rgb.join(",")}, 0.94)`
    }
  }

  return "rgba(90, 26, 34, 0.94)"
}

function Navbar() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current

    function update() {
      const pageHeight = document.documentElement.scrollHeight
      const position = (window.scrollY + el.offsetHeight / 2) / pageHeight
      el.style.backgroundColor = colorAt(position)
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)

    // page height changes (for example when an FAQ opens), so recolor then too
    const observer = new ResizeObserver(update)
    observer.observe(document.body)

    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
      observer.disconnect()
    }
  }, [])

  return (
    <header className="navbar" ref={ref}>
      <div className="navbar-inner">
        <a href="#home" className="logo">AALI</a>
        <nav className="nav-links">
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <a href="#contact" className="btn btn-small">Start a project</a>
      </div>
    </header>
  )
}

export default Navbar