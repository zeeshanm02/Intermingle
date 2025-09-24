import { useState } from "react"
import { supabase } from "../../lib/supabaseClient"
import { Link } from "react-router-dom"
import AuthLayout from "../../components/layout/AuthLayout"
import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"

export default function SignUp() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    })

    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
      setFullName("")
      setEmail("")
      setPassword("")
    }
  }

  return (
    <AuthLayout>
      {/* Top links */}
      <div className="mb-4 text-center">
        <Link to="/signin" className="text-blue-600 hover:underline">
          Log in
        </Link>{" "}
        | <span className="font-bold">Sign up</span>
      </div>

      {/* Auth card */}
      <div className="bg-blue-50 border-2 border-black rounded-md shadow-[4px_4px_0px_black] p-8 max-w-sm mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign up</h2>

        <form onSubmit={handleSignUp} className="space-y-4">
          <Input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
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
          {success && (
            <p className="text-green-600 mt-2">
              Account created! Please sign in.
            </p>
          )}
        </form>
      </div>
    </AuthLayout>
  )
}
