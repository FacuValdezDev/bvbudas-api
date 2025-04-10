import { createClient } from "@supabase/supabase-js"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/types/database.types"

// Singleton para el cliente de Supabase en el lado del servidor
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
    // Optimizaciones para mejorar el rendimiento
    db: {
      schema: "public",
    },
    global: {
      fetch: fetch,
    },
  })

  return serverClientInstance
}

// Singleton para el cliente de Supabase en el lado del cliente
let clientInstance: ReturnType<typeof createClientComponentClient<Database>> | null = null

// Para componentes del cliente, usamos createClientComponentClient de auth-helpers-nextjs
export const getClientSupabaseClient = () => {
  if (typeof window === "undefined") {
    throw new Error("getClientSupabaseClient debe ser llamado solo en el cliente")
  }

  if (!clientInstance) {
    clientInstance = createClientComponentClient<Database>({
      // Optimizaciones para mejorar el rendimiento
      options: {
        db: {
          schema: "public",
        },
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
        global: {
          fetch: fetch,
        },
      },
    })
  }

  return clientInstance
}
