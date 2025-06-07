"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  RefreshCw,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  ShieldAlert,
  UserX,
  Eye,
  ShoppingBag,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { usePayment } from "@/lib/payment-context"
import AdminLayout from "@/components/admin-layout"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function UsersPage() {
  const { user } = useAuth()
  const { getAllTransactions } = usePayment()
  const router = useRouter()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState<any[]>([])
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<string | null>(null)
  const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false)
  const [userToBlock, setUserToBlock] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [viewingUser, setViewingUser] = useState<any>(null)
  const [userTransactions, setUserTransactions] = useState<any[]>([])

  // Redirect if not logged in or not an admin
  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/auth/login")
    }
  }, [user, router, isLoading])

  // Load users data
  useEffect(() => {
    const loadData = () => {
      const transactions = getAllTransactions()

      // Get unique users from transactions
      const transactionUsers = Array.from(
        new Map(
          transactions.map((t) => [
            t.userId,
            {
              id: t.userId,
              name: t.userName,
              email: t.userEmail,
              role: "buyer",
              status: "active",
              joinDate: new Date(t.date).toISOString().split("T")[0],
              orders: transactions.filter((o) => o.userId === t.userId).length,
              avatar:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHx8MA%3D",
              blocked: false,
            },
          ]),
        ).values(),
      )

      // Use only real transaction users, no mock data
      setUsers([...transactionUsers])
      setIsLoading(false)
    }

    loadData()
  }, [getAllTransactions])

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
          <p className="text-sm text-muted-foreground">Loading users...</p>
        </div>
      </div>
    )
  }

  // If not logged in or not an admin, don't render anything (will redirect)
  if (!user || user.role !== "admin") {
    return null
  }

  // Filter users based on search term and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      searchTerm === "" ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === null || roleFilter === "all" || user.role === roleFilter
    const matchesStatus =
      statusFilter === null ||
      statusFilter === "all" ||
      (statusFilter === "active" && user.status === "active" && !user.blocked) ||
      (statusFilter === "inactive" && user.status === "inactive") ||
      (statusFilter === "blocked" && user.blocked)

    return matchesSearch && matchesRole && matchesStatus
  })

  const handleDeleteClick = (userId: string) => {
    setUserToDelete(userId)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (userToDelete) {
      setUsers((prev) => prev.filter((u) => u.id !== userToDelete))
      setIsDeleteDialogOpen(false)
      setUserToDelete(null)

      toast({
        title: "User deleted",
        description: "The user has been deleted successfully.",
      })
    }
  }

  const handleBlockClick = (user: any) => {
    setUserToBlock(user)
    setIsBlockDialogOpen(true)
  }

  const confirmBlock = () => {
    if (userToBlock) {
      setUsers((prev) =>
        prev.map((u) => {
          if (u.id === userToBlock.id) {
            return {
              ...u,
              blocked: !u.blocked,
            }
          }
          return u
        }),
      )
      setIsBlockDialogOpen(false)

      toast({
        title: userToBlock.blocked ? "User unblocked" : "User blocked",
        description: userToBlock.blocked
          ? "The user has been unblocked successfully."
          : "The user has been blocked successfully.",
      })

      setUserToBlock(null)
    }
  }

  const toggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          return {
            ...u,
            status: u.status === "active" ? "inactive" : "active",
          }
        }
        return u
      }),
    )

    toast({
      title: "Status updated",
      description: "The user status has been updated successfully.",
    })
  }

  const handleViewUser = (userData: any) => {
    setViewingUser(userData)

    // Get user's transactions
    const transactions = getAllTransactions()
    const userTxns = transactions.filter((t) => t.userId === userData.id)
    setUserTransactions(userTxns)

    setIsViewDialogOpen(true)
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Users Management</h1>
            <p className="text-muted-foreground">View and manage all users on the platform.</p>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>All Users</CardTitle>
            <CardDescription>
              {filteredUsers.length} {filteredUsers.length === 1 ? "user" : "users"} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search users..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select
                  value={roleFilter || "all"}
                  onValueChange={(value) => setRoleFilter(value === "all" ? null : value)}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="buyer">Buyer</SelectItem>
                    <SelectItem value="seller">Seller</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={statusFilter || "all"}
                  onValueChange={(value) => setStatusFilter(value === "all" ? null : value)}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="blocked">Blocked</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" className="gap-2 hidden md:flex">
                  <Filter className="h-4 w-4" /> More Filters
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left font-medium">User</th>
                      <th className="px-4 py-3 text-left font-medium">Email</th>
                      <th className="px-4 py-3 text-left font-medium">Role</th>
                      <th className="px-4 py-3 text-left font-medium">Status</th>
                      <th className="px-4 py-3 text-left font-medium">Join Date</th>
                      <th className="px-4 py-3 text-left font-medium">Orders</th>
                      <th className="px-4 py-3 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <tr key={user.id} className="border-t">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full overflow-hidden">
                                <img
                                  src={user.avatar || "/placeholder.svg?height=32&width=32"}
                                  alt={user.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <span className="font-medium">{user.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">{user.email}</td>
                          <td className="px-4 py-3">
                            <Badge
                              variant="outline"
                              className={
                                user.role === "admin"
                                  ? "bg-purple-50 text-purple-700 border-purple-200"
                                  : user.role === "seller"
                                    ? "bg-blue-50 text-blue-700 border-blue-200"
                                    : "bg-green-50 text-green-700 border-green-200"
                              }
                            >
                              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              {user.blocked ? (
                                <>
                                  <ShieldAlert className="h-4 w-4 text-red-600" />
                                  <span className="text-red-600">Blocked</span>
                                </>
                              ) : user.status === "active" ? (
                                <>
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                  <span className="text-green-600">Active</span>
                                </>
                              ) : (
                                <>
                                  <XCircle className="h-4 w-4 text-amber-600" />
                                  <span className="text-amber-600">Inactive</span>
                                </>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">{user.joinDate}</td>
                          <td className="px-4 py-3">{user.orders}</td>
                          <td className="px-4 py-3 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleViewUser(user)}>
                                  <Eye className="h-4 w-4 mr-2" /> View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toggleUserStatus(user.id)}>
                                  {user.status === "active" ? "Deactivate" : "Activate"}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleBlockClick(user)}>
                                  <UserX className="h-4 w-4 mr-2" />
                                  {user.blocked ? "Unblock User" : "Block User"}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteClick(user.id)}>
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                          No users found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* View User Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>Detailed information about the user.</DialogDescription>
          </DialogHeader>
          {viewingUser && (
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>
              <TabsContent value="profile" className="space-y-4 mt-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden">
                    <img
                      src={viewingUser.avatar || "/placeholder.svg?height=64&width=64"}
                      alt={viewingUser.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{viewingUser.name}</h3>
                    <p className="text-sm text-muted-foreground">{viewingUser.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">User ID</h4>
                    <p>{viewingUser.id}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Role</h4>
                    <p>{viewingUser.role.charAt(0).toUpperCase() + viewingUser.role.slice(1)}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                    <p
                      className={
                        viewingUser.blocked
                          ? "text-red-600"
                          : viewingUser.status === "active"
                            ? "text-green-600"
                            : "text-amber-600"
                      }
                    >
                      {viewingUser.blocked
                        ? "Blocked"
                        : viewingUser.status.charAt(0).toUpperCase() + viewingUser.status.slice(1)}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Join Date</h4>
                    <p>{viewingUser.joinDate}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Total Orders</h4>
                    <p>{viewingUser.orders}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Last Login</h4>
                    <p>{new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="orders" className="mt-4">
                <div className="rounded-md border">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="px-4 py-3 text-left font-medium">Order ID</th>
                          <th className="px-4 py-3 text-left font-medium">Date</th>
                          <th className="px-4 py-3 text-left font-medium">Amount</th>
                          <th className="px-4 py-3 text-left font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userTransactions.length > 0 ? (
                          userTransactions.map((transaction) => (
                            <tr key={transaction.id} className="border-t">
                              <td className="px-4 py-3">{transaction.id}</td>
                              <td className="px-4 py-3">{new Date(transaction.date).toLocaleDateString()}</td>
                              <td className="px-4 py-3">${transaction.amount.toFixed(2)}</td>
                              <td className="px-4 py-3">
                                <Badge
                                  className={
                                    transaction.status === "completed"
                                      ? "bg-green-100 text-green-800"
                                      : transaction.status === "pending"
                                        ? "bg-amber-100 text-amber-800"
                                        : "bg-red-100 text-red-800"
                                  }
                                >
                                  {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                </Badge>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                              No orders found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="activity" className="mt-4">
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium">Recent Activity</h4>
                    <div className="mt-4 space-y-4">
                      {userTransactions.length > 0 ? (
                        userTransactions.slice(0, 5).map((transaction, index) => (
                          <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <ShoppingBag className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">Placed an order</p>
                              <p className="text-xs text-muted-foreground">
                                Order #{transaction.id} for ${transaction.amount.toFixed(2)}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(transaction.date).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-center py-4 text-muted-foreground">No recent activity</p>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Block User Dialog */}
      <Dialog open={isBlockDialogOpen} onOpenChange={setIsBlockDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{userToBlock?.blocked ? "Unblock User" : "Block User"}</DialogTitle>
            <DialogDescription>
              {userToBlock?.blocked
                ? "Are you sure you want to unblock this user? They will regain access to the platform."
                : "Are you sure you want to block this user? They will lose access to the platform."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBlockDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant={userToBlock?.blocked ? "default" : "destructive"} onClick={confirmBlock}>
              {userToBlock?.blocked ? "Unblock" : "Block"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}

