import { supabase } from "@/lib/supabaseClient"

/** Get current user's ID */
export async function getCurrentUserId(): Promise<string> {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) throw new Error("User not authenticated")
  return user.id
}

/** Get current user's email (nullable) */
export async function getCurrentUserEmail(): Promise<string | null> {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return null
  return user.email ?? null
}
