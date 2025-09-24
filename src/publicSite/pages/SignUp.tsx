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
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    })
    if (error) setError(error.message)
    else setSuccess(true)
  }

  return (
    <AuthLayout>
      <div className="mb-4 text-center">
        <Link to="/signin" className="text-blue-600 hover:underline">Log in</Link>{" "}
        | <span className="font-bold">Sign up</span>
      </div>

      <div className="bg-blue-50 border-2 border-black rounded-md shadow-[4px_4px_0px_black] p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign up</h2>
        <form onSubmit={handleSignUp}>
          <Input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button label="Let’s go!" type="submit" />
          {error && <p className="text-red-600 mt-2">{error}</p>}
          {success && <p className="text-green-600 mt-2">Account created! Please sign in.</p>}
        </form>
      </div>
    </AuthLayout>
  )
}
