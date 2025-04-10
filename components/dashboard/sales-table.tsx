"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, FileText, Trash, Edit } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Sale {
  id: string
  total_amount: number
  status: string
  payment_method: string
  created_at: string
  customers: {
    name: string
  }
}

interface SalesTableProps {
  sales: Sale[]
}

export function SalesTable({ sales }: SalesTableProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

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
            created_at: new Date().toISOString(),
            customers: { name: "Juan Pérez" },
          },
          {
            id: "2",
            total_amount: 3200,
            status: "pending",
            payment_method: "transfer",
            created_at: new Date().toISOString(),
            customers: { name: "María García" },
          },
          {
            id: "3",
            total_amount: 1800,
            status: "completed",
            payment_method: "cash",
            created_at: new Date().toISOString(),
            customers: { name: "Carlos López" },
          },
          {
            id: "4",
            total_amount: 4500,
            status: "completed",
            payment_method: "credit_card",
            created_at: new Date().toISOString(),
            customers: { name: "Ana Martínez" },
          },
          {
            id: "5",
            total_amount: 2100,
            status: "cancelled",
            payment_method: "transfer",
            created_at: new Date().toISOString(),
            customers: { name: "Roberto Sánchez" },
          },
        ]

  // Filtrar ventas por término de búsqueda
  const filteredSales = displaySales.filter(
    (sale) =>
      sale.customers.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.payment_method.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
  const formatPaymentMethod = (method: string) => {
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
      <div className="flex items-center py-4">
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-sm"
          placeholder="Buscar ventas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="rounded-md border">
        <ScrollArea className="w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[100px]">Fecha</TableHead>
                <TableHead className="min-w-[150px]">Cliente</TableHead>
                <TableHead className="min-w-[120px]">Estado</TableHead>
                <TableHead className="min-w-[180px]">Método de Pago</TableHead>
                <TableHead className="min-w-[100px] text-right">Monto</TableHead>
                <TableHead className="min-w-[100px] text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>{new Date(sale.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>{sale.customers.name}</TableCell>
                  <TableCell>{formatStatus(sale.status)}</TableCell>
                  <TableCell>{formatPaymentMethod(sale.payment_method)}</TableCell>
                  <TableCell className="text-right">${sale.total_amount.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menú</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => router.push(`/dashboard/ventas/${sale.id}`)}>
                          <FileText className="mr-2 h-4 w-4" />
                          Ver detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push(`/dashboard/ventas/${sale.id}/editar`)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash className="mr-2 h-4 w-4" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  )
}
