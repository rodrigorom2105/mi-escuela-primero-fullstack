import { Request, Response } from "express"
import { findEscuelaById, listEscuelas } from "../services/escuelas.service"

export async function getEscuelasController(_req: Request, res: Response) {
  try {
    const escuelas = await listEscuelas()
    return res.json(escuelas)
  } catch (error) {
    console.error("Error fetching escuelas:", error)
    return res.status(500).json({ error: "Failed to fetch escuelas" })
  }
}

export async function getEscuelaByIdController(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid escuela id" })
    }

    const escuela = await findEscuelaById(id)

    if (!escuela) {
      return res.status(404).json({ error: "Escuela not found" })
    }

    return res.json(escuela)
  } catch (error) {
    console.error("Error fetching escuela by id:", error)
    return res.status(500).json({ error: "Failed to fetch escuela" })
  }
}

export async function createEscuelaController(req: Request, res: Response) {
  try {
    const { name, address } = req.body
    // Aquí deberías agregar la lógica para crear una nueva escuela en tu base de datos
    // Por ejemplo: await createEscuela({ name, address })
    return res.status(201).json({ message: "Escuela created successfully" })
  } catch (error) {
    console.error("Error creating escuela:", error)
    return res.status(500).json({ error: "Failed to create escuela" })
  }
}
