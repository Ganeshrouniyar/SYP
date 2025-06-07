"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, RefreshCw, MessageCircle, MoreHorizontal } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import AdminLayout from "@/components/admin-layout"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

// Mock support tickets
const mockTickets = [
  {
    id: "TKT-1001",
    subject: "Payment failed but money deducted",
    status: "open",
    priority: "high",
    category: "payment",
    user: {
      name: "John Doe",
      email: "john@example.com",
    },
    createdAt: "2023-06-15T10:30:00Z",
    lastUpdated: "2023-06-15T14:45:00Z",
    messages: [
      {
        id: "MSG-1",
        sender: "John Doe",
        content:
          "I tried to make a payment but it failed. However, the money was deducted from my account. Please help!",
        timestamp: "2023-06-15T10:30:00Z",
      },
      {
        id: "MSG-2",
        sender: "Support Agent",
        content:
          "I'm sorry to hear that. Can you please provide your order number and the transaction ID from your bank?",
        timestamp: "2023-06-15T14:45:00Z",
      },
    ],
  },
  {
    id: "TKT-1002",
    subject: "How to become a seller?",
    status: "closed",
    priority: "medium",
    category: "account",
    user: {
      name: "Jane Smith",
      email: "jane@example.com",
    },
    createdAt: "2023-06-14T09:15:00Z",
    lastUpdated: "2023-06-14T16:20:00Z",
    messages: [
      {
        id: "MSG-3",
        sender: "Jane Smith",
        content: "I want to start selling on your platform. What are the requirements and how do I get started?",
        timestamp: "2023-06-14T09:15:00Z",
      },
      {
        id: "MSG-4",
        sender: "Support Agent",
        content:
          "Thank you for your interest! To become a seller, you need to register a seller account and provide some business information. You can start by clicking on 'Become a Seller' in your account settings.",
        timestamp: "2023-06-14T11:30:00Z",
      },
      {
        id: "MSG-5",
        sender: "Jane Smith",
        content: "Thank you for the information. I've registered successfully!",
        timestamp: "2023-06-14T15:45:00Z",
      },
      {
        id: "MSG-6",
        sender: "Support Agent",
        content: "Great! Let us know if you need any further assistance. We're here to help!",
        timestamp: "2023-06-14T16:20:00Z",
      },
    ],
  },
  {
    id: "TKT-1003",
    subject: "Product not as described",
    status: "pending",
    priority: "high",
    category: "product",
    user: {
      name: "Robert Johnson",
      email: "robert@example.com",
    },
    createdAt: "2023-06-16T13:20:00Z",
    lastUpdated: "2023-06-16T15:10:00Z",
    messages: [
      {
        id: "MSG-7",
        sender: "Robert Johnson",
        content:
          "I received a product that doesn't match the description on your website. The color is different and it's missing some features.",
        timestamp: "2023-06-16T13:20:00Z",
      },
      {
        id: "MSG-8",
        sender: "Support Agent",
        content:
          "I apologize for the inconvenience. Could you please provide your order number and some photos of the product you received?",
        timestamp: "2023-06-16T15:10:00Z",
      },
    ],
  },
  {
    id: "TKT-1004",
    subject: "Shipping delay",
    status: "open",
    priority: "medium",
    category: "shipping",
    user: {
      name: "Emily Davis",
      email: "emily@example.com",
    },
    createdAt: "2023-06-17T11:05:00Z",
    lastUpdated: "2023-06-17T11:05:00Z",
    messages: [
      {
        id: "MSG-9",
        sender: "Emily Davis",
        content:
          "My order was supposed to be delivered yesterday, but I haven't received it yet. The tracking hasn't updated in 3 days.",
        timestamp: "2023-06-17T11:05:00Z",
      },
    ],
  },
  {
    id: "TKT-1005",
    subject: "Refund request",
    status: "open",
    priority: "high",
    category: "refund",
    user: {
      name: "Michael Wilson",
      email: "michael@example.com",
    },
    createdAt: "2023-06-18T09:30:00Z",
    lastUpdated: "2023-06-18T09:30:00Z",
    messages: [
      {
        id: "MSG-10",
        sender: "Michael Wilson",
        content:
          "I would like to request a refund for my order #12345. The product is not what I expected and I'd like to return it.",
        timestamp: "2023-06-18T09:30:00Z",
      },
    ],
  },
]

