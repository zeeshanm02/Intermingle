import { supabase } from "../../../lib/supabaseClient"

export type Skill = {
  id: string
  user_id: string
  name: string
}

export async function getSkills(userId: string) {
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true })

  if (error) throw error
  return data as Skill[]
}

export async function addSkill(name: string) {
  const { data: user } = await supabase.auth.getUser()
  if (!user?.user) throw new Error("No logged in user")

  const { data, error } = await supabase
    .from("skills")
    .insert({ user_id: user.user.id, name })
    .select()
    .single()

  if (error) throw error
  return data as Skill
}

export async function updateSkill(skill: Skill) {
  const { data, error } = await supabase
    .from("skills")
    .update(skill)
    .eq("id", skill.id)
    .select()
    .single()

  if (error) throw error
  return data as Skill
}

export async function deleteSkill(id: string) {
  const { error } = await supabase.from("skills").delete().eq("id", id)
  if (error) throw error
}
