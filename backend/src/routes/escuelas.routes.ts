import { Router } from "express"
import { Request, Response } from "express"
import { requireAuth } from "../middleware/auth.middleware"
import { makeCreate, makeDelete, makeGetAll, makeGetById, makeUpdate } from "../lib/crud-handlers"
import { listEscuelas, findEscuelaById } from "../services/escuelas.service"
import { createEscuela, updateEscuela, deleteEscuela } from "../repositories/escuelas.repository"
import { listNecesidadesByEscuela, addNecesidadToEscuela } from "../services/necesidades.service"

const escuelasRouter = Router()

escuelasRouter.get("/", makeGetAll(listEscuelas))
escuelasRouter.get("/:id", makeGetById(findEscuelaById))
escuelasRouter.get("/:id/needs", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" })
    const needs = await listNecesidadesByEscuela(id)
    if (needs === null) return res.status(404).json({ error: "School not found" })
    return res.json(needs)
  } catch (err: any) {
    return res.status(500).json({ error: err.message })
  }
})
escuelasRouter.post("/:id/needs", requireAuth, async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" })
    const need = await addNecesidadToEscuela(id, req.body ?? {})
    if (need === null) return res.status(404).json({ error: "School not found" })
    return res.status(201).json(need)
  } catch (err: any) {
    return res.status(400).json({ error: err.message })
  }
})
escuelasRouter.post("/", requireAuth, makeCreate((body) => createEscuela(body as any)))
escuelasRouter.patch("/:id", requireAuth, makeUpdate((id, body) => updateEscuela(id, body as any)))
escuelasRouter.delete("/:id", requireAuth, makeDelete((id) => deleteEscuela(id)))

export { escuelasRouter }
