import Link from "next/link"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"
import { CustomersTable } from "@/components/dashboard/customers-table"

export default async function ClientesPage() {
  const supabase = createServerComponentClient({ cookies })

  // Obtener clientes
  const { data: customers } = await supabase.from("customers").select("*").order("name", { ascending: true })

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Clientes</h2>
        <Link href="/dashboard/clientes/nuevo">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo Cliente
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Directorio de Clientes</CardTitle>
          <CardDescription>Gestiona la información de tus clientes</CardDescription>
        </CardHeader>
        <CardContent>
          <CustomersTable customers={customers || []} />
        </CardContent>
      </Card>
    </div>
  )
}
