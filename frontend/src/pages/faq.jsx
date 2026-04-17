import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import '../styles/faq.css'

const FAQS = [
  {
    icon: 'bi-geo-alt-fill',
    q: '¿A qué se destinan los donativos?',
    a: 'Los donativos recibidos son destinados directamente a las escuelas que forman parte del proyecto Mi Escuela Primero, escuelas de educación básica de sostenimiento público en contextos vulnerables. A través de una priorización de necesidades, destinamos cada apoyo a la escuela que más lo necesita.',
  },
  {
    icon: 'bi-pencil-square',
    q: '¿Cómo puedo realizar mi donativo?',
    a: 'El primer paso para realizar tu donativo es llenar el formulario de contacto. A partir de ahí, el personal de Mi Escuela Primero se pondrá en contacto contigo para realizar las gestiones necesarias y dar seguimiento a tu donación.',
    cta: { label: 'Ir al formulario de donación', to: '/donar' },
  },
  {
    icon: 'bi-box-seam',
    q: '¿Puedo donar en especie y qué artículos necesitan actualmente?',
    a: 'Sí, se puede donar en especie. Conoce nuestro catálogo de proyectos en donde encontrarás el tipo de donaciones que se requieren y las cantidades solicitadas por cada escuela.',
    cta: { label: 'Ver catálogo de proyectos', to: '/catalogo' },
  },
  {
    icon: 'bi-graph-up',
    q: '¿Qué impacto tiene mi donativo?',
    a: 'Cada aportación contribuye directamente a mejorar las condiciones y oportunidades de los niños, niñas y adolescentes de escuelas públicas en contextos vulnerables. Al momento de hacer la donación, te compartiremos los avances y resultados al correo que registras para que puedas conocer el impacto generado.',
  },
  {
    icon: 'bi-currency-dollar',
    q: '¿Existe un monto mínimo para donar?',
    a: 'No, cualquier cantidad económica o de materiales suma y es bienvenida. Lo más importante es la intención de apoyar y formar parte del cambio.',
  },
  {
    icon: 'bi-heart-fill',
    q: '¿Puedo donar algo que no está dentro de las necesidades prioritarias de la escuela?',
    a: 'Sí, cualquier donación que pueda ser de utilidad para las escuelas, sus estudiantes, docentes, personal escolar o padres de familia es bienvenida. De esta manera seguimos fortaleciendo las comunidades educativas.',
  },
]

function Faq() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => setOpenIndex(prev => prev === i ? null : i)

  return (
    <>
      <Navbar />

      <main className="faq-page">

        {/* ── Hero ── */}
        <section className="faq-hero">
          <h1 className="faq-title">Preguntas frecuentes</h1>
          <p className="faq-subtitle">
            Todo lo que necesitas saber sobre cómo donar y el impacto de tu aportación.
          </p>
        </section>

        {/* ── Accordion ── */}
        <section className="faq-container">
          <div className="faq-list">
            {FAQS.map((item, i) => {
              const isOpen = openIndex === i
              return (
                <div
                  key={i}
                  className={`faq-item${isOpen ? ' faq-item--open' : ''}`}
                >
                  <button
                    className="faq-question"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                    id={`faq-btn-${i}`}
                  >
                    <span className="faq-icon-wrap">
                      <i className={`bi ${item.icon}`} aria-hidden="true" />
                    </span>
                    <span className="faq-q-text">{item.q}</span>
                    <i
                      className={`bi ${isOpen ? 'bi-chevron-up' : 'bi-chevron-down'} faq-chevron`}
                      aria-hidden="true"
                    />
                  </button>

                  <div
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-btn-${i}`}
                    className="faq-answer"
                    hidden={!isOpen}
                  >
                    <p>{item.a}</p>
                    {item.cta && (
                      <Link to={item.cta.to} className="faq-cta-link">
                        <i className="bi bi-arrow-right-circle-fill me-2" aria-hidden="true" />
                        {item.cta.label}
                      </Link>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* ── CTA ── */}
          <div className="faq-cta-block">
            <i className="bi bi-chat-dots-fill faq-cta-icon" aria-hidden="true" />
            <h2>¿Tienes otra pregunta?</h2>
            <p>Contáctanos directamente y con gusto te orientamos.</p>
            <a href="mailto:contacto@mpj.org.mx" className="btn-faq-contact">
              <i className="bi bi-envelope-fill me-2" aria-hidden="true" />
              contacto@mpj.org.mx
            </a>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}

export default Faq
