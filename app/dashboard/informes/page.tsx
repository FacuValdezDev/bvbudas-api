import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SalesReportChart } from "@/components/dashboard/sales-report-chart"
import { ProductsReportTable } from "@/components/dashboard/products-report-table"
import { CustomersReportTable } from "@/components/dashboard/customers-report-table"
import { Button } from "@/components/ui/button"
import { Download, Printer, Share2 } from "lucide-react"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"

export default async function InformesPage() {
  const supabase = createServerComponentClient({ cookies })

  // Obtener datos para informes
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
        <h2 className="text-3xl font-bold tracking-tight">Informes</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Imprimir
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Compartir
          </Button>
        </div>
      </div>
      <Tabs defaultValue="sales" className="space-y-4">
        <ScrollArea className="w-full whitespace-nowrap pb-3">
          <TabsList className="inline-flex w-auto">
            <TabsTrigger value="sales">Ventas</TabsTrigger>
            <TabsTrigger value="products">Productos</TabsTrigger>
            <TabsTrigger value="customers">Clientes</TabsTrigger>
          </TabsList>
        </ScrollArea>
        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informe de Ventas</CardTitle>
              <CardDescription>Análisis detallado de ventas por período</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Total de Ventas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$45,231.89</div>
                      <p className="text-xs text-muted-foreground">+20.1% desde el mes pasado</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Cantidad de Ventas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">152</div>
                      <p className="text-xs text-muted-foreground">+12.5% desde el mes pasado</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Ticket Promedio</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$297.58</div>
                      <p className="text-xs text-muted-foreground">+5.2% desde el mes pasado</p>
                    </CardContent>
                  </Card>
                </div>
                <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
                  <SalesReportChart />
                </Suspense>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informe de Productos</CardTitle>
              <CardDescription>Análisis de rendimiento de productos</CardDescription>
            </CardHeader>
            <CardContent>
              <ProductsReportTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informe de Clientes</CardTitle>
              <CardDescription>Análisis de comportamiento de clientes</CardDescription>
            </CardHeader>
            <CardContent>
              <CustomersReportTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
