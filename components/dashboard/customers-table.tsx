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
import { MoreHorizontal, FileText, Trash, Edit, Mail, Phone } from "lucide-react"

interface Customer {
  id: string
  name: string
  email: string | null
  phone: string | null
  city: string | null
  created_at: string
}

interface CustomersTableProps {
  customers: Customer[]
}

export function CustomersTable({ customers }: CustomersTableProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  // Si no hay clientes, mostrar datos de ejemplo
  const displayCustomers =
    customers.length > 0
      ? customers
      : [
          {
            id: "1",
            name: "Juan Pérez",
            email: "juan@ejemplo.com",
            phone: "123-456-7890",
            city: "Buenos Aires",
            created_at: new Date().toISOString(),
          },
          {
            id: "2",
            name: "María García",
            email: "maria@ejemplo.com",
            phone: "123-456-7891",
            city: "Córdoba",
            created_at: new Date().toISOString(),
          },
          {
            id: "3",
            name: "Carlos López",
            email: "carlos@ejemplo.com",
            phone: "123-456-7892",
            city: "Rosario",
            created_at: new Date().toISOString(),
          },
          {
            id: "4",
            name: "Ana Martínez",
            email: "ana@ejemplo.com",
            phone: "123-456-7893",
            city: "Mendoza",
            created_at: new Date().toISOString(),
          },
          {
            id: "5",
            name: "Roberto Sánchez",
            email: "roberto@ejemplo.com",
            phone: "123-456-7894",
            city: "La Plata",
            created_at: new Date().toISOString(),
          },
        ]

  // Filtrar clientes por término de búsqueda
  const filteredCustomers = displayCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer.email && customer.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (customer.city && customer.city.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div>
      <div className="flex items-center py-4">
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-sm"
          placeholder="Buscar clientes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Ciudad</TableHead>
              <TableHead>Cliente desde</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.email || "-"}</TableCell>
                <TableCell>{customer.phone || "-"}</TableCell>
                <TableCell>{customer.city || "-"}</TableCell>
                <TableCell>{new Date(customer.created_at).toLocaleDateString()}</TableCell>
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
                      <DropdownMenuItem onClick={() => router.push(`/dashboard/clientes/${customer.id}`)}>
                        <FileText className="mr-2 h-4 w-4" />
                        Ver detalles
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push(`/dashboard/clientes/${customer.id}/editar`)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        Enviar email
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Phone className="mr-2 h-4 w-4" />
                        Llamar
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
      </div>
    </div>
  )
}
