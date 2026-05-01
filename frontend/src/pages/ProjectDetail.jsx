import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import VerificationBadge from '../components/VerificationBadge';
import { useNecesidadById } from '../hooks/useNecesidades';
import '../styles/project-details.css';

function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('detalles');

  const { data: proyecto, loading, error } = useNecesidadById(id);

  const [selectedImg, setSelectedImg] = useState(null);
  const displayImg = selectedImg ?? proyecto?.imagenPrincipal;

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="sin-resultados">
          <i className="bi bi-arrow-repeat" style={{ fontSize: '2rem' }} aria-hidden="true" />
          <p>Cargando proyecto…</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !proyecto) {
    return (
      <div className="error-view">
        <Navbar />
        <div className="sin-resultados">
          <h2>404</h2>
          <p>El proyecto que buscas ha sido movido o no existe.</p>
          <Link to="/catalogo" className="btn-ver">Explorar otros proyectos</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const shareOnWhatsApp = () => {
    const url = window.location.href;
    const message = `Hola 👋, te comparto este proyecto educativo que necesita apoyo:

    📌 ${proyecto.propuesta}
    🏫 ${proyecto.escuela} - ${proyecto.municipio}, Jalisco
    🎯 Progreso actual: ${proyecto.progreso}%

    Puedes verlo aquí:
    ${url}

    ¡Ojalá podamos ayudar! 🙌`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(proyecto.escuela + ' ' + proyecto.municipio)}&output=embed`;

  return (
    <>
      <Navbar />
      <main className="project-detail-master">

        <section className="detail-visual-header">
          <div className="visual-grid">
            <div className="main-image-container">
              <img src={displayImg} alt={proyecto.propuesta} className="main-display-img" />

            </div>

            {proyecto.galeria?.length > 0 && (
              <div className="thumbnail-strip">
                <img
                  src={proyecto.imagenPrincipal}
                  className={`thumb ${displayImg === proyecto.imagenPrincipal ? 'active' : ''}`}
                  onClick={() => setSelectedImg(proyecto.imagenPrincipal)}
                  alt="Thumbnail principal"
                />
                {proyecto.galeria.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    className={`thumb ${displayImg === img ? 'active' : ''}`}
                    onClick={() => setSelectedImg(img)}
                    alt={`Thumbnail ${i}`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="quick-info-panel">
            <nav className="breadcrumb">
              <Link to="/">Inicio</Link> / <Link to="/catalogo">Catálogo</Link> / {proyecto.categoria}
            </nav>
            <h1 className="project-main-title">{proyecto.propuesta}</h1>
            <div className="school-tag">
              <span className="icon">🏫</span>
              <div>
                <p className="school-name">{proyecto.escuela}</p>
                <p className="school-location">{proyecto.municipio}, Jalisco</p>
              </div>
            </div>
            <div style={{ marginTop: '12px' }}>
              <VerificationBadge />
            </div>

            <div className="impact-meter">
              <div className="meter-header">
                <span>Progreso de cobertura de esta necesidad</span>
                <span>{proyecto.progreso ?? 0}%</span>
              </div>
              <div className="meter-bar">
                <div className="meter-fill" style={{ width: `${proyecto.progreso ?? 0}%` }}></div>
              </div>
              <p className="meter-explanation">
                Este porcentaje refleja cuánto de la necesidad total ha sido cubierto gracias a donaciones recibidas.
              </p>
              {proyecto.beneficiarios > 0 && (
                <p className="beneficiaries-count">
                  <strong>{proyecto.beneficiarios}</strong> alumnos recibirán este apoyo directamente.
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="detail-body-grid">
          <div className="content-tabs-wrapper">
            <div className="tabs-navigation">
              <button className={activeTab === 'detalles' ? 'active' : ''} onClick={() => setActiveTab('detalles')}>Desglose</button>
              <button className={activeTab === 'escuela'  ? 'active' : ''} onClick={() => setActiveTab('escuela')}>Sobre la Escuela</button>
              <button className={activeTab === 'mapa'     ? 'active' : ''} onClick={() => setActiveTab('mapa')}>Mapa</button>
            </div>

            <div className="tab-pane">
              {activeTab === 'detalles' && (
                <div className="animate-fade">
                  <h3>Especificaciones del Proyecto</h3>
                  <p className="long-description">{proyecto.descripcion}</p>
                  <div className="specs-table">
                    <div className="spec-row"><span>Material/Servicio</span><strong>{proyecto.subcategoria}</strong></div>
                    <div className="spec-row"><span>Meta total</span><strong>{proyecto.cantidad} {proyecto.unidad}</strong></div>
                    <div className="spec-row"><span>Estado</span><strong>{proyecto.estado}</strong></div>
                  </div>
                </div>
              )}

              {activeTab === 'escuela' && (
                <div className="animate-fade">
                  <h3>Información de la Institución</h3>
                  <p>La escuela <strong>{proyecto.escuela}</strong> es un pilar educativo en <strong>{proyecto.municipio}</strong>. Actualmente estamos trabajando con los directivos para asegurar que cada donación llegue directamente a los alumnos.</p>
                  <ul className="check-list">
                    <li>✓ Institución verificada por el programa.</li>
                    <li>✓ Transparencia en la entrega de materiales.</li>
                    <li>✓ Seguimiento fotográfico post-donación.</li>
                  </ul>
                </div>
              )}

              {activeTab === 'mapa' && (
                <div className="animate-fade map-container">
                  <iframe src={mapUrl} width="100%" height="400" style={{ border: 0, borderRadius: '12px' }} allowFullScreen loading="lazy"></iframe>
                </div>
              )}
            </div>
          </div>

          <aside className="sticky-action-sidebar">
            <div className="action-box">
              <h3>¿Deseas ser el impulsor?</h3>
              <p>Puedes donar el material físico, el recurso económico o tiempo de voluntariado.</p>

              <div className="action-buttons">
                <button
                  className="btn-primary-action"
                  onClick={() => navigate('/donar', { state: { proyecto } })}
                >
                  Donar a este proyecto
                </button>
                <button
                  className="btn-secondary-action"
                  onClick={shareOnWhatsApp}
                >
                  Compartir vía WhatsApp
                </button>
              </div>

              <div className="security-note">
                <small>🔒 Tu apoyo es gestionado de forma segura y directa con la escuela.</small>
              </div>
            </div>

            <button
              className="btn-share-full"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('✅ Link copiado al portapapeles');
              }}
            >
              📤 Compartir este proyecto
            </button>
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default ProjectDetail;
