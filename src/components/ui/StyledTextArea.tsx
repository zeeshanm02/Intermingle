import { ChangeEvent, TextareaHTMLAttributes } from "react"

type StyledTextAreaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "onChange"
> & {
  label?: string
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

export default function StyledTextArea({
  label,
  onChange,
  className,
  ...props
}: StyledTextAreaProps) {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e) // shorthand for "if exists, call"
  }

  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium">{label}</label>}
      <textarea
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
