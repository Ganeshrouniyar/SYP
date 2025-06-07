"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  BarChart,
  Package,
  ShoppingBag,
  Users,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Plus,
  Search,
  Filter,
  RefreshCw,
  Settings,
  HelpCircle,
  UserPlus,
  ShoppingCart,
  CreditCard,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react"
import SellerLayout from "@/components/seller-layout"
import { useAuth } from "@/lib/auth-context"
import { usePayment } from "@/lib/payment-context"
import { allProducts } from "@/lib/data"

export default function SellerDashboard() {
  const { user } = useAuth()
  const { getSellerTransactions } = usePayment()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [sellerTransactions, setSellerTransactions] = useState<any[]>([])
  const [sellerProducts, setSellerProducts] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalSales: 0,
    orders: 0,
    products: 0,
    customers: 0,
    pendingOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0,
  })

  // Redirect if not logged in or not a seller
  useEffect(() => {
    if (!isLoading && (!user || user.role !== "seller")) {
      router.push("/auth/login")
    }
  }, [user, router, isLoading])

  // Load seller data
  useEffect(() => {
    if (!user) return

    const loadData = () => {
      // Get transactions for this seller
      const transactions = getSellerTransactions()
      setSellerTransactions(transactions)

      // Get products for this seller
      const products = allProducts.filter((p) => p.seller === user.name)
      setSellerProducts(products)

      // Calculate stats
      const totalSales = transactions.reduce((sum, transaction) => {
        return (
          sum +
          transaction.items
            .filter((item) => item.sellerId === user.id)
            .reduce((itemSum, item) => itemSum + item.price * item.quantity, 0)
        )
      }, 0)

      const orders = transactions.length
      const uniqueCustomers = new Set(transactions.map((t) => t.userId)).size
      const pendingOrders = transactions.filter((t) => t.status === "pending").length
      const completedOrders = transactions.filter((t) => t.status === "completed").length
      const cancelledOrders = transactions.filter((t) => t.status === "failed").length

      setStats({
        totalSales,
        orders,
        products: products.length,
        customers: uniqueCustomers,
        pendingOrders,
        completedOrders,
        cancelledOrders,
      })

      setIsLoading(false)
    }

    loadData()

    // Set up an interval to refresh data every 30 seconds
    const intervalId = setInterval(loadData, 30000)

    return () => clearInterval(intervalId)
  }, [user, getSellerTransactions])

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

  // If not logged in or not a seller, don't render anything (will redirect)
  if (!user || user.role !== "seller") {
    return null
  }

  // Get recent orders from transactions
  const recentOrders = sellerTransactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)
    .map((transaction) => ({
      id: transaction.id,
      customer: transaction.userName,
      date: new Date(transaction.date).toISOString().split("T")[0],
      status:
        transaction.status === "completed"
          ? "Delivered"
          : transaction.status === "pending"
            ? "Processing"
            : transaction.status === "failed"
              ? "Cancelled"
              : "Shipped",
      total: `$${transaction.items
        .filter((item) => item.sellerId === user.id)
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
        .toFixed(2)}`,
    }))

  return (
    <SellerLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Seller Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user.name}! Here's an overview of your store performance.
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/seller/dashboard/products/new">
              <Button className="gap-1">
                <Plus className="h-4 w-4" /> Add Product
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Sales</p>
                  <h3 className="text-2xl font-bold mt-1">${stats.totalSales.toFixed(2)}</h3>
                </div>
                <div className="p-2 rounded-full bg-green-100">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs flex items-center gap-1 text-green-600">
                  +12.5%
                  <TrendingUp className="h-3 w-3" />
                  <span className="text-muted-foreground">from last month</span>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Orders</p>
                  <h3 className="text-2xl font-bold mt-1">{stats.orders}</h3>
                </div>
                <div className="p-2 rounded-full bg-blue-100">
                  <ShoppingBag className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs flex items-center gap-1 text-blue-600">
                  +8.2%
                  <TrendingUp className="h-3 w-3" />
                  <span className="text-muted-foreground">from last month</span>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Products</p>
                  <h3 className="text-2xl font-bold mt-1">{stats.products}</h3>
                </div>
                <div className="p-2 rounded-full bg-purple-100">
                  <Package className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs flex items-center gap-1 text-purple-600">
                  +4
                  <TrendingUp className="h-3 w-3" />
                  <span className="text-muted-foreground">from last month</span>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Customers</p>
                  <h3 className="text-2xl font-bold mt-1">{stats.customers}</h3>
                </div>
                <div className="p-2 rounded-full bg-amber-100">
                  <Users className="h-5 w-5 text-amber-600" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs flex items-center gap-1 text-amber-600">
                  +15.3%
                  <TrendingUp className="h-3 w-3" />
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
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="help">Help & Support</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sales Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Sales Overview</CardTitle>
                  <CardDescription>Your sales performance for the last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                    <div className="flex flex-col items-center text-muted-foreground">
                      <BarChart className="h-10 w-10 mb-2" />
                      <p>Sales chart visualization would appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Orders */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Your latest {recentOrders.length} orders</CardDescription>
                  </div>
                  <Link href="/seller/dashboard/orders">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
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
                                order.status === "Delivered"
                                  ? "text-green-600"
                                  : order.status === "Cancelled"
                                    ? "text-red-600"
                                    : "text-amber-600"
                              }`}
                            >
                              {order.status}
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

              {/* Order Status Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Status</CardTitle>
                  <CardDescription>Overview of your order statuses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-amber-500" />
                        <span>Pending</span>
                      </div>
                      <span className="font-medium">{stats.pendingOrders}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Completed</span>
                      </div>
                      <span className="font-medium">{stats.completedOrders}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        <span>Cancelled</span>
                      </div>
                      <span className="font-medium">{stats.cancelledOrders}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Products */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Products</CardTitle>
                  <CardDescription>Your best selling products this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sellerProducts.slice(0, 3).map((product, index) => (
                      <div key={product.id} className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center overflow-hidden">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {Math.floor(Math.random() * 20) + 10} units sold
                          </p>
                        </div>
                        <p className="font-medium">
                          ${(product.price * (Math.floor(Math.random() * 20) + 10)).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Orders Management</CardTitle>
                <CardDescription>View and manage all your orders</CardDescription>
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
                        {sellerTransactions.length > 0 ? (
                          sellerTransactions.map((transaction) => (
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
                                  {transaction.status === "completed"
                                    ? "Delivered"
                                    : transaction.status === "pending"
                                      ? "Processing"
                                      : transaction.status === "failed"
                                        ? "Cancelled"
                                        : "Shipped"}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                $
                                {transaction.items
                                  .filter((item) => item.sellerId === user.id)
                                  .reduce((sum, item) => sum + item.price * item.quantity, 0)
                                  .toFixed(2)}
                              </td>
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
              <CardHeader>
                <CardTitle>Products Management</CardTitle>
                <CardDescription>View and manage your product listings</CardDescription>
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
                  <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                      <Filter className="h-4 w-4" /> Filter
                    </Button>
                    <Link href="/seller/dashboard/products/new">
                      <Button className="gap-1">
                        <Plus className="h-4 w-4" /> Add Product
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="rounded-md border">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="px-4 py-3 text-left font-medium">Product ID</th>
                          <th className="px-4 py-3 text-left font-medium">Name</th>
                          <th className="px-4 py-3 text-left font-medium">Price</th>
                          <th className="px-4 py-3 text-left font-medium">Stock</th>
                          <th className="px-4 py-3 text-left font-medium">Category</th>
                          <th className="px-4 py-3 text-left font-medium">Status</th>
                          <th className="px-4 py-3 text-right font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sellerProducts.map((product) => (
                          <tr key={product.id} className="border-t">
                            <td className="px-4 py-3">{product.id}</td>
                            <td className="px-4 py-3">{product.name}</td>
                            <td className="px-4 py-3">${product.price.toFixed(2)}</td>
                            <td className="px-4 py-3">{Math.floor(Math.random() * 50) + 5}</td>
                            <td className="px-4 py-3">Electronics</td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Active
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
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

          {/* Customers Tab */}
          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <CardTitle>Customer Management</CardTitle>
                <CardDescription>View and manage your customer relationships</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search customers..."
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
                          <th className="px-4 py-3 text-left font-medium">Customer ID</th>
                          <th className="px-4 py-3 text-left font-medium">Name</th>
                          <th className="px-4 py-3 text-left font-medium">Email</th>
                          <th className="px-4 py-3 text-left font-medium">Orders</th>
                          <th className="px-4 py-3 text-left font-medium">Total Spent</th>
                          <th className="px-4 py-3 text-right font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from(new Set(sellerTransactions.map((t) => t.userId))).map((userId) => {
                          const customerTransactions = sellerTransactions.filter((t) => t.userId === userId)
                          const totalSpent = customerTransactions.reduce((sum, t) => {
                            return (
                              sum +
                              t.items
                                .filter((item) => item.sellerId === user.id)
                                .reduce((itemSum, item) => itemSum + item.price * item.quantity, 0)
                            )
                          }, 0)

                          return (
                            <tr key={userId} className="border-t">
                              <td className="px-4 py-3">{userId}</td>
                              <td className="px-4 py-3">{customerTransactions[0].userName}</td>
                              <td className="px-4 py-3">{customerTransactions[0].userEmail}</td>
                              <td className="px-4 py-3">{customerTransactions.length}</td>
                              <td className="px-4 py-3">${totalSpent.toFixed(2)}</td>
                              <td className="px-4 py-3 text-right">
                                <Button variant="ghost" size="sm">
                                  View Details
                                </Button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Store Settings</CardTitle>
                <CardDescription>Manage your store settings and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Store Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Store Name</label>
                        <Input defaultValue={user.name} className="mt-1" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <Input defaultValue={user.email} className="mt-1" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Payment Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Bank Account</label>
                        <Input placeholder="Enter bank account details" className="mt-1" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Tax Information</label>
                        <Input placeholder="Enter tax information" className="mt-1" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Shipping Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Default Shipping Method</label>
                        <Input placeholder="Enter default shipping method" className="mt-1" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Shipping Regions</label>
                        <Input placeholder="Enter shipping regions" className="mt-1" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button>Save Changes</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Help & Support Tab */}
          <TabsContent value="help">
            <Card>
              <CardHeader>
                <CardTitle>Help & Support</CardTitle>
                <CardDescription>Get help and support for your store</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Frequently Asked Questions</h3>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium">How do I add a new product?</h4>
                        <p className="text-sm text-muted-foreground mt-2">
                          Click on the "Add Product" button in the Products tab and fill out the required information.
                        </p>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium">How do I process orders?</h4>
                        <p className="text-sm text-muted-foreground mt-2">
                          Go to the Orders tab, find the order you want to process, and click "View" to see the details.
                        </p>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium">How do I update my store settings?</h4>
                        <p className="text-sm text-muted-foreground mt-2">
                          Navigate to the Settings tab and update your store information, payment settings, and shipping settings.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Contact Support</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Subject</label>
                        <Input placeholder="Enter your subject" className="mt-1" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Message</label>
                        <textarea
                          className="w-full min-h-[100px] p-2 border rounded-md mt-1"
                          placeholder="Enter your message"
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button>Submit Ticket</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SellerLayout>
  )
}

