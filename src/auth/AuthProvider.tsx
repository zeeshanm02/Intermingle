import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"
import type { Profile } from "../types"

type AuthState = {
  loading: boolean
  user: any | null
  profile: Profile | null
  signOut: () => Promise<void>
}

const AuthCtx = createContext<AuthState>({
  loading: true,
  user: null,
  profile: null,
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    let cancelled = false

    const bootstrap = async () => {
      setLoading(true)
      const { data: { session } } = await supabase.auth.getSession()
      if (cancelled) return
      setUser(session?.user ?? null)
      if (session?.user?.id) {
        const { data } = await supabase
          .from("profiles")
          .select("id, role, full_name, avatar_url, created_at")
          .eq("id", session.user.id)
          .single()
        setProfile((data as Profile) ?? null)
      } else {
        setProfile(null)
      }
      setLoading(false)
    }

    bootstrap()

    const { data: sub } = supabase.auth.onAuthStateChange((_e, sess) => {
      setUser(sess?.user ?? null)
      if (!sess?.user?.id) {
        setProfile(null)
        return
      }
      supabase
        .from("profiles")
        .select("id, role, full_name, avatar_url, created_at")
        .eq("id", sess.user.id)
        .single()
        .then(({ data }) => setProfile((data as Profile) ?? null))
    })

    return () => {
      cancelled = true
      sub.subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <AuthCtx.Provider value={{ loading, user, profile, signOut }}>
      {children}
    </AuthCtx.Provider>
  )
}

export const useAuth = () => useContext(AuthCtx)
