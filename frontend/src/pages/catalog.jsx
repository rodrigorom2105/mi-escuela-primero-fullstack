import Navbar from '../components/navbar'
import Footer from '../components/footer'
import VerificationBadge from '../components/VerificationBadge'
import '../styles/catalog.css'
import { useNecesidades } from '../hooks/useNecesidades'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const PRIORITY_CLASS = {
  'Alta':  'priority-alta',
  'Media': 'priority-media',
  'Baja':  'priority-baja',
}

function Catalog() {
  const { data: necesidades, loading, error } = useNecesidades()

  const [busqueda,     setBusqueda]     = useState('')
  const [municipio,    setMunicipio]    = useState('')
  const [categoria,    setCategoria]    = useState('')
  const [subcategoria, setSubcategoria] = useState('')

  const municipios    = [...new Set(necesidades.map(n => n.municipio).filter(Boolean))].sort()
  const categorias    = [...new Set(necesidades.map(n => n.categoria).filter(Boolean))].sort()
  const subcategorias = categoria
    ? [...new Set(necesidades.filter(n => n.categoria === categoria).map(n => n.subcategoria))]
    : []

  const resultados = necesidades.filter(item => {
    if (item.estado !== 'Aun no cubierto') return false
    const matchBusqueda     = item.escuela.toLowerCase().includes(busqueda.toLowerCase())
    const matchMunicipio    = municipio    === '' || item.municipio    === municipio
    const matchCategoria    = categoria   === '' || item.categoria    === categoria
    const matchSubcategoria = subcategoria === '' || item.subcategoria === subcategoria
    return matchBusqueda && matchMunicipio && matchCategoria && matchSubcategoria
  })

  const hayFiltros = busqueda || municipio || categoria || subcategoria

  const limpiarFiltros = () => {
    setBusqueda('')
    setMunicipio('')
    setCategoria('')
    setSubcategoria('')
  }

  return (
    <>
      <Navbar />

      <main className="catalog-page">

        {/* ── Hero ── */}
        <section className="catalog-hero">
          <h1 className="catalog-titulo">Escuelas que esperan tu apoyo</h1>
          <p className="catalog-subtitulo">
            Explora los proyectos activos y encuentra una causa que te mueva a actuar.
          </p>
          <div className="catalog-hero-badge">
            <VerificationBadge />
          </div>
        </section>

        {/* ── Filter bar ── */}
        <section className="filtros-bar" aria-label="Filtros de búsqueda">
          <div className="filtros-inner">

            <div className="filtro-grupo">
              <label htmlFor="buscar">
                <i className="bi bi-search me-1" aria-hidden="true" />
                Buscar escuela
              </label>
              <input
                type="search"
                id="buscar"
                placeholder="Nombre de la escuela..."
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                autoComplete="off"
              />
            </div>

            <div className="filtro-grupo">
              <label htmlFor="municipio">
                <i className="bi bi-geo-alt me-1" aria-hidden="true" />
                Municipio
              </label>
              <select id="municipio" value={municipio} onChange={e => setMunicipio(e.target.value)}>
                <option value="">Todos</option>
                {municipios.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div className="filtro-grupo">
              <label htmlFor="categoria">
                <i className="bi bi-tag me-1" aria-hidden="true" />
                Categoría
              </label>
              <select
                id="categoria"
                value={categoria}
                onChange={e => { setCategoria(e.target.value); setSubcategoria('') }}
              >
                <option value="">Todas</option>
                {categorias.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {categoria && subcategorias.length > 0 && (
              <div className="filtro-grupo">
                <label htmlFor="subcategoria">
                  <i className="bi bi-funnel me-1" aria-hidden="true" />
                  Subcategoría
                </label>
                <select
                  id="subcategoria"
                  value={subcategoria}
                  onChange={e => setSubcategoria(e.target.value)}
                >
                  <option value="">Todas</option>
                  {subcategorias.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            )}

            <button
              className={`btn-limpiar${hayFiltros ? ' btn-limpiar-active' : ''}`}
              onClick={limpiarFiltros}
              disabled={!hayFiltros}
              aria-label="Limpiar todos los filtros"
            >
              <i className="bi bi-x-circle me-1" aria-hidden="true" />
              Limpiar
              {hayFiltros && <span className="filtro-dot" aria-hidden="true" />}
            </button>

          </div>
        </section>

        {/* ── Results ── */}
        <section className="catalogo-resultados">

          {loading && (
            <div className="sin-resultados" role="status" aria-live="polite">
              <div className="sin-resultados-icon">
                <i className="bi bi-arrow-repeat" aria-hidden="true" />
              </div>
              <p>Cargando proyectos…</p>
            </div>
          )}

          {error && (
            <div className="sin-resultados" role="alert">
              <div className="sin-resultados-icon">
                <i className="bi bi-exclamation-triangle" aria-hidden="true" />
              </div>
              <h2 className="sin-resultados-titulo">Error al cargar</h2>
              <p>No se pudieron cargar los proyectos. Verifica tu conexión e intenta de nuevo.</p>
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="resultados-header">
                <p className="resultados-count" aria-live="polite">
                  Mostrando <strong>{resultados.length}</strong> de {necesidades.filter(n => n.estado === 'Aun no cubierto').length} proyectos
                </p>
              </div>

              {resultados.length > 0 ? (

                <div className="cards-grid" role="list">
                  {resultados.map(item => (
                    <Link
                      to={`/proyecto/${item.id}`}
                      className="card"
                      key={item.id}
                      role="listitem"
                      aria-label={`${item.escuela} — ${item.propuesta}`}
                    >
                      {/* Image */}
                      <div className="card-img-wrap">
                        <img
                          src={item.imagenPrincipal}
                          alt=""
                          className="card-img-el"
                          loading="lazy"
                          width="400"
                          height="220"
                          onError={e => {
                            e.currentTarget.style.display = 'none'
                            e.currentTarget.parentElement.classList.add('card-img-fallback')
                          }}
                        />
                        {item.prioridad && (
                          <span className={`card-priority ${PRIORITY_CLASS[item.prioridad] ?? ''}`}>
                            {item.prioridad === 'Alta' && <i className="bi bi-exclamation-circle-fill me-1" aria-hidden="true" />}
                            Prioridad {item.prioridad}
                          </span>
                        )}
                      </div>

                      {/* Body */}
                      <div className="card-body">
                        <span className="card-categoria">{item.categoria}</span>
                        <h3 className="card-nombre">{item.escuela}</h3>

                        <p className="card-municipio">
                          <i className="bi bi-geo-alt-fill me-1" aria-hidden="true" />
                          {item.municipio}, Jalisco
                        </p>

                        <p className="card-descripcion">{item.descripcion}</p>

                        {/* Progress */}
                        <div className="card-progress-wrap">
                          <div className="card-progress-row">
                            <span className="card-progress-label">Progreso</span>
                            <span className="card-progress-pct">{item.progreso}%</span>
                          </div>
                          <div className="card-progress-track" role="progressbar" aria-valuenow={item.progreso} aria-valuemin={0} aria-valuemax={100}>
                            <div className="card-progress-fill" style={{ width: `${item.progreso}%` }} />
                          </div>
                        </div>

                        {/* Meta row */}
                        <div className="card-meta">
                          <span className="card-meta-item">
                            <i className="bi bi-people-fill me-1" aria-hidden="true" />
                            {(item.beneficiarios || 0).toLocaleString('es-MX')} beneficiarios
                          </span>
                        </div>

                        <span className="btn-ver">
                          Ver proyecto
                          <i className="bi bi-arrow-right ms-1" aria-hidden="true" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

              ) : (

                <div className="sin-resultados" role="status">
                  <div className="sin-resultados-icon">
                    <i className="bi bi-search" aria-hidden="true" />
                  </div>
                  <h2 className="sin-resultados-titulo">Sin resultados</h2>
                  <p>No encontramos proyectos con esos criterios.</p>
                  <p>Prueba ajustando los filtros o <Link to="/donar">realiza una donación general</Link>.</p>
                  {hayFiltros && (
                    <button className="btn-limpiar btn-limpiar-active" onClick={limpiarFiltros} style={{ marginTop: '20px' }}>
                      <i className="bi bi-x-circle me-1" />
                      Limpiar filtros
                    </button>
                  )}
                </div>

              )}
            </>
          )}

        </section>

      </main>

      <Footer />
    </>
  )
}

export default Catalog
