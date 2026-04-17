import { supabase } from "../lib/supabase"

export async function getNecesidades() {
  const { data, error } = await supabase.from("necesidades").select("*")
  if (error) throw error
  return data
}

export async function getNecesidadById(id: number) {
  const { data, error } = await supabase.from("necesidades").select("*").eq("id", id).maybeSingle()
  if (error) throw error
  return data
}

export async function createNecesidad(body: Record<string, unknown>) {
  const { data, error } = await supabase.from("necesidades").insert(body).select().single()
  if (error) throw error
  return data
}

export async function updateNecesidad(id: number, body: Record<string, unknown>) {
  const { data, error } = await supabase.from("necesidades").update(body).eq("id", id).select().single()
  if (error) throw error
  return data
}

export async function deleteNecesidad(id: number) {
  const { error } = await supabase.from("necesidades").delete().eq("id", id)
  if (error) throw error
}

export async function getNecesidadesByPlantelId(plantelId: number) {
  const { data, error } = await supabase.from("necesidades").select("*").eq("plantel_id", plantelId)
  if (error) throw error
  return data
}
