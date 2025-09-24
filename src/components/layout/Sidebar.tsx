import { HomeIcon, DocumentTextIcon, BriefcaseIcon, UserIcon, Cog6ToothIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"

export default function Sidebar() {
  const items = [
    { icon: <HomeIcon className="w-5 h-5" />, label: "Dashboard", path: "/candidate/dashboard" },
    { icon: <DocumentTextIcon className="w-5 h-5" />, label: "Applications", path: "/candidate/applications" },
    { icon: <BriefcaseIcon className="w-5 h-5" />, label: "Explore Jobs", path: "/candidate/explore-jobs" },
    { icon: <UserIcon className="w-5 h-5" />, label: "Profile", path: "/candidate/profile" },
    { icon: <Cog6ToothIcon className="w-5 h-5" />, label: "Settings", path: "/candidate/settings" },
  ]

  return (
    <aside className="w-64 bg-[#f0f8ff] text-black flex flex-col p-6 shadow-md">
      {/* Profile */}
      <div className="flex flex-col items-center mb-8">
        <img
          src="https://via.placeholder.com/80"
          alt="Profile"
          className="w-20 h-20 rounded-full border-2 border-black"
        />
        <h2 className="mt-3 font-semibold text-center">John Candidate</h2>
      </div>

      {/* Navigation */}
      <nav className="space-y-4">
        {items.map(({ icon, label, path }) => (
          <Link
            key={label}
            to={path}
            className="flex items-center gap-3 px-4 py-2 w-full rounded-md font-bold
                       bg-[#1062fe] text-white
                       border border-black
                       shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
                       hover:translate-y-[1px] hover:translate-x-[1px]
                       hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                       cursor-pointer transition"
          >
            {icon}
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
