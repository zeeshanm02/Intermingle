import CandidateCard from "../../CandidateCard"
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline"

export default function Documents() {
  return (
  <CandidateCard title="Documents" icon={<DocumentArrowDownIcon className="w-5 h-5" />} addLabel="Upload Document">
      <ul className="list-disc list-inside text-gray-700">
        <li><a href="#" className="text-blue-600 underline">Resume.pdf</a></li>
        <li><a href="#" className="text-blue-600 underline">Certificate_AWS.pdf</a></li>
      </ul>
    </CandidateCard>
  )
}
