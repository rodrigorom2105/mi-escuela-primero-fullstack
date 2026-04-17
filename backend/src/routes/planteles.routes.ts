import { Router } from "express"
import { requireAuth } from "../middleware/auth.middleware"
import { makeCreate, makeDelete, makeGetAll, makeGetById, makeUpdate } from "../lib/crud-handlers"
import { addPlantel, findPlantelById, listPlanteles, modifyPlantel, removePlantel } from "../services/planteles.service"

const platelesRouter = Router()

platelesRouter.get("/", makeGetAll(listPlanteles))
platelesRouter.get("/:id", makeGetById(findPlantelById))
platelesRouter.post("/", requireAuth, makeCreate(addPlantel))
platelesRouter.patch("/:id", requireAuth, makeUpdate(modifyPlantel))
platelesRouter.delete("/:id", requireAuth, makeDelete(removePlantel))

export { platelesRouter }
