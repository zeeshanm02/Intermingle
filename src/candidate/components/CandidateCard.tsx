import type { ReactNode } from "react"

type CandidateCardProps = {
  title: string
  icon?: ReactNode
  addLabel?: string
  onAddClick?: () => void   // ✅ new prop
  children?: ReactNode
  className?: string
}

export default function CandidateCard({
  title,
  icon,
  addLabel,
  onAddClick,
  children,
  className,
}: CandidateCardProps) {
  return (
    <div
      className={`p-6 border border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] rounded-md bg-white ${className || ""}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          {icon && <span className="text-[#1062fe]">{icon}</span>}
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>

        {addLabel && (
          <button
            onClick={onAddClick}  // ✅ trigger toggle
            className="px-3 py-1 rounded-md font-bold bg-[#1062fe] text-white 
                       border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] 
                       cursor-pointer hover:translate-y-[1px] hover:translate-x-[1px] 
                       hover:shadow-[1px_1px_0px_rgba(0,0,0,1)] transition"
          >
            {addLabel}
          </button>
        )}
      </div>

      {/* Body */}
      <div className="space-y-2 text-gray-700">{children}</div>
    </div>
  )
}
