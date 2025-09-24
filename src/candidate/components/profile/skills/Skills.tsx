import { useEffect, useState } from "react"
import Card from "../../CandidateCard"
import {
  WrenchScrewdriverIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"
import { supabase } from "../../../../lib/supabaseClient"
import {
  getSkills,
  deleteSkill,
  type Skill,
} from "../../../services/profileServices/skillsService"
import AddSkillForm from "./AddSkillForm"
import { useConfirm } from "../../../../components/ui/ConfirmProvider"
import { cardColors } from "../../../../utils/colors"

export default function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const confirm = useConfirm()

  const fetchData = async () => {
    const { data: user } = await supabase.auth.getUser()
    if (!user?.user) return
    const s = await getSkills(user.user.id)
    setSkills(s)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = async (skill: Skill) => {
    const ok = await confirm({
      title: "Delete this skill?",
      message: <>This will permanently remove <b>{skill.name}</b>.</>,
      confirmLabel: "Delete",
      cancelLabel: "Cancel",
    })
    if (!ok) return
    await deleteSkill(skill.id)
    fetchData()
  }

  return (
    <Card
      title="Skills"
      icon={<WrenchScrewdriverIcon className="w-5 h-5" />}
      addLabel={showForm ? "Cancel" : "Add Skill"}
      onAddClick={() => setShowForm(!showForm)}
    >
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {skills.length > 0 ? (
            <div className="space-y-3">
              {skills.map((s, i) => (
                <article
                  key={s.id}
                  className={`relative p-3 border border-black rounded-md shadow-[3px_3px_0px_rgba(0,0,0,1)] ${
                    cardColors[i % cardColors.length]
                  }`}
                >
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      type="button"
                      title="Delete"
                      onClick={() => handleDelete(s)}
                      className="p-1 rounded bg-red-500 text-white border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-red-600 transition"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <WrenchScrewdriverIcon className="w-5 h-5 text-indigo-600" />
                    <span className="text-base font-semibold">{s.name}</span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p>No skills added yet.</p>
          )}

          {showForm && <AddSkillForm onSuccess={fetchData} />}
        </>
      )}
    </Card>
  )
}
