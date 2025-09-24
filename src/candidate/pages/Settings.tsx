import Sidebar from "../../components/layout/Sidebar"
import AppButton from "../../components/ui/AppButton"

export default function Settings() {
  return (
    <div className="flex min-h-screen bg-[#f5faff]">
      <Sidebar />

      <main className="flex-1 p-10">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        <div className="bg-white border border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] rounded-md p-6 space-y-6">
          <div>
            <h2 className="font-semibold mb-2">Account</h2>
            <AppButton>Change Password</AppButton>
          </div>

          <div>
            <h2 className="font-semibold mb-2">Notifications</h2>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked />
              Email Notifications
            </label>
          </div>

          <div>
            <h2 className="font-semibold mb-2">Danger Zone</h2>
            <AppButton>Sign Out</AppButton>
          </div>
        </div>
      </main>
    </div>
  )
}
