import React from "react"
import MirrorImg from "../../assets/MirrorImg.svg" 

type AuthLayoutProps = {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-12 text-center">
        <h1 className="text-5xl font-extrabold mb-4">INTERMINGLE</h1>
        <p className="text-lg max-w-md">
          DEVELOPING TOMORROW'S <span className="font-bold">ANALYSTS</span> TODAY!
        </p>
        <img src={MirrorImg} alt="Illustration" className="mt-8 max-w-[80%]" />
      </div>

      {/* Right Side */}
      <div className="flex flex-1 items-center justify-center p-12">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  )
}
