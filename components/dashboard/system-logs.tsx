"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Download, Search } from "lucide-react"

// Datos de ejemplo para logs
const logsData = [
  {
    id: "1",
    timestamp: "2024-04-20T10:30:45Z",
    user: "admin@ejemplo.com",
    action: "login",
    description: "Inicio de sesión exitoso",
    ip: "192.168.1.1",
    level: "info",
  },
  {
    id: "2",
    timestamp: "2024-04-20T10:35:12Z",
    user: "admin@ejemplo.com",
    action: "create",
    description: "Usuario creado: usuario1@ejemplo.com",
    ip: "192.168.1.1",
    level: "info",
  },
  {
    id: "3",
    timestamp: "2024-04-20T11:15:30Z",
    user: "usuario1@ejemplo.com",
    action: "login",
    description: "Inicio de sesión exitoso",
    ip: "192.168.1.2",
    level: "info",
  },
  {
    id: "4",
    timestamp: "2024-04-20T11:20:05Z",
    user: "usuario1@ejemplo.com",
    action: "create",
    description: "Venta creada: ID-12345",
    ip: "192.168.1.2",
    level: "info",
  },
  {
    id: "5",
    timestamp: "2024-04-20T12:05:18Z",
    user: "usuario1@ejemplo.com",
    action: "update",
    description: "Cliente actualizado: ID-54321",
    ip: "192.168.1.2",
    level: "info",
  },
  {
    id: "6",
    timestamp: "2024-04-20T14:30:22Z",
    user: "admin@ejemplo.com",
    action: "delete",
    description: "Producto eliminado: ID-98765",
    ip: "192.168.1.1",
    level: "warning",
  },
  {
    id: "7",
    timestamp: "2024-04-20T15:45:10Z",
    user: "sistema",
    action: "error",
    description: "Error en la conexión a la base de datos",
    ip: "localhost",
    level: "error",
  },
  {
    id: "8",
    timestamp: "2024-04-20T16:20:05Z",
    user: "admin@ejemplo.com",
    action: "update",
    description: "Configuración del sistema actualizada",
    ip: "192.168.1.1",
    level: "info",
  },
  {
    id: "9",
    timestamp: "2024-04-20T17:10:30Z",
    user: "usuario1@ejemplo.com",
    action: "logout",
    description: "Cierre de sesión",
    ip: "192.168.1.2",
    level: "info",
  },
  {
    id: "10",
    timestamp: "2024-04-20T18:05:45Z",
    user: "admin@ejemplo.com",
    action: "logout",
    description: "Cierre de sesión",
    ip: "192.168.1.1",
    level: "info",
  },
]

export function SystemLogs() {
  const [logs, setLogs] = useState(logsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [levelFilter, setLevelFilter] = useState<string | null>(null)
  const [actionFilter, setActionFilter] = useState<string | null>(null)

  // Filtrar logs
  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesLevel = levelFilter === null || log.level === levelFilter
    const matchesAction = actionFilter === null || log.action === actionFilter

    return matchesSearch && matchesLevel && matchesAction
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Buscar en logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          <Button type="submit" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Select value={levelFilter || ""} onValueChange={(value) => setLevelFilter(value || null)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por nivel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los niveles</SelectItem>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="error">Error</SelectItem>
            </SelectContent>
          </Select>
          <Select value={actionFilter || ""} onValueChange={(value) => setActionFilter(value || null)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por acción" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las acciones</SelectItem>
              <SelectItem value="login">Login</SelectItem>
              <SelectItem value="logout">Logout</SelectItem>
              <SelectItem value="create">Create</SelectItem>
              <SelectItem value="update">Update</SelectItem>
              <SelectItem value="delete">Delete</SelectItem>
              <SelectItem value="error">Error</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha y Hora</TableHead>
              <TableHead>Usuario</TableHead>
              <TableHead>Acción</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>IP</TableHead>
              <TableHead>Nivel</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No se encontraron registros
                </TableCell>
              </TableRow>
            ) : (
              filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        log.action === "create"
                          ? "bg-green-100 text-green-800"
                          : log.action === "update"
                            ? "bg-blue-100 text-blue-800"
                            : log.action === "delete"
                              ? "bg-red-100 text-red-800"
                              : log.action === "error"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {log.action}
                    </span>
                  </TableCell>
                  <TableCell>{log.description}</TableCell>
                  <TableCell>{log.ip}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        log.level === "info"
                          ? "bg-blue-100 text-blue-800"
                          : log.level === "warning"
                            ? "bg-yellow-100 text-yellow-800"
                            : log.level === "error"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {log.level}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
