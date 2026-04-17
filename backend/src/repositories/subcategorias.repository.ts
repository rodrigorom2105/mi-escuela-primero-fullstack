import { supabase } from "../lib/supabase"

export async function getSubcategorias() {
  const { data, error } = await supabase.from("subcategorias").select("*")
  if (error) throw error
  return data
}

export async function getSubcategoriaById(id: number) {
  const { data, error } = await supabase.from("subcategorias").select("*").eq("id", id).maybeSingle()
  if (error) throw error
  return data
}

export async function createSubcategoria(body: Record<string, unknown>) {
  const { data, error } = await supabase.from("subcategorias").insert(body).select().single()
  if (error) throw error
  return data
}

export async function updateSubcategoria(id: number, body: Record<string, unknown>) {
  const { data, error } = await supabase.from("subcategorias").update(body).eq("id", id).select().single()
  if (error) throw error
  return data
}

export async function deleteSubcategoria(id: number) {
  const { error } = await supabase.from("subcategorias").delete().eq("id", id)
  if (error) throw error
}
