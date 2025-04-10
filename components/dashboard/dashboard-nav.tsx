"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, ShoppingCart, Package, BarChart4, Settings, CreditCard } from "lucide-react"

const items = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Ventas",
    href: "/dashboard/ventas",
    icon: ShoppingCart,
  },
  {
    title: "Clientes",
    href: "/dashboard/clientes",
    icon: Users,
  },
  {
    title: "Productos",
    href: "/dashboard/productos",
    icon: Package,
  },
  {
    title: "Finanzas",
    href: "/dashboard/finanzas",
    icon: CreditCard,
  },
  {
    title: "Informes",
    href: "/dashboard/informes",
    icon: BarChart4,
  },
  {
    title: "Configuración",
    href: "/dashboard/configuracion",
    icon: Settings,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        const Icon = item.icon
        return (
          <Link key={index} href={item.href}>
            <span
              className={cn(
                "group flex items-center rounded-md px-3 py-3 md:py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              <Icon className="mr-2 h-5 w-5 md:h-4 md:w-4" />
              <span>{item.title}</span>
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
