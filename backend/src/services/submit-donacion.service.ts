import { submitDonacion } from "../repositories/submit-donacion.repository"

export async function submitDonacionForm(payload: Record<string, unknown>) {
  return submitDonacion(payload)
}
