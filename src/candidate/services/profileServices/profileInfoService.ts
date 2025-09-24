import { supabase } from "../../../lib/supabaseClient"
import type { Profile } from "../../../types/candidate"

// Fetch profile
export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single()

  if (error) throw error
  return data as Profile
}

// Update profile
export async function updateProfile(updates: Partial<Profile>) {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", updates.id)
    .select()
    .single()

  if (error) throw error
  return data as Profile
}
