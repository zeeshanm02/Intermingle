import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { supabase } from "../../lib/supabaseClient"
import CandidateSidebar from "../components/layout/CandidateSidebar"
import { applyToJob } from "../services/applicationServices"

type Job = {
  id: string
  title: string
  summary: string
  location: string
  company?: string
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
  const [applying, setApplying] = useState(false)
  const [message, setMessage] = useState("")

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

  const handleApply = async () => {
    if (!job) return
    setApplying(true)
    setMessage("")

    try {
      await applyToJob(job)
      setMessage("✅ Application submitted successfully!")
    } catch (err: any) {
      console.error("Error applying:", err)
      setMessage("❌ Failed to submit application. Please complete your profile and try again.")
    } finally {
      setApplying(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-[#f5faff]">
      <CandidateSidebar />

      <main className="flex-1 p-10 ml-64">
        <button
          onClick={() => navigate("/candidate/explore-jobs")}
          className="mb-6 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded-md shadow"
        >
          ← Back to Explore Jobs
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
              <p>🏢 {job.company || "Company Name"}</p>
              <p>
                📍 {job.location}
                {job.remote && <span className="ml-2">🌐 Remote</span>}
                {job.telework && <span className="ml-2">🏠 Telework</span>}
              </p>
              <p>
                💰 ${job.salary_min} – ${job.salary_max}
              </p>
              <p>
                📅 Posted on {new Date(job.created_at).toLocaleDateString()}
              </p>
            </div>

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

            {/* Apply button */}
            <div className="mt-6">
              <button
                onClick={handleApply}
                disabled={applying}
                className={`px-6 py-2 rounded-md shadow transition ${
                  applying
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {applying ? "Applying..." : "Apply Now"}
              </button>
              {message && (
                <p
                  className={`mt-3 text-sm ${
                    message.startsWith("✅")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {message}
                </p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
