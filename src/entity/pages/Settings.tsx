import EntitySidebar from "../components/layout/EnttitySidebar"

export default function EntitySettings() {
  return (
    <div className="flex min-h-screen bg-[#f5faff]">
      <EntitySidebar />

      <main className="flex-1 p-10">
        <h1 className="text-2xl font-bold mb-6">Entity Settings</h1>
        <p className="text-gray-600">
          Update your organization details and account settings here.
        </p>
      </main>
    </div>
  )
}
