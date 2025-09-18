import { supabase } from "@/lib/supabaseClient"
import { getCurrentUserId, getCurrentUserEmail } from "../authService"

export type Profile = {
  id: string
  full_name: string | null
  email: string | null
  phone_number: string | null
  location: string | null
  short_bio: string | null
  profile_picture_url: string | null
  created_at?: string
  updated_at?: string
}

/** ---------- Get profile ---------- */
export async function getProfile(): Promise<Profile | null> {
  const userId = await getCurrentUserId()

  const { data, error } = await supabase
    .from("profiles")
    .select(
      "id, full_name, email, phone_number, location, short_bio, profile_picture_url, created_at, updated_at"
    )
    .eq("id", userId)
    .single()

  if (error && (error as any).code !== "PGRST116") {
    console.error("Error fetching profile:", error)
    throw error
  }

  return (data as Profile) ?? null
}

/** ---------- Create if missing ---------- */
export async function getOrCreateProfile(): Promise<Profile> {
  const existing = await getProfile()
  if (existing) return existing

  const [id, email] = await Promise.all([getCurrentUserId(), getCurrentUserEmail()])
  const seed: Partial<Profile> = {
    id,
    email,
    full_name: null,
    phone_number: null,
    location: null,
    short_bio: null,
    profile_picture_url: null,
  }

  const { data, error } = await supabase
    .from("profiles")
    .upsert(seed, { onConflict: "id" })
    .select()
    .single()

  if (error) throw error
  return data as Profile
}

/** ---------- Update ---------- */
export async function updateProfile(partial: Partial<Profile>): Promise<Profile> {
  const userId = await getCurrentUserId()

  const { data, error } = await supabase
    .from("profiles")
    .upsert({ ...partial, id: userId }, { onConflict: "id" })
    .select()
    .single()

  if (error) throw error
  return data as Profile
}
