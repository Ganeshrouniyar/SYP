"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  Package,
  Heart,
  LogOut,
  ChevronRight,
  Search,
  X,
  ExternalLink,
  Truck,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"

// Mock order data
const orders = [
  {
    id: "ORD-12345",
    date: "2023-03-15",
    status: "Delivered",
    total: 129.99,
    items: [
      {
        id: "1",
        name: "Wireless Noise Cancelling Headphones",
        price: 129.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D",
      },
    ],
    tracking: {
      number: "TRK123456789",
      carrier: "FedEx",
      events: [
        { date: "2023-03-15", time: "14:30", status: "Delivered", location: "New York, NY" },
        { date: "2023-03-14", time: "09:15", status: "Out for Delivery", location: "New York, NY" },
        { date: "2023-03-13", time: "18:45", status: "Arrived at Destination", location: "New York, NY" },
        { date: "2023-03-12", time: "08:30", status: "In Transit", location: "Chicago, IL" },
        { date: "2023-03-11", time: "16:20", status: "Shipped", location: "Los Angeles, CA" },
        { date: "2023-03-10", time: "11:00", status: "Order Processed", location: "Los Angeles, CA" },
      ],
    },
  },
  {
    id: "ORD-67890",
    date: "2023-03-10",
    status: "Shipped",
    total: 79.99,
    items: [
      {
        id: "4",
        name: "Bluetooth Speaker",
        price: 79.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZXRvb3RoJTIwc3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D",
      },
    ],
    tracking: {
      number: "TRK987654321",
      carrier: "UPS",
      events: [
        { date: "2023-03-14", time: "10:30", status: "In Transit", location: "Denver, CO" },
        { date: "2023-03-13", time: "14:15", status: "Shipped", location: "Seattle, WA" },
        { date: "2023-03-12", time: "09:45", status: "Order Processed", location: "Seattle, WA" },
      ],
    },
  },
  {
    id: "ORD-24680",
    date: "2023-03-05",
    status: "Processing",
    total: 259.98,
    items: [
      {
        id: "2",
        name: "Smart Watch",
        price: 199.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNtYXJ0JTIwd2F0Y2h8ZW58MHx8MHx8fDA%3D",
      },
      {
        id: "3",
        name: "Laptop Backpack",
        price: 59.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGFwdG9wJTIwYmFja3BhY2t8ZW58MHx8MHx8fDA%3D",
      },
    ],
  },
  {
    id: "ORD-13579",
    date: "2023-02-28",
    status: "Cancelled",
    total: 449.99,
    items: [
      {
        id: "5",
        name: "Digital Camera",
        price: 449.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlnaXRhbCUyMGNhbWVyYXxlbnwwfHwwfHx8MA%3D%3D",
      },
    ],
  },
]

