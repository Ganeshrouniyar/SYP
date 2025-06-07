import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container py-10 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-8">
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-8 w-72" />
      </div>

      {/* Progress Indicator Skeleton */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex flex-col items-center">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-4 w-16 mt-1" />
          </div>
          <Skeleton className="h-1 flex-1 mx-2" />
          <div className="flex flex-col items-center">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-4 w-16 mt-1" />
          </div>
          <Skeleton className="h-1 flex-1 mx-2" />
          <div className="flex flex-col items-center">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-4 w-16 mt-1" />
          </div>
        </div>
      </div>

      {/* Form Skeleton */}
      <Skeleton className="h-[600px] w-full rounded-lg" />

      {/* Features Skeleton */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center text-center p-4">
            <Skeleton className="h-12 w-12 rounded-full mb-4" />
            <Skeleton className="h-6 w-40 mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  )
}

