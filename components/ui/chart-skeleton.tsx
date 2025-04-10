import { Skeleton } from "@/components/ui/skeleton"

interface ChartSkeletonProps {
  height?: number
  withControls?: boolean
}

export function ChartSkeleton({ height = 350, withControls = false }: ChartSkeletonProps) {
  return (
    <div className="space-y-4">
      {withControls && (
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-20" />
          </div>
          <Skeleton className="h-9 w-40" />
        </div>
      )}
      <Skeleton className={`w-full h-[${height}px] rounded-md`} />
    </div>
  )
}
