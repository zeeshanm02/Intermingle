import WelcomeCard from "../components/dashboard/WelcomeCard"
import ApplicationsCard from "../components/dashboard/ApplicationsCard"
import JobsCard from "../components/dashboard/JobsCard"
import DeadlinesCard from "../components/dashboard/DeadlinesCard"
import ActivityCard from "../components/dashboard/ActivityCard"
import ResourcesCard from "../components/dashboard/ResourcesCard"

export default function CandidateDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Top section */}
      <WelcomeCard />

      {/* Middle row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ApplicationsCard />
        <JobsCard />
      </div>

      {/* Lower row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DeadlinesCard />
        <ActivityCard />
      </div>

      {/* Resources */}
      <ResourcesCard />
    </div>
  )
}
