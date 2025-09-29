// src/candidate/pages/Applications.tsx
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabaseClient"
import CandidateSidebar from "../components/layout/CandidateSidebar"
import { Card } from "../../components/layout/Card"
import { Link } from "react-router-dom"

type Application = {
  id: string
  submitted_at: string
  status: string
  score?: number
  jobs: {
    id: string
    title: string
    location: string
  } | null
}

export default function Applications() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchApplications = async () => {
      const user = (await supabase.auth.getUser()).data.user
      if (!user) return

      const { data, error } = await supabase
        .from("applications")
        .select("id, submitted_at, status, score, jobs(id, title, location)")
        .eq("user_id", user.id)
        .order("submitted_at", { ascending: false })

      if (error) {
        console.error("Error fetching applications:", error)
      } else {
        if (data) {
          setApplications(data as unknown as Application[])
        } else {
          setApplications([])
        }
      }

      setLoading(false)
    }

    fetchApplications()
  }, [])

  return (
    <div className="flex min-h-screen bg-[#f5faff]">
      <CandidateSidebar />

      <main className="flex-1 p-10 ml-64">
        <h1 className="text-2xl font-bold mb-6">My Applications</h1>

        {loading ? (
          <p>Loading applications...</p>
        ) : applications.length === 0 ? (
          <p className="text-gray-600">You haven’t applied to any jobs yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app) => (
              <Card key={app.id} className="flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{app.jobs?.title}</h2>
                  <p className="text-sm text-gray-500 mb-2">
                    📍 {app.jobs?.location}
                  </p>

                  <p className="text-sm font-medium text-gray-700">
                    Status: <span className="capitalize">{app.status}</span>
                  </p>
                  <p className="text-sm font-medium text-gray-700">
                    Match Score: {app.score ?? "Pending"}%
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Submitted on{" "}
                    {new Date(app.submitted_at).toLocaleDateString()}
                  </p>
                </div>

                {/* View Job button */}
                {app.jobs && (
                  <div className="mt-4">
                    <Link
                      to={`/candidate/job/${app.jobs.id}`}
                      className="block text-center px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
                    >
                      View Job
                    </Link>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
