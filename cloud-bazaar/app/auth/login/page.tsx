"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Eye, EyeOff, ShieldAlert } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function LoginPage() {
  const { login, isLoading } = useAuth()
  const [buyerEmail, setBuyerEmail] = useState("")
  const [buyerPassword, setBuyerPassword] = useState("")
  const [sellerEmail, setSellerEmail] = useState("")
  const [sellerPassword, setSellerPassword] = useState("")
  const [adminEmail, setAdminEmail] = useState("")
  const [adminPassword, setAdminPassword] = useState("")
  const [showBuyerPassword, setShowBuyerPassword] = useState(false)
  const [showSellerPassword, setShowSellerPassword] = useState(false)
  const [showAdminPassword, setShowAdminPassword] = useState(false)
  const [loginError, setLoginError] = useState("")

  const handleBuyerLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("") // Clear previous errors

    try {
      await login(buyerEmail, buyerPassword, "buyer")
    } catch (error) {
      setLoginError("Invalid email or password. Please try again.")
    }
  }

  const handleSellerLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("") // Clear previous errors

    try {
      await login(sellerEmail, sellerPassword, "seller")
    } catch (error) {
      setLoginError("Invalid email or password. Please try again.")
    }
  }

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("") // Clear previous errors

    try {
      await login(adminEmail, adminPassword, "admin")
    } catch (error) {
      setLoginError("Invalid email or password. Please try again.")
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-12">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2">
            <Package className="h-8 w-8" />
            <span className="font-bold text-2xl">Cloud Bazaar</span>
          </Link>
        </div>

        <Tabs defaultValue="buyer" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="buyer">Buyer Login</TabsTrigger>
            <TabsTrigger value="seller">Seller Login</TabsTrigger>
            <TabsTrigger value="admin">Admin Login</TabsTrigger>
          </TabsList>

          <TabsContent value="buyer">
            <Card>
              <CardHeader>
                <CardTitle>Buyer Login</CardTitle>
                <CardDescription>Enter your credentials to access your buyer account</CardDescription>
              </CardHeader>
              <form onSubmit={handleBuyerLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="buyer-email">Email</Label>
                    <Input
                      id="buyer-email"
                      type="email"
                      placeholder="name@example.com"
                      required
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="buyer-password">Password</Label>
                      <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="buyer-password"
                        type={showBuyerPassword ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        value={buyerPassword}
                        onChange={(e) => setBuyerPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                        onClick={() => setShowBuyerPassword(!showBuyerPassword)}
                      >
                        {showBuyerPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  {loginError && <div className="p-3 rounded-md bg-red-50 text-red-500 text-sm">{loginError}</div>}
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                  <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/auth/register" className="text-primary hover:underline">
                      Sign up
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="seller">
            <Card>
              <CardHeader>
                <CardTitle>Seller Login</CardTitle>
                <CardDescription>Enter your credentials to access your seller dashboard</CardDescription>
              </CardHeader>
              <form onSubmit={handleSellerLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="seller-email">Email</Label>
                    <Input
                      id="seller-email"
                      type="email"
                      placeholder="name@example.com"
                      required
                      value={sellerEmail}
                      onChange={(e) => setSellerEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="seller-password">Password</Label>
                      <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="seller-password"
                        type={showSellerPassword ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        value={sellerPassword}
                        onChange={(e) => setSellerPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                        onClick={() => setShowSellerPassword(!showSellerPassword)}
                      >
                        {showSellerPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  {loginError && <div className="p-3 rounded-md bg-red-50 text-red-500 text-sm">{loginError}</div>}
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                  <div className="text-center text-sm">
                    Want to become a seller?{" "}
                    <Link href="/seller/register" className="text-primary hover:underline">
                      Register here
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="admin">
            <Card>
              <CardHeader>
                <CardTitle>Admin Login</CardTitle>
                <CardDescription>Enter your credentials to access the admin dashboard</CardDescription>
              </CardHeader>
              <form onSubmit={handleAdminLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Email</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      placeholder="admin@example.com"
                      required
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="admin-password">Password</Label>
                      <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="admin-password"
                        type={showAdminPassword ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                        onClick={() => setShowAdminPassword(!showAdminPassword)}
                      >
                        {showAdminPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  {loginError && <div className="p-3 rounded-md bg-red-50 text-red-500 text-sm">{loginError}</div>}
                  <div className="flex items-center p-3 rounded-md bg-amber-50 text-amber-700 text-sm">
                    <ShieldAlert className="h-5 w-5 mr-2 flex-shrink-0" />
                    <p>Admin credentials: admin@cloudbazaar.com / admin123</p>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

