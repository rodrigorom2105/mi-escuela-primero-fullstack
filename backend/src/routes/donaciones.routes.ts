import { Router } from "express"
import { requireAuth } from "../middleware/auth.middleware"
import { makeCreate, makeDelete, makeGetAll, makeGetById, makeUpdate } from "../lib/crud-handlers"
import { addDonacion, listDonaciones, modifyDonacion } from "../services/donaciones.service"
import { getDonacionById, deleteDonacion } from "../repositories/donaciones.repository"
import { submitDonacionForm } from "../services/submit-donacion.service"

const donacionesRouter = Router()

donacionesRouter.post("/submit", makeCreate(submitDonacionForm))
donacionesRouter.post("/", makeCreate(addDonacion))

donacionesRouter.get("/", requireAuth, makeGetAll(listDonaciones))
donacionesRouter.get("/:id", requireAuth, makeGetById(getDonacionById, String))
donacionesRouter.patch("/:id", requireAuth, makeUpdate(modifyDonacion, String))
donacionesRouter.delete("/:id", requireAuth, makeDelete(deleteDonacion, String))

export { donacionesRouter }
