import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { LogOut, ChevronLeft, ChevronRight } from "lucide-react"
import { supabase } from "../../lib/supabaseClient"

export type NavItem = {
  to: string
  label: string
  icon: React.ComponentType<{ size?: number }>
}

type SidebarProps = {
  title: string
  navItems: NavItem[]
}

export default function Sidebar({ title, navItems }: SidebarProps) {
  const [open, setOpen] = useState(true)
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate("/signin")
  }

  return (
    <aside
      className={`${
        open ? "w-64" : "w-20"
      } bg-gray-50 border-r flex flex-col transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {open && <span className="text-lg font-bold">{title}</span>}
        <button
          onClick={() => setOpen(!open)}
          className="p-1 rounded-md hover:bg-gray-100"
        >
          {open ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer
              ${
                isActive
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <Icon size={18} />
            {open && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="m-2 flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 cursor-pointer transition"
      >
        <LogOut size={18} />
        {open && <span>Logout</span>}
      </button>
    </aside>
  )
}
