"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, RefreshCw, CreditCard, DollarSign } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { usePayment, type Transaction } from "@/lib/payment-context"
import AdminLayout from "@/components/admin-layout"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function PaymentsPage() {
  const { user } = useAuth()
  const { getAllTransactions } = usePayment()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [dateFilter, setDateFilter] = useState<string | null>(null)
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [transactions, setTransactions] = useState<Transaction[]>([])

  // Redirect if not logged in or not an admin
  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/auth/login")
    }
  }, [user, router, isLoading])

  // Load transactions
  useEffect(() => {
    const loadData = () => {
      const allTransactions = getAllTransactions()
      setTransactions(allTransactions)
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
          <p className="text-sm text-muted-foreground">Loading payments...</p>
        </div>
      </div>
    )
  }

  // If not logged in or not an admin, don't render anything (will redirect)
  if (!user || user.role !== "admin") {
    return null
  }

  // Filter transactions based on search term and filters
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      searchTerm === "" ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.userEmail.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === null || transaction.status === statusFilter

    const matchesDate =
      dateFilter === null ||
      (() => {
        const txDate = new Date(transaction.date)
        const today = new Date()

        switch (dateFilter) {
          case "today":
            return txDate.toDateString() === today.toDateString()
          case "yesterday":
            const yesterday = new Date(today)
            yesterday.setDate(today.getDate() - 1)
            return txDate.toDateString() === yesterday.toDateString()
          case "last7days":
            const last7days = new Date(today)
            last7days.setDate(today.getDate() - 7)
            return txDate >= last7days
          case "last30days":
            const last30days = new Date(today)
            last30days.setDate(today.getDate() - 30)
            return txDate >= last30days
          default:
            return true
        }
      })()

    const matchesPaymentMethod = paymentMethodFilter === null || transaction.paymentMethod.type === paymentMethodFilter

    return matchesSearch && matchesStatus && matchesDate && matchesPaymentMethod
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-amber-100 text-amber-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "refunded":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Calculate total revenue
  const totalRevenue = filteredTransactions
    .filter((t) => t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0)

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Payments Management</h1>
            <p className="text-muted-foreground">View and manage all payments on the platform.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-1">
              <Download className="h-4 w-4" /> Export
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
                  <h3 className="text-2xl font-bold mt-1">${totalRevenue.toFixed(2)}</h3>
                </div>
                <div className="p-2 rounded-full bg-green-100">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed Payments</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {filteredTransactions.filter((t) => t.status === "completed").length}
                  </h3>
                </div>
                <div className="p-2 rounded-full bg-green-100">
                  <CreditCard className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Payments</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {filteredTransactions.filter((t) => t.status === "pending").length}
                  </h3>
                </div>
                <div className="p-2 rounded-full bg-amber-100">
                  <CreditCard className="h-5 w-5 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Failed Payments</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {filteredTransactions.filter((t) => t.status === "failed" || t.status === "refunded").length}
                  </h3>
                </div>
                <div className="p-2 rounded-full bg-red-100">
                  <CreditCard className="h-5 w-5 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>All Payments</CardTitle>
            <CardDescription>
              {filteredTransactions.length} {filteredTransactions.length === 1 ? "payment" : "payments"} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search payments..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter || ""} onValueChange={(value) => setStatusFilter(value || null)}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={dateFilter || ""} onValueChange={(value) => setDateFilter(value || null)}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="yesterday">Yesterday</SelectItem>
                    <SelectItem value="last7days">Last 7 Days</SelectItem>
                    <SelectItem value="last30days">Last 30 Days</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={paymentMethodFilter || ""}
                  onValueChange={(value) => setPaymentMethodFilter(value || null)}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Payment Method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Methods</SelectItem>
                    <SelectItem value="credit_card">Credit Card</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left font-medium">Transaction ID</th>
                      <th className="px-4 py-3 text-left font-medium">Customer</th>
                      <th className="px-4 py-3 text-left font-medium">Date</th>
                      <th className="px-4 py-3 text-left font-medium">Amount</th>
                      <th className="px-4 py-3 text-left font-medium">Payment Method</th>
                      <th className="px-4 py-3 text-left font-medium">Status</th>
                      <th className="px-4 py-3 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.length > 0 ? (
                      filteredTransactions.map((transaction) => (
                        <tr key={transaction.id} className="border-t">
                          <td className="px-4 py-3">{transaction.id}</td>
                          <td className="px-4 py-3">
                            <div>
                              <div className="font-medium">{transaction.userName}</div>
                              <div className="text-xs text-muted-foreground">{transaction.userEmail}</div>
                            </div>
                          </td>
                          <td className="px-4 py-3">{new Date(transaction.date).toLocaleDateString()}</td>
                          <td className="px-4 py-3 font-medium">${transaction.amount.toFixed(2)}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              {transaction.paymentMethod.type === "credit_card" ? (
                                <>
                                  <CreditCard className="h-4 w-4" />
                                  <span>Card •••• {transaction.paymentMethod.lastFour}</span>
                                </>
                              ) : (
                                <>
                                  <DollarSign className="h-4 w-4" />
                                  <span>PayPal</span>
                                </>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                transaction.status,
                              )}`}
                            >
                              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                            </span>
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
                        <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                          No payments found
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
    </AdminLayout>
  )
}

