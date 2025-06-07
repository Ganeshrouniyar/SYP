"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth-context"
import SellerLayout from "@/components/seller-layout"

export default function SettingsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [storeName, setStoreName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [bankAccount, setBankAccount] = useState("")
  const [taxInfo, setTaxInfo] = useState("")
  const [shippingMethod, setShippingMethod] = useState("")
  const [shippingRegions, setShippingRegions] = useState("")

  if (!user || user.role !== "seller") {
    router.push("/auth/login")
    return null
  }

  const handleSaveChanges = () => {
    // Here you would typically make an API call to save the settings
    console.log("Saving settings:", {
      storeName,
      email,
      bankAccount,
      taxInfo,
      shippingMethod,
      shippingRegions,
    })
  }

  return (
    <SellerLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Store Settings</h1>
            <p className="text-muted-foreground">Manage your store settings and preferences</p>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Store Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Store Name</label>
                    <Input
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Payment Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Bank Account</label>
                    <Input
                      value={bankAccount}
                      onChange={(e) => setBankAccount(e.target.value)}
                      placeholder="Enter bank account details"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Tax Information</label>
                    <Input
                      value={taxInfo}
                      onChange={(e) => setTaxInfo(e.target.value)}
                      placeholder="Enter tax information"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Shipping Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Default Shipping Method</label>
                    <Input
                      value={shippingMethod}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      placeholder="Enter default shipping method"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Shipping Regions</label>
                    <Input
                      value={shippingRegions}
                      onChange={(e) => setShippingRegions(e.target.value)}
                      placeholder="Enter shipping regions"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveChanges}>Save Changes</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SellerLayout>
  )
} 