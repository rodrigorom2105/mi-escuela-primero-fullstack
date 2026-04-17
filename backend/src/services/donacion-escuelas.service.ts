import { createDonacionEscuela, deleteDonacionEscuela, getDonacionEscuelaById, getDonacionEscuelas } from "../repositories/donacion-escuelas.repository"

export const listDonacionEscuelas = () => getDonacionEscuelas()
export const findDonacionEscuelaById = (id: string) => getDonacionEscuelaById(id)
export const addDonacionEscuela = (body: Record<string, unknown>) => createDonacionEscuela(body)
export const removeDonacionEscuela = (id: string) => deleteDonacionEscuela(id)
