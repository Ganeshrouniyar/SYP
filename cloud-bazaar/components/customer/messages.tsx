"use client"

import { useState } from "react"
import { useMessages } from "@/contexts/messages-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Check } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export function CustomerMessages() {
  const { messages, sendMessage, markAsRead, markAllAsRead } = useMessages()
  const [newMessage, setNewMessage] = useState("")
  const customerId = "customer1" // In a real app, this would be the logged-in user's ID

  const customerMessages = messages.filter(
    (msg) =>
      (msg.senderId === customerId && msg.receiverId === "admin") ||
      (msg.senderId === "admin" && msg.receiverId === customerId)
  )

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage(newMessage.trim(), "admin")
      setNewMessage("")
    }
  }

  return (
    <Card className="h-[calc(100vh-4rem)]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Messages with Support</CardTitle>
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
                  message.senderId === customerId ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.senderId === customerId
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
  )
} 