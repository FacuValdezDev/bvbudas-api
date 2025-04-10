"use client"

import { useEffect, useState, useRef } from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"

// Registrar los componentes necesarios de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend)

const categoryData = [
  { category: "Estatuas", percentage: 45, color: "#4ade80" },
  { category: "Inciensos", percentage: 25, color: "#60a5fa" },
  { category: "Accesorios", percentage: 20, color: "#fbbf24" },
  { category: "Otros", percentage: 10, color: "#a78bfa" },
]

export function IncomeDistributionChart() {
  const [isMounted, setIsMounted] = useState(false)
  const chartRef = useRef(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const chartData = {
    labels: categoryData.map((item) => item.category),
    datasets: [
      {
        data: categoryData.map((item) => item.percentage),
        backgroundColor: categoryData.map((item) => item.color),
        borderColor: categoryData.map((item) => item.color),
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          boxWidth: 15,
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || ""
            const value = context.raw || 0
            return `${label}: ${value}%`
          },
        },
      },
    },
  }

  if (!isMounted) {
    return <div className="h-[250px] w-full bg-gray-50 animate-pulse rounded-md"></div>
  }

  return (
    <div className="h-[250px] w-full">
      <Pie ref={chartRef} data={chartData} options={options} />
    </div>
  )
}
