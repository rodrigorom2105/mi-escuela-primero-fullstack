import { Request, Response } from "express"
import { addDonacion, listDonaciones, modifyDonacion } from "../services/donaciones.service"

export async function getDonacionesController(_req: Request, res: Response) {
  try {
    const donaciones = await listDonaciones()
    return res.json(donaciones)
  } catch (error) {
    console.error("Error fetching donaciones:", error)
    return res.status(500).json({ error: "Failed to fetch donaciones" })
  }
}

export async function createDonacionController(req: Request, res: Response) {
  try {
    const donacion = await addDonacion(req.body)
    return res.status(201).json(donacion)
  } catch (error) {
    console.error("Error creating donacion:", error)
    return res.status(500).json({ error: "Failed to create donacion" })
  }
}

export async function updateDonacionController(req: Request, res: Response) {
  try {
    const id = req.params.id as string
    const donacion = await modifyDonacion(id, req.body)
    return res.json(donacion)
  } catch (error) {
    console.error("Error updating donacion:", error)
    return res.status(500).json({ error: "Failed to update donacion" })
  }
}
