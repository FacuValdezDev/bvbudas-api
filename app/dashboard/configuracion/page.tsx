import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserManagement } from "@/components/dashboard/user-management"
import { SystemLogs } from "@/components/dashboard/system-logs"
import { PermissionsSettings } from "@/components/dashboard/permissions-settings"
import { GeneralSettings } from "@/components/dashboard/general-settings"
import { ScrollArea } from "@/components/ui/scroll-area"

export default async function ConfiguracionPage() {
  const supabase = createServerComponentClient({ cookies })

  // Obtener datos del usuario actual
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Verificar si el usuario es administrador (ahora verificamos tanto en profiles como en metadatos)
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user?.id).single()

  // Verificamos si es admin en profiles o en los metadatos del usuario
  const isAdmin = profile?.role === "admin" || user?.app_metadata?.role === "admin"

  if (!isAdmin) {
    return (
      <div className="flex-1 space-y-4 p-4 pt-6">
        <h2 className="text-3xl font-bold tracking-tight">Configuración</h2>
        <Card>
          <CardHeader>
            <CardTitle>Acceso Restringido</CardTitle>
            <CardDescription>
              No tienes permisos suficientes para acceder a esta sección. Contacta con un administrador.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto">
              {JSON.stringify(
                {
                  userId: user?.id,
                  email: user?.email,
                  profileRole: profile?.role,
                  metadataRole: user?.app_metadata?.role,
                },
                null,
                2,
              )}
            </pre>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Configuración</h2>
      </div>
      <Tabs defaultValue="general" className="space-y-4">
        <ScrollArea className="w-full whitespace-nowrap pb-3">
          <TabsList className="inline-flex w-auto">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="users">Usuarios</TabsTrigger>
            <TabsTrigger value="permissions">Permisos</TabsTrigger>
            <TabsTrigger value="logs">Registros</TabsTrigger>
          </TabsList>
        </ScrollArea>
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración General</CardTitle>
              <CardDescription>Ajustes generales del sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <GeneralSettings />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Usuarios</CardTitle>
              <CardDescription>Administra los usuarios del sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <UserManagement />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Permisos</CardTitle>
              <CardDescription>Configura los roles y permisos de los usuarios</CardDescription>
            </CardHeader>
            <CardContent>
              <PermissionsSettings />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Registros del Sistema</CardTitle>
              <CardDescription>Visualiza los logs de actividad del sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <SystemLogs />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
