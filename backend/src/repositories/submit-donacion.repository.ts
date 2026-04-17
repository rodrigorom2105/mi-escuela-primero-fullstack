import { supabase } from "../lib/supabase"

export async function submitDonacion(payload: Record<string, unknown>) {
  const { data, error } = await supabase.rpc("submit_donacion", { payload })
  if (error) throw error
  return data
}
