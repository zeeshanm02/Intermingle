// src/entity/pages/Settings.tsx
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../auth/AuthProvider"
import EntitySidebar from "../components/layout/EntitySidebar"

export default function EntitySettings() {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate("/signin")
  }

  return (
    <div className="flex min-h-screen bg-[#f5faff]">
      <EntitySidebar />

      <main className="flex-1 p-10 ml-64">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700 transition"
        >
          Logout
        </button>
      </main>
    </div>
  )
}
