// app/auth/callback/route.ts
import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"
import { type NextRequest, NextResponse } from "next/server"
import { type Database } from "@/types/database.types"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  if (code) {
    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies }
    )

    await supabase.auth.exchangeCodeForSession(code)
  }

  // Redirige al dashboard o a la raíz
  return NextResponse.redirect(new URL("/", request.url))
}
