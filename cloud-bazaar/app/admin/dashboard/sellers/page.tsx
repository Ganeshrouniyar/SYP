"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, RefreshCw, MoreHorizontal, DollarSign } from "lucide-react"
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
import { allProducts } from "@/lib/data"

// Mock sellers data
const mockSellers = [
  {
    id: "seller1",
    name: "AudioTech Official Store",
    email: "contact@audiotech.com",
    status: "verified",
    joinDate: "2023-01-10",
    products: 12,
    revenue: 4500,
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmlsZSUyMHBob3RvfGVufDB8fDB8fHww",
  },
  {
    id: "seller2",
    name: "TechGear Official",
    email: "sales@techgear.com",
    status: "verified",
    joinDate: "2023-02-15",
    products: 28,
    revenue: 8900,
    avatar:
      "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZSUyMGFkbWlufGVufDB8fDB8fHww",
  },
  {
    id: "seller3",
    name: "HomeStyle Decor",
    email: "info@homestyledecor.com",
    status: "pending",
    joinDate: "2023-03-05",
    products: 5,
    revenue: 1200,
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmVzc2lvbmFsfGVufDB8fDB8fHww",
  },
  {
    id: "seller4",
    name: "BookWorm Publishers",
    email: "sales@bookworm.com",
    status: "verified",
    joinDate: "2023-04-20",
    products: 45,
    revenue: 3600,
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2Zlc3Npb25hbHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: "seller5",
    name: "FitLife Equipment",
    email: "support@fitlife.com",
    status: "verified",
    joinDate: "2023-05-18",
    products: 32,
    revenue: 6700,
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmVzc2lvbmFsfGVufDB8fDB8fHww",
  },
]

export default function SellersPage() {
  const { user } = useAuth()
  const { getAllTransactions } = usePayment()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [revenueFilter, setRevenueFilter] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [sellers, setSellers] = useState<any[]>([])
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [sellerToDelete, setSellerToDelete] = useState<string | null>(null)

  // Redirect if not logged in or not an admin
  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/auth/login")
    }
  }, [user, router, isLoading])

  // Load sellers data
  useEffect(() => {
    const loadData = () => {
      const transactions = getAllTransactions()

      // Calculate seller performance from transactions
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

      // Convert to array and combine with mock sellers
      const transactionSellers = Object.entries(sellerPerformance).map(([id, data]) => ({
        id,
        name: data.name,
        email: `contact@${data.name.toLowerCase().replace(/\s+/g, "")}.com`,
        status: "verified",
        joinDate: "2023-01-01", // Placeholder
        products: allProducts.filter((p) => p.seller === data.name).length,
        revenue: data.revenue,
        avatar:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmlsZSUyMHBob3RvfGVufDB8fDB8fHww",
      }))

      // Combine with mock sellers
      const allSellers = [
        ...transactionSellers,
        ...mockSellers.filter((ms) => !transactionSellers.some((ts) => ts.name === ms.name)),
      ]

      setSellers(allSellers)
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
          <p className="text-sm text-muted-foreground">Loading sellers...</p>
        </div>
      </div>
    )
  }

  // If not logged in or not an admin, don't render anything (will redirect)
  if (!user || user.role !== "admin") {
    return null
  }

  // Filter sellers based on search term and filters
  const filteredSellers = sellers.filter((seller) => {
    const matchesSearch =
      searchTerm === "" ||
      seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === null || seller.status === statusFilter

    const matchesRevenue =
      revenueFilter === null ||
      (() => {
        switch (revenueFilter) {
          case "under1k":
            return seller.revenue < 1000
          case "1k-5k":
            return seller.revenue >= 1000 && seller.revenue < 5000
          case "5k-10k":
            return seller.revenue >= 5000 && seller.revenue < 10000
          case "over10k":
            return seller.revenue >= 10000
          default:
            return true
        }
      })()

    return matchesSearch && matchesStatus && matchesRevenue
  })

  const handleDeleteClick = (sellerId: string) => {
    setSellerToDelete(sellerId)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (sellerToDelete) {
      setSellers((prev) => prev.filter((s) => s.id !== sellerToDelete))
      setIsDeleteDialogOpen(false)
      setSellerToDelete(null)
    }
  }

  const toggleSellerStatus = (sellerId: string) => {
    setSellers((prev) =>
      prev.map((s) => {
        if (s.id === sellerId) {
          return {
            ...s,
            status: s.status === "verified" ? "pending" : "verified",
          }
        }
        return s
      }),
    )
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Sellers Management</h1>
            <p className="text-muted-foreground">View and manage all sellers on the platform.</p>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>All Sellers</CardTitle>
            <CardDescription>
              {filteredSellers.length} {filteredSellers.length === 1 ? "seller" : "sellers"} found
            </CardDescription>
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
              <div className="flex gap-2">
                <Select
                  value={statusFilter || "all"}
                  onValueChange={(value) => setStatusFilter(value === "all" ? null : value)}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={revenueFilter || "all"}
                  onValueChange={(value) => setRevenueFilter(value === "all" ? null : value)}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Revenue" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Revenue</SelectItem>
                    <SelectItem value="under1k">Under $1,000</SelectItem>
                    <SelectItem value="1k-5k">$1,000 - $5,000</SelectItem>
                    <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                    <SelectItem value="over10k">Over $10,000</SelectItem>
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
                      <th className="px-4 py-3 text-left font-medium">Seller</th>
                      <th className="px-4 py-3 text-left font-medium">Email</th>
                      <th className="px-4 py-3 text-left font-medium">Status</th>
                      <th className="px-4 py-3 text-left font-medium">Join Date</th>
                      <th className="px-4 py-3 text-left font-medium">Products</th>
                      <th className="px-4 py-3 text-left font-medium">Revenue</th>
                      <th className="px-4 py-3 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSellers.length > 0 ? (
                      filteredSellers.map((seller) => (
                        <tr key={seller.id} className="border-t">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full overflow-hidden">
                                <img
                                  src={seller.avatar || "/placeholder.svg?height=32&width=32"}
                                  alt={seller.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <span className="font-medium">{seller.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">{seller.email}</td>
                          <td className="px-4 py-3">
                            <Badge
                              variant="outline"
                              className={
                                seller.status === "verified"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : "bg-amber-50 text-amber-700 border-amber-200"
                              }
                            >
                              {seller.status.charAt(0).toUpperCase() + seller.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">{seller.joinDate}</td>
                          <td className="px-4 py-3">{seller.products}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4 text-green-600" />
                              <span>
                                {seller.revenue.toLocaleString("en-US", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => router.push(`/admin/dashboard/sellers/${seller.id}`)}>
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toggleSellerStatus(seller.id)}>
                                  {seller.status === "verified" ? "Mark as Pending" : "Verify Seller"}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteClick(seller.id)}>
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
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this seller? This action cannot be undone.
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
    </AdminLayout>
  )
}

