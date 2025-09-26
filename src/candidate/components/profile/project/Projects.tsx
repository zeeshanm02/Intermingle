// src/candidate/components/profile/projects/ProjectsSection.tsx
import { useEffect, useState } from "react"
import Card from "../../CandidateCard"
import { FolderIcon, TrashIcon } from "@heroicons/react/24/outline"
import { supabase } from "../../../../lib/supabaseClient"
import {
  getProjects,
  addProject,
  deleteProject,
  uploadProjectImages,
  getProjectImages,
  type Project,
} from "../../../services/profileServices/projectsService"

type ProjectWithImages = Project & { images: { id: string; url: string }[] }

export default function ProjectsSection() {
  const [projects, setProjects] = useState<ProjectWithImages[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [newLink, setNewLink] = useState("")
  const [newFiles, setNewFiles] = useState<FileList | null>(null)

  // Fetch projects with their images
  const fetchData = async () => {
    const { data: user } = await supabase.auth.getUser()
    if (!user?.user) return

    const p = await getProjects(user.user.id)
    const projectsWithImgs = await Promise.all(
      p.map(async (proj) => {
        const imgs = await getProjectImages(proj.id)
        return { ...proj, images: imgs }
      })
    )

    setProjects(projectsWithImgs)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Add a new project
  const handleAdd = async () => {
    const { data: user } = await supabase.auth.getUser()
    if (!user?.user || !newTitle.trim()) return

    const project = await addProject(user.user.id, {
      title: newTitle.trim(),
      description: newDescription.trim(),
      link: newLink.trim() || undefined,
    })

    if (newFiles && newFiles.length > 0) {
      await uploadProjectImages(Array.from(newFiles), user.user.id, project.id)
    }

    setNewTitle("")
    setNewDescription("")
    setNewLink("")
    setNewFiles(null)
    setShowForm(false)
    fetchData()
  }

  // Delete project
  const handleDelete = async (id: string) => {
    await deleteProject(id)
    fetchData()
  }

  const gradients = [
    "bg-gradient-to-r from-indigo-50 to-blue-100",
    "bg-gradient-to-r from-green-50 to-emerald-100",
    "bg-gradient-to-r from-amber-50 to-orange-100",
    "bg-gradient-to-r from-pink-50 to-rose-100",
  ]

  return (
    <Card
      title="Personal Projects"
      icon={<FolderIcon className="w-5 h-5 text-indigo-600" />}
      addLabel={showForm ? "Cancel" : "Add Project"}
      onAddClick={() => setShowForm(!showForm)}
    >
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {projects.length > 0 ? (
            <div className="space-y-3">
              {projects.map((p, i) => (
                <article
                  key={p.id}
                  className={`relative flex items-start justify-between p-4 border border-black rounded-md shadow-[3px_3px_0px_rgba(0,0,0,1)] ${
                    gradients[i % gradients.length]
                  }`}
                >
                  {/* Delete Button */}
                  <div className="absolute top-2 right-2">
                    <button
                      type="button"
                      title="Delete"
                      onClick={() => handleDelete(p.id)}
                      className="p-1 rounded bg-red-500 text-white border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-red-600 transition"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Left: Info */}
                  <div className="flex-1 pr-4">
                    <div className="mb-1 flex items-center gap-2">
                      <FolderIcon className="w-5 h-5 text-indigo-600" />
                      <span className="text-lg font-bold">{p.title}</span>
                    </div>
                    <div className="text-sm text-gray-800">{p.description}</div>
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 underline mt-1 block"
                      >
                        {p.link}
                      </a>
                    )}
                  </div>

                  {/* Right: Images */}
                  {p.images && p.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 max-w-[200px]">
                      {p.images.map((img) => (
                        <img
                          key={img.id}
                          src={img.url}
                          alt={p.title}
                          className="rounded-md border border-black shadow-md max-h-24 object-cover"
                        />
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <p>No projects added yet.</p>
          )}

          {/* Add Project Form */}
          {showForm && (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleAdd()
              }}
              className="flex flex-col gap-3 mt-4"
            >
              <input
                type="text"
                placeholder="Project title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="border p-2 rounded bg-white border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                required
              />
              <textarea
                placeholder="Project description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="border p-2 rounded bg-white border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
              />
              <input
                type="url"
                placeholder="Project link (optional)"
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                className="border p-2 rounded bg-white border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
              />
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setNewFiles(e.target.files)}
                className="border p-2 rounded bg-white border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
              >
                Save Project
              </button>
            </form>
          )}
        </>
      )}
    </Card>
  )
}
