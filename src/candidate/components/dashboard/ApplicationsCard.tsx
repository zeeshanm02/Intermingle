import { Card } from "@/components/ui/card"

export default function ApplicationsCard() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Applications Overview</h2>
      <ul className="space-y-2 text-gray-700">
        <li>📄 5 Submitted</li>
        <li>🎤 2 Interviews Scheduled</li>
        <li>✅ 1 Offer</li>
      </ul>
    </Card>
  )
}
