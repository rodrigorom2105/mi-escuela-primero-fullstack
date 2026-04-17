import { supabase } from "../lib/supabase"

export async function getDonacionNecesidades() {
  const { data, error } = await supabase.from("donacion_necesidades").select("*")
  if (error) throw error
  return data
}

export async function getDonacionesByNecesidadId(necesidadId: number) {
  const { data, error } = await supabase
    .from("donacion_necesidades")
    .select("id, cantidad_cubierta, donaciones(estado, tipo_donativo, articulo_donar)")
    .eq("necesidad_id", necesidadId)
  if (error) throw error
  return data
}

export async function getProgresoAllNecesidades() {
  const { data, error } = await supabase
    .from("donacion_necesidades")
    .select("necesidad_id, cantidad_cubierta, donaciones(estado)")
  if (error) throw error

  const map: Record<number, number> = {}
  for (const row of data ?? []) {
    const donacion = (Array.isArray(row.donaciones) ? row.donaciones[0] : row.donaciones) as { estado: string } | null
    if (donacion?.estado === "completada") {
      const nid = row.necesidad_id
      map[nid] = (map[nid] ?? 0) + Number(row.cantidad_cubierta ?? 0)
    }
  }
  return Object.entries(map).map(([need_id, cantidad_cubierta]) => ({
    need_id: Number(need_id),
    cantidad_cubierta,
  }))
}

export async function getDonacionNecesidadById(id: string) {
  const { data, error } = await supabase.from("donacion_necesidades").select("*").eq("id", id).maybeSingle()
  if (error) throw error
  return data
}

export async function createDonacionNecesidad(body: Record<string, unknown>) {
  const { error } = await supabase.from("donacion_necesidades").insert(body)
  if (error) throw error
}

export async function updateDonacionNecesidad(id: string, body: Record<string, unknown>) {
  const { data, error } = await supabase.from("donacion_necesidades").update(body).eq("id", id).select().single()
  if (error) throw error
  return data
}

export async function deleteDonacionNecesidad(id: string) {
  const { error } = await supabase.from("donacion_necesidades").delete().eq("id", id)
  if (error) throw error
}