export default function SupportPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null)
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [tickets, setTickets] = useState(mockTickets)
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [replyText, setReplyText] = useState("")
  const [isSending, setIsSending] = useState(false)

  // Redirect if not logged in or not an admin
  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/auth/login")
    }
  }, [user, router, isLoading])

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
          <p className="text-sm text-muted-foreground">Loading support tickets...</p>
        </div>
      </div>
    )
  }

  // If not logged in or not an admin, don't render anything (will redirect)
  if (!user || user.role !== "admin") {
    return null
  }

  // Filter tickets based on search term and filters
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      searchTerm === "" ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === null || ticket.status === statusFilter
    const matchesPriority = priorityFilter === null || ticket.priority === priorityFilter
    const matchesCategory = categoryFilter === null || ticket.category === categoryFilter

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-amber-100 text-amber-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-amber-100 text-amber-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const handleTicketSelect = (ticket: any) => {
    setSelectedTicket(ticket)
  }

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedTicket) return

    setIsSending(true)

    // Simulate API call
    setTimeout(() => {
      // Add new message to the ticket
      const newMessage = {
        id: `MSG-${Date.now()}`,
        sender: "Support Agent",
        content: replyText,
        timestamp: new Date().toISOString(),
      }

      const updatedTickets = tickets.map((ticket) => {
        if (ticket.id === selectedTicket.id) {
          return {
            ...ticket,
            messages: [...ticket.messages, newMessage],
            lastUpdated: new Date().toISOString(),
            status: ticket.status === "open" ? "pending" : ticket.status,
          }
        }
        return ticket
      })

      setTickets(updatedTickets)
      setSelectedTicket({
        ...selectedTicket,
        messages: [...selectedTicket.messages, newMessage],
        lastUpdated: new Date().toISOString(),
        status: selectedTicket.status === "open" ? "pending" : selectedTicket.status,
      })

      setReplyText("")
      setIsSending(false)

      toast({
        title: "Reply sent",
        description: "Your reply has been sent successfully.",
      })
    }, 1000)
  }

  const handleStatusChange = (ticketId: string, newStatus: string) => {
    const updatedTickets = tickets.map((ticket) => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          status: newStatus,
          lastUpdated: new Date().toISOString(),
        }
      }
      return ticket
    })

    setTickets(updatedTickets)

    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket({
        ...selectedTicket,
        status: newStatus,
        lastUpdated: new Date().toISOString(),
      })
    }

    toast({
      title: "Status updated",
      description: `Ticket status changed to ${newStatus}.`,
    })
  }

  const handlePriorityChange = (ticketId: string, newPriority: string) => {
    const updatedTickets = tickets.map((ticket) => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          priority: newPriority,
          lastUpdated: new Date().toISOString(),
        }
      }
      return ticket
    })

    setTickets(updatedTickets)

    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket({
        ...selectedTicket,
        priority: newPriority,
        lastUpdated: new Date().toISOString(),
      })
    }

    toast({
      title: "Priority updated",
      description: `Ticket priority changed to ${newPriority}.`,
    })
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
            <p className="text-muted-foreground">Manage customer support tickets and inquiries.</p>
          </div>
        </div>

        <Tabs defaultValue="tickets">
          <TabsList className="mb-4">
            <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
            <TabsTrigger value="faq">FAQ Management</TabsTrigger>
            <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
          </TabsList>

          <TabsContent value="tickets">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Tickets List */}
              <Card className="lg:col-span-1">
                <CardHeader className="pb-3">
                  <CardTitle>Support Tickets</CardTitle>
                  <CardDescription>
                    {filteredTickets.length} {filteredTickets.length === 1 ? "ticket" : "tickets"} found
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4 mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Search tickets..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Select value={statusFilter || ""} onValueChange={(value) => setStatusFilter(value || null)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={priorityFilter || ""} onValueChange={(value) => setPriorityFilter(value || null)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Priorities</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                    {filteredTickets.length > 0 ? (
                      filteredTickets.map((ticket) => (
                        <div
                          key={ticket.id}
                          className={`p-3 border rounded-md cursor-pointer transition-colors ${
                            selectedTicket?.id === ticket.id ? "border-primary bg-primary/5" : "hover:border-primary/50"
                          }`}
                          onClick={() => handleTicketSelect(ticket)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="font-medium">{ticket.id}</div>
                            <Badge className={getStatusColor(ticket.status)}>
                              {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                            </Badge>
                          </div>
                          <div className="mb-2 line-clamp-2 font-medium">{ticket.subject}</div>
                          <div className="flex justify-between items-center text-xs text-muted-foreground">
                            <div>{ticket.user.name}</div>
                            <div>{new Date(ticket.lastUpdated).toLocaleDateString()}</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">No tickets found</div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Ticket Details */}
              <Card className="lg:col-span-2">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{selectedTicket ? selectedTicket.subject : "Ticket Details"}</CardTitle>
                      {selectedTicket && (
                        <CardDescription>
                          {selectedTicket.id} • {selectedTicket.user.name} ({selectedTicket.user.email})
                        </CardDescription>
                      )}
                    </div>
                    {selectedTicket && (
                      <div className="flex gap-2">
                        <Badge className={getPriorityColor(selectedTicket.priority)}>
                          {selectedTicket.priority.charAt(0).toUpperCase() + selectedTicket.priority.slice(1)} Priority
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handlePriorityChange(selectedTicket.id, "high")}>
                              Set High Priority
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handlePriorityChange(selectedTicket.id, "medium")}>
                              Set Medium Priority
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handlePriorityChange(selectedTicket.id, "low")}>
                              Set Low Priority
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleStatusChange(selectedTicket.id, "open")}>
                              Mark as Open
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(selectedTicket.id, "pending")}>
                              Mark as Pending
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(selectedTicket.id, "closed")}>
                              Mark as Closed
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {selectedTicket ? (
                    <div className="space-y-6">
                      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                        {selectedTicket.messages.map((message: any) => (
                          <div key={message.id} className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                              <div className="font-medium">{message.sender}</div>
                              <div className="text-xs text-muted-foreground">
                                {new Date(message.timestamp).toLocaleString()}
                              </div>
                            </div>
                            <div className="bg-muted p-3 rounded-md">{message.content}</div>
                          </div>
                        ))}
                      </div>

                      {selectedTicket.status !== "closed" && (
                        <div className="space-y-4">
                          <Textarea
                            placeholder="Type your reply here..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            rows={4}
                          />
                          <div className="flex justify-end">
                            <Button
                              onClick={handleSendReply}
                              disabled={!replyText.trim() || isSending}
                              className="gap-2"
                            >
                              {isSending ? (
                                <>
                                  <RefreshCw className="h-4 w-4 animate-spin" />
                                  Sending...
                                </>
                              ) : (
                                <>
                                  <MessageCircle className="h-4 w-4" />
                                  Send Reply
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <MessageCircle className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No ticket selected</h3>
                      <p className="text-muted-foreground">Select a ticket from the list to view details</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle>FAQ Management</CardTitle>
                <CardDescription>Manage frequently asked questions for your marketplace.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">FAQ management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="knowledge">
            <Card>
              <CardHeader>
                <CardTitle>Knowledge Base</CardTitle>
                <CardDescription>Manage your knowledge base articles and categories.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">Knowledge base management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}

