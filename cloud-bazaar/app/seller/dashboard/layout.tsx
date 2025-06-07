"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useEffect } from "react"

export default function SellerDashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user || user.role !== "seller") {
      router.push("/auth/login")
    }
  }, [user, router])

  if (!user || user.role !== "seller") {
    return null
  }

  return <>{children}</>
} 