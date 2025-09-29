// src/entity/pages/JobPostings.tsx
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabaseClient"
import { Card } from "../../components/layout/Card"
import EntitySidebar from "../components/layout/EntitySidebar"
import {
  ListBulletIcon,
  Squares2X2Icon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  UsersIcon,
} from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"

type Job = {
  id: string
  title: string
  summary: string
  location: string
  remote: boolean
  telework: boolean
  salary_min: string
  salary_max: string
  created_at: string
}

export default function JobPostings() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"row" | "block">("row")
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
      job.summary.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex min-h-screen bg-[#f5faff]">
      {/* Sidebar */}
      <EntitySidebar />

      {/* Main */}
      <main className="flex-1 p-10 ml-64">
        {/* Header */}
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-2xl font-bold mb-6">My Job Postings</h1>

          {/* Search */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="relative w-full max-w-7xl"
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search jobs..."
              className="pl-14 pr-16 py-4 border rounded-2xl shadow-md w-full text-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <MagnifyingGlassIcon className="w-7 h-7 text-gray-400 absolute left-5 top-4" />
            <button
              type="submit"
              className="absolute right-4 top-2.5 px-4 py-1.5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Search
            </button>
          </form>

          {/* View toggle */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setViewMode("row")}
              className={`p-3 rounded-lg border shadow-sm ${
                viewMode === "row"
                  ? "bg-blue-600 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              <ListBulletIcon className="w-6 h-6" />
            </button>
            <button
              onClick={() => setViewMode("block")}
              className={`p-3 rounded-lg border shadow-sm ${
                viewMode === "block"
                  ? "bg-blue-600 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              <Squares2X2Icon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Jobs list */}
        {loading ? (
          <p>Loading jobs...</p>
        ) : filteredJobs.length === 0 ? (
          <p className="text-gray-600">No jobs match your search.</p>
        ) : viewMode === "row" ? (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="relative p-6 hover:shadow-lg transition">
                {/* Edit Icon */}
                <Link
                  to={`/entity/job/${job.id}/edit`}
                  className="absolute top-3 right-3 text-blue-600 hover:text-blue-800"
                  title="Edit Job"
                >
                  <PencilSquareIcon className="w-6 h-6" />
                </Link>

                {/* Job Info */}
                <Link to={`/entity/job/${job.id}`}>
                  <h2 className="text-lg font-semibold">{job.title}</h2>
                  <p className="text-gray-700 mb-2">{job.summary}</p>
                  <p className="text-sm text-gray-600">
                    📍 {job.location}{" "}
                    {job.remote && <span className="ml-2">🌐 Remote</span>}
                    {job.telework && <span className="ml-2">🏠 Telework</span>}
                  </p>
                  <p className="text-sm font-medium mt-2">
                    💰 ${job.salary_min} – ${job.salary_max}
                  </p>
                </Link>

                {/* View Applicants button */}
                <div className="mt-4">
                  <Link
                    to={`/entity/job/${job.id}/applicants`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition"
                  >
                    <UsersIcon className="w-5 h-5" />
                    View Applicants
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="relative p-6 hover:shadow-lg transition">
                {/* Edit Icon */}
                <Link
                  to={`/entity/job/${job.id}/edit`}
                  className="absolute top-3 right-3 text-blue-600 hover:text-blue-800"
                  title="Edit Job"
                >
                  <PencilSquareIcon className="w-6 h-6" />
                </Link>

                {/* Job Info */}
                <Link to={`/entity/job/${job.id}`}>
                  <h2 className="text-lg font-semibold mb-1">{job.title}</h2>
                  <p className="text-gray-700 mb-2">{job.summary}</p>
                  <p className="text-sm text-gray-600">
                    📍 {job.location}{" "}
                    {job.remote && <span className="ml-2">🌐 Remote</span>}
                    {job.telework && <span className="ml-2">🏠 Telework</span>}
                  </p>
                  <p className="text-sm font-medium mt-2">
                    💰 ${job.salary_min} – ${job.salary_max}
                  </p>
                </Link>

                {/* View Applicants button */}
                <div className="mt-4">
                  <Link
                    to={`/entity/job/${job.id}/applicants`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition"
                  >
                    <UsersIcon className="w-5 h-5" />
                    View Applicants
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
