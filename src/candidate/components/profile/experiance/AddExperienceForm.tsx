import { useState } from "react"
import { addExperience } from "../../../services/profileServices/experienceService"
import StyledInput from "../../../../components/ui/StyledInput"
import StyledTextArea from "../../../../components/ui/StyledTextArea"

type Props = {
  onSuccess: () => void
}

export default function AddExperienceForm({ onSuccess }: Props) {
  const [company, setCompany] = useState("")
  const [role, setRole] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await addExperience({
        company,
        role,
        start_date: startDate,
        end_date: endDate || null,
        description,
      })
      onSuccess()
    } catch (err: any) {
      setError(err.message || "Failed to add experience")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      {error && <p className="text-red-600">{error}</p>}

      <StyledInput
        label="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        required
      />

      <StyledInput
        label="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      />

      <StyledInput
        label="Start Date"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
      />

      <StyledInput
        label="End Date"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        placeholder="Leave empty if ongoing"
      />

      <StyledTextArea
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="What did you work on?"
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full rounded-md font-bold py-2 border border-black 
                    bg-blue-500 hover:bg-blue-600 text-white
                    shadow-[2px_2px_0px_rgba(0,0,0,1)]
                    cursor-pointer hover:translate-y-[1px] hover:translate-x-[1px]
                    hover:shadow-[1px_1px_0px_rgba(0,0,0,1)] transition
                    ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
      >
        {loading ? "Adding..." : "Add Experience"}
      </button>
    </form>
  )
}
