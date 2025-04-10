"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { getClientSupabaseClient } from "@/lib/supabase"

export function LogoutButton() {
  const router = useRouter()
  const supabase = getClientSupabaseClient()

  const handleLogout = async () => {
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
