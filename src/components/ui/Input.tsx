import React from "react"

type InputProps = {
  type: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({ type, placeholder, value, onChange }: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="
        w-full p-3 mb-4 
        border-2 border-black rounded-md 
        shadow-[3px_3px_0px_black] 
        focus:outline-none focus:ring-2 focus:ring-blue-400
      "
    />
  )
}
