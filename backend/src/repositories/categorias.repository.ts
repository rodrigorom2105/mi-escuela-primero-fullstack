import { supabase } from "../lib/supabase"

export async function getCategorias() {
  const { data, error } = await supabase.from("categorias").select("*")
  if (error) throw error
  return data
}

export async function getCategoriaById(id: number) {
  const { data, error } = await supabase.from("categorias").select("*").eq("id", id).maybeSingle()
  if (error) throw error
  return data
}

export async function createCategoria(body: Record<string, unknown>) {
  const { data, error } = await supabase.from("categorias").insert(body).select().single()
  if (error) throw error
  return data
}

export async function updateCategoria(id: number, body: Record<string, unknown>) {
  const { data, error } = await supabase.from("categorias").update(body).eq("id", id).select().single()
  if (error) throw error
  return data
}

export async function deleteCategoria(id: number) {
  const { error } = await supabase.from("categorias").delete().eq("id", id)
  if (error) throw error
}
