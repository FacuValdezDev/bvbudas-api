import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient, type SupabaseClientOptions } from "@supabase/supabase-js";
import { Database } from "@/types/database.types";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Configuración tipo-safe del cliente Supabase
  const supabaseOptions: SupabaseClientOptions<"public"> = {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    },
    cookies: {
      get: (name: string) => req.cookies.get(name)?.value,
      set: (name: string, value: string, options: any) => {
        res.cookies.set(name, value, options);
      },
      remove: (name: string, options: any) => {
        res.cookies.set(name, "", options);
      }
    }
  };

  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    supabaseOptions
  );

  try {
    const { data: { session } } = await supabase.auth.getSession();

    const url = req.nextUrl.clone();
    const isAuthPage = url.pathname === "/";
    const isDashboardPage = url.pathname.startsWith("/dashboard");

    if (!session && isDashboardPage) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    if (session && isAuthPage) {
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }

    return res;
  } catch (error) {
    console.error("Middleware error:", error);
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};