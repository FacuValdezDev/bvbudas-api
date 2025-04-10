"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown } from "lucide-react"

// Datos de clientes imaginarios
const customersData = [
  {
    id: "1",
    name: "Juan Pérez",
    email: "juan@ejemplo.com",
    city: "Buenos Aires",
    purchases: 12,
    totalSpent: 28500,
    lastPurchase: "2024-04-15",
    status: "active",
  },
  {
    id: "2",
    name: "María García",
    email: "maria@ejemplo.com",
    city: "Córdoba",
    purchases: 8,
    totalSpent: 15200,
    lastPurchase: "2024-04-10",
    status: "active",
  },
  {
    id: "3",
    name: "Carlos López",
    email: "carlos@ejemplo.com",
    city: "Rosario",
    purchases: 5,
    totalSpent: 9800,
    lastPurchase: "2024-03-28",
    status: "inactive",
  },
  {
    id: "4",
    name: "Ana Martínez",
    email: "ana@ejemplo.com",
    city: "Mendoza",
    purchases: 15,
    totalSpent: 32400,
    lastPurchase: "2024-04-18",
    status: "active",
  },
  {
    id: "5",
    name: "Roberto Sánchez",
    email: "roberto@ejemplo.com",
    city: "La Plata",
    purchases: 3,
    totalSpent: 6500,
    lastPurchase: "2024-02-15",
    status: "inactive",
  },
]

export function CustomersReportTable() {
  const [sortField, setSortField] = useState<string>("totalSpent")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const sortedCustomers = [...customersData].sort((a, b) => {
    const aValue = a[sortField as keyof typeof a]
    const bValue = b[sortField as keyof typeof b]

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return 0
  })

  const renderStatus = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Activo</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Inactivo</Badge>
      default:
        return null
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
              <div className="flex items-center">
                Cliente
                {sortField === "name" && (
                  <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
                )}
              </div>
            </TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Ciudad</TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("purchases")}>
              <div className="flex items-center">
                Compras
                {sortField === "purchases" && (
                  <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
                )}
              </div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("totalSpent")}>
              <div className="flex items-center">
                Total Gastado
                {sortField === "totalSpent" && (
                  <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
                )}
              </div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("lastPurchase")}>
              <div className="flex items-center">
                Última Compra
                {sortField === "lastPurchase" && (
                  <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
                )}
              </div>
            </TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedCustomers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell className="font-medium">{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.city}</TableCell>
              <TableCell>{customer.purchases}</TableCell>
              <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
              <TableCell>{new Date(customer.lastPurchase).toLocaleDateString()}</TableCell>
              <TableCell>{renderStatus(customer.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
