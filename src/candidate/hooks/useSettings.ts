import { useState } from "react"
import { supabase } from "../../lib/supabaseClient"

export function useSettings() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const updateEmail = async (newEmail: string, confirmEmail: string) => {
    if (newEmail !== confirmEmail) {
      setMessage("Emails do not match")
      return
    }
    setLoading(true)
    const { error } = await supabase.auth.updateUser({ email: newEmail })
    setLoading(false)
    if (error) setMessage(error.message)
    else {
      setMessage("Email updated! Please log in again.")
      await supabase.auth.signOut()
      window.location.replace("/signin")
    }
  }

  const updatePassword = async (newPassword: string, confirmPassword: string) => {
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match")
      return
    }
    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    setLoading(false)
    if (error) setMessage(error.message)
    else {
      setMessage("Password updated! Please log in again.")
      await supabase.auth.signOut()
      window.location.replace("/signin")
    }
  }

 const logout = async () => {
  await supabase.auth.signOut()
  window.location.replace("/signin")
}


  // ✅ no browser popup, UI handles confirmation


  return { loading, message, updateEmail, updatePassword, logout }
}
