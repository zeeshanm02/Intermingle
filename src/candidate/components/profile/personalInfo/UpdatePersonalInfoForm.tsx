import { useState, useEffect } from "react"
import { updateProfile } from "../../../services/profileServices/profileInfoService"
import type { Profile } from "../../../../types/candidate"
import StyledInput from "../../../../components/ui/StyledInput"
import StyledTextArea from "../../../../components/ui/StyledTextArea"

type Props = {
  onSuccess: () => void
  existing?: Profile
}

export default function UpdatePersonalInfoForm({ onSuccess, existing }: Props) {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [location, setLocation] = useState("")
  const [affidavit, setAffidavit] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (existing) {
      setFullName(existing.full_name || "")
      setEmail(existing.email || "")
      setLocation(existing.location || "")
      setAffidavit(existing.affidavit || "")
    }
  }, [existing])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await updateProfile({
        id: existing?.id!,
        full_name: fullName,
        email,
        location,
        affidavit,
      })
      onSuccess()
    } catch (err: any) {
      setError(err.message || "Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      {error && <p className="text-red-600">{error}</p>}

      <StyledInput
        label="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />

      <StyledInput
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <StyledInput
        label="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <StyledTextArea
        label="Personal Affidavit"
        value={affidavit}
        onChange={(e) => setAffidavit(e.target.value)}
        placeholder="Write a short personal affidavit..."
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full rounded-md font-bold py-2 border border-black 
                    bg-yellow-500 hover:bg-yellow-600 text-white
                    shadow-[2px_2px_0px_rgba(0,0,0,1)]
                    cursor-pointer hover:translate-y-[1px] hover:translate-x-[1px]
                    hover:shadow-[1px_1px_0px_rgba(0,0,0,1)] transition
                    ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
      >
        {loading ? "Updating..." : "Update Profile"}
      </button>
    </form>
  )
}
