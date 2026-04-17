import { useLocation, Link } from 'react-router-dom'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import '../styles/thankyou.css'

function ThankYou() {
    const location = useLocation()
    const summary = location.state?.summary || null

    return (
        <>
            <Navbar />
            <main className="thankyou-page">

                <section className="thankyou-hero">
                    <div className="thankyou-icon bi bi-heart-fill me-1"></div>
                    <h1 className="thankyou-title">¡Gracias por ser parte del cambio!</h1>
                    <p className="thankyou-subtitle">
                        Tu generosidad transforma la educación en Jalisco. Nos pondremos en contacto contigo
                        en menos de 48 horas para coordinar tu apoyo.
                    </p>
                </section>

                {summary && (
                    <section className="thankyou-summary">
                        <h3>Resumen de tu apoyo</h3>
                        <div className="summary-grid">
                            {summary.nombre && (
                                <div className="summary-item">
                                    <span className="summary-label">Nombre</span>
                                    <span className="summary-value">{summary.nombre}</span>
                                </div>
                            )}
                            {summary.escuela && (
                                <div className="summary-item">
                                    <span className="summary-label">Escuela beneficiada</span>
                                    <span className="summary-value">{summary.escuela}</span>
                                </div>
                            )}
                            {summary.tipo && (
                                <div className="summary-item">
                                    <span className="summary-label">Tipo de apoyo</span>
                                    <span className="summary-value">{summary.tipo}</span>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                <section className="thankyou-message">
                    <p>
                        Cada donación que llega a una escuela pública en Jalisco representa
                        un niño con mejores condiciones para aprender. Tú hiciste posible ese cambio.
                    </p>
                </section>

                <div className="thankyou-actions">
                    <Link to="/catalogo" className="btn-primary">Explorar más proyectos</Link>
                    <Link to="/" className="btn-secondary">Volver al inicio</Link>
                </div>

            </main>
            <Footer />
        </>
    )
}

export default ThankYou
