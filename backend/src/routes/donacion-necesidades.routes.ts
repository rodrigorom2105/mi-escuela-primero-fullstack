import { Router } from "express"
import { requireAuth } from "../middleware/auth.middleware"
import { makeCreate, makeDelete, makeGetAll, makeGetById, makeUpdate } from "../lib/crud-handlers"
import { addDonacionNecesidad, findDonacionNecesidadById, listDonacionNecesidades, modifyDonacionNecesidad, removeDonacionNecesidad } from "../services/donacion-necesidades.service"

const donacionNecesidadesRouter = Router()

donacionNecesidadesRouter.get("/", requireAuth, makeGetAll(listDonacionNecesidades))
donacionNecesidadesRouter.get("/:id", requireAuth, makeGetById(findDonacionNecesidadById, String))
donacionNecesidadesRouter.post("/", requireAuth, makeCreate(addDonacionNecesidad))
donacionNecesidadesRouter.patch("/:id", requireAuth, makeUpdate(modifyDonacionNecesidad, String))
donacionNecesidadesRouter.delete("/:id", requireAuth, makeDelete(removeDonacionNecesidad, String))

export { donacionNecesidadesRouter }
