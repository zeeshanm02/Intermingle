import { Link } from "react-router-dom"

export default function NotPermitted() {
  return (
    <div className="max-w-lg space-y-3">
      <h1 className="text-xl font-semibold">Not permitted</h1>
      <p className="text-gray-600">
        You don’t have access to that area. If you believe this is an error, contact an administrator.
      </p>
      <Link to="/" className="underline">Go home</Link>
    </div>
  )
}
