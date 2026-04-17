import { Router } from "express"
import { requireAuth } from "../middleware/auth.middleware"
import { makeCreate, makeDelete, makeGetAll, makeGetById, makeUpdate } from "../lib/crud-handlers"
import { addCategoria, findCategoriaById, listCategorias, modifyCategoria, removeCategoria } from "../services/categorias.service"

const categoriasRouter = Router()

categoriasRouter.get("/", makeGetAll(listCategorias))
categoriasRouter.get("/:id", makeGetById(findCategoriaById))
categoriasRouter.post("/", requireAuth, makeCreate(addCategoria))
categoriasRouter.patch("/:id", requireAuth, makeUpdate(modifyCategoria))
categoriasRouter.delete("/:id", requireAuth, makeDelete(removeCategoria))

export { categoriasRouter }
