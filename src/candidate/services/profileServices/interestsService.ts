import { supabase } from "../../../lib/supabaseClient"

export type Interest = {
  id: string
  user_id: string
  name: string
  created_at?: string
}

// ✅ Get interests for a user
export async function getInterests(userId: string): Promise<Interest[]> {
  const { data, error } = await supabase
    .from("interests")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true })

  if (error) throw error
  return data || []
}

// ✅ Add interest
export async function addInterest(userId: string, name: string) {
  const { error } = await supabase.from("interests").insert({
    user_id: userId,
    name,
  })
  if (error) throw error
}

// ✅ Delete interest
export async function deleteInterest(id: string) {
  const { error } = await supabase.from("interests").delete().eq("id", id)
  if (error) throw error
}
