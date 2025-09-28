import Sidebar from "../components/layout/CandidateSidebar"
import AppButton from "../../components/ui/AppButton"

export default function ExploreJobs() {
  const jobs = [
    { title: "Backend Engineer", company: "NextGen Tech", location: "Remote" },
    { title: "Data Analyst", company: "Insightify", location: "New York, NY" },
    { title: "Full Stack Dev", company: "WebWorks", location: "San Francisco, CA" },
  ]

  return (
    <div className="flex min-h-screen bg-[#f5faff]">
      <Sidebar />

      <main className="flex-1 p-10">
        <h1 className="text-2xl font-bold mb-6">Explore Jobs</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, i) => (
            <div
              key={i}
              className="bg-white border border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] rounded-md p-6"
            >
              <h3 className="font-semibold text-lg">{job.title}</h3>
              <p className="text-gray-700">{job.company}</p>
              <p className="text-sm text-gray-500 mb-4">{job.location}</p>
              <AppButton>Apply Now</AppButton>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
