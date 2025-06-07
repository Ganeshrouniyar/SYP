"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  timestamp: string
  read: boolean
  senderType: "admin" | "customer"
}

interface MessagesContextType {
  messages: Message[]
  unreadCount: number
  sendMessage: (content: string, receiverId: string) => void
  markAsRead: (messageId: string) => void
  markAllAsRead: () => void
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined)

export function MessagesProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("messages")
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
      updateUnreadCount(JSON.parse(savedMessages))
    }
  }, [])

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages))
  }, [messages])

  const updateUnreadCount = (messages: Message[]) => {
    const count = messages.filter((msg) => !msg.read).length
    setUnreadCount(count)
  }

  const sendMessage = (content: string, receiverId: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: "admin", // In a real app, this would be the logged-in user's ID
      receiverId,
      content,
      timestamp: new Date().toISOString(),
      read: false,
      senderType: "admin",
    }

    setMessages((prev) => {
      const updated = [...prev, newMessage]
      updateUnreadCount(updated)
      return updated
    })
  }

  const markAsRead = (messageId: string) => {
    setMessages((prev) => {
      const updated = prev.map((msg) =>
        msg.id === messageId ? { ...msg, read: true } : msg
      )
      updateUnreadCount(updated)
      return updated
    })
  }

  const markAllAsRead = () => {
    setMessages((prev) => {
      const updated = prev.map((msg) => ({ ...msg, read: true }))
      updateUnreadCount(updated)
      return updated
    })
  }

  return (
    <MessagesContext.Provider
      value={{
        messages,
        unreadCount,
        sendMessage,
        markAsRead,
        markAllAsRead,
      }}
    >
      {children}
    </MessagesContext.Provider>
  )
}

export function useMessages() {
  const context = useContext(MessagesContext)
  if (context === undefined) {
    throw new Error("useMessages must be used within a MessagesProvider")
  }
  return context
} 