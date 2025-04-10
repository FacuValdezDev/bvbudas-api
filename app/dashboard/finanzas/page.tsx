import { Button } from "@/components/ui/button"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FinanceOverview } from "@/components/dashboard/finance-overview"
import { FinanceTransactions } from "@/components/dashboard/finance-transactions"
import { FinanceChart } from "@/components/dashboard/finance-chart"
import { IncomeDistributionChart } from "@/components/dashboard/income-distribution-chart"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"

export default async function FinanzasPage() {
  const supabase = createServerComponentClient({ cookies })

  // Obtener datos de ventas para finanzas
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
        <h2 className="text-3xl font-bold tracking-tight">Finanzas</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <ScrollArea className="w-full whitespace-nowrap pb-3">
          <TabsList className="inline-flex w-auto">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="transactions">Transacciones</TabsTrigger>
            <TabsTrigger value="reports">Informes</TabsTrigger>
          </TabsList>
        </ScrollArea>
        <TabsContent value="overview" className="space-y-4">
          <FinanceOverview sales={sales || []} />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Ingresos vs Gastos</CardTitle>
                <CardDescription>Comparativa de los últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <Suspense fallback={<Skeleton className="h-[350px] w-full" />}>
                  <FinanceChart />
                </Suspense>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Distribución de Ingresos</CardTitle>
                <CardDescription>Por categoría de producto</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<Skeleton className="h-[250px] w-full" />}>
                  <IncomeDistributionChart />
                </Suspense>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transacciones Recientes</CardTitle>
              <CardDescription>Historial de movimientos financieros</CardDescription>
            </CardHeader>
            <CardContent>
              <FinanceTransactions sales={sales || []} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informes Financieros</CardTitle>
              <CardDescription>Reportes detallados para análisis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Balance General</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$125,430.00</div>
                    <p className="text-xs text-muted-foreground">Actualizado al 30/04/2024</p>
                    <div className="mt-4">
                      <Button variant="outline" className="w-full">
                        Ver Detalle
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Estado de Resultados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$45,230.00</div>
                    <p className="text-xs text-muted-foreground">Ganancias del mes actual</p>
                    <div className="mt-4">
                      <Button variant="outline" className="w-full">
                        Ver Detalle
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Flujo de Caja</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$32,150.00</div>
                    <p className="text-xs text-muted-foreground">Disponible actualmente</p>
                    <div className="mt-4">
                      <Button variant="outline" className="w-full">
                        Ver Detalle
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
