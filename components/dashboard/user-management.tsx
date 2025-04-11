"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Edit, Trash, UserPlus, Search } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useIsMobile } from "@/hooks/use-mobile"
import type { Database } from "@/types/database.types"

interface User {
  id: string
  email: string
  name: string
  company: string
  role: string
  created_at: string
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const isMobile = useIsMobile()
  const [supabase, setSupabase] = useState<any>(null)

  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    name: "",
    company: "",
    role: "user",
  })

  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    setSupabase(createClientComponentClient<Database>())
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError(null)

      // Get the current session token
      const supabaseClient = createClientComponentClient<Database>()
      const { data: sessionData } = await supabaseClient.auth.getSession()
      const token = sessionData.session?.access_token

      if (!token) {
        throw new Error("No hay sesión activa")
      }

      // Call the API to get users
      const response = await fetch("/api/admin/list-users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al obtener usuarios")
      }

      const data = await response.json()
      setUsers(data.users || [])
    } catch (error: any) {
      console.error("Error al obtener usuarios:", error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateUser = async () => {
    try {
      setError(null)

      // Validate fields
      if (!newUser.email || !newUser.password || !newUser.name || !newUser.company) {
        setError("Todos los campos son obligatorios")
        return
      }

      // Create user through the API
      const response = await fetch("/api/admin/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: newUser.email,
          password: newUser.password,
          name: newUser.name,
          company: newUser.company,
          role: newUser.role,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al crear usuario")
      }

      setSuccess("Usuario creado correctamente")
      setDialogOpen(false)

      // Reset form
      setNewUser({
        email: "",
        password: "",
        name: "",
        company: "",
        role: "user",
      })

      // Update user list
      fetchUsers()

      setTimeout(() => setSuccess(null), 3000)
    } catch (error: any) {
      console.error("Error al crear usuario:", error)
      setError(error.message)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      return
    }

    try {
      const response = await fetch(`/api/admin/delete-user?id=${userId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al eliminar usuario")
      }

      setSuccess("Usuario eliminado correctamente")
      fetchUsers()

      setTimeout(() => setSuccess(null), 3000)
    } catch (error: any) {
      console.error("Error al eliminar usuario:", error)
      setError(error.message)
    }
  }

  // Filter users by search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert className="bg-green-50 border-green-200">
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar usuarios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 w-full sm:w-[250px]"
          />
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Nuevo Usuario
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Usuario</DialogTitle>
              <DialogDescription>Completa los datos para crear un nuevo usuario en el sistema.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="ejemplo@correo.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">Mínimo 6 caracteres</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo</Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="Juan Pérez"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Empresa</Label>
                <Input
                  id="company"
                  value={newUser.company}
                  onChange={(e) => setNewUser({ ...newUser, company: e.target.value })}
                  placeholder="Mi Empresa S.A."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Rol</Label>
                <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">Usuario</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateUser}>Crear Usuario</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <ScrollArea className="w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[150px]">Nombre</TableHead>
                <TableHead className="min-w-[200px]">Email</TableHead>
                {!isMobile && <TableHead className="min-w-[150px]">Empresa</TableHead>}
                <TableHead className="min-w-[100px]">Rol</TableHead>
                {!isMobile && <TableHead className="min-w-[120px]">Fecha de Creación</TableHead>}
                <TableHead className="min-w-[100px] text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={isMobile ? 4 : 6} className="text-center py-4">
                    Cargando usuarios...
                  </TableCell>
                </TableRow>
              ) : filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={isMobile ? 4 : 6} className="text-center py-4">
                    No hay usuarios registrados
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    {!isMobile && <TableCell>{user.company}</TableCell>}
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {user.role === "admin" ? "Admin" : "Usuario"}
                      </span>
                    </TableCell>
                    {!isMobile && <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>}
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  )
}
