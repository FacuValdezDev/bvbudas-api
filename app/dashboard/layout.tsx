import type React from "react"
import { redirect } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { UserNav } from "@/components/dashboard/user-nav"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            {/* Menú móvil */}
            <Sheet>
              <SheetTrigger className="md:hidden" aria-label="Menú">
                <Menu className="h-6 w-6" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] p-0">
                <div className="py-4 px-2">
                  <DashboardNav />
                </div>
              </SheetContent>
            </Sheet>
            <span className="font-bold">Sistema de Gestión Empresarial</span>
          </div>
          <UserNav user={session.user} />
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  )
}
