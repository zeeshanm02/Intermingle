// src/services/profileServices/projectsService.ts
import { supabase } from "../../../lib/supabaseClient"

export type Project = {
  id: string
  user_id: string
  title: string
  description?: string
  link?: string        // ✅ Added link support
  created_at: string
}

// ------------------------------
// 📌 Get Projects (basic info)
// ------------------------------
export async function getProjects(userId: string): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data ?? []
}

// ------------------------------
// 📌 Add Project
// ------------------------------
export async function addProject(
  userId: string,
  project: { title: string; description?: string; link?: string } // ✅ accepts link
) {
  const { data, error } = await supabase
    .from("projects")
    .insert([{ user_id: userId, ...project }])
    .select()
    .single()

  if (error) throw error
  return data
}

// ------------------------------
// 📌 Delete Project
// ------------------------------
export async function deleteProject(id: string) {
  const { error } = await supabase.from("projects").delete().eq("id", id)
  if (error) throw error
}

// ------------------------------
// 📌 Upload Multiple Project Images
// ------------------------------
export async function uploadProjectImages(
  files: File[],
  userId: string,
  projectId: string
) {
  const uploaded: string[] = []

  for (const file of files) {
    const filePath = `${userId}/${projectId}/${Date.now()}-${file.name}`

    // Upload to storage bucket
    const { error: uploadError } = await supabase.storage
      .from("project_photos")
      .upload(filePath, file)

    if (uploadError) throw uploadError

    // Save record in project_images table
    const { error: dbError } = await supabase
      .from("project_images")
      .insert([{ project_id: projectId, path: filePath }])

    if (dbError) throw dbError

    uploaded.push(filePath)
  }

  return uploaded
}

// ------------------------------
// 📌 Get Project Images (signed URLs)
// ------------------------------
export async function getProjectImages(projectId: string) {
  const { data, error } = await supabase
    .from("project_images")
    .select("*")
    .eq("project_id", projectId)

  if (error) throw error
  if (!data) return []

  // Generate signed URLs
  const withUrls = await Promise.all(
    data.map(async (img) => {
      const { data: urlData } = await supabase.storage
        .from("project_photos")
        .createSignedUrl(img.path, 60 * 60) // valid for 1h

      return { ...img, url: urlData?.signedUrl }
    })
  )

  return withUrls
}
