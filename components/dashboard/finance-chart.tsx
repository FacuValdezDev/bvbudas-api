"use client"

import { useEffect, useState, useRef } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"

// Registrar los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"]
const incomeData = [18500, 22000, 19800, 24500, 28000, 32000]
const expensesData = [12000, 14000, 13500, 15000, 16500, 18000]

export function FinanceChart() {
  const [isMounted, setIsMounted] = useState(false)
  const chartRef = useRef(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Ingresos",
        data: incomeData,
        borderColor: "#4ade80",
        backgroundColor: "rgba(74, 222, 128, 0.5)",
        tension: 0.3,
      },
      {
        label: "Gastos",
        data: expensesData,
        borderColor: "#f87171",
        backgroundColor: "rgba(248, 113, 113, 0.5)",
        tension: 0.3,
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
        text: "Ingresos vs Gastos",
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            let label = context.dataset.label || ""
            if (label) {
              label += ": "
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "ARS",
              }).format(context.parsed.y)
            }
            return label
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: any) => "$" + value,
        },
      },
    },
  }

  if (!isMounted) {
    return <div className="h-[350px] w-full bg-gray-50 animate-pulse rounded-md"></div>
  }

  return (
    <div className="h-[350px] w-full">
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  )
}
