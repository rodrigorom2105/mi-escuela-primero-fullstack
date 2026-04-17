import { supabase } from "../lib/supabase"

export async function getDonaciones() {
  const { data, error } = await supabase.from("donaciones").select("*")

  if (error) {
    throw error
  }

  return data
}

export async function createDonacion(donacion: Record<string, unknown>) {
  const { error } = await supabase.from("donaciones").insert(donacion)
  if (error) throw error
}

export async function getDonacionById(id: string) {
  const { data, error } = await supabase.from("donaciones").select("*").eq("id", id).maybeSingle()
  if (error) throw error
  return data
}

export async function updateDonacion(id: string, fields: Record<string, unknown>) {
  const { data, error } = await supabase
    .from("donaciones")
    .update(fields)
    .eq("id", id)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}

export async function deleteDonacion(id: string) {
  const { error } = await supabase.from("donaciones").delete().eq("id", id)
  if (error) throw error
}
