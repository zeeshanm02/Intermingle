import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "./AuthProvider"

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to="/signin" replace />
  }

  return <>{children}</>
}
