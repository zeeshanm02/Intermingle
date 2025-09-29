import EntitySidebar from "../components/layout/EntitySidebar"

export default function EntityDashboard() {
  return (
    <div className="flex min-h-screen bg-[#f5faff]">
      <EntitySidebar />

      <main className="flex-1 p-10">
        <h1 className="text-2xl font-bold mb-6">Entity Dashboard</h1>
        <p className="text-gray-600">
          Welcome to your organization’s dashboard. Here you can see an overview of job postings and candidates.
        </p>
      </main>
    </div>
  )
}
