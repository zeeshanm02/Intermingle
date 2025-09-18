import { useState } from "react"
import { supabase } from "../../lib/supabaseClient"
import { Link, useNavigate } from "react-router-dom"
import MirrorImg from "../../assets/MirrorImg.svg"
import RotatingRoles from "../../components/RotatingRoles"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email || !password) {
      setError("Please enter both email and password")
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      navigate("/candidate/dashboard") // ✅ redirect to candidate dashboard
    }

    setLoading(false)
  }

  const handleGoogleSignIn = async () => {
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: "http://localhost:5173/candidate/dashboard" }, // 🔑 change for prod
    })

    if (error) setError(error.message)
    setLoading(false)
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left illustration */}
      <div className="flex flex-col justify-center items-center bg-gray-50 p-8">
        <img src={MirrorImg} alt="Illustration" className="max-w-md w-full" />
        <div className="mt-6 text-center">
          <h1 className="text-3xl font-bold tracking-wide">INTERMINGLE</h1>
          <p className="mt-2 text-gray-700 font-medium">
            DEVELOPING TOMORROW'S <span className="font-bold"><RotatingRoles /></span> TODAY!
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md bg-white border rounded-lg shadow p-8">
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-full flex items-center justify-center bg-black text-white text-xl font-bold mb-3">
              👁️
            </div>
            <h2 className="text-xl font-semibold">WELCOME BACK</h2>
          </div>

          <form onSubmit={handleSignIn} className="mt-6 space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-black outline-none"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-black outline-none"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white rounded-md py-2 font-medium hover:bg-gray-800 hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer disabled:opacity-50"
            >
              {loading ? "Logging in…" : "LOG IN"}
            </button>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 border rounded-md py-2 hover:bg-gray-100 hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer disabled:opacity-50"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              LOG IN WITH GOOGLE
            </button>
          </form>

          {error && <p className="mt-4 text-sm text-red-600 text-center">{error}</p>}

          <p className="mt-6 text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
