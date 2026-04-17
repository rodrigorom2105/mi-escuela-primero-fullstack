import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/navbar.css'
import logo from '../assets/logoMPJ.png'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setMenuOpen(false)
  const isActive = (path) => location.pathname === path

  return (
    <nav className={`app-nav${scrolled ? ' nav-scrolled' : ''}`} aria-label="Navegación principal">
      <div className="nav-container">

        <Link className="nav-logo" to="/" onClick={close} aria-label="Mi Escuela Primero — Inicio">
          <img src={logo} alt="" aria-hidden="true" />
          <span className="nav-brand-name">+Educación</span>
        </Link>

        <button
          className="nav-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          <i className={`bi ${menuOpen ? 'bi-x-lg' : 'bi-list'}`} aria-hidden="true" />
        </button>

        <ul id="nav-menu" className={`nav-links${menuOpen ? ' nav-open' : ''}`}>
          <li>
            <Link to="/" onClick={close} className={`nav-link-item${isActive('/') ? ' active' : ''}`}>
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/catalogo" onClick={close} className={`nav-link-item${isActive('/catalogo') ? ' active' : ''}`}>
              Catálogo
            </Link>
          </li>
          <li className="nav-cta-item">
            <Link to="/donar" onClick={close} className="btn-dona">
              <i className="bi bi-heart-fill me-1" aria-hidden="true" />
              Dona ahora
            </Link>
          </li>
        </ul>

      </div>
    </nav>
  )
}

export default Navbar
