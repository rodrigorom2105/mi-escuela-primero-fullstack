import { Router } from "express"
import { requireAuth } from "../middleware/auth.middleware"
import { makeCreate, makeDelete, makeGetAll, makeGetById, makeUpdate } from "../lib/crud-handlers"
import { addMunicipio, findMunicipioById, listMunicipios, modifyMunicipio, removeMunicipio } from "../services/municipios.service"

const municipiosRouter = Router()

municipiosRouter.get("/", makeGetAll(listMunicipios))
municipiosRouter.get("/:id", makeGetById(findMunicipioById))
municipiosRouter.post("/", requireAuth, makeCreate(addMunicipio))
municipiosRouter.patch("/:id", requireAuth, makeUpdate(modifyMunicipio))
municipiosRouter.delete("/:id", requireAuth, makeDelete(removeMunicipio))

export { municipiosRouter }
