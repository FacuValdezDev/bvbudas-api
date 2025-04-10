import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Sale {
  id: string
  total_amount: number
  created_at: string
  customers: {
    name: string
  }
}

interface RecentSalesProps {
  sales: Sale[]
}

export function RecentSales({ sales }: RecentSalesProps) {
  // Si no hay ventas, mostrar datos de ejemplo
  const displaySales =
    sales.length > 0
      ? sales
      : [
          {
            id: "1",
            total_amount: 2500,
            created_at: new Date().toISOString(),
            customers: { name: "Juan Pérez" },
          },
          {
            id: "2",
            total_amount: 3200,
            created_at: new Date().toISOString(),
            customers: { name: "María García" },
          },
          {
            id: "3",
            total_amount: 1800,
            created_at: new Date().toISOString(),
            customers: { name: "Carlos López" },
          },
          {
            id: "4",
            total_amount: 4500,
            created_at: new Date().toISOString(),
            customers: { name: "Ana Martínez" },
          },
          {
            id: "5",
            total_amount: 2100,
            created_at: new Date().toISOString(),
            customers: { name: "Roberto Sánchez" },
          },
        ]

  return (
    <div className="space-y-8">
      {displaySales.map((sale) => (
        <div key={sale.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>
              {sale.customers.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.customers.name}</p>
            <p className="text-sm text-muted-foreground">{new Date(sale.created_at).toLocaleDateString()}</p>
          </div>
          <div className="ml-auto font-medium">${sale.total_amount.toFixed(2)}</div>
        </div>
      ))}
    </div>
  )
}
