import * as React from "react"

export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="border rounded-md px-3 py-2 w-full outline-none focus:ring-2 focus:ring-gray-300"
      {...props}
    />
  )
}
