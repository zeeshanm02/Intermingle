import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/Button"

type Experience = {
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  isCurrent: boolean
  description: string
  isEditing: boolean
}

export default function ExperienceTab() {
  const [experiences, setExperiences] = useState<Experience[]>([
    { title: "", company: "", location: "", startDate: "", endDate: "", isCurrent: false, description: "", isEditing: true }
  ])

  const handleChange = <K extends keyof Experience>(
    index: number,
    field: K,
    value: Experience[K]
  ) => {
    const updated = [...experiences]
    updated[index][field] = value
    setExperiences(updated)
  }

  const addExperience = () => {
    setExperiences([
      ...experiences,
      { title: "", company: "", location: "", startDate: "", endDate: "", isCurrent: false, description: "", isEditing: true }
    ])
  }

  const toggleEdit = (index: number) => {
    const updated = [...experiences]
    updated[index].isEditing = !updated[index].isEditing
    setExperiences(updated)
  }

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index))
  }

  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-xl font-semibold">Experience</h2>
      <p className="text-gray-600">Add your work and internship experiences.</p>

      {experiences.map((exp, index) => (
        <div key={index} className="border-b pb-4 mb-4">
          {exp.isEditing ? (
            // --- EDIT MODE ---
            <form
              onSubmit={(e) => {
                e.preventDefault()
                toggleEdit(index)
              }}
              className="space-y-4"
            >
              {/* Job Title */}
              <div>
                <label className="block text-sm font-medium mb-1">Job Title</label>
                <input
                  type="text"
                  value={exp.title}
                  onChange={(e) => handleChange(index, "title", e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="e.g. Software Engineer"
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium mb-1">Company</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => handleChange(index, "company", e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="e.g. Google"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  value={exp.location}
                  onChange={(e) => handleChange(index, "location", e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="e.g. Remote / New York, NY"
                />
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <input
                    type="date"
                    value={exp.startDate}
                    onChange={(e) => handleChange(index, "startDate", e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Date</label>
                  <input
                    type="date"
                    value={exp.endDate}
                    onChange={(e) => handleChange(index, "endDate", e.target.value)}
                    disabled={exp.isCurrent}
                    className="w-full border rounded px-3 py-2"
                  />
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={exp.isCurrent}
                      onChange={(e) => handleChange(index, "isCurrent", e.target.checked)}
                    />
                    <label className="text-sm">I currently work here</label>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={exp.description}
                  onChange={(e) => handleChange(index, "description", e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  rows={3}
                  placeholder="Describe your responsibilities and achievements..."
                />
              </div>

              <div className="flex justify-between">
                <Button type="submit">Save</Button>
                {experiences.length > 1 && (
                  <Button variant="outline" className="text-red-600" onClick={() => removeExperience(index)}>
                    Remove
                  </Button>
                )}
              </div>
            </form>
          ) : (
            // --- VIEW MODE ---
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{exp.title || "Untitled Role"}</h3>
                <Button variant="outline" onClick={() => toggleEdit(index)}>
                  Edit
                </Button>
              </div>
              <p className="text-gray-700">{exp.company}</p>
              <p className="text-gray-500 text-sm">
                {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate || "N/A"}
              </p>
              <p className="text-gray-600 text-sm">{exp.location}</p>
              <p className="text-gray-700 mt-2">{exp.description}</p>
            </div>
          )}
        </div>
      ))}

      <Button variant="outline" onClick={addExperience}>
        + Add Another
      </Button>
    </Card>
  )
}
