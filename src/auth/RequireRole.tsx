import { Navigate } from "react-router-dom"
import { useAuth } from "./AuthProvider"
import type { Role } from "../types"

export default function RequireRole({
  role,
  children,
}: {
  role: Role
  children: React.ReactNode
}) {
  const { loading, profile } = useAuth()

  if (loading) return <div className="p-6">Loading…</div>
  if (!profile) return <Navigate to="/signin" replace />
  if (profile.role !== role) return <Navigate to="/not-permitted" replace />
  return <>{children}</>
}
