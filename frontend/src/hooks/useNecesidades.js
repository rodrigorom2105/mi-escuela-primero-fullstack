import { useState, useEffect } from 'react'
import {
  getNecesidades,
  getEscuelas, getPlanteles, getMunicipios,
  getCategorias, getSubcategorias,
  getDonacionesByNecesidad, getProgresoNecesidades,
} from '../services/api'

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1000'

function buildLookups(escuelas, planteles, municipios, categorias, subcategorias) {
  const escuelasByPlantelId = {}
  escuelas.forEach(e => { escuelasByPlantelId[e.plantel_id] = e })

  const planteleById = {}
  planteles.forEach(p => { planteleById[p.id] = p })

  const municipioById = {}
  municipios.forEach(m => { municipioById[m.id] = m })

  const subcategoriaById = {}
  subcategorias.forEach(s => { subcategoriaById[s.id] = s })

  const categoriaById = {}
  categorias.forEach(c => { categoriaById[c.id] = c })

  return { escuelasByPlantelId, planteleById, municipioById, subcategoriaById, categoriaById }
}

function calcularProgreso(donaciones, cantidadNecesaria) {
  if (!cantidadNecesaria || !Array.isArray(donaciones)) return 0
  const donado = donaciones
    .filter(d => d.estado === 'completada')
    .reduce((sum, d) => sum + (Number(d.cantidad) || 0), 0)
  return Math.min(100, Math.round((donado / cantidadNecesaria) * 100))
}

function mapNecesidad(n, lookups, donaciones = []) {
  const { escuelasByPlantelId, planteleById, municipioById, subcategoriaById, categoriaById } = lookups
  const plantel    = planteleById[n.plantel_id]      || {}
  const escuela    = escuelasByPlantelId[n.plantel_id] || {}
  const municipio  = municipioById[plantel.municipio_id] || {}
  const subcat     = subcategoriaById[n.subcategoria_id] || {}
  const cat        = categoriaById[subcat.categoria_id]  || {}

  return {
    id:             n.id,
    escuela:        escuela.nombre  || plantel.nombre || '—',
    municipio:      municipio.nombre || '—',
    categoria:      cat.nombre       || '—',
    subcategoria:   subcat.nombre    || '—',
    propuesta:      n.propuesta,
    cantidad:       n.cantidad,
    unidad:         n.unidad,
    estado:         n.estado,
    prioridad:      null,
    progreso:       calcularProgreso(donaciones, n.cantidad),
    beneficiarios:  escuela.estudiantes || 0,
    imagenPrincipal: DEFAULT_IMAGE,
    galeria:        [],
    descripcion:    n.detalles || '',
    plantel_id:     n.plantel_id,
    escuela_id:     escuela.id,
  }
}

function fetchLookups() {
  return Promise.all([
    getEscuelas(),
    getPlanteles(),
    getMunicipios(),
    getCategorias(),
    getSubcategorias(),
  ])
}

export function useNecesidades() {
  const [data,    setData]    = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    Promise.all([
      getNecesidades(),
      fetchLookups(),
      getProgresoNecesidades().catch(() => []),
    ])
      .then(([needs, [escuelas, planteles, municipios, categorias, subcategorias], progresosRaw]) => {
        const lookups = buildLookups(escuelas, planteles, municipios, categorias, subcategorias)
        // progresosRaw: [{ need_id, cantidad_cubierta }] — already filtered to completada
        const cubiertoByNeedId = {}
        progresosRaw.forEach(p => { cubiertoByNeedId[p.need_id] = Number(p.cantidad_cubierta) || 0 })
        setData(needs.map(n => {
          const cubierto = cubiertoByNeedId[n.id] || 0
          const progreso = n.cantidad > 0 ? Math.min(100, Math.round((cubierto / n.cantidad) * 100)) : 0
          return { ...mapNecesidad(n, lookups), progreso }
        }))
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}

export function useNecesidadById(id) {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(null)

    Promise.all([
      getDonacionesByNecesidad(Number(id)).catch(() => null),
      fetchLookups(),
    ])
      .then(([needWithDonaciones, [escuelas, planteles, municipios, categorias, subcategorias]]) => {
        if (!needWithDonaciones) { setData(null); return }
        const { donaciones = [], ...need } = needWithDonaciones
        const lookups = buildLookups(escuelas, planteles, municipios, categorias, subcategorias)
        setData(mapNecesidad(need, lookups, donaciones))
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  return { data, loading, error }
}
