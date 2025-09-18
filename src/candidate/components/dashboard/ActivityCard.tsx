import { Card } from "@/components/ui/card"

export default function ActivityCard() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <ul className="space-y-2 text-gray-700">
        <li>✔ Applied to Backend Eng @ Google (2d ago)</li>
        <li>✔ Resume viewed by Acme Corp (1d ago)</li>
        <li>✔ Updated Education Info (3h ago)</li>
      </ul>
    </Card>
  )
}
