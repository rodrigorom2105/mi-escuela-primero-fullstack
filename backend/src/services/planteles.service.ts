import { createPlantel, deletePlantel, getPlantelById, getPlanteles, updatePlantel } from "../repositories/planteles.repository"

export const listPlanteles = () => getPlanteles()
export const findPlantelById = (id: number) => getPlantelById(id)
export const addPlantel = (body: Record<string, unknown>) => createPlantel(body)
export const modifyPlantel = (id: number, body: Record<string, unknown>) => updatePlantel(id, body)
export const removePlantel = (id: number) => deletePlantel(id)
