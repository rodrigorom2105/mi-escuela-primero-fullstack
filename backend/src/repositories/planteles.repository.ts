import { supabase } from "../lib/supabase"

export async function getPlanteles() {
  const { data, error } = await supabase.from("planteles").select("*")
  if (error) throw error
  return data
}

export async function getPlantelById(id: number) {
  const { data, error } = await supabase.from("planteles").select("*").eq("id", id).maybeSingle()
  if (error) throw error
  return data
}

export async function createPlantel(body: Record<string, unknown>) {
  const { data, error } = await supabase.from("planteles").insert(body).select().single()
  if (error) throw error
  return data
}

export async function updatePlantel(id: number, body: Record<string, unknown>) {
  const { data, error } = await supabase.from("planteles").update(body).eq("id", id).select().single()
  if (error) throw error
  return data
}

export async function deletePlantel(id: number) {
  const { error } = await supabase.from("planteles").delete().eq("id", id)
  if (error) throw error
}
