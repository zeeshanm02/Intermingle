import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/Button"

// Services
import { getProfile, updateProfile, type Profile } from "../../services/profile/profileService"
import { uploadProfilePicture } from "../../services/profile/profilePictureService"
import { uploadResume, getResumes, deleteResume, type Resume } from "../../services/profile/resumeService"

export default function AboutMeTab() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [file, setFile] = useState<File | null>(null)
  const [resume, setResume] = useState<File | null>(null)
  const [resumes, setResumes] = useState<Resume[]>([])
  const [isEditing, setIsEditing] = useState(false)

  // Fetch profile + resumes
  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const data = await getProfile()
      setProfile(data)
      const resumeData = await getResumes()
      setResumes(resumeData)
      setLoading(false)
    }
    load()
  }, [])

  const handleChange = (field: keyof Profile, value: string) => {
    if (!profile) return
    setProfile({ ...profile, [field]: value })
  }

  const handleSave = async () => {
    if (!profile) return
    try {
      const updated = await updateProfile(profile)
      setProfile(updated)

      if (file) {
        const publicUrl = await uploadProfilePicture(file)
        setProfile({ ...updated, profile_picture_url: publicUrl })
        setFile(null)
      }

      if (resume) {
        await uploadResume(resume)
        const resumeData = await getResumes()
        setResumes(resumeData)
        setResume(null)
      }

      setIsEditing(false) // switch back to view mode
    } catch (err) {
      console.error("Error saving profile:", err)
    }
  }

  const handleDeleteResume = async (id: string, fileUrl: string) => {
    try {
      await deleteResume(id, fileUrl)
      setResumes(resumes.filter((r) => r.id !== id))
    } catch (err) {
      console.error("Error deleting resume:", err)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-xl font-bold">About Me</h2>

      {isEditing ? (
        <>
          {/* Profile Picture Upload */}
          <div>
            <label className="block text-sm font-medium">Profile Picture</label>
            {profile?.profile_picture_url && (
              <img
                src={profile.profile_picture_url}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover mt-2"
              />
            )}
            <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          </div>

          {/* Editable fields */}
          <input
            type="text"
            value={profile?.full_name || ""}
            onChange={(e) => handleChange("full_name", e.target.value)}
            placeholder="Full Name"
            className="w-full border p-2 rounded"
          />
          <input
            type="email"
            value={profile?.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Email"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            value={profile?.phone_number || ""}
            onChange={(e) => handleChange("phone_number", e.target.value)}
            placeholder="Phone Number"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            value={profile?.location || ""}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="Location"
            className="w-full border p-2 rounded"
          />
          <textarea
            value={profile?.short_bio || ""}
            onChange={(e) => handleChange("short_bio", e.target.value)}
            placeholder="Write a short bio..."
            className="w-full border p-2 rounded"
          />

          {/* Resume Upload */}
          <div>
            <label className="block text-sm font-medium">Upload Resume</label>
            <input type="file" onChange={(e) => setResume(e.target.files?.[0] || null)} />
          </div>

          <div className="flex space-x-2">
            <Button onClick={handleSave}>Save</Button>
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
          </div>
        </>
      ) : (
        <>
          {/* View Mode */}
          <div className="space-y-2">
            {profile?.profile_picture_url && (
              <img
                src={profile.profile_picture_url}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
            )}

            <p><strong>Name:</strong> {profile?.full_name}</p>
            <p><strong>Email:</strong> {profile?.email}</p>
            <p><strong>Phone:</strong> {profile?.phone_number}</p>
            <p><strong>Location:</strong> {profile?.location}</p>
            <p><strong>Bio:</strong> {profile?.short_bio}</p>
          </div>

          {/* Resumes */}
          <div>
            <h3 className="font-medium">Uploaded Resumes</h3>
            <ul className="list-disc pl-6">
              {resumes.map((r) => (
                <li key={r.id}>
                  <a href={r.signedUrl} target="_blank" rel="noopener noreferrer">
                    {r.title}
                  </a>
                  <button
                    className="ml-2 text-red-500"
                    onClick={() => handleDeleteResume(r.id, r.file_url)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <Button onClick={() => setIsEditing(true)}>Edit</Button>
        </>
      )}
    </Card>
  )
}
