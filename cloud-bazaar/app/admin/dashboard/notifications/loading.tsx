import { RefreshCw } from "lucide-react"

export default function NotificationsLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-2">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading notifications...</p>
      </div>
    </div>
  )
}

