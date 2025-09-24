import { ButtonHTMLAttributes, ReactNode } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
}

export default function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`w-full rounded-md font-bold py-2 border border-black 
                  bg-blue-500 hover:bg-blue-600 text-white
                  shadow-[2px_2px_0px_rgba(0,0,0,1)]
                  cursor-pointer hover:translate-y-[1px] hover:translate-x-[1px]
                  hover:shadow-[1px_1px_0px_rgba(0,0,0,1)] transition
                  ${className}`}
    >
      {children}
    </button>
  )
}
