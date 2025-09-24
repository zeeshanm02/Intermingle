import { ReactNode } from "react"

type CardProps = {
  title?: string
  icon?: ReactNode        // ✅ allow icon
  addLabel?: string
  onAddClick?: () => void
  children?: ReactNode
  className?: string
}

export function Card({ title, icon, addLabel, onAddClick, children, className = "" }: CardProps) {
  return (
    <div className={`rounded-lg border bg-white p-4 shadow-sm ${className}`}>
      {(title || addLabel) && (
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {icon}
            {title && <h2 className="text-lg font-semibold">{title}</h2>}
          </div>
          {addLabel && (
            <button
              onClick={onAddClick}
              className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_rgba(0,0,0,1)] transition"
            >
              {addLabel}
            </button>
          )}
        </div>
      )}
      {children}
    </div>
  )
}
