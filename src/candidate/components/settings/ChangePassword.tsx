import { useState } from "react"
import { Card } from "../../../components/layout/Card"
import Button from "../../../components/ui/Button"

export default function ChangePassword({
  updatePassword,
  loading,
}: {
  updatePassword: (newPass: string, confirmPass: string) => void
  loading: boolean
}) {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  return (
    <Card
      title="Change Password"
      className="p-8 bg-white shadow-md max-w-2xl rounded-xl"
    >
      <div className="space-y-5">
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex justify-end">
          <Button
            onClick={() => updatePassword(newPassword, confirmPassword)}
            disabled={loading}
          >
            Update Password
          </Button>
        </div>
      </div>
    </Card>
  )
}