export default function OrdersPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  // Redirect if not logged in
  if (!user) {
    router.push("/auth/login")
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  // Filter orders based on search term and status filter
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      searchTerm === "" ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === null || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Get the selected order details
  const orderDetails = selectedOrder ? orders.find((order) => order.id === selectedOrder) : null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800"
      case "Shipped":
        return "bg-blue-100 text-blue-800"
      case "Processing":
        return "bg-amber-100 text-amber-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />
      case "Shipped":
        return <Truck className="h-5 w-5 text-blue-600" />
      case "Processing":
        return <Clock className="h-5 w-5 text-amber-600" />
      case "Cancelled":
        return <AlertCircle className="h-5 w-5 text-red-600" />
      default:
        return null
    }
  }

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-6">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <span className="text-foreground font-medium">My Orders</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>

              <nav className="space-y-1">
                <Link href="/account" className="flex items-center gap-3 p-2 rounded-md hover:bg-muted">
                  <User className="h-5 w-5" />
                  <span>Account Details</span>
                </Link>
                <Link
                  href="/orders"
                  className="flex items-center gap-3 p-2 rounded-md bg-primary/10 text-primary font-medium"
                >
                  <Package className="h-5 w-5" />
                  <span>Orders</span>
                </Link>
                <Link href="/wishlist" className="flex items-center gap-3 p-2 rounded-md hover:bg-muted">
                  <Heart className="h-5 w-5" />
                  <span>Wishlist</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-muted text-left"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>My Orders</CardTitle>
              <CardDescription>View and track your order history</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search orders..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={() => setSearchTerm("")}
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                  )}
                </div>
                <div className="flex gap-2">
                  <Tabs defaultValue="all" onValueChange={(value) => setStatusFilter(value === "all" ? null : value)}>
                    <TabsList>
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="Processing">Processing</TabsTrigger>
                      <TabsTrigger value="Shipped">Shipped</TabsTrigger>
                      <TabsTrigger value="Delivered">Delivered</TabsTrigger>
                      <TabsTrigger value="Cancelled">Cancelled</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>

              {/* Orders List */}
              {filteredOrders.length > 0 ? (
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${selectedOrder === order.id ? "border-primary bg-primary/5" : "hover:border-primary/50"}`}
                      onClick={() => setSelectedOrder(order.id)}
                    >
                      <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium">{order.id}</h3>
                            <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Ordered on {new Date(order.date).toLocaleDateString()}
                          </p>
                          <p className="font-medium">${order.total.toFixed(2)}</p>
                        </div>
                        <div className="flex flex-wrap gap-2 items-center">
                          {order.items.map((item) => (
                            <div key={item.id} className="h-12 w-12 rounded-md overflow-hidden">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No orders found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm || statusFilter
                      ? "Try adjusting your search or filter criteria"
                      : "You haven't placed any orders yet"}
                  </p>
                  {(searchTerm || statusFilter) && (
                    <Button
                      onClick={() => {
                        setSearchTerm("")
                        setStatusFilter(null)
                      }}
                    >
                      Clear Filters
                    </Button>
                  )}
                  {!searchTerm && !statusFilter && (
                    <Link href="/products">
                      <Button>Start Shopping</Button>
                    </Link>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Details */}
          {orderDetails && (
            <Card className="mt-6">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Order Details</CardTitle>
                  <CardDescription>Order {orderDetails.id}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(orderDetails.status)}
                  <Badge className={getStatusColor(orderDetails.status)}>{orderDetails.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Order Summary */}
                  <div>
                    <h3 className="font-medium mb-2">Order Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Order Date</p>
                        <p>{new Date(orderDetails.date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Order Total</p>
                        <p>${orderDetails.total.toFixed(2)}</p>
                      </div>
                      {orderDetails.tracking && (
                        <div>
                          <p className="text-sm text-muted-foreground">Tracking Number</p>
                          <div className="flex items-center gap-1">
                            <p>{orderDetails.tracking.number}</p>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground">via {orderDetails.tracking.carrier}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h3 className="font-medium mb-2">Items</h3>
                    <div className="space-y-4">
                      {orderDetails.items.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <Link href={`/products/${item.id}`} className="font-medium hover:text-primary">
                              {item.name}
                            </Link>
                            <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${item.price.toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tracking Information */}
                  {orderDetails.tracking && orderDetails.tracking.events && (
                    <div>
                      <h3 className="font-medium mb-2">Tracking Information</h3>
                      <div className="relative">
                        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-muted"></div>
                        <div className="space-y-4 pl-8">
                          {orderDetails.tracking.events.map((event, index) => (
                            <div key={index} className="relative">
                              <div
                                className={`absolute left-[-24px] top-0 h-6 w-6 rounded-full ${index === 0 ? "bg-primary" : "bg-muted"} flex items-center justify-center`}
                              >
                                <div
                                  className={`h-2 w-2 rounded-full ${index === 0 ? "bg-primary-foreground" : "bg-muted-foreground"}`}
                                ></div>
                              </div>
                              <div>
                                <p className="font-medium">{event.status}</p>
                                <p className="text-sm text-muted-foreground">
                                  {event.date} at {event.time} • {event.location}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline">Download Invoice</Button>
                    {orderDetails.status !== "Cancelled" && orderDetails.status !== "Delivered" && (
                      <Button variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                        Cancel Order
                      </Button>
                    )}
                    <Button>Need Help?</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

