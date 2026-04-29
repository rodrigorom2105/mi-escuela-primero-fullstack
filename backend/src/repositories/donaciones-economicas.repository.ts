import { supabase } from "../lib/supabase"

export async function getDonacionesEconomicas() {
  const { data, error } = await supabase
    .from("donaciones_economicas")
    .select(`
      *,
      aliado:aliados(*),
      escuela:escuelas(id, nombre, cct)
    `)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function getDonacionEconomicaById(id: string) {
  const { data, error } = await supabase
    .from("donaciones_economicas")
    .select(`
      *,
      aliado:aliados(*),
      escuela:escuelas(id, nombre, cct)
    `)
    .eq("id", id)
    .maybeSingle()

  if (error) throw error
  return data
}

export async function createDonacionEconomica(donacion: Record<string, unknown>) {
  const { data, error } = await supabase
    .from("donaciones_economicas")
    .insert(donacion)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateDonacionEconomica(id: string, fields: Record<string, unknown>) {
  const { data, error } = await supabase
    .from("donaciones_economicas")
    .update(fields)
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteDonacionEconomica(id: string) {
  const { error } = await supabase
    .from("donaciones_economicas")
    .delete()
    .eq("id", id)

  if (error) throw error
}
