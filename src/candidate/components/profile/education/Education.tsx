import { useEffect, useState } from "react"
import Card from "../../CandidateCard"
import {
  BookOpenIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"
import {
  getEducation,
  deleteEducation,
  type Education,
} from "../../../services/profileServices/educationService"
import AddEducationForm from "./AddEducationForm"
import { useConfirm } from "../../../../components/ui/ConfirmProvider"
import { cardColors } from "../../../../utils/colors"

export default function EducationSection() {
  const [education, setEducation] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingEducation, setEditingEducation] = useState<Education | null>(null)
  const confirm = useConfirm()

  const fetchData = async () => {
    const data = await getEducation()
    setEducation(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleAddClick = () => {
    if (showForm) setEditingEducation(null)
    setShowForm(!showForm)
  }

  const handleDelete = async (item: Education) => {
    const ok = await confirm({
      title: "Delete this education entry?",
      message: (
        <>
          This will permanently remove <b>{item.degree}</b> at {item.school}.
        </>
      ),
      confirmLabel: "Delete",
      cancelLabel: "Cancel",
    })
    if (!ok) return
    await deleteEducation(item.id)
    fetchData()
  }

  return (
    <Card
      title="Education"
      icon={<BookOpenIcon className="w-5 h-5" />}
      addLabel={showForm ? "Cancel" : "Add Education"}
      onAddClick={handleAddClick}
    >
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {education.length > 0 ? (
            <div className="space-y-3">
              {education.map((e, i) => (
                <article
                  key={e.id}
                  className={`relative p-4 border border-black rounded-md shadow-[3px_3px_0px_rgba(0,0,0,1)] ${
                    cardColors[i % cardColors.length]
                  }`}
                >
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      type="button"
                      title="Edit"
                      onClick={() => {
                        setEditingEducation(e)
                        setShowForm(true)
                      }}
                      className="p-1 rounded bg-yellow-400 border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-yellow-500 transition"
                    >
                      <PencilSquareIcon className="w-4 h-4 text-black" />
                    </button>
                    <button
                      type="button"
                      title="Delete"
                      onClick={() => handleDelete(e)}
                      className="p-1 rounded bg-red-500 text-white border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-red-600 transition"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mb-1 flex items-center gap-2">
                    <BookOpenIcon className="w-5 h-5 text-indigo-600" />
                    <span className="text-lg font-bold">{e.degree}</span>
                  </div>
                  <div className="text-base text-gray-800">{e.school}</div>
                  <div className="mt-1 text-sm text-gray-600">
                    {new Date(e.start_date).toLocaleDateString()} –{" "}
                    {e.end_date
                      ? new Date(e.end_date).toLocaleDateString()
                      : "Present"}
                  </div>
                  {e.description && (
                    <p className="mt-2 text-sm italic text-gray-700">
                      {e.description}
                    </p>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <p>No education records found.</p>
          )}

          {showForm && (
            <AddEducationForm
              existing={editingEducation ?? undefined}
              onSuccess={() => {
                fetchData()
                setShowForm(false)
                setEditingEducation(null)
              }}
            />
          )}
        </>
      )}
    </Card>
  )
}
