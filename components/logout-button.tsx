"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/types/database.types"

export function LogoutButton() {
  const router = useRouter()
  const [supabase, setSupabase] = useState<any>(null)

  useEffect(() => {
    setSupabase(createClientComponentClient<Database>())
  }, [])

  const handleLogout = async () => {
    if (!supabase) return

    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <Button variant="outline" size="sm" onClick={handleLogout}>
      Cerrar Sesión
    </Button>
  )
}
