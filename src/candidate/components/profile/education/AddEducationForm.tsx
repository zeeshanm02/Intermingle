import { useState, useEffect } from "react"
import { addEducation, updateEducation } from "../../../services/profileServices/educationService"
import type { Education } from "../../../services/profileServices/educationService"
import StyledInput from "../../../../components/ui/StyledInput"
import StyledTextArea from "../../../../components/ui/StyledTextArea"

type Props = {
  onSuccess: () => void
  existing?: Education   // ✅ allow pre-fill when editing
}

export default function AddEducationForm({ onSuccess, existing }: Props) {
  const [school, setSchool] = useState("")
  const [degree, setDegree] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // ✅ Pre-fill inputs if editing
  useEffect(() => {
    if (existing) {
      setSchool(existing.school)
      setDegree(existing.degree)
      setStartDate(existing.start_date)
      setEndDate(existing.end_date || "")
      setDescription(existing.description || "")
    }
  }, [existing])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (existing) {
        // ✅ update existing education
        await updateEducation(existing.id, {
          school,
          degree,
          start_date: startDate,
          end_date: endDate || null,
          description,
        })
      } else {
        // ✅ add new education
        await addEducation({
          school,
          degree,
          start_date: startDate,
          end_date: endDate || null,
          description,
        })
      }

      onSuccess()
    } catch (err: any) {
      setError(err.message || "Failed to save education")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      {error && <p className="text-red-600">{error}</p>}

      <StyledInput
        label="School"
        value={school}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSchool(e.target.value)
        }
        required
      />

      <StyledInput
        label="Degree"
        value={degree}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setDegree(e.target.value)
        }
        required
      />

      <StyledInput
        label="Start Date"
        type="date"
        value={startDate}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setStartDate(e.target.value)
        }
        required
      />

      <StyledInput
        label="End Date"
        type="date"
        value={endDate}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEndDate(e.target.value)
        }
      />

      <StyledTextArea
        label="Description"
        value={description}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setDescription(e.target.value)
        }
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full rounded-md font-bold py-2 border border-black 
                    ${existing ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-600 hover:bg-green-700"} 
                    text-white shadow-[2px_2px_0px_rgba(0,0,0,1)] 
                    cursor-pointer hover:translate-y-[1px] hover:translate-x-[1px] 
                    hover:shadow-[1px_1px_0px_rgba(0,0,0,1)] transition 
                    ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
      >
        {loading ? "Saving..." : existing ? "Update" : "Save"}
      </button>
    </form>
  )
}
