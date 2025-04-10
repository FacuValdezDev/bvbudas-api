"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Download } from "lucide-react"

interface Sale {
  id: string
  total_amount: number
  status: string
  payment_method: string | null
  created_at: string
  customers?: {
    name: string
  }
}

interface FinanceTransactionsProps {
  sales: Sale[]
}

export function FinanceTransactions({ sales }: FinanceTransactionsProps) {
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  // Si no hay ventas, mostrar datos de ejemplo
  const displaySales =
    sales.length > 0
      ? sales
      : [
          {
            id: "1",
            total_amount: 2500,
            status: "completed",
            payment_method: "credit_card",
            created_at: "2024-04-15T10:30:00Z",
            customers: { name: "Juan Pérez" },
          },
          {
            id: "2",
            total_amount: 3200,
            status: "pending",
            payment_method: "transfer",
            created_at: "2024-04-14T14:20:00Z",
            customers: { name: "María García" },
          },
          {
            id: "3",
            total_amount: 1800,
            status: "completed",
            payment_method: "cash",
            created_at: "2024-04-12T09:15:00Z",
            customers: { name: "Carlos López" },
          },
          {
            id: "4",
            total_amount: 4500,
            status: "completed",
            payment_method: "credit_card",
            created_at: "2024-04-10T16:45:00Z",
            customers: { name: "Ana Martínez" },
          },
          {
            id: "5",
            total_amount: 2100,
            status: "cancelled",
            payment_method: "transfer",
            created_at: "2024-04-08T11:30:00Z",
            customers: { name: "Roberto Sánchez" },
          },
        ]

  // Ordenar ventas
  const sortedSales = [...displaySales].sort((a, b) => {
    if (!sortField) return 0

    let aValue, bValue

    switch (sortField) {
      case "date":
        aValue = new Date(a.created_at).getTime()
        bValue = new Date(b.created_at).getTime()
        break
      case "amount":
        aValue = Number(a.total_amount)
        bValue = Number(b.total_amount)
        break
      case "status":
        aValue = a.status
        bValue = b.status
        break
      default:
        return 0
    }

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  // Formatear estado para mostrar
  const formatStatus = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Completada
          </span>
        )
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Pendiente
          </span>
        )
      case "cancelled":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Cancelada
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        )
    }
  }

  // Formatear método de pago para mostrar
  const formatPaymentMethod = (method: string | null) => {
    if (!method) return "-"

    switch (method) {
      case "credit_card":
        return "Tarjeta de Crédito"
      case "cash":
        return "Efectivo"
      case "transfer":
        return "Transferencia"
      default:
        return method
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Transacciones</h3>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Exportar
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => handleSort("date")}>
                <div className="flex items-center">
                  Fecha
                  {sortField === "date" && (
                    <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
                  )}
                </div>
              </TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                <div className="flex items-center">
                  Estado
                  {sortField === "status" && (
                    <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
                  )}
                </div>
              </TableHead>
              <TableHead>Método de Pago</TableHead>
              <TableHead className="text-right cursor-pointer" onClick={() => handleSort("amount")}>
                <div className="flex items-center justify-end">
                  Monto
                  {sortField === "amount" && (
                    <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
                  )}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedSales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{new Date(sale.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  Venta a {sale.customers?.name || "Cliente"}
                  <div className="text-xs text-muted-foreground">ID: {sale.id.substring(0, 8)}</div>
                </TableCell>
                <TableCell>{formatStatus(sale.status)}</TableCell>
                <TableCell>{formatPaymentMethod(sale.payment_method)}</TableCell>
                <TableCell className="text-right font-medium">${Number(sale.total_amount).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
