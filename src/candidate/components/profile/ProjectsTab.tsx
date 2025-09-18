import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/Button"

type Project = {
  title: string
  description: string
  technologies: string[]
  techInput: string
  link?: string
  role?: string
  photos: string[] // 👈 multiple uploaded photo URLs
  isEditing: boolean
}

export default function ProjectsTab() {
  const [projects, setProjects] = useState<Project[]>([
    { title: "", description: "", technologies: [], techInput: "", link: "", role: "", photos: [], isEditing: true }
  ])

  const handleChange = <K extends keyof Project>(index: number, field: K, value: Project[K]) => {
    const updated = [...projects]
    updated[index][field] = value
    setProjects(updated)
  }

  const addProject = () => {
    setProjects([
      ...projects,
      { title: "", description: "", technologies: [], techInput: "", link: "", role: "", photos: [], isEditing: true }
    ])
  }

  const toggleEdit = (index: number) => {
    const updated = [...projects]
    updated[index].isEditing = !updated[index].isEditing
    setProjects(updated)
  }

  const removeProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index))
  }

  const addTechnology = (index: number) => {
    const updated = [...projects]
    if (updated[index].techInput.trim() && !updated[index].technologies.includes(updated[index].techInput)) {
      updated[index].technologies.push(updated[index].techInput.trim())
      updated[index].techInput = ""
    }
    setProjects(updated)
  }

  const removeTechnology = (index: number, tech: string) => {
    const updated = [...projects]
    updated[index].technologies = updated[index].technologies.filter((t) => t !== tech)
    setProjects(updated)
  }

  const handlePhotoUpload = (index: number, files: FileList | null) => {
    if (!files) return
    const updated = [...projects]
    const photoUrls = Array.from(files).map((file) => URL.createObjectURL(file))
    updated[index].photos.push(...photoUrls)
    setProjects(updated)
  }

  const removePhoto = (index: number, url: string) => {
    const updated = [...projects]
    updated[index].photos = updated[index].photos.filter((photo) => photo !== url)
    setProjects(updated)
  }

  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-xl font-semibold">Projects</h2>
      <p className="text-gray-600">Showcase your personal, academic, or campaign projects.</p>

      {projects.map((proj, index) => (
        <div key={index} className="border-b pb-4 mb-4">
          {proj.isEditing ? (
            // --- EDIT MODE ---
            <form
              onSubmit={(e) => {
                e.preventDefault()
                toggleEdit(index)
              }}
              className="space-y-4"
            >
              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-1">Project Title</label>
                <input
                  type="text"
                  value={proj.title}
                  onChange={(e) => handleChange(index, "title", e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="e.g. Robotics Challenge, Marketing Campaign"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={proj.description}
                  onChange={(e) => handleChange(index, "description", e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  rows={3}
                  placeholder="Briefly describe your project..."
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium mb-1">Your Role</label>
                <input
                  type="text"
                  value={proj.role}
                  onChange={(e) => handleChange(index, "role", e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="e.g. Team Lead, Designer"
                />
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-sm font-medium mb-1">Technologies / Tools Used</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={proj.techInput}
                    onChange={(e) => handleChange(index, "techInput", e.target.value)}
                    className="flex-1 border rounded px-3 py-2"
                    placeholder="e.g. React, AutoCAD"
                  />
                  <Button type="button" onClick={() => addTechnology(index)}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {proj.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTechnology(index, tech)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Link */}
              <div>
                <label className="block text-sm font-medium mb-1">Project Link (optional)</label>
                <input
                  type="url"
                  value={proj.link}
                  onChange={(e) => handleChange(index, "link", e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="https://github.com/username/project or https://yourproject.com"
                />
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium mb-1">Upload Photos (optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handlePhotoUpload(index, e.target.files)}
                  className="w-full text-sm text-gray-600
                    file:mr-4 file:py-2 file:px-4
                    file:rounded file:border-0
                    file:text-sm file:font-semibold
                    file:bg-purple-50 file:text-purple-700
                    hover:file:bg-purple-100"
                />
                {proj.photos.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3">
                    {proj.photos.map((photo) => (
                      <div key={photo} className="relative">
                        <img
                          src={photo}
                          alt="Project Photo"
                          className="h-32 w-full object-cover rounded border"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index, photo)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <Button type="submit">Save</Button>
                {projects.length > 1 && (
                  <Button variant="outline" className="text-red-600" onClick={() => removeProject(index)}>
                    Remove
                  </Button>
                )}
              </div>
            </form>
          ) : (
            // --- VIEW MODE ---
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{proj.title || "Untitled Project"}</h3>
                <Button variant="outline" onClick={() => toggleEdit(index)}>
                  Edit
                </Button>
              </div>
              {proj.photos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                  {proj.photos.map((photo) => (
                    <img
                      key={photo}
                      src={photo}
                      alt="Project"
                      className="h-32 w-full object-cover rounded border"
                    />
                  ))}
                </div>
              )}
              <p className="text-gray-700">{proj.description}</p>
              {proj.role && <p className="text-gray-600 text-sm">Role: {proj.role}</p>}
              {proj.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {proj.technologies.map((tech) => (
                    <span key={tech} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              {proj.link && (
                <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  View Project
                </a>
              )}
            </div>
          )}
        </div>
      ))}

      <Button variant="outline" onClick={addProject}>
        + Add Another
      </Button>
    </Card>
  )
}
