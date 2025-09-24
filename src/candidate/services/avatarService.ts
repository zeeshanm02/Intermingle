import { supabase } from "../../lib/supabaseClient"

const BUCKET = "avatars"

export async function uploadProfilePicture(userId: string, file: File) {
  const filePath = `${userId}/${file.name}`

  // Upload to Supabase Storage
  const { error } = await supabase.storage.from(BUCKET).upload(filePath, file, { upsert: true })
  if (error) throw error

  // Get Public URL
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath)

  // Update profile row
  const { error: updateError } = await supabase
    .from("profiles")
    .update({ profile_picture_url: data.publicUrl })
    .eq("id", userId)

  if (updateError) throw updateError

  return data.publicUrl
}

export async function deleteProfilePicture(userId: string) {
  // Clear in DB
  const { error } = await supabase
    .from("profiles")
    .update({ profile_picture_url: null })
    .eq("id", userId)

  if (error) throw error
}
