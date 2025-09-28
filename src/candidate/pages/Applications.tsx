import Sidebar from "../components/layout/CandidateSidebar"

export default function Applications() {
  return (
    <div className="flex min-h-screen bg-[#f5faff]">
      <Sidebar />

      <main className="flex-1 p-10">
        <h1 className="text-2xl font-bold mb-6">My Applications</h1>

        <div className="bg-white border border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] rounded-md overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#f0f8ff]">
              <tr>
                <th className="px-6 py-3">Job Title</th>
                <th className="px-6 py-3">Company</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date Applied</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-6 py-4">Frontend Developer</td>
                <td className="px-6 py-4">Tech Corp</td>
                <td className="px-6 py-4 text-blue-600">Under Review</td>
                <td className="px-6 py-4">Feb 12, 2025</td>
              </tr>
              <tr className="border-t">
                <td className="px-6 py-4">UI/UX Designer</td>
                <td className="px-6 py-4">Designify</td>
                <td className="px-6 py-4 text-green-600">Interview Scheduled</td>
                <td className="px-6 py-4">Feb 10, 2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
