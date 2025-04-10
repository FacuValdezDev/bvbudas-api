"use client"

import { useState, useEffect, useRef } from "react"
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
import { Button } from "@/components/ui/button"

// Registrar los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

// Datos de ventas imaginarias
const salesData = {
  daily: [
    { name: "Lun", ventas: 1200 },
    { name: "Mar", ventas: 1800 },
    { name: "Mié", ventas: 1400 },
    { name: "Jue", ventas: 2200 },
    { name: "Vie", ventas: 2800 },
    { name: "Sáb", ventas: 3200 },
    { name: "Dom", ventas: 2400 },
  ],
  weekly: [
    { name: "Semana 1", ventas: 9800 },
    { name: "Semana 2", ventas: 11200 },
    { name: "Semana 3", ventas: 10500 },
    { name: "Semana 4", ventas: 13800 },
  ],
  monthly: [
    { name: "Ene", ventas: 38500 },
    { name: "Feb", ventas: 42000 },
    { name: "Mar", ventas: 39800 },
    { name: "Abr", ventas: 44500 },
    { name: "May", ventas: 48000 },
    { name: "Jun", ventas: 52000 },
  ],
}

// Datos para comparación (período anterior)
const previousPeriodData = {
  daily: salesData.daily.map((item) => ({ ...item, ventasAnteriores: item.ventas * 0.85 })),
  weekly: salesData.weekly.map((item) => ({ ...item, ventasAnteriores: item.ventas * 0.9 })),
  monthly: salesData.monthly.map((item) => ({ ...item, ventasAnteriores: item.ventas * 0.8 })),
}

export function SalesReportChart() {
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">("monthly")
  const [compareEnabled, setCompareEnabled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const chartRef = useRef(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const currentData = compareEnabled ? previousPeriodData[period] : salesData[period]

  const labels = currentData.map((item) => item.name)
  const salesValues = currentData.map((item) => item.ventas)
  const previousValues = compareEnabled ? currentData.map((item) => (item as any).ventasAnteriores) : []

  const chartData = {
    labels,
    datasets: [
      {
        label: "Ventas actuales",
        data: salesValues,
        borderColor: "#4ade80",
        backgroundColor: "rgba(74, 222, 128, 0.5)",
        tension: 0.3,
      },
      ...(compareEnabled
        ? [
            {
              label: "Ventas período anterior",
              data: previousValues,
              borderColor: "#94a3b8",
              backgroundColor: "rgba(148, 163, 184, 0.5)",
              tension: 0.3,
            },
          ]
        : []),
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
        text: "Reporte de Ventas",
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
    return (
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Diario
            </Button>
            <Button variant="outline" size="sm">
              Semanal
            </Button>
            <Button variant="default" size="sm">
              Mensual
            </Button>
          </div>
        </div>
        <div className="h-[400px] w-full bg-gray-50 animate-pulse rounded-md"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2">
          <Button variant={period === "daily" ? "default" : "outline"} size="sm" onClick={() => setPeriod("daily")}>
            Diario
          </Button>
          <Button variant={period === "weekly" ? "default" : "outline"} size="sm" onClick={() => setPeriod("weekly")}>
            Semanal
          </Button>
          <Button variant={period === "monthly" ? "default" : "outline"} size="sm" onClick={() => setPeriod("monthly")}>
            Mensual
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm">Comparar con período anterior</label>
          <input
            type="checkbox"
            checked={compareEnabled}
            onChange={() => setCompareEnabled(!compareEnabled)}
            className="rounded border-gray-300"
          />
        </div>
      </div>
      <div className="h-[400px] w-full">
        <Line ref={chartRef} data={chartData} options={options} />
      </div>
    </div>
  )
}
