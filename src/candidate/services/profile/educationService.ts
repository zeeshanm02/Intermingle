import { supabase } from "@/lib/supabaseClient"
import { getCurrentUserId } from "../authService"

export type Education = {
  id: string
  profile_id: string
  school: string
  program: string
  start_date: string
  end_date: string
  gpa?: string
  description?: string
}

// Get education
export async function getEducation(profileId: string): Promise<Education[]> {
  const { data, error } = await supabase
    .from("education")
    .select("id, profile_id, school, program, start_date, end_date, gpa, description")
    .eq("profile_id", profileId)

  if (error) throw error
  return data || []
}

// Add education
export async function addEducation(edu: Partial<Education>): Promise<Education> {
  const userId = await getCurrentUserId()

  const { isEditing, ...cleanEdu } = edu as any

  const { data, error } = await supabase
    .from("education")
    .insert([{ ...cleanEdu, profile_id: userId }]) // ✅ use current userId
    .select()
    .single()

  if (error) throw error
  return data as Education
}


// Update education
export async function updateEducation(id: string, edu: Partial<Education>): Promise<Education> {
  const { isEditing, ...cleanEdu } = edu as any

  const { data, error } = await supabase
    .from("education")
    .update(cleanEdu)
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return data as Education
}

// Delete education
export async function deleteEducation(id: string) {
  const { error } = await supabase.from("education").delete().eq("id", id)
  if (error) throw error
}
