"use client"

import type { User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getClientSupabaseClient } from "@/lib/supabase"

interface UserNavProps {
  user: User
}

export function UserNav({ user }: UserNavProps) {
  const router = useRouter()
  const supabase = getClientSupabaseClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  // Obtener las iniciales del nombre de usuario o email
  const getInitials = () => {
    const email = user.email || ""
    if (user.user_metadata?.name) {
      const nameParts = user.user_metadata.name.split(" ")
      if (nameParts.length >= 2) {
        return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
      }
      return nameParts[0][0].toUpperCase()
    }
    return email.substring(0, 2).toUpperCase()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.user_metadata?.name || "Usuario"}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/dashboard/perfil")}>Perfil</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/dashboard/configuracion")}>Configuración</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>Cerrar sesión</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
