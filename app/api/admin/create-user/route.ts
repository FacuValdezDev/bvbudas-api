import { createServerSupabaseClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, password, name, company, role } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email y contraseña son requeridos" }, { status: 400 })
    }

    const supabase = createServerSupabaseClient()

    // Verificar si el usuario actual es administrador
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    // Verificar si el usuario es administrador
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()
    const isAdmin = profile?.role === "admin" || session.user.app_metadata?.role === "admin"

    if (!isAdmin) {
      return NextResponse.json({ error: "No tienes permisos de administrador" }, { status: 403 })
    }

    // Crear un nuevo usuario con metadatos
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        name,
        company,
      },
      app_metadata: {
        role,
      },
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Crear perfil del usuario
    if (data.user) {
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: data.user.id,
          name,
          company,
          role,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])

      if (profileError) {
        console.error("Error al crear perfil:", profileError)
      }
    }

    return NextResponse.json({ success: true, user: data.user })
  } catch (error: any) {
    console.error("Error al crear usuario:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
