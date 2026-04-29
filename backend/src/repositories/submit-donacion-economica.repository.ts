import { supabase } from "../lib/supabase"

export async function submitDonacionEconomica(payload: Record<string, unknown>) {
  const { data, error } = await supabase.rpc("submit_donacion_economica", { payload })
  if (error) throw error
  return data
}
