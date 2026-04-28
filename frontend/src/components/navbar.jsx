import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/navbar.css'
import logo from '../assets/logoMPJ.png'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [donaOpen, setDonaOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const donaRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onDocClick = (e) => {
      if (donaRef.current && !donaRef.current.contains(e.target)) setDonaOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  const close = () => { setMenuOpen(false); setDonaOpen(false) }
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
          <li className="nav-cta-item nav-dona-wrapper" ref={donaRef}>
            <button
              type="button"
              className="btn-dona"
              onClick={() => setDonaOpen(o => !o)}
              aria-expanded={donaOpen}
              aria-haspopup="true"
            >
              <i className="bi bi-heart-fill me-1" aria-hidden="true" />
              Dona ahora
              <i className={`bi bi-chevron-down nav-dona-caret${donaOpen ? ' open' : ''}`} aria-hidden="true" />
            </button>
            <ul className={`nav-dona-menu${donaOpen ? ' open' : ''}`}>
              <li>
                <Link to="/donar" onClick={close}>
                  <i className="bi bi-box-seam me-2" aria-hidden="true" />
                  Donación material
                </Link>
              </li>
              <li>
                <Link to="/donar/economica" onClick={close}>
                  <i className="bi bi-cash-coin me-2" aria-hidden="true" />
                  Donación económica
                </Link>
              </li>
            </ul>
          </li>
        </ul>

      </div>
    </nav>
  )
}

export default Navbar
