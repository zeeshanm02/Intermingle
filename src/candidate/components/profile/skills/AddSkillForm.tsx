import { useState } from "react"
import { addSkill } from "../../../services/profileServices/skillsService"
import StyledInput from "../../../../components/ui/StyledInput"

type Props = {
  onSuccess: () => void
}

export default function AddSkillForm({ onSuccess }: Props) {
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await addSkill(name)
      setName("")
      onSuccess()
    } catch (err: any) {
      setError(err.message || "Failed to add skill")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mt-3">
      {error && <p className="text-red-600">{error}</p>}

      <StyledInput
        label="Skill Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md font-bold py-2 border border-black bg-blue-500 hover:bg-blue-600 text-white shadow-[2px_2px_0px_rgba(0,0,0,1)] transition"
      >
        {loading ? "Adding..." : "Add Skill"}
      </button>
    </form>
  )
}
