import {
  createDonacion,
  getDonaciones,
  updateDonacion,
} from "../repositories/donaciones.repository"

export async function listDonaciones() {
  return getDonaciones()
}

export async function addDonacion(donacion: Record<string, unknown>) {
  return createDonacion(donacion)
}

export async function modifyDonacion(id: string, fields: Record<string, unknown>) {
  return updateDonacion(id, fields)
}
