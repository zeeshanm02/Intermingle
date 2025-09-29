import EntitySidebar from "../components/layout/EntitySidebar"
import { Card } from "../../components/layout/Card"
import PostJobForm from "../components/postJobs/PostJobForm"
import JobPreview from "../components/postJobs/JobPreview"
import { useState } from "react"

export default function PostJob() {
  const [form, setForm] = useState({
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

  return (
    <div className="flex min-h-screen bg-[#f5faff]">
      <EntitySidebar />

      <main className="flex-1 p-10 ml-64">
        <h1 className="text-2xl font-bold mb-6">Post a Job</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form on left */}
          <Card className="p-6">
            <PostJobForm form={form} setForm={setForm} />
          </Card>

          {/* Preview on right */}
          <Card className="p-6">
            <JobPreview form={form} />
          </Card>
        </div>
      </main>
    </div>
  )
}
