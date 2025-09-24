import { ReactNode } from "react"

type CardProps = {
  title?: string
  content?: ReactNode
  children?: ReactNode
  className?: string
}

export function Card({ title, content, children, className = "" }: CardProps) {
  return (
    <div className={`rounded-lg border bg-white p-4 shadow-sm ${className}`}>
      {title && <h2 className="text-lg font-semibold mb-3">{title}</h2>}
      {content && <p className="text-gray-700">{content}</p>}
      {children}
    </div>
  )
}
