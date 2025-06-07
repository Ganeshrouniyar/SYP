"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Eye } from "lucide-react"
import SellerLayout from "@/components/seller-layout"
import { useAuth } from "@/lib/auth-context"
import { usePayment } from "@/lib/payment-context"

export default function OrdersPage() {
  const { user } = useAuth()
  const { getSellerTransactions } = usePayment()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [sellerTransactions, setSellerTransactions] = useState<any[]>([])

  useEffect(() => {
    if (!user) return

    // Get transactions for this seller
    const transactions = getSellerTransactions()
    setSellerTransactions(transactions)
  }, [user, getSellerTransactions])

  if (!user || user.role !== "seller") {
    router.push("/auth/login")
    return null
  }

  return (
    <SellerLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Orders Management</h1>
            <p className="text-muted-foreground">View and manage all your orders</p>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
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
                                <Eye className="h-4 w-4" />
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
      </div>
    </SellerLayout>
  )
} 