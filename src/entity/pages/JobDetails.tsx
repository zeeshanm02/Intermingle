// src/entity/pages/JobDetails.tsx
import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { supabase } from "../../lib/supabaseClient"
import EntitySidebar from "../components/layout/EntitySidebar"

type Job = {
  id: string
  title: string
  summary: string
  location: string
  remote: boolean
  telework: boolean
  salary_min: string
  salary_max: string
  duties: string
  qualifications: string
  education: string
  created_at: string
}

export default function JobDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchJob = async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", id)
        .single()

      if (error) {
        console.error("Error fetching job:", error)
      } else {
        setJob(data)
      }
      setLoading(false)
    }

    fetchJob()
  }, [id])

  return (
    <div className="flex min-h-screen bg-[#f5faff]">
      <EntitySidebar />

      <main className="flex-1 p-10 ml-64">
        <button
          onClick={() => navigate("/entity/job-postings")}
          className="mb-6 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded-md shadow"
        >
          ← Back to Job Postings
        </button>

        {loading ? (
          <p>Loading job details...</p>
        ) : !job ? (
          <p className="text-red-600">Job not found.</p>
        ) : (
          <div className="bg-white border rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold mb-3">{job.title}</h1>
            <p className="text-gray-700 mb-4">{job.summary}</p>

            <div className="space-y-2 text-sm text-gray-600">
              <p>
                📍 <span className="font-medium">{job.location}</span>
                {job.remote && <span className="ml-2">🌐 Remote</span>}
                {job.telework && <span className="ml-2">🏠 Telework</span>}
              </p>
              <p>
                💰 <span className="font-medium">${job.salary_min} – ${job.salary_max}</span>
              </p>
              <p>
                📅 Posted on:{" "}
                {new Date(job.created_at).toLocaleDateString()}
              </p>
            </div>

            {/* Extra sections */}
            <div className="mt-6 space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Duties</h2>
                <p className="text-gray-700">{job.duties || "Not provided."}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Qualifications</h2>
                <p className="text-gray-700">{job.qualifications || "Not provided."}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Education</h2>
                <p className="text-gray-700">{job.education || "Not provided."}</p>
              </div>
            </div>

            {/* Edit link */}
            <div className="mt-6">
              <Link
                to={`/entity/job/${job.id}/edit`}
                className="px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
              >
                Edit Job
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
