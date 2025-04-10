"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getClientSupabaseClient } from "@/lib/supabase"

export function AuthForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()
  const supabase = getClientSupabaseClient()

  // Verificar si el usuario ya está autenticado al cargar el componente
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        router.push("/dashboard")
      }
    }

    checkSession()
  }, [])

  // Manejar la tecla Enter para el formulario
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      e.preventDefault()
      const form = e.currentTarget.closest("form")
      if (form) {
        handleLogin(new Event("submit") as any)
      }
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validación básica para evitar peticiones innecesarias
    if (!email || !password) {
      setError("Por favor, completa todos los campos")
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // Optimización: Usar directamente la redirección del router en lugar de window.location
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw new Error("Credenciales inválidas. Verifica tu email y contraseña.")
      }

      setSuccess("Inicio de sesión exitoso. Redirigiendo...")

      // Usar router.push en lugar de window.location para una navegación más rápida
      router.push("/dashboard")
    } catch (error: any) {
      setError(error.message || "Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4">
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
      <div className="space-y-2">
        <Label htmlFor="email-login">Email</Label>
        <Input
          id="email-login"
          type="email"
          placeholder="ejemplo@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
          required
          className="h-11" // Altura aumentada para mejor experiencia táctil
          autoComplete="email"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password-login">Contraseña</Label>
          <a href="#" className="text-sm text-primary hover:underline">
            ¿Olvidó su contraseña?
          </a>
        </div>
        <Input
          id="password-login"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          required
          className="h-11" // Altura aumentada para mejor experiencia táctil
          autoComplete="current-password"
        />
      </div>
      <Button className="w-full h-11 text-base" type="submit" disabled={loading}>
        {loading ? "Iniciando sesión..." : "Ingresar"}
      </Button>
    </form>
  )
}
