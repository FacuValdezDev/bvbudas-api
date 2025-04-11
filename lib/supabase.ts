import { createClient } from "@supabase/supabase-js"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/types/database.types"

// Singleton for the client of Supabase on the server side
let serverClientInstance: ReturnType<typeof createClient<Database>> | null = null

export const createServerSupabaseClient = () => {
  if (serverClientInstance) return serverClientInstance

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  serverClientInstance = createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    // Optimizations to improve performance
    db: {
      schema: "public",
    },
    global: {
      fetch: fetch,
    },
  })

  return serverClientInstance
}

// For client components, we recommend using createClientComponentClient directly
// This function is kept for backward compatibility but should be avoided in new code
export const getClientSupabaseClient = () => {
  if (typeof window === "undefined") {
    throw new Error("getClientSupabaseClient must be called only on the client")
  }

  return createClientComponentClient<Database>()
}
