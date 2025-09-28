import EntitySidebar from "../components/layout/EnttitySidebar"

export default function PostJob() {
  return (
    <div className="flex min-h-screen bg-[#f5faff]">
      <EntitySidebar />

      <main className="flex-1 p-10">
        <h1 className="text-2xl font-bold mb-6">Post a Job</h1>
        <p className="text-gray-600">
          Use this page to create and publish new job opportunities.
        </p>
      </main>
    </div>
  )
}
