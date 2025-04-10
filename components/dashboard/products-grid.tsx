"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash, Package, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: string
  name: string
  description: string | null
  price: number
  stock: number
  category: string | null
  image_url: string | null
  created_at: string
}

interface ProductsGridProps {
  products: Product[]
}

export function ProductsGrid({ products }: ProductsGridProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)

  // Si no hay productos, mostrar datos de ejemplo
  const displayProducts =
    products.length > 0
      ? products
      : [
          {
            id: "1",
            name: "Buda Meditación",
            description: "Estatua de Buda en posición de meditación, ideal para decoración zen.",
            price: 2500,
            stock: 15,
            category: "Estatuas",
            image_url: "/placeholder.svg?height=200&width=200",
            created_at: new Date().toISOString(),
          },
          {
            id: "2",
            name: "Buda Sonriente",
            description: "Estatua de Buda sonriente, símbolo de felicidad y prosperidad.",
            price: 1800,
            stock: 8,
            category: "Estatuas",
            image_url: "/placeholder.svg?height=200&width=200",
            created_at: new Date().toISOString(),
          },
          {
            id: "3",
            name: "Buda Reclinado",
            description: "Estatua de Buda reclinado, representa la paz y serenidad.",
            price: 3200,
            stock: 5,
            category: "Estatuas",
            image_url: "/placeholder.svg?height=200&width=200",
            created_at: new Date().toISOString(),
          },
          {
            id: "4",
            name: "Incienso Sándalo",
            description: "Incienso natural de sándalo, ideal para meditación y aromaterapia.",
            price: 450,
            stock: 50,
            category: "Inciensos",
            image_url: "/placeholder.svg?height=200&width=200",
            created_at: new Date().toISOString(),
          },
          {
            id: "5",
            name: "Cuenco Tibetano",
            description: "Cuenco tibetano para meditación y terapia de sonido.",
            price: 1950,
            stock: 12,
            category: "Accesorios",
            image_url: "/placeholder.svg?height=200&width=200",
            created_at: new Date().toISOString(),
          },
          {
            id: "6",
            name: "Mala de Madera",
            description: "Collar mala de madera de sándalo con 108 cuentas para meditación.",
            price: 850,
            stock: 20,
            category: "Accesorios",
            image_url: "/placeholder.svg?height=200&width=200",
            created_at: new Date().toISOString(),
          },
        ]

  // Obtener categorías únicas
  const categories = Array.from(new Set(displayProducts.map((product) => product.category || "Sin categoría")))

  // Filtrar productos por término de búsqueda y categoría
  const filteredProducts = displayProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === null || product.category === categoryFilter),
  )

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-sm"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={categoryFilter === null ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setCategoryFilter(null)}
          >
            Todos
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category}
              variant={categoryFilter === category ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setCategoryFilter(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="aspect-square relative">
              <Image
                src={product.image_url || "/placeholder.svg?height=300&width=300"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{product.name}</span>
                <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-2">{product.description}</p>
              <div className="flex items-center mt-2">
                <Package className="h-4 w-4 mr-1 text-muted-foreground" />
                <span
                  className={`text-sm ${product.stock > 10 ? "text-green-600" : product.stock > 0 ? "text-amber-600" : "text-red-600"}`}
                >
                  {product.stock > 0 ? `${product.stock} en stock` : "Sin stock"}
                </span>
              </div>
              <Badge variant="outline" className="mt-2">
                {product.category || "Sin categoría"}
              </Badge>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" onClick={() => router.push(`/dashboard/productos/${product.id}`)}>
                <Eye className="h-4 w-4 mr-2" />
                Ver
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/dashboard/productos/${product.id}/editar`)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="text-red-600">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
