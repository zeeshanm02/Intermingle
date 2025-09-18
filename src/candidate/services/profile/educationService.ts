import { supabase } from "@/lib/supabaseClient"
import { getCurrentUserId } from "../authService"

/** ---------- Types ---------- */
export type Education = {
  id: string
  profile_id: string
  school: string
  program: string   // e.g. "Bachelor of Science, Computer Science"
  start_date: string
  end_date: string
  gpa?: string | null
  description?: string | null
}

/** ---------- Reads ---------- */

/** Get all education entries for current user */
export async function getEducation(): Promise<Education[]> {
  const userId = await getCurrentUserId()

  const { data, error } = await supabase
    .from("education")
    .select("*")
    .eq("profile_id", userId)
    .order("start_date", { ascending: false })

  if (error) throw error
  return data || []
}

/** ---------- Writes ---------- */

/** Add a new education entry */
export async function addEducation(
  entry: Omit<Education, "id" | "profile_id">
): Promise<Education> {
  const userId = await getCurrentUserId()

  const { data, error } = await supabase
    .from("education")
    .insert({ ...entry, profile_id: userId })
    .select()
    .single()

  if (error) throw error
  return data as Education
}

/** Update an education entry */
export async function updateEducation(
  id: string,
  entry: Partial<Omit<Education, "id" | "profile_id">>
): Promise<Education> {
  const userId = await getCurrentUserId()

  const { data, error } = await supabase
    .from("education")
    .update(entry)
    .eq("id", id)
    .eq("profile_id", userId)
    .select()
    .single()

  if (error) throw error
  return data as Education
}

/** Delete an education entry */
export async function deleteEducation(id: string): Promise<boolean> {
  const userId = await getCurrentUserId()

  const { error } = await supabase
    .from("education")
    .delete()
    .eq("id", id)
    .eq("profile_id", userId)

  if (error) throw error
  return true
}
