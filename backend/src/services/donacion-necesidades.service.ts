import { createDonacionNecesidad, deleteDonacionNecesidad, getDonacionNecesidadById, getDonacionNecesidades, getDonacionesByNecesidadId, getProgresoAllNecesidades, updateDonacionNecesidad } from "../repositories/donacion-necesidades.repository"

export const listDonacionNecesidades = () => getDonacionNecesidades()
export const findDonacionNecesidadById = (id: string) => getDonacionNecesidadById(id)
export const addDonacionNecesidad = (body: Record<string, unknown>) => createDonacionNecesidad(body)
export const modifyDonacionNecesidad = (id: string, body: Record<string, unknown>) => updateDonacionNecesidad(id, body)
export const removeDonacionNecesidad = (id: string) => deleteDonacionNecesidad(id)
export const listDonacionesByNecesidad = (necesidadId: number) => getDonacionesByNecesidadId(necesidadId)
export const listProgresoNecesidades = () => getProgresoAllNecesidades()
