import CandidateCard from "../../CandidateCard"
import { HeartIcon } from "@heroicons/react/24/outline"

export default function Hobbies() {
  return (
    <CandidateCard title="Hobbies" icon={<HeartIcon className="w-5 h-5" />} addLabel="Add Hobby">
      <ul className="list-disc list-inside text-gray-700">
        <li>Photography</li>
        <li>FPV Drone Racing</li>
        <li>Origami & Crafts</li>
      </ul>
    </CandidateCard>
  )
}
