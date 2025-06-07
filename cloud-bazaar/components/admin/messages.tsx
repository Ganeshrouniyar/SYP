"use client"

import { useState } from "react"
import { useMessages } from "@/contexts/messages-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Send, Check } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export function AdminMessages() {
  const { messages, sendMessage, markAsRead, markAllAsRead } = useMessages()
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")

  // Get unique customers from messages
  const customers = Array.from(
    new Set(messages.map((msg) => msg.senderId))
  ).filter((id) => id !== "admin")

  const handleSendMessage = () => {
    if (selectedCustomer && newMessage.trim()) {
      sendMessage(newMessage.trim(), selectedCustomer)
      setNewMessage("")
    }
  }

  const customerMessages = messages.filter(
    (msg) =>
      (msg.senderId === selectedCustomer && msg.receiverId === "admin") ||
      (msg.senderId === "admin" && msg.receiverId === selectedCustomer)
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-4rem)]">
      {/* Customers List */}
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="space-y-2">
              {customers.map((customerId) => (
                <Button
                  key={customerId}
                  variant={selectedCustomer === customerId ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedCustomer(customerId)}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Customer {customerId}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Messages */}
      <Card className="md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            {selectedCustomer
              ? `Messages with Customer ${selectedCustomer}`
              : "Select a customer"}
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={markAllAsRead}
            className="flex items-center gap-2"
          >
            <Check className="h-4 w-4" />
            Mark all as read
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col h-[calc(100vh-12rem)]">
          <ScrollArea className="flex-1 mb-4">
            <div className="space-y-4">
              {customerMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.senderId === "admin" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.senderId === "admin"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {formatDistanceToNow(new Date(message.timestamp), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 