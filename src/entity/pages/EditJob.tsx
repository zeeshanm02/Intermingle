// src/entity/pages/EditJob.tsx
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { supabase } from "../../lib/supabaseClient"
import EntitySidebar from "../components/layout/EntitySidebar"
import PostJobForm from "../components/postJobs/PostJobForm"

type FormType = {
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
}

export default function EditJob() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState<FormType>({
    title: "",
    summary: "",
    location: "",
    remote: false,
    telework: false,
    salary_min: "",
    salary_max: "",
    duties: "",
    qualifications: "",
    education: "",
  })
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")

  // Fetch existing job
  useEffect(() => {
    const fetchJob = async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", id)
        .single()

      if (error) {
        console.error("Error fetching job:", error)
        setMessage("Error loading job.")
      } else if (data) {
        setForm({
          title: data.title,
          summary: data.summary,
          location: data.location,
          remote: data.remote,
          telework: data.telework,
          salary_min: data.salary_min,
          salary_max: data.salary_max,
          duties: data.duties,
          qualifications: data.qualifications,
          education: data.education,
        })
      }
      setLoading(false)
    }

    fetchJob()
  }, [id])

  const handleUpdate = async () => {
    setMessage("")
    const { error } = await supabase.from("jobs").update(form).eq("id", id)

    if (error) {
      console.error("Error updating job:", error)
      setMessage("Failed to update job.")
    } else {
      setMessage("Job updated successfully ✅")
      setTimeout(() => navigate(`/entity/job/${id}`), 1000)
    }
  }

  const handleCancel = () => {
    navigate("/entity/job-postings")
  }

  const handleDelete = async () => {
    const { error } = await supabase.from("jobs").delete().eq("id", id)
    if (error) {
      console.error("Error deleting job:", error)
      setMessage("Failed to delete job.")
    } else {
      navigate("/entity/job-postings")
    }
  }

  return (
    <div className="flex min-h-screen bg-[#f5faff]">
      <EntitySidebar />

      <main className="flex-1 p-10 ml-64">
        <h1 className="text-2xl font-bold mb-6">Edit Job</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {/* ✅ Use form fields only (no Post Job button) */}
            <PostJobForm form={form} setForm={setForm} />

            {/* Action buttons */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleUpdate}
                className="px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-2 bg-gray-400 text-white rounded-md shadow hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-6 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700 transition"
              >
                Delete Job
              </button>
            </div>

            {message && <p className="mt-4 text-gray-700">{message}</p>}
          </>
        )}
      </main>
    </div>
  )
}
