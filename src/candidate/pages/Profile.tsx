import Sidebar from "../../components/layout/Sidebar"

// Profile section components
import PersonalInfo from "../components/profile/personalInfo/PersonalInfo"
import Education from "../components/profile/education/Education"
import Experience from "../components/profile/experiance/Experience"
import Skills from "../components/profile/skills/Skills"
import Projects from "../components/profile/project/Projects"
import Hobbies from "../components/profile/hobbies/Hobbies"
import Interests from "../components/profile/interests/Interests"
import Documents from "../components/profile/documents/Documents"

export default function Profile() {
  return (
    <div className="flex min-h-screen bg-[#f5faff]">
      {/* Sidebar pinned on the left */}
      <aside className="fixed top-0 left-0 h-screen w-64 border-r border-black bg-[#f0f8ff] shadow-lg z-50">
        <Sidebar />
      </aside>

      {/* Main content, shifted right */}
      <main className="flex-1 ml-64 p-6 lg:p-10 overflow-y-auto">
        <h1 className="mb-6 text-2xl font-bold">My Profile</h1>

        {/* Two-column layout on lg+, stacks on mobile */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left rail: compact sections */}
          <div className="space-y-6 lg:col-span-4 lg:sticky lg:top-6 self-start">
            <PersonalInfo />
            <Skills />
            <Interests />
            <Hobbies />
          </div>

          {/* Right rail: content-heavy sections */}
          <div className="space-y-6 lg:col-span-8">
            <Education />
            <Experience />
            <Projects />
            <Documents />
          </div>
        </div>
      </main>
    </div>
  )
}
