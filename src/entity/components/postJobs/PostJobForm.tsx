import { supabase } from "../../../lib/supabaseClient"
import Button from "../../../components/ui/Button"
import { useState } from "react"

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

export default function PostJobForm({
  form,
  setForm,
}: {
  form: FormType
  setForm: React.Dispatch<React.SetStateAction<FormType>>
}) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const { error } = await supabase.from("jobs").insert([form])
    if (error) {
      console.error(error)
      setMessage("❌ Failed to post job.")
    } else {
      setMessage("✅ Job posted successfully!")
      setForm({
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
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Job Title */}
      <div>
        <label className="block font-semibold mb-2">Job Title *</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          required
        />
      </div>

      {/* Summary */}
      <div>
        <label className="block font-semibold mb-2">Summary *</label>
        <textarea
          name="summary"
          value={form.summary}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          rows={4}
          required
        />
      </div>

      {/* Location */}
      <div>
        <label className="block font-semibold mb-2">Location *</label>
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          required
        />
        <div className="flex gap-6 mt-3">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="remote"
              checked={form.remote}
              onChange={handleChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Remote Job
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="telework"
              checked={form.telework}
              onChange={handleChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Telework Eligible
          </label>
        </div>
      </div>

      {/* Salary */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold mb-2">Salary Min</label>
          <input
            type="number"
            name="salary_min"
            value={form.salary_min}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Salary Max</label>
          <input
            type="number"
            name="salary_max"
            value={form.salary_max}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>
      </div>

      {/* Duties */}
      <div>
        <label className="block font-semibold mb-2">Duties</label>
        <textarea
          name="duties"
          value={form.duties}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          rows={5}
        />
      </div>

      {/* Qualifications */}
      <div>
        <label className="block font-semibold mb-2">Qualifications</label>
        <textarea
          name="qualifications"
          value={form.qualifications}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          rows={5}
        />
      </div>

      {/* Education */}
      <div>
        <label className="block font-semibold mb-2">Education</label>
        <textarea
          name="education"
          value={form.education}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          rows={3}
        />
      </div>

      {/* Submit */}
      <Button type="submit" disabled={loading}>
        {loading ? "Posting..." : "Post Job"}
      </Button>

      {message && (
        <div
          className={`mt-4 px-4 py-2 rounded-md ${
            message.startsWith("✅")
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </div>
      )}
    </form>
  )
}
