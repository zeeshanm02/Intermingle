import { useEffect, useState } from "react"
import { supabase } from "../../../../lib/supabaseClient"
import {
  getHobbies,
  addHobby,
  deleteHobby,
  type Hobby,
} from "../../../services/profileServices/hobbiesService"
import { Card } from "../../../../components/layout/Card"
import Button from "../../../../components/ui/Button"
import Input from "../../../../components/ui/Input"
import { cardColors } from "../../../../utils/colors"
import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline"

export default function HobbiesSection() {
  const [hobbies, setHobbies] = useState<Hobby[]>([])
  const [newHobby, setNewHobby] = useState("")
  const [loading, setLoading] = useState(true)

  // Load hobbies
  useEffect(() => {
    const fetchData = async () => {
      const user = (await supabase.auth.getUser()).data.user
      if (!user) return
      try {
        const data = await getHobbies(user.id)
        setHobbies(data)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleAdd = async () => {
    const user = (await supabase.auth.getUser()).data.user
    if (!user || !newHobby.trim()) return

    await addHobby(user.id, newHobby.trim())
    setHobbies([
      ...hobbies,
      {
        id: crypto.randomUUID(),
        user_id: user.id,
        name: newHobby.trim(),
      },
    ])
    setNewHobby("")
  }

  const handleDelete = async (id: string) => {
    await deleteHobby(id)
    setHobbies(hobbies.filter((h) => h.id !== id))
  }

  if (loading) return <p>Loading hobbies...</p>

  return (
    <Card title="Hobbies" className="space-y-3">
      <div className="flex flex-col gap-2">
        {hobbies.map((h, index) => (
          <div
            key={h.id}
            className={`flex items-center justify-between p-2 rounded-md border shadow-sm ${
              cardColors[index % cardColors.length]
            }`}
          >
            <div className="flex items-center gap-2">
              <HeartIcon className="w-5 h-5 text-red-500" />
              <span className="font-medium">{h.name}</span>
            </div>
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleDelete(h.id)}
              className="!w-auto"
            >
              <TrashIcon className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Add new hobby..."
          value={newHobby}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewHobby(e.target.value)
          }
        />
        <Button onClick={handleAdd}>Add Hobby</Button>
      </div>
    </Card>
  )
}
