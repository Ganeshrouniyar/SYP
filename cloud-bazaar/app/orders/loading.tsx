import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container py-8">
      <Skeleton className="h-6 w-48 mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Skeleton */}
        <div className="md:col-span-1">
          <Skeleton className="h-[300px] w-full rounded-lg" />
        </div>

        {/* Main Content Skeleton */}
        <div className="md:col-span-3">
          <Skeleton className="h-[600px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}

