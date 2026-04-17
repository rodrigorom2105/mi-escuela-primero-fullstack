import { Router } from "express"
import { loginController, logoutController, refreshController, registerController } from "../controllers/auth.controller"

const authRouter = Router()

authRouter.post("/register", registerController)
authRouter.post("/login", loginController)
authRouter.post("/logout", logoutController)
authRouter.post("/refresh", refreshController)

export { authRouter }
