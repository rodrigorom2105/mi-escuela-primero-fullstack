import { signIn, signOut, signUp, refreshSession } from "../repositories/auth.repository"

export async function registerUser(email: string, password: string, name: string) {
  return signUp(email, password, name)
}

export async function loginUser(email: string, password: string) {
  return signIn(email, password)
}

export async function logoutUser(accessToken: string) {
  return signOut(accessToken)
}

export async function refreshUserSession(refreshToken: string) {
  return refreshSession(refreshToken)
}
