import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/Button"
import { Progress } from "@/components/ui/progress"

export default function WelcomeCard() {
  return (
    <Card className="p-0 overflow-hidden">
      {/* Header section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <h1 className="text-2xl font-bold">Welcome back, Zeeshan 👋</h1>
        <p className="text-blue-100 mt-1">
          Here’s a quick overview of your progress.
        </p>
      </div>

      {/* Body section */}
      <div className="p-6 flex items-center justify-between">
        {/* Left side: profile progress */}
        <div>
          <p className="text-sm font-medium text-gray-600 mb-2">
            Profile Completion
          </p>
          <Progress value={70} className="w-48" />
          <p className="text-xs text-gray-500 mt-1">70% complete</p>
        </div>

        {/* Right side: call to action */}
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Complete Profile
        </Button>
      </div>
    </Card>
  )
}
