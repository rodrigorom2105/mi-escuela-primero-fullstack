import { createUserClient, supabase } from "../lib/supabase"

export async function signUp(email: string, password: string, name: string) {
  const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { name } } })

  if (error) {
    throw error
  }

  return data
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw error
  }

  return data
}

export async function signOut(accessToken: string) {
  const client = createUserClient(accessToken)
  const { error } = await client.auth.signOut()
  if (error) throw error
}

export async function refreshSession(refreshToken: string) {
  const { data, error } = await supabase.auth.refreshSession({ refresh_token: refreshToken })
  if (error) throw error
  return data
}
