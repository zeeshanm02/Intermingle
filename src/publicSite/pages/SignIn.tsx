import { useState } from "react"
import { supabase } from "../../lib/supabaseClient"
import { useNavigate, Link } from "react-router-dom"
import AuthLayout from "../../components/layout/AuthLayout"
import Input from "../../components/ui/Input"
import Button from "../../components/ui/Button"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Step 1: authenticate
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      setError(error.message)
      return
    }

    // Step 2: fetch user + role
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single()

      if (profileError) {
        setError(profileError.message)
        return
      }

      // Step 3: redirect based on role
      if (profile?.role === "candidate") navigate("/candidate/dashboard")
      else if (profile?.role === "entity") navigate("/entity/dashboard")
      else if (profile?.role === "admin") navigate("/admin/dashboard")
      else navigate("/") // fallback
    }
  }

  return (
    <AuthLayout>
      <div className="mb-4 text-center">
        <span className="font-bold">Log in</span>{" "}
        | <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
      </div>

      <div className="bg-blue-50 border-2 border-black rounded-md shadow-[4px_4px_0px_black] p-8 max-w-sm mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Log in</h2>

        <form onSubmit={handleSignIn} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" className="w-full">
            Let’s go!
          </Button>

          {error && <p className="text-red-600 mt-2">{error}</p>}
        </form>
      </div>
    </AuthLayout>
  )
}
