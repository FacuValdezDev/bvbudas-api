import { createServerSupabaseClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, newPassword } = await request.json()

    if (!email || !newPassword) {
      return NextResponse.json({ error: "Email y nueva contraseña son requeridos" }, { status: 400 })
    }

    const supabase = createServerSupabaseClient()

    // Actualizar la contraseña del usuario
    const { error } = await supabase.auth.admin.updateUserById(
      "id-del-usuario", // Necesitarás el ID del usuario
      { password: newPassword },
    )

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
