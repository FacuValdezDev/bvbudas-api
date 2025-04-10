"use client"

import { useEffect, useState, useRef } from "react"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Bar } from "react-chartjs-2"

// Registrar los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const generateRandomData = () => {
  return Array.from({ length: 12 }, () => Math.floor(Math.random() * 5000) + 1000)
}

const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]

export function DashboardChart() {
  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [salesData] = useState(generateRandomData())
  const chartRef = useRef(null)

  useEffect(() => {
    setIsMounted(true)

    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  const chartData = {
    labels: isMobile ? months.slice(-6) : months,
    datasets: [
      {
        label: "Ventas",
        data: isMobile ? salesData.slice(-6) : salesData,
        backgroundColor: "#adfa1d",
        borderRadius: 4,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Ventas Mensuales",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  if (!isMounted) {
    return <div className="h-[350px] w-full bg-gray-50 animate-pulse rounded-md"></div>
  }

  return (
    <div className="h-[350px] w-full">
      <Bar ref={chartRef} data={chartData} options={options} />
    </div>
  )
}
