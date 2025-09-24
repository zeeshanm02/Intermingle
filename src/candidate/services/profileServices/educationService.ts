import { supabase } from "../../../lib/supabaseClient"

export type Education = {
  id: string
  user_id: string
  school: string
  degree: string
  start_date: string
  end_date: string | null      // ✅ nullable
  description: string | null   // ✅ nullable
  created_at: string | null    // ✅ Supabase default
}

// ✅ Fetch only current user's rows (RLS enforces ownership)
export async function getEducation(): Promise<Education[]> {
  const { data, error } = await supabase
    .from("education")
    .select("*")
    .order("start_date", { ascending: false })

  if (error) {
    console.error("Error fetching education:", error.message)
    return []
  }

  

  return data || []
}

// ✅ Insert new education (user_id handled by trigger)
export async function addEducation(
  edu: Omit<Education, "id" | "user_id" | "created_at">
) {
  const { error } = await supabase.from("education").insert(edu)

  if (error) {
    console.error("Insert failed:", error)
    throw error
  }
 

}

// ✅ Update existing education (RLS ensures ownership)
export async function updateEducation(
  id: string,
  edu: Partial<Omit<Education, "id" | "user_id" | "created_at">>
) {
  const { error } = await supabase
    .from("education")
    .update(edu)
    .eq("id", id)

  if (error) throw error
}

// ✅ Delete existing education (RLS ensures ownership)
export async function deleteEducation(id: string) {
  const { error } = await supabase
    .from("education")
    .delete()
    .eq("id", id)

  if (error) throw error
}

