import { supabase } from "../../lib/supabaseClient"
import { calculateMatchScore } from "../../utils/match"

export async function applyToJob(job: any) {
  const user = (await supabase.auth.getUser()).data.user
  if (!user) throw new Error("Not logged in")

  // --- Fetch profile ---
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  if (profileError) {
    console.error("Error fetching profile:", profileError)
    throw new Error("Failed to load profile")
  }

  if (!profile) {
    throw new Error("Profile not found. Please complete your profile before applying.")
  }

  // --- Fetch education, experience, skills separately ---
  const { data: education } = await supabase
    .from("education")
    .select("*")
    .eq("user_id", user.id)

  const { data: experience } = await supabase
    .from("experience")
    .select("*")
    .eq("user_id", user.id)

  const { data: skills } = await supabase
    .from("skills")
    .select("*")
    .eq("user_id", user.id)

  // --- Build snapshot ---
  const snapshot = {
    ...profile,
    education: education || [],
    experience: experience || [],
    skills: skills || [],
  }

  // --- Calculate match score safely ---
  let score = 0
  try {
    score = calculateMatchScore(snapshot, job)
  } catch (err) {
    console.error("Error calculating match score:", err)
    score = 0
  }

  // --- Insert application ---
  const { error: insertError } = await supabase.from("applications").insert({
    user_id: user.id,
    job_id: job.id,
    profile_snapshot: snapshot,
    score,
    status: "submitted",
  })

  if (insertError) {
    console.error("Error inserting application:", insertError)
    throw new Error("Could not submit application")
  }
}
