import EntitySidebar from "../components/layout/EntitySidebar"

export default function Applicants() {
  return (
    <div className="flex min-h-screen bg-[#f5faff]">
      <EntitySidebar />
      <main className="flex-1 p-10">
        <h1 className="text-2xl font-bold mb-6">Applicants</h1>
        <p className="text-gray-600">Browse and review applicants for your job postings.</p>
      </main>
    </div>
  )
}
