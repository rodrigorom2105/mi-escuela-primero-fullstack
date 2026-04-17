import { supabase } from "../lib/supabase"

export async function getAliados() {
  const { data, error } = await supabase.from("aliados").select("*")
  if (error) throw error
  return data
}

export async function getAliadoById(id: string) {
  const { data, error } = await supabase.from("aliados").select("*").eq("id", id).maybeSingle()
  if (error) throw error
  return data
}

export async function createAliado(body: Record<string, unknown>) {
  const { error } = await supabase.from("aliados").insert(body)
  if (error) throw error
}

export async function updateAliado(id: string, body: Record<string, unknown>) {
  const { data, error } = await supabase.from("aliados").update(body).eq("id", id).select().single()
  if (error) throw error
  return data
}

export async function deleteAliado(id: string) {
  const { error } = await supabase.from("aliados").delete().eq("id", id)
  if (error) throw error
}
