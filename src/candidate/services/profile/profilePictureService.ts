import { supabase } from "@/lib/supabaseClient"
import { getCurrentUserId } from "../authService"

/** Upload a profile picture and return its public URL */
export async function uploadProfilePicture(file: File): Promise<string> {
  const userId = await getCurrentUserId()
  const fileExt = file.name.split(".").pop()
  const filePath = `profile_pictures/${userId}/avatar.${fileExt}`

  // Upload file (overwrite if exists)
  const { error: uploadError } = await supabase.storage
    .from("uploads")
    .upload(filePath, file, { upsert: true })
  if (uploadError) throw uploadError

  // Get public URL
  const { data } = supabase.storage.from("uploads").getPublicUrl(filePath)
  const publicUrl = data.publicUrl

  // Save public URL into profile
  const { error: dbError } = await supabase
    .from("profiles")
    .update({ profile_picture_url: publicUrl })
    .eq("id", userId)
  if (dbError) throw dbError

  return publicUrl
}
