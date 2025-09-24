import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,        // ✅ saves session in localStorage
    autoRefreshToken: true,      // ✅ refreshes JWT automatically
    detectSessionInUrl: true,    // ✅ needed for magic links / redirects
  },
})
