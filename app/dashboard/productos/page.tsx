import Link from "next/link"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"
import { ProductsGrid } from "@/components/dashboard/products-grid"

export default async function ProductosPage() {
  const supabase = createServerComponentClient({ cookies })

  // Obtener productos
  const { data: products } = await supabase.from("products").select("*").order("name", { ascending: true })

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Productos</h2>
        <Link href="/dashboard/productos/nuevo">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo Producto
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Catálogo de Productos</CardTitle>
          <CardDescription>Gestiona tu inventario de productos</CardDescription>
        </CardHeader>
        <CardContent>
          <ProductsGrid products={products || []} />
        </CardContent>
      </Card>
    </div>
  )
}
