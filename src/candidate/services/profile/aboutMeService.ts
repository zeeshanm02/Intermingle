import { getProfile, updateProfile } from "./profileService"

/** ---------- Types ---------- */
export type AboutMe = {
  full_name: string | null
  phone_number: string | null
  location: string | null
  short_bio: string | null
}

/** ---------- Formatters ---------- */

/** Format phone number as (XXX) XXX-XXXX */
export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "")
  const match = digits.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/)
  if (!match) return value

  let result = ""
  if (match[1]) result = `(${match[1]}`
  if (match[2]) result += `) ${match[2]}`
  if (match[3]) result += `-${match[3]}`
  return result
}

/** Trim bio to max length */
export function sanitizeBio(bio: string, maxLength = 300): string {
  return bio.length > maxLength ? bio.slice(0, maxLength) : bio
}

/** Clean up location input */
export function sanitizeLocation(location: string): string {
  return location.trim()
}

/** ---------- Reads ---------- */

/** Get About Me fields */
export async function getAboutMe(): Promise<AboutMe | null> {
  const profile = await getProfile()
  if (!profile) return null

  return {
    full_name: profile.full_name,
    phone_number: profile.phone_number ? formatPhone(profile.phone_number) : null,
    location: profile.location,
    short_bio: profile.short_bio,
  }
}

/** ---------- Writes ---------- */

/** Update About Me fields (with sanitization) */
export async function updateAboutMe(data: Partial<AboutMe>): Promise<AboutMe> {
  const clean: Partial<AboutMe> = {}

  if (data.full_name !== undefined) clean.full_name = data.full_name?.trim() || null
  if (data.phone_number !== undefined) {
    const digits = data.phone_number?.replace(/\D/g, "")
    clean.phone_number = digits || null
  }
  if (data.location !== undefined) clean.location = sanitizeLocation(data.location || "")
  if (data.short_bio !== undefined) clean.short_bio = sanitizeBio(data.short_bio || "")

  const updated = await updateProfile(clean)

  return {
    full_name: updated.full_name,
    phone_number: updated.phone_number ? formatPhone(updated.phone_number) : null,
    location: updated.location,
    short_bio: updated.short_bio,
  }
}
