import { createNecesidad, deleteNecesidad, getNecesidadById, getNecesidades, getNecesidadesByPlantelId, updateNecesidad } from "../repositories/necesidades.repository"
import { getEscuelaById } from "../repositories/escuelas.repository"

export const listNecesidades = () => getNecesidades()
export const findNecesidadById = (id: number) => getNecesidadById(id)
export const addNecesidad = (body: Record<string, unknown>) => createNecesidad(body)
export const modifyNecesidad = (id: number, body: Record<string, unknown>) => updateNecesidad(id, body)
export const removeNecesidad = (id: number) => deleteNecesidad(id)

export async function listNecesidadesByEscuela(escuelaId: number) {
  const escuela = await getEscuelaById(escuelaId)
  if (!escuela) return null
  return getNecesidadesByPlantelId(escuela.plantel_id)
}

export async function addNecesidadToEscuela(escuelaId: number, body: Record<string, unknown>) {
  const escuela = await getEscuelaById(escuelaId)
  if (!escuela) return null
  return createNecesidad({ ...body, plantel_id: escuela.plantel_id })
}
