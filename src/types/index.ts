export type Role = "candidate" | "entity" | "master_admin"

export type Profile = {
  id: string
  role: Role
  full_name?: string | null
  avatar_url?: string | null
  created_at?: string
}
