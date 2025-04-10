import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, DollarSign, CreditCard, TrendingUp, TrendingDown } from "lucide-react"

interface Sale {
  id: string
  total_amount: number
  status: string
  payment_method: string | null
  created_at: string
}

interface FinanceOverviewProps {
  sales: Sale[]
}

export function FinanceOverview({ sales }: FinanceOverviewProps) {
  // Calcular ingresos totales
  const totalIncome = sales.reduce((sum, sale) => {
    if (sale.status === "completed") {
      return sum + Number(sale.total_amount)
    }
    return sum
  }, 0)

  // Calcular ingresos del mes actual
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const currentMonthIncome = sales.reduce((sum, sale) => {
    const saleDate = new Date(sale.created_at)
    if (sale.status === "completed" && saleDate.getMonth() === currentMonth && saleDate.getFullYear() === currentYear) {
      return sum + Number(sale.total_amount)
    }
    return sum
  }, 0)

  // Calcular ingresos del mes anterior
  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1
  const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear

  const previousMonthIncome = sales.reduce((sum, sale) => {
    const saleDate = new Date(sale.created_at)
    if (
      sale.status === "completed" &&
      saleDate.getMonth() === previousMonth &&
      saleDate.getFullYear() === previousYear
    ) {
      return sum + Number(sale.total_amount)
    }
    return sum
  }, 0)

  // Calcular porcentaje de cambio
  const percentageChange =
    previousMonthIncome === 0 ? 100 : ((currentMonthIncome - previousMonthIncome) / previousMonthIncome) * 100

  // Datos de ejemplo para gastos (en una aplicación real, estos vendrían de la base de datos)
  const expenses = 12500
  const previousExpenses = 11200
  const expensesChange = ((expenses - previousExpenses) / previousExpenses) * 100

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalIncome.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            <span
              className={percentageChange >= 0 ? "text-green-500 flex items-center" : "text-red-500 flex items-center"}
            >
              {percentageChange >= 0 ? (
                <>
                  +{percentageChange.toFixed(1)}% <ArrowUpRight className="h-4 w-4 ml-1" />
                </>
              ) : (
                <>
                  {percentageChange.toFixed(1)}% <ArrowDownRight className="h-4 w-4 ml-1" />
                </>
              )}
            </span>{" "}
            desde el mes pasado
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Gastos</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${expenses.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            <span
              className={expensesChange <= 0 ? "text-green-500 flex items-center" : "text-red-500 flex items-center"}
            >
              {expensesChange <= 0 ? (
                <>
                  {expensesChange.toFixed(1)}% <ArrowDownRight className="h-4 w-4 ml-1" />
                </>
              ) : (
                <>
                  +{expensesChange.toFixed(1)}% <ArrowUpRight className="h-4 w-4 ml-1" />
                </>
              )}
            </span>{" "}
            desde el mes pasado
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ganancias</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${(totalIncome - expenses).toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500 flex items-center">
              +15.3% <ArrowUpRight className="h-4 w-4 ml-1" />
            </span>{" "}
            desde el mes pasado
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Margen de Beneficio</CardTitle>
          <TrendingDown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalIncome === 0 ? "0" : (((totalIncome - expenses) / totalIncome) * 100).toFixed(1)}%
          </div>
          <p className="text-xs text-muted-foreground">
            <span className="text-red-500 flex items-center">
              -2.5% <ArrowDownRight className="h-4 w-4 ml-1" />
            </span>{" "}
            desde el mes pasado
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
