import { supabase } from "../../../lib/supabaseClient"

export type Experience = {
  id: string
  user_id: string
  company: string
  role: string
  start_date: string
  end_date?: string | null
  description?: string | null
}

export async function getExperiences(userId: string) {
  const { data, error } = await supabase
    .from("experience")
    .select("*")
    .eq("user_id", userId)
    .order("start_date", { ascending: false })

  if (error) throw error
  return data as Experience[]
}

export async function addExperience(exp: Omit<Experience, "id" | "user_id">) {
  const user = (await supabase.auth.getUser()).data.user
  if (!user) throw new Error("No logged in user")

  const { data, error } = await supabase
    .from("experience")
    .insert({ ...exp, user_id: user.id })
    .select()
    .single()

  if (error) throw error
  return data as Experience
}

export async function updateExperience(exp: Experience) {
  const { data, error } = await supabase
    .from("experience")
    .update(exp)
    .eq("id", exp.id)
    .select()
    .single()

  if (error) throw error
  return data as Experience
}

export async function deleteExperience(id: string) {
  const { error } = await supabase.from("experience").delete().eq("id", id)
  if (error) throw error
}
