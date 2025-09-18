import { useEffect, useState } from "react"

const roles = [
  "ANALYSTS",
  "CYBERSECURITY SPECIALISTS",
  "INTELLIGENCE OFFICERS",
  "SYSTEMS ENGINEERS",
  "DATA SCIENTISTS",
  "PROGRAM MANAGERS",
  "ACQUISITION PROFESSIONALS",
  "ADMINISTRATIVE SPECIALISTS",
  "ADMINISTRATIVE TECHNICAL SPECIALISTS",
  "CONTRACT ADMINISTERS",
  "ARMY RESERVE ADMINISTRATORS",
  "AIR CARGO SPECIALISTS",
  "OPERATIONS RESEARCHERS",
]

export default function TypingRoles() {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * roles.length))
  const [subIndex, setSubIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [blink, setBlink] = useState(true)
  const [speed] = useState(150) // typing speed

  useEffect(() => {
    // finished typing
    if (subIndex === roles[index].length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), 1000)
      return
    }

    // finished deleting → pick a new random role
    if (subIndex === 0 && deleting) {
      setDeleting(false)
      setIndex(Math.floor(Math.random() * roles.length))
      return
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1))
    }, speed)

    return () => clearTimeout(timeout)
  }, [subIndex, index, deleting])

  // blinking cursor
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink((prev) => !prev)
    }, 500)
    return () => clearInterval(blinkInterval)
  }, [])

  return (
    <span className="font-bold text-blue-600">
      {roles[index].substring(0, subIndex)}
      <span className="text-black">{blink ? "|" : " "}</span>
    </span>
  )
}
