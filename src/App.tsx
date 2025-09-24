import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./auth/AuthProvider"
import RequireAuth from "./auth/RequireAuth"

import Home from "./publicSite/pages/Home"
import SignIn from "./publicSite/pages/SignIn"
import SignUp from "./publicSite/pages/SignUp"
import CandidateDashboard from "./candidate/pages/Dashboard"
import EntityDashboard from "./entity/pages/Dashboard"
import AdminDashboard from "./Admin/pages/Dashboard"

import Applications from "./candidate/pages/Applications"
import ExploreJobs from "./candidate/pages/ExploreJobs"
import Profile from "./candidate/pages/Profile"
import Settings from "./candidate/pages/Settings"

export default function App() {

  
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Candidate-only */}
          <Route element={<RequireAuth allowedRoles={["candidate"]} />}>
            {/* Candidate-only */}
          <Route element={<RequireAuth allowedRoles={["candidate"]} />}>
            <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
            <Route path="/candidate/applications" element={<Applications />} />
            <Route path="/candidate/explore-jobs" element={<ExploreJobs />} />
            <Route path="/candidate/profile" element={<Profile />} />
            <Route path="/candidate/settings" element={<Settings />} />
          </Route>

          </Route>

          {/* Entity-only */}
          <Route element={<RequireAuth allowedRoles={["entity"]} />}>
            <Route path="/entity/dashboard" element={<EntityDashboard />} />
          </Route>

          {/* Admin-only */}
          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
