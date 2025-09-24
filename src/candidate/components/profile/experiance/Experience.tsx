import { useEffect, useState } from "react"
import {
  getExperiences,
  deleteExperience,
  type Experience,
} from "../../../services/profileServices/experienceService"
import Card from "../../CandidateCard"
import {
  BriefcaseIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"
import { supabase } from "../../../../lib/supabaseClient"
import AddExperienceForm from "./AddExperienceForm"
import UpdateExperienceForm from "./UpdateExperienceForm"
import { useConfirm } from "../../../../components/ui/ConfirmProvider"
import { cardColors } from "../../../../utils/colors"

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Experience | null>(null)
  const confirm = useConfirm()

  const fetchData = async () => {
    const { data: user } = await supabase.auth.getUser()
    if (!user?.user) return
    const exp = await getExperiences(user.user.id)
    setExperiences(exp)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = async (exp: Experience) => {
    const ok = await confirm({
      title: "Delete this experience entry?",
      message: (
        <>
          This will permanently remove <b>{exp.role}</b> at {exp.company}.
        </>
      ),
      confirmLabel: "Delete",
      cancelLabel: "Cancel",
    })
    if (!ok) return
    await deleteExperience(exp.id)
    fetchData()
  }

  return (
    <Card
      title="Experience"
      icon={<BriefcaseIcon className="w-5 h-5" />}
      addLabel={showForm ? "Cancel" : "Add Experience"}
      onAddClick={() => {
        setEditing(null)
        setShowForm(!showForm)
      }}
    >
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {experiences.length > 0 ? (
            <div className="space-y-3">
              {experiences.map((exp, i) => (
                <article
                  key={exp.id}
                  className={`relative p-4 border border-black rounded-md shadow-[3px_3px_0px_rgba(0,0,0,1)] ${
                    cardColors[i % cardColors.length]
                  }`}
                >
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      type="button"
                      title="Edit"
                      onClick={() => {
                        setEditing(exp)
                        setShowForm(true)
                      }}
                      className="p-1 rounded bg-yellow-400 border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-yellow-500 transition"
                    >
                      <PencilSquareIcon className="w-4 h-4 text-black" />
                    </button>
                    <button
                      type="button"
                      title="Delete"
                      onClick={() => handleDelete(exp)}
                      className="p-1 rounded bg-red-500 text-white border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-red-600 transition"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mb-1 flex items-center gap-2">
                    <BriefcaseIcon className="w-5 h-5 text-indigo-600" />
                    <span className="text-lg font-bold">{exp.role}</span>
                  </div>
                  <div className="text-base text-gray-800">{exp.company}</div>
                  <div className="mt-1 text-sm text-gray-600">
                    {new Date(exp.start_date).toLocaleDateString()} –{" "}
                    {exp.end_date
                      ? new Date(exp.end_date).toLocaleDateString()
                      : "Present"}
                  </div>
                  {exp.description && (
                    <p className="mt-2 text-sm italic text-gray-700">
                      {exp.description}
                    </p>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <p>No experience added yet.</p>
          )}

          {showForm &&
            (editing ? (
              <UpdateExperienceForm
                existing={editing}
                onSuccess={() => {
                  fetchData()
                  setEditing(null)
                  setShowForm(false)
                }}
              />
            ) : (
              <AddExperienceForm
                onSuccess={() => {
                  fetchData()
                  setShowForm(false)
                }}
              />
            ))}
        </>
      )}
    </Card>
  )
}
