import {
  createDonacionEconomica,
  deleteDonacionEconomica,
  getDonacionEconomicaById,
  getDonacionesEconomicas,
  updateDonacionEconomica,
} from "../repositories/donaciones-economicas.repository"
import { submitDonacionEconomica } from "../repositories/submit-donacion-economica.repository"

export const listDonacionesEconomicas = () => getDonacionesEconomicas()
export const findDonacionEconomicaById = (id: string) => getDonacionEconomicaById(id)
export const addDonacionEconomica = (body: Record<string, unknown>) => createDonacionEconomica(body)
export const modifyDonacionEconomica = (id: string, body: Record<string, unknown>) => updateDonacionEconomica(id, body)
export const removeDonacionEconomica = (id: string) => deleteDonacionEconomica(id)
export const submitDonacionEconomicaForm = (payload: Record<string, unknown>) => submitDonacionEconomica(payload)
