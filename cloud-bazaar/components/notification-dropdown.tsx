"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell } from "lucide-react"
import { useMessages } from "@/lib/message-context"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function NotificationDropdown() {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)

  const messageContext = useMessages()
  let notifications: any[] = []
  let unreadCount = 0
  let markNotificationAsRead: (id: string) => void = () => {}
  let markAllNotificationsAsRead: () => void = () => {}

  if (messageContext) {
    notifications = messageContext.notifications.filter((n) => n.userId === user?.id).slice(0, 5)
    unreadCount = messageContext.unreadNotificationsCount
    markNotificationAsRead = messageContext.markNotificationAsRead
    markAllNotificationsAsRead = messageContext.markAllNotificationsAsRead
  }

  if (!user) {
    return null
  }

  const handleNotificationClick = (id: string) => {
    markNotificationAsRead(id)
    setOpen(false)
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                markAllNotificationsAsRead()
                setOpen(false)
              }}
              className="text-xs h-7"
            >
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="py-4 text-center text-muted-foreground">No notifications</div>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} className="cursor-pointer">
              <Link
                href={notification.linkTo || "#"}
                className="w-full"
                onClick={() => handleNotificationClick(notification.id)}
              >
                <div className={`flex flex-col gap-1 ${!notification.read ? "font-medium" : ""}`}>
                  <div className="flex justify-between">
                    <span>{notification.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(notification.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{notification.content}</p>
                </div>
              </Link>
            </DropdownMenuItem>
          ))
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/notifications" className="w-full text-center cursor-pointer">
            View all notifications
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NotificationDropdown

