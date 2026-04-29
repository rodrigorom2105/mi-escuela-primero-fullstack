const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, options)
  if (res.status === 204) return null
  const body = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(body.error || `HTTP ${res.status}`)
  return body
}

export const getNecesidades   = ()    => apiFetch('/necesidades')
export const getNecesidadById = (id)  => apiFetch(`/necesidades/${id}`)
export const getEscuelas      = ()    => apiFetch('/escuelas')
export const getPlanteles     = ()    => apiFetch('/planteles')
export const getMunicipios    = ()    => apiFetch('/municipios')
export const getCategorias    = ()    => apiFetch('/categorias')
export const getSubcategorias = ()    => apiFetch('/subcategorias')

export const submitDonacion = (data) =>
  apiFetch('/donaciones/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

export const loginAdmin = (email, password) =>
  apiFetch('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

export const getDonaciones = (token) =>
  apiFetch('/donaciones', { headers: { Authorization: `Bearer ${token}` } })

export const getDonacionesByNecesidad = (needId) =>
  apiFetch(`/necesidades/${needId}/donaciones`)

export const getProgresoNecesidades = () =>
  apiFetch('/necesidades/progreso')

export const getAliados = (token) =>
  apiFetch('/aliados', { headers: { Authorization: `Bearer ${token}` } })

export const updateDonacionEstado = (id, estado, token) =>
  apiFetch(`/donaciones/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ estado }),
  })
