import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./auth/AuthProvider"
import RequireAuth from "./auth/RequireAuth"

// Public
import Home from "./publicSite/pages/Home"
import SignIn from "./publicSite/pages/SignIn"
import SignUp from "./publicSite/pages/SignUp"

// Candidate
import CandidateDashboard from "./candidate/pages/Dashboard"
import Applications from "./candidate/pages/Applications"
import ExploreJobs from "./candidate/pages/ExploreJobs"
import Profile from "./candidate/pages/Profile"
import Settings from "./candidate/pages/Settings"
import CandidateJobDetails from "./candidate/pages/JobDetails"   // ✅ NEW

// Entity
import EntityDashboard from "./entity/pages/Dashboard"
import PostJob from "./entity/pages/PostJob"
import JobPostings from "./entity/pages/JobPostings"
import Applicants from "./entity/pages/Applicants"
import EntitySettings from "./entity/pages/Settings"
import JobDetails from "./entity/pages/JobDetails"
import EditJob from "./entity/pages/EditJob"

// Admin
import AdminDashboard from "./Admin/pages/Dashboard"

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
            <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
            <Route path="/candidate/applications" element={<Applications />} />
            <Route path="/candidate/explore-jobs" element={<ExploreJobs />} />
            <Route path="/candidate/job/:id" element={<CandidateJobDetails />} /> {/* ✅ NEW */}
            <Route path="/candidate/profile" element={<Profile />} />
            <Route path="/candidate/settings" element={<Settings />} />
          </Route>

          {/* Entity-only */}
          <Route element={<RequireAuth allowedRoles={["entity"]} />}>
            <Route path="/entity/dashboard" element={<EntityDashboard />} />
            <Route path="/entity/post-job" element={<PostJob />} />
            <Route path="/entity/job-postings" element={<JobPostings />} />
            <Route path="/entity/job/:id" element={<JobDetails />} />
            <Route path="/entity/job/:id/edit" element={<EditJob />} />
            <Route path="/entity/applicants" element={<Applicants />} />
            <Route path="/entity/settings" element={<EntitySettings />} />
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
