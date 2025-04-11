"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/types/database.types"

export default function DebugPage() {
  const [connectionStatus, setConnectionStatus] = useState<"checking" | "success" | "error">("checking")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [loginResult, setLoginResult] = useState<any>(null)
  const [supabaseConfig, setSupabaseConfig] = useState<any>(null)
  const [supabase, setSupabase] = useState<any>(null)

  useEffect(() => {
    // Initialize Supabase client only on the client side
    const supabaseClient = createClientComponentClient<Database>()
    setSupabase(supabaseClient)

    // Check Supabase configuration
    setSupabaseConfig({
      url: process.env.NEXT_PUBLIC_SUPABASE_URL || "No configurado",
      hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    })

    // Check connection
    async function checkConnection() {
      try {
        // A simple query to verify the connection
        const { data, error } = await supabaseClient.from("_dummy_query").select("*").limit(1)

        if (error && error.code !== "PGRST116") {
          // PGRST116 is "Relation _dummy_query does not exist", which is expected
          setConnectionStatus("error")
          setErrorMessage(error.message)
        } else {
          setConnectionStatus("success")
        }
      } catch (err: any) {
        setConnectionStatus("error")
        setErrorMessage(err.message)
      }
    }

    checkConnection()
  }, [])

  const testLogin = async () => {
    if (!supabase) return

    try {
      setLoginResult({ status: "checking" })
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: userPassword,
      })

      if (error) {
        setLoginResult({ status: "error", message: error.message, code: error.code })
      } else {
        setLoginResult({ status: "success", user: data.user })
      }
    } catch (err: any) {
      setLoginResult({ status: "error", message: err.message })
    }
  }

  const checkSession = async () => {
    if (!supabase) return

    try {
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        console.error("Error al obtener la sesión:", error)
        return
      }

      console.log("Sesión actual:", data)
      alert(data.session ? "Sesión activa" : "No hay sesión activa")
    } catch (err) {
      console.error("Error:", err)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Diagnóstico de Supabase</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Estado de la conexión</CardTitle>
          <CardDescription>Verifica si la aplicación puede conectarse a Supabase</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h3 className="font-medium mb-2">Configuración:</h3>
            {supabaseConfig && (
              <div className="text-sm">
                <p>URL: {supabaseConfig.url}</p>
                <p>Clave Anónima: {supabaseConfig.hasAnonKey ? "Configurada" : "No configurada"}</p>
              </div>
            )}
          </div>

          <div>
            <h3 className="font-medium mb-2">Estado:</h3>
            {connectionStatus === "checking" && <p>Verificando conexión...</p>}
            {connectionStatus === "success" && <p className="text-green-500">✅ Conexión exitosa a Supabase</p>}
            {connectionStatus === "error" && (
              <div>
                <p className="text-red-500">❌ Error de conexión a Supabase</p>
                <p className="text-sm mt-2">{errorMessage}</p>
              </div>
            )}
          </div>

          <div className="mt-4">
            <Button onClick={checkSession} size="sm">
              Verificar Sesión Actual
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Prueba de inicio de sesión</CardTitle>
          <CardDescription>Prueba tus credenciales directamente</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Contraseña</label>
              <input
                type="password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <Button onClick={testLogin}>Probar inicio de sesión</Button>

            {loginResult && (
              <div className="mt-4 p-4 border rounded">
                <h3 className="font-medium mb-2">Resultado:</h3>
                {loginResult.status === "checking" && <p>Verificando...</p>}
                {loginResult.status === "success" && (
                  <div>
                    <p className="text-green-500">✅ Inicio de sesión exitoso</p>
                    <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                      {JSON.stringify(loginResult.user, null, 2)}
                    </pre>
                  </div>
                )}
                {loginResult.status === "error" && (
                  <div>
                    <p className="text-red-500">❌ Error de inicio de sesión</p>
                    <p className="text-sm mt-2">Mensaje: {loginResult.message}</p>
                    {loginResult.code && <p className="text-sm">Código: {loginResult.code}</p>}
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 text-center">
        <a href="/admin/create-user" className="text-primary hover:underline">
          Ir a la página de creación de usuarios
        </a>
      </div>
    </div>
  )
}
