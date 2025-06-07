"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth-context"
import SellerLayout from "@/components/seller-layout"

export default function HelpPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  if (!user || user.role !== "seller") {
    router.push("/auth/login")
    return null
  }

  const handleSubmitTicket = () => {
    // Here you would typically make an API call to submit the support ticket
    console.log("Submitting ticket:", { subject, message })
    // Reset form
    setSubject("")
    setMessage("")
  }

  return (
    <SellerLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
            <p className="text-muted-foreground">Get help and support for your store</p>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium">How do I add a new product?</h4>
                    <p className="text-sm text-muted-foreground mt-2">
                      Click on the "Add Product" button in the Products tab and fill out the required information.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium">How do I process orders?</h4>
                    <p className="text-sm text-muted-foreground mt-2">
                      Go to the Orders tab, find the order you want to process, and click "View" to see the details.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium">How do I update my store settings?</h4>
                    <p className="text-sm text-muted-foreground mt-2">
                      Navigate to the Settings tab and update your store information, payment settings, and shipping settings.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium">How do I manage my inventory?</h4>
                    <p className="text-sm text-muted-foreground mt-2">
                      Go to the Products tab to view and manage your product inventory. You can update stock levels and product details.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium">How do I handle refunds?</h4>
                    <p className="text-sm text-muted-foreground mt-2">
                      Process refunds through the Orders tab by selecting the order and clicking the refund button.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Contact Support</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Subject</label>
                    <Input
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Enter your subject"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Message</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full min-h-[100px] p-2 border rounded-md mt-1"
                      placeholder="Enter your message"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handleSubmitTicket}>Submit Ticket</Button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Additional Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium">Seller Guidelines</h4>
                    <p className="text-sm text-muted-foreground mt-2">
                      Learn about our seller policies and guidelines to ensure a smooth selling experience.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium">API Documentation</h4>
                    <p className="text-sm text-muted-foreground mt-2">
                      Access our API documentation to integrate your store with external systems.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium">Community Forum</h4>
                    <p className="text-sm text-muted-foreground mt-2">
                      Join our seller community to share experiences and get tips from other sellers.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium">Video Tutorials</h4>
                    <p className="text-sm text-muted-foreground mt-2">
                      Watch video tutorials to learn how to use all features of the seller dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SellerLayout>
  )
} 