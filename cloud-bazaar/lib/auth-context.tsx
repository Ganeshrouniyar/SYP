"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export type UserRole = "buyer" | "seller" | "admin"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string, role: UserRole) => Promise<void>
  logout: () => void
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>
}

// Mock registered users database
const REGISTERED_USERS = {
  buyers: [
    { email: "john@example.com", password: "password123", name: "John Doe" },
    { email: "jane@example.com", password: "password123", name: "Jane Smith" },
    { email: "buyer@cloudbazaar.com", password: "password", name: "Cloud Buyer" },
  ],
  sellers: [
    { email: "seller@example.com", password: "password123", name: "Seller Account" },
    { email: "techgear@example.com", password: "password123", name: "TechGear Official" },
    { email: "seller@cloudbazaar.com", password: "password", name: "Cloud Seller" },
  ],
  admins: [{ email: "admin@cloudbazaar.com", password: "admin123", name: "Admin" }],
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [registeredUsers, setRegisteredUsers] = useState(REGISTERED_USERS)

  // Check if user is logged in on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error)
      }
    }

    // Load any newly registered users from localStorage
    const savedRegisteredUsers = localStorage.getItem("registeredUsers")
    if (savedRegisteredUsers) {
      try {
        const parsedUsers = JSON.parse(savedRegisteredUsers)
        // Make sure we preserve the admin account
        if (!parsedUsers.admins || !parsedUsers.admins.length) {
          parsedUsers.admins = REGISTERED_USERS.admins
        }
        setRegisteredUsers(parsedUsers)
      } catch (error) {
        console.error("Failed to parse registered users from localStorage:", error)
      }
    }

    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if the email and password match a registered user
      let userList
      if (role === "buyer") {
        userList = registeredUsers.buyers
      } else if (role === "seller") {
        userList = registeredUsers.sellers
      } else if (role === "admin") {
        userList = registeredUsers.admins
      } else {
        throw new Error("Invalid role")
      }

      const foundUser = userList.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

      if (!foundUser) {
        throw new Error("Invalid credentials")
      }

      // Create user object for the authenticated user
      const authenticatedUser: User = {
        id: `user-${Date.now()}`,
        name: foundUser.name,
        email: foundUser.email,
        role,
        avatar:
          role === "admin"
            ? "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZSUyMGFkbWlufGVufDB8fDB8fHww"
            : role === "buyer"
              ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHx8MA%3D"
              : "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmlsZSUyMHBob3RvfGVufDB8fDB8fHww",
      }

      setUser(authenticatedUser)
      localStorage.setItem("user", JSON.stringify(authenticatedUser))

      toast({
        title: "Login successful",
        description: `Welcome back, ${authenticatedUser.name}!`,
      })

      // Redirect based on role
      if (role === "seller") {
        router.push("/seller/dashboard")
      } else if (role === "admin") {
        router.push("/admin/dashboard")
      } else {
        router.push("/")
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      })
      // Re-throw the error so the login page can catch it
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
    router.push("/")
  }

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Admin registration is not allowed
      if (role === "admin") {
        throw new Error("Admin registration is not allowed")
      }

      // Check if email is already registered
      const buyerExists = registeredUsers.buyers.some((u) => u.email.toLowerCase() === email.toLowerCase())
      const sellerExists = registeredUsers.sellers.some((u) => u.email.toLowerCase() === email.toLowerCase())
      const adminExists = registeredUsers.admins.some((u) => u.email.toLowerCase() === email.toLowerCase())

      if (buyerExists || sellerExists || adminExists) {
        throw new Error("Email already registered")
      }

      // Create new user
      const newUser = { email, password, name }

      // Update registered users
      const updatedRegisteredUsers = { ...registeredUsers }
      if (role === "buyer") {
        updatedRegisteredUsers.buyers = [...updatedRegisteredUsers.buyers, newUser]
      } else if (role === "seller") {
        updatedRegisteredUsers.sellers = [...updatedRegisteredUsers.sellers, newUser]
      }

      // Save updated registered users
      setRegisteredUsers(updatedRegisteredUsers)
      localStorage.setItem("registeredUsers", JSON.stringify(updatedRegisteredUsers))

      // Create authenticated user
      const authenticatedUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        role,
        avatar:
          role === "buyer"
            ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHx8MA%3D"
            : "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmlsZSUyMHBob3RvfGVufDB8fDB8fHww",
      }

      setUser(authenticatedUser)
      localStorage.setItem("user", JSON.stringify(authenticatedUser))

      toast({
        title: "Registration successful",
        description: `Welcome to Cloud Bazaar, ${name}!`,
      })

      // Redirect based on role
      if (role === "seller") {
        router.push("/seller/dashboard")
      } else {
        router.push("/")
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred during registration"
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

