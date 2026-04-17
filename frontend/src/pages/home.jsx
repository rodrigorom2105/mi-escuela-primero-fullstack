import Footer from '../components/footer'
import Navbar from '../components/navbar'
import '../styles/home.css'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const STEPS = [
  {
    icon: 'bi-building',
    title: 'Escuelas publican',
    desc: 'Las escuelas registran sus necesidades específicas con evidencia fotográfica y documentación.',
  },
  {
    icon: 'bi-search',
    title: 'Donantes exploran',
    desc: 'Navegas los proyectos activos, filtras por zona o tipo de necesidad y encuentras una causa.',
  },
  {
    icon: 'bi-heart-fill',
    title: 'Se dona directamente',
    desc: 'Tu donación va directamente al proyecto. Cada peso tiene un destino claro y rastreable.',
  },
  {
    icon: 'bi-graph-up',
    title: 'Se reporta el impacto',
    desc: 'Recibes actualizaciones con fotos y métricas reales del cambio generado en la escuela.',
  },
]

const VALUES = [
  { icon: 'bi-eye', title: 'Transparencia', desc: 'Cada peso rastreable y reportado' },
  { icon: 'bi-patch-check-fill', title: 'Validación', desc: 'Necesidades verificadas por nuestro equipo' },
  { icon: 'bi-geo-alt-fill', title: 'Impacto local', desc: '100% enfocado en Jalisco' },
  { icon: 'bi-people-fill', title: 'Comunidad', desc: 'Ciudadanos cambiando su entorno' },
]

function Home() {
  useEffect(() => {
    function animateCounter(id, target, duration = 1800) {
      const el = document.getElementById(id)
      if (!el) return
      let start = 0
      const step = target / (duration / 16)
      const timer = setInterval(() => {
        start += step
        if (start >= target) {
          start = target
          clearInterval(timer)
        }
        el.textContent = Math.floor(start).toLocaleString('es-MX')
      }, 16)
    }

    const statsBar = document.querySelector('.stats-bar')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter('cnt-escuelas', 16)
          animateCounter('cnt-estudiantes', 2770)
          animateCounter('cnt-municipios', 4)
          animateCounter('cnt-aliados', 32)
          animateCounter('cnt-personal', 115)
          animateCounter('cnt-planteles', 12)
          observer.disconnect()
        }
      })
    }, { threshold: 0.3 })

    if (statsBar) observer.observe(statsBar)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar />

      {/* ── Hero + Stats fill the first viewport ── */}
      <div className="hero-viewport">

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-info">
            <span className="hero-eyebrow">
              <i className="bi bi-shield-check me-2" aria-hidden="true" />
              Mexicanos Primero Jalisco
            </span>
            <h1 className="hero-title">
              <span className="highlight">Mi</span> Escuela Primero
            </h1>
            <p className="hero-subtitle">
              Transformamos la educación en Jalisco desde 2022. Conectamos escuelas
              con necesidades reales con personas que quieren hacer la diferencia.
            </p>
            <div className="hero-ctas">
              <Link to="/catalogo" className="btn-hero-primary">
                <i className="bi bi-grid me-2" aria-hidden="true" />
                Explorar escuelas
              </Link>
              <a href="https://www.mexicanosprimerojalisco.org/quienes-somos" className="btn-hero-secondary">
                Conócenos
              </a>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="hero-card">
              <div className="hc-header">
                <i className="bi bi-patch-check-fill hc-check" />
                <span>Verificado por MPJ</span>
              </div>
              <div className="hc-stats">
                <div className="hc-stat">
                  <span className="hc-num">16</span>
                  <span className="hc-lbl">Escuelas</span>
                </div>
                <div className="hc-divider" />
                <div className="hc-stat">
                  <span className="hc-num">2,770</span>
                  <span className="hc-lbl">Estudiantes</span>
                </div>
                <div className="hc-divider" />
                <div className="hc-stat">
                  <span className="hc-num">4</span>
                  <span className="hc-lbl">Municipios</span>
                </div>
              </div>
              <div className="hc-footer">
                <i className="bi bi-geo-alt-fill me-1" />
                Jalisco, México · Ciclo 2025–2026
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="stats-bar" aria-label="Estadísticas del programa">
        <div className="stats-inner">
          <div className="stat-item stat-cycle-item">
            <span className="stat-cycle">Ciclo Escolar</span>
            <span className="stat-year">2025–2026</span>
          </div>
          <div className="stat-item">
            <span className="stat-num" id="cnt-escuelas">16</span>
            <span className="stat-label">ESCUELAS</span>
          </div>
          <div className="stat-item">
            <span className="stat-num" id="cnt-estudiantes">2,770</span>
            <span className="stat-label">ESTUDIANTES</span>
          </div>
          <div className="stat-item">
            <span className="stat-num" id="cnt-municipios">4</span>
            <span className="stat-label">MUNICIPIOS</span>
          </div>
          <div className="stat-item">
            <span className="stat-num" id="cnt-aliados">32</span>
            <span className="stat-label">ALIADOS Y VOLUNTARIADOS</span>
          </div>
          <div className="stat-item">
            <span className="stat-num" id="cnt-personal">115</span>
            <span className="stat-label">PERSONAL ESCOLAR</span>
          </div>
          <div className="stat-item">
            <span className="stat-num" id="cnt-planteles">12</span>
            <span className="stat-label">PLANTELES</span>
          </div>
        </div>
      </section>

      </div>{/* end .hero-viewport */}

      {/* ── Cómo funciona ── */}
      <section className="como-funciona">
        <p className="section-label">El proceso</p>
        <h2 className="section-title">¿Cómo funciona?</h2>
        <p className="section-subtitle">
          Un proceso simple y transparente para conectar necesidades reales
          con personas que quieren ayudar.
        </p>
        <div className="steps">
          {STEPS.map((s, i) => (
            <div className="step" key={i}>
              <div className="step-num">{i + 1}</div>
              <div className="step-icon-wrap">
                <i className={`bi ${s.icon}`} aria-hidden="true" />
              </div>
              <div className="step-title">{s.title}</div>
              <p className="step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sobre nosotros ── */}
      <section className="sobre" id="sobre">
        <div className="sobre-inner">
          <div className="sobre-img-wrap">
            <img
              src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=900&q=75"
              alt="Salón de clases en una escuela primaria"
              className="sobre-img"
              loading="lazy"
              width="900"
              height="600"
            />
          </div>
          <div className="sobre-text">
            <p className="section-label" style={{ textAlign: 'left' }}>Quiénes somos</p>
            <h2 className="section-title" style={{ textAlign: 'left', fontSize: '1.75rem', marginBottom: '20px' }}>
              Una iniciativa de Mexicanos Primero Jalisco
            </h2>
            <p>
              Somos una organización ciudadana independiente que cree que solo la educación
              de calidad cambia a Jalisco. A través de <strong>+Educación</strong>, conectamos
              las carencias reales de escuelas públicas con la voluntad de ciudadanos y
              empresas que quieren aportar.
            </p>
            <p>
              Cada proyecto en esta plataforma ha sido verificado y validado por nuestro
              equipo para garantizar total transparencia en el uso de los recursos.
            </p>
            <div className="sobre-values">
              {VALUES.map((v, i) => (
                <div className="valor" key={i}>
                  <div className="valor-title">
                    <i className={`bi ${v.icon} me-2`} aria-hidden="true" />
                    {v.title}
                  </div>
                  <p className="valor-desc">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Home
