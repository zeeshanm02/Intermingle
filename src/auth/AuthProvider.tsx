// src/auth/AuthProvider.tsx
import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"
import Loader from "../components/ui/Loader" // 👈 make sure Loader.tsx exists

type Profile = {
  id: string
  full_name?: string
  email?: string
  role: "candidate" | "entity" | "admin"
  profile_picture_url?: string | null 
}

type AuthContextType = {
  user: any | null
  profile: Profile | null
  loading: boolean
  signOut: () => Promise<void>
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>> // ✅ add this
}


const AuthCtx = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  signOut: async () => {},
  setProfile: () => {}, // ✅ dummy function so context type is satisfied
})



export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()

        setProfile(profile)
      }
      setLoading(false)
    }
    init()
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
  }

  if (loading) {
    return <Loader /> // 👈 loader while fetching auth/profile
  }

  return (
    <AuthCtx.Provider value={{ user, profile, loading, signOut, setProfile }}>
      {children}
    </AuthCtx.Provider>

  )

  
}

export const useAuth = () => useContext(AuthCtx)
