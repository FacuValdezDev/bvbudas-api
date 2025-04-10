import Link from "next/link"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"
import { SalesTable } from "@/components/dashboard/sales-table"

export default async function VentasPage() {
  const supabase = createServerComponentClient({ cookies })

  // Obtener ventas con información del cliente
  const { data: sales } = await supabase
    .from("sales")
    .select(`
      *,
      customers (
        name
      )
    `)
    .order("created_at", { ascending: false })

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Ventas</h2>
        <Link href="/dashboard/ventas/nueva">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nueva Venta
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Registro de Ventas</CardTitle>
          <CardDescription>Historial completo de ventas realizadas</CardDescription>
        </CardHeader>
        <CardContent>
          <SalesTable sales={sales || []} />
        </CardContent>
      </Card>
    </div>
  )
}
