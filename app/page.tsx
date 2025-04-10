import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AuthForm } from "@/components/auth-form"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md mx-auto text-center mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Nombre de la Marca</h1>
        <p className="text-muted-foreground">Portal de acceso</p>
      </div>

      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1 items-center">
          <div className="w-20 h-20 md:w-24 md:h-24 mb-4 relative overflow-hidden rounded-full mx-auto">
            <Image
              src="/placeholder.svg?height=96&width=96"
              alt="Imagen de Buda"
              width={96}
              height={96}
              className="object-cover"
              priority
            />
          </div>
          <CardTitle className="text-xl md:text-2xl text-center">Iniciar Sesión</CardTitle>
          <CardDescription className="text-center">Ingrese sus credenciales para acceder al sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm />
        </CardContent>
      </Card>

      <footer className="mt-6 md:mt-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Nombre de la Marca. Todos los derechos reservados.
      </footer>
    </div>
  )
}
