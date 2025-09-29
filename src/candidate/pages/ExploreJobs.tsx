// src/candidate/pages/ExploreJobs.tsx
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabaseClient"
import CandidateSidebar from "../components/layout/CandidateSidebar"
import { Card } from "../../components/layout/Card"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"

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
}

export default function ExploreJobs() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching jobs:", error)
      } else {
        setJobs(data || [])
      }
      setLoading(false)
    }

    fetchJobs()
  }, [])

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      (job.company || "").toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex min-h-screen bg-[#f5faff]">
      <CandidateSidebar />

      <main className="flex-1 p-10 ml-64">
        <h1 className="text-2xl font-bold mb-6">Explore Jobs</h1>

        {/* Search bar */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-5xl">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search jobs by title, company, or location..."
              className="pl-12 pr-4 py-4 border rounded-2xl shadow-md w-full text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-400 absolute left-4 top-4" />
          </div>
        </div>

        {loading ? (
          <p>Loading jobs...</p>
        ) : filteredJobs.length === 0 ? (
          <p className="text-gray-600">No jobs match your search.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{job.title}</h2>
                  <p className="text-gray-600">{job.company || "Company Name"}</p>
                  <p className="text-sm text-gray-500 mb-2">📍 {job.location}</p>

                  {/* Remote/Telework badges */}
                  <div className="flex gap-2 mb-2">
                    {job.remote && (
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                        🌐 Remote
                      </span>
                    )}
                    {job.telework && (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                        🏠 Telework
                      </span>
                    )}
                  </div>

                  {/* Salary */}
                  <p className="text-sm font-medium text-gray-700">
                    💰 ${job.salary_min} – ${job.salary_max}
                  </p>
                </div>

                {/* More Info button */}
                <div className="mt-4">
                  <Link
                    to={`/candidate/job/${job.id}`}
                    className="block text-center px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
                  >
                    More Info
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
