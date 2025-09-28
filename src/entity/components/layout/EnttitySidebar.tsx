import {
  HomeIcon,
  PlusCircleIcon,
  BriefcaseIcon,
  UsersIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../../../auth/AuthProvider"

export default function EntitySidebar() {
  const location = useLocation()
  const { profile } = useAuth()

  const items = [
    {
      icon: <HomeIcon className="w-5 h-5" />,
      label: "Dashboard",
      path: "/entity/dashboard",
    },
    {
      icon: <PlusCircleIcon className="w-5 h-5" />,
      label: "Post Job",
      path: "/entity/post-job",
    },
    {
      icon: <BriefcaseIcon className="w-5 h-5" />,
      label: "Job Postings",
      path: "/entity/job-postings",
    },
    {
      icon: <UsersIcon className="w-5 h-5" />,
      label: "Applicants",
      path: "/entity/applicants",
    },
    {
      icon: <Cog6ToothIcon className="w-5 h-5" />,
      label: "Settings",
      path: "/entity/settings",
    },
  ]

  return (
    <aside className="w-64 fixed top-0 left-0 h-screen bg-[#f0f8ff] text-black flex flex-col p-6 shadow-md border-r border-black">
      {/* Organization Name */}
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-xl font-bold text-gray-800 text-center">
          {profile?.full_name || "Your Organization"}
        </h2>
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
                ${
                  active
                    ? "bg-[#1062fe] text-white"
                    : "bg-white hover:bg-[#e0eaff] text-black"
                }`}
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
