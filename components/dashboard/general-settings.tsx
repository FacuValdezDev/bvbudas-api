"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function GeneralSettings() {
  const [companyName, setCompanyName] = useState("Mi Empresa")
  const [email, setEmail] = useState("contacto@miempresa.com")
  const [phone, setPhone] = useState("+54 11 1234-5678")
  const [address, setAddress] = useState("Av. Corrientes 1234, Buenos Aires")
  const [logoUrl, setLogoUrl] = useState("/placeholder.svg?height=100&width=100")

  const [emailNotifications, setEmailNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [autoBackup, setAutoBackup] = useState(true)

  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSave = () => {
    setSuccess("Configuración guardada correctamente")
    setTimeout(() => setSuccess(null), 3000)
  }

  return (
    <div className="space-y-6">
      {success && (
        <Alert className="bg-green-50 border-green-200">
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div>
        <h3 className="text-lg font-medium">Información de la Empresa</h3>
        <p className="text-sm text-muted-foreground">Configura la información básica de tu empresa</p>
      </div>
      <Separator />

      <div className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="company-name">Nombre de la Empresa</Label>
            <Input id="company-name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email de Contacto</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Dirección</Label>
            <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="logo">Logo de la Empresa</Label>
          <div className="flex items-center gap-4">
            <img src={logoUrl || "/placeholder.svg"} alt="Logo" className="w-16 h-16 object-contain border rounded" />
            <Input id="logo" type="file" className="max-w-sm" />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium">Preferencias del Sistema</h3>
        <p className="text-sm text-muted-foreground">Configura las preferencias generales del sistema</p>
      </div>
      <Separator />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="email-notifications" className="block">
              Notificaciones por Email
            </Label>
            <p className="text-sm text-muted-foreground">Recibir notificaciones por email</p>
          </div>
          <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="dark-mode" className="block">
              Modo Oscuro
            </Label>
            <p className="text-sm text-muted-foreground">Activar tema oscuro por defecto</p>
          </div>
          <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="auto-backup" className="block">
              Respaldo Automático
            </Label>
            <p className="text-sm text-muted-foreground">Realizar respaldos automáticos diarios</p>
          </div>
          <Switch id="auto-backup" checked={autoBackup} onCheckedChange={setAutoBackup} />
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button variant="outline" className="mr-2">
          Cancelar
        </Button>
        <Button onClick={handleSave}>Guardar Cambios</Button>
      </div>
    </div>
  )
}
