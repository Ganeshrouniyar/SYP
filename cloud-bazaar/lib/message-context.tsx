"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { useAuth } from "@/lib/auth-context"

export type Message = {
  id: string
  senderId: string
  senderName: string
  senderRole: string
  receiverId: string
  receiverName: string
  content: string
  timestamp: Date
  read: boolean
}

export type Notification = {
  id: string
  userId: string
  type: "message" | "order" | "system"
  title: string
  content: string
  timestamp: Date
  read: boolean
  linkTo?: string
}

type MessageContextType = {
  messages: Message[]
  notifications: Notification[]
  unreadMessagesCount: number
  unreadNotificationsCount: number
  sendMessage: (receiverId: string, receiverName: string, content: string) => void
  markMessageAsRead: (messageId: string) => void
  markAllMessagesAsRead: () => void
  markNotificationAsRead: (notificationId: string) => void
  markAllNotificationsAsRead: () => void
  addNotification: (notification: Omit<Notification, "id" | "timestamp">) => void
  getConversation: (userId: string) => Message[]
  getAllConversations: () => { userId: string; userName: string; lastMessage: Message }[]
}

const MessageContext = createContext<MessageContextType | undefined>(undefined)

// Mock initial messages for demonstration
const initialMessages: Message[] = [
  {
    id: "msg1",
    senderId: "admin1",
    senderName: "Admin",
    senderRole: "admin",
    receiverId: "user1",
    receiverName: "John Doe",
    content: "Hello! How can I help you with your recent order?",
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
    read: true,
  },
  {
    id: "msg2",
    senderId: "user1",
    senderName: "John Doe",
    senderRole: "buyer",
    receiverId: "admin1",
    receiverName: "Admin",
    content: "Hi, I was wondering when my order will be shipped?",
    timestamp: new Date(Date.now() - 82800000), // 23 hours ago
    read: true,
  },
  {
    id: "msg3",
    senderId: "admin1",
    senderName: "Admin",
    senderRole: "admin",
    receiverId: "user1",
    receiverName: "John Doe",
    content: "Your order has been processed and will be shipped tomorrow. You'll receive a tracking number soon.",
    timestamp: new Date(Date.now() - 79200000), // 22 hours ago
    read: false,
  },
  {
    id: "msg4",
    senderId: "admin1",
    senderName: "Admin",
    senderRole: "admin",
    receiverId: "user2",
    receiverName: "Jane Smith",
    content: "Hello Jane, thank you for your recent purchase!",
    timestamp: new Date(Date.now() - 43200000), // 12 hours ago
    read: false,
  },
]

// Mock initial notifications
const initialNotifications: Notification[] = [
  {
    id: "notif1",
    userId: "user1",
    type: "order",
    title: "Order Shipped",
    content: "Your order #ORD-001 has been shipped. Tracking number: TRK12345",
    timestamp: new Date(Date.now() - 36000000), // 10 hours ago
    read: false,
    linkTo: "/orders/ORD-001",
  },
  {
    id: "notif2",
    userId: "user1",
    type: "message",
    title: "New Message",
    content: "You have a new message from Admin",
    timestamp: new Date(Date.now() - 79200000), // 22 hours ago
    read: false,
    linkTo: "/messages",
  },
  {
    id: "notif3",
    userId: "admin1",
    type: "system",
    title: "New User Registered",
    content: "A new user has registered: Jane Smith",
    timestamp: new Date(Date.now() - 172800000), // 2 days ago
    read: true,
  },
]

export function MessageProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)

  // Calculate unread counts
  const unreadMessagesCount = messages.filter((msg) => !msg.read && msg.receiverId === user?.id).length

  const unreadNotificationsCount = notifications.filter((notif) => !notif.read && notif.userId === user?.id).length

  // Send a new message
  const sendMessage = (receiverId: string, receiverName: string, content: string) => {
    if (!user) return

    const newMessage: Message = {
      id: `msg${Date.now()}`,
      senderId: user.id,
      senderName: user.name,
      senderRole: user.role,
      receiverId,
      receiverName,
      content,
      timestamp: new Date(),
      read: false,
    }

    setMessages((prev) => [...prev, newMessage])

    // Create notification for receiver
    addNotification({
      userId: receiverId,
      type: "message",
      title: "New Message",
      content: `You have a new message from ${user.name}`,
      read: false,
      linkTo: "/messages",
    })
  }

  // Mark a message as read
  const markMessageAsRead = (messageId: string) => {
    setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, read: true } : msg)))
  }

  // Mark all messages as read
  const markAllMessagesAsRead = () => {
    if (!user) return

    setMessages((prev) => prev.map((msg) => (msg.receiverId === user.id ? { ...msg, read: true } : msg)))
  }

  // Mark a notification as read
  const markNotificationAsRead = (notificationId: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === notificationId ? { ...notif, read: true } : notif)))
  }

  // Mark all notifications as read
  const markAllNotificationsAsRead = () => {
    if (!user) return

    setNotifications((prev) => prev.map((notif) => (notif.userId === user.id ? { ...notif, read: true } : notif)))
  }

  // Add a new notification
  const addNotification = (notification: Omit<Notification, "id" | "timestamp">) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif${Date.now()}`,
      timestamp: new Date(),
    }

    setNotifications((prev) => [...prev, newNotification])
  }

  // Get conversation with a specific user
  const getConversation = (userId: string) => {
    if (!user) return []

    return messages
      .filter(
        (msg) =>
          (msg.senderId === user.id && msg.receiverId === userId) ||
          (msg.senderId === userId && msg.receiverId === user.id),
      )
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
  }

  // Get all conversations for the current user
  const getAllConversations = () => {
    if (!user) return []

    // Get all unique users the current user has conversed with
    const conversationUsers = new Set<string>()

    messages.forEach((msg) => {
      if (msg.senderId === user.id) {
        conversationUsers.add(msg.receiverId)
      } else if (msg.receiverId === user.id) {
        conversationUsers.add(msg.senderId)
      }
    })

    // For each user, get the last message
    return Array.from(conversationUsers)
      .map((userId) => {
        const conversation = getConversation(userId)
        const lastMessage = conversation[conversation.length - 1]
        const userName = lastMessage.senderId === userId ? lastMessage.senderName : lastMessage.receiverName

        return {
          userId,
          userName,
          lastMessage,
        }
      })
      .sort((a, b) => b.lastMessage.timestamp.getTime() - a.lastMessage.timestamp.getTime())
  }

  return (
    <MessageContext.Provider
      value={{
        messages,
        notifications,
        unreadMessagesCount,
        unreadNotificationsCount,
        sendMessage,
        markMessageAsRead,
        markAllMessagesAsRead,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        addNotification,
        getConversation,
        getAllConversations,
      }}
    >
      {children}
    </MessageContext.Provider>
  )
}

export function useMessages() {
  const context = useContext(MessageContext)
  if (context === undefined) {
    throw new Error("useMessages must be used within a MessageProvider")
  }
  return context
}

