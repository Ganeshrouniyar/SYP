"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ChevronRight, CreditCard, ShoppingBag, Truck, AlertCircle } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useCart } from "@/lib/cart-context"
import { usePayment } from "@/lib/payment-context"

export default function CheckoutPage() {
  const { user } = useAuth()
  const { items, getSubtotal, getItemCount } = useCart()
  const { processPayment } = usePayment()
  const router = useRouter()

  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [paymentMethod, setPaymentMethod] = useState("credit_card")

  const [shippingAddress, setShippingAddress] = useState({
    name: user?.name || "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
  })

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cardName: user?.name || "",
    expiry: "",
    cvc: "",
  })

  // Calculate order summary
  const subtotal = getSubtotal()
  const shipping = 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  // Handle shipping address change
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShippingAddress((prev) => ({ ...prev, [name]: value }))
  }

  // Format credit card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  // Format expiry date with slash
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }

    return v
  }

  // Handle payment details change with formatting
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === "cardNumber") {
      setPaymentDetails((prev) => ({ ...prev, [name]: formatCardNumber(value) }))
    } else if (name === "expiry") {
      setPaymentDetails((prev) => ({ ...prev, [name]: formatExpiryDate(value) }))
    } else {
      setPaymentDetails((prev) => ({ ...prev, [name]: value }))
    }
  }

  // Validate credit card
  const validateCreditCard = () => {
    const errors = []

    // Card number validation (should be 16 digits without spaces)
    const cardNumberDigits = paymentDetails.cardNumber.replace(/\s/g, "")
    if (cardNumberDigits.length !== 16 || !/^\d+$/.test(cardNumberDigits)) {
      errors.push("Please enter a valid 16-digit card number")
    }

    // Expiry date validation (should be in MM/YY format)
    if (!/^\d{2}\/\d{2}$/.test(paymentDetails.expiry)) {
      errors.push("Please enter a valid expiry date (MM/YY)")
    } else {
      // Check if card is expired
      const [month, year] = paymentDetails.expiry.split("/")
      const expiryDate = new Date(2000 + Number.parseInt(year), Number.parseInt(month) - 1, 1)
      const today = new Date()

      if (expiryDate < today) {
        errors.push("Your card has expired")
      }
    }

    // CVC validation (should be 3 or 4 digits)
    if (!/^\d{3,4}$/.test(paymentDetails.cvc)) {
      errors.push("Please enter a valid CVC (3 or 4 digits)")
    }

    return errors
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      // Validate form
      if (
        !shippingAddress.name ||
        !shippingAddress.street ||
        !shippingAddress.city ||
        !shippingAddress.state ||
        !shippingAddress.zip ||
        !shippingAddress.country
      ) {
        throw new Error("Please fill in all shipping address fields")
      }

      if (paymentMethod === "credit_card") {
        // Validate credit card details
        const cardErrors = validateCreditCard()
        if (cardErrors.length > 0) {
          throw new Error(cardErrors.join(". "))
        }
      }

      setIsProcessing(true)

      // Process payment
      const result = await processPayment(shippingAddress, {
        type: paymentMethod,
        lastFour: paymentDetails.cardNumber.replace(/\s/g, "").slice(-4),
      })

      if (result.success && result.transactionId) {
        // Redirect to order confirmation page
        router.push(`/order-confirmation/${result.transactionId}`)
      } else {
        throw new Error(result.error || "Payment processing failed")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
      setIsProcessing(false)
    }
  }

  // Redirect if cart is empty
  if (getItemCount() === 0) {
    return (
      <div className="container py-12">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Your cart is empty</CardTitle>
            <CardDescription>Add some items to your cart before checking out.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href="/products">
              <Button className="w-full">Continue Shopping</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-6">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <Link href="/cart" className="text-muted-foreground hover:text-foreground">
          Cart
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <span className="text-foreground font-medium">Checkout</span>
      </div>

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form id="checkout-form" onSubmit={handleSubmit}>
            {/* Shipping Information */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  <CardTitle>Shipping Information</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" value={shippingAddress.name} onChange={handleShippingChange} required />
                </div>
                <div>
                  <Label htmlFor="street">Street Address</Label>
                  <Input
                    id="street"
                    name="street"
                    value={shippingAddress.street}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={shippingAddress.city}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      value={shippingAddress.state}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" name="zip" value={shippingAddress.zip} onChange={handleShippingChange} required />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Select
                      value={shippingAddress.country}
                      onValueChange={(value) => setShippingAddress((prev) => ({ ...prev, country: value }))}
                    >
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="United States">United States</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                        <SelectItem value="Australia">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <CardTitle>Payment Method</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-2">
                  <div className="flex items-center space-x-2 border rounded-md p-3">
                    <RadioGroupItem value="credit_card" id="credit_card" />
                    <Label htmlFor="credit_card" className="flex-1 cursor-pointer">
                      Credit Card
                    </Label>
                    <div className="flex gap-1">
                      <div className="w-10 h-6 bg-blue-600 rounded"></div>
                      <div className="w-10 h-6 bg-red-500 rounded"></div>
                      <div className="w-10 h-6 bg-gray-800 rounded"></div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-3">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                      PayPal
                    </Label>
                    <div className="w-10 h-6 bg-blue-700 rounded"></div>
                  </div>
                </RadioGroup>

                {paymentMethod === "credit_card" && (
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        value={paymentDetails.cardNumber}
                        onChange={handlePaymentChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19} // 16 digits + 3 spaces
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input
                        id="cardName"
                        name="cardName"
                        value={paymentDetails.cardName}
                        onChange={handlePaymentChange}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          name="expiry"
                          value={paymentDetails.expiry}
                          onChange={handlePaymentChange}
                          placeholder="MM/YY"
                          maxLength={5} // MM/YY format
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvc">CVC</Label>
                        <Input
                          id="cvc"
                          name="cvc"
                          value={paymentDetails.cvc}
                          onChange={handlePaymentChange}
                          maxLength={4}
                          type="password"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "paypal" && (
                  <div className="mt-4 p-4 bg-muted rounded-md">
                    <p className="text-sm text-muted-foreground">
                      You will be redirected to PayPal to complete your payment.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 border border-red-200 bg-red-50 rounded-md flex items-start gap-2 text-red-600">
                <AlertCircle className="h-5 w-5 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            {/* Submit Button (Mobile) */}
            <div className="lg:hidden">
              <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
                {isProcessing ? "Processing..." : `Pay $${total.toFixed(2)}`}
              </Button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <CardTitle>Order Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Items */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Totals */}
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
            </CardContent>
            <CardFooter>
              {/* Submit Button (Desktop) */}
              <Button
                type="submit"
                form="checkout-form"
                className="w-full hidden lg:flex"
                size="lg"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : `Pay $${total.toFixed(2)}`}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

