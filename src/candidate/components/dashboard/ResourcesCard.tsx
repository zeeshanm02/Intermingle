import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/Button"

export default function ResourcesCard() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Resources</h2>
      <div className="flex flex-wrap gap-3">
        <Button variant="outline">Resume Builder</Button>
        <Button variant="outline">Skills Quiz</Button>
        <Button variant="outline">Settings</Button>
      </div>
    </Card>
  )
}
