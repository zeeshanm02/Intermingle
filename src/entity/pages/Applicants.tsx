import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { supabase } from "../../lib/supabaseClient"
import EntitySidebar from "../components/layout/EntitySidebar"
import { Card } from "../../components/layout/Card"

type Application = {
  id: string
  submitted_at: string
  status: string
  score?: number
  profiles: {
    id: string
    full_name?: string
    email: string
  }[] | null
}

export default function Applicants() {
  const { id } = useParams<{ id: string }>() // matches /entity/job/:id/applicants
  const jobId = id
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log("Applicants.tsx mounted, jobId:", jobId)

    if (!jobId) {
      console.warn("⚠️ No jobId found in route params, skipping fetch")
      setLoading(false)
      return
    }

    const fetchApplications = async () => {
      const { data, error } = await supabase
        .from("applications")
        .select("id, submitted_at, status, score, profiles(id, full_name, email)")
        .eq("job_id", jobId)
        .order("score", { ascending: false })

      if (error) {
        console.error("❌ Error fetching applications:", error)
        setApplications([])
      } else {
        setApplications((data as unknown as Application[]) || [])
      }

      setLoading(false)
    }

    fetchApplications()
  }, [jobId])

  return (
    <div className="flex min-h-screen bg-[#f5faff]">
      <EntitySidebar />

      <main className="flex-1 p-10 ml-64">
        <h1 className="text-2xl font-bold mb-6">Job Applications</h1>

        {loading ? (
          <p>Loading applications...</p>
        ) : applications.length === 0 ? (
          <p className="text-gray-600">No applications yet for this job.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app) => {
              const candidate = app.profiles?.[0]
              return (
                <Card key={app.id} className="flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">
                      {candidate?.full_name || "Unnamed Candidate"}
                    </h2>
                    <p className="text-gray-600">{candidate?.email}</p>
                    <p className="text-sm font-medium text-gray-700">
                      Score: {app.score ?? "Pending"}%
                    </p>
                    <p className="text-sm font-medium text-gray-700">
                      Status: <span className="capitalize">{app.status}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Applied on {new Date(app.submitted_at).toLocaleDateString()}
                    </p>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
