import { Router } from "express"
import { requireAuth } from "../middleware/auth.middleware"
import { makeCreate, makeDelete, makeGetAll, makeGetById, makeUpdate } from "../lib/crud-handlers"
import { addSubcategoria, findSubcategoriaById, listSubcategorias, modifySubcategoria, removeSubcategoria } from "../services/subcategorias.service"

const subcategoriasRouter = Router()

subcategoriasRouter.get("/", makeGetAll(listSubcategorias))
subcategoriasRouter.get("/:id", makeGetById(findSubcategoriaById))
subcategoriasRouter.post("/", requireAuth, makeCreate(addSubcategoria))
subcategoriasRouter.patch("/:id", requireAuth, makeUpdate(modifySubcategoria))
subcategoriasRouter.delete("/:id", requireAuth, makeDelete(removeSubcategoria))

export { subcategoriasRouter }
