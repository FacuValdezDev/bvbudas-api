"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getClientSupabaseClient } from "@/lib/supabase"

// Datos de ejemplo para permisos
const permissionsData = [
  {
    id: "1",
    name: "Ver Dashboard",
    description: "Acceso a la página principal del dashboard",
    roles: {
      admin: true,
      user: true,
    },
  },
  {
    id: "2",
    name: "Gestionar Ventas",
    description: "Crear, editar y eliminar ventas",
    roles: {
      admin: true,
      user: true,
    },
  },
  {
    id: "3",
    name: "Gestionar Clientes",
    description: "Crear, editar y eliminar clientes",
    roles: {
      admin: true,
      user: true,
    },
  },
  {
    id: "4",
    name: "Gestionar Productos",
    description: "Crear, editar y eliminar productos",
    roles: {
      admin: true,
      user: false,
    },
  },
  {
    id: "5",
    name: "Ver Informes",
    description: "Acceso a los informes y estadísticas",
    roles: {
      admin: true,
      user: true,
    },
  },
  {
    id: "6",
    name: "Gestionar Usuarios",
    description: "Crear, editar y eliminar usuarios",
    roles: {
      admin: true,
      user: false,
    },
  },
  {
    id: "7",
    name: "Configuración del Sistema",
    description: "Acceso a la configuración general del sistema",
    roles: {
      admin: true,
      user: false,
    },
  },
]

export function PermissionsSettings() {
  const [permissions, setPermissions] = useState(permissionsData)
  const [success, setSuccess] = useState<string | null>(null)
  const supabase = getClientSupabaseClient()

  const handlePermissionChange = (permissionId: string, role: string, value: boolean) => {
    setPermissions(
      permissions.map((permission) => {
        if (permission.id === permissionId) {
          return {
            ...permission,
            roles: {
              ...permission.roles,
              [role]: value,
            },
          }
        }
        return permission
      }),
    )
  }

  const handleSave = async () => {
    try {
      // Aquí se implementaría la lógica para guardar los permisos en la base de datos
      // Por ejemplo, usando una tabla de permisos en Supabase

      // Simulamos una operación exitosa
      setSuccess("Permisos actualizados correctamente")
      setTimeout(() => setSuccess(null), 3000)
    } catch (error) {
      console.error("Error al guardar permisos:", error)
    }
  }

  return (
    <div className="space-y-4">
      {success && (
        <Alert className="bg-green-50 border-green-200">
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Permisos por Rol</h3>
          <p className="text-sm text-muted-foreground">Configura qué acciones puede realizar cada rol en el sistema</p>
        </div>
        <Button onClick={handleSave}>Guardar Cambios</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Permiso</TableHead>
              <TableHead className="w-[300px]">Descripción</TableHead>
              <TableHead className="text-center">Administrador</TableHead>
              <TableHead className="text-center">Usuario</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {permissions.map((permission) => (
              <TableRow key={permission.id}>
                <TableCell className="font-medium">{permission.name}</TableCell>
                <TableCell>{permission.description}</TableCell>
                <TableCell className="text-center">
                  <Switch
                    checked={permission.roles.admin}
                    onCheckedChange={(value) => handlePermissionChange(permission.id, "admin", value)}
                    disabled={permission.name === "Configuración del Sistema"} // Los administradores siempre tienen acceso a la configuración
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Switch
                    checked={permission.roles.user}
                    onCheckedChange={(value) => handlePermissionChange(permission.id, "user", value)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-4">Roles del Sistema</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">Administrador</h4>
            <p className="text-sm text-muted-foreground">
              Acceso completo al sistema. Puede gestionar usuarios, configurar el sistema y acceder a todas las
              funcionalidades.
            </p>
          </div>
          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">Usuario</h4>
            <p className="text-sm text-muted-foreground">
              Acceso limitado según los permisos asignados. Generalmente puede gestionar ventas y clientes, pero no
              tiene acceso a la configuración del sistema.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
