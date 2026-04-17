import { supabase } from "../lib/supabase"

export async function getMunicipios() {
  const { data, error } = await supabase.from("municipios").select("*")
  if (error) throw error
  return data
}

export async function getMunicipioById(id: number) {
  const { data, error } = await supabase.from("municipios").select("*").eq("id", id).maybeSingle()
  if (error) throw error
  return data
}

export async function createMunicipio(body: Record<string, unknown>) {
  const { data, error } = await supabase.from("municipios").insert(body).select().single()
  if (error) throw error
  return data
}

export async function updateMunicipio(id: number, body: Record<string, unknown>) {
  const { data, error } = await supabase.from("municipios").update(body).eq("id", id).select().single()
  if (error) throw error
  return data
}

export async function deleteMunicipio(id: number) {
  const { error } = await supabase.from("municipios").delete().eq("id", id)
  if (error) throw error
}
