import { createSubcategoria, deleteSubcategoria, getSubcategoriaById, getSubcategorias, updateSubcategoria } from "../repositories/subcategorias.repository"

export const listSubcategorias = () => getSubcategorias()
export const findSubcategoriaById = (id: number) => getSubcategoriaById(id)
export const addSubcategoria = (body: Record<string, unknown>) => createSubcategoria(body)
export const modifySubcategoria = (id: number, body: Record<string, unknown>) => updateSubcategoria(id, body)
export const removeSubcategoria = (id: number) => deleteSubcategoria(id)
