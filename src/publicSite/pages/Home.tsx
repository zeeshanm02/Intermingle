import { useNavigate } from "react-router-dom"
import AuthLayout from "../../components/layout/AuthLayout"
import Button from "../../components/ui/Button"

export default function Home() {
  const navigate = useNavigate()

  return (
    <AuthLayout>
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Welcome to Intermingle</h2>
        <p className="text-gray-600 mb-6">Start your journey today</p>

        <div className="flex flex-col gap-4 max-w-xs mx-auto">
          <Button onClick={() => navigate("/signin")} className="w-full">
            Sign In
          </Button>
          <Button onClick={() => navigate("/signup")} className="w-full">
            Sign Up
          </Button>
        </div>
      </div>
    </AuthLayout>
  )
}
