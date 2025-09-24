import { useEffect, useState } from "react"
import Card from "../../CandidateCard"
import { UserIcon } from "@heroicons/react/24/outline"
import { getProfile } from "../../../services/profileServices/profileInfoService"
import type { Profile } from "../../../../types/candidate"
import { supabase } from "../../../../lib/supabaseClient"
import UpdatePersonalInfoForm from "./UpdatePersonalInfoForm"

export default function PersonalInfoSection() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  const fetchData = async () => {
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) return

    const profileData = await getProfile(data.user.id)
    setProfile(profileData)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Card
      title="Personal Info"
      icon={<UserIcon className="w-5 h-5" />}
      addLabel={showForm ? "Cancel" : "Update Profile"}
      onAddClick={() => setShowForm(!showForm)}
    >
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {profile ? (
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {profile.full_name}
              </p>
              <p>
                <strong>Email:</strong> {profile.email}
              </p>
              <p>
                <strong>Location:</strong> {profile.location}
              </p>
              <div>
                <h3 className="font-semibold">Personal Affidavit</h3>
                <p className="text-sm italic">{profile.affidavit || "—"}</p>
              </div>
            </div>
          ) : (
            <p>No profile info found.</p>
          )}

          {showForm && (
            <UpdatePersonalInfoForm
              existing={profile ?? undefined}
              onSuccess={() => {
                fetchData()
                setShowForm(false)
              }}
            />
          )}
        </>
      )}
    </Card>
  )
}
