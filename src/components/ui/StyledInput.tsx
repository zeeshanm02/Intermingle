import { ChangeEvent, InputHTMLAttributes } from "react"

type StyledInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  label?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function StyledInput({
  label,
  onChange,
  className,
  ...props
}: StyledInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e) // shorthand
  }

  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium">{label}</label>}
      <input
        {...props}
        onChange={handleChange}
        className={`w-full px-3 py-2 rounded-md border border-black 
                    shadow-[3px_3px_0px_rgba(0,0,0,1)] 
                    focus:outline-none focus:ring-2 focus:ring-[#1062fe] 
                    ${className || ""}`}
      />
    </div>
  )
}
