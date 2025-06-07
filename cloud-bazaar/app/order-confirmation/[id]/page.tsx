"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, ChevronRight, Package, Truck, Calendar, MapPin } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { usePayment, type Transaction } from "@/lib/payment-context"

export default function OrderConfirmationPage({ params }: { params: { id: string } }) {
  const { user } = useAuth()
  const { getTransaction } = usePayment()
  const router = useRouter()
  const [transaction, setTransaction] = useState<Transaction | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    const txn = getTransaction(params.id)
    if (txn) {
      setTransaction(txn)
    }
    setIsLoading(false)
  }, [user, params.id, getTransaction, router])

  if (isLoading) {
    return (
      <div className="container py-12 flex items-center justify-center">
        <p>Loading order details...</p>
      </div>
    )
  }

  if (!transaction) {
    return (
      <div className="container py-12">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Order not found</CardTitle>
            <CardDescription>We couldn't find the order you're looking for.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href="/orders">
              <Button className="w-full">View Your Orders</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  // Calculate order summary
  const subtotal = transaction.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 5.99
  const tax = subtotal * 0.08
  const total = transaction.amount

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-6">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <Link href="/orders" className="text-muted-foreground hover:text-foreground">
          Orders
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <span className="text-foreground font-medium">Order Confirmation</span>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Success Message */}
        <Card className="mb-8 border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
              <p className="text-muted-foreground mb-4">
                Thank you for your purchase. Your order has been confirmed and is being processed.
              </p>
              <p className="font-medium">
                Order ID: <span className="font-bold">{transaction.id}</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Order Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Order Summary */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Order Items */}
                <div className="space-y-4">
                  <h3 className="font-medium">Items</h3>
                  {transaction.items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="text-sm">Price: ${item.price.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">Seller: {item.sellerName}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Order Totals */}
                <div>
                  <h3 className="font-medium mb-3">Order Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Shipping & Payment Info */}
          <div className="md:col-span-1 space-y-6">
            {/* Shipping Info */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">Shipping Information</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">{transaction.shippingAddress.name}</p>
                    <p className="text-sm text-muted-foreground">{transaction.shippingAddress.street}</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.shippingAddress.city}, {transaction.shippingAddress.state}{" "}
                      {transaction.shippingAddress.zip}
                    </p>
                    <p className="text-sm text-muted-foreground">{transaction.shippingAddress.country}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Info */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">Order Information</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">Order Date:</span> {formatDate(transaction.date)}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Order ID:</span> {transaction.id}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Payment Method:</span>{" "}
                      {transaction.paymentMethod.type === "credit_card"
                        ? `Credit Card ending in ${transaction.paymentMethod.lastFour}`
                        : "PayPal"}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Status:</span>{" "}
                      <span className="text-green-600 font-medium">
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link href="/orders">
            <Button variant="outline" className="w-full">
              View All Orders
            </Button>
          </Link>
          <Link href="/products">
            <Button className="w-full">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

