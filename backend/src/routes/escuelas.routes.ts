import { Router } from "express"
import { requireAuth } from "../middleware/auth.middleware"
import { makeCreate, makeCreateNested, makeDelete, makeGetAll, makeGetById, makeUpdate } from "../lib/crud-handlers"
import { listEscuelas, findEscuelaById } from "../services/escuelas.service"
import { createEscuela, updateEscuela, deleteEscuela } from "../repositories/escuelas.repository"
import { listNecesidadesByEscuela, addNecesidadToEscuela } from "../services/necesidades.service"

const escuelasRouter = Router()

escuelasRouter.get("/", makeGetAll(listEscuelas))
escuelasRouter.get("/:id", makeGetById(findEscuelaById))
escuelasRouter.get("/:id/needs", makeGetById(listNecesidadesByEscuela))
escuelasRouter.post("/:id/needs", requireAuth, makeCreateNested(addNecesidadToEscuela))
escuelasRouter.post("/", requireAuth, makeCreate((body) => createEscuela(body as any)))
escuelasRouter.patch("/:id", requireAuth, makeUpdate((id, body) => updateEscuela(id, body as any)))
escuelasRouter.delete("/:id", requireAuth, makeDelete((id) => deleteEscuela(id)))

export { escuelasRouter }
