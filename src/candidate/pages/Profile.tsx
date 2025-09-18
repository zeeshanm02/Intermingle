import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

// Import all tab components

import AboutMeTab from "../components/profile/AboutMeTab"
import EducationTab from "../components/profile/EducationTab"
import ExperienceTab from "../components/profile/ExperienceTab"
import DocumentsTab from "../components/profile/DocumentsTab"
import CareerGoalsTab from "../components/profile/CareerGoalsTab"
import InterestsTab from "../components/profile/InterestsTab"
import SkillsTab from "../components/profile/SkillsTab"
import ProjectsTab from "../components/profile/ProjectsTab"
import CertificationsTab from "../components/profile/CertificationsTab"



export default function Profile() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <Tabs defaultValue="about" className="space-y-6">
        {/* Tab navigation */}
        <TabsList className="flex flex-wrap gap-2">
          <TabsTrigger value="about">About Me</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="interests">Interests</TabsTrigger>
          <TabsTrigger value="goals">Career Goals</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        {/* Tab content */}
        <TabsContent value="about">
          <AboutMeTab />
        </TabsContent>
        <TabsContent value="education">
          <EducationTab />
        </TabsContent>
        <TabsContent value="experience">
          <ExperienceTab />
        </TabsContent>
        <TabsContent value="certifications">
          <CertificationsTab />
        </TabsContent>
        <TabsContent value="projects">
          <ProjectsTab />
        </TabsContent>
        <TabsContent value="skills">
          <SkillsTab />
        </TabsContent>
        <TabsContent value="interests">
          <InterestsTab />
        </TabsContent>
        <TabsContent value="goals">
          <CareerGoalsTab />
        </TabsContent>
        <TabsContent value="documents">
          <DocumentsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
