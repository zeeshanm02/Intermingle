import EntitySidebar from "../components/layout/EnttitySidebar"

export default function Listings() {
  return (
    <div className="flex min-h-screen bg-[#f5faff]">
      <EntitySidebar />

      <main className="flex-1 p-10">
        <h1 className="text-2xl font-bold mb-6">Manage Listings</h1>
        <p className="text-gray-600">
          View and manage all the jobs your organization has posted.
        </p>
      </main>
    </div>
  )
}
