import { supabase } from "../../../lib/supabaseClient"

export type Hobby = {
  id: string
  user_id: string
  name: string
  created_at?: string
}

// ✅ Get hobbies for a user
export async function getHobbies(userId: string): Promise<Hobby[]> {
  const { data, error } = await supabase
    .from("hobbies")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true })

  if (error) throw error
  return data || []
}

// ✅ Add hobby
export async function addHobby(userId: string, name: string) {
  const { error } = await supabase.from("hobbies").insert({
    user_id: userId,
    name,
  })
  if (error) throw error
}

// ✅ Delete hobby
export async function deleteHobby(id: string) {
  const { error } = await supabase.from("hobbies").delete().eq("id", id)
  if (error) throw error
}
