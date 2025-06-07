"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, User } from "lucide-react"
import SellerLayout from "@/components/seller-layout"
import { useAuth } from "@/lib/auth-context"
import { usePayment } from "@/lib/payment-context"

export default function CustomersPage() {
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

  // Get unique customers from transactions
  const customers = Array.from(new Set(sellerTransactions.map((t) => t.userId))).map((userId) => {
    const customerTransactions = sellerTransactions.filter((t) => t.userId === userId)
    const totalSpent = customerTransactions.reduce((sum, t) => {
      return (
        sum +
        t.items
          .filter((item) => item.sellerId === user.id)
          .reduce((itemSum, item) => itemSum + item.price * item.quantity, 0)
      )
    }, 0)

    return {
      id: userId,
      name: customerTransactions[0].userName,
      email: customerTransactions[0].userEmail,
      orders: customerTransactions.length,
      totalSpent,
    }
  })

  return (
    <SellerLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Customer Management</h1>
            <p className="text-muted-foreground">View and manage your customer relationships</p>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
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
                    {customers.length > 0 ? (
                      customers.map((customer) => (
                        <tr key={customer.id} className="border-t">
                          <td className="px-4 py-3">{customer.id}</td>
                          <td className="px-4 py-3">{customer.name}</td>
                          <td className="px-4 py-3">{customer.email}</td>
                          <td className="px-4 py-3">{customer.orders}</td>
                          <td className="px-4 py-3">${customer.totalSpent.toFixed(2)}</td>
                          <td className="px-4 py-3 text-right">
                            <Button variant="ghost" size="sm">
                              <User className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                          No customers found
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