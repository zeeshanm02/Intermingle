import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import {
  getEducation,
  addEducation,
  updateEducation,
  deleteEducation,
  type Education as DbEducation,
} from "../../services/profile/educationService"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/Button"

// Extend DB type with UI-only fields
type EducationUI = DbEducation & { isEditing?: boolean }

export default function EducationTab() {
  const [education, setEducation] = useState<EducationUI[]>([])
  const [loading, setLoading] = useState(true)

  // Load education records
  useEffect(() => {
    const fetchData = async () => {
      const user = (await supabase.auth.getUser()).data.user
      if (!user) return
      const data = await getEducation()
      // Add isEditing=false to each record
      setEducation(data.map((e) => ({ ...e, isEditing: false })))
      setLoading(false)
    }
    fetchData()
  }, [])

  const handleChange = <K extends keyof EducationUI>(
    index: number,
    field: K,
    value: EducationUI[K]
  ) => {
    const updated = [...education]
    updated[index][field] = value
    setEducation(updated)
  }

  const handleSave = async (index: number) => {
    const user = (await supabase.auth.getUser()).data.user
    if (!user) return

    const edu = education[index]
    let saved: DbEducation

    if (edu.id) {
      saved = await updateEducation(edu.id, edu)
    } else {
      saved = await addEducation(edu)
    }

    const updated = [...education]
    updated[index] = { ...saved, isEditing: false }
    setEducation(updated)
  }

  const addNewEducation = () => {
    setEducation([
      ...education,
      {
        id: "",
        profile_id: "",
        school: "",
        program: "",
        start_date: "",
        end_date: "",
        gpa: "",
        description: "",
        isEditing: true,
      },
    ])
  }

  const toggleEdit = (index: number) => {
    const updated = [...education]
    updated[index].isEditing = !updated[index].isEditing
    setEducation(updated)
  }

  const handleDelete = async (id: string, index: number) => {
    if (id) await deleteEducation(id)
    setEducation(education.filter((_, i) => i !== index))
  }

  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-xl font-semibold">Education</h2>
      <p className="text-gray-600">Add your academic background.</p>

      {loading ? (
        <p className="text-gray-500 italic">Loading...</p>
      ) : (
        education.map((edu, index) => (
          <div key={edu.id || index} className="border-b pb-4 mb-4">
            {edu.isEditing ? (
              // --- EDIT MODE ---
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSave(index)
                }}
                className="space-y-4"
              >
                {/* School */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    School / University
                  </label>
                  <input
                    type="text"
                    value={edu.school || ""}
                    onChange={(e) => handleChange(index, "school", e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    placeholder="e.g. Stanford University"
                  />
                </div>

                {/* Program */}
                <div>
                  <label className="block text-sm font-medium mb-1">Program</label>
                  <input
                    type="text"
                    value={edu.program || ""}
                    onChange={(e) => handleChange(index, "program", e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    placeholder="e.g. Bachelor of Science, Computer Science"
                  />
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Start Date</label>
                    <input
                      type="date"
                      value={edu.start_date || ""}
                      onChange={(e) =>
                        handleChange(index, "start_date", e.target.value)
                      }
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">End Date</label>
                    <input
                      type="date"
                      value={edu.end_date || ""}
                      onChange={(e) => handleChange(index, "end_date", e.target.value)}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                </div>

                {/* GPA */}
                <div>
                  <label className="block text-sm font-medium mb-1">GPA (optional)</label>
                  <input
                    type="text"
                    value={edu.gpa || ""}
                    onChange={(e) => handleChange(index, "gpa", e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    placeholder="e.g. 3.9"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description (optional)
                  </label>
                  <textarea
                    value={edu.description || ""}
                    onChange={(e) => handleChange(index, "description", e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    rows={3}
                    placeholder="Honors, thesis, key achievements..."
                  />
                </div>

                <div className="flex justify-between">
                  <Button type="submit">Save</Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="text-red-600"
                    onClick={() => handleDelete(edu.id, index)}
                  >
                    Remove
                  </Button>
                </div>
              </form>
            ) : (
              // --- VIEW MODE ---
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">
                    {edu.school || "Untitled School"}
                  </h3>
                  <Button variant="outline" onClick={() => toggleEdit(index)}>
                    Edit
                  </Button>
                </div>
                <p className="text-gray-700">{edu.program}</p>
                <p className="text-gray-500 text-sm">
                  {edu.start_date} – {edu.end_date || "Present"}
                </p>
                {edu.gpa && (
                  <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>
                )}
                <p className="text-gray-700 mt-2">{edu.description}</p>
              </div>
            )}
          </div>
        ))
      )}

      <Button variant="outline" onClick={addNewEducation}>
        + Add Another
      </Button>
    </Card>
  )
}
