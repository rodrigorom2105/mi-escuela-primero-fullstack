import '../styles/footer.css'
import { Link } from 'react-router-dom'

const SOCIALS = [
  { icon: 'bi-facebook', label: 'Facebook', href: 'https://www.facebook.com/MexPrimJal/' },
  { icon: 'bi-twitter-x', label: 'X (Twitter)', href: 'https://x.com/Mexicanos1oJal' },
  { icon: 'bi-instagram', label: 'Instagram', href: 'https://www.instagram.com/mexicanosprimjal/' },
  { icon: 'bi-youtube', label: 'YouTube', href: 'https://www.youtube.com/channel/UCSENuGtzVwZp-hE3kCZjr8g/featured' },
]

function Footer() {
  return (
    <footer>
      <div className="footer-inner">

        <div className="footer-top">

          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-plus">+</span>Educación
            </div>
            <p>
              Una iniciativa de Mexicanos Primero Jalisco para conectar escuelas
              con necesidades reales con personas que quieren hacer la diferencia.
            </p>
            <p className="footer-slogan">
              Mejoramos las condiciones educativas para construir una mejor sociedad.
            </p>
          </div>

          <div className="footer-col">
            <h4>PLATAFORMA</h4>
            <ul>
              <li><Link to="/catalogo">Explorar proyectos</Link></li>
              <li><a href="#sobre">Cómo funciona</a></li>
              <li><Link to="/faq">Preguntas frecuentes</Link></li>
              <li><a href="#">Transparencia</a></li>
              <li><Link to="/admin" className="footer-admin-link">Administración</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>CONTACTO</h4>
            <ul>
              <li>
                <a href="mailto:contacto@mpj.org.mx">
                  <i className="bi bi-envelope me-2" aria-hidden="true" />
                  contacto@mpj.org.mx
                </a>
              </li>
              <li>
                <a href="tel:+523321068253">
                  <i className="bi bi-telephone me-2" aria-hidden="true" />
                  +52 33 2106 8253
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="bi bi-geo-alt me-2" aria-hidden="true" />
                  Prado de los Cedros #1500
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="bi bi-building me-2" aria-hidden="true" />
                  Ciudad del Sol, Zapopan
                </a>
              </li>
            </ul>
          </div>

        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom">
          <p>© 2025 Mexicanos Primero Jalisco · +Educación. Todos los derechos reservados.</p>
          <div className="footer-socials">
            {SOCIALS.map(s => (
              <a
                key={s.icon}
                className="social-btn"
                href={s.href}
                aria-label={s.label}
              >
                <i className={`bi ${s.icon}`} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
