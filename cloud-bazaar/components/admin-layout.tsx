"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  BarChart,
  ShoppingBag,
  Users,
  Package,
  Tag,
  Settings,
  HelpCircle,
  CreditCard,
  Menu,
  Bell,
  LogOut,
  User,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useMessages } from "@/lib/message-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: BarChart },
  { name: "Orders", href: "/admin/dashboard/orders", icon: ShoppingBag },
  { name: "Products", href: "/admin/dashboard/products", icon: Package },
  { name: "Categories", href: "/admin/dashboard/categories", icon: Tag },
  { name: "Users", href: "/admin/dashboard/users", icon: Users },
  { name: "Sellers", href: "/admin/dashboard/sellers", icon: Users },
  { name: "Payments", href: "/admin/dashboard/payments", icon: CreditCard },
  { name: "Settings", href: "/admin/dashboard/settings", icon: Settings },
  { name: "Help & Support", href: "/admin/dashboard/support", icon: HelpCircle },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  // Get admin notifications
  const messageContext = useMessages()
  const adminNotifications = messageContext.notifications.filter((n) => n.userId === "admin1")
  const unreadCount = adminNotifications.filter((n) => !n.read).length

  const handleLogout = () => {
    logout()
    router.push("/auth/login")
  }

  if (!user || user.role !== "admin") {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <nav className="grid gap-2 text-lg font-medium">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                      isActive ? "bg-muted" : "hover:bg-muted"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
            <Package className="h-6 w-6" />
            <span className="hidden md:inline-block">Cloud Bazaar Admin</span>
          </Link>
        </div>
        <div className="flex-1"></div>
        <div className="flex items-center gap-4">
          {/* Admin Notifications */}
          <DropdownMenu>
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
                <span>Admin Notifications</span>
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      adminNotifications.forEach((n) => messageContext.markNotificationAsRead(n.id))
                    }}
                    className="text-xs h-7"
                  >
                    Mark all as read
                  </Button>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {adminNotifications.length === 0 ? (
                <div className="py-4 text-center text-muted-foreground">No notifications</div>
              ) : (
                <div className="max-h-[300px] overflow-y-auto">
                  {adminNotifications.map((notification) => (
                    <DropdownMenuItem key={notification.id} className="cursor-pointer p-3">
                      <Link
                        href={notification.linkTo || "#"}
                        className="w-full"
                        onClick={() => messageContext.markNotificationAsRead(notification.id)}
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
                  ))}
                </div>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/admin/dashboard/notifications" className="w-full text-center cursor-pointer">
                  View all notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Admin Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/admin/dashboard/profile")}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/admin/dashboard/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="flex-1">
        <div className="container mx-auto p-4 sm:p-6 md:p-8">{children}</div>
      </div>
    </div>
  )
}

