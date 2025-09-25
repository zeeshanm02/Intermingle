import { useState } from "react"
import { Card } from "../../../components/layout/Card"
import Button from "../../../components/ui/Button"

export default function ChangeEmail({ updateEmail, loading }: { updateEmail: (e: string, c: string) => void, loading: boolean }) {
  const [newEmail, setNewEmail] = useState("")
  const [confirmEmail, setConfirmEmail] = useState("")

  return (
    <Card title="Change Email" className="p-8 bg-white shadow-md max-w-2xl rounded-xl">
      <div className="space-y-5">
        <input type="email" placeholder="New Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="w-full border rounded-lg p-3"/>
        <input type="email" placeholder="Confirm New Email" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} className="w-full border rounded-lg p-3"/>
        <div className="flex justify-end">
          <Button onClick={() => updateEmail(newEmail, confirmEmail)} disabled={loading}>Update Email</Button>
        </div>
      </div>
    </Card>
  )
}
