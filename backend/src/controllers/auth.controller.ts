import { Request, Response } from "express"
import { loginUser, logoutUser, refreshUserSession, registerUser } from "../services/auth.service"

export async function registerController(req: Request, res: Response) {
  try {
    const { email, password, name } = req.body

    if (!email || !password || !name) {
      return res.status(400).json({ error: "email, password and name are required" })
    }

    const data = await registerUser(email, password, name)
    return res.status(201).json({ user: data.user })
  } catch (error: any) {
    console.error("Error registering user:", error)
    return res.status(400).json({ error: error.message ?? "Failed to register user" })
  }
}

export async function loginController(req: Request, res: Response) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: "email and password are required" })
    }

    const data = await loginUser(email, password)
    return res.json({
      access_token: data.session?.access_token,
      refresh_token: data.session?.refresh_token,
    })
  } catch (error: any) {
    console.error("Error logging in:", error)
    return res.status(401).json({ error: error.message ?? "Invalid credentials" })
  }
}

export async function logoutController(req: Request, res: Response) {
  try {
    const { access_token } = req.body ?? {}
    if (!access_token) return res.status(400).json({ error: "access_token is required" })
    await logoutUser(access_token)
    return res.status(204).send()
  } catch (error: any) {
    console.error("Error logging out:", error)
    return res.status(400).json({ error: error.message ?? "Failed to logout" })
  }
}

export async function refreshController(req: Request, res: Response) {
  try {
    const { refresh_token } = req.body ?? {}
    if (!refresh_token) return res.status(400).json({ error: "refresh_token is required" })
    const data = await refreshUserSession(refresh_token)
    return res.json({
      access_token: data.session?.access_token,
      refresh_token: data.session?.refresh_token,
    })
  } catch (error: any) {
    console.error("Error refreshing session:", error)
    return res.status(401).json({ error: error.message ?? "Failed to refresh session" })
  }
}
