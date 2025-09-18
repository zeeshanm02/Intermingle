import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/Button"

export default function JobsCard() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Job Recommendations</h2>
      <ul className="space-y-3">
        <li className="flex justify-between">
          <span>Software Engineer @ X</span>
          <Button size="sm">Apply</Button>
        </li>
        <li className="flex justify-between">
          <span>Analyst @ Y</span>
          <Button size="sm">Apply</Button>
        </li>
        <li className="flex justify-between">
          <span>Intern @ Z</span>
          <Button size="sm">Apply</Button>
        </li>
      </ul>
      <div className="mt-4 text-right">
        <Button variant="outline" size="sm">View All Jobs →</Button>
      </div>
    </Card>
  )
}
