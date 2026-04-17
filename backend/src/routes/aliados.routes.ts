import { Router } from "express"
import { requireAuth } from "../middleware/auth.middleware"
import { makeCreate, makeDelete, makeGetAll, makeGetById, makeUpdate } from "../lib/crud-handlers"
import { addAliado, findAliadoById, listAliados, modifyAliado, removeAliado } from "../services/aliados.service"

const aliadosRouter = Router()

aliadosRouter.post("/", makeCreate(addAliado))

aliadosRouter.get("/", requireAuth, makeGetAll(listAliados))
aliadosRouter.get("/:id", requireAuth, makeGetById(findAliadoById, String))
aliadosRouter.patch("/:id", requireAuth, makeUpdate(modifyAliado, String))
aliadosRouter.delete("/:id", requireAuth, makeDelete(removeAliado, String))

export { aliadosRouter }
