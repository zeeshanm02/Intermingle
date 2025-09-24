import CandidateCard from "../../CandidateCard"
import { FolderIcon } from "@heroicons/react/24/outline"

export default function Projects() {
  return (
    <CandidateCard title="Personal Projects" icon={<FolderIcon className="w-5 h-5" />} addLabel="Add Project">
      <p><strong>BoxNest</strong> – AI-powered home inventory system (React + Supabase)</p>
      <p><strong>Drone Tracker</strong> – Real-time GPS drone monitoring (Node.js + Websockets)</p>
    </CandidateCard>
  )
}
