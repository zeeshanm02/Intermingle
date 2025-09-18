import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./auth/AuthProvider"
import RequireAuth from "./auth/RequireAuth"

// layouts
import PublicLayout from "./publicSite/layout/PublicLayout"
import CandidateLayout from "./candidate/layout/CandidateLayout"

// public pages
import Home from "./publicSite/pages/Home"
import SignIn from "./publicSite/pages/SignIn"
import SignUp from "./publicSite/pages/SignUp"

// candidate pages
import CandidateDashboard from "./candidate/pages/Dashboard"
import Applications from "./candidate/pages/Applications"
import Jobs from "./candidate/pages/Jobs"
import Profile from "./candidate/pages/Profile"

// other pages
import NotFound from "./pages/NotFound"
import NotPermitted from "./pages/NotPermitted"

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public site */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          {/* Candidate area */}
          <Route
            element={
              <RequireAuth>
                <CandidateLayout />
              </RequireAuth>
            }
          >
            <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
            <Route path="/candidate/applications" element={<Applications />} />
            <Route path="/candidate/jobs" element={<Jobs />} />
            <Route path="/candidate/profile" element={<Profile />} />
          </Route>

          {/* Fallbacks */}
          <Route path="/not-permitted" element={<NotPermitted />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
