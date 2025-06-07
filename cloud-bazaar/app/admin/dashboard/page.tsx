"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Users,
  Package,
  ShoppingBag,
  DollarSign,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Download,
  RefreshCw,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { usePayment, type Transaction } from "@/lib/payment-context"
import AdminLayout from "@/components/admin-layout"
import { allProducts, categories } from "@/lib/data"
import { exportTransactionsToCSV, exportProductsToCSV, exportUsersToCSV } from "@/lib/export-utils"
import { useToast } from "@/hooks/use-toast"

export default function AdminDashboard() {
  const { user } = useAuth()
  const { getAllTransactions } = usePayment()
  const router = useRouter()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: allProducts.length,
    totalUsers: 0,
  })

  // Redirect if not logged in or not an admin
  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/auth/login")
    }
  }, [user, router, isLoading])

  // Load transactions and calculate stats
  useEffect(() => {
    const loadData = () => {
      const allTransactions = getAllTransactions()
      setTransactions(allTransactions)

      // Calculate stats from real transaction data
      const totalRevenue = allTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)
      const totalOrders = allTransactions.length
      const uniqueUserIds = new Set(allTransactions.map((t) => t.userId))
      const totalUsers = uniqueUserIds.size // Only count real users from transactions

      setStats({
        totalRevenue,
        totalOrders,
        totalProducts: allProducts.length,
        totalUsers: totalUsers,
      })

      setIsLoading(false)
    }

    loadData()

    // Set up an interval to refresh data every 30 seconds
    const intervalId = setInterval(loadData, 30000)

    return () => clearInterval(intervalId)
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
          <p className="text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  // If not logged in or not an admin, don't render anything (will redirect)
  if (!user || user.role !== "admin") {
    return null
  }

  // Get recent orders from transactions
  const recentOrders = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)
    .map((transaction) => ({
      id: transaction.id,
      customer: transaction.userName,
      date: new Date(transaction.date).toISOString().split("T")[0],
      status: transaction.status,
      total: `$${transaction.amount.toFixed(2)}`,
    }))

  // Calculate seller performance from real transaction data
  const sellerPerformance: Record<string, { sales: number; revenue: number; name: string }> = {}

  transactions.forEach((transaction) => {
    transaction.items.forEach((item) => {
      if (!sellerPerformance[item.sellerId]) {
        sellerPerformance[item.sellerId] = {
          sales: 0,
          revenue: 0,
          name: item.sellerName,
        }
      }

      sellerPerformance[item.sellerId].sales += item.quantity
      sellerPerformance[item.sellerId].revenue += item.price * item.quantity
    })
  })

  // Convert to array and sort by revenue
  const topSellers = Object.entries(sellerPerformance)
    .map(([id, data]) => ({
      id,
      name: data.name,
      sales: data.sales,
      revenue: data.revenue,
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 3)

  // Calculate product performance from real transaction data
  const productPerformance: Record<string, { sales: number; revenue: number; name: string }> = {}

  transactions.forEach((transaction) => {
    transaction.items.forEach((item) => {
      if (!productPerformance[item.id]) {
        productPerformance[item.id] = {
          sales: 0,
          revenue: 0,
          name: item.name,
        }
      }

      productPerformance[item.id].sales += item.quantity
      productPerformance[item.id].revenue += item.price * item.quantity
    })
  })

  // Convert to array and sort by sales
  const topProducts = Object.entries(productPerformance)
    .map(([id, data]) => ({
      id,
      name: data.name,
      sales: data.sales,
      revenue: data.revenue,
    }))
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 3)

  // Handle export data
  const handleExportData = () => {
    try {
      exportTransactionsToCSV(transactions)
      toast({
        title: "Export successful",
        description: "Transaction data has been exported to CSV.",
      })
    } catch (error) {
      toast({
        title: "Export failed",
        description: "There was an error exporting the data.",
        variant: "destructive",
      })
    }
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user.name}! Here's an overview of your marketplace.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-1" onClick={handleExportData}>
              <Download className="h-4 w-4" /> Export Data
            </Button>
            <Button className="gap-1" onClick={() => router.push("/admin/dashboard/products")}>
              <Plus className="h-4 w-4" /> Add Product
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <h3 className="text-2xl font-bold mt-1">${stats.totalRevenue.toFixed(2)}</h3>
                </div>
                <div className="p-2 rounded-full bg-green-100">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs flex items-center gap-1 text-green-600">
                  {transactions.length > 0 ? "+15.3%" : "0%"}
                  <span className="text-muted-foreground">from last month</span>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                  <h3 className="text-2xl font-bold mt-1">{stats.totalOrders}</h3>
                </div>
                <div className="p-2 rounded-full bg-blue-100">
                  <ShoppingBag className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs flex items-center gap-1 text-blue-600">
                  {transactions.length > 0 ? "+8.2%" : "0%"}
                  <span className="text-muted-foreground">from last month</span>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                  <h3 className="text-2xl font-bold mt-1">{stats.totalProducts}</h3>
                </div>
                <div className="p-2 rounded-full bg-purple-100">
                  <Package className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs flex items-center gap-1 text-purple-600">
                  +12.5%
                  <span className="text-muted-foreground">from last month</span>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <h3 className="text-2xl font-bold mt-1">{stats.totalUsers}</h3>
                </div>
                <div className="p-2 rounded-full bg-amber-100">
                  <Users className="h-5 w-5 text-amber-600" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs flex items-center gap-1 text-amber-600">
                  {stats.totalUsers > 0 ? "+18.7%" : "0%"}
                  <span className="text-muted-foreground">from last month</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="sellers">Sellers</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sales Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Monthly revenue for the current year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                    <div className="flex flex-col items-center text-muted-foreground">
                      <BarChart className="h-10 w-10 mb-2" />
                      <p>Revenue chart visualization would appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Orders */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Latest {recentOrders.length} orders across the platform</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => router.push("/admin/dashboard/orders")}>
                    View All
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.length > 0 ? (
                      recentOrders.map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                        >
                          <div>
                            <p className="font-medium">{order.id}</p>
                            <p className="text-sm text-muted-foreground">{order.customer}</p>
                            <p className="text-xs text-muted-foreground">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{order.total}</p>
                            <p
                              className={`text-xs ${
                                order.status === "completed"
                                  ? "text-green-600"
                                  : order.status === "failed"
                                    ? "text-red-600"
                                    : "text-amber-600"
                              }`}
                            >
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center py-4 text-muted-foreground">No orders yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Top Sellers */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Sellers</CardTitle>
                  <CardDescription>Best performing sellers this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topSellers.length > 0 ? (
                      topSellers.map((seller) => (
                        <div key={seller.id} className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                            <Users className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{seller.name}</p>
                            <p className="text-sm text-muted-foreground">{seller.sales} products sold</p>
                          </div>
                          <p className="font-medium">${seller.revenue.toFixed(2)}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-center py-4 text-muted-foreground">No seller data yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Top Products */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Products</CardTitle>
                  <CardDescription>Best selling products this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topProducts.length > 0 ? (
                      topProducts.map((product) => (
                        <div key={product.id} className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                            <Package className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">{product.sales} units sold</p>
                          </div>
                          <p className="font-medium">${product.revenue.toFixed(2)}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-center py-4 text-muted-foreground">No product data yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Orders Management</CardTitle>
                  <CardDescription>View and manage all orders on the platform</CardDescription>
                </div>
                <Button
                  variant="outline"
                  className="gap-1"
                  onClick={() => {
                    exportTransactionsToCSV(transactions)
                    toast({
                      title: "Export successful",
                      description: "Orders data has been exported to CSV.",
                    })
                  }}
                >
                  <Download className="h-4 w-4" /> Export Orders
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search orders..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" /> Filter
                  </Button>
                </div>

                <div className="rounded-md border">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="px-4 py-3 text-left font-medium">Order ID</th>
                          <th className="px-4 py-3 text-left font-medium">Customer</th>
                          <th className="px-4 py-3 text-left font-medium">Date</th>
                          <th className="px-4 py-3 text-left font-medium">Status</th>
                          <th className="px-4 py-3 text-left font-medium">Total</th>
                          <th className="px-4 py-3 text-right font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.length > 0 ? (
                          transactions.map((transaction) => (
                            <tr key={transaction.id} className="border-t">
                              <td className="px-4 py-3">{transaction.id}</td>
                              <td className="px-4 py-3">{transaction.userName}</td>
                              <td className="px-4 py-3">{new Date(transaction.date).toLocaleDateString()}</td>
                              <td className="px-4 py-3">
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    transaction.status === "completed"
                                      ? "bg-green-100 text-green-800"
                                      : transaction.status === "failed"
                                        ? "bg-red-100 text-red-800"
                                        : transaction.status === "refunded"
                                          ? "bg-red-100 text-red-800"
                                          : "bg-amber-100 text-amber-800"
                                  }`}
                                >
                                  {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                </span>
                              </td>
                              <td className="px-4 py-3">${transaction.amount.toFixed(2)}</td>
                              <td className="px-4 py-3 text-right">
                                <Link href={`/order-confirmation/${transaction.id}`}>
                                  <Button variant="ghost" size="sm">
                                    View
                                  </Button>
                                </Link>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                              No orders found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Products Management</CardTitle>
                  <CardDescription>View and manage all products on the platform</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="gap-1"
                    onClick={() => {
                      exportProductsToCSV(allProducts)
                      toast({
                        title: "Export successful",
                        description: "Products data has been exported to CSV.",
                      })
                    }}
                  >
                    <Download className="h-4 w-4" /> Export Products
                  </Button>
                  <Button className="gap-1" onClick={() => router.push("/admin/dashboard/products")}>
                    <Plus className="h-4 w-4" /> Add Product
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search products..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" /> Filter
                  </Button>
                </div>

                <div className="rounded-md border">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="px-4 py-3 text-left font-medium">ID</th>
                          <th className="px-4 py-3 text-left font-medium">Product</th>
                          <th className="px-4 py-3 text-left font-medium">Category</th>
                          <th className="px-4 py-3 text-left font-medium">Price</th>
                          <th className="px-4 py-3 text-left font-medium">Seller</th>
                          <th className="px-4 py-3 text-right font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allProducts.slice(0, 10).map((product) => (
                          <tr key={product.id} className="border-t">
                            <td className="px-4 py-3">{product.id}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-md overflow-hidden">
                                  <img
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.name}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <span>{product.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              {categories.find(
                                (c) =>
                                  product.name.toLowerCase().includes(c.name.toLowerCase()) ||
                                  (product.description &&
                                    product.description.toLowerCase().includes(c.name.toLowerCase())),
                              )?.name || "Uncategorized"}
                            </td>
                            <td className="px-4 py-3">${product.price.toFixed(2)}</td>
                            <td className="px-4 py-3">{product.seller}</td>
                            <td className="px-4 py-3 text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => router.push("/admin/dashboard/products")}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Users Management</CardTitle>
                  <CardDescription>View and manage all users on the platform</CardDescription>
                </div>
                <Button
                  variant="outline"
                  className="gap-1"
                  onClick={() => {
                    // Get unique users from transactions
                    const users = [
                      ...new Map(
                        transactions.map((t) => [
                          t.userId,
                          {
                            id: t.userId,
                            name: t.userName,
                            email: t.userEmail,
                            orders: transactions.filter((o) => o.userId === t.userId).length,
                          },
                        ]),
                      ).values(),
                    ]

                    exportUsersToCSV(users)
                    toast({
                      title: "Export successful",
                      description: "Users data has been exported to CSV.",
                    })
                  }}
                >
                  <Download className="h-4 w-4" /> Export Users
                </Button>
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
                  <Button variant="outline" className="gap-2" onClick={() => router.push("/admin/dashboard/users")}>
                    <Filter className="h-4 w-4" /> Filter
                  </Button>
                </div>

                <div className="rounded-md border">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="px-4 py-3 text-left font-medium">Name</th>
                          <th className="px-4 py-3 text-left font-medium">Email</th>
                          <th className="px-4 py-3 text-left font-medium">Role</th>
                          <th className="px-4 py-3 text-left font-medium">Status</th>
                          <th className="px-4 py-3 text-left font-medium">Orders</th>
                          <th className="px-4 py-3 text-right font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.length > 0 ? (
                          // Get unique users from transactions
                          [
                            ...new Map(
                              transactions.map((t) => [
                                t.userId,
                                {
                                  id: t.userId,
                                  name: t.userName,
                                  email: t.userEmail,
                                  orders: transactions.filter((o) => o.userId === t.userId).length,
                                },
                              ]),
                            ).values(),
                          ].map((user) => (
                            <tr key={user.id} className="border-t">
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="text-xs font-medium">{user.name.charAt(0)}</span>
                                  </div>
                                  <span>{user.name}</span>
                                </div>
                              </td>
                              <td className="px-4 py-3">{user.email}</td>
                              <td className="px-4 py-3">
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                  Buyer
                                </Badge>
                              </td>
                              <td className="px-4 py-3">
                                <span className="flex items-center gap-1 text-green-600">
                                  <CheckCircle className="h-4 w-4" /> Active
                                </span>
                              </td>
                              <td className="px-4 py-3">{user.orders}</td>
                              <td className="px-4 py-3 text-right">
                                <Button variant="ghost" size="sm" onClick={() => router.push("/admin/dashboard/users")}>
                                  View
                                </Button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
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
          </TabsContent>

          {/* Sellers Tab */}
          <TabsContent value="sellers">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Sellers Management</CardTitle>
                  <CardDescription>View and manage all sellers on the platform</CardDescription>
                </div>
                <Button
                  variant="outline"
                  className="gap-1"
                  onClick={() => {
                    exportUsersToCSV(
                      topSellers.map((seller) => ({
                        id: seller.id,
                        name: seller.name,
                        email: `${seller.name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
                        role: "seller",
                        orders: transactions.filter((t) => t.items.some((item) => item.sellerId === seller.id)).length,
                      })),
                    )
                    toast({
                      title: "Export successful",
                      description: "Sellers data has been exported to CSV.",
                    })
                  }}
                >
                  <Download className="h-4 w-4" /> Export Sellers
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search sellers..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" className="gap-2" onClick={() => router.push("/admin/dashboard/sellers")}>
                    <Filter className="h-4 w-4" /> Filter
                  </Button>
                </div>

                <div className="rounded-md border">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="px-4 py-3 text-left font-medium">Seller</th>
                          <th className="px-4 py-3 text-left font-medium">Products</th>
                          <th className="px-4 py-3 text-left font-medium">Revenue</th>
                          <th className="px-4 py-3 text-left font-medium">Orders</th>
                          <th className="px-4 py-3 text-left font-medium">Status</th>
                          <th className="px-4 py-3 text-right font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topSellers.length > 0 ? (
                          topSellers.map((seller) => (
                            <tr key={seller.id} className="border-t">
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="text-xs font-medium">{seller.name.charAt(0)}</span>
                                  </div>
                                  <span>{seller.name}</span>
                                </div>
                              </td>
                              <td className="px-4 py-3">{seller.sales}</td>
                              <td className="px-4 py-3">${seller.revenue.toFixed(2)}</td>
                              <td className="px-4 py-3">
                                {transactions.filter((t) => t.items.some((item) => item.sellerId === seller.id)).length}
                              </td>
                              <td className="px-4 py-3">
                                <span className="flex items-center gap-1 text-green-600">
                                  <CheckCircle className="h-4 w-4" /> Verified
                                </span>
                              </td>
                              <td className="px-4 py-3 text-right">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => router.push("/admin/dashboard/sellers")}
                                >
                                  View
                                </Button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                              No sellers found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}

