import Sidebar from "../components/layout/Sidebar"
import { useSettings } from "../hooks/useSettings"
import ChangeEmail from "../components/settings/ChangeEmail"
import ChangePassword from "../components/settings/ChangePassword"
import AccountActions from "../components/settings/AccountActions"
import MessageBanner from "../components/settings/MessageBanner"

export default function SettingsPage() {
  const { loading, message, updateEmail, updatePassword, logout } = useSettings()

  return (
    <div className="flex min-h-screen bg-[#f5faff]">
      <div className="w-64 bg-white shadow-md">
        <Sidebar />
      </div>

      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
          {/* Left Column */}
          <div className="space-y-8">
            <ChangeEmail updateEmail={updateEmail} loading={loading} />
            <ChangePassword updatePassword={updatePassword} loading={loading} />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <AccountActions logout={logout}/>
          </div>
        </div>
      </main>

    </div>
  )
}
