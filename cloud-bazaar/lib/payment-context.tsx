"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import { useCart } from "@/lib/cart-context"
import { useMessages } from "@/lib/message-context"

export type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  sellerId: string
  sellerName: string
}

export type Transaction = {
  id: string
  userId: string
  userName: string
  userEmail: string
  items: CartItem[]
  amount: number
  date: Date
  status: "pending" | "completed" | "failed" | "refunded"
  shippingAddress: {
    name: string
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  paymentMethod: {
    type: string
    lastFour?: string
  }
}

type PaymentContextType = {
  processPayment: (
    shippingAddress: Transaction["shippingAddress"],
    paymentMethod: Transaction["paymentMethod"],
  ) => Promise<{ success: boolean; transactionId?: string; error?: string }>
  getTransaction: (id: string) => Transaction | undefined
  getUserTransactions: () => Transaction[]
  getSellerTransactions: () => Transaction[]
  getAllTransactions: () => Transaction[]
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined)

// Mock initial transactions
const initialTransactions: Transaction[] = [
  {
    id: "txn_1",
    userId: "user1",
    userName: "John Doe",
    userEmail: "john@example.com",
    items: [
      {
        id: "1",
        name: "Wireless Noise Cancelling Headphones",
        price: 129.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D",
        sellerId: "seller1",
        sellerName: "AudioTech Official Store",
      },
    ],
    amount: 129.99,
    date: new Date(Date.now() - 86400000 * 2), // 2 days ago
    status: "completed",
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },
    paymentMethod: {
      type: "credit_card",
      lastFour: "4242",
    },
  },
  {
    id: "txn_2",
    userId: "user2",
    userName: "Jane Smith",
    userEmail: "jane@example.com",
    items: [
      {
        id: "2",
        name: "Smart Watch",
        price: 199.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNtYXJ0JTIwd2F0Y2h8ZW58MHx8MHx8fDA%3D",
        sellerId: "seller2",
        sellerName: "TechGear Official",
      },
    ],
    amount: 199.99,
    date: new Date(Date.now() - 86400000), // 1 day ago
    status: "completed",
    shippingAddress: {
      name: "Jane Smith",
      street: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      country: "United States",
    },
    paymentMethod: {
      type: "credit_card",
      lastFour: "1234",
    },
  },
]

export function PaymentProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const { items, clearCart } = useCart()
  const { toast } = useToast()
  const router = useRouter()
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)

  // Try to use the MessageContext, but handle the case when it's not available
  const messageContext = (() => {
    try {
      return useMessages()
    } catch (error) {
      return null
    }
  })()

  // Helper function to add a notification
  const addNotification = (notification: any) => {
    if (messageContext) {
      messageContext.addNotification(notification)
    } else {
      // If MessageContext is not available, we'll use toast for notifications
      toast({
        title: notification.title,
        description: notification.content,
        duration: 5000,
      })
    }
  }

  // Process a payment
  const processPayment = async (
    shippingAddress: Transaction["shippingAddress"],
    paymentMethod: Transaction["paymentMethod"],
  ): Promise<{ success: boolean; transactionId?: string; error?: string }> => {
    if (!user) {
      return { success: false, error: "User not authenticated" }
    }

    // Calculate total amount
    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    // Create transaction object
    const transaction: Transaction = {
      id: `txn_${Date.now()}`,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        sellerId: item.seller?.id || "unknown",
        sellerName: item.seller?.name || "Unknown Seller",
      })),
      amount: totalAmount,
      date: new Date(),
      status: "pending",
      shippingAddress,
      paymentMethod,
    }

    // Simulate payment processing
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate successful payment (95% success rate)
        const isSuccessful = Math.random() < 0.95

        if (isSuccessful) {
          // Update transaction status
          transaction.status = "completed"

          // Add transaction to state
          setTransactions((prev) => [...prev, transaction])

          // Clear cart
          clearCart()

          // Create notifications for buyer and sellers
          addNotification({
            userId: user.id,
            type: "order",
            title: "Order Confirmed",
            content: `Your order #${transaction.id} has been confirmed and is being processed.`,
            read: false,
            linkTo: `/order-confirmation/${transaction.id}`,
          })

          // Notify each seller
          const sellerIds = new Set(transaction.items.map((item) => item.sellerId))
          sellerIds.forEach((sellerId) => {
            const sellerItems = transaction.items.filter((item) => item.sellerId === sellerId)
            const sellerTotal = sellerItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

            addNotification({
              userId: sellerId,
              type: "order",
              title: "New Order Received",
              content: `You've received a new order worth $${sellerTotal.toFixed(2)} from ${user.name}.`,
              read: false,
              linkTo: `/seller/orders/${transaction.id}`,
            })
          })

          // Notify admin
          addNotification({
            userId: "admin1",
            type: "order",
            title: "New Order Placed",
            content: `${user.name} placed a new order worth $${totalAmount.toFixed(2)}.`,
            read: false,
            linkTo: `/admin/orders/${transaction.id}`,
          })

          resolve({ success: true, transactionId: transaction.id })
        } else {
          // Failed payment
          transaction.status = "failed"
          setTransactions((prev) => [...prev, transaction])

          resolve({ success: false, error: "Payment processing failed. Please try again." })
        }
      }, 2000) // Simulate 2 second processing time
    })
  }

  // Get a specific transaction by ID
  const getTransaction = (id: string) => {
    return transactions.find((t) => t.id === id)
  }

  // Get all transactions for the current user
  const getUserTransactions = () => {
    if (!user) return []
    return transactions.filter((t) => t.userId === user.id)
  }

  // Get all transactions for the current seller
  const getSellerTransactions = () => {
    if (!user || user.role !== "seller") return []
    return transactions.filter((t) => t.items.some((item) => item.sellerId === user.id))
  }

  // Get all transactions (admin only)
  const getAllTransactions = () => {
    if (!user || user.role !== "admin") return []
    return transactions
  }

  return (
    <PaymentContext.Provider
      value={{
        processPayment,
        getTransaction,
        getUserTransactions,
        getSellerTransactions,
        getAllTransactions,
      }}
    >
      {children}
    </PaymentContext.Provider>
  )
}

export function usePayment() {
  const context = useContext(PaymentContext)
  if (context === undefined) {
    throw new Error("usePayment must be used within a PaymentProvider")
  }
  return context
}

