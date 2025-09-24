import type { ReactNode, ButtonHTMLAttributes } from "react"

type AppButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
}

export default function AppButton({ children, className = "", ...props }: AppButtonProps) {
  return (
    <button
      {...props}
      className={`px-4 py-2 w-full rounded-md font-bold
                  bg-[#1062fe] text-white
                  border border-black
                  shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
                  hover:translate-y-[1px] hover:translate-x-[1px]
                  hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                  transition ${className}`}
    >
      {children}
    </button>
  )
}
