"use client"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useMessages } from "@/lib/message-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, MessageSquare, Package, Info } from "lucide-react"

export default function NotificationsPage() {
  const { user } = useAuth()

  // Initialize with default values
  let notifications: any[] = []
  let markNotificationAsRead: (id: string) => void = () => {}
  let markAllNotificationsAsRead: () => void = () => {}

  // Call useMessages unconditionally
  const messageContext = useMessages()

  // Now, conditionally update the values based on user and messageContext
  if (user && messageContext) {
    notifications = messageContext.notifications
      .filter((n) => n.userId === user?.id)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    markNotificationAsRead = messageContext.markNotificationAsRead
    markAllNotificationsAsRead = messageContext.markAllNotificationsAsRead
  }

  if (!user) {
    return (
      <div className="container py-10">
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-10">
            <h2 className="text-2xl font-bold mb-4">Please log in to view your notifications</h2>
            <Button asChild>
              <a href="/auth/login">Log In</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-5 w-5" />
      case "order":
        return <Package className="h-5 w-5" />
      default:
        return <Info className="h-5 w-5" />
    }
  }

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Notifications</h1>
        {notifications.some((n) => !n.read) && <Button onClick={markAllNotificationsAsRead}>Mark all as read</Button>}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Your Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          {notifications.length === 0 ? (
            <div className="text-center py-10">
              <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No notifications yet</h3>
              <p className="text-muted-foreground">When you receive notifications, they will appear here</p>
            </div>
          ) : (
            <ul className="divide-y">
              {notifications.map((notification) => (
                <li key={notification.id} className="py-4">
                  <Link
                    href={notification.linkTo || "#"}
                    className="block"
                    onClick={() => markNotificationAsRead(notification.id)}
                  >
                    <div className="flex gap-4">
                      <div className={`p-2 rounded-full ${notification.read ? "bg-muted" : "bg-primary/10"}`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className={`font-medium ${!notification.read ? "text-primary" : ""}`}>
                            {notification.title}
                          </h3>
                          <span className="text-xs text-muted-foreground">
                            {new Date(notification.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.content}</p>
                      </div>
                      {!notification.read && (
                        <div className="flex items-center">
                          <div className="h-2 w-2 bg-primary rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

