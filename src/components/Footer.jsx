function Footer() {
  return (
    <footer className="footer">
      <a href="#home" className="logo">AALI</a>
      <p>Shopify design and development for fashion, beauty and lifestyle brands.</p>
      <nav className="footer-links">
        <a href="#work">Work</a>
        <a href="#services">Services</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
      <small>&copy; {new Date().getFullYear()} AALI. All rights reserved.</small>
    </footer>
  )
}

export default Footer