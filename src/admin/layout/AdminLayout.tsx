import { Outlet } from "react-router-dom"
import Sidebar from "../../components/ui/Sidebar"
import type { NavItem } from "../../components/ui/Sidebar"
import { Users, Settings, ClipboardList, FileSearch } from "lucide-react"

const adminNavItems: NavItem[] = [
  { to: "/admin/dashboard", label: "Dashboard", icon: ClipboardList },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/audit", label: "Audit Logs", icon: FileSearch },
  { to: "/admin/settings", label: "Settings", icon: Settings },
]

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar title="Admin" navItems={adminNavItems} />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  )
}
