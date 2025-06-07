"use client"

import { CustomerMessages } from "@/components/customer/messages"
import { MessagesProvider } from "@/contexts/messages-context"

export default function CustomerMessagesPage() {
  return (
    <MessagesProvider>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Contact Support</h1>
        <CustomerMessages />
      </div>
    </MessagesProvider>
  )
}

