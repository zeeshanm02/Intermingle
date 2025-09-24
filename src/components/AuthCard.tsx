import React from "react"

type AuthCardProps = {
  title: string
  children: React.ReactNode
}

export default function AuthCard({ title, children }: AuthCardProps) {
  return (
    <div
      style={{
        backgroundColor: "#f1f5ff", // soft blue card
        border: "2px solid black",
        borderRadius: "6px",
        padding: "2rem",
        maxWidth: "350px",
        margin: "0 auto",
        boxShadow: "4px 4px 0px #000",
        textAlign: "center",
      }}
    >
      <h2 style={{ marginBottom: "1.5rem", fontWeight: "bold" }}>{title}</h2>
      {children}
    </div>
  )
}
