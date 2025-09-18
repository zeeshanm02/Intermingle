import MirrorImg from "../../assets/MirrorImg.svg"
import RotatingRoles from "../../components/RotatingRoles"
import { Link } from "react-router-dom"

const quotes = [
  "The best way to predict the future is to create it. — Abraham Lincoln",
  "Ask not what your country can do for you—ask what you can do for your country. — John F. Kennedy",
  "America is too great for small dreams. — Ronald Reagan",
  "The harder the conflict, the greater the triumph. — George Washington",
  "Liberty, when it begins to take root, is a plant of rapid growth. — George Washington",
  "Government’s first duty is to protect the people, not run their lives. — Ronald Reagan",
  "We hold these truths to be self-evident, that all men are created equal. — Thomas Jefferson",
  "Do not pray for easy lives. Pray to be stronger men. — John F. Kennedy",
  "Patriotism is easy to understand in America. — Abraham Lincoln",
]

export default function Home() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left illustration */}
      <div className="flex flex-col justify-center items-center bg-gray-50 p-8">
        <img src={MirrorImg} alt="Illustration" className="max-w-md w-full" />
        <div className="mt-6 text-center">
          <h1 className="text-3xl font-bold tracking-wide">INTERMINGLE</h1>
          <p className="mt-2 text-gray-700 font-medium">
            DEVELOPING TOMORROW'S{" "}
            <span className="font-bold">
              <RotatingRoles />
            </span>{" "}
            TODAY!
          </p>
        </div>
      </div>

      {/* Right side with drifting quotes */}
      <div className="relative flex flex-col justify-center items-center p-8 overflow-hidden bg-white">
        {/* Background quotes */}
        {quotes.map((quote, i) => (
          <p
            key={i}
            className="absolute text-xs md:text-sm text-gray-700 opacity-0 max-w-[200px] text-center italic animate-drift"
            style={{
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
              transform: `rotate(${Math.random() * 20 - 10}deg)`,
              animationDuration: `${8 + Math.random() * 6}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            {quote}
          </p>
        ))}

        {/* Foreground Card */}
        <div className="relative z-10 w-full max-w-md bg-white border rounded-lg shadow p-8 text-center">
          <h2 className="text-xl font-semibold mb-6">Welcome to INTERMINGLE</h2>
          <p className="text-gray-600 mb-8">
            Start your journey by creating an account or signing in.
          </p>
          <Link
            to="/signin"
            className="block w-full bg-black text-white rounded-md py-2 font-medium hover:bg-gray-800 hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer mb-4"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="block w-full border rounded-md py-2 font-medium hover:bg-gray-100 hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}
