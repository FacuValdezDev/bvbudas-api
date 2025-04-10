import { createServerSupabaseClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const supabase = createServerSupabaseClient()

    // Verificar si el usuario actual es administrador
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    // Verificar si el usuario es administrador
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()
    const isAdmin = profile?.role === "admin" || user.app_metadata?.role === "admin"

    if (!isAdmin) {
      return NextResponse.json({ error: "No tienes permisos de administrador" }, { status: 403 })
    }

    // Obtener usuarios con sus perfiles
    const { data: authUsers, error: authError2 } = await supabase.auth.admin.listUsers()

    if (authError2) {
      return NextResponse.json({ error: authError2.message }, { status: 500 })
    }

    // Obtener perfiles
    const { data: profiles, error: profilesError } = await supabase.from("profiles").select("*")

    if (profilesError) {
      return NextResponse.json({ error: profilesError.message }, { status: 500 })
    }

    // Combinar datos de usuarios y perfiles
    const combinedUsers = authUsers.users.map((user) => {
      const profile = profiles?.find((p) => p.id === user.id)
      return {
        id: user.id,
        email: user.email || "",
        name: profile?.name || user.user_metadata?.name || "Sin nombre",
        company: profile?.company || user.user_metadata?.company || "Sin empresa",
        role: profile?.role || user.app_metadata?.role || "user",
        created_at: user.created_at || "",
      }
    })

    return NextResponse.json({ users: combinedUsers })
  } catch (error: any) {
    console.error("Error al obtener usuarios:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
