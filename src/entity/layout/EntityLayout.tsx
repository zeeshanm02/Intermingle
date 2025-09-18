import { Link, Outlet } from "react-router-dom"

export default function EntityLayout() {
  return (
    <div className="min-h-screen grid grid-cols-[220px_1fr]">
      <aside className="border-r p-4 space-y-3">
        <div className="text-lg font-semibold">Entity (Staff)</div>
        <nav className="flex flex-col gap-2">
          <Link to="/entity" className="hover:underline">Dashboard</Link>
          <Link to="/entity/jobs" className="hover:underline">Jobs</Link>
          <Link to="/entity/jobs/new" className="hover:underline">Post Job</Link>
          <Link to="/entity/applications" className="hover:underline">Applications</Link>
        </nav>
      </aside>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}
