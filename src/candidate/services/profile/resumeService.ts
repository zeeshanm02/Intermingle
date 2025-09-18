import { supabase } from "@/lib/supabaseClient"
import { getCurrentUserId } from "../authService"

/** ---------- Types ---------- */
export type Resume = {
  id: string
  profile_id: string
  file_url: string          // 👈 matches DB column
  title: string | null
  uploaded_at: string
  signedUrl?: string
}

/** ---------- Upload a resume ---------- */
export async function uploadResume(file: File, title?: string): Promise<Resume> {
  const userId = await getCurrentUserId()
  const fileExt = file.name.split(".").pop()
  const filePath = `resumes/${userId}/resume-${Date.now()}.${fileExt}`

  // 1. Upload to storage
  const { error: uploadError } = await supabase.storage
    .from("uploads")
    .upload(filePath, file, { upsert: true })
  if (uploadError) throw uploadError

  // 2. Insert into DB
  const resumeTitle = title || file.name
  const { data, error: dbError } = await supabase
    .from("resumes")
    .insert({
      profile_id: userId,
      file_url: filePath,    // 👈 save to file_url column
      title: resumeTitle,
      uploaded_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (dbError) throw dbError
  return data as Resume
}

/** ---------- Get resumes ---------- */
export async function getResumes(): Promise<Resume[]> {
  const userId = await getCurrentUserId()

  const { data, error } = await supabase
    .from("resumes")
    .select("id, profile_id, file_url, title, uploaded_at")
    .eq("profile_id", userId)
    .order("uploaded_at", { ascending: false })

  if (error) throw error
  if (!data) return []

  const resumesWithUrls: Resume[] = await Promise.all(
    data.map(async (resume) => {
      const { data: signedUrlData } = await supabase.storage
        .from("uploads")
        .createSignedUrl(resume.file_url, 60 * 60) // 1 hr

      return {
        ...resume,
        signedUrl: signedUrlData?.signedUrl,
      } as Resume
    })
  )

  return resumesWithUrls
}

/** ---------- Delete resume ---------- */
export async function deleteResume(resumeId: string, fileUrl: string): Promise<boolean> {
  const userId = await getCurrentUserId()

  // 1. Delete row
  const { error: dbError } = await supabase
    .from("resumes")
    .delete()
    .eq("id", resumeId)
    .eq("profile_id", userId)
  if (dbError) throw dbError

  // 2. Delete from storage
  const { error: storageError } = await supabase.storage
    .from("uploads")
    .remove([fileUrl])
  if (storageError) throw storageError

  return true
}
