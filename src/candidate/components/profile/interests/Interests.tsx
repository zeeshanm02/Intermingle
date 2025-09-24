import CandidateCard from "../../CandidateCard"
import { SparklesIcon } from "@heroicons/react/24/outline"

export default function Interests() {
  return (
    <CandidateCard title="Interests" icon={<SparklesIcon className="w-5 h-5" />} addLabel="Add Interest">
      <ul className="list-disc list-inside text-gray-700">
        <li>Artificial Intelligence</li>
        <li>STEM Education</li>
        <li>Space Exploration</li>
      </ul>
    </CandidateCard>
  )
}
