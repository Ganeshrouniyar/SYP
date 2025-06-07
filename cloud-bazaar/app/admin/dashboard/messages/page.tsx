"use client"

import { AdminMessages } from "@/components/admin/messages"
import { MessagesProvider } from "@/contexts/messages-context"

export default function AdminMessagesPage() {
  return (
    <MessagesProvider>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Customer Messages</h1>
        <AdminMessages />
      </div>
    </MessagesProvider>
  )
} 