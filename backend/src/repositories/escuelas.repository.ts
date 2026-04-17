import { supabase } from "../lib/supabase"

export async function getEscuelas() {
  const { data, error } = await supabase.from("escuelas").select("*")

  if (error) {
    throw error
  }

  return data
}

export async function getEscuelaById(id: number) {
  const { data, error } = await supabase
    .from("escuelas")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (error) {
    throw error
  }

  return data
}

export async function createEscuela(body: Record<string, unknown>) {
  const { data, error } = await supabase.from("escuelas").insert(body).select().single()
  if (error) throw error
  return data
}

export async function updateEscuela(id: number, body: Record<string, unknown>) {
  const { data, error } = await supabase.from("escuelas").update(body).eq("id", id).select().single()
  if (error) throw error
  return data
}

export async function deleteEscuela(id: number) {
  const { error } = await supabase.from("escuelas").delete().eq("id", id)
  if (error) throw error
}

