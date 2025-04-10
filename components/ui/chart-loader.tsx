import { Skeleton } from "@/components/ui/skeleton"

interface ChartLoaderProps {
  height?: number
}

export function ChartLoader({ height = 350 }: ChartLoaderProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[60px]" />
      </div>
      <Skeleton className={`w-full h-[${height}px] rounded-md`} />
    </div>
  )
}
