import { createCategoria, deleteCategoria, getCategoriaById, getCategorias, updateCategoria } from "../repositories/categorias.repository"

export const listCategorias = () => getCategorias()
export const findCategoriaById = (id: number) => getCategoriaById(id)
export const addCategoria = (body: Record<string, unknown>) => createCategoria(body)
export const modifyCategoria = (id: number, body: Record<string, unknown>) => updateCategoria(id, body)
export const removeCategoria = (id: number) => deleteCategoria(id)
