import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-12">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Skeleton className="h-8 w-40" />
        </div>

        <Skeleton className="h-[500px] w-full rounded-lg" />
      </div>
    </div>
  )
}

