import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="max-w-lg space-y-3">
      <h1 className="text-xl font-semibold">Page not found</h1>
      <p className="text-gray-600">The page you requested doesn’t exist.</p>
      <Link to="/" className="underline">Go home</Link>
    </div>
  )
}
