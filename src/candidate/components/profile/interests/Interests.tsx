import { useEffect, useState } from "react"
import { supabase } from "../../../../lib/supabaseClient"
import {
  getInterests,
  addInterest,
  deleteInterest,
  type Interest,
} from "../../../services/profileServices/interestsService"
import { Card } from "../../../../components/layout/Card"
import Button from "../../../../components/ui/Button"
import Input from "../../../../components/ui/Input"
import { cardColors } from "../../../../utils/colors"
import { SparklesIcon, TrashIcon } from "@heroicons/react/24/outline" // ✅ use Heroicons

export default function InterestsTab() {
  const [interests, setInterests] = useState<Interest[]>([])
  const [newInterest, setNewInterest] = useState("")
  const [loading, setLoading] = useState(true)

  // Load interests
  useEffect(() => {
    const fetchData = async () => {
      const user = (await supabase.auth.getUser()).data.user
      if (!user) return
      try {
        const data = await getInterests(user.id)
        setInterests(data)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleAdd = async () => {
    const user = (await supabase.auth.getUser()).data.user
    if (!user || !newInterest.trim()) return

    await addInterest(user.id, newInterest.trim())
    setInterests([
      ...interests,
      {
        id: crypto.randomUUID(),
        user_id: user.id,
        name: newInterest.trim(),
      },
    ])
    setNewInterest("")
  }

  const handleDelete = async (id: string) => {
    await deleteInterest(id)
    setInterests(interests.filter((i) => i.id !== id))
  }

  if (loading) return <p>Loading interests...</p>

  return (
    <Card title="Interests" className="space-y-3">
      <div className="flex flex-col gap-2">
        {interests.map((i, index) => (
          <div
            key={i.id}
            className={`flex items-center justify-between p-2 rounded-md border shadow-sm ${
              cardColors[index % cardColors.length]
            }`}
          >
            <div className="flex items-center gap-2">
              <SparklesIcon className="w-5 h-5 text-indigo-600" /> {/* ✅ consistent icon */}
              <span className="font-medium">{i.name}</span>
            </div>
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleDelete(i.id)}
              className="!w-auto"
            >
              <TrashIcon className="w-4 h-4" /> {/* ✅ same trash icon */}
            </Button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Add new interest..."
          value={newInterest}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewInterest(e.target.value)
          }
        />
        <Button onClick={handleAdd}>Add Interest</Button>
      </div>
    </Card>
  )
}
