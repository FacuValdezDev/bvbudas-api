import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Optimización: Usar una variable para almacenar la sesión
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Obtener la URL actual
  const url = req.nextUrl.clone()
  const isAuthPage = url.pathname === "/"
  const isDashboardPage = url.pathname.startsWith("/dashboard")

  // Si el usuario no está autenticado y está intentando acceder a una ruta protegida
  if (!session && isDashboardPage) {
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  // Si el usuario está autenticado y está intentando acceder a la página de inicio de sesión
  // Lo redirigimos al dashboard
  if (session && isAuthPage) {
    url.pathname = "/dashboard"
    return NextResponse.redirect(url)
  }

  return res
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
}
