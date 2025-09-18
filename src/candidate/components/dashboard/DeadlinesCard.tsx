import { Card } from "@/components/ui/card"

export default function DeadlinesCard() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Upcoming Deadlines</h2>
      <ul className="space-y-2 text-gray-700">
        <li>🗓 Interview with NASA – Sep 20</li>
        <li>📌 Application closes – Sep 25</li>
      </ul>
    </Card>
  )
}
