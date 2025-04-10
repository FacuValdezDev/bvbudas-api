"use client"

import { useState, useEffect } from "react"

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Función para verificar si es un dispositivo móvil
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Verificar al cargar
    checkIfMobile()

    // Agregar listener para cambios de tamaño
    window.addEventListener("resize", checkIfMobile)

    // Limpiar listener al desmontar
    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  return isMobile
}
