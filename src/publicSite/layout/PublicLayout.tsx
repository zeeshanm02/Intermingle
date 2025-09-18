import { Outlet } from "react-router-dom"

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-white">
      {/* No Navbar or Sidebar here */}
      <Outlet />
    </div>
  )
}
