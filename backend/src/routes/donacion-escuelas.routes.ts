import { Router } from "express"
import { requireAuth } from "../middleware/auth.middleware"
import { makeCreate, makeDelete, makeGetAll, makeGetById } from "../lib/crud-handlers"
import { addDonacionEscuela, findDonacionEscuelaById, listDonacionEscuelas, removeDonacionEscuela } from "../services/donacion-escuelas.service"

const donacionEscuelasRouter = Router()

donacionEscuelasRouter.get("/", requireAuth, makeGetAll(listDonacionEscuelas))
donacionEscuelasRouter.get("/:id", requireAuth, makeGetById(findDonacionEscuelaById, String))
donacionEscuelasRouter.post("/", requireAuth, makeCreate(addDonacionEscuela))
donacionEscuelasRouter.delete("/:id", requireAuth, makeDelete(removeDonacionEscuela, String))

export { donacionEscuelasRouter }
