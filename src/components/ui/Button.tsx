import { ButtonHTMLAttributes, ReactNode } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: "default" | "outline" | "danger"
  size?: "sm" | "md" | "lg"
}

export default function Button({
  children,
  className = "",
  variant = "default",
  size = "md",
  ...props
}: ButtonProps) {
  const variantStyles =
    variant === "outline"
      ? "bg-transparent text-black border border-black"
      : variant === "danger"
      ? "bg-red-500 hover:bg-red-600 text-white border border-black"
      : "bg-blue-500 hover:bg-blue-600 text-white border border-black"

  const sizeStyles =
    size === "sm"
      ? "px-2 py-1 text-sm"
      : size === "lg"
      ? "px-6 py-3 text-lg"
      : "px-4 py-2"

  return (
    <button
      {...props}
      className={`rounded-md font-bold shadow-[2px_2px_0px_rgba(0,0,0,1)]
                  cursor-pointer hover:translate-y-[1px] hover:translate-x-[1px]
                  hover:shadow-[1px_1px_0px_rgba(0,0,0,1)] transition
                  ${variantStyles} ${sizeStyles} ${className}`}
    >
      {children}
    </button>
  )
}
