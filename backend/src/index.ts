import "dotenv/config"
import express from "express"
import cors from "cors"
import { escuelasRouter } from "./routes/escuelas.routes"
import { donacionesRouter } from "./routes/donaciones.routes"
import { authRouter } from "./routes/auth.routes"
import { municipiosRouter } from "./routes/municipios.routes"
import { platelesRouter } from "./routes/planteles.routes"
import { categoriasRouter } from "./routes/categorias.routes"
import { subcategoriasRouter } from "./routes/subcategorias.routes"
import { necesidadesRouter } from "./routes/necesidades.routes"
import { aliadosRouter } from "./routes/aliados.routes"
import { donacionNecesidadesRouter } from "./routes/donacion-necesidades.routes"
import { donacionEscuelasRouter } from "./routes/donacion-escuelas.routes"

const app = express()
const port = process.env.PORT ?? 3000

app.use(cors())
app.use(express.json())

app.get("/", (_req, res) => {
  res.json({ message: "API is running" })
})

app.use("/auth", authRouter)
app.use("/escuelas", escuelasRouter)
app.use("/donaciones", donacionesRouter)
app.use("/municipios", municipiosRouter)
app.use("/planteles", platelesRouter)
app.use("/categorias", categoriasRouter)
app.use("/subcategorias", subcategoriasRouter)
app.use("/necesidades", necesidadesRouter)
app.use("/aliados", aliadosRouter)
app.use("/donacion-necesidades", donacionNecesidadesRouter)
app.use("/donacion-escuelas", donacionEscuelasRouter)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
