import { 
  HomeIcon, DocumentTextIcon, BriefcaseIcon, UserIcon, Cog6ToothIcon 
} from "@heroicons/react/24/outline"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../../../auth/AuthProvider"
import defaultPFP from "../../../assets/defaultPFP.jpg"
import { uploadProfilePicture, deleteProfilePicture } from "../../services/avatarService"

export default function Sidebar() {
  const location = useLocation()
  const { user, profile } = useAuth() // ✅ make sure AuthProvider gives `user`
  
  const handleChange = async () => {
    if (!user) return
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = async (e: any) => {
      const file = e.target.files[0]
      if (file) {
        try {
          await uploadProfilePicture(user.id, file)
          window.location.reload() // 🔄 reload to refresh sidebar image
        } catch (err) {
          console.error("Error uploading profile picture:", err)
        }
      }
    }
    input.click()
  }

  const handleDelete = async () => {
    if (!user) return
    try {
      await deleteProfilePicture(user.id)
      window.location.reload()
    } catch (err) {
      console.error("Error deleting profile picture:", err)
    }
  }

  const items = [
    { icon: <HomeIcon className="w-5 h-5" />, label: "Dashboard", path: "/candidate/dashboard" },
    { icon: <DocumentTextIcon className="w-5 h-5" />, label: "Applications", path: "/candidate/applications" },
    { icon: <BriefcaseIcon className="w-5 h-5" />, label: "Explore Jobs", path: "/candidate/explore-jobs" },
    { icon: <UserIcon className="w-5 h-5" />, label: "Profile", path: "/candidate/profile" },
    { icon: <Cog6ToothIcon className="w-5 h-5" />, label: "Settings", path: "/candidate/settings" },
  ]

  return (
    <aside className="w-64 fixed top-0 left-0 h-screen bg-[#f0f8ff] text-black flex flex-col p-6 shadow-md border-r border-black">
      {/* Profile */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={profile?.profile_picture_url || defaultPFP}
          alt="Profile"
          className="w-24 h-24 rounded-full border-2 border-gray-300 shadow-md object-cover"
        />
        <h2 className="mt-3 text-lg font-semibold text-gray-800">
          {profile?.full_name || profile?.email || "Loading..."}
        </h2>

        {/* Change/Delete Buttons */}
        <div className="flex gap-3 mt-3">
          <button
            onClick={handleChange}
            className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 transition"
          >
            Change
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md shadow hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-4">
        {items.map(({ icon, label, path }) => {
          const active = location.pathname === path
          return (
            <Link
              key={label}
              to={path}
              className={`flex items-center gap-3 px-4 py-2 w-full rounded-md font-bold border border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] transition
                ${active
                  ? "bg-[#1062fe] text-white"
                  : "bg-white hover:bg-[#e0eaff] text-black"}
              `}
            >
              {icon}
              <span>{label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
