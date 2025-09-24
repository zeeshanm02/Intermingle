import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./AuthProvider"
import Loader from "../components/ui/Loader"

type RequireAuthProps = {
  allowedRoles: ("candidate" | "entity" | "admin")[]
}

export default function RequireAuth({ allowedRoles }: RequireAuthProps) {
  const { user, profile, loading } = useAuth()

  if (loading) return <Loader />   // 👈 Loader here

  if (!user) return <Navigate to="/signin" replace />

  if (profile && allowedRoles.includes(profile.role)) {
    return <Outlet />
  }

  return <Navigate to="/" replace />
}
