import { Request, Response } from "express"

export function makeGetAll(service: () => Promise<unknown>) {
  return async (_req: Request, res: Response) => {
    try {
      return res.json(await service())
    } catch (err: any) {
      return res.status(500).json({ error: err.message })
    }
  }
}

export function makeGetById(service: (id: any) => Promise<unknown>, parseId: (s: string) => any = Number) {
  return async (req: Request, res: Response) => {
    try {
      const id = parseId(req.params.id as string)
      if (parseId === Number && Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" })
      const record = await service(id)
      if (!record) return res.status(404).json({ error: "Not found" })
      return res.json(record)
    } catch (err: any) {
      return res.status(500).json({ error: err.message })
    }
  }
}

export function makeCreate(service: (body: Record<string, unknown>) => Promise<unknown>, status = 201) {
  return async (req: Request, res: Response) => {
    try {
      const record = await service(req.body ?? {})
      return res.status(status).json(record)
    } catch (err: any) {
      return res.status(400).json({ error: err.message })
    }
  }
}

export function makeUpdate(service: (id: any, body: Record<string, unknown>) => Promise<unknown>, parseId: (s: string) => any = Number) {
  return async (req: Request, res: Response) => {
    try {
      const id = parseId(req.params.id as string)
      if (parseId === Number && Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" })
      const record = await service(id, req.body ?? {})
      return res.json(record)
    } catch (err: any) {
      return res.status(400).json({ error: err.message })
    }
  }
}

export function makeDelete(service: (id: any) => Promise<void>, parseId: (s: string) => any = Number) {
  return async (req: Request, res: Response) => {
    try {
      const id = parseId(req.params.id as string)
      if (parseId === Number && Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" })
      await service(id)
      return res.status(204).send()
    } catch (err: any) {
      return res.status(400).json({ error: err.message })
    }
  }
}
