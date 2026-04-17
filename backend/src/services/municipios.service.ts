import { createMunicipio, deleteMunicipio, getMunicipioById, getMunicipios, updateMunicipio } from "../repositories/municipios.repository"

export const listMunicipios = () => getMunicipios()
export const findMunicipioById = (id: number) => getMunicipioById(id)
export const addMunicipio = (body: Record<string, unknown>) => createMunicipio(body)
export const modifyMunicipio = (id: number, body: Record<string, unknown>) => updateMunicipio(id, body)
export const removeMunicipio = (id: number) => deleteMunicipio(id)
