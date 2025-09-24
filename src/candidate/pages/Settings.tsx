// candidate/pages/Settings.tsx
import { useState } from "react"
import { supabase } from "../../lib/supabaseClient"
import { Card } from "../../components/layout/Card"
import Button from "../../components/ui/Button"
import Sidebar from "../components/layout/Sidebar"

export default function Settings() {
  const [newEmail, setNewEmail] = useState("")
  const [confirmEmail, setConfirmEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  // 📧 Update email
  const handleUpdateEmail = async () => {
    if (newEmail !== confirmEmail) {
      setMessage("Emails do not match")
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.updateUser({ email: newEmail })
    setLoading(false)

    if (error) {
      setMessage(error.message)
    } else {
      setMessage("Email updated! Please log in again.")
      await supabase.auth.signOut()
      // force full refresh to clear session properly
      window.location.replace("/signin")
    }
  }

  // 🔑 Update password
  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match")
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    setLoading(false)

    if (error) {
      setMessage(error.message)
    } else {
      setMessage("Password updated! Please log in again.")
      await supabase.auth.signOut()
      window.location.replace("/signin")
    }
  }

  // 🚪 Log out
  const handleLogout = async () => {
  await supabase.auth.signOut()

  // Hard reset Supabase state
  localStorage.removeItem("supabase.auth.token")
  sessionStorage.clear()

  // Force full reload
  window.location.replace("/signin")
}


  // ❌ Delete account
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    )
    if (!confirmDelete) return

    // 👉 NOTE: to fully delete the user from Supabase auth + your own tables,
    // you’ll need a backend function with admin rights.
    await supabase.auth.signOut()
    window.location.replace("/")
  }

  return (
    <div className="flex min-h-screen bg-[#f5faff]">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-12 space-y-12">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        {message && (
          <p className="text-sm text-red-600 bg-red-100 border border-red-300 rounded p-3 max-w-xl">
            {message}
          </p>
        )}

        {/* Change Email */}
        <Card title="Change Email" className="p-8 rounded-xl shadow-md bg-white max-w-2xl">
          <div className="space-y-5">
            <input
              type="email"
              placeholder="New Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              placeholder="Confirm New Email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex justify-end">
              <Button onClick={handleUpdateEmail} disabled={loading}>
                Update Email
              </Button>
            </div>
          </div>
        </Card>

        {/* Change Password */}
        <Card title="Change Password" className="p-8 rounded-xl shadow-md bg-white max-w-2xl">
          <div className="space-y-5">
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex justify-end">
              <Button onClick={handleUpdatePassword} disabled={loading}>
                Update Password
              </Button>
            </div>
          </div>
        </Card>

        {/* Account Management */}
        <Card title="Account Management" className="p-8 rounded-xl shadow-md bg-white max-w-2xl">
          <div className="flex flex-col gap-4">
            <Button
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              Log Out
            </Button>
          </div>
        </Card>
      </main>
    </div>
  )
}
