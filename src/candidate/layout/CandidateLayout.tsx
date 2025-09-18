import { Outlet } from "react-router-dom"
import Sidebar, { type NavItem } from "../../components/ui/Sidebar"
import { LayoutDashboard, Briefcase, FileText, User } from "lucide-react"

const candidateNavItems: NavItem[] = [
  { to: "/candidate/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/candidate/jobs", label: "Jobs", icon: Briefcase },
  { to: "/candidate/applications", label: "Applications", icon: FileText },
  { to: "/candidate/profile", label: "Profile", icon: User },
]

export default function CandidateLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar navigation for candidate pages */}
      <Sidebar title="Candidate" navItems={candidateNavItems} />

      {/* Main content area */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  )
}
