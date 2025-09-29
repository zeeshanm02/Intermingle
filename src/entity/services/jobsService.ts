import { supabase } from "../../lib/supabaseClient"

export type Job = {
  title: string
  summary: string
  location: string
  remote: boolean
  telework: boolean
  salary_min: string
  salary_max: string
  duties: string
  qualifications: string
  education: string
}

export async function createJob(job: Job) {
  const { data, error } = await supabase.from("jobs").insert([job]).select().single()
  if (error) throw error
  return data
}

export async function getJobsByEntity(entityId: string) {
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("entity_id", entityId)
    .order("created_at", { ascending: false })
  if (error) throw error
  return data
}
