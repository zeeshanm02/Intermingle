// src/services/profileServices/documentsService.ts
import { supabase } from "../../../lib/supabaseClient"

export type Document = {
  id: string
  user_id: string
  name: string
  file_path: string
  created_at: string
}

// 📌 Get Documents (attach signed URLs)
export async function getDocuments(): Promise<(Document & { signedUrl: string })[]> {
  const user = (await supabase.auth.getUser()).data.user
  if (!user) throw new Error("Not authenticated")

  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) throw error
  if (!data) return []

  // Attach signed URLs (valid for 1 hour)
  const docsWithUrls = await Promise.all(
    data.map(async (doc) => {
      const { data: signed, error: signedError } = await supabase.storage
        .from("documents")
        .createSignedUrl(doc.file_path, 60 * 60)

      if (signedError) throw signedError
      return { ...doc, signedUrl: signed?.signedUrl ?? "" }
    })
  )

  return docsWithUrls
}

// 📌 Upload Document
export async function uploadDocument(name: string, file: File) {
  const user = (await supabase.auth.getUser()).data.user
  if (!user) throw new Error("Not authenticated")

  const filePath = `${user.id}/${Date.now()}_${file.name}`

  // Upload file to Storage
  const { error: uploadError } = await supabase.storage
    .from("documents")
    .upload(filePath, file)

  if (uploadError) throw uploadError

  // Insert record in DB (with user_id from auth.uid())
  const { data, error } = await supabase
    .from("documents")
    .insert([{ user_id: user.id, name, file_path: filePath }])
    .select()
    .single()

  if (error) throw error
  return data
}

// 📌 Delete Document
export async function deleteDocument(id: string) {
  const { error } = await supabase.from("documents").delete().eq("id", id)
  if (error) throw error
}
