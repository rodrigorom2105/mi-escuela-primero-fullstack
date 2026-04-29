import { Router } from "express"
import { requireAuth } from "../middleware/auth.middleware"
import { makeCreate, makeDelete, makeGetAll, makeGetById, makeUpdate } from "../lib/crud-handlers"
import {
  addDonacionEconomica,
  findDonacionEconomicaById,
  listDonacionesEconomicas,
  modifyDonacionEconomica,
  removeDonacionEconomica,
  submitDonacionEconomicaForm,
} from "../services/donaciones-economicas.service"

const donacionesEconomicasRouter = Router()

donacionesEconomicasRouter.post("/submit", makeCreate(submitDonacionEconomicaForm))
donacionesEconomicasRouter.post("/", requireAuth, makeCreate(addDonacionEconomica))

donacionesEconomicasRouter.get("/", requireAuth, makeGetAll(listDonacionesEconomicas))
donacionesEconomicasRouter.get("/:id", requireAuth, makeGetById(findDonacionEconomicaById, String))
donacionesEconomicasRouter.patch("/:id", requireAuth, makeUpdate(modifyDonacionEconomica, String))
donacionesEconomicasRouter.delete("/:id", requireAuth, makeDelete(removeDonacionEconomica, String))

export { donacionesEconomicasRouter }
