export default function Loader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/80 z-50">
      {/* Outer ring */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-4 border-purple-500 border-b-transparent animate-[spin_1s_linear_reverse_infinite]"></div>
      </div>
      <p className="mt-4 text-lg font-medium text-gray-600 animate-pulse">Loading...</p>
    </div>
  )
}
