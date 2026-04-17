import { supabase } from "../lib/supabase"

export async function getDonacionEscuelas() {
  const { data, error } = await supabase.from("donacion_escuelas").select("*")
  if (error) throw error
  return data
}

export async function getDonacionEscuelaById(id: string) {
  const { data, error } = await supabase.from("donacion_escuelas").select("*").eq("id", id).maybeSingle()
  if (error) throw error
  return data
}

export async function createDonacionEscuela(body: Record<string, unknown>) {
  const { error } = await supabase.from("donacion_escuelas").insert(body)
  if (error) throw error
}

export async function deleteDonacionEscuela(id: string) {
  const { error } = await supabase.from("donacion_escuelas").delete().eq("id", id)
  if (error) throw error
}
