"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown } from "lucide-react"

// Datos de productos imaginarios
const productsData = [
  {
    id: "1",
    name: "Buda Meditación",
    category: "Estatuas",
    stock: 15,
    price: 2500,
    sales: 28,
    revenue: 70000,
    trend: "up",
  },
  {
    id: "2",
    name: "Buda Sonriente",
    category: "Estatuas",
    stock: 8,
    price: 1800,
    sales: 35,
    revenue: 63000,
    trend: "up",
  },
  {
    id: "3",
    name: "Buda Reclinado",
    category: "Estatuas",
    stock: 5,
    price: 3200,
    sales: 12,
    revenue: 38400,
    trend: "down",
  },
  {
    id: "4",
    name: "Incienso Sándalo",
    category: "Inciensos",
    stock: 50,
    price: 450,
    sales: 120,
    revenue: 54000,
    trend: "up",
  },
  {
    id: "5",
    name: "Cuenco Tibetano",
    category: "Accesorios",
    stock: 12,
    price: 1950,
    sales: 18,
    revenue: 35100,
    trend: "stable",
  },
  {
    id: "6",
    name: "Mala de Madera",
    category: "Accesorios",
    stock: 20,
    price: 850,
    sales: 42,
    revenue: 35700,
    trend: "up",
  },
]

export function ProductsReportTable() {
  const [sortField, setSortField] = useState<string>("revenue")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const sortedProducts = [...productsData].sort((a, b) => {
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

  const renderTrend = (trend: string) => {
    switch (trend) {
      case "up":
        return <Badge className="bg-green-100 text-green-800">↑ Subiendo</Badge>
      case "down":
        return <Badge className="bg-red-100 text-red-800">↓ Bajando</Badge>
      case "stable":
        return <Badge className="bg-blue-100 text-blue-800">→ Estable</Badge>
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
                Producto
                {sortField === "name" && (
                  <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
                )}
              </div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("category")}>
              <div className="flex items-center">
                Categoría
                {sortField === "category" && (
                  <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
                )}
              </div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("stock")}>
              <div className="flex items-center">
                Stock
                {sortField === "stock" && (
                  <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
                )}
              </div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("price")}>
              <div className="flex items-center">
                Precio
                {sortField === "price" && (
                  <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
                )}
              </div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("sales")}>
              <div className="flex items-center">
                Ventas
                {sortField === "sales" && (
                  <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
                )}
              </div>
            </TableHead>
            <TableHead className="cursor-pointer text-right" onClick={() => handleSort("revenue")}>
              <div className="flex items-center justify-end">
                Ingresos
                {sortField === "revenue" && (
                  <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
                )}
              </div>
            </TableHead>
            <TableHead>Tendencia</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.sales}</TableCell>
              <TableCell className="text-right">${product.revenue.toFixed(2)}</TableCell>
              <TableCell>{renderTrend(product.trend)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
