export default function MessageBanner({ message }: { message: string | null }) {
  if (!message) return null
  return (
    <p className="text-sm text-red-600 bg-red-100 border border-red-300 rounded p-3 max-w-xl">
      {message}
    </p>
  )
}
