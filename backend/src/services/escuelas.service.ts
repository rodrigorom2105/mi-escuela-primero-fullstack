import {
  getEscuelaById,
  getEscuelas,
} from "../repositories/escuelas.repository"

export async function listEscuelas() {
  return getEscuelas()
}

export async function findEscuelaById(id: number) {
  return getEscuelaById(id)
}
