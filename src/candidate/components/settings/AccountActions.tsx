import { useState } from "react"
import { Card } from "../../../components/layout/Card"
import Button from "../../../components/ui/Button"
import ConfirmDialog from "../../../components/ui/ConfirmDialog"

export default function AccountActions({
  logout,
}: {
  logout: () => void
}) {
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)


  return (
    <>
      <Card
        title="Account Management"
        className="p-8 bg-white shadow-md max-w-2xl rounded-xl"
      >
        <div className="flex flex-col gap-4">
          <Button variant="outline" onClick={logout}>
            Log Out
          </Button>
        </div>
      </Card>
    </>
  )
}
