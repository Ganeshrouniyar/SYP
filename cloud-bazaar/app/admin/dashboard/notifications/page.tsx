"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, RefreshCw, CheckCircle, Bell } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useMessages } from "@/lib/message-context"
import AdminLayout from "@/components/admin-layout"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AdminNotificationsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  const messageContext = useMessages()
  const adminNotifications = messageContext.notifications.filter((n) => n.userId === "admin1")

  // Redirect if not logged in or not an admin
  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/auth/login")
    }
  }, [user, router, isLoading])

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <RefreshCw className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading notifications...</p>
        </div>
      </div>
    )
  }

  // If not logged in or not an admin, don't render anything (will redirect)
  if (!user || user.role !== "admin") {
    return null
  }

  // Filter notifications based on search term
  const filteredNotifications = adminNotifications.filter(
    (notification) =>
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.content.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Sort notifications by date (newest first)
  const sortedNotifications = [...filteredNotifications].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  )

  const handleMarkAllAsRead = () => {
    adminNotifications.forEach((notification) => {
      messageContext.markNotificationAsRead(notification.id)
    })
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
            <p className="text-muted-foreground">View and manage your notifications.</p>
          </div>
          <Button
            variant="outline"
            className="gap-2"
            onClick={handleMarkAllAsRead}
            disabled={!adminNotifications.some((n) => !n.read)}
          >
            <CheckCircle className="h-4 w-4" /> Mark All as Read
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>All Notifications</CardTitle>
            <CardDescription>
              {filteredNotifications.length} {filteredNotifications.length === 1 ? "notification" : "notifications"}{" "}
              found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search notifications..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {sortedNotifications.length > 0 ? (
              <div className="space-y-4">
                {sortedNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border ${!notification.read ? "bg-muted/50" : ""}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-full ${getNotificationTypeStyles(notification.type).bg}`}>
                        {getNotificationTypeStyles(notification.type).icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className={`font-medium ${!notification.read ? "font-semibold" : ""}`}>
                              {notification.title}
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">{notification.content}</p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span className="text-xs text-muted-foreground">
                              {formatNotificationDate(notification.timestamp)}
                            </span>
                            {!notification.read && (
                              <Badge variant="default" className="text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="mt-3 flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">
                            {getNotificationTypeLabel(notification.type)}
                          </span>
                          <div className="flex gap-2">
                            {notification.linkTo && (
                              <Link href={notification.linkTo}>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => messageContext.markNotificationAsRead(notification.id)}
                                >
                                  View Details
                                </Button>
                              </Link>
                            )}
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => messageContext.markNotificationAsRead(notification.id)}
                              >
                                Mark as Read
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No notifications found</h3>
                <p className="text-muted-foreground mt-1">
                  {searchTerm ? "Try a different search term" : "You don't have any notifications yet"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

// Helper functions
function getNotificationTypeStyles(type: string) {
  switch (type) {
    case "order":
      return {
        bg: "bg-blue-100",
        icon: <ShoppingBag className="h-5 w-5 text-blue-600" />,
      }
    case "message":
      return {
        bg: "bg-green-100",
        icon: <MessageSquare className="h-5 w-5 text-green-600" />,
      }
    case "system":
      return {
        bg: "bg-amber-100",
        icon: <Bell className="h-5 w-5 text-amber-600" />,
      }
    default:
      return {
        bg: "bg-gray-100",
        icon: <Bell className="h-5 w-5 text-gray-600" />,
      }
  }
}

function getNotificationTypeLabel(type: string) {
  switch (type) {
    case "order":
      return "Order Notification"
    case "message":
      return "Message Notification"
    case "system":
      return "System Notification"
    default:
      return "Notification"
  }
}

function formatNotificationDate(date: Date) {
  const now = new Date()
  const notificationDate = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - notificationDate.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return "Just now"
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) {
    return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`
  }

  return notificationDate.toLocaleDateString()
}

// Import missing components
import { MessageSquare, ShoppingBag } from "lucide-react"

