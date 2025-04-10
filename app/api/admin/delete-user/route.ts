import { createServerSupabaseClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("id")

    if (!userId) {
      return NextResponse.json({ error: "ID de usuario requerido" }, { status: 400 })
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

    // Eliminar el usuario
    const { error } = await supabase.auth.admin.deleteUser(userId)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Eliminar el perfil asociado
    await supabase.from("profiles").delete().eq("id", userId)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error al eliminar usuario:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
