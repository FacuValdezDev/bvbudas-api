import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, Users, CreditCard, Package, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { DashboardChart } from "@/components/dashboard/dashboard-chart"
import { RecentSales } from "@/components/dashboard/recent-sales"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Obtener estadísticas básicas
  const { data: salesCount } = await supabase.from("sales").select("*", { count: "exact" })
  const { data: customersCount } = await supabase.from("customers").select("*", { count: "exact" })
  const { data: productsCount } = await supabase.from("products").select("*", { count: "exact" })

  // Obtener ventas recientes
  const { data: recentSales } = await supabase
    .from("sales")
    .select(`
      *,
      customers (
        name
      )
    `)
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vista General</TabsTrigger>
          <TabsTrigger value="analytics">Analítica</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 flex items-center">
                    +20.1% <ArrowUpRight className="h-4 w-4 ml-1" />
                  </span>{" "}
                  desde el mes pasado
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Clientes</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{customersCount?.length || 0}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 flex items-center">
                    +10.5% <ArrowUpRight className="h-4 w-4 ml-1" />
                  </span>{" "}
                  desde el mes pasado
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ventas</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{salesCount?.length || 0}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-500 flex items-center">
                    -2.5% <ArrowDownRight className="h-4 w-4 ml-1" />
                  </span>{" "}
                  desde el mes pasado
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Productos Activos</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{productsCount?.length || 0}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 flex items-center">
                    +12.3% <ArrowUpRight className="h-4 w-4 ml-1" />
                  </span>{" "}
                  desde el mes pasado
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Resumen de Ventas</CardTitle>
                <CardDescription>Ventas mensuales durante el último año</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <Suspense fallback={<Skeleton className="h-[350px] w-full" />}>
                  <DashboardChart />
                </Suspense>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Ventas Recientes</CardTitle>
                <CardDescription>Últimas transacciones realizadas</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales sales={recentSales || []} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Rendimiento por Categoría</CardTitle>
                <CardDescription>Comparativa de ventas por categoría de producto</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <Suspense fallback={<Skeleton className="h-[350px] w-full" />}>
                  <DashboardChart />
                </Suspense>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Mejores Clientes</CardTitle>
                <CardDescription>Clientes con mayor volumen de compras</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales sales={recentSales || []} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
