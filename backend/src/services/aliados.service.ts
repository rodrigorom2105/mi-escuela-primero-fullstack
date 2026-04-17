import { createAliado, deleteAliado, getAliadoById, getAliados, updateAliado } from "../repositories/aliados.repository"

export const listAliados = () => getAliados()
export const findAliadoById = (id: string) => getAliadoById(id)
export const addAliado = (body: Record<string, unknown>) => createAliado(body)
export const modifyAliado = (id: string, body: Record<string, unknown>) => updateAliado(id, body)
export const removeAliado = (id: string) => deleteAliado(id)
