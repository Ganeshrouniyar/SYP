"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ShoppingCart,
  User,
  Menu,
  X,
  Heart,
  LogIn,
  Package,
  ChevronDown,
  Tv,
  Shirt,
  Utensils,
  Book,
  Dumbbell,
  Sparkles,
  Gamepad2,
  Stethoscope,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { categories } from "@/lib/data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import SearchBar from "@/components/search-bar"
import NotificationDropdown from "@/components/notification-dropdown"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const { getItemCount } = useCart()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="lg:hidden" onClick={toggleMenu} aria-label="Toggle Menu">
              <Menu className="h-6 w-6" />
            </button>
            <Link href="/" className="flex items-center gap-2">
              <Package className="h-6 w-6" />
              <span className="font-bold text-xl">Cloud Bazaar</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-1">
                  Categories <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {categories.map((category) => {
                  // Define icon based on category id
                  let CategoryIcon
                  switch (category.id) {
                    case "1":
                      CategoryIcon = Tv
                      break
                    case "2":
                      CategoryIcon = Shirt
                      break
                    case "3":
                      CategoryIcon = Utensils
                      break
                    case "4":
                      CategoryIcon = Book
                      break
                    case "5":
                      CategoryIcon = Dumbbell
                      break
                    case "6":
                      CategoryIcon = Sparkles
                      break
                    case "7":
                      CategoryIcon = Gamepad2
                      break
                    case "8":
                      CategoryIcon = Stethoscope
                      break
                    default:
                      CategoryIcon = Package
                  }

                  return (
                    <DropdownMenuItem key={category.id} asChild>
                      <Link href={`/categories/${category.id}`} className="flex items-center gap-2">
                        <CategoryIcon className="h-4 w-4" />
                        {category.name}
                      </Link>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/products" className="text-sm font-medium hover:text-primary" prefetch={true}>
              All Products
            </Link>
            <Link href="/deals" className="text-sm font-medium hover:text-primary">
              Deals
            </Link>
            <Link href="/bestsellers" className="text-sm font-medium hover:text-primary">
              Best Sellers
            </Link>
            <Link href="/new-arrivals" className="text-sm font-medium hover:text-primary">
              New Arrivals
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {/* Replace the desktop search with the SearchBar component */}
            <div className="hidden md:block w-64">
              <SearchBar />
            </div>
            <Link href="/wishlist" className="hidden md:flex">
              <Button variant="ghost" size="icon" aria-label="Wishlist">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>

            {/* Add notification dropdown */}
            {user && <NotificationDropdown />}

            <Link href="/cart">
              <Button variant="ghost" size="icon" aria-label="Shopping Cart" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {getItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {getItemCount()}
                  </span>
                )}
              </Button>
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="User Account">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/account">My Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/wishlist">Wishlist</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/messages">Messages</Link>
                  </DropdownMenuItem>
                  {/* This would be a seller-only option */}
                  {user.role === "seller" && (
                    <DropdownMenuItem asChild>
                      <Link href="/seller/dashboard">Seller Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  {/* This would be an admin-only option */}
                  {user.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin/dashboard">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth/login">
                <Button variant="ghost" size="icon" aria-label="Login">
                  <LogIn className="h-5 w-5" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background lg:hidden">
          <div className="container h-full px-4 py-6 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="flex items-center gap-2">
                <Package className="h-6 w-6" />
                <span className="font-bold text-xl">Cloud Bazaar</span>
              </Link>
              <div className="flex items-center gap-2">
                <button onClick={toggleMenu} aria-label="Close Menu">
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Also replace the mobile search input with the SearchBar component */}
            <div className="mb-6">
              <SearchBar
                onSearch={(query) => {
                  window.location.href = `/products?search=${encodeURIComponent(query)}`
                  toggleMenu()
                }}
              />
            </div>

            <nav className="flex flex-col gap-4 mb-6">
              <h3 className="font-semibold text-lg mb-2">Categories</h3>
              {categories.map((category) => {
                // Define icon based on category id
                let CategoryIcon
                switch (category.id) {
                  case "1":
                    CategoryIcon = Tv
                    break
                  case "2":
                    CategoryIcon = Shirt
                    break
                  case "3":
                    CategoryIcon = Utensils
                    break
                  case "4":
                    CategoryIcon = Book
                    break
                  case "5":
                    CategoryIcon = Dumbbell
                    break
                  case "6":
                    CategoryIcon = Sparkles
                    break
                  case "7":
                    CategoryIcon = Gamepad2
                    break
                  case "8":
                    CategoryIcon = Stethoscope
                    break
                  default:
                    CategoryIcon = Package
                }

                return (
                  <Link
                    key={category.id}
                    href={`/categories/${category.id}`}
                    className="text-base hover:text-primary flex items-center gap-2"
                    onClick={toggleMenu}
                  >
                    <CategoryIcon className="h-4 w-4" />
                    {category.name}
                  </Link>
                )
              })}
            </nav>

            <nav className="flex flex-col gap-4 mb-6">
              <h3 className="font-semibold text-lg mb-2">Quick Links</h3>
              <Link href="/products" className="text-base hover:text-primary" onClick={toggleMenu} prefetch={true}>
                All Products
              </Link>
              <Link href="/deals" className="text-base hover:text-primary" onClick={toggleMenu}>
                Deals
              </Link>
              <Link href="/bestsellers" className="text-base hover:text-primary" onClick={toggleMenu}>
                Best Sellers
              </Link>
              <Link href="/new-arrivals" className="text-base hover:text-primary" onClick={toggleMenu}>
                New Arrivals
              </Link>
              <Link href="/cart" className="text-base hover:text-primary" onClick={toggleMenu}>
                Cart ({getItemCount()})
              </Link>
              {user && (
                <Link href="/messages" className="text-base hover:text-primary" onClick={toggleMenu}>
                  Messages
                </Link>
              )}
            </nav>

            <div className="mt-auto flex flex-col gap-4">
              {user ? (
                <>
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <Link href="/account" onClick={toggleMenu}>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <User className="h-4 w-4" /> My Account
                    </Button>
                  </Link>
                  {user.role === "seller" && (
                    <Link href="/seller/dashboard" onClick={toggleMenu}>
                      <Button variant="outline" className="w-full justify-start gap-2">
                        <Package className="h-4 w-4" /> Seller Dashboard
                      </Button>
                    </Link>
                  )}
                  {user.role === "admin" && (
                    <Link href="/admin/dashboard" onClick={toggleMenu}>
                      <Button variant="outline" className="w-full justify-start gap-2">
                        <Package className="h-4 w-4" /> Admin Dashboard
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={() => {
                      logout()
                      toggleMenu()
                    }}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" onClick={toggleMenu}>
                    <Button className="w-full">Sign In</Button>
                  </Link>
                  <Link href="/auth/register" onClick={toggleMenu}>
                    <Button variant="outline" className="w-full">
                      Create Account
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

